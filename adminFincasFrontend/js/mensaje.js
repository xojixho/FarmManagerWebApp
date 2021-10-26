/* Estado inicial al cargar la pagina */
$(document).ready(function () {
    estadoInicialMensaje();
    mostrarDatos();
});


/* Metodo para llenar la tabla */
function llenarTablaMensaje(items) {
    $("#tablaMensaje").html("");
    $("#tablaMensaje").show(500);

    var tabla = `<table id ="tablaMensaje" border='1'> 
                <tr>    
                    <th>id</th>
                    <th>Message</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="id">${items[i].id}</td>
                <td id="message">${items[i].messagetext}</td>
                <td><button onclick='formularioEditarMensaje(${items[i].id}, ${i})'>Editar</button></td>
                <td><button onclick="borrarMensaje(${items[i].id})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tablaMensaje").html(tabla);

}

/* Configuraciones de pagina */

function formularioNuevoMensaje() {
    limpiarCamposNuevo();
    $("#nuevoMensaje").show(500);
    $("#idMensajeNuevo").focus();
    $("#tablaMensaje").hide(500);
    $("#btnNuevoMensaje").hide(500);

}


/* 
Funcion que prepara el formulario de edicion
Se llena el id y es inhabilitado
se llenan los placeholders con los datos de la tabla
 */
function formularioEditarMensaje(id, i) {
    document.getElementById("idMensajeEditar").value = id;
    $("#" + `${i}`).each(function () {
        var message = $(this).find("#message").html();
        document.getElementById("mensajeEditar").placeholder = message;
        console.log(message);
    });

    $("#editarMensaje").show(500);
    $("#mensajeEditar").focus();
    $("#btnNuevoMensaje").hide(500);

}

function estadoInicialMensaje() {
    $("#tablaMensaje").show(500);
    $("#btnNuevoMensaje").show(500);
    $("#nuevoMensaje").hide(500);
    $("#editarMensaje").hide(500);
}

/* Validaciones */

function validarVacio(dato) {
    return dato == "";
}
// Validar formulario nuevo
function validarNuevo() {
    let id = $("#idMensajeNuevo").val();
    let message = $("#mensajeNuevo").val();
    let error = "";
    $("#mensajeMensaje").val("");

    if (validarVacio(id)) {
        error = "Campo id vacio <br>";
        $("#mensajeMensaje").html(error);
        $("#mensajeMensaje").show(1000);
        $("#idMensajeNuevo").focus();
        return false;
    } else if (validarVacio(message)) {
        error = "Campo mensaje vacio <br>";
        $("#mensajeMensaje").html(error);
        $("#mensajeMensaje").show(1000);
        $("#mensajeNuevo").focus();
        return false;
    }
    return true;
}

// Validar formulario editar
function validarEditar() {
    let message = $("#mensajeEditar").val();
    let error = "";
    $("#mensajeMensaje").val("");

    if (validarVacio(message)) {
        error = "Campo mensaje vacio <br>";
        $("#mensajeMensaje").html(error);
        $("#mensajeMensaje").show(1000);
        $("#mensajeEditar").focus();
        return false;
    }
    return true;
}

function limpiarCamposNuevo() {
    $("#idMensajeNuevo").val("");
    $("#mensajeNuevo").val("");
}

function ocultarCamposEditar() {
    $("#editarMensaje").hide(500);
    estadoInicialMensaje();
}

/* METODOS WebService */

/* metodo GET Mensaje*/
function mostrarDatos() {
    $.ajax(
        {
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
            type: "GET",
            dataType: "json",
            success: function (respuesta) {
                console.log(respuesta.items);
                llenarTablaMensaje(respuesta.items);
            },
            error: function (xhr, status) {
                $("#mensajeMensaje").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensajeMensaje").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensajeMensaje").html("Obteniendo listado de Mensajes Status: " + status);
                $("#mensajeMensaje").hide(3000);
            }
        }
    )

}

/* Metodo POST Mensaje*/

function nuevoMensaje() {
    let data = {
        id: $("#idMensajeNuevo").val(),
        messagetext: $("#mensajeNuevo").val()
    }
    let dataPost = JSON.stringify(data);
    if (validarNuevo()) {
        $.ajax({
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
            data: dataPost,
            type: "POST",
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensajeMensaje").show(1000);
                $("#mensajeMensaje").html("Nuevo Mensaje registrado");
                $("#mensajeMensaje").hide(1000);
                mostrarDatos();
                estadoInicialMensaje();
            },
            error: function (xhr, status) {
                $("#mensajeMensaje").show(1000);
                $("#mensajeMensaje").html("Error en el registro. Status: " + status);
                $("#mensajeMensaje").hide(1000);

            }
        });
    }
}



/* Metodo PUT Mensaje*/

function editarMensaje() {
    let data = {
        id: $("#idMensajeEditar").val(),
        messagetext: $("#mensajeEditar").val()
    }
    let dataPut = JSON.stringify(data);
    if (validarEditar()) {
        $.ajax({
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
            data: dataPut,
            type: "PUT",
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensajeMensaje").show(1000);
                $("#mensajeMensaje").html(" Mensaje actualizado");
                $("#mensajeMensaje").hide(1000);
                mostrarDatos();
                estadoInicialMensaje();
            },
            error: function (xhr, status) {
                $("#mensajeMensaje").show(1000);
                $("#mensajeMensaje").html("Error en la actualizacion... " + status);
                $("#mensajeMensaje").hide(1000);

            }
        });
    }
}

/*  Metodo DELETE Mensaje*/

function borrarMensaje(codigo) {
    let datos = {
        id: codigo
    }

    let = datoBorrar = JSON.stringify(datos);
    $.ajax({
        url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);
            $("#mensajeMensaje").show(1000);
            // $("#mensajeMensaje").html("Mensaje eliminado");
            alert("Mensaje eliminado");
            $("#mensajeMensaje").hide(1000);
            mostrarDatos();
        },
        error: function (xhr, status) {
            $("#mensajeMensajes").html("Ocurrio un problema al ejecutar la peticion: " + status);
            $("#mensajeMensaje").hide(1000);
        }
    });
}
