export class IncompatibleEquipError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "IncompatibleEquipError";
    }
}