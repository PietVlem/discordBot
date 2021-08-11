# discordBot
Created a bot for some automation in our discord server!

## Features
👉 Commands to link to certain files or websites <br>
👉 Birthday announces with data pulled from a google sheets file <br>
👉 Adding a role to people who join the server <br>
👉 Creating polls

### Commands
#### Socials
💻 `?instagram` : Gives you a link to our Instagram page <br>
💻 `?discord` : Gives you a link to our discord server <br>
💻 `?facebook` : Gives you a link to our facebook server <br>

#### Polls
💻 `?poll [question]` : Creates a simple  👍 - 👎 poll <br>
💻 `?custom-poll "[question]" "option 1" "option 2" "option 3"` : Creates a custom poll up to 9 options <br>

#### Other
💻 `?bible` : Gives you a link to our rules

## Get up and running
Create an .env file with following values:
```
#Discord bot ID
TOKEN=[DISCORD_BOT_TOKEN]
#Google spreatsheet ID
MEMBERLIST_SPREADSHEET_ID=[GOOGLE_SPREATSHEET_ID]
#Google keys
GOOGLE_API_CLIENT_EMAIL=[GOOGLE_API_CLIENT_EMAIL]
GOOGLE_API_PRIVATE_KEY=[GOOGLE_API_PRIVATE_KEY]
```

Use `npm run dev` to run the bot on your local machine

## Hosting
This bot is hosted on heroku. This repo is synced and wil automaticly deploy when a new version is pushed to this repo.