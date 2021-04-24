<?php
/**
 * Author:Amandeep Kaur
 * 
 * Returns an array of all the locations present in favourites table in backend.
 */
include "connect.php";
$command = "SELECT * FROM favourites";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();
$locationArray = [];
if($success){
    while ($row = $stmt->fetch()) {
        $record = 
        ["bankId"=>$row["favBankId"],
         "name"=>$row["name"],
         "address"=>$row["address"],
         "city"=>$row["city"],
         "province"=>$row["province"],
         "postalCode"=>$row["postalCode"],
         "latitude"=>$row["latitude"],
         "longitude"=>$row["longitude"],
        ];
        array_push($locationArray,$record);
    }
}
echo json_encode($locationArray);
?>
