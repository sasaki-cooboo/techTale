<?php

namespace App\Console\Commands;

use App\Models\Area;
use App\Models\EngineerType;
use App\Models\Feature;
use App\Models\Job;
use App\Models\Language;
use App\Models\Skill;
use App\Services\BatchProcessingService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Faker\Factory as Faker;

class CreateJobCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create:job';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = '案件作成コマンド';

    private $descriptions = ["自社のECサイト開発をご担当いただきます。", "人材業界向けのポータルシステム開発をご担当いただきます。", "某テレビ局の動画配信サイト開発をご担当いただきます。", "某テレビ局の動画配信サイト開発をご担当いただきます。", "マッチングサービスのWebアプリ開発をご担当いただきます。", "従業員勤怠管理システムの開発をご担当いただきます。", "某不動産サービスの新規機能開発をご担当いただきます。", "BtoB向けのM&Aプラットフォーム開発をご担当いただきます。", "某家電レンタルサービスの開発をご担当いただきます。", "ECサイト開発プロジェクトにて、PLポジションをご担当いただきます。"];

    private $messages = ["リモートでの作業を想定しておりますので、リモート案件をお探しの方にもおすすめです。", "関係部署と連携しながら作業していただくため、積極的にコミュニケーションを取っていける方にマッチします。", "長期プロジェクトを想定しておりますので、腰を据えての参画を希望されている方にもおすすめです。", "関係部署と連携しながら作業していただきますので、コミュニケーションを取りながらの作業が得意な方にマッチします。", "風通しが良く、積極的に新しい技術や提案を取り入れる環境ですのでモダンな環境でスキルアップしたい方にもおすすめです。", "フルスタックエンジニアとしてのご経験が豊富な方、チームでコミュニケーションを取りながらの作業が得意な方によりマッチします。", "将来的に新サービスの展開も視野にいれており、コミュニケーションが良好な現場ですので切磋琢磨しながらスキルアップしていきたい方におすすめです。", "新規機能開発の設計 / 実装を担当いただきます。TypeScriptなどの開発経験が豊富な方にマッチします。", "某大手事業会社での案件です。風通しのいい環境で働きたい方におすすめです。", "リーダー経験を積んでいきたい方にもおすすめの環境です。基本的にリモートでの作業を想定しております。"];

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

    private const TIMES = 1;

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(BatchProcessingService $batchProcessingService)
    {
        $faker = Faker::create();


        for ($i = 0; $i < self::TIMES; $i++) {

            $languages = Language::inRandomOrder()
                ->take(2)->get();
            $language1 = $languages->get(0);
            $language2 = $languages->get(1);

            $title = $batchProcessingService->getJobTitle($language1->name . " " . $language2->name);
            $now = Carbon::now();

            $randomNumber = $faker->numberBetween(100000, 1000000);
            $cost = floor($randomNumber / 100000) * 100000;
            shuffle($this->required_skills);
            $job = Job::create([
                'title' => $title,
                'cost' => $cost,
                'description' => $this->descriptions[rand(0, count($this->descriptions) - 1)],
                // 必要なスキルはランダムに3つ抽出する
                'required_skills' => json_encode([$this->required_skills[0], $this->required_skills[1], $this->required_skills[2]]),
                'message' => $this->messages[rand(0, count($this->messages) - 1)],
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $featureIds = Feature::all()->pluck("id")->toArray();
            $areaIds = Area::all()->pluck("id")->toArray();
            $engineerIds = EngineerType::all()->pluck("id")->toArray();
            $skillIds = Skill::all()->pluck("id")->toArray();

            // 言語は最大2つ
            $job->languages()->syncWithoutDetaching([$language1->id, $language2->id]);

            // 特徴は最大5つ
            $featureId1 = $featureIds[rand(0, count($featureIds) - 1)];
            $featureId2 = $featureIds[rand(0, count($featureIds) - 1)];
            $featureId3 = $featureIds[rand(0, count($featureIds) - 1)];
            $featureId4 = $featureIds[rand(0, count($featureIds) - 1)];
            $featureId5 = $featureIds[rand(0, count($featureIds) - 1)];
            $job->features()->syncWithoutDetaching([$featureId1, $featureId2, $featureId3, $featureId4, $featureId5]);

            // 地域は最大2つ
            $areaId1 = $areaIds[rand(0, count($areaIds) - 1)];
            $areaId2 = $areaIds[rand(0, count($areaIds) - 1)];
            $job->areas()->syncWithoutDetaching([$areaId1, $areaId2]);

            // 職種は最大2つ
            $engineerId1 = $engineerIds[rand(0, count($engineerIds) - 1)];
            $engineerId2 = $engineerIds[rand(0, count($engineerIds) - 1)];
            $job->engineerTypes()->syncWithoutDetaching([$engineerId1, $engineerId2]);

            // スキルは最大3つ
            $skillId1 = $skillIds[rand(0, count($skillIds) - 1)];
            $skillId2 = $skillIds[rand(0, count($skillIds) - 1)];
            $skillId3 = $skillIds[rand(0, count($skillIds) - 1)];
            $job->skills()->syncWithoutDetaching([$skillId1, $skillId2, $skillId3]);
        }

        $this->info('Bulk insert completed.');
        return Command::SUCCESS;
    }
}
