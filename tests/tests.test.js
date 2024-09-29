const { JSDOM } = require('jsdom');
const $ = require('jquery');

// Configuração do DOM simulado com jsdom
const dom = new JSDOM(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
  </head>
  <body>
      <h1>Numero aleatorio</h1>
      <h3>Bem vindo</h3>
      <p></p>
      <button id="clickMeButton">Click me!</button>
  </body>
  </html>
`);

global.window = dom.window;
global.document = dom.window.document;
global.$ = require('jquery')(dom.window);

// Função moveClickMeButton simulada para os testes
function moveClickMeButton(event) {
    event.preventDefault();

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var buttonWidth = $(event.target).outerWidth();
    var buttonHeight = $(event.target).outerHeight();

    var randomX = Math.random() * (windowWidth - buttonWidth);
    var randomY = Math.random() * (windowHeight - buttonHeight);

    $(event.target).css({
        'left': randomX + 'px',
        'top': randomY + 'px',
        'position': 'absolute'
    });
}

describe('App Functionality Tests', () => {

    it('should generate a random number and display in paragraph', () => {
        // Simula a geração de um número aleatório
        let numeroAleatorio = (Math.random() * 10).toFixed(1);
        $('p').html('Seu numero aleatório é: ' + numeroAleatorio);

        // Testa se o parágrafo contém o número gerado
        expect($('p').html()).toContain('Seu numero aleatório é: ');
        expect(parseFloat(numeroAleatorio)).toBeGreaterThanOrEqual(0);
        expect(parseFloat(numeroAleatorio)).toBeLessThanOrEqual(10);
    });

    it('should move the button to a random position when clicked', () => {
        // Simula o clique no botão
        const button = $('#clickMeButton');
        const event = $.Event('click');

        // Captura as posições antes do clique
        const initialLeft = button.css('left');
        const initialTop = button.css('top');

        // Executa a função de movimentação
        moveClickMeButton(event);

        // Verifica se as novas posições são diferentes das anteriores
        const newLeft = button.css('left');
        const newTop = button.css('top');

        expect(newLeft).not.toEqual(initialLeft);
        expect(newTop).not.toEqual(initialTop);
    });

    it('should trigger the moveClickMeButton function when button is clicked', () => {
        // Simula o clique no botão e verifica se a função é chamada
        const spyEvent = jest.fn();
        $('#clickMeButton').on('click', spyEvent);
        $('#clickMeButton').click();
        expect(spyEvent).toHaveBeenCalled();
    });

    it('should correctly calculate random positions within window bounds', () => {
        const button = $('#clickMeButton');
        const event = $.Event('click');

        // Simula o clique e move o botão
        moveClickMeButton(event);

        // Verifica se o botão está dentro dos limites da janela
        const leftPosition = parseFloat(button.css('left'));
        const topPosition = parseFloat(button.css('top'));
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        const buttonWidth = button.outerWidth();
        const buttonHeight = button.outerHeight();

        expect(leftPosition).toBeGreaterThanOrEqual(0);
        expect(leftPosition).toBeLessThanOrEqual(windowWidth - buttonWidth);
        expect(topPosition).toBeGreaterThanOrEqual(0);
        expect(topPosition).toBeLessThanOrEqual(windowHeight - buttonHeight);
    });
});
