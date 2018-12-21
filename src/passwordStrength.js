import React, { Fragment } from "react";
import Proptypes from "prop-types";

const hasNumber = value => {
  return new RegExp(/[0-9]/).test(value);
};

const hasMixed = value => {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};

const hasSpecial = value => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};

export const strengthColor = count => {
  if (count === 1) return "transparent";
  if (count <= 2) return "red";

  if (count < 3) return "yellow";

  if (count < 4) return "orange";

  if (count < 5) return "lightgreen";

  if (count < 6) return "green";
};

export const strengthIndicator = (value, minLength = 7) => {
  let strengths = 1;
  const primaryCondition = value.length >= minLength;

  if (value.length >= 1 && value.length < minLength) strengths++;

  if (primaryCondition) strengths++;

  if (primaryCondition && hasNumber(value)) strengths++;

  if (primaryCondition && hasSpecial(value)) strengths++;

  if (primaryCondition && hasMixed(value)) strengths++;

  return strengths;
};

export const strengthProgress = strength => {
  let progress = 0;
  if (strength === 2) progress = 10;
  if (strength >= 2) progress = 30;

  if (strength >= 3) progress = 55;

  if (strength >= 4) progress = 75;

  if (strength >= 5) progress = 100;

  return `${progress}%`;
};

export default class extends React.Component {
  state = {
    password: ""
  };

  static proptypes = {
    children: Proptypes.object,
    myStyles: Proptypes.object,
    errorBorder: Proptypes.bool,
    value: Proptypes.string,
    minLength: Proptypes.number
  };

  static defaultProps = {
    errorBorder: true,
    value: "",
    minLength: 5
  };

  render() {
    let { children, value, minLength, myStyles, errorBorder } = this.props;
    const strength = strengthIndicator(value, minLength);
    const color = strengthColor(strength);
    const style = {
      display: 'block'
    };

    if (errorBorder) {
      style.border = `1px solid ${color}`;
    }

    return (
      <Fragment>
        <span style={style}>{children}</span>
        <span
          style={{
            width: `${strengthProgress(strength)}`,
            display: "block",
            height: "2px",
            background: `${color}`,
            marginBottom: "5px",
            ...myStyles
          }}
          name="password-strength"
        />
      </Fragment>
    );
  }
}
