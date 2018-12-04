<?php
//reference for IP address check http://itman.in/en/how-to-get-client-ip-address-in-php/
  if($_SERVER['REQUEST_METHOD'] == 'POST')
  {

    //$myFile = "markers.json";
  //  $fh = fopen($myFile, 'w') or die("can't open file");
    $stringData = $_POST["data"];
    $addArray[] = array('entry:' => $stringData);
    //fwrite($fh, $stringData);
    //fclose($fh);
    //echo("success");
    $results = file_get_contents('markers.json');
    $tempArray = json_decode($results);
    //$tempArray($results);
    $tempArray[] = $addArray;
    $jsonData = json_encode($tempArray);
    file_put_contents('markers.json',$jsonData);
    echo("success");
    exit;


  }


?>
