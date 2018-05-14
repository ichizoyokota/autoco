const express = require('express')
const app = express()
const request = require('request')
const cheerio = require('cheerio');
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

let server = app.listen(3000, function () {
    console.log('Node.js is listening to PORT:' + server.address().port)
})

const URL_TOP = 'http://www.nichibenren.jp/member_general/lawyerandcorpsearchselect/corpInfoSearchInput/changeBarSearch/';
const URL_SEARCH_DETAIL = 'https://www.nichibenren.jp/member_general/lawyer/lawyerSearchResultsList/showMembersDetailedInfo/';


app.post('/api/top', function (req, res, callback) {
    let token = null;

    request.get({url: URL_TOP}, function (error, response, body) {
        const $ = cheerio.load(body)
        token = $('input[name="org.apache.struts.taglib.html.TOKEN"]').val()
        response.headers['content-type'] = 'application/x-www-form-urlencoded'
        let formdata = {
            'membership_classification': '1',
            'registration_no': req.body.lowerid,
            'org.apache.struts.taglib.html.TOKEN': token
        }

        let cooki = response.headers['set-cookie']

        let headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': cooki
        };

        request.post({url: URL_SEARCH_DETAIL, form: formdata, headers: headers}, function (e, r, body) {
            const $ = cheerio.load(body, {decodeEntities: false})
            let data_table = null
            let tbody = []
            tbody.push($('div.mainCont table').text())
            for (let i = 0; i < tbody.length; i++) {
                data_table = data_table + tbody[i]
            }

            data_table = data_table.replace(/\t/g, '')
            let res_data = data_table.split(/\n/)
            res_data = res_data.filter(function (e) {
                return e !== ''
            })
            res_data = res_data.filter(function (e) {
                return e !== 'null'
            })
            let respose = [{
                '現旧区分': res_data[0],
                '登録番号': res_data[5],
                '会員区分': res_data[6],
                '弁護士会': res_data[8],
                '氏名': res_data[7],
                'ふりがな': res_data[10],
                '性別': res_data[14],
                '事務所名': res_data[16],
                '郵便番号': res_data[18],
                '事務所住所': res_data[20],
                '電話番号': res_data[22],
                'FAX番号': res_data[24]
            }]

            res.header('Content-Type', 'application/json; charset=utf-8')
            res.send(JSON.stringify(respose))
        })

    });

})






