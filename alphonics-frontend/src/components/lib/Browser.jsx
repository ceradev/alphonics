import React, { useEffect, useState } from "react";
function Browser() {

function setSong() {

}

async function getSong(song) {
    try {

        const response = await axios.request(options);

    } catch (error) {
        console.log(' Tienes un error : '  + error);
    }
}

function handleSearch(s) {
    s.preventDefault();
    if (cancion.trim() === "") {
        alert("Debes ingresar una cancion");
        return;
}
    setSong('');
    getSong(cancion);
}

return (
    <>

    <form onSubmit={handleSearch}>
        <input type="text" name="search" value={song} placeholder="Search" onChange={s => setSong(s.target.value)} />
        <button type="submit">Search</button>
    </form>

    <div>
        {songs.map(song => (
            <div key={song.id}>
                <h2>{song.title}</h2>
                <p>{song.artist}</p>
            </div>
        ))}
    </div>

    </>
)
}

export default Browser;
