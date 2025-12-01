<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class SwapUserRole
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

        // Swap role
        if ($user->role === 'reader') {
            $user->role = 'writer';
            $user->writer_request = false;
        }
        else if ($user->role === 'writer') {
            $user->role = 'reader';
        }

        $user->save();

        return true;
    }
}
