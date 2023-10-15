<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobCollection;
use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    /**
     * 案件一覧取得
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jobs = Job::query()->with(["area", "languages", "skills", "engineerTypes"])->latest()->get();
        return new JobCollection($jobs);
    }
}
