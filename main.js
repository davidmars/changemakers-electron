// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const electron = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

const isDevelopment = process.mainModule.filename.indexOf('app.asar') === -1;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1400, height: 700})

  // and load the index.html of the app.
  mainWindow.loadFile('content/fr/index.html')

  if(isDevelopment){
    //déplace la fenetre sur 2 eme écran
    if(electron.screen.getAllDisplays().length>1){
      mainWindow.setPosition(electron.screen.getAllDisplays()[1].bounds.x,0);
    }
    mainWindow.setAlwaysOnTop(true, "main-menu");
    mainWindow.webContents.openDevTools();
    mainWindow.setMenuBarVisibility(false);
    //mainWindow.maximize();
  }else{
    mainWindow.setFullScreen(true);
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
