function eulerResult({
  decimales,
  form_data,
  result
}) {
  const {
    'em-iteraciones': iteraciones,
    'em-paso': paso,
    'em-x': x,
    'em-y': y,
    'em-f': f,
  } = form_data

  const res = eulerMejorado({
    decimales: parseInt(decimales),
    iteraciones: parseInt(iteraciones),
    h: parseFloat(paso),
    xn: parseFloat(x),
    yn: parseFloat(y),
    f
  })

  console.log("Resultados generados:", res); // Depuración

  result.load('components/tables/euler-table.html', function () {
    let $tbody = $('#euler-body-table')

    console.log("Cuerpo de la tabla:", $tbody); // Depuración

    $tbody.empty()

    for (let i = 0; i < res.x.length; i++) {
      let $tr = $('<tr>')

      $tr.append($('<td>').text(i + 1)) // Iteración
      $tr.append($('<td>').text(res.x[i])) // x{n}
      $tr.append($('<td>').text(res.aprox[i])) // Aproximación
      $tr.append($('<td>').text(res.fxy[i])) // f(x, y)
      $tr.append($('<td>').text(res.dy[i])) // dy
      $tr.append($('<td>').text(res.yn1[i])) // y{n+1}

      $tbody.append($tr)
    }

    console.log("Tabla actualizada con nuevos resultados"); // Depuración
  })
}