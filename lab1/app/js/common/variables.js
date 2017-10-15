//
// variables.js
//

const isFreeProcessFIFO = 'fifo-tasks';
const isFreeProcessRR1 = 'rr1-tasks';
const isFreeProcessRR2 = 'rr2-tasks';

export default class Variables {
	static get isFreeTaskFIFO() { return isFreeProcessFIFO; }
	static get isFreeTaskRR1() { return isFreeProcessRR1; }
	static get isFreeTaskRR2() { return isFreeProcessRR2;}
}