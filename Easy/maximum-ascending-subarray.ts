//description: https://leetcode.com/problems/maximum-ascending-subarray-sum/description/?envType=daily-question&envId=2025-02-04

function maxAscendingSum(nums: number[]): number {
    let maxSum = 0;
    let currentSubArraySum = nums[0];
    
    for(let i = 1; i < nums.length; i++) {
    	if (nums[i] <= nums[i - 1]) {
      	maxSum = Math.max(maxSum, currentSubArraySum);
        currentSubArraySum = 0;
      }
      currentSubArraySum = currentSubArraySum + nums[i];
    }
    
    return Math.max(currentSubArraySum, maxSum);
};

console.log(maxAscendingSum([10,20,30,5,10,50])); // 65