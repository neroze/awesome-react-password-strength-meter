# awesome-react-password-strength-meter
awesome-react-password-strength-meter

### Demo
[Demo](https://codesandbox.io/s/8l4o23lv3j)

```
import React, { Fragment } from "react";
import PasswordStrength from "./passwordStrength";

const StrengthLabel = () => <b>Strength</b>;
export default class extends React.Component {
  state = {
    password: "",
  };

  handlePasswordChange = e => {
    e.persist();
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <div
          style={{
            border: "1px solid red",
            textAlign: "left",
            diplay: "block",
            width: "500px"
          }}
        >
          <PasswordStrength
            name="password-strength"
            value={this.state.password}
            minLength={3}
            errorBorder={false}
            myStyles={{
              height: "8px",
              marginTop: "5px",
              display: "inline-block"
            }}
            strengthLabel={{
              text: `%strength%`,
              label: StrengthLabel, // optional either string or component
              visible: true,
              style: {
                display: "inline",
                paddingRight: "10px",
                width: "50%"
              }
            }}
            colors={{
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
                color: "#4cbac0",
                label: "Awesome Very strong"
              }
            }}
          >
            <input
              name="password"
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
          </PasswordStrength>
        </div>
      </Fragment>
    );
  }
}


```