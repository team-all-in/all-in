#!/bin/sh
if git diff --quiet HEAD^ HEAD ./packages/web/; then
  exit 0;
else
  exit 1;
fi
