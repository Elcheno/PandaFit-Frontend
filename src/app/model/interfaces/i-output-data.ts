export interface OutputData{
    id?:number,
    name?:string,
    description?:string,
    inputsIds?:number[],
    calculations?:string
    lowerValue:{
        value:number,
        text:string
    },
    upperValue:{
        value:number,
        text:string
    }
    unit?:string
}