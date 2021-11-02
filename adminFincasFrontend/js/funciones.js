$(document).ready(function () {
    mostrarImagen();
});

/* Categoria */


function llenarTablaCategoria(items) {
    $("#tabla").html("");
    $("#tabla").show(500);

    var tabla = `<table id ="tablaCategoria" border='1'> 
                <tr>    
                    <th>Id</th>
                    <th>Name</th>
                    <th>description</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="id">${items[i].id}</td>
                <td id="name">${items[i].name}</td>
                <td id="description">${items[i].description}</td>
                <td id="btnEditar"><button onclick='formularioEditarCategoria(${items[i].id}, ${i})'>Editar</button></td>
                <td id="btnBorrar"><button onclick="borrarCategoria(${items[i].id})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tabla").html(tabla);
}

/* Metodo GET Categoria*/

function mostrarCategorias() {
    $("#imagen-inicial").hide();
    $("#info").show();
    $("#nuevaCategoria").hide();
    $("#editarCategoria").hide();
    $("#titulo").html("Categorias");
    $("#btnNuevo").attr("onclick", "formularioNuevaCategoria()");
    $("#btnNuevo").html("Nueva Categoria");
    $("#btnNuevo").show();
    $.ajax(
        {
            url: "http://129.151.121.31:8080/api/Category/all/",
            type: "GET",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                llenarTablaCategoria(respuesta);
            },
            error: function (xhr, status) {
                $("#mensaje").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensaje").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensaje").html("Obteniendo listado de Mensaje. Status: " + status);
                $("#mensaje").hide(3000);
            }
        }
    )

}

/* Metodo POST Categorias*/

function nuevaCategoria() {
    let data = {
        name: $("#nameNuevaCategoria").val(),
        description: $("#descriptionNuevaCategoria").val()
    }

    if (validarNuevaCategoria()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Category/save/",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/JSON; charset=utf-8",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(1000);
                $("#mensaje").html("Nueva Categoria registrada");
                $("#mensaje").hide(1000);
                mostrarCategorias();
                limpiarCamposNuevaCategoria();
            },
            error: function (xhr, status) {
                $("#mensaje").show(1000);
                $("#mensaje").html("Error en el registro... " + status);
                $("#mensaje").hide(1000);

            }
        });
    }
}

/* Metodo PUT Categorias*/

function editarCategoria() {
    let dataPut = {
        id: $("#idEditarCategoria").val(),
        name: $("#nameEditarCategoria").val(),
        description: $("#descriptionEditarCategoria").val()
    }
    console.log(dataPut);
    if (validarEditarCategoria()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Category/update/",
            type: "PUT",
            data: JSON.stringify(dataPut),
            contentType: "application/JSON",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(500);
                $("#mensaje").html(" finca actualizada");
                $("#mensaje").hide(1000);
                limpiarCamposEditar();
                mostrarCategorias();
            },
            error: function (xhr, status) {
                $("#mensaje").show();
                $("#mensaje").html("Error en la actualizacion... " + status);
                $("#mensaje").hide(500);

            }
        });
    }
}

/*  Metodo DELETE Categoria*/

function borrarCategoria(codigo) {
    let datos = {
        category: codigo
    }
    let datoBorrar = JSON.stringify(datos);

    $.ajax({

        url: "http://129.151.121.31:8080/api/Category/" + codigo,
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "json",
        success: function (respuesta) {
            $("#mensaje").show(1000);
            $("#mensaje").html("Categoria eliminada");
            $("#mensaje").hide(1000);
            mostrarCategorias();
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la peticion: " + status);
            $("#mensaje").hide(1000);
        }
    });
}

function formularioNuevaCategoria() {

    $("#nuevaCategoria").show(500);
    $("#nameNuevaCategoria").focus();
    $("#tablaCategoria").hide(500);
    $("#btnNuevo").hide(500);

}

function formularioEditarCategoria(id, i) {
    document.getElementById("idEditarCategoria").value = id;

    $("#" + `${i}`).each(function () {
        var name = $(this).find("#name").html();
        document.getElementById("nameEditarCategoria").placeholder = name;
    });
    $("#" + `${i}`).each(function () {
        var description = $(this).find("#description").html();
        document.getElementById("descriptionEditarCategoria").placeholder = description;
    });
    $("#editarCategoria").show(500);
    $("#idEditarCategoria").focus();
    $("#btnNuevo").hide(500);
    $("#tabla").hide();

}

/* Validaciones Categoria */

// Validar formulario nuevo
function validarNuevaCategoria() {
    let name = $("#nameNuevaCategoria").val();
    let description = $("#descriptionNuevaCategoria").val();
    let error = "";
    $("#mensaje").val("");

    if (validarVacio(name)) {
        error = "Campo name vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#nameNueva").focus();
        return false;
    } else if (validarVacio(description)) {
        error = "Campo description vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#descriptionNueva").focus();
        return false;
    }
    return true;
}

// Validar formulario editar
function validarEditarCategoria() {
    let name = $("#nameEditarCategoria").val();
    let description = $("#descriptionEditarCategoria").val();
    let errores = "";
    $("#mensaje").val("");

    if (validarVacio(name)) {
        errores = "Campo name vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#nameEditarCategoria").focus();
        return false;
    } else if (validarVacio(description)) {
        errores = "Campo description vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#descriptionEditarCategoria").focus();
        return false;
    }
    return true;
}

function limpiarCamposNuevaCategoria() {
    $("#nameNuevaCategoria").val("");
    $("#descriptionNuevaCategoria").val("");
}

function limpiarCamposEditarCategoria() {
    $("#nameEditarCategoria").val("");
    $("#descriptionEditarCategoria").val("");
}

/* -----------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------- */

/* Finca */

/* -----------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------- */

/* Tabla Finca  */

function llenarTablaFincas(items) {
    $("#tabla").html("");
    $("#tabla").show(500);

    var tabla = `<table id ="tablaFinca" border='1'> 
                <tr>    
                    <th>Address</th>
                    <th>Extension</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>description</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="address">${items[i].address}</td>
                <td id="extension">${items[i].extension}</td>
                <td id="category">${items[i].category.id}</td>
                <td id="name">${items[i].name}</td>
                <td id="description">${items[i].description}</td>
                <td id="btnEditar"><button onclick='formularioEditarFinca(${items[i].id}, ${i})'>Editar</button></td>
                <td id="btnBorrar"><button onclick="borrarFinca(${items[i].id})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tabla").html(tabla);
}

