const inputElement = document.querySelector(".input");
const outputOperationElement = document.querySelector(".operation .value");
const outputResultElement = document.querySelector(".result .value");

const OPERATORS = ["+", "-", "*", "/"];
const POWERS = "POWER(",
  FACTORIAL = "FACTORIAL";

let calculatorButtons = [
  {
    name: "rad",
    symbol: "Rad",
    formula: false,
    type: "key",
  },
  {
    name: "deg",
    symbol: "Deg",
    formula: false,
    type: "key",
  },
  {
    name: "square-root",
    symbol: "√",
    formula: "Math.sqrt",
    type: "mathFunction",
  },
  {
    name: "square",
    symbol: "x²",
    formula: POWERS,
    type: "mathFunction",
  },
  {
    name: "open-parenthesis",
    symbol: "(",
    formula: "(",
    type: "number",
  },
  {
    name: "close-parenthesis",
    symbol: ")",
    formula: ")",
    type: "number",
  },
  {
    name: "clear",
    symbol: "C",
    formula: false,
    type: "key",
  },
  {
    name: "delete",
    symbol: "⌫",
    formula: false,
    type: "key",
  },
  {
    name: "pi",
    symbol: "π",
    formula: "Math.PI",
    type: "number",
  },
  {
    name: "cos",
    symbol: "cos",
    formula: "trigo(Math.cos,",
    type: "trigonometricFunction",
  },
  {
    name: "sin",
    symbol: "sin",
    formula: "trigo(Math.sin,",
    type: "trigonometricFunction",
  },
  {
    name: "tan",
    symbol: "tan",
    formula: "trigo(Math.tan,",
    type: "trigonometricFunction",
  },
  {
    name: "7",
    symbol: 7,
    formula: 7,
    type: "number",
  },
  {
    name: "8",
    symbol: 8,
    formula: 8,
    type: "number",
  },
  {
    name: "9",
    symbol: 9,
    formula: 9,
    type: "number",
  },
  {
    name: "division",
    symbol: "÷",
    formula: "/",
    type: "operator",
  },
  {
    name: "e",
    symbol: "e",
    formula: "Math.E",
    type: "number",
  },
  {
    name: "acos",
    symbol: "acos",
    formula: "inv_trigo(Math.acos,",
    type: "trigonometricFunction",
  },
  {
    name: "asin",
    symbol: "asin",
    formula: "inv_trigo(Math.asin,",
    type: "trigonometricFunction",
  },
  {
    name: "atan",
    symbol: "atan",
    formula: "inv_trigo(Math.atan,",
    type: "trigonometricFunction",
  },
  {
    name: "4",
    symbol: 4,
    formula: 4,
    type: "number",
  },
  {
    name: "5",
    symbol: 5,
    formula: 5,
    type: "number",
  },
  {
    name: "6",
    symbol: 6,
    formula: 6,
    type: "number",
  },
  {
    name: "multiplication",
    symbol: "×",
    formula: "*",
    type: "operator",
  },
  {
    name: "factorial",
    symbol: "×!",
    formula: FACTORIAL,
    type: "mathFunction",
  },
  {
    name: "exp",
    symbol: "exp",
    formula: "Math.exp",
    type: "mathFunction",
  },
  {
    name: "ln",
    symbol: "ln",
    formula: "Math.log",
    type: "mathFunction",
  },
  {
    name: "log",
    symbol: "log",
    formula: "Math.log10",
    type: "mathFunction",
  },
  {
    name: "1",
    symbol: 1,
    formula: 1,
    type: "number",
  },
  {
    name: "2",
    symbol: 2,
    formula: 2,
    type: "number",
  },
  {
    name: "3",
    symbol: 3,
    formula: 3,
    type: "number",
  },
  {
    name: "subtraction",
    symbol: "–",
    formula: "-",
    type: "operator",
  },
  {
    name: "power",
    symbol: "x<span>y</span>",
    formula: POWERS,
    type: "mathFunction",
  },
  {
    name: "ANS",
    symbol: "ANS",
    formula: "ans",
    type: "number",
  },
  {
    name: "percent",
    symbol: "%",
    formula: "/100",
    type: "number",
  },
  {
    name: "comma",
    symbol: ".",
    formula: ".",
    type: "number",
  },
  {
    name: "0",
    symbol: 0,
    formula: 0,
    type: "number",
  },
  {
    name: "calculate",
    symbol: "=",
    formula: "=",
    type: "calculate",
  },
  {
    name: "addition",
    symbol: "+",
    formula: "+",
    type: "operator",
  },
];

let data = {
  operation: [],
  formula: [],
};

function createCalculatorButtons() {
  const buttonsPerRow = 8;
  let addedButtons = 0;

  calculatorButtons.forEach((button) => {
    if (addedButtons % buttonsPerRow == 0) {
      inputElement.innerHTML += `<div class="row"></div>`;
    }

    const row = document.querySelector(".row:last-child");
    row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;

    addedButtons++;
  });
}

createCalculatorButtons();

let RADIAN = true;

const radianButton = document.getElementById("rad");
const degreeButton = document.getElementById("deg");

radianButton.classList.add("active-angle");

function angleToggler() {
  radianButton.classList.toggle("active-angle");
  degreeButton.classList.toggle("active-angle");
}

inputElement.addEventListener("click", (event) => {
  const targetButton = event.target;

  calculatorButtons.forEach((button) => {
    if (button.name == targetButton.id) calculator(button);
  });
});

