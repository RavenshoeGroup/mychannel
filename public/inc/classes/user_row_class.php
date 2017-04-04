<?php

class user_row{	

	public $user_id;
	public $first_name;
	public $last_name;
	public $username;
	public $password;
	public $active;

	public function __construct ()
	{
		$first_name = "";
		$last_name = "";
		$username = "";
		$password = "";
	}

	public function get_user_id(){
		return $this->user_id;
	}

	public function get_first_name(){
		return $this->first_name;
	}

	public function get_last_name(){
		return $this->last_name;
	}

	public function get_username(){
		return $this->username;
	}

	public function get_password(){
		return $this->password;
	}

	public function get_active(){
		return $this->active;
	}

	public function insert(){			
		if(empty($db)){
			$dbConnection = new dbConnection();
			$db = new MySQL($dbConnection->host,$dbConnection->userdb,$dbConnection->pass,$dbConnection->dbname);	
		}				

		$this->first_name = mysqli_real_escape_string($db->dbConn,$this->first_name);
		$this->last_name = mysqli_real_escape_string($db->dbConn,$this->last_name);
		$this->username = mysqli_real_escape_string($db->dbConn,$this->username);
		$this->password = mysqli_real_escape_string($db->dbConn,$this->password);

		$sql = "INSERT INTO users (
				`first_name`,
				`last_name`,
				`username`,
				`password`
				) 
				VALUES (
				'".$this->first_name."',
				'".$this->last_name."',
				'".$this->username."',
				'".$this->password."'
				)";

		$results = $db->query($sql);
		$this->user_id = $results->insertID();		
		return $this->user_id;
	}
	

	public function update($user_id){			
		if(empty($db)){
			$dbConnection = new dbConnection();
			$db = new MySQL($dbConnection->host,$dbConnection->userdb,$dbConnection->pass,$dbConnection->dbname);	
		}				

		$this->first_name = mysqli_real_escape_string($db->dbConn,$this->first_name);
		$this->last_name = mysqli_real_escape_string($db->dbConn,$this->last_name);
		$this->username = mysqli_real_escape_string($db->dbConn,$this->username);
		$this->password = mysqli_real_escape_string($db->dbConn,$this->password);

		$sql = "UPDATE users SET 
				`first_name` = '".$this->first_name."',
				`last_name` = '".$this->last_name."',
				`username` = '".$this->username."',
				`password` = '".$this->password."'
				WHERE `user_id` = $user_id";				

		$results = $db->query($sql);
		
	}

}

?>