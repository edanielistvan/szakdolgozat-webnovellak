<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class Logout
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        $user = $guard->user();
        $guard->logout();

        return $user;
    }
}
