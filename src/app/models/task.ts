
export class Task {
    _id:number;
    name:string;
    completed: boolean;
    constructor() {
       this._id = 0;
        this.name='';
        this.completed =false;
    }
}