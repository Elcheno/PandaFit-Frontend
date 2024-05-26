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

@Injectable({
  providedIn: 'root'
})
export class GeneratePdfService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly storeService = inject(StoreService);

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
          console.log(res)
          const response: IAnswer = { ...res };
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
      console.log(this.processApiResponse(res));
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
          text: 'Formulario de: ' + res.uuid,
          style: 'header',
        },
        ...outputsForPdf.map(output => ([
          {
          text: `${output.name}`,
          style: {
            fontSize: 13,
            bold: true
          },
          margin: [0, 10, 0, 0]
          },
          {
            text: `Resultado: ${output.result}`,
          },
          {
            text: `Umbral: ${output.umbralText}`,
          }
        ]))
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
            margin: [0, 0, 0, 10],
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
        umbralText: umbralText
      });
    });
  
    return calculatedOutputs;
  }
  
}
