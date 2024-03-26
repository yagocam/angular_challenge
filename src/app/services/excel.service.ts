import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

    constructor() { }
  
    processFile(file: File): Promise<any> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
  
          // Processar o arquivo da planilha
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const parsedData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
          // Aqui, você pode manipular os dados como desejar
          console.log(parsedData);
          resolve(parsedData);
        };
  
        reader.onerror = (error) => {
          reject(error);
        };
  
        reader.readAsArrayBuffer(file);
      });
    }
  }
