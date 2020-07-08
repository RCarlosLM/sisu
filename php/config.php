<?php  

    $host = "localhost";
    $username = "root";
    $password = "";
    $DBname = "sisu";
    
    $con = mysqli_connect($host,$username,$password,$DBname);
    mysqli_set_charset($con,'utf8');

    /*if($con){
        echo "work";
    }
    else{
        echo "not work";
    }*/


?>