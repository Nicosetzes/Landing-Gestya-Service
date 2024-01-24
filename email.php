<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    $mail->Host       = $_ENV["EMAIL_HOST"];                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
    $mail->Username   = $_ENV["EMAIL_USER"];           //SMTP username
    $mail->Password   = $_ENV["EMAIL_PASS"]; ;                         //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
    $mail->CharSet    = 'UTF-8';

    //Recipients
    $mail->setFrom($_ENV["EMAIL_USER"], 'Nuevo contacto - GESTYA Servicio oficial');
    $mail->addAddress($_ENV["EMAIL_USER"]);               //Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    // $mail->addCC('victorlaurencena@gmail.com');
    // $mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Consulta de: '.$_POST['user_email'];
    $mail->Body    = 
    'Nombre: '.$_POST['user_first_name']. 
    '<br>Apellido: '.$_POST['user_last_name']. 
    '<br>Email: '.$_POST['user_email'].
    '<br>Móvil: '.$_POST['user_cellphone'].
    '<br>Provincia: '.$_POST['user_provincia'].
    '<br>Mensaje: '.$_POST['user_message'];
    //$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    header("location: gracias.html");
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    // header("location: contacto-error.html");
}

?>