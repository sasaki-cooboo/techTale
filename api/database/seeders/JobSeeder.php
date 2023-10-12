<?php

namespace Database\Seeders;

use App\Models\Area;
use App\Models\EngineerType;
use App\Models\Feature;
use App\Models\Job;
use App\Models\Language;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languageIds = Language::all()->pluck("id")->toArray();
        $featureIds = Feature::all()->pluck("id")->toArray();
        $areaIds = Area::all()->pluck("id")->toArray();
        $engineerIds = EngineerType::all()->pluck("id")->toArray();
        $skillIds = Skill::all()->pluck("id")->toArray();

        Job::factory(1000)->create()->each(function (Job $job) use ($languageIds, $featureIds, $areaIds, $engineerIds, $skillIds) {
            // 言語は最大2つ
            $languageId1 = $languageIds[rand(0, count($languageIds) - 1)];
            $languageId2 = $languageIds[rand(0, count($languageIds) - 1)];
            $job->languages()->syncWithoutDetaching([$languageId1, $languageId2]);

            // 特徴は最大5つ
            $featureId1 = $featureIds[rand(0, count($featureIds) - 1)];
            $featureId2 = $languageIds[rand(0, count($languageIds) - 1)];
            $featureId3 = $languageIds[rand(0, count($languageIds) - 1)];
            $featureId4 = $languageIds[rand(0, count($languageIds) - 1)];
            $featureId5 = $languageIds[rand(0, count($languageIds) - 1)];
            $job->features()->syncWithoutDetaching([$featureId1, $featureId2, $featureId3, $featureId4, $featureId5]);

            // 地域は最大2つ
            $areaId1 = $areaIds[rand(0, count($areaIds) - 1)];
            $areaId2 = $areaIds[rand(0, count($areaIds) - 1)];
            $job->areas()->syncWithoutDetaching([$areaId1, $areaId2]);

            // 職種は最大2つ
            $engineerId1 = $engineerIds[rand(0, count($engineerIds) - 1)];
            $engineerId2 = $engineerIds[rand(0, count($engineerIds) - 1)];
            $job->engineerTypes()->syncWithoutDetaching([$engineerId1, $engineerId2]);

            // スキルは最大3つ
            $skillId1 = $skillIds[rand(0, count($skillIds) - 1)];
            $skillId2 = $skillIds[rand(0, count($skillIds) - 1)];
            $skillId3 = $skillIds[rand(0, count($skillIds) - 1)];
            $job->skills()->syncWithoutDetaching([$skillId1, $skillId2, $skillId3]);
        });
    }
}
