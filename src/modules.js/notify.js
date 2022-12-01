import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const notifyFailure = () => {
  return Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
    timeout: 1000,
  });
};
export const notify = () => {
  return Notify.failure(
    "We're sorry, but you've reached the end of search results.",
    { timeout: 1000 }
  );
};

export const notifySuccess = () => {
  return Notify.success(
    `Hooray! We found ${totalHits} images.`,
    { timeout: 1000 }
  );
};

export const notifyInfo = () => {
  return Notify.info(
    'Please fill out this field',
    { timeout: 1000 }
  );
};