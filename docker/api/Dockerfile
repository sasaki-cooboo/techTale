FROM php:8.1-fpm-alpine

# 作業ディレクトリの設定
WORKDIR /app

# 必要なパッケージのインストール
RUN apk --update --no-cache add \
    bash \
    oniguruma-dev \
    zlib-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev

# PHP拡張モジュールのインストール
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip opcache

# デフォルトでは開発環境、ビルド時にproductionを指定して上書き
ARG ENV=development
# PHP設定ファイルのコピー
COPY docker/api/php.${ENV}.ini  /usr/local/etc/php/conf.d/php.ini

# Composerのインストール
COPY --from=composer:2.0 /usr/bin/composer /usr/bin/composer

COPY api/ /app/

RUN composer install
RUN chmod -R a+w /app/storage/ /app/bootstrap/cache/ /app/vendor/
