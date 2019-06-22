DROP DATABASE IF EXISTS bitacoraBiblioteca;
CREATE DATABASE bitacoraBiblioteca;
use bitacoraBiblioteca;

CREATE TABLE CATALAGO(
CATALAGO_ID BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
NOMBRE VARCHAR(30) NOT NULL,
DESCRIPCION VARCHAR(50) NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);
CREATE TABLE CATALAGO_PARAMETRO(
CATALAGO_PARAMETRO_ID BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
CATALOGO_ID BIGINT(19) NOT NULL,
NOMBRE VARCHAR(100) NOT NULL,
DESCRIPCION VARCHAR(50) NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);

CREATE TABLE PERFIL(
PERFIL_ID BIGINT(19) PRIMARY KEY auto_increment,
NOMBRE VARCHAR(30) NOT NULL,
DESCRIPCION VARCHAR(100) NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);

create table ALUMNO(
ALUMNO_ID BIGINT(19) auto_increment  primary key,
PERFIL_ID BIgint(10) NOT NULL,
MATRICULA varchar(10) NOT NULL unique,
NOMBRE varchar(40) not null,
APELLIDO_PATERNO varchar(20) not null,
APELLIDO_MATERNO varchar(20) not null,
GRUPO varchar(10) not null,
MOBILIDAD varchar(15) not null,
TURNO varchar(15) not null,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);

CREATE TABLE ADMINISTRADOR(
ADMINISTRADOR_ID BIGINT(19) PRIMARY KEY auto_increment,
PERFIL_ID BIgint(10) NOT NULL,
NOMBRE VARCHAR(40) NOT NULL,
APELLIDO_PATERNO VARCHAR(40) NOT NULL,
APELLIDO_MATERNO VARCHAR(40) NOT NULL,
CORREO VARCHAR(100) NOT NULL,
CONSTRASENA VARCHAR(255) NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);

CREATE TABLE PAGINA(
PAGINA_ID BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
NOMBRE VARCHAR(40) NOT NULL,
URL VARCHAR(100) NOT NULL,
SECCION BIGINT(19) NOT NULL,
INCLUIR_MENU BIGINT(19) NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);

CREATE TABLE PEFIL_ACCESO(
PEFIL_ACCESO_ID BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
PERFIL_ID BIGINT(19) NOT NULL,
PAGINA_ID BIGINT(19) NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);
CREATE TABLE AUTOR(
AUTOR_ID BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
NOMBRE VARCHAR(100) NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);

create table EDITORIAL(
EDITORIAL_ID BIGINT(19) auto_increment primary key,
NOMBRE  varchar(20) not null,
DIRECCON varchar(20) not null,
TELEFONO varchar(10)  null,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);
CREATE TABLE CATEGORIA(
CATEGORIA_ID BIGINT(19) AUTO_INCREMENT PRIMARY KEY,
NOMBRE VARCHAR(30) NOT NULL,
DESCRIPCION VARCHAR(100) NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);
create table LIBRO(
LIBRO_ID BIGINT(19) auto_increment primary key,
ISBN  varchar(20) unique,
TITULO varchar(30) not null,
LIBRO_AUTOR VARCHAR(100) NOT NULL,
EDITORIAL_ID BIGINT(19) not null,
IDIOMA BIGINT(19) not null,
CATEGORIA_ID BIGINT(19) not null,
CANTIDAD INT NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);

CREATE TABLE LIBRO_AUTOR(
LIBRO_AUTOR_ID BIGINT(19) PRIMARY KEY AUTO_INCREMENT,
LIBRO_ID BIGINT(19) NOT NULL,
AUTOR_ID BIGINT(19) NOT NULL,
ESTATUS_ID INT NOT NULL,
ELIMINADO_ID INT NOT NULL,
FECHA_CREACION TIMESTAMP NOT NULL,
USUARIO_CREO INT NOT NULL,
FECHA_MODIFICO TIMESTAMP NOT NULL,
USUARIO_MODIFICO INT NOT NULL
);
