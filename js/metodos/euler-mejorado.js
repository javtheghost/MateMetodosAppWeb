function eulerMejorado({ decimales, iteraciones, h, xn, yn, f }) {
  let arrX = []
  let arrY = []
  let arrAprox = [] // Aproximación
  let arrFxy = []   // f(x, y)
  let arrDy = []    // dy
  let arrYn1 = []   // y{n+1}

  for (let i = 0; i < iteraciones; i++) {
    let xna = xn + h

    // Calcular f(x, y)
    let fxy = math.evaluate(f, { x: xn, y: yn })
    arrFxy.push(fxy) // Guardar sin redondeo

    // Calcular yna (aproximación inicial)
    let yna = yn + h * fxy
    arrAprox.push(yna) // Guardar sin redondeo

    // Calcular f(xna, yna)
    let fxy2 = math.evaluate(f, { x: xna, y: yna })

    // Calcular dy (corrección)
    let dy = (h * (fxy + fxy2)) / 2
    arrDy.push(dy) // Guardar sin redondeo

    // Calcular y{n+1} (valor corregido)
    let yvar = yn + dy
    arrYn1.push(yvar) // Guardar sin redondeo

    // Actualizar xn y yn para la siguiente iteración
    xn = xna
    yn = yvar

    // Guardar valores sin redondeo
    arrX.push(xn)
    arrY.push(yn)
  }

  return {
    x: arrX,
    y: arrY,
    aprox: arrAprox,
    fxy: arrFxy,
    dy: arrDy,
    yn1: arrYn1
  }
}
