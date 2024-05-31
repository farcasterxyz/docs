# Contrats
Un compte Farcaster est géré et sécurisé onchain en utilisant les contrats Farcaster. Cette section fournit un aperçu général et évite certains détails de mise en œuvre. Pour une vue complète, voir le [dépôt de contrats](https://github.com/farcasterxyz/contracts/).
<br>
Il y a trois contrats principaux déployés sur OP Mainnet :
- **Registre d'Identité** - crée de nouveaux comptes
- **Registre de Stockage** - loue du stockage aux comptes
- **Registre de Clés** - ajoute et supprime des clés d'application des comptes
<br>
![Contrats de Registre](/assets/registry-contracts.png)
Les contrats sont déployés aux adresses suivantes :
| Contrat        | Adresse                                                                                                                          |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| IdRegistry      | [0x00000000fc6c5f01fc30151999387bb99a9f489b](https://optimistic.etherscan.io/address/0x00000000fc6c5f01fc30151999387bb99a9f489b) |
| StorageRegistry | [0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d](https://optimistic.etherscan.io/address/0x00000000fcce7f938e7ae6d3c335bd6a1a7c593d) |
| KeyRegistry     | [0x00000000fc1237824fb747abde0ff18990e59b7e](https://optimistic.etherscan.io/address/0x00000000fc1237824fb747abde0ff18990e59b7e) |
### Registre d'Identité
Le Registre d'Identité permet aux utilisateurs d'enregistrer, de transférer et de récupérer des comptes Farcaster. Un compte est identifié par un numéro unique (le fid) qui est attribué à une adresse Ethereum lors de l'enregistrement. Une adresse Ethereum ne peut posséder qu'un seul compte à la fois, bien qu'elle puisse le transférer librement à d'autres comptes. Elle peut également spécifier une adresse de récupération qui peut transférer le compte à tout moment.
### Registre de Stockage
Le Registre de Stockage permet aux comptes de louer du [stockage](../what-is-farcaster/messages.md#storage) en effectuant un paiement en Ethereum. Les prix de stockage sont fixés par les administrateurs en USD et convertis en ETH en utilisant un oracle Chainlink. Le prix augmente ou diminue en fonction de l'offre et de la demande.
### Registre de Clés
Le Registre de Clés permet aux comptes d'émettre des clés aux applications, afin qu'elles puissent publier des messages en leur nom. Les clés peuvent être ajoutées ou supprimées à tout moment. Pour ajouter une clé, un compte doit soumettre la clé publique d'une paire de clés EdDSA ainsi qu'une signature du demandeur. Le demandeur peut être le compte lui-même ou une application qui souhaite opérer en son nom.