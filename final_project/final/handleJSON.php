<?php
  if($_SERVER['REQUEST_METHOD'] == 'POST')
  {

    $myFile = "markers.json";
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
