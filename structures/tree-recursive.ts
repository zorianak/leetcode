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
    
function getChildren (child: TreeNode, nodeNames: string[] =[]) {
  if (!child) return nodeNames;
  nodeNames.push(child.name);
  for (const childNode of child.children) {
    getChildren(childNode, nodeNames);
  }
  
  return nodeNames;
}
    
function getLayerNames (root: TreeNode): string[] {
	const output: string[] = [];
  
  // 2 ways: recursive, and iterative
  // recursive will be more readable ut usually compiles into interative
  // iterative would be better to bruteforce as well
  return getChildren(root);
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