import { Point } from "./types";

export const lerp = (A: number, B: number, t: number) => {
    return A + (B - A) * t;
}

export const getIntersection = (A1: Point, A2: Point, B1: Point, B2: Point) => {
    const denominator =
        (B2.y - B1.y) * (A2.x - A1.x) - (B2.x - B1.x) * (A2.y - A1.y);

    if (denominator === 0) {
        return null;
    }

    const uA =
        ((B2.x - B1.x) * (A1.y - B1.y) - (B2.y - B1.y) * (A1.x - B1.x)) /
        denominator;
    const uB =
        ((A2.x - A1.x) * (A1.y - B1.y) - (A2.y - A1.y) * (A1.x - B1.x)) /
        denominator;

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        const x = lerp(A1.x, A2.x, uA);
        const y = lerp(A1.y, A2.y, uA);

        return {
            x,
            y,
            offset: Math.sqrt(Math.pow(x - A1.x, 2) + Math.pow(y - A1.y, 2)),
        };
    }

    return null;
}