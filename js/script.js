// configuracion del select
$(".chosen-select").chosen({
    width: "100%",
    no_results_text: "Oops, sin información!",
});

$.ajax({
    url: "http://localhost:8080/servicio/paises",
    type : 'get',
    contentType: 'application/json',
    dataType: "json",
    headers: {
        'Accept': 'application/json',
        "content-type": "application/json;charset=UTF-8"
    },
    success: function(response){
        console.log(response);
        
        $('#pais').html('<option value="u"> Selecciona un pais </option>');

        // mostramos las opciones
        $.each( response, function( key, value ) {
            newOption = $("<option value="+value.id+">"+value.nombre+"</option>");
            $('#pais').append(newOption);
        });
        $('#pais').trigger("chosen:updated");

        // mensaje al usuario
        toastr.success('Correcto!','Paises cargados');

    },
    error: function(response) {
      toastr.error('Ocurrio un Error!','Favor de verificar con el administrador');
    }
});

// combos ocultos
$('.estado').css('display', 'none');
$('.ciudad').css('display', 'none');

// *** select estado ***
$(function(){
    $('#pais').on('change', onSelectPaisChange);
});
  
function onSelectPaisChange() {
    var paisId = $(this).val();
    console.log(paisId);
    //mostramos el combo estado
    $('.estado').css('display', 'inline-block');

    if(paisId == 'u'){

        $('#estado').empty();
        $('#estado').trigger("chosen:updated");
        $('#ciudad').empty();
        $('#ciudad').trigger("chosen:updated");

    }else{

        $.ajax({
            url: "http://localhost:8080/servicio/estados",
            type : 'post',
            data : paisId,
            contentType: 'application/json',
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                "content-type": "application/json;charset=UTF-8"
            },
            success: function(response){
                console.log(response);
                
                // limpiamos el select
                $('#estado').empty();
                $('#estado').trigger("chosen:updated");
                $('#ciudad').empty();
                $('#ciudad').trigger("chosen:updated");
                $('#estado').html('<option value="u"> Selecciona un estado </option>');
    
                // mostramos las opciones
                $.each( response, function( key, value ) {
                    newOption = $("<option value="+value.id+">"+value.nombre+"</option>");
                    $('#estado').append(newOption);
                });
                $('#estado').trigger("chosen:updated");
    
                // mensaje al usuario
                toastr.success('Correcto!','Estados cargados');
    
        
            },
            error: function(response) {
                toastr.error('Ocurrio un Error!','Favor de verificar con el administrador');
            }
        });

    }

  
}

// *** select ciudad ***
$(function(){
    $('#estado').on('change', onSelectCiudadChange);
});
  
function onSelectCiudadChange() {
    var estadoId = $(this).val();
    console.log(estadoId);
    // visualizamos el combo
    $('.ciudad').css('display', 'inline-block');

    if(estadoId == 'u'){

        $('#ciudad').empty();
        $('#ciudad').trigger("chosen:updated");

    }else{

        $.ajax({
            url: "http://localhost:8080/servicio/ciudades",
            type : 'post',
            data : estadoId,
            contentType: 'application/json',
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                "content-type": "application/json;charset=UTF-8"
            },
            success: function(response){
                console.log(response);
                
                // limpiamos el select
                $('#ciudad').empty();
                $('#ciudad').html('<option> Selecciona una ciudad </option>');

                // mostramos las opciones
                $.each( response, function( key, value ) {
                    joder = $("<option value="+value.id+">"+value.nombre+"</option>");
                    $('#ciudad').append(joder);
                });
                $('#ciudad').trigger("chosen:updated");

                // mensaje al usuario
                toastr.success('Correcto!','Ciudades cargadas');
        
            },
            error: function(response) {
                toastr.error('Ocurrio un Error!','Favor de verificar con el administrador');
            }
        });

    }
  
}

