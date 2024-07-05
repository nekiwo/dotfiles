#!/usr/bin/bash

NC="\033[0m"
BLACK="\033[30m"
RED="\033[31m"
GREEN="\033[32m"
YELLOW="\033[33m"
BLUE="\033[34m"
MAGENTA="\033[35m"
CYAN="\033[36m"
WHITE="\033[37m"

C1=$WHITE
C2=$CYAN


USER=$(whoami)
SPLASH=$(hyprctl splash)
WEATHER=$(curl -s 'https://wttr.in/?format=%c%t&m')

BATTERY_PERCENT=$(cat /sys/class/power_supply/BAT1/capacity)
BATTERY_STATUS=$(cat /sys/class/power_supply/BAT1/status)

MEMORY_USED=$(free -m | awk '$1=="Mem:"{print $3}')
MEMORY_TOTAL=$(free -m | awk '$1=="Mem:"{print $2}')
MEMORY_PERCENT=$(free -m | awk '$1=="Mem:"{print int($3/$2*100.0)}')

DISK_USED=$(df -H | awk '$1=="/dev/nvme0n1p5"{print substr($3, 1, length($3)-1)}') 
DISK_TOTAL=$(df -H | awk '$1=="/dev/nvme0n1p5"{print substr($2, 1, length($2)-1)}')
DISK_PERCENT=$(df -H | awk '$1=="/dev/nvme0n1p5"{print int($3/$2*100.0)}')

UPTIME=$(awk '{print int($1/3600)" hours, "int(($1%3600)/60)" minutes"}' /proc/uptime)

echo -e " 

             
$C1
╭─────┤ Welcome aboard, $USER! ├───────────────────────────────────────╮
│                                                                     │
    $C1󰨄$NC -> $C2$SPLASH
    $C1󰖐$NC -> $C2$WEATHER
    
    $C1󱊣$NC -> $C2$BATTERY_PERCENT% ($BATTERY_STATUS)
    $C1󰍛$NC -> $C2$MEMORY_USED Mb / $MEMORY_TOTAL Mb ($MEMORY_PERCENT%)
    $C1$NC -> $C2$DISK_USED Gb / $DISK_TOTAL Gb ($DISK_PERCENT%)
    $C1$NC -> $C2$UPTIME
$C1│                                                                     │
╰─────┤    $BLACK $RED $GREEN $YELLOW $BLUE $MAGENTA $CYAN $WHITE$C1    ├───────────────────────────────────────╯


"