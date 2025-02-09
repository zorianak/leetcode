interface TreeNode {
	name: string;
  children: TreeNode[];
}

/* Root
├── Layer 1
│   ├── Layer 1.1
│   └── Layer 1.2
└── Layer 2
    └── Layer 2.1 
    
    The function should return: ["Root", "Layer 1", "Layer 1.1", "Layer 1.2", "Layer 2", "Layer 2.1"] */
    
function getChildrenRecursive (child: TreeNode, nodeNames: string[] =[]) {
  if (!child) return nodeNames;
  nodeNames.push(child.name);
  for (const childNode of child.children) {
    getChildrenRecursive(childNode, nodeNames);
  }
  
  return nodeNames;
}

function getChildrenIterative(node, nodeNames = []) {
    if (!node) return nodeNames;
    // make a stack with the initial node, and then loop thru
    // it and its children until they are empty
    const stack = [node];
    while (stack.length) {
    	console.log(stack);
        // take the current item, and pop it off 
        const curr = stack.pop();
        if (curr) {
            // put it in our array
            nodeNames.push(curr.name);
            // now go thru its kids and put them in the stack
            for (let i = curr.children.length - 1; i >= 0; i--) {
                stack.push(curr.children[i]);
            }
        }
    }

    // return our list
    return nodeNames;

}
    
function getLayerNames (root: TreeNode): string[] {
	const output: string[] = [];
  
  // 2 ways: recursive, and iterative
  // recursive will be more readable ut usually compiles into interative
  // iterative would be better to bruteforce as well
  //return getChildrenRecursive(root);
    return getChildrenIterative(root);
}

const rootNode = {
	name: "Root",
  children: [
  	{
    	name: "Layer 1",
      children: [
      	{
        	name: "Layer 1.1",
          children: []
        },
        {
        	name: "Layer 1.2",
          children: []
        }
      ]
    }, {
    	name: "Layer 2",
      children: [
      	{
        	name: "Layer 2.1",
          children: []
        },
        {
        	name: "Layer 2.2",
          children: []
        }
      ]
    }
  ]
}

console.log(getLayerNames(rootNode));