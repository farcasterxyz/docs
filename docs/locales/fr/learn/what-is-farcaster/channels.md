# Canaux

Un canal est un espace public pour votre communauté pour permettre des conversations autour d'un sujet.
Créer un canal lance un nouveau flux pour votre communauté. Les gens peuvent rejoindre, diffuser et trouver d'autres personnes intéressantes. Cela déclenche des conversations qui n'auraient pas eu lieu autrement sur le flux d'accueil.
:::warning Fonctionnalité expérimentale
Les canaux sont en cours de prototypage dans Warpcast et ne sont pas entièrement pris en charge par le protocole Farcaster. Ils peuvent être portés sur le protocole à l'avenir si la fonctionnalité est jugée réussie ou ils peuvent être supprimés entièrement.
:::

## Hébergement de canaux

N'importe qui peut créer un hôte de canal en payant des frais dans Warpcast et en choisissant un nom de canal. Le nom doit comporter moins de 16 caractères et ne peut contenir que des lettres minuscules et des chiffres. Le créateur d'un canal est appelé un hôte et peut inviter d'autres co-hôtes à gérer le canal. Les hôtes ont des privilèges spéciaux comme :

1. Définir les "normes du canal" que tout le monde doit accepter en rejoignant.
2. Épingler ou masquer des casts dans un canal.
3. Bloquer d'autres utilisateurs de diffuser dans leur canal.
4. Définir une image de canal, une description et d'autres métadonnées.
   Les métadonnées des canaux ne font pas partie du protocole et sont stockées dans Warpcast tant que les canaux sont en phase expérimentale.

## Diffuser dans les canaux

N'importe qui peut publier dans un canal en utilisant Warpcast et en sélectionnant le canal lors de la création du cast. Warpcast définit automatiquement le `parentUrl` du cast à `https://warpcast.com/~/channel/<name>`. Un cast est considéré "dans un canal" si son `parentUrl` est l'URI du canal ou un autre cast qui est "dans un canal".
Les casts de canal font partie du protocole et sont stockés sur les hubs. En utilisant un réplicateur, vous pouvez récupérer tous les casts dans un canal en filtrant le champ `parentUrl` pour l'URL FIP-2 du canal.

## Suivre des canaux

N'importe qui peut suivre un canal tout comme un utilisateur. Un utilisateur verra les casts d'un canal suivi dans son flux d'accueil lorsqu'il utilise Warpcast.
Les suivis de canaux ne font pas partie du protocole et sont stockés dans Warpcast tant que les canaux sont en phase expérimentale.

## Visibilité des casts

Si un utilisateur diffuse dans un canal, Warpcast :

1. Enverra toujours les casts aux flux d'accueil de tout utilisateur qui suit le canal.
2. Enverra généralement les casts aux flux d'accueil de tout utilisateur qui suit l'auteur.
   La décision pour (2) est prise en fonction des préférences de l'utilisateur, du contenu du canal et d'autres données du graphe social. Cet algorithme est encore en cours de réglage et sera documenté une fois qu'il sera stable.

## Politique d'utilisation

Warpcast peut supprimer votre canal et NE remboursera PAS vos warps si :

1. Votre profil ou canal usurpe l'identité de quelqu'un.
2. Vous squattez un canal sans l'utiliser.
3. Vous violez les termes et conditions de Warpcast ou les règles de l'app store.

## FAQ

**Pourquoi les hôtes de canal sont-ils autorisés à masquer et bannir ? N'est-ce pas de la censure ?**
Les canaux ne sont pas des espaces publics ouverts à tous, ils sont détenus et modérés par leurs créateurs. Vous êtes toujours libre de créer votre propre canal à tout moment avec ses propres règles.
**Pourquoi y a-t-il des frais pour créer des canaux ?**
Les frais découragent les gens de squatter des noms courts et de ne pas utiliser les canaux.
**Quel est l'avantage de créer un canal ?**
Créer un canal aide également à développer votre audience :

1. Warpcast enverra une notification à vos abonnés à propos de votre canal.
2. Votre canal sera promu auprès des utilisateurs qui suivent des canaux similaires.
3. Les utilisateurs qui suivent votre canal verront les casts du canal dans leur flux d'accueil.
