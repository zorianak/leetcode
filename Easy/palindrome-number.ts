//description: https://leetcode.com/problems/palindrome-number/?envType=daily-question&envId=2025-02-06

function isPalindrome(x: number): boolean {
	const stringNum = x + "";
  const reverseStringNum = stringNum.split('').reverse().join('');
  return stringNum === reverseStringNum;
};