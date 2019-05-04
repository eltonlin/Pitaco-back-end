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
cidade VARCHAR(50) NOT NULL,
cep CHAR(8) NOT NULL,
bairro VARCHAR(30) NOT NULL,
complemento VARCHAR(255),
estado VARCHAR(100),
PRIMARY KEY (id_endereco),
FOREIGN KEY (login_usuario) REFERENCES usuario_final (login_usuario)
);

CREATE TABLE interesse(
id_interesse INT NOT NULL AUTO_INCREMENT,
descricao VARCHAR(150) NOT NULL UNIQUE,
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
razao_social VARCHAR(100) NOT NULL UNIQUE,
nome_fantasia VARCHAR(100) NOT NULL,
cnpj VARCHAR(14) NOT NULL ,
login_master VARCHAR(30) NOT NULL,
PRIMARY KEY (cnpj),
FOREIGN KEY (login_master) REFERENCES usuario_master(login_master)
);

CREATE TABLE questionario(
id_questionario INT NOT NULL auto_increment,
descricao_questionario VARCHAR(100) NOT NULL, 
pontuacao_questionario INT,
login_master VARCHAR(30) NOT NULL,
empresa_cnpj CHAR(14) NOT NULL,
id_interesse INT NOT NULL,
PRIMARY KEY(id_questionario),
FOREIGN KEY (login_master) REFERENCES usuario_master(login_master),
FOREIGN KEY (empresa_cnpj) REFERENCES empresa(cnpj) ON DELETE CASCADE,
FOREIGN KEY (id_interesse) REFERENCES interesse(id_interesse)
);


CREATE TABLE pergunta(
id_pergunta INT NOT NULL auto_increment,
descricao_pergunta VARCHAR(500),
tipo_pergunta CHAR(1),
id_questionario INT NOT NULL,
PRIMARY KEY (id_pergunta),
FOREIGN KEY (id_questionario) REFERENCES questionario(id_questionario) 
ON DELETE CASCADE
);

CREATE TABLE opcao(
id_opcao INT NOT NULL auto_increment,
descricao_opcao VARCHAR(100),
id_pergunta INT NOT NULL,
PRIMARY KEY (id_opcao),
FOREIGN KEY(id_pergunta) REFERENCES pergunta(id_pergunta)
ON DELETE CASCADE
);

CREATE TABLE respostas(
id_opcao INT NOT NULL,
login_usuario VARCHAR(30) NOT NULL,
CONSTRAINT PK_respostas PRIMARY KEY (id_opcao, login_usuario),
FOREIGN KEY (id_opcao) REFERENCES opcao(id_opcao) ON DELETE CASCADE,
FOREIGN KEY (login_usuario) REFERENCES usuario_final(login_usuario)
);

#OS INSERTS COMEÇAM AQUI-----------------------------------------------------------------------------------------------------

#INSERT DA TABELA USUARIO_MASTER-----------------------------------------------------------------
INSERT INTO usuario_master VALUES ("fernando_master", "2233", "Fernando Araujo"),
                                  ("renato_master", "7777", "Renato Jales"),
                                  ("rafael_master", "1111", "Rafael Matos"),
                                  ("juliane_master", "2222", "Juliane Borba"),
                                  ("jedesson_master", "3333", "Jedesson Tavares"),
                                  ("adriano_master", "4444", "Adriano Jose"),
                                  ("elton_master", "5555", "Elton Linconl");
#FIM DO INSERT DA TABELA USUARIO_MASTER----------------------------------------------------------

#INSERT NA TABELA USUARIO_FINAL------------------------------------------------------------------
INSERT INTO usuario_final VALUES ("jose_garcia", "2233", "Jose Garcia", "08912471507", 1500, 7, "1990-02-08" ),
                                 ("renata_maria", "5678", "Renata Maria", "98726347123", 3000, 2, "1990-02-28" ),
                                 ("lidia_fernandes", "1434", "Lidia Fernandes", "12233445566", 1200, 10, "1992-08-13" ),
                                 ("carla_perez", "1993", "Carla Perez", "93846173451", 7000, 5, "1989-08-08" ),
                                 ("kinho_jed", "4321", "Kinho Jed", "92873112385", 2500, 3, "1993-05-30" ),
                                 ("mario_costa", "4533", "Mario Costa", "32141234998", 5000, 4, "1994-07-09" ),
                                 ("cristiano_ronaldo", "4533", "Cristiano Ronaldo", "09876358998", 2130, 77, "1987-03-05" ),
                                 ("neymar_junior", "4533", "Neymar Junior", "32188772298", 9999, 99, "1981-11-18"),
                                 ("rui_costa", "4533", "Rui Costa", "14589923778", 1234, 40, "1992-12-18" ),
                                 ("steve_rodgers", "4533", "Steve Rodgers", "92198723045", 4321, 50, "1970-04-07" );
