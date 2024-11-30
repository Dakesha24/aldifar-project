<?php
include('db.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if (isset($_GET['category_id'])) {
    $category_id = mysqli_real_escape_string($conn, $_GET['category_id']);
    $query = "SELECT * FROM materials WHERE category_id = $category_id ORDER BY id";
    $result = mysqli_query($conn, $query);

    $materials = array();
    while($row = mysqli_fetch_assoc($result)) {
        $materials[] = $row;
    }

    echo json_encode($materials);
} else {
    echo json_encode(array("error" => "Category ID is required"));
}
?>