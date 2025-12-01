<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Novel extends Model
{
    /** @use HasFactory<\Database\Factories\NovelFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'rating',
        'image',
        'description',
        'reads',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    public function readingLists()
    {
        return $this->hasMany(ReadingList::class);
    }

    public function favouritesOf()
    {
        return $this->belongsToMany(User::class, 'favourites');
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'novel_tag');
    }

    public function ratings()
    {
        return $this->hasMany(NovelRating::class);
    }

    public function ratedByUsers()
    {
        return $this->belongsToMany(User::class, 'novel_ratings')
                    ->withPivot('rating')
                    ->withTimestamps();
    }

    public function getChaptersCountAttribute(): int
    {
        return $this->chapters()->count();
    }

    public function getFavouritesCountAttribute(): int {
        return $this->favouritesOf()->count();
    }

    public function getCommentsCountAttribute(): int {
        return $this->comments()->count();
    }

    public function getAuthorAttribute(): string {
        return $this->user()->name;
    }

    public function getTagStringAttribute(): string {
        return $this->tags->pluck('name')->join('|');
    }
}
