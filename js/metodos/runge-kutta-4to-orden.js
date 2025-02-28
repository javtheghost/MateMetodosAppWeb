function rungeKutta({ decimales, h, xn, yn, yf, f }) {
  let arrX = []
  let arrY = []

  // Ejecutar hasta que xn alcance o supere yf
  while (xn < yf) {
    // Calcular los valores de k1, k2, k3, k4
    let k1 = h * math.evaluate(f, { x: xn, y: yn })
    let k2 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k1 / 2 })
    let k3 = h * math.evaluate(f, { x: xn + h / 2, y: yn + k2 / 2 })
    let k4 = h * math.evaluate(f, { x: xn + h, y: yn + k3 })

    // Calcular el valor de yn y redondearlo a los decimales especificados
    yn = parseFloat(
      (yn + (k1 + 2 * k2 + 2 * k3 + k4) / 6).toFixed(decimales)
    )

    // Calcular el nuevo xn y redondearlo a los decimales especificados
    xn = parseFloat((xn + h).toFixed(decimales))

    // Almacenar los valores calculados de xn y yn en sus respectivos arreglos
    arrX.push(xn)
    arrY.push(yn)
  }

  // Retornar los arreglos con los valores calculados de x e y
  return { x: arrX, y: arrY }
}
