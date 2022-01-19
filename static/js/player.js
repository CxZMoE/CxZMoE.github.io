var defaultCover = "img/BILIBILI.jpg"
var customCover = undefined

const ap = new APlayer({
    container: document.getElementById("aplayer"),
    fixed: true,
    theme: "#ffc0cb",
    audio: [{
            name: '手纸 ~拝啓 绪五の君へ~',
            artist: 'Naomile',
            url: '/audio/手纸 ~拝啓 绪五の君へ~.mp3',
            cover: defaultCover
        }, {
            name: 'fuwa.mp3',
            artist: '軽音楽部',
            url: '/audio/fuwa.mp3',
            cover: defaultCover
        },
        {
            name: 'ballpen.mp3',
            artist: '軽音楽部',
            url: '/audio/ballpen.mp3',
            cover: defaultCover
        },
    ]

})