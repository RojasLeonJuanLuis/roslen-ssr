'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _layout = require('../containers/layout');

var _layout2 = _interopRequireDefault(_layout);

var _product = require('../components/product');

var _product2 = _interopRequireDefault(_product);

var _api = require('../api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/rojas/Desktop/roslen-ssr/pages/products.js?entry';


var Products = function (_Component) {
  (0, _inherits3.default)(Products, _Component);

  function Products() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Products);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Products.__proto__ || (0, _getPrototypeOf2.default)(Products)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      products: [],
      loading: false
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Products, [{
    key: 'componentWillMount',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var products;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _api2.default.products.getProducts();

              case 2:
                products = _context.sent;

                this.setState({
                  products: products,
                  loading: true
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillMount() {
        return _ref2.apply(this, arguments);
      }

      return componentWillMount;
    }()
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }, !this.state.loading && _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }, 'Loading...'), this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          }
        }));
      })));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsImFwaSIsIlByb2R1Y3RzIiwic3RhdGUiLCJwcm9kdWN0cyIsImxvYWRpbmciLCJnZXRQcm9kdWN0cyIsInNldFN0YXRlIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBUzs7Ozs7Ozs7O0lBRVYsQTs7Ozs7Ozs7Ozs7Ozs7Z05BQ0osQTtnQkFBUSxBQUNJLEFBQ1Y7ZSxBQUZNLEFBRUc7QUFGSCxBQUNOOzs7Ozs7Ozs7Ozs7O3VCQUt1QixjQUFBLEFBQUksU0FBSixBQUFhLEE7O21CQUE5QjtBLG9DQUNOOztxQkFBQSxBQUFLOzRCQUFTLEFBRVo7MkJBRkYsQUFBYyxBQUVIO0FBRkcsQUFDWjs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQUtLLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxVQUNJLEtBQUEsQUFBSyxNQUFOLEFBQVksMkJBQ1gsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLE9BQUEsRUFGSixBQUVJLEFBRUQsb0JBQUEsQUFBSyxNQUFMLEFBQVcsU0FBWCxBQUFvQixJQUFJLG1CQUFXLEFBQ2xDOytCQUFPLEFBQUMsMERBQVEsS0FBSyxRQUFkLEFBQXNCLE1BQXRCLEFBQThCOztzQkFBOUI7d0JBQVAsQUFBTyxBQUNSO0FBRFE7QUFBQSxVQUFBO0FBUGYsQUFDRSxBQUNFLEFBSUcsQUFNUjs7Ozs7QUEzQm9CLEEsQUE4QnZCOztrQkFBQSxBQUFlIiwiZmlsZSI6InByb2R1Y3RzLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==