import App from 'resource:///com/github/Aylur/ags/app.js';
import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Network from 'resource:///com/github/Aylur/ags/service/network.js';
import { exec, execAsync, subprocess } from 'resource:///com/github/Aylur/ags/utils.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';
import { getMediaPanel } from './mediaPanel.js'

const getTime = () => Widget.Button({
    className: 'time',
    onPrimaryClick: (self) => {
        console.log('time')
    },
    child: Widget.Label({
        connections: [
            // this is bad practice, since exec() will block the main event loop
            // in the case of a simple date its not really a problem
            // [1000, self => self.label = exec('date "+%H:%M:%S %b %e."')],
    
            // this is what you should do
            [1000, self => execAsync(['date', '+%a %b %e  %H:%M '])
                .then(date => self.label = date).catch(console.error)],
        ],
    })
})

const getVolume = () => Widget.Box({
    className: 'volume',
    children: [
        Widget.Stack({
            className: 'volume_icon',
            items: [
                ['101', Widget.Icon('audio-volume-overamplified-symbolic')],
                ['67', Widget.Icon('audio-volume-high-symbolic')],
                ['34', Widget.Icon('audio-volume-medium-symbolic')],
                ['1', Widget.Icon('audio-volume-low-symbolic')],
                ['0', Widget.Icon('audio-volume-muted-symbolic')],
            ],
            connections: [[Audio, self => {
                if (!Audio.speaker)
                    return;

                if (Audio.speaker.isMuted) {
                    self.shown = '0';
                    return;
                }

                const show = [101, 67, 34, 1, 0].find(
                    threshold => threshold <= Audio.speaker.volume * 100);

                self.shown = `${show}`;
            }, 'speaker-changed']],
        }),
        Widget.Label({
            className: 'volume_percent',
            connections: [[Audio, self => {
                if (Audio.speaker) {
                    self.label = " " + Math.round(Audio.speaker.volume * 100) + "%";
                }
            }]],
        }),
    ],
});

// const getMedia = () => Widget.Button({
//     className: 'media',
//     onPrimaryClick: (self) => Mpris.getPlayer('').playPause(),
//     onScrollUp: () => Mpris.getPlayer('')?.next(),
//     onScrollDown: () => Mpris.getPlayer('')?.previous(),
//     child: Widget.Label({
//         connections: [[Mpris, self => {
//             const mpris = Mpris.getPlayer('');

//             if (mpris) {
//                 if (mpris.play_back_status == 'Playing') {
//                     self.label = `  ${mpris.trackArtists.join(', ')} - ${mpris.trackTitle}`;
//                 } else {
//                     self.label = `  ${mpris.trackArtists.join(', ')} - ${mpris.trackTitle}`;
//                 }
//             } else {
//                 self.label = 'Nothing is playing';
//             }
//         }]],
//     }),
// });

let mediaToggle = false;
const getMedia = () => Widget.Button({
    className: 'media button',
    onClicked: (self) => {
        console.log(mediaToggle)
        if (!mediaToggle) {
            App.openWindow('media_window')
            App.getWindow('media_window').child.transition = 'slide_down';
            App.getWindow('media_window').child.revealChild = true;
        } else {
            App.closeWindow('media_window')
            App.getWindow('media_window').child.transition = 'slide_up';
            App.getWindow('media_window').child.revealChild = false;
        }
        mediaToggle = !mediaToggle;
    },
    child: Widget.Label({
        connections: [[Mpris, self => {
            const mpris = Mpris.getPlayer('');
    
            if (mpris) {
                let song = `${mpris.trackArtists.join(', ')} - ${mpris.trackTitle}`;
                if (song.length > 50) {
                    song = song.substring(0, 50) + "...";
                }

                if (mpris.play_back_status == 'Playing') {
                    self.label = `  ${song}`;
                } else {
                    self.label = `  ${song}`;
                }
            } else {
                self.label = 'Nothing is playing';
            }
        }]],
    })
});

