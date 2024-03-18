export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export function midP(point1, point2) {
    return new Point(
        0.5 * (point1.x + point2.x),
        0.5 * (point1.y + point2.y)
    );
}