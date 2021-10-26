$(document).ready(function () {
    mostrarImagen();
});

function llenarTablaFincas(items) {
    console.log(items)
    $("#tabla").html("");
    $("#tabla").show(500);

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
    $("#tabla").html(tabla);
}

function mostrarFincas() {
    $("#imagen-inicial").hide();
    $.ajax(
        {
            url: "http://127.0.0.1:8080/api/Farm/all",
            type: "GET",
            dataType: "json",
            success: function (respuesta) {
                console.log(respuesta.items);
                llenarTablaFincas(respuesta.items);
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

function mostrarImagen() {
    $("#imagen-inicial").show();
}