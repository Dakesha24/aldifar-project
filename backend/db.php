
<?php
$conn = mysqli_connect('localhost', 'root', '');
$database = mysqli_select_db($conn, 'db_aldifar');

$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);


header("Access-Control-Allow-Origin: *"); // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Mengizinkan metode HTTP tertentu
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Mengizinkan header khusus
header("Access-Control-Allow-Credentials: true"); 