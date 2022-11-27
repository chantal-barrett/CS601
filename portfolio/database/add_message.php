<?php
    require_once('database.php');

    // Get the form data
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $contactName = $data->name;
    $email = $data->email;
    $comment = $data->message;
    $subscribe = $data->subscribe; 

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

            // If the user also wants to subscribe
            if ($subscribe == "true") {
                try {
                    $query = "INSERT INTO subscribers (contactName, email) VALUES (:contactName, :email)";
                    $conn = $db->prepare($query);
                    $conn->execute(array(
                        'contactName' => $contactName,
                        'email' => $email
                    ));
                } catch (Exception $e) {
                    // If there was an error adding the message
                    echo("Error: " . $e->getMessage());
                } 
            }
        } catch (Exception $e) {
            // If there was an error adding the message
            echo("Error: " . $e->getMessage());
        } 
    }
?>