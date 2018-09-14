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
})
