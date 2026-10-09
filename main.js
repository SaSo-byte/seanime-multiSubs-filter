/// Seanime Multi-Subs Filter
///
/// Keep releases identified as Multi Subs. If none match, leave the search results unchanged.

function init() {
    $app.onTorrentSearch((e) => {
        // Seanime may run this callback as a standalone function, so keep its helpers local.
        const MULTI_SUBS_NAME = /multi(ple)?[\s._-]*sub/i

        const isMultiSubs = (torrent, metadata) => {
            const subtitles = metadata && metadata.subtitles
            const subtitleList = Array.isArray(subtitles) ? subtitles : [subtitles]

            for (let i = 0; i < subtitleList.length; i++) {
                if (String(subtitleList[i] || "").toLowerCase().indexOf("multi") !== -1) {
                    return true
                }
            }

            return MULTI_SUBS_NAME.test(String((torrent && torrent.name) || ""))
        }

        try {
            const data = e.searchData
            if (data && Array.isArray(data.torrents) && data.torrents.length > 0) {
                const total = data.torrents.length
                const metas = data.torrentMetadata || {}
                const keep = (torrent) => {
                    if (!torrent) return false
                    const metadata = metas[torrent.infoHash]
                    return isMultiSubs(torrent, metadata && metadata.metadata)
                }

                const torrents = data.torrents.filter(keep)

                if (torrents.length > 0) {
                    data.torrents = torrents
                    if (Array.isArray(data.previews)) {
                        data.previews = data.previews.filter((preview) => keep(preview && preview.torrent))
                    }
                    console.log("[Multi-Subs Filter] Kept " + torrents.length + " of " + total + " results")
                } else {
                    // Fallback: nothing has multi subs -> leave the full list untouched.
                    console.log("[Multi-Subs Filter] No matching results; showing all " + total)
                }
            }
        } catch (err) {
            // Never break the search because of this plugin.
            console.log("[Multi-Subs Filter] Filter skipped: " + err)
        }
        e.next()
    })
}
