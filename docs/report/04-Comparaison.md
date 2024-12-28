

# 4. Comparaison

À noter ici nous utilisons les tries hybrides SANS équilibrage.

Pour le cas de l'insertion, nos benchmarks ont montré qu'un trie hybride est plus rapide qu'un Patricia Trie. Cela est dû à la complexité de l'insertion.

Pour le cas de la recherche, nos benchmarks ont montré que le  patricia trie est plus rapide pour des arbres < 14k noeuds et la tendance s'inverse pour des arbres > 14k noeuds. Cela est dû à la complexité de la recherche.
Le temps de recherche d'un trie hybrid plateau à partir d'un moment alors que le temps de recherche d'un patricia trie augmente de manière linéaire.

