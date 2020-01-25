import axios from 'axios'

const zhihuApi = 'https://www.zhihu.com/api/v4/creator/read_count_statistics/answers'
const params = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
        'Cookie': '_zap=2a6192f6-8259-4b94-bc43-1b06544ae81e; _xsrf=JXi8fslKSzS29KMXCgNq448wB2ixkife; d_c0="AJAtdzoSsA-PTudtdA736QeW_N9Apxhv_ds=|1562293976"; __utmv=51854390.100-1|2=registration_date=20150803=1^3=entry_date=20150803=1; tshl=; __utmz=51854390.1575118677.8.6.utmcsr=zhihu.com|utmccn=(referral)|utmcmd=referral|utmcct=/question/297370794/answer/915317569; tst=h; q_c1=ce477c22ff54426e920e78cbd8890319|1576219838000|1562409630000; __utmc=51854390; capsion_ticket="2|1:0|10:1577879404|14:capsion_ticket|44:MDJlMmE2NzhlZWFmNGZkYzgxMGZkM2M5NWEzMGRiOGY=|39f6f173e03c83de4a5250335eb867c529ba2dcb825a3dd92679172e57b9a743"; l_n_c=1; r_cap_id="YjdkMzg0MTYxMGZlNGE1Y2I2ZjM3YzhjZTQ2MmE2NWM=|1577879407|dfa7a2f0fab64a7d569a44482ce404c0d7374cd4"; cap_id="NDMzYWVjNzlmMDI1NDNiMGI4ZmIzZmE4MzdmNjY3Mzk=|1577879407|48f962be18b4bde6b3b935b57758e564f1cc2b8e"; l_cap_id="Y2Y3Y2FkZjM4ZjQ2NDY0NDk5NzI4OTczNTEwZTAxODI=|1577879407|8e7574089bed41290522088445417fe05909fa67"; n_c=1; z_c0=Mi4xUXdQd0FRQUFBQUFBa0MxM09oS3dEeGNBQUFCaEFsVk5kZFg1WGdER1l2SnV4ZEJXS3R3bjFGcl95alE4WVZ6c0Jn|1577879414|2b4b2624a3402f87f5d0b1668418d85ff11d177f; __utma=51854390.1541920326.1562409633.1577441668.1578404833.13; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1578412080,1578475657,1578475736,1578496379; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1578585362; KLBRSID=ed2ad9934af8a1f80db52dcb08d13344|1578585363|1578583884'
    }
}
axios.get(zhihuApi, params)
.then((res) => {
    console.log(res.data);
    // ctx.commit('requestZhihu', res);
}).catch((res) => {
    console.log('error');
})