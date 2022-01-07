import { Socket, Server } from "socket.io";
import TicketControl, { Ticket } from "../models/ticket-control";

const tickeControl = new TicketControl();
interface iTicketCallback {
    ok: boolean;
    message?: string;
    ticket?: Ticket;
}

export const socketController = (socket: Socket, io: Server) => {
    // Errase console.log to production.
    console.log('New Connection', socket.id);

    socket.emit('last-x-tickets', { lastXTickets: tickeControl.getLastTickets });
    socket.emit('all-tickets', { allTickets: tickeControl.getAllTickets });
    socket.emit('count-ticket', { count: tickeControl.getAllTickets.length })

    socket.on('disconnect', () => {
        console.log('Connection finished', socket.id);
    });

    socket.on('add-ticket', (data: { name: string }, callback: (ticket: Ticket) => void) => {
        const newTicket = tickeControl.newTicket(data.name);
        callback(newTicket);
        io.emit('count-ticket', { count: tickeControl.getAllTickets.length })
        io.emit('all-tickets', { allTickets: tickeControl.getAllTickets });
    });

    socket.on('take-ticket', (data: { desk: string }, callback: (payload: iTicketCallback) => void) => {
        if (!data.desk) {
            return callback({ ok: false, message: 'Desk is required' });
        }
        const ticket = tickeControl.getTicket(data.desk);
        if (!ticket) {
            return callback({ ok: false, message: 'There is no tickets' });
        } else {
            socket.broadcast.emit('last-x-tickets', { lastXTickets: tickeControl.getLastTickets });
            socket.broadcast.emit('all-tickets', { allTickets: tickeControl.getAllTickets });
            io.emit('count-ticket', { count: tickeControl.getAllTickets.length });
            return callback({
                ok: true,
                ticket: <Ticket>ticket!
            });
        }
    })


}