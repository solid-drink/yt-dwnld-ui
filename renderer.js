const { ipcRenderer } = require('electron');

document.getElementById('check-link').addEventListener('click', () => {
    const url = document.getElementById('video-url').value;
    ipcRenderer.send('check-video', url);
});

ipcRenderer.on('video-info', (event, videoData) => {
    document.getElementById('video-title').innerText = videoData.title;
    document.getElementById('video-thumbnail').src = videoData.thumbnail;
    document.getElementById('video-info').style.display = 'block';
    document.getElementById('download-video').style.display = 'inline-block';
});

ipcRenderer.on('command-output', (event, output) => {
    document.getElementById('command-output').innerText += output;
});
