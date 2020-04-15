<?php
require_once "../Model/item-db.php";

function get_color($str)
{
	$answer = [];
	foreach ($str as $col) {
		$arr = color($col);
		if ($arr != NULL) {
			array_push($answer, $arr);
		}
	}
	return $answer;
}
function get_cost($cost)
{
	$num = sprintf("%02.2f", $cost);
	$arr = explode(".", $num);
	return $arr;
}
function prepare_slot($id, $gender = "men,women", $start = 0, $get = 3, $kids = 0, $pag = false)
{
	$ItemInfo = [];
	if ((int)$id == 0) {
		foreach ($gender as $gen) {
			array_push($ItemInfo, get_item((int) $start, $gen, (int) $get, $kids));
		}
	}
	else {
		if ($id != 0) {
			foreach ($gender as $gen) {
				array_push($ItemInfo, get_item_id($id));
			}
		}
	}

	$result = [];
	foreach ($ItemInfo as $arr) {
		foreach ($arr as $item) {
			array_push($result, [
				'id' => $item->id,
				'gender' => $item->gender,
				'name' =>  $item->name,
				'img' => $item->img,
				'size' => $item->size,
				'cost' => get_cost($item->cost),
				'color' => get_color($item->color),
				"description" => $item->description
			]);
		}
	}
	if ($pag) {
		array_push($result, ['pagination' => get_pagination($kids)]);
	}
	return $result;
}
echo json_encode(prepare_slot($_GET['id'],explode(",", $_GET['gender']), $_GET['start'], $_GET['get'], $_GET['kids'], $_GET['pag']));