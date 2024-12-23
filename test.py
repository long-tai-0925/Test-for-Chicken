import base64

def test():
    with open('test.txt', 'rb') as f:
        data = f.read()
    print(base64.b64decode(data))

test()