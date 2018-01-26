webpackHotUpdate(5,{

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(58);

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = __webpack_require__(83);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(84);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = __webpack_require__(29);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(10);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(30);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(31);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(14);

var _react2 = _interopRequireDefault(_react);

var _layout = __webpack_require__(399);

var _layout2 = _interopRequireDefault(_layout);

var _product = __webpack_require__(417);

var _product2 = _interopRequireDefault(_product);

var _loading = __webpack_require__(418);

var _loading2 = _interopRequireDefault(_loading);

var _heroProducts = __webpack_require__(419);

var _heroProducts2 = _interopRequireDefault(_heroProducts);

var _api = __webpack_require__(421);

var _api2 = _interopRequireDefault(_api);

var _styles = __webpack_require__(414);

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
      if (_this.state.all) {
        if (_this.state.loading) return null;
        if (_this.state.page > 5) {
          return null;
          _this.setState({
            loading: false
          });
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
                  _context.next = 2;
                  return _api2.default.products.getProducts(_this.state.page);

                case 2:
                  products = _context.sent;

                  _this.setState({
                    products: _this.state.products.concat(products),
                    page: _this.state.page + 1,
                    loading: false
                  });

                case 4:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        })));
      }
    }, _this.handleFetchCleaning = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var cleaningProducts;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _api2.default.products.getCleaningProducts();

            case 2:
              cleaningProducts = _context2.sent;

              _this.setState({
                products: cleaningProducts,
                loading: false,
                all: false
              });

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Products, [{
    key: 'componentWillMount',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var products;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _api2.default.products.getProducts(this.state.page);

              case 2:
                products = _context3.sent;

                this.setState({
                  products: products,
                  loading: false,
                  page: this.state.page + 1,
                  all: true
                });

                window.addEventListener('scroll', this.handleScroll);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function componentWillMount() {
        return _ref4.apply(this, arguments);
      }

      return componentWillMount;
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
          lineNumber: 75
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, _react2.default.createElement(_heroProducts2.default, { getProductsCleaning: this.handleFetchCleaning, __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }), _react2.default.createElement(_styles.SuperContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, _react2.default.createElement(_styles.ContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }, this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 81
          }
        }));
      }))), this.state.loading && _react2.default.createElement(_loading2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      })));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsIkxvYWRpbmciLCJIZXJvUHJvZHVjdHMiLCJhcGkiLCJDb250YWluZXJQcm9kdWN0cyIsIlN1cGVyQ29udGFpbmVyUHJvZHVjdHMiLCJQcm9kdWN0cyIsInN0YXRlIiwicHJvZHVjdHMiLCJsb2FkaW5nIiwicGFnZSIsImhhbmRsZVNjcm9sbCIsImFsbCIsInNldFN0YXRlIiwic2Nyb2xsZWQiLCJ3aW5kb3ciLCJzY3JvbGxZIiwidmlld3BvcnRIZWlnaHQiLCJpbm5lckhlaWdodCIsImZ1bGxIZWlnaHQiLCJkb2N1bWVudCIsImJvZHkiLCJjbGllbnRIZWlnaHQiLCJnZXRQcm9kdWN0cyIsImNvbmNhdCIsImhhbmRsZUZldGNoQ2xlYW5pbmciLCJnZXRDbGVhbmluZ1Byb2R1Y3RzIiwiY2xlYW5pbmdQcm9kdWN0cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBYTs7OztBQUNwQixBQUFPLEFBQWtCOzs7O0FBRXpCLEFBQU8sQUFBUzs7OztBQUVoQixBQUFTLEFBQW1CLEFBQThCOzs7Ozs7O0ksQUFFcEQ7Ozs7Ozs7Ozs7Ozs7OztnTixBQUNKO2dCQUFRLEFBQ0ksQUFDVjtlQUZNLEFBRUcsQUFDVDtZQUhNLEFBR0EsQTtBQUhBLEFBQ04sYUFpQkYsQSxlQUFlLFlBQU0sQUFDbkI7VUFBRyxNQUFBLEFBQUssTUFBUixBQUFjLEtBQUssQUFDakI7WUFBRyxNQUFBLEFBQUssTUFBUixBQUFjLFNBQVMsT0FBQSxBQUFPLEFBQzlCO1lBQUcsTUFBQSxBQUFLLE1BQUwsQUFBVyxPQUFkLEFBQXFCLEdBQUcsQUFDdEI7aUJBQUEsQUFBTyxBQUNQO2dCQUFBLEFBQUs7cUJBQUwsQUFBYyxBQUNILEFBRVo7QUFIZSxBQUNaO0FBSUo7O1lBQU0sV0FBVyxPQUFqQixBQUF3QixBQUN4QjtZQUFNLGlCQUFpQixPQUF2QixBQUE4QixBQUM5QjtZQUFNLGFBQWEsU0FBQSxBQUFTLEtBQTVCLEFBQWlDLEFBRWpDOztZQUFJLEVBQUUsV0FBQSxBQUFXLGlCQUFYLEFBQTRCLE9BQWxDLEFBQUksQUFBcUMsYUFBYSxBQUNwRDtpQkFBQSxBQUFPLEFBQ1I7QUFFRDs7Y0FBQSxBQUFLLFNBQVMsRUFBRSxTQUFoQixBQUFjLEFBQVcsaUZBQVEsbUJBQUE7Y0FBQTt3RUFBQTtzQkFBQTsrQ0FBQTtxQkFBQTtrQ0FBQTt5QkFDUixjQUFBLEFBQUksU0FBSixBQUFhLFlBQVksTUFBQSxBQUFLLE1BRHRCLEFBQ1IsQUFBb0M7O3FCQUFyRDtBQUR5QixzQ0FHL0I7O3dCQUFBLEFBQUs7OEJBQ08sTUFBQSxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLE9BRGxCLEFBQ0YsQUFBMkIsQUFDckM7MEJBQU0sTUFBQSxBQUFLLE1BQUwsQUFBVyxPQUZMLEFBRVksQUFDeEI7NkJBTjZCLEFBRy9CLEFBQWMsQUFHSDtBQUhHLEFBQ1o7O3FCQUo2QjtxQkFBQTtrQ0FBQTs7QUFBQTtzQkFBQTtBQUFqQyxBQVNEO0FBQ0Y7QSxhLEFBTUQsK0ZBQXNCLG9CQUFBO1VBQUE7c0VBQUE7a0JBQUE7NkNBQUE7aUJBQUE7K0JBQUE7cUJBQ1csY0FBQSxBQUFJLFNBRGYsQUFDVyxBQUFhOztpQkFBdEM7QUFEYywyQ0FFcEI7O29CQUFBLEFBQUs7MEJBQVMsQUFDRixBQUNWO3lCQUZZLEFBRUgsQUFDVDtxQkFMa0IsQUFFcEIsQUFBYyxBQUdQO0FBSE8sQUFDWjs7aUJBSGtCO2lCQUFBOytCQUFBOztBQUFBO21CQUFBO0E7Ozs7Ozs7Ozs7Ozs7dUJBN0NHLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxLQUFBLEFBQUssTSxBQUE5QixBQUFvQzs7bUJBQXJEO0EscUNBQ047O3FCQUFBLEFBQUs7NEJBQVMsQUFFWjsyQkFGWSxBQUVILEFBQ1Q7d0JBQU0sS0FBQSxBQUFLLE1BQUwsQUFBVyxPQUhMLEFBR1ksQUFDeEI7dUJBSkYsQUFBYyxBQUlQLEFBR1A7QUFQYyxBQUNaOzt1QkFNRixBQUFPLGlCQUFQLEFBQXdCLFVBQVUsS0FBbEMsQUFBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0FpQ2xCLEFBQ3JCO2FBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzNDOzs7OzZCQVdRLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNFO0FBREY7QUFBQSx5QkFDRSxBQUFDLHdDQUFhLHFCQUFxQixLQUFuQyxBQUF3QztvQkFBeEM7c0JBREYsQUFDRSxBQUNBO0FBREE7MEJBQ0EsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRztBQURIO0FBQUEsY0FDRyxBQUFLLE1BQUwsQUFBVyxTQUFYLEFBQW9CLElBQUksbUJBQVcsQUFDbEM7K0JBQU8sQUFBQywwREFBUSxLQUFLLFFBQWQsQUFBc0IsTUFBdEIsQUFBOEI7O3NCQUE5Qjt3QkFBUCxBQUFPLEFBQ1I7QUFEUTtBQUFBLFVBQUE7QUFMZixBQUVFLEFBQ0UsQUFDRyxBQUtKLGlCQUFBLEFBQUssTUFBTCxBQUFXLDJCQUNWLEFBQUM7O29CQUFEO3NCQVpSLEFBQ0UsQUFDRSxBQVVJLEFBS1Q7QUFMUztBQUFBLE9BQUE7Ozs7O0FBM0VXLEEsQUFtRnZCOztrQkFBQSxBQUFlIiwiZmlsZSI6InByb2R1Y3RzLmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } /* eslint-disable camelcase, no-undef */ var webpackExports = typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__ : module.exports; /* eslint-enable camelcase, no-undef */ if (typeof webpackExports === 'function') { __REACT_HOT_LOADER__.register(webpackExports, 'module.exports', "/Users/rojas/Desktop/roslen-ssr/pages/products.js"); return; } /* eslint-disable no-restricted-syntax */ for (var key in webpackExports) { /* eslint-enable no-restricted-syntax */ if (!Object.prototype.hasOwnProperty.call(webpackExports, key)) { continue; } var namedExport = void 0; try { namedExport = webpackExports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/rojas/Desktop/roslen-ssr/pages/products.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(81)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS4yNjczNDgwN2E0MWZhMWZiNjM0Mi5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvcHJvZHVjdHMuanM/ZDhkMDUzZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uL2NvbnRhaW5lcnMvbGF5b3V0J1xuaW1wb3J0IFByb2R1Y3QgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9kdWN0J1xuaW1wb3J0IExvYWRpbmcgZnJvbSAnLi4vY29tcG9uZW50cy9zaGFyZWQvbG9hZGluZydcbmltcG9ydCBIZXJvUHJvZHVjdHMgZnJvbSAnLi4vY29tcG9uZW50cy9oZXJvLXByb2R1Y3RzJ1xuXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaSdcblxuaW1wb3J0IHsgQ29udGFpbmVyUHJvZHVjdHMsIFN1cGVyQ29udGFpbmVyUHJvZHVjdHMgfSBmcm9tICcuLi9zdHlsZXNoZWV0L3N0eWxlcydcblxuY2xhc3MgUHJvZHVjdHMgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0ZSA9IHtcbiAgICBwcm9kdWN0czogW10sXG4gICAgbG9hZGluZzogdHJ1ZSxcbiAgICBwYWdlOiAxXG4gIH1cblxuICBhc3luYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgY29uc3QgcHJvZHVjdHMgPSBhd2FpdCBhcGkucHJvZHVjdHMuZ2V0UHJvZHVjdHModGhpcy5zdGF0ZS5wYWdlKVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcHJvZHVjdHMsXG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIHBhZ2U6IHRoaXMuc3RhdGUucGFnZSArIDEsXG4gICAgICBhbGw6IHRydWVcbiAgICB9KVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKVxuICB9XG5cbiAgaGFuZGxlU2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmKHRoaXMuc3RhdGUuYWxsKSB7XG4gICAgICBpZih0aGlzLnN0YXRlLmxvYWRpbmcpIHJldHVybiBudWxsXG4gICAgICBpZih0aGlzLnN0YXRlLnBhZ2UgPiA1KSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnNjcm9sbFlcbiAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICBjb25zdCBmdWxsSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHRcblxuICAgICAgaWYgKCEoc2Nyb2xsZWQgKyB2aWV3cG9ydEhlaWdodCArIDM1MCA+PSBmdWxsSGVpZ2h0KSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxvYWRpbmc6IHRydWUgfSwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGFwaS5wcm9kdWN0cy5nZXRQcm9kdWN0cyh0aGlzLnN0YXRlLnBhZ2UpXG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcHJvZHVjdHM6IHRoaXMuc3RhdGUucHJvZHVjdHMuY29uY2F0KHByb2R1Y3RzKSxcbiAgICAgICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UgKyAxLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5oYW5kbGVTY3JvbGwpXG4gIH1cblxuICBoYW5kbGVGZXRjaENsZWFuaW5nID0gYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFuaW5nUHJvZHVjdHMgPSBhd2FpdCBhcGkucHJvZHVjdHMuZ2V0Q2xlYW5pbmdQcm9kdWN0cygpXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBwcm9kdWN0czogY2xlYW5pbmdQcm9kdWN0cyxcbiAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgYWxsOiBmYWxzZVxuICAgIH0pXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMYXlvdXQ+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPEhlcm9Qcm9kdWN0cyBnZXRQcm9kdWN0c0NsZWFuaW5nPXt0aGlzLmhhbmRsZUZldGNoQ2xlYW5pbmd9IC8+XG4gICAgICAgICAgPFN1cGVyQ29udGFpbmVyUHJvZHVjdHM+XG4gICAgICAgICAgICA8Q29udGFpbmVyUHJvZHVjdHM+XG4gICAgICAgICAgICAgIHt0aGlzLnN0YXRlLnByb2R1Y3RzLm1hcChwcm9kdWN0ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gPFByb2R1Y3Qga2V5PXtwcm9kdWN0LmlkfSB7Li4ucHJvZHVjdH0gLz5cbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L0NvbnRhaW5lclByb2R1Y3RzPlxuICAgICAgICAgIDwvU3VwZXJDb250YWluZXJQcm9kdWN0cz5cbiAgICAgICAgICB7dGhpcy5zdGF0ZS5sb2FkaW5nICYmIChcbiAgICAgICAgICAgIDxMb2FkaW5nIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L0xheW91dD5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvZHVjdHNcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3BhZ2VzL3Byb2R1Y3RzLmpzP2VudHJ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQTtBQUNBOztBQUZBO0FBa0JBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFHQTtBQUZBO0FBSUE7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFMQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQVNBO0FBQ0E7QUFNQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUZBO0FBQ0E7QUFKQTtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUE3Q0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUFBO0FBSUE7QUFOQTtBQUNBO0FBS0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQ0E7QUFBQTs7OztBQWFBO0FBQ0E7O0FBQUE7QUFDQTtBQURBO0FBQUE7O0FBQ0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUNBO0FBREE7QUFBQTtBQUVBOztBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBSUE7O0FBQ0E7QUFLQTtBQUxBO0FBQUE7Ozs7Ozs7QUFRQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBIiwic291cmNlUm9vdCI6IiJ9