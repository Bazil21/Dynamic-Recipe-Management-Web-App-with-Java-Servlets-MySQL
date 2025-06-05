<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recipe_id = $_POST['recipe_id'];
    // Save the favorite recipe ID to a database or session
    session_start();
    $_SESSION['favorites'][] = $recipe_id; // Save to session for simplicity
    echo "Recipe $recipe_id has been added to favorites.";
}
?>