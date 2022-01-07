

const socket = io();
const clientsNames = document.getElementById('clientsNames');
const first = document.getElementById('first');
const second = document.getElementsByClassName('second')[0];

socket.on('connect', () => {
    // btnAtte.disabled = false;
});

socket.on('last-x-tickets', (payload) => {

    const { lastXTickets } = payload;

    if (lastXTickets.length > 0) {
        let htmlElements = '';
        let htmlFirstElement = '';
        let i = 0;
        lastXTickets.forEach((ticket) => {
            const { name, desk } = ticket;
            if (i == 0) {
                htmlFirstElement = `${name.toUpperCase()}<br/>BOX: ${desk}`;
            } else {
                htmlElements += `<div class="custom">${name.toUpperCase()}<br/>BOX: ${desk}</div>`;
            }
            i++;

        });

        first.innerHTML = htmlFirstElement;
        second.innerHTML = htmlElements;
        first.style.width = '75%';
        second.style.display = '';

        const audio = new Audio('./sound/notification.mp3');
        audio.play();

    } else {
        first.innerHTML = 'Welcome...';
        first.style.width = '100%';
        second.style.display = 'none';
    }
});
