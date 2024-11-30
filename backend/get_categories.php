<?php
include('db.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $query = "SELECT * FROM categories ORDER BY id";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        throw new Exception(mysqli_error($conn));
    }

    $categories = array();
    while($row = mysqli_fetch_assoc($result)) {
        $categories[] = $row;
    }

    echo json_encode($categories);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}
?>