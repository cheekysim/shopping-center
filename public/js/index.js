/* eslint-disable no-undef */

getStores();

// Send request to get stores
function getStores() {
    fetch('api/stores')
        .then((res) => res.json())
        .then((data) => {
            renderStores(data);
            setupSearch(data);
        });
}

function renderStores(stores) {
    Object.keys(stores).forEach((key) => {
        // Create Elements
        const categoryListEl = document.createElement('li');
        const categoryEl = document.createElement('div');
        categoryEl.classList.add('category');
        categoryEl.id = key;
        categoryEl.dataset.show = 'false';

        const categoryTitleDiv = document.createElement('div');
        categoryTitleDiv.classList.add('category-title');

        const categoryTitleEl = document.createElement('span');
        categoryTitleEl.innerText = title(key);

        const iconEl = document.createElement('i');
        iconEl.classList.add('fas', 'fa-plus', 'fa-2x');

        const button = document.createElement('button');
        button.classList.add('category-button');
        button.id = `${key}`;
        button.setAttribute('type', 'button');

        // Handle Category Button Click
        button.addEventListener('click', handleButtonClick);

        // Handle Category Hover
        button.onmouseenter = () => {
            stores[key].forEach((store) => {
                const storeEl = document.getElementById(store);
                // storeEl.classList.add('map-hover');
                storeEl.animate(
                    {
                        fill: 'var(--color-primary)'
                    },
                    { duration: 200, fill: 'forwards' }
                );
            });
        };

        button.onmouseleave = () => {
            stores[key].forEach((store) => {
                const storeEl = document.getElementById(store);
                // storeEl.classList.remove('map-hover');
                storeEl.animate(
                    {
                        fill: 'transparent'
                    },
                    { duration: 200, fill: 'forwards' }
                );
            });
        };

        const categoryUlEl = document.createElement('ul');

        // Create Store List
        stores[key].forEach((store) => {
            const listEl = document.createElement('li');

            const spanEl = document.createElement('span');
            spanEl.classList.add('store');
            spanEl.id = `${store}-list`;
            spanEl.innerText = title(store.replace('_', ' '));

            // Handle Store Hover
            spanEl.onmouseenter = () => {
                const storeEl = document.getElementById(
                    store.replace('-list', '')
                );
                storeEl.animate(
                    {
                        fill: 'var(--color-primary)'
                    },
                    { duration: 200, fill: 'forwards' }
                );
            };

            spanEl.onmouseleave = () => {
                const storeEl = document.getElementById(
                    store.replace('-list', '')
                );
                storeEl.animate(
                    {
                        fill: 'transparent'
                    },
                    { duration: 200, fill: 'forwards' }
                );
            };
            // Append to Category
            categoryUlEl.appendChild(listEl);
            listEl.appendChild(spanEl);
        });

        // Append to Category
        categoryTitleDiv.appendChild(button);
        categoryTitleDiv.appendChild(iconEl);
        categoryTitleDiv.appendChild(categoryTitleEl);
        categoryEl.appendChild(categoryTitleDiv);
        categoryEl.appendChild(categoryUlEl);
        categoryListEl.appendChild(categoryEl);

        document.querySelector('#shops').appendChild(categoryListEl);
    });
}

function handleButtonClick(e) {
    const id = e.target.id.split('-')[0];
    const categoryEl = document.getElementById(id);
    const icon = categoryEl.querySelector('i');
    const show = categoryEl.dataset.show === 'true' ? 'false' : 'true';
    categoryEl.dataset.show = show;
    if (show === 'true') {
        icon.classList.add('fa-minus');
        icon.classList.remove('fa-plus');
    } else {
        icon.classList.add('fa-plus');
        icon.classList.remove('fa-minus');
    }
}

function setupSearch(data) {
    console.log(data);
    const searchBar = document.getElementById('search-bar');
    const shopList = document.getElementById('shops');
    searchBar.addEventListener('keyup', (e) => {
        if (e.target.value === '') {
            shopList.style.display = 'block';
            const searchList = document.getElementById('search-list');
            if (searchList) {
                searchList.remove();
            }
            return;
        }
        shopList.style.display = 'none';

        const filtered = Object.values(data)
            .flat(1)
            .filter((store) => {
                const matches = getMatchingChars(e.target.value, store).length;
                return matches > e.target.value.length / 2;
            })
            .map((store) => {
                const matches = getMatchingChars(e.target.value, store).length;
                return { store, matches };
            })
            .sort((a, b) => {
                return b.matches - a.matches;
            })
            .map((store) => store.store);

        // Clear Previous Search
        const searchList = document.getElementById('search-list');
        if (searchList) {
            searchList.remove();
        }

        // Render Search
        renderSearch(filtered);
    });
}

function renderSearch(data) {
    const searchList = document.createElement('ul');
    searchList.classList.add('search-list');
    searchList.id = 'search-list';

    data.forEach((store) => {
        const storeLi = document.createElement('li');
        storeLi.classList.add('search-store');
        storeLi.id = `${store}-search`;

        const storeEl = document.createElement('span');
        storeEl.innerText = title(store);
        // Handle Store Hover
        const mapEl = document.getElementById(storeLi.id.split('-')[0]);
        storeLi.onmouseenter = () => {
            mapEl.animate(
                {
                    fill: 'var(--color-primary)'
                },
                { duration: 200, fill: 'forwards' }
            );
        };

        storeLi.onmouseleave = () => {
            mapEl.animate(
                {
                    fill: 'transparent'
                },
                { duration: 200, fill: 'forwards' }
            );
        };

        storeLi.appendChild(storeEl);
        searchList.appendChild(storeLi);
    });

    document.getElementById('sidebar').appendChild(searchList);
}

function getMatchingChars(str1, str2) {
    const str2Regex = new RegExp(`[${str2}]`, 'gi');
    return str1.toLowerCase().match(str2Regex) || [];
}

function title(str) {
    return str
        .replace(/_/g, ' ')
        .replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
}
