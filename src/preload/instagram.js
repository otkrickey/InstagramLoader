const ct = (t, post, story) => { return t === 'post' ? post : t === 'story' ? story : undefined }
function a(t) {
    const b = document.querySelectorAll(ct(t, 'div.MEAGs button.wpO6b', 'section.szopg header button.dCJp8.afkep'));
    for (const c of b) d(c, t);
}
function d(c, t) {
    const e = c.cloneNode(true);
    c.parentNode.replaceChild(e, c);
    e.onclick = (e) => { f(e, t); }
}
function f(e, t) {
    const g = ct(t, e.currentTarget.parentNode.parentNode, e.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode);
    console.log(g);
    const h = g.querySelector(ct(t, 'a.sqdOP.yWX7d._8A5w5.ZIAjV', 'a.FPmhX._1PU_r'));
    const i = { images: [...g.querySelectorAll(ct(t, 'img.FFVAD', 'img.y-yJ5'))].map(j => j.src), url: h ? h.href : null, type: ct(t, 'instagram-post', 'instagram-story') };
    k(i);
}
async function k(i) {
    const l = await ipcRenderer.invoke('article-data', i);
    console.log(l);
}
window.addEventListener('load', () => {
    setInterval(() => { a('post'); a('story'); }, 1000);
});