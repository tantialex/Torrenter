"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function executeSeries(commands) {
    var execNext = function () {
        return executeCommand(commands.shift()).then((result) => {
            if (commands.length)
                execNext();
        });
    };
    return execNext().then(() => {
        console.log("Execution Done");
    }).catch((err) => {
        throw err;
    });
}
function executeCommand(command) {
    var child_process = require('child_process');
    console.log("Called ExecuteCommand");
    return new Promise((resolve, reject) => {
        console.log("Executing: " + command);
        var parts = command.split(/\s+/g);
        var p = child_process.spawn(parts[0], parts.slice(1), { stdio: 'inherit' });
        p.on('exit', function (code) {
            if (code) {
                reject(new Error('command "' + command + '" exited with wrong status code "' + code + '"'));
            }
            else {
                resolve();
            }
        });
    });
}
class MountManager {
    mount(mountPath, devicePath) {
        let cmds = [
            "cd \"/\"",
            "sudo mkdir \"" + mountPath + "\"",
            "sudo mount \"" + devicePath + "\" \"" + mountPath + "\""
        ];
        return executeSeries(cmds);
    }
    unmount(unmountPath) {
        let cmds = [
            "cd \"/\"",
            "sudo unmount \"" + unmountPath + "\""
        ];
        return executeSeries(cmds);
    }
}
exports.MountManager = MountManager;
//# sourceMappingURL=MountManager.js.map