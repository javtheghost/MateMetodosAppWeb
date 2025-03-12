function rungeKutta({ decimales, h, xn, yn, yf, f }) {
  let arrX = [];
  let arrY = [];
  let iteraciones = [];
  let paso = 0;

  function redondear(numero, decimales) {
    const factor = Math.pow(10, decimales);
    return Math.round(numero * factor) / factor;
  }

  let iteracionesTotales = Math.round((yf - xn) / h);

  for (let i = 0; i < iteracionesTotales; i++) {
    let k1 = h * math.evaluate(f, { x: xn, y: yn });
    let k2 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k1 / 2 });
    let k3 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k2 / 2 });
    let k4 = h * math.evaluate(f, { x: xn + h, y: yn + k3 });

    let yn1 = yn + (k1 + 2 * k2 + 2 * k3 + k4) / 6;

    iteraciones.push({
      paso: ++paso,
      xn: redondear(xn, decimales),
      yn: redondear(yn, decimales),
      k1: redondear(k1, decimales),
      k2: redondear(k2, decimales),
      k3: redondear(k3, decimales),
      k4: redondear(k4, decimales),
      yn1: redondear(yn1, decimales),
    });

    arrX.push(redondear(xn, decimales));
    arrY.push(redondear(yn, decimales));

    xn += h;
    yn = yn1;
  }

  return { x: arrX, y: arrY, iteraciones };
}
