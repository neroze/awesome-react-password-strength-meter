"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrengthLabel = exports.strengthProgress = exports.strengthIndicator = exports.strengthInfo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hasNumber = function hasNumber(value) {
  return new RegExp(/[0-9]/).test(value);
};

var hasMixed = function hasMixed(value) {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};

var hasSpecial = function hasSpecial(value) {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};

var strengthInfo = exports.strengthInfo = function strengthInfo(count, colors, strengthLabel) {
  var info = {};
  if (count === 1) return "transparent";
  if (count <= 2) {
    info.color = colors.poor.color;
    info.strengthText = strengthLabel.text.replace("%strength%", colors.poor.label);
    return info;
  }

  if (count < 3) {
    info.color = colors.weak.color;
    info.strengthText = strengthLabel.text.replace("%strength%", colors.weak.label);
    return info;
  }
  if (count < 4) {
    info.color = colors.good.color;
    info.strengthText = strengthLabel.text.replace("%strength%", colors.good.label);
    return info;
  }

  if (count < 5) {
    info.color = colors.strong.color;
    info.strengthText = strengthLabel.text.replace("%strength%", colors.strong.label);
    return info;
  }

  if (count < 6) {
    info.color = colors.veryStrong.color;
    info.strengthText = strengthLabel.text.replace("%strength%", colors.veryStrong.label);
    return info;
  }
};

var strengthIndicator = exports.strengthIndicator = function strengthIndicator(value) {
  var minLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var strengths = 1;
  var primaryCondition = value.length >= minLength;
  var strongLength = value.length >= 8;
  var strongestLength = value.length >= 14;

  if (value.length >= 1 && value.length < minLength) {
    strengths++;
  }

  if (primaryCondition) {
    strengths++;
  }

  if (primaryCondition && strongLength) {
    strengths++;
  }

  if (primaryCondition && strongLength && strongestLength) {
    strengths++;
  }

  if (primaryCondition && hasNumber(value) && hasSpecial(value) && hasMixed(value)) {
    strengths++;
  }

  return strengths;
};

var strengthProgress = exports.strengthProgress = function strengthProgress(strength) {
  var progress = 0;
  if (strength === 2) progress = 10;
  if (strength >= 2) progress = 35;

  if (strength >= 3) progress = 60;

  if (strength >= 4) progress = 70;

  if (strength >= 5) progress = 100;

  return progress + "%";
};

var StrengthLabel = exports.StrengthLabel = function StrengthLabel(strength, Label) {
  if (strength <= 1) return null;

  if (typeof Label === "string") {
    return Label;
  } else if (typeof Label === "function") {
    return _react2.default.createElement(Label, null);
  }
};

var _class = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      password: ""
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          value = _props.value,
          minLength = _props.minLength,
          myStyles = _props.myStyles,
          errorBorder = _props.errorBorder,
          colors = _props.colors,
          defaultColors = _props.defaultColors,
          strengthLabel = _props.strengthLabel,
          defaultStrengthLabel = _props.defaultStrengthLabel;

      var strength = strengthIndicator(value, minLength);
      colors = _extends({}, defaultColors, colors);
      strengthLabel = _extends({}, defaultStrengthLabel, strengthLabel);

      var _strengthInfo = strengthInfo(strength, colors, strengthLabel),
          color = _strengthInfo.color,
          strengthText = _strengthInfo.strengthText;

      console.log('***', strength, strengthLabel);
      var style = { display: "block" };

      if (errorBorder) {
        style.border = "1px solid " + color;
      }

      return _react2.default.createElement(
        _react.Fragment,
        null,
        children,
        _react2.default.createElement(
          "div",
          {
            style: {
              width: "100%",
              display: "flex",
              alignItems: "center"
            }
          },
          strength > 1 && _react2.default.createElement(
            "div",
            {
              style: _extends({
                width: "50%",
                height: "2px",
                backgroundColor: "#f2f2f0",
                position: "relative"
              }, myStyles)
            },
            _react2.default.createElement("span", {
              style: _extends({
                width: "" + strengthProgress(strength),
                display: "block",
                height: "2px",
                position: "absolute",
                background: "" + color
              }, myStyles),
              name: "password-strength"
            })
          ),
          strengthLabel.visible && _react2.default.createElement(
            "span",
            { style: strengthLabel.style },
            StrengthLabel(strength, strengthLabel.label),
            strengthText
          )
        )
      );
    }
  }]);

  return _class;
}(_react2.default.Component);

_class.proptypes = {
  children: _propTypes2.default.object,
  myStyles: _propTypes2.default.object,
  errorBorder: _propTypes2.default.bool,
  value: _propTypes2.default.string,
  minLength: _propTypes2.default.number,
  strengthLabel: _propTypes2.default.number
};
_class.defaultProps = {
  errorBorder: true,
  value: "",
  minLength: 8,
  defaultStrengthLabel: {
    label: "",
    text: "Strength : %strength%",
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
exports.default = _class;