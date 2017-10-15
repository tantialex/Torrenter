
function executeSeries(commands) {
    var execNext = function () {
        return exports.exec(commands.shift()).then((result) => {
            if (commands.length) execNext();
        });
    }

    return execNext().then(() => {
        console.log("Execution Done");
    }).catch((err) => {
        throw err;
    });
}

function executeCommand(command) {
    var child_process = require('child_process');

    return new Promise((resolve, reject) => {
        console.log("Executing: " + command);
        var parts = command.split(/\s+/g);


        var p = child_process.spawn(parts[0], parts.slice(1), { stdio: 'inherit' });

        p.on('exit', function (code) {
            if (code) {
                reject(new Error('command "' + command + '" exited with wrong status code "' + code + '"'));
            } else {
                resolve();
            }
        });
    });
}

export class MountManager{

    mount(mountPath: string, devicePath: string) {
        let cmds = [
            "cd /",
            "sudo mkdir \"" + mountPath + "\"",
            "sudo mount \"" + devicePath + "\" \"" + mountPath + "\""
        ];

        return executeSeries(cmds);
    }

    unmount(unmountPath: string) {
        let cmds = [
            "cd /",
            "sudo unmount \"" + unmountPath + "\""
        ];

        return executeSeries(cmds);
    }
}