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

  if (count >= 6) {
    info.color = colors.veryStrong.color;
    info.strengthText = strengthLabel.text.replace(
      "%strength%",
      colors.veryStrong.label
    );
    return info;
  }
};

export const strengthIndicator = (value, minLength = 3, extra = {}) => {
  let strengths = 1;
  const primaryCondition = value.length >= minLength;
  const strongLength = value.length >= 8;
  const strongestLength = value.length >= 14;

  if (value.length >= 1 && value.length < minLength) {
    strengths++;
  }

  if (primaryCondition) {
    strengths++;
  }

  if (primaryCondition && strongLength) {
    strengths++;
  }

  if (strongestLength) {
  }

  if (primaryCondition && hasNumber(value) && hasMixed(value)) strengths++;

  if (primaryCondition && hasNumber(value)) strengths++;

  if (primaryCondition && hasSpecial(value) && hasMixed(value)) strengths++;

  return strengths;
};

export const strengthProgress = strength => {
  let progress = 0;
  if (strength === 2) progress = 10;
  if (strength >= 2) progress = 30;

  if (strength >= 3) progress = 45;

  if (strength >= 4) progress = 55;

  if (strength >= 5) progress = 70;

  if (strength >= 6) progress = 100;

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
    minLength: 8,
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
    colors = { ...defaultColors, ...colors };
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
          {strength > 1 && (
            <div
              style={{
                width: "50%",
                height: "2px",
                backgroundColor: "#f2f2f0",
                position: "relative",
                ...myStyles
              }}
            >
              <span
                style={{
                  width: `${strengthProgress(strength)}`,
                  display: "block",
                  height: "2px",
                  position: "absolute",
                  background: `${color}`,
                  ...myStyles
                }}
                name="password-strength"
              />
            </div>
          )}

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
