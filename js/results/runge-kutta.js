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

  const iterResults = res.iteraciones; // Asumiendo que los resultados están en res.iteraciones
  const resultsPerPage = 10;  // Número de resultados por página
  let currentPage = 1;  // Página actual

  // Función para mostrar los resultados de la página actual
  function showResultsPage(page) {
    const startIdx = (page - 1) * resultsPerPage;
    const endIdx = page * resultsPerPage;
    const resultsToShow = iterResults.slice(startIdx, endIdx);

    let $tbody = $('#rk4o-body-table');
    $tbody.empty();

    // Llenar la tabla con los resultados de la página actual
    resultsToShow.forEach(iteracion => {
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

    // Actualizar la paginación
    updatePagination(page);
  }

  // Función para actualizar la paginación
  function updatePagination(page) {
    const totalPages = Math.ceil(iterResults.length / resultsPerPage);
    
    // Mostrar u ocultar botones según la página actual
    $('#pagination').empty();

    // Botón de "Anterior"
    const prevDisabled = page <= 1 ? 'disabled' : '';
    $('#pagination').append(`<button class="page-btn ${prevDisabled}" data-page="${page - 1}">Anterior</button>`);

    // Botones de las páginas
    for (let i = 1; i <= totalPages; i++) {
      const activeClass = (i === page) ? 'active' : '';
      $('#pagination').append(`<button class="page-btn ${activeClass}" data-page="${i}">${i}</button>`);
    }

    // Botón de "Siguiente"
    const nextDisabled = page >= totalPages ? 'disabled' : '';
    $('#pagination').append(`<button class="page-btn ${nextDisabled}" data-page="${page + 1}">Siguiente</button>`);

    // Añadir evento de clic a los botones de paginación
    $('.page-btn').on('click', function () {
      const page = parseInt($(this).data('page'));
      if (!$(this).hasClass('disabled')) {
        showResultsPage(page);
      }
    });
  }

  // Cargar la tabla y mostrar los resultados
  result.load('components/tables/runge-kutta-table.html', function () {
    // Mostrar la primera página al cargar la tabla
    showResultsPage(currentPage);
  });
}