import matplotlib.pyplot as plt

# Define the x values
x = [5, 100, 500, 1000, 5000, 10000, 20000, 30000]

y1 = [358, 14964, 49867, 86032, 291813, 465553, 731537, 1024370]
plt.plot(x, y1, label='list words avec balance')


y2 = [298, 15960, 55378, 97819, 301890, 505042, 760740, 1150691]
plt.plot(x, y2, label='list words sans balance')



# Add labels and title
plt.xlabel("taille de mot ajouté dans l'arbre")
plt.ylabel('temps d\'execution en nano secondes')
# plt.title('Graph of Two Y Indices')

# Add a legend
plt.legend()

# Save the plot as a PNG file
plt.savefig('graph.png')

# Show the plot
plt.show()
