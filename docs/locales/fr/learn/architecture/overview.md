# Architecture
Farcaster a une architecture hybride qui stocke l'identité sur la blockchain et les données hors chaîne.
![Architecture](/assets/architecture.png)
## Sur la blockchain
Les systèmes de Farcaster sur la blockchain sont implémentés sous forme de [contrats sur OP Mainnet](./contracts.md). Les actions sont effectuées sur la blockchain uniquement lorsque la sécurité et la cohérence sont critiques. L'utilisation des actions sur la blockchain est minimisée pour réduire les coûts et améliorer les performances.
Seules quelques actions sont effectuées sur la blockchain, notamment :
- Créer un [compte](../what-is-farcaster/accounts.md).
- Payer un loyer pour [stocker des données](../what-is-farcaster/messages.md#storage).
- Ajouter des clés de compte pour les [applications connectées](../what-is-farcaster/apps.md#connected-apps).
## Hors chaîne
Le système hors chaîne de Farcaster est un réseau pair-à-pair de serveurs appelés [Hubs](./hubs.md) qui stockent les données des utilisateurs. La majorité des actions des utilisateurs sont effectuées hors chaîne. Celles-ci incluent :
- Publier un nouveau message public.
- Suivre un autre utilisateur.
- Réagir à un post.
- Mettre à jour votre photo de profil.
Les actions sont effectuées hors chaîne lorsque la performance et le coût sont cruciaux. L'utilisation des actions hors chaîne est généralement préférée lorsque la cohérence n'est pas une exigence stricte. Les systèmes hors chaîne assurent la sécurité en s'appuyant sur les signatures des systèmes sur la blockchain.