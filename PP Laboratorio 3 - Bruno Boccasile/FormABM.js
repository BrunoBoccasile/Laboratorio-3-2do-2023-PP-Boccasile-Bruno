function verFormABM() {
    document.getElementById("formABM").style.display = "block";
    document.getElementById("formDatos").style.display = "none";

    document.getElementById("lblatributo1").textContent = "Altura Maxima: ";
    document.getElementById("lblatributo2").textContent = "Autonomia: ";
    document.getElementById("tipo").value = "Aereo";

}

function limpiarFormABM() {
    document.getElementById("id").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("anoFab").value = "";
    document.getElementById("velMax").value = "";
    document.getElementById("atributo1").value = "";
    document.getElementById("atributo2").value = "";

    document.getElementById("lbltipo").style.display = "inline";
    document.getElementById("tipo").style.display = "inline";
    document.getElementById("br").style.display = "inline";
    document.getElementById("aceptar").style.display = "inline";
    document.getElementById("modificar").style.display = "none";
    document.getElementById("eliminar").style.display = "none";
}

function mostrarCasillasABM() {
    let select = document.getElementById("tipo");
    let lblAtributo1 = document.getElementById("lblatributo1");
    let lblAtributo2 = document.getElementById("lblatributo2");

    if (select.value == "Aereo") {
        lblAtributo1.textContent = "Altura Maxima: ";
        lblAtributo2.textContent = "Autonomia: ";
    }
    else if (select.value == "Terrestre") {
        lblAtributo1.textContent = "Cantidad Puertas: ";
        lblAtributo2.textContent = "Cantidad Ruedas: ";
    }
}

function formABMModificar(trId) {
    let id = document.getElementById(trId).firstChild.textContent;
    let idTxt = document.getElementById("id");
    let modeloTxt = document.getElementById("modelo");
    let anoFabTxt = document.getElementById("anoFab");
    let velMaxTxt = document.getElementById("velMax");
    let atributo1Txt = document.getElementById("atributo1");
    let atributo2Txt = document.getElementById("atributo2");
    document.getElementById("lbltipo").style.display = "none";
    document.getElementById("tipo").style.display = "none";
    document.getElementById("br").style.display = "none";
    document.getElementById("aceptar").style.display = "none";
    document.getElementById("modificar").style.display = "inline";
    document.getElementById("eliminar").style.display = "inline";


    arrayVehiculos.forEach(vehiculo => {
        if (vehiculo.id == id) {
            verFormABM();
            idTxt.value = vehiculo.id;
            modeloTxt.value = vehiculo.modelo;
            anoFabTxt.value = vehiculo.anoFab;
            velMaxTxt.value = vehiculo.velMax;
            if (vehiculo instanceof Aereo) {
                atributo1Txt.value = vehiculo.altMax;
                atributo2Txt.value = vehiculo.autonomia;
                document.getElementById("lblatributo1").textContent = "Altura Maxima: ";
                document.getElementById("lblatributo2").textContent = "Autonomia: ";
            }
            else if (vehiculo instanceof Terrestre) {
                atributo1Txt.value = vehiculo.cantPue;
                atributo2Txt.value = vehiculo.cantRue;
                document.getElementById("lblatributo1").textContent = "Cantidad Puertas: ";
                document.getElementById("lblatributo2").textContent = "Cantidad Ruedas: ";
            }
        }
    });


}

