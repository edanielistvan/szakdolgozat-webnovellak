<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Novel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;

final readonly class IncrementReads
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthorized");
        }    

        $novel = Novel::findOrFail($args['novelId']);

        $novel->reads++;

        if($novel->isDirty()) {
            $novel->save();
        }

        return true;
    }
}
