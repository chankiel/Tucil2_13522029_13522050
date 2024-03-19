from util import Point  

def bf_recursive(points, t):
    if len(points) == 1:
        return points[0]
    else:
        point1 = bf_recursive(points[:-1], t)
        point2 = bf_recursive(points[1:], t)
        return Point(
            ((1 - t) * point1.x) + (t * point2.x),
            ((1 - t) * point1.y) + (t * point2.y)
        )

def bf_bezier(points, iterations):
    n_points = (2 ** iterations) + 1
    arr_points = []
    for i in range(n_points):
        t = i / (n_points - 1)
        arr_points.append(bf_recursive(points, t))
    return arr_points
