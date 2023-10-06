# エンジニア求人サイト

## 起動

```
docker compose up -d
```

## 停止

```
docker compose down
```

## front

Next.js 13
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

## 必要な環境変数

- AWS_ACCESS_KEY_ID : アクセスキー ID
- AWS_ACCOUNT_ID : アカウント ID
- AWS_REGION : リージョン
- AWS_SECRET_ACCESS_KEY : アクセスキー
