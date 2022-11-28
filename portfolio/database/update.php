<?php
    require_once('database.php');

    // Get the form data
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $accountEmail = $data->accountEmail;
    $contactName = $data->name;
    $email = $data->email;

    // If the user wants to update their name and email
    if($accountEmail && $contactName != "" && $email != "") {
        try {
            $query = "UPDATE subscribers SET contactName = :contactName, email = :email WHERE email = :accountEmail";
            $conn = $db->prepare($query);
            $conn->execute(array(
                'contactName' => $contactName,
                'email' => $email,
                'accountEmail' => $accountEmail
            ));
        } catch (Exception $e) {
            // If there was an error adding the user
            echo("Error: " . $e->getMessage());
        } 
    }
    // If the user wants to update their name
    else if($accountEmail && $contactName != "" && $email == "") {
        try {
            $query = "UPDATE subscribers SET contactName = :contactName WHERE email = :accountEmail";
            $conn = $db->prepare($query);
            $conn->execute(array(
                'contactName' => $contactName,
                'accountEmail' => $accountEmail
            ));
        } catch (Exception $e) {
            // If there was an error adding the user
            echo("Error: " . $e->getMessage());
        } 
    }
    // If the user wants to update their email
    else if($accountEmail && $contactName == "" && $email != "") {
        try {
            $query = "UPDATE subscribers SET email = :email WHERE email = :accountEmail";
            $conn = $db->prepare($query);
            $conn->execute(array(
                'email' => $email,
                'accountEmail' => $accountEmail
            ));
        } catch (Exception $e) {
            // If there was an error adding the user
            echo("Error: " . $e->getMessage());
        } 
    }
?>