/**
 * 2018年1月5日 星期五
 * 端点处理
 */
import {Util} from '../util'
import NodeBase from './NodeBase'

class NodeEndpoint extends NodeBase{
    NodeType: any
    opt: any
    c: any
    label: any
    instance: any
    minWidth: any
    /**
     * 
     * @param {*} instance Raphael 实例
     */
    constructor(instance: any){
        super()
        this.NodeType = 'endpnt'
        this.instance = instance
        this.opt = {}
    }
    /**
     * @param {object} opt / {cx, cy, r, text}
     */
    create(opt: any){
        // 解析类型
        if('object' != typeof opt){
            var param = arguments
            opt = {
                cx: param[0],
                cy: param[1],
                r: param[2]
            }
            if(param[3]){
                opt.text = param[3]
            }
        }
        opt.h = opt.h? opt.h:opt.r
        this.minWidth = opt.r * 2
        this.opt = opt
        // 容器
        this.c = this.instance.ellipse(opt.cx, opt.cy, opt.r, opt.h)     // 椭圆
        // 标签
        var label
        if(opt.text){
            label = this.instance.text(opt.cx, opt.cy, opt.text)
        }else{
            label = this.instance.text(opt.cx, opt.cy)
        }
        this.label = label
        this.resizeByText()
    }
    /**
     * 根据文本宽度自动适应文本的宽度
     */
    resizeByText(){
        if(this.label){
            var box = this.label.getBBox()
            var width = Math.ceil(box.width)
            var w = this.c.attr('rx')
            if(width < this.minWidth && w<this.minWidth){
                return
            }
            // 保持最小宽度
            if(width < this.minWidth){
                width = this.minWidth
            }else{
                width += 2
            }            
            this.opt.r = width/2
            this.resizeByOpt()
        }     
    }
    /**
     * 根据 opt 值的改变重调整容器形状大小
     */
    resizeByOpt(){
        var opt = this.opt
        this.c.attr({
            cx: opt.cx,
            cy: opt.cy,
            rx: opt.r,
            ry: opt.h
        })
    }
    // 外部移动坐标处理， 
    move(x: number, y: number){        
        // 容器移动
        this.c.attr({
            cx: x,
            cy: y
        })
        // 文本联动
        this.label.attr({
            x,y
        })
        // 同步属性
        this.opt.cx = x
        this.opt.cy = y
        /*
        // 直线同步移动
        this.syncLineMove((lnC, type) => {
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                var dP = this.getDp(x, y)
                lnC.attr('path', [
                    ['M', dP.x, dP.y],
                    $fPath[1]
                ])
            }
            else if(type == 'to'){
                var bP = this.getBp(x, y)
                var $tPath = lnC.attr('path')
                lnC.attr('path', [
                    $tPath[0],
                    ['L', bP.x, bP.y]
                ])
            }
        })
        */
    }
    // 直线同步移动
    ToSyncLine(x: number, y: number){
        this.syncLineMove((lnC: any, type: any, $ln:any) => {
            var position = $ln.position
            var methodName      
            if(type == 'from'){
                var $fPath = lnC.attr('path')
                methodName = 'get'+position.from+'p'
                var p1 = this[methodName](x, y)
                $fPath[0] = ['M', p1.x, p1.y],
                lnC.attr('path', $fPath)
            }
            else if(type == 'to'){
                var $tPath = lnC.attr('path')
                methodName = 'get'+position.to+'p'
                var p2 = this[methodName](x, y)
                $tPath[$tPath.length-1] = ['L', p2.x, p2.y];
                lnC.attr('path', $tPath)
            }
        })
    }
    // 箭头同步移动
    ToSyncArrow(x: number, y: number){
        this.syncLineMove((lnC, type, $ln) => {
            var position = $ln.position
            var methodName            
            if(type == 'from'){
                methodName = 'get'+position.from+'p'
                var p1 = this[methodName](x, y)
                $ln.updatePath([p1.x, p1.y])
            }
            else if(type == 'to'){
                methodName = 'get'+position.to+'p'
                var p2 = this[methodName](x, y)
                $ln.updatePath(null, [p2.x, p2.y])
            }
        })
    }
    // 获取连线的起点节点
    getStlnP(position?: string){
        position = position? position: 'D'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    // 获取连线的终点节点
    getEnlnP(position?: string){
        position = position? position: 'B'
        var methodName = 'get' + position + 'p'
        var p = this[methodName]()
        p.position = position
        return p
    }
    getAp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x -= opt.r
        return {x, y}
    }
    getBp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y -= opt.r
        return {x, y}
    }
    getCp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        x += opt.r
        return {x, y}
    }
    getDp(x: number, y: number){
        var opt = this.opt
        x = x? x: opt.cx
        y = y? y: opt.cy
        y += opt.r
        return {x, y}
    }
}

export default NodeEndpoint