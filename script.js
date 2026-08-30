(() => {
  const canvas = document.getElementById("grid");
  const ctx = canvas.getContext("2d");
  const cursor = document.getElementById("cursor");
  const photo = document.getElementById("photo");
  const mail = document.getElementById("mail");
  const mailOut = document.getElementById("mailOut");
  const hotTargets = document.querySelectorAll("a, button, .portrait-wrap");
  const email = "fran@francisespejo.com";

  let width = 0;
  let height = 0;
  let dots = [];
  let mouse = { x: -999, y: -999 };
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    const count = Math.min(90, Math.floor((width * height) / 18000));
    dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18
    }));
  }

  function drawGrid() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(255,43,43,0.05)";
    ctx.lineWidth = 1;
    const step = 56;
    const offsetX = (width / 2) % step;
    const offsetY = (height / 2) % step;

    for (let x = offsetX; x < width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = offsetY; y < height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    dots.forEach((d) => {
      d.x += d.vx;
      d.y += d.vy;
      if (d.x < 0 || d.x > width) d.vx *= -1;
      if (d.y < 0 || d.y > height) d.vy *= -1;

      const dx = d.x - mouse.x;
      const dy = d.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      const glow = dist < 140 ? (140 - dist) / 140 : 0;

      ctx.beginPath();
      ctx.fillStyle = `rgba(255,43,43,${0.2 + glow * 0.55})`;
      ctx.arc(d.x, d.y, d.r + glow * 1.2, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function loop() {
    drawGrid();
    if (!reduce) requestAnimationFrame(loop);
  }

  function setFavicon(src) {
    const size = 128;
    const ico = document.createElement("canvas");
    ico.width = size;
    ico.height = size;
    const c = ico.getContext("2d");
    const img = new Image();
    img.onload = () => {
      c.beginPath();
      c.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      c.closePath();
      c.clip();
      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2;
      const sy = (img.height - min) / 2;
      c.drawImage(img, sx, sy, min, min, 0, 0, size, size);
      let link = document.querySelector("link[rel='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.type = "image/png";
      link.href = ico.toDataURL("image/png");
    };
    img.src = src;
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }, { passive: true });

  hotTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hot"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hot"));
  });

  mail.addEventListener("click", async () => {
    mailOut.hidden = false;
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = "mailto:" + email;
    }
  });

  if (photo && photo.complete && photo.naturalWidth) {
    setFavicon(photo.src);
  } else if (photo) {
    photo.addEventListener("load", () => setFavicon(photo.src), { once: true });
  }

  resize();
  if (reduce) {
    drawGrid();
  } else {
    loop();
  }
})();
