var form = $('#form')


const func_methods = {
  eulerMejorado: eulerResult,
  newtonRaphson: newtonRaphsonResult,
  rungeKutta: rungeKuttaResult
}

const eq_error = {
  eulerMejorado: 'em-f',
  newtonRaphson: 'nr-f',
  rungeKutta: 'rk4o-f'
}

function isValidEquation(equation) {
  try {
    let scope = { x: 0, y: 0 }
    math.evaluate(equation, scope)
  } catch (e) {
    console.error({ error: e })
    return false
  }

  return true
}

function scroller() {
  window.scrollTo(0, document.body.scrollHeight)
}

form.submit(event => {
  event.preventDefault()

  var result = $('#result-content')
  var method = m.val()

  const {
    decimales,
    ...form_data
  } = form.serializeArray()
    .reduce((obj, item) => {
      obj[item.name] = item.value
      return obj
    }, {})

  if (!isValidEquation(form_data[eq_error[method]])) {
    return result.load('components/form/equation-error.html', scroller)
  }

  func_methods[method]({ decimales, form_data, result })

  scroller()
})