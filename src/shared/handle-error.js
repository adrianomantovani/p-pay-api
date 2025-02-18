export default function handleError(error) {
  let message = 'Algo deu errado';

  if (typeof error === 'string') {
    message = error;
  }

  if (error.hasOwnProperty('errors')) {
    if (Array.isArray(error.errors)) {
      message = error.errors[0];
    }
  }

  return message;
}
