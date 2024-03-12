package main

import (

	"github.com/fogleman/gg"
)

type Point struct{
	x float64
	y float64
}

func dnc(p1,p2,p3 Point, iterat int) []Point {
	if iterat==0{
		arr:=[]Point{p1,p3}
		return arr
	}

	var lefts,rights,mids Point
	lefts.x = 0.5*(p1.x+p2.x)
	lefts.y = 0.5*(p1.y+p2.y)
	rights.x = 0.5*(p2.x+p3.x)
	rights.y = 0.5*(p2.y+p3.y)
	mids.x = 0.5*(lefts.x+rights.x)
	mids.y = 0.5*(lefts.y+rights.y)

	leftres := dnc(p1,lefts,mids,iterat-1)
	rightres := dnc(mids,rights,p3,iterat-1)
	fullres := append(leftres,rightres...)
	return fullres
}

func main() {
	const width = 800
	const height = 600
	dc := gg.NewContext(width, height)

	// Set background color to white
	dc.SetRGB(1, 1, 1) // White color
	dc.Clear()

	dc.SetRGB(0, 0, 0) // Black color
	var p1,p2,p3 Point
	p1.x = 100
	p1.y = 500
	p2.x = 400
	p2.y = 100
	p3.x = 700
	p3.y = 550
	dc.DrawLine(p1.x,p1.y,p2.x,p2.y)
	dc.DrawLine(p2.x,p2.y,p3.x,p3.y)
	res := dnc(p1,p2,p3,10)
	for i:=0;i<len(res)-1;i++{
		dc.DrawLine(res[i].x,res[i].y,res[i+1].x,res[i+1].y)
	}
	dc.Stroke()
	// Save the image to a file
	dc.SavePNG("line.png")
}
