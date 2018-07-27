/**
 * 项目测试
 * url
 */

import url from '../../src/browser/url'
import operation from "../../src/data/operation";
import map = Sr.map;

let main = document.querySelector('#main');



// 项目测试如可
class App{
    constructor(){
        main.innerHTML = '';
        this.topComp()
    }
    topComp(){
        let uSelf = new url();
        let div = document.createElement('div');
        div.innerHTML = `
            <h4>当前URL地址解析</h4>
            <table border="1">
                <tr><th>名称</th><th>描述</th><th>值</th></tr>            
                <tr><td>url</td><td>地址</td><td><div>${uSelf.url}</div></td></tr>            
                <tr><td>purl</td><td>地址</td><td><div>${uSelf.purl}</div></td></tr>            
                <tr><td>hash</td><td>锚点</td><td><div>${uSelf.hash}</div></td></tr>            
                <tr><td>search</td><td>查询值</td><td><div>${uSelf.search}</div></td></tr>            
                <tr><td colspan="3">querys/解析值</td></tr>            
                <tr><td colspan="3"><div>${JSON.stringify(uSelf.querys)}</div></td></tr>    
                <tr><td><input class="get"></td><td>查询值</td><td><div class="get">输入值按“enter”查询，“delete” 删除</div></td></tr>           
                <tr><td><input class="del"></td><td>删除值</td><td><div class="del">输入 “k” 删除 url， “~” 等表跳转<</div></td></tr>           
                <tr><td><input class="add"></td><td>添加k-v</td><td><div class="add">输入 “k=v” 更新 url， “~” 等表跳转</div></td></tr>           
            </table>
        `;

        // 查询值
        div.querySelector('input.get').addEventListener('keydown', function (evt: any) {
            //console.log(evt);
            // enter
            if(evt.keyCode == 13){
                let value: string = this.value.trim();
                let sv = uSelf.get(value);
                div.querySelector('div.get').innerHTML = (sv? `${sv},  ${value}=${sv}` : `${value} 参数不存`);
            }else if(46 == evt.keyCode){    // delete
                this.value = ''
            }
        });
        // 更新值
        div.querySelector('input.add').addEventListener('keydown', function (evt: any) {
            //console.log(evt);
            // enter
            if(evt.keyCode == 13){
                let value: string = this.value;
                let idx = value.indexOf('=');
                let isGoto: boolean = false;
                if(idx > -1){
                    let key: string = value.substr(0, idx),
                        v: string = value.substr(idx).trim();
                    if(operation.inArray(key.substr(0, 1), ['~']) > -1){
                        key = key.substr(1);
                        isGoto = true;
                    }
                    let data: map = {};
                    data[key] = v;
                    uSelf.updateByData(data, !isGoto);
                    div.querySelector('div.add').innerHTML = uSelf.newUrl;
                }else {
                    div.querySelector('div.add').innerHTML = '输入值格式有误，使用 “k=v”类型。首字母 ~ 表示跳转.';
                }


            }else if(46 == evt.keyCode){    // delete
                this.value = ''
            }
        });
        // 删除值
        div.querySelector('input.del').addEventListener('keydown', function (evt: any) {
            //console.log(evt);
            // enter
            if(evt.keyCode == 13){
                let value: string = this.value;
                let isGoto: boolean = false;
                let hasKey: any = uSelf.get(value);
                if(hasKey){
                    let key: string = value;
                    if(operation.inArray(key.substr(0, 1), ['~']) > -1){
                        key = key.substr(1);
                        isGoto = true;
                    }
                    uSelf.del(key);
                    uSelf.updateByData({}, !isGoto);
                    div.querySelector('div.del').innerHTML = uSelf.newUrl;
                }else {
                    div.querySelector('div.del').innerHTML = '输入值格式有误， 数据有误。首字母 ~ 表示跳转.';
                }


            }else if(46 == evt.keyCode){    // delete
                this.value = ''
            }
        });
        main.appendChild(div)
    }
}

new App();