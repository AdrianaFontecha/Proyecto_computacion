DROP DATABASE IF EXISTS miPrimerCuaderno;

CREATE DATABASE miPrimerCuaderno;
use miPrimerCuaderno;
/*
CREATE TABLE tipUso (
	idtipuso INT PRIMARY KEY,
	nomuso VARCHAR(20)
);
*/

CREATE TABLE usuarios (
    documento BIGINT PRIMARY KEY,
    nombUsu VARCHAR(20),
    password VARCHAR(255),
    celular VARCHAR(20),
    rol VARCHAR(20)
);

CREATE TABLE productos (
	serie INT PRIMARY KEY,
    tipo VARCHAR(25),
    nombProd VARCHAR (50),
    provee VARCHAR (50),
    precio DECIMAL(10, 2),
    stockActual INT DEFAULT 0,
    puntoReOrden INT DEFAULT 5
);

CREATE TABLE movimientos (
    idMov INT PRIMARY KEY AUTO_INCREMENT,
    serie INT,
    tipoMov ENUM('ENTRADA', 'SALIDA'),
    cantidad INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*ALTER TABLE usuarios
ADD FOREIGN KEY (idtipuso) REFERENCES tipUso(idtipuso);*/

ALTER TABLE movimientos
ADD FOREIGN KEY (serie) REFERENCES productos(serie);

DELIMITER //
CREATE TRIGGER tg_gestion_stock
BEFORE INSERT ON movimientos
FOR EACH ROW
BEGIN
    DECLARE stockDisponible INT;
    
    -- Get current stock for the specific product
    SELECT stockActual INTO stockDisponible 
    FROM productos WHERE serie = NEW.serie;

    IF NEW.tipoMov = 'SALIDA' AND stockDisponible < NEW.cantidad THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: Insufficient stock for this sale.';
    ELSEIF NEW.tipoMov = 'ENTRADA' THEN
        UPDATE productos SET stockActual = stockActual + NEW.cantidad WHERE serie = NEW.serie;
    ELSEIF NEW.tipoMov = 'SALIDA' THEN
        UPDATE productos SET stockActual = stockActual - NEW.cantidad WHERE serie = NEW.serie;
    END IF;
END //
DELIMITER ;


/*INSERT*/

INSERT INTO usuarios (documento, nombUsu, password, celular, rol) 
VALUES
    (1021396143, 'Daniel', 'dada','3014408183', 'Admin'),
    (1148459784, 'Oscar', 'osc','5554197484', 'Vendedor');

INSERT INTO productos (serie, nombProd, tipo, provee, precio) 
VALUES (
    7001, 'Cuaderno Rayado 100hj', 'Papelería', 'Distribuidor X', 2.000
);

INSERT INTO movimientos (serie, tipoMov, cantidad) 
VALUES (
    7001, 'ENTRADA', 20
);