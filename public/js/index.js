const socket = io();
const clientsNames = document.getElementById('clientsNames');

socket.on('connect', () => {
    // btnAtte.disabled = false;
});

socket.on('last-x-tickets', (payload) => {
    console.log(payload);
    const { lastXTickets } = payload;
    console.log(lastXTickets.length)
    if (lastXTickets.length > 0) {
        let htmlElements = '';
        lastXTickets.forEach((ticket) => {
            const { name, desk } = ticket;
            htmlElements += `<li>${name.toUpperCase()} -  consultorio: ${desk}</li>`;
        });

        clientsNames.innerHTML = htmlElements;
    } else {
        clientsNames.innerHTML = 'Welcome...';
    }



});
