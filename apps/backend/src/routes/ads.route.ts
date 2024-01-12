import { Express } from 'express';
import {
    createAdHandler,
    deleteAdHandler,
    deleteMultipleAdHandler,
    findAdReportsHandler,
    findAdsHandler,
    findLatestAdsHandler,
    findPrivateAdsHandler,
    findTotalCountHandler,
    getAdBySlugHandler,
    getAdHandler,
    reportAdHandler,
    searchAdsHandler,
    updateAdHandler,
} from '../controller/ads.controller';
import { adsValidate } from '../middlewares/ads.validate';
import requireUser, {
    requireAdmin,
    requireSeller,
} from '../middlewares/requireUser';
import upload from '../utils/multer';
import cors from "cors";

function adsRoute(app: Express) {
    app.use(cors({
        origin: '*',
    }))
    // create an ad
    app.post(
        '/api/v1/user/ads',
        requireSeller,
        upload.fields([
            { name: 'adGallery', maxCount: 10 },
            {
                name: 'adCoverImage',
                maxCount: 1,
            },
            {
                name: 'adVideo',
                maxCount: 1,
            },
        ]),
        adsValidate,
        createAdHandler,
    );

    // get an ad by id
    app.get('/api/v1/user/ads/:adId', getAdHandler);

    //get an ad by slug public api
    app.get('/api/v1/user/slug/ads/:slug', getAdBySlugHandler);

    // find all ads private  (based on user logged in)
    app.get('/api/v1/user/ads', requireUser, findPrivateAdsHandler);

    // find all ads public
    app.get('/api/v1/ads', findAdsHandler);

    //find latest ads public
    app.get('/api/v1/ads/latest', findLatestAdsHandler);

    // update an ad by id
    app.put(
        '/api/v1/user/ads/:adId',
        requireSeller,
        upload.fields([
            { name: 'adGallery', maxCount: 10 },
            {
                name: 'adCoverImage',
                maxCount: 1,
            },
            {
                name: 'adVideo',
                maxCount: 1,
            },
        ]),
        updateAdHandler,
    );

    // Search and Filter ads public api
    app.get('/api/v1/user/search/ads', searchAdsHandler);

    //total count for ads, seller, user
    app.get('/api/v1/public/totalcount', findTotalCountHandler);

    // delete an ad by id
    app.delete('/api/v1/user/ads/:adId', requireUser, deleteAdHandler);

    //delete ads by multiple ids
    app.delete(
        '/api/v1/user/multiselect/ads',
        requireUser,
        deleteMultipleAdHandler,
    );

    // report an ad by id
    app.put('/api/v1/user/report/ads/:adId', requireUser, reportAdHandler);

    // find reports of an ad by id
    app.get(
        '/api/v1/user/report/ads/:adId',
        requireAdmin,
        findAdReportsHandler,
    );
}

export default adsRoute;
