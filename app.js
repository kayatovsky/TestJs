const express = require('express');

const app = express();
const port = 7000;
const { exec } = require('child_process');

app.use(express.json());

const quadraticEquation = (a, b, c) => {
  if (a === 0) return false;
  let res;
  const D = b * b - 4 * a * c;
  if (D < 0) return false;
  if (D === 0) res = Math.round((-b + Math.sqrt(D)) / (2 * a)).toString();
  else if (D > 0) {
    res = Math.round((-b + Math.sqrt(D)) / (2 * a)).toString();
    res = `${res}, ${Math.round((-b - Math.sqrt(D)) / (2 * a)).toString()}`;
  }
  return res;
};

app.post('/quadratic-equation', (req, res) => {
  const { expression } = req.body;
  const coefficients = expression
    .replace('**2', '')
    .replace(/ /g, '') // удалить пробелы
    .replace(/(?<!\d)x/g, '1x') // добавить 1 к x, у которого нет номера
    .replace(/=.*/, '') // убрать равную и правую часть уравнения
    .replace('+', '')
    .split(/x/);

  if (coefficients.length !== 3) {
    res.status(400).send(
      {
        error: 'invalid expression',
      },
    );
  } else {
    const roots = quadraticEquation(
      Number(coefficients[0]),
      Number(coefficients[1]),
      Number(coefficients[2]),
    );

    console.log('Request: ', expression);
    console.log('Coefficients: ', coefficients);
    console.log('Roots: ', roots);

    if (roots === false) {
      res.status(400).send(
        {
          error: 'quadratic equation has no solution',
        },
      );
    }

    res.status(200).send(
      {
        result: roots,
      },
    );
  }
});

app.get('/cpu-info', (req, res) => {
  const promise = new Promise((resolve, reject) => {
    exec('cat /proc/cpuinfo', (error, stdout) => {
      if (error) {
        console.error('Exec error: ', error);
        reject(error);
      }
      resolve(stdout);
    });
  });
  promise.then((value) => {
    console.log(value);
    res.status(200).send(value);
  });

  promise.catch((e) => {
    console.log(e);
    res.status(500).send(
      {
        error: 'server error',
        processError: e,
      },
    );
  });
});

app.listen(port, () => console.log(`Server listens ${port}`));
