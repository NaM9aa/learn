
var geojs = {
    /**
     * Get the intersection of two lines
     */
    intersect: function (x1, y1, x2, y2, x3, y3, x4, y4) {
        x1 = Number(x1);
        x2 = Number(x2);
        x3 = Number(x3);
        x4 = Number(x4);
        y1 = Number(y1);
        y2 = Number(y2);
        y3 = Number(y3);
        y4 = Number(y4);
        var crX = (y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3));
        var crY = (y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1);
        return {
            x: crX,
            y: crY
        }
    },

    rectIntersect: function (x1, y1, x2, y2, x3, y3, x4, y4, width, length) {
        x1 = Number(x1);
        //x2 = Number(x2);
        x3 = Number(x3);
        x4 = Number(x4);
        y1 = Number(y1);
        //y2 = Number(y2);
        y3 = Number(y3);
        y4 = Number(y4);
        width = Number(width);
        length = Number(length);

          x2 = x1 + width;
          y2 = y1 + length;
          var ax = (y1 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4);
          var bx = (y2 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4);
          var ay = x1 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4);
          var by = x2 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4);

            if(ax >= x1 && ax <= x2) {
            document.getElementById("a").innerHTML =  ax + ' , ' + y1;}
            else{document.getElementById("a").innerHTML = '';
                ax = null;}
            if(bx >= x1 && bx <= x2){
            document.getElementById("c").innerHTML = bx + ' , ' + y2;}
            else{document.getElementById("c").innerHTML = '';
                bx = null;}
            if(ay > y1 && ay < y2) {
            document.getElementById("d").innerHTML = x1 + ' , ' + ay;}
            else{document.getElementById("d").innerHTML = '';
                ay = null;}
            if(by > y1 && by < y2) {
            document.getElementById("b").innerHTML = x2 + ' , ' + by;}
            else{document.getElementById("b").innerHTML = '';
                by = null;}
            if(ax == null && bx == null && ay == null && by == null) {
            document.getElementById("mess").innerHTML = 'none';}


    }


}