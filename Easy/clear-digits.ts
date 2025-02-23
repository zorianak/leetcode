function clearDigits(s: string): string {
    if (s.length === 0) return s;

    const findInteger = (arr: string[]) => {
        for (let i = 1; i < arr.length; i++) {
            if (parseInt(arr[i]) || parseInt(arr[i]) === 0) {
                return i;
            }
        }
        
        return null;
    }
    
    const sArr = s.split('');
    const firstDigit = findInteger(sArr);
    if (firstDigit === null) return s;

    let digitStack = [{index: firstDigit, value: sArr[firstDigit]}];
    // make a stack of index-value pairs, to remove the digit
    // and then the character to its left
    while(digitStack.length) {
        const curr = digitStack.pop();

        sArr.splice(curr.index - 1, 2);

        const next = findInteger(sArr);
        
        if (next !== null) {
            digitStack.push({ index: next, value: sArr[next] })
        }
    }

    return sArr.join('');
        
};

console.log(clearDigits('g0')) //abc