import { CreateDocExcel } from "./CreateDocExcel";

const stackOfStudents = []; // here we put every student in order not to repeat
let objectFillOfData = { clients: [] }; // this object is needed to create JSON
let id = 1; // every block data assigned unique identifier

function definePropsObjectStudent(
  id,
  name,
  position,
  course_N,
  course_G,
  specialty,
  place_work_d,
  place_work_f,
  place_work_i,
  place_work,
  place_work_city,
  conference,
  theme,
  teacher,
  count_pages,
  type_training,
  phone,
  email,
  academic_degree
) {
  this.id = id;
  this.name = name;
  this.position = position; // должность
  this.course_N = course_N; //курс
  this.course_G = course_G; // группа
  this.specialty = specialty;
  this.place_work_d = place_work_d;
  this.place_work_f = place_work_f;
  this.place_work_i = place_work_i;
  this.place_work = place_work;
  this.place_work_city = place_work_city;
  this.conference = conference;
  this.theme = theme;
  this.teacher = teacher;
  this.count_pages = count_pages;
  this.type_training = type_training;
  this.phone = phone;
  this.email = email;
  this.academic_degree = academic_degree;
}

function formBlockData(
  id,
  name,
  position,
  course_N,
  course_G,
  specialty,
  place_work_d,
  place_work_f,
  place_work_i,
  place_work,
  place_work_city,
  conference,
  theme,
  teacher,
  count_pages,
  type_training,
  phone,
  email,
  academic_degree
) {
  objectFillOfData.clients.push(
    new definePropsObjectStudent(
      id,
      name,
      position,
      course_N,
      course_G,
      specialty,
      place_work_d,
      place_work_f,
      place_work_i,
      place_work,
      place_work_city,
      conference,
      theme,
      teacher,
      count_pages,
      type_training,
      phone,
      email,
      academic_degree
    )
  );
}

export const FormitedDataExcel = (data) => {
  for (let i = 1; i < data.values.length; i++) {
    if (!stackOfStudents.some((e) => e === data.values[i][1])) {
      let name = data.values[i][1];
      let position = data.values[i][2];
      let course_N = data.values[i][3];
      let course_G = data.values[i][4];
      let specialty = data.values[i][5];
      let place_work_d = data.values[i][6];
      let place_work_f = data.values[i][7];
      let place_work_i = data.values[i][8];
      let place_work = data.values[i][9];
      let place_work_city = data.values[i][10];
      let conference = data.values[i][43];
      let theme = data.values[i][44];
      let teacher = data.values[i][34];
      let count_pages = data.values[i][45];
      let type_training = data.values[i][46];
      let phone = data.values[i][47];
      let email = data.values[i][48];
      let academic_degree = data.values[i][35];
      formBlockData(
        id,
        name,
        position,
        course_N,
        course_G,
        specialty,
        place_work_d,
        place_work_f,
        place_work_i,
        place_work,
        place_work_city,
        conference,
        theme,
        teacher,
        count_pages,
        type_training,
        phone,
        email,
        academic_degree
      );
      stackOfStudents.push(name);
      id++;
    }
  }

  objectFillOfData = JSON.stringify(objectFillOfData);
  objectFillOfData = JSON.parse(objectFillOfData);
  CreateDocExcel(objectFillOfData);
};
