export default class Zone {
    code: string;
    name: string;
    codeEpci: string;
    contour: number[][];
    centre: number[];
    population: number;
    department: string;
    region: string;

    constructor(
        code: string,
        name: string,
        codeEpci: string,
        contour: number[][],
        centre: number[],
        population: number,
        department: string,
        region: string
    ) {
        this.code = code;
        this.name = name;
        this.codeEpci = codeEpci;
        this.contour = contour;
        this.centre = centre;
        this.population = population;
        this.department = department;
        this.region = region;
    }
}