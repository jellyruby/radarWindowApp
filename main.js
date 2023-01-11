// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const GIFEncoder = require('gifencoder');
const fs = require('fs');
const request = require('request');
const { createCanvas } = require('canvas');

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')


  
const express = require('express')
const exp = express()

exp.listen(3000, () => console.log('Example app listening on port 3000!'))

exp.get('/', (req, res) => res.sendFile(__dirname+'/index.html'))
exp.post('/makegif', (req, res) => {

    console.log('makeGif!')


    const width = 800
    const height = 800
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const encoder = new GIFEncoder(width, height);
    encoder.createReadStream().pipe(fs.createWriteStream('./animation.gif'));
    encoder.start()
    encoder.setRepeat(0)
    encoder.setDelay(500)
    encoder.setQuality(100)

    
    const list = [
        'https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?aws=1&cmp=HSP&qcd=HSL&obs=ECHO&grid=2&legend=1&map=HR&grid=2&color=C4&legend=1&size=800&itv=&gov=KMA&lonlat=0&tm=&zoom_level=5&zoom_x=undefined&zoom_y=undefined&xp=500&yp=500&zoom=1&wv=1&ht=1500&tm=202301111030',
        'https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?aws=1&cmp=HSP&qcd=HSL&obs=ECHO&grid=2&legend=1&map=HR&grid=2&color=C4&legend=1&size=800&itv=&gov=KMA&lonlat=0&tm=&zoom_level=5&zoom_x=undefined&zoom_y=undefined&xp=500&yp=500&zoom=1&wv=1&ht=1500&tm=202301111035',
        'https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?aws=1&cmp=HSP&qcd=HSL&obs=ECHO&grid=2&legend=1&map=HR&grid=2&color=C4&legend=1&size=800&itv=&gov=KMA&lonlat=0&tm=&zoom_level=5&zoom_x=undefined&zoom_y=undefined&xp=500&yp=500&zoom=1&wv=1&ht=1500&tm=202301111040',
        'https://radar.kma.go.kr/cgi-bin/center/nph-rdr_cmp_img?aws=1&cmp=HSP&qcd=HSL&obs=ECHO&grid=2&legend=1&map=HR&grid=2&color=C4&legend=1&size=800&itv=&gov=KMA&lonlat=0&tm=&zoom_level=5&zoom_x=undefined&zoom_y=undefined&xp=500&yp=500&zoom=1&wv=1&ht=1500&tm=202301111045'
    ]

    list.forEach(async (f, i) => {
        
        
        request.get({
            url: f,
            encoding: null
        }, function(err, res, data) {
            if (err) throw err;
            
            ctx.drawImage(data,0,0);

            encoder.addFrame(ctx);

            if (i === list.length - 1) {
                
                console.log('test');
                encoder.finish()
              }
            
        });
        
    
        
    })
    

})


  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
