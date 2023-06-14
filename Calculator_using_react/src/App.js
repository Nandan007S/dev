import React, { useState } from 'react';
import "./styles.css";
const Calculator = () => {
  const [result, setResult] = useState(0);
  const [expression, setExpression] = useState('');

  const handleNumberClick = (number) => {
    setExpression((prevExpression) => prevExpression + number);
  };

  const handleOperatorClick = (operator) => {
    setExpression((prevExpression) => prevExpression + operator);
  };

  const handleClear = () => {
    setExpression('');
    setResult(0);
  };

  const calculateResult = () => {
    try {
      const calculatedResult = eval(expression);
      setResult(calculatedResult);
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator">
      <input type="text" value={expression} readOnly />
      <div className="keypad">
        <div className="row">
          <button onClick={() => handleNumberClick('7')}>7</button>
          <button onClick={() => handleNumberClick('8')}>8</button>
          <button onClick={() => handleNumberClick('9')}>9</button>
          <button onClick={() => handleOperatorClick('/')}>/</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('4')}>4</button>
          <button onClick={() => handleNumberClick('5')}>5</button>
          <button onClick={() => handleNumberClick('6')}>6</button>
          <button onClick={() => handleOperatorClick('*')}>*</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('1')}>1</button>
          <button onClick={() => handleNumberClick('2')}>2</button>
          <button onClick={() => handleNumberClick('3')}>3</button>
          <button onClick={() => handleOperatorClick('-')}>-</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumberClick('0')}>0</button>
          <button onClick={() => handleOperatorClick('+')}>+</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={handleClear}>C</button>
        </div>
      </div>
      <div className="result">Result: {result}</div>
    </div>
  );
};

export default Calculator;