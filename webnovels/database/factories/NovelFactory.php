<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Novel>
 */
class NovelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->writer()->create(),
            'title' => fake()->sentence(3),
            'rating' => fake()->randomFloat(2, 0, 10),
            'image' => fake()->imageUrl(640, 480, 'books', true),
            'description' => fake()->paragraph(),
            'reads' => fake()->numberBetween(0, 10000),
        ];
    }
}
