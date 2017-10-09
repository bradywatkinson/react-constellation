function Constellation(canvas, options) {
  const context = canvas.getContext('2d');
  const defaults = {
    star: {
      color: 'rgba(255, 255, 255, .5)',
      width: 4,
    },
    line: {
      color: 'rgba(255, 255, 255, .5)',
      width: 0.2,
    },
    position: {
      x: 0, // This value will be overwritten at startup
      y: 0, // This value will be overwritten at startup
    },
    width: window.innerWidth,
    height: window.innerHeight,
    velocity: 0.1,
    length: 100,
    distance: 100,
    radius: 80,
    stars: [],
  };
  const config = {
    ...defaults,
    ...options,
  };

  function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = (config.velocity - (Math.random() * 0.5));
    this.vy = (config.velocity - (Math.random() * 0.5));

    this.radius = Math.random() * config.star.width;
  }

  Star.prototype = {
    create: () => {
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      context.fill();
    },

    animate: () => {
      for (let i = 0; i < config.length; i++) {
        const star = config.stars[i];

        if (star.y < 0 || star.y > canvas.height) {
          star.vx = star.vx;
          star.vy = -star.vy;
        } else if (star.x < 0 || star.x > canvas.width) {
          star.vx = -star.vx;
          star.vy = star.vy;
        }

        star.x += star.vx;
        star.y += star.vy;
      }
    },

    line: () => {
      const length = config.length;
      let iStar;
      let jStar;

      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
          iStar = config.stars[i];
          jStar = config.stars[j];

          if (
            (iStar.x - jStar.x) < config.distance &&
            (iStar.y - jStar.y) < config.distance &&
            (iStar.x - jStar.x) > -config.distance &&
            (iStar.y - jStar.y) > -config.distance
          ) {
            if (
              (iStar.x - config.position.x) < config.radius &&
              (iStar.y - config.position.y) < config.radius &&
              (iStar.x - config.position.x) > -config.radius &&
              (iStar.y - config.position.y) > -config.radius
            ) {
              context.beginPath();
              context.moveTo(iStar.x, iStar.y);
              context.lineTo(jStar.x, jStar.y);
              context.stroke();
              context.closePath();
            }
          }
        }
      }
    },
  };

  this.createStars = () => {
    const length = config.length;
    let star;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < length; i++) {
      config.stars.push(new Star());
      star = config.stars[i];

      star.create();
    }

    star.line();
    star.animate();
  };

  this.setCanvas = () => {
    canvas.width = config.width;
    canvas.height = config.height;
  };

  this.setContext = () => {
    context.fillStyle = config.star.color;
    context.strokeStyle = config.line.color;
    context.lineWidth = config.line.width;
  };

  this.setInitialPosition = () => {
    if (!options || typeof options.position === 'undefined') {
      config.position = {
        x: canvas.width * 0.5,
        y: canvas.height * 0.5,
      };
    }
  };

  this.loop = (callback) => {
    callback();

    window.requestAnimationFrame(() => {
      this.loop(callback);
    });
  };

  this.bind = () => {
    window.addEventListener('mousemove', (e) => {
      config.position.x = e.pageX;
      config.position.y = e.pageY;
    });
  };

  this.init = () => {
    if (context) {
      this.setCanvas();
      this.setContext();
      this.setInitialPosition();
      this.loop(this.createStars);
      this.bind();
    }
  };
}

module.exports Constellation;
