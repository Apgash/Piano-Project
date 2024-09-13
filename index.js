const synth = new Tone.Synth().toDestination();

const noteMap = {
    "01": "F4", 
    "02": "F#4",
    "03": "G4",
    "04": "G#4",
    "05": "A4",
    "06": "A#4", 
    "07": "B4", 
    "08": "C4",
    "09": "C#4",
    "10": "D4",
    "11": "D#4", 
    "12": "E4", 
    "13": "F5",
    "14": "F#5",
    "15": "G5", 
    "16": "G#5",
    "17": "A5", 
    "18": "A#5",
    "19": "B5",  
    "20": "C5",
    "21": "C#5",
    "22": "D5", 
    "23": "D#5",
    "24": "E5"  
}

document.querySelectorAll("div.piano-keys, li.piano-keys").forEach(key => {
    key.addEventListener("click", () => {
     const keyId = key.getAttribute("data-key");
     const note = noteMap[keyId];
     if (note) {
         synth.triggerAttackRelease(note, "8n");
     }
});
});



