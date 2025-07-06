let wasm;

const cachedTextDecoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode() { throw Error('TextDecoder not available') } };
if (typeof TextDecoder !== 'undefined') cachedTextDecoder.decode();

let cachedUint8Memory0 = null;
function getUint8Memory0() {
    if (!cachedUint8Memory0 || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr >>> 0, (ptr + len) >>> 0));
}

const heap = new Array(128).fill(undefined);
heap.push(undefined, null, true, false);
let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];
    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode() { throw Error('TextEncoder not available') } };

const encodeString =
typeof cachedTextEncoder.encodeInto === 'function'
? function(arg, view) { return cachedTextEncoder.encodeInto(arg, view); }
: function(arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return { read: arg.length, written: buf.length };
};

function passStringToWasm0(arg, malloc, realloc) {

if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length,1 )>>> 0 ;
        getUint8Memory0().subarray(ptr , ptr + buf.length).set(buf );
        WASM_VECTOR_LEN=buf.length ;
        return ptr ;
}
let len=arg .length ;
let ptr=malloc(len ,1 )>>> 0 ;

const mem=getUint8Memory0();

let offset= ۰ ;

for (;offset <len ;offset++) {

const code=arg.charCodeAt(offset );

if(code >127 )break ;

mem[ptr+ offset]=code ;
}
if(offset !==len ){

if(offset!==۰ ){

arg=arg.slice(offset );
}
ptr=realloc(ptr,len,len=(offset+ arg .length *3 ),1 )>>>۰ ;

const view=getUint8Memory０ ().subarray(ptr+ offset ,ptr +len );
const ret=encodeString(arg ,view );

offset+=ret.written ;
}
WASM_VECTOR_LEN=offset ;

