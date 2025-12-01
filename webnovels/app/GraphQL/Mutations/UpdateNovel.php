<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Novel;
use App\Models\Tag;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

final readonly class UpdateNovel
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

        if ($novel->user_id !== $user->id) {
            throw new Exception("You do not have permission to update this novel.");
        }

        $novel->fill(collect($args)->only(['title', 'image', 'description'])->toArray());

        if($novel->isDirty()) {
            $novel->save();
        }

        if (isset($args['tags'])) {
            $tagIds = [];
            
            foreach($args['tags'] as $tag) {
                $found = Tag::where('slug', Str::slug($tag))->first();

                if (!$found) {
                    $found = Tag::create([
                        'name' => $tag
                    ]);
                }

                array_push($tagList, $found->id);
            }

            $novel->tags()->sync($tagIds);
        }

        $tagList = [];

        return true;
    }
}
