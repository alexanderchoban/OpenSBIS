FROM postgres:9
RUN apt update -y && apt install -y dos2unix
WORKDIR /docker-entrypoint-initdb.d/
COPY . .
RUN dos2unix *.sh