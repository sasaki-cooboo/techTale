<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use App\Services\JobService;

class JobServiceTest extends TestCase
{
    public function test_重複削除()
    {
        $jobService = new JobService();

        // テスト用のデータを作成
        $historyCollection = collect([1, 2, 3, 2, 4, 5, 3]);

        // removeDuplicateHistory メソッドを呼び出し
        $result = $jobService->removeDuplicateHistory($historyCollection);

        // 期待される結果を定義
        $expected = [1, 2, 4, 5, 3];

        // 結果と期待値を比較
        $this->assertEquals($expected, $result);
    }
}
