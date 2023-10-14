<?php

namespace App\Console\Commands;

use App\Models\Job;
use Illuminate\Console\Command;

class UpdateJobCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '案件修正コマンド';

    private $required_skills = [
        "Webアプリケーションサービス開発経験（2年以上）",
        "Gitでのチーム開発経験",
        "テックリード経験",
        "AWSでのアプリケーション開発経験",
        "要件定義～テスト開発実務経験（３年以上）",
        "システム運用実績（1年以上）",
        "Webアプリケーションの設計 / 運用経験",
        "SQLでのデータ抽出経験",
        "非エンジニアの要望をヒアリングし、仕様案を作成した経験",
        "チームでの開発経験",
        "新規サービスの開発からリリースまでの経験",
        "基本設計以降の一貫した経験",
        "パフォーマンスを考慮した設計経験",
        "単体テストフレームワークでの開発実績",
        "フレームワークでの開発実績",
        "言語問わず、2つ以上の言語での開発実務経験（3年以上）",
        "運用改善の実務経験",
        "システムメンテナンスの実務経験",
        "アジャイルでの開発実務経験",
        "MySQLなどのDB使用経験",
        "AWS環境でのサーバ構築経験",
        "API開発経験",
        "Webサービスの開発運用経験（1年以上）",
        "要件定義 / 基本設計 / 詳細設計経験（3年以上）"
    ];

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $jobCount = Job::count();
        // 10個ほど多めに実行しておく
        for ($i = 1; $i < $jobCount + 10; $i++) {
            shuffle($this->required_skills);
            Job::query()->where("id", $i)->update([
                'required_skills' => json_encode([$this->required_skills[0], $this->required_skills[1], $this->required_skills[2]]),
            ]);
        }
        $this->info('Bulk update completed.');
        return Command::SUCCESS;
    }
}
