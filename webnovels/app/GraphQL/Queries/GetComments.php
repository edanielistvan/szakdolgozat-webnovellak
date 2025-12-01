<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

final readonly class GetComments
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $novel_id = $args['novelId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception('You must be logged in to see comments.');
        }

        $comments = Comment::with(['user', 'votes', 'replies', 'replies.user', 'replies.votes'])
            ->where('novel_id', $novel_id)
            ->whereNull('parent_id')
            ->orderBy('created_at', 'desc')
            ->get();

        foreach ($comments as $comment) {
            $comment->userVote = $comment->votes->firstWhere('user_id', $user->id)?->value ?? 0;

            foreach ($comment->replies as $reply) {
                $reply->userVote = $reply->votes->firstWhere('user_id', $user->id)?->value ?? 0;
            }
        }

        return $comments;
    }
}
