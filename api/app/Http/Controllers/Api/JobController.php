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

class JobController extends Controller
{
    /**
     * 案件一覧取得
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        sleep(1);
        $selectedArea = $request->area;
        $selectedLanguage = $request->language;
        $selectedEngineerType = $request->engineerType;
        $selectedFeature = $request->feature;
        $query = Job::query()
            ->with(["area", "languages", "skills", "engineerTypes"]);

        // 地域で検索
        $query->when($selectedArea, function ($query) use ($selectedArea) {
            return $query->whereHas("area", fn ($q) => $q->whereIn("areas.id", [$selectedArea]));
        });

        // 言語で検索
        $query->when($selectedLanguage, function ($query) use ($selectedLanguage) {
            return $query->whereHas("languages", fn ($q) => $q->whereIn("languages.id", [$selectedLanguage]));
        });

        // 職種で検索
        $query->when($selectedEngineerType, function ($query) use ($selectedEngineerType) {
            return $query->whereHas("engineerTypes", fn ($q) => $q->whereIn("engineer_types.id", [$selectedEngineerType]));
        });

        // 職種で検索
        $query->when($selectedEngineerType, function ($query) use ($selectedEngineerType) {
            return $query->whereHas("engineerTypes", fn ($q) => $q->whereIn("engineer_types.id", [$selectedEngineerType]));
        });


        // 職種で検索
        $query->when($selectedFeature, function ($query) use ($selectedFeature) {
            return $query->whereHas("features", fn ($q) => $q->whereIn("features.id", [$selectedFeature]));
        });

        // TODO:キーワード検索
        // ->whereHas("area", function ($query) use ($area) {
        //     $query->where("name", 'like', '%' . $area . '%');
        // })

        $jobs = $query->latest()->get();
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
        sleep(1);
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
        sleep(1);
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
