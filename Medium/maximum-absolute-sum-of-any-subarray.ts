// description: https://leetcode.com/problems/maximum-absolute-sum-of-any-subarray/description/?envType=daily-question&envId=2025-02-26

function maxAbsoluteSum(nums: number[]): number {
    let maxSubarraySum = Number.MAX_SAFE_INTEGER;
    let minSubarraySum = Number.MIN_SAFE_INTEGER;
    let prefixSum = 0;
    let maxAbsSum = 0;

    for (let i = 0; i < nums.length; i++) {
        // 0 to 1 of all
        prefixSum += nums[i];

        // min & max prefix sum we've seen so far
        minSubarraySum = Math.min(minSubarraySum, prefixSum);
        maxSubarraySum = Math.max(maxSubarraySum, prefixSum);

        if (prefixSum >= 0) {
            maxAbsSum = Math.max(
                maxAbsSum, 
                Math.max(prefixSum, prefixSum - minSubarraySum)
            );
        } else if (prefixSum <= 0 ) {
            maxAbsSum = Math.max(
                maxAbsSum, 
                Math.max(
                    Math.abs(prefixSum), 
                    Math.abs(prefixSum - maxSubarraySum)
                )
            );
        }
    }

    return maxAbsSum;
};