<?php
/**
 *  I, Amandeep Kaur, student number 000822179, certify that this material is my original work. No other person's work has been used without due acknowledgment and 
 * I have not made my work available to anyone else.
 * 
 * Adds a location to locations table in backend.
 */
include "connect.php";
$name = filter_input(INPUT_GET, "locationName", FILTER_SANITIZE_SPECIAL_CHARS);
$address = filter_input(INPUT_GET, "locationAddress", FILTER_SANITIZE_SPECIAL_CHARS);
$city = filter_input(INPUT_GET, "locationCity", FILTER_SANITIZE_SPECIAL_CHARS);
$prov = filter_input(INPUT_GET, "locationProv", FILTER_SANITIZE_SPECIAL_CHARS);
$postalCode = filter_input(INPUT_GET, "locationCode", FILTER_SANITIZE_SPECIAL_CHARS);
$lat = filter_input(INPUT_GET, "lat");
$long = filter_input(INPUT_GET, "long");
if(strlen(trim($address)) == 0 || $address == false){
    echo json_encode("Invalid Address");
}
else if(strlen(trim($name)) == 0 || $name == false){
    echo json_encode("Invalid Name");
}
else if(strlen(trim($city)) == 0 || $city == false){
    echo json_encode("Invalid City");
}
else if(strlen(trim($prov)) == 0 || $prov == false){
    echo json_encode("Invalid Province");
}
else if(strlen(trim($postalCode)) == 0 || $postalCode == false){
    echo json_encode("Invalid Ostal Code");
}
else{
    $command = "INSERT INTO locations(name,address,city,province,postalCode,latitude,longitude) VALUES(?,?,?,?,?,?,?)";
    $stmt = $dbh->prepare($command);
    $params = [$name,$address,$city,$prov,$postalCode,$lat,$long];
    $success = $stmt->execute($params);
    if($success){
        echo json_encode("Add was successful");
    }
    else{
        echo json_encode("Add failed");
    }
}

?>