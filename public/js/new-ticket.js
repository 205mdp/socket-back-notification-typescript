const socket = io();

const lstCustomers = document.getElementById('lstCustomers');
const btnSubmit = document.getElementById('btnSubmit');
const socketStatus = document.getElementById('socketStatus');
const countCustomers = document.getElementById('countCustomers');
const inputName = document.getElementById('name');
const divInfo = document.getElementById('divInfo');

socket.on('connect', () => {
    btnSubmit.disabled = false;
    socketStatus.classList.remove('bg-danger')
    socketStatus.classList.add("bg-success");
    socketStatus.innerHTML = 'Online';
});

socket.on('disconnect', () => {
    btnSubmit.disabled = true;
    socketStatus.classList.remove('bg-success')
    socketStatus.classList.add("bg-danger");
    socketStatus.innerHTML = 'Offline';
});

socket.on('all-tickets', ({ allTickets }) => {

    let htmlElements = '';
    allTickets.forEach((ticket) => {
        const { name, desk } = ticket;
        htmlElements += `<li  class="list-group-item">${name.toUpperCase()} </li>`;
    });
    countCustomers.innerHTML = allTickets.length.toString();
    lstCustomers.innerHTML = htmlElements;
});

btnSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    btnSubmit.disabled = true;


    const name = inputName.value.trim();
    if (name.length > 4) {
        socket.emit('add-ticket', { name }, (payload) => {
            const { id } = payload;
            inputName.value = '';
            btnSubmit.disabled = false;
            inputName.focus();
            divInfo.innerHTML = `Customer  ${name} added with id ${id}`;
            divInfo.style.display = "block";
            setTimeout(() => {
                divInfo.style.display = "none";
            }, 3000);
        });
    } else {
        btnSubmit.disabled = false;
        inputName.focus();
        divInfo.innerHTML = `Customer  ${name} is invalid`;
        divInfo.style.display = "block";
        setTimeout(() => {
            divInfo.style.display = "none";
        }, 3000);
    }


});


