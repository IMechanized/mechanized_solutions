import { findAllAdAlerts } from "../service/adAlert.service"
import { searchAdByAlert } from "../service/ads.service"
import { sendNotificationEmail } from "./nodeMailer"

var cron = require('node-cron')

const cronAdsAlert = function () {
    try {
        // Daily Ad ALert 
        adsAlertFunction('0 0 0 * * *', 'Daily', 'today')

        // Weekly Ad ALert 
        adsAlertFunction('0 0 0 * * 0', 'Weekly', 'in this week')

        // Fortnightly Ad ALert 
        adsAlertFunction('0 0 0 */15 * 0', 'Fortnightly', 'fortnightly')

        // Monthly Ad ALert 
        adsAlertFunction('0 0 0 1 * *', 'Monthly', 'in this month')

    } catch (e) {
        throw e
    }
}

//  Sending email and notification function 
const adsAlertFunction = (schedule: any, queryTime: any, day: any) => {
    cron.schedule(schedule, async () => {
        const query = {
            emailFrequency: queryTime,
            active: true
        }
        const adAlerts = await findAllAdAlerts(query)
        if (adAlerts.length !== 0) {
            adAlerts.map(async (singleAlert, index) => {
                const alertAds = await searchAdByAlert(singleAlert)
                const emailData = {
                    senderAddress: 'Meta-Ads Ads Alerts',
                    senderEmail: 'info@metaads.com',
                    subject: 'Ads Alert',
                    message: `You have got ${alertAds.length} ads results ${day}`,
                    emailType: 'ADS_ALERT',
                    _id: singleAlert?._id,
                }
                const inputEmailData = {
                    userEmail: singleAlert?.user?.email,
                    emailData: emailData,
                    emailType: 'ADS_ALERT',
                    userId: singleAlert?.user?._id,
                }
                await sendNotificationEmail(inputEmailData)
            })
        }

    })
}

export default cronAdsAlert