danta.ui.widget.table = function (o) {
    this.o = o;
    danta.ui.widget._base.call(this);
    
    this.render = function () {
        o.empty();
        
        var table = $("<table />")
            .addClass("table table-responsive table-striped table-bordered")
            .append($("<thead />"))
            .append($("<tbody />"));
        
        var data = this.data();
        
        for(var i in data) {
            var tr = $("<tr />");
            
            for(var j in data[i]) {
                if(i == 0) {
                    tr.append($("<th />").text(data[i][j]));
                }
                else {
                    tr.append($("<td />").text(data[i][j]));
                }
            }
            
            if(i == 0) {
                $("thead", table).append(tr);
            }
            else {
                $("tbody", table).append(tr);
            }
        }
        
        o.append(table);
    }
}
