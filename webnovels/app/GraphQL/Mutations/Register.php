<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Exception;

final readonly class Register
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $input = $args['input'];

        if ($input['password'] !== $input['password_confirmation']) {
            throw new Exception("Password confirmation does not match");
        }

        $user = User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'role' => 'reader'
        ]);

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        $authData = [
            'email' => $input['email'],
            'password' => $input['password']
        ];

        if (!$guard->attempt($authData)) {
            throw new Exception("Couldn't login.");
        }

        assert($user instanceof User, 'Since we successfully logged in, this can no longer be `null`.');

        return $user;
    }
}
