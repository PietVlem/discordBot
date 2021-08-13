const { Client } = require("@notionhq/client")

/*Create new notion client*/
const notion = new Client({ auth: process.env.NOTION_API_KEY })

/*Get the row value by the row key*/
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
    console.log("👉", page.results[0].properties.Value.rich_text[0].text.content)
    return page.results[0].properties.Value.rich_text[0].text.content
}

/*Export functions*/
exports.getWelcomeMessage = async () => {
    console.log("👉", 'Welcoming...')
    return await getValueByKey("welcomeMessage")
}

exports.getNewMemberMessage = async () => {
    console.log("👉", 'New member...')
    return await getValueByKey("newMemberMessage")
}


