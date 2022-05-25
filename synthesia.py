import mido
import matplotlib.pyplot as plt
import numpy as np
mid = mido.MidiFile('etude_25_12_(c)unknown.mid', clip=True)

notes = ["C", "C#/D♭", "D", "D#/E♭", "E", "F",
         "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B"]
npb = 0
time = 0
tpb = mid.ticks_per_beat

note_time = [[] for _ in range(109)]

for i in range(len(mid.tracks)):
    for j in range(len(mid.tracks[i])):
        if mid.tracks[i][j].type == 'note_on':
            # if first three notes then wrong, need change
            note_name = notes[(mid.tracks[i][j].note-24) % 12]
            note_octave = mid.tracks[i][j].note//12-1
            time += mid.tracks[i][j].time
            note_time[mid.tracks[i][j].note].append(time)

print(note_time)

for i in range(109):
    for j in range(0, len(note_time[i]), 2):
        plt.plot(np.arange(note_time[i][j], note_time[i][j+1]+1, 1),
                 np.full((note_time[i][j+1]-note_time[i][j]+1, 1), i), '-')
        print()
plt.show()
