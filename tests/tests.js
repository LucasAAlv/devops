describe('Random Number Generation', function() {
    it('should generate a number between 0.0 and 10.0', function() {
      let numeroAleatorio = (Math.random() * 10).toFixed(1);
      expect(parseFloat(numeroAleatorio)).toBeGreaterThanOrEqual(0.0);
      expect(parseFloat(numeroAleatorio)).toBeLessThanOrEqual(10.0);
    });
  });
  
  describe('Update paragraph with random number', function() {
    it('should update the paragraph with a random number', function() {
      let numero = $('p');
      let numeroAleatorio = (Math.random() * 10).toFixed(1);
      numero.html('Seu numero aleatório é: ' + numeroAleatorio);
      expect(numero.html()).toContain('Seu numero aleatório é: ');
      expect(numero.html()).toContain(numeroAleatorio);
    });
  });
  
  describe('Button Move on Click', function() {
    it('should move the button to a random position within the window', function() {
      let button = $('#clickMeButton');
      let event = $.Event('click');
      
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var buttonWidth = button.outerWidth();
      var buttonHeight = button.outerHeight();
      
      button.trigger(event); // Simula o clique
      
      let leftPosition = parseFloat(button.css('left'));
      let topPosition = parseFloat(button.css('top'));
      
      expect(leftPosition).toBeGreaterThanOrEqual(0);
      expect(leftPosition).toBeLessThanOrEqual(windowWidth - buttonWidth);
      expect(topPosition).toBeGreaterThanOrEqual(0);
      expect(topPosition).toBeLessThanOrEqual(windowHeight - buttonHeight);
    });
  });
  
  describe('Button Click Event', function() {
    it('should trigger the moveClickMeButton function on click', function() {
      let spyEvent = spyOnEvent('#clickMeButton', 'click');
      $('#clickMeButton').click();
      expect(spyEvent).toHaveBeenTriggered();
    });
  });
  