/**
 * 2017年11月8日 星期三
 * Joshua conero
 * 项目主目录， 用于编译整个项目为单一文件
 */
import SStorage from './storage'
import SLocation from './location'
import Dataset from './Dataset'

// 全局属性
// let Surong = {
//     SStorage,
//     SLocation,
//     Dataset
// }

// 全局变量
(<any>window).Surong = {
    SStorage,
    SLocation,
    Dataset
}
