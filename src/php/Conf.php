<?php

class Conf {

	private static $database = array(
		'hostname' => 'webinfo.iutmontp.univ-montp2.fr',
		'database' => 'manelphet', // à compléter avec vos données personnelles
		'login'    => 'manelphet', // à compléter avec vos données personnelles
		'password' => 'hatrid mun sigra'  // à compléter avec vos données personnelles
	);

	static public function getLogin() {
		return self::$database['login'];
	}

	static public function getHostname() {
		return self::$database['hostname'];
	}

	static public function getDatabase() {
		return self::$database['database'];
	}

	static public function getPassword() {
		return self::$database['password'];
	}

}

?>