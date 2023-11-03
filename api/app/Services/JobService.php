<?php

namespace App\Services;

use App\Models\Job;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class JobService
{
    /**
     * 閲覧した案件を最新4件取得する
     * 
     * @param Collection $historyCollection 案件idのコレクション
     * 
     * @return Collection 案件のコレクション
     */
    public function getHistoryJobs(Collection $historyCollection): Collection
    {
        return
            Job::query()
            ->with(["area", "languages", "skills", "engineerTypes"])->whereIn("id", $historyCollection)
            ->orderByRaw(DB::raw("FIELD(id, " . implode(',', $historyCollection->toArray()) . ")"))
            ->take(4)->get();
    }
}
