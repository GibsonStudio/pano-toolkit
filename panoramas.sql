/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : panoramas

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2020-02-11 10:30:59
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `panoramas`
-- ----------------------------
DROP TABLE IF EXISTS `panoramas`;
CREATE TABLE `panoramas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `xml` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of panoramas
-- ----------------------------
INSERT INTO `panoramas` VALUES ('7', 'Aircraft', '1', '<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n\n<scenes>\n\n	<scene id=\"e1\" image=\"e1.jpg\" lon=\"216.1\" lat=\"-3.1\">\n		<hotspot id=\"hs-57525\" lon=\"-25.60\" lat=\"24.90\" title=\"Inside\" link=\"i7\" ></hotspot>\n	</scene>\n\n	<scene id=\"i7\" image=\"i7.jpg\" lon=\"259.1\" lat=\"27.8\">\n		<hotspot id=\"hs-96481\" lon=\"-75.40\" lat=\"-30.40\" title=\"Outside\" link=\"e1\" ></hotspot>\n	</scene>\n\n</scenes>');
INSERT INTO `panoramas` VALUES ('8', 'Streets', null, '<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n\n<scenes>\n\n	<scene id=\"streets\" image=\"streets.jpg\" lon=\"225\" lat=\"4.6\">\n		<hotspot id=\"hs-83246\" lon=\"-41.40\" lat=\"4.80\" title=\"Arch\" link=\"arch\" ></hotspot>\n	</scene>\n\n	<scene id=\"arch\" image=\"streets_arch.jpg\" lon=\"180.4\" lat=\"-15.4\">\n		<hotspot id=\"hs-98459\" lon=\"-177.40\" lat=\"2.60\" title=\"Streets\" link=\"streets\" ></hotspot>\n	</scene>\n\n</scenes>');
INSERT INTO `panoramas` VALUES ('12', 'Falcon', null, '<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n\n<scenes>\n\n	<scene id=\"b1\" image=\"b1.jpg\" lon=\"109.1\" lat=\"18.9\" displayName=\"Nose Gear\">\n		<hotspot id=\"hs-86719\" lon=\"107.60\" lat=\"-5.60\" link=\"e5\" ></hotspot>\n		<hotspot id=\"hs-15119\" lon=\"35.50\" lat=\"1.30\" link=\"e4\" ></hotspot>\n	</scene>\n\n	<scene id=\"b2\" image=\"b2.jpg\" lon=\"299.7\" lat=\"15.8\">\n		<hotspot id=\"hs-50793\" lon=\"-80.30\" lat=\"-0.40\" link=\"e1\" ></hotspot>\n		<hotspot id=\"hs-43636\" lon=\"-162.60\" lat=\"1.50\" link=\"e6\" ></hotspot>\n	</scene>\n\n	<scene id=\"b4\" image=\"b4.jpg\" lon=\"120.1\" lat=\"-4.3\" displayName=\"Bay\">\n		<hotspot id=\"hs-47551\" lon=\"-121.90\" lat=\"-26.10\" link=\"e1\" ></hotspot>\n	</scene>\n\n	<scene id=\"b5\" image=\"b5.jpg\" lon=\"177\" lat=\"5\">\n		<hotspot id=\"hs-98883\" lon=\"-173.40\" lat=\"-18.30\" link=\"e6\" ></hotspot>\n	</scene>\n\n	<scene id=\"b6\" image=\"b6.jpg\" lon=\"48.8\" lat=\"2.2\">\n		<hotspot id=\"hs-33012\" lon=\"123.90\" lat=\"-62.90\" link=\"b7\" ></hotspot>\n		<hotspot id=\"hs-12658\" lon=\"187.50\" lat=\"-59.80\" link=\"e6\" ></hotspot>\n		<hotspot id=\"hs-934\" lon=\"68.70\" lat=\"-58.30\" link=\"e5\" ></hotspot>\n	</scene>\n\n	<scene id=\"b7\" image=\"b7.jpg\" lon=\"230.3\" lat=\"-28.5\">\n		<hotspot id=\"hs-1242\" lon=\"-53.10\" lat=\"49.10\" link=\"b6\" ></hotspot>\n		<hotspot id=\"hs-52160\" lon=\"-4.70\" lat=\"10.50\" link=\"e5\" ></hotspot>\n		<hotspot id=\"hs-87845\" lon=\"-111.50\" lat=\"12.70\" link=\"e6\" ></hotspot>\n	</scene>\n\n	<scene id=\"e1\" image=\"e1.jpg\" lon=\"195.7\" lat=\"-2.6\" isHomeScene=\"true\" displayName=\"By Front Door\">\n		<hotspot id=\"hs-16333\" lon=\"-27.30\" lat=\"18.60\" title=\"Interior\" link=\"i2\" ></hotspot>\n		<hotspot id=\"hs-29658\" lon=\"66.00\" lat=\"5.90\" link=\"e6\" ></hotspot>\n		<hotspot id=\"hs-93429\" lon=\"-69.00\" lat=\"4.20\" link=\"e2\" ></hotspot>\n		<hotspot id=\"hs-86062\" lon=\"27.40\" lat=\"-7.60\" link=\"b4\" ></hotspot>\n		<hotspot id=\"hs-79595\" lon=\"46.50\" lat=\"-7.30\" link=\"b2\" ></hotspot>\n	</scene>\n\n	<scene id=\"e2\" image=\"e2.jpg\" lon=\"205.8\" lat=\"-16.2\">\n		<hotspot id=\"hs-72036\" lon=\"-66.30\" lat=\"9.40\" link=\"e8\" ></hotspot>\n		<hotspot id=\"hs-50573\" lon=\"95.70\" lat=\"4.20\" link=\"e1\" ></hotspot>\n	</scene>\n\n	<scene id=\"e3\" image=\"e3.jpg\" lon=\"37.5\" lat=\"-16\">\n		<hotspot id=\"hs-47127\" lon=\"88.40\" lat=\"15.70\" link=\"e4\" ></hotspot>\n		<hotspot id=\"hs-70700\" lon=\"180.40\" lat=\"12.00\" link=\"e7\" ></hotspot>\n		<hotspot id=\"hs-89783\" lon=\"51.60\" lat=\"5.00\" link=\"e5\" ></hotspot>\n		<hotspot id=\"hs-76381\" lon=\"65.10\" lat=\"-6.20\" link=\"b1\" ></hotspot>\n	</scene>\n\n	<scene id=\"e4\" image=\"e4.jpg\" lon=\"34.6\" lat=\"-5.5\">\n		<hotspot id=\"hs-16872\" lon=\"190.70\" lat=\"4.60\" link=\"e3\" ></hotspot>\n		<hotspot id=\"hs-68641\" lon=\"53.70\" lat=\"5.60\" link=\"e5\" ></hotspot>\n		<hotspot id=\"hs-25956\" lon=\"77.50\" lat=\"-7.60\" link=\"b1\" ></hotspot>\n	</scene>\n\n	<scene id=\"e5\" image=\"e5.jpg\" lon=\"304.2\" lat=\"-13.6\">\n		<hotspot id=\"hs-23251\" lon=\"-181.60\" lat=\"15.10\" link=\"e6\" ></hotspot>\n		<hotspot id=\"hs-23756\" lon=\"-30.80\" lat=\"5.00\" link=\"e4\" ></hotspot>\n		<hotspot id=\"hs-44345\" lon=\"-138.80\" lat=\"-4.50\" link=\"b7\" ></hotspot>\n		<hotspot id=\"hs-78046\" lon=\"-136.30\" lat=\"6.60\" link=\"b6\" ></hotspot>\n		<hotspot id=\"hs-93566\" lon=\"-62.20\" lat=\"-9.60\" link=\"b1\" ></hotspot>\n	</scene>\n\n	<scene id=\"e6\" image=\"e6.jpg\" lon=\"194.8\" lat=\"-9.1\">\n		<hotspot id=\"hs-82812\" lon=\"-108.10\" lat=\"6.10\" link=\"e1\" ></hotspot>\n		<hotspot id=\"hs-64051\" lon=\"-19.90\" lat=\"4.20\" link=\"b5\" ></hotspot>\n		<hotspot id=\"hs-71931\" lon=\"2.50\" lat=\"-4.80\" link=\"b7\" ></hotspot>\n		<hotspot id=\"hs-4053\" lon=\"-2.30\" lat=\"4.40\" link=\"b6\" ></hotspot>\n		<hotspot id=\"hs-51758\" lon=\"34.70\" lat=\"11.70\" link=\"e5\" ></hotspot>\n		<hotspot id=\"hs-17713\" lon=\"-81.00\" lat=\"-11.90\" link=\"b2\" ></hotspot>\n		<hotspot id=\"hs-566\" lon=\"-59.60\" lat=\"-1.30\" link=\"i7\" sceneLat=\"12.7\" sceneLon=\"112.5\" ></hotspot>\n	</scene>\n\n	<scene id=\"e7\" image=\"e7.jpg\" lon=\"72.9\" lat=\"-12.2\">\n		<hotspot id=\"hs-28353\" lon=\"61.70\" lat=\"12.30\" link=\"e3\" ></hotspot>\n		<hotspot id=\"hs-27185\" lon=\"146.70\" lat=\"1.10\" link=\"e8\" ></hotspot>\n		<hotspot id=\"hs-67282\" lon=\"60.90\" lat=\"-6.80\" link=\"b1\" ></hotspot>\n	</scene>\n\n	<scene id=\"e8\" image=\"e8.jpg\" lon=\"151.7\" lat=\"-12.7\">\n		<hotspot id=\"hs-76850\" lon=\"-17.30\" lat=\"12.50\" link=\"e7\" ></hotspot>\n		<hotspot id=\"hs-34955\" lon=\"96.20\" lat=\"4.40\" link=\"e1\" ></hotspot>\n	</scene>\n\n	<scene id=\"i1\" image=\"i1.jpg\" lon=\"213.2\" lat=\"15.9\" displayName=\"Cockpit\">\n		<hotspot id=\"hs-39079\" lon=\"146.10\" lat=\"-4.50\" link=\"i2\" sceneLat=\"16.6\" sceneLon=\"37.7\" ></hotspot>\n	</scene>\n\n	<scene id=\"i2\" image=\"i2.jpg\" lon=\"127.6\" lat=\"6.5\">\n		<hotspot id=\"hs-66930\" lon=\"-37.90\" lat=\"-9.60\" title=\"Cockpit\" link=\"i1\" ></hotspot>\n		<hotspot id=\"hs-61863\" lon=\"-131.00\" lat=\"-25.80\" title=\"Exterior\" link=\"e1\" ></hotspot>\n		<hotspot id=\"hs-42480\" lon=\"140.50\" lat=\"-4.00\" link=\"i3\" ></hotspot>\n	</scene>\n\n	<scene id=\"i3\" image=\"i3.jpg\" lon=\"34.8\" lat=\"3.8\">\n		<hotspot id=\"hs-95566\" lon=\"141.40\" lat=\"-4.50\" link=\"i4\" ></hotspot>\n		<hotspot id=\"hs-77085\" lon=\"-42.30\" lat=\"-8.70\" link=\"i2\" sceneLat=\"12.3\" sceneLon=\"213.1\" ></hotspot>\n	</scene>\n\n	<scene id=\"i4\" image=\"i4.jpg\" lon=\"32.7\" lat=\"18\">\n		<hotspot id=\"hs-47548\" lon=\"145.30\" lat=\"-6.30\" link=\"i5\" ></hotspot>\n		<hotspot id=\"hs-66238\" lon=\"-35.50\" lat=\"-6.50\" link=\"i3\" sceneLat=\"15.3\" sceneLon=\"220.8\" ></hotspot>\n	</scene>\n\n	<scene id=\"i5\" image=\"i5.jpg\" lon=\"26.5\" lat=\"17.9\">\n		<hotspot id=\"hs-96004\" lon=\"150.00\" lat=\"-8.60\" link=\"i6\" ></hotspot>\n		<hotspot id=\"hs-92307\" lon=\"-29.70\" lat=\"-6.30\" link=\"i4\" sceneLat=\"17\" sceneLon=\"216.3\" ></hotspot>\n	</scene>\n\n	<scene id=\"i6\" image=\"i6.jpg\" lon=\"19.2\" lat=\"2.7\">\n		<hotspot id=\"hs-42956\" lon=\"159.20\" lat=\"6.90\" link=\"i7\" ></hotspot>\n		<hotspot id=\"hs-75553\" lon=\"-34.00\" lat=\"-2.90\" link=\"i5\" sceneLat=\"17.2\" sceneLon=\"209.4\" ></hotspot>\n	</scene>\n\n	<scene id=\"i7\" image=\"i7.jpg\" lon=\"345.2\" lat=\"-1.4\">\n		<hotspot id=\"hs-20553\" lon=\"14.10\" lat=\"12.40\" link=\"i6\" sceneLat=\"1.9\" sceneLon=\"208.5\" ></hotspot>\n		<hotspot id=\"hs-6340\" lon=\"-76.40\" lat=\"-29.70\" link=\"e6\" ></hotspot>\n	</scene>\n\n</scenes>');
INSERT INTO `panoramas` VALUES ('13', 'Room', null, '<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n\n<scenes>\n\n	<scene id=\"Room\" image=\"hdri_room.jpg\" lon=\"28.9\" lat=\"14.1\" isHomeScene=\"true\" displayName=\"Sitting Room\">\n		<hotspot id=\"hs-71589\" lon=\"153.60\" lat=\"-0.40\" title=\"Studio\" link=\"studio\" ></hotspot>\n	</scene>\n\n	<scene id=\"studio\" image=\"hdri_studio_01.jpg\" lon=\"0\" lat=\"0\" displayName=\"Studio Lights\">\n		<hotspot id=\"hs-13999\" lon=\"179.40\" lat=\"8.00\" title=\"Room\" link=\"Room\" ></hotspot>\n	</scene>\n\n</scenes>');
INSERT INTO `panoramas` VALUES ('14', 'My Test', '1', '<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n\n<scenes>\n\n	<scene id=\"field\" image=\"hdr_field_02.jpg\" lon=\"186.5\" lat=\"-10.8\" displayName=\"Field\">\n		<hotspot id=\"hs-47667\" lon=\"-5.60\" lat=\"39.40\" title=\"Go to Train Station\" link=\"subway\" ></hotspot>\n	</scene>\n\n	<scene id=\"subway\" image=\"subway.jpg\" lon=\"263.5\" lat=\"3.9\" isHomeScene=\"true\" displayName=\"Tube Station\">\n		<hotspot id=\"hs-60864\" lon=\"-83.10\" lat=\"0.10\" title=\"Go Outside\" link=\"field\" ></hotspot>\n	</scene>\n\n</scenes>');
