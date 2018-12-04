<?php
// put required html mark up
echo"<html>\n";
echo"<head>\n";
echo"<title> Output from the Marker Database </title> \n";
//include CSS Style Sheet
echo "<link rel='stylesheet' type='text/css' href='main.css'>";
echo"</head>\n";
// start the body ...
echo"<body>\n";

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

   $sql_select='SELECT * FROM markerTable';
// the result set
$result = $db->query($sql_select);
if (!$result) die("Cannot execute query.");
}

catch(Exception $e)
{
   die($e);
}

echo"</body>\n";
echo"</html>\n";
?>
