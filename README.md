# エンジニア求人サイト

ローカル環境では docker、デプロイには serverless を使用しています。

## 機能一覧

### 案件一覧

- 一覧表示
- フリーワード検索
- 条件で絞り込み
- 絞り込み条件の表示
- ソート
- ページネーション
- ブックマーク

### 案件詳細

- 詳細表示
- 閲覧履歴

## 使用技術

### フロントエンド

- Next.js 12
- mui
- jotai

### バックエンド

- Laravel 9
- bref （デプロイ用）

## 起動

```
docker compose up -d
```

## 停止

```
docker compose down
```

## front

Next.js 12
node サーバー立てています

```
docker compose exec front bash
```

でコンテナに入る

## api

Laravel 9

```
docker compose exec api bash
```

でコンテナに入る

## nginx

fastcgi_pass で api の 9000 番ポート を指定

## デプロイ

- front

```
cd front && components-v1
```

- api

```
cd api && serverless deploy
```

## 便利コマンド

### API のルートを確認したい

```
cd api && serverless bref:cli --args="route:list"
```

### マイグレーションしたい

```
cd api && serverless bref:cli --args="migrate --force"
```
