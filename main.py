
def add_two_numbers(a, b, c):
    return a + b + c


def list_all_numbers(x):
    for num in x:
        print(num)


if __name__ == "__main__":
    num1 = 5
    num2 = 10
    num3 = 15
    sum_result = add_two_numbers(num1, num2, num3)
    print(f"The sum of {num1}, {num2}, and {num3} is: {sum_result}")
    list_all_numbers([num1, num2, num3])