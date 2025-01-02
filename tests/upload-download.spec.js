const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');

async function writeExcelTest(searchText,updateValue,change,filePath){
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
    let cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = updateValue;
    await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet,searchText){
    let output = {row:-1, column:-1};
    worksheet.eachRow((row,rowNumber) =>{
        row.eachCell((cell,colNumber)=>{    
            if(cell.value === searchText){
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}

test('Upload download excel validation',async ({page})=>{

    const textSearch = 'Mango'
    const updateValue = '99';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator("#downloadButton").click(),
    ]);
    // Synchronization: The Promise.all method waits for both promises to resolve. 
    // This means the code waits for the download event to be triggered and the button click to happen, ensuring they are synchronized.

    const downloadPath = '/Users/2226004/Downloads/download.xlsx';
    await download.saveAs(downloadPath);
    writeExcelTest(textSearch, updateValue, { rowChange: 0, colChange: 2 }, downloadPath);
    await page.locator('#fileinput').setInputFiles(downloadPath); // you can only use setInputFiles if your <input> has type='file'
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});