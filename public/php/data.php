<?php

include 'connection.php';

class Data{

    use Connection;

    public function getCatalogData(){

        $dbh = $this->connect();

        if (!($dbh instanceof PDO)){

            echo json_encode(false);

            return;

        }


        $stmt_products = $dbh->prepare("SELECT * FROM `products`");

        $stmt_products->execute();

        $products = $stmt_products->fetchAll(PDO::FETCH_ASSOC);

        $stmt_products->closeCursor();

    
        $stmt_categories = $dbh->prepare("SELECT * FROM `categories`");

        $stmt_categories->execute();

        $categories = $stmt_categories->fetchAll(PDO::FETCH_ASSOC);

        $stmt_categories->closeCursor();


        $stmt_subcategories = $dbh->prepare("SELECT * FROM `subcategories`");

        $stmt_subcategories->execute();

        $subcategories = $stmt_subcategories->fetchAll(PDO::FETCH_ASSOC);

        $stmt_subcategories->closeCursor();


        $response = [
            'products' => !empty($products) ? $products : null,
            'categories' => !empty($categories) ? $categories : null,
            'subcategories' => !empty($subcategories) ? $subcategories : null
        ];

        echo json_encode($response);
        
    }
    
}

if ($_SERVER['REQUEST_METHOD'] === 'POST'){

    $data = json_decode(file_get_contents("php://input"), true);

    $request_type = $data['request_type'];

    switch ($request_type) {

        case "get catalog data":

            $getData = new Data;

            $getAllData = $getData->getCatalogData();

            break;

    }

}