// description: https://leetcode.com/problems/longest-continuous-increasing-subsequence/

function longestMonotonicSubarray(nums: number[]): number {
    if (nums.length === 1) return 1;

    let maxLength = 1;
    let incLen = 1;
    let decLen = 1;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            incLen += 1;
            decLen = 1;
        } else if (nums[i] < nums[i - 1]) {
          decLen = decLen + 1;
          incLen = 1;
        } else {
            incLen = 1;
            decLen = 1;
        } 
        
        maxLength = Math.max(maxLength, incLen, decLen);
    }

    return maxLength;
};

console.log(longestMonotonicSubarray([1, 4, 3, 3, 6]));
console.log(longestMonotonicSubarray([3, 2, 1]));