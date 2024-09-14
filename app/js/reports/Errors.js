export class LocationError extends Error {
    constructor(message, location) {
        super(message);
        this.name = 'LocationError';
        this.location = location;
    }
}
