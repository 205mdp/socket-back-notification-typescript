const socket = io();


const socketStatus = document.getElementById('socketStatus');
const spnCount = document.getElementById('spnCount');
const btnNextCustomer = document.getElementById('btnNextCustomer');
const inputDeskNumber = document.getElementById('inputDeskNumber');

btnNextCustomer.addEventListener('click', (e) => {
    e.preventDefault();

    const desk = inputDeskNumber.value;
    socket.emit('take-ticket', { desk }, (payload) => {

        const { ticket, message, ok } = payload;
        if (ok) {
            lblCustomer.innerHTML = `<span class="text-success">${ticket.name.toUpperCase()}</span>`;
        }
        else {
            lblCustomer.innerHTML = `<span class="text-danger">${message}</span>`;
        }
    });

})

socket.on('connect', () => {
    // btnSubmit.disabled = false;
    socketStatus.classList.remove('bg-danger')
    socketStatus.classList.add("bg-success");
    socketStatus.innerHTML = 'Online';
});

socket.on('disconnect', () => {
    // btnSubmit.disabled = true;
    socketStatus.classList.remove('bg-success')
    socketStatus.classList.add("bg-danger");
    socketStatus.innerHTML = 'Offline';
});

socket.on('count-ticket', (payload) => {
    const { count } = payload
    spnCount.innerHTML = count.toString();
})