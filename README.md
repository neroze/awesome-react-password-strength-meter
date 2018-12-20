# self-validating-text-field
Self Validating test field

```
import React, { Fragment } from "react";
import InputField from "self-validating-text-fiel";
import SimpleReactValidator from "simple-react-validator";

export default class extends React.Component {
  state = {
    email: "hello@world.com"
  };

  componentDidMount = () => {
    const validator = new SimpleReactValidator();
    this.setState({ validator });
  };

  submit = () => {
    if (this.validator.allValid()) {
      alert("You submitted the form and stuff!");
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };

  render() {
    return (
      <Fragment>
        {this.state.validator && (
          <InputField
            validator={this.state.validator}
          >
            <input
              name="myname"
              placeholder={"Name"}
              onChange={e => {
                const { value } = e.target;
                console.log("-sdfsdf---------->", value);
              }}
              rules={"required|email"}
              value={this.state.email}
            />
          </InputField>
        )}

        <button onClick={this.submit}>Submit</button>
      </Fragment>
    );
  }
}


```