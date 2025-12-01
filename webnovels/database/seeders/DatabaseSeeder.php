<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Novel;
use App\Models\Chapter;
use App\Models\Favourite;
use App\Models\ReadingList;
use App\Models\Quote;
use App\Models\Comment;
use App\Models\CommentVote;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@vn.hu',
            'role' => 'admin',
            'password' => Hash::make('admin')
        ]);

        // Tags
        $tagNames = [
            'Fantasy', 'Romance', 'Action', 'Comedy', 'Drama',
            'Adventure', 'Slice of Life', 'Horror', 'Sci-Fi', 'Mystery'
        ];

        $tags = collect($tagNames)->map(fn($name) => Tag::factory()->create(['name' => $name]));

        // Writers - Novels
        $writers = User::factory(5)->create(['role' => 'writer']);

        $writers->each(function ($writer) use ($tags) {
            $novels = Novel::factory(rand(1, 3))->create([
                'user_id' => $writer->id,
            ]);

            $novels->each(function ($novel) use ($tags) {
                Chapter::factory(rand(5, 15))
                    ->sequence(fn ($sequence) => ['number' => $sequence->index + 1])
                    ->create([
                        'novel_id' => $novel->id,
                    ]);

                $novel->tags()->attach($tags->random(rand(1, min(4, $tags->count())))->pluck('id'));
            });
        });

        // Readers
        $users = User::factory(15)->create();

        // Reader activity
        $allNovels = Novel::all();
        $allChapters = Chapter::all();

        $users->each(function ($user) use ($allNovels, $allChapters) {
            // Favourites
            $favNovels = $allNovels->random(rand(2, 5));
            foreach ($favNovels as $novel) {
                Favourite::create([
                    'user_id' => $user->id,
                    'novel_id' => $novel->id,
                ]);
            }

            // Reading list (progress in random novels)
            $readNovels = $allNovels->random(rand(2, 5));
            foreach ($readNovels as $novel) {
                $chapters = $novel->chapters;
                if ($chapters->count() > 0) {
                    $chapter = $chapters->random();
                    ReadingList::create([
                        'user_id' => $user->id,
                        'novel_id' => $novel->id,
                        'chapter_id' => $chapter->id,
                    ]);
                }
            }

            // Quotes
            $quoteChapters = $allChapters->random(rand(3, 6));
            foreach ($quoteChapters as $chapter) {
                Quote::create([
                    'user_id' => $user->id,
                    'novel_id' => $chapter->novel_id,
                    'chapter_id' => $chapter->id,
                    'quote' => fake()->sentence(12),
                ]);
            }

            // Comments
            $commentNovels = $allNovels->random(rand(3, 6));
            foreach ($commentNovels as $novel) {
                Comment::factory(rand(1, 3))->create([
                    'user_id' => $user->id,
                    'novel_id' => $novel->id,
                    'parent_id' => null,
                ]);
            }
        });

        // Replies for comments
        $allComments = Comment::all();
        $users->each(function ($user) use ($allComments) {
            foreach ($allComments->random(min(10, $allComments->count())) as $parent) {
                Comment::create([
                    'user_id' => $user->id,
                    'novel_id' => $parent->novel_id,
                    'parent_id' => $parent->id,
                    'text' => fake()->sentence(),
                ]);
            }
        });

        // Up/down votes
        $comments = Comment::all();
        $users->each(function ($user) use ($comments) {
            foreach ($comments->random(rand(10, 25)) as $comment) {
                $value = fake()->randomElement([1, -1]);
                CommentVote::create([
                    'user_id' => $user->id,
                    'comment_id' => $comment->id,
                    'value' => $value,
                ]);

                // update cached counts
                if ($value === 1) {
                    $comment->increment('upvotes');
                } else {
                    $comment->increment('downvotes');
                }
            }
        });
    }
}
