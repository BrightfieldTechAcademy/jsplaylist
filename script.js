let table = document.querySelector("#musicTable");
let form = document.querySelector("#musicForm");
let songs = JSON.parse(localStorage.getItem("blue")) || [];
let selectedSongId = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const songData = {
        id: "BTN00" + (songs.length + 1),
        song: form.song.value,
        album: form.album.value,
        artist: form.artist.value
    };

    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${songData.id}</td>
    <td>${songData.song}</td>
    <td>${songData.album}</td>
    <td>${songData.artist}</td>
    <td>
      <button id="${songData.id}" onclick="editSong('${songData.id}')">Edit</button>
      <button id="update_${songData.id}" onclick="updateSong('${songData.id}')">Update</button>
      <button id="delete_${songData.id}" onclick="deleteSong('${songData.id}')">Delete</button>
    </td>
  `;

    table.appendChild(tr);
    songs.push(songData);
    localStorage.setItem("blue", JSON.stringify(songs));
    form.reset();
});

document.addEventListener("DOMContentLoaded", () => {
    songs.forEach((songData) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
      <td>${songData.id}</td>
      <td>${songData.song}</td>
      <td>${songData.album}</td>
      <td>${songData.artist}</td>
      <td>
        <button id="${songData.id}" onclick="editSong('${songData.id}')">Edit</button>
        <button id="update_${songData.id}" onclick="updateSong('${songData.id}')">Update</button>
        <button id="delete_${songData.id}" onclick="deleteSong('${songData.id}')">Delete</button>
      </td>
    `;

        table.appendChild(tr);
    });
});

function editSong(id) {
    const row = document.getElementById(id).parentNode.parentNode;
    const [songIdCell, songCell, albumCell, artistCell] = row.cells;

    form.song.value = songCell.textContent;
    form.album.value = albumCell.textContent;
    form.artist.value = artistCell.textContent;


}

function updateSong(id) {
    const row = document.getElementById(id).parentNode.parentNode;
    const [_, songCell, albumCell, artistCell] = row.cells;
    const editButton = document.getElementById(id);
    const updateButton = document.getElementById(`update_${id}`);

    songCell.textContent = form.song.value;
    albumCell.textContent = form.album.value;
    artistCell.textContent = form.artist.value;

    const updatedSong = songs.find(song => song.id === id);
    if (updatedSong) {
        updatedSong.song = form.song.value;
        updatedSong.album = form.album.value;
        updatedSong.artist = form.artist.value;
        localStorage.setItem("blue", JSON.stringify(songs));
    }

    form.reset();

}

function deleteSong(id) {
    songs = songs.filter(song => song.id !== id);
    localStorage.setItem("blue", JSON.stringify(songs));
    let row = document.getElementById(id).parentElement.parentElement;
    row.parentElement.removeChild(row);

    if (selectedSongId === id) {
        form.reset();
        selectedSongId = null;
    }
}