<?php
//reference for IP address check http://itman.in/en/how-to-get-client-ip-address-in-php/
  if($_SERVER['REQUEST_METHOD'] == 'POST')
  {

    $myFile = "markers.json";
    $fh = fopen($myFile, 'w') or die("can't open file");
    $stringData = $_POST["data"];
    fwrite($fh, $stringData);
    fclose($fh);
    echo("success");
    exit;


  }


?>
