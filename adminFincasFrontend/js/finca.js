/* Estado inicial al cargar la pagina */
$(document).ready(function () {
    estadoInicialFincas();
    mostrarDatos();
});


/* Metodo para llenar la tabla */
function llenarTablaFinca(items) {
    $("#tablaFinca").html("");
    $("#tablaFinca").show(500);

    var tabla = `<table id ="tablaFinca" border='1'> 
                <tr>    
                    <th>Address</th>
                    <th>Exension</th>
                    <th>Category_Id</th>
                    <th>Name</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="address">${items[i].address}</td>
                <td id="exension">${items[i].exension}</td>
                <td id="category_id">${items[i].category_id}</td>
                <td id="name">${items[i].name}</td>
                <td><button onclick='formularioEditarFinca(${items[i].id}, ${i})'>Editar</button></td>
                <td><button onclick="borrarFinca(${items[i].id})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tablaFinca").html(tabla);

}

/* Configuraciones de pagina */

function formularioNuevaFinca() {
    limpiarCamposNuevo();
    $("#nueva").show(500);
    $("#idFinca").focus();
    $("#tablaFinca").hide(500);
    $("#btnNuevaFinca").hide(500);

}

/* 
Funcion que prepara el formulario de edicion
Se llena el id y es inhabilitado
se llenan los placeholders con los datos de la tablaFinca
 */
function formularioEditarFinca(id,i) {

    document.getElementById("idEditar").value = id;
    $("#"+`${i}`).each(function () {
        var address=$(this).find("#address").html();
        document.getElementById("addressEditar").placeholder = address;
        console.log(address);
    });
    $("#"+`${i}`).each(function () {
        var exension=$(this).find("#exension").html();
        document.getElementById("exensionEditar").placeholder = exension;
        console.log(exension);
    });
    $("#"+`${i}`).each(function () {
        var category_id=$(this).find("#category_id").html();
        document.getElementById("category_idEditar").placeholder = category_id;
        console.log(category_id);
    });
    $("#"+`${i}`).each(function () {
        var name=$(this).find("#name").html();
        document.getElementById("nameEditar").placeholder = name;
        console.log(name);
    });

    $("#editar").show(500);
    $("#addressEditar").focus();
    $("#btnNuevaFinca").hide(500);

}

function estadoInicialFincas() {
    $("#tablaFinca").show(500);
    $("#btnNuevaFinca").show(500);
    $("#nueva").hide(500);
}

/* Validaciones */

function validarVacio(dato) {
    return dato == "";
}
// Validar formulario nuevo
function validarNuevo() {
    let id = $("#idNueva").val();
    let address = $("#addressNueva").val();
    let exension = $("#exensionNueva").val();
    let category_id = $("#category_idNueva").val();
    let name = $("#nameNueva").val();
    let error = "";
    $("#mensajeFinca").val("");

    if (validarVacio(id)) {
        errores = "Campo id vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#idNueva").focus();
        return false;
    } else if (validarVacio(address)) {
        errores = "Campo address vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#addressNueva").focus();
        return false;
    } else if (validarVacio(exension)) {
        errores = "Campo exension vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#exensionNueva").focus();
        return false;
    } else if (validarVacio(category_id)) {
        errores = "Campo category_id vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#category_idNueva").focus();
        return false;
    } else if (validarVacio(name)) {
        errores = "Campo name vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#nameNueva").focus();
        return false;
    }
    return true;
}

// Validar formulario editar
function validarEditar() {
    let address = $("#addressEditar").val();
    let exension = $("#exensionEditar").val();
    let category_id = $("#category_idEditar").val();
    let name = $("#nameEditar").val();
    let error = "";
    $("#mensajeFinca").val("");

    if (validarVacio(address)) {
        errores = "Campo address vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#addressNueva").focus();
        return false;
    } else if (validarVacio(exension)) {
        errores = "Campo exension vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#exensionNueva").focus();
        return false;
    } else if (validarVacio(category_id)) {
        errores = "Campo category_id vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#category_idNueva").focus();
        return false;
    } else if (validarVacio(name)) {
        errores = "Campo name vacio <br>";
        $("#mensajeFinca").html(errores);
        $("#mensajeFinca").show(1000);
        $("#nameNueva").focus();
        return false;
    }
    return true;
}

function limpiarCamposNuevo() {
    $("#idNueva").val("");
    $("#addressNueva").val("");
    $("#exensionNueva").val("");
    $("#category_idNueva").val("");
    $("#nameNueva").val("");
}

function ocultarCamposEditar() {
    $("#editar").hide(500);
    estadoInicialFincas();
}

/* METODOS WebService */

/* metodo GET Fincas*/
function mostrarDatos() {
    $.ajax(
        {
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm",
            type: "GET",
            dataType: "json",
            success: function (respuesta) {
                console.log(respuesta.items);
                llenarTablaFinca(respuesta.items);
            },
            error: function (xhr, status) {
                $("#mensajeFinca").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensajeFinca").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensajeFinca").html("Obteniendo listado de fincas. Status: " + status);
                $("#mensajeFinca").hide(3000);
            }
        }
    )

}

/* Metodo POST Fincas*/

function nuevaFinca() {
    let data = {
        id: $("#idNueva").val(),
        address: $("#addressNueva").val(),
        exension: $("#exensionNueva").val(),
        category_id: $("#category_idNueva").val(),
        name: $("#nameNueva").val()
    }
    let dataPost = JSON.stringify(data)
    if (validarNuevo()) {
        $.ajax({
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm",
            data: dataPost,
            type: "POST",
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensajeFinca").show(1000);
                $("#mensajeFinca").html("Nueva finca registrada");
                $("#mensajeFinca").hide(1000);
                mostrarDatos();
                estadoInicialFincas();
            },
            error: function (xhr, status) {
                $("#mensajeFinca").show(1000);
                $("#mensajeFinca").html("Error en el registro... " + status);
                $("#mensajeFinca").hide(1000);

            }
        });
    }
}



/* Metodo PUT Fincas*/

function editarFinca() {
    let data = {
        id: $("#idEditar").val(),
        address: $("#addressEditar").val(),
        exension: $("#exensionEditar").val(),
        category_id: $("#category_idEditar").val(),
        name: $("#nameEditar").val()
    }
    let dataPut = JSON.stringify(data)
    if (validarEditar()) {
        $.ajax({
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm",
            data: dataPut,
            type: "PUT",
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensajeFinca").show(1000);
                $("#mensajeFinca").html(" finca actualizada");
                $("#mensajeFinca").hide(1000);
                mostrarDatos();
                estadoInicialFincas();
            },
            error: function (xhr, status) {
                $("#mensajeFinca").show(1000);
                $("#mensajeFinca").html("Error en la actualizacion... " + status);
                $("#mensajeFinca").hide(1000);

            }
        });
    }
}

/*  Metodo DELETE */

function borrarFinca(codigo){
    let datos={
        id:codigo
    }

    let = datoBorrar = JSON.stringify(datos);
    $.ajax({
        url:"https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/farm/farm",
        data:datoBorrar,
        type:"DELETE", 
        contentType:"application/JSON",
        dataType: "json",
        success:function(respuesta){
            console.log(respuesta);
            $("#mensajeFinca").show(1000);
            $("#mensajeFinca").html("Registro eliminado");
            $("#mensajeFinca").hide(1000);
            mostrarDatos();
            estadoInicialFincas();
        },
        error:function(xhr, status){
            $("#mensajeFincas").html("Ocurrio un problema al ejecutar la peticion: "+status);
            $("#mensajeFinca").hide(1000);
        }
    });
}
