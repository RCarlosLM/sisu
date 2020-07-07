// configuracion del select
$(".chosen-select").chosen({
    width: "100%",
    no_results_text: "Oops, sin información!",
});

$.ajax({
    url: "http://localhost:8080/servicio/paises",
    type : 'get',
    success: function(response){
        console.log(response);
        
        $('#select-pais').html('<option> Selecciona un pais </option>');

        // mostramos las opciones
        $.each( response, function( key, value ) {
            newOption = $("<option value="+value.id+">"+value.nombre+"</option>");
            $('#select-pais').append(newOption);
        });
        $('#select-pais').trigger("chosen:updated");

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
    $('#select-pais').on('change', onSelectPaisChange);
});
  
function onSelectPaisChange() {
    var paisId = $(this).val();
    console.log(paisId);
    //mostramos el combo estado
    $('.estado').css('display', 'inline-block');

    $.ajax({
        url: "http://localhost:8080/servicio/estados",
        type : 'post',
        data : paisId,
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            
            // limpiamos el select
            $('#select-estado').empty();
            $('#select-ciudad').empty();
            $('#select-estado').html('<option> Selecciona un estado </option>');

            // mostramos las opciones
            $.each( response, function( key, value ) {
                newOption = $("<option value="+value.id+">"+value.nombre+"</option>");
                $('#select-estado').append(newOption);
            });
            $('#select-estado').trigger("chosen:updated");

            // mensaje al usuario
            toastr.success('Correcto!','Estados cargados');
    
        },
        error: function(response) {
            toastr.error('Ocurrio un Error!','Favor de verificar con el administrador');
        }
    });
  
}

// *** select ciudad ***
$(function(){
    $('#select-estado').on('change', onSelectCiudadChange);
});
  
function onSelectCiudadChange() {
    var estadoId = $(this).val();
    console.log(estadoId);
    // visualizamos el combo
    $('.ciudad').css('display', 'inline-block');

    $.ajax({
        url: "http://localhost:8080/servicio/ciudades",
        type : 'post',
        data : estadoId,
        contentType: 'application/json',
        success: function(response){
            console.log(response);
            
            // limpiamos el select
            $('#select-ciudad').empty();
            $('#select-ciudad').html('<option> Selecciona una ciudad </option>');

            // mostramos las opciones
            $.each( response, function( key, value ) {
                joder = $("<option value="+value.id+">"+value.nombre+"</option>");
                $('#select-ciudad').append(joder);
            });
            $('#select-ciudad').trigger("chosen:updated");

            // mensaje al usuario
            toastr.success('Correcto!','Ciudades cargadas');
    
        },
        error: function(response) {
            toastr.error('Ocurrio un Error!','Favor de verificar con el administrador');
        }
    });
  
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
        pais: { required: true },
        estado: { required: true },
        ciudad: { required: true }

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

// Envio del formulario si todo esta validado
function enviarForm(){

    $("#formSend").bind("submit",function(){

        // Capturamnos el boton de envío
        var btnEnviar = $("#btnEnviar");
        // obtenemos los datos del formulario
        let datos = $(this).serialize();

        $.ajax({
            type: $(this).attr("method"),
            url: $(this).attr("action"),
            data: datos,
            contentType: 'application/json',
            dataType: "json",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
            success: function(data){

                if(data == 1){
                    $(".respuesta").html(data);
                }else{
                    toastr.danger('Error!','No se pudo agregar');
                }


            },
            error: function(data){

                toastr.warning('Aviso!','Corrige los errores');

            }
        });
        // Nos permite cancelar el envio del formulario
        return false;
        
    });

}