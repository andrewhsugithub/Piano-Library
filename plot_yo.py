import matplotlib.pyplot as plt
import numpy as np

arr = [[] for _ in range(88)]
arr[10].append((100, 200))

arr[30].append((150, 200))
print(arr)
plt.figure()
plt.xlabel('tick') 
plt.ylabel('note') 
plt.title("tic and note")

for k, i in enumerate(arr):
    for section in i:
        left, right = section
        plt.plot([*range(left, right)], [k for _ in range(left, right)])
        
plt.show()
