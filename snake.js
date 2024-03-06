// snake-game.js
document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const startButton = document.getElementById('start-button');
    const gridSize = 20;
    const initialSnakeLength = 3;
    let snake = [{ x: 10, y: 10 }];
    let direction = 'right';
    let apple = getRandomPosition();
    let score = 0;
    let gameInterval;
  
    function getRandomPosition() {
      return {
        x: Math.floor(Math.random() * gridSize) + 1,
        y: Math.floor(Math.random() * gridSize) + 1
      };
    }
  
    function drawSnake() {
      snake.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.classList.add('snake');
        snakeSegment.style.gridRowStart = segment.y;
        snakeSegment.style.gridColumnStart = segment.x;
        board.appendChild(snakeSegment);
      });
    }
  
    function drawApple() {
      const appleElement = document.createElement('div');
      appleElement.classList.add('apple');
      appleElement.style.gridRowStart = apple.y;
      appleElement.style.gridColumnStart = apple.x;
      board.appendChild(appleElement);
    }
  
    function draw() {
      // Clear the board
      board.innerHTML = '';
      drawSnake();
      drawApple();
  
      // Display the score
      scoreDisplay.textContent = `Score: ${score}`;
    }
  
    function checkCollision() {
      // Check if the snake collides with itself
      return snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y);
    }
  
    function move() {
        // Move the snake in the current direction
        const head = { ...snake[0] };
        switch (direction) {
          case 'up':
            head.y = head.y === 1 ? gridSize : head.y - 1;
            break;
          case 'down':
            head.y = head.y === gridSize ? 1 : head.y + 1;
            break;
          case 'left':
            head.x = head.x === 1 ? gridSize : head.x - 1;
            break;
          case 'right':
            head.x = head.x === gridSize ? 1 : head.x + 1;
            break;
        }
      
        // Check if the snake eats the apple
        if (head.x === apple.x && head.y === apple.y) {
          score++;
          snake.unshift({ x: apple.x, y: apple.y }); // Add a new segment at the current head position
          apple = getRandomPosition();
        } else {
          // Move the snake forward
          snake.pop();
          snake.unshift(head);
        }
      
        // Check for collisions
        if (checkCollision()) {
          alert('Game Over! Your score: ' + score);
          resetGame();
        }
      
        // Draw the updated game state
        draw();
      }
      
    function resetGame() {
      clearInterval(gameInterval);
      snake = Array.from({ length: initialSnakeLength }, (_, i) => ({ x: 10 - i, y: 10 }));
      direction = 'right';
      apple = getRandomPosition();
      score = 0;
      draw();
      startButton.disabled = false;
    }
  
    function handleKeyPress(event) {
      // Change the direction based on arrow key input
      switch (event.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
      }
    }
  
    document.addEventListener('keydown', handleKeyPress);
  
    startButton.addEventListener('click', function () {
      startButton.disabled = true;
      resetGame(); // Reset the game before starting
      gameInterval = setInterval(move, 150);
    });
  });
  