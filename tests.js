const axios = require('axios');

describe('test-quadratic-equation', () => {
    it('2x**2+5x-10=0', () => {
        axios.post('http://localhost:7000/quadratic-equation',
            {
                expression: '2x**2+5x-10=0',
            }).then((response) => {
            assert.equal(response, {
                "result": "1, -4"
            });
        });
    });

    it('-2x**2+5x-10=0', () => {
        axios.post('http://localhost:7000/quadratic-equation',
            {
                expression: '-2x**2+5x-10=0',
            }).then((response) => {
            assert.equal(response, {
              "error": 'quadratic equation has no solution'
            });
        });
    });

    it('2x**2+5x-10=0', () => {
        axios.post('http://localhost:7000/quadratic-equation',
            {
                expression: '-10=0',
            }).then((response) => {
            assert.equal(response, {
                "error": 'invalid expression'
            });
        });
    });
});
