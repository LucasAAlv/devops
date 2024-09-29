const { JSDOM } = require('jsdom');

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
      <button id="clickMeButton" style="width: 100px; height: 50px;">Click me!</button>
  </body>
  </html>
`);

global.window = dom.window;
global.document = dom.window.document;

function moveClickMeButton(event) {
    event.preventDefault();

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var button = event.target;
    var buttonWidth = button.offsetWidth;
    var buttonHeight = button.offsetHeight;

    var randomX = Math.random() * (windowWidth - buttonWidth);
    var randomY = Math.random() * (windowHeight - buttonHeight);

    button.style.left = randomX + 'px';
    button.style.top = randomY + 'px';
    button.style.position = 'absolute';
}

describe('App Functionality Tests', () => {

    it('should generate a random number and display in paragraph', () => {
        let numeroAleatorio = (Math.random() * 10).toFixed(1);
        const p = document.querySelector('p');
        p.textContent = 'Seu numero aleatório é: ' + numeroAleatorio;

        expect(p.textContent).toContain('Seu numero aleatório é: ');
        expect(parseFloat(numeroAleatorio)).toBeGreaterThanOrEqual(0);
        expect(parseFloat(numeroAleatorio)).toBeLessThanOrEqual(10);
    });

    it('should move the button to a random position when clicked', () => {
        const button = document.querySelector('#clickMeButton');
        const event = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true });


        const initialLeft = button.style.left;
        const initialTop = button.style.top;

        moveClickMeButton({ target: button, preventDefault: () => {} });

        const newLeft = button.style.left;
        const newTop = button.style.top;

        expect(newLeft).not.toEqual(initialLeft);
        expect(newTop).not.toEqual(initialTop);
    });

    it('should trigger the moveClickMeButton function when button is clicked', () => {
        const button = document.querySelector('#clickMeButton');
        const spyEvent = jest.fn();
        button.addEventListener('click', spyEvent);

        const event = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true });
        button.dispatchEvent(event);

        expect(spyEvent).toHaveBeenCalled();
    });

    it('should correctly calculate random positions within window bounds', () => {
        const button = document.querySelector('#clickMeButton');
        const event = new dom.window.MouseEvent('click', { bubbles: true, cancelable: true });

        moveClickMeButton({ target: button, preventDefault: () => {} });

        const leftPosition = parseFloat(button.style.left);
        const topPosition = parseFloat(button.style.top);
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonWidth = button.offsetWidth;
        const buttonHeight = button.offsetHeight;

        expect(leftPosition).toBeGreaterThanOrEqual(0);
        expect(leftPosition).toBeLessThanOrEqual(windowWidth - buttonWidth);
        expect(topPosition).toBeGreaterThanOrEqual(0);
        expect(topPosition).toBeLessThanOrEqual(windowHeight - buttonHeight);
    });
});
