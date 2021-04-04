const { ipcRenderer } = require('electron');
function a() {
    console.log('processing');
    const b = document.querySelectorAll('div.MEAGs button.wpO6b');
    for (const c of b) d(c);
}
function d(c) {
    const e = c.cloneNode(true);
    c.parentNode.replaceChild(e, c);
    e.onclick = f;
}
function f(e) {
    const g = e.currentTarget.parentNode.parentNode;
    const h = g.querySelector('a.sqdOP.yWX7d._8A5w5.ZIAjV');
    const i = { images: [...g.querySelectorAll('img.FFVAD')].map(j => j.src), url: h ? h.href : null, type: 'instagram-post' };
    k(i);
}
async function k(i) {
    const l = await ipcRenderer.invoke('article-data', i);
    console.log(l);
}
window.addEventListener('load', () => {
    setInterval(a, 1000);
});