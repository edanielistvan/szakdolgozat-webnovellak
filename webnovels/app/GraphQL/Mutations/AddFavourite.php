<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Favourite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class AddFavourite
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $novel_id = $args['novelId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if(!$user) {
            throw new Exception("Unauthenticated");
        }

        $favourite = Favourite::where('user_id', $user->id)
                                ->where('novel_id', $novel_id)
                                ->first();

        if (!$favourite) {
            $favourite = Favourite::create([
                'user_id' => $user->id,
                'novel_id' => $novel_id,
            ]);
        }

        return true;
    }
}
