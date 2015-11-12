
var data = [
  { "source":'大台北', "target": '台北', "value": 85.823},
  { "source":'大台北', "target": '三重', "value": 25.207},
  { "source":'大台北', "target": '五股及五股轉接道', "value": 106.324},
  { "source":'大台北', "target": '林口', "value": 185.601},
  { "source":'台北', "target": '出口總量', "value": 85.823},
  { "source":'三重', "target": '出口總量', "value": 25.207},
  { "source":'五股及五股轉接道', "target": '出口總量', "value": 106.324},
  { "source":'林口', "target": '出口總量', "value": 185.601},
  { "source":'大桃園', "target": '桃園', "value": 106.026},
  { "source":'大桃園', "target": '機場系統', "value": 71.968},
  { "source":'大桃園', "target": '內壢', "value": 74.940 },
  { "source":'大桃園', "target": '中壢', "value": 58.434},
  { "source":'大桃園', "target": '平鎮系統', "value": 50.973},
  { "source":'大桃園', "target": '幼獅', "value":  16.651},
  { "source":'大桃園', "target": '楊梅', "value":  8.515},
  { "source":'桃園', "target": '出口總量', "value": 106.026},
  { "source":'機場系統', "target": '出口總量', "value":  71.968},
  { "source":'內壢', "target": '出口總量', "value": 74.940 },
  { "source":'中壢', "target": '出口總量', "value": 58.434},
  { "source":'平鎮系統', "target": '出口總量', "value":50.973 },
  { "source":'幼獅', "target": '出口總量', "value":  16.651},
  { "source":'楊梅', "target": '出口總量', "value": 8.515 },
  { "source":'大新竹', "target": '湖口', "value":56.198  },
  { "source":'大新竹', "target": '竹北', "value":-153.426  }, // negative?
  { "source":'湖口', "target": '出口總量', "value": 56.198 },
  { "source":'竹北', "target": '出口總量', "value":-153.426  } // negative?
    ];

// 太多資料會有 <rec> 屬性給值是負值的問題，請到 customized 調高 height
