"""
builds simple linear perceptron and weighs factors for winning match
"""

PATH = "teams_info/"
learning_rate = 0.01
epochs = 100000

def get_input(input_data):
    input_path = PATH + "/game_data"
    input_file = open(input_path, "r")

    for line in input_file:
        line = line.strip().split(",")
        input_data.append(line)

    input_file.close()


def get_result(result_data):
    result_path = PATH + "/results"
    result_file = open(result_path, "r")

    for line in result_file:
        line = int(line.strip())
        result_data.append(line)

def initialize_weights(lst, weights):

    for num in lst:
        weights.append(0.1)

def learn(x, w, y):
    round = 0
    count = 0
    while count != len(x) and round != epochs:
        count = 0
        for i in range(len(x)):
            sum = float(0)
            for j in range(len(w)):
                sum += w[j]*float(x[i][j])

            if sum > 50:
                output = 1
            else:
                output = 0
            if output != y[i]:
                for k in range(len(w)):
                    w[k] = w[k] + learning_rate*(y[i] - output)*float(x[i][k])
            else:
                count += 1
        round += 1

def main():
    #Specifying path based on team entered
    team = input("enter team name: ")
    global PATH
    PATH += team

    #Getting input data as list of lists
    input_data = []
    get_input(input_data)

    #initialize weights
    weights = []
    initialize_weights(input_data[0], weights)

    #Getting output data as list
    result_data = []
    get_result(result_data)

    learn(input_data, weights, result_data)
    print(weights)


main()
