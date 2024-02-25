import ApiReturn from "./ApiReturn";

export default class List<T> extends ApiReturn {
    total: number;
    numberOfPages: number;
    next: string;
    prev: string;
    current: string;
    items: T[];

    constructor(classConstructor: new (data: any) => T, data = null) {
        super();
        if (data === null) return;
        this.total = data.total;
        this.numberOfPages = data.numberOfPages;
        this.next = data.next;
        this.prev = data.prev;
        this.current = data.current;
        this.items = data.items.map((item: any) => new classConstructor(item));
    }
}