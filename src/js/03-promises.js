import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const refs = {
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

form.addEventListener('submit', handleFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  let delay = refs.delay.value;
  let step = refs.step.value;
  let amount = refs.amount.value;

  let currentObj = { amount, step, delay };
  let newDelay = Number(currentObj.delay);

  for (let i = 1; i <= currentObj.amount; i += 1) {
    newDelay += Number(currentObj.step);
    createPromise(i, newDelay).then(onSuccess).catch(onError);
    form.reset();
  }
}

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError(error) {
  Notify.failure(`❌ Rejected promise ${error.position} in ${error.delay}ms`);
}
