<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
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

        // TODO:キーワード検索
        // ->whereHas("area", function ($query) use ($area) {
        //     $query->where("name", 'like', '%' . $area . '%');
        // })

        $jobs = $query->latest()->get();
        // TODO:削除
        // Log::info($query->toSql());
        return new JobCollection($jobs);
    }

    /**
     * 案件詳細取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job = Job::query()->with(["area", "languages", "skills", "engineerTypes"])->findOrFail($id);
        return new JobResource($job);
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
}
