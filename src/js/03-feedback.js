import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = {};

window.addEventListener('DOMContentLoaded', onLoad);
form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', throttle(onInputForm, 500));

function onInputForm(e) {
  e.preventDefault();

  const formElements = form.elements;
  const mailValue = formElements.email.value;
  const messageValue = formElements.message.value;

  formData.email = mailValue;
  formData.message = messageValue;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);

  console.log(parsedData);
}

function onSubmitForm(e) {
  e.preventDefault();

  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  console.log(parsedData);

  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onLoad() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  if (savedData) {
    const formElements = form.elements;
    formElements.email.value = parsedData.email;
    formElements.message.value = parsedData.message;
    return;
  }
}
