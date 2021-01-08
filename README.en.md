# Twitter Likes to Telegram

[![Twitter fetch likes to Telegram](https://github.com/NeverBehave/Tweet2Telegram/actions/workflows/fetchLikes.yml/badge.svg?branch=main)](https://github.com/NeverBehave/Tweet2Telegram/actions/workflows/fetchLikes.yml)

If you are using this repo, don't forget to watch (top right button) to receive further update!

[中文说明](./README.md)

## What 

Retrieve your liked tweet and forward it to designated Telegram Channel/Chat/Group

- Based on Github Action and gist, no external server required
- Support photos, videos and GIFs

## Why

- I am personally using it for collecting/mark tweets to be completely saved on Telegram Channel.
- Also, Telegram's chat export function is much better than twitter's.

## How

Usage:

1. Fork
2. Put all variables declared in `.env.example` to Github `settings -> secrets`

### Prerequisite

- `Twitter API KEY` and `ACCESS TOKEN`
    - Apply and create an APP https://developer.twitter.com/en/portal/dashboard
- Create a `gist` with content `{}`: 
    - https://gist.github.com
    - File name by default is `data.json`
    - E.g. in `https://gist.github.com/NeverBehave/606d7e14436187b4d45e8657fafd40ab`
        - `606d7e14436187b4d45e8657fafd40ab` is the `GIST_ID`
- Apply a Telegram bot and make it join the channel/group you would like to send messages
    - [@Botfather](https://t.me/botfather)
    - To acquire Channel ID, you may forward a message ID to [@JSONDumpBot](https://t.me/JSONDumpBot)
    - `CHANNELBOT` in the project corresponded to Telegram's `BOT_TOKEN` 
- `GIST_TOKEN` should be acquired from [GitHub token](https://github.com/settings/tokens)
    - Please remember to give it gist read/write access, and for security concern, only that option is required.

## Adjustment

### Trigger

- Via Push Commit 
- Run Every 15 minutes, acquire 100 liked tweets
    - If that's not enough, set a higher frequency
- repository_dispatch: `type: fetchLikes`
- workflow_dispatch: manually trigger or via [RESTFUL API](https://docs.github.com/en/rest/reference/actions#create-a-workflow-dispatch-event) 
    - With this option, you may set a shortcut on iOS where a web request is trigger each time you close your twitter client
    - Save unnecessary queries

## Demo

https://t.me/joinchat/T3XZK0WWXrIJ-_BG
