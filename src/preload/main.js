let config;
let result_ = {};
function __Ctrl() {
    if (window._sharedData.entry_data.ProfilePage !== undefined) {
        config = {
            username: window._sharedData.entry_data.ProfilePage[0].graphql.user.username,
            id: window._sharedData.entry_data.ProfilePage[0].graphql.user.id,
            post_count: window._sharedData.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media.count,
            host: 'Instagram'
        };
        if (location.href.slice(location.href.indexOf('.com/') + 5, -1) === config.username) {
            document.body.insertAdjacentHTML('afterbegin', `<div style="position:fixed;z-index:100;top:0;left:0;"><button onclick="copy()">Copy</button><button onclick="location.reload();" >Reload</button></div>`);
            const main_ = document.querySelector('main');
            main_.insertAdjacentHTML('afterbegin', `<div style="width:100%;"><textarea id="container_" style="font-size:0.03vh;line-height:0.06vh"></textarea></div>`);
            const container_ = document.getElementById('container_');
            result_.post = { title: 'post', urls: [] };
            req_post();
        } else {
            location.reload();
        }
    }
}

function copy() {
    container_.select();
    document.execCommand("Copy");
}


// main functions about posts and reels

async function req_post(after) {
    con = {
        id: config.id,
        first: config.post_count,
    }
    if (after) {
        con.after = after;
    }
    const res = await fetch(`https://www.instagram.com/graphql/query/?query_hash=bfa387b2992c3a52dcbe447467b4b771&variables=${JSON.stringify(con)}`).then(response => response.json());
    res.data.user.edge_owner_to_timeline_media.edges.forEach(function (m) {
        if (m.node.display_url) {
            result_.post.urls.push(m.node.display_url);
        }
        if (m.node.edge_sidecar_to_children) {
            m.node.edge_sidecar_to_children.edges.forEach(function (s) {
                if (s.node.display_url) {
                    result_.post.urls.push(s.node.display_url);
                }
            });
        }
    });
    console.log(result_.post);
    if (res.data.user.edge_owner_to_timeline_media.page_info.end_cursor !== null) {
        req_post(res.data.user.edge_owner_to_timeline_media.page_info.end_cursor);
    } else {
        // after
        req_highlight_data();
    }
}

async function req_highlight_data() {
    con = {
        user_id: config.id,
        include_chaining: true,
        include_reel: true,
        include_suggested_users: true,
        include_logged_out_extras: false,
        include_highlight_reels: true,
        include_live_status: true
    }
    const res = await fetch(`https://www.instagram.com/graphql/query/?query_hash=d4d88dc1500312af6f937f7b804c68c3&variables=${JSON.stringify(con)}`).then(response => response.json());
    ids = []
    res.data.user.edge_highlight_reels.edges.forEach(function (e) {
        result_[e.node.id] = { title: e.node.title, urls: [] };
        ids.push(e.node.id);
    });

    // after
    req_highlight(ids);
}

async function req_highlight(ids) {
    con = {
        reel_ids: [],
        tag_names: [],
        location_ids: [],
        highlight_reel_ids: ids,
        precomposed_overlay: false,
        show_story_viewer_list: true,
        story_viewer_fetch_count: 100,
        story_viewer_cursor: "",
        stories_video_dash_manifest: false
    }
    const res = await fetch(`https://www.instagram.com/graphql/query/?query_hash=90709b530ea0969f002c86a89b4f2b8d&variables=${JSON.stringify(con)}`).then(response => response.json());
    res.data.reels_media.forEach(function (g) {
        g.items.forEach(function (e) {
            result_[g.id].urls.push(e.display_url);
            if (e.video_resources) {
                e.video_resources.forEach(function (e2) {
                    result_[g.id].urls.push(e2.src);
                });
            }
        });
    });

    // after
    container_.innerHTML = `${JSON.stringify({ config: config, data: result_ })}`;
}

__Ctrl();