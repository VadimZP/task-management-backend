export class UsersRepository {
    private db: any;
    constructor(db) {
        this.db = db;
    }

    async signUp() {
        this.db.create
    }
}