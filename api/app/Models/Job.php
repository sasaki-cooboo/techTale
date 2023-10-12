<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = ["title", "cost", "description", "required_skills", "message"];

    public function languages()
    {
        return $this->belongsToMany(Language::class)->withTimestamps();
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, "job_feature")->withTimestamps();
    }

    public function areas()
    {
        return $this->belongsToMany(Area::class, "job_area")->withTimestamps();
    }

    public function engineerTypes()
    {
        return $this->belongsToMany(EngineerType::class, "job_engineer_type")->withTimestamps();
    }

    public function skills()
    {
        return $this->belongsToMany(Skill::class)->withTimestamps();
    }
}
