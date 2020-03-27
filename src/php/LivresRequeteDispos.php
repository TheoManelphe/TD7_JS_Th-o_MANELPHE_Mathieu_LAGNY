<?php

require_once('Model.php');

$tab = Model::selectLivresDispos();

echo json_encode($tab);

?>
