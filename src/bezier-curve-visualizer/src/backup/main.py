import matplotlib.pyplot as plt
from datetime import datetime 
from util import Point, readNumericInput
from dncNPoints import dnc_bezier
from bfNPoints import bf_bezier

def plot_bezier_curve(points, bezier_curve_result, type):
    pointx = [p.x for p in points]
    pointy = [p.y for p in points]

    plt.grid(True)
    if (type == 1): #dnc
        resultx = [p.x for p in bezier_curve_result["points"]]
        resulty = [p.y for p in bezier_curve_result["points"]]
        for iteration in bezier_curve_result["mid_points_history"]:
            for level in iteration["mid_points"]:
                midpointx, midpointy = zip(*[(p.x, p.y) for p in level])
                plt.plot(midpointx, midpointy, 'g.-')
    else:
        resultx = [p.x for p in bezier_curve_result]
        resulty = [p.y for p in bezier_curve_result]
    plt.plot(pointx, pointy, 'ro-', label='Control Points')
    plt.plot(resultx, resulty, 'b-', label='Bézier Curve')

    plt.legend()
    plt.show()

def main():
    print()
    print("__________              .__               _________                            ")
    print("\______   \ ____ _______|__| ___________  \_   ___ \ __ ____________  __ ____  ")
    print(" |    |  _// __ \___   /  |/ __ \_  __ \ /    \  \/|  |  \_  __ \  \/ // __ \ ")
    print(" |    |  \  ___/ /    /|  \  ___/|  | \/ \     \___|  |  /|  | \/\   /\  ___/ ")
    print(" |______ /\___  >_____ \__|\___  >__|     \______  /____/ |__|    \_/  \___  >")
    print("       \/     \/      \/       \/                \/                        \/ ")

    print("--------------MENU--------------")
    print("1. Algoritma Divide and Cønquer")
    print("2. Algoritma Brute Force")
    print("--------------------------------")
    inputType = input("Silakan pilih jenis masukan!(1/2) ")
    while (inputType != '1' and inputType != '2'):
        inputType = input("Silakan pilih jenis masukan!(1/2)")

    n_point = readNumericInput("Masukkan banyak titik kontrol(minimal 3): ", 2)
    control_points = []
    for i in range((n_point)):
        point_input = input(f"Masukkan koordinat titik kontrol ke-{i+1} (format x,y): ")
        x, y = map(float, point_input.split(','))
        control_points.append(Point(x, y))

    iteration = readNumericInput("Masukkan jumlah iterasi(minimal 1): ", 0)

    start = datetime.now()
    if (inputType == '1'):
        bezier_curve_result = dnc_bezier(control_points, iteration, iteration)
        bezier_curve_result["points"] = [control_points[0]] + bezier_curve_result["points"] + [control_points[-1]]
    else:
        bezier_curve_result = bf_bezier(control_points, iteration)
    end = datetime.now()
    runtime = (end - start).total_seconds() * 10**3

    print()
    print("Runtime: ", round(runtime), "ms")

    if (inputType == '1'):
        plot_bezier_curve(control_points, bezier_curve_result, 1)
    else:
        plot_bezier_curve(control_points, bezier_curve_result, 2)

if __name__ == "__main__":
    main()