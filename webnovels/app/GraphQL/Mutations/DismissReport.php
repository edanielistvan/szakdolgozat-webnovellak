<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Report;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class DismissReport
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $comment_id = $args['commentId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthenticated");
        }

        if ($user->role != 'admin') {
            throw new Exception('Unauthorized');
        }

        Report::where('comment_id', $comment_id)->delete();

        return true;
    }
}
