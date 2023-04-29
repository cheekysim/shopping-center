/* eslint-disable no-undef */
getStores();

// Send request to get stores
function getStores() {
    fetch('api/stores')
        .then((res) => res.json())
        .then((data) => {
            renderStores(data);
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
                storeEl.classList.add('map-hover');
            });
        };

        button.onmouseleave = () => {
            stores[key].forEach((store) => {
                const storeEl = document.getElementById(store);
                storeEl.classList.remove('map-hover');
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
                const storeEl = document.getElementById(store.replace('-list', ''));
                storeEl.classList.add('map-hover');
            };

            spanEl.onmouseleave = () => {
                const storeEl = document.getElementById(store.replace('-list', ''));
                storeEl.classList.remove('map-hover');
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

function title(str) {
    return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}
