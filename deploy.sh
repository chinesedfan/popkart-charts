#!/usr/bin/env sh

git checkout -b gh-pages-temp

webpack --config webpack.config.prod.js

sed -e 's#src="/#src="/popkart-charts/#g' index.html > dist/index.html

git add dist -f
git commit -m 'always force push'
git push origin HEAD:gh-pages -f

git checkout master
git branch -D gh-pages-temp