/* Metodo GET Fincas*/

function mostrarFincas() {
    $("#mensaje").val("");
    $("#imagen-inicial").hide();
    $("#info").show();
    $("#nuevaFinca").hide();
    $("#editarFinca").hide();
    $("#titulo").html("Fincas");
    $("#btnNuevo").attr("onclick", "formularioNuevaFinca()");
    $("#btnNuevo").html("Nueva Finca");
    $("#btnNuevo").show();
    $.ajax(
        {
            url: "http://129.151.121.31:8080/api/Farm/all/",
            type: "GET",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                llenarTablaFincas(respuesta);
            },
            error: function (xhr, status) {
                $("#mensaje").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensaje").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensaje").html("Obteniendo listado de fincas. Status: " + status);
                $("#mensaje").hide(3000);
            }
        }
    )

}

/* Metodo POST Fincas*/

function nuevaFinca() {
    let data = {
        address: $("#addressNueva").val(),
        extension: $("#extensionNueva").val(),
        category: { id: $("#category_idNueva").val() },
        name: $("#nameNueva").val(),
        description: $("#descriptionNueva").val()
    }

    if (validarNuevo()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Farm/save/",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/JSON; charset=utf-8",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(1000);
                $("#mensaje").html("Nueva finca registrada");
                $("#mensaje").hide(1000);
                mostrarFincas();
                limpiarCamposNuevo();
            },
            error: function (xhr, status) {
                $("#mensaje").show(1000);
                $("#mensaje").html("Error en el registro... " + status);
                $("#mensaje").hide(1000);

            }
        });
    }
}

/* Metodo PUT Fincas*/

