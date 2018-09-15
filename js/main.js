(function () {
  "use strict";

  document.addEventListener('DOMContentLoaded', function () {

    var mapa = document.getElementById('mapa');

    if (mapa) {
      var map = L.map('mapa').setView([36.680832, -6.116391], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      L.marker([36.680832, -6.116391]).addTo(map)
        .bindTooltip('CZWebCamp')
        .openTooltip();
    }

  });
})();


$(function () {

  // Programa de conferencias
  $('.programa-evento .info-curso:first').show();
  $('.menu-programa a:first').addClass('activo');

  $('.menu-programa a').click(function (e) {
    e.preventDefault();

    $('.menu-programa a').removeClass('activo');
    $(this).addClass('activo');
    $('.ocultar').hide();
    var enlace = $(this).attr('href');
    $(enlace).fadeIn(1000);
  });

  // Números animados
  $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
  $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
  $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1200);
  $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1200);

  // Cuenta regresiva
  $('.cuenta-regresiva').countdown('2018/11/10 09:00:00', function(event) {
    $('#dias').html(event.strftime('%D'));
    $('#horas').html(event.strftime('%H'));
    $('#minutos').html(event.strftime('%M'));
    $('#segundos').html(event.strftime('%S'));
  })

});
