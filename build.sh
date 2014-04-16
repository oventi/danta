clear

echo "Building danta"

echo "-- Cleaning up"
rm danta.min.css 2> /dev/null
rm danta.min.js 2> /dev/null

touch danta.min.css
touch danta.min.js

################################################################################

echo "-- Getting bootstrap css"
wget "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" -qO bootstrap.min.css

echo "-- Getting underscore js"
wget "http://underscorejs.org/underscore-min.js" -qO underscore.min.js

echo "-- Getting zepto js"
wget "http://zeptojs.com/zepto.min.js" -qO zepto.min.js

################################################################################

echo "-- Building css"
cat bootstrap.min.css >> danta.min.css
cat danta.css >> danta.min.css

echo "-- Building js"
cat underscore.min.js >> danta.min.js
cat zepto.min.js >> danta.min.js

jsmin < danta.js >> danta.min.js
jsmin < danta.config.js >> danta.min.js
jsmin < danta.remote.js >> danta.min.js
jsmin < danta.ui.js >> danta.min.js
jsmin < danta.ui.behavior.js >> danta.min.js

################################################################################

rm -f bootstrap.min.css
rm -f underscore.min.js
rm -f zepto.min.js

echo "Done"
