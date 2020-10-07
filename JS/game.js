function gameOver() {
  function toggleModal() {
    refs.backdrop.classList.remove('is-hidden');
    location.reload();
  }

  function openBackdrop() {
    refs.backdrop.classList.add('is-hidden');
  }

  const refs = {
    closeModalBtn: document.querySelector('[data-close-modal]'),
    backdrop: document.querySelector('[data-backdrop]'),
  };

  openBackdrop();

  refs.closeModalBtn.addEventListener('click', toggleModal);
}

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const background1 = new Image();
background1.src = './images/bg-banner2.webp';

const background2 = background1;

const canvasH = canvas.height;
const canvasW = canvas.width;

const background_1 = {
  x: 0,
  y: 0,
};
const background_2 = {
  x: 1024,
  y: 0,
};
const ground_1 = {
  x: 0,
  y: canvasH - 65,
};

const triangle = [
  {
    x: 1000,
    y: canvasH - 115,
  },
  {
    x: 1000,
    y: canvasH - 115,
  },
];

let r = Math.floor(Math.random() * 3 + 1);
let q = 0;
let score = 0;

const cube = {
  x: 0,
  y: canvasH - 115,
};

const cubex = [];
const trx = [];

function direction(e) {
  if (e.keyCode !== 39 || cube.x >= 600) {
    return;
  }

  if (e.keyCode === 39 && cube.x <= 600) {
    cube.x += 250;
  }
}

document.addEventListener('keydown', direction);

function a() {
  if (triangle[q].x >= -300) {
    triangle[q].x -= 1;
    let x = 0;
    for (let i = 0; i < r; i += 1) {
      ctx.beginPath();
      ctx.moveTo(triangle[q].x + x, triangle[q].y);
      ctx.lineTo(triangle[q].x + 25 + x, triangle[q].y + 50);
      ctx.lineTo(triangle[q].x - 25 + x, triangle[q].y + 50);
      ctx.fill();

      x += 50;
    }

    if (r === 1) {
      trx[2] = 0;
      trx[3] = 0;
    } else if (r === 2) {
      trx[3] = 0;
    }
    for (let index = 0; index <= r; index += 1) {
      trx[index] = triangle[q].x + 50 * index - 25;
    }
  }

  if (triangle[q].x <= 0 && q === 0) {
    triangle[0].x = 1000;
    q = 1;
    r = Math.floor(Math.random() * 3 + 1);
  } else if (triangle[q].x <= 0 && q === 1) {
    triangle[1].x === 1000;
    q = 0;
    r = Math.floor(Math.random() * 3 + 1);
  }
}

function b() {
  if (
    cubex.includes(trx[0]) ||
    cubex.includes(trx[1]) ||
    cubex.includes(trx[2]) ||
    cubex.includes(trx[3])
  ) {
    clearInterval(game);
    clearInterval(game1);
    gameOver();
  }
}

function c(x, y) {
  ctx.fillStyle = 'rgb(51,225,51)';
  ctx.fillRect(x + 30, y, 50, 50);
  for (let index = 0; index <= 50; index += 1) {
    cubex[index] = cube.x + index + 30;
  }
}

function drawGame1() {
  ctx.drawImage(background1, background_1.x, background_1.y);
  ctx.drawImage(background2, background_2.x, background_2.y);

  background_1.x -= 0.1;
  background_2.x -= 0.1;

  if (background_1.x <= -1024) {
    background_1.x = 1024;
  }
  if (background_2.x <= -1024) {
    background_2.x = 1024;
  }

  score += 0.05;
  let scoreZ = score.toFixed(2);

  ctx.fillStyle = 'black';
  a();
  if (scoreZ >= 1000) {
    a();
    a();
    a();
  } else if (scoreZ >= 500) {
    a();
    a();
  } else if (scoreZ >= 100) {
    a();
  }
  b();
  if (cube.x > 0) {
    cube.x -= 1;
  }
  ctx.clearRect(-300, 0, 300, 540);

  ctx.fillStyle = 'black';
  ctx.fillRect(ground_1.x, ground_1.y, 960, 100);
  c(cube.x, cube.y);

  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText(scoreZ, 100, 50);
  if (scoreZ >= 100 && scoreZ <= 200) {
    ctx.fillStyle = 'black';
    ctx.font = '50px Arial';
    ctx.fillText('*хлоп-хлоп* молодец', 240, 100);
  } else if (scoreZ >= 500 && scoreZ <= 600) {
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.font = '50px Arial';
    ctx.fillText('ну это иззи, попробуй до 1000)', 240, 100);
  } else if (scoreZ >= 1000 && scoreZ <= 1100) {
    ctx.fillStyle = 'rgb(51,225,51)';
    ctx.font = '50px Arial';
    ctx.fillText('ты ах*ел? Попробуй до 1500', 240, 100);
  } else if (scoreZ >= 1500 && scoreZ <= 2000) {
    ctx.fillStyle = 'rgb(51,225,51)';
    ctx.font = '50px Arial';
    ctx.fillText('поздравляю, ты выиграл - геморой', 100, 100);
  }
  ctx.fillStyle = 'black';
}

let game1 = setInterval(drawGame1, 1);

// ctx.drawImage(more, animation(), 0, 150, 120, 100, 370, 150, 120);
