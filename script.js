function httpGet(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open('get', url, true);
    xhr.addEventListener('load', function(e) {
        var result = JSON.parse(e.target.response);
        cb(result);
    });
    xhr.send();
}

var page = 1;

var arr = [];

function collectData(url, page) {
    httpGet(url + '?page=' + page, function getHeroes(result) {
        var heroes = result.results;
        arr = arr.concat(result);
        showHeroes(heroes);
    })
}

function showHeroes(heroes) {
    var section = document.createElement('section');
        
    for (var i = 0; i < heroes.length; i++) {
        var myArticle = document.createElement('article');
        var myH2 = document.createElement('h2');
        var myP1 = document.createElement('p');
        var myP2 = document.createElement('p');

        myH2.textContent = heroes[i].name;
        myP1.textContent = 'Birth year: ' + heroes[i].birth_year + '\n\r' + 'Gender: ' + heroes[i].gender + '\n\r'
            + 'Height: ' + heroes[i].height + '\n\r' + 'Mass: ' + heroes[i].mass;
        myP2.textContent = 'Eye color: ' + heroes[i].eye_color + '\n\r' + 'Hair color: ' + heroes[i].hair_color 
            + '\n\r' + 'Skin color: ' + heroes[i].skin_color;

        myArticle.appendChild(myH2);
        myArticle.appendChild(myP1);
        myArticle.appendChild(myP2);

        section.appendChild(myArticle);
    }
    document.body.appendChild(section);
}

function removeContent() {
    var section = document.querySelector('section');
    if (section) {
        section.remove();
    }
}


var header = document.querySelector('header');
var myBtnP = document.createElement('button');
myBtnP.textContent = 'Previous';
header.appendChild(myBtnP);

var header = document.querySelector('header');
var myBtnN = document.createElement('button');
myBtnN.textContent = 'Next';
header.appendChild(myBtnN);


myBtnN.addEventListener('click', function() {
    if(page <= 9) {
        if (arr.length < page) {
            collectData('https://swapi.co/api/people/', page);
        } else {
            heroes = arr[page - 1].results;
            showHeroes(heroes)
        }
        ++page;
        removeContent();
    }
})

myBtnP.addEventListener('click', function() {
    if (page > 2) {
        heroes = arr[page - 3].results;
        showHeroes(heroes)
        --page;
        removeContent();
    }
}) 
