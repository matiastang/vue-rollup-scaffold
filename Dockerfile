FROM nginx
LABEL version="1.0.0"
LABEL maintainer="matias"
LABEL description="西筹金融科技开放平台前端项目"
COPY build/ /app/front/build/
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN echo 'front images build ok!'