import PatriciaTrie from "./Patricia/PatriciaTrie.ts";

const args = Deno.args;

let actions = {
  inserer: {
    0: (fichier: string) => {
      let trie = new PatriciaTrie();
      let content = Deno.readTextFile(fichier)
        .then((content) => content.split("\n"))
        .catch((err) => {
          console.error("Erreur lors de la lecture du fichier");
          Deno.exit();
        });

      if (!content) {
        console.log("Le fichier est vide");
        Deno.exit();
      }
    },
  },
};

if (args.length < 3 || !(args[0] in actions) || !(args[1] in [0, 1])) {
  showHelp();
}

function showHelp() {
let helpTxt = `Usage: commande [options] [Type] [arguments]
Type:
  0 : Patricia-Trie
  1 : Hybrid-Trie

Options:
  - inserer <T> <fichier> : insère les mots du fichier dans l'arbre. Fichier doit être un fichier texte. Crée un fichier JSON contenant l'arbre nommé pat.json ou trie.json selon le type.
  - suppression <T> <fichier> : lit le JSON nommé pat.json ou trie.json selon le type, supprime les mots du fichier et écrit le résultat dans le même fichier.
  - fusion <T> arbre1.json arbre2.json : fusionne les arbres arbre1.json et arbre2.json et écrit le résultat dans un fichier JSON nommé pat.json ou trie.json selon le type.
  - listeMots <T> arbre.json : lit le JSON nommé arbre.json et écris la liste des mots dans le fichier mot.txt.
  - profondeurMoyenne <T> arbre.json : lit le JSON nommé arbre.json et écris la profondeur moyenne dans le fichier profondeur.txt.
  - prefixe <T> arbre.json <prefixe> : lit le JSON nommé arbre.json et écris l'entier correspondant au nombre de mots de l'arbre tels que le mot <prefixe> en est un préfixe. Le résultat sera écrit dans le fichier prefixe.txt`;
  console.log(helpTxt);
  Deno.exit();
}