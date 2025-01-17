const ExcelJs = require('exceljs');
import { type Page, type Locator, expect } from "@playwright/test";

export class ExcelFile{
    page: Page;
    downloadButton: Locator;
    constructor(page){
        this.page = page;
        this.downloadButton = page.getByRole('button', { name: 'Click To Download Order Details in Excel' });
    }
    
async validateCellValue(filePath, sheetName, searchText) {

    const [download] = await Promise.all([
        this.page.waitForEvent("download"),
        this.downloadButton.click()
    ]);
    // Synchronization: The Promise.all method waits for both promises to resolve. 
    // This means the code waits for the download event to be triggered and the button click to happen, ensuring they are synchronized.
    await download.saveAs(filePath);
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);
    await worksheet.eachRow((row) =>{
        row.eachCell((cell)=>{    
            if(cell.value ===  searchText || searchText.includes(cell.value)){
                expect(searchText).toContain(cell.value);
                console.log(cell.value);
            }
        });
    });

}

}

module.exports = {ExcelFile}