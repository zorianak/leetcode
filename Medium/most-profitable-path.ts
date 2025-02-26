function mostProfitablePath(edges: number[][], bob: number, amount: number[]): number {
    const n = amount.length;
    const bobsPath = new Map<number, number>();
    const visited: boolean[] = new Array(n).fill(false);
    const tree = Array.from({ length: n }, () => []);
    let maxIncome = Number.MIN_SAFE_INTEGER;
    const nodeQueue: [number, number, number][] = [[0, 0, 0]];

    const findBobPath = (sourceNode: number, time: number): boolean => {
        bobsPath.set(sourceNode, time);
        visited[sourceNode] = true;

        if(sourceNode === 0) {
            return true;
        }

        for (const adjacentNode of tree[sourceNode]) {
            if(!visited[adjacentNode]) {
                if (findBobPath(adjacentNode, time + 1)) {
                    return true;
                }
            }
        }

        bobsPath.delete(sourceNode);
        return false;
    }

    for (const edge of edges) {
        tree[edge[0]].push(edge[1]);
        tree[edge[1]].push(edge[0]);
    }

    findBobPath(bob, 0);

    // bfs
    visited.fill(false);
    while(nodeQueue.length > 0) {
        const [sourceNode, time, income] = nodeQueue.shift()!;
        let currentIncome = income;

        // alice is first
        // @ts-ignore we're literally testing for it to be there?
        if(!bobsPath.has(sourceNode) || time < bobsPath.get(sourceNode)!) {
            currentIncome += amount[sourceNode];
        }

        // they reach it at same time
        else if (time === bobsPath.get(sourceNode)!) {
            currentIncome += amount[sourceNode]/2
        }

        // update max if its a new leaf
        if (tree[sourceNode].length === 1 && sourceNode !== 0) {
            maxIncome = Math.max(maxIncome, currentIncome);
        }

        // go to unvisited vertices
        for (const adjacentNode of tree[sourceNode]) {
            if (!visited[adjacentNode]) {
                nodeQueue.push([adjacentNode, time + 1, currentIncome])
            }
        }

        // mark as visited
        visited[sourceNode] = true;
    }

    return maxIncome;
};