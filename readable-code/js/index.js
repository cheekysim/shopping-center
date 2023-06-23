/* eslint-disable no-undef */

const shops = {
    banks: ['santandare', 'barclays', 'lloyds'],

    shoes: ['sports_direct', 'trespass'],

    parking: ['parking_a', 'parking_b'],

    clothes: ['new_look', 'superdry', 'select', 'primark'],

    jewellery: ['pandora', 'rolex'],

    electronics: ['apple', 'o2'],

    restaurants: ['prezzo', 'nandos'],

    supermarkets: ['tesco_extra'],

    other: [
        'fountain',

        'fire_exit_1',

        'fire_exit_2',

        'fire_exit_3',

        'fire_exit_4'
    ]
};

const descriptions = {
    santandare:
        'Santander is a Spanish multinational commercial bank and financial services company founded and based in Santander, Spain. In addition to hubs in Madrid and Barcelona, Santander maintains a presence in all global financial centres as the largest Spanish banking institution in the world.',
    barclays:
        'Barclays plc is a British multinational investment bank and financial services company, headquartered in London, England. Apart from investment banking, Barclays is organised into four core businesses: personal banking, corporate banking, wealth management, and investment management.',
    // eslint-disable-next-line quotes
    lloyds: "Lloyds Bank plc is a British retail and commercial bank with branches across England and Wales. It has traditionally been considered one of the 'Big Four' clearing banks. The bank was founded in Birmingham in 1765. It expanded during the nineteenth and twentieth centuries and took over a number of smaller banking companies.",
    sports_direct:
        // eslint-disable-next-line quotes
        "Sports Direct International plc is a British retailing group. Established in 1982 by Mike Ashley, the company is the United Kingdom's largest sports-goods retailer and operates roughly 670 stores worldwide. The company owns a large number of sporting brands and trades predominantly under the SportsDirect.com brand.",
    trespass:
        'Trespass is a privately owned international sportswear brand based in the United Kingdom. It provides fleece, outdoor clothing, waterproof jackets, ski jackets and equipment, camping equipment, and more.',
    parking_a:
        'Parking A is a car park located in the bottom left of the centre. It is the largest car park in the centre and is the most popular.',
    parking_b:
        'Parking B is a car park located in the top right of the centre. It is the smaller car park and is often less busy than Parking A.',
    new_look:
        'New Look is a British global fashion retailer with a chain of high street shops. It was founded in 1969 and has been owned since May 2015 by investment company Brait SA, controlled by Christo Wiese. The chain sells womenswear, menswear, and clothing for teens.',
    superdry:
        'Superdry plc is a UK branded clothing company, and owner of the Superdry label. Superdry products combine vintage Americana styling with Japanese inspired graphics. It is listed on the London Stock Exchange.',
    select: 'Select is a British womenswear retailer founded in the 1980s. It has over 180 stores in the UK. The company went into administration in May 2019, but was bought out by Cafer Mahiroğlu, the owner of Turkish clothing manufacturer, Çağrı Giyim, in June 2019.',
    primark:
        'Primark is an Irish fast fashion retailer with headquarters in Dublin, Ireland, and a subsidiary of the British food processing and retail company ABF. The company is named Penneys in the Republic of Ireland, where it was founded.',
    pandora:
        'Pandora A/S is a Danish jewellery manufacturer and retailer founded in 1982 by Per Enevoldsen. The company started as a family-run jewellery shop in Copenhagen. Pandora is known for its customizable charm bracelets, designer rings, necklaces and watches.',
    rolex: 'Rolex SA is a Swiss luxury watch manufacturer based in Geneva, Switzerland. Originally founded as Wilsdorf and Davis by Hans Wilsdorf and Alfred Davis in London, England in 1905, the company registered Rolex as the brand name of its watches in 1908 and became Rolex Watch Co. Ltd. in 1915.',
    apple: 'Apple Inc. is an American multinational technology company headquartered in Cupertino, California, that designs, develops, and sells consumer electronics, computer software, and online services.',
    o2: 'O2 is a British telecommunications services provider, owned by Telefónica, headquartered in Slough, England. O2 is the second-largest mobile network operator in the United Kingdom, with 26.4 million subscribers as of February 2020, after EE, and followed by Vodafone and Three.',
    prezzo: 'Prezzo is a chain of British-owned restaurants serving food inspired by Italian cuisine in the United Kingdom and Ireland. The first restaurant opened on New Oxford Street, London in November 2000. By 2018, the chain had over 180 locations.',
    // eslint-disable-next-line quotes
    nandos: "Nando's is a South African restaurant chain that specialises in Portuguese-African food, including its signature flame-grilled peri-peri style chicken. Founded in Johannesburg in 1987, Nando's operates over 1,000 outlets in 35 countries.",
    tesco_extra:
        'Tesco Extra is a chain of supermarkets in the United Kingdom owned by Tesco, that is larger than the Tesco Superstore chain. Like Tesco Superstores, they stock groceries and a much smaller range of non-food goods than Extra hypermarkets.',
    fountain:
        'The Fountain is a water feature located in the centre of the shopping centre. It is a popular meeting point for shoppers and is often used as a landmark for directions.',
    fire_exit_1:
        'Fire Exit 1 is located in the left middle of the centre. It is the closest fire exit to Parking A.',
    fire_exit_2:
        'Fire Exit 2 is located in the top middle of the centre. It is the closest fire exit to Parking B.',
    fire_exit_3:
        'Fire Exit 3 is located in the right middle of the centre. It is the closest fire exit to Parking B.',
    fire_exit_4:
        'Fire Exit 4 is located in the bottom middle of the centre. It is the closest fire exit to Parking A.'
};

