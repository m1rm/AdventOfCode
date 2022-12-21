# addx V takes two cycles and adds V to X
# noop takes one cycle and does nothing
import ast

def readInput(file):
    out = []
    with open(file) as f:
        for line in f.readlines():
            out.append(line.strip())
    return out

def partOne(input):
    x = 1 # x is one at the start as stated by challenge description
    cycles = 1
    intervals_of_interest = [20, 60, 100, 140, 180, 220]
    interval_values = {}
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

def main():
    input = readInput('challenge_input.txt')
    screen = []
    current_cycle = 1
    line_index = 1
    x = 1
    line_terminators = [40, 80, 120, 160, 200, 240]
    screen_line = ""
    for line in input:
        if line.startswith('addx'):
            for i in range(0,2): # because addx takes two cycles to complete
                print('adx', i, line_index)
                if line_index in range(x-1, x+2):
                    screen_line += "#"
                else:
                    screen_line += "."
                current_cycle += 1
                line_index += 1
                if current_cycle in line_terminators:
                    print('addx terminated: ', current_cycle)
                    screen.append(screen_line)
                    screen_line = ""
                    line_index = 1
            x += int(line.split(' ')[1]) # after two cycles, x is moved to new position
        else: # line.startswith('noop'):
            print('noop', line_index)

            if line_index in range(x-1, x+2):
                screen_line += "#"
            else:
                screen_line += "."
            current_cycle += 1
            line_index += 1
            if current_cycle in line_terminators:
                print('noop terminated: ', current_cycle)
                screen.append(screen_line)
                screen_line = ""
                line_index = 1

    for line in screen:
        print(line)










if __name__ == "__main__":
    main()