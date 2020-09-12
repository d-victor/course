<?php

const DIR_NAME = 'images';
define("PATH_DIR", "/" . DIR_NAME . "/");


$prefix = 'mr.';
$name = "$prefix \"Vasay\"";

//echo $name;

$arr = array(1,23,4,65,67);

foreach ($arr as $key => $value) {
    echo $key . ' ' . $value;
    echo '<br>';
}

var_dump($arr);
//die;
$arr1 = [
    'name' => "$name",
    'age' => 18
];
echo '----<br>';
foreach ($arr1 as $key => $value) {
    echo $key . ' => ' . $value;
    echo '<br>';
}

echo '<br>----';

echo 'sdfasdfsdzafds<br>';

$a = 'hello';

$$a = $a . ' ' . 'word';

echo ${$a};

function test() {


    var_dump($a); //NULL
}

test();


echo PATH_DIR;

echo "<br>";

echo __DIR__ . '/img/';

echo 5 + 5 * 2;

$a = 1;
$b = 2;
if ($a > 2) {

} elseif ($b > 1) {

}
for ($i = 0; $i < count($arr); $i++ ) {
    echo '<br>';
    var_dump($arr[$i]);
}

switch ($i) {
    case 0:
        echo "i равно 0";
        break;
    case 1:
        echo "i равно 1";
        break;
    case 5:
        echo "i равно 5";
        break;
}
include_once __DIR__ . '/index.phtml';
include __DIR__ . '/../dd.php';
require_once __DIR__ . '/index.phtml';
require_once __DIR__ . '/index.phtml';

//include_once
$aaaa = 'sdfdf';

class SimpleClass
{
    // объявление свойства
    public $var = 'значение по умолчанию';

    // объявление метода
    public function displayVar() {
        echo $this->var;
    }

    private function setVar() {

    }
}
echo '<br>';
$myClass = new SimpleClass();
echo $myClass->displayVar();