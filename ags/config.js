// example content of ~/.config/ags/config.js
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import App from 'resource:///com/github/Aylur/ags/app.js';
import { subprocess, exec } from 'resource:///com/github/Aylur/ags/utils.js';
import { getTopbar } from './js/widgets/topbar.js'
import { getMediaPanel } from './js/widgets/mediaPanel.js'

const css = App.configDir + '/css/style.css';

export default {
    closeWindowDelay: {
        'media_window': 300, // milliseconds
    },
    notificationPopupTimeout: 5000, // milliseconds
    cacheNotificationActions: false,
    maxStreamVolume: 1.5, // float
    style: css,
    windows: [
        getTopbar(),
        getMediaPanel()
    ],
};