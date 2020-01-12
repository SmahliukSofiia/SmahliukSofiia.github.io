var btnSearch = document.querySelector('#btn-search'),
    btnFilter = document.querySelector('#btn-filter'),
    btnSort = document.querySelector('#btn-sort'),
    inputSearch = document.querySelector('#site-search');

function getDate(url) {
    fetch(url).then(function (response) {
        response.json().then(function (text) {
            let json = text.items;
            showResult(json);
            addFilterOptions(json);
            return json;
        }).then(function (json) {
            btnSort.addEventListener('click', function () {
                sortResult(json);
            });
            btnFilter.addEventListener('click', function () {
                console.log('hello')
            });
        });
    });
};


btnSearch.addEventListener('click', function() {
    var url = 'https://api.github.com/search/repositories?p=2&q=' + inputSearch.value +'+in:name&sort=stars&order=desc'
    getDate(url);
});

function showResult(json) {
    if (section) {
        section.remove();
    } else {
        var section = document.createElement('section');
        section.className = 'result-cards';
    }

    for (var i = 0; i < json.length; i++) {

        var language = json[i].language,
            card = document.createElement('article'),
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

function addFilterOptions(json) {
    var arr = [];

    for (var j = 0; j < json.length; j++) {
        var language = json[j].language;

        if (!arr.includes(language) & language !== null) {
            arr = arr.concat(language);
        }
    }

    var select = document.querySelector('#btn-filter');
    for (var j = 0; j < arr.length; j++) {
        var option = document.createElement('option');
        option.label = arr[j];
        select.appendChild(option);
    }
}

function sortResult(json) {
    var section = document.querySelector('section');
    if (section) {
        section.remove();
    }
    json.sort((a, b) => {
        var comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        if (comparison === 0) {
            return a.name.localeCompare(b.name);
        }
        return comparison;
    });
    showResult(json);
}

function filterResult(json) {
    var select = document.querySelector('#btn-filter'),
        val = select.options[select.selectedIndex].value,
        result = [];

    for (var z = 0; z < json.length; z++) {
        json[z].language == 'HTML';
        result.concat(json[z]);
    }

    console.dir(val)
}
