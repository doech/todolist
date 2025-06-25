// Task Management System
class TaskManager {
  constructor() {
    this.tasks = [
      { id: 1, text: "Complete project proposal", priority: "high", completed: false, dueDate: "2024-01-15" },
      { id: 2, text: "Review team feedback", priority: "medium", completed: false, dueDate: "2024-01-12" },
      { id: 3, text: "Update documentation", priority: "low", completed: false, dueDate: "2024-01-20" },
      { id: 4, text: "Schedule client meeting", priority: "medium", completed: false, dueDate: "2024-01-10" },
      { id: 5, text: "Prepare presentation slides", priority: "high", completed: false, dueDate: "2024-01-08" },
    ]
    this.currentSort = null
    this.init()
  }

  init() {
    this.updateProgress()
    this.createInteractiveBackground()
    this.addEventListeners()
    this.initializeCubeAnimations()
  }

  initializeCubeAnimations() {
    const svgCube = document.getElementById("svgCube")
    if (svgCube) {
      // Add hover effects
      svgCube.addEventListener("mouseenter", () => {
        this.addSparkleEffect()
      })

      // Add click effect
      svgCube.addEventListener("click", () => {
        this.addCubeClickEffect()
      })
    }
  }

  addSparkleEffect() {
    const sparkles = document.getElementById("sparkles")
    if (!sparkles) return

    // Clear existing sparkles
    sparkles.innerHTML = ""

    const sparkleEmojis = ["✨", "🌟", "💫", "⭐", "🌸"]

    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement("div")
      sparkle.className = "sparkle"
      sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)]

      // Random position around the cube
      const angle = (i / 6) * 360 + Math.random() * 60
      const radius = 80 + Math.random() * 40
      const x = Math.cos((angle * Math.PI) / 180) * radius + 50
      const y = Math.sin((angle * Math.PI) / 180) * radius + 50

      sparkle.style.left = x + "%"
      sparkle.style.top = y + "%"
      sparkle.style.animationDelay = i * 0.2 + "s"

      sparkles.appendChild(sparkle)

      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle)
        }
      }, 2000)
    }
  }

  addCubeClickEffect() {
    const svgCube = document.getElementById("svgCube")
    if (!svgCube) return

    // Add bounce effect
    svgCube.style.animation = "none"
    svgCube.offsetHeight // Trigger reflow
    svgCube.style.animation = "cubeFloat 4s ease-in-out infinite, cubeBounce 0.6s ease-out"

    // Add temporary bounce animation
    if (!document.getElementById("bounceStyle")) {
      const style = document.createElement("style")
      style.id = "bounceStyle"
      style.textContent = `
        @keyframes cubeBounce {
          0% { transform: scale(1) translateY(0px); }
          50% { transform: scale(1.2) translateY(-20px); }
          100% { transform: scale(1) translateY(0px); }
        }
      `
      document.head.appendChild(style)
    }

    // Reset animation after bounce
    setTimeout(() => {
      svgCube.style.animation = "cubeFloat 4s ease-in-out infinite"
    }, 600)
  }

  addEventListeners() {
    document.addEventListener("scroll", this.handleScroll.bind(this))
    document.addEventListener("keydown", this.handleKeyboard.bind(this))
    window.addEventListener("resize", this.handleResize.bind(this))
  }

  handleKeyboard(event) {
    if ((event.ctrlKey || event.metaKey) && event.key === "n") {
      event.preventDefault()
      this.addTask()
    }
    if (event.key === "Escape") {
      this.closeLevelUp()
    }
  }

  handleScroll() {
    const scrolled = window.pageYOffset
    const parallax = document.querySelector(".background-elements")
    if (parallax) {
      parallax.style.transform = `translateY(${scrolled * 0.5}px)`
    }
  }

  handleResize() {
    const gardenWidget = document.getElementById("gardenWidget")
    const svgCube = document.getElementById("svgCube")

    if (window.innerWidth < 480) {
      gardenWidget.style.width = "200px"
      gardenWidget.style.height = "200px"
      if (svgCube) svgCube.style.width = svgCube.style.height = "120px"
    } else if (window.innerWidth < 768) {
      gardenWidget.style.width = "220px"
      gardenWidget.style.height = "220px"
      if (svgCube) svgCube.style.width = svgCube.style.height = "140px"
    } else {
      gardenWidget.style.width = "280px"
      gardenWidget.style.height = "280px"
      if (svgCube) svgCube.style.width = svgCube.style.height = "180px"
    }
  }

  updateProgress() {
    const checkboxes = document.querySelectorAll(".task-checkbox")
    const labels = document.querySelectorAll(".task-text")
    let completed = 0

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        completed++
        labels[index].classList.add("completed")
        this.tasks[index].completed = true
        this.addCompletionEffect(checkbox)
      } else {
        labels[index].classList.remove("completed")
        this.tasks[index].completed = false
      }
    })

    const percentage = Math.round((completed / checkboxes.length) * 100)
    this.updateProgressBar(percentage)
    this.updateGardenVisual(percentage)

    if (percentage === 100 && completed > 0) {
      setTimeout(() => this.showLevelUpNotification(), 500)
    }
  }

  addCompletionEffect(checkbox) {
    const rect = checkbox.getBoundingClientRect()
    this.createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2)
  }

  createParticles(x, y) {
    const particles = ["✨", "🌟", "💫", "⭐"]

    for (let i = 0; i < 4; i++) {
      const particle = document.createElement("div")
      particle.textContent = particles[Math.floor(Math.random() * particles.length)]
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 1.2rem;
        pointer-events: none;
        z-index: 1000;
        animation: particleFloat 1s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `

      document.body.appendChild(particle)
      setTimeout(() => particle.remove(), 1000)
    }

    if (!document.getElementById("particleStyle")) {
      const style = document.createElement("style")
      style.id = "particleStyle"
      style.textContent = `
        @keyframes particleFloat {
          0% { transform: translate(0, 0) scale(0); opacity: 1; }
          100% { transform: translate(${Math.random() * 100 - 50}px, -50px) scale(1); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }

  updateProgressBar(percentage) {
    const progressFill = document.getElementById("progressFill")
    const progressText = document.getElementById("progressText")

    if (progressFill && progressText) {
      progressFill.style.width = percentage + "%"
      progressText.textContent = percentage + "% Complete"

      if (percentage > 75) {
        progressFill.style.boxShadow = "0 2px 20px rgba(107, 207, 127, 0.6)"
      } else {
        progressFill.style.boxShadow = "0 2px 12px rgba(107, 207, 127, 0.4)"
      }
    }
  }

  updateGardenVisual(percentage) {
    const gardenStatus = document.getElementById("gardenStatus")
    const flowers3D = document.getElementById("flowers3D")
    const svgCube = document.getElementById("svgCube")

    // Update status text
    const stages = [
      { threshold: 0, text: "Garden Starting... 🌱", filter: "brightness(0.8) saturate(0.7)" },
      { threshold: 20, text: "Seeds Planted 🌿", filter: "brightness(0.9) saturate(0.8) hue-rotate(20deg)" },
      { threshold: 40, text: "Buds Growing 🌸", filter: "brightness(1.0) saturate(0.9) hue-rotate(40deg)" },
      { threshold: 60, text: "Flowers Blooming 🌺", filter: "brightness(1.1) saturate(1.0) hue-rotate(60deg)" },
      { threshold: 80, text: "Garden Thriving 🌻", filter: "brightness(1.2) saturate(1.1) hue-rotate(80deg)" },
      { threshold: 100, text: "Perfect Garden! 🌈", filter: "brightness(1.3) saturate(1.2) hue-rotate(100deg)" },
    ]

    const currentStage = stages.reverse().find((stage) => percentage >= stage.threshold) || stages[0]

    if (gardenStatus) {
      gardenStatus.textContent = currentStage.text
    }

    // Update cube visual effects
    if (svgCube) {
      svgCube.style.filter = `drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3)) ${currentStage.filter}`
    }

    // Update 3D flowers
    this.update3DFlowers(percentage, flowers3D)

    // Add sparkles for high progress
    if (percentage >= 80) {
      this.addSparkleEffect()
    }
  }

  update3DFlowers(percentage, container) {
    if (!container) return

    const flowerCount = Math.floor(percentage / 20) // 1 flower per 20% completion
    const flowerTypes = [
      { emoji: "🌸", color: "#FFB6C1" },
      { emoji: "🌺", color: "#FF69B4" },
      { emoji: "🌻", color: "#FFD700" },
      { emoji: "🌷", color: "#FF1493" },
      { emoji: "🌹", color: "#DC143C" },
    ]

    // Clear existing flowers
    container.innerHTML = ""

    for (let i = 0; i < flowerCount; i++) {
      const flower3D = document.createElement("div")
      flower3D.className = "flower-3d"

      // Create stem
      const stem = document.createElement("div")
      stem.className = "flower-stem"

      // Create flower head
      const head = document.createElement("div")
      head.className = "flower-head"
      const flowerType = flowerTypes[i % flowerTypes.length]
      head.textContent = flowerType.emoji

      // Create leaves
      const leaves = document.createElement("div")
      leaves.className = "flower-leaves"
      leaves.textContent = "🍃"

      flower3D.appendChild(stem)
      flower3D.appendChild(head)
      flower3D.appendChild(leaves)

      // Position flowers on top of the cube
      const positions = [
        { x: 30, y: 20 }, // Top-left area of cube
        { x: 70, y: 25 }, // Top-right area of cube
        { x: 50, y: 15 }, // Top-center area of cube
        { x: 40, y: 30 }, // Left-center area of cube
        { x: 60, y: 35 }, // Right-center area of cube
      ]

      const position = positions[i % positions.length]
      const randomOffset = {
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 15,
      }

      flower3D.style.left = position.x + randomOffset.x + "%"
      flower3D.style.top = position.y + randomOffset.y + "%"
      flower3D.style.animationDelay = i * 0.4 + "s"

      // Add random sway delay
      head.style.animationDelay = Math.random() * 2 + "s"

      container.appendChild(flower3D)
    }
  }

  showLevelUpNotification() {
    const notification = document.getElementById("levelUpNotification")
    if (notification) {
      notification.classList.add("show")
      this.createConfetti()
      this.addSparkleEffect()

      setTimeout(() => {
        this.closeLevelUp()
      }, 5000)
    }
  }

  closeLevelUp() {
    const notification = document.getElementById("levelUpNotification")
    if (notification) {
      notification.classList.remove("show")
    }
  }

  createConfetti() {
    const confetti = document.getElementById("confetti")
    if (!confetti) return

    confetti.innerHTML = ""

    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd"]
    const shapes = ["🎉", "🎊", "✨", "🌟", "💫", "🌸", "🌺", "🌻"]

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement("div")
      const isEmoji = Math.random() > 0.5

      if (isEmoji) {
        piece.textContent = shapes[Math.floor(Math.random() * shapes.length)]
        piece.style.fontSize = "1.5rem"
      } else {
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        piece.style.width = "8px"
        piece.style.height = "8px"
        piece.style.borderRadius = "50%"
      }

      piece.style.cssText += `
        position: absolute;
        left: ${Math.random() * 100}%;
        top: -10px;
        animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
        animation-delay: ${Math.random() * 2}s;
      `

      confetti.appendChild(piece)
    }

    if (!document.getElementById("confettiStyle")) {
      const style = document.createElement("style")
      style.id = "confettiStyle"
      style.textContent = `
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `
      document.head.appendChild(style)
    }
  }

  toggleSort(type) {
    const priorityCheckbox = document.getElementById("sortPriority")
    const dueDateCheckbox = document.getElementById("sortDueDate")

    if (type === "priority") {
      dueDateCheckbox.checked = false
      this.currentSort = priorityCheckbox.checked ? "priority" : null
    } else {
      priorityCheckbox.checked = false
      this.currentSort = dueDateCheckbox.checked ? "dueDate" : null
    }

    this.sortTasks()
  }

  sortTasks() {
    const taskList = document.getElementById("taskList")
    const taskItems = Array.from(taskList.children)

    if (!this.currentSort) return

    taskItems.sort((a, b) => {
      const aIndex = Array.from(taskList.children).indexOf(a)
      const bIndex = Array.from(taskList.children).indexOf(b)

      if (this.currentSort === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        return priorityOrder[this.tasks[bIndex].priority] - priorityOrder[this.tasks[aIndex].priority]
      } else if (this.currentSort === "dueDate") {
        return new Date(this.tasks[aIndex].dueDate) - new Date(this.tasks[bIndex].dueDate)
      }
    })

    taskItems.forEach((item, index) => {
      item.style.transform = "translateX(-100%)"
      item.style.opacity = "0"

      setTimeout(() => {
        taskList.appendChild(item)
        item.style.transform = "translateX(0)"
        item.style.opacity = "1"
      }, index * 100)
    })
  }

  createInteractiveBackground() {
    const canvas = document.getElementById("backgroundCanvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const particles = []
    const particleCount = 50
    let mouseX = 0
    let mouseY = 0

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.size = Math.random() * 2 + 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          this.vx += dx * 0.0001
          this.vy += dy * 0.0001
        }

        this.x += this.vx
        this.y += this.vy

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1

        this.x = Math.max(0, Math.min(canvas.width, this.x))
        this.y = Math.max(0, Math.min(canvas.height, this.y))
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 162, 200, ${this.opacity})`
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.strokeStyle = "rgba(200, 162, 200, 0.1)"
      ctx.lineWidth = 1

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()
  }

  viewCalendar() {
    const btn = document.querySelector(".calendar-btn")
    const originalText = btn.innerHTML

    btn.innerHTML = '<span class="btn-icon">⏳</span> Loading...'
    btn.disabled = true

    setTimeout(() => {
      btn.innerHTML = originalText
      btn.disabled = false
      alert("Calendar view coming soon! This will redirect to the calendar page.")
    }, 1000)
  }

  addTask() {
    const btn = document.querySelector(".add-task-btn")
    const originalContent = btn.innerHTML

    btn.innerHTML = '<span class="add-icon">⏳</span>'
    btn.style.transform = "scale(0.9)"

    setTimeout(() => {
      btn.innerHTML = originalContent
      btn.style.transform = "scale(1)"
      alert("Add task feature coming soon! This will redirect to the add task page.")
    }, 500)
  }
}

// Global functions for HTML event handlers
let taskManager

function updateProgress() {
  taskManager.updateProgress()
}

function toggleSort(type) {
  taskManager.toggleSort(type)
}

function viewCalendar() {
  taskManager.viewCalendar()
}

function addTask() {
  taskManager.addTask()
}

function closeLevelUp() {
  taskManager.closeLevelUp()
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  taskManager = new TaskManager()

  document.body.style.opacity = "0"
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"
  }, 100)
})
