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
            "横浜",
            "川崎",
            "横須賀",
            "神奈川県",
            "札幌",
            "北海道",
            "成田",
            "千葉県",
            "沖縄県",
            "那覇",
            "大宮",
            "埼玉県",
            "心斎橋",
            "なんば",
            "大阪府",
            "河原町",
            "祇園",
            "京都府",
            "福岡県",
        ];

        foreach ($areas as $area) {
            Area::create([
                "name" => $area
            ]);
        }
    }
}
