/// <reference types="cypress" />

import contratoUsuarios from '../contracts/usuarios.contract';
const { faker } = require('@faker-js/faker');

describe('Testes da Funcionalidade Usuários', () => {

     it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contratoUsuarios.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {

          let nome = faker.person.firstName()
          let email = faker.internet.email()
          let senha = faker.internet.password()

          cy.cadastrarUsuario(nome, email, senha)
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               })

     });

     it('Deve validar mensagem de email inválido', () => {

          let nome = faker.person.firstName()
          let senha = faker.internet.password()

          cy.cadastrarUsuario(nome,'frodo.b@' , senha)
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.email).to.equal('email deve ser um email válido')
               })

     });

     it('Deve validar um usuário com email inválido', () => {

          let nome = faker.person.firstName()
          let email = faker.internet.email()
          let senha = faker.internet.password()
          let nome2 = faker.person.firstName()
          let senha2 = faker.internet.password()


          cy.cadastrarUsuario(nome, email, senha)
               .then((response) => {
                    expect(response.status).to.equal(201)
                    expect(response.body.message).to.equal('Cadastro realizado com sucesso')
 
                    cy.cadastrarUsuario(nome2, email, senha2)
                         .then((response) => {
                              expect(response.status).to.equal(400)
                              expect(response.body.message).to.equal('Este email já está sendo usado')
                         })
               });
     });


it('Deve editar um usuário previamente cadastrado', () => {
     let nome = faker.person.firstName()
     let email = faker.internet.email()
     let senha = faker.internet.password()
     let nome2 = faker.person.firstName()
     let senha2 = faker.internet.password()


     cy.cadastrarUsuario(nome, email, senha)
          .then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               let id = response.body._id
               cy.request({
                    method: 'PUT',
                    url: `usuarios/${id}`,
                    body: {
                         "nome": nome2,
                         "email": email,
                         "password": senha2,
                         "administrador": "true"
                    }
               })
                    .then((response) => {
                         expect(response.status).to.equal(200)
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                    })

          });

});

it('Deve deletar um usuário previamente cadastrado', () => {
     let nome = faker.person.firstName()
     let email = faker.internet.email()
     let senha = faker.internet.password()


     cy.cadastrarUsuario(nome, email, senha)
          .then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               let id = response.body._id
               cy.request({
                    method: 'DELETE',
                    url: `usuarios/${id}`,

               })
                    .then((response) => {
                         expect(response.status).to.equal(200)
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                    })

          });
});


     });
