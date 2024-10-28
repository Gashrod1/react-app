# DreamList App 
>DreamList App est une application mobile développée en React Native permettant de suivre et d'organiser ses rêves. Grâce à un formulaire détaillé, chaque rêve peut être enrichi de métadonnées comme la date, les émotions, les tags, et le type de rêve. L'application inclut également une fonctionnalité de filtre pour affiner l'affichage des rêves.


## Fonctionnalités
- Ajout de rêve : Formulaire pour ajouter un rêve avec des détails tels que :

    - Texte du rêve
    - Date du rêve
    - Émotions
    - Tags
    - Type de rêve (lucide ou cauchemar)
- Liste des rêves : Visualisation des rêves enregistrés, affichés avec leurs détails et hashtags.
- Modification et suppression :

    - Modification d'un rêve existant.
    - Suppression avec confirmation.
- Filtres de recherche : Un modal de filtres avancés permet de chercher des rêves par :

    - Mots-clés
    - Date
    - Tags
    - Type de rêve (lucide ou normal)
    - Tonalité émotionnelle globale

## Installation et exécution

1. Cloner le dépôt :

```bash
git clone https://github.com/Gashrod1/react-app.git
cd DreamListApp
```
2. Installation des dépendances :


```bash
npm install
```
3. Lancer l'application :

```bash
npx expo start
```

## Structure des fichiers
```bash
app/
|---(tabs)
|   |-_layout.tsx
|   |-index.tsx
|   |-three.tsx
|   |-two.tsx
|-modal.tsx

components/
|-DreamForm.tsx
|-DreamList.tsx
|-LoginForm.tsx
|-Filter.tsx
```

## Dépendances principales
- React Native
- Expo
- React Native Paper pour l'interface utilisateur
- AsyncStorage pour la sauvegarde locale des données
## Prochaines améliorations
- Sauvegarde sur le cloud : Intégrer une sauvegarde sur un service cloud pour la synchronisation entre appareils.
- Notifications : Rappels quotidiens pour encourager l'ajout de rêves.

## Screens du projet
<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src ='/assets/images/screen_app/form.png'>
    <img src ='/assets/images/screen_app/form2.png'>
    <img src ='/assets/images/screen_app/List.png'>
    <img src ='/assets/images/screen_app/filter.png'>
    <img src ='/assets/images/screen_app/EditForm.png'>
    <img src ='/assets/images/screen_app/EditForm2.png'>
    <img src ='/assets/images/screen_app/Login.png'>
</div>