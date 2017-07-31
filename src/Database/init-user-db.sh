#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 -v newuser=$IDSRV_USER -v newpasswd=\'$IDSRV_PASSWD\' --username "$POSTGRES_USER" <<-EOSQL
	CREATE USER :newuser WITH PASSWORD :newpasswd;
	CREATE DATABASE :newuser;
	GRANT ALL PRIVILEGES ON DATABASE :newuser TO :newuser;
EOSQL