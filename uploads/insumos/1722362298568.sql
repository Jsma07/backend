-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-07-2024 a las 21:54:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jake nails`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `insumos`
--

CREATE TABLE `insumos` (
  `IdInsumos` int(11) NOT NULL,
  `Idproveedor` int(11) NOT NULL,
  `NombreInsumos` varchar(60) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `PrecioUnitario` float NOT NULL,
  `Estado` varchar(20) NOT NULL,
  `Idcategoria` int(11) NOT NULL,
  `imagen` text NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `insumos`
--

INSERT INTO `insumos` (`IdInsumos`, `Idproveedor`, `NombreInsumos`, `Cantidad`, `PrecioUnitario`, `Estado`, `Idcategoria`, `imagen`, `isDeleted`) VALUES
(6, 15, 'Belier rosa cerezos', 0, 0, 'Terminado', 2, '/uploads/insumos/1722021777355.jpg', 0),
(7, 13, 'Masglo metalizado', 45, 4500, 'Disponible', 1, '/uploads/insumos/1722024074845.jpg', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD PRIMARY KEY (`IdInsumos`),
  ADD KEY `Idcategoria` (`Idcategoria`),
  ADD KEY `IdProveedor` (`Idproveedor`),
  ADD KEY `IdInsumos` (`IdInsumos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `insumos`
--
ALTER TABLE `insumos`
  MODIFY `IdInsumos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `insumos`
--
ALTER TABLE `insumos`
  ADD CONSTRAINT `insumos_ibfk_1` FOREIGN KEY (`Idcategoria`) REFERENCES `categorias` (`IdCategoria`),
  ADD CONSTRAINT `insumos_ibfk_2` FOREIGN KEY (`Idproveedor`) REFERENCES `proveedores` (`IdProveedor`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
