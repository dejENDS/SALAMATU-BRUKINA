<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $subject = $_POST["subject"];
    $region = $_POST["region"];
    $request = $_POST["request"];

    // Set the email address where you want to receive the form submissions
    $to = "your_email@example.com";

    // Set the email subject
    $email_subject = "Customer Request: $subject";

    // Construct the email body
    $email_body = "Name: $name\n";
    $email_body .= "Email: $email\n";  
    $email_body .= "Phone: $phone\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Region: $region\n";
    $email_body .= "Request: $request\n";

    // Additional headers
    $headers = "From: $email";

    // Send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        $response = array("success" => true, "message" => "Submitted successfully. Thank you!");
    } else {
        $response = array("success" => false, "message" => "Submission failed. Please try again later.");
    }

    // Set the JSON content type and return the JSON response
    header("Content-Type: application/json");
    echo json_encode($response);
}
?>
