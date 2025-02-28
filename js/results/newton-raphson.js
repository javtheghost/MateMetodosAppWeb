function newtonRaphsonResult({
  form_data,
  decimales,
  result
}) {
  const {
    'nr-x': x,
    'nr-f': f,
  } = form_data

  const iterResults = newtonRaphson({
    decimales: parseInt(decimales),
    x0: parseFloat(x),
    f
  })

  if (!iterResults) return

  const resultsPerPage = 10  // Número de resultados por página
  let currentPage = 1  // Página actual

  // Función para mostrar los resultados de la página actual
  function showResultsPage(page) {
    const startIdx = (page - 1) * resultsPerPage
    const endIdx = page * resultsPerPage
    const resultsToShow = iterResults.slice(startIdx, endIdx)

    let $tbody = $('#nr-body-table')
    $tbody.empty()

    // Llenamos la tabla con los resultados de la página actual
    resultsToShow.forEach(result => {
      let $tr = $('<tr>')

      $tr.append($('<td>').text(result.paso))
      $tr.append($('<td>').text(result.x))
      $tr.append($('<td>').text(result.f))
      $tr.append($('<td>').text(result.error))

      $tbody.append($tr)
    })

    // Actualizamos la paginación
    updatePagination(page)
  }

  // Función para actualizar la paginación
  function updatePagination(page) {
    const totalPages = Math.ceil(iterResults.length / resultsPerPage)
    
    // Mostrar u ocultar botones según la página actual
    $('#pagination').empty()

    // Botón de "Anterior"
    const prevDisabled = page <= 1 ? 'disabled' : ''
    $('#pagination').append(`<button class="page-btn ${prevDisabled}" data-page="${page - 1}">Anterior</button>`)

    // Botones de las páginas
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = (i === page) ? 'active' : ''
      $('#pagination').append(`<button class="page-btn ${activeClass}" data-page="${i}">${i}</button>`)
    }

    // Botón de "Siguiente"
    const nextDisabled = page >= totalPages ? 'disabled' : ''
    $('#pagination').append(`<button class="page-btn ${nextDisabled}" data-page="${page + 1}">Siguiente</button>`)

    // Añadir evento de clic a los botones de paginación
    $('.page-btn').on('click', function () {
      const page = parseInt($(this).data('page'))
      if (!$(this).hasClass('disabled')) {
        showResultsPage(page)
      }
    })
  }

  result.load('components/tables/newton-raphson-table.html', function () {
    // Mostrar la primera página al cargar la tabla
    showResultsPage(currentPage)
  })
}
