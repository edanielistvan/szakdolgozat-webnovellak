<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Quote;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Nuwave\Lighthouse\Support\Exceptions\Error;
use Exception;

final readonly class UserQuotes
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $userId = $args['user_id'];

        $user = User::findOrFail($userId);

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        if ($user->id != $guard->user()->id && $guard->user()->role != 'admin') {
            throw new Exception('Insufficient permission');
        }

        return Quote::where('user_id', $userId)
            ->with(['novel', 'chapter', 'user'])
            ->get();
    }
}
