// 获取所有按钮和显示区域的 DOM 元素
const buttons = document.querySelectorAll('.num-btn, .operator-btn, #clear-btn, #equal-btn, .decimal-btn, #backspace-btn');
const display = document.getElementById('display');
const equalButton = document.getElementById('equal-btn');
const nightModeToggle = document.getElementById('night-mode-toggle');
const calculator = document.querySelector('.calculator');
// 初始化变量
let currentInput = '';
let currentExpression = '';
let displayResult = false;

// 为每个按钮添加点击事件监听器
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (buttonText === 'C') {
      currentInput = '';
      currentExpression = '';
      displayResult = false;
    } else if (buttonText === '=') {
      equalButton.classList.add('active');
      calculateExpression();
    } else if (buttonText === '←') {
      currentInput = currentInput.slice(0, -1);
      currentExpression = currentExpression.slice(0, -1);
      displayResult = false;
    } else if (buttonText === '÷') {
      currentInput += ' / ';
      currentExpression += ' ÷ ';
      displayResult = false;
    } else {
      currentInput += buttonText;
      currentExpression += buttonText;
      displayResult = false;
    }

    updateDisplay();
  });
});
nightModeToggle.addEventListener('change', () => {
  if (nightModeToggle.checked) {
    calculator.classList.add('night-mode');
  } else {
    calculator.classList.remove('night-mode');
  }
});
// 更新显示区域的内容
function updateDisplay() {
  if (displayResult) {
    const resultHTML = `<div class="result">${currentInput}</div>`; // 创建一个包含结果的 HTML 字符串
    display.innerHTML = currentExpression+ '<br><br>'+resultHTML; // 更新输出框内容
  } else {
    display.textContent = currentExpression; // 显示算式
  }
}

// 为等于号按钮添加点击事件监听器
equalButton.addEventListener('click', () => {
  equalButton.classList.add('active');
  calculateExpression();
});

function removeAnimationClass() {
  equalButton.classList.remove('active');
}

equalButton.addEventListener('animationend', removeAnimationClass);

function calculateExpression() {
  try {
    const result = eval(currentInput);
   // currentExpression += ' = ' + currentInput;
    currentInput = result.toString();
    displayResult = true;
  } catch (error) {
    currentInput = 'Error';
    currentExpression = '';
    displayResult = false;
  }
updateDisplay();
  
  // 在动画结束后移除闪烁类名
  equalButton.removeEventListener('animationend', removeAnimationClass);
  setTimeout(() => {
    equalButton.addEventListener('animationend', removeAnimationClass);
  }, 0);
}

// 初始化更新显示
updateDisplay();
