// description: https://leetcode.com/problems/design-a-number-container-system/?envType=daily-question&envId=2025-02-08

class MinHeap {
    private heap: number[];
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._bubbleUp();
    }

    pop() {
        if (this.heap.length === 0) return -1;
        const min = this.heap[0];
        const last = this.heap.pop();
        if (this.heap.length > 0) {
            if (last !== undefined) {
                this.heap[0] = last;
            }
            this._heapifyDown();
        }
        return min;
    }

    peek() {
        return this.heap.length ? this.heap[0] : -1;
    }

    _bubbleUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[idx]) break;
            [this.heap[parentIdx], this.heap[idx]] = [this.heap[idx], this.heap[parentIdx]];
            idx = parentIdx;
        }
    }

    _heapifyDown() {
        let idx = 0;
        while (true) {
            let left = 2 * idx + 1,
                right = 2 * idx + 2,
                smallest = idx;

            if (left < this.heap.length && this.heap[left] < this.heap[smallest]) smallest = left;
            if (right < this.heap.length && this.heap[right] < this.heap[smallest]) smallest = right;
            if (smallest === idx) break;

            [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
            idx = smallest;
        }
    }
}

class NumberContainers {
    private indexToNumbers: Map<number, number>;
    private numbersToIndex: Map<number, MinHeap>;
    constructor() {
        this.indexToNumbers = new Map();
        this.numbersToIndex = new Map();
    }


    change(index: number, number: number): void {
        if (this.indexToNumbers.has(index)) {
        	let prevNum = this.indexToNumbers.get(index);
          if (prevNum === number) return;
          let prevHeap = this.numbersToIndex.get(prevNum);
          if (prevHeap) prevHeap.push(Number.MAX_SAFE_INTEGER);
        }
        
        this.indexToNumbers.set(index, number);
        if (!this.numbersToIndex.has(number)) this.numbersToIndex.set(number, new MinHeap());
        this.numbersToIndex.get(number).push(index);
    }

    find(number: number): number {
        if (!this.numbersToIndex.has(number) || this.numbersToIndex.get(number).heap.length === 0) {
        	console.log("lol?");
          return -1;
        };
        
        let heap = this.numbersToIndex.get(number);
        while (heap.heap.length > 0) {
        	let idx = heap.peek();
          if (this.indexToNumbers.get(idx) === number) return idx;
          heap.pop();
        }
        
        return -1;
    }
}

const obj = new NumberContainers();
/* obj.change(0,1);
    obj.change(1,2);
    obj.change(0,2); */
console.log(obj.find(10));
obj.change(2, 10);
console.log(obj.find(10));
obj.change(1, 10);
obj.change(3, 10);
obj.change(5, 10);
const result = obj.find(10);
console.log('result is', result);
obj.change(1, 20);
const result2 = obj.find(10);
console.log('result 2 is', result2);

/**
     * Your NumberContainers object will be instantiated and called as such:
     * var obj = new NumberContainers()
     * obj.change(index,number)
     * var param_2 = obj.find(number)
     */