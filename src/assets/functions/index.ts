import { NavigateFunction } from "react-router-dom";

const checkIsNotAButton = (e: any, navigate: any) => {
  if (e.target.type !== 'button') {
    navigate();
  }
};

export default checkIsNotAButton;
