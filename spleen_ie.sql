-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 19, 2015 at 02:10 PM
-- Server version: 5.6.21
-- PHP Version: 5.5.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `spleen_ie`
--

-- --------------------------------------------------------

--
-- Table structure for table `ratingtable`
--

CREATE TABLE IF NOT EXISTS `ratingtable` (
  `UserId` int(10) NOT NULL,
  `Rating` float(2,1) NOT NULL,
  `Comment` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ratingtable`
--

INSERT INTO `ratingtable` (`UserId`, `Rating`, `Comment`) VALUES
(1, 4.5, 'very good'),
(2, 3.0, 'average'),
(3, 4.0, 'good'),
(4, 4.5, 'Very good'),
(13, 3.0, 'hjkt'),
(15, 4.0, 'Nice app'),
(16, 4.5, 'xgfnsdhgfhdgfh');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
`UserId` int(10) NOT NULL,
  `User_Firstname` varchar(15) NOT NULL,
  `User_Lastname` varchar(15) NOT NULL,
  `User_DOB` date NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserId`, `User_Firstname`, `User_Lastname`, `User_DOB`) VALUES
(15, 'ashu', 'jee', '1989-01-01'),
(6, 'rahul', 'kumar', '1990-05-10'),
(14, 'ashu', 'kumar', '1988-09-15'),
(8, 'amit', 'amit', '1988-09-15'),
(9, 'vipin', 'kumar', '1993-03-16'),
(10, 'pawan', 'kumar', '1990-10-10'),
(11, 'rinto', 'rafael', '1987-10-23'),
(12, 'manoj', 'kumar', '1987-02-11'),
(13, 'anil', 'kumar', '1991-09-03'),
(16, 'Rinto', 'Rough Heal', '1981-09-03'),
(17, 'keshav', 'kumar', '1990-07-06'),
(27, 'rahul', 'raj', '1989-05-10');

-- --------------------------------------------------------

--
-- Table structure for table `usersettings`
--

CREATE TABLE IF NOT EXISTS `usersettings` (
  `VSRUser` int(10) NOT NULL,
  `DaysBefore` int(10) NOT NULL,
  `DaysAfter` int(10) NOT NULL,
  `DaysBeforeAlertStatus` tinyint(1) NOT NULL,
  `DaysAfterAlertStatus` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usersettings`
--

INSERT INTO `usersettings` (`VSRUser`, `DaysBefore`, `DaysAfter`, `DaysBeforeAlertStatus`, `DaysAfterAlertStatus`) VALUES
(10001, 1, 1, 1, 1),
(10002, 1, 1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `vaccinationtable`
--

CREATE TABLE IF NOT EXISTS `vaccinationtable` (
`VId` int(10) NOT NULL,
  `VSRUser` int(10) NOT NULL,
  `VaccinationCategory` varchar(25) NOT NULL,
  `VaccinationName` varchar(25) NOT NULL,
  `VaccinationDate` date NOT NULL,
  `VaccinationStatus` varchar(15) NOT NULL,
  `DoctorName` varchar(20) NOT NULL,
  `ClinicAddress` varchar(50) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vaccinationtable`
--

INSERT INTO `vaccinationtable` (`VId`, `VSRUser`, `VaccinationCategory`, `VaccinationName`, `VaccinationDate`, `VaccinationStatus`, `DoctorName`, `ClinicAddress`) VALUES
(1, 10001, 'Pneumococcus Vaccine', 'Pneumovax 23', '2014-09-30', 'Completed', 'Dr. Agrawal', 'Bangalore'),
(3, 10001, 'Pneumococcus Vaccine', 'Prevenar 13', '2015-05-15', 'Completed', 'Dr. Agarwal', 'Bangalore'),
(4, 10001, 'Meningococcus Vaccine', 'Menveo/Menactra', '2014-09-15', 'Completed', 'Dr. Malhotra', 'Whitefield'),
(5, 10001, 'Meningococcus Vaccine', 'Mencevax', '2015-05-12', 'Pending', 'Dr. Malhotra', 'Whitefield'),
(6, 10001, 'Meningococcus Vaccine', 'Bexsero', '2015-05-16', 'Pending', 'Dr. Malhotra', 'Whitefield'),
(7, 10001, 'HiB Vaccine', '', '2015-05-17', 'Pending', 'Dr. Ashok', 'Silk board'),
(8, 10001, 'Annual Influenza', '', '2015-05-18', 'Pending', 'Dr. Malhotra', 'Whitefield'),
(9, 10002, 'Pneumococcus Vaccine', 'Pneumovax 23', '2014-09-30', 'Completed', 'Dr. Agrawal', 'Bangalore'),
(10, 10002, 'Meningococcus Vaccine', 'Menveo/Menactra', '2014-09-22', 'Completed', 'Dr. Malhotra', 'Whitefield'),
(11, 10002, 'Annual Influenza', '', '2015-05-16', 'Pending', 'Dr. Agrawal', 'Bangalore');

-- --------------------------------------------------------

--
-- Table structure for table `vsrdetail`
--

CREATE TABLE IF NOT EXISTS `vsrdetail` (
  `VSR_No` int(10) NOT NULL,
  `First_Name` varchar(15) NOT NULL,
  `Last_Name` varchar(15) NOT NULL,
  `DOB` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vsrdetail`
--

INSERT INTO `vsrdetail` (`VSR_No`, `First_Name`, `Last_Name`, `DOB`) VALUES
(10001, 'rahul', 'kumar', '1990-05-10'),
(10003, 'pawan', 'kumar', '1990-10-10'),
(10002, 'anil', 'kumar', '1991-09-03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`UserId`);

--
-- Indexes for table `vaccinationtable`
--
ALTER TABLE `vaccinationtable`
 ADD PRIMARY KEY (`VId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
MODIFY `UserId` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT for table `vaccinationtable`
--
ALTER TABLE `vaccinationtable`
MODIFY `VId` int(10) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
