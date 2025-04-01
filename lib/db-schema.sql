-- Esquema do Banco de Dados MySQL para o Sistema de Gerenciamento

-- Tabela de Usuários
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  user_level INT NOT NULL DEFAULT 1, -- 1: Cliente, 2: Vendedor, 3: SuperAdmin
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Categorias
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  cost_price DECIMAL(10, 2),
  category_id INT,
  stock_quantity INT NOT NULL DEFAULT 0,
  min_stock_quantity INT DEFAULT 10,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabela de Vendas
CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  seller_id INT,
  total_amount DECIMAL(10, 2) NOT NULL,
  tax_amount DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  payment_method VARCHAR(50),
  status VARCHAR(20) DEFAULT 'completed', -- completed, cancelled, pending
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- Tabela de Itens de Venda
CREATE TABLE sale_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sale_id INT,
  product_id INT,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sale_id) REFERENCES sales(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabela de Estoque (Movimentações)
CREATE TABLE inventory_movements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  quantity INT NOT NULL, -- Positivo para entrada, negativo para saída
  movement_type VARCHAR(20) NOT NULL, -- purchase, sale, adjustment, return
  reference_id INT, -- ID da venda ou compra relacionada
  notes TEXT,
  created_by INT, -- ID do usuário que realizou a movimentação
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabela de Recibos
CREATE TABLE receipts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sale_id INT,
  receipt_number VARCHAR(50) NOT NULL,
  issued_by INT, -- ID do usuário que emitiu o recibo
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sale_id) REFERENCES sales(id),
  FOREIGN KEY (issued_by) REFERENCES users(id)
);

-- Tabela de Configurações do Sistema
CREATE TABLE system_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(50) NOT NULL UNIQUE,
  setting_value TEXT,
  updated_by INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Inserir categorias iniciais
INSERT INTO categories (name, description) VALUES
('Roupas', 'Vestuário em geral'),
('Calçados', 'Sapatos, tênis e sandálias'),
('Acessórios', 'Bolsas, cintos, óculos e joias'),
('Eletrônicos', 'Smartphones, tablets e gadgets');

-- Inserir configurações iniciais
INSERT INTO system_settings (setting_key, setting_value) VALUES
('tax_rate', '0.18'),
('company_name', 'Sistema de Gerenciamento'),
('receipt_footer', 'Obrigado pela preferência!');

