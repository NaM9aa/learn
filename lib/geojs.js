
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

    intersectWith2Triangles: function (tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y) {
        function inter(lx1, ly1, lx2, ly2, tx1, ty1, tx2, ty2, tx3, ty3) {

            function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
                var crX = Math.round((y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)));
                var crY = Math.round((y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1));

                if ((y2 - y1) / (x2 - x1) == (y4 - y3) / (x4 - x3)) {
                    return { x: null, y: null }
                }
                else if (((crX > Math.min(x1, x2) && crX < Math.max(x1, x2)) && (crX > Math.min(x3, x4) && crX < Math.max(x3, x4)))) {
                    return {
                        x: crX,
                        y: crY
                    }
                }
                else if (((crX >= Math.min(x1, x2) && crX <= Math.max(x1, x2)) && (crX >= Math.min(x3, x4) && crX <= Math.max(x3, x4))) && crX != x3 && crX != x1) {
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

        }
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

        var result = inter(t1x, t1y, t2x, t2y, tx1, ty1, tx2, ty2, tx3, ty3);
        var c = result.mess;
        result = inter(t2x, t2y, t3x, t3y, tx1, ty1, tx2, ty2, tx3, ty3);
        var a = result.mess;
        result = inter(t1x, t1y, t3x, t3y, tx1, ty1, tx2, ty2, tx3, ty3);
        var b = result.mess;

        return {
            c: c,
            a: a,
            b: b
        }
    },
    //
    /*intersectWithTriangleAndRectangle: function (rx1, ry1, rw, rl, tx1, ty1, tx2, ty2, tx3, ty3) {
        rx1 = Number(rx1);
        ry1 = Number(ry1);
        rw = Number(rw);
        rl = Number(rl);
        tx1 = Number(tx1);
        ty1 = Number(ty1);
        tx2 = Number(tx2);
        ty2 = Number(ty2);
        tx3 = Number(tx3);
        ty3 = Number(ty3);

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
    },*/
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
            return {
                mess: mess
            }



        }
        else {
            b = 2 * (k2 - k1);
            if (b != 0) {
                var a = -2 * h2 + 2 * h1;
                var t = Math.pow(h2, 2) + Math.pow(k2, 2) - Math.pow(h1, 2) - Math.pow(k1, 2) + Math.pow(r1, 2) - Math.pow(r2, 2);
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
            else if (r1 == r2) {
                return {
                    mess: "same circle"
                }
            }
            else {
                return {
                    mess: mess
                }
            }
        }
    },

    distanceOfLine: function (x1, y1, x2, y2) {
        x1 = Number(x1);
        y1 = Number(y1);
        x2 = Number(x2);
        y2 = Number(y2);

        var distance = Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
        return {
            mess: distance
        }
    },
    perimeterAndAreaOfTriangle: function (tx1, ty1, tx2, ty2, tx3, ty3) {
        tx1 = Number(tx1);
        ty1 = Number(ty1);
        tx2 = Number(tx2);
        ty2 = Number(ty2);
        tx3 = Number(tx3);
        ty3 = Number(ty3);

        var a = Math.sqrt(Math.pow(tx2 - tx1, 2) + Math.pow(ty2 - ty1, 2));
        var b = Math.sqrt(Math.pow(tx3 - tx2, 2) + Math.pow(ty3 - ty2, 2));
        var c = Math.sqrt(Math.pow(tx3 - tx1, 2) + Math.pow(ty3 - ty1, 2));

        var p = (a + b + c) / 2;
        var area = Math.round(Math.sqrt(p * (p - a) * (p - b) * (p - c)));

        var perimeter = Math.round(a + b + c);

        return {
            perimeter: perimeter,
            area: area
        }
    },
    perimeterAndAreaOfRect: function (rw, rl) {
        rw = Number(rw);
        rl = Number(rl);
        var perimeter = Math.round(2 * (rw + rl));
        var area = Math.round(rw * rl);
        return {
            perimeter: perimeter,
            area: area
        }
    },
    perimeterAndAreaOfCircle: function (r) {
        r = Number(r);
        var perimeter = Math.round(2 * Math.PI * r);
        var area = Math.round(Math.PI * Math.pow(r, 2));
        return {
            perimeter: perimeter,
            area: area
        }
    },
    //
    //
    //
    intersectWith2Triangles2: function (tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y) {
        function inter(lx1, ly1, lx2, ly2, tx1, ty1, tx2, ty2, tx3, ty3) {

            function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
                var crX = Math.round((y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)));
                var crY = Math.round((y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1));

                if ((y2 - y1) / (x2 - x1) == (y4 - y3) / (x4 - x3)) {
                    return { x: null, y: null }
                }
                else if (((crX > Math.min(x1, x2) && crX < Math.max(x1, x2)) && (crX > Math.min(x3, x4) && crX < Math.max(x3, x4)))) {
                    return {
                        x: crX,
                        y: crY
                    }
                }
                else if (((crX >= Math.min(x1, x2) && crX <= Math.max(x1, x2)) && (crX >= Math.min(x3, x4) && crX <= Math.max(x3, x4))) && crX != x3 && crX != x1) {
                    return {
                        x: crX,
                        y: crY
                    }
                }

                else {
                    return { x: null, y: null }
                }
            }
            var nb = 0;
            var cx1, cy1, cx2, cy2 = null;
            var result = intersect(tx1, ty1, tx2, ty2, lx1, ly1, lx2, ly2);

            if (result.x != null && result.y != null) {
                //var c = result.x + ' , ' + result.y + '  ';
                cx1 = result.x;
                cy1 = result.y;
                nb++;
            }
            //else { var c = ''; }

            result = intersect(tx2, ty2, tx3, ty3, lx1, ly1, lx2, ly2);

            if (result.x != null && result.y != null) {
                //var a = result.x + ' , ' + result.y + '  ';
                if (cx1 == null) {
                    cx1 = result.x;
                    cy1 = result.y;
                }
                else {
                    cx2 = result.x;
                    cy2 = result.y;
                }
                nb++;
            }
            //else { var a = ''; }

            result = intersect(tx1, ty1, tx3, ty3, lx1, ly1, lx2, ly2);

            if (result.x != null && result.y != null) {
                //var b = result.x + ' , ' + result.y + '  ';
                if (cx1 == null) {
                    cx1 = result.x;
                    cy1 = result.y;
                }
                else {
                    cx2 = result.x;
                    cy2 = result.y;
                }
                nb++;
            }
            //else { var b = ''; }

            return {
                //mess: c + a + b,
                cx1: cx1, cy1: cy1, cx2: cx2, cy2: cy2,
                nb: nb
            }

        }
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
        var crx = [];
        var cry = [];

        var result = inter(t1x, t1y, t2x, t2y, tx1, ty1, tx2, ty2, tx3, ty3);
        //var c = result.mess;
        if (result.cx1 != null) { crx.push(result.cx1); }
        if (result.cy1 != null) { cry.push(result.cy1); }
        if (result.cx2 != null) { crx.push(result.cx2); }
        if (result.cy2 != null) { cry.push(result.cy2); }
        var nb = result.nb;
        result = inter(t2x, t2y, t3x, t3y, tx1, ty1, tx2, ty2, tx3, ty3);
        //var a = result.mess;
        if (result.cx1 != null) { crx.push(result.cx1); }
        if (result.cy1 != null) { cry.push(result.cy1); }
        if (result.cx2 != null) { crx.push(result.cx2); }
        if (result.cy2 != null) { cry.push(result.cy2); }
        nb = result.nb + nb;
        result = inter(t1x, t1y, t3x, t3y, tx1, ty1, tx2, ty2, tx3, ty3);
        //var b = result.mess;
        if (result.cx1 != null) { crx.push(result.cx1); }
        if (result.cy1 != null) { cry.push(result.cy1); }
        if (result.cx2 != null) { crx.push(result.cx2); }
        if (result.cy2 != null) { cry.push(result.cy2); }
        nb = result.nb + nb;

        return {
            crx: crx,
            cry: cry,
            nb: nb
        }
    },

    /*AirIntersect2Triangles: function (tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y) {
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

        function arg(x1, y1, x2, y2, x3, y3, px1, py1, px2, py2, px3, py3) {
            //determinate functions 
            var a = (y2 - y1) / (x2 - x1);
            var b = y1 - a * x1;

            if (x3 * a + b < y3) {
                if (px1 * a + b < py1 && px2 * a + b < py2 && px3 * a + b < py3) {
                    return { arg: true }
                }
                else {
                    return { arg: false }
                }
            }
            if (x3 * a + b > y3) {
                if (px1 * a + b > py1 && px2 * a + b > py2 && px3 * a + b > py3) {
                    return { arg: true }
                }
                else {
                    return { arg: false }
                }
            }
        }

        function arg2(x1, y1, x2, y2, x3, y3, px1, py1) {
            //determine f1
            var a = (y2 - y1) / (x2 - x1);
            var b = y1 - a * x1;
            if (x3 * a + b < y3) {
                if (px1 * a + b < py1) {
                    var arg1 = true;
                }
                else {
                    var arg1 = false;
                }
            }
            if (x3 * a + b > y3) {
                if (px1 * a + b > py1) {
                    var arg1 = true;
                }
                else {
                    var arg1 = false;
                }
            }
            //f2
            a = (y3 - y2) / (x3 - x2);
            b = y2 - a * x2;
            if (x1 * a + b < y1) {
                if (px1 * a + b < py1) {
                    var arg2 = true;
                }
                else {
                    var arg2 = false;
                }
            }
            if (x1 * a + b > y1) {
                if (px1 * a + b < py1) {
                    var arg2 = true;
                }
                else {
                    var arg2 = false;
                }
            }

            //f3
            a = (y1 - y3) / (x1 - x3);
            b = y1 - a * x1;
            if (x2 * a + b < y2) {
                if (px1 * a + b < py1) {
                    var arg3 = true;
                }
                else {
                    var arg3 = false;
                }
            }
            if (x2 * a + b > y2) {
                if (px1 * a + b < py1) {
                    var arg3 = true;
                }
                else {
                    var arg3 = false;
                }
            }
            if (arg1 == true && arg2 == true && arg3 == true) {
                var arg = true;
            }
            else {
                var arg = false;
            }

            return { arg: arg }

        }

        var result = this.intersectWith2Triangles2(tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y);


        
        //2
        if (result.nb == 2) {
            var nbpoint1 = 0;
            var nbpoint2 = 0;
            var point1x, point2x, point1y, point2y = [];
            var result2 = arg2(tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y);
            if (result2.arg) {
                point1x.push(t1x);
                point1y.push(t1y);
                nbpoint1++;
            }
            result2 = arg2(tx1, ty1, tx2, ty2, tx3, ty3, t2x, t2y);
            if (result2.arg) {
                point1x.push(t2x);
                point1y.push(t2y);
                nbpoint1++;
            }
            result2 = arg2(tx1, ty1, tx2, ty2, tx3, ty3, t3x, t3y);
            if (result2.arg) {
                point1x.push(t3x);
                point1y.push(t3y);
                nbpoint1++;
            }

            result2 = arg2(t1x, t1y, t2x, t2y, t3x, t3y, tx1, ty1);
            if (result2.arg) {
                point2x.push(tx1);
                point2y.push(ty1);
                nbpoint2++;
            }
            result2 = arg2(t1x, t1y, t2x, t2y, t3x, t3y, tx2, ty2);
            if (result2.arg) {
                point2x.push(tx2);
                point2y.push(ty2);
                nbpoint2++;
            }
            result2 = arg2(t1x, t1y, t2x, t2y, t3x, t3y, tx3, ty3);
            if (result2.arg) {
                point2x.push(tx3);
                point2y.push(ty3);
                nbpoint2++;
            }
            if ((nbpoint1 == 1 || nbpoint2 == 1) && (nbpoint1 == 0 || nbpoint == 0)) {
                var area = this.perimeterAndAreaOfTriangle(result.crx[0], result.cry[0], result.crx[1], result.cry[1], pointx[0], pointx[1]);
                return { area: area.area }
            }
            if ((nbpoint1 == 2 || nbpoint2 == 2) && (nbpoint1 == 0 || nbpoint == 0)) {
                var area = this.perimeterAndAreaOfTriangle(result.crx[0], result.cry[0], result.crx[1], result.cry[1], pointx[0], pointx[1]);
                return { area: area.area }
            }
            if ((nbpoint1 == 2 || nbpoint2 == 2) && (nbpoint1 == 0 || nbpoint == 0)) {
                var area = this.perimeterAndAreaOfTriangle(result.crx[0], result.cry[0], result.crx[1], result.cry[1], pointx[0], pointx[1]);
                return { area: area.area }
            }

        }


    },*/
    AirIntersect2Triangles: function (tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y) {
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

        var result;
        function arg(x1, y1, x2, y2, x3, y3, px1, py1, px2, py2, px3, py3) {
            //determinate functions 
            var a = (y2 - y1) / (x2 - x1);
            var b = y1 - a * x1;

            if (x3 * a + b < y3) {
                if (px1 * a + b <= py1 && px2 * a + b <= py2 && px3 * a + b <= py3) {
                    return { arg: true }
                }
                else {
                    return { arg: false }
                }
            }
            if (x3 * a + b > y3) {
                if (px1 * a + b >= py1 && px2 * a + b >= py2 && px3 * a + b >= py3) {
                    return { arg: true }
                }
                else {
                    return { arg: false }
                }
            }
        }
        function arg2(x1, y1, x2, y2, x3, y3, px1, py1) {
            //determine f1
            var a = (y2 - y1) / (x2 - x1);
            var b = y1 - a * x1;
            if (x3 * a + b < y3) {
                if (px1 * a + b < py1) {
                    var arg1 = true;
                }
                else {
                    var arg1 = false;
                }
            }
            if (x3 * a + b > y3) {
                if (px1 * a + b > py1) {
                    var arg1 = true;
                }
                else {
                    var arg1 = false;
                }
            }
            //f2
            a = (y3 - y2) / (x3 - x2);
            b = y2 - a * x2;
            if (x1 * a + b < y1) {
                if (px1 * a + b < py1) {
                    var arg2 = true;
                }
                else {
                    var arg2 = false;
                }
            }
            if (x1 * a + b > y1) {
                if (px1 * a + b > py1) {
                    var arg2 = true;
                }
                else {
                    var arg2 = false;
                }
            }

            //f3
            a = (y1 - y3) / (x1 - x3);
            b = y1 - a * x1;
            if (x2 * a + b < y2) {
                if (px1 * a + b < py1) {
                    var arg3 = true;
                }
                else {
                    var arg3 = false;
                }
            }
            if (x2 * a + b > y2) {
                if (px1 * a + b > py1) {
                    var arg3 = true;
                }
                else {
                    var arg3 = false;
                }
            }
            if (arg1 == true && arg2 == true && arg3 == true) {
                var arg = true;
            }
            else {
                var arg = false;
            }

            return { inside: arg }

        }

        result = this.intersectWith2Triangles2(tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y);
        var xs = result.crx;
        var ys = result.cry;

        //0 and 1
        if (result.nb == 0 || result.nb == 1) {
            var result2 = arg(tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y, t2x, t2y, t3x, t3y);
            var arg1 = result2.arg;
            result2 = arg(tx2, ty2, tx3, ty3, tx1, ty1, t1x, t1y, t2x, t2y, t3x, t3y);
            var arg2 = result2.arg;
            result2 = arg(tx3, ty3, tx1, ty1, tx2, ty2, t1x, t1y, t2x, t2y, t3x, t3y);
            var arg3 = result2.arg;
            if (arg1 == true && arg2 == true && arg3 == true) {
                var temp = this.perimeterAndAreaOfTriangle(t1x, t1y, t2x, t2y, t3x, t3y);
                return { area: temp.area }
            }
            else {
                result2 = arg(t1x, t1y, t2x, t2y, t3x, t3y, tx1, ty1, tx2, ty2, tx3, ty3);
                arg1 = result2.arg;
                result2 = arg(t2x, t2y, t3x, t3y, t1x, t1y, tx1, ty1, tx2, ty2, tx3, ty3);
                arg2 = result2.arg;
                result2 = arg(t3x, t3y, t1x, t1y, t2x, t2y, tx1, ty1, tx2, ty2, tx3, ty3);
                arg3 = result2.arg;
                if (arg1 == true && arg2 == true && arg3 == true) {
                    temp = this.perimeterAndAreaOfTriangle(tx1, ty1, tx2, ty2, tx3, ty3);
                    return { area: temp.area }
                }
                else { return { area: "None" } }
            }
        }

        //>=2
        result = arg2(tx1, ty1, tx2, ty2, tx3, ty3, t1x, t1y);
        if (result.inside) {
            xs.push(t1x);
            ys.push(t1y);
        }
        result = arg2(tx1, ty1, tx2, ty2, tx3, ty3, t2x, t2y);
        if (result.inside) {
            xs.push(t2x);
            ys.push(t2y);
        }
        result = arg2(tx1, ty1, tx2, ty2, tx3, ty3, t3x, t3y);
        if (result.inside) {
            xs.push(t3x);
            ys.push(t3y);
        }
        //
        result = arg2(t1x, t1y, t2x, t2y, t3x, t3y, tx1, ty1);
        if (result.inside) {
            xs.push(tx1);
            ys.push(ty1);
        }
        result = arg2(t1x, t1y, t2x, t2y, t3x, t3y, tx2, ty2);
        if (result.inside) {
            xs.push(tx2);
            ys.push(ty2);
        }
        result = arg2(t1x, t1y, t2x, t2y, t3x, t3y, tx3, ty3);
        if (result.inside) {
            xs.push(tx3);
            ys.push(ty3);
        }
        result = this.PointsArrange(xs, ys);
        xs = result.orderx;
        ys = result.ordery;
        result = this.AirAnyShape(xs, ys);
        return {
            area: result.area
        }

    },
    //
    AirAnyShape: function (x, y) {
        //x, y : arr, length >= 3
        var area;
        if (x.length == 3) {
            x[0] = Number(x[0]);
            x[1] = Number(x[1]);
            x[2] = Number(x[2]);
            y[0] = Number(y[0]);
            y[1] = Number(y[1]);
            y[2] = Number(y[2]);
            var result = this.perimeterAndAreaOfTriangle(x[0], y[0], x[1], y[1], x[2], y[2]);
            area = result.area;
        }
        if (x.length == 4) {
            x[0] = Number(x[0]);
            x[1] = Number(x[1]);
            x[2] = Number(x[2]);
            x[3] = Number(x[3]);
            y[0] = Number(y[0]);
            y[1] = Number(y[1]);
            y[2] = Number(y[2]);
            y[3] = Number(y[3]);
            area = Math.abs(Math.round((x[0] * y[1] + x[1] * y[2] + x[2] * y[3] + x[3] * y[0] - x[1] * y[0] - x[2] * y[1] - x[3] * y[2] - x[0] * y[3]) / 2));
        }
        if (x.length == 5) {
            x[0] = Number(x[0]);
            x[1] = Number(x[1]);
            x[2] = Number(x[2]);
            x[3] = Number(x[3]);
            x[4] = Number(x[4]);
            y[0] = Number(y[0]);
            y[1] = Number(y[1]);
            y[2] = Number(y[2]);
            y[3] = Number(y[3]);
            y[4] = Number(y[4]);
            area = Math.abs(Math.round((x[0] * y[1] + x[1] * y[2] + x[2] * y[3] + x[3] * y[4] + x[4] * y[0] - x[1] * y[0] - x[2] * y[1] - x[3] * y[2] - x[4] * y[3] - x[0] * y[4]) / 2));
        }
        if (x.length == 6) {
            x[0] = Number(x[0]);
            x[1] = Number(x[1]);
            x[2] = Number(x[2]);
            x[3] = Number(x[3]);
            x[4] = Number(x[4]);
            x[5] = Number(x[5]);
            y[0] = Number(y[0]);
            y[1] = Number(y[1]);
            y[2] = Number(y[2]);
            y[3] = Number(y[3]);
            y[4] = Number(y[4]);
            y[5] = Number(y[5]);
            area = Math.abs(Math.round((x[0] * y[1] + x[1] * y[2] + x[2] * y[3] + x[3] * y[4] + x[4] * y[5] + x[5] * y[0] - x[1] * y[0] - x[2] * y[1] - x[3] * y[2] - x[4] * y[3] - x[5] * y[4] - x[0] * y[5]) / 2));
        }
        return {
            area: area
        }
    },


    PointsArrange: function (x, y) {
        function intersect2Lines(x1, y1, x2, y2, x3, y3, x4, y4) {
            x1 = Number(x1);
            x2 = Number(x2);
            x3 = Number(x3);
            x4 = Number(x4);
            y1 = Number(y1);
            y2 = Number(y2);
            y3 = Number(y3);
            y4 = Number(y4);
            var crX = Math.round((y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)));
            var crY = (y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1);

            if (((crX > Math.min(x1, x2) && crX < Math.max(x1, x2)) || (crX > Math.min(x3, x4) && crX < Math.max(x3, x4)))) {
                var cross = true;
            }
            else if ((y2 - y1) / (x2 - x1) == (y4 - y3) / (x4 - x3)) {
                var cross = false;
            }
            else {
                var cross = false;
            }
            return { cross: cross }
        }
        function intersectMajorLine4(x1, y1, x2, y2, x3, y3, x4, y4) {
            //here can simplify
            //x1,y1,x2,y2 major line two points
            var result = intersect2Lines(x1, y1, x2, y2, x2, y2, x3, y3);
            var cross1 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x3, y3, x4, y4);
            var cross2 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x1, y1, x3, y3);
            var cross3 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x4, y4);
            var cross4 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x1, y1, x4, y4);
            var cross5 = result.cross;
            if (cross1 || cross2 || cross3 || cross4 || cross5) {
                return { cross: true }
            }
            else {
                return { cross: false }
            }

        }
        function intersectMajorLine5(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5) {
            var result = intersect2Lines(x1, y1, x2, y2, x1, y1, x3, y3);
            var cross1 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x1, y1, x4, y4);
            var cross2 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x1, y1, x5, y5);
            var cross3 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x3, y3);
            var cross4 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x4, y4);
            var cross5 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x5, y5);
            var cross6 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x3, y3, x4, y4);
            var cross7 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x3, y3, x5, y5);
            var cross8 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x4, y4, x5, y5);
            var cross9 = result.cross;
            if (cross1 || cross2 || cross3 || cross4 || cross5 || cross6 || cross7 || cross8 || cross9) {
                return { cross: true }
            }
            else {
                return { cross: false }
            }
        }
        function intersectMajorLine6(x1, y1, x2, y2, x3, y3, x4, y4, x5, y5, x6, y6) {
            var result = intersect2Lines(x1, y1, x2, y2, x1, y1, x3, y3);
            var cross1 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x1, y1, x4, y4);
            var cross2 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x1, y1, x5, y5);
            var cross3 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x1, y1, x6, y6);
            var cross4 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x3, y3);
            var cross5 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x4, y4);
            var cross6 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x5, y5);
            var cross7 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x2, y2, x6, y6);
            var cross8 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x3, y3, x4, y4);
            var cross9 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x3, y3, x5, y5);
            var cross10 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x3, y3, x6, y6);
            var cross11 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x4, y4, x5, y5);
            var cross12 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x4, y4, x6, y6);
            var cross13 = result.cross;
            result = intersect2Lines(x1, y1, x2, y2, x5, y5, x6, y6);
            var cross14 = result.cross;
            if (cross1 || cross2 || cross3 || cross4 || cross5 || cross6 || cross7 || cross8 || cross9 || cross10 || cross11 || cross12 || cross13 || cross14) {
                return { cross: true }
            }
            else {
                return { cross: false }
            }
        }
        nb = Number(x.length);
        if (nb < 4) {
            return { orderx: x, ordery: y };
        }

        var orderx = [], ordery = [];
        var result;

        if (nb == 4) {
            //1-2 1, 2-3 2, 3-4 3, 1-3 4, 2-4 5, 1-4 6
            result = intersectMajorLine4(x[0], y[0], x[1], y[1], x[2], y[2], x[3], y[3]);
            if (!result.cross) {
                result = intersectMajorLine4(x[1], y[1], x[2], y[2], x[0], y[0], x[3], y[3]);
            }
            else {
                orderx = [x[0], x[2], x[1], x[3]];
                ordery = [y[0], y[2], y[1], y[3]];
                return {
                    orderx: orderx,
                    ordery: ordery
                }
            }
            if (!result.cross) {
                result = intersectMajorLine4(x[2], y[2], x[3], y[3], x[0], y[0], x[1], y[1]);
            }
            else {
                orderx = [x[1], x[0], x[2], x[3]];
                ordery = [y[1], y[0], y[2], y[3]];
                return {
                    orderx: orderx,
                    ordery: ordery
                }
            }
            if (!result.cross) {
                result = intersectMajorLine4(x[0], y[0], x[2], y[2], x[1], y[1], x[3], y[3]);
            }
            else {
                orderx = [x[2], x[0], x[3], x[1]];
                ordery = [y[2], y[0], y[3], y[1]];
                return {
                    orderx: orderx,
                    ordery: ordery
                }
            }
            if (!result.cross) {
                orderx = [x[1], x[0], x[3], x[2]];
                ordery = [y[1], y[0], y[3], y[2]];
                return {
                    orderx: orderx,
                    ordery: ordery
                }
            }
        }
        if (nb == 5) {
            //certain:opp1x.length=2
            var opp1x = [], opp1y = [];
            var adj1x = x.slice(), adj1y = y.slice();
            result = intersectMajorLine5(x[0], y[0], x[4], y[4], x[1], y[1], x[2], y[2], x[3], y[3]);
            if (result.cross) {
                opp1x.push(x[4]);
                opp1y.push(y[4]);
                adj1x.splice(4, 1);
                adj1y.splice(4, 1);
            }
            result = intersectMajorLine5(x[0], y[0], x[3], y[3], x[1], y[1], x[2], y[2], x[4], y[4]);
            if (result.cross) {
                opp1x.push(x[3]);
                opp1y.push(y[3]);
                adj1x.splice(3, 1);
                adj1y.splice(3, 1);
            }
            result = intersectMajorLine5(x[0], y[0], x[2], y[2], x[1], y[1], x[3], y[3], x[4], y[4]);
            if (result.cross) {
                opp1x.push(x[2]);
                opp1y.push(y[2]);
                adj1x.splice(2, 1);
                adj1y.splice(2, 1);
            }
            result = intersectMajorLine5(x[0], y[0], x[1], y[1], x[2], y[2], x[3], y[3], x[4], y[4]);
            if (result.cross) {
                opp1x.push(x[1]);
                opp1y.push(y[1]);
                adj1x.splice(1, 1);
                adj1y.splice(1, 1);
            }
            adj1x.shift();
            adj1y.shift();

            //adj right order ,opp inversed

            result = intersectMajorLine5(opp1x[0], opp1y[0], adj1x[0], adj1y[0], x[0], y[0], opp1x[1], opp1y[1], adj1x[1], adj1y[1]);
            if (!result.cross) {
                orderx = [adj1x[0], opp1x[0], opp1x[1], adj1x[1], x[0]];
                ordery = [adj1y[0], opp1y[0], opp1y[1], adj1y[1], y[0]];
            }
            else {
                orderx = [adj1x[1], opp1x[0], opp1x[1], adj1x[0], x[0]];
                ordery = [adj1y[1], opp1y[0], opp1y[1], adj1y[0], y[0]];
            }
            return {
                orderx: orderx,
                ordery: ordery
            }

        }

        if (nb == 6) {
            var opp1x = [], opp1y = [];
            var adj1x = x.slice(), adj1y = y.slice();
            //certain:opp1x.length=3 ,adj= 2
            result = intersectMajorLine6(x[0], y[0], x[5], y[5], x[1], y[1], x[2], y[2], x[3], y[3], x[4], y[4]);
            if (result.cross) {
                opp1x.push(x[5]);
                opp1y.push(y[5]);
                adj1x.splice(5, 1);
                adj1y.splice(5, 1);
            }
            result = intersectMajorLine6(x[0], y[0], x[4], y[4], x[1], y[1], x[2], y[2], x[3], y[3], x[5], y[5]);
            if (result.cross) {
                opp1x.push(x[4]);
                opp1y.push(y[4]);
                adj1x.splice(4, 1);
                adj1y.splice(4, 1);
            }
            result = intersectMajorLine6(x[0], y[0], x[3], y[3], x[1], y[1], x[2], y[2], x[4], y[4]), x[5], y[5];
            if (result.cross) {
                opp1x.push(x[3]);
                opp1y.push(y[3]);
                adj1x.splice(3, 1);
                adj1y.splice(3, 1);
            }
            result = intersectMajorLine6(x[0], y[0], x[2], y[2], x[1], y[1], x[3], y[3], x[4], y[4], x[5], y[5]);
            if (result.cross) {
                opp1x.push(x[2]);
                opp1y.push(y[2]);
                adj1x.splice(2, 1);
                adj1y.splice(2, 1);
            }
            result = intersectMajorLine6(x[0], y[0], x[1], y[1], x[2], y[2], x[3], y[3], x[4], y[4], x[5], y[5]);
            if (result.cross) {
                opp1x.push(x[1]);
                opp1y.push(y[1]);
                adj1x.splice(1, 1);
                adj1y.splice(1, 1);
            }
            adj1x.shift();
            adj1y.shift();

            //adj right order ,opp inversed
            result = intersectMajorLine6(opp1x[0], opp1y[0], adj1x[0], adj1y[0], x[0], y[0], opp1x[1], opp1y[1], opp1x[2], opp1y[2], adj1x[1], adj1y[1]);
            var cross1 = result.cross;
            result = intersectMajorLine6(opp1x[0], opp1y[0], adj1x[1], adj1y[1], x[0], y[0], opp1x[1], opp1y[1], opp1x[2], opp1y[2], adj1x[0], adj1y[0]);
            var cross2 = result.cross;
            if (cross1 && cross2) {
                opp1x = [opp1x[1], opp1x[0], opp1x[2]];
                opp1y = [opp1y[1], opp1y[0], opp1y[2]];
            }
            else {
                result = intersectMajorLine6(opp1x[1], opp1y[1], adj1x[0], adj1y[0], x[0], y[0], opp1x[0], opp1y[0], opp1x[2], opp1y[2], adj1x[1], adj1y[1]);
                cross1 = result.cross;
                result = intersectMajorLine6(opp1x[1], opp1y[1], adj1x[1], adj1y[1], x[0], y[0], opp1x[0], opp1y[0], opp1x[2], opp1y[2], adj1x[0], adj1y[0]);
                cross2 = result.cross;
                if (!cross1 || !cross2) {
                    opp1x = [opp1x[0], opp1x[2], opp1x[1]];
                    opp1y = [opp1y[0], opp1y[2], opp1y[1]];
                }
            }
            //
            result = intersectMajorLine6(opp1x[0], opp1y[0], adj1x[0], adj1y[0], x[0], y[0], opp1x[1], opp1y[1], opp1x[2], opp1y[2], adj1x[1], adj1y[1]);
            if (!result.cross) {
                orderx = [adj1x[0], opp1x[0], opp1x[1], opp1x[2], adj1x[1], x[0]];
                ordery = [adj1y[0], opp1y[0], opp1y[1], opp1y[2], adj1y[1], y[0]];
            }
            else {
                orderx = [adj1x[1], opp1x[0], opp1x[1], opp1x[2], adj1x[0], x[0]];
                ordery = [adj1y[1], opp1y[0], opp1y[1], opp1y[2], adj1y[0], y[0]];
            }
            return {
                orderx: orderx,
                ordery: ordery
            }
        }
    },



}