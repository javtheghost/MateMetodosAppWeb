function eulerResult({ decimales, form_data, result }) {
  const {
    'em-iteraciones': xn,
    'em-paso': paso,
    'em-x': x0,
    'em-y': y0,
    'em-f': f,
  } = form_data;

  // Calcular el número de iteraciones necesarias
  const h = parseFloat(paso);
  const xInicial = parseFloat(x0);
  const xFinal = parseFloat(xn);
  const iteraciones = Math.ceil((xFinal - xInicial) / h); // Redondear hacia arriba

  const res = eulerMejorado({
    decimales: parseInt(decimales),
    iteraciones: iteraciones,
    h: h,
    xn: xInicial,
    yn: parseFloat(y0),
    f
  });

  // Insertar el HTML de la tabla directamente en el contenedor "result"
  const tableHtml = `
    <div class="table-scroll-container">
      <table id="euler-table" class="display">
          <thead>
              <tr class="text-primary">
                  <th>n</th>
                  <th>x{n}</th>
                  <th>Aproximación</th>
                  <th>f(x, y)</th>
                  <th>dy</th>
                  <th>y{n+1}</th>
              </tr>
          </thead>
          <tbody id="euler-body-table">
          </tbody>
      </table>
    </div>
  `;
  result.html(tableHtml);

  let $table = $('#euler-table');
  let $tbody = $('#euler-body-table');

  console.log("Cuerpo de la tabla:", $tbody); // Depuración

  // Si DataTable ya está inicializado, destruirlo antes de continuar
  if ($.fn.DataTable.isDataTable($table)) {
    $table.DataTable().destroy();
  }

  $tbody.empty(); // Vaciar filas anteriores

  // Agregar filas dinámicamente
  for (let i = 0; i < res.x.length; i++) {
    let $tr = $('<tr>');
    $tr.append($('<td>').text(i + 1));       // Iteración
    $tr.append($('<td>').text(res.x[i]));      // x{n}
    $tr.append($('<td>').text(res.aprox[i]));  // Aproximación
    $tr.append($('<td>').text(res.fxy[i]));    // f(x, y)
    $tr.append($('<td>').text(res.dy[i]));     // dy
    $tr.append($('<td>').text(res.yn1[i]));    // y{n+1}

    $tbody.append($tr);
  }

  // Inicializar DataTables
  $table.DataTable({
    paging: false,             // Desactiva la paginación
    scrollY: '300px',          // Scroll vertical con altura fija
    scrollX: true,             // Scroll horizontal
    scrollCollapse: true,      // Colapsar el scroll si no hay suficientes datos
    searching: false,          // Desactiva la búsqueda
    info: false,               // Oculta la información de la tabla
    fixedHeader: true,         // Habilita el encabezado fijo
    autoWidth: false,          // Desactiva el ajuste automático del ancho
    columnDefs: [
      { width: '10%', targets: 0 }, // Ancho de la columna 'n'
      { width: '20%', targets: 1 }, // Ancho de la columna 'x{n}'
      { width: '20%', targets: 2 }, // Ancho de la columna 'Aproximación'
      { width: '20%', targets: 3 }, // Ancho de la columna 'f(x, y)'
      { width: '15%', targets: 4 }, // Ancho de la columna 'dy'
      { width: '15%', targets: 5 }, // Ancho de la columna 'y{n+1}'
    ]
  });
}