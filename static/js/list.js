function GetNewArticles() {
    var bar = document.getElementById("loadProgress");
    SetProgressBarVisibility(bar, "visible")
    var req = new XMLHttpRequest();
    // 获取最多三个文章
    req.open('GET', "/list/recent?lines=3&mode=restrict", true);
    req.send();
    req.onreadystatechange = function() {
        if (req.readyState == 0)
            SetProgressBar(bar, 0) // 进度条控制

        if (req.readyState == 1)
            SetProgressBar(bar, 25) // 进度条控制
        if (req.readyState == 2)
            SetProgressBar(bar, 50) // 进度条控制
        if (req.readyState == 3)
            SetProgressBar(bar, 75) // 进度条控制

        if (req.readyState == 4 && req.status == 200) {
            var json = req.responseText;
            //console.log(json)
            var ars = JSON.parse(json)
            var content = document.getElementById("new-article-list");

            ars.forEach(element => {
                var newLi = document.createElement("li");
                var newBox = document.createElement("div");
                newBox.className = "box";
                var newBoxTitle = document.createElement("div")
                newBoxTitle.className = "box-title"
                newBoxTitle.style.textAlign = "left"

                var newBoxContent = document.createElement("div")
                newBoxContent.className = "box-content"

                var newTitleLink = document.createElement("a")
                newTitleLink.href = "/articles/" + element.title
                newTitleLink.innerHTML = element.title


                var newModDate = document.createElement("span")
                newModDate.style.fontSize = "12px"
                newModDate.style.lineHeight = "18px"
                newModDate.style.float = "right"
                newModDate.style.marginRight = "5px"
                newModDate.innerHTML = element.modDate

                newBoxContent.innerHTML = marked(element.content)
                newBox.appendChild(newBoxTitle).appendChild(newTitleLink)
                newBox.appendChild(newBoxTitle).appendChild(newModDate)

                newBox.appendChild(newBoxContent)
                newLi.appendChild(newBox)
                content.appendChild(newLi)

                newTitleLink.addEventListener('click', function(e) {
                    e.preventDefault()
                    GetArticle(element.title)
                    PushHisState(element.title.split("." [0]), "/articles/" + element.title) // 历史
                })
            });
            SetProgressBar(bar, 100); // 进度条控制
            setTimeout(function() {
                SetProgressBarVisibility(bar, "hidden")
                SetProgressBar(bar, 0)
            }, 500);
        }
    }
}

// 获取文章列表
function GetArticles() {
    var bar = document.getElementById("loadProgress");
    SetProgressBarVisibility(bar, "visible")
    var req = new XMLHttpRequest();
    // 获取最多三个文章
    req.open('GET', "/list/recent?mode=none", true);
    req.send();
    req.onreadystatechange = function() {
        if (req.readyState == 0)
            SetProgressBar(bar, 0) // 进度条控制

        if (req.readyState == 1)
            SetProgressBar(bar, 25) // 进度条控制
        if (req.readyState == 2)
            SetProgressBar(bar, 50) // 进度条控制
        if (req.readyState == 3)
            SetProgressBar(bar, 75) // 进度条控制

        if (req.readyState == 4 && req.status == 200) {
            var json = req.responseText;
            //console.log(json)
            var ars = JSON.parse(json)
            var content = document.getElementById("box-list");

            ars.forEach(element => {
                var newLi = document.createElement("li");

                var newBox = document.createElement("div");
                newBox.className = "box";

                var newBoxTitle = document.createElement("div")
                newBoxTitle.className = "box-title"

                var newModDate = document.createElement("span")
                newModDate.style.fontSize = "12px"
                newModDate.style.float = "right"
                newModDate.style.marginRight = "5px"
                newModDate.innerHTML = element.modDate
                newBoxTitle.appendChild(newModDate)


                var newBoxContent = document.createElement("div")
                newBoxContent.className = "box-content"

                var newTitleLink = document.createElement("a")
                newTitleLink.href = "/articles/" + element.title
                newTitleLink.innerHTML = element.title

                newBoxContent.innerHTML = marked(element.content)
                newBox.appendChild(newBoxTitle).appendChild(newTitleLink)
                newBox.appendChild(newBoxContent)
                newLi.appendChild(newBox)
                if (content == null) {
                    setTimeout(() => {
                        content = document.getElementById("box-list");
                        content.appendChild(newLi)
                    }, 500);
                } else {
                    content.appendChild(newLi)
                }


                newTitleLink.addEventListener('click', function(e) {
                    e.preventDefault()
                    GetArticle(element.title)
                    PushHisState(element.title.split("." [0]), "/articles/" + element.title) // 历史
                })
            });
            SetProgressBar(bar, 100); // 进度条控制
            setTimeout(function() {
                SetProgressBarVisibility(bar, "hidden")
                SetProgressBar(bar, 0)
            }, 500);
        }
    }
}


