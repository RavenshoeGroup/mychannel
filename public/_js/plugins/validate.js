function IsEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function checkFields(){
	var error = '';
	
	if($('#name').val() == ''){
		error += 'Name is required.\n';
	}
	
	if($('#comment').val() == ''){
		error += 'Question or comment is required.\n';
	}

	var emailAdd = $('#email').val();			
	if(emailAdd == '' || !IsEmail(emailAdd)){
		error += 'You must enter a valid email address.\n';			
	}
	
	if(error != ''){
		alert(error);
		return false;	
	}	
	return true;	
}