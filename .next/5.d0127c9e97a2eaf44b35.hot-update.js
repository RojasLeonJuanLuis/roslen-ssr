webpackHotUpdate(5,{

/***/ 403:
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

var _layout = __webpack_require__(404);

var _layout2 = _interopRequireDefault(_layout);

var _product = __webpack_require__(418);

var _product2 = _interopRequireDefault(_product);

var _api = __webpack_require__(419);

var _api2 = _interopRequireDefault(_api);

var _styles = __webpack_require__(401);

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

      if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
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

                _this.setState({
                  products: _this.state.products.concat(products),
                  page: _this.state.page + 1,
                  loading: false
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);

                console.log(_context.t0);

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
    key: 'componentWillMount',
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

      function componentWillMount() {
        return _ref3.apply(this, arguments);
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
          lineNumber: 58
        }
      }, _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, this.state.loading && _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, 'Loading...'), _react2.default.createElement(_styles.SuperContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 63
        }
      }, _react2.default.createElement(_styles.ContainerProducts, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, this.state.products.map(function (product) {
        return _react2.default.createElement(_product2.default, (0, _extends3.default)({ key: product.id }, product, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 66
          }
        }));
      })))));
    }
  }]);

  return Products;
}(_react.Component);

exports.default = Products;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL3Byb2R1Y3RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ29tcG9uZW50IiwiTGF5b3V0IiwiUHJvZHVjdCIsImFwaSIsIkNvbnRhaW5lclByb2R1Y3RzIiwiU3VwZXJDb250YWluZXJQcm9kdWN0cyIsIlByb2R1Y3RzIiwic3RhdGUiLCJwcm9kdWN0cyIsImxvYWRpbmciLCJwYWdlIiwiaGFuZGxlU2Nyb2xsIiwic2Nyb2xsZWQiLCJ3aW5kb3ciLCJzY3JvbGxZIiwidmlld3BvcnRIZWlnaHQiLCJpbm5lckhlaWdodCIsImZ1bGxIZWlnaHQiLCJkb2N1bWVudCIsImJvZHkiLCJjbGllbnRIZWlnaHQiLCJzZXRTdGF0ZSIsImdldFByb2R1Y3RzIiwiY29uY2F0IiwiY29uc29sZSIsImxvZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibWFwIiwicHJvZHVjdCIsImlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFPLEFBQVk7Ozs7QUFDbkIsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQU8sQUFBUzs7OztBQUVoQixBQUFTLEFBQW1CLEFBQThCOzs7Ozs7O0lBRXBELEE7Ozs7Ozs7Ozs7Ozs7OztnTixBQUNKO2dCQUFRLEFBQ0ksQUFDVjtlQUZNLEFBRUcsQUFDVDtZLEFBSE0sQUFHQTtBQUhBLEFBQ04sYUFnQkYsQSxlQUFlLFlBQU0sQUFDbkI7VUFBRyxNQUFBLEFBQUssTUFBUixBQUFjLFNBQVMsQUFBRTtlQUFBLEFBQU8sQUFBTTtBQUV0Qzs7VUFBTSxXQUFXLE9BQWpCLEFBQXdCLEFBQ3hCO1VBQU0saUJBQWlCLE9BQXZCLEFBQThCLEFBQzlCO1VBQU0sYUFBYSxTQUFBLEFBQVMsS0FBNUIsQUFBaUMsQUFFakM7O1VBQUksRUFBRSxXQUFBLEFBQVcsaUJBQVgsQUFBNEIsT0FBbEMsQUFBSSxBQUFxQyxhQUFhLEFBQ3BEO2VBQUEsQUFBTyxBQUNSO0FBRUQ7O1lBQUEsQUFBSyxTQUFTLEVBQUUsU0FBaEIsQUFBYyxBQUFXLGlGQUFRLG1CQUFBO1lBQUE7c0VBQUE7b0JBQUE7NkNBQUE7bUJBQUE7Z0NBQUE7Z0NBQUE7dUJBRU4sY0FBQSxBQUFJLFNBQUosQUFBYSxZQUFZLE1BQUEsQUFBSyxNQUZ4QixBQUVOLEFBQW9DOzttQkFBckQ7QUFGdUIsb0NBSTdCOztzQkFBQSxBQUFLOzRCQUNPLE1BQUEsQUFBSyxNQUFMLEFBQVcsU0FBWCxBQUFvQixPQURsQixBQUNGLEFBQTJCLEFBQ3JDO3dCQUFNLE1BQUEsQUFBSyxNQUFMLEFBQVcsT0FGTCxBQUVZLEFBQ3hCOzJCQVAyQixBQUk3QixBQUFjLEFBR0g7QUFIRyxBQUNaO2dDQUwyQjtBQUFBOzttQkFBQTtnQ0FBQTtnREFVN0I7O3dCQUFBLEFBQVEsYUFWcUI7O21CQUFBO21CQUFBO2dDQUFBOztBQUFBO2lDQUFBO0FBQWpDLEFBYUQ7QTs7Ozs7Ozs7Ozs7Ozt1QkFsQ3dCLGNBQUEsQUFBSSxTQUFKLEFBQWEsWUFBWSxLQUFBLEFBQUssTUFBOUIsQUFBb0MsQTs7bUJBQXJEO0EscUNBQ047O3FCQUFBLEFBQUs7NEJBQVMsQUFFWjsyQkFGWSxBQUVILEFBQ1Q7d0JBQU0sS0FBQSxBQUFLLE1BQUwsQUFBVyxPQUhuQixBQUFjLEFBR1ksQUFHMUI7QUFOYyxBQUNaOzt1QkFLRixBQUFPLGlCQUFQLEFBQXdCLFVBQVUsS0FBbEMsQUFBdUM7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0E2QmxCLEFBQ3JCO2FBQUEsQUFBTyxvQkFBUCxBQUEyQixVQUFVLEtBQXJDLEFBQTBDLEFBQzNDOzs7OzZCQUVRLEFBQ1A7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxjQUNHLEFBQUssTUFBTCxBQUFXLDJCQUNWLGNBQUE7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxPQUFBLEVBRkosQUFFSSxBQUVGLCtCQUFBLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0U7QUFERjtBQUFBLHlCQUNFLEFBQUM7O29CQUFEO3NCQUFBLEFBQ0c7QUFESDtBQUFBLGNBQ0csQUFBSyxNQUFMLEFBQVcsU0FBWCxBQUFvQixJQUFJLG1CQUFXLEFBQ2xDOytCQUFPLEFBQUMsMERBQVEsS0FBSyxRQUFkLEFBQXNCLE1BQXRCLEFBQThCOztzQkFBOUI7d0JBQVAsQUFBTyxBQUNSO0FBRFE7QUFBQSxVQUFBO0FBVG5CLEFBQ0UsQUFDRSxBQUlFLEFBQ0UsQUFDRyxBQVFaOzs7OztBQWpFb0IsQSxBQW9FdkI7O2tCQUFBLEFBQWUiLCJmaWxlIjoicHJvZHVjdHMuanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL3JvamFzL0Rlc2t0b3Avcm9zbGVuLXNzciJ9

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS5kMDEyN2M5ZTk3YTJlYWY0NGIzNS5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vcGFnZXMvcHJvZHVjdHMuanM/ZmY0M2QyOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uL2NvbnRhaW5lcnMvbGF5b3V0J1xuaW1wb3J0IFByb2R1Y3QgZnJvbSAnLi4vY29tcG9uZW50cy9wcm9kdWN0J1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGknXG5cbmltcG9ydCB7IENvbnRhaW5lclByb2R1Y3RzLCBTdXBlckNvbnRhaW5lclByb2R1Y3RzIH0gZnJvbSAnLi4vc3R5bGVzaGVldC9zdHlsZXMnXG5cbmNsYXNzIFByb2R1Y3RzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGUgPSB7XG4gICAgcHJvZHVjdHM6IFtdLFxuICAgIGxvYWRpbmc6IHRydWUsXG4gICAgcGFnZTogMVxuICB9XG5cbiAgYXN5bmMgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGNvbnN0IHByb2R1Y3RzID0gYXdhaXQgYXBpLnByb2R1Y3RzLmdldFByb2R1Y3RzKHRoaXMuc3RhdGUucGFnZSlcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHByb2R1Y3RzLFxuICAgICAgbG9hZGluZzogZmFsc2UsXG4gICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UgKyAxXG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLmhhbmRsZVNjcm9sbClcbiAgfVxuXG4gIGhhbmRsZVNjcm9sbCA9ICgpID0+IHtcbiAgICBpZih0aGlzLnN0YXRlLmxvYWRpbmcpIHsgcmV0dXJuIG51bGwgfVxuXG4gICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cuc2Nyb2xsWVxuICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgY29uc3QgZnVsbEhlaWdodCA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0XG5cbiAgICBpZiAoIShzY3JvbGxlZCArIHZpZXdwb3J0SGVpZ2h0ICsgMzAwID49IGZ1bGxIZWlnaHQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgbG9hZGluZzogdHJ1ZSB9LCBhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwcm9kdWN0cyA9IGF3YWl0IGFwaS5wcm9kdWN0cy5nZXRQcm9kdWN0cyh0aGlzLnN0YXRlLnBhZ2UpXG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgcHJvZHVjdHM6IHRoaXMuc3RhdGUucHJvZHVjdHMuY29uY2F0KHByb2R1Y3RzKSxcbiAgICAgICAgICBwYWdlOiB0aGlzLnN0YXRlLnBhZ2UgKyAxLFxuICAgICAgICAgIGxvYWRpbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfWNhdGNoKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMuaGFuZGxlU2Nyb2xsKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8TGF5b3V0PlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHt0aGlzLnN0YXRlLmxvYWRpbmcgJiYgKFxuICAgICAgICAgICAgPGRpdj5Mb2FkaW5nLi4uPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8U3VwZXJDb250YWluZXJQcm9kdWN0cz5cbiAgICAgICAgICAgIDxDb250YWluZXJQcm9kdWN0cz5cbiAgICAgICAgICAgICAge3RoaXMuc3RhdGUucHJvZHVjdHMubWFwKHByb2R1Y3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiA8UHJvZHVjdCBrZXk9e3Byb2R1Y3QuaWR9IHsuLi5wcm9kdWN0fSAvPlxuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvQ29udGFpbmVyUHJvZHVjdHM+XG4gICAgICAgICAgPC9TdXBlckNvbnRhaW5lclByb2R1Y3RzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvTGF5b3V0PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9kdWN0c1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXMvcHJvZHVjdHMuanM/ZW50cnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7O0FBRkE7QUFpQkE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBREE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFEQTtBQUZBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBTEE7QUFBQTtBQUNBO0FBREE7QUFBQTtBQVVBO0FBQ0E7QUFEQTtBQUNBO0FBWEE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFhQTs7Ozs7Ozs7Ozs7Ozs7QUFsQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUFBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBO0FBQUE7Ozs7QUFJQTtBQUNBOztBQUFBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBOztBQUVBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFEQTtBQUFBOztBQUNBO0FBQ0E7QUFEQTtBQUFBO0FBRUE7O0FBQUE7QUFDQTtBQURBO0FBQUE7QUFPQTs7Ozs7OztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=