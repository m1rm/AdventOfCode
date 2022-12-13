def readInput(filename):
    with open(filename) as f:
        return f.readlines()

def main():
    input = readInput('exemplary_input.txt')
    for line in input:
        print(line)

if __name__ == "__main__":
    main()
