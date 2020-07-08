<?php
  //Configuracion de la conexion a base de datos
  $bd_host = "localhost"; 

  $bd_usuario = "root"; 
  $bd_password = ""; 
  $bd_base = "sisu"; 
  $con = mysql_connect($bd_host, $bd_usuario, $bd_password); 
  mysql_select_db($bd_base, $con); 

  //consulta todos los usuarios
  $sql=mysql_query("SELECT * FROM users",$con);
  //muestra los datos consultados
?>
  <table style="border:1px solid #FF0000; color:#000099;width:400px;">

    <tr style="background:#99CCCC;">
      <td>Nombre</td>
      <td>Edad</td>
      <td>Ciudad</td>

    </tr>
    <?php
      while($row = mysql_fetch_array($sql)){
      echo "	<tr>";
      echo " 		<td>".$row['nombre']."</td>";

      echo " 		<td>".$row['edad']."</td>";
      echo " 		<td>".$row['ciudad']."</td>";
      echo "	</tr>";

      }
    ?>
  </table>