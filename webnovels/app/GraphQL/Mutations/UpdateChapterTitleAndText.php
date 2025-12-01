<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Novel;
use App\Models\Chapter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

final readonly class UpdateChapterTitleAndText
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception('Unauthenticated');
        }

        $chapter = Chapter::findOrFail($args['chapterId']);

        if (!$chapter) {
            throw new Exception('Chapter not found');
        }

        $chapter->title = $args['title'];
        $chapter->text = $args['text'];

        $chapter->save();

        return true;
    }
}
