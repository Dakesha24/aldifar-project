<?php
include('db.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true"); 

$encodedData = file_get_contents('php://input');
$decodedData = json_decode($encodedData, true);

$UserLogin = $decodedData['email'];
$UserPW = $decodedData['password'];

// Query untuk mencari user dan username berdasarkan email
$SQL = "SELECT password, username FROM users WHERE email = ?";
$stmt = mysqli_prepare($conn, $SQL);
mysqli_stmt_bind_param($stmt, "s", $UserLogin);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    // Verifikasi password
    if (password_verify($UserPW, $row['password'])) {
        $Message = "Success";
        $Username = $row['username']; // Ambil username
    } else {
        $Message = "Wrong password";
        $Username = null;
    }
} else {
    $Message = "No account yet";
    $Username = null;
}

// Kirim response dengan username
echo json_encode([
    "Message" => $Message,
    "username" => $Username
]);
?>