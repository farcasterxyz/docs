# Architecture

Farcaster a une architecture hybride qui stocke l'identité onchain et les données offchain.

![Architecture](/assets/architecture.png)

## Onchain

Les systèmes onchain de Farcaster sont implémentés sous forme de [contrats sur OP Mainnet](./contracts.md). Les actions sont effectuées onchain uniquement lorsque la sécurité et la cohérence sont critiques. L'utilisation des actions onchain est maintenue au minimum pour réduire les coûts et améliorer les performances.

Seules quelques actions sont effectuées onchain, notamment :

- Créer un [compte](../what-is-farcaster/accounts.md).
- Payer un loyer pour [stocker des données](../what-is-farcaster/messages.md#storage).
- Ajouter des clés de compte pour [applications connectées](../what-is-farcaster/apps.md#connected-apps).

## Offchain

Le système offchain de Farcaster est un réseau peer-to-peer de serveurs appelés [Hubs](./hubs.md) qui stockent les données des utilisateurs. La majorité des actions des utilisateurs sont effectuées offchain. Celles-ci incluent :

- Publier un nouveau message public.
- Suivre un autre utilisateur.
- Réagir à un post.
- Mettre à jour votre photo de profil.

Les actions sont effectuées offchain lorsque la performance et le coût sont critiques. L'utilisation des actions offchain est généralement préférée lorsque la cohérence n'est pas une exigence stricte. Les systèmes offchain atteignent la sécurité en s'appuyant sur les signatures des systèmes onchain.