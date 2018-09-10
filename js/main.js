(function () {
  "use strict";
  var regalo = document.getElementById('regalo');

  document.addEventListener('DOMContentLoaded', function () {
    //Pagos y extras


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

  });
})();
