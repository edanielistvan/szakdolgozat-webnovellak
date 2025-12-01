<?php declare(strict_types=1);

namespace App\GraphQL\Mutations;

use App\Models\Novel;
use App\Models\Chapter;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

final readonly class ReorderChapters
{
    /** @param  array{}  $args */
    public function __invoke(null $_, array $args)
    {
        $guard = Auth::guard(Arr::first(config('sanctum.guard')));
        $user = $guard->user();

        if (!$user) {
            throw new Exception("Unauthorized");
        }

        $chapterOrders = $args['reorder'];

        if (empty($chapterOrders)) {
            return true;
        }

        $novelId = $chapterOrders[0]['novelId'] ?? null;
        
        if (!$novelId) {
            throw new Exception("Novel ID is missing in the reorder input.");
        }

        $novel = Novel::findOrFail($novelId);

        if ($novel->user_id !== $user->id) {
            throw new Exception("You do not have permission to modify this novel's chapters.");
        }

        $orderMap = collect($chapterOrders)->keyBy('id');

        $chapterIdsToUpdate = $orderMap->keys()->toArray();

        $validChapters = Chapter::whereIn('id', $chapterIdsToUpdate)
                                ->where('novel_id', $novelId)
                                ->get();

        DB::transaction(function () use ($validChapters, $orderMap) {
            foreach ($validChapters as $chapter) {
                $chapter->number = -$chapter->number; 
                $chapter->save();
            }

            foreach ($validChapters as $chapter) {
                // Get the new order number from the prepared map
                $newNumber = $orderMap->get($chapter->id)['number'];
                
                // Update the model instance
                $chapter->number = (int)$newNumber;
                $chapter->save();
            }
        });

        return true;
    }
}
