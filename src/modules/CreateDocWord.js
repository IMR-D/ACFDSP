const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
let fs = require("fs");
let path = require("path");

// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrors));

  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation;
      })
      .join("\n");
    console.log("errorMessages", errorMessages);
    // errorMessages is a humanly readable message looking like this :
    // 'The tag beginning with "foobar" is unopened'
  }
  throw error;
}

const CreateDocWord = async (data) => {
  let content = fs.readFileSync(
    path.resolve("C:/Users/IMRD/Desktop/firstappnw/src/files", "input.docx"),
    "binary"
  );

  let zip = new PizZip(content);
  let doc;
  try {
    doc = new Docxtemplater(zip);
  } catch (error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
    errorHandler(error);
  }

  await doc.setData(data);

  //set the templateVariables
  try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
    errorHandler(error);
  }

  let buf = doc.getZip().generate({ type: "nodebuffer" });

  // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
  fs.writeFileSync(
    path.resolve("C:/Users/IMRD/Desktop/firstappnw/src/files", "output.docx"),
    buf
  );
  return alert("Import finished!");

  //Load the docx file as a binary
};

module.exports = CreateDocWord;
