# Seanime Multi-Subs Filter

Filter Seanime anime torrent search results to make releases with multiple subtitles easier to find.

The plugin keeps releases identified as **Multi Subs**. If no results match, it leaves the full list visible instead of showing an empty page.

## Install

1. Open **Extensions** in Seanime.
2. Choose the option to install an extension from a manifest URL.
3. Paste this URL:

   ```text
   https://raw.githubusercontent.com/SaSo-byte/seanime-multiSubs-filter/main/manifest.json
   ```

4. Confirm the installation and make sure the extension is enabled.
5. Search for an anime torrent. Matching releases are filtered automatically.

## How it works

- Checks subtitle metadata and release names for Multi Subs indicators.
- Keeps matching results and their corresponding previews.
- Shows all results unchanged when none are identified as Multi Subs.
- Does not require configuration; there is no `CONFIG` block to edit.

Seanime controls the order of search results. This plugin filters the results but does not sort them.

## Optional styling

`style.css` is a separate stylesheet; it is **not loaded by the plugin manifest**. If you use Seanime's custom CSS/theme setup, you can add the contents of this file there to color-code torrent cards by video encode, move AVC releases ahead of other cards, and highlight remux or best-quality releases. The stylesheet is optional and does not affect filtering.

## Troubleshooting

- **The extension does not install:** Check that Seanime can access the manifest URL above and that the extension is enabled.
- **A Multi Subs release is missing:** The filter relies on subtitle metadata or a Multi Subs phrase in the release name. If neither identifies it, the plugin cannot match it.
- **No releases match:** The plugin falls back to the full list, so search results should remain visible.
- **Styling has no effect:** Confirm that `style.css` was added through your custom CSS/theme setup; installing the plugin alone does not load it.

## Contributing

If you find a release naming pattern the filter should recognize, open an issue or pull request with an example.
