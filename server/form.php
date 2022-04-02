<?php
mb_internal_encoding('UTF-8');
mb_http_output('UTF-8');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
//use PHPMailer\PHPMailer\Exception;
//Load Composer's autoloader
require 'vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable( dirname(dirname(__DIR__)) );
$dotenv -> load();

//Variables globales
$exp_reg = new stdClass();
	$exp_reg->richText = new stdClass();
		$exp_reg->richText->exp = '/(*UTF8)[^\w\s\r\n\-.,:;$ñÑáéíóúÁÉÍÓÚäÄëËöÖüÜ#¿?¡!]/';
		$exp_reg->richText->textError = 1;
	$exp_reg->mediumText = new stdClass();
		$exp_reg->mediumText->exp = '/(*UTF8)[^\w\s\-.,ñÑáéíóúÁÉÍÓÚäÄëËöÖüÜ¿?¡!]/';
		$exp_reg->mediumText->textError = 1;
	$exp_reg->text = new stdClass();
		$exp_reg->text->exp = '/(*UTF8)[^\w\s.ñÑáéíóúÁÉÍÓÚäÄëËöÖüÜ]/';
		$exp_reg->text->textError = 1;
	$exp_reg->tel = new stdClass();
		$exp_reg->tel->exp = '/^(\({0,1}\+{1}[0-9]{2,3}\){0,1}\s{0,1}){0,1}(1\s{0,1}){0,1}([0-9]{2,3})(\s{0,1})([0-9]{3,4})(\s{0,1})([0-9]{4})$/';
		$exp_reg->tel->textError = 0;
	$exp_reg->mail = new stdClass();
		$exp_reg->mail->exp = '/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})$/';
		$exp_reg->mail->textError = 0;
	$exp_reg->number = new stdClass();
		$exp_reg->number->exp = '/[^\d]/';
		$exp_reg->number->textError = 1;
	$exp_reg->espacios = new stdClass();
		$exp_reg->espacios->exp = '/^[\s]+$/';
		$exp_reg->espacios->textError = 1;

$procesado = true;
$r = new stdClass();
$mensajeError = [];



$valores = new stdClass();
$valores->nombre = trim($_POST['fNombre']);
$valores->mail = trim($_POST['fMail']);
$valores->tel = trim($_POST['fTel']);
$valores->mensaje = trim($_POST['fMensaje']);


if(preg_match($exp_reg->text->exp, $valores->nombre) == 1){ $procesado = false; $mensajeError[] = "El nombre tiene catacteres no validos"; }
if(preg_match($exp_reg->mail->exp, $valores->mail) == 0){ $procesado = false; $mensajeError[] = "No es un correo valido"; }
if(preg_match($exp_reg->tel->exp, $valores->tel) == 0){ $procesado = false; $mensajeError[] = "No es un numero telefonico valido"; }
if(preg_match($exp_reg->richText->exp, $valores->mensaje) == 1){ $procesado = false; $mensajeError[] = "El texto tiene catacteres no validos"; }






if($procesado){
	$valores->nombre = filter_var($valores->nombre, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$valores->mail = filter_var($valores->mail, FILTER_SANITIZE_EMAIL);
	$valores->tel = filter_var($valores->tel, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$valores->mensaje = filter_var($valores->mensaje, FILTER_SANITIZE_FULL_SPECIAL_CHARS);
	$valores->mensaje = preg_replace('/[\n]/', '<br />', $valores->mensaje);

	$mensajeTextoPlano = "
		Usuario: $valores->nombre\n\r
		Correo: $valores->mail\n\r
		Teléfono: $valores->tel\n\r
		\n\r
		Mensaje:\n\r
		$valores->mensaje
	";
	$mensajeTextoHTML = "
	<!DOCTYPE html>
		<head>	
			<meta charset=&amp;quot;utf-8&amp;quot; />
		</head>
		<body>
			Usuario: $valores->nombre<br />
			Correo: $valores->mail<br />
			Teléfono: $valores->tel<br />
			<br />
			Mensaje:<br />
			$valores->mensaje
		</body>
	</html>
	";

	//$mail = new PHPMailer(true);
	$mail = new PHPMailer();
	//$mail->SMTPDebug = SMTP::DEBUG_SERVER;
	try {
		//Server settings
		$mail->CharSet = 'UTF-8';
		$mail->isSMTP();
		$mail->Host       = 'smtp.gmail.com';
		$mail->SMTPAuth   = true;
		$mail->Username   = 'juan.palma@idalibre.com';
		$mail->Password   = $_ENV['PORFOLIO_MAIL_PASS'];
		$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
		$mail->Port       = 465;
		//Recipients
		$mail->setFrom('juan.palma@idalibre.com', 'Juan Palma');
		$mail->addAddress('juan.palma@idalibre.com', 'Portafolio Juan Palma');
		$mail->addReplyTo('juan.palma@idalibre.com', 'Juan Palma');
		$mail->addCC('juan.palma@me.com');
		//$mail->addBCC('bcc@example.com');
	
	
		//Content
		$mail->isHTML(true);
		$mail->Subject = 'Contacto Portafolio Juan Palma';
		$mail->Body    = $mensajeTextoHTML;
		$mail->AltBody = $mensajeTextoPlano;
	
		$mail->send();
		$r->status = "ok";
	} catch (Exception $e) {
		$r->status = "error";
		$r->error = "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
	}

} else{
	$r->status = "error";
	$r->error = $mensajeError;

}


print(json_encode($r));
?>