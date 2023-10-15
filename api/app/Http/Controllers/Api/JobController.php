<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobCollection;
use App\Http\Resources\JobResource;
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

    /**
     * 案件詳細取得
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job = Job::query()->with(["area", "languages", "skills", "engineerTypes"])->findOrFail($id);
        return  new JobResource($job);
    }
}
