<?php

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    header("Content-Type: application/json; charset=UTF-8");

    include('config.php');
    if($con->connect_error) {
        exit('Could not connect');
    }
    $nombre = $POST["nombre"];
    $edad = $POST["edad"];
    $pais = $POST["pais"];
    $estado = $POST["estado"];
    $ciudad = $POST["ciudad"];

    /* $contentdata  = file_get_contents("php://input");
    $getdata = json_decode($contentdata);

    $nombre =   $getdata->nombre; 
    $edad =     $getdata->edad;
    $pais =     $getdata->pais; 
    $estado =   $getdata->estado;
    $ciudad =   $getdata->ciudad;  */

    // insertar en bd
    $sql = "INSERT into users (nombre,edad,ciudad) values ('$nombre', '$edad', '$ciudad')";
    
    $result = mysqli_query($con,$sql);

    $numrow = mysqli_num_rows($result);
    
    if($numrow == 1){
        $arr = array();
        while($row = mysqli_fetch_assoc($result)){
            $arr[] = $row;
        }
    
        echo json_encode($arr);
        //mysqli_close($con);
    }else{
        echo json_encode(null);
    }

    // regresar
    // echo mysqli_query($con,$sql);

?>