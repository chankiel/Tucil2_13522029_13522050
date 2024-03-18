import { Point } from "./util";

export function bfRecursive(points, t){
    if (points.length==1){
        return points[0];
    }else{
        let point1 = bfBeizer(points.slice(0,points.length-1),t);
        let point2 = bfBeizer(points.slice(1),t);
        return new Point(
            ((1-t)*point1.x)+(t*point2.x),
            ((1-t)*point1.y)+(t*point2.y)
        )
    }
}

export function bfBeizer(points,iteration){
    let nPoints = (2**iteration)+1;
    const arrPoints = [];
    for (let i=0;i<nPoints;i++){
        const t = i/(n-1);
        arrPoints.push(bfRecursive(points,t));
    }
    return arrPoints;
}