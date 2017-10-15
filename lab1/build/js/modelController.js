'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); //
// modelController.js
//


var _variables = require('./common/variables.js');

var _variables2 = _interopRequireDefault(_variables);

var _observer = require('./common/observer.js');

var _observer2 = _interopRequireDefault(_observer);

var _process = require('./Model/process.js');

var _process2 = _interopRequireDefault(_process);

var _task = require('./Model/task.js');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelController = function () {
	function ModelController() {
		_classCallCheck(this, ModelController);

		this.time = 1000;
		this.processor = new _process2.default('Single Process');
	}

	_createClass(ModelController, [{
		key: 'start',
		value: function start() {
			var _this = this;

			this.counter = 0;

			var queues = {
				fifo: {
					tasks: [new _task2.default('1', 200), new _task2.default('2', 150), new _task2.default('3', 300), new _task2.default('4', 100), new _task2.default('5', 50), new _task2.default('6', 250), new _task2.default('7', 100), new _task2.default('8', 200), new _task2.default('9', 500)],
					time: 0,
					isDone: false,
					priority: 3,
					maxTime: 200,
					func: function func() {
						_this.carriageFIFO(queues.fifo, _this.processor);
					}
				},
				rr1: {
					tasks: [new _task2.default('1', 200), new _task2.default('2', 150), new _task2.default('3', 300), new _task2.default('4', 100), new _task2.default('5', 50), new _task2.default('6', 250), new _task2.default('7', 100), new _task2.default('8', 200), new _task2.default('9', 500)],
					time: 0,
					isDone: false,
					priority: 1,
					counterDone: 0,
					maxTime: 50,
					func: function func() {
						_this.carriageRR(queues.rr1, _this.processor, _variables2.default.isFreeTaskRR1, 25);
					}
				},
				rr2: {
					tasks: [new _task2.default('1', 100), new _task2.default('2', 50), new _task2.default('3', 400), new _task2.default('4', 250), new _task2.default('5', 500), new _task2.default('6', 350), new _task2.default('7', 50), new _task2.default('8', 25), new _task2.default('9', 52)],
					time: 0,
					isDone: false,
					priority: 2,
					counterDone: 0,
					maxTime: 100,
					func: function func() {
						_this.carriageRR(queues.rr2, _this.processor, _variables2.default.isFreeTaskRR2, 50);
					}
				}
			};

			var lengthQueues = Object.keys(queues).length;

			while (this.counter !== lengthQueues) {
				var queue = ModelController.comparePriority(queues);
				if (!queue.isDone) {
					queue.func();
					queue.time = performance.now();
				}
			}
		}
	}, {
		key: 'carriageFIFO',
		value: function carriageFIFO(queue, process) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = queue.tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var task = _step.value;

					task.beginTime = performance.now();
					process.makingFIFO(task);
					task.done = true;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			queue.isDone = true;
			this.counter++;
			_observer2.default.emit(_variables2.default.isFreeTaskFIFO, queue.tasks);
		}
	}, {
		key: 'carriageRR',
		value: function carriageRR(queue, process, nameTask) {
			var time = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 25;


			var finishTime = performance.now() + time;

			while (performance.now() <= finishTime) {
				var task = queue.tasks.shift();

				if (!task.done) {
					if (!task.beginTime) {
						task.beginTime = performance.now();
					}

					process.makingRR(task, finishTime - performance.now());

					if (task.time <= task.durationTime) {
						task.done = true;
						queue.counterDone++;
					} else {
						queue.tasks.push(task);
						return;
					}
				}

				queue.tasks.push(task);

				if (queue.counterDone === queue.tasks.length) {
					queue.isDone = true;
				}
			}

			if (queue.isDone) {
				this.counter++;
				_observer2.default.emit(nameTask, queue.tasks);
			}
		}
	}], [{
		key: 'comparePriority',
		value: function comparePriority(queues) {
			var index = 0;

			var sortable = [];
			for (var queue in queues) {
				if (!queues[queue].isDone) {
					sortable.push([queue, queues[queue]]);
				}
			}

			sortable.sort(function (a, b) {
				return a[1].time + a[1].maxTime - (b[1].time + b[1].maxTime);
			});

			if (sortable.length > 1 && sortable[0].time === sortable[1].time && sortable[0].priority < sortable[1].priority) {
				index = 1;
			}

			return sortable[index][1];
		}
	}]);

	return ModelController;
}();

exports.default = ModelController;