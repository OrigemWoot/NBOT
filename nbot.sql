-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 07, 2016 at 10:22 PM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nbot`
--

-- --------------------------------------------------------

--
-- Table structure for table `activated_bots`
--

CREATE TABLE IF NOT EXISTS `activated_bots` (
  `id` int(11) NOT NULL,
  `bot` varchar(25) NOT NULL,
  `version` varchar(5) NOT NULL,
  `room` varchar(600) NOT NULL,
  `password` varchar(50) NOT NULL,
  `lang` varchar(10) NOT NULL DEFAULT 'en',
  `woots` int(11) NOT NULL DEFAULT '0',
  `mehs` int(11) NOT NULL DEFAULT '0',
  `grabs` int(11) NOT NULL DEFAULT '0',
  `settings_voteskipcount` int(11) NOT NULL DEFAULT '10',
  `settings_songlimit` int(11) NOT NULL DEFAULT '420',
  `settings_roulettetime` int(11) NOT NULL DEFAULT '30',
  `settings_historylimit` int(11) DEFAULT '49',
  `msg_grab` int(1) NOT NULL DEFAULT '1',
  `msg_welcome` int(1) NOT NULL DEFAULT '1',
  `msg_stats` int(1) NOT NULL DEFAULT '1',
  `permissions` varchar(2000) NOT NULL DEFAULT 'cohost=host,manager=cohost,die=cohost,reload=cohost,filter=cohost,skiphistory=cohost,set=cohost,clearchat=manager,mute=manager,unmute=manager,songban=manager,songunban=manager,lock=manager,unlock=manager,clearwaitlist=manager,wlfilter=manager,hidecommands=manager,roulette=manager,stoproulette=manager,bouncer=manager,resident=manager,msg=manager,move=manager,skip=manager,ban=bouncer,dc=user,autowoot=user,play=user,voteskip=user,botwoot=user,afks=user,help=user,swap=manager,roomstats=user,players=user,fb=user,roll=user,autodc=manager,duel=user',
  `tr` varchar(1) NOT NULL DEFAULT '!',
  `FacebookPage` varchar(250) NOT NULL DEFAULT 'Facebook page for this room does not exists',
  `RulesPage` varchar(350) NOT NULL DEFAULT '/me Rules not set.',
  `LiveSong` varchar(150) NOT NULL,
  `dclimit` int(4) NOT NULL DEFAULT '8760',
  `WelcomeMessageMSG` varchar(200) NOT NULL DEFAULT 'Hello @',
  `wlfilter` int(1) NOT NULL DEFAULT '0',
  `autodc` int(1) NOT NULL DEFAULT '0',
  `commandlog` int(1) NOT NULL DEFAULT '1',
  `hidecommands` int(1) NOT NULL DEFAULT '1',
  `motd` varchar(300) NOT NULL DEFAULT '99999|',
  `cookie_cmds` varchar(5000) NOT NULL DEFAULT 'cookie',
  `cookie_words` varchar(10000) NOT NULL DEFAULT 'sent you chocolate cookie!',
  `talk_file` varchar(100) NOT NULL DEFAULT 'https://source.nbot.eu/ai/default_ai.json',
  `emote_check` varchar(5) NOT NULL DEFAULT '',
  `ai_type` varchar(7) NOT NULL DEFAULT 'private',
  `badwords` text NOT NULL,
  `badwordsEngine` int(1) NOT NULL DEFAULT '0'
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `activated_bots`
--

INSERT INTO `activated_bots` (`id`, `bot`, `version`, `room`, `password`, `lang`, `woots`, `mehs`, `grabs`, `settings_voteskipcount`, `settings_songlimit`, `settings_roulettetime`, `settings_historylimit`, `msg_grab`, `msg_welcome`, `msg_stats`, `permissions`, `tr`, `FacebookPage`, `RulesPage`, `LiveSong`, `dclimit`, `WelcomeMessageMSG`, `wlfilter`, `autodc`, `commandlog`, `hidecommands`, `motd`, `cookie_cmds`, `cookie_words`, `talk_file`, `emote_check`, `ai_type`, `badwords`, `badwordsEngine`) VALUES
(2, 'MIF Bot ', '1', 'https://plug.dj/mis-music-is-life', '', 'en', 0, 0, 0, 10, 420, 30, 50, 1, 1, 1, 'cohost=host,manager=cohost,die=cohost,reload=cohost,filter=cohost,skiphistory=cohost,set=cohost,clearchat=manager,mute=manager,unmute=manager,songban=manager,songunban=manager,lock=manager,unlock=manager,clearwaitlist=manager,wlfilter=manager,hidecommands=manager,roulette=manager,stoproulette=manager,bouncer=manager,resident=manager,msg=manager,move=manager,skip=manager,ban=bouncer,dc=user,autowoot=user,play=user,voteskip=user,botwoot=user,afks=user,help=user,swap=manager,roomstats=user,players=user,fb=user,roll=user,autodc=manager,duel=user', '!', '', '', 'Joel Fletcher - Afterdark (Original Mix)', 48, 'Hello @ how are you?', 0, 0, 1, 1, '99999|', 'cookie', 'sent you chocolate cookie!', 'https://source.nbot.eu/ai/default_ai.json', '', 'public', '', 0),
(5, 'NarcisBOT', '1', 'https://plug.dj/balkan-music-190', '//', 'en', 2, 0, 2, 10, 420, 30, 50, 1, 1, 1, 'cohost=host,manager=cohost,die=cohost,reload=cohost,filter=cohost,skiphistory=cohost,set=cohost,clearchat=manager,mute=manager,unmute=manager,songban=manager,songunban=manager,lock=manager,unlock=manager,clearwaitlist=manager,wlfilter=manager,hidecommands=manager,roulette=manager,stoproulette=manager,bouncer=manager,resident=manager,msg=manager,move=manager,skip=manager,ban=bouncer,dc=user,autowoot=user,play=user,voteskip=user,botwoot=user,afks=user,help=user,swap=manager,roomstats=user,players=user,fb=user,roll=user,autodc=manager,duel=user', '!', '', '', 'Trap Nation - Eiffel 65 - Blue (KNY Factory Remix) [1H]', 48, 'Hello @ how are you?', 0, 0, 1, 1, '99999|', 'cookie', 'sent you chocolate cookie!', 'https://source.nbot.eu/ai/default_ai.json', '/em', 'public', '', 1),;

-- --------------------------------------------------------

--
-- Table structure for table `banned_songs`
--

CREATE TABLE IF NOT EXISTS `banned_songs` (
  `id` int(11) NOT NULL,
  `author` varchar(200) NOT NULL,
  `title` varchar(150) NOT NULL,
  `room` varchar(60) NOT NULL,
  `videoKey` varchar(30) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cookies_cmds`
