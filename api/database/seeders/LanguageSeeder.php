<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Language;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = [
            "PHP",
            "JavaScript",
            "Python",
            "Java",
            "C++",
            "C#",
            "Ruby",
            "Swift",
            "Go",
            "Kotlin",
            "Rust",
            "TypeScript",
            "SQL",
            "HTML",
            "CSS",
            "Perl",
            "COBOL",
        ];
        foreach ($languages as $language) {
            Language::create([
                'name' => $language
            ]);
        }
    }
}
