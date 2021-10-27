$(document).ready(function () {
    mostrarImagen();
});

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
            url: "http://129.151.121.31/api/Farm/all/",
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
    formularioNuevaFinca();
    let data = {
        address: $("#addressNueva").val(),
        extension: $("#extensionNueva").val(),
        category: {id:$("#category_idNueva").val()},
        name: $("#nameNueva").val(),
        description: $("#descriptionNueva").val()
    }

    if (validarNuevo()) {
        $.ajax({
            url: "http://129.151.121.31/api/Farm/save/",
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
        description: $("#descriptionEditar").val(),
        extension: $("#extensionEditar").val()
    };
    console.log(dataPut);
    if (validarEditar()) {
        $.ajax({
            url: "http://129.151.121.31/api/Farm/update/",
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

function borrarFinca(codigo){
    let datos={
        id:codigo
    };

    let = datoBorrar = JSON.stringify(datos);
    $.ajax({
        url:"http://129.151.121.31/api/Farm/"+ codigo,
        data:datoBorrar,
        type:"DELETE", 
        contentType:"application/JSON",
        dataType: "json",
        success:function(respuesta){
            $("#mensaje").show(1000);
            $("#mensaje").html("Registro eliminado");
            $("#mensaje").hide(1000);
            mostrarFincas();
        },
        error:function(xhr, status){
            $("#mensajes").html("Ocurrio un problema al ejecutar la peticion: "+status);
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

function formularioEditarFinca(id,i) {

    document.getElementById("idEditar").value = id;

    $("#"+`${i}`).each(function () {
        var address=$(this).find("#address").html();
        document.getElementById("addressEditar").placeholder = address;
    });
    $("#"+`${i}`).each(function () {
        var extension=$(this).find("#extension").html();
        document.getElementById("extensionEditar").placeholder = extension;
    });
    $("#"+`${i}`).each(function () {
        var category_id=$(this).find("#category").html();
        document.getElementById("category_idEditar").placeholder = category_id;
    });
    $("#"+`${i}`).each(function () {
        var name=$(this).find("#name").html();
        document.getElementById("nameEditar").placeholder = name;
    });
    $("#"+`${i}`).each(function () {
        var description=$(this).find("#description").html();
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

/* Validaciones */

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
    } /* else if (validarVacio(category_id)) {
        errores = "Campo category_id vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#category_idEditar").focus();
        return false;
    } */ else if (validarVacio(name)) {
        errores = "Campo name vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#nameEditar").focus();
        return false;
    }else if (validarVacio(description)) {
        errores = "Campo description vacio <br>";
        $("#mensaje").html(errores);
        $("#mensaje").show(1000);
        $("#descriptionEditar").focus();
        return false;
    }
    return true;
}

