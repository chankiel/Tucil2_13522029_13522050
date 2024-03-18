import { midP } from "./util";

function iterateFind(points) {
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

export function dncBeizer(points, iteration, depth) {
    if (depth === 0) {
        return { points: [], midPointsHistory: [] };
    }

    // divide problem to leftside and rightside
    const [leftSide, mid, rightSide, currentMidPoints] = iterateFind(points);
    // apply dnc to each subproblem
    let leftResult = dncBeizer(leftSide, iteration, depth - 1);
    let rightResult = dncBeizer(rightSide, iteration, depth - 1);

    return {
        points : (leftResult.points).concat(mid).concat(rightResult.points),
        midPointsHistory: (leftResult.midPointsHistory).concat([{ iteration: iteration-depth+1, midPoints: currentMidPoints }], rightResult.midPointsHistory)
    };
    // points : the points of final bezier curve generated by dnc algo
    // midPointsHistory : array of midpoints history per iteration, for visualization purpose
}
