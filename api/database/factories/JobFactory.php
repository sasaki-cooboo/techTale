<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $now = Carbon::now();
        $required_skills = [
            "スキル1", "スキル2", "スキル3",
        ];
        $randomNumber = $this->faker->numberBetween(100000, 1000000);
        $cost = floor($randomNumber / 100000) * 100000;
        return [
            'title' => $this->faker->word,
            'cost' => $cost,
            'description' => $this->faker->realText(200),
            'required_skills' => json_encode($required_skills),
            'message' => $this->faker->realText(200),
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }
}
