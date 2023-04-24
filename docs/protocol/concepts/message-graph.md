# Message-Graph

A social network is a graph of users, their content, and their relationships. The graph is initialized with the users registered in the onchain identity registry. Users can add and remove nodes and edges to the graph by creating signed messages. The data structure used to represent this network is called a message-graph, and the server that hosts it is known as a Hub.

Hubs need to synchronize message-graphs across thousands of instances to achieve decentralization. Fortunately, social actions tend to be independent of each other, and when conflicts occur, they are solvable with simple rules. If three different messages add and remove likes from a post, keeping the most recent one and discarding the rest is a reasonable solution.

Using CRDTs to encode these rules allows message-graphs to achieve consensus without coordination. Users can send updates to many hubs via different apps, and their state will eventually converge. Each message type has a CRDT, which compares incoming messages by resource id to catch conflicts. Last-write-wins rules combined with the timestamp-hash ordering allow for deterministic conflict resolution.

Users must only be able to add a limited amount of data to CRDTs. Otherwise, a Hub becomes impractical to operate affecting the network's decentralization. CRDT's solve this by imposing per-user size limits and evicting messages with the lowest order. Time limits can also be imposed to reduce network size by evicting messages with timestamps older than the cutoff.

The message-graph has weaker guarantees than its children. Messages in most CRDTs are valid only if their signer is in the signer CRDT. A message-graph must first sync signer messages before attempting to sync other kinds to ensure convergence. Under the condition of ordered sync, message-graphs can promise strong eventual consistency.
