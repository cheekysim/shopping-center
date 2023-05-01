/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const map = document.getElementById('map-svg');

const min = -350;
const max = 350;

// on mouse down, set dragging to true and store the initial coordinates
map.onmousedown = (event) => {
    map.dataset.x = event.clientX;
    map.dataset.y = event.clientY;
    map.dataset.ox =
        parseInt(
            map.style.getPropertyValue('--map-offset-x').replace('px', '')
        ) * 10 || 0;
    map.dataset.oy =
        parseInt(
            map.style.getPropertyValue('--map-offset-y').replace('px', '')
        ) * 10 || 0;
    map.dataset.dragging = true;
};

// on mouse move, if dragging, calculate the offset and set the new offset
map.onmousemove = (event) => {
    if (map.dataset.dragging !== 'true') {
        return;
    }

    const x = map.dataset.x,
        y = map.dataset.y;

    const dx = event.clientX - x,
        dy = event.clientY - y;

    const ox = map.dataset.ox / 10,
        oy = map.dataset.oy / 10;

    let scale = parseFloat(map.style.getPropertyValue('--map-scale')) || 1;
    scale = 1 / scale;

    const fx = dx * scale + ox,
        fy = dy * scale + oy;

    map.style.setProperty('--map-offset-x', `${clamp(fx, min, max)}px`);
    map.style.setProperty('--map-offset-y', `${clamp(fy, min, max)}px`);
};

// on mouse up, set dragging to false
map.onmouseup = () => {
    map.dataset.dragging = false;
};

// on mouse leave, set dragging to false
map.onmouseleave = () => {
    map.dataset.dragging = false;
};

// on mouse wheel, zoom in/out
map.onwheel = (event) => {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    const scale = parseFloat(map.style.getPropertyValue('--map-scale')) || 1;
    const newScale = scale + direction * 0.1 * scale;
    // map.style.setProperty('--map-scale', clamp(newScale, 0.8, 3).toFixed(1));
    gsap.to(map, {
        '--map-scale': clamp(newScale, 0.8, 3).toFixed(1),
        duration: 0.2
    });
};

// on double click, reset
map.ondblclick = center;

// functions for buttons
function center() {
    gsap.to(map, {
        '--map-offset-x': '0px',
        '--map-offset-y': '0px',
        '--map-scale': '1',
        duration: 0.5
    });
}

function zoomin() {
    const scale = parseFloat(map.style.getPropertyValue('--map-scale')) || 1;
    const newScale = scale + 0.1 * scale;
    gsap.to(map, {
        '--map-scale': clamp(newScale, 0.8, 3).toFixed(1),
        duration: 0.3
    });
    // map.style.setProperty('--map-scale', clamp(newScale, 0.8, 3).toFixed(1));
}

function zoomout() {
    const scale = parseFloat(map.style.getPropertyValue('--map-scale')) || 1;
    const newScale = scale - 0.1 * scale;
    gsap.to(map, {
        '--map-scale': clamp(newScale, 0.8, 3).toFixed(1),
        duration: 0.5
    });
    // map.style.setProperty('--map-scale', clamp(newScale, 0.8, 3).toFixed(1));
}

// helper function to clamp a value between a min and max
function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
