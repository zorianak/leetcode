//desc: https://leetcode.com/problems/roman-to-integer/?envType=daily-question&envId=2025-02-06

function romanToInt(s: string): number {
    const symbolMap = {
        "I": 1,
        "V": 5,
        "X": 10,
        "L": 50,
        "C": 100,
        "D": 500,
        "M": 1000
    }
    const number = [];

    for (let i = 0; i < s.length; i++) {
        // test if it's decreasing
        if (symbolMap[s[i]] < symbolMap[s[i + 1]]) {
        	// operation is to subtract, and move forward one
          	const bigVal = symbolMap[s[i + 1]];
            const smolVal = symbolMap[s[i]];
            number.push(bigVal - smolVal);
            i++;
        } else {
        	number.push(symbolMap[s[i]]);
        }
    }

    const result = number.reduce((accumulator, num) => accumulator + num, 0);
    console.log(result);
    
    return result;
};