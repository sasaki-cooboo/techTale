<?php

namespace Database\Seeders;

use App\Models\Area;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $areas = [
            "東京都",
            "渋谷",
            "原宿",
            "新宿",
            "港区",
            "品川",
            "浜松町",
            "銀座",
            "秋葉原",
            "千代田区",
            "六本木",
            "池袋",
            "中野",
            "世田谷",
        ];

        foreach ($areas as $area) {
            Area::create([
                "name" => $area
            ]);
        }
    }
}
