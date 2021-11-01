import { SketchPoint } from "../entities/sketch-point.js";
import { SketchFigure } from "../entities/sketch-figure.js";

describe("Tests for SketchFigure class", () => {
    it("_assignId method should return a unique ID for SketchFigure object", () => {
        const testCount = 10000;

        const idMap = {};
        for (let i = 0; i < testCount; i++) {
            const sketchPoints = [];
            for (let i = 0; i < Math.ceil(Math.random()*100); i++) {
                const point = new SketchPoint(Math.ceil(Math.random()*100), Math.ceil(Math.random()*100), Math.ceil(Math.random()*100));
                sketchPoints.push(point);
            }

            const sketchFigure = new SketchFigure(sketchPoints);
            sketchFigure._assignId();

            if (!idMap[sketchFigure.id]) idMap[sketchFigure.id] = true;
            else throw new Error("ID is not unique: " + sketchFigure.id);
        }
    });
});