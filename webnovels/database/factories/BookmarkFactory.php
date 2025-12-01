<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookmark>
 */
class BookmarkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $novel = Novel::factory()->create();
        $chapter = Chapter::factory()->create(['novel_id' => $novel->id]);

        return [
            'user_id'    => User::factory(),
            'novel_id'   => $novel->id,
            'chapter_id' => $chapter->id
        ];
    }
}
