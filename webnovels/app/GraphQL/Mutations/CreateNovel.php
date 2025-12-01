<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Novel;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

final readonly class CreateNovel
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthorized");
        }

        $tagList = [];

        foreach($args['tags'] as $tag) {
            $found = Tag::where('slug', Str::slug($tag))->first();

            if (!$found) {
                $found = Tag::create([
                    'name' => $tag
                ]);
            }

            array_push($tagList, $found->id);
        }

        $novel = Novel::create([
            'user_id' => $user->id,
            'title' => $args['title'],
            'image' => $args['image'] ?? null,
            'description' => $args['description'] ?? null
        ]);

        if(!empty($tagList)) {
            $novel->tags()->sync($tagList);
        }

        return true;
    }
}
