let numero = $('p');

let numeroAleatorio = (Math.random()* 10).toFixed(1) ;

numero.html('Seu numero aleatório é: ' + numeroAleatorio)

$(document).ready(function(){$('#clickMeButton').click(moveClickMeButton)})

function moveClickMeButton(event){
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

