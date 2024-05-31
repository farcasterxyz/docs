# Noms d'utilisateur

Un compte Farcaster a besoin d'un nom d'utilisateur pour être trouvé et mentionné par d'autres utilisateurs. Farcaster utilise le [Ethereum Name Service](https://ens.domains/) pour gérer les noms d'utilisateur.

Les noms d'utilisateur ENS sont détenus par des adresses Ethereum, tout comme les comptes Farcaster. La différence est qu'une adresse peut posséder plusieurs noms ENS, donc le compte Farcaster doit spécifier le nom qu'il souhaite utiliser. Les noms doivent comporter moins de 17 caractères et ne contenir que des lettres minuscules, des chiffres ou des tirets pour éviter les attaques par homoglyphes.

## Changer de nom d'utilisateur

Un compte Farcaster peut changer de nom d'utilisateur à tout moment. Changer de nom d'utilisateur n'affecte pas votre historique ou vos abonnés.

Il est sûr de changer de nom d'utilisateur quelques fois par an. Mais changer de nom d'utilisateur plus souvent peut amener les utilisateurs ou les applications à perdre confiance en votre compte. Si vous souhaitez changer un indicateur public, envisagez de changer plutôt votre nom d'affichage.

## Noms offchain vs onchain

Un compte peut choisir entre deux types de noms d'utilisateur :

- **Noms ENS offchain** : gratuits et contrôlés par Farcaster. (par exemple, @alice)
- **Noms ENS onchain** : payants et contrôlés par votre portefeuille. (par exemple, @alice.eth)

Choisissez un nom ENS offchain si vous voulez commencer rapidement et que vous n'avez pas de nom ENS onchain. Un compte peut toujours passer à un nom onchain plus tard. Il est recommandé d'utiliser une application comme Warpcast pour configurer cela pour vous.

![Noms d'utilisateur](/assets/usernames.png)

### Noms ENS offchain

- Les noms ENS offchain, également appelés fnames, sont gratuits et émis par Farcaster.
- Tout compte Ethereum peut obtenir un fname unique en appelant le [Registre Fname](/learn/architecture/ens-names).
- Les fnames sont gratuits mais peuvent être révoqués par Farcaster à tout moment.

### Noms ENS onchain

- Les noms ENS onchain, également appelés noms .eth, sont onchain et émis par ENS.
- Tout compte Ethereum peut obtenir un ENS en appelant le [Registre ENS](https://docs.ens.domains/dapp-developer-guide/the-ens-registry).
- Les noms ne sont pas gratuits mais ils ne peuvent pas être révoqués par Farcaster.

## Ressources

### Spécifications

- [Nom Farcaster](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#5-fname-specifications) - Un nom ENS offchain ENSIP-10 utilisable dans Farcaster.
- [UserData: Nom d'utilisateur](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#23-user-data) - Définit une preuve de nom d'utilisateur valide comme nom d'utilisateur actuel.
- [Preuve de nom d'utilisateur](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#17-username-proof) - Prouve la propriété d'un nom d'utilisateur onchain ou offchain.
- [Vérifications](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#25-verifications) - Prouve la propriété d'une adresse, nécessaire pour les preuves de nom d'utilisateur onchain.