#FIM DO INSERT NA TABELA USUARIO_FINAL--------------------------------------------------------------

#INSERT NA TABELA ENDERECO--------------------------------------------------------------------------
INSERT INTO endereco (login_usuario, rua, cidade, cep, bairro, complemento, estado)
              VALUES ("jose_garcia", "Rua do Jose Garcia 111" , "Recife", "50060080", "Boa Vista", "Apt 605", "Pernambuco"),
                     ("renata_maria", "Rua da Renata Maria 777", "Recife", "50070080", "Beira Rio", "Apt 900", "Pernambuco"),
                     ("lidia_fernandes", "Rua da Lidia 555", "Recife", "55060080", "Torre", "Apt 505", "Pernambuco"),
                     ("carla_perez", "Rua do Tchan 131", "Recife", "30060080", "Boa Viagem", "Apt 305", "Pernambuco"),
                     ("kinho_jed", "Rua do Camaragibe 411", "Recife", "50060089", "Camaragibe", "Apt 105", "Pernambuco"),
                     ("mario_costa", "Rua das Costas 333", "Recife", "57037080", "Cohab", "Apt 205", "Pernambuco"),
                     ("cristiano_ronaldo", "Rua Portugal 110", "Recife", "91160080", "Jordao", "Apt 600", "Pernambuco"),
                     ("neymar_junior", "Rua Marquezine 10", "Recife", "67145080", "Paris", "Apt 100", "Pernambuco"),
                     ("rui_costa", "Rua Dali 70", "5116876", "Recife", "Portuga", "Apt 129", "Pernambuco"),
                     ("steve_rodgers", "Rua Avengers 110", "Recife", "98760080", "USA", "Apt 777", "Pernambuco");
#FIM DO INSERT NA TABELA ENDERECO--------------------------------------------------------------------------

#INSERT NA TABELA INTERESSE--------------------------------------------------------------------------------
INSERT INTO interesse (descricao)
               VALUES ("Musica"),
                      ("Esporte"),
                      ("Carros"),
                      ("Filmes"),
                      ("Comida"),
                      ("Bebida"),
                      ("Politica"),
                      ("Eletroeletronicos"),
                      ("Viagens"),
                      ("Educacao"),
                      ("Fofoca"),
                      ("Intenet"),
                      ("Economia"),
                      ("Livros");
#FIM DO INSERT NA TABELA INTERESSE--------------------------------------------------------------------------------

#INSERT NA TABELA USUARIO_FINAL_INTERESSE--------------------------------------------------------------------------------
INSERT INTO usuario_final_interesse VALUES ("jose_garcia", 8),
                                           ("renata_maria", 6),
                                           ("lidia_fernandes", 3),
                                           ("carla_perez", 7),
                                           ("kinho_jed", 2),
                                           ("mario_costa", 14),
                                           ("cristiano_ronaldo", 1),
                                           ("neymar_junior", 5),
                                           ("rui_costa", 9),
                                           ("steve_rodgers", 12);
#FIM DO INSERT NA TABELA USUARIO_FINAL_INTERESSE--------------------------------------------------------------------------------

#INSERT NA TABELA EMPRESA---------------------------------------------------------------------------------------------
INSERT INTO empresa (razao_social, nome_fantasia, cnpj, login_master)
            VALUES ("Cerveja Devassa", "Cervejaria Buteco Seu Lunga", "46553809000141", "fernando_master"),
                   ("Mc Donald's", "Lanche Bicicleta Unibratec", "02474370000196", "renato_master"),
                   ("VEVO MUSIC", "Music Shopping", "91178658000143", "rafael_master"),
                   ("SMART FIT Academias", "Crossfit da Morte", "01154665000112", "juliane_master"),
                   ("FIAT", "FIAT", "92977492000198", "jedesson_master"),
                   ("Editora Moderna", "Editora Moderna", "04902689000109", "adriano_master"),
                   ("Riot Games", "Riot","13554373000156", "elton_master");
#FIM DO INSERT NA TABELA EMPRESA---------------------------------------------------------------------------------------------

#INSERT NA TABELA QUESTIONARIO---------------------------------------------------------------------------------------------
INSERT INTO questionario (descricao_questionario, pontuacao_questionario, login_master, empresa_cnpj, id_interesse)
                  VALUES ("Sobre Bebidas", 1000, "fernando_master", "46553809000141", 6),
                         ("Sobre Comida", 700, "renato_master", "02474370000196", 5),
                         ("Sobre Música", 900, "rafael_master", "91178658000143", 1),
                         ("Sobre Esportes", 500, "juliane_master", "01154665000112", 2),
                         ("Sobre Carros", 300, "jedesson_master", "92977492000198", 3),
                         ("Sobre Livros", 400, "adriano_master", "04902689000109", 14),
                         ("Sobre Jogos Eletrônicos", 300, "elton_master", "13554373000156", 10);
