function newtonRaphson({ decimales, x0, f }) {
  let epsilon = Math.pow(10, -decimales)
  let maxIter = 100, iter = 0
  let iterResults = []  // Array para almacenar los resultados de cada iteración

  try {
    let df = math.derivative(f, 'x').toString()
    let dfCompiled = math.compile(df)

    let x1, error

    do {
      let fValue = math.evaluate(f, { x: x0 })
      let dfValue = dfCompiled.evaluate({ x: x0 })

      if (Math.abs(dfValue) < 1e-10) {
        alert("La derivada es muy cercana a 0. Deteniendo para evitar división por 0.")
        return null
      }

      x1 = x0 - fValue / dfValue
      x1 = parseFloat(x1.toFixed(decimales))

      error = Math.abs(x1 - x0)
      x0 = x1

      iterResults.push({
        paso: iter + 1,
        x: x1,
        f: fValue,
        error: error.toFixed(decimales)
      })

      iter++

      if (iter >= maxIter) {
        alert("Se alcanzó el número máximo de iteraciones sin converger.")
        return null
      }
    } while (error > epsilon)

    return iterResults  // Regresa los resultados de las iteraciones
  } catch (error) {
    alert("Error en Newton-Raphson:", error.message)
    return null
  }
}
