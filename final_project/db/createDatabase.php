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

   $theQuery = 'CREATE TABLE markerDB (pieceID INTEGER PRIMARY KEY NOT NULL, title TEXT, username TEXT,color TEXT, geoloc TEXT)';
 $ok = $db ->exec($theQuery);
	// make sure the query executed
	if (!$ok)
	die($db->lastErrorMsg());
	// if everything executed error less we will arrive at this statement
	echo "Table markersDB created successfully<br \>";
}
catch(Exception $e)
{
   die($e);
}
?>
