<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Exception;

final readonly class UserProfile
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $id = $args['id'];

        $user = User::findOrFail($id);

        if (!$user) {
            throw new Exception('User not found');
        }

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        if ($user->id != $guard->user()->id && $guard->user()->role != 'admin') {
            throw new Exception('Insufficient permission');
        }

        $is_writer = $user->role == 'writer';

        return [
            'user' => $user,
            'is_writer' => $is_writer,
            'favourites' => $user->favourites()->take(5)->get(),
            'novels' => $is_writer ? $user->novels()->get() : []
        ];
    }
}