// 获取文章内容
function GetArticle(name) {
    var req = new XMLHttpRequest()
    var bar = document.getElementById("loadProgress");
    SetProgressBarVisibility(bar, "visible");

    req.open("GET", "/info/article/" + name, true)
    req.send()

    req.onreadystatechange = function() {
        if (req.readyState == 0)
            SetProgressBar(bar, 0) // 进度条控制

        if (req.readyState == 1)
            SetProgressBar(bar, 25) // 进度条控制
        if (req.readyState == 2)
            SetProgressBar(bar, 50) // 进度条控制
        if (req.readyState == 3)
            SetProgressBar(bar, 75) // 进度条控制

        if (req.status == 200 && req.readyState == 4) {
            var data = JSON.parse(req.responseText)
                //console.log(data)
            LoadArticlePage(data)
            SetProgressBar(bar, 100); // 进度条控制
            setTimeout(function() {
                SetProgressBarVisibility(bar, "hidden")
                SetProgressBar(bar, 0)
            }, 500);
            return data
        }
        return undefined
    }
}


// 加载文章内容页面
function LoadArticlePage(data) {
    //console.log("loadp: " + data)
    if (data == undefined) {
        return
    }
    var title = data.title
        //var content = decodeURIComponent(escape(window.atob(data.content)))
    var content = data.content
        //console.log(content)
    var req = new XMLHttpRequest()
    var html = marked(content)

    req.open("GET", "/static/article.html")
    req.send()
    req.onreadystatechange = function() {
        if (req.status == 200 && req.readyState == 4) {
            var articlePage = req.responseText
            var mainContent = document.getElementsByClassName("right-content")[0]
            mainContent.innerHTML = articlePage
            var aTitle = document.getElementsByClassName("article-title")[0]
            var aContent = document.getElementsByClassName("article-content")[0]
            aTitle.innerHTML = title
            aContent.innerHTML = html


        }
    }

}

// 从服务器 Get 页面
function GetPage(pageName, loadFunc) {
    var req = new XMLHttpRequest();
    req.open("GET", "/static/" + pageName, true);
    //console.log("Get: " + pageName)
    req.send();

    req.onreadystatechange = function() {
        if (req.status == 200 && req.readyState == 4) {
            // Load函数
            if (loadFunc != undefined)
            //  GetPage 回调函数
                loadFunc(req.responseText, undefined, pageName)
            return req.responseText
        } else {
            return undefined
        }
    }
}

// Load Get 到的页面
function LoadPage(text, loadFunc, pageName) {
    var content = document.getElementById("content");
    var rightContent = document.getElementsByClassName("right-content")[0];
    if (rightContent != undefined) {
        rightContent.remove();
    }
    content.innerHTML += text;


    BindLeftNavEvents();
    //setTimeout(CtrlNavHeight, 100);
    //CtrlNavHeight();
    window.addEventListener('resize', function() {
        //CtrlNavHeight();
    })

    if (loadFunc != undefined) {
        loadFunc()
    }

    if (LastPageName == "") {
        LastPageName = "index.html"
    } else {
        LastPageName = pageName
    }

    //console.log("main-page loaded.")
}


// 左侧导航栏高度控制
function CtrlNavHeight() {
    var nav = document.getElementsByClassName("left-nav")[0];
    var rightContent = document.getElementsByClassName("right-content")[0];
    if (nav.clientHeight >= rightContent.clientHeight) {
        rightContent.style.height = nav.clientHeight + 'px';
    } else {
        nav.style.height = rightContent.clientHeight + 'px';
    }
}