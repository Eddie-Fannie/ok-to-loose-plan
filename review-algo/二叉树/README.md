# 二叉树
1. 前序位置是进入一个节点的时候，后序位置是离开一个节点的时候
2. 一棵二叉树的前序遍历结果 = 根节点 + 左子树的前序遍历结果 + 右子树的前序遍历结果
3. 前序位置的代码在刚刚进入一个二叉树节点的时候执行；后序位置的代码在将要离开一个二叉树节点的时候执行；中序位置的代码在一个二叉树节点左子树都遍历完，即将开始遍历右子树的时候执行。
4. 前序位置的代码只能从函数参数中获取父节点传递来的数据，而后序位置的代码不仅可以获取参数数据，还可以获取到子树通过函数返回值传递回来的数据

## 104. 二叉树的最大深度
- 一棵二叉树的最大深度可以通过子树的最大深度推导出来，这就是分解问题计算答案的思路

```js
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

var maxDepth = function(root) {
  if (root == null) return 0;
  let leftTreeMax = maxDepth(root.left);
  let rightTreeMax = maxDepth(root.right);
  return Math.max(leftTreeMax, rightTreeMax) + 1;
};
```

> 但为什么主要的代码逻辑集中在后序位置？

> 因为这个思路正确的核心在于，你确实可以通过子树的最大深度推导出原树的深度，所以当然要首先利用递归函数的定义算出左右子树的最大深度，然后推出原树的最大深度，主要逻辑自然放在后序位置。

- 遍历一遍二叉树，用一个外部变量记录每个节点所在的深度，取最大值就可以得到最大深度

```js
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
```

> 综上，遇到一道二叉树的题目时的通用思考过程是：

> 1、是否可以通过遍历一遍二叉树得到答案？如果可以，用一个 `traverse` 函数配合外部变量来实现。
> 2、是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案？如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值。
> 3、无论使用哪一种思维模式，你都要明白二叉树的每一个节点需要做什么，需要在什么时候（前中后序）做。

## 144.二叉树的前序遍历
- 递归
```js
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
 * @return {number[]}
 */

const result = []

const traverse = function(root) {
  if (root !== null) {
    result.push(root.val)
    traverse(root.left)
    traverse(root.right)
  }
}
var preorderTraversal = function(root) {
  traverse(root)
  return result;
};
```

- 迭代
```js
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
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  const result = [];
  if (!root) return result;
  const rootArray = [root]
  while(rootArray.length > 0) {
    const rootNode = rootArray.pop();
    if (rootNode) {
      result.push(rootNode.val);
      if (rootNode.right) { // 前序遍历右子树最后，所以先push进去
        rootArray.push(rootNode.right)
      }
      if (rootNode.left) {
        rootArray.push(rootNode.left)
      }
    }
  }
  return result;
};
```