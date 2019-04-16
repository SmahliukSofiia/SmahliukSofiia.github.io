function removePage(className) {
    document.getElementById(className).remove();
}

setTimeout(() => {
    removePage('screen1');
}, 5000);

function addPage(className) {
    let block = document.createElement('div');
    block.className = className;
    block.setAttribute('id', className);
    document.body.insertBefore(block, document.body.firstChild);
}

addPage('screen screen--second');

addPage('screen screen--third');

function removePage(className) {
    document.getElementById(className).remove();
}

setTimeout(() => {
    removePage('screen screen--third');
}, 2000);



const menuBtn = document.getElementById('menuButton');

menuBtn.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';
})

const crossBtn = document.getElementById('cross');

crossBtn.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';
})

