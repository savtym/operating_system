'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
// variables.js
//

var isFreeProcessFIFO = 'fifo-tasks';
var isFreeProcessRR1 = 'rr1-tasks';
var isFreeProcessRR2 = 'rr2-tasks';

var Variables = function () {
	function Variables() {
		_classCallCheck(this, Variables);
	}

	_createClass(Variables, null, [{
		key: 'isFreeTaskFIFO',
		get: function get() {
			return isFreeProcessFIFO;
		}
	}, {
		key: 'isFreeTaskRR1',
		get: function get() {
			return isFreeProcessRR1;
		}
	}, {
		key: 'isFreeTaskRR2',
		get: function get() {
			return isFreeProcessRR2;
		}
	}]);

	return Variables;
}();

exports.default = Variables;