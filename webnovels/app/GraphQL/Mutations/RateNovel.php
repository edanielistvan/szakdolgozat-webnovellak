<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\NovelRating;
use App\Models\Novel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class RateNovel
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $novel_id = $args['novelId'];
        $rating = $args['rating'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception('You must be logged in to rate.');
        }

        $newRating = NovelRating::updateOrCreate(
            [
                'user_id' => $user->id,
                'novel_id' => $novel_id,
            ],
            [
                'rating' => $rating
            ]
        );

        $average = NovelRating::where('novel_id', $novel_id)->avg('rating');
        
        Novel::where('id', $novel_id)->update([
            'rating' => round($average, 2)
        ]);

        return [
            'exists' => true,
            'rating' => $rating
        ];
    }
}
