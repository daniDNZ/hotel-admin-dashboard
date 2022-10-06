const checkIsNotAButton = (e, navigate) => {
  if (e.target.type !== 'button') {
    navigate();
  }
};

const dateBuilder = (data) => {
  const date = new Date(data);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

export { checkIsNotAButton, dateBuilder };
