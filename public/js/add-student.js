import { linkLists } from './link-lists.js';

let countriesSelect = document.getElementById('country');
let provincesSelect = document.getElementById('province');
linkLists(countriesSelect, provincesSelect);

let form = document.getElementById('student-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Either one works
  // let data = new FormData(form);
  let data = new FormData(event.target);

  let firstName = data.get('firstName');
  console.log(`The student's first name is ${firstName}`);

  // Iterate over entries, each entry is a tuple of the field name
  // and the value for the field, e.g. ['firstName', 'John']
  /*
  for (let entry of data) {
    console.log(`Field: ${entry[0]} | Value: ${entry[1]}`);
  }
  */

  // Use de wstructuring to give the variables clearer names
  for (let [field, value] of data) {
    console.log(`Field: ${field} | Value: ${value}`);
  }

  // Just values
  /*
  for (let value of data.values()) {
    console.log(`Value: ${value}`);
  }
  */
});
