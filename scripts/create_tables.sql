SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;

drop table erc20_contrib;

drop table erc20_contract;

CREATE TABLE `erc20_contrib` (
  `id` int(11) NOT NULL auto_increment,   
  `contract_address` varchar(42) NULL,
  `address_from` varchar(42) NULL,       
  `address_to` varchar(42) NULL,     
  `val` double NULL,     
  `txhash` varchar(66)  NULL,    
  `blocknumber` int(11) NULL,
   PRIMARY KEY  (`id`)
);

CREATE TABLE `erc20_contract` (
  `id` int(11) NOT NULL auto_increment,
  `contract_address` varchar(42) NULL,
  `block_number` int(11) NULL,
  `name` varchar(40) NULL,
  `symbol` varchar(10) NULL,
  `decimals` varchar(2) NULL,
  `total_supply` varchar(40) NULL,
  `valid`  TINYINT(1) NOT NULL DEFAULT '0',
  `tx_count` int(11) NULL,
   PRIMARY KEY  (`id`)
);

CREATE INDEX contract_address_index1 ON erc20_contrib (contract_address);

CREATE UNIQUE INDEX contract_address_index2 ON erc20_contract (contract_address);