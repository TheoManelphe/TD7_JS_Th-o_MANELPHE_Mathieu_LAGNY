<?php

require_once('Model.php');

$tab = Model::selectAdh();

echo json_encode($tab);

?>
