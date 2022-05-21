# https://medium.com/analytics-vidhya/convert-midi-file-to-numpy-array-in-python-7d00531890c
import mido
# mid = mido.MidiFile('etude_25_12_(c)unknown.mid', clip=True)
mid = mido.MidiFile('nocturne_27_2_(c)inoue.mid', clip=True)
for _ in range(5):
    print(f"{_} : ")
    print(mid.tracks[_])
    print("************************************************************************************")
# for m in mid.tracks[0][:20]:
#     print(m)
