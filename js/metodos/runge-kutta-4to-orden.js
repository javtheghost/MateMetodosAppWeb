function rungeKutta({ decimales, h, xn, yn, yf, f }) {
  let arrX = []; // Almacena los valores de x
  let arrY = []; // Almacena los valores de y
  let iteraciones = []; // Almacena los detalles de cada iteración

  let paso = 0;

  // Función para redondear un número a un número específico de decimales
  function redondear(numero, decimales) {
    const factor = Math.pow(10, decimales);
    return Math.round(numero * factor) / factor;
  }

  // Ejecutar hasta que xn alcance o supere yf
  while (xn < yf) {
    // Calcular los valores de k1, k2, k3, k4
    let k1 = h * math.evaluate(f, { x: xn, y: yn });
    let k2 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k1 / 2 });
    let k3 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k2 / 2 });
    let k4 = h * math.evaluate(f, { x: xn + h, y: yn + k3 });

    // Calcular el valor de y{n+1} sin redondear aún
    let yn1 = yn + (k1 + 2 * k2 + 2 * k3 + k4) / 6;

    // Almacenar los valores de la iteración actual
    iteraciones.push({
      paso: ++paso,
      xn: redondear(xn, decimales), // Redondear xn
      yn: redondear(yn, decimales), // Redondear yn
      k1: redondear(k1, decimales), // Redondear k1
      k2: redondear(k2, decimales), // Redondear k2
      k3: redondear(k3, decimales), // Redondear k3
      k4: redondear(k4, decimales), // Redondear k4
      yn1: redondear(yn1, decimales), // Redondear yn1
    });

    // Actualizar xn y yn para la siguiente iteración
    xn = redondear(xn + h, decimales); // Redondear xn
    yn = yn1; // Usar yn1 sin redondear para los cálculos internos
  }

  // Retornar los resultados
  return { x: arrX, y: arrY, iteraciones };
}