<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $features = [
            "高単価",
            "参画実績あり",
            "急募",
            "リモートワーク可",
            "未経験歓迎",
            "経験者優遇",
            "20代活躍中",
            "レガシーな開発環境",
            "30代活躍中",
            "ベンチャー企業",
            "大手企業",
            "スタートアップ",
            "英語力必須",
            "深夜勤務あり",
            "休日なし",
            "自社サービス開発",
            "スーツ必須",
        ];
        foreach ($features as $feature) {
            Feature::create([
                'name' => $feature
            ]);
        }
    }
}
