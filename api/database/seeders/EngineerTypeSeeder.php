<?php

namespace Database\Seeders;

use App\Models\EngineerType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EngineerTypeSeeder extends Seeder
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
            EngineerType::create([
                "name" => $jobRole
            ]);
        }
    }
}
