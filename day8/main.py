import pandas as pd

def readInput(filename):
    tmp = []
    with open(filename) as f:
        for line in f.readlines():
            tmpLine = []
            line = line.strip()
            if line != '':
                for letter in line:
                    tmpLine.append(int(letter))
            tmp.append(tmpLine)
    return tmp

def main():
    input = readInput('exemplary_input.txt') # [[3, 0, 3, 7, 3], [2, 5, 5, 1, 2], [6, 5, 3, 3, 2], [3, 3, 5, 4, 9], [3, 5, 3, 9, 0]]

    df = pd.DataFrame(input)
    #df["rowSum"] = df.sum(axis=1)
    #below does not take directions into account
    #if value > max(df.iloc[rowIndex].tolist()) and value > max(df.iloc[:, colIndex].tolist()):

    #print(df)
    #print('###################')
    numTrees = 0
    for rowIndex, row in df.iterrows():
        for colIndex, value in row.items():
            row = df.iloc[rowIndex].tolist()
            col = df.iloc[:, colIndex].tolist()



if __name__ == "__main__":
    main()
