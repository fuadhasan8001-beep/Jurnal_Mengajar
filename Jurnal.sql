-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2026 at 09:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `jurnal_absensi_guru`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_general_ci;
USE `jurnal_absensi_guru`;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jurnal_absensi_guru`
--

-- --------------------------------------------------------

--
-- Table structure for table `guru`
--

CREATE TABLE `guru` (
  `id_guru` int(11) NOT NULL,
  `nip` varchar(20) NOT NULL,
  `nama_guru` varchar(100) NOT NULL,
  `mapel_diampu` varchar(50) NOT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `status_kepegawaian` enum('PNS','Honorer','PPPK') DEFAULT 'Honorer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `guru`
--

INSERT INTO `guru` (`id_guru`, `nip`, `nama_guru`, `mapel_diampu`, `no_hp`, `status_kepegawaian`) VALUES
(1, '198501012010011001', 'Sutrisno, S.Kom', 'Basis Data', '081234500001', 'PNS'),
(2, '198702152011012002', 'Rahmawati, S.Kom', 'Pemrograman Berorientasi Objek', '081234500002', 'PNS'),
(3, '199001102015011003', 'Yusuf Hidayat, S.Kom', 'Pemrograman Web', '081234500003', 'PPPK'),
(4, '199203202016012004', 'Dewi Anjani, S.Pd', 'Matematika', '081234500004', 'PNS'),
(5, '198809302012011005', 'Bambang Wijaya, S.Pd', 'Bahasa Indonesia', '081234500005', 'Honorer'),
(6, '199105182017012006', 'Siti Nurhaliza, S.Pd', 'Bahasa Inggris', '081234500006', 'PPPK'),
(7, '198712252013011007', 'Agus Setiawan, S.Kom', 'Jaringan Komputer', '081234500007', 'PNS'),
(8, '199304142018012008', 'Putri Handayani, S.Pd', 'PKn', '081234500008', 'Honorer'),
(9, '198611052012011009', 'Hendra Gunawan, S.Kom', 'Pemrograman Dasar', '081234500009', 'PNS'),
(10, '199206302019012010', 'Lestari Wahyuni, S.Pd', 'Seni Budaya', '081234500010', 'Honorer');

-- --------------------------------------------------------

--
-- Table structure for table `jurnal_mengajar`
--

CREATE TABLE `jurnal_mengajar` (
  `id_jurnal` int(11) NOT NULL,
  `id_guru` int(11) NOT NULL,
  `id_kelas` int(11) NOT NULL,
  `tanggal` date NOT NULL,
  `jam_ke` int(11) NOT NULL,
  `materi` varchar(200) DEFAULT NULL,
  `jumlah_hadir` int(11) DEFAULT 0,
  `jumlah_tidak_hadir` int(11) DEFAULT 0,
  `jumlah_sakit` int(11) DEFAULT 0,
  `jumlah_izin` int(11) DEFAULT 0,
  `jumlah_alpa` int(11) DEFAULT 0,
  `status_kehadiran_guru` enum('Hadir','Izin','Sakit','Tanpa Keterangan') DEFAULT 'Hadir',
  `tugas` varchar(255) DEFAULT NULL,
  `guru_pengganti` varchar(100) DEFAULT NULL,
  `status_jurnal` enum('Menunggu','Disetujui','Ditolak') DEFAULT 'Menunggu',
  `catatan` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Konfigurasi jam pelajaran yang dikelola admin kurikulum
--
CREATE TABLE `jam_pelajaran` (
  `id_jam` int(11) NOT NULL AUTO_INCREMENT,
  `jam_ke` int(11) NOT NULL,
  `waktu_mulai` time NOT NULL,
  `waktu_selesai` time NOT NULL,
  PRIMARY KEY (`id_jam`),
  UNIQUE KEY `jam_ke` (`jam_ke`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `jam_pelajaran` (`jam_ke`, `waktu_mulai`, `waktu_selesai`) VALUES
(1, '07:00:00', '07:45:00'), (2, '07:45:00', '08:30:00'),
(3, '08:30:00', '09:15:00'), (4, '09:15:00', '10:00:00'),
(5, '10:15:00', '11:00:00'), (6, '11:00:00', '11:45:00'),
(7, '11:45:00', '12:30:00'), (8, '13:00:00', '13:45:00');

CREATE TABLE `akun_pengguna` (
  `id_akun` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `role` enum('admin_kurikulum','guru','sekretaris','petugas_piket') NOT NULL,
  PRIMARY KEY (`id_akun`), UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jurnal_mengajar`
--

