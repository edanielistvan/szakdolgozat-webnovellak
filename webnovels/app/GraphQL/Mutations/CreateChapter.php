<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Novel;
use App\Models\Chapter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

final readonly class CreateChapter
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthorized");
        }

        $novel = Novel::findOrFail($args['novelId']);

        if (!$novel) {
            throw new Exception("Couldn't find novel");
        }
        
        $chapter = Chapter::create([
            'novel_id' => $novel->id,
            'number' => $args['chapterNumber'],
            'title' => "Title " . $args['chapterNumber'],
            'text' => ""
        ]);

        return $chapter->id;
    }
}
