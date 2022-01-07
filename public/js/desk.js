const socket = io();

const socketStatus = document.getElementById('socketStatus');
const spnCount = document.getElementById('spnCount');
const btnNextCustomer = document.getElementById('btnNextCustomer');
const inputDeskNumber = document.getElementById('inputDeskNumber');
const lblCustomerError = document.getElementById('lblCustomerError');

btnNextCustomer.disabled = true;
btnNextCustomer.addEventListener('click', (e) => {
    e.preventDefault();

    const desk = inputDeskNumber.value;
    socket.emit('take-ticket', { desk }, (payload) => {

        const { ticket, message, ok } = payload;
        if (ok) {
            lblCustomer.innerHTML = `<span class="text-success">${ticket.name.toUpperCase()}</span>`;
        }
        else {
            lblCustomerError.innerHTML = `<span class="text-danger">${message}</span>`;
        }
    });

})

inputDeskNumber.addEventListener('keyup', (e) => {
    btnNextCustomer.disabled = false;
    if (e.key === 'Enter') {
        if (inputDeskNumber.value !== "") {
            btnNextCustomer.disabled = false;
            inputDeskNumber.style.display = "none";
            const h1Title = document.getElementById('h1Title');
            h1Title.innerHTML = `Desk ${inputDeskNumber.value}`;
        }
    }

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
    const { count } = payload;
    if (count > 0) {
        lblCustomerError.innerHTML = '';
    }
    spnCount.innerHTML = count.toString();
})