Using the shadow strategy from https://github.com/whatwg/html/issues/5484#issuecomment-620481794, you can move a CPO window around without reloading it.

But if you just move it around by appending/removing, it will reload.

Use `python3 -m http.server` to start the server and visit the html files to see. You can change the URL back to the `iframe.html` test file to check load events.