# danta
*js framework for html5 mobile apps*

Copyright © 2014-2015 Andrés Proaño. andres@oventi.org | oventi.org

danta is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
danta is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License 
along with danta. If not, see <http://www.gnu.org/licenses/>.

danta provides a simple and fast way to create basic applications with html5, javascript and css.

danta applications are targeted for mobile devices (tablets, smartphones) that have modern browsers.

## todo
*  refactor and simplify functionality
*  benchmark
*  check for memory leaks
*  multiple/single files for danta

## packages

### main (danta.js)

**o** *function (_o, properties)*  
creates a standard danta object

**app** *function (app)*  
creates a danta app

### adt.js

**List** *object*  
List abstract data structure  

### cache.js

**get** *function (key)*  
**set** *function (key, value)*  

### config.js
**REMOTE\_BASE\_PATH** *constant*  

### data.js

**Store** *object*  
**o** *function (o)*  

### helper.js

### remote.js

**call** *function (fn, params, done)*

### ui.js

**w** *function (o, data, properties)*

#### ui/behavior.js

#### ui/widget.js
**Group** *object*  
**Label** *object*  
**Textbox** *object*  
**Button** *object*  
**List** *object*  
