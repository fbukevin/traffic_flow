

var language_set = function(lang){

	switch(lang){
		case 'en':
			return dict_en;
			break;
		default: //keep traditional Chinese
			break;
	}
}

var dict_en = {
	"台北" : "Taipei"
	, "三重" : "Sanchong"
	, "五股及五股轉接道" : "Wugu EXC"
	, "泰山轉接道" : "Taisun EXC"
	, "林口" : "Linkou"
	, "桃園" : "Taoyuan"
	, "機場系統" : "Taoyuan AP."
	, "內壢" : "Neili"
	, "中壢" : "Chungli"
	, "平鎮系統" : "Pingzhen EXC"
	, "幼獅" : "Youth"
	, "楊梅" : "Yangmei"
	, "高架楊梅端" : "Yangmei Terminal"
	, "湖口" : "Hukow"
	, "竹北" : "Chubei"
	, "新竹" : "Hsinchu"
	, "大台北" : "Taipei Zone"
	, "大桃園" : "Taoyuan Zone"
	, "大新竹" : "Hsinchu Zone"
	, "出口總量" : "Total Export"		
};
