[README.md](https://github.com/user-attachments/files/33244498/README.md)
# Torrent Tweaks for Seanime

A small plugin that tidies up anime torrent search results.

- Keeps **Multi Subs** releases by default
- Optionally keeps releases in the subtitle languages you choose
- Falls back to the full list when nothing matches, so you never get an empty page

## Install

In Seanime, open the extensions page and add this manifest URL:

```
https://raw.githubusercontent.com/SaSo-byte/seanime-torrent-tweaks/main/manifest.json
```

## Settings

Open `main.js` and edit the `CONFIG` block at the top:

```js
const CONFIG = {
    keepMultiSubs: true,
    preferredLanguages: ["english", "spanish"],
    fallbackToAll: true,
}
```

Supported language names: english, spanish, portuguese, french, german, italian,
russian, arabic, indonesian, turkish, polish, vietnamese, thai, chinese, korean, japanese.

## Notes

Sorting and color-coding are handled by `style.css`, since Seanime re-sorts
results after plugins run.

## Contributing

Missing a language or a spelling that gets skipped? Open an issue or a PR.
