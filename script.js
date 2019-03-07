function httpGet(url, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open('get', url, true);
    xhr.addEventListener('load', function(e) {
        var result = JSON.parse(e.target.response);
        console.log(result)
        cb(result);
    });
    xhr.send();
}

function collectData(url, page) {
        httpGet(url + '?page=' + page, function showHeroes(result) {
            var section = document.querySelector('section');

            var heroes = result.results;
            
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
        })
    
}

var page = 1;

collectData('https://swapi.co/api/people/', page)

var footer = document.querySelector('footer');
var myBtn = document.createElement('button');
myBtn.textContent = 'Next';
footer.appendChild(myBtn);

myBtn.addEventListener('click', function() {
    ++page;
    collectData('https://swapi.co/api/people/', page);
})
