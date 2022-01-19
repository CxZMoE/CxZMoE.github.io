# linux下命令行模拟执行媒体键的方法

具体有哪些媒体键可以参见[XF86多媒体键符](https://cxz.moe/archives/10/)  
这里用到的工具是`xdotool`

这个工具在Ubuntu下应该已经自带  
## 安装
我用的是Manjaro(Arch系),所以要执行
``` shell
sudo pacman -S xdotool
```

## 使用
``` shell
# xdotool key <KeyName>
# Like:
xdotool key XF86AudioNext
# 播放下一首歌曲
```

## 用处
有了这个工具我们就可以在脚本中嵌入这个工具的指令变种，可以用这个工具执行X窗口环境的很多操作，目前我只用到了媒体键的操作，但实际上远远不止。
``` shell
$ xdotool --help
Available commands:
  getactivewindow
  getwindowfocus
  getwindowname
  getwindowpid
  getwindowgeometry
  getdisplaygeometry
  search
  selectwindow
  help
  version
  behave
  behave_screen_edge
  click
  getmouselocation
  key
  keydown
  keyup
  mousedown
  mousemove
  mousemove_relative
  mouseup
  set_window
  type
  windowactivate
  windowfocus
  windowkill
  windowclose
  windowmap
  windowminimize
  windowmove
  windowraise
  windowreparent
  windowsize
  windowunmap
  set_num_desktops
  get_num_desktops
  set_desktop
  get_desktop
  set_desktop_for_window
  get_desktop_for_window
  get_desktop_viewport
  set_desktop_viewport
  exec
  sleep
```