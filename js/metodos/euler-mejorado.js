function eulerMejorado({ decimales, iteraciones, h, xn, yn, f }) {
  let arrX = [];
  let arrY = [];
  let arrAprox = []; // Aproximación
  let arrFxy = [];   // f(x, y)
  let arrDy = [];    // dy
  let arrYn1 = [];   // y{n+1}

  // Función para redondear a 6 decimales
  function redondear(valor) {
    return parseFloat(valor.toFixed(6));
  }

  for (let i = 0; i < iteraciones; i++) {
    let xna = xn + h;

    // Calcular f(x, y)
    let fxy = math.evaluate(f, { x: xn, y: yn });
    arrFxy.push(redondear(fxy)); // Guardar redondeado a 6 decimales

    // Calcular yna (aproximación inicial)
    let yna = yn + h * fxy;
    arrAprox.push(redondear(yna)); // Guardar redondeado a 6 decimales

    // Calcular f(xna, yna)
    let fxy2 = math.evaluate(f, { x: xna, y: yna });

    // Calcular dy (corrección)
    let dy = (h * (fxy + fxy2)) / 2;
    arrDy.push(redondear(dy)); // Guardar redondeado a 6 decimales

    // Calcular y{n+1} (valor corregido)
    let yvar = yn + dy;
    arrYn1.push(redondear(yvar)); // Guardar redondeado a 6 decimales

    // Actualizar xn y yn para la siguiente iteración
    xn = xna;
    yn = yvar;

    // Guardar valores redondeados a 6 decimales
    arrX.push(redondear(xn));
    arrY.push(redondear(yn));
  }

  return {
    x: arrX,
    y: arrY,
    aprox: arrAprox,
    fxy: arrFxy,
    dy: arrDy,
    yn1: arrYn1
  };
}