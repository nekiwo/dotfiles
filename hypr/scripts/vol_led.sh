#!/bin/sh

card=/dev/snd/hwC1D0
TOGGLE=$HOME/.vol_toggle

if [ ! -e $TOGGLE ]; then
    touch $TOGGLE
    amixer set Master off -c 1
    sudo hda-verb $card 0x20 0x500 0x0b && sudo hda-verb $card 0x20 0x400 0x08
else
    rm $TOGGLE
    amixer set Master on -c 1
    sudo sudo hda-verb $card 0x20 0x500 0x0b && sudo hda-verb $card 0x20 0x400 0x00
fi