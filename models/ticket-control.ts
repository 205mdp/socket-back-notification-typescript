


class Ticket {
    private id: number;
    private name: string;
    private desk: string;

    constructor(id: number, name: string, desk: string) {
        this.id = id;
        this.name = name;
        this.desk = desk;
    }
}

class TicketControl {

    private lastId: number = 0;
    private tickelist: Ticket[];
    private lastTickets: Ticket[] = [];
    private today: number;

    constructor() {
        this.lastId = 0;
        this.tickelist = [];
        this.lastTickets = [];
        this.today = new Date().getDate();
    }

    init(){
        const {today, tickets, lastTickets, lastId} = require('../data/data.json');

        
    }
}