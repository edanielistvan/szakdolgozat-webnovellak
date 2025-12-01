<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NovelRating extends Model
{
    /** @use HasFactory<\Database\Factories\NovelRatingFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'novel_id',
        'rating'
    ];

    public function novel()
    {
        return $this->belongsTo(Novel::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
