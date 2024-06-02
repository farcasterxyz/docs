# Messages

Les comptes Farcaster interagissent en signant et publiant des messages. Alice peut créer un message qui dit "_Bonjour @bob_" et le signer avec sa propre clé.
Les messages sont stockés sur un réseau pair-à-pair de nœuds. Un nœud dans le réseau Farcaster est appelé un Hub, et chaque Hub stocke une copie de l'ensemble du réseau. Un utilisateur peut publier un message sur un Hub et il se propagera à l'ensemble du réseau en quelques secondes. Le format compact des messages de Farcaster et le modèle de cohérence finale permettent à cette architecture de s'adapter à des millions d'utilisateurs.
Un compte peut générer une [clé](./accounts.md#adding-account-keys) et la donner à une application qui peut l'utiliser pour signer des messages. Les utilisateurs peuvent utiliser plusieurs applications avec le même compte, et chaque application peut avoir sa propre clé. Séparer les clés de signature des clés de propriété aide à sécuriser le compte.

## Types

Les comptes peuvent publier cinq types différents de messages sur le réseau :
| Type | Description | Exemple |
| ------------- | --------------------------------------------- | ------------------------------ |
| Casts | Messages publics visibles par tous. | "Bonjour tout le monde !" |
| Reactions | Une relation entre un compte et un message. | Alice a aimé le message de Bob. |
| Links | Une relation entre deux comptes. | Alice suit Bob. |
| Profile Data | Métadonnées sur le compte. | Photo de profil, nom d'affichage. |
| Verifications | Une preuve de propriété de quelque chose. | Une adresse Ethereum. |

## Stockage

Un compte doit payer un loyer pour conserver ses messages sur le réseau Farcaster. Facturer un loyer empêche les utilisateurs de spammer le réseau.
Un compte peut louer une unité de stockage en effectuant une transaction onchain vers le Registre de Stockage. Une unité de stockage coûte aujourd'hui 7 $, dure un an et permet à chaque compte de stocker un certain nombre de messages de chaque type. Les limites pour chaque type aujourd'hui sont :

- 5000 Casts
- 2500 Reactions
- 2500 Links
- 50 Profile Data
- 50 Verifications
  Si un compte dépasse sa limite pour un type de message, le message le plus ancien est supprimé pour faire de la place pour le nouveau. L'utilisateur peut continuer à utiliser le réseau sans payer pour plus de stockage et les Hubs peuvent garder la charge de stockage sous contrôle. Un compte peut toujours acheter plus de stockage pour augmenter ses limites.
  Un compte qui laisse expirer son stockage peut perdre tous ses messages. Il y a une période de grâce de 30 jours après l'expiration d'une unité de stockage pendant laquelle un compte doit renouveler ou perdre ses messages.
  Le prix et la taille de chaque unité de stockage sont recalculés périodiquement pour équilibrer la croissance et la qualité du réseau. Voir [FIP-6](https://github.com/farcasterxyz/protocol/discussions/98)
  pour plus de détails.

## Suppression

Un compte peut supprimer des messages à tout moment en publiant un message de suppression correspondant. Le message de suppression supprimera le contenu du message original, laissant une pierre tombale à sa place. Un message supprimé comptera toujours dans la limite de stockage du compte jusqu'à ce qu'il expire en étant remplacé par un message plus récent.

## Horodatages

Les messages ont des horodatages qui comptent les secondes depuis l'Epoch Farcaster, qui a commencé le `1er janvier 2021 00:00:00 UTC`. Utiliser une époque récente rend les horodatages et les messages beaucoup plus petits, ce qui est important pour le réseau.
Les horodatages ne sont pas vérifiés et peuvent être antidatés par les utilisateurs, similaire à un article de blog. Ils ne peuvent pas être datés de plus de 15 minutes dans le futur, car le réseau rejettera de tels messages.

## Ressources

### Spécifications

- [Messages](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#2-message-specifications) - l'unité atomique de changement sur Farcaster
- [CRDTs](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#31-crdts) - règles pour garder les messages synchronisés sur le réseau
- [Registre de Stockage](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#13-storage-registry) - contrat pour acquérir des unités de stockage
