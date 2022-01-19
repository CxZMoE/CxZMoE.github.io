var LastPageName = ""

// 页面加载进度条控制
function SetProgressBar(bar, value) {
    bar.value = value;

}

// 进度条初始化函数
function ProgressBarInit() {
    var bar = document.getElementById("loadProgress");
    SetProgressBar(bar, 0);
    bar.style.visibility = "hidden";
}

// 进度条可视化设置函数
function SetProgressBarVisibility(bar, visibility) {
    bar.style.visibility = visibility;
}


// 搜索条初始化函数
function InitSearchBar() {

    // 创建搜索预览框
    function makeSearchBox(width, height, X, Y) {
        var box = document.createElement("div")
            //box.style.visibility = "hidden"
        box.style.position = "absolute"
        box.style.height = height
        box.style.width = width
        box.style.backgroundColor = "rgba(135, 207, 235, 0.6)"
        box.style.left = X + "px"
        box.style.top = Y + "px"
        box.style.overflowX = "hidden"
        box.style.overflowY = "auto"
        return box
    }

    var search = document.getElementById("searchBar")
    var searcher = document.getElementById("searcher")
    search.setAttribute("maxLength", "50")
    var rect = search.getBoundingClientRect()

    let x = rect.x
    let y = rect.y
    let width = rect.width
    var box = makeSearchBox("0px", "100px", x, y)




    searcher.appendChild(box)
    searchBarDisplayHandler = function() {
        var rect = search.getBoundingClientRect()
        let x = rect.x
        let y = rect.y
        width = rect.width
        box.style.left = x + "px"
        box.style.top = y + 30 + "px"
    }

    search.addEventListener("focus", function() {
        box.style.width = width + "px"
        setInterval(searchBarDisplayHandler, 500);
    })
    search.addEventListener("blur", function() {
        box.style.width = "0px"
        clearInterval(searchBarDisplayHandler)
    })
    search.addEventListener("input", function(e) {
        var req = new XMLHttpRequest()
        req.open("GET", "/search?words=" + e.target.value, true)
        req.send()
        req.onreadystatechange = function(e) {
            if (req.readyState == 4 && req.status == 200) {
                //console.log(req.responseText)
                var json = JSON.parse(req.responseText)
                if (json != null) {
                    box.innerHTML = ""

                    var ul = document.createElement("ul")
                    ul.className = "search-list"
                    json.forEach(element => {
                        var li = document.createElement("li")
                        li.className = "search-item"
                        li.innerHTML = (element.name)
                        ul.appendChild(li)

                        var seperator = document.createElement("div")
                        seperator.className = "seperator-linear"
                        ul.appendChild(seperator)

                        var listenFunc = function(e) {
                            LoadArticlePage(GetArticle(e.target.innerHTML))
                            box.style.width = "0px"

                            // 历史
                            PushHisState(e.target.innerHTML.split(".")[0], "/" + e.target.innerHTML)
                        }
                        li.removeEventListener('click', listenFunc)
                        li.addEventListener("click", listenFunc)
                    });
                    box.appendChild(ul)
                }

            }
        }

    })

}

// PushHisState 添加历史记录
function PushHisState(title, url) {
    var state = {
        title: title,
        url: url
    }

    if (url == "home.html")
        state.url = "index.html"
        //console.log("Push State: " + JSON.stringify(state))
    window.history.pushState(state, title, url)
}

PushHisState("cxz之家", "/index.html")

// 初始化页面 main-wrapper Padding
var body = document.getElementsByTagName("body")[0]
var mw = document.getElementsByClassName("main-wrapper")[0]
    //sizeHandler
    //console.log(body.offsetWidth)
var sizeHandler = function(e) {
    //console.log(body.offsetWidth)
    //alert("load")

}
setInterval(() => {
    if (body.offsetWidth > 630) {
        //alert(213)
        var leftnav = document.getElementsByClassName("left-nav")[0]
        var right = document.getElementsByClassName("right-content")[0]
        mw.style.margin = "10px 130px"

        leftnav.style.display = 'inline-block'
        right.style.display = "inline-block"
        right.style.margin = "5px 10px"
        right.style.width = "calc(85% - 50px)"
    } else {
        var cw = document.getElementsByClassName("content-wrapper")[0]
        var leftnav = document.getElementsByClassName("left-nav")[0]
        var right = document.getElementsByClassName("right-content")[0]

        leftnav.style.display = 'none'
        right.style.display = "block"
        right.style.margin = "5px"
        right.style.width = "auto"
        mw.style.margin = "10px 10px"
    }
}, 150);

// 初始化进度条
ProgressBarInit();

// 搜索框初始化
InitSearchBar();

// 上一页按钮控制
window.addEventListener('popstate', function(e) {
    var pageFileSplt = e.state.url.split("/")
    var pageFile = pageFileSplt[pageFileSplt.length - 1]
        //this.console.log("file:" + pageFile)
        //this.console.log(LastPageName)
        //this.console.log("本网站不适用于返回上一页，请在网页内进行操作。")
        //console.log("location: " + document.location + ", state: " + JSON.stringify(e.state));
    if (pageFile == "index.html") {
        GetPage("home.html", function(text, loadFunc, pageName) {
            //console.log(pageName)
            LoadPage(text, undefined, "index.html");
            GetNewArticles()
        });
    } else if (pageFile == "list.html") {
        GetPage("list.html", LoadPage)
        GetArticles()
    } else {
        GetArticle(pageFile)
    }
    //PushHisState()
})