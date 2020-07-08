let skip = 0;
let limit = 10;
let order = '';
let totalEl;
let startUrl = 'https://api.odesseo.com.ua/warehouses';

function chanceTable(skip, limit, order) {
    let url = startUrl + '?skip=' + skip + '&limit=' + limit + order;
    fetch(url).then(function (response) {
        response.json().then(function (text) {
            CreateFieldBody(text);
            totalEl = text.total;
        });
    });
};

function getDate() {
    fetch(startUrl).then(function (response) {
        response.json().then(function (text) {
            CreateFieldHeaders(text);
            return text;
        }).then(function (text) {
            CreateFieldBody(text);
            totalEl = text.total;
            addPagination(totalEl, limit);
        });
    });
};

getDate(0, 10);

function CreateFieldHeaders(text) {
    let tableHeader = document.getElementById("table-header"),
        tableHeaderRow = tableHeader.appendChild(document.createElement('tr'));

    const headers = Object.keys(text.data[0]);
    headers.forEach(element => {
        let newCellHeader = document.createElement("th");
        newCellHeader.innerHTML = element;

        if (element == 'number') {
            newCellHeader.innerHTML += '<button class="order" id="order-btn">&#8593;</button>';
        }

        tableHeaderRow.appendChild(newCellHeader);
    });

    orderList();
}

function CreateFieldBody(text) {
    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';
    text.data.forEach(el => {

        let newCellRow = document.createElement("tr");

        let idNum = newCellRow.appendChild(document.createElement('td'));
        idNum.innerHTML = el.ref;

        let branchName = newCellRow.appendChild(document.createElement('td'));
        branchName.innerHTML = el.name;

        let cityName = newCellRow.appendChild(document.createElement('td'));
        cityName.innerHTML = el.city;

        let branchNum = newCellRow.appendChild(document.createElement('td'));
        branchNum.innerHTML = el.number;

        tableBody.appendChild(newCellRow);
    });
}

function changeLimit() {
    const limitNum = document.querySelector('#limit');
    limitNum.addEventListener('change', (event) => {
        let num = event.target.value;
        document.getElementById("table-body").innerHTML = '';
        chanceTable(skip, num, order);
        addPagination(totalEl, num);
        return limit = num;
    });
}

changeLimit();

function addPagination(totalElements, perPage) {
    let visibleLinks = 10;

    let linksCount = Math.ceil(totalElements / perPage);
    let paginationContainer = document.querySelector(".pagination");

    const paginationArray = [...Array(linksCount > visibleLinks ? visibleLinks + 1 : linksCount).keys()].slice(1);
    paginationArray.splice(visibleLinks - 1, 1, linksCount);

    (function paginationInit(currentPage = 1) {
        if (linksCount > visibleLinks) {
            if (linksCount - currentPage < visibleLinks - 1 && currentPage !== paginationArray[1]) {
                if (linksCount - currentPage >= visibleLinks - 2) {
                    currentPage = currentPage - 1;
                } else if (currentPage !== paginationArray[paginationArray.length - 2] &&
                    currentPage !== paginationArray[paginationArray.length - 1]) {
                    return;
                } else {
                    currentPage = currentPage - 1 - (visibleLinks - 2 - (linksCount - currentPage));
                }
            } else if (currentPage !== 1) {
                if (
                    currentPage > paginationArray[1] &&
                    currentPage < paginationArray[paginationArray.length - 2]
                ) {
                    return;
                } else if (currentPage === paginationArray[1]) {
                    if (currentPage - (visibleLinks - 2) >= -1) {
                        currentPage = currentPage - (visibleLinks - 2) >= 2 ? currentPage - (visibleLinks - 2) : 1;
                    } else {
                        currentPage = 1;
                    }
                } else {
                    currentPage -= 1;
                }
            } else {
                currentPage = 1;
            }
            paginationArray.splice(1, paginationArray.length - 2, ...Array(visibleLinks - 2)
                .fill(currentPage)
                .map((e, i) => (e += i + 1))
            );
        }

        paginationContainer.innerHTML = "";

        paginationArray.map(e => {
            paginationContainer.insertAdjacentHTML('beforeend', "<a href=" + e + ">" + e + "</a>");
        });

        if (paginationArray[1] > 2) {
            paginationContainer.querySelectorAll("a")[1].insertAdjacentHTML('beforebegin', "<span>...</span>");
        }
        if (paginationArray[paginationArray.length - 2] < linksCount - 1) {
            paginationContainer.querySelectorAll("a")[paginationArray.length - 1].insertAdjacentHTML('beforebegin', '<span>...</span>')
        }

        paginationContainer.childNodes.forEach(el => {
            el.onclick = function (e) {
                let count = e.target.innerHTML * limit;
                e.preventDefault();
                paginationInit(+e.target.innerHTML);
                chanceTable(count, limit, order);
                e.target.className = 'active';
                return skip = count;
            };
        });
    })();
}

function orderList() {
    let orderButton = document.querySelector('#order-btn');
    let checkedLink = 0;
    orderButton.addEventListener('click', (e) => {
        if (checkedLink == 0) {
            e.toElement.className = ' up';
            let linkName = '&order_by=number&order=' + 'asc';
            chanceTable(skip, limit, linkName);
            checkedLink = 1;
            e.toElement.innerHTML = '&uarr;';
            return order = linkName;
        } else {
            e.toElement.className = ' down';
            let linkName = '&order_by=number&order=' + 'desc';
            chanceTable(skip, limit, linkName);
            checkedLink = 0;
            e.toElement.innerHTML = '&darr;';
            return order = linkName;
        }
    });
}
