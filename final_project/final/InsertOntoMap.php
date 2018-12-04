<?php

class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('../db/markerDatabase.db');
      }
   }

try
{
   $db = new MyDB();
   echo ("Opened or created map data base successfully<br \>");

   $countMarkersStatement= "SELECT COUNT (*) FROM markerDB";

   $countMarkers = $db->query($countMarkersStatement);
if (!$countMarkers) die("Cannot execute query.");

$countResult = $countMarkers->fetchArray(SQLITE3_NUM);
echo $countResult[0]."<br \>";

if($countResult[0] == 0)
{
 echo " we have an empty database:: <br \>";
}
else
{
    echo "We already have " .$countResult[0] . "markers in the map";
}

}
catch(Exception $e)
{
   die($e);
}
?>
