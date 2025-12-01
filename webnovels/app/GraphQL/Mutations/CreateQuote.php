<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Quote;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Exception;

final readonly class CreateQuote
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $input = $args['input'];

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if(!$user) {
            throw new Exception("Unauthenticated");
        }
        
        $quote = Quote::create([
            'user_id' => $user->id,
            'novel_id' => $input['novel_id'],
            'chapter_id' => $input['chapter_id'],
            'quote' => $input['quote'],
            'chapter_number' => $input['chapter_number'],
        ]);

        return $quote->id;
    }
}
