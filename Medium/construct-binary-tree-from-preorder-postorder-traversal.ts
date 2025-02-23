//description: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/description/?envType=daily-question&envId=2025-02-23
import { TreeNode, createTreeNode } from '../structures/treenode';
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function constructFromPrePost(preorder: number[], postorder: number[]): TreeNode | null {
    // preorder gives us our root
    // postorder tells us what goes left


    const constructTree = (preStart, preEnd, postStart, preorder, postorder) => {
        if (preStart > preEnd) return null;

        if (preStart === preEnd) return createTreeNode(preorder[preStart]);

        const leftRoot = preorder[preStart + 1];
        let numOfNodesInLeft = 1;

        while(postorder[postStart + numOfNodesInLeft - 1] !== leftRoot) {
            numOfNodesInLeft++;
        }

        const root: TreeNode = {val: preorder[preStart], left: null, right: null};
        root.left = constructTree(preStart + 1, preStart + numOfNodesInLeft, postStart, preorder, postorder);
        root.right = constructTree(preStart + numOfNodesInLeft + 1, preEnd, postStart + numOfNodesInLeft, preorder, postorder);
        return root;
    }

    const numOfNodes = preorder.length;
    return constructTree(0, numOfNodes - 1, 0, preorder, postorder);
};