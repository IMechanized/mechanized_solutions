import { Express } from 'express'
import { adminAdsStatusUpdateHandler, sellerAdsStatusUpdateHandler, sellerMultipleAdsStatusHandler } from '../../controller/admin/adStatus.controller'
import { requireAdmin, requireSeller } from '../../middlewares/requireUser'


function adStatusRoute(app: Express) {

    // seller ads status update route
    app.put(
        '/api/v1/seller/status/ads/:adId',
        requireSeller,
        sellerAdsStatusUpdateHandler
    )

    // seller multiple ads drafted route
    app.put(
        '/api/v1/seller/multiple/status/ads',
        requireSeller,
        sellerMultipleAdsStatusHandler
    )

    // admin ads status update route
    app.put(
        '/api/v1/admin/status/ads/:adId',
        requireAdmin,
        adminAdsStatusUpdateHandler
    )

}

export default adStatusRoute
