import { randomIntFromRange, randomColor } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']
const gravity = 1;
const friction = 0.59;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
})

addEventListener('click', () => {
  init()
})

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction
    } else {
      this.dy += gravity
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    this.x += this.dx
    this.y += this.dy
    this.draw()
  }
}

// Implementation
let ballArray = []
let ball
function init() {
  ballArray = []
  for (let i = 0; i < 100; i++) {
    const radius = randomIntFromRange(5, 30)
    const x = randomIntFromRange(radius, canvas.width - radius)
    const y = randomIntFromRange(radius, canvas.height - radius)
    const dx = randomIntFromRange(-2, 2)
    const dy = randomIntFromRange(-2, 2)
    const color = randomColor(colors)
    ball = new Ball(x, y, dx, dy, radius, color)
    ballArray.push(ball)
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  ball.update()
  ballArray.forEach( ball=> {
    ball.update()
  })
}

init()
animate()
