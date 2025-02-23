// description: https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/description/

function check(nums: number[]): boolean {
    let isSorted = nums.length === 1;
    
    const findRotation = (input = nums) => {
    	let rotIdx = 0;
    	// find any spot in which the array stops increasing in value
      // and then move that to the front
      
      for (let i = 1; i < input.length; i++) {
      	if (input[i] < input[i -1 ]) {
        	rotIdx = i;
        }
      }
      
      console.log(rotIdx)
      return rotIdx;
    }
    
    const rotIdx = findRotation();
    const newArray = [...nums.slice(rotIdx, nums.length), ...nums.slice(0, rotIdx)];
    isSorted = findRotation(newArray) === 0;
    return isSorted;
};