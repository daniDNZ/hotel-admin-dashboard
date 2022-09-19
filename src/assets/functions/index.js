const checkIsNotAButton = (e, navigate) => {
  if (e.target.type !== 'button') {
    navigate();
  }
};

export default checkIsNotAButton;
