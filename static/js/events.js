function BindTopNavEvents() {
    var topBavs = document.getElementsByClassName("nav-item");


    var i = 0;
    for (i; i < topBavs.length; i++) {
        if (topBavs[i].tagName == "INPUT")
            continue
        var linker = topBavs[i].childNodes[0];


        //console.log("start bind " + i);
        //console.log("添加事件")

        function toPageHandler(e) {


            var to = e.target.getAttribute("href").split("/")[1] // 获取要前往的页面名字
                //console.log(to)
                //console.log("to: ", to)
            if (e.target.innerText == "文章") {
                e.preventDefault()
                GetPage(to, LoadPage)
                GetArticles()
                PushHisState("/" + to.split(".")[0], to)
            } else if (e.target.innerText == "首页") {
                e.preventDefault()
                GetPage(to, function(text, loadFunc, pageName) {
                    LoadPage(text, undefined, "/index.html");
                    GetNewArticles()
                });
                PushHisState("/" + to.split(".")[0], "/index.html")
            } else {
                //GetPage(to, LoadPage)
            }
        }
        linker.removeEventListener('click', toPageHandler);
        linker.addEventListener('click', toPageHandler);
        //linker.setAttribute("href", "#");
        //console.log(linker);
    }
    //console.log(navs)
}


// 左侧导航栏事件绑定
function BindLeftNavEvents() {
    var topBavs = document.getElementsByClassName("left-nav-item");


    var i = 0;
    for (i; i < topBavs.length; i++) {
        if (topBavs[i].tagName == "INPUT")
            continue
        var linker = topBavs[i].childNodes[0];


        //console.log("start bind " + i);
        //console.log("添加事件")

        function toPageHandler(e) {


            var to = e.target.getAttribute("href").split("/")[1] // 获取要前往的页面名字
                //console.log(to)
                //console.log("to: ", to)
            if (e.target.innerText == "文章") {
                e.preventDefault()
                GetPage(to, LoadPage)
                GetArticles()
                PushHisState("/" + to.split(".")[0], to)
            } else if (e.target.innerText == "首页") {
                e.preventDefault()
                GetPage(to, function(text, loadFunc, pageName) {
                    LoadPage(text, undefined, "/index.html");
                    GetNewArticles()
                });
                PushHisState("/" + to.split(".")[0], "/index.html")
            } else {
                //GetPage(to, LoadPage)
            }
        }
        linker.removeEventListener('click', toPageHandler);
        linker.addEventListener('click', toPageHandler);
        //linker.setAttribute("href", "#");
        //console.log(linker);
    }
    //console.log(navs)
}