import { IInputField } from "../../components/formularyDynamicActive/input/input.component";
import { IInputType } from "./i-input-type";
export interface IInputData {
    id?:string;
    name?:string;
    description?:string;
    type:IInputType;
    decimal:boolean;
    decimals?:number;
    unit?:string,
    userOwnerId?:string,
    inputField?: IInputField<any>
}
