<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Chapter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

final readonly class DeleteChapter
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthorized");
        }

        $chapter = Chapter::findOrFail($args['chapterId']);

        if ($chapter) {
            if ($chapter->novel->user->id != $user->id) {
                throw new Exception("You do not have permission to delete this chapter.");
            }

            $chapter->delete();
        }    

        return true;
    }
}
