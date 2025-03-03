var m = $('#method');
const decimalSlider = `
  <div class="form-group" id="decimal-slider">
    <label class="font-weight-bold text-primary" for="decimales">Número de decimales de precisión:</label>
    <input type="range" id="decimales" name="decimales" min="0" max="10" step="1" value="2" class="form-control-range">
    <span id="decimal-value" class="font-weight-bold" style="font-size: 24px; margin-left: 10px;">2</span>
  </div>
`;

const methods = {
  eulerMejorado: {
    div: $('.euler-mejorado'),
    inputs: ['#em-iteraciones', '#em-paso', '#em-x', '#em-y', '#em-f']
  },
  
  newtonRaphson: {
    div: $('.newton-raphson'),
    inputs: ['#nr-x', '#nr-f'],
    load: $('.newton-raphson').load('components/form/newton-raphson.html')
  },
  rungeKutta: {
    div: $('.runge-kutta-4to-orden'),
    inputs: ['#rk4o-paso', '#rk4o-x0', '#rk4o-y', '#rk4o-yn', '#rk4o-f'],
    load: $('.runge-kutta-4to-orden').load('components/form/runge-kutta.html')
  }
};

// Método de cambio
function change() {
  var method = m.val();

  // Limpiar resultados al cambiar de método
  $('#result-content').empty();

  // Agregar el campo de decimales solo si se selecciona un método válido
  if (method.toUpperCase() !== 'NA' && method !== 'eulerMejorado') {
    if (!$('#decimal-slider').length) {
      $('#method').closest('.form-group').after(decimalSlider); // Agrega el campo después del select
    }
  } else {
    $('#decimal-slider').remove(); // Elimina el campo si no se selecciona un método válido o es Euler Mejorado
  }

  const value = method.toUpperCase() === 'NA';

  $('#decimales').prop('disabled', value);
  $('#calcular').prop('disabled', value);

  $('#decimales').val('2'); // Establecer el valor por defecto
  $('#decimal-value').text('2'); // Mostrar el valor por defecto

  // Actualizar el valor del slider
  $('#decimales').on('input', function () {
    $('#decimal-value').text($(this).val()); // Mostrar el valor actual del slider
  });

  // Limpiar inputs de otros métodos
  for (var key in methods) {
    methods[key].inputs.forEach(function (input) {
      $(input).val('');
    });

    if (key === method) {
      methods[method].load;
      methods[method].div.show();
      methods[method].inputs.forEach(function (input) {
        $(input).attr('required', 'required');
      });
    } else {
      methods[key].div.hide();
      methods[key].inputs.forEach(function (input) {
        $(input).removeAttr('required');
      });
    }
  }
}

// Inicializar el cambio
change();
m.change(change);

// Manejar el clic en el botón "Calcular"
$('#calcular').on('click', function () {
  const method = m.val();
  const decimales = $('#decimales').val(); // Obtener el valor actual del slider

  // Obtener los datos del formulario
  const form_data = {};
  methods[method].inputs.forEach(input => {
    const key = $(input).attr('name'); // Obtener el nombre del campo
    form_data[key] = $(input).val(); // Obtener el valor del campo
  });

  // Llamar a la función correspondiente según el método seleccionado
  if (method === 'rungeKutta') {
    rungeKuttaResult({ decimales, form_data, result: $('#result-content') });
  } else if (method === 'newtonRaphson') {
    newtonRaphsonResult({ decimales, form_data, result: $('#result-content') });
  } else if (method === 'eulerMejorado') {
    eulerMejoradoResult({ decimales, form_data, result: $('#result-content') });
  }
});