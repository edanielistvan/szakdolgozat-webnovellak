<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\NovelRating;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class DeleteRating
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $novel_id = $args['novelId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception('You must be logged in to check ratings.');
        }

        $rating = NovelRating::where('user_id', $user->id)
            ->where('novel_id', $novel_id)
            ->first();

        if ($rating) {
            $rating->delete();
        }

        return [
            'exists' => false,
            'rating' => null
        ];
    }
}
