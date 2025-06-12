<?php
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["score"])) {
    $score = intval($_POST["score"]);
    file_put_contents("score.txt", "Score: " . $score . "\n", FILE_APPEND);
}
?>
