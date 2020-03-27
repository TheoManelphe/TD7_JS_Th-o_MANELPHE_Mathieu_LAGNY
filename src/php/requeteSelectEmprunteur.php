<?php

require_once('Model.php');

$tab = Model::selectEmprunteur($_GET["idLivre"]);

echo json_encode($tab);

?>
