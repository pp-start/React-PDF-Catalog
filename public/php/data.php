<?php

include 'connection.php';

class Data{

    use Connection;

    protected $dbh;

    public function __construct(){

        $this->dbh = $this->connect(); // Connection with DB

    }

    // Check if there is connection to the DB

    public function checkConnection(){

        if(($this->dbh instanceof PDO)){

            $tables = ['categories', 'products', 'subcategories'];

            $error = 0;

            foreach($tables as $table){

                $stmt = $this->dbh->prepare("SHOW TABLES LIKE :table");

                $stmt->execute([':table' => $table]);

                if($stmt->rowCount() === 0){

                    $error++;

                }

            }

            if($error > 0){

                $response = array("message" => "Tables not found in Database");

                echo json_encode($response);

                return false;

            } else {

                return true;

            }

        } else {

            $response = array('message' => 'No connection to DB');

            echo json_encode($response);

            return false;

        }

    }

    public function getCatalogData(){

        if(!$this->checkConnection()){

            return;

        }

        $stmt_products = $this->dbh->prepare("SELECT * FROM `products`");

        $stmt_products->execute();

        $products = $stmt_products->fetchAll(PDO::FETCH_ASSOC);

        $stmt_products->closeCursor();

    
        $stmt_categories = $this->dbh->prepare("SELECT * FROM `categories`");

        $stmt_categories->execute();

        $categories = $stmt_categories->fetchAll(PDO::FETCH_ASSOC);

        $stmt_categories->closeCursor();


        $stmt_subcategories = $this->dbh->prepare("SELECT * FROM `subcategories`");

        $stmt_subcategories->execute();

        $subcategories = $stmt_subcategories->fetchAll(PDO::FETCH_ASSOC);

        $stmt_subcategories->closeCursor();


        $db_data = [
            'products' => !empty($products) ? $products : null,
            'categories' => !empty($categories) ? $categories : null,
            'subcategories' => !empty($subcategories) ? $subcategories : null
        ];

        $response = ['db_data' => $db_data];

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