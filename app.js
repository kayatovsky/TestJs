const express = require('express');
const app = express();
const port = 7000;
const { spawn } = require('child_process');

app.use(express.json());

const quadraticEquation = (a, b, c) => {
    if(a === 0)
        return false;
    let res;
    let D = b * b - 4 * a * c;
    if(D < 0)
        return false;
    if(D === 0)
        res = (-b + Math.sqrt(D)) / (2 * a).toString();
    else if(D > 0){
        res = (-b + Math.sqrt(D)) / (2 * a).toFixed(2).toString();
        res = res + ", " + (-b - Math.sqrt(D)) / (2 * a).toFixed(2).toString()
    }
    return res;
};

app.post('/quadratic-equation', (req, res) => {
    const expression = req.body.expression;
    let coefficients = expression
        .replace('**2', '')
        .replace(/ /g, '') // удалить пробелы
        .replace(/(?<!\d)x/g, '1x') // добавить 1 к x, у которого нет номера
        .replace(/=.*/, '') // убрать равную и правую часть уравнения
        .replace('+', '')
        .split(/x/);

    if (coefficients.length !== 3) {
        res.status(400).send(
            {
                error: "invalid expression"
            }
        )
    } else {
        let roots = quadraticEquation(
            Number(coefficients[0]),
            Number(coefficients[1]),
            Number(coefficients[2])
        );

        console.log("Request: ", expression);
        console.log("Coefficients: ", coefficients);
        console.log("Roots: ", roots);

        if (roots === false) {
            res.status(400).send(
                {
                    error: 'quadratic equation has no solution'
                }
            )
        }

        res.status(200).send(
            {
                result: roots
            }
        )
    }
});

app.get('/cpu-info', (req, res) => {
    const promise = new Promise((resolve, reject) => {
        resolve('foo');
    });
    promise.then((value) => {
        console.log(value);
    });
    console.log(promise);

});


app.listen(port, () => console.log(`Server listens ${port}`));