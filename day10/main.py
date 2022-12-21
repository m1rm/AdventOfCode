# addx V takes two cycles and adds V to X
# noop takes one cycle and does nothing
import ast

def readInput(file):
    out = []
    with open(file) as f:
        for line in f.readlines():
            out.append(line.strip())
    return out

def main():
    x = 1 # x is one at the start as stated by challenge description
    cycles = 1
    intervals_of_interest = [20, 60, 100, 140, 180, 220]
    interval_values = {}
    input = readInput('challenge_input.txt')
    for line in input:
        if line.startswith('noop'):
            cycles += 1
            if cycles in intervals_of_interest:
                interval_values[cycles] = x
        elif line.startswith('addx'):
            # check after each single cycle of the addx operation, if the intervals_of_interest is met
            cycles += 1
            if cycles in intervals_of_interest:
                interval_values[cycles] = x
            cycles += 1
            x += ast.literal_eval(line.split(' ')[1])
            if cycles in intervals_of_interest:
                interval_values[cycles] = x
    # print(interval_values)

    result = 0
    for cycle, x in interval_values.items():
        result += (cycle * x)
    print('Part one result: ',result)




if __name__ == "__main__":
    main()