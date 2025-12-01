<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Report>
 */
class ReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $comment = Comment::factory()->create();

        return [
            'comment_id' => $comment->id,
            'reporter_id' => User::factory()->create()->id,
            'commenter_id' => $comment->user_id,
        ];
    }
}
