'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingProducts = exports.NavBarLink = exports.Roslen = exports.NavBarChildren = exports.ContainerNavBar = exports.Nav = exports.Card = exports.SuperContainerProducts = exports.ContainerProducts = exports.Image = undefined;

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = /*#__PURE__*/exports.Image = _styledComponents2.default.img.withConfig({
  displayName: 'styles__Image',
  componentId: 's1ovvong-0'
})(['width:60%;']);
var ContainerProducts = /*#__PURE__*/exports.ContainerProducts = _styledComponents2.default.div.withConfig({
  displayName: 'styles__ContainerProducts',
  componentId: 's1ovvong-1'
})(['display:grid;grid-template-columns:24% 24% 24% 24%;grid-gap:15px;box-sizing:border-box;width:80%;margin:auto;padding-top:20px;padding-bottom:20px;']);
var SuperContainerProducts = /*#__PURE__*/exports.SuperContainerProducts = _styledComponents2.default.div.withConfig({
  displayName: 'styles__SuperContainerProducts',
  componentId: 's1ovvong-2'
})(['background-color:rgb(245,244,250);']);
var Card = /*#__PURE__*/exports.Card = _styledComponents2.default.div.withConfig({
  displayName: 'styles__Card',
  componentId: 's1ovvong-3'
})(['background-color:#fff;border-radius:4px;padding:3px;box-sizing:border-box;border:1px solid rgb(246,246,246);display:flex;justify-content:center;align-items:center;text-align:center;flex-direction:column;box-shadow:2px 2px 30px 2px #EBEBEB;font-family:\'Cabin\',sans-serif;transition:.4s;&:hover{transform:scale(1.03);}']);
var Nav = /*#__PURE__*/exports.Nav = _styledComponents2.default.header.withConfig({
  displayName: 'styles__Nav',
  componentId: 's1ovvong-4'
})(['border-bottom:1px solid rgb(246,246,246);']);
var ContainerNavBar = /*#__PURE__*/exports.ContainerNavBar = _styledComponents2.default.nav.withConfig({
  displayName: 'styles__ContainerNavBar',
  componentId: 's1ovvong-5'
})(['display:flex;width:80%;margin:auto;align-items:center;padding-top:10px;padding-bottom:10px;justify-content:space-between;font-family:\'Cabin\',sans-serif;transition:.6s;@media(max-width:985px){width:100%;}@media(max-width:767px){flex-direction:column;}']);
var NavBarChildren = /*#__PURE__*/exports.NavBarChildren = _styledComponents2.default.div.withConfig({
  displayName: 'styles__NavBarChildren',
  componentId: 's1ovvong-6'
})(['display:flex;width:100%;padding:10px;box-sizing:border-box;justify-content:space-between;@media(max-width:767px){flex-direction:column;}']);
var Roslen = /*#__PURE__*/exports.Roslen = _styledComponents2.default.div.withConfig({
  displayName: 'styles__Roslen',
  componentId: 's1ovvong-7'
})(['width:100%;&:hover{cursor:pointer;}']);
var NavBarLink = /*#__PURE__*/exports.NavBarLink = _styledComponents2.default.a.withConfig({
  displayName: 'styles__NavBarLink',
  componentId: 's1ovvong-8'
})(['color:#424242;width:140px;text-align:left;font-size:17px;&:hover{cursor:pointer;}@media(max-width:985px){}@media(max-width:767px){width:100%;}']);
var LoadingProducts = /*#__PURE__*/exports.LoadingProducts = _styledComponents2.default.div.withConfig({
  displayName: 'styles__LoadingProducts',
  componentId: 's1ovvong-9'
})(['width:80px;height:80px;margin:100px auto;background-color:#FDA066;border-radius:100%;-webkit-animation:sk-scaleout 1.0s infinite ease-in-out;animation:sk-scaleout 1.0s infinite ease-in-out;@-webkit-keyframes sk-scaleout{0%{-webkit-transform:scale(0)}100%{-webkit-transform:scale(1.0);opacity:0;}}@keyframes sk-scaleout{0%{-webkit-transform:scale(0);transform:scale(0);}100%{-webkit-transform:scale(1.0);transform:scale(1.0);opacity:0;}}']);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlc2hlZXQvc3R5bGVzLmpzIl0sIm5hbWVzIjpbInN0eWxlZCIsIkltYWdlIiwiaW1nIiwiQ29udGFpbmVyUHJvZHVjdHMiLCJkaXYiLCJTdXBlckNvbnRhaW5lclByb2R1Y3RzIiwiQ2FyZCIsIk5hdiIsImhlYWRlciIsIkNvbnRhaW5lck5hdkJhciIsIm5hdiIsIk5hdkJhckNoaWxkcmVuIiwiUm9zbGVuIiwiTmF2QmFyTGluayIsImEiLCJMb2FkaW5nUHJvZHVjdHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxBQUFPLEFBRVA7Ozs7OztBQUFPLElBQU0sZ0VBQUEsQUFBZTtlQUFmO2VBQUE7QUFBQSxDQUFRLEdBQWQsQUFHUDtBQUFPLElBQU0sd0ZBQUEsQUFBMkI7ZUFBM0I7ZUFBQTtBQUFBLENBQW9CLEdBQTFCLEFBVVA7QUFBTyxJQUFNLGtHQUFBLEFBQWdDO2VBQWhDO2VBQUE7QUFBQSxDQUF5QixHQUEvQixBQUdQO0FBQU8sSUFBTSw4REFBQSxBQUFjO2VBQWQ7ZUFBQTtBQUFBLENBQU8sR0FBYixBQWtCUDtBQUFPLElBQU0sNERBQUEsQUFBYTtlQUFiO2VBQUE7QUFBQSxDQUFNLEdBQVosQUFHUDtBQUFPLElBQU0sb0ZBQUEsQUFBeUI7ZUFBekI7ZUFBQTtBQUFBLENBQWtCLEdBQXhCLEFBaUJQO0FBQU8sSUFBTSxrRkFBQSxBQUF3QjtlQUF4QjtlQUFBO0FBQUEsQ0FBaUIsR0FBdkIsQUFVUDtBQUFPLElBQU0sa0VBQUEsQUFBZ0I7ZUFBaEI7ZUFBQTtBQUFBLENBQVMsR0FBZixBQU1QO0FBQU8sSUFBTSwwRUFBQSxBQUFvQjtlQUFwQjtlQUFBO0FBQUEsQ0FBYSxHQUFuQixBQWNQO0FBQU8sSUFBTSxvRkFBQSxBQUF5QjtlQUF6QjtlQUFBO0FBQUEsQ0FBa0IsR0FBeEIiLCJmaWxlIjoic3R5bGVzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9yb2phcy9EZXNrdG9wL3Jvc2xlbi1zc3IifQ==