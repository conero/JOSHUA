/**
 * 2018年7月26日 星期四
 * Joshua 总类型
 */
import {LibVersion} from '../version'
import store from './browser/storage/store'

export class Ja{
    static version: string = LibVersion.version
    static author: string = LibVersion.author
} 

export {store}