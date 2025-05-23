# 📦 React PDF Catalog

Generate your own downloadable PDF catalog with react. Present your products in clean and attractive layout.

## 🚀 Features

- generate PDF based on database data

- products grouped based on category and inside it on subcategory

- table of contents with links to each category of products

- barcode implementation - image with alphanumerical text(can be copied)

## 🛠️ Tech Stack

**Frontend:** React

**Backend:** PHP

**Database:** MySQL

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js & npm installed

### Installation

```bash
git clone git@github.com:pp-start/React-PDF-Catalog.git

cd React-PDF-Catalog
npm install
```

### MySQL database setup

```sql
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(16) NOT NULL,
  `category_name` varchar(64) NOT NULL,
  `category_description` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` varchar(16) NOT NULL,
  `subcategory_id` varchar(16) DEFAULT NULL,
  `product_id` varchar(64) NOT NULL,
  `product_name` varchar(128) NOT NULL,
  `product_number` varchar(32) DEFAULT NULL,
  `diameter` varchar(16) DEFAULT NULL,
  `size` varchar(32) DEFAULT NULL,
  `height` varchar(16) DEFAULT NULL,
  `temperature_resistance` tinyint(1) DEFAULT NULL,
  `quantity` varchar(32) DEFAULT NULL,
  `batch` varchar(16) DEFAULT NULL,
  `barcode` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subcategory_id` varchar(16) NOT NULL,
  `subcategory_name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

### 💻 Running the App

```bash
npm start
```

### 🧱 Build

```bash
npm run build
```

## ⚙️ Environment Variables 

### navigate to `public/php/classes/config`

- `config.ini`:

```ini
# Credentials to connect with MySQL database

host = your_host
user = your_username
pass = your_password
db = your_db
```

### navigate to `src/components`

- `Axios.js`

```js
// Local path to match your disk location when App is deployed on localhost
// Example below - as if the App was inside directory 'React-PDF-Catalog' in main html directory

export const Axios = axios.create({

    baseURL: isLocalhost ? 'React-PDF-Catalog/public/php/' : 'php/', 
    
});
```

## 🧾 License

GNU GENERAL PUBLIC LICENSE - Version 3

## 🙋‍♂️ Contact

- You can reach me on [LinkedIn](https://www.linkedin.com/in/pawel-pokrywka-348018251/)

- Paweł Pokrywka - [Github](https://github.com/pp-start) 