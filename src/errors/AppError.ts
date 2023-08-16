export class AppError {
    constructor(public readonly message: string = 'Something went wrong', public readonly errorCode: number = 400) {
        this.message = message,
        this.errorCode = errorCode
    }
}