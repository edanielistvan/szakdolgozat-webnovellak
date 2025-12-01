<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Bookmark;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

final readonly class GetBookmark
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $novel_id = $args['novelId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception('You must be logged in to see bookmarks.');
        }

        $bookmark = Bookmark::where('user_id', $user->id)
            ->where('novel_id', $novel_id)
            ->first();

        return $bookmark;
    }
}
