var input = document.querySelector('input');
var btn = document.getElementById('input-btn');

var ul = document.createElement('ul');
document.body.appendChild(ul);
ul.className = 'list';

btn.onclick = function addList() {
    if (input.value) {
        var li = document.createElement('li');
        li.textContent = input.value;
        li.className = 'item';
        ul.appendChild(li);

        input.value = '';

        var btnDelete = document.createElement('span');
        btnDelete.textContent = 'X';
        btnDelete.className = 'btn-delete';
        li.appendChild(btnDelete);
        btnDelete.onclick = function deleteList() {
            li.remove();
        };

        li.onclick = function crossOut() {
            li.classList.toggle('cross-out');
        }


    } else alert('Please, enter information');
}