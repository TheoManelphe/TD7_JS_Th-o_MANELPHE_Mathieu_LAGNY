<?php

require_once('Model.php');

$tab = Model::rendreLivre($_GET["idLivre"]);

echo json_encode($tab);

?>
