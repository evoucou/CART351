<?php
  if($_SERVER['REQUEST_METHOD'] == 'POST')
  {

    $myFile = "markers.json";
    /*$fh = fopen($myFile, 'w') or die("can't open file");
    $stringData = $_POST["data"];
    fwrite($fh, $stringData);
    fclose($fh);*/
  $stringData = $_POST["data"];
  echo($stringData);

  $inp = file_get_contents($myFile);
  $tempArray = json_decode($inp);
  $tempArray[] = $stringData;
  $jsonData = json_encode($tempArray);
  file_put_contents($myFile, $jsonData);

    echo("success");
    exit;


  }
  ?>
