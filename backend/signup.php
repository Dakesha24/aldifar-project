<?php
include('db.php');

header("Access-Control-Allow-Origin: *"); // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Mengizinkan metode HTTP tertentu
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Mengizinkan header khusus
header("Access-Control-Allow-Credentials: true"); 

$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);

$UserEmail = $decodedData['email'];
$Username = $decodedData['username'];
// Gunakan password_hash untuk mengenkripsi password
$UserPW = password_hash($decodedData['password'], PASSWORD_DEFAULT);

// Periksa apakah email atau username sudah terdaftar
$SQL = "SELECT * FROM users WHERE email = ? OR username = ?";
$stmt = mysqli_prepare($conn, $SQL);
mysqli_stmt_bind_param($stmt, "ss", $UserEmail, $Username);
mysqli_stmt_execute($stmt);
$exeSQL = mysqli_stmt_get_result($stmt);
$checkEmail = mysqli_num_rows($exeSQL);

if ($checkEmail != 0) {
    $Message = "Already registered";
} else {
    // Siapkan query insert
    $InsertQuery = "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())";
    
    $stmt = mysqli_prepare($conn, $InsertQuery);
    mysqli_stmt_bind_param($stmt, "sss", $Username, $UserEmail, $UserPW);
    
    $R = mysqli_stmt_execute($stmt);

    if ($R) {
        $Message = "Complete--!";
    } else {
        $Message = "Error";
    }
}

$response[] = array("Message" => $Message);
echo json_encode($response);