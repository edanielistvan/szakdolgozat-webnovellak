<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Userl;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class GetAuthorNovels
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $user_id = $args['userId'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user || $user->id != $user_id) {
            throw new Exception('You must be logged in to see your novels.');
        }

        return $user->novels()->get();
    }
}
