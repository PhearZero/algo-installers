const {ipcMain } = require('electron')
const os = require('node:os');
const pty = require('node-pty');

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';


// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const child = require('child_process').execFile


const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // import('./packages/algoctrl/build/index.js')
    // and load the index.html of the app.
    mainWindow.loadFile('index.html')
    mainWindow.webContents.openDevTools()
    child(path.resolve('./bin/goal.exe'), ['node', 'start', '-d', '.data'], function(err, data) {
        console.log(err)
        console.log(data.toString());
    });

    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
    });

    ptyProcess.onData((data) => {
        mainWindow.webContents.send('message', data);
        // process.stdout.write(data);
    });
    ipcMain.on('set-message', (event, msg) => {
        ptyProcess.write(msg);
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
