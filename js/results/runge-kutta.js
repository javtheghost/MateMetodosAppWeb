function rungeKuttaResult({ decimales, form_data, result }) {
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

  console.log("Datos devueltos por rungeKutta:", res); // Depuración

  if (!res.iteraciones || res.iteraciones.length === 0) {
    console.error("No se generaron iteraciones.");
    return;
  }

  // Insertar el HTML de la tabla directamente en el contenedor "result"
  const tableHtml = `
    <div class="table-scroll-container">
      <h1 class="text-primary">Resultados:</h1>
      <table id="rungeKuttaTable" class="display">
        <thead>
          <tr>
            <th>n</th>
            <th>x{n}</th>
            <th>y{n}</th>
            <th>k1</th>
            <th>k2</th>
            <th>k3</th>
            <th>k4</th>
            <th>y{n+1}</th>
          </tr>
        </thead>
        <tbody id="rk4o-body-table"></tbody>
      </table>
    </div>
  `;
  result.html(tableHtml); // Insertar la tabla en el DOM

  let $table = $('#rungeKuttaTable');
  let $tbody = $('#rk4o-body-table');

  // Esperar a que la tabla esté en el DOM antes de llenarla
  setTimeout(() => {
    if ($tbody.length === 0) {
      console.error("No se encontró #rk4o-body-table en el DOM.");
      return;
    }

    $tbody.empty();

    res.iteraciones.forEach(iteracion => {
      let $tr = $('<tr>');

      $tr.append($('<td>').text(iteracion.paso)); 
      $tr.append($('<td>').text(iteracion.xn.toFixed(decimales))); 
      $tr.append($('<td>').text(iteracion.yn.toFixed(decimales))); 
      $tr.append($('<td>').text(iteracion.k1.toFixed(decimales))); 
      $tr.append($('<td>').text(iteracion.k2.toFixed(decimales))); 
      $tr.append($('<td>').text(iteracion.k3.toFixed(decimales))); 
      $tr.append($('<td>').text(iteracion.k4.toFixed(decimales))); 
      $tr.append($('<td>').text(iteracion.yn1.toFixed(decimales))); 

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
