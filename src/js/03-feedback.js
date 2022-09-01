var throttle = require('lodash.throttle');

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
};

refs.feedbackForm.addEventListener('input', throttle(onInputHandler, 500));
refs.feedbackForm.addEventListener('submit', onSubmitHandler);

const feedbackFormData = {};

function onInputHandler(e) {
  feedbackFormData[e.target.name] = e.target.value;
  const feedbackFormDataJSON = JSON.stringify(feedbackFormData);
  localStorage.setItem('feedback-form-state', feedbackFormDataJSON);
}

function onSubmitHandler(e) {
  e.preventDefault();
  console.log(feedbackFormData);
  localStorage.removeItem('feedback-form-state');
  refs.feedbackForm.elements.email.value = '';
  refs.feedbackForm.elements.message.value = '';
}

try {
  const savedFeedbackFormData = localStorage.getItem('feedback-form-state');
  parsedFeedbackFormData = JSON.parse(savedFeedbackFormData);
} catch (error) {}

if (parsedFeedbackFormData) {
  if (parsedFeedbackFormData.email) {
    refs.feedbackForm.elements.email.value = parsedFeedbackFormData.email;
    feedbackFormData.email = parsedFeedbackFormData.email;
  } else {
    refs.feedbackForm.elements.email.value = '';
  }
  if (parsedFeedbackFormData.message) {
    refs.feedbackForm.elements.message.value = parsedFeedbackFormData.message;
    feedbackFormData.message = parsedFeedbackFormData.message;
  } else {
    refs.feedbackForm.elements.message.value = '';
  }
}
