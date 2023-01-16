算每一小格的拍子數: (tick/(tick per beat)*(32 per beat))*(time_signature_denominator(分母)/4)
                        beat                                    一小格是幾分音符
                              幾個 1/32 notes

unit = u
tick per beat = tpb

see anthemscore for reference
first part of web design:
    1. find/make piano image 
    2. make grid and timeline
        how to know beat: see time_signature_denominator, which means one measure has how many beats
        blue line: measure(小節), need to mark which beat
        white line: beats, need to mark which beat
        gray dotted line: 1/4 beats
    3. make note bars
        need to mark note and which octave ex: C4
        optional:
            mark how many beats the note lasts
        note bar length = (velocity=0's time(u:tick) - velocity!=0's time(u:tick))/tpb*(32 per beat))*(time_signature_denominator(分母)/4)
    4. scroll bar
second part of web design(edit notes):
    1. make note bar on click
    2. resizeable note bar(resize per small box ex: 2->3.5 => 2->4, 4->2.9 => 4->3)
third part(import):
    1. import midi


optional(dream):
    1. selection pane
    2. database(like youtube but for midi)