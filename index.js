// Initialize the synth for sound generation using Tone.js and route it to the destination (speakers)
const synth = new Tone.Synth().toDestination();

// Object mapping HTML data attributes (from the piano keys) to corresponding musical notes
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
};

// Retrieve the notes previously stored in localStorage, or initialize an empty array if no notes are stored
let playedNotes = JSON.parse(localStorage.getItem('playedNotes')) || [];

// Function to update the displayed notes on the screen based on the current playedNotes array
const updateDisplay = () => {
    const displayDiv = document.getElementById('displayKeys');
    displayDiv.textContent = playedNotes.join(" ");  // Join the notes with spaces and display them
};

// Call the updateDisplay function to display any notes that are already stored in localStorage
updateDisplay();

// Add event listeners to all piano keys (white and black) for handling key presses
document.querySelectorAll("div.piano-keys, li.piano-keys").forEach(key => {
    key.addEventListener("click", () => {
        // Get the 'data-key' attribute value (note identifier) from the clicked key
        const keyId = key.getAttribute("data-key");
        const note = noteMap[keyId];  // Get the corresponding musical note from noteMap
        
        if (note) {  // If a valid note is found
            // Play the note sound using the Tone.js synth
            synth.triggerAttackRelease(note, "8n");
            
            // Add the played note to the playedNotes array
            playedNotes.push(note);

            // Save the updated playedNotes array to localStorage
            localStorage.setItem('playedNotes', JSON.stringify(playedNotes));

            // Update the displayed notes on the screen to include the newly played note
            updateDisplay();
        }
    });
});

// Handle the Play button click: Retrieve and play the stored notes in sequence
document.querySelector('.play-button').addEventListener('click', async () => {
    await Tone.start();  // Ensure the Tone.js audio context is started (necessary for interaction)

    // Retrieve the notes stored in localStorage (notes previously played)
    const storedNotes = JSON.parse(localStorage.getItem('playedNotes')) || [];
    
    if (storedNotes.length === 0) {
        console.log('No notes to play');
        return;  // Exit if no notes are stored
    }

    // Stop any previously scheduled playback or ongoing playback
    Tone.Transport.stop();  // Stop the transport (sequencer) to reset it
    Tone.Transport.cancel();  // Cancel all previously scheduled events in the transport

    // Schedule the playback of each note in sequence
    let time = 0;  // Start time for the first note
    storedNotes.forEach(note => {
        // Schedule each note to play at a specific time relative to the start
        Tone.Transport.schedule(time => {
            synth.triggerAttackRelease(note, "8n");
        }, time);

        // Increment the time for the next note to be played (using 8n as the duration between notes)
        time += Tone.Time("8n").toSeconds();
    });

    // Start the transport to begin playing the scheduled notes
    Tone.Transport.start();
});

// Handle the Clear button click: Clear notes from the screen and localStorage
function clearLocalStorage() {
    localStorage.clear();  // Clear the localStorage, removing all stored notes
    playedNotes = [];  // Reset the playedNotes array to an empty array
    updateDisplay();  // Update the display to reflect the cleared notes (no notes displayed)
}

// Attach the clearLocalStorage function to the Clear button so it executes when the button is clicked
document.getElementById("clear").addEventListener("click", clearLocalStorage);
