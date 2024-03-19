from util import Point, midP

def iterate_find(points):
    length_arr = len(points)
    arr = points[:]
    left_arr = [points[0]]
    right_arr = [points[-1]]
    mid_points = []

    while length_arr >= 2:
        arr_temp = []
        for i in range(length_arr - 1):
            mid_point = midP(arr[i], arr[i + 1])
            arr_temp.append(mid_point)
        left_arr.append(arr_temp[0])
        right_arr.insert(0, arr_temp[-1])
        arr = arr_temp
        length_arr -= 1
        mid_points.append(arr_temp)

    return [left_arr, [arr[0]], right_arr, mid_points]

def dnc_bezier(points, iteration, depth):
    if depth == 0:
        return {"points": [], "mid_points_history": []}

    left_side, mid, right_side, current_mid_points = iterate_find(points)
    left_result = dnc_bezier(left_side, iteration, depth - 1)
    right_result = dnc_bezier(right_side, iteration, depth - 1)

    return {
        "points": left_result["points"] + mid + right_result["points"],
        "mid_points_history": left_result["mid_points_history"] + [{"iteration": iteration - depth + 1, "mid_points": current_mid_points}] + right_result["mid_points_history"]
    }
