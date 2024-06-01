# Noms d'utilisateur

Un compte Farcaster a besoin d'un nom d'utilisateur pour être trouvé et mentionné par d'autres utilisateurs. Farcaster utilise le [Ethereum Name Service](https://ens.domains/) pour gérer les noms d'utilisateur.
Les noms d'utilisateur ENS sont détenus par des adresses Ethereum, tout comme les comptes Farcaster. La différence est qu'une adresse peut posséder plusieurs noms ENS, donc le compte Farcaster doit spécifier le nom qu'il souhaite utiliser. Les noms doivent comporter moins de 17 caractères avec uniquement des lettres minuscules, des chiffres ou des tirets pour éviter les attaques par homoglyphes.

## Changer de nom d'utilisateur

Un compte Farcaster peut changer de nom d'utilisateur à tout moment. Changer de nom n'affecte pas votre historique ou vos abonnés.
Il est sûr de changer de nom quelques fois par an. Mais changer de nom plus souvent peut amener les utilisateurs ou les applications à perdre confiance en votre compte. Si vous souhaitez changer un indicateur public, envisagez de changer plutôt votre nom d'affichage.

## Noms hors chaîne vs sur chaîne

Un compte peut choisir entre deux types de noms d'utilisateur :

- **Noms ENS hors chaîne** : gratuits et contrôlés par Farcaster. (par exemple, @alice)
- **Noms ENS sur chaîne** : coûtent de l'argent et sont contrôlés par votre portefeuille. (par exemple, @alice.eth)
  Choisissez un nom ENS hors chaîne si vous voulez commencer rapidement et que vous n'avez pas de nom ENS sur chaîne. Un compte peut toujours passer à un nom sur chaîne plus tard. Il est recommandé d'utiliser une application comme Warpcast pour configurer cela pour vous.
  ![Noms d'utilisateur](/assets/usernames.png)

### Noms ENS hors chaîne

- Les noms ENS hors chaîne, également appelés fnames, sont gratuits et délivrés par Farcaster.
- Tout compte Ethereum peut obtenir un fname unique en appelant le [Registre Fname](./learn/architecture/ens-names).
- Les fnames sont gratuits mais peuvent être révoqués par Farcaster à tout moment.

### Noms ENS sur chaîne

- Les noms ENS sur chaîne, également appelés noms .eth, sont sur chaîne et délivrés par ENS.
- Tout compte Ethereum peut obtenir un ENS en appelant le [Registre ENS](https://docs.ens.domains/dapp-developer-guide/the-ens-registry).
- Les noms ne sont pas gratuits mais ne peuvent pas être révoqués par Farcaster.

## Ressources

### Spécifications

- [Nom Farcaster](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#5-fname-specifications) - Un nom ENS hors chaîne ENSIP-10 utilisable au sein de Farcaster.
- [UserData: Nom d'utilisateur](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#23-user-data) - Définit une preuve de nom d'utilisateur valide comme nom d'utilisateur actuel.
- [Preuve de nom d'utilisateur](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#17-username-proof) - Prouve la propriété d'un nom d'utilisateur sur chaîne ou hors chaîne.
- [Vérifications](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#25-verifications) - Prouve la propriété d'une adresse, nécessaire pour les preuves de nom d'utilisateur sur chaîne.
