<?php

require_once('Conf.php');

class Model {

	public static $pdo;

	public static function init_pdo() {
		$host   = Conf::getHostname();
		$dbname = Conf::getDatabase();
		$login  = Conf::getLogin();
		$pass   = Conf::getPassword();
		try {
			// connexion à la base de données
			// le dernier argument sert à ce que toutes les chaines de charactères
			// en entrée et sortie de MySql soit dans le codage UTF-8
			self::$pdo = new PDO("mysql:host=$host;dbname=$dbname", $login, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
			// on active le mode d'affichage des erreurs, et le lancement d'exception en cas d'erreur
			self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch (PDOException $ex) {
			echo $ex->getMessage();
			die("Problème lors de la connexion à la base de données.");
		}
	}

	
	public static function selectAdh() {
		try {
			// préparation de la requête
			$sql = "SELECT A.idAdherent, nomAdherent, COUNT(E.idAdherent) AS nbEmprunt FROM adherent A LEFT JOIN emprunt E ON E.idAdherent = A.idAdherent GROUP BY A.idAdherent;";
			$req_prep = self::$pdo->prepare($sql);
			// passage de la valeur de name_tag
			$values = array();
			// exécution de la requête préparée
			$req_prep->execute($values);
			$req_prep->setFetchMode(PDO::FETCH_OBJ);
			$tabResults = $req_prep->fetchAll();
			// renvoi du tableau de résultats
			return $tabResults;
		} catch (PDOException $e) {
			echo $e->getMessage();
			die("Erreur lors de la recherche dans la base de données.");
		}
	}

	public static function selectLivresDispos() {
		try {
			// préparation de la requête
			$sql = "SELECT * FROM livre WHERE idLivre NOT IN (SELECT idLivre FROM emprunt)";
			$req_prep = self::$pdo->prepare($sql);
			// passage de la valeur de name_tag
			$values = array();
			// exécution de la requête préparée
			$req_prep->execute($values);
			$req_prep->setFetchMode(PDO::FETCH_OBJ);
			$tabResults = $req_prep->fetchAll();
			// renvoi du tableau de résultats
			return $tabResults;
		} catch (PDOException $e) {
			echo $e->getMessage();
			die("Erreur lors de la recherche dans la base de données.");
		}
	}

	public static function selectLivresEmpruntes() {
		try {
			// préparation de la requête
			$sql = "SELECT * FROM livre WHERE idLivre IN (SELECT idLivre FROM emprunt)";
			$req_prep = self::$pdo->prepare($sql);
			// passage de la valeur de name_tag
			$values = array();
			// exécution de la requête préparée
			$req_prep->execute($values);
			$req_prep->setFetchMode(PDO::FETCH_OBJ);
			$tabResults = $req_prep->fetchAll();
			// renvoi du tableau de résultats
			return $tabResults;
		} catch (PDOException $e) {
			echo $e->getMessage();
			die("Erreur lors de la recherche dans la base de données.");
		}
	}

	public static function saveLivres($titre) {
		try {
		    $sql = "INSERT INTO livre (idLivre, titreLivre) VALUES (NULL, :titre_tag)";
		    // Préparation de la requête
		    $req_prep = Model::$pdo->prepare($sql);

		    $values = array(
		        "titre_tag" => $titre,
		    );
		    // On donne les valeurs et on exécute la requête
		    $req_prep->execute($values);
	    } catch (PDOException $e) {
			echo $e->getMessage();
			die("Erreur lors de la recherche dans la base de données.");
		}
	}

	public static function saveAdherent($nom) {
		try {
		    $sql = "INSERT INTO adherent (idAdherent, nomAdherent) VALUES (NULL, :nom_tag)";
		    // Préparation de la requête
		    $req_prep = Model::$pdo->prepare($sql);

		    $values = array(
		        "nom_tag" => $nom,
		    );
		    // On donne les valeurs et on exécute la requête
		    $req_prep->execute($values);
	    } catch (PDOException $e) {
			echo $e->getMessage();
			die("Erreur lors de la recherche dans la base de données.");
		}
	}

	public static function emprunterLivre($idLivre, $idAdherent) {
		try {
		    $sql = "INSERT INTO emprunt (idAdherent, idLivre) VALUES (:idAdherent_tag, :idLivre_tag)";
		    // Préparation de la requête
		    $req_prep = Model::$pdo->prepare($sql);

		    $values = array(
		        "idAdherent_tag" => $idAdherent,
		        "idLivre_tag" => $idLivre,
		    );
		    // On donne les valeurs et on exécute la requête
		    $req_prep->execute($values);
	    } catch (PDOException $e) {
	    	if ($e->getCode()==1452) {
	    		die("FOREIGN KEY");
	    	} else {
				die("Erreur lors de la recherche dans la base de données.");
			}
		}
	}

	public static function rendreLivre($idLivre) {
		try {
		    $sql = "DELETE FROM emprunt WHERE idLivre = :idLivre_tag";
		    // Préparation de la requête
		    $req_prep = Model::$pdo->prepare($sql);

		    $values = array(
		        "idLivre_tag" => $idLivre,
		    );
		    // On donne les valeurs et on exécute la requête
		    $req_prep->execute($values);
	    } catch (PDOException $e) {
			echo $e->getMessage();
			die("Erreur lors de la recherche dans la base de données.");
		}
	}

	public static function selectEmprunteur($idLivre) {
		try {
			// préparation de la requête
			$sql = "SELECT A.idAdherent, nomAdherent FROM adherent A JOIN emprunt E ON E.idAdherent=A.idAdherent WHERE E.idLivre=:idLivre_tag";
			$req_prep = self::$pdo->prepare($sql);
			// passage de la valeur de name_tag
			$values = array(
				"idLivre_tag" => $idLivre,
			);
			// exécution de la requête préparée
			$req_prep->execute($values);
			$req_prep->setFetchMode(PDO::FETCH_OBJ);
			$tabResults = $req_prep->fetchAll();
			// renvoi du tableau de résultats
			return $tabResults;
		} catch (PDOException $e) {
			echo $e->getMessage();
			die("Erreur lors de la recherche dans la base de données.");
		}
	}
}

// on initialise la connexion $pdo
Model::init_pdo();


?>