--

CREATE TABLE IF NOT EXISTS `cookies_cmds` (
  `room` varchar(150) NOT NULL,
  `cmds` text NOT NULL,
  `words` longtext NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cron_test`
--

CREATE TABLE IF NOT EXISTS `cron_test` (
  `id` int(11) NOT NULL,
  `cron` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `current_downloading`
--

CREATE TABLE IF NOT EXISTS `current_downloading` (
  `id` int(11) NOT NULL,
  `videoKey` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `globadl_waitlist`
--

CREATE TABLE IF NOT EXISTS `globadl_waitlist` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `room` varchar(100) NOT NULL,
  `position` varchar(2) NOT NULL,
  `rname` varchar(50) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `globadl_waitlist`
--

INSERT INTO `globadl_waitlist` (`id`, `name`, `room`, `position`, `rname`, `time`) VALUES
(7, '3632408', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fchillout', '1', 'KevinCZE', 1474393013),
(2, '4556151', 'https%3A%2F%2Fplug.dj%2Fbalkan-music-190', '1', 'DJSostaric', 1471686637),
(29, '20365268', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', 'Matysek81', 1476800733),
(42, '20408069', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', 'cryxbaby', 1476811257),
(34, '6614885', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476803362),
(16, '3602201', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fchillout', '1', 'Ciker', 1474398507),
(35, '20145704', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', 'Ciкer', 1476805597),
(36, '20407340', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', 'Forz3NNN', 1476805787),
(38, '19817937', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', 'MindeLTU1', 1476808859),
(41, '10686134', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', 'laikiuks lt', 1476809496),
(43, '4308733', 'https%3A%2F%2Fplug.dj%2Fm-u', '1', 'Ajdin97', 1476819368),
(57, '5', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fm-u', '1', 'Vacule', 1478038732),
(45, '17', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fm-u', '8', 'Srdjan', 1478035525),
(46, '9', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fm-u', '6', '♔Kevinko68♔', 1478035525),
(48, '21', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fm-u', '4', 'V <3 S', 1478035525),
(50, '22', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fm-u', '3', 'Shvabex', 1478036292),
(53, '20', 'https%3A%2F%2Fpartydj-nakituminajasi.c9users.io%2Fm-u', '4', 'VeraPivo', 1478036292);

-- --------------------------------------------------------

--
-- Table structure for table `nbot_langs`
--

CREATE TABLE IF NOT EXISTS `nbot_langs` (
  `id` int(11) NOT NULL,
  `lang` varchar(20) NOT NULL,
  `langName` varchar(150) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nbot_langs`
--

INSERT INTO `nbot_langs` (`id`, `lang`, `langName`) VALUES
(4, 'sk', 'Slovak'),
(2, 'en', 'English'),
(121, 'cs', 'Czech'),
(122, 'lt-LT', 'Lithuanian'),
(123, 'ru', 'Russian'),
(124, 'fr', 'French'),
(125, 'tr', 'Turkish'),
(126, 'pt-PT', 'Portuguese'),
(127, 'pl', 'Polish'),
(128, 'fr-FR', 'French (France)');

-- --------------------------------------------------------

--
-- Table structure for table `nbot_langs_translators`
--

CREATE TABLE IF NOT EXISTS `nbot_langs_translators` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `verification_code` varchar(100) NOT NULL,
  `verifed` int(1) NOT NULL DEFAULT '1'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `points`
--

CREATE TABLE IF NOT EXISTS `points` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `points` float NOT NULL,
  `uname` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `points`
--

INSERT INTO `points` (`id`, `uid`, `points`, `uname`) VALUES
(1, 17746286, 0, '1MICROFIX DEVELOPER'),
(2, 4651979, 13, 'DJ-Minlor'),
(3, 4556151, 13, 'DJSostaric'),
(4, 118, 0, 'ErikaSvK'),
(5, 3632408, 6, 'KevinCZE'),
(6, 3602201, 9, 'Ciker'),
(7, 5786782, 9, 'KevinCZE'),
(8, 5014191, 9, 'ErikaSvK'),
(9, 3777540, 3, 'Vacule'),
(10, 20145704, 135, 'Ciкer'),
(11, 5120060, 0, 'Akacik'),
(12, 3593829, 27, 'Ɗj Ninja'),
(13, 20365268, 45, 'Matysek81'),
(14, 6614885, 69, '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥'),
(15, 4106134, 9, 'ĐινεRgεηΤ_Ƙєνιη ♣'),
(16, 20407340, 42, 'Forz3NNN'),
(17, 19817937, 30, 'MindeLTU1'),
(18, 10686134, 31, 'laikiuks lt'),
(19, 20408069, 78, 'cryxbaby'),
(20, 20410789, 18, 'taysteellamacorn'),
(21, 4308733, 18, 'Ajdin97'),
(22, 9835492, 156, 'NextExit'),
(23, 20354789, 315, 'ilic0710'),
(24, 5510118, 66, 'dylan brodie'),
(25, 15, 21, 'Daniel'),
(26, 11, 27, 'FunnyBunny ღ'),
(27, 4, 15, 'MetneM'),
(28, 16, 6, 'soulflower'),
(29, 5, 9, 'Vacule'),
(30, 3, 3, 'Ciker');

-- --------------------------------------------------------

--
-- Table structure for table `song_history`
--

CREATE TABLE IF NOT EXISTS `song_history` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `dj` varchar(24) NOT NULL,
  `time` int(11) NOT NULL,
  `room` varchar(60) NOT NULL,
  `roomName` varchar(200) NOT NULL,
  `w` int(11) NOT NULL DEFAULT '0',
  `g` int(11) NOT NULL DEFAULT '0',
  `m` int(11) NOT NULL DEFAULT '0',
  `tw` int(11) NOT NULL DEFAULT '0',
  `tg` int(11) NOT NULL DEFAULT '0',
  `tm` int(11) NOT NULL DEFAULT '0',
  `songKey` varchar(20) NOT NULL,
  `ip` varchar(30) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=269 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `song_history`
--

INSERT INTO `song_history` (`id`, `title`, `author`, `dj`, `time`, `room`, `roomName`, `w`, `g`, `m`, `tw`, `tg`, `tm`, `songKey`, `ip`) VALUES
(1, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471569879, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(2, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471570663, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(3, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471570968, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(4, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471571271, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(5, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471571576, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(6, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471571881, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(7, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471572185, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(8, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471572489, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(9, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471574133, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(10, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471574437, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(11, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471574741, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(12, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471575045, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(13, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471575350, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(14, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471575654, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(15, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471575958, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(16, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471576262, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(17, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471576566, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(18, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471576871, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(19, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471577175, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(20, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471577479, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.225'),
(21, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471577783, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(22, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471578087, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(23, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471578391, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(24, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471578695, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(25, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471579000, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(26, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471579304, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(27, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471579608, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(28, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471579913, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(29, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471580217, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(30, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471580521, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(31, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471580825, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(32, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471581129, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(33, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471581434, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(34, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471581738, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.225'),
(35, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471582042, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(36, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471582346, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(37, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471582650, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(38, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471582954, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(39, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471583259, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(40, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471583563, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(41, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471583867, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(42, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471584171, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(43, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471584475, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(44, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471584780, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(45, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471585084, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(46, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471585388, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(47, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471585692, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.225'),
(48, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471585996, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(49, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471586300, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(50, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471586607, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(51, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471586908, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(52, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471587212, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.225'),
(53, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471587516, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(54, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471587821, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(55, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471588125, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(56, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471588429, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(57, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471588733, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(58, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471589037, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(59, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471589342, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(60, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471589646, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(61, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471589950, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(62, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471590254, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(63, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471590558, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(64, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471590863, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(65, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471591167, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(66, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471591471, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(67, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471591775, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(68, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471592079, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(69, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471592384, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(70, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471592688, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(71, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471592992, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(72, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471593296, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(73, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471593600, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(74, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471593904, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(75, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471594214, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.225'),
(76, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471594518, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(77, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471594822, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(78, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471595126, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(79, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471595430, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(80, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471595735, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(81, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471596038, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(82, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471596343, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(83, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471596647, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.13'),
(84, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471596951, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(85, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471597255, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(86, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471597560, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(87, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471597864, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(88, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471598168, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(89, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471598472, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(90, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471598776, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(91, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471599080, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(92, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471599384, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.185'),
(93, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471599689, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(94, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471599993, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.181'),
(95, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471600297, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(96, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471600601, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(97, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471600905, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(98, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471601209, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(99, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471601514, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(100, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471601818, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(101, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471602122, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.225'),
(102, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471602426, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.195'),
(103, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471602730, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.196'),
(104, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471603038, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.18'),
(105, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471603343, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.224'),
(106, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471603647, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.215'),
(107, 'Afterdark (Original Mix)', 'Joel Fletcher', '1MICROFIX DEVELOPER', 1471603951, 'https://plug.dj/mis-music-is-life', '%23MIS%20Music%20is%20Life', 0, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.0.16'),
(108, 'Beam [Free]', 'Mako', 'DJ-Minlor', 1471686382, 'https://plug.dj/balkan-music-190', 'Balkan%20Party', 1, 1, 0, 0, 0, 0, 'YrvlVLLabro', '10.240.0.196'),
(109, 'The Next Episode (San Holo Remix)', 'Dr. Dre', 'DJSostaric', 1471686627, 'https://plug.dj/balkan-music-190', 'Balkan%20Party', 1, 1, 0, 0, 0, 0, 'vZv9-TWdBJM', '10.240.0.185'),
(110, '4 CDJ 2000 Live Mix 2015 2014   DJ Juicy M [Mirzab Zamail]', 'FlipArm Entertainment', 'ErikaSvK', 1474392174, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 0, 0, 0, 0, 0, 0, 'deiU68RfauY', '10.240.0.196'),
(111, 'Jungle', 'Inkyz', 'KevinCZE', 1474392412, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 2, 0, 0, 0, 0, 0, 'CKLxRkwJ7Q8', '10.240.1.18'),
(112, ' Panda (OFFICIAL SONG) Prod. By: Menace', 'Desiigner', 'Ciker', 1474392666, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 2, 0, 0, 0, 0, 0, 'lsJLLEwUYZM', '10.240.0.224'),
(113, 'PYRMYD', 'Inkyz & Stu', 'KevinCZE', 1474393342, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 2, 0, 0, 0, 0, 0, 'Ns6-w4YVG9U', '10.240.1.4'),
(114, 'NEW! DJ Juicy M mashuping on 4 CDJs', 'Mkrzychol', 'ErikaSvK', 1474393972, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 2, 0, 0, 0, 0, 0, 'GbLTiaGRXoA', '10.240.0.181'),
(115, 'PYRMYD', 'Inkyz & Stu', 'KevinCZE', 1474394146, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 1, 0, 0, 0, 0, 0, 'Ns6-w4YVG9U', '10.240.0.181'),
(116, 'ELITNI ODREDI // SAMO [ OFFICIAL VIDEO ] HD 1080p', 'ECHOOFFICIAL.TV', 'Vacule', 1474394455, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 1, 0, 0, 0, 0, 0, 'cPYWsBLZxtM', '10.240.0.224'),
(117, 'Juicy M & 4 decks', 'Juicy M', 'ErikaSvK', 1474395166, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 0, 0, 0, 0, 0, 0, '4xS3TIa2gSQ', '10.240.0.181'),
(118, 'Mixing and Scratching with vinyls (Exclusive)', 'DJ Juicy M', 'ErikaSvK', 1474395851, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 1, 0, 0, 0, 0, 0, '6BiRhKKd7gc', '10.240.0.215'),
(119, 'Osiris', 'Inkyz', 'KevinCZE', 1474396098, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 0, 0, 0, 0, 0, 0, 'H7Zqs5Kc01w', '10.240.1.18'),
(120, ' Panda (OFFICIAL SONG) Prod. By: Menace', 'Desiigner', 'Ciker', 1474396352, 'https://partydj-nakituminajasi.c9users.io/chillout', 'Chillout', 1, 0, 0, 0, 0, 0, 'lsJLLEwUYZM', '10.240.0.225'),
(121, 'Drop it', 'Nakituminajasi', 'Ciкer', 1476535238, 'https://plug.dj/m-u', 'Ultra%20Music', 0, 0, 0, 0, 0, 0, 'FXhlqYzggcs', '10.240.1.18'),
(122, 'Barbie Girl (metal cover by Leo Moracchioli)', 'Frog Leap Studios', 'Akacik', 1476535651, 'https://plug.dj/wtls', 'GTA-Multiplayer.cz', 0, 0, 0, 0, 0, 0, '3vnVzoEz_Zs', '10.240.0.16'),
(123, '"Liberate Me"', 'Our Last Night', 'Akacik', 1476535860, 'https://plug.dj/wtls', 'GTA-Multiplayer.cz', 0, 0, 0, 0, 0, 0, 'h-NKWlb7oi4', '10.240.1.4'),
(124, 'Wings Of A Butterfly HD (OFFICIAL MUSIC VIDEO)', 'HIM', 'Akacik', 1476536082, 'https://plug.dj/wtls', 'GTA-Multiplayer.cz', 0, 0, 0, 0, 0, 0, '_81phxrRJLs', '10.240.0.185'),
(125, 'Pentakill', 'Different Heaven ft. ReesaLunn', 'Akacik', 1476536296, 'https://plug.dj/wtls', 'GTA-Multiplayer.cz', 0, 0, 0, 0, 0, 0, 'Rpr_HNJ0Y3A', '10.240.0.16'),
(126, 'One Step Closer (Video)', 'Linkin Park', 'Akacik', 1476537563, 'https://plug.dj/wtls', 'GTA-Multiplayer.cz', 0, 0, 0, 0, 0, 0, 'pmUTBDuUGz8', '10.240.0.196'),
(127, 'Run Wild (Official Music Video)', 'Hardwell feat. Jake Reese', 'Ciкer', 1476795364, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'ULwcsIPdc8w', '10.240.0.185'),
(128, 'Drop it', 'Nakituminajasi', 'Ciкer', 1476795633, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'FXhlqYzggcs', '10.240.0.16'),
(129, 'Still Cold / Pathway Private', 'Night Lovell', 'Ciкer', 1476795894, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'wIJWIEWRK_I', '10.240.0.195'),
(130, 'Run Wild (Official Music Video)', 'Hardwell feat. Jake Reese', 'Ciкer', 1476796148, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'ULwcsIPdc8w', '10.240.1.31'),
(131, 'JOŠ JEDNOM Aleksa Jelić & Tijana Bogicević OFFICIAL VIDEO HIT 2014 Srbija, pop muzika', 'Aleksa Jelic', 'Ɗj Ninja', 1476796458, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'X4A4JB1sazY', '10.240.1.4'),
(132, 'Drop it', 'Nakituminajasi', 'Ciкer', 1476796728, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'FXhlqYzggcs', '10.240.1.4'),
(133, 'one day', 'wankelmut', 'Ɗj Ninja', 1476797203, 'https://plug.dj/m-u', 'Ultra%20Music', 0, 0, 0, 0, 0, 0, 'RKtRL7FkjQA', '10.240.0.185'),
(134, 'Still Cold / Pathway Private', 'Night Lovell', 'Ciкer', 1476797553, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'wIJWIEWRK_I', '10.240.0.181'),
(135, 'Run Wild (Official Music Video)', 'Hardwell feat. Jake Reese', 'Ciкer', 1476797807, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'ULwcsIPdc8w', '10.240.1.31'),
(136, 'Girls ( Dj Dima house)', 'Nirvana', 'Matysek81', 1476798010, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'wsUQKw4ByVg', '10.240.0.185'),
(137, 'Run Wild (Official Music Video)', 'Hardwell feat. Jake Reese', 'Ciкer', 1476798265, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'ULwcsIPdc8w', '10.240.1.18'),
(138, 'AWESOME BEAT DROPS MIX - 2016 August 23', 'TOP 10 BEAT DROPS', 'Matysek81', 1476799118, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '1qEEcW1qAng', '10.240.1.18'),
(139, 'Afterdark (Original Mix)', 'Joel Fletcher', 'Ciкer', 1476799422, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(140, 'Girls ( Dj Dima house)', 'Nirvana', 'Matysek81', 1476799626, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'wsUQKw4ByVg', '10.240.0.196'),
(141, 'Still Cold / Pathway Private', 'Night Lovell', 'Ciкer', 1476799886, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'wIJWIEWRK_I', '10.240.1.4'),
(142, '#Blakkout', 'Blakkwood', 'Matysek81', 1476800248, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'GsTsMKSJQTE', '10.240.1.4'),
(143, 'Drop it', 'Nakituminajasi', 'Ciкer', 1476800518, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'FXhlqYzggcs', '10.240.0.195'),
(144, 'Girls ( Dj Dima house)', 'Nirvana', 'Matysek81', 1476800722, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'wsUQKw4ByVg', '10.240.1.31'),
(145, 'Run Wild (Official Music Video)', 'Hardwell feat. Jake Reese', 'Ciкer', 1476800976, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'ULwcsIPdc8w', '10.240.0.185'),
(146, 'Still Cold / Pathway Private', 'Night Lovell', 'Ciкer', 1476801840, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'wIJWIEWRK_I', '10.240.1.31'),
(147, 'Drop it', 'Nakituminajasi', 'Ciкer', 1476802116, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'FXhlqYzggcs', '10.240.0.195'),
(148, 'Run Wild (Official Music Video)', 'Hardwell feat. Jake Reese', 'Ciкer', 1476802370, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'ULwcsIPdc8w', '10.240.0.215'),
(149, 'Afterdark (Original Mix)', 'Joel Fletcher', 'Ciкer', 1476802674, 'https://plug.dj/m-u', 'Ultra%20Music', 4, 0, 0, 0, 0, 0, '6_iZsZa51F4', '10.240.1.4'),
(150, 'Infarct (Arcalis Remix)', 'Timur Shafiev', 'Ɗj Ninja', 1476802918, 'https://plug.dj/m-u', 'Ultra%20Music', 5, 0, 0, 0, 0, 0, 'RWr0szRfdhQ', '10.240.0.215'),
(151, 'Still Cold / Pathway Private', 'Night Lovell', 'Ciкer', 1476803164, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'wIJWIEWRK_I', '10.240.0.225'),
(152, 'Bang It To The Curb', 'Far East Movement & Sidney Samson', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476803351, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'vW1QbGCNmVk', '10.240.0.215'),
(153, 'I Kissed A Girl (HQ)', 'Tatanka', 'ĐινεRgεηΤ_Ƙєνιη ♣', 1476803494, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'Ljg0Dlf5zAI', '10.240.0.181'),
(154, 'Rude', 'MAGIC!', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476803721, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'PIh2xe4jnpk', '10.240.0.181'),
(155, 'Tremor (Official Music Video)', 'Dimitri Vegas, Martin Garrix, Like Mike', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476803921, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '9vMh9f41pqE', '10.240.0.16'),
(156, 'Hard Rock Hallelujah', 'Lordi', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476804109, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '-6Xl9tBWt54', '10.240.0.196'),
(157, 'House Of Ill Repute', 'Gutter Brothers', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476804242, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'y1_UkIX-4Jw', '10.240.0.185'),
(158, 'Encore Trap Remix (Full Version)', 'Pokémon Theme Song', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476804661, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'HYAuxSOraNM', '10.240.0.16'),
(159, 'I''d Love To Change The World (Mastubs Remix) X Forever [Sam Sikora Remix]', 'Infinite Trap', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476804814, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'eh644RczQwc', '10.240.0.196'),
(160, 'PPAP Pen Pineapple Apple Pen', 'CHEE YEE Teoh', '♥ Iη Łσνε Ⱳιтн Μүsεlƒ ♥', 1476804847, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'd9TpRfDdyU0', '10.240.0.196'),
(161, 'Drop it', 'Nakituminajasi', 'Ciкer', 1476805332, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'FXhlqYzggcs', '10.240.0.196'),
(162, 'Run Wild (Official Music Video)', 'Hardwell feat. Jake Reese', 'Ciкer', 1476805586, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'ULwcsIPdc8w', '10.240.0.195'),
(163, 'Dollar Sines', 'KRNE', 'Forz3NNN', 1476805776, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'EJsjCaqVV6k', '10.240.0.225'),
(164, 'Bouncing ft Buppy Brown - Official Video', 'Costi', 'Ɗj Ninja', 1476805972, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '18xuMnVyRI0', '10.240.0.181'),
(165, 'My Way (MÖÖM Remix)', 'Calvin Harris X Grant Genske', 'Forz3NNN', 1476806170, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, '8pB8_lLctdc', '10.240.0.16'),
(166, 'Harambe (Prod by Getter)', 'Dumbfoundead', 'Forz3NNN', 1476806330, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, '9yUYW8l2vms', '10.240.0.225'),
(167, 'I Need Some Sleep', 'Lox Chatterbox & Sex Whales', 'Forz3NNN', 1476806568, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'Xk2HzZceTG4', '10.240.1.4'),
(168, 'BTFU', 'CRAY', 'Forz3NNN', 1476806758, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, '2leCgCc1mWs', '10.240.0.16'),
(169, 'Savior', 'Fabian Mazur', 'Forz3NNN', 1476806982, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'kjr7pDvDp0g', '10.240.0.224'),
(170, 'Bombs Away [Extended Version]', 'Homer Simpson Trap Remix', 'MindeLTU1', 1476808343, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '4DRR3Qj-QQk', '10.240.0.225'),
(171, ' 7 Years [OFFICIAL MUSIC VIDEO]', 'Lukas Graham', 'MindeLTU1', 1476808585, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'LHCob76kigA', '10.240.1.31'),
(172, 'Cheap Thrills (Lyric Video) ft. Sean Paul', 'Sia', 'MindeLTU1', 1476808848, 'https://plug.dj/m-u', 'Ultra%20Music', 4, 0, 0, 0, 0, 0, 'nYh-n7EOtMA', '10.240.1.4'),
(173, 'GIGGITY QUAGMIRE (TRAP REMIX)', 'BOMBS AWAY', 'laikiuks lt', 1476809084, 'https://plug.dj/m-u', 'Ultra%20Music', 4, 1, 0, 0, 0, 0, 'ODKY7Y1ZeDM', '10.240.1.18'),
(174, 'The Greatest', 'Sia', 'cryxbaby', 1476809437, 'https://plug.dj/m-u', 'Ultra%20Music', 4, 0, 0, 0, 0, 0, 'GKSRyLdjsPA', '10.240.0.225'),
(175, 'Somewhere To Run [Exclusive]', 'Krewella', 'laikiuks lt', 1476809485, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'zfYT0YaYCSo', '10.240.0.225'),
(176, 'Better ft. Yo Gotti', 'Meghan Trainor', 'cryxbaby', 1476809845, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'l82D-qmp4LE', '10.240.0.181'),
(177, ' Live Your Life (Future Now Tour Atlanta, Jun 29)', 'Demi Lovato  Feat. T I', 'cryxbaby', 1476810191, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OlaM9MKBvvI', '10.240.0.225'),
(178, 'Close ft. Tove Lo', 'Nick Jonas', 'cryxbaby', 1476810430, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'XgJFqVvb2Ws', '10.240.0.16'),
(179, 'Change Your Life', 'Iggy Azalea', 'cryxbaby', 1476810651, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'rre0sFHlfBc', '10.240.1.31'),
(180, 'Bacon ft. Ty Dolla $ign', 'Nick Jonas', 'cryxbaby', 1476810845, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'CPUB97ilIqE', '10.240.1.31'),
(181, 'Voodoo', 'Nick Jonas', 'cryxbaby', 1476811033, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'C1CjEKtlfS8', '10.240.0.215'),
(182, 'J''ai cherché (Clip officiel)', 'Amir', 'cryxbaby', 1476811247, 'https://plug.dj/m-u', 'Ultra%20Music', 4, 0, 0, 0, 0, 0, 'kQysGibXphE', '10.240.1.18'),
(183, 'Complicated', 'Avril Lavigne', 'taysteellamacorn', 1476811501, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '5NPBIwQyPWE', '10.240.0.185'),
(184, 'Who''s Laughing Now', 'Jessie J', 'taysteellamacorn', 1476811750, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'KsxSxF3JKeU', '10.240.0.195'),
(185, 'Say You Won''t Let Go', 'James Arthur', 'Ajdin97', 1476819087, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '0yW7w8F2TVA', '10.240.0.181'),
(186, 'Promises | The Velvet Teaparty | Official Video', 'Vonlust', 'Ajdin97', 1476819357, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'Vy7x9OcbhB0', '10.240.0.185'),
(187, 'Let Me Love You (Official) ft. Lil Wayne', 'Ariana Grande', 'NextExit', 1476819590, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '5WL672bjJgM', '10.240.1.18'),
(188, 'Born To Die (Absence Remix)', 'Lana Del Rey', 'NextExit', 1476819868, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '8wKGsvkfMbY', '10.240.1.4'),
(189, 'Love Sosa (RL Grime Remix)', 'Chief Keef', 'NextExit', 1476819885, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '1612_Y7N9x4', '10.240.0.195'),
(190, 'Ft. Sajsi MC - Papa [Dubstep / Rock]', 'RIOT 87', 'NextExit', 1476820094, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '159249964', '10.240.0.224'),
(191, 'Sajsi MC - Antifa Kučke (ft. RIOT 87)', 'Sajsi MC', 'NextExit', 1476820362, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '258023323', '10.240.0.215'),
(192, 'SEVERINA FEAT. SAJSI MC - SILIKONI (2016)', 'BALKAN PLAY', 'NextExit', 1476820394, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '272566525', '10.240.1.18'),
(193, 'Sajsi MC & Damjan Eltech - Mama (Club Mix)', 'Sajsi MC', 'NextExit', 1476820775, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '258627753', '10.240.0.196'),
(194, 'Sajsi MC - KNVK (ft. BKO)', 'Sajsi MC', 'NextExit', 1476821009, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '258023126', '10.240.0.16'),
(195, 'The Beatshakers feat Sajsi MC - Došla sam da dam (Radio Edit)', 'The Beatshakers', 'NextExit', 1476821199, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '206404669', '10.240.0.225'),
(196, 'Sajsi MC - Nana Me Naucila Bonton', 'Sajsi MC', 'NextExit', 1476821364, 'https://plug.dj/m-u', 'Ultra%20Music', 4, 0, 0, 0, 0, 0, '258024293', '10.240.0.185'),
(197, 'Sajsi MC - Nadrkano Hodanje (ft. BKO)', 'Sajsi MC', 'NextExit', 1476821531, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '258022415', '10.240.0.195'),
(198, 'Sajsi MC - Daleko Je Dizni', 'Sajsi MC', 'NextExit', 1476821750, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '258024538', '10.240.0.195'),
(199, 'Sajsi MC - Bot (ft. BKO) Extended Version', 'Sajsi MC', 'NextExit', 1476821950, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '257824616', '10.240.1.31'),
(200, 'Sajsi MC - U Hudu Sam Zmaj (ft. Damjan Eltech)', 'Sajsi MC', 'NextExit', 1476822159, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '258017526', '10.240.0.185'),
(201, 'Sajsi MC - Ajlajner (ft. Minival)', 'Sajsi MC', 'NextExit', 1476822379, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '258025101', '10.240.0.215'),
(202, 'SILIKONI (2016.)', 'SEVERINA FEAT. SAJSI MC', 'NextExit', 1476822663, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'MRXGyCjZG7Y', '10.240.0.225'),
(203, 'Sajsi MC - Pomozi Boze (ft. Salier Del Flores) 2016 DOWNLOAD', 'Sajsi MC', 'NextExit', 1476822860, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, '261472745', '10.240.0.215'),
(204, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823286, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.16'),
(205, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823290, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.1.4'),
(206, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823294, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.224'),
(207, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823298, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.1.31'),
(208, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823302, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.195'),
(209, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823305, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.225'),
(210, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823309, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.195'),
(211, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823312, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.1.4'),
(212, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823330, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.16'),
(213, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823331, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.224'),
(214, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823332, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.215'),
(215, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823334, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.0.181'),
(216, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823335, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.1.18'),
(217, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823336, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.181'),
(218, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823341, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.1.31'),
(219, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823344, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.1.31'),
(220, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823349, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.181'),
(221, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823355, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.225'),
(222, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823360, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.16'),
(223, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823372, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.0.195'),
(224, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823374, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.181'),
(225, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823376, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.1.18'),
(226, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823379, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.16'),
(227, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823384, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.0.225'),
(228, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823389, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.195'),
(229, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823391, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.16'),
(230, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823393, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.195'),
(231, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823396, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.0.224'),
(232, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823399, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.225'),
(233, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823403, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.195'),
(234, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823406, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.195'),
(235, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823409, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.0.195'),
(236, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823420, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.1.18'),
(237, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823422, 'https://plug.dj/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.1.4'),
(238, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823423, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.181'),
(239, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823425, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.0.181'),
(240, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823426, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.1.4'),
(241, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823428, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.196'),
(242, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823430, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.0.181'),
(243, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823433, 'https://plug.dj/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.0.195'),
(244, 'Zamalo tvoj (Official Video HD-2K) NOVO! © 2016 █▬█ █ ▀█▀', '® SASA KOVACEVIC', 'ilic0710', 1476823436, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'OjtiW5PE7yg', '10.240.0.225'),
(245, 'MAMA (OFFICIAL VIDEO)', 'MC STOJAN', 'ilic0710', 1476823440, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'WsNWwIgRmeA', '10.240.0.225'),
(246, 'MASERATI ( OFFICIAL VIDEO)', 'SHA', 'ilic0710', 1476823442, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'UiTGSOePfMs', '10.240.1.18'),
(247, 'IGRAJ I POBEDI (kosarkaska himna)', 'THCF', 'ilic0710', 1476823444, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'I3xA0Y4hBm4', '10.240.1.31'),
(248, 'Bonfire', 'Slow Kids at Play', 'dylan brodie', 1476859851, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'G_DswKvGdVU', '10.240.0.16'),
(249, 'Safe & Sound (The Hunger Games)', 'Taylor Swift ft. The Civil Wars', 'dylan brodie', 1476860093, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'RzhAS_GnJIc', '10.240.0.215'),
(250, 'RBD (Letra)', 'Enséñame', 'dylan brodie', 1476860314, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, '6TNwdtbYG2g', '10.240.0.196'),
(251, 'Salvame (with lyrics)', 'RBD', 'dylan brodie', 1476860566, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'Gyq3-BHDYY0', '10.240.1.18'),
(252, 'RBD (Letra)', 'Fuego', 'dylan brodie', 1476860749, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'm4pFjTXMlm4', '10.240.0.195'),
(253, 'GoldDigger Lyrics', 'Kanye West', 'dylan brodie', 1476860971, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'lITJK4jdUEE', '10.240.0.196'),
(254, ' Sage the Gemini ft iamsu! Lyrics', 'Gas Pedal', 'dylan brodie', 1476861170, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'g9N3HGIhYJA', '10.240.0.215'),
(255, 'Love Me Harder (Lyric Video) ft. The Weeknd', 'Ariana Grande', 'dylan brodie', 1476861409, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'szGomck3sZI', '10.240.0.195'),
(256, 'Into you (Lyrics) HD', 'Ariana Grande', 'dylan brodie', 1476861651, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'pFZl9DTVfcU', '10.240.0.195'),
(257, 'Chandelier', 'Sia', 'dylan brodie', 1476861884, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, '2vjPBrBU-TM', '10.240.0.215'),
(258, 'Classic', 'MKTO', 'dylan brodie', 1476862059, 'https://plug.dj/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, '4Ba_qTPA4Ds', '10.240.0.195'),
(259, 'Mudian Te Bach Ke (Gin & Tonic vs Flashback Melbourne Remix) [FREE DOWNLOAD]', 'Punjabi Mc', 'Daniel', 1478035336, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 7, 0, 0, 0, 0, 0, 'XON9E10Qhi8', '10.240.0.225'),
(260, 'Treba mi sna (pesma)', 'John Bane', 'FunnyBunny ღ', 1478035515, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 5, 0, 4, 0, 0, 0, 'o7wsoqig2N8', '10.240.1.4'),
(261, 'Jogi', 'Panjabi MC', 'MetneM', 1478036271, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'Wfzp4cdcuYc', '10.240.0.215'),
(262, 'Ganjaman', 'Alfons', 'MetneM', 1478036799, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 4, 0, 0, 0, 0, 0, 'C6Le7luzv2Y', '10.240.0.16'),
(263, 'PARIS', '$UICIDEBOY$', 'soulflower', 1478037742, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'nqtobIpZt68', '10.240.0.196'),
(264, 'Die Young (Official)', 'Ke$ha', 'Vacule', 1478037961, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 3, 0, 0, 0, 0, 0, 'NOubzHCUt48', '10.240.0.215'),
(265, 'Treba mi sna (pesma)', 'John Bane', 'FunnyBunny ღ', 1478038140, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, 'o7wsoqig2N8', '10.240.1.4'),
(266, 'DEAD BATTERIES', '$UICIDEBOY$', 'soulflower', 1478038289, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, '0l7-WRHSfHo', '10.240.0.196'),
(267, 'DRIVE BY (OFFICIAL VIDEO)', 'MANCHE & RALE & DINNA', 'FunnyBunny ღ', 1478038508, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 2, 0, 0, 0, 0, 0, '75BshbzLN_k', '10.240.1.4'),
(268, 'Killa Kokain (Original mix)', 'Droplex', 'Ciker', 1478038722, 'https://partydj-nakituminajasi.c9users.io/m-u', 'Ultra%20Music', 1, 0, 0, 0, 0, 0, 'XDisE_VlR6c', '10.240.0.181');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activated_bots`
--
ALTER TABLE `activated_bots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `room` (`room`(333)),
  ADD FULLTEXT KEY `motd` (`motd`);

--
-- Indexes for table `banned_songs`
--
ALTER TABLE `banned_songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `cookies_cmds`
--
ALTER TABLE `cookies_cmds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `cron_test`
--
ALTER TABLE `cron_test`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `current_downloading`
--
ALTER TABLE `current_downloading`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `globadl_waitlist`
--
ALTER TABLE `globadl_waitlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `id_2` (`id`),
  ADD KEY `time` (`time`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `nbot_langs`
--
ALTER TABLE `nbot_langs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`,`lang`);

--
-- Indexes for table `nbot_langs_translators`
--
ALTER TABLE `nbot_langs_translators`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `points`
--
ALTER TABLE `points`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `song_history`
--
ALTER TABLE `song_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `roomName` (`roomName`),
  ADD KEY `roomName_2` (`roomName`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activated_bots`
--
ALTER TABLE `activated_bots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `banned_songs`
--
ALTER TABLE `banned_songs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `cookies_cmds`
--
ALTER TABLE `cookies_cmds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `cron_test`
--
ALTER TABLE `cron_test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `current_downloading`
--
ALTER TABLE `current_downloading`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `globadl_waitlist`
--
ALTER TABLE `globadl_waitlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `nbot_langs`
--
ALTER TABLE `nbot_langs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=129;
--
-- AUTO_INCREMENT for table `nbot_langs_translators`
--
ALTER TABLE `nbot_langs_translators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `points`
--
ALTER TABLE `points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `song_history`
--
ALTER TABLE `song_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=269;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
