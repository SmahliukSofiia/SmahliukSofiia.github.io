function addPage(className) {
    let block = document.createElement('div');
    block.className = className;
    block.setAttribute('id', className);
    document.body.insertBefore(block, document.body.firstChild);
}

function removePage(className) {
    document.getElementById(className).remove();
}

setTimeout(() => {
    removePage('screen1');
}, 5000);

