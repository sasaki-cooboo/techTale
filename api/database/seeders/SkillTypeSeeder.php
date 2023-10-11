<?php

namespace Database\Seeders;

use App\Models\SkillType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SkillType::create([
            'name' => "フレームワーク"
        ]);
        SkillType::create([
            'name' => "データベース"
        ]);
        SkillType::create([
            'name' => "クラウド"
        ]);
    }
}
