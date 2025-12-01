<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Exception;

final readonly class Login
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        $authData = [
            'email' => $args['input']['email'],
            'password' => $args['input']['password']
        ];

        if (!$guard->attempt($authData)) {
            throw new Exception("Invalid credentials.");
        }

        $user = $guard->user();

        if ($user->banned) {
            $guard->logout();
            throw new Exception("User is banned.");
        }

        assert($user instanceof User, 'Since we successfully logged in, this can no longer be `null`.');

        return $user;
    }
}
