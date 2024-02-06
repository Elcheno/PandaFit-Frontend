export interface OutputData{
    id?: number,
    name?: string,
    description?: string,
    inputsIds?: number[],
    calculations?: string
    umbrals: IUmbral[],
    unit?:string
}

export interface IUmbral {
    value: number,
    text: string,
    type: string
}