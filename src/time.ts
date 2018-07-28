/**
 * 2018年7月28日 星期六
 * Joshua Conero
 * 时间处理包
 **/
import operation from "./data/operation";

export default class Time{
    /**
     * 数据解析，格式语法同PHP: 2018-07-28 22:19:30
     * @param {string} format
     * @returns {string}
     */
    static date(format?: string): string{
        format = format || 'y-m-d h:i:s';
        let value: string = format;
        let dt = new Date(),
            year: number = dt.getFullYear(),
            month: number = dt.getMonth() + 1,
            date: number = dt.getDate(),
            hour: number = dt.getHours(),
            min: number = dt.getMinutes(),
            sec: number = dt.getSeconds()
            ;

        let quque: string[] = [
            'Y', 'y', 'm', 'n', 'd', 'j',
            'H', 'G', 'h', 'g', 'i', 's',
            'w'
        ];
        quque.forEach((v => {
            if(!v){
                return;
            }
            if(value.indexOf(v) > -1){
                let r: string = '';
                switch (v){
                    case 'Y': r = year + ''; break;                             // 2018
                    case 'y':                                                   // 18
                        r = year + '';
                        r = r.substr(2);
                        break;
                    case 'm': r = (month < 10? '0': '') + month; break;         // 07
                    case 'n': r = month + ''; break;                            // 7
                    case 'd': r = (date < 10? '0':'') + date; break;           // 03 日
                    case 'j': r = date + ''; break;                             // 3 日
                    case 'H': r = (hour < 10? '0':'') + hour; break;            // 02 点
                    case 'G': r = hour + ''; break;                             // 2 点
                    case 'h':
                        let h12:number = (hour > 12? hour-12: hour);
                        r = (h12 < 10? '0':'') + h12;
                        break;
                    case 'g': r = (hour > 12? hour-12: hour) + ''; break;
                    case 'i': r = (min < 10? '0': '') + min + ''; break;
                    case 's': r = (sec < 10? '0':'') + sec + ''; break;
                    case 'w': r = dt.getDay() + ''; break;
                }
                if(r){
                    value = operation.strReplace(v, r, value);
                }
            }
        }));

        return value;
    }
    /**
     *  2017-07-28 23:07:33 => 2017年07月28日
     * @param {string} timeStr 日志字符串
     * @param {*} def
     * @return {string|null}
     */
    static time2ZhFmt(timeStr: string, def: any){
        let reg = /^[\d]{4}-[\d]{2}-[\d]{2}/;
        def = def || '';
        let fmt = def;
        if(timeStr){
            let matchArr = timeStr.match(reg);
            fmt = ('object' == typeof matchArr && matchArr.length > 0)? matchArr[0]: def;
            if(fmt){
                let queue = fmt.split('-');
                fmt = `${queue[0]}年${queue[1]}月${queue[2]}日`;
            }
        }
        return fmt;
    }
}
