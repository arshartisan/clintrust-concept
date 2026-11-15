#!/bin/sh
# Page-weight check for the home page.
#
# Usage:  sh scripts/measure-page-weight.sh [base-url] [path]
#         npm run build && npm run start -- --port 3210   (in one terminal)
#         sh scripts/measure-page-weight.sh [base-url]    (in another)
#
# Sums the gzip transfer size of every script and stylesheet the home page's
# HTML references, i.e. what a first-time visitor downloads before the page is
# interactive. Chunks loaded later on demand (lazy widgets, toast) are not in
# the HTML and so are not counted. The legacy polyfill chunk is served with
# `nomodule`, which modern browsers skip, so it is reported separately.
#
# Budgets are recorded in docs/sop/05-performance.md.

B=${1:-http://localhost:3210}
P=${2:-/}   # page path, e.g. /about
H=$(curl -s "$B$P")

size() { curl -s -H 'Accept-Encoding: gzip' -o /dev/null -w '%{size_download}' "$B$1"; }

legacy=$(printf '%s' "$H" | grep -o '<script[^>]*noModule[^>]*>' | grep -o '/_next/static/[^"]*\.js' | sort -u)

js=0; n=0; poly=0
for u in $(printf '%s' "$H" | grep -o '/_next/static/[^"\\ ]*\.js' | sort -u); do
  s=$(size "$u")
  if printf '%s\n' "$legacy" | grep -qx "$u"; then poly=$((poly+s)); else js=$((js+s)); n=$((n+1)); fi
done

css=0
for u in $(printf '%s' "$H" | grep -o '/_next/static/[^"\\ ]*\.css' | sort -u); do
  css=$((css+$(size "$u")))
done

html=$(size "$P")

echo "initial JS : $((js/1024)) KB gzip in $n files"
echo "CSS        : $((css/1024)) KB gzip"
echo "HTML       : $((html/1024)) KB gzip"
echo "legacy-only polyfills (nomodule, skipped by modern browsers): $((poly/1024)) KB"
