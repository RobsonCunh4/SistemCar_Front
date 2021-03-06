# SistemCar Client com Vue js 3
Sistema desenvolvido como objetivo de estudo, utilizando as stacks Vue js 3 consumindo uma Api laravel 8 Rest com JWT.
      
      Contem as seguintes funcionalidades:
      - Login e armazenamento de token via cookie.
      - Registro de usuário.
      - Crud clientes.
      - Crud carros.      
      - Histórico de ajustes em registro de carros (criação e atualização).
      - Dashboard contendo total de clientes, carros e usuários cadastrados.
      - Listagem com filtros em clientes, carros e histórico do carro.        
      

# Front-end
  Densevolvido com Vue JS 3 e os seguintes pacotes:
    
    - vuelidate para validação.
    - axios para requisições.
    - bootstrap para estilização.
    - js-cookie para manuseio de cookies.
    - moment js para formatação de datas.
    - vue router para navegação entre as telas.
    
  
# Back-end
  Api rest desenvolvida com laravel 8 utiliza:
    - Autenticação via JWT.    
    

# Banco de dados
  A aplicação teve como testes os bancos mysql e também postgres.
  - Para criação do banco de dados foram criados migrations com a estrutura das tabelas.
  - Com a intenção de inserir registros para teste foram criados Factorys com o pacote Faker para gerar dados fictícios.
  - Concluindo a inserção de registros foram criados Seeders.


# O sistema se encontra no online através da plataforma Heroku
   Link de acesso ao cliente: <a href="https://sistemcarfront.herokuapp.com/">SistemCar com Vue JS 3</a>   
   Link de acesso a Api rest: <a href="https://sistemcarback.herokuapp.com/">Api Rest Laravel 8 com JWT</a>
   
   Observação: atualmente em manutenção sendo realizado ajuste cors em cadastro clientes e carros,
                porém pode-se realizar o acesso para ter uma visão geral.
                
                usuário de teste:
                   login: novousuario@gmail.com
                   senha: novousuario
    
    
    
# Os arquivos foram armazenados contendo todas as pastas
    Incluindo as pastas dos pacotes.
    Caso haja problemas pode-se atualizar os pacotes via npm e composer.
    
    
# Documentação
  A api se encontra com seus métodos comentados e documentados.
  O front apresenta métodos com nomes intuitivos de modo a se tornar mais fácil a compreensão.
  
  
# Observação
  Projeto desenvolvido para estudo, versão simples, podendo ser atualizado e otimizado.
  
  
# Possíveis futuras interações:
  - Atualização de versão.
  - Otimizações de código.
  - Aplicação de teste automatizados.
   
  
# Teste local
  Realize o download ou clone e execute o comando: npm run serve.
  Caso aconteça algum erro tente os comandos: npm install ou npm update.
  
