// Particle effect for background
class ParticleBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.numberOfParticles = 50;
    this.init();
    this.animate();
  }

  init() {
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.opacity = '0.5';
    document.body.appendChild(this.canvas);

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Create particles
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 30 // Yellow to orange range
      });
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.opacity})`;
      this.ctx.fill();

      // Draw connections
      this.particles.forEach(otherParticle => {
        const distance = Math.sqrt(
          Math.pow(particle.x - otherParticle.x, 2) +
          Math.pow(particle.y - otherParticle.y, 2)
        );

        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `hsla(${particle.hue}, 100%, 50%, ${0.1 * (1 - distance / 150)})`;
          this.ctx.stroke();
        }
      });
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particle background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ParticleBackground();
});
