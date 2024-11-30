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
    if (isset($_GET['id'])) {
        $material_id = mysqli_real_escape_string($conn, $_GET['id']);
        $query = "SELECT m.*, c.title as category_title 
                FROM materials m 
                JOIN categories c ON m.category_id = c.id 
                WHERE m.id = $material_id";
        
        $result = mysqli_query($conn, $query);

        if (!$result) {
            throw new Exception(mysqli_error($conn));
        }

        if ($row = mysqli_fetch_assoc($result)) {
            echo json_encode($row);
        } else {
            http_response_code(404);
            echo json_encode(array("error" => "Material not found"));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Material ID is required"));
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}
?>