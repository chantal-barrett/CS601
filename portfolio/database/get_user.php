<?php
    require_once('database.php');

    // Get the form data
    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $email = $data->email;

    // Select the user from the database only if their email is provided
    if($email) {
        try {
            $query = "SELECT * FROM subscribers WHERE email = :email";
            $conn = $db->prepare($query);
            $conn->execute(array(
                'email' => $email
            ));

            echo json_encode($conn->fetch(PDO::FETCH_ASSOC));
        } catch (Exception $e) {
            // If there was an error adding the user
            echo("Error: " . $e->getMessage());
        } 
    }
?>