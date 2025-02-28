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
  } = form_data

  const res = rungeKutta({
    decimales: parseInt(decimales),
    h: parseFloat(paso),
    xn: parseFloat(x0),
    yn: parseFloat(y),
    yf: parseFloat(yn),
    f
  })

  result.load('components/tables/runge-kutta-table.html', function () {
    let $tbody = $('#rk4o-body-table')

    $tbody.empty()

    for (let i = 0; i < res.x.length; i++) {
      let $tr = $('<tr>')

      $tr.append($('<td>').text(i + 1))

      $tr.append($('<td>').text(res.x[i]))

      $tr.append($('<td>').text(res.y[i]))

      $tbody.append($tr)
    }
  })
}