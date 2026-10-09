/// Seanime Torrent Tweaks (plugin)
///
/// After every anime torrent search, keep only releases that have multiple subtitles ("Multi Subs").
/// If NONE of the results have multiple subtitles, the full list is shown instead, so the page is never empty.
///
/// Note: AVC/x264 pinning and color-coding is done by style.css, not here.
/// (Seanime re-sorts results on its own after plugins run, so a JS sort would be undone.)

function init() {
    $app.onTorrentSearch((e) => {
        // IMPORTANT: Seanime copies this function as plain text and runs it in a separate engine,
        // so it cannot see anything defined outside it. Keep every helper INSIDE this function.

        // Same rule as Seanime's built-in "Multi Subs" filter: the parsed subtitle tags contain "multi".
        // The name check also catches "Multi-Subs", "MultiSub" and "Multiple Subtitle" that the parser can miss.
        const MULTI_SUBS_NAME = /multi(ple)?[\s._-]*sub/i

        const isMultiSubs = (torrent, meta) => {
            const subs = (meta && meta.metadata && meta.metadata.subtitles) || []
            for (let i = 0; i < subs.length; i++) {
                if (String(subs[i]).toLowerCase().indexOf("multi") !== -1) return true
            }
            return MULTI_SUBS_NAME.test(torrent.name || "")
        }

        try {
            const data = e.searchData
            if (data && data.torrents && data.torrents.length > 0) {
                const total = data.torrents.length
                const metas = data.torrentMetadata || {}
                const keep = (t) => !!t && isMultiSubs(t, metas[t.infoHash])

                const torrents = data.torrents.filter(keep)

                if (torrents.length > 0) {
                    data.torrents = torrents
                    if (data.previews && data.previews.length > 0) {
                        const previews = data.previews.filter((p) => !!p && keep(p.torrent))
                        if (previews.length > 0) data.previews = previews
                    }
                    console.log("[Torrent Tweaks] Multi Subs: kept " + torrents.length + " of " + total + " results")
                } else {
                    // Fallback: nothing has multi subs -> leave the full list untouched.
                    console.log("[Torrent Tweaks] No Multi Subs results, showing all " + total)
                }
            }
        } catch (err) {
            // Never break the search because of this plugin.
            console.log("[Torrent Tweaks] filter skipped: " + err)
        }
        e.next()
    })
}
