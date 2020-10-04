const CreateDocWord = require("./CreateDocWord");

const stackOfStudents = []; // here we put every student in order not to repeat
const stackOfThemes = []; // here we put every theme in order not to repeat
let objectFillOfData = { clients: [] }; // this object is needed to create JSON
let student = [];

let id = 1; // every block data assigned unique identifier
let type_training_a = 0; // количество студентов сдающих заочно
let type_training_p = 0; //количество студентов сдающих очно
let count_themes_p = 0; // количество тем ТОЛЬКО очно
let count_students_in_fact = 0; // количество докладчиков по факту (ВСЕГО)
let count_themes_in_fact = 0; // количество тем по факту (ВСЕГО)

function definePropsObject(
  id,
  name,
  teacher,
  university,
  theme,
  type_training_p,
  type_training_a,
  count_themes_p,
  count_students_in_fact,
  count_themes_in_fact
) {
  this.id = id;
  this.name = name;
  this.teacher = teacher;
  this.university = university;
  this.theme = theme;
  this.type_training_p = type_training_p;
  this.type_training_a = type_training_a;
  this.count_themes_p = count_themes_p;
  this.count_students_in_fact = count_students_in_fact;
  this.count_themes_in_fact = count_themes_in_fact;
}

function formBlockData(
  index,
  theme,
  fullTeacher,
  teacher,
  nameUniversity,
  data,
  type_training_p,
  type_training_a,
  count_themes_p,
  count_students_in_fact,
  count_themes_in_fact
) {
  for (let i = index; i < data.values.length; i++) {
    if (
      theme.toLowerCase() === data.values[i][44].toLowerCase() &&
      data.values[i][3].toLowerCase() !== "не является учащимся"
    ) {
      student.push(
        data.values[i][1] +
          " (" +
          data.values[i][2] +
          " " +
          data.values[i][4] +
          " )"
      );
    }
  }

  count_themes_in_fact = type_training_p + type_training_a;
  count_students_in_fact = stackOfStudents.length + 1;

  objectFillOfData.clients.push(
    new definePropsObject(
      id,
      student[0],
      fullTeacher,
      nameUniversity,
      theme,
      type_training_p,
      type_training_a,
      count_themes_p,
      count_students_in_fact,
      count_themes_in_fact
    )
  );
  return;
}

export const FormitedDataWord = (data) => {
  for (let i = 1; i < data.values.length; i++) {
    let theme = data.values[i][44]; // get new every time theme
    let fullTeacher = `Руководитель - ${data.values[i][34]}, ${data.values[i][37]}, ${data.values[i][38]}`; // formited teacher for insert in feature objectFillOfData
    let teacher = data.values[i][34]; // get new teacher by which we will check our students
    let nameUniversity = `${data.values[i][9]}, ${data.values[i][8]}, ${data.values[i][6]}, ${data.values[i][10]}`;

    // check includes students,themes in order to not repeat the same
    if (
      !stackOfThemes.some((e) => e === theme) &&
      data.values[i][46].toLowerCase() === "очное"
    ) {
      count_themes_p++;
    }

    // check type of training and incrementing desired
    data.values[i][46].toLowerCase() === "очное" &&
    data.values[i][3].toLowerCase() !== "не является учащимся"
      ? type_training_p++
      : type_training_a++;
    if (
      //  !stackOfStudents.some((e) => e === data.values[i][1]) &&
      data.values[i][3].toLowerCase() !== "не является учащимся" &&
      !stackOfThemes.some((e) => e === theme)
    ) {
      // check type of training together with theme and if match incrementing the theme -  full time education
      stackOfStudents.push(data.values[i][1]); // push student in order not to return to him again
      stackOfThemes.push(theme); // pussh theme in order not to return to her again

      formBlockData(
        i,
        theme,
        fullTeacher,
        teacher,
        nameUniversity,
        data,
        type_training_p,
        type_training_a,
        count_themes_p,
        count_students_in_fact,
        count_themes_in_fact
      ); // this create new obj
      //before next student need to clear
      student = []; //every student includes fio,group,course and etc and we working with each separately so us needed array which includes all properties our student.
      id++;
    } else {
      stackOfThemes.push(theme); // pussh theme in order not to return to her again
    }
  }

  objectFillOfData = JSON.stringify(objectFillOfData);
  objectFillOfData = JSON.parse(objectFillOfData);
  CreateDocWord(objectFillOfData);

  return;
};
