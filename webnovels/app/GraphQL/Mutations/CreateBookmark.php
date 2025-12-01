<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Bookmark;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class CreateBookmark
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $novel_id = $args['novelId'];
        $chapter_id = $args['chapterId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if(!$user) {
            throw new Exception("Unauthenticated");
        }
        
        $bookmark = Bookmark::updateOrCreate(
            [
                'user_id'  => $user->id,
                'novel_id' => $novel_id,
            ],
            [
                'chapter_id' => $chapter_id
            ]
        );

        return true;
    }
}
