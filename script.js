const colors = [
  "#ff6b9d",
  "#c44569",
  "#f8b500",
  "#ffd700",
  "#ff69b4",
  "#ff1493",
  "#ff0000",
  "#ff8c00",
];
const confettiEmojis = [
  "🎉",
  "🎊",
  "🎈",
  "🎁",
  "✨",
  "💝",
  "🌟",
  "💕",
  "🫦",
  "💋",
  "💖",
  "💗",
  "💘",
  "💅",
];

const greetings = [
  "Happiness",
  "Health",
  "Smiles",
  "Blush",
  "Flirt",
  "Love",
  "Forever",
  "Lovely",
  "Beautiful",
  "Radiant",
  "Joyful",
  "Charming",
  "Graceful",
  "Wonder",
  "Sunshine",
  "Sweet",
  "Magic",
  "Dream",
  "Precious",
  "Sparkle",
  "Treasure",
  "Adore",
  "Romance",
  "Bliss",
  "Enchant",
  "Cherish",
  "Perfect",
  "Delight",
  "Stunning",
  "Beloved",
  "Radiance",
  "Passion",
  "Bloom",
];

let shuffledGreetings = [...greetings];
let greetingIndex = 0;

const specialMessage = `Happy Birthday! 🎉
Today is all about you — your smile, your charm, and the way you make even the simplest things feel special.
I hope your day is filled with laughter, happiness, and just a little bit of harmless mischief 😉
There's something about you that makes even ordinary moments feel special 😏
So enjoy every moment, let yourself blush a little, and know that you deserve all the joy in the world! 💖`;
let isAnimating = false;

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function typeWriter(element, text, speed = 60) {
  return new Promise((resolve) => {
    element.textContent = "";
    let index = 0;

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }

    type();
  });
}

function shakeButton(button) {
  button.classList.add("shake");
  setTimeout(() => {
    button.classList.remove("shake");
  }, 500);
}

function handleButtonClick() {
  if (isAnimating) return;

  isAnimating = true;
  const button = document.getElementById("celebrateBtn");
  const paragraph = document.getElementById("messageParagraph");

  // Тряски кнопку
  shakeButton(button);

  // Меняем текст кнопки
  button.textContent = "Celebrate";
  button.onclick = null;

  // Запускаем эффект печатной машинки (без ожидания)
  typeWriter(paragraph, specialMessage, 60);

  // Запускаем эффекты сразу же
  startCelebration();

  // Разрешаем повторные клики через 1 сек
  setTimeout(() => {
    isAnimating = false;
    button.onclick = () => {
      shakeButton(button);
      startCelebration();
    };
  }, 1000);
}

function startCelebration() {
  const balloonInterval = setInterval(createBalloons, 1000);

  setTimeout(() => clearInterval(balloonInterval), 10000);

  startConfetti();
  startGreetings();
}

function createBalloons() {
  const balloonCount = 3;

  for (let i = 0; i < balloonCount; i++) {
    setTimeout(() => {
      const container = document.createElement("div");
      container.className = "balloon-container";

      const balloon = document.createElement("div");
      balloon.className = "balloon-ball";

      const color = colors[Math.floor(Math.random() * colors.length)];
      const leftPosition = Math.random() * (window.innerWidth - 60);
      const duration = Math.random() * 1.5 + 3.5;
      const drift = (Math.random() - 0.5) * 150;

      balloon.style.background = `linear-gradient(135deg, ${color}, ${adjustBrightness(color, 0.8)})`;
      container.style.left = leftPosition + "px";
      container.style.setProperty("--drift", drift + "px");
      container.style.animation = `balloonRise ${duration}s linear forwards`;

      container.appendChild(balloon);
      document.body.appendChild(container);

      setTimeout(() => container.remove(), duration * 1000);
    }, i * 150);
  }
}

function adjustBrightness(color, factor) {
  const hex = color.replace("#", "");
  const rgb = parseInt(hex, 16);
  const r = Math.round((rgb >> 16) * factor);
  const g = Math.round(((rgb >> 8) & 0xff) * factor);
  const b = Math.round((rgb & 0xff) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

function startConfetti() {
  // Генерируем конфетти 20 раз с интервалом
  for (let batch = 0; batch < 90; batch++) {
    setTimeout(() => {
      createConfettiBurst();
    }, batch * 300);
  }
}

function createConfettiBurst() {
  const confettiCount = 8;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    const leftPosition = Math.random() * window.innerWidth;
    const emoji =
      confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
    const duration = Math.random() * 2 + 3;
    const delay = Math.random() * 0.2;
    const size = Math.random() * 18 + 12;

    confetti.textContent = emoji;
    confetti.style.left = leftPosition + "px";
    confetti.style.fontSize = size + "px";
    confetti.style.animation = `confettiFall ${duration}s linear forwards`;
    confetti.style.animationDelay = delay + "s";

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), (duration + delay) * 1000);
  }
}

function startGreetings() {
  shuffledGreetings = shuffleArray(greetings);
  greetingIndex = 0;

  for (let batch = 0; batch < 15; batch++) {
    setTimeout(() => {
      createGreetingsFall();
    }, batch * 400);
  }
}

function createGreetingsFall() {
  const greetingCount = 4;

  for (let i = 0; i < greetingCount; i++) {
    const greeting = document.createElement("div");
    greeting.className = "greeting";

    const leftPosition = Math.random() * (window.innerWidth - 150);

    // Выбираем слово по индексу и переходим к следующему
    const text = shuffledGreetings[greetingIndex];
    greetingIndex = (greetingIndex + 1) % shuffledGreetings.length;

    // Если дошли до конца, перемешиваем заново
    if (greetingIndex === 0) {
      shuffledGreetings = shuffleArray(greetings);
    }

    const duration = Math.random() * 2 + 4;
    const delay = Math.random() * 0.3;
    const textColor = colors[Math.floor(Math.random() * colors.length)];

    greeting.textContent = text;
    greeting.style.left = leftPosition + "px";
    greeting.style.color = textColor;
    greeting.style.animation = `confettiFall ${duration}s linear forwards`;
    greeting.style.animationDelay = delay + "s";

    document.body.appendChild(greeting);

    setTimeout(() => greeting.remove(), (duration + delay) * 1000);
  }
}
