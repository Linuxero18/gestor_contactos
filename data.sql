-- Tabla de Roles
CREATE TABLE roles (
    idRol INT AUTO_INCREMENT PRIMARY KEY,
    nombreRol VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- Tabla de Contactos
CREATE TABLE contactos (
    idContacto INT AUTO_INCREMENT PRIMARY KEY,
    rucEmpresa VARCHAR(11) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(15),
    whatsapp VARCHAR(15),
    idRol INT, -- Ahora coincide con el tipo de roles.idRol
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    
    -- Clave foránea hacia roles
    FOREIGN KEY (idRol) REFERENCES roles(idRol)
        ON UPDATE CASCADE
        ON DELETE SET NULL
);

INSERT INTO roles (nombreRol) VALUES
('Administrador'),
('Ventas'),
('Soporte Técnico'),
('Facturación'),
('Atención al Cliente'),
('Gerente'),
('Auditor'),
('Marketing'),
('Logística'),
('Recursos Humanos');

INSERT INTO contactos (rucEmpresa, nombre, apellido, correo, telefono, whatsapp, idRol) VALUES
('20123456789', 'Luis', 'Ramírez', 'luis.ramirez@example.com', '912345678', '912345678', 1),
('20456789123', 'Ana', 'Gómez', 'ana.gomez@example.com', '923456789', '923456789', 2),
('20567891234', 'Carlos', 'Fernández', 'carlos.fernandez@example.com', '934567891', '934567891', 3),
('20678912345', 'Elena', 'Torres', 'elena.torres@example.com', '945678912', '945678912', 4),
('20789123456', 'Martín', 'Castillo', 'martin.castillo@example.com', '956789123', '956789123', 5),
('20891234567', 'Lucía', 'Reyes', 'lucia.reyes@example.com', '967891234', '967891234', 6),
('20912345678', 'Jorge', 'Mendoza', 'jorge.mendoza@example.com', '978912345', '978912345', 7),
('20123456780', 'Valeria', 'Chávez', 'valeria.chavez@example.com', '989123456', '989123456', 8),
('20234567891', 'Fernando', 'Cabrera', 'fernando.cabrera@example.com', '900234567', '900234567', 9),
('20345678912', 'Andrea', 'Vargas', 'andrea.vargas@example.com', '911345678', '911345678', 10),
('20456789123', 'Sofía', 'Silva', 'sofia.silva@example.com', '922456789', '922456789', 1),
('20567891234', 'Pablo', 'Ríos', 'pablo.rios@example.com', '933567891', '933567891', 2),
('20678912345', 'Camila', 'Navarro', 'camila.navarro@example.com', '944678912', '944678912', 3),
('20789123456', 'Diego', 'Espinoza', 'diego.espinoza@example.com', '955789123', '955789123', 4),
('20891234567', 'María', 'Salas', 'maria.salas@example.com', '966891234', '966891234', 5),
('20912345678', 'Ricardo', 'Peña', 'ricardo.pena@example.com', '977912345', '977912345', 6),
('20123456781', 'Paula', 'López', 'paula.lopez@example.com', '988123456', '988123456', 7),
('20234567892', 'Héctor', 'García', 'hector.garcia@example.com', '999234567', '999234567', 8),
('20345678913', 'Natalia', 'Ruiz', 'natalia.ruiz@example.com', '910345678', '910345678', 9),
('20456789124', 'Iván', 'Quispe', 'ivan.quispe@example.com', '921456789', '921456789', 10);
