//
// process.js
//

export default class Process {

  constructor(title, performance = 100) {
    this.title = title;
    this.performance = performance;
    this._isBusy = false;
  }

  get isBusy() {
    return this._isBusy;
  }

  makingFIFO(task) {
    this._isBusy = true;
		this._delay(task);
		this._isBusy = false;
  }

  makingRR(task, time) {
		this._isBusy = true;
		this._delay(task, time);
		task.durationTime += time;
		this._isBusy = false;
	}

	_delay(task, time) {
  	task.runningTime = time || task.time;
		task.startTime = performance.now();
  	const finishTime = performance.now() + task.runningTime;

		while (performance.now() <= finishTime) {}

		task.finishTime = performance.now();
		task.delayTime = Math.abs(task.runningTime - (task.finishTime - task.beginTime));
		task.totalTime = task.finishTime - task.beginTime;
	}

}
