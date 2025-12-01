<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Quote;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Exception;

final readonly class DeleteQuote
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        $quote = Quote::findOrFail($args['id']);

        if ($user->role != 'admin' && $quote->user_id !== $user->id) {
            throw new Exception("Insufficient permission to delete this quote");
        }

        return $quote->delete();
    }
}
