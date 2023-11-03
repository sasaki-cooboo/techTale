<?php

namespace App\Services;

use App\Models\Job;
use Illuminate\Support\Collection;
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
        if ($historyCollection->isEmpty()) {
            // 履歴がない場合
            return collect([]);
        }
        return
            Job::query()
            ->with(["area", "languages", "skills", "engineerTypes"])->whereIn("id", $historyCollection)
            ->orderByRaw(DB::raw("FIELD(id, " . implode(',', $historyCollection->toArray()) . ")"))
            ->take(4)->get();
    }

    /**
     * 閲覧した案件をセッションに保存する
     * 
     * @param int $id 案件id
     * @param Collection $historyCollection 案件idのコレクション
     * 
     * @return void
     */
    public function setHistoryToSession(int $id, Collection $historyCollection): void
    {
        // 先頭に新しい履歴idを追加
        $newHistoryCollection = $historyCollection->prepend($id);
        // 新しい順で重複削除し保存。values->allでキーをリセット
        // uniqueの前後でreverseし、重複のものは最新にする
        $uniqHistory = $newHistoryCollection->reverse()->unique()->reverse()->values()->all();
        session(['job_history_views' => $uniqHistory]);
    }
}
