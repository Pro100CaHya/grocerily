import Excel from "exceljs";

class ExcelService {
    async write(data, columns) {
        try {
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Продукты');
            worksheet.columns = columns;

            let prevCategory = "";
            let uniqueCategoryIdx = 0;

            data.forEach((row, index) => {
                if (prevCategory === row["category_name"]) {
                    const newRow = { ...row, category_name: "" }
                    worksheet.addRow(newRow);
                } else {
                    prevCategory = row["category_name"];
                    worksheet.addRow(row);
                }
            });

            await workbook.xlsx.writeFile("data.xlsx");

            return "Done";
        } catch (e) {
            return e;
        }
    }
}

export default new ExcelService();