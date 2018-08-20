var geojs = {
    /**
     * Get the intersection of two lines
     */
    intersect: function (x1, y1, x2, y2, x3, y3, x4, y4) {
        var crX = (y3 - y1 - x3 * (y4 - y3) / (x4 - x3) + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3));
        var crY = (y2 - y1) / (x2 - x1) * (y3 - x3 * (y4 - y3) / (x4 - x3) - y1 + x1 * (y2 - y1) / (x2 - x1)) / ((y2 - y1) / (x2 - x1) - (y4 - y3) / (x4 - x3)) + y1 - x1 * (y2 - y1) / (x2 - x1);
        return {
            x: crX,
            y: crY
        }
    }
}