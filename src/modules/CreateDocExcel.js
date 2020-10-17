import JsExcelTemplate from "js-excel-template/nodejs/nodejs";

export const CreateDocExcel = async (data) => {
  try {
    const excelTemplate = JsExcelTemplate.fromFile(
      "../src/files/template.xlsx"
    );
    await excelTemplate.set("clients", data.clients);
    // nodejs:
    await excelTemplate.saveAs("../src/files/output.xlsx");
  } catch (e) {
    alert("Issue importing in excel!");
  }
  return alert("Import finished!");
};
