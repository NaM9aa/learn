
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

        if ((y2 - y1) / (x2 - x1) == (y4 - y3) / (x4 - x3)) {
            return {x: null, y: null}
        }
        else if ((crX >= Math.min(x1, x2) && crX <= Math.max(x1, x2)) && (crX >= Math.min(x3, x4) && crX <= Math.max(x3, x4))) {
            return {
                x: crX,
                y: crY
            }
        }

        else {
            return {x: null, y: null}
        }
    },

    rectIntersect: function (x1, y1, x3, y3, x4, y4, width, length) {
        x1 = Number(x1);
        x3 = Number(x3);
        x4 = Number(x4);
        y1 = Number(y1);
        y3 = Number(y3);
        y4 = Number(y4);
        width = Number(width);
        length = Number(length);

        var x2 = x1 + width;
        var y2 = y1 + length;
        var ax = (y1 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4);
        var bx = (y2 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4);
        var ay = x1 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4);
        var by = x2 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4);

        if (ax >= x1 && ax <= x2) {
            var a = ax + ' , ' + y1 + '  ';
        }
        else {
            var a = '';
            ax = null;
        }
        if (bx >= x1 && bx <= x2) {
            var c = bx + ' , ' + y2 + '  ';
        }
        else {
            var c = '';
            bx = null;
        }
        if (ay > y1 && ay < y2) {
            var d = x1 + ' , ' + ay + '  ';
        }
        else {
            var d = '';
            ay = null;
        }
        if (by > y1 && by < y2) {
            var b = x2 + ' , ' + by + '  ';
        }
        else {
            var b = '';
            by = null;
        }
        if (ax == null && bx == null && ay == null && by == null) {
            var mess = 'none';
        }
        return{
            a: a,
            b: b,
            c: c,
            d: d,
            mess: mess
        }


    },
    intersectWithTriangle: function (lx1, ly1, lx2, ly2, tx1, ty1, tx2, ty2, tx3, ty3) {
        lx1 = Number(lx1);
        ly1 = Number(ly1);
        lx2 = Number(lx2);
        ly2 = Number(ly2);
        tx1 = Number(tx1);
        ty1 = Number(ty1);
        tx2 = Number(tx2);
        ty2 = Number(ty2);
        tx3 = Number(tx3);
        ty3 = Number(ty3);
        
        var messA = null;
        var messB = null;
        var messC = null;

        var intersect = this.intersect(tx1, ty1, tx2, ty2, lx1, ly1, lx2, ly2);
        
        if (intersect.x != null && intersect.y != null) {
            c = intersect.x + ' , ' + intersect.y;
            }
            else{c = '';}

        intersect = this.intersect(tx2, ty2, tx3, ty3, lx1, ly1, lx2, ly2);
        
        if (intersect.x != null && intersect.y != null) {
            a = intersect.x + ' , ' + intersect.y;
            }
            else{a = '';}

        intersect = this.intersect(tx1, ty1, tx3, ty3, lx1, ly1, lx2, ly2);
        
        if (intersect.x != null && intersect.y != null) {
            b = intersect.x + ' , ' + intersect.y;
            }
            else{b = '';}

            return {
                a: a,
                b: b,
                c: c
            }

    },
    intersectWith2Rectangles: function(x1, y1, w1, l1, x3, y3, w2, l2) {
        x1 = Number(x1);
        x3 = Number(x3);
        y1 = Number(y1);
        y3 = Number(y3);
        w1 = Number(w1);
        l1 = Number(l1);
        w2 = Number(w2);
        l2 = Number(l2);

        var x2 = x1 + w1;
        var y2 = y1 + l1;
        var x4 = x3 + w2;
        var y4 = y3 + l2;
        var mess = "";
        var c1 = "";
        var c2 = "";
        var c3 = "";
        var c4 = "";

        if(y3 > y1 && y3 < y2){
            if(x1 > x3 && x1 < x4){
                var ma1 = x1 + "," + y3 + "  ";
            }
            else{var ma1 = "";}
            if(x2 > x3 && x2 < x4){
                var ma2 = x2 + "," + y3 + "  ";
            }
            else{var ma2 = "";}
            var a = ma1 + ma2;
        }
        else{var a ="";}

        if(y4 > y1 && y4 < y2){
            if(x1 > x3 && x1 < x4){
                var mc1 = x1 + "," + y4 + "  ";
            }
            else{var mc1 = "";}
            if(x2 > x3 && x2 < x4){
                var mc2 = x2 + "," + y4 + "  ";
            }
            else{var mc2 = "";}
            var c = mc1 + mc2;
        }
        else{var c ="";}
        
        if(x4 > x1 && x4 < x2){
            if(y1 > y3 && y1 < y4){
                var mb1 = x4 + "," + y1 + "  ";
            }
            else{var mb1 = "";}
            if(y2 > y3 && y2 < y4){
                var mb2 = x4 + "," + y2 + "  ";
            }
            else{var mb2 = "";}
            var b = mb1 + mb2;
        }
        else{var b ="";}

        if(x3 > x1 && x3 < x2){
            if(y1 > y3 && y1 < y4){
                var md1 = x3 + "," + y1 + "  ";
            }
            else{var md1 = "";}
            if(y2 > y3 && y2 < y4){
                var md2 = x3 + "," + y2 + "  ";
            }
            else{var md2 = "";}
            var d = md1 + md2;
        }
        else{var d ="";}

        if (a == "" && b == "" && c == "" && d == ""){
            if(x2 == x3 && y2 == y3){
                c1 = x2 + "," + y2 + "  ";
            }
            else if(x2 == x3 && y1 == y4){
                c2 = x2 + "," + y1 + "  ";
            }
            else if(x1 == x4 && y1 == y4){
                c3 = x1 + "," + y1 + "  ";
            }
            else if(x1 == x4 && y2 == y3){
                c4 = x1 + "," + y2 + "  ";
            }
            else{mess = "none";}
            
        }
        else {mess = "";}

        return{
            a:a,
            b:b,
            c:c,
            d:d,
            c1:c1,
            c2:c2,
            c3:c3,
            c4:c4,
            mess:mess
        }


    }


}