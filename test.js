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

    it('-10=0', () => {
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

describe('test-cpu-info', () => {
    it('get-cpu-info', () => {
        axios.get('http://localhost:7000/cpu-info')
            .then((response) => {
            assert.equal(response, {
              "connecting": false,
              "_hadError": false,
              "_handle": {
                "reading": true
              },
              "_parent": null,
              "_host": null,
              "_readableState": {
                "objectMode": false,
                "highWaterMark": 16384,
                "buffer": {
                  "head": null,
                  "tail": null,
                  "length": 0
                },
                "length": 0,
                "pipes": null,
                "pipesCount": 0,
                "flowing": true,
                "ended": false,
                "endEmitted": false,
                "reading": true,
                "sync": false,
                "needReadable": true,
                "emittedReadable": false,
                "readableListening": false,
                "resumeScheduled": false,
                "paused": false,
                "emitClose": false,
                "autoDestroy": false,
                "destroyed": false,
                "defaultEncoding": "utf8",
                "awaitDrain": 0,
                "readingMore": false,
                "decoder": {
                  "encoding": "utf8"
                },
                "encoding": "utf8"
              },
              "readable": true,
              "_events": {},
              "_eventsCount": 3,
              "_writableState": {
                "objectMode": false,
                "highWaterMark": 16384,
                "finalCalled": false,
                "needDrain": false,
                "ending": false,
                "ended": false,
                "finished": false,
                "destroyed": false,
                "decodeStrings": false,
                "defaultEncoding": "utf8",
                "length": 0,
                "writing": false,
                "corked": 0,
                "sync": true,
                "bufferProcessing": false,
                "writecb": null,
                "writelen": 0,
                "bufferedRequest": null,
                "lastBufferedRequest": null,
                "pendingcb": 0,
                "prefinished": false,
                "errorEmitted": false,
                "emitClose": false,
                "autoDestroy": false,
                "bufferedRequestCount": 0,
                "corkedRequestsFree": {
                  "next": null,
                  "entry": null
                }
              },
              "writable": false,
              "allowHalfOpen": false,
              "_sockname": null,
              "_pendingData": null,
              "_pendingEncoding": "",
              "server": null,
              "_server": null
            });
        });
    });
});
