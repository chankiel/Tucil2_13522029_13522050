class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def midP(point1, point2):
    return Point((point1.x + point2.x) / 2, (point1.y + point2.y) / 2)

# I/O FUNCTIONS
def is_num(x):
    try:
        int(x)
    except ValueError:
        return False
    else:
        return True
    
def validateNumericInput(x, message, minvalue):
    while (not is_num(x)):
        print("\nMasukan harus berupa angka!")
        x = input(message)
    while (int(x) <= minvalue):
        print("\nMasukan harus berupa bilangan lebih besar dari", minvalue)
        x = readNumericInput(message, minvalue)
    return int(x)

def readNumericInput(message, minvalue):
    x = input(message)
    return validateNumericInput(x, message, minvalue)
