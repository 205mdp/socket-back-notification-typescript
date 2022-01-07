import path from 'path';
import fs from 'fs';


export class Ticket {
    private id: number;
    private name: string;
    desk: string;

    constructor(id: number, name: string, desk: string) {
        this.id = id;
        this.name = name;
        this.desk = desk;
    }
}


interface ITicketData {
    lastId: number;
    tickets: Ticket[];
    today: number;
    lastTickets: Ticket[];
}


export default class TicketControl {

    private lastId: number = 0;
    private tickets: Ticket[];
    private lastTickets: Ticket[] = [];
    private today: number;

    constructor() {
        this.lastId = 0;
        this.tickets = [];
        this.lastTickets = [];
        this.today = new Date().getDate();

        this.init();

    }

    private init() {
        try {
            const data = require('../data/data.json');
            const { today, tickets, lastTickets, lastId } = require('../data/data.json');
            if (today === this.today) {
                this.tickets = tickets;
                this.lastTickets = lastTickets;
                this.lastId = lastId;
            }
            else {

                this.saveDb();
            }

        } catch (error) {
            console.log(error)
        }
    }

    get toJson(): ITicketData {
        return {
            lastId: this.lastId,
            tickets: this.tickets,
            today: this.today,
            lastTickets: this.lastTickets
        }
    }

    get getLastTickets(): Ticket[] {
        return this.lastTickets;
    }

    get getAllTickets(): Ticket[] {
        return this.tickets;
    }

    saveDb(): void {
        const dbPath = path.resolve(__dirname, '../data/data.json');
        fs.writeFile(dbPath, JSON.stringify(this.toJson), (err) => {
            if (err) throw err;
            return true;
        });
    }
    newTicket(name: string): Ticket {
        this.lastId++;
        const ticket = new Ticket(this.lastId, name, '');
        this.tickets.push(ticket);
        this.saveDb();
        return ticket;
    }

    getTicket(desk: string): Ticket | boolean {
        if (this.tickets.length === 0) {
            return false;
        } else {
            const ticket = this.tickets.shift()!;
            ticket.desk = desk;
            this.lastTickets.unshift(ticket);
            if (this.lastTickets.length > 4) {
                this.lastTickets.pop();
            }
            this.saveDb();
            return ticket;
        }
    }
}

