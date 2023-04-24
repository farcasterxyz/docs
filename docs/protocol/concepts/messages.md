# Messages

A message is a user action like posting an update, liking something, or updating a profile. Messages are a few kilobytes in size, containing text and metadata, and are uniquely identified by the hash of their contents. Users must store content like images and videos elsewhere and include them by reference with URLs. Messages must include a timestamp for ordering, though these are user-reported and not secure.

Messages must contain implicit or explicit resource ids to handle conflicts. For example, a message updating user 123's display name can include the identifier`123.display_name`. If many messages have the same identifier, the network keeps the one with the highest order. Messages are ordered by comparing timestamps and, if they are equal, comparing hashes lexicographically.

Actions such as likes are reversible by adding a _remove message_ with a higher order than the _add message_. Privacy-preserving deletes are also possible for messages that add new content such as posts. A remove message is created with the hash of the _add message_, which is then dropped by the network.
