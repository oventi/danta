clear

echo "Building danta"

echo "-- Cleaning up"
rm danta.min.css 2> /dev/null
rm danta.min.js 2> /dev/null

touch danta.min.css
touch danta.min.js

################################################################################

echo "-- Getting bootstrap css"
#wget "http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" -qO lib/bootstrap.min.css

echo "-- Getting underscore js"
#wget "http://underscorejs.org/underscore-min.js" -qO lib/underscore.min.js

echo "-- Getting zepto js"
#wget "http://zeptojs.com/zepto.min.js" -qO lib/zepto.min.js

################################################################################

echo "-- Building css"
cat lib/bootstrap.min.css >> danta.min.css
cat danta.css >> danta.min.css

echo '"use strict";' >> danta.min.js

echo "-- Building js"
cat lib/underscore.min.js >> danta.min.js
cat lib/zepto.min.js >> danta.min.js

cat danta.js >> danta.min.js
cat config.js >> danta.min.js
cat remote.js >> danta.min.js
cat adt.js >> danta.min.js
cat ui.js >> danta.min.js
cat ui/behavior.js >> danta.min.js
cat ui/widget.js >> danta.min.js

#jsmin < danta.min.js >> danta.min.js
jsmin < danta.min.js > danta2.min.js

################################################################################

#rm -f lib/bootstrap.min.css
#rm -f lib/underscore.min.js
#rm -f lib/zepto.min.js

echo "Done"
