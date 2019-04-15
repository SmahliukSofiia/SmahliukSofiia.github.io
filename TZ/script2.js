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
}, 4000);