#!/usr/bin/env bash
PROTO_DIR=proto
WEBAPP_DIR=generated

protoc -I=${PROTO_DIR} \
--js_out=import_style=commonjs,binary:"$WEBAPP_DIR" \
--ts_out="$WEBAPP_DIR" \
--plugin="protoc-gen-ts=./node_modules/.bin/protoc-gen-ts" \
$(find $PROTO_DIR -iname "*.proto")
for f in "$WEBAPP_DIR"/*.js
do
 echo '/* eslint-disable */' | cat - "${f}" > temp && mv temp "${f}"
done
