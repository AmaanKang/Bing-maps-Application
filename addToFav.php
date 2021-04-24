<?php
/**
 * Author:Amandeep Kaur
 * 
 * Adds a location to favourites table in backend.
 */
include "connect.php";

$bankId = filter_input(INPUT_GET, "id");
$command = "SELECT * FROM locations WHERE bankId=?";
$stmt = $dbh->prepare($command);
$params = [$bankId];
$success = $stmt->execute($params);
$name = "";
$address = "";
$city = "";
$province = "";
$postalCode = "";
$lat = "";
$long = "";
if($success){
    while ($row = $stmt->fetch()){
         $name = $row["name"];
         $address = $row["address"];
         $city = $row["city"];
         $province = $row["province"];
         $postalCode = $row["postalCode"];
         $lat = $row["latitude"];
         $long = $row["longitude"];
    }
    $command2 = "INSERT INTO favourites(name,address,city,province,postalCode,latitude,longitude) VALUES(?,?,?,?,?,?,?)";
    $stmt2 = $dbh->prepare($command2);
    $params2 = [$name,$address,$city,$province,$postalCode,$lat,$long];
    $success2 = $stmt2->execute($params2);
    if($success2){
        echo json_encode("Add was successful");
    }
}

?>
