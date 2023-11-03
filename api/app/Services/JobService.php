<?php

namespace App\Services;

use App\Models\Job;
use Illuminate\Support\Facades\DB;

class JobService
{
    /**
     * 閲覧した案件を最新4件取得する
     * 
     * @param mixed $historyCollection 案件idのコレクション
     * 
     * @return mixed 案件のコレクション
     */
    public function getHistoryJobs($historyCollection): mixed
    {
        return
            Job::query()
            ->with(["area", "languages", "skills", "engineerTypes"])->whereIn("id", $historyCollection)
            ->orderByRaw(DB::raw("FIELD(id, " . implode(',', $historyCollection->toArray()) . ")"))
            ->take(4)->get();
    }
}
