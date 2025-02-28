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

  result.load('components/tables/euler-table.html', function () {
    let $tbody = $('#euler-body-table')

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