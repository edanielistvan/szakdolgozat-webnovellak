<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingList extends Model
{
    /** @use HasFactory<\Database\Factories\ReadingListFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'novel_id',
        'chapter_id',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function novel()
    {
        return $this->belongsTo(Novel::class);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
}
