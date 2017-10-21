"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require('child_process');
function executeCommand(command, cdw) {
    console.log("Called ExecuteCommand");
    return new Promise((resolve, reject) => {
        console.log("Executing command: \"" + command + "\" at \"" + cdw + "\"");
        let options = cdw ? { cdw: cdw, stdio: 'inherit', shell: true } : { stdio: 'inherit', shell: true };
        console.log(options);
        child_process.exec(command, options, (err, stdout, stderr) => {
            if (err) {
                reject(new Error(err));
            }
            resolve();
        });
    });
}
function executeCommands(commands) {
    return new Promise((resolve, reject) => {
        function execute(internalCommands) {
            if (commands.length > 0) {
                executeCommand(commands[0].command, commands[0].cdw).then(() => {
                    console.log("Executed successfully");
                    internalCommands.shift();
                    execute(internalCommands);
                }).catch((err) => {
                    console.log(err);
                    reject(err);
                });
            }
            resolve();
        }
        execute(commands);
    });
}
class MountManager {
    mount(mountPath, devicePath) {
        let cmds = [
            {
                command: "sudo mkdir \"" + mountPath + "\"",
                cwd: "cd \"/\""
            },
            {
                command: "sudo mount \"" + devicePath + "\" \"" + mountPath + "\"",
                cwd: "cd \"/\""
            }
        ];
        return executeCommands(cmds);
    }
    unmount(unmountPath) {
        let cmds = [
            "cd \"/\"",
            "sudo unmount \"" + unmountPath + "\""
        ];
        return executeCommand("", "");
    }
}
exports.MountManager = MountManager;
//# sourceMappingURL=MountManager.js.map