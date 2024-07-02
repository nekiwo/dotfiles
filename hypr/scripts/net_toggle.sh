#!/bin/sh

TOGGLE=$HOME/.net_toggle

if [ ! -e $TOGGLE ]; then
    touch $TOGGLE
    nmcli networking on
else
    rm $TOGGLE
    nmcli networking off
fi