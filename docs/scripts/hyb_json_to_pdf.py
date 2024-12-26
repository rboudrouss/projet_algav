import json
from graphviz import Digraph

# Function to recursively add nodes and edges to the Graphviz graph
def add_trie_to_graph(graph, node_data, parent_name=None, counter={ "": 1 }, child_type=None, edge_name=None):
    if node_data is None:
        return

    if node_data['char'] not in counter:
        counter[node_data['char']] = 1
    else:
        counter[node_data['char']] += 1

    # Create a unique node name for the current character
    node_name = f"{node_data['char']}_{counter[node_data['char']]}"

    # Label the node with the character and mark as end of word if needed
    label = node_data['char']

    if node_data.get('is_end_of_word', True):
        # Add the node to the graph
        graph.node(node_name, label=label, shape='circle', style='filled', fillcolor='red', penwidth='0')
    else:
        # Add the node to the graph
        graph.node(node_name, label=label, shape='circle', style='filled', fillcolor='lightblue', penwidth='0')

    # If there is a parent node, create an edge between parent and current node
    if parent_name is not None:
        # Add edge with label based on the child type
        edge_label = ''
        if child_type == 'left':
            edge_label = f'<{edge_name}'
        elif child_type == 'middle':
            edge_label = f'={edge_name}'
        elif child_type == 'right':
            edge_label = f'>{edge_name}'

        # Add the edge with a label
        graph.edge(parent_name, node_name, label=edge_label)

    # Recursively add left, middle, and right children
    add_trie_to_graph(graph, node_data.get('left'), node_name, child_type='left', edge_name=node_data['char'])
    add_trie_to_graph(graph, node_data.get('middle'), node_name, child_type='middle',edge_name=node_data['char'])
    add_trie_to_graph(graph, node_data.get('right'), node_name, child_type='right',edge_name=node_data['char'])

# Function to visualize the Trie directly from JSON data
def visualize_trie_from_json(json_data):
    # Initialize a directed graph
    graph = Digraph(comment='Hybrid Trie')

    # Start with the root node (the first node in the JSON)
    add_trie_to_graph(graph, json_data)

    # Render and view the graph
    graph.render('trie_graph', view=True)  # This will create and view 'trie_graph.pdf'

