console.log("JS")

async function getSongs(){ // instead of using .then() , async allows to use await 
    let a=await fetch("http://127.0.0.1:5500/songs/") // sends network request , await pauses the function until response is recieved , here a is resp object
    let response=await a.text(); //reads responce body as a plain text
    let div=document.createElement("div");
    div.innerHTML=response; // lets u use dom methods to search the HTML
    let as = div.getElementsByTagName("a"); // grabs all anchor elements from html

    let songs = []
    for(let index=0;index<as.length;index++){ // Loop through each <a> tag
        const element = as[index]; // checks if href ends with mp3 and then pushes full url to songs array
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    return songs;
    
}

async function main(){
    // get list of all songs
    let songs = await getSongs();
    console.log(songs)

    // Play the first song
    var audio = new Audio(songs[0]); // plays song 
    audio.play()

    audio.addEventListener("loadeddata",()=>{
        let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime);
        
        // duration variable now holds the duration of audio clip
    })
}
main();