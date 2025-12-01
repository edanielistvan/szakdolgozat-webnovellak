<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    /** @use HasFactory<\Database\Factories\ChapterFactory> */
    use HasFactory;

    protected $fillable = [
        'novel_id',
        'number',
        'title',
        'text',
    ];

    // Relationships
    public function novel()
    {
        return $this->belongsTo(Novel::class);
    }

    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }
}
