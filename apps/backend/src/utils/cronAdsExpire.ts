import AdsModel from '../models/ads.model'
import { createEmail, findEmailByEmailType } from '../service/admin/email.service'
import { sendNotificationEmail } from './nodeMailer'

var cron = require('node-cron')

const expireAds = function () {
    const query = {
        'status.isActive': true,
        expireAt: {
            $lt: new Date(Date.now()),
        },
    }

    try {
        cron.schedule('0 0 0  *  *  *', async () => {
            //  find the expired status from ads models
            const adsToExpire = await AdsModel.find(query).populate('user', ['email'])

            if (adsToExpire.length !== 0) {
                const adsIds = adsToExpire.map(ads => ads._id)
                const updatedStatus = await AdsModel.updateMany({
                    _id: {
                        $in: adsIds,
                    },
                    'status.isActive': true,
                }, {
                    $set: {
                        'status.isActive': false,
                    },
                })

                // send email to the every that ads expired
                adsToExpire.map(async (singleAd, index) => {
                    let expiredAdsResult
                    expiredAdsResult = await findEmailByEmailType('ADS_EXPIRED')
                    if (expiredAdsResult.length === 0) {
                        const templateInput = {
                            senderAddress: 'Meta Ads',
                            subject: 'Your Ad is Expired',
                            message: 'Sorry..!! Your Ad is Expired',
                            emailType: 'ADS_EXPIRED',
                        }
                        await createEmail(templateInput)
                        expiredAdsResult = await findEmailByEmailType('ADS_EXPIRED')
                    }
                    const expiredJobData = expiredAdsResult[0]

                    const expiredInput = {
                        userEmail: singleAd?.user?.email,
                        emailData: expiredJobData,
                        userId: singleAd?.user?._id,
                        emailType: 'ADS_EXPIRED',
                    }
                    await sendNotificationEmail(expiredInput)
                })

            }

        })
    } catch (error) {
        throw error
    }

}
export default expireAds
