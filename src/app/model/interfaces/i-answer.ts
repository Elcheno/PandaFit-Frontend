import { input } from "@angular/core"
import { IOutputData } from "./i-output-data"

export interface IAnswer {
    id?: string
    date: Date
    formActId: string
    uuid: string
    response: IResponse[]
    outputs: IOutputData[]
}

export interface IResponse {
    inputId: string
    text: string
    value: string
    unit: string
}



// {
//     "id": "4c94f9f3-7d9f-4e1b-8820-4857902a6197",
//     "date": "2024-03-30T18:25:30.881",
//     "formActId": "5178737b-1a55-4e5f-8f4c-0de96d51faa7",
//     "uuid": "jocalo32024",
//     "response": [
//       {
//         "inputId": "a32282fc-cdc9-4888-b8c7-9c827cd3a6a1",
//         "value": "180"
//       }
//     ]
//   }
