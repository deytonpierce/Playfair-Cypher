document.getElementById('cipherForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const message = document.getElementById('message').value;
    const password = document.getElementById('password').value;
    const action = document.getElementById('action').value;

    function processMessage(message, password, action) {
        message = message.replace(/[^a-zA-Z]/g, '').toLowerCase();
        password = password.toLowerCase().replace(/j/g, 'i');
        const uniquePassword = [...new Set(password.split(''))];
        if (uniquePassword.length !== 5 || password.length !== 5) {
            return "Password must be 5 letters that do not repeat. I/J are considered the same letter.";
        }

        const lettersSet = new Set('abcdefghiklmnopqrstuvwxyz'.split(''));
        uniquePassword.forEach(letter => lettersSet.delete(letter));
        const lettersList = [...lettersSet];
        const keymap = [
            uniquePassword,
            lettersList.slice(0, 5),
            lettersList.slice(5, 10),
            lettersList.slice(10, 15),
            lettersList.slice(15, 20)
        ];

        const startMessageList = [];
        const endMessageList = [];
        if (message.length % 2 !== 0) {
            message += 'x';
        }
        for (let i = 0; i < message.length; i += 2) {
            startMessageList.push([message[i], message[i + 1]]);
        }

        function findLetterLocation(grid, letter) {
            for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
                const row = grid[rowIndex];
                const columnIndex = row.indexOf(letter);
                if (columnIndex !== -1) {
                    return [rowIndex, columnIndex];
                }
            }
        }

        function encode() {
            startMessageList.forEach(pair => {
                const [point1, point2] = [findLetterLocation(keymap, pair[0]), findLetterLocation(keymap, pair[1])];
                if (point1[0] === point2[0]) {
                    const aa = (point1[1] + 1) % 5;
                    const bb = (point2[1] + 1) % 5;
                    endMessageList.push([keymap[point1[0]][aa], keymap[point2[0]][bb]]);
                } else if (point1[1] === point2[1]) {
                    const aa = (point1[0] + 1) % 5;
                    const bb = (point2[0] + 1) % 5;
                    endMessageList.push([keymap[aa][point1[1]], keymap[bb][point2[1]]]);
                } else {
                    endMessageList.push([keymap[point1[0]][point2[1]], keymap[point2[0]][point1[1]]]);
                }
            });
        }

        function decode() {
            startMessageList.forEach(pair => {
                const [point1, point2] = [findLetterLocation(keymap, pair[0]), findLetterLocation(keymap, pair[1])];
                if (point1[0] === point2[0]) {
                    const aa = (point1[1] - 1 + 5) % 5;
                    const bb = (point2[1] - 1 + 5) % 5;
                    endMessageList.push([keymap[point1[0]][aa], keymap[point2[0]][bb]]);
                } else if (point1[1] === point2[1]) {
                    const aa = (point1[0] - 1 + 5) % 5;
                    const bb = (point2[0] - 1 + 5) % 5;
                    endMessageList.push([keymap[aa][point1[1]], keymap[bb][point2[1]]]);
                } else {
                    endMessageList.push([keymap[point1[0]][point2[1]], keymap[point2[0]][point1[1]]]);
                }
            });
        }

        if (action === 'e') {
            encode();
        } else {
            decode();
        }

        return endMessageList.map(pair => pair.join('')).join(' ').toUpperCase();
    }

    function displayKeyGrid(password) {
        const lettersSet = new Set('abcdefghiklmnopqrstuvwxyz'.split(''));
        password.split('').forEach(letter => lettersSet.delete(letter));
        const lettersList = [...lettersSet];
        const keymap = [
            password.split(''),
            lettersList.slice(0, 5),
            lettersList.slice(5, 10),
            lettersList.slice(10, 15),
            lettersList.slice(15, 20)
        ];

        const gridDiv = document.getElementById('keyGrid');
        gridDiv.innerHTML = ''; // Clear existing grid

        keymap.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(letter => {
                const td = document.createElement('td');
                td.textContent = letter.toUpperCase();
                tr.appendChild(td);
            });
            gridDiv.appendChild(tr);
        });
    }

    const result = processMessage(message, password, action);
    document.getElementById('result').textContent = result;
    displayKeyGrid(password);
});

document.getElementById('showGridBtn').addEventListener('click', function () {
    const keyGridContainer = document.getElementById('keyGridContainer');
    const showGridBtn = document.getElementById('showGridBtn');

    if (keyGridContainer.style.display === 'none') {
        keyGridContainer.style.display = 'block';
        showGridBtn.textContent = 'Hide Key Grid';
    } else {
        keyGridContainer.style.display = 'none';
        showGridBtn.textContent = 'Show Key Grid';
    }
});

// Generate rain effect dynamically
function generateRain() {
    const numDrops = 100; // Number of rain drops
    const rainContainer = document.body;
    for (let i = 0; i < numDrops; i++) {
        const rainDrop = document.createElement('div');
        rainDrop.className = 'rain';
        rainDrop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        rainDrop.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random animation duration
        rainContainer.appendChild(rainDrop);
    }
}

// Call generateRain function when the page loads
generateRain();