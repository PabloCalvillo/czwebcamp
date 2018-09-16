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
        .bindPopup('<b>CZWebCamp<br><a href="https://www.google.es/maps/dir//Plaza+Princi+Jerez,+7" target="_blank">Cómo llegar</a></b>')
        .openPopup()

      map.scrollWheelZoom.disable();
      map.on('focus', () => {
        map.scrollWheelZoom.enable();
      });
      map.on('blur', () => {
        map.scrollWheelZoom.disable();
      });

    }

    if (document.getElementById('calcular-total')) {
      //Datos usuario
      var nombre = document.getElementById('nombre');
      var apellidos = document.getElementById('apellidos');
      var email = document.getElementById('email');

      //Pases
      var pase_dia = document.getElementById('pase_dia');
      var pase_dosdias = document.getElementById('pase_dosdias');
      var pase_completo = document.getElementById('pase_completo');

      //Extras
      var camisas = document.getElementById('camisa_evento');
      var pegatinas = document.getElementById('pegatinas');
      var regalo = document.getElementById('regalo');

      //Botones y divs
      var calcular = document.getElementById('calcular-total');
      var botonRegistro = document.getElementById('botonRegistro');
      var errorDiv = document.getElementById('error');
      var resultado = document.getElementById('lista-productos');
      var precioTotal = document.getElementById('suma-total');

      calcular.addEventListener('click', calcularTotal);
      pase_dia.addEventListener('blur', mostrarDias);
      pase_dosdias.addEventListener('blur', mostrarDias);
      pase_completo.addEventListener('blur', mostrarDias);

      nombre.addEventListener('blur', validarCampos);
      apellidos.addEventListener('blur', validarCampos);
      email.addEventListener('blur', validarCampos);
      email.addEventListener('blur', validarCorreo);

      function validarCampos() {
        if (this.value == '') {
          errorDiv.style.display = 'block';
          errorDiv.innerHTML = 'Estos campos son obligatorios';
          this.style.border = '1px solid red';
        } else {
          errorDiv.style.display = 'none';
          this.style.border = '1px solid rgb(169, 169, 169)';
        }
      }

      function validarCorreo() {
        if (this.value.indexOf("@") > -1 && (this.value.indexOf(".com") > -1 || this.value.indexOf(".es") > -1)) {
          errorDiv.style.display = 'none';
          this.style.border = '1px solid rgb(169, 169, 169)';
        } else {
          errorDiv.style.display = 'block';
          errorDiv.innerHTML = 'Email no válido';
          this.style.border = '1px solid red';
        }

      }

      //Calcular total
      function calcularTotal(event) {
        event.preventDefault;

        if (nombre.value == '' || apellidos.value == '' || email.value == '') {
          alert('Faltan campos por rellenar');
          errorDiv.style.display = 'block';
          errorDiv.innerHTML = 'Estos campos son obligatorios';
        } else {
          if (email.value.indexOf("@") > -1 && (email.value.indexOf(".com") > -1 || email.value.indexOf(".es") > -1)) {
            errorDiv.style.display = 'none';
            this.style.border = '1px solid rgb(169, 169, 169)';
            var pasesDia = pase_dia.value,
              pasesDosDias = pase_dosdias.value,
              pasesCompletos = pase_completo.value;
            var totalPases = (pasesDia * 30) + (pasesDosDias * 45) + (pasesCompletos * 50);
            if (totalPases === 0) {
              alert('Elige al menos 1 pase');
              resultado.innerHTML = '';
              precioTotal.innerHTML = '';

            } else {
              if (regalo.value === '') {
                alert('Debes elegir un regalo');
                regalo.focus();
              } else {

                //Datos
                var nombreCliente = nombre.value;
                var apellidosCliente = apellidos.value;
                var emailCliente = email.value;

                //Extras
                var cantCamisas = camisas.value;
                var cantPegatinas = pegatinas.value;
                var totalExtras = (10 - (10 * 0.1)) * cantCamisas + (cantPegatinas * 2);

                //Total
                var totalPagar = totalPases + totalExtras;

                //Lista productos
                var listadoPedido = [];
                listadoPedido.push('<span>Datos</span>');
                listadoPedido.push(`Nombre: ${nombreCliente} ${apellidosCliente}`);
                listadoPedido.push(`Email: ${emailCliente}`);
                listadoPedido.push('<span>Pedido</span>');

                if (pasesDia >= 1) {
                  listadoPedido.push(`Pase por 1 día (${pasesDia})`);
                }
                if (pasesDosDias >= 1) {
                  listadoPedido.push(`Pase por 2 días (${pasesDosDias})`);
                }
                if (pasesCompletos >= 1) {
                  listadoPedido.push(`Pase completo (${pasesCompletos})`);
                }

                if (cantCamisas >= 1) {
                  listadoPedido.push(`Camisa (${cantCamisas})`);
                }

                if (cantPegatinas >= 1) {
                  listadoPedido.push(`Pegatinas (${cantPegatinas})`);
                }

                switch (regalo.value) {
                  case 'CRO':
                    listadoPedido.push('Regalo (Cromos)');
                    break;
                  case 'PUL':
                    listadoPedido.push('Regalo (Pulseras)');
                    break;
                  case 'CHA':
                    listadoPedido.push('Regalo (Chapas)');
                    break;
                }

              }
              resultado.innerHTML = '';
              for (var i = 0; i < listadoPedido.length; i++) {
                resultado.innerHTML += listadoPedido[i] + '<br/>';
              }

              precioTotal.innerHTML = totalPagar + '€';
            }
          } else {
            errorDiv.style.display = 'block';
            alert('Email no válido');
            errorDiv.innerHTML = 'Email no válido';
            this.style.border = '1px solid red';
          }

        }

      }

      //Mostrar días
      function mostrarDias() {
        var eventos = document.getElementById('eventos');
        var pasesPorDia = pase_dia.value,
          pasesPorDosDias = pase_dosdias.value,
          paseCompleto = pase_completo.value;

        var diasSeleccionados = [];

        if (pasesPorDia >= 1) {
          diasSeleccionados.push('viernes');
        } else {
          document.getElementById('viernes').style.display = 'none';
        }
        if (pasesPorDosDias >= 1) {
          diasSeleccionados.push('viernes', 'sabado');
        } else {
          document.getElementById('viernes').style.display = 'none';
          document.getElementById('sabado').style.display = 'none';
        }
        if (paseCompleto >= 1) {
          diasSeleccionados.push('viernes', 'sabado', 'domingo');
        } else {
          document.getElementById('viernes').style.display = 'none';
          document.getElementById('sabado').style.display = 'none';
          document.getElementById('domingo').style.display = 'none';

        }

        if (pasesPorDia + pasesPorDosDias + paseCompleto >= 1) {
          document.getElementById('eventos').style.display = 'block';
          for (var i = 0; i < diasSeleccionados.length; i++) {
            document.getElementById(diasSeleccionados[i]).style.display = 'block';
          }
        } else {
          document.getElementById('eventos').style.display = 'none';
        }
      }
    }

  });
})();


