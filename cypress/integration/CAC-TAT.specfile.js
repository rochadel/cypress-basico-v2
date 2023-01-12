/// <reference types="Cypress"/>

//define a suite de testes e define o caso de teste
describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    //TESTE 1
    it('preenche os campos obrigatórios', function(){
        const longtext = 'Testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1'
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Rochadel')
        cy.get('#email').type('rochadel.oficial@gmail.com')
        //cy.get('#open-text-area').type('texto exemplo') //ou
        cy.get('#open-text-area').type(longtext, {delay: 0})
        //cy.get('.button').click() ou cy.get('button["type=submit"]').click()
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible') //elemento com a classe success deve está visível
    })
    //TESTE 2
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        const longtext = 'Testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Rochadel')
        cy.get('#email').type('rochadel.oficial@@gmail.com')
        //cy.get('#open-text-area').type('texto exemplo') //ou
        cy.get('#open-text-area').type('Teste')
        //cy.get('.button').click() ou cy.get('button["type=submit"]').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') //elemento com a classe error deve está visível

    })
    //TESTE 3
    it('Campo telefone vazio quando preenchido com valor não numérico', function(){
        cy.get('#phone').type('abcdefghi').should('have.value', '')
    })
        
    //TESTE 4
    it('Exibe mensagem de erro quando o telefone se torna obrigatorio mas nao é preenchido antes do envio do do formulário', function(){
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Rochadel')
        cy.get('#email').type('rochadel.oficial@@gmail.com')
        //cy.get('#open-text-area').type('texto exemplo') //ou
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        //cy.get('.button').click() ou cy.get('button["type=submit"]').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') //elemento com a classe error deve está visível 

    })

    //TESTE 5
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Alexandre')
          .should('have.value', 'Alexandre')
          .clear()
          .should('have.value' ,'')
        cy.get('#lastName')
          .type('Rochadel')
          .should('have.value', 'Rochadel')
          .clear()
          .should('have.value' ,'')
        cy.get('#email')
          .type('rochadel.oficial@gmail.com')
          .should('have.value', 'rochadel.oficial@gmail.com')
          .clear()
          .should('have.value' ,'')
        cy.get('#open-text-area')
          .type('Teste')
          .should('have.value', 'Teste')
          .clear()
          .should('have.value' ,'')
    })

    //TESTE 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') //elemento com a classe error deve está visível 
    })

    it('preencher utilizando comandos customizados', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')    
    })

    //TESTE 7 - ESTE TESTE ENSINA A UTILIZAR CY.CONTAINS, INDO PELO ELEMENTO E SEU VALOR
    it('preenche os campos obrigatórios', function(){
        const longtext = 'Testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee1'
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Rochadel')
        cy.get('#email').type('rochadel.oficial@gmail.com')
        //cy.get('#open-text-area').type('texto exemplo') //ou
        cy.get('#open-text-area').type(longtext, {delay: 0})
        //cy.get('.button').click() ou cy.get('button["type=submit"]').click()
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible') //elemento com a classe success deve está visível
    })

    //TESTES DE CAIXA DE SELEÇÃO/LISTA SUSPENSA
    it('Seleciona um produto (Y0uTube) de um campo de seleção suspensa pelo seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
       
    it('Seleciona um produto (Mentoria) de um campo de seleção suspensa pelo seu valor', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) de um campo de seleção suspensa pelo seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //TESTES COM RADIOBUTTON
    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"]').check('feedback')
    })

    it('marca o tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length', 3).each(
            function ($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })
    
    //TESTES COM CHECKBOXES
    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatorio mas nao é preenchido antes do envio do do formulário', function(){
        cy.get('#firstName').type('Alexandre')
        cy.get('#lastName').type('Rochadel')
        cy.get('#email').type('rochadel.oficial@@gmail.com')
        //cy.get('#open-text-area').type('texto exemplo') //ou
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        //cy.get('.button').click() ou cy.get('button["type=submit"]').click()
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') //elemento com a classe error deve está visível 

    })
    //TESTES COM SELECT FILE 
    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    //TESTES COM DRAG AND DROP
    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    //TESTES COM fixture utilizando alias
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
          })
    })


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a').should('have.attr', 'target', '_blank').click()
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })
})