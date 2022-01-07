const socket = io();
const clientsNames = document.getElementById('clientsNames');

socket.on('connect', () => {
    // btnAtte.disabled = false;
});

socket.on('last-x-tickets', (payload) => {

    const { lastXTickets } = payload;

    if (lastXTickets.length > 0) {
        let htmlElements = '';
        lastXTickets.forEach((ticket) => {
            const { name, desk } = ticket;
            htmlElements += `<h2>${name.toUpperCase()} -  consultorio: ${desk}</h2>`;
        });

        clientsNames.innerHTML = htmlElements;
    } else {
        clientsNames.innerHTML = 'Welcome...';
    }
});
