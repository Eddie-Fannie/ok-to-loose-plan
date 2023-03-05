/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let res = 0; // 记录最大的深度
let depth = 0; // 记录遍历到的节点深度

const traverse = function(root) {
    if (root == null) return;
    // 前序位置
    depth += 1;
    if (root.left == null && root.right == null) {
        // 到达叶子节点 更新最大深度
        res = Math.max(depth, res)
    }
    traverse(root.left)
    traverse(root.right)
    // 后序位置
    depth -= 1;
}
var maxDepth = function(root) {
    traverse(root);
    return res;
};