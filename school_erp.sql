-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 14, 2026 at 01:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `school_erp`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` varchar(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` varchar(255) NOT NULL,
  `instructor` varchar(255) NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `title`, `description`, `price`, `duration`, `instructor`, `thumbnail`) VALUES
('f11f06d2-1f3a-4171-9117-07e604f09396', 'React Mastery', 'Master React with TypeScript and Hooks', 99.99, '10 weeks', 'Sarah Connor', 'https://placehold.co/600x400?text=React'),
('f5909c54-c1f6-4941-beea-e2906c783448', 'Advanced Tailwind', 'Deep dive into Tailwind CSSdfbvfdb', 49.99, '4 weeks', 'John Wick', 'https://placehold.co/600x400?text=Tailwind');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `courseId` varchar(255) NOT NULL,
  `enrollmentDate` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `email`, `courseId`, `enrollmentDate`, `status`, `avatar`, `photo`) VALUES
('0575df9e-fdbb-4597-af45-b7813be35117', 'rtyty', 'www343444n@gmail.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', NULL, 'http://localhost:3000/uploads/photo-1768394870210-867226597.jpeg'),
('0f73be6a-1192-411d-aa15-f7979932b0b3', 'Student 2', 'student2@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+2', NULL),
('1ab58da0-95d4-4d0f-b76e-d77616c03939', 'Student 8', 'student8@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+8', NULL),
('2bb68ad9-9b8c-430c-9091-72327e2ac8dd', 'Student 4', 'student4@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+4', NULL),
('50838d44-44e0-42e8-9200-d876cc164d87', 'Test', 'admin22@email.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', NULL, 'http://localhost:3000/uploads/photo-1768394769230-129969.webp'),
('6fb51ab7-2c62-4019-be47-db04a3b870c4', 'Student 9', 'student9@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+9', NULL),
('9f248b0b-acff-48ef-8e13-2ca5da473f8e', 'Test34543', 'admi34rt543trn@gmail.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', NULL, 'http://localhost:3000/uploads/photo-1768394791052-986980044.webp'),
('a861c66d-ca95-45b8-b7cf-9161b389923f', 'Student 10', 'student10@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+10', NULL),
('a9802ae2-c0cb-4f08-b973-b8c8afa5b284', 'Student 1', 'student1@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+1', NULL),
('ae762e15-ad69-40db-a1b3-07424655eff1', 'Student 3', 'student3@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+3', NULL),
('b654b072-c57b-41cb-9244-8eb8366967b8', 'Student 5', 'student5@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+5', NULL),
('dde3e4a5-e6f6-497e-8ee8-37c17aba381f', 'Test', 'admin@email.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', NULL, NULL),
('f027d5f2-581a-4203-bcdf-cf1cbac67666', 'Student 7', 'student7@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+7', NULL),
('ff23552c-fa3d-4f21-adf0-0574536ac689', 'Student 6', 'student6@school.com', 'f11f06d2-1f3a-4171-9117-07e604f09396', '2026-01-14', 'active', 'https://ui-avatars.com/api/?name=Student+6', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `avatar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `role`, `status`, `avatar`) VALUES
('3b7e3e02-cbf8-4702-ba4b-f19962e5ae63', 'John Doe', 'john@example.com', 'user', 'active', 'https://ui-avatars.com/api/?name=John+Doe'),
('4fd8f198-3b2d-4eca-ad54-c69bf3f68476', 'Admin User', 'admin@example.com', 'admin', 'active', 'https://ui-avatars.com/api/?name=Admin+User'),
('d44bb079-7e94-4639-a217-dc93a0a3530f', 'Test', 'admin@email.com', 'admin', 'active', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_a56c051c91dbe1068ad683f536` (`email`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
