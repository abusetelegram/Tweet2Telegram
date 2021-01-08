# Twitter Likes to Telegram

原项目：https://github.com/NeverBehave/Tweet2Telegram/ 于 9 月 12 日被 Ban，本仓库仅做存档目的。

再见，小蓝鸟！

> GitHub (GitHub Support)
> Sep 19, 2023, 9:32 AM UTC
> Hi,
> Thanks for reaching out. Your repository was actioned due to violation of the following policies found in our Acceptable Use Policies:

> We do not allow content or activity on GitHub that is:
>
> • using GitHub as a platform for propagating abuse on other platforms;
> Please also note our additional terms related to Actions usage:

> Additionally, regardless of whether an Action is using self-hosted runners, Actions should not be used for:
>
> • any activity that places a burden on our servers, where that burden is disproportionate to the benefits provided to users

> Because of the nature and volume of the prohibited activity, we will not be reinstating your repository.

[![Twitter fetch likes to Telegram](https://github.com/NeverBehave/Tweet2Telegram/actions/workflows/fetchLikes.yml/badge.svg?branch=main)](https://github.com/NeverBehave/Tweet2Telegram/actions/workflows/fetchLikes.yml)

如果你在使用, 记得点击右上角 Watch, 获取后续功能更新

[English Readme](./README.en.md)

## What

获取点赞推文内容, 发送到指定 Telegram 群/频道/私聊

- 基于 Github Action 和 Gists, 无需外置服务器
- 支持获取图片, 视频, GIF

## Why

类似与收藏, 希望所有的点赞内容可以**完整的**转发到一个频道(不只是链接)

Telegram 的导出功能也比 Twitter 舒服

## How

使用方式:

1. Fork
2. `.env.example` 所有变量, 填写进项目 `settings -> secrets`

### Prerequisite

- `Twitter API KEY` 和 `ACCESS TOKEN`
  - 申请并创建一个 APP https://developer.twitter.com/en/portal/dashboard
- 创建一个内容为 `{}` 的 `gist`:
  - https://gist.github.com
  - 文件名默认为 `data.json`
  - 比如`https://gist.github.com/NeverBehave/606d7e14436187b4d45e8657fafd40ab`中
    - `606d7e14436187b4d45e8657fafd40ab` 就是 `GIST_ID`
- 申请一个 Telegram Bot 并加入你想要发送的群/频道
  - [@Botfather](https://t.me/botfather)
  - 获取频道 ID, 转发一条频道消息到 [@JSONDumpBot](https://t.me/JSONDumpBot)
  - `CHANNELBOT`变量对应的是 `BOT_TOKEN`
- `GIST_TOKEN` 为 [GitHub token](https://github.com/settings/tokens)
  - 需要把相应(gist read/write)的选项勾上

## Adjustment

### Trigger

- Push
- 每 15 分钟运行一次, 每次获取 100 条
  - 真的真的不会有人一口气搞那么多吧
  - 不够用就加快频率吧
- repository_dispatch: `type: fetchLikes`
- workflow_dispatch: 手动触发或使用 [RESTFUL API](https://docs.github.com/en/rest/reference/actions#create-a-workflow-dispatch-event) 触发
  - 可以配合 iOS 捷径在推特客户端开启/关闭时调用，节约资源

## Demo

https://t.me/joinchat/T3XZK0WWXrIJ-_BG
