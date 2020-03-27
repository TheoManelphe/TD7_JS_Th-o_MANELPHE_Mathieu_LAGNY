<?php

require_once('Model.php');

$tab = Model::selectLivresEmpruntes();

echo json_encode($tab);

?>
