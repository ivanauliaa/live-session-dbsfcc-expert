class Album {
    constructor({ id, name, year }) {
        this.id = id;
        this.name = name;
        this.year = year;
    }

    getSummary() {
        if (!this.id || !this.name || !this.year) {
            throw new Error('id, name, and year shouldn\'t be empty');
        }

        return {
            id: this.id,
            title: `${this.name} (${this.year})`,
        }
    }
}

module.exports = Album;
