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
    const $tbody = $('#rk4o-body-table');
    const $pagination = $('#pagination'); // Contenedor para los botones de paginación
    const rowsPerPage = 10; // Número de filas por página
    let currentPage = 1; // Página actual

    // Función para mostrar las filas de la página actual
    const showPage = (page) => {
      $tbody.empty(); // Limpiar la tabla
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      const pageRows = res.iteraciones.slice(start, end); // Obtener filas de la página actual

      // Llenar la tabla con las filas de la página actual
      pageRows.forEach((iteracion) => {
        const $tr = $('<tr>');
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
    };

    // Función para actualizar los botones de paginación
    const updatePagination = () => {
      $pagination.empty(); // Limpiar los botones de paginación
      const totalPages = Math.ceil(res.iteraciones.length / rowsPerPage); // Calcular el total de páginas

      // Botón "Anterior"
      const $prevButton = $('<button>').text('Anterior').click(() => {
        if (currentPage > 1) {
          currentPage--;
          showPage(currentPage);
          updatePagination();
        }
      });
      $pagination.append($prevButton);

      // Botones de páginas
      for (let i = 1; i <= totalPages; i++) {
        const $pageButton = $('<button>').text(i).click(() => {
          currentPage = i;
          showPage(currentPage);
          updatePagination();
        });
        if (i === currentPage) {
          $pageButton.addClass('active'); // Resaltar la página actual
        }
        $pagination.append($pageButton);
      }

      // Botón "Siguiente"
      const $nextButton = $('<button>').text('Siguiente').click(() => {
        if (currentPage < totalPages) {
          currentPage++;
          showPage(currentPage);
          updatePagination();
        }
      });
      $pagination.append($nextButton);
    };

    // Mostrar la primera página al cargar
    showPage(currentPage);
    updatePagination();
  });
}