function calculator(button) {
  if (button.type == "operator") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "number") {
    data.operation.push(button.symbol);
    data.formula.push(button.formula);
  } else if (button.type == "trigonometricFunction") {
    data.operation.push(button.symbol + "(");
    data.formula.push(button.formula);
  } else if (button.type == "mathFunction") {
    let symbol, formula;

    if (button.name == "factorial") {
      symbol = "!";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "power") {
      symbol = "^(";
      formula = button.formula;

      data.operation.push(symbol);
      data.formula.push(formula);
    } else if (button.name == "square") {
      symbol = "^(";
      formula = button.formula;

      data.operation.push("2)");
      data.formula.push("2)");
    } else {
      symbol = button.symbol + "(";
      formula = button.formula + "(";

      data.operation.push(symbol);
      data.formula.push(formula);
    }
  } else if (button.type == "key") {
    if (button.name == "clear") {
      data.operation = [];
      data.formula = [];

      updateOutputResult(0);
    } else if ((button.name = "delete")) {
      data.operation.pop();
      data.formula.pop();
    } else if (button.name == "rad") {
      RADIAN = true;
      angleToggler();
    } else if (button.name == "deg") {
      RADIAN = false;
      angleToggler();
    }
  } else if (button.type == "calculate") {
    formulaString = data.formula.join("");

    let POWER_SEARCH_RESULT = search(data.formula, POWERS);
    let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);

    const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
    BASES.forEach((base) => {
      let toReplace = base + POWERS;
      let replacement = "Math.pow(" + base + ",";
      formulaString = formulaString.replace(toReplace, replacement);
    });

    const NUMBERS = factorialNumberGetter(
      data.formula,
      FACTORIAL_SEARCH_RESULT
    );
    NUMBERS.forEach((factorial) => {
      formulaString = formulaString.replace(
        factorial.toReplace,
        factorial.replacement
      );
    });

    let result;
    try {
      result = eval(formulaString);
    } catch (error) {
      if (error instanceof SyntaxError) {
        result = "Syntax Error!";
        updateOutputResult(result);
        return;
      }
    }

    ans = result;
    data.operation = [result];
    data.formula = [result];

    updateOutputResult(result);
    return;
  }
  updateOutputOperation(data.operation.join(""));
}

function factorialNumberGetter(formula, FACTORIAL_SEARCH_RESULT) {
  let numbers = [];
  let factorial_sequence = 0;

  FACTORIAL_SEARCH_RESULT.forEach((factorial_index) => {
    let number = [];

    let nextIndex = factorial_index + 1;
    let nextInput = formula[nextIndex];

    if (nextIndex == FACTORIAL) {
      factorial_sequence += 1;
      return;
    }

    let first_factorial_index = factorial_index - factorial_sequence;

    let previousIndex = first_factorial_index - 1;

    let paranthesisCount = 0;

    while (previousIndex >= 0) {
      if (formula[previousIndex] == "(") paranthesisCount--;
      if (formula[previousIndex] == ")") paranthesisCount++;
      let isOperator = false;
      OPERATORS.forEach((OPERATOR) => {
        if (formula[previousIndex] == OPERATOR) isOperator = true;
      });

      if (isOperator && paranthesisCount == 0) break;

      number.unshift(formula[previousIndex]);
      previousIndex--;
    }
    let number_str = number.join("");
    const factorial = "factorial(",
      close_parenthesis = ")";
    let times = factorial_sequence + 1;

    let toReplace = number_str + FACTORIAL.repeat(times);
    let replacement =
      factorial.repeat(times) + number_str + close_parenthesis.repeat(times);

    numbers.push({
      toReplace: toReplace,
      replacement: replacement,
    });

    factorial_sequence = 0;
  });
  return numbers;
}

function powerBaseGetter(formula, POWER_SEARCH_RESULT) {
  let power_bases = [];
  POWER_SEARCH_RESULT.forEach((power_index) => {
    let base = [];
    let paranthesisCount = 0;
    let previousIndex = power_index - 1;

    while (previousIndex >= 0) {
      if (formula[previousIndex] == "(") paranthesisCount--;
      if (formula[previousIndex] == ")") paranthesisCount++;
      let isOperator = false;
      OPERATORS.forEach((OPERATOR) => {
        if (formula[previousIndex] == OPERATOR) isOperator = true;
      });

      let isPower = formula[previousIndex] == POWERS;
      if ((isOperator && paranthesisCount == 0) || isPower) break;

      base.unshift(formula[previousIndex]);
      previousIndex--;
    }
    power_bases.push(base.join(""));
  });
  return power_bases;
}

function search(array, keyword) {
  let search_result = [];
  array.forEach((element, index) => {
    if (element == keyword) search_result.push(index);
  });
  return search_result;
}

function updateOutputOperation(operation) {
  outputOperationElement.innerHTML = operation;
}

function updateOutputResult(result) {
  outputResultElement.innerHTML = result;
}

function factorial(number) {
  if (number % 1 != 0) {
    return gamma(number + 1);
  }
  if (number === 0 || number === 1) return 1;
  let result = 1;
  for (let i = 1; i <= number; i++) {
    result *= i;
    if (result === Infinity) return Infinity;
  }
  return result;
}

function gamma(n) {
  // accurate to about 15 decimal places
  //some magic constants
  var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
    p = [
      0.99999999999980993, 676.5203681218851, -1259.1392167224028,
      771.32342877765313, -176.61502916214059, 12.507343278686905,
      -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
    ];
  if (n < 0.5) {
    return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
  } else {
    n--;
    var x = p[0];
    for (var i = 1; i < g + 2; i++) {
      x += p[i] / (n + i);
    }
    var t = n + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, n + 0.5) * Math.exp(-t) * x;
  }
}

function trigo(callback, angle) {
  if (!RADIAN) {
    angle = (angle * Math.PI) / 180;
  }
  return callback(angle);
}

function inv_trigo(callback, value) {
  let angle = callback(value);
  if (!RADIAN) {
    angle = (angle * 180) / Math.PI;
  }
  return angle;
}
