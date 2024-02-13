export interface IOutputData{
    id?: string,
    name?: string,
    description?: string,
    inputsIds?: number[],
    formula?: string
    umbralList: IUmbral[],
    unit?: string
}

export interface IUmbral {
    value: number,
    text: string,
    type: string
}