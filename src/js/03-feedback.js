import throttle from 'lodash.throttle';
const STORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const formData = {};

window.addEventListener('DOMContentLoaded', onLoad);
form.addEventListener('submit', onSubmitForm);
form.addEventListener('input', onInputForm);

function onInputForm(e) {
  e.preventDefault();

  const formElements = e.currentTarget.elements;
  const mailValue = formElements.email.value;
  const messageValue = formElements.message.value;

  formData.email = mailValue;
  formData.message = messageValue;
}

function onSubmitForm(e) {
  e.preventDefault();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  console.log(parsedData);

  e.target.reset();
}

function onLoad(e) {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  if (!localStorage.hasOwnProperty(STORAGE_KEY)) {
    return;
  } else {
    const formElements = form.elements;
    formElements.email.value = parsedData.email;
    formElements.message.value = parsedData.message;
  }
}
