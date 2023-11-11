<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\JobBookmarkRequest;
use App\Http\Resources\AreaResource;
use App\Http\Resources\EngineerTypeResource;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\JobCollection;
use App\Http\Resources\JobResource;
use App\Http\Resources\LanguageResource;
use App\Http\Resources\SkillResource;
use App\Models\Area;
use App\Models\EngineerType;
use App\Models\Feature;
use App\Models\Job;
use App\Models\Language;
use App\Models\Skill;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class JobController extends Controller
{
    /**
     * 案件一覧取得
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $selectedArea = $request->areas ? explode(",", $request->areas) : false;
        $selectedLanguage = $request->languages ? explode(",", $request->languages) : false;
        $selectedSkill = $request->skills ? explode(",", $request->skills) : false;
        $selectedEngineerType =
            $request->engineerTypes ? explode(",", $request->engineerTypes) : false;
        $selectedFeature =
            $request->features ? explode(",", $request->features) : false;

        $query = Job::query()
            ->with(["area", "languages", "skills", "engineerTypes"]);

        // 地域で検索
        $query->when($selectedArea, function ($query) use ($selectedArea) {
            return $query->whereHas("area", fn ($q) => $q->whereIn("areas.id", $selectedArea));
        });

        // 言語で検索
        $query->when($selectedLanguage, function ($query) use ($selectedLanguage) {
            return $query->whereHas("languages", fn ($q) => $q->whereIn("languages.id", $selectedLanguage));
        });

        // スキルで検索
        $query->when($selectedSkill, function ($query) use ($selectedSkill) {
            return $query->whereHas("skills", fn ($q) => $q->whereIn("skills.id", $selectedSkill));
        });

        // 職種で検索
        $query->when($selectedEngineerType, function ($query) use ($selectedEngineerType) {
            return $query->whereHas("engineerTypes", fn ($q) => $q->whereIn("engineer_types.id", $selectedEngineerType));
        });

        // 職種で検索
        $query->when($selectedFeature, function ($query) use ($selectedFeature) {
            return $query->whereHas("features", fn ($q) => $q->whereIn("features.id", $selectedFeature));
        });

        // キーワード検索
        $keyword = $request->q;
        $query->when($keyword, function ($query) use ($keyword) {
            $target = "%" . $keyword . "%";
            return $query
                ->where("title", "like", $target)
                ->orWhere("description", "like", $target)
                ->orWhere("message", "like", $target)
                ->orWhere("required_skills", "like", $target)
                ->orWhereHas("area", fn ($q) => $q->where("areas.name", "like", $target))
                ->orWhereHas("languages", fn ($q) => $q->where("languages.name", "like", $target))
                ->orWhereHas("skills", fn ($q) => $q->where("skills.name", "like", $target))
                ->orWhereHas("engineerTypes", fn ($q) => $q->where("engineer_types.name", "like", $target))
                ->orWhereHas("features", fn ($q) => $q->where("features.name", "like", $target));
        });

        // 新着順にソート
        $query->when($request->sort === "latest", function ($query) {
            return $query->latest();
        });

        // 高単価順にソート
        $query->when($request->sort === "cost", function ($query) {
            return $query->orderBy("cost", "desc");
        });

        $jobs = $query->paginate(40);
        return new JobCollection($jobs);
    }

    /**
     * 案件詳細取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(int $id, JobService $jobService)
    {
        $job = Job::query()->with(["area", "languages", "skills", "engineerTypes"])->findOrFail($id);

        $relatedJobs = Job::query()
            // TODO:ランダムでなく関連付けさせる
            // 自分は除外したい
            ->with(["area", "languages", "skills", "engineerTypes"])->inRandomOrder()->take(4)->get();

        // 初回も履歴に表示されるように、現在閲覧中のidをpush
        $prevHistoryCollection = collect(session('job_history_views'))->push($id);

        // 最新4件の閲覧履歴を取得、逆順にして渡す
        $historyJobs = $jobService->getHistoryJobs($prevHistoryCollection->reverse());

        // セッションに履歴を保存
        $jobService->setHistoryToSession($id, $prevHistoryCollection);

        return [
            "detail" => new JobResource($job),
            "relatedJobs" => new JobCollection($relatedJobs),
            "historyJobs" => new JobCollection($historyJobs),
        ];
    }

    /**
     * 検索条件取得
     *
     * @return \Illuminate\Http\Response
     */
    public function getAttributes()
    {
        $areas = Area::all();
        $languages = Language::all();
        // スキルタイプ別にスキルをグループ化
        $skills = Skill::all()->groupBy('skill_type_id');
        $engineerTypes = EngineerType::all();
        $features = Feature::all();

        return [
            "areas" => AreaResource::collection($areas),
            "languages" => LanguageResource::collection($languages),
            "skills" => [
                "frameworks" =>
                SkillResource::collection($skills[1] ?? []),
                "databases" =>
                SkillResource::collection($skills[2] ?? []),
                "clouds" =>
                SkillResource::collection($skills[3] ?? []),
            ],
            "engineerTypes" => EngineerTypeResource::collection($engineerTypes),
            "features" => FeatureResource::collection($features),
        ];
    }

    /**
     * ブックマーク取得
     *
     * @return \Illuminate\Http\Response
     */
    public function getBookmark(): array
    {
        $bookmarkIds = session('job_bookmark', []);

        return $bookmarkIds;
    }

    /**
     * ブックマーク更新
     *
     * @param \App\Http\Requests\JobBookmarkRequest $request
     * @return \Illuminate\Http\Response
     */
    public function setBookmark(JobBookmarkRequest $request): array
    {
        $id = $request->id;
        $bookmarkIds = session('job_bookmark', []);

        // $idが含まれているか確認
        $index = array_search($id, $bookmarkIds);

        if ($index !== false) {
            // $idが含まれている場合は削除
            unset($bookmarkIds[$index]);
        } else {
            // $idが含まれていない場合は追加
            $bookmarkIds[] = $id;
        }

        // セッションに更新したブックマークの配列を保存
        session(['job_bookmark' => $bookmarkIds]);
        return $bookmarkIds;
    }
}