$(function () {

      // Lettering
      $('.nombre-sitio').lettering();

      // Menu fijo
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        var barraAltura = $('.barra').innerHeight();
        if (scroll > windowHeight) {
          $('.barra').addClass('fixed');
          $('body').css({
            'margin-top': barraAltura + 'px'
          });
        } else {
          $('.barra').removeClass('fixed');
          $('body').css({
            'margin-top': '0px'
          });
        }
      });

      // Menu movil
      $('.menu-movil').click(function () {
        $('.navegacion-principal').slideToggle();

      });

      if (document.getElementById('talleres')) {
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

          // Numeros animados
          var resumenLista = $('.resumen-evento');
          if (resumenLista.length > 0) {
            $('.resumen-evento').waypoint(function () {
              $('.resumen-evento li:nth-child(1) p').animateNumber({
                number: 6
              }, 1200);
              $('.resumen-evento li:nth-child(2) p').animateNumber({
                number: 15
              }, 1200);
              $('.resumen-evento li:nth-child(3) p').animateNumber({
                number: 3
              }, 1200);
              $('.resumen-evento li:nth-child(4) p').animateNumber({
                number: 9
              }, 1200);
            }, {
              offset: '85%'
            });
          }

          // Cuenta regresiva
          $('.cuenta-regresiva').countdown('2018/11/10 09:00:00', function (event) {
            $('#dias').html(event.strftime('%D'));
            $('#horas').html(event.strftime('%H'));
            $('#minutos').html(event.strftime('%M'));
            $('#segundos').html(event.strftime('%S'));
          })
        }



      });
