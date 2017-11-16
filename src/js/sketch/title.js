module.exports = function(p) {
  p.setup = function() {
    var canvas = p.createCanvas(p.windowWidth, p.windowHeight)
    canvas.parent('p5-sketch-title')
    p.frameRate(24)
  }

  p.draw = function () {
    var font_size = 128

    p.clear()
    p.fill(parseInt('0xCC', 16))
    p.textFont('Heebo', font_size)
    p.text('WWW.', 0, font_size)
    p.text('YADEX205.', 0, font_size * 2)
    p.text('INFO.', 0, font_size * 3)
  }

  p.windowResize = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
  }
}
