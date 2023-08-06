from collections import defaultdict
from itertools import accumulate

def readInput(file):
    out = []
    with open(file) as f:
        for line in f.readlines():
            out.append(line.strip())
    return out

def main():
    dirs = defaultdict(int)
    input = readInput("exemplary_input.txt")

    for line in input:
        match line.split():
            case "$", "cd", "/":
                path = ["/"]
            case "$", "cd", "..":
                path.pop()
            case "$", "cd", dir:
                path.append(dir + "/")
            case "$" | "dir", *_:
                continue
            case size, _:
                print(line)
                print(dirs)
                for p in accumulate(path):
                    print(p)
                    dirs[p] += int(size)

    print(sum(size for size in dirs.values() if size <= 100_000))
    print(min(size for size in dirs.values() if size >= dirs["/"] - 40_000_000))

if __name__ == "__main__":
    main()