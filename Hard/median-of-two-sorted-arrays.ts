// description: https://leetcode.com/problems/median-of-two-sorted-arrays/
function mergeSort (nums1: number[], nums2:number[]): number[] {
	let mergedArray: number[] = [];
  let i = 0, j = 0;
  
  while(i < nums1.length && j < nums2.length) {
  	if(nums1[i] < nums2[j]) {
    	mergedArray.push(nums1[i]);
      i++;
    } else {
    	mergedArray.push(nums2[j]);
      j++;
    }
  }
  
  // take the rest from nums1
  while(i < nums1.length) {
  	mergedArray.push(nums1[i]);
    i++;
  }
  
  // clear nums2
  while(j < nums2.length) {
    mergedArray.push(nums2[j]);
    j++;
  }
  
  return mergedArray;
}

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    const mergedArrays = mergeSort(nums1, nums2);
    
    // if length is even, then we want the item on the left and right of it
    // if length is odd, we just want the middle item
    const len = mergedArrays.length;
    if (len %2 === 0) {
    	return (mergedArrays[len /2 - 1] + mergedArrays[len /2]) /2;
    } else {
    	return mergedArrays[Math.floor(len/2)];
    }
};