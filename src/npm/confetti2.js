export function confetti2() {
    var COLORS, Confetti2, NUM_CONFETTI2, PI_2, canvas, confetti2, context, drawCircle, i, range, resizeWindow, xpos;
  
    NUM_CONFETTI2 = 350;
  
    COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
  
    PI_2 = 2 * Math.PI;
  
    canvas = document.getElementById("confetti2");

    // canvas.width = document.body.clientWidth; //document.width is obsolete
    // canvas.height = document.body.clientHeight; //document.height is obsolete

    context = canvas.getContext("2d");
  
    window.w = 0;
  
    window.h = 0;
  
    resizeWindow = function() {
      window.w = canvas.width = window.innerWidth;
      return window.h = canvas.height = window.innerHeight;
    };
  
    window.addEventListener('resize', resizeWindow, false);
  
    window.onload = function() {
      return setTimeout(resizeWindow, 0);
    };
  
    range = function(a, b) {
      return (b - a) * Math.random() + a;
    };
  
    drawCircle = function(x, y, r, style) {
      context.beginPath();
      context.arc(x, y, r, 0, PI_2, false);
      context.fillStyle = style;
      return context.fill();
    };
  
    xpos = 0.5;
  
    document.onmousemove = function(e) {
      return xpos = e.pageX / w;
    };
  
    window.requestAnimationFrame = (function() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
    })();
  
    Confetti2 = (function() {
      function Confetti2() {
        this.style = COLORS[~~range(0, 5)];
        this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
        this.r = ~~range(2, 6);
        this.r2 = 2 * this.r;
        this.replace();
      }
  
      Confetti2.prototype.replace = function() {
        this.opacity = 0;
        this.dop = 0.03 * range(1, 4);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        return this.vy = 0.7 * this.r + range(-1, 1);
      };
  
      Confetti2.prototype.draw = function() {
        var ref;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
          this.opacity = 1;
          this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) {
          this.replace();
        }
        if (!((0 < (ref = this.x) && ref < this.xmax))) {
          this.x = (this.x + this.xmax) % this.xmax;
        }
        return drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
      };
  
      return Confetti2;
  
    })();
  
    confetti2 = (function() {
      var j, ref, results;
      results = [];
      for (i = j = 1, ref = NUM_CONFETTI2; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
        results.push(new Confetti2);
      }
      return results;
    })();
  
    window.step = function() {
      var c, j, len, results;
      requestAnimationFrame(step);
      context.clearRect(0, 0, w, h);
      results = [];
      for (j = 0, len = confetti2.length; j < len; j++) {
        c = confetti2[j];
        results.push(c.draw());
      }
      return results;
    };
  
    step();
  
  }