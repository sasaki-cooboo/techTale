<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    public function jobs()
    {
        return $this->belongsToMany(Job::class)->withTimestamps();
    }

    public function skillType()
    {
        return $this->belongsTo(SkillType::class);
    }
}
