# https://medium.com/analytics-vidhya/convert-midi-file-to-numpy-array-in-python-7d00531890c
import mido
mid = mido.MidiFile('new.mid', clip=True)
# mid = mido.MidiFile('nocturne_27_2_(c)inoue.mid', clip=True)
# for _ in range(5):
#     print(f"{_} : ")
#     print(mid.tracks[_])
#     print("************************************************************************************")
# for m in mid.tracks[0][:20]:
#     print(m)
tpb = mid.ticks_per_beat
print(tpb)
press_and_release = []*109
# print(mid.tracks[1])
# ♭
notes = ["C", "C#/D♭", "D", "D#/E♭", "E", "F",
         "F#/G♭", "G", "G#/A♭", "A", "A#/B♭", "B"]
time_signature = ""
key_signature = ""
npb = 0
time = 0
tempo = 0
for i in range(len(mid.tracks)):
    print("track:", i)
    for j in range(100):
        if mid.tracks[i][j].is_meta:
            if mid.tracks[i][j].type == 'time_signature':
                time_signature = str(
                    mid.tracks[i][j].numerator)+"/"+str(mid.tracks[i][j].denominator)
                npb = mid.tracks[i][j].notated_32nd_notes_per_beat
                pass
            elif mid.tracks[i][j].type == 'key_signature':
                key_signature = mid.tracks[i][j].key
                pass
            elif mid.tracks[i][j].type == 'set_tempo':
                tempo = mid.tracks[i][j].tempo
            if tempo != 0 and mid.tracks[i][j].type == 'set_tempo':
                print(time_signature, key_signature, tempo, npb)

        if mid.tracks[i][j].type == 'note_on':
            temp = 0
            # if first three notes then wrong, need change
            note_name = notes[(mid.tracks[i][j].note-24) % 12]
            note_octave = mid.tracks[i][j].note//12-1

            # if mid.tracks[i][j].time <= (tpb/npb/4):
            #     temp = mid.tracks[i][j].time
            #     mid.tracks[i][j].time = 0
            #     mid.tracks[i][j+1].time += temp
            time += mid.tracks[i][j].time
            beat = time/tpb*npb/8/4
            # if  != 0:
            print(note_name+str(note_octave),
                  mid.tracks[i][j].velocity, mid.tracks[i][j].time)
            pass
