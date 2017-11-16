module.exports = function(p) {
  var text_size_ratio = 0
  var text_size = 0

  function update_text_size() {
    text_size = Math.min((p.windowWidth - 20) / text_size_ratio, (p.windowHeight - 20) / 3)
    text_size = Math.floor(text_size)
  }

  p.setup = function() {
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.parent('p5-sketch-title')

    p.textFont('Heebo', 64)
    text_size_ratio = p.textWidth('YADEX205.') / 64
    update_text_size()
  }

  p.draw = function () {
    p.clear()
    p.fill(204) // #cccccc

    if (p.millis() >= 1000 && p.millis() <= 5000) {
      var width = Math.sin(Math.PI / 2 * (p.millis() - 1000) / 2000) * (p.windowWidth - 20)

      p.quad(10,                 10,
             width, 10,
             width, p.windowHeight - 10,
             10,                 p.windowHeight - 10)
    }

    if (p.millis() < 2000) { return }

    p.blendMode(p.EXCLUSION)
    var text_offset = (p.windowHeight - text_size * 3) / 2
    p.fill(204, Math.min((p.millis() - 2000) / 1000 * 255, 255))
    p.textFont('Heebo', text_size)
    p.text('WWW.',      10, text_offset + text_size)
    p.text('YADEX205.', 10, text_offset + text_size * 2)
    p.text('INFO.',     10, text_offset + text_size * 3)

    if (p.millis() > 5000) {
      p.noLoop()
    }
  }

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    update_text_size()
  }
}
