package main

import (
	"fmt"

	"github.com/fogleman/gg"
)

type Point struct {
	x float64
	y float64
}

func midP(point1, point2 Point) Point {
	var point Point
	point.x = 0.5 * (point1.x + point2.x)
	point.y = 0.5 * (point1.y + point2.y)
	return point
}

func sol(points []Point) ([]Point, []Point, []Point) {
	fmt.Print("points: ")
	fmt.Println(points)
	lengthArr := len(points)
	arr := make([]Point, len(points))
	leftarr := []Point{points[0]}
	rightarr := []Point{points[lengthArr-1]}
	// midPoints := []

	copy(arr, points)

	for lengthArr>=2{
		fmt.Print("lengthArr: ")
		fmt.Println(lengthArr) 
		arrTemp := make([]Point,lengthArr-1)
		midTemp := make([]Point,lengthArr-1)
		for i:=0;i<lengthArr-1;i++{
			arrTemp[i] = midP(arr[i],arr[i+1])
			midTemp[i]=midP(arr[i],arr[i+1])
		}
		leftarr = append(leftarr, arrTemp[0])
		rightarr = append([]Point{arrTemp[lengthArr-2]},rightarr...)
		copy(arr,arrTemp)
		lengthArr--
		fmt.Print("leftarr: ")
		fmt.Println(leftarr)
		fmt.Print("rightarr: ")
		fmt.Println(rightarr)
		fmt.Print("arr: ")
		fmt.Println(arr)
		fmt.Print("mid: ")
		fmt.Println(midTemp)
		fmt.Print("arrtemp: ")
		fmt.Println(arrTemp)
		fmt.Println()
	}
	return leftarr,[]Point{arr[0]},rightarr
}

func dnc(points []Point, iterat int) []Point {
	if iterat == 0 {
		return make([]Point, 0)
	}
	ls, mid, rs := sol(points)
	// fmt.Println(iterat)
	// fmt.Println(ls)
	// fmt.Println(mid)
	// fmt.Println(rs)
	leftRes := dnc(ls, iterat-1)
	rightRes := dnc(rs, iterat-1)
	return append(leftRes, append(mid, rightRes...)...)
}

func main() {
	const width = 800
	const height = 600
	dc := gg.NewContext(width, height)

	// Set background color to white
	dc.SetRGB(1, 1, 1) // White color
	dc.Clear()

	dc.SetRGB(0, 0, 0) // Black color
	var p1, p2, p3, p4,p5 Point
	p1.x = 0
	p1.y = 0
	p2.x = 2
	p2.y = 4
	p3.x = 4
	p3.y = 2
	p4.x = 6
	p4.y = 4
	p5.x = 4
	p5.y = 3
	dc.DrawLine(p1.x, p1.y, p2.x, p2.y)
	dc.DrawLine(p2.x, p2.y, p3.x, p3.y)
	dc.DrawLine(p3.x, p3.y, p4.x, p4.y)
	dc.DrawLine(p4.x, p4.y, p5.x, p5.y)
	
	// dc.DrawLine(p5.x, p5.y, p3.x, p3.y)
	res := []Point{p1}
	res = append(res, dnc([]Point{p1,p2,p3,p4},2)...)
	res = append(res, p4)
	fmt.Println(res)
	dc.Stroke()
	for i:=0;i<len(res)-1;i++{
		// dc.DrawPoint(res[i].x,res[i].y,1)
		dc.DrawLine(res[i].x,res[i].y,res[i+1].x,res[i+1].y)
	}
	dc.Stroke()
	// Save the image to a file
	dc.SavePNG("line.png")
}