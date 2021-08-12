const { Client } = require("@notionhq/client")

/*Create new notion client*/
const notion = new Client({ auth: process.env.NOTION_API_KEY })

/*Helper functions*/
getValueByKey = async (key) => {
    const page = await notion.databases.query({
        database_id: process.env.NOTION_DB_ID,
        filter: {
            property: process.env.NOTION_KEY_ID,
            text: {
                equals: key
            }
        }
    })
    return page.results[0].properties.Value.rich_text[0].text.content
}

/*Export functions*/
exports.getWelcomeMessage = async () => {
    console.log("👉", 'Welcoming...')
    return await getValueByKey("welcomeMessage")
}


