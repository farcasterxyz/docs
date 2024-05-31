# Noms ENS

Farcaster utilise des noms ENS comme identifiants lisibles par les humains pour les comptes. Deux types de noms ENS sont pris en charge :

- **Noms ENS offchain** : gratuits et contrôlés par Farcaster. (par exemple, @alice)
- **Noms ENS onchain** : payants et contrôlés par votre portefeuille. (par exemple, @alice.eth)

Les noms ENS ne peuvent être utilisés sur Farcaster que s'ils contiennent 16 caractères ou moins et uniquement des lettres minuscules, des chiffres et des tirets.

![Noms d'utilisateur](/assets/usernames.png)

## Noms ENS onchain

Les utilisateurs peuvent utiliser des noms ENS onchain comme `@alice.eth` sur Farcaster.

Les noms ENS onchain sont émis par ENS, se terminent par .eth et doivent être enregistrés sur la blockchain Ethereum L1. N'importe qui peut enregistrer un nom ENS en utilisant l'[application ENS](https://app.ens.domains/).

Les utilisateurs doivent payer des frais pour enregistrer un nom ENS onchain, mais une fois enregistré, il est contrôlé par l'utilisateur et ne peut pas être révoqué.

## Noms ENS offchain (Fnames)

Les utilisateurs peuvent utiliser des noms ENS offchain comme `@alice` sur Farcaster.

Les noms ENS offchain, également appelés Noms Farcaster ou fnames, sont conformes à ENS mais enregistrés offchain. Les fnames sont gratuits mais soumis à une politique d'utilisation pour éviter le squattage et l'usurpation d'identité. Ils sont également soumis aux exigences suivantes :

1. Un compte ne peut avoir qu'un seul fname à la fois.
2. Un compte peut changer son fname une fois tous les 28 jours.

### Politique d'utilisation

L'enregistrement d'un fname est gratuit mais soumis à la politique suivante :

1. Les noms liés à des personnalités publiques ou des entités peuvent être récupérés (par exemple, @google).
2. Les noms qui n'ont pas été utilisés pendant plus de 60 jours peuvent être récupérés.
3. Les noms enregistrés dans le seul but de revente peuvent être récupérés.

Les décisions sont prises par l'équipe Farcaster et nécessitent souvent un jugement humain. Les utilisateurs qui souhaitent un nom entièrement sous leur contrôle doivent utiliser un nom ENS onchain.

### Registre

Les fnames sont émis comme des noms offchain sous le sous-domaine `fcast.id`.

Bob peut enregistrer le nom ENS offchain `bob.fcast.id` et l'utiliser sur n'importe quelle application Farcaster avec le raccourci `@bob`. Le nom peut être enregistré en faisant une demande signée au serveur de registre Fname. Voir la référence API FName pour plus de détails sur la façon de consulter et de créer des fnames.

Pour en savoir plus sur le fonctionnement des fnames, voir [ENSIP-16](https://docs.ens.domains/ens-improvement-proposals/ensip-16-offchain-metadata)
et [ERC-3668](https://eips.ethereum.org/EIPS/eip-3668).