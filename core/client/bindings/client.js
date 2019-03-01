/* tslint:disable */
import * as wasm from './client_bg.wasm';

let cachegetUint16Memory = null;
function getUint16Memory() {
    if (cachegetUint16Memory === null || cachegetUint16Memory.buffer !== wasm.memory.buffer) {
        cachegetUint16Memory = new Uint16Array(wasm.memory.buffer);
    }
    return cachegetUint16Memory;
}

let WASM_VECTOR_LEN = 0;

function passArray16ToWasm(arg) {
    const ptr = wasm.__wbindgen_malloc(arg.length * 2);
    getUint16Memory().set(arg, ptr / 2);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {number} arg0
* @param {Uint16Array} arg1
* @param {boolean} arg2
* @param {boolean} arg3
* @param {number} arg4
* @returns {Proxy}
*/
export function create(arg0, arg1, arg2, arg3, arg4) {
    const ptr1 = passArray16ToWasm(arg1);
    const len1 = WASM_VECTOR_LEN;
    return Proxy.__wrap(wasm.create(arg0, ptr1, len1, arg2, arg3, arg4));
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_error_f7214ae7db04600c(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
}

export function __wbg_new_a99726b0abef495b() {
    return addHeapObject(new Error());
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedTextEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    WASM_VECTOR_LEN = buf.length;
    return ptr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

export function __wbg_stack_4931b18709aff089(ret, arg0) {

    const retptr = passStringToWasm(getObject(arg0).stack);
    const retlen = WASM_VECTOR_LEN;
    const mem = getUint32Memory();
    mem[ret / 4] = retptr;
    mem[ret / 4 + 1] = retlen;

}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

export function __wbindgen_json_parse(ptr, len) {
    return addHeapObject(JSON.parse(getStringFromWasm(ptr, len)));
}

export function __wbindgen_json_serialize(idx, ptrptr) {
    const ptr = passStringToWasm(JSON.stringify(getObject(idx)));
    getUint32Memory()[ptrptr / 4] = ptr;
    return WASM_VECTOR_LEN;
}

function freeProxy(ptr) {

    wasm.__wbg_proxy_free(ptr);
}
/**
*/
export class Proxy {

    static __wrap(ptr) {
        const obj = Object.create(Proxy.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeProxy(ptr);
    }

    /**
    * @returns {any}
    */
    get_move_names() {
        return takeObject(wasm.proxy_get_move_names(this.ptr));
    }
    /**
    * @returns {any}
    */
    get_state() {
        return takeObject(wasm.proxy_get_state(this.ptr));
    }
    /**
    * @returns {number}
    */
    get_player_id() {
        return wasm.proxy_get_player_id(this.ptr);
    }
    /**
    * @param {any} arg0
    * @returns {void}
    */
    dispatch(arg0) {
        return wasm.proxy_dispatch(this.ptr, addHeapObject(arg0));
    }
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

export const memory = wasm.memory;