function editarFinca() {
    let dataPut = {
        id: $("#idEditar").val(),
        address: $("#addressEditar").val(),
        name: $("#nameEditar").val(),
        extension: $("#extensionEditar").val(),
        description: $("#descriptionEditar").val()
    }
    console.log(dataPut);
    if (validarEditar()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Farm/update/",
            type: "PUT",
            data: JSON.stringify(dataPut),
            contentType: "application/JSON",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(500);
                $("#mensaje").html(" finca actualizada");
                $("#mensaje").hide(1000);
                limpiarCamposEditar();
                mostrarFincas();
            },
            error: function (xhr, status) {
                $("#mensaje").show();
                $("#mensaje").html("Error en la actualizacion... " + status);
                $("#mensaje").hide(500);

            }
        });
    }
}

/*  Metodo DELETE Fincas*/

function borrarFinca(codigo) {
    let dato = {
        id: codigo
    };

    let datoBorrar = JSON.stringify(dato);
    $.ajax({
        url: "http://129.151.121.31:8080/api/Farm/" + codigo,
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "JSON",
        success: function (respuesta) {
            $("#mensaje").show(1000);
            $("#mensaje").html("Registro eliminado");
            $("#mensaje").hide(1000);
            mostrarFincas();
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la peticion: " + status);
            $("#mensaje").hide(1000);
        }
    });
}

function mostrarImagen() {
    $("#imagen-inicial").show();
}

function formularioNuevaFinca() {
    $("#nuevaFinca").show(500);
    $("#addressNueva").focus();
    $("#tablaFinca").hide(500);
    $("#btnNuevo").hide(500);

}

function formularioEditarFinca(id, i) {

    document.getElementById("idEditar").value = id;

    $("#" + `${i}`).each(function () {
        var address = $(this).find("#address").html();
        document.getElementById("addressEditar").placeholder = address;
    });
    $("#" + `${i}`).each(function () {
        var extension = $(this).find("#extension").html();
        document.getElementById("extensionEditar").placeholder = extension;
    });
    $("#" + `${i}`).each(function () {
        var category_id = $(this).find("#category").html();
        document.getElementById("category_idEditar").value = category_id;
    });
    $("#" + `${i}`).each(function () {
        var name = $(this).find("#name").html();
        document.getElementById("nameEditar").placeholder = name;
    });
    $("#" + `${i}`).each(function () {
        var description = $(this).find("#description").html();
        document.getElementById("descriptionEditar").placeholder = description;
    });

    $("#editarFinca").show(500);
    $("#addressEditar").focus();
    $("#btnNuevo").hide(500);
    $("#tabla").hide();

}

function limpiarCamposNuevo() {
    $("#addressNueva").val("");
    $("#extensionNueva").val("");
    $("#category_idNueva").val("");
    $("#nameNueva").val("");
    $("#descriptionNueva").val("");
}

function limpiarCamposEditar() {
    $("#addressEditar").val("");
    $("#extensionEditar").val("");
    $("#category_idEditar").val("");
    $("#nameEditar").val("");
    $("#descriptionEditar").val("");
}

/* Validaciones Finca */

function validarVacio(dato) {
    return dato == "";
}
// Validar formulario nuevo
function validarNuevo() {
    let address = $("#addressNueva").val();
    let extension = $("#extensionNueva").val();
    let category_id = $("#category_idNueva").val();
    let name = $("#nameNueva").val();
    let description = $("#descriptionNueva").val();
    let error = "";
    $("#mensaje").val("");

    if (validarVacio(address)) {
        error = "Campo address vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#addressNueva").focus();
        return false;
    } else if (validarVacio(extension)) {
        error = "Campo extension vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#extensionNueva").focus();
        return false;
    } else if (validarVacio(category_id)) {
        error = "Campo category_id vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#category_idNueva").focus();
        return false;
    } else if (validarVacio(name)) {
        error = "Campo name vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#nameNueva").focus();
        return false;
    } else if (validarVacio(description)) {
        error = "Campo description vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#descriptionNueva").focus();
        return false;
    }
    return true;
}

