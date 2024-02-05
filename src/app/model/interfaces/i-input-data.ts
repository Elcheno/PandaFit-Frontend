import { IInputType } from "./i-input-type";
export interface IInputData {
    id?:number;
    name?:string;
    description?:string;
    type:IInputType;
    decimal:boolean;
    decimals:number;
    unit?:string
}
