<?php
    require_once('database.php');

    // Get the form data
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $email = $data->email;

    // Remove the user from the database only if email is provided
    if($email) {
        try {
            $query = "DELETE FROM subscribers WHERE email = :email ";
            $conn = $db->prepare($query);
            $conn->execute(array(
                'email' => $email
            ));
        } catch (Exception $e) {
            // If there was an error removing the user
            echo("Error: " . $e->getMessage());
        } 
    }
?>