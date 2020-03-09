FROM node:12 AS builder

ENV DIR /var/www

WORKDIR $DIR
COPY . $DIR
RUN npm ci --unsafe-perm .
RUN npm run build
RUN cp serve.json build/

FROM nginx:stable-alpine
ADD nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /var/www/build /var/www
CMD nginx -g 'daemon off;'
