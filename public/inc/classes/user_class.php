<?php
require_once('helper.class.php');

class user{	

private $db;
private $my_user_collection;	

	public function __construct ()
	{
		$this->my_user_collection = array();
	}

	private function get_data($sql){	
		if(empty($db)){
			$dbConnection = new dbConnection();
			$db = new MySQL($dbConnection->host,$dbConnection->userdb,$dbConnection->pass,$dbConnection->dbname);	
		}

		$results = $db->query($sql);					
	
		while($row=$results->fetch()){
			$user_row = new user_row();
				
			$user_row->user_id = $row['user_id'];
			$user_row->first_name = $row['first_name'];
			$user_row->last_name = $row['last_name'];
			$user_row->username = $row['username'];
			$user_row->password = $row['password'];
			$user_row->active = $row['active'];			

			array_push($this->my_user_collection,$user_row);
				
		}				
		
		return $this->my_user_collection;

	}		

	public function get_user_collection($user_id){			
		return $this->get_data("SELECT * FROM users WHERE active = 'Y' AND user_id = ".$user_id);
	}	

	public function __destruct ()
	{
		
	}
	
	
}

?>