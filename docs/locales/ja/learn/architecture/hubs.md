# Hubs

Les hubs sont un réseau distribué de serveurs qui stockent et valident les données de Farcaster.

Un ordinateur peut exécuter un logiciel pour devenir un hub Farcaster. Il télécharge les données Farcaster onchain depuis Ethereum et les données Farcaster offchain depuis d'autres hubs. Chaque hub stocke une copie de toutes les données Farcaster qui peuvent être accessibles via une API.

Les hubs vous permettent de lire et d'écrire des données sur Farcaster, et toute personne construisant une application Farcaster devra en utiliser un. N'importe qui peut faire fonctionner un hub sur son ordinateur portable ou sur un serveur cloud. Un guide complet pour configurer et exécuter un hub est disponible [ici](https://www.thehubble.xyz).

## Conception

Un hub commence par synchroniser les données des contrats Farcaster sur la blockchain Optimism. Il prend connaissance du compte de chaque utilisateur et de leurs clés de compte.

Le cycle de vie d'un message Farcaster ressemble à ceci :

1. Alice crée un nouveau message \"Hello World!\".\n2. Alice (ou son application) signe le message avec une clé de compte.\n3. Alice (ou son application) télécharge le message sur un hub.\n4. Le hub vérifie la validité du message.\n5. Le hub envoie le message aux hubs pairs via le gossip.

![Hub](/assets/hub.png)

### Validation

Le message d'Alice est validé en vérifiant qu'il a une signature valide d'une de ses clés de compte. Le hub s'assure également que le message respecte les exigences du type de message. Par exemple, un message public ou \"cast\" doit être inférieur à 320 octets. Les exigences des types de messages sont spécifiées en détail dans la spécification du protocole.

### Stockage

Le message d'Alice est ensuite vérifié pour les conflits avant d'être stocké dans le hub. Les conflits peuvent survenir pour de nombreuses raisons :

1. Le hub a déjà une copie du message.\n2. Le hub a un message plus récent d'Alice supprimant ce message.\n3. Alice n'a payé que pour 5000 casts, et c'est son 5001ème cast.

Les conflits sont résolus de manière déterministe et asynchrone en utilisant des CRDT. Par exemple, si Alice n'a pas d'espace pour stocker des messages, son message le plus ancien sera supprimé.

### Réplication

Les hubs se synchronisent en utilisant un processus en deux phases : gossip et synchronisation différentielle. Lorsqu'un hub reçoit et stocke un message, il le diffuse immédiatement à ses pairs. Le gossip est effectué en utilisant le protocole gossipsub de libp2p et est sujet à des pertes. Les hubs sélectionnent ensuite périodiquement un pair aléatoire et effectuent une synchronisation différentielle pour trouver les messages perdus. Le processus de synchronisation différentielle compare les merkle tries des hachages de messages pour trouver efficacement les messages perdus.

### Cohérence

Les hubs sont dits avoir une forte cohérence éventuelle. Si un hub est déconnecté, il peut être écrit et se rétablira en toute sécurité lorsqu'il se reconnectera. Cela diffère des blockchains où un nœud déconnecté ne peut pas confirmer les transactions. L'inconvénient est que les messages peuvent arriver dans le désordre. Par exemple, la réponse de Bob à Alice pourrait apparaître avant son message \"Hello World\".

### Évaluation des pairs

Les hubs surveillent les pairs et évaluent leur comportement. Si un pair n'accepte pas les messages valides, prend du retard ou diffuse trop, il peut être ignoré par ses pairs.

### Implémentations

- [Hubble](https://www.thehubble.xyz) - une implémentation de hub en Typescript et Rust

## FAQ

**1. Pourquoi devrais-je exécuter un hub ?**

Vous pourriez avoir besoin d'un hub si vous construisez une application qui souhaite lire ou écrire des données Farcaster.

**2. Y a-t-il des récompenses pour exécuter un hub ?**

Farcaster ne fournit pas de récompenses pour les hubs et ne prévoit pas de le faire. Warpcast, une entreprise construisant sur Farcaster, donne de petites récompenses aux opérateurs de hubs mais cela pourrait changer à l'avenir.