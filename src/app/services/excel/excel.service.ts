import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const flattenedData = this.flattenData(json);
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(flattenedData);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private flattenData(data: any[]): any[] {
    return data.map(item => this.flattenObject(item));
  }

  private flattenObject(ob: any, prefix: string = '', result: any = {}): any {
    let aux =0;
    for (const i in ob) {
      if (ob.hasOwnProperty(i)) {
        if ((typeof ob[i]) === 'object' && ob[i] !== null) {
          if (Array.isArray(ob[i])) {
            ob[i].forEach((item:any, index:number) => {
              this.flattenObject(item, `${prefix}${aux++}`, result);
            });
          } else {
            this.flattenObject(ob[i], `${prefix}${aux++}.`, result);
          }
        } else {
          result[`${prefix}${i}`] = ob[i];
        }
      }
    }
    return result;
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';