// validamos el formulario
$("#formSend").validate({

    errorPlacement: function (error, element)
    {
      element.before(error);
    },
    ignore: ":hidden:not(select)",

    // reglas
    rules: {
        nombre: { required: true, maxlength: 50, regex:true },
        edad: { required: true, min: 18, max: 99, number: true},
        pais: { required: true, number: true },
        estado: { required: true, number: true },
        ciudad: { required: true, number: true }

    },
    messages: {
        nombre: {
            maxlength: "Introduzca maximo 50 caracteres"
        }
    },

    // colores
    highlight: function(element) {
        $(element).css('background', '#ffdddd');
    },
    unhighlight: function(element) {
        $(element).css('background', '#ffffff');
    },

    // ejecutar funcion
    submitHandler: function(form) {

        enviarForm();

    }

});

// funcion personalizada para los caracteres
// tomando encuenta solo escribir numero, letra, acento, ñ, Ñ, punto
jQuery.validator.addMethod("regex",
    function(value, element) {
            return /^[0-9.a-zA-ZÀ-ÿ\u00f1\u00d1]+[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(value);
    },
   "Nada de caracteres especiales, por favor"
);

// oculto la caja de respuesta temporal
$('#respuesta').css('display', 'none');

// Envio del formulario si todo esta validado
function enviarForm(){

    $("#formSend").bind("submit",function(){

        // Capturamnos el boton de envío
        var btnEnviar = $("#btnEnviar");
        // obtenemos los datos del formulario
        let datos = $(this).serialize();
        // mostramos la info por un momento
        let nombre = $('#nombre').val();
        let edad = $('#edad').val();
        let ciudad = $('#ciudad').find('option:selected').text();
        // mostramos la info por un momento
        $('#respuesta').css('display', 'inline-block');
        $(".respuesta").html('<div class="row"><div class="col-md-12">'+
            '<div class="callout callout-info">'+
                '<table class="table" style="width:1000px;">'+
                    '<thead class="thead-dark">'+
                        '<tr>'+
                            '<td>'+
                                'Nombre'+
                            '</td>'+
                            '<td>'+
                                'Edad'+
                            '</td>'+
                            '<td>'+
                                'Ciudad'+
                            '</td>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                        '<tr class="table-info">'+
                            '<td>'+
                                nombre+
                            '</td>'+
                            '<td>'+
                                edad+
                            '</td>'+
                            '<td>'+
                                ciudad+
                            '</td>'+
                        '</tr>'+
                    '</tbody>'+
                '</table>'+
            '</div>');
        
        // limpiamos el formulario
        $('#formSend').trigger('reset');
        $('#pais').empty();
        $('#estado').empty();
        $('#estado').trigger("chosen:updated");
        $('#ciudad').empty();
        $('#ciudad').trigger("chosen:updated");
        toastr.info('Correcto!','Usuario agregado');

        setTimeout(function() {
            window.location.reload(); 
        }, 3000);


        // esta seria la funcion para la bd
        // la verdad no me salio un inprevisto y no pude probarla
        // solo me hacia falta checar la parte de cors.
        // espero yme den la oprtunidad de laborar y crecer juntos

        /*$.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: datos,
            contentType: 'application/json',
            dataType: "json",
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                "content-type": "application/json;charset=UTF-8"
            },
            // Esta función se ejecuta durante el envió de la petición.
            beforeSend: function(){

                btnEnviar.val("Enviando");
                btnEnviar.attr("disabled","disabled");

            },
            // Se ejecuta al termino de la petición
            complete:function(data){
                btnEnviar.val("Enviar");
                btnEnviar.removeAttr("disabled");
            },
            success: function(response){

                console.log(response);
                // limpiamos el formulario
                $('#formSend').trigger('reset');
                /* if(response == 1){
                    $(".respuesta").html(response);
                }else{
                    toastr.danger('Error!','No se pudo agregar');
                } */


            /*},
            error: function(data){

                toastr.warning('Aviso!','Corrige los errores');

            }
        });*/
        // Nos permite cancelar el envio del formulario
        // return false;
        
    });

}