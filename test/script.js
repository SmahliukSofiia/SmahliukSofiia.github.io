var btnSearch = document.querySelector('#btn-search'),
    btnFilter = document.querySelector('#btn-filter'),
    btnSort = document.querySelector('#btn-sort'),
    inputSearch = document.querySelector('#site-search');

function getDate(url) {
    fetch(url).then(function (response) {
        response.json().then(function (text) {
            let json = text.items;
            showResult(json);
            return json;
        }).then(function (json) {
            saveResult(json);
        });
    });
};


btnSearch.addEventListener('click', function() {
    var url = 'https://api.github.com/search/repositories?p=2&q=' + inputSearch.value +'+in:name&sort=stars&order=desc'
    getDate(url);
});

function showResult(json) {
    var section = document.createElement('section');
    section.className = 'result-cards';

    for (var i = 0; i < json.length; i++) {

        var card = document.createElement('article'),
        first_block = document.createElement('div'),
        second_block = document.createElement('div'),
        card_link = document.createElement('a'),
        card_descr = document.createElement('p'),
        card_date = document.createElement('p'),
        card_lang = document.createElement('p');


        card_link.textContent = json[i].name;
        card_link.href = json[i].svn_url;
        card_descr.textContent = json[i].description;
        card_date.textContent = json[i].pushed_at;
        card_lang.textContent = json[i].language;
        first_block.className = 'first-block';
        second_block.className = 'second-block';
        card.className = 'card';

        first_block.appendChild(card_link);
        first_block.appendChild(card_descr);
        first_block.appendChild(card_date);
        second_block.appendChild(card_lang);

        section.appendChild(card);
        card.appendChild(first_block);
        card.appendChild(second_block);
    }
    document.body.appendChild(section);
}

btnFilter.addEventListener('click', function () {

});

function filterResult() {

}

btnSort.addEventListener('click', function () {

});

function sortResult(json) {
    json.sort((a, b) => {
        var comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        if (comparison === 0) {
            return a.name.localeCompare(b.name);
        }
        return comparison;
    });
    showResult(json);
}
