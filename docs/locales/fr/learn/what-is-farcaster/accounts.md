# Comptes
Un compte Farcaster vous permet de configurer un nom d'utilisateur, une photo de profil et de publier de courts messages texte appelés des casts. Toute adresse Ethereum peut enregistrer un compte Farcaster en effectuant une transaction sur la blockchain.
## Créer un compte
Un compte Farcaster est créé en appelant le contrat IdGateway. Il attribuera un nouvel identifiant Farcaster ou fid à votre adresse Ethereum.
Vous devrez obtenir un nom d'utilisateur, louer un espace de stockage et ajouter une clé avant de pouvoir utiliser votre compte. Ces étapes nécessitent de nombreuses signatures et transactions sur la blockchain et peuvent être fastidieuses avec un portefeuille Ethereum classique.
Nous recommandons de commencer avec [Warpcast](https://www.warpcast.com/), un portefeuille Farcaster spécial qui gérera l'ensemble du processus pour vous. Il utilise également un compte Ethereum séparé pour signer les transactions, afin que vous puissiez garder votre compte Ethereum principal sécurisé.
## Ajouter des clés de compte
Les comptes peuvent émettre des clés permettant aux applications d'écrire des messages en leur nom. Les utilisateurs émettent généralement une clé pour chaque application Farcaster qu'ils utilisent.
Les clés sont gérées par le contrat KeyRegistry. Pour ajouter une clé, vous devrez soumettre la clé publique d'une paire de clés EdDSA ainsi qu'une signature du demandeur. Le demandeur peut être le compte lui-même ou une application qui souhaite opérer en son nom.
## Récupérer un compte
Les utilisateurs configurent souvent des portefeuilles séparés pour leurs applications sociales et il est facile de perdre l'accès. Farcaster permet à tout compte de spécifier une adresse de récupération qui peut être utilisée pour récupérer le compte. Elle peut être configurée lors de la création du compte ou à tout moment par la suite.
Les utilisateurs peuvent définir l'adresse de récupération sur des services de confiance comme Warpcast ou ils peuvent la gérer eux-mêmes en utilisant un portefeuille Ethereum classique.
## Ressources
### Spécifications
- [Spécifications des contrats](https://github.com/farcasterxyz/protocol/blob/main/docs/SPECIFICATION.md#1-smart-contracts) - Les contrats sur la blockchain qui gèrent les comptes Farcaster, les clés de compte et les adresses de récupération.