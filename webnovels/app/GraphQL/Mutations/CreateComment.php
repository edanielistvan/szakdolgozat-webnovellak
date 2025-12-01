<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class CreateComment
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $novel_id = $args['novelId'];
        $parent_id = $args['parentId'];
        $text = $args['text'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if(!$user) {
            throw new Exception("Unauthenticated");
        }
        
        $comment = Comment::create([
            'user_id' => $user->id,
            'novel_id' => $novel_id,
            'parent_id' => $parent_id,
            'text' => $text,
            'upvotes' => 0,
            'downvotes' => 0,
        ]);

        return true;
    }
}
