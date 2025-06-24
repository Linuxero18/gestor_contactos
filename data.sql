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
