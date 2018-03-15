SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

CREATE TABLE IF NOT EXISTS `erc20` (
  `id` int(11) NOT NULL auto_increment,   
  `symbol` varchar(10) NULL, 
  `contract_address` varchar(42) NULL,
  `address_from` varchar(42) NULL,       
  `address_to` varchar(42) NULL,     
  `val` double NULL,     
  `txhash` varchar(66)  NULL,    
  `blocknumber` int(11) NULL,
   PRIMARY KEY  (`id`)

);

