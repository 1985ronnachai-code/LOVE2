const container = document.getElementById("container");
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const hearts = [];

// ===== ?????????? 1 ??? =====
function createHeart() {
  const points = [];
  let progress = 0;

  for (let t = 0; t < Math.PI * 2; t += 0.12) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      -(13 * Math.cos(t)
      - 5 * Math.cos(2 * t)
      - 2 * Math.cos(3 * t)
      - Math.cos(4 * t));

    const span = document.createElement("span");
    span.innerText = "LOVE";
    span.style.position = "absolute";
    span.style.color = "hotpink";
    span.style.fontSize = "14px";
    span.style.fontWeight = "bold";
    span.style.opacity = "0";
    container.appendChild(span);

    points.push({ el: span, x, y });
  }

  hearts.push({
    points,
    progress,
    doneTime: null
  });
}

// ===== ???????????????????? ? =====
setInterval(createHeart, 450);

// ===== ????????????? =====
setInterval(() => {
  const now = Date.now();

  hearts.forEach((h, hi) => {

    // ???? ? ????????????? (?????? + ????)
    if (h.progress < 1) {
      h.progress += 0.003;
    } else {
      if (!h.doneTime) h.doneTime = now;
    }

    h.points.forEach(p => {

      // ???????????????????????
      const breathe = Math.sin(now * 0.0015) * 1;

      // ???????
      p.el.style.left =
        centerX + p.x * 15 * h.progress + breathe + "px";

      p.el.style.top =
        centerY + p.y * 15 * h.progress + breathe + "px";

      // ???? ? ????
      p.el.style.opacity = Math.min(h.progress * 1.2, 1);

      // ???????????
      const glow = 12 + Math.sin(now * 0.003) * 6;
      p.el.style.textShadow =
        `0 0 ${glow}px rgba(255,105,180,0.9)`;
    });

    // ?????????? ?? 0.2 ?? ???????????
    if (h.doneTime && now - h.doneTime > 200) {
      h.points.forEach(p => {
        p.el.style.opacity -= 0.06;
        p.el.style.transform = "scale(0.98)";
      });

      // ?????????????
      if (h.points[0].el.style.opacity <= 0.01) {
        h.points.forEach(p => p.el.remove());
        hearts.splice(hi, 1);
      }
    }

  });
}, 16);