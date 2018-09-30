
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
            if (((ay > y1 && ay < y2) && (ay > Math.min(y3, y4) && ay < Math.max(y3, y4))) || (ay == y4 && ay != y1 && ay != y2)) {
                var d = x1 + ' , ' + ay + '  ';
            }
            else {
                var d = '';
                ay = null;
            }
            if (((by > y1 && by < y2) && (by > Math.min(y3, y4) && by < Math.max(y3, y4))) || (by == y4 && by != y1 && by != y2)) {
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

    },
    intersectWithCircle: function (lx1, ly1, lx2, ly2, cx, cy, r) {
        lx1 = Number(lx1);
        ly1 = Number(ly1);
        lx2 = Number(lx2);
        ly2 = Number(ly2);
        cx = Number(cx);
        cy = Number(cy);
        r = Number(r);

        var mess = "";

        var la = (ly2 - ly1) / (lx2 - lx1);
        var lb = ly1 - lx1 * la;
        var a = Math.pow(la, 2) + 1;
        var b = 2 * (la * lb - la * cy - cx);
        var c = -(Math.pow(r, 2) - Math.pow(cx, 2) - Math.pow(lb, 2) - Math.pow(cy, 2) + 2 * lb * cy);
        var discriminant = Math.pow(b, 2) - 4 * a * c;

        if (discriminant > 0) {
            var x1 = (-b + Math.sqrt(discriminant)) / 2 / a;
            var x2 = (-b - Math.sqrt(discriminant)) / 2 / a;
            if (x1 >= Math.min(lx1, lx2) && x1 <= Math.max(lx1, lx2)) {
                var y1 = la * x1 + lb;
                var ma = Math.round(x1) + "," + Math.round(y1) + "  ";
            }
            else { ma = ""; }
            if (x2 >= Math.min(lx1, lx2) && x2 <= Math.max(lx1, lx2)) {
                var y2 = la * x2 + lb;
                var mb = Math.round(x2) + "," + Math.round(y2);
            }
            else { mb = ""; }
            mess = ma + mb;
            if (mess == "") { mess = "none"; }
        }
        if (discriminant == 0) {
            var x = -b / 2 * a;
            var y = la * x + lb;
            var u = Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2));
            if (x >= Math.min(lx1, lx2) && x <= Math.max(lx1, lx2)) {
                mess = x + "," + y;
            }
        }
        if (discriminant < 0) {
            mess = "none";
        }
        return {
            mess: mess
        }

    },
    intersectWithCircleAndTriangle: function (tx1, ty1, tx2, ty2, tx3, ty3, cx, cy, r) {
        function intersect(lx1, ly1, lx2, ly2, cx, cy, r) {

            var mess = "";

            var la = (ly2 - ly1) / (lx2 - lx1);
            var lb = ly1 - lx1 * la;
            var a = Math.pow(la, 2) + 1;
            var b = 2 * (la * lb - la * cy - cx);
            var c = -(Math.pow(r, 2) - Math.pow(cx, 2) - Math.pow(lb, 2) - Math.pow(cy, 2) + 2 * lb * cy);
            var discriminant = Math.pow(b, 2) - 4 * a * c;

            if (discriminant > 0) {
                var x1 = (-b + Math.sqrt(discriminant)) / 2 / a;
                var x2 = (-b - Math.sqrt(discriminant)) / 2 / a;
                if ((x1 > Math.min(lx1, lx2) && x1 < Math.max(lx1, lx2)) || x1 == lx1) {
                    var y1 = la * x1 + lb;
                    var ma = Math.round(x1) + "," + Math.round(y1) + "  ";
                }
                else { ma = ""; }
                if ((x2 > Math.min(lx1, lx2) && x2 < Math.max(lx1, lx2)) || x2 == lx1) {
                    var y2 = la * x2 + lb;
                    var mb = Math.round(x2) + "," + Math.round(y2);
                }
                else { mb = ""; }
                mess = ma + mb;
            }
            else if (discriminant == 0) {
                var x = -b / 2 * a;
                var y = la * x + lb;
                var u = Math.sqrt(Math.pow(r, 2) - Math.pow(x, 2));
                if ((x >= Math.min(lx1, lx2) && x <= Math.max(lx1, lx2)) || x == lx1) {
                    mess = x + "," + y;
                }
            }
            else {
                mess = "";
            }
            return {
                mess: mess
            }
        }

        tx1 = Number(tx1);
        ty1 = Number(ty1);
        tx2 = Number(tx2);
        ty2 = Number(ty2);
        tx3 = Number(tx3);
        ty3 = Number(ty3);
        cx = Number(cx);
        cy = Number(cy);
        r = Number(r);

        var result = intersect(tx1, ty1, tx2, ty2, cx, cy, r);
        var ma = result.mess;
        result = intersect(tx2, ty2, tx3, ty3, cx, cy, r);
        var mb = result.mess;
        result = intersect(tx3, ty3, tx1, ty1, cx, cy, r);
        var mc = result.mess;

        var mess = ma + mb + mc;
        if (mess == "") {
            mess = "none";
        }

        return {
            mess: mess
        }

    },
    intersectWithCircleAndRectangle: function (rx1, ry1, rw, rl, cx, cy, r) {
        rx1 = Number(rx1);
        ry1 = Number(ry1);
        rw = Number(rw);
        rl = Number(rl);
        cx = Number(cx);
        cy = Number(cy);
        r = Number(r);

        var rx2 = rx1 + rw;
        var ry2 = ry1 + rl;

        var ma = "", mb = "", mc = "", md = "";

        var at = Math.pow(r, 2) - Math.pow(rx1 - cx, 2);
        if (at > 0) {
            var ma1 = "", ma2 = "";
            var ay1 = Math.sqrt(at) + cy;
            if (ay1 > ry1 && ay1 < ry2) {
                ma1 = rx1 + "," + Math.round(ay1) + "  ";
            }
            var ay2 = - Math.sqrt(at) + cy;
            if (ay2 > ry1 && ay2 < ry2) {
                ma2 = rx1 + "," + Math.round(ay2) + "  ";
            }
            ma = ma1 + ma2;
        }
        else if (at == 0) {
            if (cy > ry1 && cy < ry2) {
                ma = rx1 + "," + cy + "  ";
            }
        }
        //
        var bt = Math.pow(r, 2) - Math.pow(rx2 - cx, 2);
        if (bt > 0) {
            var mb1 = "", mb2 = "";
            var by1 = Math.sqrt(bt) + cy;
            if (by1 > ry1 && by1 < ry2) {
                mb1 = rx1 + "," + Math.round(by1) + "  ";
            }
            var by2 = - Math.sqrt(bt) + cy;
            if (by2 > ry1 && by2 < ry2) {
                mb2 = rx1 + "," + Math.round(by2) + "  ";
            }
            mb = mb1 + mb2;
        }
        else if (bt == 0) {
            if (cy > ry1 && cy < ry2) {
                mb = rx1 + "," + cy + "  ";
            }
        }
        //
        var ct = Math.pow(r, 2) - Math.pow(ry1 - cy, 2);
        if (ct > 0) {
            var mc1 = "", mc2 = "";
            var cx1 = Math.sqrt(ct) + cx;
            if (cx1 >= rx1 && cx1 <= rx2) {
                mc1 = Math.round(cx1) + "," + ry1 + "  ";
            }
            var cx2 = - Math.sqrt(ct) + cy;
            if (cx2 >= rx1 && cx2 <= rx2) {
                mc2 = Math.round(cx2) + "," + ry1 + "  ";
            }
            mc = mc1 + mc2;
        }
        else if (ct == 0) {
            if (cx > rx1 && cx <= rx2) {
                mc = cx + "," + ry1 + "  ";
            }
        }
        //
        var dt = Math.pow(r, 2) - Math.pow(ry2 - cy, 2);
        if (dt > 0) {
            var md1 = "", md2 = "";
            var dx1 = Math.sqrt(dt) + cx;
            if (dx1 >= rx1 && dx1 <= rx2) {
                md1 = Math.round(dx1) + "," + ry1 + "  ";
            }
            var dx2 = - Math.sqrt(dt) + cy;
            if (dx2 >= rx1 && dx2 < rx2) {
                md2 = Math.round(dx2) + "," + ry1 + "  ";
            }
            md = md1 + md2;
        }
        else if (dt == 0) {
            if (cx >= rx1 && cx <= rx2) {
                md = cx + "," + ry2 + "  ";
            }
        }
        //
        var mess = mc + mb + md + ma;
        if (mess == "") {
            return {
                mess: "none"
            }
        }
        else {
            return {
                mess: mess
            }
        }



        cy = Math.sqrt(Math.pow(r) - Math.pow(rx2 - cx)) + cy;

    },

    intersectWith2Circles: function (h1, k1, r1, h2, k2, r2) {
        h1 = Number(h1);
        k1 = Number(k1);
        r1 = Number(r1);
        h2 = Number(h2);
        k2 = Number(k2);
        r2 = Number(r2);
        var mess = "none";


        var b = -2 * h2 + 2 * h1;
        if (b != 0) {
            var t = - Math.pow(h2, 2) - Math.pow(k2, 2) + Math.pow(h1, 2) + Math.pow(k1, 2) + Math.pow(r2, 2) - Math.pow(r1, 2);
            var a = 2 * (k2 - k1);
            var da = 1 + Math.pow(a, 2) / Math.pow(b, 2);
            var db = 2 * (a * t / Math.pow(b, 2) - a * h1 / b - k1);
            var dc = Math.pow(t, 2) / Math.pow(b, 2) - 2 * h1 * t / b + Math.pow(k1, 2) + Math.pow(h1, 2) - Math.pow(r1, 2)
            var discriminant = Math.pow(db, 2) - 4 * da * dc;;

            if (discriminant > 0) {
                var y1 = (-db + Math.sqrt(discriminant)) / 2 / da;
                var y2 = (-db - Math.sqrt(discriminant)) / 2 / da;
                var x1 = (a * y1 + t) / b;
                var x2 = (a * y2 + t) / b;
                mess = Math.round(x1) + "," + Math.round(y1) + "  " + Math.round(x2) + "," + Math.round(y2);
            }
            else if (discriminant == 0) {
                var y = -b / 2 * a;
                var x = (a * y + t) / b;
                mess = Math.round(x) + "," + Math.round(y);
            }
            return{
                mess:mess
            }



        }
        else {
            b = 2 * (k2 - k1);
            if (b != 0) {
                var a = -2 * h2 + 2 * h1;
                var t = Math.pow(h2,2) + Math.pow(k2,2) - Math.pow(h1,2) - Math.pow(k1,2) + Math.pow(r1,2) - Math.pow(r2,2);
                var da = 1 + Math.pow(a, 2) / Math.pow(b, 2);
                var db = 2 * (a * t / Math.pow(b, 2) - a * k1 / b - h1);
                var dc = Math.pow(t, 2) / Math.pow(b, 2) - 2 * k1 * t / b + Math.pow(k1, 2) + Math.pow(h1, 2) - Math.pow(r1, 2)
                var discriminant = Math.pow(db, 2) - 4 * da * dc;

                /*var y = 150;
           var x = 70;
           //var tx = (a * y + t) / b;
           //var temp2 = (a * y + t) / b;
           var temp = da * Math.pow(x, 2) + db * x + dc;
           var temp3 = (-2 * h2 + 2 * h1) * x - (k2 - k1) * 2 * y + Math.pow(h2,2) + Math.pow(k2,2) - Math.pow(h1,2) - Math.pow(k1,2) + Math.pow(r1,2) - Math.pow(r2,2);
           //var temp4 = (a * y - Math.pow(h2, 2) - Math.pow(k2, 2) + Math.pow(h1, 2) + Math.pow(k1, 2) - Math.pow(r1, 2) + Math.pow(r2, 2)) / b;
           //var temp5 = Math.pow(tx, 2) + Math.pow(h1, 2) - 2*tx*h1 + Math.pow(y, 2) + Math.pow(k1, 2) - 2*k1*y - Math.pow(r1, 2);
           //var temp6 = Math.pow(x-h1,2) + Math.pow(y-k1, 2) - Math.pow(r1, 2);*/

                if (discriminant > 0) {
                    var x1 = (-db + Math.sqrt(discriminant)) / 2 / da;
                    var x2 = (-db - Math.sqrt(discriminant)) / 2 / da;
                    var y1 = (a * x1 + t) / b;
                    var y2 = (a * x2 + t) / b;
                    mess = Math.round(x1) + "," + Math.round(y1) + "  " + Math.round(x2) + "," + Math.round(y2);
                }
                else if (discriminant == 0) {
                    var x = -b / 2 * a;
                    var y = (a * x + t) / b;
                    mess = Math.round(x) + "," + Math.round(y);
                }
                return {
                    mess: mess
                }
            }
            else if(r1 == r2){
                return {
                    mess: "same circle"
                }
            }
            else {
                return {
                    mess:mess
                }
            }
        }
    }





}