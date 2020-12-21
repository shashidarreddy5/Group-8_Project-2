
--
-- Database: `myhobbay`
--
DROP DATABASE IF EXISTS `myhobbay`;
CREATE DATABASE IF NOT EXISTS `myhobbay` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `myhobbay`;

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE IF NOT EXISTS `activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `hobby_id` int NOT NULL,
  `votes_up` int DEFAULT NULL,
  `votes_down` int DEFAULT NULL,
  `post_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `caption` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`id`, `user_id`, `image`, `hobby_id`, `votes_up`, `votes_down`, `post_date`, `caption`) VALUES
(1, 1, '/upload-images/Screenshot 2020-11-28 011630.png', 4, 4, 3, '2020-12-07 18:05:25', 'today was a good day I added some few hobbies'),
(2, 2, '', 2, 0, 0, '2020-12-11 07:08:02', 'today is the day whn comwing home everything was looking fine'),
(3, 22, '/upload-images/Screenshot 2020-11-28 000303.png', 12, 0, 0, '2020-12-11 08:21:58', 'this is an example of n activity posted by user');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `activity_id` int NOT NULL,
  `user_id` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `comment` varchar(1000) DEFAULT NULL,
  `post_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `activity_id`, `user_id`, `image`, `comment`, `post_date`) VALUES
(1, 3, 22, ' ', 'this is good, comment for activity 3', '2020-12-11 11:24:22');

-- --------------------------------------------------------

--
-- Table structure for table `hobby`
--

CREATE TABLE IF NOT EXISTS `hobby` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `hobby`
--

INSERT INTO `hobby` (`id`, `name`, `created_date`) VALUES
(1, 'swimming', '2020-12-05 04:21:28'),
(2, 'driving', '2020-12-05 04:25:41'),
(4, 'singing', '2020-12-05 04:26:34'),
(6, 'drivings', '2020-12-05 04:30:00'),
(8, 'reading', '2020-12-05 04:32:54'),
(9, 'biking', '2020-12-05 04:36:16'),
(10, 'reading novels', '2020-12-05 04:37:46'),
(12, 'diving', '2020-12-11 08:00:46');

-- --------------------------------------------------------

--
-- Table structure for table `login_record`
--

CREATE TABLE IF NOT EXISTS `login_record` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `login_record`
--

INSERT INTO `login_record` (`id`, `user_id`, `time`) VALUES
(1, 1, '2020-12-04 10:37:15'),
(2, 1, '2020-12-05 04:21:13'),
(3, 1, '2020-12-05 10:16:24'),
(4, 2, '2020-12-07 14:48:32'),
(5, 8, '2020-12-11 06:41:00'),
(6, 22, '2020-12-11 07:20:05'),
(7, 22, '2020-12-11 07:22:55');

-- --------------------------------------------------------

--
-- Table structure for table `mates`
--

CREATE TABLE IF NOT EXISTS `mates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `me` int NOT NULL,
  `mate` int NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `mates`
--

INSERT INTO `mates` (`id`, `me`, `mate`, `date`) VALUES
(1, 1, 1, '2020-12-05 11:12:48'),
(2, 2, 2, '2020-12-07 14:48:37'),
(3, 2, 1, '2020-12-07 14:51:40'),
(4, 2, 6, '2020-12-11 06:57:06'),
(5, 2, 5, '2020-12-11 06:57:09'),
(6, 2, 4, '2020-12-11 06:57:12'),
(7, 2, 3, '2020-12-11 06:57:13'),
(8, 2, 8, '2020-12-11 06:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE IF NOT EXISTS `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`id`, `user_id`, `image`, `description`, `country`, `city`) VALUES
(1, 1, '', 'undefined', 'CN', 'city'),
(2, 2, '/upload-images/db_relation.png', 'my name is kim', '', ''),
(3, 8, '', 'this is my description udated by you', 'kenya', 'nandi hills'),
(4, 12, '', 'null', NULL, NULL),
(5, 15, '', 'null', NULL, NULL),
(6, 18, '', 'null', NULL, NULL),
(7, 20, '', 'null', NULL, NULL),
(8, 21, '', 'null', NULL, NULL),
(9, 22, '', 'your profile description', 'CN', 'city');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) DEFAULT NULL,
  `last_name` varchar(25) DEFAULT NULL,
  `first_name` varchar(25) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `last_name`, `first_name`, `password`, `reset_token`, `last_login`, `created_date`) VALUES
(1, 'kimrop2@gmail.com', 'your last name', 'your first name', '$2b$10$5/DPucC18kskEg2DcUHUS.G/L2TgMetG22Cqrhv10tLAVZ.MRNdEe', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(2, 'Kimrop20@gmail.com', 'rop', 'kim', '$2b$10$xqtsqb5zM.Ihha7OpU8F8OvikbvS4EQzSo1UhVQSx.LE1vhJXMJBq', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(8, 'kimrop19@gmail.com', 'rop', 'kim', '$2b$10$uj/5qwXzPnnJRSgXRzqTiOptV2ozPjQA6H73NUsOj.yObCjHa7DfS', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(12, 'kimrop9@gmail.com', 'rop', '', '$2b$10$VzcbqxR4UOyaY2LKEo/ocOSv//6ZDhKGEiMWIask63qwW60svat1e', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(15, 'kimrop@gmail.com', 'rop', 'kim', '$2b$10$V0YUPCrAa08TMzspxjdcOeOoBj3boKjRSg5y2sQcyTHPzcGq/S.8G', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(18, 'Kimrop1@gmail.com', 'kim', 'kim', '$2b$10$X9KPqQDqdrlC91MeGdH1ee.tGdKn383v3AUY2JAkO0G1RRfyx4VFO', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(20, 'Kimrop10@gmail.com', 'kim', 'kim', '$2b$10$vLQ7yi4hbgS3980Ksz6.4uDmQ6QxAxJsZPumezw8iHXHPI8rMyfga', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(21, 'Kimrop11@gmail.com', 'kim', 'kim', '$2b$10$GX4zRlmvxfeC5krNEz5p4uKPFHhD6hSlszZC2WgW9vT8jDzZH2Jui', NULL, '2020-12-11 07:22:55', '2020-12-11 10:22:55'),
(22, 'your@email.com', 'your last name', 'your first name', '$2b$10$td0rrYDEtIj2zLgOVRVf.uo5RaoXm.DVUbGXajKIOOwO.d68jtSbC', '', '2020-12-11 10:25:29', '2020-12-11 10:25:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_hobbies`
--

CREATE TABLE IF NOT EXISTS `user_hobbies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `hobby_id` int NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `hobby_id` (`hobby_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_hobbies`
--

INSERT INTO `user_hobbies` (`id`, `user_id`, `hobby_id`, `date`) VALUES
(1, 1, 1, '2020-12-05 04:21:28'),
(2, 1, 2, '2020-12-05 04:25:41'),
(4, 1, 4, '2020-12-05 04:26:34'),
(6, 1, 6, '2020-12-05 04:30:00'),
(8, 1, 8, '2020-12-05 04:32:54'),
(9, 1, 9, '2020-12-05 04:36:16'),
(10, 1, 10, '2020-12-05 04:37:46'),
(11, 22, 1, '2020-12-11 07:38:09'),
(12, 22, 12, '2020-12-11 08:01:59');
COMMIT;


