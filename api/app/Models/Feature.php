<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    public function jobs()
    {
        return $this->belongsToMany(Job::class, "job_feature")->withTimestamps();
    }
}
