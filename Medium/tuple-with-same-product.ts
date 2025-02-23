// description: https://leetcode.com/problems/tuple-with-same-product/?envType=daily-question&envId=2025-02-06

function tupleSameProduct(nums: number[]): number {
    const pairProductsFrequency = new Map<number, number[][]>();
    let total = 0;

    for (let i = 0; i < nums.length - 1; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const product = nums[i] * nums[j];
            const target = pairProductsFrequency.get(product) || [];
            target.push([i, j]);
            pairProductsFrequency.set(product, target);
        };
    };

    for (let [_, sets] of pairProductsFrequency) {
        const len = sets.length;
        total += len > 1 ? ((len * (len - 1)) / 2) * 8 : 0;
    }

    return total;
};