INSERT INTO `jurnal_mengajar` (`id_jurnal`, `id_guru`, `id_kelas`, `tanggal`, `jam_ke`, `materi`, `jumlah_hadir`, `jumlah_tidak_hadir`, `status_kehadiran_guru`, `catatan`) VALUES
(1, 1, 1, '2026-07-20', 1, 'Pengenalan DDL & DML', 31, 1, 'Hadir', NULL),
(2, 2, 2, '2026-07-20', 2, 'Konsep OOP: Class dan Object', 29, 1, 'Hadir', NULL),
(3, 3, 3, '2026-07-20', 3, 'Dasar HTML & CSS', 30, 1, 'Hadir', NULL),
(4, 1, 4, '2026-07-20', 4, 'Normalisasi Basis Data', 28, 1, 'Hadir', NULL),
(5, 4, 1, '2026-07-21', 1, 'Persamaan Linear', 30, 2, 'Izin', 'Menghadiri workshop MGMP'),
(6, 5, 2, '2026-07-21', 2, 'Teks Eksposisi', NULL, NULL, 'Sakit', 'Digantikan guru piket, siswa diberi tugas mandiri'),
(7, 6, 3, '2026-07-21', 3, 'Simple Present Tense', 31, 0, 'Hadir', NULL),
(8, 7, 7, '2026-07-21', 4, 'Topologi Jaringan', 32, 1, 'Hadir', NULL),
(9, 2, 5, '2026-07-22', 1, 'Inheritance dan Polymorphism', 27, 1, 'Hadir', NULL),
(10, 3, 6, '2026-07-22', 2, 'JavaScript Dasar', 29, 1, 'Hadir', NULL),
(11, 8, 8, '2026-07-22', 3, 'Hak dan Kewajiban Warga Negara', NULL, NULL, 'Tanpa Keterangan', 'Guru piket mengisi jam kosong'),
(12, 9, 9, '2026-07-22', 4, 'Struktur Data Array', 30, 0, 'Hadir', NULL),
(13, 1, 3, '2026-07-23', 1, 'Query DML Lanjutan', 28, 3, 'Hadir', NULL),
(14, 10, 10, '2026-07-23', 2, 'Apresiasi Seni Rupa', 29, 0, 'Hadir', NULL),
(15, 5, 4, '2026-07-23', 3, 'Teks Deskripsi', 26, 3, 'Izin', 'Rapat wali kelas'),
(16, 6, 1, '2026-07-24', 1, 'Ulangan Harian Bahasa Inggris', 30, 2, 'Hadir', 'Kelas melaksanakan ulangan harian');

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `nama_kelas` varchar(20) NOT NULL,
  `wali_kelas` varchar(100) DEFAULT NULL,
  `jumlah_siswa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `nama_kelas`, `wali_kelas`, `jumlah_siswa`) VALUES
(1, 'X RPL 1', 'Sutrisno, S.Kom', 32),
(2, 'X RPL 2', 'Rahmawati, S.Kom', 30),
(3, 'XI RPL 1', 'Yusuf Hidayat, S.Kom', 31),
(4, 'XI RPL 2', 'Dewi Anjani, S.Pd', 29),
(5, 'XII RPL 1', 'Bambang Wijaya, S.Pd', 28),
(6, 'XII RPL 2', 'Siti Nurhaliza, S.Pd', 30),
(7, 'X TKJ 1', 'Agus Setiawan, S.Kom', 33),
(8, 'X TKJ 2', 'Putri Handayani, S.Pd', 31),
(9, 'XI TKJ 1', 'Hendra Gunawan, S.Kom', 30),
(10, 'XI TKJ 2', 'Lestari Wahyuni, S.Pd', 29);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `guru`
--
ALTER TABLE `guru`
  ADD PRIMARY KEY (`id_guru`),
  ADD UNIQUE KEY `nip` (`nip`);

--
-- Indexes for table `jurnal_mengajar`
--
ALTER TABLE `jurnal_mengajar`
  ADD PRIMARY KEY (`id_jurnal`),
  ADD KEY `id_guru` (`id_guru`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `kelas`
--
ALTER TABLE `kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD UNIQUE KEY `nama_kelas` (`nama_kelas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `guru`
--
ALTER TABLE `guru`
  MODIFY `id_guru` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `jurnal_mengajar`
--
ALTER TABLE `jurnal_mengajar`
  MODIFY `id_jurnal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `kelas`
--
ALTER TABLE `kelas`
  MODIFY `id_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jurnal_mengajar`
--
ALTER TABLE `jurnal_mengajar`
  ADD CONSTRAINT `jurnal_mengajar_ibfk_1` FOREIGN KEY (`id_guru`) REFERENCES `guru` (`id_guru`),
  ADD CONSTRAINT `jurnal_mengajar_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `kelas` (`id_kelas`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;