<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class ToggleBanUser
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception('Unauthenticated');
        }

        if ($user->role != 'admin') {
            throw new Exception('Unauthorized');
        }

        $user = User::findOrFail($args['userId']);

        $user->banned = !$user->banned;
        $user->save();

        return true;
    }
}
