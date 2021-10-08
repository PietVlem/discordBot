# discordBot
Created a bot for some automation in our discord server!

## Features
👉 Commands to link to certain files or websites <br>
👉 Commands to add and remove certain roles for users (in bulk)<br>
👉 Birthday announces with data pulled from a google sheets file <br>
👉 Announces the volunteers that will be standing behind the bar <br>
👉 Sending messages pulled from Notion with the notion API <br>
👉 Adding a role to people who join the server <br>
👉 Creating polls

### Commands
#### Socials
💻 `?discord` : Gives you a link to our discord server <br>
💻 `?facebook` : Gives you a link to our facebook page <br>
💻 `?instagram` : Gives you a link to our Instagram page <br>
💻 `?website` : Gives you a link to our website

#### Polls
📋 `?poll [question]` : Creates a simple  👍 - 👎 poll <br>
📋 `?custom-poll "[question]" "[option 1]" "[option 2]" "[option 3]"` : Creates a custom poll up to 9 options <br>

#### Admin
👋️ `?new-member [user] [user]` : Creates a new member in our discord (role updates + private msg + announcement member channel) <br>
👋️ `?new-board-member [user] [user]` : Removes all roles from a user and adds 'Bestuurslid'-rol to them <br>
️👋️ `?remove-member [user] [user]` : Removes all roles from a user and adds 'Oud lid'-role to them <br>
👋️ `?check-birthdays` : Forces the bot to check if there are any birthdays today (is also a cron job at 9:00 every day) <br>
👋️ `?check-shifters` : Forces the bot to check for the shifters today (is also a cron job at 12:00 every day)

#### Other
🍻 `?shifters` : Gives you a link to our bar schedule <br>
📖 `?bible` : Gives you a link to our rules

## Get up and running
Create an .env file with following values:
```
#Discord bot ID
TOKEN=[DISCORD_BOT_TOKEN]
JH_SERVER_ID=[JH_DISCORD_SERVER_ID]

#Google keys
GOOGLE_API_CLIENT_EMAIL=[GOOGLE_API_CLIENT_EMAIL]
GOOGLE_API_PRIVATE_KEY=[GOOGLE_API_PRIVATE_KEY]
MEMBERLIST_SPREADSHEET_ID=[GOOGLE_SPREATSHEET_ID]
SHIFTERSLIST_SPREADSHEETS_ID=[GOOGLE_SPREATSHEET_ID]

#Notion
NOTION_API_KEY=[NOTION_API_KEY]
NOTION_DB_ID=[NOTION_DATABASE_ID]
NOTION_KEY_ID=[NOTION_KEY_ID]
NOTION_VALUE_UD=[NOTION_VALUE_ID]
```

Use `npm run dev` to run the bot on your local machine

## Hosting
This bot is hosted on heroku. This repo is synced and wil automaticly deploy when a new version is pushed to the main branch.