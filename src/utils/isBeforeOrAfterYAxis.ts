export function isBeforeOrAfterYAxis(coords: [number, number], width: number): 'left' | 'right' | 'center' {
    const [_x, y] = coords;
    const centerX = width / 2;

    if (y > centerX) {
        return 'left';
    } else if (y < centerX) {
        return 'right';
    } else {
        return 'center';
    }
}