#!/bin/sh

card=/dev/snd/hwC1D0
TOGGLE=$HOME/.mic_toggle

if [ ! -e $TOGGLE ]; then
    touch $TOGGLE
    amixer set Capture off -c 1
    hda-verb $card 0x01 SET_GPIO_MASK 0x04 && sudo hda-verb $card 0x01 SET_GPIO_DIR 0x04 && sudo hda-verb $card 0x01 SET_GPIO_DATA 0x00
else
    rm $TOGGLE
    amixer set Capture on -c 1
    hda-verb $card 0x01 SET_GPIO_MASK 0x04 && sudo hda-verb $card 0x01 SET_GPIO_DIR 0x02 && sudo hda-verb $card 0x01 SET_GPIO_DATA 0x00
fi