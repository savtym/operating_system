//
// modelController.js
//


import Variables from './common/variables.js';
import Observer from './common/observer.js';

import Process from './Model/process.js';
import Task from './Model/task.js';

export default class ModelController {

  constructor() {
    this.time = 1000;
    this.processor = new Process('Single Process');
  }

  start() {
		this.counter = 0;

		const queues = {
			fifo: {
				tasks:[
					new Task('1', 200),
					new Task('2', 150),
					new Task('3', 300),
					new Task('4', 100),
					new Task('5', 50),
					new Task('6', 250),
					new Task('7', 100),
					new Task('8', 200),
					new Task('9', 500),
				],
				time: 0,
				isDone: false,
				priority: 3,
				maxTime: 200,
				func: () => {
					this.carriageFIFO(queues.fifo, this.processor);
				}
			},
			rr1: {
				tasks:[
					new Task('1', 200),
					new Task('2', 150),
					new Task('3', 300),
					new Task('4', 100),
					new Task('5', 50),
					new Task('6', 250),
					new Task('7', 100),
					new Task('8', 200),
					new Task('9', 500),
				],
				time: 0,
				isDone: false,
				priority: 1,
				counterDone: 0,
				maxTime: 50,
				func: () => {
					this.carriageRR(queues.rr1, this.processor, Variables.isFreeTaskRR1, 25);
				}
			},
			rr2: {
				tasks:[
					new Task('1', 100),
					new Task('2', 50),
					new Task('3', 400),
					new Task('4', 250),
					new Task('5', 500),
					new Task('6', 350),
					new Task('7', 50),
					new Task('8', 25),
					new Task('9', 52),
				],
				time: 0,
				isDone: false,
				priority: 2,
				counterDone: 0,
				maxTime: 100,
				func: () => {
					this.carriageRR(queues.rr2, this.processor, Variables.isFreeTaskRR2, 50);
				}
			}
		};

		const lengthQueues = Object.keys(queues).length;

		while (this.counter !== lengthQueues) {
			const queue = ModelController.comparePriority(queues);
			if (!queue.isDone) {
				queue.func();
				queue.time = performance.now();
			}
		}
	}


	carriageFIFO(queue, process) {
		for (let task of queue.tasks) {
			task.beginTime = performance.now();
			process.makingFIFO(task);
			task.done = true;
		}

		queue.isDone = true;
		this.counter++;
		Observer.emit(Variables.isFreeTaskFIFO, queue.tasks);
  }


  carriageRR(queue, process, nameTask, time = 25) {

		const finishTime = performance.now() + time;

		while (performance.now() <= finishTime) {
			const task = queue.tasks.shift();

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
			Observer.emit(nameTask, queue.tasks);
		}
	}

  static comparePriority(queues) {
  	let index = 0;

		const sortable = [];
		for (let queue in queues) {
			if (!queues[queue].isDone) {
				sortable.push([queue, queues[queue]]);
			}
		}

		sortable.sort((a, b) => (a[1].time + a[1].maxTime) - (b[1].time + b[1].maxTime));

		if (sortable.length > 1
			&& sortable[0].time === sortable[1].time
			&& sortable[0].priority < sortable[1].priority) {
			index = 1;
		}

		return sortable[index][1];
  }
}
