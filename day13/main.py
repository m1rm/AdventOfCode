# challenge: sum of indices of pairs that are already in right order in input
import ast
def readInput(file):
    with open(file) as f:
        return f.readlines()

def main():
    input = readInput('exemplary_input.txt')
    for line in input:
        line = line.strip()
        if(line != ''):
            print(ast.literal_eval(line))
            # loop and compare i and i+1 and skip every even i (if loop starts at 1)


if __name__ == "__main__":
    main()
