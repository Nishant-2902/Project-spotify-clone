console.log("start js");
let currentsong = null;

async function getsong() {
    let a = await fetch("http://127.0.0.1:3000/song.html")
    let res = await a.text()
    // console.log(res);
    let div = document.createElement("div")
    div.innerHTML = res;
    let as = div.getElementsByTagName("a");
    // console.log(as);
    let songs = []
    for (let i = 0; i < as.length; i++) {
        const e = as[i];
        songs.push(e.href)
    }

    return songs;
}

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

let playmusic = (track) => {
    if (currentsong) {
        currentsong.pause();
        currentsong.currentTime = 0;
    }

    currentsong = new Audio(track);
    currentsong.play();
    play.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38" color="#000000" fill="white"><path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" /><path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" /></svg>'

    currentsong.addEventListener('loadedmetadata', function() {
    let duration = currentsong.duration;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    // console.log(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    document.querySelector(".ctimems").innerText=`${minutes}:${seconds.toString().padStart(2, '0')}`;
});

currentsong.addEventListener('timeupdate', function() {
    let duration = currentsong.currentTime;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    // console.log(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    document.querySelector(".timems").innerText=`${minutes}:${seconds.toString().padStart(2, '0')}`;
    document.querySelector(".pointer").style.left=(currentsong.currentTime/currentsong.duration)*100+"%";
});

document.querySelector(".bar").addEventListener("click", e=>{
    // console.log(e.offsetX);
     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".pointer").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100

    
})

}



async function main() {

    let song = await getsong();

    console.log(song);
    Array.from(document.querySelector(".con1").getElementsByTagName("div")).forEach(e => {
        // console.log(e.getElementsByTagName("h3"));
        // console.log(e.querySelector("h3"));
        e.addEventListener("click", element => {

            let s = e.querySelector("h3").innerText;
            console.log(s);

            playmusic("/songs/" + s + ".mp3")

            let c = document.querySelector(".songinfo");
            c.innerText = s;


        })
    })

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play();
            play.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38" fill="white"><path d="M4 7C4 5.58579 4 4.87868 4.43934 4.43934C4.87868 4 5.58579 4 7 4C8.41421 4 9.12132 4 9.56066 4.43934C10 4.87868 10 5.58579 10 7V17C10 18.4142 10 19.1213 9.56066 19.5607C9.12132 20 8.41421 20 7 20C5.58579 20 4.87868 20 4.43934 19.5607C4 19.1213 4 18.4142 4 17V7Z" /><path d="M14 7C14 5.58579 14 4.87868 14.4393 4.43934C14.8787 4 15.5858 4 17 4C18.4142 4 19.1213 4 19.5607 4.43934C20 4.87868 20 5.58579 20 7V17C20 18.4142 20 19.1213 19.5607 19.5607C19.1213 20 18.4142 20 17 20C15.5858 20 14.8787 20 14.4393 19.5607C14 19.1213 14 18.4142 14 17V7Z" /></svg>'
        }
        else {
            currentsong.pause();
            play.innerHTML = '<svg width="38" height="38" viewBox="0 0 48 48" fill="white" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="24" r="22" stroke="white" stroke-width="4" fill="none" /><polygon points="18,14 36,24 18,34" fill="white" /></svg>'
        }

    })
    



}
main();

