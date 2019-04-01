class Request {
    get(url, cb) {
        const xhr = new XMLHttpRequest();

        xhr.open('get', url, true);
        xhr.addEventListener('load', function(e) {
            const result = JSON.parse(e.target.response);
            console.log(result);
            cb(result);
        });
        xhr.send();
    }
}

const request = new Request();

class Content {   
    constructor () {
        this.arr = [];
    }

    addPictures() {
        request.get('https://www.rijksmuseum.nl/api/en/collection?key=D4zcnuuQ&ps=100', function addArr(result) {
            cont.arr = cont.arr.concat(result.artObjects);
            cont.showPictures(cont.arr)
        })
    }

    showPictures(pic) {
        const slider = document.getElementsByClassName('carousel-inner');

        for(let i = 0; i < pic.length; i++) {
            const slide = document.createElement('div');
            slide.className = 'carousel-item';
            slider[0].appendChild(slide);
        
            const img = document.createElement('img');
            img.src = pic[i].webImage.url;
            img.className = 'd-block img';
            slide.appendChild(img);

            const caption = document.createElement('div');
            caption.className = 'carousel-caption d-none d-md-block';
            slide.appendChild(caption);

            const title = document.createElement('h5');
            title.textContent = pic[i].principalOrFirstMaker;
            caption.appendChild(title);

            const txt = document.createElement('p');
            txt.textContent = pic[i].title;
            caption.appendChild(txt);
        }

        slider[0].firstElementChild.classList.add('active');

        const carousel = document.getElementById('myCarousel');
        carousel.classList.add('my-style');
    }
}

const cont = new Content();

cont.addPictures()
