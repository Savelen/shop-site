<?php
require_once "../Model/item-db.php";

function get_color($str){
	$arr_color = explode(",", $str);
	$answer = [];
	foreach ($arr_color as $col) {
		$arr = color($col);
		if ($arr != NULL) {
			array_push($answer,$arr);
		}
	}
	return $answer;
}
function get_cost($cost){
	$num = sprintf("%02.2f",$cost);
	$arr = explode(".",$num);
	return $arr;
}
function prepare_slot($gender, $start, $get, $kids = 0, $pag = false){
	$ItemInfo = [];
	foreach ($gender as $gen) {
		array_push($ItemInfo, get_item((int)$start,$gen,(int)$get, $kids));
	}
	$result = [];
	foreach ($ItemInfo as $arr) {
		foreach ($arr as $item) {
			array_push($result,[
				'gender' => $item->gender,
				'name' =>  $item->name,
				'img' => explode(",",$item->img),
				'size' => $item->size,
				'cost' => get_cost($item->cost),
				'color' => get_color($item->color),
			]);
		}
	}
	if ($pag){
		array_push($result,['pagination'=>get_pagination($kids)]);
	}
	return $result;
}
echo json_encode(prepare_slot(explode(",",$_GET['gender']),$_GET['start'],$_GET['get'],$_GET['kids'],$_GET['pag']));
