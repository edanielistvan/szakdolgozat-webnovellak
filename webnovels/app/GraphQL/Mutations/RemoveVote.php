<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\CommentVote;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class RemoveVote
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
        
        $commentVote = Comment::findOrFail($comment_id)->votes()->where('user_id', $user->id)->first();

        

        if ($commentVote) {
            $commentVote->delete();
        }

        $upCount = CommentVote::where('comment_id', $comment_id)->where('value',1)->count();
        $downCount = CommentVote::where('comment_id', $comment_id)->where('value',-1)->count();

        $comment = Comment::findOrFail($comment_id);
        $comment->upvotes = $upCount;
        $comment->downvotes = $downCount;
        $comment->save();

        return true;
    }
}
