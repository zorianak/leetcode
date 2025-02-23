// description: https://leetcode.com/problems/zigzag-conversion/

function convert(s: string, numRows: number): string {
    if (numRows === 1) {
        return s;
    }
    const newString = "";
    const sArr = s.split('');
    const outArr = new Array(numRows).fill('');

    let currentRow = -1;
    let ascending = true;

    for (let i = 0; i < s.length; i++) {
        currentRow += ascending ? 1 : -1;
        
        outArr[currentRow] += s[i]
        
        if (currentRow === numRows - 1) {
            ascending = false;
        }
        
        if (currentRow === 0) {
            ascending = true;
        }
    }
    
    return outArr.join("");
}