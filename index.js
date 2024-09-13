const synth = new Tone.Synth().toDestination();

const noteMap = {
    "01": "F4", 
    "02": "F#4",
    "03": "G4",
    "04": "G#4",
    "05": "A4",
    "06": "A#4", 
    "07": "B4", 
    "08": "C5",
    "09": "C#5",
    "10": "D5",
    "11": "D#5", 
    "12": "E5", 
    "13": "F5",
    "14": "F#5",
    "15": "G5", 
    "16": "G#5",
    "17": "A5", 
    "18": "A#5",
    "19": "B5",  
    "20": "C6",
    "21": "C#6",
    "22": "D6", 
    "23": "D#6",
    "24": "E6"  
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



