import JsExcelTemplate from "js-excel-template/nodejs/nodejs";
const excelTemplate = JsExcelTemplate.fromFile(
  "C:/Users/IMRD/Desktop/firstappnw/src/files/test.xlsx"
);

export const CreateDocExcel = async (data) => {
  try {
    await excelTemplate.set("clients", data.clients);
    // nodejs:
    await excelTemplate.saveAs(
      "C:/Users/IMRD/Desktop/firstappnw/src/files/out.xlsx"
    );
  } catch (e) {
    alert("Issue importing in excel!");
  }
  return alert("Import finished!");
};
