<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class RequestWriterRole
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthenticated");
        }

        if ($user->role !== 'reader') {
            throw new Exception("Only readers can request writer role.");
        }

        $user->writer_request = true;
        $user->save();

        return true;
    }
}
