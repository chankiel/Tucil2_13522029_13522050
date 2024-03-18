import { midP } from "./util";

function sol(points) {
    let lengthArr = points.length;
    let arr = points.slice(); 
    let leftArr = [points[0]];
    let rightArr = [points[lengthArr - 1]];
    let midPoints = [];

    while (lengthArr >= 2) {
        let arrTemp = [];
        for (let i = 0; i < lengthArr - 1; i++) {
            const midPoint = midP(arr[i], arr[i + 1]);
            arrTemp.push(midPoint);
        }
        leftArr.push(arrTemp[0]);
        rightArr.unshift(arrTemp[lengthArr - 2]);
        arr = arrTemp;
        lengthArr--;
        midPoints.push(arrTemp);
    }

    return [leftArr, [arr[0]], rightArr, midPoints];
}

export function dnc(points, iteration, depth) {
    if (depth === 0) {
        return { points: [], midPointsHistory: [] };
    }

    const [leftSide, mid, rightSide, currentMidPoints] = sol(points);
    let leftResult = dnc(leftSide, iteration, depth - 1);
    let rightResult = dnc(rightSide, iteration, depth - 1);

    return {
        points : (leftResult.points).concat(mid).concat(rightResult.points),
        midPointsHistory: (leftResult.midPointsHistory).concat([{ iteration: iteration-depth+1, midPoints: currentMidPoints }], rightResult.midPointsHistory)
    };
}
