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
        var response, data;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(BASE_URL + '?_page=1');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJCQVNFX1VSTCIsImFwaSIsInByb2R1Y3RzIiwiZ2V0UHJvZHVjdHMiLCJmZXRjaCIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNLFdBQU4sQUFBaUI7QUFDakIsSUFBTTs7QUFDTSw2QkFBQTs2R0FBQTtzQkFBQTtzRUFBQTtvQkFBQTs2Q0FBQTttQkFBQTtnQ0FBQTt1QkFFaUIsTUFBQSxBQUFTLFdBRjFCOzttQkFFQTtBQUZBLG9DQUFBO2dDQUFBO3VCQUdhLFNBSGIsQUFHYSxBQUFTOzttQkFBdEI7QUFIQSxnQ0FBQTtpREFBQSxBQUlDOzttQkFKRDttQkFBQTtnQ0FBQTs7QUFBQTtvQkFBQTtBQUFBOzs2QkFBQTtnQ0FBQTtBQUFBOzthQUFBO0FBRFosQUFBWSxBQUNBLEFBUVo7QUFSWSxBQUNGO0FBRkUsQUFDVjtrQkFRRixBQUFlIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9qYXMvRGVza3RvcC9yb3NsZW4tc3NyIn0=