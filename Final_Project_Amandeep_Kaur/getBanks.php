<?php
/**
 * I, Amandeep Kaur, student number 000822179, certify that this material is my original work. No other person's work has been used without due acknowledgment and 
 * I have not made my work available to anyone else.
 * 
 * Gets all the bank locations from database.
 */
include "connect.php";
$command = "SELECT * FROM locations";
$stmt = $dbh->prepare($command);
$success = $stmt->execute();
$locationArray = [];
if($success){
    while ($row = $stmt->fetch()) {
        $record = 
        ["bankId"=>$row["bankId"],
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