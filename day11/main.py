def readInput(file):
    out = []
    with open(file) as f:
        for line in f.readlines():
            out.append(line.strip())
    return out

def processInput(input):
    monkeys = {}
    for line in input:
        line = line.strip()
        if line.startswith("Monkey") and line not in monkeys.keys():
            line = line.replace(':', '')
            monkeys[line] = {'inspection_count' : 0}
            current_monkey = line
        if line.startswith("Starting"):
            starting_string = line.split(':')[1]
            tmp = starting_string.split(',')
            res = [int(x) for x in tmp]
            monkeys[current_monkey]["items"] = res
        if line.startswith('Operation'):
            operation_string = line.split(':')[1]
            operation = operation_string.split('=')[1]
            split_operation = operation.split(' ')
            if ('+' in split_operation):
                monkeys[current_monkey]["worry_operation"] = "add"
            elif ('-' in split_operation):
                monkeys[current_monkey]["worry_operation"] = "subtract"
            elif ('*' in split_operation):
                monkeys[current_monkey]["worry_operation"] = "multiply"
            elif ('/' in split_operation):
                monkeys[current_monkey]["worry_operation"] = "divide"
            else:
                print("unexpected math operation ", split_operation, " detected in processInput")
            try:
                monkeys[current_monkey]["worry_operand"] = int(split_operation[-1])
            except ValueError:
                if split_operation[-1] == "old":
                    monkeys[current_monkey]["worry_operand"] = "old"

        if line.startswith("Test"):
            parts = line.split(' ')
            monkeys[current_monkey]["tester"] = int(parts[-1])
        if line.startswith('If true'):
            parts = line.split(' ')
            monkeys[current_monkey]["passed_target"] = "Monkey " + parts[-1]
        if line.startswith('If false'):
            parts = line.split(' ')
            monkeys[current_monkey]["failed_target"] = "Monkey " + parts[-1]
    return monkeys

def calculateWorryLevel(old, worry_operation, worry_operand):
    if worry_operand == "old":
        worry_operand = old
    if (worry_operation == "add"):
        return (old + worry_operand)
    elif (worry_operation == "subtract"):
        return (old - worry_operand)
    elif (worry_operation == "multiply"):
        return (old * worry_operand)
    elif (worry_operation == "divide"):
        return (old / worry_operand)
    else:
        print("unexpected math operation " ,worry_operation, " detected in calculateWorryLevel")
        return -1

def main():
    input = readInput('exemplary_input.txt')
    monkeys = processInput(input)

    # Count the total number of times each monkey inspects items over 20 rounds
    for i in range(0,21):
        for monkey, instructions in monkeys.items():
            for property in monkeys[monkey]["items"]:
                monkeys[monkey]['inspection_count'] += 1
                tmp = calculateWorryLevel(property, monkeys[monkey]["worry_operation"], monkeys[monkey]["worry_operand"])
                new = int(tmp/3)
                if (new % monkeys[monkey]["tester"] == 0):
                    throw_target = monkeys[monkey]["passed_target"]
                else:
                    throw_target = monkeys[monkey]["failed_target"]
                monkeys[throw_target]["items"].append(new)
                monkeys[monkey]["items"].pop(0)

    for monkey, value in monkeys.items():
        print(monkey, value["inspection_count"])

if __name__ == "__main__":
    main()