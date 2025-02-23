// description: https://leetcode.com/problems/find-elements-in-a-contaminated-binary-tree/?envType=daily-question&envId=2025-02-23
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

// @ts-ignore -- This is specific to this problem


class FindElements {
    private vals = new Set();
    constructor(root: TreeNode | null) {
        // const dfs = (node: TreeNode | null, val: number) => {
        const dfs = () => {
            // if (!node) return;
            // this.vals.add(val);
            // dfs(node.left, val = val * 2 + 1);
            // dfs(node.right, val + 1);
            const stack: { node: TreeNode | null, val: number }[] = [{ node: root, val: 0 }];

            while(stack.length > 0) {
                const { node, val } = stack.pop()!;
                this.vals.add(val);
                if (node) {
                    node.val = val;
                    if (node?.right) {
                        stack.push({ node: node.right, val: 2 * val + 2 });
                    }
                    if (node?.left) {
                        stack.push({node: node.left, val: val * 2 + 1});
                    }
                }
            }
        };
        dfs();

    }


    find(target: number): boolean {
        return this.vals.has(target);
    }
}
const root = createTreeNode(-1, null, createTreeNode(-1));
const tree = new FindElements(root);

/**
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */