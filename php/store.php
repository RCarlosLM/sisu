<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header("Content-Type: application/json; charset=UTF-8");

    include('config.php');

    $nombre = $_POST["nombre"];
    $edad = $_POST["edad"];
    $pais = $_POST["pais"];
    $estado = $_POST["estado"];
    $ciudad = $_POST["ciudad"];

    // insertar en bd
    $sql = "INSERT into users (nombre,edad,ciudad) values ('$nombre', '$edad', '$ciudad')";
    
    // regresar
    echo mysqli_query($con,$sql);

?>