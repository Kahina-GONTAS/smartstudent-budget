import { useEffect, useState } from "react";
// useState: stocke les données qi changent 
// useEffect pour executer de code au moment de changement 
// je declare un type recette
type Recette = {
  id: string;
  nom: string;
  image: string;
  instructions: string; // ses instruction en chaine de caractere 
};


//=============================APP======================

export default function App() {


// Etats:

  //declaration des etats , pour chaque changement on utilise la fonction set.. 
  //1- Boîte qui contient le texte tapé dans la barre de recherche
  const [motRecherche, setMotRecherche] = useState("poulet"); // par defaut dans la barre de recherche poulet


  //2- // Boîte qui contient la liste des recettes trouvées (vide au début)
  const [listeRecettes, setListeRecettes] = useState<Recette[]>([]);

  //3- // Boîte qui contient la recette sur laquelle on a cliqué (null au debut)
  const [recetteChoisie, setRecetteChoisie] = useState<Recette | null>(null);

  //3- // Boîte qui dit si on est en train de charger (non au début)
  const [chargement, setChargement] = useState(false);




  // Fonction pour chercher, jai utilisé async car elle doit devoir attendre comme un appel internet, elle attend n str 
  const chercherRecettes = async (recherche: string) => {
    setChargement(true);
    

    // await: attends que se soit fini, avec fetch elle va chercher des datas sur internet 
    // ce lien a une base de donné de toutes le recette il va chercher avec la valeur de  "recherche" donner 
    const reponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${recherche}&lang=fr`
    );
    const donnees = await reponse.json(); // transformation de la reponse en format comprehensible (JSON)
    
    // Transformer les données
    //  Prends les recettes, s'il n'y en a pas, mets un tableau vide, les données seront transformés en français 
    const recettesFormatees = (donnees.meals || []).map((plat: any) => ({
      id: plat.idMeal,
      nom: plat.strMeal,
      image: plat.strMealThumb,
      instructions: plat.strInstructions
    }));
    
    setListeRecettes(recettesFormatees); // mettres les recettes transformer dans ma boite listRecette
    setChargement(false); // le chargement est fini, enlever lindicateur 
  };

  //Effet de demarrage 
  useEffect(() => {
    chercherRecettes(motRecherche);// lance la recherche avec motRecherche qui est poulet au debut
  }, []);// tab vide==execute bune seule fois au depart  


//~~~~~~~~~~~~~ Affichage avec les props tailwinds~~~~~~~~~~~~~~

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🍳 Application de Recettes
      </h1>

      {/* Barre de recherche */}
      <div className="flex justify-center gap-2 mb-6">
        <input
          className="p-2 rounded border flex-1 max-w-md"
          placeholder="Chercher une recette..."

          value={motRecherche} // le texte affiché est celi dans la boite 
          onChange={(e) => setMotRecherche(e.target.value)} // quand l'utilisateur tape on met à jour la boite 
          // aussi le cas ou il tape sur entrer de clavier 
          onKeyPress={(e) => {
            if (e.key === "Enter") chercherRecettes(motRecherche);
          }}
        />


        { /* BOUTON DE CHARGEMENT  */}
        <button
          className="bg-blue-600 text-white px-6 rounded hover:bg-blue-700"
          onClick={() => chercherRecettes(motRecherche)}
          disabled={chargement}
        >
          {chargement ? "..." : "Chercher"}
        </button>
      </div>

      {/* Chargement */}
      {chargement && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Pas de résultat: "SI on n'est PAS en chargement ET qu'il n'y a aucune recette, ALORS affiche le message */}
      {!chargement && listeRecettes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          😢 Aucune recette trouvée
        </div>
      )}

      {/* Grille des recettes, on met la disposition en grille 
      *pour chaque recette dans la liste je cree une carte 
      
      */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listeRecettes.map((recette) => (
          <div
            key={recette.id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl"
            onClick={() => setRecetteChoisie(recette)} // Quand on clique, on met cette recette dans "recetteChoisie"
          >
            <img
              src={recette.image}
              alt={recette.nom}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold text-center">{recette.nom}</h2>
            </div>
          </div>
        ))}
      </div>

      {/*SI une recette est choisie, ALORS j'affiche une fenêtre popup avec ses détails */}
      {recetteChoisie && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
          onClick={() => setRecetteChoisie(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={recetteChoisie.image}
              alt={recetteChoisie.nom}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h2 className="font-bold text-2xl mb-4">{recetteChoisie.nom}</h2>
              <h3 className="font-semibold mb-2">📖 Instructions :</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {recetteChoisie.instructions}
              </p>
              <button
                className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg"
                onClick={() => setRecetteChoisie(null)}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//les classes tailwinds que utilisé:
/*
*****CLASSES DE DISPOSITION

min-h-scree= Hauteur minimum = tout l'écran
p-6	=Remplissage intérieur de 24px sur tous les côtés
flex=	Active le mode Flexbox
justify-center=	Centre les éléments horizontalement
gap-2	=Espace de 8px entre les éléments
gap-6=	Espace de 24px entre les éléments
mb-6=	Marge en bas de 24px
flex-1=	L'élément prend tout l'espace restant
max-w-md=	Largeur maximale de 448px
grid= Active le mode Grid
fixed	=Position fixe par rapport à la fenêtre
inset-0=	Couvre tout l'écran (top/right/bottom/left = 0)
z-50=	Ordre d'empilement très haut (par-dessus tout)



******CLASSES DE COULEURS

bg-gray-100=	Fond gris très clair
bg-white=Fond blanc
bg-blue-600	=Fond bleu vif
bg-gray-800	=Fond gris foncé
bg-black/60	=Fond noir avec 60% de transparence
border=	Bordure grise de 1px
text-white=	Texte blanc
text-gray-500=	Texte gris moyen
text-gray-700=	Texte gris foncé




*****CLASSES DE TEXTE

text-3xl=	Texte très grand (30px)
text-2xl=	Texte grand (24px)
text-center=	Texte centré
font-bold	=Texte en gras
font-semibold=	Texte semi-gras



*****CLASSES DE BORDURE & OMBRE

rounded=	Bordures arrondies (4px)
rounded-lg= Bordures très arrondies (8px)
rounded-t-lg=	Bordures arrondies seulement en haut
shadow-md	=Ombre moyenne
shadow-xl=	Grande ombre
overflow-hidden=	Cache ce qui dépasse
overflow-y-auto	=Barre de défilement verticale


******CLASSES DE TAILLE

w-full=Largeur 100%
h-48	=Hauteur 192px
h-64	Hauteur 256px
h-8	=Hauteur 32px
w-8=	Largeur 32px



******CLASSES DE POSITIONNEMENT

text-center	=Centre le texte horizontalement
justify-center=	Centre les éléments Flexbox
items-center=	Centre les éléments verticalement (Flexbox)
object-cover=	L'image couvre tout l'espace sans se déformer



******CLASSES D'ANIMATION & INTERACTION

cursor-pointer	=Change le curseur en main (clic)
hover:bg-blue-700	Au survol, fond bleu plus foncé
hover:shadow-xl	Au survol, ombre plus grande
animate-spin	Animation de rotation (pour le chargement)
transition	Animation douce pour les changements
CLASSES RESPONSIVES (adaptatives)
Classe	Description
md:grid-cols-3	Sur tablette et plus : 3 colonnes
lg:grid-cols-4	Sur grand écran : 4 colonnes



***** CLASSES DE MODAL (fenêtre popup)


fixed	Position= fixe par rapport à l'écran
inset-0	==Occupe tout l'écran
bg-black/60	==Fond noir semi-transparent
z-50==	Au-dessus de tout
max-w-2xl==	Largeur maximale de 672px
max-h-[90vh]	==Hauteur maximale de 90% de l'écran
whitespace-pre-line	==Garde les retours à la ligne



******CLASSES DIVERSES

inline-block=	Élément en ligne mais avec des propriétés de bloc
border-b-2	=Bordure inférieure de 2px
border-blue-600	=Bordure bleue


*/