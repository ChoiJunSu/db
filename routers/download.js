'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
const wrapper = require('../modules/wrapper');
const db = require('../modules/db');
const zip = require('express-zip');

// 외부 포트폴리오 다운로드 - session id
router.get('/outer_portfolio/freelancer', wrapper.asyncMiddleware(async (req, res, next) => {
    const id = req.session.user_id;
    const queryResult = await db.select({
        from: 'OUTER_PORTFOLIO',
        what: ['CONTENT'],
        where: {
            F_ID: id
        }
    });
    res.download('.' + queryResult[0]['CONTENT'], queryResult[0]['CONTENT'].split('/')[-1]);
}));

// 외부 포트폴리오 다운로드 - F_ID
router.get('/outer_portfolio/client', wrapper.asyncMiddleware(async (req, res, next) => {
    const id = req.query.fId;
    const queryResult = await db.select({
        from: 'OUTER_PORTFOLIO',
        what: ['CONTENT'],
        where: {
            F_ID: id
        }
    });
    res.download('.' + queryResult[0]['CONTENT'], queryResult[0]['CONTENT'].split('/')[-1]);
}));

// 의뢰 문서 다운로드 - R_NUM
router.get('/req_doc', wrapper.asyncMiddleware(async (req, res, next) => {
    const rNum = req.query.rNum;
    const i = req.query.i;
    const queryResult = await db.select({
        from: 'REQ_DOC',
        what: ['FILE'],
        where: {
            R_NUM: rNum
        }
    });
    res.download('.' + queryResult[i]['FILE'], queryResult[i]['FILE'].split('/')[-1]);
}));

// 의뢰 완료 리포트 다운로드 - R_NUM
router.get('/report', wrapper.asyncMiddleware(async (req, res, next) => {
    const rNum = req.query.rNum;
    const queryResult = await db.select({
        from: 'REQUEST',
        what: ['REPORT'],
        where: {
            R_NUM: rNum
        }
    });
    res.download('.' + queryResult[0]['REPORT'], queryResult[0]['REPORT'].split('/')[-1]);
}));

// 의뢰 완료 리포트 다운로드 - R_NUM
router.get('/report', wrapper.asyncMiddleware(async (req, res, next) => {
    const rNum = req.query.rNum;
    const queryResult = await db.select({
        from: 'REQUEST',
        what: ['REPORT'],
        where: {
            R_NUM: rNum
        }
    });
    res.download('.' + queryResult[0]['REPORT'], queryResult[0]['REPORT'].split('/')[-1]);
}));

module.exports = router;