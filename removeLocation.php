<?php
/**
 * I, Amandeep Kaur, student number 000822179, certify that this material is my original work. No other person's work has been used without due acknowledgment and 
 * I have not made my work available to anyone else.
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