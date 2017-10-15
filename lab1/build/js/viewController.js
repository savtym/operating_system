'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//
// viewController.js
//

var ViewController = function () {
		function ViewController(model) {
				_classCallCheck(this, ViewController);

				this.model = model;
		}

		_createClass(ViewController, [{
				key: 'taskIsDone',
				value: function taskIsDone(tasks, idName) {
						this.counter = 1;

						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
								for (var _iterator = tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
										var task = _step.value;

										var dom = document.getElementById(idName);
										dom.append(this._createRow(task));
										this.counter++;
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
				}
		}, {
				key: '_createRow',
				value: function _createRow(task) {
						var dom = document.createElement('tr');
						dom.innerHTML = '<td>' + this.counter + '</td>\n\t\t\t\t<td>' + task.beginTime.toFixed(3) + '</td>\n\t\t\t\t<td>' + task.time + '</td>\n\t\t\t\t<td>' + task.startTime.toFixed(3) + '</td>\n\t\t\t\t<td>' + task.finishTime.toFixed(3) + '</td>\n\t\t\t\t<td>' + task.delayTime.toFixed(3) + '</td>\n\t\t\t\t<td>' + task.totalTime.toFixed(3) + '</td>\n\t\t\t\t<td>' + task.title + '</td>';
						return dom;
				}
		}]);

		return ViewController;
}();

exports.default = ViewController;