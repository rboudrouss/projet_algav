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
      .replace(/:\s*[\r\n]*\s*yes/g, ": true")
      .replace(/:\s*[\r\n]*\s*no/g, ": false");
    out = JSON.parse(text);
  } catch (err) {
    console.error("Erreur lors de la lecture du json" + file);
    console.error(err);
    Deno.exit();
  }
  return out;
}
