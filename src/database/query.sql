CREATE TABLE dindin;

create table usuarios(
  id serial primary key, 
  nome text NOT NULL,
  email text NOT NULL UNIQUE,
  senha text NOT NULL
);

create table categorias(
  id serial primary key,
  descricao text 
);

INSERT INTO categorias (descricao) VALUES 
    ('Alimentação'),('Assinaturas e Serviços'),('Casa'),('Mercado'),
    ('Cuidados Pessoais'),('Educação'),('Família'),('Lazer'),('Pets'),
    ('Presentes'),('Roupas'),('Saúde'),('Transporte'),('Salário'),('Vendas'),
    ('Outras receitas'),('Outras despesas');

create table transacoes(
  id serial primary key,
  descricao text,
  valor inT NOT NULL,
  data timestamptz not null,
  categoria_id integer not null,
  usuario_id integer not null,
  tipo text,
  foreign key (categoria_id) references categorias(id),
  foreign key (usuario_id) references usuarios(id)
);
