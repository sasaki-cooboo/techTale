FROM nginx:1.22-alpine3.17-slim

ENV PHP_HOST=127.0.0.1

COPY docker/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

CMD /bin/sh -c 'sed "s/\${PHP_HOST}/${PHP_HOST}/" /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g "daemon off;"'