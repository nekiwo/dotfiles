import Mpris from 'resource:///com/github/Aylur/ags/service/mpris.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Battery from 'resource:///com/github/Aylur/ags/service/battery.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import { exec, execAsync, subprocess } from 'resource:///com/github/Aylur/ags/utils.js';
import Hyprland from 'resource:///com/github/Aylur/ags/service/hyprland.js';

export const getMediaPanel = () => Widget.Window({
    name: 'media_window',
    className: 'media_panel',
    popup: true,
    visible: false,
    focusable: false,
    exclusive: true,
    anchor: ['left', 'top'],
    child: Widget.Revealer({
        revealChild: false,
        transitionDuration: 300,
        transition: 'slide_down',
        child: Widget.Box({
            className: 'media_panel',
            children: [
                Widget.Box({
                    className: 'player',
                    children: [
                        Widget.Box({
                            className: 'player_cover',
                        }),
                        Widget.Box({
                            className: 'player_content',
                            children: [
                                Widget.Label({
                                    className: 'player_song',
                                    label: 'song name here'
                                }),
                                Widget.Label({
                                    className: 'player_artist',
                                    label: 'song artist(s) here'
                                }),
                                Widget.Box({
                                    className: 'player_timeline',

                                }),
                                Widget.CenterBox({
                                    className: 'player_controls',
                                    startWidget: Widget.Label({

                                    }),
                                    centerWidget: Widget.Box({
                                        children: [
                                            Widget.Button({

                                            }),
                                            Widget.Button({
                                                
                                            }),
                                            Widget.Button({
                                                
                                            })
                                        ]
                                    }),
                                    endWidget: Widget.Label({
                                        
                                    })
                                })
                            ]
                        })
                    ]
                })
            ]
        }),
    })
})