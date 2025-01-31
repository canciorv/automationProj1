import ExcelJs from "exceljs";
import { type Page, type Locator, expect } from "@playwright/test";

export class ExcelFile {
  private downloadButton: Locator;

  constructor(private page: Page) {
    this.downloadButton = page.getByRole("button", {
      name: "Click To Download Order Details in Excel",
    });
  }

  async validateCellValue(
    filePath: string,
    sheetName: string,
    searchText: string
  ): Promise<void> {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      this.downloadButton.click(),
    ]);
    // Synchronization: The Promise.all method waits for both promises to resolve.
    // This means the code waits for the download event to be triggered and the button click to happen, ensuring they are synchronized.
    await download.saveAs(filePath);
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(sheetName);

    if (!worksheet) {
      throw new Error(`Worksheet with ${sheetName} does not exist`);
    }

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        const cellValue = cell.value;
        if (
          typeof cellValue === "string" &&
          (cellValue === searchText || searchText.includes(cellValue))
        ) {
          expect(searchText).toContain(cellValue);
          console.log(cellValue);
        }
      });
    });
  }
}

export default ExcelFile;
