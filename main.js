const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');
});

ipcMain.on('check-video', (event, url) => {
    const ytDlpPath = path.join(__dirname, 'assets', 'yt-dlp.exe');

    // Ambil informasi video
    const command = `"${ytDlpPath}" -s --get-title --get-thumbnail "${url}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${stderr}`);
            event.sender.send('video-info', { title: 'Error', thumbnail: '' });
            return;
        }

        const output = stdout.split('\n');
        const title = output[0];
        const thumbnail = output[1];

        event.sender.send('video-info', { title, thumbnail });
    });
});
