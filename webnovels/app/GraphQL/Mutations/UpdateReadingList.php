<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\ReadingList;
use App\Models\Chapter;
use App\Models\Novel;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Exception;

final readonly class UpdateReadingList
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthorized");
        } 

        $readingList = $args['value'];

        $novel = Novel::findOrFail($readingList['novel_id']);
        $chapter = Chapter::findOrFail($readingList['chapter_id']);
        $force = $args['force'] ?? false;

        $rList = ReadingList::firstOrNew([
            'user_id' => $user->id,
            'novel_id' => $novel->id,
        ]);

        // Don't overwrite chapter if we are backtracking, unless we want that to happen
        if (!$rList->exists && ($force || $chapter->number > ($rList->chapter?->number ?? 0))) {
            $rList->chapter_id = $chapter->id;
            $rList->save();

            return true;
        }

        return false;
    }
}
