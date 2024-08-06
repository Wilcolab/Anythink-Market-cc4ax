export class Memento {
    private readonly myState: string;

    constructor(state: any) {
        this.myState = JSON.stringify(state);
    }

    get state(): string {
        return JSON.parse(this.myState);
    }
}

export interface IMemento {
    save(): Memento;
    restore(m:Memento): void;
}

export class CareTaker {
    private mementos: Memento[];

    constructor() {
        this.mementos = [];
    }

    addMemento(m:Memento) {
        this.mementos.push(m);
    }

    getMemento(): Memento {
        return this.mementos.pop() || new Memento(null); // null coalescing for when mementos is undefined
    }
}