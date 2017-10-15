//
// appController.js
//

import Observer from './common/observer.js';
import Variables from './common/variables.js'

import ModelController from './modelController.js';
import ViewController from './viewController.js';

export class AppController {

	constructor() {
    this.model = new ModelController();
    this.view = new ViewController(this.model);

		Observer.addListener(Variables.isFreeTaskFIFO, this.isFreeProcessFIFO.bind(this));
		Observer.addListener(Variables.isFreeTaskRR1, this.isFreeProcessRR1.bind(this));
		Observer.addListener(Variables.isFreeTaskRR2, this.isFreeProcessRR2.bind(this));

		this.model.start();
  }

	isFreeProcessFIFO(task) {
		this.view.taskIsDone(task, 'body-table-fifo');
	}

	isFreeProcessRR1(task) {
		this.view.taskIsDone(task, 'body-table-rr-1');
	}

	isFreeProcessRR2(task) {
		this.view.taskIsDone(task, 'body-table-rr-2');
	}
}
