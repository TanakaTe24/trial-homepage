const ranks = ["S", "A", "B", "C", "D", "E"];
const players = [
"選手1",
"選手2",
"選手3",
"選手4",
"選手5",
"選手6"
];

function createLeague(rank, no) {
const id = `${rank}${no}`;

let html = `
<section class="league" id="${id}">
    <h2>${id}リーグ</h2>

    <table>
        <tr>
            <th></th>
            <th>${players[0]}</th>
            <th>${players[1]}</th>
            <th>${players[2]}</th>
            <th>${players[3]}</th>
            <th>${players[4]}</th>
            <th>${players[5]}</th>
            <th>勝</th>
            <th>敗</th>
            <th>順位</th>
        </tr>
`;

for (let i = 0; i < 6; i++) {
    html += `<tr><th>${players[i]}</th>`;

    for (let j = 0; j < 6; j++) {
        html += i === j
            ? "<td>-</td>"
            : "<td></td>";
    }

    html += `
        <td></td>
        <td></td>
        <td></td>
    </tr>`;
}

html += `
    </table>
    <p><a href="#">ページ先頭へ戻る</a></p>
</section>`;

return html;

}

let html = "";

for (const rank of ranks) {
    for (let i = 1; i <= 4; i++) {
    html += createLeague(rank, i);
    }
}

document.getElementById("leagues").innerHTML = html;
