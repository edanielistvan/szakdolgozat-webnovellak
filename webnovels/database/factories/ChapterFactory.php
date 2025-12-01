<?php

namespace Database\Factories;

use App\Models\Novel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chapter>
 */
class ChapterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'novel_id' => Novel::factory(),
            'number' => fake()->numberBetween(1, 50),
            'title' => fake()->sentence(4),
            'text' => '<p>' . implode('</p><p>', fake()->paragraphs(5)) . '</p>',
        ];
    }
}
