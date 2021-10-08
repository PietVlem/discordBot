require('dotenv').config()
const {google} = require('googleapis')
const _ = require('lodash');
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

const googleApiKey = _.replace(process.env.GOOGLE_API_PRIVATE_KEY, new RegExp("\\\\n", "\g"), "\n")

const googleClient = new google.auth.JWT(
    process.env.GOOGLE_API_CLIENT_EMAIL,
    null,
    googleApiKey,
    [
        'https://www.googleapis.com/auth/spreadsheets.readonly'
    ]
)

exports.client = googleClient;