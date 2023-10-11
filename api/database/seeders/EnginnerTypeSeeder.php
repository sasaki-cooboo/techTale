<?php

namespace Database\Seeders;

use App\Models\EnginnerType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EnginnerTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $jobRoles = [
            "バックエンドエンジニア",
            "フロントエンドエンジニア",
            "フルスタックエンジニア",
            "データベースエンジニア",
            "クラウドエンジニア",
            "モバイルアプリ開発者",
            "データサイエンティスト",
            "機械学習エンジニア",
            "ネットワークエンジニア",
            "セキュリティエンジニア",
            "DevOpsエンジニア",
            "テスターエンジニア",
            "プロジェクトマネージャ",
        ];
        foreach ($jobRoles as $jobRole) {
            EnginnerType::create([
                "name" => $jobRole
            ]);
        }
    }
}
