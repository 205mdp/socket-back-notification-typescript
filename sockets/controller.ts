import { Socket, Server } from "socket.io";
import TicketControl from "../models/ticket-control";

const tickeControl = new TicketControl();

export const socketController = (socket: Socket, io: Server) => {
    console.log('New Connection', socket.id);

    socket.on('disconnect', () => {
        console.log('Connection finished', socket.id);
    });

    socket.on('add-ticket', (data: { name: string }, callback: any) => {
        const newTicket = tickeControl.newTicket(data.name);
        callback(newTicket);
        io.emit('count-ticket', { count: tickeControl.getAllTickets.length })
        io.emit('all-tickets', { allTickets: tickeControl.getAllTickets });
        console.log(data.name);
    });

    socket.emit('last-x-tickets', { lastXTickets: tickeControl.getLastTickets });
    socket.emit('all-tickets', { allTickets: tickeControl.getAllTickets });
}