# Load the JSON data (you can replace this with your own JSON file)
json_data = '''
{
  "char": "a",
  "is_end_of_word": true,
  "left": null,
  "middle": {
    "char": "p",
    "is_end_of_word": false,
    "left": null,
    "middle": {
      "char": "p",
      "is_end_of_word": false,
      "left": null,
      "middle": {
        "char": "e",
        "is_end_of_word": false,
        "left": null,
        "middle": {
          "char": "l",
          "is_end_of_word": true,
          "left": null,
          "middle": null,
          "right": null,
          "depth": 4
        },
        "right": null,
        "depth": 3
      },
      "right": null,
      "depth": 2
    },
    "right": null,
    "depth": 1
  },
  "right": {
    "char": "q",
    "is_end_of_word": false,
    "left": {
      "char": "g",
      "is_end_of_word": false,
      "left": {
        "char": "d",
        "is_end_of_word": false,
        "left": {
          "char": "c",
          "is_end_of_word": false,
          "left": null,
          "middle": {
            "char": "i",
            "is_end_of_word": true,
            "left": {
              "char": "h",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "a",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "c",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "u",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "n",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "e",
                        "is_end_of_word": true,
                        "left": null,
                        "middle": null,
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "middle": null,
            "right": {
              "char": "o",
              "is_end_of_word": false,
              "left": {
                "char": "l",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "a",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "v",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "i",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "e",
                        "is_end_of_word": false,
                        "left": null,
                        "middle": {
                          "char": "r",
                          "is_end_of_word": true,
                          "left": null,
                          "middle": null,
                          "right": null,
                          "depth": 12
                        },
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "middle": {
                "char": "n",
                "is_end_of_word": false,
                "left": {
                  "char": "e",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "u",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "r",
                      "is_end_of_word": true,
                      "left": null,
                      "middle": null,
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "middle": {
                  "char": "n",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "a",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "i",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "t",
                        "is_end_of_word": true,
                        "left": null,
                        "middle": null,
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "depth": 5
          },
          "right": null,
          "depth": 4
        },
        "middle": {
          "char": "e",
          "is_end_of_word": true,
          "left": {
            "char": "a",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "c",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "t",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "y",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "l",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "o",
                      "is_end_of_word": true,
                      "left": null,
                      "middle": {
                        "char": "g",
                        "is_end_of_word": false,
                        "left": null,
                        "middle": {
                          "char": "r",
                          "is_end_of_word": false,
                          "left": null,
                          "middle": {
                            "char": "a",
                            "is_end_of_word": false,
                            "left": null,
                            "middle": {
                              "char": "p",
                              "is_end_of_word": false,
                              "left": null,
                              "middle": {
                                "char": "h",
                                "is_end_of_word": false,
                                "left": null,
                                "middle": {
                                  "char": "i",
                                  "is_end_of_word": false,
                                  "left": null,
                                  "middle": {
                                    "char": "e",
                                    "is_end_of_word": true,
                                    "left": null,
                                    "middle": null,
                                    "right": null,
                                    "depth": 17
                                  },
                                  "right": null,
                                  "depth": 16
                                },
                                "right": null,
                                "depth": 15
                              },
                              "right": null,
                              "depth": 14
                            },
                            "right": null,
                            "depth": 13
                          },
                          "right": null,
                          "depth": 12
                        },
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "middle": {
            "char": "s",
            "is_end_of_word": true,
            "left": null,
            "middle": {
              "char": "s",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "o",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "u",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "s",
                    "is_end_of_word": true,
                    "left": null,
                    "middle": null,
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": {
            "char": "u",
            "is_end_of_word": true,
            "left": null,
            "middle": null,
            "right": null,
            "depth": 5
          },
          "depth": 4
        },
        "right": {
          "char": "e",
          "is_end_of_word": false,
          "left": null,
          "middle": {
            "char": "l",
            "is_end_of_word": false,
            "left": {
              "char": "c",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "r",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "i",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "r",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "e",
                      "is_end_of_word": true,
                      "left": null,
                      "middle": null,
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "middle": {
              "char": "l",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "e",
                "is_end_of_word": true,
                "left": null,
                "middle": null,
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": {
            "char": "f",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "a",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "i",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "t",
                  "is_end_of_word": true,
                  "left": null,
                  "middle": null,
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "depth": 4
        },
        "depth": 3
      },
      "middle": {
        "char": "e",
        "is_end_of_word": false,
        "left": null,
        "middle": {
          "char": "n",
          "is_end_of_word": false,
          "left": null,
          "middle": {
            "char": "i",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "a",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "l",
                "is_end_of_word": true,
                "left": null,
                "middle": null,
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": {
              "char": "r",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "e",
                "is_end_of_word": true,
                "left": null,
                "middle": null,
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "depth": 5
          },
          "right": null,
          "depth": 4
        },
        "right": null,
        "depth": 3
      },
      "right": {
        "char": "p",
        "is_end_of_word": false,
        "left": {
          "char": "n",
          "is_end_of_word": false,
          "left": {
            "char": "l",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "a",
              "is_end_of_word": true,
              "left": null,
              "middle": null,
              "right": null,
              "depth": 6
            },
            "right": {
              "char": "m",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "o",
                "is_end_of_word": false,
                "left": {
                  "char": "a",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "c",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "h",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "i",
                        "is_end_of_word": false,
                        "left": null,
                        "middle": {
                          "char": "n",
                          "is_end_of_word": false,
                          "left": null,
                          "middle": {
                            "char": "e",
                            "is_end_of_word": true,
                            "left": null,
                            "middle": null,
                            "right": null,
                            "depth": 13
                          },
                          "right": null,
                          "depth": 12
                        },
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "middle": {
                  "char": "d",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "e",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "l",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "e",
                        "is_end_of_word": true,
                        "left": null,
                        "middle": null,
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "depth": 5
          },
          "middle": {
            "char": "o",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "u",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "s",
                "is_end_of_word": true,
                "left": null,
                "middle": null,
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": null,
          "depth": 4
        },
        "middle": {
          "char": "r",
          "is_end_of_word": false,
          "left": {
            "char": "h",
            "is_end_of_word": false,
            "left": {
              "char": "a",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "r",
                "is_end_of_word": true,
                "left": null,
                "middle": null,
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "middle": {
              "char": "r",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "a",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "s",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "e",
                    "is_end_of_word": true,
                    "left": null,
                    "middle": null,
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "middle": {
            "char": "o",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "f",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "e",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "s",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "s",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "e",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "u",
                        "is_end_of_word": false,
                        "left": null,
                        "middle": {
                          "char": "r",
                          "is_end_of_word": true,
                          "left": null,
                          "middle": null,
                          "right": null,
                          "depth": 12
                        },
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": {
            "char": "u",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "i",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "s",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "q",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "u",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "e",
                      "is_end_of_word": true,
                      "left": null,
                      "middle": null,
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "depth": 4
        },
        "right": null,
        "depth": 3
      },
      "depth": 2
    },
    "middle": {
      "char": "u",
      "is_end_of_word": false,
      "left": null,
      "middle": {
        "char": "e",
        "is_end_of_word": true,
        "left": null,
        "middle": {
          "char": "l",
          "is_end_of_word": true,
          "left": null,
          "middle": null,
          "right": null,
          "depth": 4
        },
        "right": null,
        "depth": 3
      },
      "right": null,
      "depth": 2
    },
    "right": {
      "char": "s",
      "is_end_of_word": false,
      "left": {
        "char": "r",
        "is_end_of_word": false,
        "left": null,
        "middle": {
          "char": "e",
          "is_end_of_word": false,
          "left": null,
          "middle": {
            "char": "d",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "e",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "v",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "a",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "b",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "l",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "e",
                        "is_end_of_word": false,
                        "left": null,
                        "middle": {
                          "char": "s",
                          "is_end_of_word": true,
                          "left": null,
                          "middle": null,
                          "right": null,
                          "depth": 12
                        },
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": null,
          "depth": 4
        },
        "right": null,
        "depth": 3
      },
      "middle": {
        "char": "o",
        "is_end_of_word": false,
        "left": null,
        "middle": {
          "char": "m",
          "is_end_of_word": false,
          "left": null,
          "middle": {
            "char": "m",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "e",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "s",
                "is_end_of_word": true,
                "left": null,
                "middle": null,
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": null,
          "depth": 4
        },
        "right": {
          "char": "u",
          "is_end_of_word": false,
          "left": null,
          "middle": {
            "char": "p",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "e",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "r",
                "is_end_of_word": false,
                "left": null,
                "middle": {
                  "char": "b",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "e",
                    "is_end_of_word": true,
                    "left": null,
                    "middle": null,
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": null,
          "depth": 4
        },
        "depth": 3
      },
      "right": {
        "char": "u",
        "is_end_of_word": false,
        "left": {
          "char": "t",
          "is_end_of_word": false,
          "left": null,
          "middle": {
            "char": "o",
            "is_end_of_word": false,
            "left": null,
            "middle": {
              "char": "u",
              "is_end_of_word": false,
              "left": null,
              "middle": {
                "char": "t",
                "is_end_of_word": false,
                "left": {
                  "char": "c",
                  "is_end_of_word": false,
                  "left": null,
                  "middle": {
                    "char": "h",
                    "is_end_of_word": false,
                    "left": null,
                    "middle": {
                      "char": "e",
                      "is_end_of_word": false,
                      "left": null,
                      "middle": {
                        "char": "s",
                        "is_end_of_word": true,
                        "left": null,
                        "middle": null,
                        "right": null,
                        "depth": 11
                      },
                      "right": null,
                      "depth": 10
                    },
                    "right": null,
                    "depth": 9
                  },
                  "right": null,
                  "depth": 8
                },
                "middle": {
                  "char": "e",
                  "is_end_of_word": true,
                  "left": null,
                  "middle": null,
                  "right": null,
                  "depth": 8
                },
                "right": null,
                "depth": 7
              },
              "right": null,
              "depth": 6
            },
            "right": null,
            "depth": 5
          },
          "right": null,
          "depth": 4
        },
        "middle": {
          "char": "n",
          "is_end_of_word": true,
          "left": null,
          "middle": null,
          "right": null,
          "depth": 4
        },
        "right": null,
        "depth": 3
      },
      "depth": 2
    },
    "depth": 1
  },
  "depth": 0
}


'''

# Parse the JSON data
trie_data = json.loads(json_data)

# Visualize the Trie directly from the JSON data
visualize_trie_from_json(trie_data)