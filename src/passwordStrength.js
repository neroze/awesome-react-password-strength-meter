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

export const strengthInfo = (count, colors, strengthLabel) => {
  const info = {};
  if (count === 1) return "transparent";
  if (count <= 2) {
    info.color = colors.poor.color;
    info.strengthText = strengthLabel.text.replace(
      "%strength%",
      colors.poor.label
    );
    return info;
  }

  if (count < 3) {
    info.color = colors.weak.color;
    info.strengthText = strengthLabel.text.replace(
      "%strength%",
      colors.weak.label
    );
    return info;
  }
  if (count < 4) {
    info.color = colors.good.color;
    info.strengthText = strengthLabel.text.replace(
      "%strength%",
      colors.good.label
    );
    return info;
  }

  if (count < 5) {
    info.color = colors.strong.color;
    info.strengthText = strengthLabel.text.replace(
      "%strength%",
      colors.strong.label
    );
    return info;
  }

  if (count < 6) {
    info.color = colors.veryStrong.color;
    info.strengthText = strengthLabel.text.replace(
      "%strength%",
      colors.veryStrong.label
    );
    return info;
  }

  
};

export const strengthIndicator = (value, minLength = 3) => {
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

export const StrengthLabel = (strength, Label) => {
  if (strength <= 1) return null;

  if (typeof Label === "string") {
    return Label;
  } else if (typeof Label === "function") {
    return <Label />;
  }
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
    minLength: Proptypes.number,
    strengthLabel: Proptypes.number
  };

  static defaultProps = {
    errorBorder: true,
    value: "",
    minLength: 5,
    defaultStrengthLabel: {
      label: "",
      text: `Strength : %strength%`,
      visible: true,
      style: {
        display: "flex",
        flex: "1 auto",
        padding: "0 18px",
        fontFamily: "inherit"
      }
    },
    defaultColors: {
      poor: {
        color: "red",
        label: "Very weak"
      },
      weak: {
        color: "red",
        label: "Very weak"
      },
      good: {
        color: "orange",
        label: "Good"
      },
      strong: {
        color: "lightgreen",
        label: "Strong"
      },
      veryStrong: {
        color: "green",
        label: "Very strong"
      }
    }
  };

  render() {
    let {
      children,
      value,
      minLength,
      myStyles,
      errorBorder,
      colors,
      defaultColors,
      strengthLabel,
      defaultStrengthLabel
    } = this.props;
    const strength = strengthIndicator(value, minLength);
    colors = { ...defaultColors, ...colors};
    strengthLabel = { ...defaultStrengthLabel, ...strengthLabel };
    const { color, strengthText } = strengthInfo(
      strength,
      colors,
      strengthLabel
    );
    const style = { display: "block" };

    if (errorBorder) {
      style.border = `1px solid ${color}`;
    }

    return (
      <Fragment>
        {children}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "50%"
            }}
          >
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
          </div>

          {strengthLabel.visible && (
            <span style={strengthLabel.style}>
              {StrengthLabel(strength, strengthLabel.label)}
              {strengthText}
            </span>
          )}
        </div>
      </Fragment>
    );
  }
}
