<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Novel;
use App\Models\Chapter;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReadingList>
 */
class ReadingListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $novel = Novel::factory()->create();
        $chapter = Chapter::factory()->for($novel)->create();

        return [
            'user_id' => User::factory(),
            'novel_id' => $novel->id,
            'chapter_id' => $chapter->id,
        ];
    }
}
