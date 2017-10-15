'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.AppController = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //
// appController.js
//

var _observer = require('./common/observer.js');

var _observer2 = _interopRequireDefault(_observer);

var _variables = require('./common/variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _modelController = require('./modelController.js');

var _modelController2 = _interopRequireDefault(_modelController);

var _viewController = require('./viewController.js');

var _viewController2 = _interopRequireDefault(_viewController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = exports.AppController = function () {
	function AppController() {
		_classCallCheck(this, AppController);

		this.model = new _modelController2.default();
		this.view = new _viewController2.default(this.model);

		_observer2.default.addListener(_variables2.default.isFreeTaskFIFO, this.isFreeProcessFIFO.bind(this));
		_observer2.default.addListener(_variables2.default.isFreeTaskRR1, this.isFreeProcessRR1.bind(this));
		_observer2.default.addListener(_variables2.default.isFreeTaskRR2, this.isFreeProcessRR2.bind(this));

		this.model.start();
	}

	_createClass(AppController, [{
		key: 'isFreeProcessFIFO',
		value: function isFreeProcessFIFO(task) {
			this.view.taskIsDone(task, 'body-table-fifo');
		}
	}, {
		key: 'isFreeProcessRR1',
		value: function isFreeProcessRR1(task) {
			this.view.taskIsDone(task, 'body-table-rr-1');
		}
	}, {
		key: 'isFreeProcessRR2',
		value: function isFreeProcessRR2(task) {
			this.view.taskIsDone(task, 'body-table-rr-2');
		}
	}]);

	return AppController;
}();