// Validar formulario editar
function validarEditar() {
    let address = $("#addressEditar").val();
    let extension = $("#extensionEditar").val();
    // let category_id = $("#category_idEditar").val();
    let name = $("#nameEditar").val();
    let description = $("#descriptionEditar").val();
    let errores = "";
    $("#mensaje").val("");

    if (validarVacio(address)) {
        errores = "Campo address vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#addressEditar").focus();
        return false;
    } else if (validarVacio(extension)) {
        errores = "Campo extension vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#extensionEditar").focus();
        return false;
    } else if (validarVacio(name)) {
        errores = "Campo name vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#nameEditar").focus();
        return false;
    } else if (validarVacio(description)) {
        errores = "Campo description vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#descriptionEditar").focus();
        return false;
    }
    return true;
}

/* -----------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------- */

/* Clientes */

/* -----------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------- */

function llenarTablaClientes(items) {
    $("#tabla").html("");
    $("#tabla").show(500);

    var tabla = `<table id ="tablaCliente" border='1'> 
                <tr>    
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Password</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="id">${items[i].idClient}</td>
                <td id="name">${items[i].name}</td>
                <td id="age">${items[i].age}</td>
                <td id="email">${items[i].email}</td>
                <td id="password">${items[i].password}</td>
                <td id="btnEditar"><button onclick='formularioEditarCliente(${items[i].idClient}, ${i})'>Editar</button></td>
                <td id="btnBorrar"><button onclick="borrarCliente(${items[i].idClient})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tabla").html(tabla);
}

/* Metodo GET Cliente*/

function mostrarClientes() {
    $("#imagen-inicial").hide();
    $("#info").show();
    $("#nuevoCliente").hide();
    $("#editarCliente").hide();
    $("#titulo").html("Clientes");
    $("#btnNuevo").attr("onclick", "formularioNuevoCliente()");
    $("#btnNuevo").html("Nuevo Cliente");
    $("#btnNuevo").show();
    $.ajax(
        {
            url: "http://129.151.121.31:8080/api/Client/all/",
            type: "GET",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                llenarTablaClientes(respuesta);
            },
            error: function (xhr, status) {
                $("#mensaje").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensaje").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensaje").html("Obteniendo listado de Clientes. Status: " + status);
                $("#mensaje").hide(3000);
            }
        }
    )

}

/* Metodo POST Cliente*/

function nuevoCliente() {
    let data = {
        name: $("#nameNuevoCliente").val(),
        age: $("#ageNuevoCliente").val(),
        email: $("#emailNuevoCliente").val(),
        password: $("#passwordNuevoCliente").val()
    };
    console.log(data);
    if (validarNuevoCliente()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Client/save/",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/JSON; charset=utf-8",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(1000);
                $("#mensaje").html("Nuevo Cliente registrada");
                $("#mensaje").hide(1000);
                mostrarClientes();
                limpiarCamposNuevoCliente();
            },
            error: function (xhr, status) {
                $("#mensaje").show(1000);
                $("#mensaje").html("Error en el registro... " + status);
                $("#mensaje").hide(1000);

            }
        });
    }
}

/* Metodo PUT Cliente*/

function editarCliente() {
    let dataPut = {
        idClient: $("#idCliente").val(),
        name: $("#nameEditarCliente").val(),
        age: $("#ageEditarCliente").val(),
        email: $("#emailEditarCliente").val(),
        password: $("#passwordEditarCliente").val()
    }
    console.log(dataPut);
    if (validarEditarCliente()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Client/update/",
            type: "PUT",
            data: JSON.stringify(dataPut),
            contentType: "application/JSON",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(500);
                $("#mensaje").html(" Cliente actualizada");
                $("#mensaje").hide(1000);
                limpiarCamposEditar();
                mostrarClientes();
            },
            error: function (xhr, status) {
                $("#mensaje").show();
                $("#mensaje").html("Error en la actualizacion... " + status);
                $("#mensaje").hide(500);

            }
        });
    }
}

/*  Metodo DELETE Cliente*/

function borrarCliente(codigo) {
    let datos = {
        idClient: codigo
    }

    let datoBorrar = JSON.stringify(datos);
    $.ajax({
        url: "http://129.151.121.31:8080/api/Client/" + codigo,
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "json",
        success: function (respuesta) {
            $("#mensaje").show(1000);
            $("#mensaje").html("Registro eliminado");
            $("#mensaje").hide(1000);
            mostrarClientes();
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la peticion: " + status);
            $("#mensaje").hide(1000);
        }
    });
}

function formularioNuevoCliente() {
    $("#nuevoCliente").show(500);
    $("#nameNuevoCliente").focus();
    $("#tablaCliente").hide(500);
    $("#btnNuevo").hide(500);

}

function formularioEditarCliente(id, i) {

    document.getElementById("idCliente").value = id;

    $("#" + `${i}`).each(function () {
        var name = $(this).find("#name").html();
        document.getElementById("nameEditarCliente").placeholder = name;
    });
    $("#" + `${i}`).each(function () {
        var email = $(this).find("#email").html();
        document.getElementById("emailEditarCliente").placeholder = email;
    });
    $("#" + `${i}`).each(function () {
        var age = $(this).find("#age").html();
        document.getElementById("ageEditarCliente").placeholder = age;
    });
    $("#" + `${i}`).each(function () {
        var password = $(this).find("#password").html();
        document.getElementById("passwordEditarCliente").placeholder = password;
    });

    $("#editarCliente").show(500);
    $("#nameEditarCliente").focus();
    $("#btnNuevo").hide(500);
    $("#tabla").hide();

}

function limpiarCamposNuevoCliente() {
    $("#nameNuevoCliente").val("");
    $("#emailNuevoCliente").val("");
    $("#ageNuevoCliete").val("");
    $("#PasswordNuevoCliente").val("");
}

function limpiarCamposEditarCliente() {
    $("#nameEditarCliente").val("");
    $("#emailEditarCliente").val("");
    $("#ageEditarCliente").val("");
    $("#PasswordEditarCliente").val("");
}

/* Validaciones Cliente */

// Validar formulario nuevo Cliente

function validarNuevoCliente() {
    let name = $("#nameNuevoCliente").val();
    let age = $("#ageNuevoCliente").val();
    let email = $("#emailNuevoCliente").val();
    let password = $("#passwordNuevoCliente").val();
    let error = "";
    $("#mensaje").val("");

    if (validarVacio(name)) {
        error = "Campo name vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#nameNuevoCliente").focus();
        return false;
    } else if (validarVacio(age)) {
        error = "Campo age vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#ageNuevoCliente").focus();
        return false;
    } else if (validarVacio(email)) {
        error = "Campo email vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#emailNuevoCliente").focus();
        return false;
    } else if (validarVacio(password)) {
        error = "Campo password vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#passwordNuevoCliente").focus();
        return false;
    }
    return true;
}

// Validar formulario editar
function validarEditarCliente() {
    let name = $("#nameEditarCliente").val();
    let age = $("#ageEditarCliente").val();
    let email = $("#emailEditarCliente").val();
    let password = $("#passwordEditarCliente").val();
    let errores = "";
    $("#mensaje").val("");

    if (validarVacio(name)) {
        errores = "Campo name vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#nameEditarCliente").focus();
        return false;
    } else if (validarVacio(age)) {
        errores = "Campo age vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#ageEditarCliente").focus();
        return false;
    } else if (validarVacio(email)) {
        errores = "Campo email vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#emailEditarCliente").focus();
        return false;
    } else if (validarVacio(password)) {
        errores = "Campo password vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#passwordEditarCliente").focus();
        return false;
    }
    return true;
}

/* -----------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------- */
/* Mensajes */
/* -----------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------- */

function llenarTablaMensaje(items) {
    $("#tabla").html("");
    $("#tabla").show(500);

    var tabla = `<table id ="tablaMensaje" border='1'> 
                <tr>    
                    <th>Id</th>
                    <th>Mensaje</th>
                    <th>Cliente</th>
                    <th>Finca</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="id">${items[i].idMessage}</td>
                <td id="messageText">${items[i].messageText}</td>
                <td id="client">${items[i].client.idClient}</td>
                <td id="farm">${items[i].farm.id}</td>
                <td id="btnEditar"><button onclick='formularioEditarMensaje(${items[i].idMessage}, ${i})'>Editar</button></td>
                <td id="btnBorrar"><button onclick="borrarMensaje(${items[i].idMessage})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tabla").html(tabla);
}

