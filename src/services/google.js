require('dotenv').config()
const {google} = require('googleapis')
const _ = require('lodash');

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