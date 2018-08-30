
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
        var crX = Math.round((y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)));
        var crY = Math.round((y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1));

        if ((y2 - y1) / (x2 - x1) == (y4 - y3) / (x4 - x3)) {
            return { x: null, y: null }
        }
        else if ((crX >= Math.min(x1, x2) && crX <= Math.max(x1, x2)) && (crX >= Math.min(x3, x4) && crX <= Math.max(x3, x4))) {
            return {
                x: crX,
                y: crY
            }
        }

        else {
            return { x: null, y: null }
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
        var ax = Math.round((y1 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4));
        var bx = Math.round((y2 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4));
        var ay = Math.round(x1 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4));
        var by = Math.round(x2 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4));

        if ((ax >= x1 && ax <= x2) && (ax >= Math.min(x3, x4) && ax <= Math.max(x3, x4))) {
            var a = ax + ' , ' + y1 + '  ';
        }
        else {
            var a = '';
            ax = null;
        }
        if ((bx >= x1 && bx <= x2) && (bx >= Math.min(x3, x4) && bx <= Math.max(x3, x4))) {
            var c = bx + ' , ' + y2 + '  ';
        }
        else {
            var c = '';
            bx = null;
        }
        if ((ay > y1 && ay < y2) && (ay >= Math.min(y3, y4) && ay <= Math.max(y3, y4))) {
            var d = x1 + ' , ' + ay + '  ';
        }
        else {
            var d = '';
            ay = null;
        }
        if ((by > y1 && by < y2) && (by >= Math.min(y3, y4) && by <= Math.max(y3, y4))) {
            var b = x2 + ' , ' + by + '  ';
        }
        else {
            var b = '';
            by = null;
        }
        if (ax == null && bx == null && ay == null && by == null) {
            var mess = 'none';
        }
        return {
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

        function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
            x1 = Number(x1);
            x2 = Number(x2);
            x3 = Number(x3);
            x4 = Number(x4);
            y1 = Number(y1);
            y2 = Number(y2);
            y3 = Number(y3);
            y4 = Number(y4);
            var crX = Math.round((y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)));
            var crY = Math.round((y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1));

            if ((y2 - y1) / (x2 - x1) == (y4 - y3) / (x4 - x3)) {
                return { x: null, y: null }
            }
            else if (((crX > Math.min(x1, x2) && crX < Math.max(x1, x2)) && (crX >= Math.min(x3, x4) && crX <= Math.max(x3, x4))) || crX == x2) {
                return {
                    x: crX,
                    y: crY
                }
            }

            else {
                return { x: null, y: null }
            }
        }

        var result = intersect(tx1, ty1, tx2, ty2, lx1, ly1, lx2, ly2);

        if (result.x != null && result.y != null) {
            c = result.x + ' , ' + result.y;
        }
        else { c = ''; }

        result = intersect(tx2, ty2, tx3, ty3, lx1, ly1, lx2, ly2);

        if (result.x != null && result.y != null) {
            a = result.x + ' , ' + result.y;
        }
        else { a = ''; }

        result = intersect(tx3, ty3, tx1, ty1, lx1, ly1, lx2, ly2);

        if (result.x != null && result.y != null) {
            b = result.x + ' , ' + result.y;
        }
        else { b = ''; }

        return {
            a: a,
            b: b,
            c: c
        }

    },
    intersectWith2Rectangles: function (x1, y1, w1, l1, x3, y3, w2, l2) {
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

        if (y3 > y1 && y3 < y2) {
            if (x1 > x3 && x1 < x4) {
                var ma1 = x1 + "," + y3 + "  ";
            }
            else { var ma1 = ""; }
            if (x2 > x3 && x2 < x4) {
                var ma2 = x2 + "," + y3 + "  ";
            }
            else { var ma2 = ""; }
            var a = ma1 + ma2;
        }
        else { var a = ""; }

        if (y4 > y1 && y4 < y2) {
            if (x1 > x3 && x1 < x4) {
                var mc1 = x1 + "," + y4 + "  ";
            }
            else { var mc1 = ""; }
            if (x2 > x3 && x2 < x4) {
                var mc2 = x2 + "," + y4 + "  ";
            }
            else { var mc2 = ""; }
            var c = mc1 + mc2;
        }
        else { var c = ""; }

        if (x4 > x1 && x4 < x2) {
            if (y1 > y3 && y1 < y4) {
                var mb1 = x4 + "," + y1 + "  ";
            }
            else { var mb1 = ""; }
            if (y2 > y3 && y2 < y4) {
                var mb2 = x4 + "," + y2 + "  ";
            }
            else { var mb2 = ""; }
            var b = mb1 + mb2;
        }
        else { var b = ""; }

        if (x3 > x1 && x3 < x2) {
            if (y1 > y3 && y1 < y4) {
                var md1 = x3 + "," + y1 + "  ";
            }
            else { var md1 = ""; }
            if (y2 > y3 && y2 < y4) {
                var md2 = x3 + "," + y2 + "  ";
            }
            else { var md2 = ""; }
            var d = md1 + md2;
        }
        else { var d = ""; }

        if (a == "" && b == "" && c == "" && d == "") {
            if (x2 == x3 && y2 == y3) {
                c1 = x2 + "," + y2 + "  ";
            }
            else if (x2 == x3 && y1 == y4) {
                c2 = x2 + "," + y1 + "  ";
            }
            else if (x1 == x4 && y1 == y4) {
                c3 = x1 + "," + y1 + "  ";
            }
            else if (x1 == x4 && y2 == y3) {
                c4 = x1 + "," + y2 + "  ";
            }
            else { mess = "none"; }

        }
        else { mess = ""; }

        return {
            a: a,
            b: b,
            c: c,
            d: d,
            c1: c1,
            c2: c2,
            c3: c3,
            c4: c4,
            mess: mess
        }


    },
    intersectWithTriangle2: function (lx1, ly1, lx2, ly2, tx1, ty1, tx2, ty2, tx3, ty3) {
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

        function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
            x1 = Number(x1);
            x2 = Number(x2);
            x3 = Number(x3);
            x4 = Number(x4);
            y1 = Number(y1);
            y2 = Number(y2);
            y3 = Number(y3);
            y4 = Number(y4);
            var crX = Math.round((y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)));
            var crY = Math.round((y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1));

            if ((y2 - y1) / (x2 - x1) == (y4 - y3) / (x4 - x3)) {
                return { x: null, y: null }
            }
            else if (((crX > Math.min(x1, x2) && crX < Math.max(x1, x2)) && (crX > Math.min(x3, x4) && crX < Math.max(x3, x4))) || (crX == x2 && crX != x3) || (crX == x4 && crX != x1)) {
                return {
                    x: crX,
                    y: crY
                }
            }

            else {
                return { x: null, y: null }
            }
        }

        var result = intersect(tx1, ty1, tx2, ty2, lx1, ly1, lx2, ly2);

        if (result.x != null && result.y != null) {
            var c = result.x + ' , ' + result.y + '  ';
        }
        else { var c = ''; }

        result = intersect(tx2, ty2, tx3, ty3, lx1, ly1, lx2, ly2);

        if (result.x != null && result.y != null) {
            var a = result.x + ' , ' + result.y + '  ';
        }
        else { var a = ''; }

        result = intersect(tx1, ty1, tx3, ty3, lx1, ly1, lx2, ly2);

        if (result.x != null && result.y != null) {
            var b = result.x + ' , ' + result.y + '  ';
        }
        else { var b = ''; }

        return {
            mess: c + a + b
        }

    },

    intersectWith2Triangles: function (tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y) {
        tx1 = Number(tx1);
        ty1 = Number(ty1);
        tx2 = Number(tx2);
        ty2 = Number(ty2);
        tx3 = Number(tx3);
        ty3 = Number(ty3);
        t1x = Number(t1x);
        t1y = Number(t1y);
        t2x = Number(t2x);
        t2y = Number(t2y);
        t3x = Number(t3x);
        t3y = Number(t3y);

        var result = this.intersectWithTriangle2(t1x, t1y, t2x, t2y, tx1, ty1, tx2, ty2, tx3, ty3);
        var c = result.mess;
        result = this.intersectWithTriangle2(t2x, t2y, t3x, t3y, tx1, ty1, tx2, ty2, tx3, ty3);
        var a = result.mess;
        result = this.intersectWithTriangle2(t1x, t1y, t3x, t3y, tx1, ty1, tx2, ty2, tx3, ty3);
        var b = result.mess;

        return {
            c: c,
            a: a,
            b: b
        }
    },
    //
    intersectWithTriangleAndRectangle: function (rx1, ry1, rw, rl, tx1, ty1, tx2, ty2, tx3, ty3) {
        rx1 = Number(rx1);
        ry1 = Number(ry1);
        rw = Number(rw);
        rl = Number(rl);
        tx1 = Number(tx1);
        ty1 = Number(ty1);
        tx2 = Number(tx2);
        ty2 = Number(ty2);
        tx3 = Number(tx3);
        ty3 = Number(tx3);

        function intesectWithRectangle(x1, y1, width, length, x3, y3, x4, y4) {
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
            var ax = Math.round((y1 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4));
            var bx = Math.round((y2 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4));
            var ay = Math.round(x1 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4));
            var by = Math.round(x2 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4));

            if ((ax >= x1 && ax <= x2) && (ax >= Math.min(x3, x4) && ax <= Math.max(x3, x4))) {
                var a = ax + ' , ' + y1 + '  ';
            }
            else {
                var a = '';
                ax = null;
            }
            if ((bx >= x1 && bx <= x2) && (bx >= Math.min(x3, x4) && bx <= Math.max(x3, x4))) {
                var c = bx + ' , ' + y2 + '  ';
            }
            else {
                var c = '';
                bx = null;
            }
            if ((ay > y1 && ay < y2) && (ay >= Math.min(y3, y4) && ay <= Math.max(y3, y4))) {
                var d = x1 + ' , ' + ay + '  ';
            }
            else {
                var d = '';
                ay = null;
            }
            if ((by > y1 && by < y2) && (by >= Math.min(y3, y4) && by <= Math.max(y3, y4))) {
                var b = x2 + ' , ' + by + '  ';
            }
            else {
                var b = '';
                by = null;
            }
            if (ax == null && bx == null && ay == null && by == null) {
                var mess = 'none';
            }
            return {
                a: a,
                b: b,
                c: c,
                d: d,
                mess: mess
            }
        }
    },
    intersectWithRectAndTriangle: function (rx1, ry1, rw, rl, tx1, ty1, tx2, ty2, tx3, ty3) {
        function intersect(x1, y1, width, length, x3, y3, x4, y4) {
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
            var ax = Math.round((y1 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4));
            var bx = Math.round((y2 - y3 + x3 * (y3 - y4) / (x3 - x4)) * (x3 - x4) / (y3 - y4));
            var ay = Math.round(x1 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4));
            var by = Math.round(x2 * (y3 - y4) / (x3 - x4) + y3 - x3 * (y3 - y4) / (x3 - x4));

            if (((ax >= x1 && ax <= x2) && (ax > Math.min(x3, x4) && ax < Math.max(x3, x4))) || (ax == x4)) {
                var a = ax + ' , ' + y1 + '  ';
            }
            else {
                var a = '';
                ax = null;
            }
            if (((bx >= x1 && bx <= x2) && (bx > Math.min(x3, x4) && bx < Math.max(x3, x4))) || (bx == x4)) {
                var c = bx + ' , ' + y2 + '  ';
            }
            else {
                var c = '';
                bx = null;
            }
            if (((ay > y1 && ay < y2) && (ay > Math.min(y3, y4) && ay < Math.max(y3, y4))) || (ay == y4 && ay!= y1 && ay != y2)) {
                var d = x1 + ' , ' + ay + '  ';
            }
            else {
                var d = '';
                ay = null;
            }
            if (((by > y1 && by < y2) && (by > Math.min(y3, y4) && by < Math.max(y3, y4))) || (by == y4 && by!= y1 && by != y2)) {
                var b = x2 + ' , ' + by + '  ';
            }
            else {
                var b = '';
                by = null;
            }
            if (ax == null && bx == null && ay == null && by == null) {
                var none = true;
            }
            else { var none = false; }
            return {
                result: a + b + c + d,
                none: none
            }
        }
        var mess = "";
        var result = intersect(rx1, ry1, rw, rl, tx1, ty1, tx2, ty2);
        var c = result.result;
        var mc = result.none;
        result = intersect(rx1, ry1, rw, rl, tx2, ty2, tx3, ty3);
        var a = result.result;
        var ma = result.none;
        result = intersect(rx1, ry1, rw, rl, tx3, ty3, tx1, ty1);
        var b = result.result;
        var mb = result.none;
        if (mc == true && ma == true && mb == true) {
            var mess = "none"
        }
        return {
            c: c,
            a: a,
            b: b,
            mess: mess
        }

    }


}