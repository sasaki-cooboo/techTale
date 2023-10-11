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
        return [
            'title' => $this->faker->word,
            'cost' => $this->faker->numberBetween(100000, 1000000),
            'description' => $this->faker->sentence,
            'required_skills' => json_encode($required_skills),
            'message' => $this->faker->sentence,
            'created_at' => $now,
            'updated_at' => $now,
        ];
    }
}
