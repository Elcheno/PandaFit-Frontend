import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { StoreService } from '../store/store.service';
import { IAnswer } from '../../model/interfaces/i-answer';
import { environment as env } from '../../../environments/environment.development';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { FormatUUIDPipe } from '../../pipes/format-uuid.pipe';

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  constructor() { }

  /**
   * Obtiene los datos de una respuesta por su ID desde la API.
   * @param id El ID de la respuesta a obtener.
   * @returns Un Observable que emite la respuesta de la API.
   */
  private getById (id: string): Observable<IAnswer> {
    const sessionData = this.authService.sessionData();
    const token = sessionData?.token;

    return this.http.get<IAnswer>(`${env.api.url}${env.api.active}/${env.api.response}/${id}`, { headers: { Authorization: token ?? "" } })
      .pipe(
        map((res: any) => {
          const response: IAnswer = { ...res };
          console.log(response);
          return response;
        }),
        take(1)
      );
  }

  /**
   * Genera un PDF basado en la respuesta obtenida de la API.
   * @param id El ID de la respuesta para generar el PDF.
   */
  public generatePdf(id: string): void {
    this.getById(id).subscribe((res) => {
      const outputsForPdf = this.processApiResponse(res);
      
      const content = [
        {
          columns: [
            {
              text: 'PandaFit',
              style: 'pandafit',
            },
            {
              text: 'Fecha: ' + new Date(Date.now()).toLocaleString(),
              style: {
                alignment: 'right',
              }
            },
          ]
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [ '*' ],
            body: [
              [ '' ],
              [ '' ],
            ]
          }
        },
        {
          text: 'Nombre: ' + this.formatUUID(res.uuid),
          style: 'header',
        },
        {
          text: 'Datos:',
          style: 'header',
          margin: [10, 0, 10, 0]
        },
        ...res.response.map(input => ([[
          {
            fillColor: '#eeeeee',
            text: `${input.text}: ${input.value} ${input.unit}`,
            style: {
              fontSize: 13,
              bold: true
            },
            margin: [10, 15, 10, 0]
          }
        ]])),
        {
          text: 'Resultados:',
          style: 'header',
          margin: [10, 35, 10, 15]
        },
        {
          layout: 'lightHorizontalLines', // optional
          fillColor: '#eeeeee',
          table: {
            headerRows: 0,
            widths: [ '*' ],
            body: [
              ...outputsForPdf.map(output => ([[
              
                {
                text: `${output.name}`,
                style: {
                  fontSize: 13,
                  bold: true
                },
                margin: [10, 15, 10, 0]
                },
                {
                  text: `Cálculo: ${output.result} ${output.unit}`,
                  margin: [10, 10, 10, 0]
                },
                {
                  text: `Resultado: ${output.umbralText}`,
                  margin: [10, 10, 10, 10]
                }
              ]]))
            ]
          }
        },
      ];

      const pdfDefinition: any = {
        content,
        styles: {
          pandafit: {
            fontSize: 18,
            margin: [0, 0, 0, 20],
            bold: true,
            color: '#57AD57'
          },
          header: {
            fontSize: 15,
            margin: [0, 20, 0, 30],
            bold: true
          }
        }
      };

      const pdf = pdfMake.createPdf(pdfDefinition);
      pdf.open();
    })
  }

  /**
   * Calcula el resultado de una fórmula utilizando los valores de entrada proporcionados.
   * @param formula La fórmula a evaluar.
   * @param inputs Un objeto que contiene los valores de entrada.
   * @returns El resultado de la fórmula evaluada.
   */
  private calculateFormula(formula: string, inputs: { [key: string]: number }): number {
    let evaluatedFormula = formula;
    for (const key in inputs) {
      evaluatedFormula = evaluatedFormula.replace(`#{${key}}`, inputs[key].toString());
    }
    return eval(evaluatedFormula);
  }
  
  /**
   * Determina el umbral correspondiente basado en un valor y una lista de umbrales.
   * @param value El valor a evaluar.
   * @param umbrales Una lista de umbrales que contiene tipos de comparación y textos asociados.
   * @returns El texto del umbral correspondiente.
   */
  private determineUmbral(value: number, umbrales: any[]): string {
    for (const umbral of umbrales) {
      if (umbral.type === '>' && value > umbral.value) {
        return umbral.text;
      } else if (umbral.type === '<' && value < umbral.value) {
        return umbral.text;
      }
    }
    return 'Umbral no definido';
  }
  
  /**
   * Procesa la respuesta de la API para calcular los resultados y determinar los umbrales.
   * @param apiResponse La respuesta de la API a procesar.
   * @returns Una lista de objetos que contienen los resultados calculados y sus umbrales correspondientes.
   */
  private processApiResponse(apiResponse: IAnswer): any[] {
    const calculatedOutputs: any[] = [];
  
    const inputs: { [key: string]: number } = {};

    apiResponse.response.forEach(response => {
      inputs[response.inputId] = Number(response.value);
    });

    apiResponse.outputs.forEach(output => {
      const result = this.calculateFormula(output.formula || '', inputs);
      const umbralText = this.determineUmbral(result, output.umbralList);
      calculatedOutputs.push({
        name: output.name,
        result: result,
        umbralText: umbralText,
        unit : output.unit
      });
    });
  
    return calculatedOutputs;
  }

  public formatUUID(uuid: string): string {
    let response = String(uuid);

    let name = response.split('-')[0];
    let surname1 = response.split('-')[1];
    let surname2 = response.split('-')[2];

    name = name[0].toUpperCase() + name.slice(1);
    surname1 = surname1[0].toUpperCase() + surname1.slice(1);
    surname2 = surname2[0].toUpperCase() + surname2.slice(1);

    return `${name} ${surname1} ${surname2}`;
  }
  
}