renderStores(shops);
setupSearch(shops);

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

            const buttonEl = document.createElement('button');
            buttonEl.classList.add('store-button');
            buttonEl.id = `${store}-button`;
            buttonEl.setAttribute('type', 'button');

            // Handle Store Button Click
            buttonEl.addEventListener('click', () => {
                // Close Open Modal
                handleModal(store);
            });

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
                const modal = document.querySelector('.modal');
                if (modal) return;
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
            spanEl.appendChild(buttonEl);
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

function closeModal(modalEl, modalOverlayEl, store) {
    modalEl.animate(
        {
            opacity: [1, 0]
        },
        { duration: 200, fill: 'forwards' }
    );

    modalOverlayEl.animate(
        {
            opacity: [1, 0]
        },
        { duration: 200, fill: 'forwards' }
    );

    const storeEl = document.getElementById(store);
    storeEl.animate(
        {
            fill: 'transparent'
        },
        { duration: 200, fill: 'forwards' }
    );
    setTimeout(() => {
        modalEl.remove();
        modalOverlayEl.remove();
    }, 200);
}

function handleModal(store) {
    const modal = document.querySelector('.modal');
    if (modal) {
        closeModal(modal, document.querySelector('.modal-overlay'), store);
    }
    // Create Modal
    const modalEl = document.createElement('div');
    modalEl.classList.add('modal');
    modalEl.innerHTML = `
                    <h2>${title(store.replace('_', ' '))}</h2>
                    <button class="close">&times;</button>
                    <p>${descriptions[store]}</p>
                `;

    // Create Modal Overlay
    const modalOverlayEl = document.createElement('div');
    modalOverlayEl.classList.add('modal-overlay');

    // Close Modal on Overlay Click
    modalOverlayEl.addEventListener('click', () => {
        closeModal(modalEl, modalOverlayEl, store);
    });

    // Add Close Button Functionality
    const closeButton = modalEl.querySelector('.close');
    closeButton.addEventListener('click', () => {
        closeModal(modalEl, modalOverlayEl, store);
    });

    // Close Modal on Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modalEl, modalOverlayEl, store);
        }
    });

    // Change Color of SVG
    const storeEl = document.getElementById(store);
    storeEl.animate(
        {
            fill: 'var(--color-primary)'
        },
        { duration: 200, fill: 'forwards' }
    );

    // Animate Modal
    modalEl.animate(
        {
            opacity: [0, 1]
        },
        { duration: 200, fill: 'forwards' }
    );

    // Animate Modal Overlay
    modalOverlayEl.animate(
        {
            opacity: [0, 1]
        },
        { duration: 200, fill: 'forwards' }
    );

    // Append to Body
    document.body.appendChild(modalEl);
    document.body.appendChild(modalOverlayEl);
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

        const buttonEl = document.createElement('button');
        buttonEl.classList.add('store-button');
        buttonEl.id = `${store}-button`;
        buttonEl.setAttribute('type', 'button');

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
            const modal = document.querySelector('.modal');
            if (modal) return;
            mapEl.animate(
                {
                    fill: 'transparent'
                },
                { duration: 200, fill: 'forwards' }
            );
        };

        // Handle Store Click
        buttonEl.addEventListener('click', () => {
            handleModal(store);
        });

        storeEl.appendChild(buttonEl);
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
