import { IUser } from "./i-user";

export interface IInstitution {
    id: string,
    name: string,
    userList: IUser[],
}
