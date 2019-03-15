CREATE DATABASE pitaco;

USE pitaco;


CREATE TABLE usuario_master(
login_master VARCHAR(30) NOT NULL,
senha VARCHAR(30) NOT NULL,
nome VARCHAR(100) NOT NULL,
PRIMARY KEY(login_master)
);

CREATE TABLE usuario_final(
login_usuario VARCHAR(30) NOT NULL,
senha VARCHAR(30) NOT NULL,
nome VARCHAR(100) NOT NULL,
cpf CHAR(11) NOT NULL,
faixa_salarial INT NOT NULL,
pontuacao INT NOT NULL,
data_nascimento DATE NOT NULL,  
PRIMARY KEY(login_usuario)
);

CREATE TABLE endereco (
id_endereco INT AUTO_INCREMENT,
login_usuario VARCHAR(30) NOT NULL,
rua VARCHAR(30) NOT NULL,
cep CHAR(8) NOT NULL,
bairro VARCHAR(30) NOT NULL,
complemento VARCHAR(255),
PRIMARY KEY (id_endereco),
FOREIGN KEY (login_usuario) REFERENCES usuario_final (login_usuario)
);

CREATE TABLE interesse(
id_interesse INT NOT NULL AUTO_INCREMENT,
descricao VARCHAR(150) NOT NULL,
PRIMARY KEY(id_interesse)
);

CREATE TABLE usuario_final_interesse(
login_usuario VARCHAR(30) NOT NULL,
id_interesse INT NOT NULL, 
CONSTRAINT PK_usuario_final_interesse PRIMARY KEY (login_usuario, id_interesse),
FOREIGN KEY (login_usuario) REFERENCES usuario_final(login_usuario),
FOREIGN KEY (id_interesse) REFERENCES interesse(id_interesse)
);

CREATE TABLE empresa(
id_empresa INT NOT NULL auto_increment ,
nome_empresa VARCHAR(100) NOT NULL,
cnpj VARCHAR(14) NOT NULL,
usuario_master VARCHAR(30) NOT NULL,
PRIMARY KEY (ID_empresa),
FOREIGN KEY (login_master) REFERENCES usuario_master(login_master)
);

CREATE TABLE questionario(
id_questionario INT NOT NULL auto_increment,
descricao_questionario VARCHAR(100) NOT NULL, 
pontuacao_questionario INT,
usuario_master VARCHAR(30) NOT NULL,
id_empresa INT NOT NULL,
id_interesse INT NOT NULL,
PRIMARY KEY(id_questionario),
FOREIGN KEY (login_master) REFERENCES usuario_master(login_master),
FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
FOREIGN KEY (id_interesse) REFERENCES interesse(id_interesse)
);


CREATE TABLE pergunta(
id_pergunta INT NOT NULL auto_increment,
descricao_pergunta VARCHAR(500),
tipo_pergunta VARCHAR(1),
id_questionario INT NOT NULL,
PRIMARY KEY (id_pergunta),
FOREIGN KEY(id_questionario) REFERENCES questionario(id_questionario) 
);

CREATE TABLE opcao(
id_opcao INT NOT NULL auto_increment,
descricao_opcao VARCHAR(100),
id_pergunta INT NOT NULL,
PRIMARY KEY (id_opcao),
FOREIGN KEY(id_pergunta) REFERENCES pergunta(id_pergunta)
);

CREATE TABLE respostas(
id_opcao INT NOT NULL,
usuario_final VARCHAR(30) NOT NULL,
CONSTRAINT PK_respostas PRIMARY KEY (id_opcao, login_usuario),
FOREIGN KEY (id_opcao) REFERENCES opcao(id_opcao),
FOREIGN KEY (login_usuario) REFERENCES usuario_final(login_usuario)
);


/*                           usuário final, senha,     Nome,           CPF,   faixa sal., pontuação */       
INSERT INTO usuario_final VALUES ("Elton", "1234", "Elton Linconl", "12345678989", 1235, 0 );

