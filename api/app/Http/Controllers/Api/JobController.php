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
    public function index()
    {
        sleep(1);
        $jobs = Job::query()->with(["area", "languages", "skills", "engineerTypes"])->latest()->get();
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