#FIM DO INSERT NA TABELA QUESTIONARIO-----------------------------------------------------------------------------------------

#INSERT NA TABELA PERGUNTA----------------------------------------------------------------------------------------
INSERT INTO pergunta (descricao_pergunta, tipo_pergunta, id_questionario)
              VALUES ("Gosta de Cerveja?", "s", 1),
                     ("Você prefere cerveja mais amarga?", "s", 1),
                     ("Você bebe cerveja com frenquencia?", "s", 1),
                     ("Você prefere as cervejas nacionais?", "s", 1),
                     ("Você gostaria de receber notícias sobre cervejas?", "s", 1),
                     ("Gosta de Comida Asiática?", "s", 2),
                     ("Você gosta de comida Mexicana?", "s", 2),
                     ("Você gosta de comida Brasielira?", "s", 2),
                     ("Você gosta de comida Francesa?", "s", 2),
                     ("Você gostaria de receber notícias sobre culinária?", "s", 2),
                     ("Você gosta de música?", "s", 3),
                     ("Você sabe cantar ou tocar algum instrumento?", "s", 3),
                     ("Você gosta de ir a shows ao vivo?", "s", 3),
                     ("Você gosta de escutar pagode?", "s", 3),
                     ("Você gosta de escutar músicas de Rock'n'Roll, baby?", "s", 3),
                     ("Você gostaria de receber notícias sobre músicas e shows na sua região?", "s", 3),
                     ("Você faz exercícios físicos?", "s", 4),
                     ("Você gostaria de praticar exercícios físicos?", "s", 4),
                     ("Você faz uso de suplementos?", "s", 4),
                     ("Existe alguma academia perto da sua casa?", "s", 4),
                     ("Você possui um carro?", "s", 5),
                     ("Você gostaria de comprar um carro novo?", "s", 5),
                     ("Sobre os carros nacionais, você que eles são de boa qualidade?", "s", 5),
                     ("Você compraria um carro importado?", "s", 5),
                     ("Você pesquisas sobre as novidades de carros?", "s", 5),
                     ("Você gostaria de receber notícias sobre carros nacionais?", "s", 5),
                     ("Você gostaria de receber notícias sobre carros importados?", "s", 5),
                     ("Você gosta de ler livros físicos?", "s", 6),
                     ("Você gosta de ler livros digitais?", "s", 6),
                     ("Você gosta de ler notícias nos jornais impressos?", "s", 6),
                     ("Você gosta de ler notícias nos jornais digitais?", "s", 6),
                     ("Você gostaria de ler livros de ficção científica?", "s", 6),
                     ("Você gostaria de receber notícias sobre livros, revistas e jornais digitais?", "s", 6),
                     ("Você joga jogos digitais, seja no celular, computador ou console?", "s", 7),
                     ("Você gosta de assistir pessoas jogando jogos eletrônicos?", "s", 7),
                     ("Você possui um Playstation 3/4 OU XBOX 360/ONE?", "s", 7),
                     ("Você acompanha notícias sobre jogos digitais online? Ex.: League of Legends, Dota 2, CS:GO, PUBG etc.", "s", 7),
                     ("Você gostaria de receber notícias sobre jogos online?", "s", 7),
                     ("Você acha League of Legends um jogo bom?", "s", 7);                     
#FIM DO INSERT NA TABELA PERGUNTA----------------------------------------------------------------------------------------

#INSERT NA TABELA OPCAO--------------------------------------------------------------------------------------------------
#INSERT INTO opcao (descricao_opcao, id_pergunta)
#           VALUES ("SIM", 1),
#                  ("NÃO", 2),
#                  ("SIM", 3),
#                  ("NÃO", 4),
#                  ("SIM", 5),
#                  ("NÃO", 6),
#                  ("SIM", 7);
#FIM DO INSERT NA TABELA OPCAO-----------------------------------------------------------------------------------------
        
#INSERT NA TABELA RESPOSTAS--------------------------------------------------------------------------------------------
#INSERT INTO respostas (id_opcao, login_usuario)
#               VALUES (1, "jose_garcia"),
#                      (2, "carla_perez"),
#                      (3, "cristiano_ronaldo"),
#                      (4, "rui_costa"),
#                      (5, "renata_maria"),
#                      (6, "lidia_fernandes"),
#                      (7, "kinho_jed");
#FIM DO INSERT NA TABELA RESPOSTAS--------------------------------------------------------------------------------------------
