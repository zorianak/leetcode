export type TreeNode = {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
}

export function createTreeNode(val: number, left: TreeNode | null = null, right: TreeNode | null = null): TreeNode {
    return { val, left, right };
}