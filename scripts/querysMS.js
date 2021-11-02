// var urlServer = "http://"+window.location.host+"/api/Machine/all";
var path = "/api/Message/";
var locationHost = window.location.host;
var port = ":8080"
var ssave = "save";
var sshow = "all";
var supdate = "update";
var sdelete = "";
// var urlServerCategory = "http://"+window.location.host+port+"/api/Category/all";
// var urlServer = "http://129.151.112.3:8080/api/Machine/all";
// var urlServerCategory = "http://129.151.112.3:8080/api/Category/all";

function consultar() {
    $.ajax({
        url: "http://"+locationHost+port+path+sshow,
        type: "GET",
        dataType: "json",
        success: function (response) {
            $('tbody').empty();
            console.log(response);
            $.each(response, function(index, value){
                $('#cuerpoTabla').append(
                    '<tr>'+
                        '<td>'+value.id+'</td>'+
                        '<td>'+value.messageText+'</td>'+
                        '<td>'+
                            '<button type="button" class="btn success" onclick=editar('+value.id+',"'+value.messageText+'")>Editar</button>'+
                            '<button type="button" class="btn danger" onclick=eliminar('+value.id+')>Eliminar</button>'+
                        '</td>'+
                    '</tr>'
                );
            });
        }
    });
}

function crear(){
    if($("#mensaje").val()==""){
        alert("Debe definir el mensaje");
    }
    else{
        let messageText = $("#mensaje").val();
        var data = {
            messageText:messageText,
        };
        $.ajax({
            url: "http://"+locationHost+port+path+ssave,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (response) {
                limpiar();
                consultar();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se pudo crear el elemento")
            }
        });
    } 
}

function editar(id,messageText){
    document.getElementById("openEdit").click();
        $("#id").val(""+id+"");
        document.getElementById("id").disabled = true;
        $("#mensaje").val(""+messageText+"");
}

function actualizar(id) {
    if($("#mensaje").val()==""){
        alert("Todos los campos son obligatorios");
    }
    else{
        let data = {
            id: $("#id").val(),
            messageText: $("#mensaje").val(),
        }

        $.ajax({
            url: "http://"+locationHost+port+path+supdate,
            type: "PUT",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            success: function (response) {
                limpiar();
                consultar();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}


function eliminar(id) {
    var conf = confirm("Seguro que desea eliminar el resgistro No." + id);
    if (conf == true) {
        var data = {
            id: id
        }
        $.ajax({
            url: "http://"+locationHost+port+path+sdelete+id,
            type: "DELETE",
            dataType: "json",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            statusCode: {
                204: function () {
                    consultar();
                }
            },
        });
    }
}

function limpiar() {
    $("#mensaje").val("");
}

$(document).ready(function () {
    consultar();
});