/* Metodo GET Mensaje*/

function mostrarMensajes() {
    $("#imagen-inicial").hide();
    $("#info").show();
    $("#nuevoMensaje").hide();
    $("#editarMensaje").hide();
    $("#titulo").html("Mensaje");
    $("#btnNuevo").attr("onclick", "formularioNuevoMensaje()");
    $("#btnNuevo").html("Nuevo Mensaje");
    $("#btnNuevo").show();
    $.ajax(
        {
            url: "http://129.151.121.31:8080/api/Message/all/",
            type: "GET",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                llenarTablaMensaje(respuesta);
            },
            error: function (xhr, status) {
                $("#mensaje").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensaje").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensaje").html("Obteniendo listado de Mensaje. Status: " + status);
                $("#mensaje").hide(3000);
            }
        }
    )

}

/* Metodo POST Mensaje*/

function nuevoMensaje() {
    let data = {
        messageText: $("#nuevoMessageMensaje").val(),
        client: { idClient: $("#nuevoClientMensaje").val() },
        farm: { id: $("#nuevoFarmMensaje").val() }
    };

    if (validarNuevoMensaje()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Message/save/",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/JSON; charset=utf-8",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(1000);
                $("#mensaje").html("Nuevo Mensaje registrado");
                $("#mensaje").hide(1000);
                mostrarMensajes();
                limpiarCamposNuevoMensaje();
            },
            error: function (xhr, status) {
                $("#mensaje").show(1000);
                $("#mensaje").html("Error en el registro... " + status);
                $("#mensaje").hide(1000);

            }
        });
    }
}

