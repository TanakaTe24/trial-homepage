async function loadLeague(file) {
    const response = await fetch(file);
    const text = await response.text();
    const rows = text.trim().split("\n");
    return rows.slice(1).map(row => {
        const [player1, player2, result] = row.split(",");
        return {
            player1: player1.trim(),
            player2: player2.trim(),
            result: result.trim()
        };
    });
}

function reverseResult(result) {
    const [a, b] = result.split("-");
    return `${b}-${a}`;
}

function getResult(matches, player1, player2) {
    const match = matches.find(m =>
        (m.player1 === player1 && m.player2 === player2) ||
        (m.player1 === player2 && m.player2 === player1)
    );

    if (!match) {
        return "";
    }

    return match.player1 === player1
        ? match.result
        : reverseResult(match.result);
}

async function getFiles() {
    const data = await fetch('data/files.json').then(r => r.json());
    return data.files;
}

function createLeague(rank, no, matches) {
    const players = [...new Set(
        matches.flatMap(m => [m.player1, m.player2])
    )];

    let html = `
    <section id="${rank}${no}">
        <h2>${rank}${no}リーグ</h2>
        <table>
            <tr>
                <th></th>
    `;
    for (const player of players) {
        html += `<th>${player}</th>`;
    }

    html += "</tr>";
    for (const rowPlayer of players) {

        html += `<tr><th>${rowPlayer}</th>`;

        for (const colPlayer of players) {

            html += rowPlayer === colPlayer
                ? "<td>-</td>"
                : `<td>${getResult(matches, rowPlayer, colPlayer)}</td>`;
        }

        html += "</tr>";
    }
    html += `
        </table>
    </section>
    `;

    return html;
}

async function main() {
    console.log("main.start");
    const files = await getFiles();
    let html = "";
    // files からリンク作成
    for (const file of files) {
            const rank = file[0];
            const number = file[1];
        html += `<a href="#${rank}${number}">${rank}${number}リーグ</a><br>`;
    }
    // files からリーグ表結果作成
    for (const file of files) {
            // csv からデータ読み込み
            const matches = await loadLeague(`data/${file}`);
            // リーグ表作成
            const rank = file[0];
            const number = file[1];
            html += createLeague(rank, number, matches);
    }
    document.getElementById("leagues").innerHTML = html;


    console.log("main.end");
}

main();
