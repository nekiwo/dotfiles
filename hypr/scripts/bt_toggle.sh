#!/bin/sh

TOGGLE=$HOME/.bt_toggle

if [ ! -e $TOGGLE ]; then
    touch $TOGGLE
    rfkill unblock bluetooth
else
    rm $TOGGLE
    rfkill block bluetooth
fi