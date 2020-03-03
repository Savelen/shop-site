<?php
try {
	$pdo = new PDO(
		'mysql:host=shop.com;dbname=shop_item',
		'root',
		'',
		[PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
	);
} catch (PDOException $e) {
	echo 'ошибка' . $e->getmessage();
}

function add_item($name, $gender, $kids, $size, $cost, $img, $color)
{
	global $pdo;
	$sql = 'INSERT INTO item(name,gender,kids,size,cost,img,color) VALUES(:name,:gender,:kids,:size,:cost,:img,:color)';
	$pre = $pdo->prepare($sql);
	$pre->execute(['name' => (string) $name, 'gender' => $gender, 'kids' => $kids, 'size' => (string) $size, 'cost' => $cost, 'img' => $img, 'color' => $color]);
}

function get_pagination($kids = 0)
{
	global $pdo;
	if ($kids !== '*') {
		$sql = "SELECT gender, COUNT(*) FROM item  WHERE kids = :kids GROUP BY gender";
	} else {
		$sql = "SELECT gender, COUNT(*) FROM item GROUP BY gender";
	}
	$pre = $pdo->prepare($sql);
	$pre->bindParam(':kids', $kids, PDO::PARAM_INT);
	$pre->execute();
	$respons = $pre->fetchAll(PDO::FETCH_ASSOC);
	$result = [];
	foreach ($respons as $arr) {
		$result[$arr["gender"]] = $arr["COUNT(*)"];
	}
	return $result;
}

function get_item($start, $gender, $get = 3, $kids = 0)
{
	global $pdo;
	if ($kids != '*') $sql = "SELECT * FROM item WHERE gender = :gender AND kids = :kids LIMIT :start,:get";
	else $sql = "SELECT * FROM item WHERE gender = :gender LIMIT :start,:get";
	$pre = $pdo->prepare($sql);
	if ($kids != '*') $pre->bindParam(':kids', $kids, PDO::PARAM_INT);
	$pre->bindParam(':gender', $gender, PDO::PARAM_STR);
	$pre->bindParam(':start', $start, PDO::PARAM_INT);
	$pre->bindParam(':get', $get, PDO::PARAM_INT);
	$pre->execute();
	return $pre->fetchAll(PDO::FETCH_OBJ);
}

//для функции color
function sql_color($name)
{
	global $pdo;
	$sql = "SELECT * FROM `color-value` WHERE name = :name";
	$pre = $pdo->prepare($sql);
	$pre->execute(["name" => $name]);
	return $pre->fetchAll(PDO::FETCH_OBJ);
}

function color($name)
{
	$color = sql_color($name);
	$hec = sprintf("#%02x%02x%02x", $color[0]->red, $color[0]->green, $color[0]->blue);
	if ($color[0]->rgb == null || $color[0]->rgb != $hec) {
		global $pdo;
		$sql = "UPDATE `color-value` SET rgb = :hec WHERE name = :name";
		$pre = $pdo->prepare($sql);
		$pre->execute(["hec" => $hec, "name" => $name]);
		$color = sql_color($name);
		return $color[0];
	}
	return $color[0];
}

function add_color($name, $red = 0, $green = 0, $blue = 0, $rgb = null)
{
	global $pdo;
	$sql = 'INSERT INTO `color-value`(name,red,green,blue,rgb) VALUES (:name,:red,:green,:blue,:rgb)';
	$pre = $pdo->prepare($sql);
	$pre->execute(["name" => $name, "red" => $red, "green" => $green, "blue" => $blue, "rgb" => $rgb]);
}