function modificarVehiculo() {
    let modeloTxt = document.getElementById("modelo");
    let anoFabTxt = document.getElementById("anoFab");
    let velMaxTxt = document.getElementById("velMax");
    let atributo1Txt = document.getElementById("atributo1");
    let atributo2Txt = document.getElementById("atributo2");



    arrayVehiculos.forEach(vehiculo => {
        if (vehiculo.id == document.getElementById("id").value) {
            if (vehiculo instanceof Terrestre) {
                instancia = Terrestre;
            }
            else if (vehiculo instanceof Aereo) {
                instancia = Aereo;
            }

            if (validarVehiculo(modeloTxt, anoFabTxt, velMaxTxt, atributo1Txt, atributo2Txt, instancia)) {
                vehiculo.modelo = modeloTxt.value;
                vehiculo.anoFab = parseInt(anoFabTxt.value);
                vehiculo.velMax = parseInt(velMax.value);

                if (instancia == Aereo) {
                    vehiculo.altMax = parseInt(atributo1Txt.value);
                    vehiculo.autonomia = parseInt(atributo2Txt.value);
                }
                else if (instancia == Terrestre) {
                    vehiculo.cantPue = parseInt(atributo1Txt.value);
                    vehiculo.cantRue = parseInt(atributo2Txt.value);
                }

            }
        }
    });




    verFormDatos();
}

function eliminarVehiculo() {
    let id = document.getElementById("id").value;

    arrayVehiculos = arrayVehiculos.filter(vehiculo => vehiculo.id != id);

    verFormDatos();
}
function agregarVehiculo() {
    let modeloTxt = document.getElementById("modelo");
    let anoFabTxt = document.getElementById("anoFab");
    let velMaxTxt = document.getElementById("velMax");
    let opcionSeleccionada = document.getElementById("tipo").value;
    let atributo1Txt = document.getElementById("atributo1");
    let atributo2Txt = document.getElementById("atributo2");
    let instancia;

    if (opcionSeleccionada == "Aereo") {
        instancia = Aereo;
    }
    else if (opcionSeleccionada == "Terrestre") {
        instancia = Terrestre;
    }



    if (validarVehiculo(modeloTxt, anoFabTxt, velMaxTxt, atributo1Txt, atributo2Txt, instancia)) {
        let id = obtenerUltimoID();
        if (instancia == Aereo) {
            nuevoVehiculo = new Aereo(id + 1, modeloTxt.value, parseInt(anoFabTxt.value), parseInt(velMaxTxt.value), parseInt(atributo1Txt.value), parseInt(atributo2Txt.value));

        }
        else if (instancia == Terrestre) {
            nuevoVehiculo = new Terrestre(id + 1, modeloTxt.value, parseInt(anoFabTxt.value), parseInt(velMaxTxt.value), parseInt(atributo1Txt.value), parseInt(atributo2Txt.value));
        }
        arrayVehiculos.push(nuevoVehiculo);
    }



    verFormDatos();
}

function obtenerUltimoID() {
    let idMasGrande = 0;

    for (let i = 0; i < arrayVehiculos.length; i++) {
        if (i == 0) {
            idMasGrande = arrayVehiculos[0].id;
        }
        else {
            if (arrayVehiculos[i].id > idMasGrande) {
                idMasGrande = arrayVehiculos[i].id;
            }
        }
    }

    return idMasGrande;
}

function validarVehiculo(modelo, anoFab, velMax, atributo1, atributo2, instancia) {
    let retorno = true;

    if (
        (modelo.value.length < 1 || modelo.value.length > 100) ||
        (isNaN(anoFab.value) || anoFab.value < 1885 || anoFab.value > 2023) ||
        (isNaN(velMax.value) || velMax.value <= 0 || velMax.value > 1700) //Bloodhound SSC 1600km/h velocidad mas alta registrada por un vehiculo terrestre
    ) {
        retorno = false;
    }
    else {
        if (instancia == Aereo) {
            if
                (
                (isNaN(atributo1.value) || atributo1.value <= 0 || atributo1.value > 1000) ||
                (isNaN(atributo2.value) || atributo2.value <= 0 || atributo2.value > 100000)
            ) {
                retorno = false;
            }
        }
        else if (instancia == Terrestre) {
            if
                (
                (isNaN(atributo2.value) || atributo1.value <= -1 || atributo1.value > 100) ||
                (isNaN(atributo1.value) || atributo2.value <= 0 || atributo2.value > 100)
            ) {
                retorno = false;
            }
        }
    }
    return retorno;
}