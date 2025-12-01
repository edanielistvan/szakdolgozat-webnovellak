<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Novel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class DeleteNovel
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user || $user != $guard->user()) {
            throw new \Exception("Unauthenticated");
        }

        $novel = Novel::where('id', $args['novelId'])
                      ->where('user_id', $user->id)
                      ->first();

        if ($novel) {
            $novel->delete();
        }

        return true;
    }
}
