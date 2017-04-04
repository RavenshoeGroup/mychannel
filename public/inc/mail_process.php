<?php
if (session_id() == "") session_start(); // Initialize Session data
ob_start();
//include_once("../securimage/securimage.php");

if ($_POST) {
		
	//Declare Variables
	$name = $_POST['name'];
	$email = $_POST['email'];
	$email_link = "<a href='mailto:$email' style='color:#1d74a9;'>$email</a>";	
	$phone = $_POST['phone'];
	$comment = $_POST['comment'];
	//$opt_in = $_POST['opt_in'];
	$honey = $_POST['honey'];
	
	$_SESSION["name"] = $name;
	$_SESSION["email"] = $email;
	$_SESSION["phone"] = $phone;
	$_SESSION["comment"] = $comment;
	$_SESSION['alert'] = '';
	//$_SESSION["opt_in"] = $opt_in;

	//if($opt_in == ''){
	//	$opt_in = 'N';
	//}

	if($honey != ''){

		header('Location:../contact.php?error=bt');
		exit();

	}else{
	
	//Validate The Form
		if(empty($name) || empty($email) || empty($comment) ){
			
			$_SESSION['alert'] = "You must fill in all the fields.";
			header('Location:../contact.php');
			exit();
			
		}else{
			
		   	$offset=4*60*60; //converting 4 hours to seconds.
	  		$dateFormat="D M j, Y @ G:i:s"; //set the date format
	  		$timeNdate=gmdate($dateFormat, time()-$offset); //get GMT date - 4 
				
			//Send Email 
			$msge="<html><head><title>New Inquiry From Website Inquiry</title></head><body>
				<span style='font-family:Arial, Helvetica, sans-serif; font-size:16px; color:#262626;font-weight:bold;'>New Inquiry From Website Inquiry On ".$timeNdate."</span><br /><br />
				<span style='font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#262626;'>		-----------------------------------------------------------------------------------------
				<br />
				<br />
		
				<b>Name:</b>  $name<br />				
				<b>Email:</b>  $email<br />		
				<b>Phone:</b>  $phone<br />
				<b>Question or Comments:</b>  $comment<br />
				<br />
		
				-----------------------------------------------------------------------------------------<br /><br />
					
				
				</span>		
				</body></html>";
			
			// To send HTML mail, the Content-type header must be set
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			
			// Additional headers
			$headers .= "From: Website Inquiry <info@sitename.com>" . "\r\n";
			$subject = "New Registry From Website Inquiry";		
			//$to = 'emailaddress@sitename.com';
			mail($to, $subject, $msge, $headers); 
					
			$_SESSION["name"] = "";
			$_SESSION["email"] = "";
			$_SESSION["phone"] = "";
			$_SESSION["comment"] = "";
			header('Location:../thankyou.html');
			exit();
			
		}

	}
}
else
{
	$_SESSION['alert'] = "You must fill in all the fields.";
	header('Location:../contact.php');
	exit();
}

?>