/* Metodo PUT */

function editarMensaje() {
    let data = {
        idMessage: $("#idMensaje").val(),
        messageText: $("#editarMessageMensaje").val()
    };
    console.log(data);
    let dataPut = JSON.stringify(data);

    if (validarEditarMensaje()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Message/update/",
            data: dataPut,
            type: "PUT",
            contentType: "application/JSON",
            success: function (respuesta) {
                $("#mensaje").show(1000);
                $("#mensaje").html(" Mensaje actualizado");
                $("#mensaje").hide(1000);
                mostrarMensajes();
            },
            error: function (xhr, status) {
                $("#mensaje").show(1000);
                $("#mensaje").html("Error en la actualizacion... " + status);
                $("#mensaje").hide(1000);

            }
        });
    }
}

/*  Metodo DELETE Mensaje*/

function borrarMensaje(codigo) {
    let datos = {
        idMessage: codigo
    }

    let datoBorrar = JSON.stringify(datos);
    $.ajax({
        url: "http://129.151.121.31:8080/api/Message/" + codigo,
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "json",
        success: function (respuesta) {
            $("#mensaje").show(1000);
            $("#mensaje").html("Mensaje eliminado");
            $("#mensaje").hide(1000);
            mostrarMensajes();
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la peticion: " + status);
            $("#mensaje").hide(1000);
        }
    });
}

function formularioNuevoMensaje() {
    $("#nuevoMensaje").show(500);
    $("#nuevoMessageMensaje").focus();
    $("#tablaMensaje").hide(500);
    $("#btnNuevo").hide(500);

}

function formularioEditarMensaje(id, i) {
    document.getElementById("idMensaje").value = id;

    $("#" + `${i}`).each(function () {
        var client = $(this).find("#client").html();
        document.getElementById("editarClientMensaje").value = client;
    });
    $("#" + `${i}`).each(function () {
        var farm = $(this).find("#farm").html();
        document.getElementById("editarFarmMensaje").value = farm;
    });

    $("#editarMensaje").show(500);
    $("#editarMessageMensaje").focus();
    $("#btnNuevo").hide(500);

}

/* Validaciones Mensaje */

