/* Estado inicial al cargar la pagina */
$(document).ready(function () {
    estadoInicialCliente();
    mostrarDatos();
});


/* Metodo para llenar la tabla */
function llenarTablaCliente(items) {
    $("#tablaCliente").html("");
    $("#tablaCliente").show(500);

    var tabla = `<table id ="tablaCliente" border='1'> 
                <tr>    
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="name">${items[i].name}</td>
                <td id="email">${items[i].email}</td>
                <td id="age">${items[i].age}</td>
                <td><button onclick='formularioEditarCliente(${items[i].id}, ${i})'>Editar</button></td>
                <td><button onclick="borrarCliente(${items[i].id})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tablaCliente").html(tabla);

}

/* Configuraciones de pagina */

function formularioNuevoCliente() {
    limpiarCamposNuevo();
    $("#nuevoCliente").show(500);
    $("#idNuevoCliente").focus();
    $("#tablaCliente").hide(500);
    $("#btnNuevoCliente").hide(500);

}

/* 
Funcion que prepara el formulario de edicion
Se llena el id y es inhabilitado
se llenan los placeholders con los datos de la tabla
 */
function formularioEditarCliente(id, i) {

    document.getElementById("idEditarCliente").value = id;
    $("#" + `${i}`).each(function () {
        var name = $(this).find("#name").html();
        document.getElementById("nameEditarCliente").placeholder = name;
        console.log(name);
    });
    $("#" + `${i}`).each(function () {
        var email = $(this).find("#email").html();
        document.getElementById("emailEditarCliente").placeholder = email;
        console.log(email);
    });
    $("#" + `${i}`).each(function () {
        var age = $(this).find("#age").html();
        document.getElementById("ageEditarCliente").placeholder = age;
        console.log(age);
    });

    $("#editarCliente").show(500);
    $("#nameEditarCliente").focus();
    $("#btnNuevoCliente").hide(500);

}

function estadoInicialCliente() {
    $("#tablaCliente").show(500);
    $("#btnNuevoCliente").show(500);
    $("#nuevoCliente").hide(500);
}

/* Validaciones */

function validarVacio(dato) {
    return dato == "";
}
// Validar formulario nuevo
function validarNuevo() {
    let id = $("#idNuevoCliente").val();
    let name = $("#addressNuevoCliente").val();
    let email = $("#emailNuevoCliente").val();
    let age = $("#ageNuevoCliente").val();
    let error = "";
    $("#mensajeCliente").val("");

    if (validarVacio(id)) {
        errores = "Campo id vacio <br>";
        $("#mensajeCliente").html(errores);
        $("#mensajeCliente").show(1000);
        $("#idNuevoCliente").focus();
        return false;
    } else if (validarVacio(name)) {
        errores = "Campo address vacio <br>";
        $("#mensajeCliente").html(errores);
        $("#mensajeCliente").show(1000);
        $("#nameNuevoCliente").focus();
        return false;
    } else if (validarVacio(email)) {
        errores = "Campo exension vacio <br>";
        $("#mensajeCliente").html(errores);
        $("#mensajeCliente").show(1000);
        $("#emailNuevoCliente").focus();
        return false;
    } else if (validarVacio(age)) {
        errores = "Campo category_id vacio <br>";
        $("#mensajeCliente").html(errores);
        $("#mensajeCliente").show(1000);
        $("#ageNuevoCliente").focus();
        return false;
    }
    return true;
}

// Validar formulario editar
function validarEditar() {
    let name = $("#nameEditarCliente").val();
    let email = $("#emailEditarCliente").val();
    let age = $("#ageEditarCliente").val();
    let error = "";
    $("#mensajeCliente").val("");

    if (validarVacio(name)) {
        errores = "Campo name vacio <br>";
        $("#mensajeCliente").html(errores);
        $("#mensajeCliente").show(1000);
        $("#nameEditarCliente").focus();
        return false;
    } else if (validarVacio(email)) {
        errores = "Campo email vacio <br>";
        $("#mensajeCliente").html(errores);
        $("#mensajeCliente").show(1000);
        $("#emailEditarCliente").focus();
        return false;
    } else if (validarVacio(age)) {
        errores = "Campo age vacio <br>";
        $("#mensajeCliente").html(errores);
        $("#mensajeCliente").show(1000);
        $("#ageEditarCliente").focus();
        return false;
    }
    return true;
}

function limpiarCamposNuevo() {
    $("#idNuevoCliente").val("");
    $("#nameNuevoCliente").val("");
    $("#emailNuevoCliente").val("");
    $("#ageNuevoCliente").val("");
}

function ocultarCamposEditar() {
    $("#editarCliente").hide(500);
    estadoInicialCliente();
}

/* METODOS WebService */

/* metodo GET Cliente*/
function mostrarDatos() {
    $.ajax(
        {
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
            type: "GET",
            dataType: "json",
            success: function (respuesta) {
                console.log(respuesta.items);
                llenarTablaCliente(respuesta.items);
            },
            error: function (xhr, status) {
                $("#mensajeCliente").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensajeCliente").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensajeCliente").html("Obteniendo listado de Clientes Status: " + status);
                $("#mensajeCliente").hide(3000);
            }
        }
    )

}

/* Metodo POST Cliente*/

function nuevoCliente() {
    let data = {
        id: $("#idNuevoCliente").val(),
        name: $("#nameNuevoCliente").val(),
        email: $("#emailNuevoCliente").val(),
        age: $("#ageNuevoCliente").val()
    }
    let dataPost = JSON.stringify(data)
    if (validarNuevo()) {
        $.ajax({
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
            data: dataPost,
            type: "POST",
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensajeCliente").show(1000);
                $("#mensajeCliente").html("Nuevo cliente registrado");
                $("#mensajeCliente").hide(1000);
                mostrarDatos();
                estadoInicialCliente();
            },
            error: function (xhr, status) {
                $("#mensajeCliente").show(1000);
                $("#mensajeCliente").html("Error en el registro. Status: " + status);
                $("#mensajeCliente").hide(1000);

            }
        });
    }
}



/* Metodo PUT Cliente*/

function editarCliente() {
    let data = {
        id: $("#idEditarCliente").val(),
        name: $("#nameEditarCliente").val(),
        email: $("#emailEditarCliente").val(),
        age: $("#ageEditarCliente").val()
    }
    let dataPut = JSON.stringify(data)
    if (validarEditar()) {
        $.ajax({
            url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
            data: dataPut,
            type: "PUT",
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensajeCliente").show(1000);
                $("#mensajeCliente").html(" Cliente actualizado");
                $("#mensajeCliente").hide(1000);
                mostrarDatos();
                estadoInicialFincas();
            },
            error: function (xhr, status) {
                $("#mensajeCliente").show(1000);
                $("#mensajeCliente").html("Error en la actualizacion... " + status);
                $("#mensajeCliente").hide(1000);

            }
        });
    }
}

/*  Metodo DELETE Cliente*/

function borrarCliente(codigo) {
    let datos = {
        id: codigo
    }

    let = datoBorrar = JSON.stringify(datos);
    $.ajax({
        url: "https://g8a0687440df236-dbprueba.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "json",
        success: function (respuesta) {
            console.log(respuesta);
            $("#mensajeCliente").show(1000);
            // $("#mensajeCliente").html("Cliente eliminado");
            alert("Cliente eliminado");
            $("#mensajeCliente").hide(1000);
            mostrarDatos();
        },
        error: function (xhr, status) {
            $("#mensajeClientes").html("Ocurrio un problema al ejecutar la peticion: " + status);
            $("#mensajeCliente").hide(1000);
        }
    });
}
