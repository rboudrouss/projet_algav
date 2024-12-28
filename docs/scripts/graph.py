import matplotlib.pyplot as plt

# Define the x values
x = [5, 100, 500, 1000, 5000, 10000, 20000, 30000]

y1 = [36, 157, 174, 184, 208, 230, 223, 228 ]
plt.plot(x, y1, label='Hybrid trie')


y2 = [58, 112, 134, 150, 181, 201, 286, 293]
plt.plot(x, y2, label='Patricia trie')



# Add labels and title
plt.xlabel("taille de mot ajouté dans l'arbre")
plt.ylabel('temps d\'execution en nano secondes')
plt.title('Comparaison Search')

# Add a legend
plt.legend()

# Save the plot as a PNG file
plt.savefig('graph.png')

# Show the plot
plt.show()
