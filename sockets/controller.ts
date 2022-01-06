import { Socket } from "socket.io";

export const socketController = (socket: Socket) => {
    console.log('Nueva conexión', socket.id);

    socket.on('disconnect', () => {
        console.log('Connection finished', socket.id);
    });

}