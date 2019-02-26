create database pitaco;

use pitaco;

create table usuario_master(
usuario_master VARCHAR(30) NOT NULL,
senha varchar(30) NOT NULL,
nome varchar(100) NOT NULL,
PRIMARY KEY(usuario_master));

create table usuario_final(
usuario_final VARCHAR(30) NOT NULL,
senha varchar(30) NOT NULL,
nome varchar(100) NOT NULL,
cpf varchar(11) NOT NULL,
faixa_salarial int not null,
pontuacao int not null, 
PRIMARY KEY(usuario_final));

CREATE TABLE endereco (
    id_endereco INT AUTO_INCREMENT,
    usuario_final VARCHAR(30) NOT NULL,
    rua VARCHAR(30) NOT NULL,
    cep CHAR(8) NOT NULL,
    bairro VARCHAR(30) NOT NULL,
    complemento VARCHAR(255),
    PRIMARY KEY (id_endereco),
    FOREIGN KEY (usuario_final)
        REFERENCES usuario_final (usuario_final)
);

create table interesse(
id_interesse int not NULL AUTO_INCREMENT,
descricao VARCHAR(150) NOT NULL,
PRIMARY KEY(id_interesse)
);

create table usuario_final_interesse(
 usuario_final VARCHAR(30) NOT NULL,
 id_interesse int not null, 
 CONSTRAINT PK_usuario_final_interesse PRIMARY KEY (usuario_final, id_interesse),
 foreign key (usuario_final) REFERENCES usuario_final(usuario_final),
 foreign key (id_interesse) REFERENCES interesse(id_interesse)
);

create table empresa(
id_empresa int not null auto_increment ,
nome_empresa varchar(100) not null,
cnpj varchar(14) not null,
usuario_master varchar(30) not null,
primary KEY (ID_empresa),
foreign key (usuario_master) REFERENCES usuario_master(usuario_master)
);

create table questionario(
id_questionario int not null auto_increment,
descricao_questionario varchar(100) not null, 
pontuacao_questionario int not null,
usuario_master varchar(30) not null,
primary key(id_questionario),
foreign key (usuario_master) REFERENCES usuario_master(usuario_master)
);

create table pergunta(
id_pergunta int not null auto_increment,
descricao_pergunta varchar(500),
tipo_pergunta varchar(1),
id_questionario int not null,
primary key (id_pergunta),
foreign key(id_questionario) REFERENCES questionario(id_questionario) 
);

create table opcao(
id_opcao int not null auto_increment,
descricao_opcao varchar(100),
id_pergunta int not null,
primary key (id_opcao),
foreign key(id_pergunta) REFERENCES pergunta(id_pergunta)
);

create table respostas(
id_opcao int not null,
usuario_final varchar(30) not null,
CONSTRAINT PK_respostas PRIMARY KEY (id_opcao, usuario_final),
foreign key (id_opcao) REFERENCES opcao(id_opcao),
foreign key (usuario_final) REFERENCES usuario_final(usuario_final)
);




insert into usuario_final values ("Elton", "1234", "Elton Linconl", "12345678989", 1235, 0 );




 
