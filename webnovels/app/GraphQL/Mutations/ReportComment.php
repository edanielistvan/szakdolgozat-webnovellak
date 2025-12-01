<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Comment;
use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class ReportComment
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthenticated");
        }

        $comment = Comment::findOrFail($args['commentId']);

        $existing = Report::where('comment_id', $comment->id)
                          ->where('reporter_id', $user->id)
                          ->first();

        if (!$existing) {
            Report::create([
                'comment_id' => $comment->id,
                'reporter_id' => $user->id,
                'commenter_id' => $comment->user_id
            ]);
        }

        return true;
    }
}
