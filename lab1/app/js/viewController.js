//
// viewController.js
//

export default class ViewController {

  constructor(model) {
  	this.model = model;
  }

  taskIsDone(tasks, idName) {
		this.counter = 1;

		for (let task of tasks) {
			const dom = document.getElementById(idName);
			dom.append(this._createRow(task));
			this.counter++;
		}
	}

  _createRow(task) {
  	const dom = document.createElement('tr');
		dom.innerHTML = `<td>${this.counter}</td>
				<td>${task.beginTime.toFixed(3)}</td>
				<td>${task.time}</td>
				<td>${task.startTime.toFixed(3)}</td>
				<td>${task.finishTime.toFixed(3)}</td>
				<td>${task.delayTime.toFixed(3)}</td>
				<td>${task.totalTime.toFixed(3)}</td>
				<td>${task.title}</td>`;
		return dom;
  }

}