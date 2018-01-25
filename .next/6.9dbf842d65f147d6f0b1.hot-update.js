webpackHotUpdate(6,{

/***/ 419:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(86);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(88);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(89);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(33);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(14);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(15);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(34);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(35);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(16);

var _react2 = _interopRequireDefault(_react);

var _layout = __webpack_require__(403);

var _layout2 = _interopRequireDefault(_layout);

var _product = __webpack_require__(420);

var _product2 = _interopRequireDefault(_product);

var _loading = __webpack_require__(423);

var _loading2 = _interopRequireDefault(_loading);

var _api = __webpack_require__(422);

var _api2 = _interopRequireDefault(_api);

var _styles = __webpack_require__(417);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/rojas/Desktop/roslen-ssr/pages/products.js?entry';


var Products = function (_Component) {
  (0, _inherits3.default)(Products, _Component);

  function Products() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Products);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Products.__proto__ || (0, _getPrototypeOf2.default)(Products)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      products: [],
      loading: true,
      page: 1
    }, _this.handleScroll = function () {
      if (_this.state.loading) {
        return null;
      }

      var scrolled = window.scrollY;
      var viewportHeight = window.innerHeight;
      var fullHeight = document.body.clientHeight;

      if (!(scrolled + viewportHeight + 350 >= fullHeight)) {
        return null;
      }

      _this.setState({ loading: true }, (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var products;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _api2.default.products.getProducts(_this.state.page);

              case 3:
                products = _context.sent;

                if (_this.state.page < 10) {
                  _this.setState({
                    products: _this.state.products.concat(products),
                    page: _this.state.page + 1,
                    loading: false
                  });
                }
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                _this.setState({
                  loading: false
                });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[0, 7]]);
      })));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Products, [{
    key: 'componentDidMount',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var products;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _api2.default.products.getProducts(this.state.page);

              case 2:
                products = _context2.sent;

                this.setState({
                  products: products,
                  loading: false,
                  page: this.state.page + 1
                });

                window.addEventListener('scroll', this.handleScroll);

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function componentDidMount() {
        return _ref3.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_layout2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, _react2.default.createElement(_styles.SuperContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 65
        }
      }, _react2.default.createElement(_styles.ContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 68
          }
        }));
      }))), this.state.loading && _react2.default.createElement(_loading2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      })));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsIkxvYWRpbmciLCJhcGkiLCJDb250YWluZXJQcm9kdWN0cyIsIlN1cGVyQ29udGFpbmVyUHJvZHVjdHMiLCJQcm9kdWN0cyIsInN0YXRlIiwicHJvZHVjdHMiLCJsb2FkaW5nIiwicGFnZSIsImhhbmRsZVNjcm9sbCIsInNjcm9sbGVkIiwid2luZG93Iiwic2Nyb2xsWSIsInZpZXdwb3J0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJmdWxsSGVpZ2h0IiwiZG9jdW1lbnQiLCJib2R5IiwiY2xpZW50SGVpZ2h0Iiwic2V0U3RhdGUiLCJnZXRQcm9kdWN0cyIsImNvbmNhdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQVM7Ozs7QUFFaEIsQUFBUyxBQUFtQixBQUE4Qjs7Ozs7OztJLEFBRXBEOzs7Ozs7Ozs7Ozs7Ozs7Z04sQUFDSjtnQkFBUSxBQUNJLEFBQ1Y7ZUFGTSxBQUVHLEFBQ1Q7WUFITSxBLEFBR0E7QUFIQSxBQUNOLGFBZ0JGLEEsZUFBZSxZQUFNLEFBQ25CO1VBQUcsTUFBQSxBQUFLLE1BQVIsQUFBYyxTQUFTLEFBQUU7ZUFBQSxBQUFPLEFBQU07QUFFdEM7O1VBQU0sV0FBVyxPQUFqQixBQUF3QixBQUN4QjtVQUFNLGlCQUFpQixPQUF2QixBQUE4QixBQUM5QjtVQUFNLGFBQWEsU0FBQSxBQUFTLEtBQTVCLEFBQWlDLEFBRWpDOztVQUFJLEVBQUUsV0FBQSxBQUFXLGlCQUFYLEFBQTRCLE9BQWxDLEFBQUksQUFBcUMsYUFBYSxBQUNwRDtlQUFBLEFBQU8sQUFDUjtBQUVEOztZQUFBLEFBQUssU0FBUyxFQUFFLFNBQWhCLEFBQWMsQUFBVyxpRkFBUSxtQkFBQTtZQUFBO3NFQUFBO29CQUFBOzZDQUFBO21CQUFBO2dDQUFBO2dDQUFBO3VCQUVOLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxNQUFBLEFBQUssTUFGeEIsQUFFTixBQUFvQzs7bUJBQXJEO0FBRnVCLG9DQUk3Qjs7b0JBQUcsTUFBQSxBQUFLLE1BQUwsQUFBVyxPQUFkLEFBQXFCLElBQUksQUFDdkI7d0JBQUEsQUFBSzs4QkFDTyxNQUFBLEFBQUssTUFBTCxBQUFXLFNBQVgsQUFBb0IsT0FEbEIsQUFDRixBQUEyQixBQUNyQzswQkFBTSxNQUFBLEFBQUssTUFBTCxBQUFXLE9BRkwsQUFFWSxBQUN4Qjs2QkFIRixBQUFjLEFBR0gsQUFFWjtBQUxlLEFBQ1o7QUFOeUI7Z0NBQUE7QUFBQTs7bUJBQUE7Z0NBQUE7Z0RBWTdCOztzQkFBQSxBQUFLOzJCQVp3QixBQVk3QixBQUFjLEFBQ0g7QUFERyxBQUNaOzttQkFiMkI7bUJBQUE7Z0NBQUE7O0FBQUE7aUNBQUE7QUFBakMsQUFpQkQ7QTs7Ozs7Ozs7Ozs7Ozt1QkF0Q3dCLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxLQUFBLEFBQUssTSxBQUE5QixBQUFvQzs7bUJBQXJEO0EscUNBQ047O3FCQUFBLEFBQUs7NEJBQVMsQUFFWjsyQkFGWSxBQUVILEFBQ1Q7d0JBQU0sS0FBQSxBQUFLLE1BQUwsQUFBVyxPQUhuQixBQUFjLEFBR1ksQUFHMUI7QUFOYyxBQUNaOzt1QkFLRixBQUFPLGlCQUFQLEFBQXdCLFVBQVUsS0FBbEMsQUFBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0FpQ2xCLEFBQ3JCO2FBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzNDOzs7OzZCQUVRLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDOztvQkFBRDtzQkFBQSxBQUNHO0FBREg7QUFBQSxjQUNHLEFBQUssTUFBTCxBQUFXLFNBQVgsQUFBb0IsSUFBSSxtQkFBVyxBQUNsQzsrQkFBTyxBQUFDLDBEQUFRLEtBQUssUUFBZCxBQUFzQixNQUF0QixBQUE4Qjs7c0JBQTlCO3dCQUFQLEFBQU8sQUFDUjtBQURRO0FBQUEsVUFBQTtBQUpmLEFBQ0UsQUFDRSxBQUNHLEFBS0osaUJBQUEsQUFBSyxNQUFMLEFBQVcsMkJBQ1YsQUFBQzs7b0JBQUQ7c0JBWFIsQUFDRSxBQUNFLEFBU0ksQUFLVDtBQUxTO0FBQUEsT0FBQTs7Ozs7QUFoRVcsQSxBQXdFdkI7O2tCQUFBLEFBQWUiLCJmaWxlIjoicHJvZHVjdHMuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/rojas/Desktop/roslen-ssr/pages/products.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/rojas/Desktop/roslen-ssr/pages/products.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(84)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/products")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi45ZGJmODQyZDY1ZjE0N2Q2ZjBiMS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvcHJvZHVjdHMuanM/N2Q2YzNhMyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uL2NvbnRhaW5lcnMvbGF5b3V0J1xuaW1wb3J0IFByb2R1Y3QgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9kdWN0J1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9zaGFyZWQvbG9hZGluZydcbmltcG9ydCBhcGkgZnJvbSAnLi4vYXBpJ1xuXG5pbXBvcnQgeyBDb250YWluZXJQcm9kdWN0cywgU3VwZXJDb250YWluZXJQcm9kdWN0cyB9IGZyb20gJy4uL3N0eWxlc2hlZXQvc3R5bGVzJ1xuXG5jbGFzcyBQcm9kdWN0cyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHN0YXRlID0ge1xuICAgIHByb2R1Y3RzOiBbXSxcbiAgICBsb2FkaW5nOiB0cnVlLFxuICAgIHBhZ2U6IDFcbiAgfVxuXG4gIGFzeW5jIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgYXBpLnByb2R1Y3RzLmdldFByb2R1Y3RzKHRoaXMuc3RhdGUucGFnZSlcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByb2R1Y3RzLFxuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UgKyAxXG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZVNjcm9sbClcbiAgfVxuXG4gIGhhbmRsZVNjcm9sbCA9ICgpID0+IHtcbiAgICBpZih0aGlzLnN0YXRlLmxvYWRpbmcpIHsgcmV0dXJuIG51bGwgfVxuXG4gICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cuc2Nyb2xsWVxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgY29uc3QgZnVsbEhlaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0XG5cbiAgICBpZiAoIShzY3JvbGxlZCArIHZpZXdwb3J0SGVpZ2h0ICsgMzUwID49IGZ1bGxIZWlnaHQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9LCBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGFwaS5wcm9kdWN0cy5nZXRQcm9kdWN0cyh0aGlzLnN0YXRlLnBhZ2UpXG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZS5wYWdlIDwgMTApIHtcbiAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHByb2R1Y3RzOiB0aGlzLnN0YXRlLnByb2R1Y3RzLmNvbmNhdChwcm9kdWN0cyksXG4gICAgICAgICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UgKyAxLFxuICAgICAgICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfWNhdGNoKGVycm9yKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZVNjcm9sbClcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPExheW91dD5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8U3VwZXJDb250YWluZXJQcm9kdWN0cz5cbiAgICAgICAgICAgIDxDb250YWluZXJQcm9kdWN0cz5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUucHJvZHVjdHMubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8UHJvZHVjdCBrZXk9e3Byb2R1Y3QuaWR9IHsuLi5wcm9kdWN0fSAvPlxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvQ29udGFpbmVyUHJvZHVjdHM+XG4gICAgICAgICAgPC9TdXBlckNvbnRhaW5lclByb2R1Y3RzPlxuICAgICAgICAgIHt0aGlzLnN0YXRlLmxvYWRpbmcgJiYgKFxuICAgICAgICAgICAgPExvYWRpbmcgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTGF5b3V0PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXMvcHJvZHVjdHMuanM/ZW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7O0FBRkE7QUFpQkE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBSkE7QUFOQTtBQUFBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFZQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFkQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQWlCQTs7Ozs7Ozs7Ozs7Ozs7QUF0Q0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUFBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBO0FBQUE7Ozs7QUFJQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFJQTs7QUFDQTtBQUtBO0FBTEE7QUFBQTs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=