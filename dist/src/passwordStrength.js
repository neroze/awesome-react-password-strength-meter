"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strengthProgress = exports.strengthIndicator = exports.strengthColor = undefined;

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

var strengthColor = exports.strengthColor = function strengthColor(count) {
  if (count === 1) return "transparent";
  if (count <= 2) return "red";

  if (count < 3) return "yellow";

  if (count < 4) return "orange";

  if (count < 5) return "lightgreen";

  if (count < 6) return "green";
};

var strengthIndicator = exports.strengthIndicator = function strengthIndicator(value) {
  var minLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 7;

  var strengths = 1;
  var primaryCondition = value.length >= minLength;

  if (value.length >= 1 && value.length < minLength) strengths++;

  if (primaryCondition) strengths++;

  if (primaryCondition && hasNumber(value)) strengths++;

  if (primaryCondition && hasSpecial(value)) strengths++;

  if (primaryCondition && hasMixed(value)) strengths++;

  return strengths;
};

var strengthProgress = exports.strengthProgress = function strengthProgress(strength) {
  var progress = 0;
  if (strength === 2) progress = 10;
  if (strength >= 2) progress = 30;

  if (strength >= 3) progress = 55;

  if (strength >= 4) progress = 75;

  if (strength >= 5) progress = 100;

  return progress + "%";
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
          errorBorder = _props.errorBorder;

      var strength = strengthIndicator(value, minLength);
      var color = strengthColor(strength);
      var style = {
        display: "inline-block"
      };

      if (errorBorder) {
        style.border = "2px solid " + color;
      }

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          "span",
          {
            style: {
              display: "inline-block"
            }
          },
          _react2.default.createElement(
            "span",
            { style: style },
            children
          ),
          _react2.default.createElement("span", {
            style: _extends({
              width: "" + strengthProgress(strength),
              display: "block",
              height: "2px",
              background: "" + color,
              marginBottom: "5px"
            }, myStyles),
            name: "password-strength"
          })
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
  minLength: _propTypes2.default.number
};
_class.defaultProps = {
  errorBorder: true,
  value: '',
  minLength: 5
};
exports.default = _class;