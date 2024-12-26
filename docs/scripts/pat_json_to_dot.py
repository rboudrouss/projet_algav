import json

# JSON data (remplacez '...' par vos données JSON si elles sont en chaîne)
json_data = """
{
  "label": "",
  "is_end_of_word": false,
  "children": {
    "a": {
      "label": "a",
      "is_end_of_word": true,
      "children": {
        "ppel": {
          "label": "ppel",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "d": {
      "label": "d",
      "is_end_of_word": false,
      "children": {
        "e": {
          "label": "e",
          "is_end_of_word": true,
          "children": {
            "s": {
              "label": "s",
              "is_end_of_word": true,
              "children": {
                "sous": {
                  "label": "sous",
                  "is_end_of_word": true,
                  "children": {}
                }
              }
            }
          }
        },
        "u": {
          "label": "u",
          "is_end_of_word": true,
          "children": {}
        },
        "actylo": {
          "label": "actylo",
          "is_end_of_word": true,
          "children": {
            "graphie": {
              "label": "graphie",
              "is_end_of_word": true,
              "children": {}
            }
          }
        }
      }
    },
    "nous": {
      "label": "nous",
      "is_end_of_word": true,
      "children": {}
    },
    "redevables": {
      "label": "redevables",
      "is_end_of_word": true,
      "children": {}
    },
    "la": {
      "label": "la",
      "is_end_of_word": true,
      "children": {}
    },
    "s": {
      "label": "s",
      "is_end_of_word": false,
      "children": {
        "ommes": {
          "label": "ommes",
          "is_end_of_word": true,
          "children": {}
        },
        "uperbe": {
          "label": "uperbe",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "p": {
      "label": "p",
      "is_end_of_word": false,
      "children": {
        "rofesseur": {
          "label": "rofesseur",
          "is_end_of_word": true,
          "children": {}
        },
        "hrase": {
          "label": "hrase",
          "is_end_of_word": true,
          "children": {}
        },
        "ar": {
          "label": "ar",
          "is_end_of_word": true,
          "children": {}
        },
        "uisque": {
          "label": "uisque",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "un": {
      "label": "un",
      "is_end_of_word": true,
      "children": {}
    },
    "gen": {
      "label": "gen",
      "is_end_of_word": false,
      "children": {
        "ial": {
          "label": "ial",
          "is_end_of_word": true,
          "children": {}
        },
        "re": {
          "label": "re",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "que": {
      "label": "que",
      "is_end_of_word": true,
      "children": {
        "l": {
          "label": "l",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "c": {
      "label": "c",
      "is_end_of_word": false,
      "children": {
        "i": {
          "label": "i",
          "is_end_of_word": true,
          "children": {}
        },
        "o": {
          "label": "o",
          "is_end_of_word": false,
          "children": {
            "nnait": {
              "label": "nnait",
              "is_end_of_word": true,
              "children": {}
            },
            "eur": {
              "label": "eur",
              "is_end_of_word": true,
              "children": {}
            }
          }
        },
        "hacune": {
          "label": "hacune",
          "is_end_of_word": true,
          "children": {}
        },
        "lavier": {
          "label": "lavier",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "fait": {
      "label": "fait",
      "is_end_of_word": true,
      "children": {}
    },
    "tou": {
      "label": "tou",
      "is_end_of_word": false,
      "children": {
        "te": {
          "label": "te",
          "is_end_of_word": true,
          "children": {}
        },
        "ches": {
          "label": "ches",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "m": {
      "label": "m",
      "is_end_of_word": false,
      "children": {
        "odele": {
          "label": "odele",
          "is_end_of_word": true,
          "children": {}
        },
        "achine": {
          "label": "achine",
          "is_end_of_word": true,
          "children": {}
        }
      }
    },
    "e": {
      "label": "e",
      "is_end_of_word": false,
      "children": {
        "lle": {
          "label": "lle",
          "is_end_of_word": true,
          "children": {}
        },
        "crire": {
          "label": "crire",
          "is_end_of_word": true,
          "children": {}
        }
      }
    }
  }
}

"""
data = json.loads(json_data)  # Charger les données JSON en objet Python

# Fonction pour convertir en DOT
def json_to_dot(node, parent_label="", edges=[], counter={ "": 1 }, root_label="Root"):
    current_label = node["label"]
    if node['label'] not in counter:
        counter[node['label']] = 1
    else:
        counter[node['label']] += 1

    if current_label== "" and parent_label=="":
        edges.append(f'"{root_label}" [label="{root_label}", shape=circle, style=filled, color=lightblue];')
        for child_key, child in node["children"].items():
            json_to_dot(child, f'{current_label}', edges, counter, root_label)
    else:
        if current_label != "" and parent_label == "":
            edges.append(f'"{root_label}" -> "{current_label}_{counter[node['label']]}" [label="{node["label"]}"];')
            edges.append(f'"{current_label}_{counter[node['label']]}" [label="{current_label}", shape=circle, style=filled, color=lightblue];')
        if parent_label !="":
            edges.append(f'"{parent_label}" -> "{current_label}_{counter[node['label']]}" [label="{node["label"]}"];')
            edges.append(f'"{current_label}_{counter[node['label']]}" [label="{current_label}", shape=circle, style=filled, color=lightblue];')

        for child_key, child in node["children"].items():
            json_to_dot(child, f'{current_label}_{counter[node['label']]}', edges, counter, root_label)

    return edges

# Générer les relations
# Initialisation avec la racine
#edges = []
#root_label = "Root"
#edges.append(f'{root_label} [label="", shape=circle, style=filled, color=lightblue];')
# Utiliser un dictionnaire pour compter les occurrences des labels
counter = { "": 1 }  # Compter la racine (label vide) comme un cas spécial
edges = json_to_dot(data, counter=counter, root_label="")

# Créer le contenu du fichier DOT
dot_content = "digraph PatriciaTrie {\n"
dot_content += "\n".join(edges)
dot_content += "\n}"

# Sauvegarder dans un fichier DOT
with open("patricia_trie.dot", "w") as file:
    file.write(dot_content)

print("Fichier DOT généré : patricia_trie.dot")