message = input("Message: ")
message = ''.join(char for char in message if char.isalpha())
message = list(message.lower())

x=0
while x == 0:
    
    password = str(input("Password: "))
    password = password.lower()
    password = password.replace('j', 'i')
    y = len(password)
    seen = set()
    result = []

    for char in password:
        if char.isalpha() and char.lower() not in seen:
            seen.add(char.lower())  # Track seen letters in lowercase to handle case insensitivity
            result.append(char)  # Append the original character
    
    if len(result) == 5 and y == 5:
        password = result
        x = 1
    else:
        print("Password must be 5 letters that do not repeat. I/J are considered the same letter.")

letters_set = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'}
for letter in password:
    letters_set.discard(letter)
letters_list = sorted(list(letters_set))
keymap = [
    [password[0],password[1],password[2],password[3],password[4]],
    [letters_list[0], letters_list[1], letters_list[2], letters_list[3], letters_list[4]],
    [letters_list[5], letters_list[6], letters_list[7], letters_list[8], letters_list[9]],
    [letters_list[10], letters_list[11], letters_list[12], letters_list[13], letters_list[14]],
    [letters_list[15], letters_list[16], letters_list[17], letters_list[18], letters_list[19]]
]

start_message_list = []
end_message_list = []
if len(message)%2 != 0:
    message.append("x")

for i in range(0, len(message), 2):
    start_message_list.append([message[i], message[i+1]])

response = input("Encode or Decode? (E/D): ").strip().lower()
while response not in ('e', 'd'):
    print("Invalid input. Please enter 'E' for Encode or 'D' for Decode.")
    response = input("Encode or Decode? (Y/N): ").strip().lower()

def find_letter_location(grid, letter):
    for row_index, row in enumerate(grid):
        if letter in row:
            column_index = row.index(letter)
            return (row_index, column_index)  # Return as soon as the letter is found

def encode():
    for i in range(0, len(start_message_list), 1):
        point1 = find_letter_location(keymap, str(start_message_list[i][0]))
        point2 = find_letter_location(keymap, str(start_message_list[i][1]))

        if point1[0] == point2[0]:
            aa = point1[1] + 1
            if aa > 4:
                aa -= 5
            bb = point2[1] + 1
            if bb > 4:
                bb -= 5
            end_message_list.append([keymap[point1[0]][aa], keymap[point2[0]][bb]])

        if point1[1] == point2[1] and point1[0] != point2[0]:
            aa = point1[0] + 1
            if aa > 4:
                aa -= 5
            bb = point2[0] + 1
            if bb > 4:
                bb -= 5
            end_message_list.append([keymap[aa][point1[1]], keymap[bb][point2[1]]])

        if point1[1] != point2[1] and point1[0] != point2[0]:
            aa = point1[0]
            bb = point2[0]
            cc = point2[1]
            dd = point1[1]

            end_message_list.append([keymap[aa][cc], keymap[bb][dd]])

def decode():
    for i in range(0, len(start_message_list), 1):
        point1 = find_letter_location(keymap, str(start_message_list[i][0]))
        point2 = find_letter_location(keymap, str(start_message_list[i][1]))

        if point1[0] == point2[0]:
            aa = point1[1] - 1
            if aa < 0:
                aa += 5
            bb = point2[1] - 1
            if bb < 0:
                bb += 5
            end_message_list.append([keymap[point1[0]][aa], keymap[point2[0]][bb]])

        if point1[1] == point2[1] and point1[0] != point2[0]:
            aa = point1[0] - 1
            if aa < 0:
                aa += 5
            bb = point2[0] - 1
            if bb < 0:
                bb += 5
            end_message_list.append([keymap[aa][point1[1]], keymap[bb][point2[1]]])

        if point1[1] != point2[1] and point1[0] != point2[0]:
            aa = point1[0]
            bb = point2[0]
            cc = point2[1]
            dd = point1[1]

            end_message_list.append([keymap[aa][cc], keymap[bb][dd]])
        
if response == 'e':
    encode()
    
else:
    decode()
    
result = ' '.join(''.join(pair).upper() for pair in end_message_list)
print(result)