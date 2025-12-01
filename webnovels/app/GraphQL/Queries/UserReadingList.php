<?php declare(strict_types=1);

namespace App\GraphQL\Queries;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Arr;
use Exception;

final readonly class UserReadingList
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $id = $args['id'];

        $user = User::findOrFail($id);

        $guard = Auth::guard(Arr::first(config('sanctum.guard')));

        if ($user->id != $guard->user()->id && $guard->user()->role != 'admin') {
            throw new Exception('Insufficient permission');
        }

        return $user->readingLists()->get()->map(function($rList) {
            return [
                'id' => $rList->id,
                'novel_id' => $rList->novel_id,
                'novel_title' => $rList->novel->title,
                'chapter_id' => $rList->chapter_id,
                'chapter_title' => $rList->chapter->title,
                'chapter_number' => $rList->chapter->number,
                'chapters_max' => $rList->novel->chapters()->max('number'),
            ];
        });
    }
}
