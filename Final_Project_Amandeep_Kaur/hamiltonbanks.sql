-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2021 at 05:32 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hamiltonbanks`
--

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `favBankId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(60) NOT NULL,
  `city` varchar(20) NOT NULL,
  `province` varchar(20) NOT NULL,
  `postalCode` varchar(7) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`favBankId`, `name`, `address`, `city`, `province`, `postalCode`, `latitude`, `longitude`) VALUES
(1, 'Credit Union Central of Ontario LTD', '10 West Avenue S', 'Hamilton', 'ON', 'L8N 1C3', '43.25323601', '-79.85792306'),
(2, 'BMO Bank of Montreal', '275 James St N', 'Hamilton', 'ON', 'L8R 2L4', '43.26395607', '-79.86632464');

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `bankId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `address` varchar(60) NOT NULL,
  `city` varchar(20) NOT NULL,
  `province` varchar(20) NOT NULL,
  `postalCode` varchar(7) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`bankId`, `name`, `address`, `city`, `province`, `postalCode`, `latitude`, `longitude`) VALUES
(1, 'National Bank', '123 James St N', 'Hamilton', 'ON', 'L8R 2K8', '43.26014312', '-79.86772490'),
(2, 'HSBC Bank', '40 King St E #160', 'Hamilton', 'ON', 'L8N 1A3', '43.25593045', '-79.86830339'),
(3, 'RBC Royal Bank', '752 Upper James St', 'Hamilton', 'ON', 'L9C 3A2', '43.23016619', '-79.88208556'),
(4, 'BMO Bank of Montreal', '275 James St N', 'Hamilton', 'ON', 'L8R 2L4', '43.26395607', '-79.86632464'),
(5, 'CIBC Branch with ATM', '667 Upper James St', 'Hamilton', 'ON', 'L9C 5R8', '43.23567924', '-79.87828882'),
(6, 'TD Canada Trust Branch and ATM', '100 King St W', 'Hamilton', 'ON', 'L8P 4W9', '43.25750192', '-79.87043213'),
(7, 'FirstOntario Credit Union', '1 James St S', 'Hamilton', 'ON', 'L8P 4R5', '43.25629022', '-79.86909727'),
(8, 'Scotiabank', '12 King St E', 'Hamilton', 'ON', 'L8N 4G9', '43.25623811', '-79.86884714'),
(9, 'Talka Credit Union', '830 Main St E', 'Hamilton', 'ON', 'L8M 1L6', '43.24683044', '-79.83659706'),
(10, 'Credit Union Central of Ontario LTD', '10 West Avenue S', 'Hamilton', 'ON', 'L8N 1C3', '43.25323601', '-79.85792306'),
(11, 'Credit Union of Ontario', '50 Dundurn St S', 'Hamilton', 'ON', 'L8P 4W3', '43.26143468', '-79.88934804'),
(12, 'BDC - Business Development Bank of Canada', '25 Main St W Suite 1900', 'Hamilton', 'ON', 'L8P 1H1', '43.25560643', '-79.87100554');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`favBankId`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`bankId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `favourites`
--
ALTER TABLE `favourites`
  MODIFY `favBankId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `bankId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
