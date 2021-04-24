<?php
/**
 * Author:Amandeep Kaur
 * 
 * Removes a location from favourites table in database.
 */
include "connect.php";

$bankId = filter_input(INPUT_GET, "id");
$command = "DELETE FROM favourites WHERE favBankId=?";
$stmt = $dbh->prepare($command);
$params = [$bankId];
$success = $stmt->execute($params);
if($success){
    echo json_encode("Delete was successful");
}

?>