// Validar formulario nuevo
function validarNuevoMensaje() {
    let messageText = $("#nuevoMessageMensaje").val();
    let error = "";
    $("#mensaje").val("");

    if (validarVacio(messageText)) {
        error = "Campo mensaje vacio <br>";
        $("#mensaje").html(error);
        $("#mensaje").show(1000);
        $("#nuevoMessageMensaje").focus();
        return false;
    }
    return true;
}

// Validar formulario editar
function validarEditarMensaje() {
    let messageText = $("#editarMessageMensaje").val();
    let errores = "";
    $("#mensaje").val("");

    if (validarVacio(messageText)) {
        errores = "Campo Mensaje vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#editarMessageMensaje").focus();
        return false;
    }
    return true;
}

function limpiarCamposNuevoMensaje() {
    $("#nuevoMessageMensaje").val("");
}

function limpiarCamposEditarMensaje() {
    $("#editarMessageMensaje").val("");
}


/* Tabla Reservacion  */

function llenarTablaReservaciones(items) {
    $("#tabla").html("");
    $("#tabla").show(500);

    var tabla = `<table id ="tablaReservacion" border='1'> 
                <tr>    
                    <th>Id</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>id Cliente</th>
                    <th>id Finca</th>
                    <th colspan='2'>Acciones</th>
                </tr>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tr id=${i}>
                <td id="id">${items[i].idReservation}</td>
                <td id="startDate">${items[i].startDate}</td>
                <td id="endDate">${items[i].devolutionDate}</td>
                <td id="client">${items[i].client.idClient}</td>
                <td id="finca">${items[i].farm.id}</td>
                <td id="btnEditar"><button onclick='formularioEditarReservacion(${items[i].idReservation}, ${i})'>Editar</button></td>
                <td id="btnBorrar"><button onclick="borrarReservacion(${items[i].idReservation})">Borrar</button></td>
                </tr>`;
    }
    tabla += `</table>`;
    $("#tabla").html(tabla);
}

/* Metodo GET Reservacion*/

function mostrarReservaciones() {
    $("#imagen-inicial").hide();
    $("#info").show();
    $("#nuevaReservacion").hide();
    $("#editarReservacion").hide();
    $("#titulo").html("Reservaciones");
    $("#btnNuevo").attr("onclick", "formularioNuevaReservacion()");
    $("#btnNuevo").html("Nueva Reservacion");
    $("#btnNuevo").show();
    $.ajax(
        {
            url: "http://129.151.121.31:8080/api/Reservation/all/",
            type: "GET",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                llenarTablaReservaciones(respuesta);
            },
            error: function (xhr, status) {
                $("#mensaje").html("Ocurrio un error al ejecutar la peticion. Status: " + status);
                $("#mensaje").hide(3000);
            },
            complete: function (xhr, status) {
                $("#mensaje").html("Obteniendo listado de Reservaciones. Status: " + status);
                $("#mensaje").hide(3000);
            }
        }
    )

}

/* Metodo POST Reservaciones*/

function nuevaReservacion() {
    let data = {
        startDate: $("#reservaStartDateNueva").val(),
        devolutionDate: $("#reservaEndDateNueva").val(),
        client: { idClient: $("#reservaClientNueva").val() },
        farm: { id: $("#reservaFincaNueva").val() }
    }

    if (validarNuevaReserva()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Reservation/save/",
            data: JSON.stringify(data),
            type: "POST",
            contentType: "application/JSON; charset=utf-8",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(1000);
                $("#mensaje").html("Nueva Reservacion registrada");
                $("#mensaje").hide(1000);
                mostrarReservaciones();
                limpiarCamposNuevo();
            },
            error: function (xhr, status) {
                $("#mensaje").show(1000);
                $("#mensaje").html("Error en el registro... " + status);
                $("#mensaje").hide(1000);

            }
        });
    }
}

/* Metodo PUT Reservaciones*/

