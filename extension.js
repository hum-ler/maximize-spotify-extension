'use strict';

const Meta = imports.gi.Meta;

let handlerId = 0;

function enable() {
  // Shell.Global: https://gjs-docs.gnome.org/shell01~0.1_api/shell.global
  // Meta.Display: https://gjs-docs.gnome.org/meta8~8_api/meta.display
  // Meta.Window: https://gjs-docs.gnome.org/meta8~8_api/meta.window
  // Meta.MaximizeFlags: https://gjs-docs.gnome.org/meta8~8_api/meta.maximizeflags
  handlerId = global.display.connect('window-created', (_, window) => {
    if (window.get_sandboxed_app_id() === 'com.spotify.Client' &&
      window.can_maximize()) {
      window.maximize(Meta.MaximizeFlags.BOTH);
    }
  });
}

function disable() {
  if (handlerId !== 0) {
    global.display.disconnect(handlerId);
    handlerId = 0;
  }
}
