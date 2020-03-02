FROM node:12

ENV DIR /var/www

WORKDIR $DIR
COPY . $DIR
RUN npm ci --unsafe-perm .
RUN npm run build
RUN cp serve.json build/

EXPOSE 7000

CMD npm run serve -n
