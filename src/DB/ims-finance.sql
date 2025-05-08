-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ims_finance
CREATE DATABASE IF NOT EXISTS `ims_finance` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ims_finance`;

-- Dumping structure for table ims_finance.jadwal_angsuran
CREATE TABLE IF NOT EXISTS `jadwal_angsuran` (
  `id` int NOT NULL AUTO_INCREMENT,
  `kontrak_no` varchar(20) DEFAULT NULL,
  `angsuran_ke` int DEFAULT NULL,
  `angsuran_per_bulan` int DEFAULT NULL,
  `tanggal_jatuh_tempo` date DEFAULT NULL,
  `status` enum('LUNAS','BELUM') DEFAULT 'BELUM',
  `tanggal_pembayaran` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kontrak_no` (`kontrak_no`),
  CONSTRAINT `jadwal_angsuran_ibfk_1` FOREIGN KEY (`kontrak_no`) REFERENCES `kontrak` (`kontrak_no`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

-- Dumping structure for table ims_finance.kontrak
CREATE TABLE IF NOT EXISTS `kontrak` (
  `kontrak_no` varchar(20) NOT NULL,
  `client_name` varchar(100) DEFAULT NULL,
  `otr` int DEFAULT NULL,
  `dp` int DEFAULT NULL,
  `tenor` int DEFAULT NULL,
  `bunga` decimal(5,2) DEFAULT NULL,
  `angsuran_per_bulan` decimal(15,2) DEFAULT NULL,
  PRIMARY KEY (`kontrak_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
