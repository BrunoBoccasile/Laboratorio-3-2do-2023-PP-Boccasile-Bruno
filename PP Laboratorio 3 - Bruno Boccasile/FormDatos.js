window.onload = hacerTablaVehiculo;

function calcularPromedio() {
    let textBox = document.getElementById("calculo");
    let filtro = document.getElementById("filtro");
    let instancia = Vehiculo;

    if (filtro.value == "Aereo") {
        instancia = Aereo;
    }
    else if (filtro.value == "Terrestre") {
        instancia = Terrestre;
    }

    let arrayVehiculosFiltrado = arrayVehiculos.filter(vehiculo => vehiculo instanceof instancia);

    let sumaVelocidad = arrayVehiculosFiltrado.reduce((acumulador, vehiculo) => {
        
        return acumulador + vehiculo.velMax;
    }, 0);
    

    textBox.value = (sumaVelocidad / arrayVehiculosFiltrado.length);
}

function limpiarBody() {
    let tbodyExistente = document.getElementById("tbodyVehiculos");



    while (tbodyExistente.firstChild) {
        tbodyExistente.removeChild(tbodyExistente.firstChild);
    }


}

function limpiarHead() {
    let theadExistente = document.getElementById("theadVehiculos");

    while (theadExistente.firstChild) {
        theadExistente.removeChild(theadExistente.firstChild);
    }
}



function hacerTablaVehiculo() {
    let instancia = Vehiculo;
    let filtro = document.getElementById("filtro");

    if (filtro.value == "Terrestre") {
        instancia = Terrestre;
    }
    else if (filtro.value == "Aereo") {
        instancia = Aereo;
    }

    let arrayChecks = [
        document.getElementById("checkId"),
        document.getElementById("checkModelo"),
        document.getElementById("checkAnoFab"),
        document.getElementById("checkVelMax"),
        document.getElementById("checkAltMax"),
        document.getElementById("checkAutonomia"),
        document.getElementById("checkCantPue"),
        document.getElementById("checkCantRue")
    ];

    let tabla = document.getElementById("tablaVehiculos");
    let thead;


    if (document.getElementById("theadVehiculos") == null) {
        thead = document.createElement("thead");
        thead.id = "theadVehiculos";
        tabla.appendChild(thead);
    }
    else {
        limpiarHead();
    }

    thead = document.getElementById("theadVehiculos");

    let trHead = document.createElement("tr");
    thead.appendChild(trHead);




    for (let i = 0; i < arrayChecks.length; i++) {
        if (arrayChecks[i].checked) {
            let th = document.createElement("th");
            let button = document.createElement("input");
            button.type = "button";
            button.value = arrayChecks[i].name;
            button.addEventListener("click", () => { ordenar(i + 1); });
            th.appendChild(button);
            trHead.appendChild(th);
        }
    }


    tabla.appendChild(thead);

    let tbody

    if (document.getElementById("tbodyVehiculos") == null) {
        tbody = document.createElement("tbody");
        tbody.id = "tbodyVehiculos";
        tabla.appendChild(tbody);
    }
    else {
        limpiarBody();
    }

    tbody = document.getElementById("tbodyVehiculos");

    let contador = 0;
 
    arrayVehiculos.forEach(function (vehiculo) {
        if(vehiculo instanceof instancia)
        {
            let tr = document.createElement("tr");
            tr.id = "tr" + contador;
            contador++;
            tr.addEventListener("dblclick", () => {formABMModificar(tr.id)});
            tbody.appendChild(tr);

            for(let i =0 ; i<arrayChecks.length ; i++)
            {
                if(arrayChecks[i].checked)
                {
                    let td = document.createElement("td");
                    let tdTexto = document.createTextNode("");
                    switch(i)
                    {
                        case 0:
                            tdTexto = document.createTextNode(vehiculo.id);
                        break;
                        case 1:
                            tdTexto = document.createTextNode(vehiculo.modelo);
                        break;
                        case 2:
                            tdTexto = document.createTextNode(vehiculo.anoFab);
                        break;
                        case 3:
                            tdTexto = document.createTextNode(vehiculo.velMax);
                        break;
                        case 4:
                            if(vehiculo instanceof Aereo)
                            {
                                tdTexto = document.createTextNode(vehiculo.altMax);
                            }
                        break;
                        case 5:
                            if(vehiculo instanceof Aereo)
                            {
                                tdTexto = document.createTextNode(vehiculo.autonomia);
                            }
                        break;
                        case 6:
                            if(vehiculo instanceof Terrestre)
                            {
                                tdTexto = document.createTextNode(vehiculo.cantPue);
                            }
                        break;
                        case 7:
                            if(vehiculo instanceof Terrestre)
                            {
                                tdTexto = document.createTextNode(vehiculo.cantRue);
                            }
                        break;
                    }
                    td.appendChild(tdTexto);
                    tr.appendChild(td);
                }
            }
        }


    });


    
}


function ordenar(opcion) {

    switch (opcion) {
        case 1:
            arrayVehiculos.sort((a, b) => a.id - b.id);
            break;
        case 2:
            arrayVehiculos.sort((a, b) => a.modelo.localeCompare(b.modelo));
            break;
        case 3:
            arrayVehiculos.sort((a, b) => a.anoFab - b.anoFab);
            break;
        case 4:
            arrayVehiculos.sort((a, b) => a.velMax - b.velMax);
            break;
        case 5:
            arrayVehiculos.sort((a, b) => a.altMax - b.altMax);
            break;
        case 6:
            arrayVehiculos.sort((a, b) => a.autonomia - b.autonomia);
            break;
        case 7:
            arrayVehiculos.sort((a, b) => a.cantPue - b.cantPue);
            break;
        case 8:
            arrayVehiculos.sort((a, b) => a.cantRue - b.cantRue);
            break;
    }

    hacerTablaVehiculo();
}


function verFormDatos() {
    document.getElementById("formABM").style.display = "none";
    document.getElementById("formDatos").style.display = "block";
    hacerTablaVehiculo();
}

