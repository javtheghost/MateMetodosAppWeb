// Método de Euler Mejorado con precisión
function eulerMejorado({ decimales, iteraciones, h, xn, yn, f }) {
  let arrX = []
  let arrY = []

  for (let i = 0; i < iteraciones; i++) {
    let xna = xn + h

    let fxy = math.evaluate(f, { x: xn, y: yn })

    let yna = yn + h * fxy

    let fxy2 = math.evaluate(f, { x: xna, y: yna })

    let yvar = yn + h * (fxy + fxy2) / 2

    // Redondear yn y xn a los decimales especificados
    yn = parseFloat(yvar.toFixed(decimales))
    xn = parseFloat(xna.toFixed(decimales))

    arrX.push(xn)
    arrY.push(yn)
  }

  return { x: arrX, y: arrY }
}
