<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Novel;

final readonly class MostLikedWebnovels
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        return Novel::orderByDesc('rating')
            ->take(5)
            ->get();
    }
}
