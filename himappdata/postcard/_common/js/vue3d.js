Vue.component("v3d", {
    template: "<div :class=\"{'h3d-object':true}\" :style=\"styles\"><slot></slot></div>",
    props: ["x", "y", "z", "w", "h", "rx", "ry", "rz","texture"],
    data: function () {
        return {
            ix: 0,
            iy: 0,
            iz: 0,
            iw: 100,
            ih: 100,
            irx: 0,
            iry: 0,
            irz: 0,
            transformText:"1",
            styles: {
                width:"",
                height:"",
                transform:"",
                backgroundImage:""
            }
        };
    },
    methods:{
        updateTransform:function(){
            this.styles.transform = `translateZ(${this.iz}px) translateX(${this.ix}px) translateY(${this.iy}px) rotateX(${this.irx}deg) rotateY(${this.iry}deg) rotateZ(${this.irz}deg)`;
            this.styles.width = this.iw+"px";
            this.styles.height = this.ih+"px";
        }
    },
    watch:{
        x:function(newx,oldx){
            this.ix = newx;
            this.updateTransform();
        },
        y:function(newy,oldy){
            this.iy = newy;
            this.updateTransform();
        },
        z:function(newz,oldz){
            this.iz = newz;
            this.updateTransform();
        },
        w:function(neww,oldw){
            this.iw = neww;
            this.updateTransform();
        },
        h:function(newh,oldh){
            this.ih = newh;
            this.updateTransform();
        },
        rx:function(newrx,oldrx){
            this.irx = newrx;
            this.updateTransform();
        },
        ry:function(newry,oldry){
            this.iry = newry;
            this.updateTransform();
        },
        rz:function(newrz,oldrz){
            this.irz = newrz;
            this.updateTransform();
        },
        texture:function(newt,oldt){
            this.styles.backgroundImage = "url("+newt+")";
        },
    },
    mounted: function () {
        if(typeof(this.x) == "string" && !isNaN(parseFloat(this.x))){
            this.ix = parseFloat(this.x);
        }
        else if(typeof(this.x) == "number"){
            this.ix =this.x;
        }
        if(typeof(this.y) == "string" && !isNaN(parseFloat(this.y))){
            this.iy = parseFloat(this.y);
        }
        else if(typeof(this.y) == "number"){
            this.iy =this.y;
        }
        if(typeof(this.z) == "string" && !isNaN(parseFloat(this.z))){
            this.iz = parseFloat(this.z);
        }
        else if(typeof(this.z) == "number"){
            this.iz =this.z;
        }
        if(typeof(this.w) == "string" && !isNaN(parseFloat(this.w))){
            this.iw = parseFloat(this.w);
        }
        else if(typeof(this.w) == "number"){
            this.iw =this.w;
        }
        if(typeof(this.h) == "string" && !isNaN(parseFloat(this.h))){
            this.ih = parseFloat(this.h);
        }
        else if(typeof(this.h) == "number"){
            this.ih =this.h;
        }
        if(typeof(this.rx) == "string" && !isNaN(parseFloat(this.rx))){
            this.irx = parseFloat(this.rx);
        }
        else if(typeof(this.rx) == "number"){
            this.irx =this.rx;
        }
        if(typeof(this.ry) == "string" && !isNaN(parseFloat(this.ry))){
            this.iry = parseFloat(this.ry);
        }
        else if(typeof(this.ry) == "number"){
            this.iry =this.ry;
        }
        if(typeof(this.rz) == "string" && !isNaN(parseFloat(this.rz))){
            this.irz = parseFloat(this.rz);
        }
        else if(typeof(this.rz) == "number"){
            this.irz =this.rz;
        }
        
        this.styles.backgroundImage = "url("+this.texture+")";
        this.updateTransform();
    }

});