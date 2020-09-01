const { app, BrowserWindow, Menu, MenuItem } = require('electron')
const { is } = require('electron-util');
const shell = require('electron').shell;
require("electron-reload")(__dirname);

var menu = Menu.buildFromTemplate([
    {
        label: 'File',
        submenu: [
            {
                label: 'Select docto path',
                click() {
                    openDialog("Select your Docto file path")
                }
            },
            {
                label: 'Exit',
                accelerator: 'Alt+Q',
                click() {
                    app.quit()
                }
            }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'About Me!'
            },
            {
                label: 'Github',
                click() {
                    shell.openExternal('https://github.com/rico-law')
                }
            }
        ]
    }
]);

var doctoWindow = null;

function openDialog(winTitle, htmlPath) {
    if (doctoWindow) {
        doctoWindow.focus()
        return
    }

    doctoWindow = new BrowserWindow({
        height: 185,
        resizable: false,
        width: 270,
        title: winTitle,
        minimizable: false,
        fullscreenable: false
    })

    if (is.development) {
        doctoWindow.webContents.openDevTools();
    }

    doctoWindow.loadURL(htmlPath);
    doctoWindow.on("closed", () => {
        doctoWindow = null;
    })

}


if (is.development) {
    menu.append(
        new MenuItem({
            label: "Dev",
            submenu: [
                {
                    label: "Toggle Dev Tools",
                    accelerator: "Alt+W",
                    click(item, focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
                {
                    role: "reload",
                    accelerator: "Alt+E"
                }
            ]
        })
    );
}

function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1200,
        height: 900,
        // resizable: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: is.development
        }
    })

    // Close all children windows on main app close
    win.on("close", () => {
        app.quit();
    });

    // and load the index.html of the app.
    win.loadFile('src/index.html')

    // Open the DevTools.
    if (is.development) {
        win.webContents.openDevTools();
    }
    else {
        win.removeMenu();
    }
    Menu.setApplicationMenu(menu);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