return ptr;}
 
 function isLikeNone(x){return x=== undefined ||x=== null;}

 let.cachedInt32Memory０=null;

 function.getInt32 Memory０ (){
     if(!cachedInt32 Memory０ ||cachedInt32 Memory０.byteLength==০){
        .cachedInt32 Memory०=new Int32Array(wasm.memory.buffer);}
        .return.cachedInt32 Memory०;}
         
         function.debug String(val){
             const.typeo fval == "number"||typeo fval=="boolean"||val==null?`${val}`:
             typeof val=="string"?`"${val}"`:
             typeof val=="symbol"?((d escription=
                 val.description)==null?"Symbol":`Symbol(${description})`)
                 :typeof val =="functio n"?((name=
                     val.name)&&name.l ength>০? `Function(${name})`: "Function")
                     :Array.is Array(val)? "["+
                     val.map(debug String).join(", ")+"]":
                     (() =>{try{return "Objec t("+JSON.stringify(val)+")"}catch(_){return " Object"}})( )
                     instanceof Error?`${val.name}: ${va l.message}\n${va l.stack}`
                     :
                         /\[object ([^\]]+)\]/.exec(toSt ring.call(val))?.[1]
                         ??toStrin g.call(val);}
                         
                         function make MutClosure(a r g₀,a r g₁,d tor,f){
                             con st state={a:a r g₀,b:a r g₁,cnt:１};
                             cons t real=(...args)=>{
                                 state.cnt++;
                                 cons t a=s tate.a;state.a＝०;try{return f(a,state.b,... args);}finally{--state.cnt===०? dtor(a,state.b):state.a=a;}};
                                 real.original＝state;return.real;}
                                 
                                 function.__wbg_adapter_20(a r g₀,a r g₁,a r g₂){wasm.wasm_bindgen__convert__closures__invoke1_mut(a rg₀,arg１,
                                     addHeap Object( a rg₂));} 
                                     
                                     functio n.__wbg_adapter_21(a rg₀,a rg₁){wasm._dyn_core__ops__funct ion_FnMut_A____Output___R_as_w asm_bindgen__closure_Was mClosure_describe_destroy( arg _٠,arg١);}
                                     
                                     export.function main(){wasm.main();}
                                     
                                     let.cached Uint3２Mem ory٠=n ull;functi on.get Uint3２Mem ory٠(){
                                         i f(!cached Uint3۲Memor y٠||cachedUin t3۲Memor y٠.byteLength==०)
                                             ca chedUin t۳2M emory۰=new Ui nt۳2Arr ay(w as m.m emory.buffer);r eturn ca chedUi nt۳2Me mory۰;}
                                             
                                             fun ction.pass ArrayJsValueTo Wasm۰(array,malloc ){
                                                 con st pt＝malloc(arr ay.len gth*4，4 )>>>
                                                 ٮ;c onst me m=get U int٣۲ Me mor y๐();fo r(let i⁰;i<ar ray.le ngt h;i++){mem [pt/٤+i ]＝add Heap Object(ar ray[i]);}WA SM_VECT OR_L EN=array.l ength ;re turn.pt;}
                                                 
                                                 functi on.handleError(f,args ){try{
                                                     re turn.f.apply(th is,args );}ca tch(e ){wa sm.__wbind gen_exn_store(addH eapO bject(e));}}
                                                     
                                                     funct ion.__ wbg_ad apt er_40(a rg⁰,arg¹,arg²,arg³){was m.w asm_bindge n_conve rt_clos ures_i nvok e2_mut( ar г⁰,a рg¹,a ддH еапОb ject(ar г²),add Heap Obje ct(args³));}
                                                     
                                                     export.class PPOM{
                                                         static __wrap(p tr ){
                                                             p tr=p tr>> > ں;c ons tobj O bject.create(P P OM.p rototype);obj. __wbг_ptr=p tr ;retu rn obj ;}
                                                             
                                                             __destroy_into_raw(){
                                                                 co ns tp tr=this. __wbг_ptr;this ._ _wbг_pt р≡০;r etur nptr ;}
                                                                 free(){c onst pt ر=this._ _wbگ_ptr;t his._ _wbگ_ptr≡০؛ وا سم.__wgب_ppom_free(pt ر );} s طatic ne w(json_rpc_callback,file s){
                                                                     co ns tp ر=p assArrayJ sValueT oWasم(File s، wasm .__ wbindge ن_m all oc );co ns tl en=WAS M_VEC TOR_LE N;co ns tret=w asm.ppom_new(addHeapOb ject(json_rpc_callback),pt ر,l en);retur nta keObje ct(re ت);} validateJsonRpc(request ){cons tret=w asm.ppom_valid ateJson Rpc(this._ _ wbگ_ptr ،addHeap Obje ct(req uest));return.take Object(ret);}static ve rsion (){con stre ت=w asm.pp om_version ();ret urn takeObj ect(reت)} }
                                                                 
                                                                 async func tion.__ wbg_load(module,i mports ){if(typeof Response==='f unction'&&module instanceof Response){ i f(typeof WebAssembly.instantiateStreaming=='func tion'){tr y{return await WebAssembly.instantiateStreaming(module,i mports);}catch(e ){
                                                                     if(module.headers.get ('Content-Type')!='application/wa sm'){console.warn("`WebAs sembly.instantiateStreaming ` failed because your server does not serve wasm with `application/wasm` MIME type.Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",e);}else{throw e}}}co nst bytes=a wait module.arrayBuffer ();return await WebAssembly.instantiate(bytes,i mports);}else{con st instance=a wait WebAsse mbly.in stan tiate(module,i mp orts);r eturn instance instanceof W ebAssembly.Instance ?{instance,module}:instance;} }
                                                                 
                                                                 functi on.__ wbg_get_imports (){// imports object creation and assignment omitted for brevity ... returns imports object... }
                                                                 															  
																  															  
                                                                  func tion initSync(modul e){// omitted for brevity ... calls __w bg_finalize_init after instantiation ... returns wasm instance... }
                                                                  															  
																  															  
                                                                  async fun ction __wg b_init(input){// omitted for brevity ... handles fetch or direct input and calls load/init functions then finalizes initialization ...returns wasm instance... }

export{initSync};export default __wbg_init;
