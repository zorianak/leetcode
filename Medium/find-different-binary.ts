// description: https://leetcode.com/problems/find-unique-binary-string/description/?envType=daily-question&envId=2025-02-20

function findDifferentBinaryString(nums: string[]): string {
    // so if there's 2 numbers, then the strings will be of size 2
    // if 3, size of 3, and so on
    // typescript doesn't appear to be computing binary correctly, so instead, a different approach will be to create strings of N length of 0 or 1 that isn't in nums. We can fall back on the previous zigzag/diagonal for this
    const n = nums.length;
    return nums.map((num, idx) => {
        return num[idx] === '0' ? '1' : '0'
    }).join('');
};