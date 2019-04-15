function addPage(className) {
    let block = document.createElement('div');
    block.className = className;
    block.setAttribute('id', className);
    document.body.insertBefore(block, document.body.firstChild);
}

addPage('screen screen--first');

function addLogo(className) {
    const container = document.getElementById(className);
    const img = document.createElement('img');
    img.src = 'img/Logotype.svg';
    img.className = 'logo-image';
    container.appendChild(img);
}

addLogo('screen screen--first');

function removePage(className) {
    document.getElementById(className).remove();
}

setTimeout(() => {
    removePage('screen screen--first');
}, 5500);