const getWifi = () => Widget.Button({
    className: 'wifi_button',
    onClicked: (self) => {

    },
    child: Widget.Icon({
        className: 'wifi button',
        binds: [['icon', Network.wifi, 'icon-name']],
    })
})

const getBluetooth = () => Widget.Label({
    className: 'bluetooth button',
    label: '󰂯',
    connections: [[Battery, self => {
        // self.label = Battery.percent + "%";
    }]],
});

const getBattery = () => Widget.Box({
    className: 'battery',
    children: [
        Widget.Icon({
            className: 'battery_icon',
            connections: [[Battery, self => {
                self.icon = `battery-level-${Math.floor(Battery.percent / 10) * 10}-symbolic`;
            }]],
        }),
        Widget.Label({
            className: 'battery_percent',
            connections: [[Battery, self => {
                self.label = Battery.percent + "%";
            }]],
        })
    ],
});

const getPowerButton = () => Widget.Button({
    className: 'power_button button',
    child: Widget.Label({
        className: 'power_label',
        label: '⏻'
    })
});

const getNotifications = () => Widget.Box({
    className: 'notifications',
    children: [
        
    ],
});

// const getLyrics = () => Widget.Label({
//     className: 'lyrics',
//     label: ""
// });

// const lyrics = getLyrics();
// const lyricsProc = subprocess(
//     ['~/.config/ags/scripts/lyrics.sh'], // command to run, in an array just like execAsync
//     (line) => {
//         lyrics.label += "\n" + line;
//         let splitLines = lyrics.label.split('\n')

//         if (splitLines.length > 2) {
//             splitLines = splitLines.splice(1,99)
//         }

//         lyrics.label = splitLines.join('\n');
//         // console.log(lyrics.label)
//     },
//     (err) => logError(err), 
// );

let switchToggle = false;
const getMediaSwitch = () => Widget.Button({
    className: 'media_switch',
    onPrimaryClick: (self) => {
        if (switchToggle) {

        } else {

        }

        switchToggle = !switchToggle;
    },
    child: Widget.Icon({
        
    })
});

const getWsItem = (num) => Widget.Button({
    className: 'ws_button button',
    onPrimaryClick: (self) => execAsync(`hyprctl dispatch workspace ${num}`),
    child: Widget.Label({
        className: 'ws_label',
        justification: 'center',
        truncate: 'middle',
        label: num + ''
    }),
    connections: [
        [Hyprland, self => {
            if (Hyprland) {
                if (Hyprland.active.workspace._id === num) {
                    self.className = 'ws_button ws_active inverted'
                } else {
                    self.className = 'ws_button button'
                }
            }
        }],
    ]
})

const getWs = () => Widget.Box({
    className: 'ws ',
    children: [
        getWsItem(1),
        getWsItem(2),
        getWsItem(3),
        getWsItem(4),
    ],
});

const getCenter = () => Widget.Box({
    className: 'left',
    child: Widget.Box({
        children: [
            getNotifications(),
        ],
    })
});

const getLeft = () => Widget.Box({
    className: 'center',
    children: [
        getWs(),
        getMedia()
    ],
});

const getRight = () => Widget.Box({
    className: 'right',
    halign: 'end',
    children: [
        Widget.Box({
            className: "panel",
            children: [
                getWifi(),
                getBluetooth(),
            ]
        }),
        Widget.Box({
            className: "panel1 button",
            children: [
                getVolume(),
            ]
        }),
        Widget.Box({
            className: "panel2 inverted",
            children: [
                getBattery(),
            ]
        }),
        Widget.Box({
            className: "panel3 inverted",
            children: [
                getTime(),
            ]
        }),
        Widget.Box({
            className: "panel4",
            children: [
                getPowerButton(),
            ]
        }),
    ]
})

export const getBottomBar = ({monitor} = {}) => Widget.Window({
    name: `bar-${monitor}`,
    className: 'bar',
    monitor,
    anchor: ['bottom', 'left', 'right'],
    exclusive: true,
    // margin: [0, 0, -8, 0],
    child: Widget.CenterBox({
        startWidget: getLeft(),
        centerWidget: getCenter(),
        endWidget: getRight(),
    }),
})