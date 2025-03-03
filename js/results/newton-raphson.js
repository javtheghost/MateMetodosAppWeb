function newtonRaphsonResult({ form_data, decimales, result }) {
  const {
    'nr-x': x,
    'nr-f': f,
  } = form_data;

  const iterResults = newtonRaphson({
    decimales: parseInt(decimales),
    x0: parseFloat(x),
    f
  });

  if (!iterResults) return;

  // Insertar el HTML de la tabla directamente en el contenedor "result"
  const tableHtml = `
    <div class="table-scroll-container">
      <h1 class="text-primary">Resultados:</h1>
      <table id="newtonRaphsonTable" class="display">
        <thead>
          <tr class="text-primary">
            <th>Paso</th>
            <th>X</th>
            <th>F(X)</th>
            <th>|x(i) - x(i-1)|</th>
          </tr>
        </thead>
        <tbody id="nr-body-table">
        </tbody>
      </table>
    </div>
  `;
  result.html(tableHtml); // Insertar la tabla en el DOM

  let $table = $('#newtonRaphsonTable');
  let $tbody = $('#nr-body-table');

  // Esperar a que la tabla esté en el DOM antes de llenarla
  setTimeout(() => {
    if ($tbody.length === 0) {
      console.error("No se encontró #nr-body-table en el DOM.");
      return;
    }

    $tbody.empty();

    iterResults.forEach(result => {
      let $tr = $('<tr>');

      $tr.append($('<td>').text(result.paso));
      $tr.append($('<td>').text(result.x.toFixed(decimales)));
      $tr.append($('<td>').text(result.f.toFixed(decimales)));
      $tr.append($('<td>').text(result.error));

      $tbody.append($tr);
    });

    console.log("Filas agregadas:", $tbody.children().length);

    // Inicializar DataTables con scroll y sin paginación
    if ($.fn.DataTable.isDataTable($table)) {
      $table.DataTable().destroy();
    }

    $table.DataTable({
      paging: false,             // Desactiva la paginación
      scrollY: '300px',          // Scroll vertical
      scrollX: true,             // Scroll horizontal
      scrollCollapse: true,      // Colapsar el scroll si no hay suficientes datos
      searching: false,          // Desactiva la búsqueda
      info: false,               // Oculta la información de la tabla
      fixedHeader: true,         // Habilita el encabezado fijo
      autoWidth: false,
    });

  }, 100); // Esperar 100ms para asegurar que el HTML está cargado en el DOM
}
