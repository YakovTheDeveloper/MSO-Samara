export const parseCoords = (location: string): [number, number] => {
    return location.split(',').map(coord => parseFloat(coord)) as [number, number];
}
