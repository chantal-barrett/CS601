<?php
    require_once('database.php');

    // Get the form data
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $contactName = $data->name;
    $email = $data->email;
    $comment = $data->message;

    // TO DO: implement subscribe/unsubscribe functionality
    // $subscribe = $data->subscribe; 

    // Add the message to the database only if all fields are provided
    if($contactName && $email && $comment) {
        try {
            $query = "INSERT INTO messages (contactName, email, messageContent) VALUES (:contactName, :email, :comment)";
            $conn = $db->prepare($query);
            $conn->execute(array(
                'contactName' => $contactName,
                'email' => $email,
                'comment' => $comment
            ));
        } catch (Exception $e) {
            // If there was an error adding the message
            echo("Error: " . $e->getMessage());
        } 
    }
?>