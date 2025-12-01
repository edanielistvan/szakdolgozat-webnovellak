<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\Novel;

final readonly class LongestWebnovels
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        return Novel::with('chapters')
            ->get()
            ->sortByDesc(function($novel) {
                return $novel->chapters->sum(fn($c) => strlen($c->text));
            })
            ->take(5)
            ->values();
    }
}
