/**
 * 2017年11月8日 星期三
 * Joshua Conero
 */

class SLocation{
    // constructor(){}
    // $_GET// URL 解析
	// fname=RDpccGhwc2VydmVyXGFwcFxjb25lcm9cRmlsZXMvX19jYWNoZS9iNjAzYWY1Yzk1NWM1NmYxNGI0ZDYyMzg3MzE3Yzg2NQ== 解析失败
	/**
	 * 解析 url 地址中的 GET 参数
	 * @param {string|undefind} key 键值
	 * @param {string|undefined} url 为空时默认为 location.search
	 * @return {string|JSON}
	 */
    static getQuery(key, url){
        /*
		if('#' == key){
			var hash = location.hash;
			hash = hash.replace(new RegExp('#','g'),'');
			return hash;
		}
		*/
		// 获取描点
		if('#' == key){
			var href = url? url: location.href;
			if(href.indexOf('#')>-1){
				var arr = href.split('#');
				return arr[1];
			}
			return '';
		}
		var ser = location.search;
		if(url){
			var idx = url.indexOf('?');
			ser = idx > -1? url.substr(idx): false;
		}
		if(ser){
			ser = ser.replace('?','');
			ser = ser.replace(new RegExp('=','g'),'":"');
			ser = ser.replace(new RegExp('&','g'),'","');
			ser = '{"'+ser+'"}';
			var GET = JSON.parse(ser);
			if(key){
				if(GET[key]) return GET[key];
				return '';
			}
			return GET;
		}
		return '';
    }
    /**
     * 更新 url 的 get 数据
     * @param {object} json 
     * @param {string} url
     * @return {string}
     */
    static updateUrl(json, url){
        var newUrl = '';
        if('object' != typeof json){
            json = {};
        }
        json = (<any>Object).assign(json, SLocation.getQuery(null, url));
        var urlQueue = [];
        for(var k in json){
            urlQueue.push(k+'='+encodeURI(json[k]));
        }
        if(urlQueue.length > 0){
            newUrl = urlQueue.join('&');
        }
        return newUrl;
    }
    /**
     * 解析url
     * @param {string} url 
     */
    static parseUrl(url){
        var json = {
            hash: '',
            search: '',
            base: ''
        };
        if(url){
            var idx;
            json.hash = (idx = url.indexOf('#')) > -1? url.substr(idx):'';
            json.search = (idx = url.indexOf('?')) > -1? (json.hash? url.substr(idx).replace(json.hash, ''): ''):'';
            json.base = (idx > -1)? url.substr(0, idx):url;
        }
        else{
            json.hash = location.hash;
            json.search = location.search;
            json.base = location.origin + location.pathname;
        }
        return json;
    }
}
export default SLocation