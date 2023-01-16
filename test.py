# https://medium.com/analytics-vidhya/convert-midi-file-to-numpy-array-in-python-7d00531890c
import mido
mid = mido.MidiFile('etude_25_12_(c)unknown.mid', clip=True)
# mid = mido.MidiFile('nocturne_27_2_(c)inoue.mid', clip=True)
for _ in range(5):
    print(f"{_} : ")
    print(mid.tracks[_])
    print("************************************************************************************")
# for m in mid.tracks[0][:20]:
#     print(m)
tpb = mid.ticks_per_beat
npb = 0
notes = ["C", "C#/D♭", "D", "D#/E♭", "E", "F",
         "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B"]
time_signature = ""
key_signature = ""
npb = 0
time = 0
tempo = 0

# remove error
for i in range(len(mid.tracks)):
    for j in range(200):
        if mid.tracks[i][j].is_meta:
            if mid.tracks[i][j].type == 'time_signature':
                npb = mid.tracks[i][j].notated_32nd_notes_per_beat
        if mid.tracks[i][j].type == 'note_on':
            if mid.tracks[i][j].type == 'note_on':
                temp = 0
                # if first three notes then wrong, need change
                note_name = notes[(mid.tracks[i][j].note-24) % 12]
                note_octave = mid.tracks[i][j].note//12-1
                time += mid.tracks[i][j].time
                beat = time/tpb*npb/8/4
                # if new_mid.tracks[i][j].velocity != 0:
                print(
                    f'{note_name+str(note_octave):<10}{mid.tracks[i][j].time:>12d}{beat:18.8f}{time:8d}')
            temp = 0
            if mid.tracks[i][j].time <= (tpb/npb/4):
                temp = mid.tracks[i][j].time
                mid.tracks[i][j].time = 0
                mid.tracks[i][j+1].time += temp

mid.tracks.remove(mid.tracks[-1])
mid.save('new.mid')

# new
print("\n\nnew")
notes = ["C", "C#/D♭", "D", "D#/E♭", "E", "F",
         "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B"]
time_signature = ""
key_signature = ""
npb = 0
time = 0
tempo = 0
new_mid = mido.MidiFile('new.mid', clip=True)
tpb = new_mid.ticks_per_beat
print(tpb)
for i in range(len(new_mid.tracks)):
    for j in range(200):
        if new_mid.tracks[i][j].is_meta:
            if new_mid.tracks[i][j].type == 'time_signature':
                time_signature = str(
                    new_mid.tracks[i][j].numerator)+"/"+str(new_mid.tracks[i][j].denominator)
                npb = new_mid.tracks[i][j].notated_32nd_notes_per_beat
                pass
            elif new_mid.tracks[i][j].type == 'key_signature':
                key_signature = new_mid.tracks[i][j].key
                pass
            elif new_mid.tracks[i][j].type == 'set_tempo':
                tempo = new_mid.tracks[i][j].tempo
            if tempo != 0 and new_mid.tracks[i][j].type == 'set_tempo':
                print(time_signature, key_signature, tempo, npb)
                print()

        if new_mid.tracks[i][j].type == 'note_on':
            temp = 0
            # if first three notes then wrong, need change
            note_name = notes[(new_mid.tracks[i][j].note-24) % 12]
            note_octave = new_mid.tracks[i][j].note//12-1
            time += new_mid.tracks[i][j].time
            beat = time/tpb*npb/8/4
            # if new_mid.tracks[i][j].velocity != 0:
            print(
                f'{note_name+str(note_octave):<10}{new_mid.tracks[i][j].time:>12d}{beat:18.8f}{time:8d}')
            # print(note_name+str(note_octave),
            #   new_mid.tracks[i][j].time, beat, time)
