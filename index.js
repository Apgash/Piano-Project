const synth = new Tone.Synth().toDestination();

const noteMap = {
    "F4": "F4", 
    "F#4": "F#4",
    "G4": "G4",
    "G#4": "G#4",
    "A4": "A4",
    "A#4": "A#4", 
    "B4": "B4", 
    "C5": "C5",
    "C#5": "C#5",
    "D5": "D5",
    "D#5": "D#5", 
    "E5": "E5", 
    "F5": "F5",
    "F#5": "F#5",
    "G5": "G5", 
    "G#5": "G#5",
    "A5": "A5", 
    "A#5": "A#5",
    "B5": "B5",  
    "C6": "C6",
    "C#6": "C#6",
    "D6": "D6", 
    "D#6": "D#6",
    "E6": "E6"  
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



