class Vehiculo {
    id;
    modelo;
    anoFab;
    velMax;

    constructor(id, modelo, anoFab, velMax) {
        if (id > 0 && modelo !== "" && anoFab > 1885 && velMax > 0) {
            this.id = id;
            this.modelo = modelo;
            this.anoFab = anoFab;
            this.velMax = velMax;
        }
    }

    toString() {
        return (this.id + ", " + this.modelo + ", " + this.anoFab + ", " + this.velMax);
    }
}

class Aereo extends Vehiculo {
    altMax;
    autonomia;

    constructor(id, modelo, anoFab, velMax, altMax, autonomia) {
        if (altMax > 0 && autonomia > 0) {
            super(id, modelo, anoFab, velMax);
            this.altMax = altMax;
            this.autonomia = autonomia;

        }
    }

}

class Terrestre extends Vehiculo {
    cantPue;
    cantRue;

    constructor(id, modelo, anoFab, velMax, cantPue, cantRue) {
        if (cantPue > -1 && cantRue > 0) {
            super(id, modelo, anoFab, velMax);
            this.cantPue = cantPue;
            this.cantRue = cantRue;
        }
    }

}

let array =
    [
        { "id": 14, "modelo": "Ferrari F100", "anoFab": 1998, "velMax": 400, "cantPue": 2, "cantRue": 4 },
        { "id": 51, "modelo": "DodgeViper", "anoFab": 1991, "velMax": 266, "cantPue": 2, "cantRue": 4 },
        { "id": 67, "modelo": "Boeing CH-47 Chinook", "anoFab": 1962, "velMax": 302, "altMax": 6, "autonomia": 1200 },
        { "id": 666, "modelo": "Aprilia RSV 1000 R", "anoFab": 2004, "velMax": 280, "cantPue": 0, "cantRue": 2 },
        { "id": 872, "modelo": "Boeing 747-400", "anoFab": 1989, "velMax": 988, "altMax": 13, "autonomia": 13450 },
        { "id": 742, "modelo": "Cessna CH-1 SkyhookR", "anoFab": 1953, "velMax": 174, "altMax": 3, "autonomia": 870 }
    ];


let arrayVehiculos = array.map(vehiculo => {

    let vehiculoCreado;

    if ("cantPue" in vehiculo && "cantRue" in vehiculo) {
        vehiculoCreado = new Terrestre(vehiculo.id, vehiculo.modelo, vehiculo.anoFab, vehiculo.velMax, vehiculo.cantPue, vehiculo.cantRue);
    }
    else if ("altMax" in vehiculo && "autonomia" in vehiculo) {
        vehiculoCreado = new Aereo(vehiculo.id, vehiculo.modelo, vehiculo.anoFab, vehiculo.velMax, vehiculo.altMax, vehiculo.autonomia);
    }

    return vehiculoCreado;
});

