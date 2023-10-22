<?php

namespace App\Console\Commands;

use App\Models\Job;
use Carbon\Carbon;
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

    private $descriptions = [
        "最新のテクノロジーを駆使したECサイトの開発をリードします。",
        "人材業界向けの革新的なポータルシステムの開発に携わります。",
        "トップティアのテレビ局の動画配信サイト開発に挑戦しましょう。",
        "業界リーダーのテレビ局の動画配信サイト開発プロジェクトに参加します。",
        "新たなマッチングサービスのWebアプリ開発を手掛けます。",
        "革新的な従業員勤怠管理システムの開発を担当いたします。",
        "某不動産サービスの魅力的な新規機能開発をリードします。",
        "BtoB向けのM&Aプラットフォームの開発に尽力します。",
        "家電レンタルサービスの未来を築くための開発プロジェクトに参加しましょう。",
        "ECサイト開発プロジェクトにおいて、PLポジションで活躍します。",
        "ブロックチェーンテクノロジーを駆使した次世代のECサイト開発を主導します。",
        "人材業界向けの革新的な採用プラットフォームを開発するチームで活動します。",
        "大手メディア企業の動画ストリーミングプラットフォームの開発に挑戦します。",
        "業界有数のテレビ局の動画配信サイト開発プロジェクトに参加します。",
        "新しいマッチングサービスのプロトタイプを開発し、市場に投入します。",
        "某有名企業の従業員勤怠管理システムの革新的なアップグレードを担当します。",
        "不動産テクノロジーの分野で革新的な新規機能を開発します。",
        "BtoBセクター向けのM&Aプラットフォームの開発に携わります。",
        "家電レンタルサービスの新商品ラインの開発に注力します。",
        "ECサイト開発プロジェクトの成功をリードするPLポジションに就きます。",
        "ブロックチェーン技術を活用した新たなECサイトのプロトタイプ開発を担当します。",
        "人材業界向けの最先端のキャリアマッチングプラットフォームの開発を主導します。",
        "トップメディア企業の動画コンテンツプラットフォームの拡張開発に従事します。",
        "業界トップのテレビ局の動画配信サイト開発プロジェクトに参加します。",
        "新しいマッチングサービスのWebアプリの革新的なデザインと実装に携わります。",
        "優れた従業員勤怠管理システムの開発とカスタマイズを担当します。",
        "不動産テクノロジーの分野での新たな機能の開発に取り組みます。",
        "BtoB向けのM&Aプラットフォームの新機能の開発に参加します。",
        "家電レンタルサービスの新規プロジェクトの開発を主導します。",
        "ECサイト開発プロジェクトにおいて、PLポジションで中心的な役割を果たします。",
        "ブロックチェーンテクノロジーを活用した新しいECサイトの開発プロジェクトに参加します。",
        "人材業界向けの次世代採用プラットフォームの開発を主導します。",
        "テレビ局の動画ストリーミングサービスの拡張開発に従事します。",
        "業界トップのテレビ局の動画配信サイト開発プロジェクトに参加しましょう。",
        "新しいマッチングサービスのWebアプリの開発と改善を担当します。",
        "従業員勤怠管理システムの効率化と革新的な新機能の開発に尽力します。",
        "不動産テクノロジーの分野での次世代機能の設計と実装に従事します。",
        "BtoB向けのM&Aプラットフォームの拡張開発とカスタマイズをリードします。",
        "家電レンタルサービスの新たなプロジェクトの戦略的開発に取り組みます。",
        "ECサイト開発プロジェクトにおいて、プロジェクトリーダーとして活躍します。",
        "ブロックチェーンテクノロジーを活用した新たなECサイトのプロジェクトに挑戦しましょう。",
        "人材業界向けの未来のキャリアプラットフォームの開発をリードします。",
        "トップメディア企業の動画コンテンツプラットフォームの最新機能の設計と実装に参加します。",
        "業界有数のテレビ局の動画配信サイト開発プロジェクトに参加します。",
        "新しいマッチングサービスのユーザーエクスペリエンスの向上に尽力します。",
        "従業員勤怠管理システムの最新技術の導入と改良を担当します。",
        "不動産テクノロジーの分野での新機能の設計と革新的な開発に注力します。",
        "BtoB向けのM&Aプラットフォームの革新的な新機能の開発を主導します。",
        "家電レンタルサービスの成長戦略の一環として新プロジェクトをリードします。",
        "ECサイト開発プロジェクトにおいて、リーダーシップを発揮します。",
        "ブロックチェーンテクノロジーを活用した次世代ECサイトのプロジェクトに挑戦しましょう。",
        "人材業界向けの革新的な採用プラットフォームの開発を主導します。",
        "テレビ局の動画ストリーミングサービスの拡張開発に挑戦しましょう。",
        "業界トップのテレビ局の動画配信サイト開発プロジェクトに参加します。",
        "新しいマッチングサービスのWebアプリのユーザビリティ向上を担当します。",
        "従業員勤怠管理システムの革新的な新機能の開発と導入に尽力します。",
        "不動産テクノロジーの分野での新たな機能の設計と実装を担当します。",
        "BtoB向けのM&Aプラットフォームの新機能の開発と最適化に尽力します。",
        "家電レンタルサービスの新しいプロジェクトの成功に貢献します。",
        "ECサイト開発プロジェクトにおいて、プロジェクトの成功を牽引します。",
        "ブロックチェーンテクノロジーを活用した新たなECサイトの開発に主導的に参加します。",
    ];

    private $messages = [
        "リモートワークをサポートしており、遠隔からの参加を歓迎しています。",
        "チームとの協力が必要なプロジェクトで、コミュニケーション力を活かせます。",
        "長期のプロジェクトにご参加いただける方を募集しています。",
        "協力して作業するため、コミュニケーションスキルが活かせます。",
        "最新のテクノロジーを積極的に採用し、スキルアップのチャンスが豊富です。",
        "フルスタックエンジニア経験がある方やチームプレイヤーの方にぴったりです。",
        "新しいサービスの展開を予定しており、刺激的な環境で成長できます。",
        "TypeScriptなどのスキルを持つエンジニアにおすすめです。",
        "大手事業会社のプロジェクトで、風通しのいい環境で働けます。",
        "リーダーシップ経験を積んでキャリアを発展させたい方に最適です。",
        "リモートワークをサポートしていますので、遠隔からの応募も歓迎します。",
        "プロジェクトの成功のために積極的なコミュニケーションが求められます。",
        "プロジェクトの長期参画をお考えの方、お待ちしています。",
        "チームと連携して作業するため、コミュニケーションスキルが重要です。",
        "最新のテクノロジーを積極的に採用し、スキルの向上に貢献できます。",
        "フルスタックエンジニアとしての豊富な経験を活かすチャンスです。",
        "新しいサービスの展開に参加し、成長の機会をつかみましょう。",
        "TypeScriptや他のプログラミング言語のスキルを活かすプロジェクトです。",
        "大手事業会社の案件で、風通しのいい環境で働けます。",
        "リーダーとしてのスキルを磨きたい方におすすめの環境です。",
        "リモートでの効率的な作業をサポートしています。",
        "チームと協力してプロジェクトを成功に導ける方を募集中です。",
        "長期のプロジェクトにご参加いただける方を歓迎しています。",
        "コミュニケーションを大切にし、プロジェクトを成功に導ける方を探しています。",
        "最新のテクノロジーを駆使して、スキルアップの機会を提供します。",
        "フルスタックエンジニアの方やチームプレイヤーの方、ご応募お待ちしています。",
        "新しいサービスの展開に関与し、スキルを高めていける環境です。",
        "TypeScriptなどのスキルを活かしてプロジェクトに参加しませんか？",
        "大手企業のプロジェクトで、風通しのいい環境での作業が可能です。",
        "リーダーとしての経験を積みたい方に最適なプロジェクトです。",
        "リモートワークが可能な案件で、柔軟な働き方を実現できます。",
        "チームとの協力が必要なプロジェクトで、コミュニケーション力を発揮できます。",
        "プロジェクトの持続的な参加を歓迎し、ステップアップの機会を提供します。",
        "協力して作業するため、コミュニケーションスキルを活かせます。",
        "新たな技術とアイデアを積極的に取り入れ、スキル向上をサポートします。",
        "フルスタックエンジニアとしての経験を持つ方やチームプレイヤーの方に適しています。",
        "新しいサービスの展開を視野に入れ、刺激的な環境で成長できます。",
        "新機能の設計と実装に携わるプロジェクトで、高い開発スキルを持つ方にマッチします。",
        "大手事業会社の案件で、風通しのいい環境で働くチャンスです。",
        "リーダーシップの機会を提供し、成長を目指す方にぴったりです。",
        "リモートワークをサポートしており、遠隔からの応募も歓迎しています。",
        "プロジェクトの成功に向けたコミュニケーションが必要です。",
        "長期プロジェクトに参画し、専門知識を活かせる環境です。",
        "協力して作業するため、コミュニケーションスキルが重要です。",
        "新しいテクノロジーを積極的に採用し、スキルアップをサポートします。",
        "フルスタックエンジニアとしての経験を生かし、チームでの成功に貢献できます。",
        "新しいサービスの展開に参加し、キャリアを発展させましょう。",
        "TypeScriptなどのスキルを活かして、プロジェクトに貢献できます。",
        "大手企業の案件で、風通しのいい環境で働く機会があります。",
        "リーダーとしてのスキルを磨きたい方に最適なプロジェクトです。",
        "リモートワークをサポートしており、柔軟な働き方が可能です。",
        "協力してプロジェクトを成功に導ける方を歓迎します。",
        "長期プロジェクトに参加し、専門知識を活かすチャンスがあります。",
        "コミュニケーションを大切にし、プロジェクトの成功に貢献する方を探しています。",
        "最新のテクノロジーを駆使して、スキルアップを応援します。",
        "フルスタックエンジニアの方やチームプレイヤーの方、お待ちしています。",
        "新しいサービスの展開に参加し、成長の機会をつかみましょう。",
        "TypeScriptや他のプログラミング言語のスキルを活かしてプロジェクトに参加しませんか？",
        "大手企業の案件で、風通しのいい環境での作業が可能です。",
        "リーダーとしての経験を積みたい方におすすめのプロジェクトです。",
    ];

    private $required_skills = [
        "Webアプリケーションの開発経験（2年以上）",
        "Gitでのチーム開発経験",
        "テックリード経験",
        "AWSでのアプリケーション開発経験",
        "要件定義からテスト開発までの実務経験（3年以上）",
        "システム運用経験（1年以上）",
        "Webアプリケーションの設計と運用経験",
        "SQLを使用したデータ抽出経験",
        "非エンジニアからの要望をヒアリングし、仕様案を作成した実績",
        "チームでの協力開発経験",
        "新規サービスの開発からリリースまでの実績",
        "基本設計から実装までの一貫した経験",
        "パフォーマンスを考慮した設計実績",
        "単体テストフレームワークを使用した開発経験",
        "フレームワークを使用した開発実績",
        "2つ以上のプログラミング言語での実務経験（3年以上）",
        "運用プロセスの改善実務経験",
        "システムメンテナンスの実務経験",
        "アジャイル開発の実務経験",
        "データベースの使用経験（例: MySQL）",
        "AWS環境でのサーバー構築実績",
        "APIの設計および開発経験",
        "Webサービスの開発と運用経験（1年以上）",
        "要件定義、基本設計、詳細設計の実務経験（3年以上）",
        "フロントエンド開発（HTML/CSS/JavaScript）のスキル",
        "セキュリティの実装とテスト経験",
        "データベース管理と最適化の実務経験",
        "コーディングスタイルとコードレビューの実務経験",
        "CI/CDパイプラインの設計と運用経験",
        "ユーザビリティテストの計画と実施経験",
        "バックエンド開発（Node.js, Python, Javaなど）のスキル",
        "モバイルアプリケーションの開発経験（iOS/Android）",
        "自動化テストツールの使用経験（例: Selenium, Appium）",
        "クラウドプラットフォーム（例: Azure, Google Cloud）での経験",
        "データ分析とビジュアライゼーションのスキル（例: Tableau, Power BI）",
        "プロジェクトマネジメントの知識と経験",
        "コミュニケーションスキルとプレゼンテーション能力",
        "ソフトウェアアーキテクチャ設計の実務経験",
        "データベース設計とクエリの最適化実績",
        "マルチサイト、マイクロサービスアーキテクチャの実務経験",
        "コーディングスキルとアルゴリズムの知識",
        "ソフトウェアテストとデバッグの実務経験",
        "ユーザーエクスペリエンス（UX）デザインの理解と協力経験",
        "データセキュリティとプライバシーの知識",
        "テクニカルドキュメンテーションのスキル",
        "新技術とトレンドに関する常に学習し続ける姿勢",
    ];

    private const COUNT = 1;

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        for ($i = 1; $i < self::COUNT; $i++) {
            shuffle($this->required_skills);
            Job::where("id", $i)->update([
                'description' => $this->descriptions[rand(0, count($this->descriptions) - 1)],
                'required_skills' => json_encode([$this->required_skills[0], $this->required_skills[1], $this->required_skills[2]]),
                'message' => $this->messages[rand(0, count($this->messages) - 1)],
                'updated_at' => Carbon::now(),
            ]);
        }
        $this->info('Bulk update completed.');
        return Command::SUCCESS;
    }
}
