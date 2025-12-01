<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'banned',
        'password_reset',
        'writer_request',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'banned' => 'boolean',
            'password_reset' => 'boolean',
        ];
    }

    // Relationships
    public function novels() {
        return $this->hasMany(Novel::class);
    }

    public function readingLists()
    {
        return $this->hasMany(ReadingList::class);
    }

    public function favourites()
    {
        return $this->belongsToMany(Novel::class, 'favourites')
                    ->withTimestamps();
    }

    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }

    public function novelRatings()
    {
        return $this->hasMany(NovelRating::class);
    }

    public function ratedNovels()
    {
        return $this->belongsToMany(Novel::class, 'novel_ratings')
                    ->withPivot('rating')
                    ->withTimestamps();
    }
}
