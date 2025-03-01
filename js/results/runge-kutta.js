// resultrungekutta.js
function rungeKuttaResult({
  decimales,
  form_data,
  result
}) {
  const {
    'rk4o-paso': paso,
    'rk4o-x0': x0,
    'rk4o-y': y,
    'rk4o-yn': yn,
    'rk4o-f': f,
  } = form_data;

  // Llamar a la función rungeKutta para obtener los resultados
  const res = rungeKutta({
    decimales: parseInt(decimales),
    h: parseFloat(paso),
    xn: parseFloat(x0),
    yn: parseFloat(y),
    yf: parseFloat(yn),
    f
  });

  // Cargar la tabla y mostrar los resultados
  result.load('components/tables/runge-kutta-table.html', function () {
    let $tbody = $('#rk4o-body-table');
    $tbody.empty();

    // Llenar la tabla con los resultados
    res.iteraciones.forEach((iteracion) => {
      let $tr = $('<tr>');

      $tr.append($('<td>').text(iteracion.paso)); // Iteración
      $tr.append($('<td>').text(iteracion.xn)); // x{n}
      $tr.append($('<td>').text(iteracion.yn)); // y{n}
      $tr.append($('<td>').text(iteracion.k1)); // k1
      $tr.append($('<td>').text(iteracion.k2)); // k2
      $tr.append($('<td>').text(iteracion.k3)); // k3
      $tr.append($('<td>').text(iteracion.k4)); // k4
      $tr.append($('<td>').text(iteracion.yn1)); // y{n+1}

      $tbody.append($tr);
    });
  });
}