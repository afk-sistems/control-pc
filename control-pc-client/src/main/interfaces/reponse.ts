export interface IResponse<T> {
    data: T | undefined;
    error: any | undefined;
}