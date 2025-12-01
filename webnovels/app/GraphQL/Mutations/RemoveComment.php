<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class RemoveComment
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $comment_id = $args['commentId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if(!$user) {
            throw new Exception("Unauthenticated");
        }
        
        if ($user->role != 'admin') {
            throw new Exception('Unauthorized');
        }

        $comment = Comment::findOrFail($comment_id);
        
        if ($comment) {
            $comment->delete();
            return true;
        }

        return false;
    }
}
