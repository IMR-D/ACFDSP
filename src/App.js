import React, { useState } from "react";
import "./App.css";
import { FormitedDataWord } from "./modules/FormitedDataWord.js";
import { FormitedDataExcel } from "./modules/FormitedDataExcel.js";

let SHEET_ID = "";
let ACCESS_TOKEN = "";

const checkConnection = async () => {
  try {
    const request = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:ZZ50`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    if (request.ok) {
      return alert("CONNECTION SUCCESSFUL!");
    } else {
      throw new Error("ISSUE ACCESS, CHECK YOUR TOKEN OR SHEETS ID!");
    }
  } catch (e) {
    alert("ISSUE ACCESS, CHECK YOUR TOKEN OR SHEETS ID!");
  }
};

const getSheetValues = async () => {
  try {
    const request = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:ZZ50`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    const data = await request.json();
    return data;
  } catch (e) {
    alert("ISSUE ACCESS, CHECK YOUR TOKEN OR SHEETS ID!");
  }
};

const callFuncWord = async () => {
  try {
    let data = await getSheetValues();
    FormitedDataWord(data);
  } catch (e) {
    alert(e.message);
  }
};

const callFuncExcel = async () => {
  try {
    let data = await getSheetValues();
    FormitedDataExcel(data);
  } catch (e) {
    alert(e.message);
  }
};

function App() {
  const [token, setToken] = useState();
  const [sheetsId, setSheetsId] = useState();
  SHEET_ID = sheetsId;
  ACCESS_TOKEN = token;
  return (
    <div className="App">
      <div className="WorkSpace">
        <label className="title">
          Automatic creation and formatting of documents for student practice
        </label>

        <input
          onChange={(e) => {
            setToken(e.target.value);
          }}
          type="text"
          className="InputToken"
          name="Token"
          id="InputT"
          placeholder="Enter token"
        />
        <input
          onChange={(e) => {
            setSheetsId(e.target.value);
          }}
          type="text"
          className="InputUrl"
          name="URL"
          id="Input"
          placeholder="Enter sheets_id "
        />
        <label className="DescriptionInput">
          (Your need to enter a link to the table.)
        </label>
        <label className="DescriptionToken">
          (Your need to enter a token.)
        </label>

        <button onClick={checkConnection} className="ButtonConnected">
          Check connection
        </button>
        <button className="ButtonWord" onClick={callFuncWord}>
          Export DOCX
        </button>
        <button className="ButtonExcel" onClick={callFuncExcel}>
          Export EXCEL
        </button>
        <a
          className="getLinkToken"
          href="https://developers.google.com/oauthplayground/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GET TOKEN
        </a>
        <span className="DescriptionHowGetToken">
          That to get token you need click on the link,then log in.<br></br>
          Step 1 - select "Google Sheets API v4" and select
          "https://www.googleapis.com/auth/spreadsheets" then to click on the
          blue button "Authorize APIs"<br></br>Step 2 - to click the button on
          "Exchange authorization code for tokens button" <br />
          finally - your token will be in the field "Access token"
        </span>
        <span className="author">Developer - Rassomahin Daniel</span>
      </div>
    </div>
  );
}

export default App;
