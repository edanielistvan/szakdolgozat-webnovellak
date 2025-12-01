<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    /** @use HasFactory<\Database\Factories\ReportFactory> */
    use HasFactory;

    protected $fillable = [
        'comment_id',
        'reporter_id',
        'commenter_id',
    ];

    // Relationships
    public function comment()
    {
        return $this->belongsTo(Comment::class);
    }

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reporter_id');
    }

    public function commenter()
    {
        return $this->belongsTo(User::class, 'commenter_id');
    }
}
