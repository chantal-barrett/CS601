<?php
    require_once('database.php');

    // Get the form data
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $contactName = $data->name;
    $email = $data->email;

    // Add the user to the database only if all fields are provided
    if($contactName && $email) {
        try {
            $query = "INSERT INTO subscribers (contactName, email) VALUES (:contactName, :email)";
            $conn = $db->prepare($query);
            $conn->execute(array(
                'contactName' => $contactName,
                'email' => $email
            ));
        } catch (Exception $e) {
            // If there was an error adding the user
            echo("Error: " . $e->getMessage());
        } 
    }
?>