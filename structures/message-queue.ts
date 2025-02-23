class MessageQueue {
    private queue: { userId: string, message: string }[] = [];
    private userRates: { [userId: string]: number[] } = {};
    private limit: number;
    constructor(limit = 5) {
      this.limit = limit;
    }
  
    async enqueue(userId: string, message: string): Promise<void> {
      // Simulate the behavior of adding messages to a queue.
      // Ensure the rate limit is respected before adding the message.
      // If over the limit, reject the message.
      const currentTime = Date.now();
      const rateLimitWindow = 1000; // 1 second
      if (!this.userRates[userId]) {
        this.userRates[userId] = [];
      };
  
      this.userRates[userId] = this.userRates[userId].filter(timestamp => currentTime - timestamp < rateLimitWindow);
  
      if (this.userRates[userId].length >= this.limit) {
        console.error(`User ${userId} has reached rate limit. Message rejected`);
        return;
      }
  
      this.userRates[userId].push(currentTime);
  
      this.queue.push({ userId, message });
  
      console.log(`User ${userId} enqueued a message: ${message}`);
    }
  
    async processQueue(): Promise<void> {
      // Process messages in batches, respecting the rate limit per user.
      // Log the sent messages in batches.
      while (this.queue.length > 0) {
        const batch: string[] = [];
        const batchUsers: Set<string> = new Set();
  
        for(let i = 0; i < this.limit && this.queue.length > 0; i++) {
          const item = this.queue.shift();
          if (!item) {
            continue;
          }
          const { userId, message } = item;
  
          // check if can send messages
          if (batchUsers.has(userId)) {
            continue;
          }
  
          batch.push(message);
          batchUsers.add(userId);
        }
  
        console.log(`sending messages: ${batch.join(", ")}`);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  }
  
  
  (async () => {
  
    const mq = new MessageQueue();// User "user1" sends messages
    await mq.enqueue("user1", "Hello!");
    await mq.enqueue("user1", "How are you?");
    await mq.enqueue("user1", "What's up?");
    await mq.enqueue("user1", "Long time no see!");
    await mq.enqueue("user1", "Let's catch up soon!");
    await mq.enqueue("user1", "Are you available?"); // This should be rejected due to rate limit.
    
    await mq.processQueue();
  })();
  