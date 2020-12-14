// npm install
// node server.js
// Browser -> http://localhost:3000/index.htm

const express = require('express');
const app = express();
const port = 3000;
var expressWs = require('express-ws')(app);

// Static HTML/JS
app.use(express.static('data'));

// Websocket-Endpoint
app.ws('/ws', function(ws, req) {
    // Nach Client-Connection wird hier ein initiales UI_INITIAL_GUI gesendet, das festlegt, welche UI-Elemente der Client anzeigen soll
    var data = {
        type: 200, // UI_INITIAL_GUI
        sliderContinuous: false,
        controls: []
    }

    // Es gibt 19 Controls, identifiziert durch type: 0...18
    // Die hier einfach mal an den Client schicken
    for (var i = 0; i < 19; i++) {
        // ID 10 ist leider kein UI-Element, sondern "ADD_GRAPH_POINT", deswegen überspringen
        if (i === 10) continue;

        data.controls.push({
            id: i,
            type: i,
            label: 'Label for Ele ' + i,
            value: 0,
            color: 0, // C_TURQUOISE
            parentControl: false, // irgendwas mit tabs vs rows
            selected: false, // option-elemente preselecten
        });
    }

    ws.send(JSON.stringify(data));

    // Alle Buttons des Clients sind an Websocket-Events gebunden, siehe ESPUI.cpp:491ff.
    ws.on('message', function(message) {
        console.log({message});
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
