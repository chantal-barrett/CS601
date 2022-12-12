<?php
    $dsn = 'mysql:host=chantalmbarrett69712.domaincommysql.com;dbname=cs601db';
    $username = 'chantalb';
    $password = '*******';

    try {
        $db = new PDO($dsn, $username, $password);
    } catch (PDOException $e) {
        $error_message = $e->getMessage();
        exit();
    }
?>