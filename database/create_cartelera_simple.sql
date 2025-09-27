-- =============================================
-- Script Simple: Creación de tabla CARTELERA
-- Autor: Milton Gómez
-- =============================================

USE db_DesaWebDevUMG;
GO

-- Crear tabla CARTELERA (versión simple)
CREATE TABLE CARTELERA_10379 (
    ID INT IDENTITY(1,1) PRIMARY KEY,
    imdbID NVARCHAR(50) NOT NULL UNIQUE,
    Title NVARCHAR(255) NOT NULL,
    Year NVARCHAR(10) NOT NULL,
    Type NVARCHAR(100) NOT NULL,
    Poster NVARCHAR(500) NULL,
    Estado BIT NOT NULL DEFAULT 1,
    Description NVARCHAR(MAX) NULL,
    Ubication NVARCHAR(100) NOT NULL,
    FechaCreacion DATETIME2 DEFAULT GETDATE()
);
GO

-- Insertar dato de ejemplo
INSERT INTO CARTELERA_10379 (imdbID, Title, Year, Type, Poster, Estado, Description, Ubication)
VALUES ('80000', 'Titanes del Atlántico', '2013', 'Ciencia Ficcion', 
        'https://demo/demoimages.png', 1, 
        'La humanidad se transforma en robots gigantes para defender la costa este de los monstruos que surgen del fondo del mar.', 
        'POPCINEMA');
GO