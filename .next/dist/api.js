'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URL = 'https://api-roslen-page.herokuapp.com/categories';
var api = {
  products: {
    getProducts: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var response, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(BASE_URL + '?_page=' + page);

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.json();

              case 5:
                data = _context.sent;
                return _context.abrupt('return', data);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getProducts() {
        return _ref.apply(this, arguments);
      }

      return getProducts;
    }()
  }
};
exports.default = api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJCQVNFX1VSTCIsImFwaSIsInByb2R1Y3RzIiwiZ2V0UHJvZHVjdHMiLCJwYWdlIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTSxXQUFOLEFBQWlCO0FBQ2pCLElBQU07O0FBQ00sNkJBQUE7NkdBQUE7WUFBQSxBQUNVLDJFQURWLEFBQ2lCO3NCQURqQjtzRUFBQTtvQkFBQTs2Q0FBQTttQkFBQTtnQ0FBQTt1QkFFaUIsTUFBQSxBQUFTLHVCQUYxQixBQUVpQixBQUEyQjs7bUJBQTVDO0FBRkEsb0NBQUE7Z0NBQUE7dUJBR2EsU0FIYixBQUdhLEFBQVM7O21CQUF0QjtBQUhBLGdDQUFBO2lEQUFBLEFBSUM7O21CQUpEO21CQUFBO2dDQUFBOztBQUFBO29CQUFBO0FBQUE7OzZCQUFBO2dDQUFBO0FBQUE7O2FBQUE7QUFEWixBQUFZLEFBQ0EsQUFRWjtBQVJZLEFBQ0Y7QUFGRSxBQUNWO2tCQVFGLEFBQWUiLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==