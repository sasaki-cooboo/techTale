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
            "40代活躍中",
            "大手企業",
            "スタートアップ",
            "英語力必須",
            "深夜勤務あり",
            "シフト制",
            "自社サービス開発",
            "スーツ必須",
            "リーダー経験",
            "若手歓迎",
            "BtoB向け",
            "週2～3日可",
            "週1日可",
            "上流工程",
            "外国語を活かす",
            "フレックス可",
            "ゲーム好き歓迎",
            "従業員100名未満",
            "フルスタック",
            "新規立ち上げ",
            "上場企業",
            "勉強会充実"
        ];
        foreach ($features as $feature) {
            Feature::create([
                'name' => $feature
            ]);
        }
    }
}
