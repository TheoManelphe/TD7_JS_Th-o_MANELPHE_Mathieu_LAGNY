<?php

require_once('Model.php');
require_once('Conf.php');


$tab = Model::selectAdh();

echo json_encode($tab);


