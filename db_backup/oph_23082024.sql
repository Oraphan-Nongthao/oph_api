-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Aug 23, 2024 at 08:19 AM
-- Server version: 11.5.2-MariaDB-ubu2404
-- PHP Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oph`
--

-- --------------------------------------------------------

--
-- Table structure for table `qa_answers`
--

CREATE TABLE `qa_answers` (
  `ans_id` int(11) NOT NULL,
  `qa_id` int(10) NOT NULL,
  `program_id` int(11) NOT NULL,
  `answer` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qa_answers`
--

INSERT INTO `qa_answers` (`ans_id`, `qa_id`, `program_id`, `answer`) VALUES
(1, 1, 1, 'Programming & Coding'),
(2, 1, 1, 'Robotics & Automation'),
(3, 1, 2, 'Sound Engineering'),
(4, 1, 2, 'Visual & Motion Graphic'),
(5, 1, 3, 'Renewable Energy '),
(6, 1, 3, 'Electrical '),
(7, 1, 4, 'AI'),
(8, 1, 4, 'Data Science'),
(9, 2, 1, 'เทคโนโลยีที่ทันสมัย อำนวยความสะดวก และสร้างประโยชน์'),
(10, 2, 2, 'สร้างนวัตกรรม พัฒนางานมัลติมีเดียสื่อผสม'),
(11, 2, 3, 'การผลิตและออกแบบระบบส่งจ่ายไฟฟ้า'),
(12, 2, 4, 'ประยุกต์ใช้งาน AI & Data Science มาเชื่อมโยงงานต่างๆ ได้'),
(13, 3, 1, 'โครงงานพัฒนาแอปพลิเคชันสำหรับการเรียนออนไลน์'),
(14, 3, 2, 'โครงงานนวัตกรรมสื่อมัลติมีเดียสำหรับ Event & Exhibition & Concert'),
(15, 3, 3, 'โครงงานพลังงานแสงอาทิตย์ที่มีประสิทธิภาพสูง'),
(16, 3, 4, 'โครงงานพัฒนาและประยุกต์ใช้ Data-driven Solution เพื่อแก้ไขปัญหารถติด'),
(17, 4, 1, 'ระบบติดตามรถโดยสารอัจฉริยะ'),
(18, 4, 2, 'Immersive Interactive DEEP SEA'),
(19, 4, 3, 'สกู๊ตเตอร์ชาร์จไฟฟ้า'),
(20, 4, 4, 'Guess who by AI Robot'),
(21, 5, 1, 'Computer Engineering'),
(22, 5, 1, 'System Analysis & Developer'),
(23, 5, 2, 'Sound Engineer '),
(24, 5, 2, 'Computer Graphic'),
(25, 5, 3, 'Project Engineer'),
(26, 5, 3, 'Electrical Design Engineer'),
(27, 5, 4, 'Data Analyst'),
(28, 5, 4, 'Artificial Intelligence Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `qa_program`
--

CREATE TABLE `qa_program` (
  `program_id` int(11) NOT NULL,
  `program_name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qa_program`
--

INSERT INTO `qa_program` (`program_id`, `program_name`) VALUES
(1, 'Computer and Robotics Engineering'),
(2, 'Multimedia and Entertainment Engineering'),
(3, 'Electrical Engineering'),
(4, 'Artificial Intelligence Engineering and Data Science');

-- --------------------------------------------------------

--
-- Table structure for table `qa_question`
--

CREATE TABLE `qa_question` (
  `qa_id` int(11) NOT NULL,
  `q_student` varchar(500) NOT NULL,
  `q_parent` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qa_question`
--

INSERT INTO `qa_question` (`qa_id`, `q_student`, `q_parent`) VALUES
(1, 'ถ้าคุณสามารถเลือกเรียนวิชาใดก็ได้\r\nคุณจะเลือกวิชาอะไร?\r\n(เลือกตอบ 3 ลำดับ)', 'ถ้าคุณสามารถเลือกให้บุตรหลานหรือผู้ที่อยู่ภายใต้การปกครองของคุณ\r\nเรียนวิชาใดก็ได้\r\nคุณจะให้เขาเลือกเรียนวิชาอะไร?\r\n(เลือกตอบ 3 ลำดับ)'),
(2, 'คุณมีความสนใจในหัวข้อใดมากที่สุด?', 'คุณคิดว่าบุตรหลานหรือผู้ที่อยู่ภายใต้การปกครองของคุณมีความสนใจในหัวข้อใดมากที่สุด?'),
(3, 'ถ้าคุณสามารถทำโครงงานใดก็ได้\r\nคุณจะเลือกทำโครงงานอะไร?', 'คุณคิดว่าหากบุตรหลานหรือผู้ที่อยู่ภายใต้การปกครองของคุณสามารถเลือกทำโครงงานใดก็ได้\r\nเขาจะเลือกทำโครงงานอะไร?'),
(4, 'ถ้าคุณสามารถออกแบบสิ่งประดิษฐ์ได้\r\nคุณจะเลือกออกแบบอะไร?', 'คุณคิดว่าหากบุตรหลานหรือผู้ที่อยู่ภายใต้การปกครองของคุณสามารถออกแบบสิ่งประดิษฐ์ได้เขาจะเลือกออกแบบอะไร?'),
(5, 'คุณอยากทำงานในสายอาชีพใดในอนาคต?\r\n(เลือกตอบ 3 ลำดับ)', 'คุณอยากให้บุตรหลานหรือผู้ที่อยู่ภายใต้การปกครองของคุณทำงานในสายอาชีพใดในอนาคต?(เลือกตอบ 3 ลำดับ)');

-- --------------------------------------------------------

--
-- Table structure for table `qa_transaction`
--

CREATE TABLE `qa_transaction` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `qa_id` int(11) NOT NULL,
  `ans_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `qa_transaction`
--

INSERT INTO `qa_transaction` (`id`, `user_id`, `qa_id`, `ans_id`, `score`, `time`) VALUES
(1, 88, 1, 1, 3, '2024-08-19 10:58:07'),
(2, 88, 1, 2, 2, '2024-08-19 10:58:07'),
(3, 88, 1, 3, 1, '2024-08-19 10:58:07'),
(4, 88, 2, 10, 1, '2024-08-19 10:58:07'),
(5, 88, 3, 15, 1, '2024-08-19 10:58:07'),
(6, 88, 4, 18, 1, '2024-08-19 10:58:07'),
(7, 88, 5, 22, 3, '2024-08-19 10:58:07'),
(8, 88, 5, 24, 2, '2024-08-19 10:58:07'),
(9, 88, 5, 28, 1, '2024-08-19 10:58:07'),
(10, 88, 1, 1, 3, '2024-08-19 12:59:51'),
(11, 88, 1, 1, 3, '2024-08-19 13:04:27'),
(12, 88, 1, 1, 3, '2024-08-19 13:05:18'),
(13, 88, 1, 1, 3, '2024-08-19 13:08:12'),
(14, 88, 1, 1, 3, '2024-08-19 13:08:50'),
(15, 88, 1, 1, 3, '2024-08-19 13:29:04'),
(16, 88, 1, 2, 2, '2024-08-19 13:29:04'),
(17, 88, 1, 3, 1, '2024-08-19 13:29:04'),
(18, 88, 2, 10, 1, '2024-08-19 13:29:04'),
(19, 88, 3, 15, 1, '2024-08-19 13:29:04'),
(20, 88, 4, 18, 1, '2024-08-19 13:29:04'),
(21, 88, 5, 22, 3, '2024-08-19 13:29:04'),
(22, 88, 5, 24, 2, '2024-08-19 13:29:04'),
(23, 88, 5, 28, 1, '2024-08-19 13:29:04');

-- --------------------------------------------------------

--
-- Table structure for table `register_age`
--

CREATE TABLE `register_age` (
  `age_id` int(11) NOT NULL,
  `age_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_age`
--

INSERT INTO `register_age` (`age_id`, `age_name`) VALUES
(1, '10-20'),
(2, '21-30'),
(3, '31-40'),
(4, '40 ปีขึ้นไป');

-- --------------------------------------------------------

--
-- Table structure for table `register_degree`
--

CREATE TABLE `register_degree` (
  `degree_id` int(11) NOT NULL,
  `degree_name` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_degree`
--

INSERT INTO `register_degree` (`degree_id`, `degree_name`) VALUES
(1, 'ม.ต้น'),
(2, 'ม.ปลาย'),
(3, 'ปวช/ปวส');

-- --------------------------------------------------------

--
-- Table structure for table `register_email`
--

CREATE TABLE `register_email` (
  `email_id` int(11) NOT NULL,
  `email_name` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_email`
--

INSERT INTO `register_email` (`email_id`, `email_name`) VALUES
(1, 'Oraphan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `register_faculty`
--

CREATE TABLE `register_faculty` (
  `faculty_id` int(11) NOT NULL,
  `faculty` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_faculty`
--

INSERT INTO `register_faculty` (`faculty_id`, `faculty`) VALUES
(1, 'law'),
(2, 'law');

-- --------------------------------------------------------

--
-- Table structure for table `register_field_study`
--

CREATE TABLE `register_field_study` (
  `field_study_id` int(11) NOT NULL,
  `field_study_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_field_study`
--

INSERT INTO `register_field_study` (`field_study_id`, `field_study_name`) VALUES
(1, 'ไทย-สังคม / English- Social studies '),
(2, 'ศิลป์-ภาษา / Art - Languages'),
(3, 'วิทย์ - คณิต / Science - Mathematics'),
(4, 'ศิลป์ - คำนวณ / English - Mathematics'),
(5, 'อื่นๆ / Other');

-- --------------------------------------------------------

--
-- Table structure for table `register_gender`
--

CREATE TABLE `register_gender` (
  `gender_id` int(11) NOT NULL,
  `gender_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_gender`
--

INSERT INTO `register_gender` (`gender_id`, `gender_name`) VALUES
(1, 'ชาย/Male'),
(2, 'หญืง/Female'),
(3, 'LGBTQIA'),
(4, 'ไม่ระบุ');

-- --------------------------------------------------------

--
-- Table structure for table `register_province`
--

CREATE TABLE `register_province` (
  `province_id` int(11) NOT NULL,
  `province_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_province`
--

INSERT INTO `register_province` (`province_id`, `province_name`) VALUES
(1, 'กรุงเทพมหานคร'),
(2, 'สมุทรปราการ'),
(3, 'นนทบุรี'),
(4, 'ปทุมธานี'),
(5, 'พระนครศรีอยุธยา'),
(6, 'อ่างทอง'),
(7, 'ลพบุรี'),
(8, 'สิงห์บุรี'),
(9, 'ชัยนาท'),
(10, 'สระบุรี'),
(11, 'ชลบุรี'),
(12, 'ระยอง'),
(13, 'จันทบุรี'),
(14, 'ตราด'),
(15, 'ฉะเชิงเทรา'),
(16, 'ปราจีนบุรี'),
(17, 'นครนายก'),
(18, 'สระแก้ว'),
(19, 'นครราชสีมา'),
(20, 'บุรีรัมย์'),
(21, 'สุรินทร์'),
(22, 'ศรีสะเกษ'),
(23, 'อุบลราชธานี'),
(24, 'ยโสธร'),
(25, 'ชัยภูมิ'),
(26, 'อำนาจเจริญ'),
(27, 'หนองบัวลำภู'),
(28, 'ขอนแก่น'),
(29, 'อุดรธานี'),
(30, 'เลย'),
(31, 'หนองคาย'),
(32, 'มหาสารคาม'),
(33, 'ร้อยเอ็ด'),
(34, 'กาฬสินธุ์'),
(35, 'สกลนคร'),
(36, 'นครพนม'),
(37, 'มุกดาหาร'),
(38, 'เชียงใหม่'),
(39, 'ลำพูน'),
(40, 'ลำปาง'),
(41, 'อุตรดิตถ์'),
(42, 'แพร่'),
(43, 'น่าน'),
(44, 'พะเยา'),
(45, 'เชียงราย'),
(46, 'แม่ฮ่องสอน'),
(47, 'นครสวรรค์'),
(48, 'อุทัยธานี'),
(49, 'กำแพงเพชร'),
(50, 'ตาก'),
(51, 'สุโขทัย'),
(52, 'พิษณุโลก'),
(53, 'พิจิตร'),
(54, 'เพชรบูรณ์'),
(55, 'ราชบุรี'),
(56, 'กาญจนบุรี'),
(57, 'สุพรรณบุรี'),
(58, 'นครปฐม'),
(59, 'สมุทรสาคร'),
(60, 'สมุทรสงคราม'),
(61, 'เพชรบุรี'),
(62, 'ประจวบคีรีขันธ์'),
(63, 'นครศรีธรรมราช'),
(64, 'กระบี่'),
(65, 'พังงา'),
(66, 'ภูเก็ต'),
(67, 'สุราษฎร์ธานี'),
(68, 'ระนอง'),
(69, 'ชุมพร'),
(70, 'สงขลา'),
(71, 'สตูล'),
(72, 'ตรัง'),
(73, 'พัทลุง'),
(74, 'ปัตตานี'),
(75, 'ยะลา'),
(76, 'นราธิวาส'),
(77, 'บึงกาฬ');

-- --------------------------------------------------------

--
-- Table structure for table `register_status`
--

CREATE TABLE `register_status` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_status`
--

INSERT INTO `register_status` (`status_id`, `status_name`) VALUES
(1, 'นักเรียน'),
(2, 'นักศึกษา'),
(3, 'อาจารย์'),
(4, 'ผู้ปกครอง'),
(5, 'อื่นๆ');

-- --------------------------------------------------------

--
-- Table structure for table `register_user`
--

CREATE TABLE `register_user` (
  `register_id` int(11) NOT NULL,
  `email_name` varchar(500) NOT NULL,
  `age_id` int(11) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `degree_id` int(11) NOT NULL,
  `field_study_name` varchar(300) NOT NULL,
  `province_id` int(11) NOT NULL,
  `registered_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `register_user`
--

INSERT INTO `register_user` (`register_id`, `email_name`, `age_id`, `gender_id`, `status_id`, `degree_id`, `field_study_name`, `province_id`, `registered_date`) VALUES
(1, 'tomato@jhotdog.com', 2, 2, 1, 2, '3', 1, '2024-08-13 16:07:38'),
(2, 'your@', 1, 2, 1, 1, '3', 1, '2024-08-13 16:40:35'),
(3, 'asfdsf', 2, 3, 1, 2, 'test', 3, '2024-08-20 03:47:43');

-- --------------------------------------------------------

--
-- Table structure for table `satisfaction_ans`
--

CREATE TABLE `satisfaction_ans` (
  `ans_id` int(11) NOT NULL,
  `ans_text` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `satisfaction_ans`
--

INSERT INTO `satisfaction_ans` (`ans_id`, `ans_text`) VALUES
(1, 'ควรปรับปรุง'),
(2, 'พอใช้'),
(3, 'ดี'),
(4, 'ดีมาก');

-- --------------------------------------------------------

--
-- Table structure for table `satisfaction_q`
--

CREATE TABLE `satisfaction_q` (
  `q_id` int(11) NOT NULL,
  `q_text` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `satisfaction_q`
--

INSERT INTO `satisfaction_q` (`q_id`, `q_text`) VALUES
(1, 'ด้านการจัดกิจกรรม\r\n(กิจกรรมที่จัดขึ้นภายในคณะวิศวกรรมศาสตร์ทั้งกิจกรรม Showcase และ ..)'),
(2, 'ด้านความรู้ความเข้าใจ/ประโยชน์ที่ได้รับ\r\n(ได้รับความรู้ความเข้าใจเกี่ยวกับการเรียนการสอนของคณะวิศวกรรมศาสตร์ ม.กรุงเทพ และสามารถนำข้อมูลมาให้เพื่อเป็นประโยชน์ในการตัดสินใจ)'),
(3, 'ด้านความเหมาะสมของระยะเวลา/สถานที่\r\n(ความเหมาะสมของพื้นที่ในการจัดงาน และความเหมาะสมของระยะเวลาจัดงาน)'),
(4, 'ด้านการให้คำแนะนำหรือการตอบข้อซักถามจากรุ่นพี่'),
(5, 'ความสนุกสนานเพลิดเพลินที่ได้รับจากการเข้าร่วมงาน'),
(6, 'ภาพรวมความพึงพอใจในการจัดกิจกรรมครั้งนี้'),
(7, 'ข้อเสนอแนะเพิ่มเติม');

-- --------------------------------------------------------

--
-- Table structure for table `satisfaction_transaction`
--

CREATE TABLE `satisfaction_transaction` (
  `id` int(11) NOT NULL,
  `q_id` int(11) NOT NULL,
  `ans_id` int(11) NOT NULL,
  `date_time` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `satisfaction_transaction`
--

INSERT INTO `satisfaction_transaction` (`id`, `q_id`, `ans_id`, `date_time`) VALUES
(1, 2, 3, '2024-08-09 17:19:18'),
(2, 1, 2, '0000-00-00 00:00:00'),
(3, 1, 3, '2024-08-13 11:58:30'),
(4, 1, 1, '2024-08-14 09:19:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qa_answers`
--
ALTER TABLE `qa_answers`
  ADD PRIMARY KEY (`ans_id`);

--
-- Indexes for table `qa_program`
--
ALTER TABLE `qa_program`
  ADD PRIMARY KEY (`program_id`);

--
-- Indexes for table `qa_question`
--
ALTER TABLE `qa_question`
  ADD PRIMARY KEY (`qa_id`);

--
-- Indexes for table `qa_transaction`
--
ALTER TABLE `qa_transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register_age`
--
ALTER TABLE `register_age`
  ADD PRIMARY KEY (`age_id`);

--
-- Indexes for table `register_degree`
--
ALTER TABLE `register_degree`
  ADD PRIMARY KEY (`degree_id`);

--
-- Indexes for table `register_email`
--
ALTER TABLE `register_email`
  ADD PRIMARY KEY (`email_id`);

--
-- Indexes for table `register_faculty`
--
ALTER TABLE `register_faculty`
  ADD PRIMARY KEY (`faculty_id`);

--
-- Indexes for table `register_field_study`
--
ALTER TABLE `register_field_study`
  ADD PRIMARY KEY (`field_study_id`);

--
-- Indexes for table `register_gender`
--
ALTER TABLE `register_gender`
  ADD PRIMARY KEY (`gender_id`);

--
-- Indexes for table `register_province`
--
ALTER TABLE `register_province`
  ADD PRIMARY KEY (`province_id`);

--
-- Indexes for table `register_status`
--
ALTER TABLE `register_status`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `register_user`
--
ALTER TABLE `register_user`
  ADD PRIMARY KEY (`register_id`);

--
-- Indexes for table `satisfaction_ans`
--
ALTER TABLE `satisfaction_ans`
  ADD PRIMARY KEY (`ans_id`);

--
-- Indexes for table `satisfaction_q`
--
ALTER TABLE `satisfaction_q`
  ADD PRIMARY KEY (`q_id`);

--
-- Indexes for table `satisfaction_transaction`
--
ALTER TABLE `satisfaction_transaction`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `qa_answers`
--
ALTER TABLE `qa_answers`
  MODIFY `ans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `qa_program`
--
ALTER TABLE `qa_program`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `qa_question`
--
ALTER TABLE `qa_question`
  MODIFY `qa_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `qa_transaction`
--
ALTER TABLE `qa_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `register_age`
--
ALTER TABLE `register_age`
  MODIFY `age_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `register_degree`
--
ALTER TABLE `register_degree`
  MODIFY `degree_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `register_email`
--
ALTER TABLE `register_email`
  MODIFY `email_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `register_faculty`
--
ALTER TABLE `register_faculty`
  MODIFY `faculty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `register_field_study`
--
ALTER TABLE `register_field_study`
  MODIFY `field_study_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `register_gender`
--
ALTER TABLE `register_gender`
  MODIFY `gender_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `register_province`
--
ALTER TABLE `register_province`
  MODIFY `province_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `register_status`
--
ALTER TABLE `register_status`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `register_user`
--
ALTER TABLE `register_user`
  MODIFY `register_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `satisfaction_ans`
--
ALTER TABLE `satisfaction_ans`
  MODIFY `ans_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `satisfaction_q`
--
ALTER TABLE `satisfaction_q`
  MODIFY `q_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `satisfaction_transaction`
--
ALTER TABLE `satisfaction_transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
