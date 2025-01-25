#!/usr/bin/env node

import { fork } from "child_process"
import { watch } from "fs"

function nodemon_clone() {
    const fileToWatch = process.argv[2]

    if (!fileToWatch) {
        console.error("Error: Especifique o arquivo para monitorar")
        process.exit(1)
    };

    let processRunning = fork(fileToWatch)

    watch(fileToWatch, (event, filename) => {

        if (event === "change") {
            console.log("Arquivo modificado. Reiniciando");
            processRunning.kill();
            processRunning = fork(fileToWatch);
        }

    })

}


nodemon_clone("watching.js")