function editarReservacion() {
    let dataPut = {
        idReservation: $("#idReserva").val(),
        startDate: $("#reservaStartDateEditar").val(),
        devolutionDate: $("#reservaEndDateEditar").val(),
        client: { id: $("#reservaClientEditar").val() },
        farm: { id: $("#reservaFincaEditar").val() }
    };
    console.log(dataPut);
    if (validarEditarReservacion()) {
        $.ajax({
            url: "http://129.151.121.31:8080/api/Reservation/update/",
            type: "PUT",
            data: JSON.stringify(dataPut),
            contentType: "application/JSON",
            dataType: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#mensaje").show(500);
                $("#mensaje").html(" Reservacion actualizada");
                $("#mensaje").hide(1000);
                limpiarCamposEditar();
                mostrarReservaciones();
            },
            error: function (xhr, status) {
                $("#mensaje").show();
                $("#mensaje").html("Error en la actualizacion... " + status);
                $("#mensaje").hide(500);

            }
        });
    }
}

/*  Metodo DELETE Reservaciones*/

function borrarReservacion(codigo) {
    let dato = {
        idReservation: codigo
    }
    let datoBorrar = JSON.stringify(dato);
    $.ajax({
        url: "http://129.151.121.31:8080/api/Reservation/" + codigo,
        data: datoBorrar,
        type: "DELETE",
        contentType: "application/JSON",
        dataType: "JSON",
        success: function (respuesta) {
            $("#mensaje").show(1000);
            $("#mensaje").html("Registro eliminado");
            $("#mensaje").hide(1000);
            mostrarReservaciones();
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la peticion: " + status);
            $("#mensaje").hide(1000);
        }
    });
}

function formularioNuevaReservacion() {
    $("#nuevaReservacion").show(500);
    $("#tablaReservacion").hide(500);
    $("#btnNuevo").hide(500);

}

function formularioEditarReservacion(id, i) {

    document.getElementById("idReserva").value = id;

    /* 

    Falta!
    llenar selectores
    
    
    */

    $("#editarReservacion").show(500);
    $("#btnNuevo").hide(500);
    $("#tabla").hide();

}

/* Validaciones Reservacion */

// Validar formulario nuevo
function validarNuevaReserva() {
    return true;

}

// Validar formulario editar
function validarEditarReservacion() {

    return true;
}


/* Reportes */

function mostrarReportes() {

    $("#imagen-inicial").hide();
    $("#info").show();
    $("#btnNuevo").hide();
    $("#titulo").html("Reportes");
    $("#reportes").show();
}

function traerReporteStatus() {
    $.ajax({
        url: "http://129.151.121.31:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            llenarTablaReporteStatus(respuesta);
        }
    });
}

function llenarTablaReporteStatus() {
    $("#tabla").html("");
    let myTable = "<table>";
    myTable += "<tr>";
    myTable += "<th>completadas</th>";
    myTable += "<td>" + respuesta.completed + "</td>";
    myTable += "<th>canceladas</th>";
    myTable += "<td>" + respuesta.cancelled + "</td>";
    myTable += "</tr>";
    myTable += "</table>";
    $("#tabla").html(myTable);
}

function crearReporteFechas() {
    
    var startDate = document.getElementById("datoStarDate").value;
    var endDate = document.getElementById("datoDevolutionDate").value;
    console.log(startDate);
    console.log(endDate);

    $.ajax({
        url: "http://129.151.121.31:8080/api/Reservation/report-dates/" + startDate + "/" + endDate,
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            llenarTablaReporteFechas(respuesta);
        }
    });
}

function llenarTablaReporteFechas() {
    $("#tabla").html("");
    let myTable = "<table>";
        myTable += "<tr>";

    for (i = 0; i < respuesta.length; i++) {
        myTable += "<th>total</th>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].status + "</td>";
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#tabla").html(myTable);

}

function crearReporteClientes(){
    $.ajax({
        url:"http://129.151.121.31:8080/api/Reservation/report-clients",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            llenarTablaReporteClientes(respuesta);
        }
    });
}

function llenarTablaReporteClientes(respuesta){
    $("#tabla").html("");
    let myTable="<table>";
        myTable+="<tr>";
      
    for(i=0;i<respuesta.length;i++){
    myTable+="<th>total</th>";
        myTable+="<td>"+respuesta[i].total+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].client.email+"</td>";
        myTable+="<td>"+respuesta[i].client.age+"</td>";
      
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#tabla").html(myTable);
}
