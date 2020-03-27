<?php

require_once('Model.php');

$tab = Model::emprunterLivre($_GET["idLivre"],$_GET["idAdherent"]);

echo json_encode($tab);

?>
