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
        var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
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
    }(),
    getCleaningProducts: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var response, data;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(BASE_URL + '?category=cleaning');

              case 2:
                response = _context2.sent;
                _context2.next = 5;
                return response.json();

              case 5:
                data = _context2.sent;
                return _context2.abrupt('return', data);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCleaningProducts() {
        return _ref2.apply(this, arguments);
      }

      return getCleaningProducts;
    }()
  }
};
exports.default = api;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS5qcyJdLCJuYW1lcyI6WyJCQVNFX1VSTCIsImFwaSIsInByb2R1Y3RzIiwiZ2V0UHJvZHVjdHMiLCJwYWdlIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJkYXRhIiwiZ2V0Q2xlYW5pbmdQcm9kdWN0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU0sV0FBTixBQUFpQjtBQUNqQixJQUFNOztBQUNNLDZCQUFBOzZHQUFBO1lBQUEsQUFDVSwyRUFEVixBQUNpQjtzQkFEakI7c0VBQUE7b0JBQUE7NkNBQUE7bUJBQUE7Z0NBQUE7dUJBRWlCLE1BQUEsQUFBUyx1QkFGMUIsQUFFaUIsQUFBMkI7O21CQUE1QztBQUZBLG9DQUFBO2dDQUFBO3VCQUdhLFNBSGIsQUFHYSxBQUFTOzttQkFBdEI7QUFIQSxnQ0FBQTtpREFBQSxBQUlDOzttQkFKRDttQkFBQTtnQ0FBQTs7QUFBQTtvQkFBQTtBQUFBOzs2QkFBQTtnQ0FBQTtBQUFBOzthQUFBO0FBTUY7QUFORSxxQ0FBQTsrR0FBQTtzQkFBQTt3RUFBQTtvQkFBQTsrQ0FBQTttQkFBQTtpQ0FBQTt1QkFPaUIsTUFBQSxBQUFTLFdBUDFCOzttQkFPQTtBQVBBLHFDQUFBO2lDQUFBO3VCQVFhLFNBUmIsQUFRYSxBQUFTOzttQkFBdEI7QUFSQSxpQ0FBQTtrREFBQSxBQVNDOzttQkFURDttQkFBQTtpQ0FBQTs7QUFBQTtxQkFBQTtBQUFBOztxQ0FBQTtpQ0FBQTtBQUFBOzthQUFBO0FBRFosQUFBWSxBQUNBLEFBYVo7QUFiWSxBQUNGO0FBRkUsQUFDVjtrQkFhRixBQUFlIiwiZmlsZSI6ImFwaS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcm9qYXMvRGVza3RvcC9yb3NsZW4tc3NyIn0=