// function to convert Map to Object, used in JSON.stringify for PatriciaTrie
// deno-lint-ignore no-explicit-any
export function replacer(key: string, value: any): any {
  if (value instanceof Map) return Object.fromEntries(value);
  if (key === "parent") return undefined;
  return value;
}

export function readFile(file: string): string {
  let content;
  try {
    content = Deno.readTextFileSync(file);
  } catch (err) {
    console.error("Erreur lors de la lecture du fichier" + file);
    console.error(err);
    Deno.exit();
  }
  if (!content) {
    console.error(`Le fichier ${file} est vide`);
    Deno.exit();
  }
  return content;
}

export function readAndProcessFile(file: string) {
  return readFile(file)
    .replace(/[.,?';:!/()]/g, "") // Retirer les ponctuations (non nécessaire, ligne facultative)
    .toLowerCase() // Convertir en minuscules (non nécessaire, ligne facultative)
    .split(/\s+/) // Diviser en mots par espaces
    .filter((mot) => mot.length > 0); // Retirer les mots vides
}

// HACK parce que les jsons données dans le pdf sont invalides
// yes (et je suppose non) ne sont pas des valeurs valides en JSON !!
// mais sont supportés ici
// 0 : Patricia-Trie
// 1 : Hybrid-Trie
export function readJsonFile(file: string): unknown {
  let out;
  try {
    const text = readFile(file)
      // .replace(/:\s*[\r\n]*\s*yes/g, ": true")
      // .replace(/:\s*[\r\n]*\s*no/g, ": false");
    out = JSON.parse(text);
  } catch (err) {
    console.error("Erreur lors de la lecture du json" + file);
    console.error(err);
    Deno.exit();
  }
  return out;
}

export function shuffleArray<T>(array: T[]) {
  for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function randomString(n: number): string {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < n; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}


// Fonction utilitaire pour trouver la longueur du préfixe commun
export function findCommonPrefixLength(label1: string, label2: string): number {
  let i = 0;
  while (i < label1.length && i < label2.length && label1[i] === label2[i]) i++;
  return i;
}