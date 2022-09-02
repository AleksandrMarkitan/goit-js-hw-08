import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

refs.feedbackForm.addEventListener('input', throttle(onInputHandler, 500));
refs.feedbackForm.addEventListener('submit', onSubmitHandler);

const feedbackFormData = {};
const { email, message } = refs.feedbackForm.elements;

function onInputHandler(e) {
  feedbackFormData[e.target.name] = e.target.value;
  const feedbackFormDataJSON = JSON.stringify(feedbackFormData);
  localStorage.setItem('feedback-form-state', feedbackFormDataJSON);
}

function onSubmitHandler(e) {
  e.preventDefault();
  console.log(feedbackFormData);
  localStorage.removeItem('feedback-form-state');
  email.value = '';
  message.value = '';
}

let parsedData;
try {
  const savedFeedbackFormData = localStorage.getItem('feedback-form-state');
  parsedData = JSON.parse(savedFeedbackFormData);
} catch (error) {}

if (parsedData) {
  if (parsedData.email) {
    email.value = parsedData.email;
    feedbackFormData.email = parsedData.email;
  } else {
    email.value = '';
  }
  if (parsedData.message) {
    message.value = parsedData.message;
    feedbackFormData.message = parsedData.message;
  } else {
    message.value = '';
  }
}
