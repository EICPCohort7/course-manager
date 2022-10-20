export class StudentDetails {
  #dataFields = {
    email: 'E-mail',
    phoneNumber: 'Phone Number',
    city: 'City',
    province: 'Province',
    country: 'Country',
  };

  constructor(student) {
    this.student = student;
  }

  #buildPrefix(printLabels, field) {
    let prefix = '';
    if (printLabels) {
      if (field === 'province' && this.student.country === 'US') {
        prefix = 'State';
      } else {
        prefix = this.#dataFields[field];
      }
      prefix += ': ';
    }
    return prefix;
  }

  // console.log(details.getDataFields());
  getDataFields() {
    return this.#dataFields;
  }

  // console.log(details.dataFields)
  get dataFields() {
    return this.#dataFields;
  }

  /**
   * @typedef {{printLabels: boolean}} RenderToArgs
   * @param {string | Element} dest Element or id of element to render to
   * @param {RenderToArgs} options
   * @returns
   */
  renderTo(dest, options = {}) {
    let target = null;
    if (typeof dest === 'string') {
      target = document.getElementById(dest);
      if (target === null) {
        console.warn(
          `StudentDetails: could not find element to render to, passed ${dest}. Exiting.`
        );
        return null;
      }
    } else {
      // Assumes this was passed an element
      target = dest;
    }

    // Object destructuring
    let { firstName, lastName } = this.student;
    let card = document.createElement('div');
    card.classList.add('card');
    card.insertAdjacentHTML(
      'afterbegin',
      `<div class="card-header bg-primary text-white">${firstName} ${lastName}</div>`
    );
    let list = document.createElement('ul');
    list.classList.add('list-group', 'list-group-flush');

    /* Hard-coded version
    list.insertAdjacentHTML(
      'beforeend',
      `
      <li class="list-group-item">${this.student.email}</li>
      <li class="list-group-item">${this.student.phoneNumber}</li>
      <li class="list-group-item">${this.student.city}</li>
      <li class="list-group-item">${this.student.province}</li>
      <li class="list-group-item">${this.student.country}</li>
      `
    );
    */

    // Render out a list item for each field in this.#dataFields
    for (let field of Object.keys(this.#dataFields)) {
      let prefix = this.#buildPrefix(options.printLabels, field);
      // e.g. should not print a province when there isn't one
      if (this.student[field]) {
        list.insertAdjacentHTML(
          'beforeend',
          `<li class="list-group-item">${prefix}${this.student[field]}</li>`
        );
      }
    }

    card.insertAdjacentElement('beforeend', list);
    target.replaceChildren(card);
  }
}