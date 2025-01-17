var Fl = Object.defineProperty, Vl = (e, t, n) => t in e ? Fl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ot = (e, t, n) => Vl(e, typeof t != "symbol" ? t + "" : t, n);
class Dl {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t) {
      setTimeout(() => {
        throw t.stack ? Ot.isErrorNoTelemetry(t) ? new Ot(t.message + `

` + t.stack) : new Error(t.message + `

` + t.stack) : t;
      }, 0);
    };
  }
  addListener(t) {
    return this.listeners.push(t), () => {
      this._removeListener(t);
    };
  }
  emit(t) {
    this.listeners.forEach((n) => {
      n(t);
    });
  }
  _removeListener(t) {
    this.listeners.splice(this.listeners.indexOf(t), 1);
  }
  setUnexpectedErrorHandler(t) {
    this.unexpectedErrorHandler = t;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(t) {
    this.unexpectedErrorHandler(t), this.emit(t);
  }
  onUnexpectedExternalError(t) {
    this.unexpectedErrorHandler(t);
  }
}
const ql = new Dl();
function Yt(e) {
  Kl(e) || ql.onUnexpectedError(e);
}
function fi(e) {
  if (e instanceof Error) {
    const { name: t, message: n } = e, r = e.stacktrace || e.stack;
    return {
      $isError: !0,
      name: t,
      message: n,
      stack: r,
      noTelemetry: Ot.isErrorNoTelemetry(e)
    };
  }
  return e;
}
const nr = "Canceled";
function Kl(e) {
  return e instanceof $l ? !0 : e instanceof Error && e.name === nr && e.message === nr;
}
class $l extends Error {
  constructor() {
    super(nr), this.name = this.message;
  }
}
class Ot extends Error {
  constructor(t) {
    super(t), this.name = "CodeExpectedError";
  }
  static fromError(t) {
    if (t instanceof Ot)
      return t;
    const n = new Ot();
    return n.message = t.message, n.stack = t.stack, n;
  }
  static isErrorNoTelemetry(t) {
    return t.name === "CodeExpectedError";
  }
}
class le extends Error {
  constructor(t) {
    super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, le.prototype);
  }
}
function Bl(e, t) {
  const n = this;
  let r = !1, i;
  return function() {
    return r || (r = !0, i = e.apply(n, arguments)), i;
  };
}
function Pt(e, t) {
  const n = It(e, t);
  return n === -1 ? void 0 : e[n];
}
function It(e, t, n = 0, r = e.length) {
  let i = n, s = r;
  for (; i < s; ) {
    const o = Math.floor((i + s) / 2);
    t(e[o]) ? i = o + 1 : s = o;
  }
  return i - 1;
}
function Ul(e, t) {
  const n = rr(e, t);
  return n === e.length ? void 0 : e[n];
}
function rr(e, t, n = 0, r = e.length) {
  let i = n, s = r;
  for (; i < s; ) {
    const o = Math.floor((i + s) / 2);
    t(e[o]) ? s = o : i = o + 1;
  }
  return i;
}
const Aa = class Ra {
  constructor(t) {
    this._array = t, this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(t) {
    if (Ra.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (const r of this._array)
          if (this._prevFindLastPredicate(r) && !t(r))
            throw new Error(
              "MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate."
            );
      }
      this._prevFindLastPredicate = t;
    }
    const n = It(this._array, t, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
  }
};
Aa.assertInvariants = !1;
let ka = Aa;
function jl(e, t, n = (r, i) => r === i) {
  if (e === t)
    return !0;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (let r = 0, i = e.length; r < i; r++)
    if (!n(e[r], t[r]))
      return !1;
  return !0;
}
function* Ta(e, t) {
  let n, r;
  for (const i of e)
    r !== void 0 && t(r, i) ? n.push(i) : (n && (yield n), n = [i]), r = i;
  n && (yield n);
}
function zl(e, t) {
  for (let n = 0; n <= e.length; n++)
    t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
}
function Wl(e, t) {
  for (let n = 0; n < e.length; n++)
    t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
}
function Hl(e, t) {
  for (const n of t)
    e.push(n);
}
var mi;
(function(e) {
  function t(s) {
    return s < 0;
  }
  e.isLessThan = t;
  function n(s) {
    return s <= 0;
  }
  e.isLessThanOrEqual = n;
  function r(s) {
    return s > 0;
  }
  e.isGreaterThan = r;
  function i(s) {
    return s === 0;
  }
  e.isNeitherLessOrGreaterThan = i, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
})(mi || (mi = {}));
function en(e, t) {
  return (n, r) => t(e(n), e(r));
}
const tn = (e, t) => e - t;
function Gl(e) {
  return (t, n) => -e(t, n);
}
var gi, pi;
class Jl {
  constructor(t, n) {
    this.uri = t, this.value = n;
  }
}
function Xl(e) {
  return Array.isArray(e);
}
const Ma = class Ht {
  constructor(t, n) {
    if (this[gi] = "ResourceMap", t instanceof Ht)
      this.map = new Map(t.map), this.toKey = n ?? Ht.defaultToKey;
    else if (Xl(t)) {
      this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? Ht.defaultToKey;
      for (const [r, i] of t)
        this.set(r, i);
    } else
      this.map = /* @__PURE__ */ new Map(), this.toKey = t ?? Ht.defaultToKey;
  }
  set(t, n) {
    return this.map.set(this.toKey(t), new Jl(t, n)), this;
  }
  get(t) {
    var n;
    return (n = this.map.get(this.toKey(t))) == null ? void 0 : n.value;
  }
  has(t) {
    return this.map.has(this.toKey(t));
  }
  get size() {
    return this.map.size;
  }
  clear() {
    this.map.clear();
  }
  delete(t) {
    return this.map.delete(this.toKey(t));
  }
  forEach(t, n) {
    typeof n < "u" && (t = t.bind(n));
    for (const [r, i] of this.map)
      t(i.value, i.uri, this);
  }
  *values() {
    for (const t of this.map.values())
      yield t.value;
  }
  *keys() {
    for (const t of this.map.values())
      yield t.uri;
  }
  *entries() {
    for (const t of this.map.values())
      yield [t.uri, t.value];
  }
  *[(gi = Symbol.toStringTag, Symbol.iterator)]() {
    for (const [, t] of this.map)
      yield [t.uri, t.value];
  }
};
Ma.defaultToKey = (e) => e.toString();
let Ql = Ma;
class Zl {
  constructor() {
    this[pi] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
  }
  clear() {
    this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++;
  }
  isEmpty() {
    return !this._head && !this._tail;
  }
  get size() {
    return this._size;
  }
  get first() {
    var t;
    return (t = this._head) == null ? void 0 : t.value;
  }
  get last() {
    var t;
    return (t = this._tail) == null ? void 0 : t.value;
  }
  has(t) {
    return this._map.has(t);
  }
  get(t, n = 0) {
    const r = this._map.get(t);
    if (r)
      return n !== 0 && this.touch(r, n), r.value;
  }
  set(t, n, r = 0) {
    let i = this._map.get(t);
    if (i)
      i.value = n, r !== 0 && this.touch(i, r);
    else {
      switch (i = { key: t, value: n, next: void 0, previous: void 0 }, r) {
        case 0:
          this.addItemLast(i);
          break;
        case 1:
          this.addItemFirst(i);
          break;
        case 2:
          this.addItemLast(i);
          break;
        default:
          this.addItemLast(i);
          break;
      }
      this._map.set(t, i), this._size++;
    }
    return this;
  }
  delete(t) {
    return !!this.remove(t);
  }
  remove(t) {
    const n = this._map.get(t);
    if (n)
      return this._map.delete(t), this.removeItem(n), this._size--, n.value;
  }
  shift() {
    if (!this._head && !this._tail)
      return;
    if (!this._head || !this._tail)
      throw new Error("Invalid list");
    const t = this._head;
    return this._map.delete(t.key), this.removeItem(t), this._size--, t.value;
  }
  forEach(t, n) {
    const r = this._state;
    let i = this._head;
    for (; i; ) {
      if (n ? t.bind(n)(i.value, i.key, this) : t(i.value, i.key, this), this._state !== r)
        throw new Error("LinkedMap got modified during iteration.");
      i = i.next;
    }
  }
  keys() {
    const t = this, n = this._state;
    let r = this._head;
    const i = {
      [Symbol.iterator]() {
        return i;
      },
      next() {
        if (t._state !== n)
          throw new Error("LinkedMap got modified during iteration.");
        if (r) {
          const s = { value: r.key, done: !1 };
          return r = r.next, s;
        } else
          return { value: void 0, done: !0 };
      }
    };
    return i;
  }
  values() {
    const t = this, n = this._state;
    let r = this._head;
    const i = {
      [Symbol.iterator]() {
        return i;
      },
      next() {
        if (t._state !== n)
          throw new Error("LinkedMap got modified during iteration.");
        if (r) {
          const s = { value: r.value, done: !1 };
          return r = r.next, s;
        } else
          return { value: void 0, done: !0 };
      }
    };
    return i;
  }
  entries() {
    const t = this, n = this._state;
    let r = this._head;
    const i = {
      [Symbol.iterator]() {
        return i;
      },
      next() {
        if (t._state !== n)
          throw new Error("LinkedMap got modified during iteration.");
        if (r) {
          const s = { value: [r.key, r.value], done: !1 };
          return r = r.next, s;
        } else
          return { value: void 0, done: !0 };
      }
    };
    return i;
  }
  [(pi = Symbol.toStringTag, Symbol.iterator)]() {
    return this.entries();
  }
  trimOld(t) {
    if (t >= this.size)
      return;
    if (t === 0) {
      this.clear();
      return;
    }
    let n = this._head, r = this.size;
    for (; n && r > t; )
      this._map.delete(n.key), n = n.next, r--;
    this._head = n, this._size = r, n && (n.previous = void 0), this._state++;
  }
  trimNew(t) {
    if (t >= this.size)
      return;
    if (t === 0) {
      this.clear();
      return;
    }
    let n = this._tail, r = this.size;
    for (; n && r > t; )
      this._map.delete(n.key), n = n.previous, r--;
    this._tail = n, this._size = r, n && (n.next = void 0), this._state++;
  }
  addItemFirst(t) {
    if (!this._head && !this._tail)
      this._tail = t;
    else if (this._head)
      t.next = this._head, this._head.previous = t;
    else
      throw new Error("Invalid list");
    this._head = t, this._state++;
  }
  addItemLast(t) {
    if (!this._head && !this._tail)
      this._head = t;
    else if (this._tail)
      t.previous = this._tail, this._tail.next = t;
    else
      throw new Error("Invalid list");
    this._tail = t, this._state++;
  }
  removeItem(t) {
    if (t === this._head && t === this._tail)
      this._head = void 0, this._tail = void 0;
    else if (t === this._head) {
      if (!t.next)
        throw new Error("Invalid list");
      t.next.previous = void 0, this._head = t.next;
    } else if (t === this._tail) {
      if (!t.previous)
        throw new Error("Invalid list");
      t.previous.next = void 0, this._tail = t.previous;
    } else {
      const n = t.next, r = t.previous;
      if (!n || !r)
        throw new Error("Invalid list");
      n.previous = r, r.next = n;
    }
    t.next = void 0, t.previous = void 0, this._state++;
  }
  touch(t, n) {
    if (!this._head || !this._tail)
      throw new Error("Invalid list");
    if (!(n !== 1 && n !== 2)) {
      if (n === 1) {
        if (t === this._head)
          return;
        const r = t.next, i = t.previous;
        t === this._tail ? (i.next = void 0, this._tail = i) : (r.previous = i, i.next = r), t.previous = void 0, t.next = this._head, this._head.previous = t, this._head = t, this._state++;
      } else if (n === 2) {
        if (t === this._tail)
          return;
        const r = t.next, i = t.previous;
        t === this._head ? (r.previous = void 0, this._head = r) : (r.previous = i, i.next = r), t.next = void 0, t.previous = this._tail, this._tail.next = t, this._tail = t, this._state++;
      }
    }
  }
  toJSON() {
    const t = [];
    return this.forEach((n, r) => {
      t.push([r, n]);
    }), t;
  }
  fromJSON(t) {
    this.clear();
    for (const [n, r] of t)
      this.set(n, r);
  }
}
class Yl extends Zl {
  constructor(t, n = 1) {
    super(), this._limit = t, this._ratio = Math.min(Math.max(0, n), 1);
  }
  get limit() {
    return this._limit;
  }
  set limit(t) {
    this._limit = t, this.checkTrim();
  }
  get ratio() {
    return this._ratio;
  }
  set ratio(t) {
    this._ratio = Math.min(Math.max(0, t), 1), this.checkTrim();
  }
  get(t, n = 2) {
    return super.get(t, n);
  }
  peek(t) {
    return super.get(t, 0);
  }
  set(t, n) {
    return super.set(t, n, 2), this;
  }
  checkTrim() {
    this.size > this._limit && this.trim(Math.round(this._limit * this._ratio));
  }
}
class eu extends Yl {
  constructor(t, n = 1) {
    super(t, n);
  }
  trim(t) {
    this.trimOld(t);
  }
  set(t, n) {
    return super.set(t, n), this.checkTrim(), this;
  }
}
class tu {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(t, n) {
    let r = this.map.get(t);
    r || (r = /* @__PURE__ */ new Set(), this.map.set(t, r)), r.add(n);
  }
  delete(t, n) {
    const r = this.map.get(t);
    r && (r.delete(n), r.size === 0 && this.map.delete(t));
  }
  forEach(t, n) {
    const r = this.map.get(t);
    r && r.forEach(n);
  }
  get(t) {
    return this.map.get(t) || /* @__PURE__ */ new Set();
  }
}
var En;
(function(e) {
  function t(w) {
    return w && typeof w == "object" && typeof w[Symbol.iterator] == "function";
  }
  e.is = t;
  const n = Object.freeze([]);
  function r() {
    return n;
  }
  e.empty = r;
  function* i(w) {
    yield w;
  }
  e.single = i;
  function s(w) {
    return t(w) ? w : i(w);
  }
  e.wrap = s;
  function o(w) {
    return w || n;
  }
  e.from = o;
  function* a(w) {
    for (let b = w.length - 1; b >= 0; b--)
      yield w[b];
  }
  e.reverse = a;
  function l(w) {
    return !w || w[Symbol.iterator]().next().done === !0;
  }
  e.isEmpty = l;
  function u(w) {
    return w[Symbol.iterator]().next().value;
  }
  e.first = u;
  function d(w, b) {
    let L = 0;
    for (const x of w)
      if (b(x, L++))
        return !0;
    return !1;
  }
  e.some = d;
  function h(w, b) {
    for (const L of w)
      if (b(L))
        return L;
  }
  e.find = h;
  function* f(w, b) {
    for (const L of w)
      b(L) && (yield L);
  }
  e.filter = f;
  function* m(w, b) {
    let L = 0;
    for (const x of w)
      yield b(x, L++);
  }
  e.map = m;
  function* g(w, b) {
    let L = 0;
    for (const x of w)
      yield* b(x, L++);
  }
  e.flatMap = g;
  function* p(...w) {
    for (const b of w)
      yield* b;
  }
  e.concat = p;
  function v(w, b, L) {
    let x = L;
    for (const T of w)
      x = b(x, T);
    return x;
  }
  e.reduce = v;
  function* C(w, b, L = w.length) {
    for (b < -w.length && (b = 0), b < 0 && (b += w.length), L < 0 ? L += w.length : L > w.length && (L = w.length); b < L; b++)
      yield w[b];
  }
  e.slice = C;
  function S(w, b = Number.POSITIVE_INFINITY) {
    const L = [];
    if (b === 0)
      return [L, w];
    const x = w[Symbol.iterator]();
    for (let T = 0; T < b; T++) {
      const I = x.next();
      if (I.done)
        return [L, e.empty()];
      L.push(I.value);
    }
    return [L, { [Symbol.iterator]() {
      return x;
    } }];
  }
  e.consume = S;
  async function y(w) {
    const b = [];
    for await (const L of w)
      b.push(L);
    return Promise.resolve(b);
  }
  e.asyncToArray = y;
})(En || (En = {}));
function Oa(e) {
  if (En.is(e)) {
    const t = [];
    for (const n of e)
      if (n)
        try {
          n.dispose();
        } catch (r) {
          t.push(r);
        }
    if (t.length === 1)
      throw t[0];
    if (t.length > 1)
      throw new AggregateError(t, "Encountered errors while disposing of store");
    return Array.isArray(e) ? [] : e;
  } else if (e)
    return e.dispose(), e;
}
function nu(...e) {
  return sn(() => Oa(e));
}
function sn(e) {
  return {
    dispose: Bl(() => {
      e();
    })
  };
}
const Pa = class Ia {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set(), this._isDisposed = !1;
  }
  dispose() {
    this._isDisposed || (this._isDisposed = !0, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0)
      try {
        Oa(this._toDispose);
      } finally {
        this._toDispose.clear();
      }
  }
  add(t) {
    if (!t)
      return t;
    if (t === this)
      throw new Error("Cannot register a disposable on itself!");
    return this._isDisposed ? Ia.DISABLE_DISPOSED_WARNING || console.warn(new Error(
      "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
    ).stack) : this._toDispose.add(t), t;
  }
  delete(t) {
    if (t) {
      if (t === this)
        throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(t), t.dispose();
    }
  }
  deleteAndLeak(t) {
    t && this._toDispose.has(t) && this._toDispose.delete(t);
  }
};
Pa.DISABLE_DISPOSED_WARNING = !1;
let ti = Pa;
const Fa = class {
  constructor() {
    this._store = new ti(), this._store;
  }
  dispose() {
    this._store.dispose();
  }
  _register(t) {
    if (t === this)
      throw new Error("Cannot register a disposable on itself!");
    return this._store.add(t);
  }
};
Fa.None = Object.freeze({ dispose() {
} });
let _n = Fa;
const ir = class sr {
  constructor(t) {
    this.element = t, this.next = sr.Undefined, this.prev = sr.Undefined;
  }
};
ir.Undefined = new ir(void 0);
let ee = ir;
class ru {
  constructor() {
    this._first = ee.Undefined, this._last = ee.Undefined, this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === ee.Undefined;
  }
  clear() {
    let t = this._first;
    for (; t !== ee.Undefined; ) {
      const n = t.next;
      t.prev = ee.Undefined, t.next = ee.Undefined, t = n;
    }
    this._first = ee.Undefined, this._last = ee.Undefined, this._size = 0;
  }
  unshift(t) {
    return this._insert(t, !1);
  }
  push(t) {
    return this._insert(t, !0);
  }
  _insert(t, n) {
    const r = new ee(t);
    if (this._first === ee.Undefined)
      this._first = r, this._last = r;
    else if (n) {
      const s = this._last;
      this._last = r, r.prev = s, s.next = r;
    } else {
      const s = this._first;
      this._first = r, r.next = s, s.prev = r;
    }
    this._size += 1;
    let i = !1;
    return () => {
      i || (i = !0, this._remove(r));
    };
  }
  shift() {
    if (this._first !== ee.Undefined) {
      const t = this._first.element;
      return this._remove(this._first), t;
    }
  }
  pop() {
    if (this._last !== ee.Undefined) {
      const t = this._last.element;
      return this._remove(this._last), t;
    }
  }
  _remove(t) {
    if (t.prev !== ee.Undefined && t.next !== ee.Undefined) {
      const n = t.prev;
      n.next = t.next, t.next.prev = n;
    } else t.prev === ee.Undefined && t.next === ee.Undefined ? (this._first = ee.Undefined, this._last = ee.Undefined) : t.next === ee.Undefined ? (this._last = this._last.prev, this._last.next = ee.Undefined) : t.prev === ee.Undefined && (this._first = this._first.next, this._first.prev = ee.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t = this._first;
    for (; t !== ee.Undefined; )
      yield t.element, t = t.next;
  }
}
const iu = globalThis.performance && typeof globalThis.performance.now == "function";
class $n {
  static create(t) {
    return new $n(t);
  }
  constructor(t) {
    this._now = iu && t === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
}
var An;
(function(e) {
  e.None = () => _n.None;
  function t(A, _) {
    return f(A, () => {
    }, 0, void 0, !0, void 0, _);
  }
  e.defer = t;
  function n(A) {
    return (_, P = null, M) => {
      let O = !1, K;
      return K = A((B) => {
        if (!O)
          return K ? K.dispose() : O = !0, _.call(P, B);
      }, null, M), O && K.dispose(), K;
    };
  }
  e.once = n;
  function r(A, _) {
    return e.once(e.filter(A, _));
  }
  e.onceIf = r;
  function i(A, _, P) {
    return d((M, O = null, K) => A((B) => M.call(O, _(B)), null, K), P);
  }
  e.map = i;
  function s(A, _, P) {
    return d((M, O = null, K) => A((B) => {
      _(B), M.call(O, B);
    }, null, K), P);
  }
  e.forEach = s;
  function o(A, _, P) {
    return d((M, O = null, K) => A((B) => _(B) && M.call(O, B), null, K), P);
  }
  e.filter = o;
  function a(A) {
    return A;
  }
  e.signal = a;
  function l(...A) {
    return (_, P = null, M) => {
      const O = nu(...A.map((K) => K((B) => _.call(P, B))));
      return h(O, M);
    };
  }
  e.any = l;
  function u(A, _, P, M) {
    let O = P;
    return i(A, (K) => (O = _(O, K), O), M);
  }
  e.reduce = u;
  function d(A, _) {
    let P;
    const M = {
      onWillAddFirstListener() {
        P = A(O.fire, O);
      },
      onDidRemoveLastListener() {
        P == null || P.dispose();
      }
    }, O = new Re(M);
    return _ == null || _.add(O), O.event;
  }
  function h(A, _) {
    return _ instanceof Array ? _.push(A) : _ && _.add(A), A;
  }
  function f(A, _, P = 100, M = !1, O = !1, K, B) {
    let z, ce, bt, cn = 0, yt;
    const Ol = {
      leakWarningThreshold: K,
      onWillAddFirstListener() {
        z = A((Pl) => {
          cn++, ce = _(ce, Pl), M && !bt && (hn.fire(ce), ce = void 0), yt = () => {
            const Il = ce;
            ce = void 0, bt = void 0, (!M || cn > 1) && hn.fire(Il), cn = 0;
          }, typeof P == "number" ? (clearTimeout(bt), bt = setTimeout(yt, P)) : bt === void 0 && (bt = 0, queueMicrotask(yt));
        });
      },
      onWillRemoveListener() {
        O && cn > 0 && (yt == null || yt());
      },
      onDidRemoveLastListener() {
        yt = void 0, z.dispose();
      }
    }, hn = new Re(Ol);
    return B == null || B.add(hn), hn.event;
  }
  e.debounce = f;
  function m(A, _ = 0, P) {
    return e.debounce(A, (M, O) => M ? (M.push(O), M) : [O], _, void 0, !0, void 0, P);
  }
  e.accumulate = m;
  function g(A, _ = (M, O) => M === O, P) {
    let M = !0, O;
    return o(A, (K) => {
      const B = M || !_(K, O);
      return M = !1, O = K, B;
    }, P);
  }
  e.latch = g;
  function p(A, _, P) {
    return [
      e.filter(A, _, P),
      e.filter(A, (M) => !_(M), P)
    ];
  }
  e.split = p;
  function v(A, _ = !1, P = [], M) {
    let O = P.slice(), K = A((ce) => {
      O ? O.push(ce) : z.fire(ce);
    });
    M && M.add(K);
    const B = () => {
      O == null || O.forEach((ce) => z.fire(ce)), O = null;
    }, z = new Re({
      onWillAddFirstListener() {
        K || (K = A((ce) => z.fire(ce)), M && M.add(K));
      },
      onDidAddFirstListener() {
        O && (_ ? setTimeout(B) : B());
      },
      onDidRemoveLastListener() {
        K && K.dispose(), K = null;
      }
    });
    return M && M.add(z), z.event;
  }
  e.buffer = v;
  function C(A, _) {
    return (P, M, O) => {
      const K = _(new y());
      return A(function(B) {
        const z = K.evaluate(B);
        z !== S && P.call(M, z);
      }, void 0, O);
    };
  }
  e.chain = C;
  const S = Symbol("HaltChainable");
  class y {
    constructor() {
      this.steps = [];
    }
    map(_) {
      return this.steps.push(_), this;
    }
    forEach(_) {
      return this.steps.push((P) => (_(P), P)), this;
    }
    filter(_) {
      return this.steps.push((P) => _(P) ? P : S), this;
    }
    reduce(_, P) {
      let M = P;
      return this.steps.push((O) => (M = _(M, O), M)), this;
    }
    latch(_ = (P, M) => P === M) {
      let P = !0, M;
      return this.steps.push((O) => {
        const K = P || !_(O, M);
        return P = !1, M = O, K ? O : S;
      }), this;
    }
    evaluate(_) {
      for (const P of this.steps)
        if (_ = P(_), _ === S)
          break;
      return _;
    }
  }
  function w(A, _, P = (M) => M) {
    const M = (...z) => B.fire(P(...z)), O = () => A.on(_, M), K = () => A.removeListener(_, M), B = new Re(
      { onWillAddFirstListener: O, onDidRemoveLastListener: K }
    );
    return B.event;
  }
  e.fromNodeEventEmitter = w;
  function b(A, _, P = (M) => M) {
    const M = (...z) => B.fire(P(...z)), O = () => A.addEventListener(_, M), K = () => A.removeEventListener(_, M), B = new Re(
      { onWillAddFirstListener: O, onDidRemoveLastListener: K }
    );
    return B.event;
  }
  e.fromDOMEventEmitter = b;
  function L(A) {
    return new Promise((_) => n(A)(_));
  }
  e.toPromise = L;
  function x(A) {
    const _ = new Re();
    return A.then((P) => {
      _.fire(P);
    }, () => {
      _.fire(void 0);
    }).finally(() => {
      _.dispose();
    }), _.event;
  }
  e.fromPromise = x;
  function T(A, _) {
    return A((P) => _.fire(P));
  }
  e.forward = T;
  function I(A, _, P) {
    return _(P), A((M) => _(M));
  }
  e.runAndSubscribe = I;
  class q {
    constructor(_, P) {
      this._observable = _, this._counter = 0, this._hasChanged = !1;
      const M = {
        onWillAddFirstListener: () => {
          _.addObserver(this), this._observable.reportChanges();
        },
        onDidRemoveLastListener: () => {
          _.removeObserver(this);
        }
      };
      this.emitter = new Re(M), P && P.add(this.emitter);
    }
    beginUpdate(_) {
      this._counter++;
    }
    handlePossibleChange(_) {
    }
    handleChange(_, P) {
      this._hasChanged = !0;
    }
    endUpdate(_) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
    }
  }
  function R(A, _) {
    return new q(A, _).emitter.event;
  }
  e.fromObservable = R;
  function E(A) {
    return (_, P, M) => {
      let O = 0, K = !1;
      const B = {
        beginUpdate() {
          O++;
        },
        endUpdate() {
          O--, O === 0 && (A.reportChanges(), K && (K = !1, _.call(P)));
        },
        handlePossibleChange() {
        },
        handleChange() {
          K = !0;
        }
      };
      A.addObserver(B), A.reportChanges();
      const z = {
        dispose() {
          A.removeObserver(B);
        }
      };
      return M instanceof ti ? M.add(z) : Array.isArray(M) && M.push(z), z;
    };
  }
  e.fromObservableLight = E;
})(An || (An = {}));
const or = class ar {
  constructor(t) {
    this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${ar._idPool++}`, ar.all.add(this);
  }
  start(t) {
    this._stopWatch = new $n(), this.listenerCount = t;
  }
  stop() {
    if (this._stopWatch) {
      const t = this._stopWatch.elapsed();
      this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
or.all = /* @__PURE__ */ new Set(), or._idPool = 0;
let su = or, ou = -1;
const Va = class Da {
  constructor(t, n, r = (Da._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = t, this.threshold = n, this.name = r, this._warnCountdown = 0;
  }
  dispose() {
    var t;
    (t = this._stacks) == null || t.clear();
  }
  check(t, n) {
    const r = this.threshold;
    if (r <= 0 || n < r)
      return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    const i = this._stacks.get(t.value) || 0;
    if (this._stacks.set(t.value, i + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = r * 0.5;
      const [s, o] = this.getMostFrequentStack(), a = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${o}):`;
      console.warn(a), console.warn(s);
      const l = new lu(a, s);
      this._errorHandler(l);
    }
    return () => {
      const s = this._stacks.get(t.value) || 0;
      this._stacks.set(t.value, s - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks)
      return;
    let t, n = 0;
    for (const [r, i] of this._stacks)
      (!t || n < i) && (t = [r, i], n = i);
    return t;
  }
};
Va._idPool = 1;
let au = Va;
class ni {
  static create() {
    const t = new Error();
    return new ni(t.stack ?? "");
  }
  constructor(t) {
    this.value = t;
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
}
class lu extends Error {
  constructor(t, n) {
    super(t), this.name = "ListenerLeakError", this.stack = n;
  }
}
class uu extends Error {
  constructor(t, n) {
    super(t), this.name = "ListenerRefusalError", this.stack = n;
  }
}
let cu = 0;
class Un {
  constructor(t) {
    this.value = t, this.id = cu++;
  }
}
const hu = 2;
class Re {
  constructor(t) {
    var n, r, i, s;
    this._size = 0, this._options = t, this._leakageMon = (n = this._options) != null && n.leakWarningThreshold ? new au(
      (t == null ? void 0 : t.onListenerError) ?? Yt,
      ((r = this._options) == null ? void 0 : r.leakWarningThreshold) ?? ou
    ) : void 0, this._perfMon = (i = this._options) != null && i._profName ? new su(this._options._profName) : void 0, this._deliveryQueue = (s = this._options) == null ? void 0 : s.deliveryQueue;
  }
  dispose() {
    var t, n, r, i;
    this._disposed || (this._disposed = !0, ((t = this._deliveryQueue) == null ? void 0 : t.current) === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), (r = (n = this._options) == null ? void 0 : n.onDidRemoveLastListener) == null || r.call(n), (i = this._leakageMon) == null || i.dispose());
  }
  get event() {
    return this._event ?? (this._event = (t, n, r) => {
      var i, s, o, a, l, u, d;
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        const g = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(g);
        const p = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], v = new uu(
          `${g}. HINT: Stack shows most frequent listener (${p[1]}-times)`,
          p[0]
        );
        return (((i = this._options) == null ? void 0 : i.onListenerError) || Yt)(v), _n.None;
      }
      if (this._disposed)
        return _n.None;
      n && (t = t.bind(n));
      const h = new Un(t);
      let f;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (h.stack = ni.create(), f = this._leakageMon.check(h.stack, this._size + 1)), this._listeners ? this._listeners instanceof Un ? (this._deliveryQueue ?? (this._deliveryQueue = new du()), this._listeners = [this._listeners, h]) : this._listeners.push(h) : ((o = (s = this._options) == null ? void 0 : s.onWillAddFirstListener) == null || o.call(s, this), this._listeners = h, (l = (a = this._options) == null ? void 0 : a.onDidAddFirstListener) == null || l.call(a, this)), (d = (u = this._options) == null ? void 0 : u.onDidAddListener) == null || d.call(u, this), this._size++;
      const m = sn(() => {
        f == null || f(), this._removeListener(h);
      });
      return r instanceof ti ? r.add(m) : Array.isArray(r) && r.push(m), m;
    }), this._event;
  }
  _removeListener(t) {
    var n, r, i, s;
    if ((r = (n = this._options) == null ? void 0 : n.onWillRemoveListener) == null || r.call(n, this), !this._listeners)
      return;
    if (this._size === 1) {
      this._listeners = void 0, (s = (i = this._options) == null ? void 0 : i.onDidRemoveLastListener) == null || s.call(i, this), this._size = 0;
      return;
    }
    const o = this._listeners, a = o.indexOf(t);
    if (a === -1)
      throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, o[a] = void 0;
    const l = this._deliveryQueue.current === this;
    if (this._size * hu <= o.length) {
      let u = 0;
      for (let d = 0; d < o.length; d++)
        o[d] ? o[u++] = o[d] : l && u < this._deliveryQueue.end && (this._deliveryQueue.end--, u < this._deliveryQueue.i && this._deliveryQueue.i--);
      o.length = u;
    }
  }
  _deliver(t, n) {
    var r;
    if (!t)
      return;
    const i = ((r = this._options) == null ? void 0 : r.onListenerError) || Yt;
    if (!i) {
      t.value(n);
      return;
    }
    try {
      t.value(n);
    } catch (s) {
      i(s);
    }
  }
  _deliverQueue(t) {
    const n = t.current._listeners;
    for (; t.i < t.end; )
      this._deliver(n[t.i++], t.value);
    t.reset();
  }
  fire(t) {
    var n, r, i, s;
    if ((n = this._deliveryQueue) != null && n.current && (this._deliverQueue(this._deliveryQueue), (r = this._perfMon) == null || r.stop()), (i = this._perfMon) == null || i.start(this._size), this._listeners) if (this._listeners instanceof Un)
      this._deliver(this._listeners, t);
    else {
      const o = this._deliveryQueue;
      o.enqueue(this, t, this._listeners.length), this._deliverQueue(o);
    }
    (s = this._perfMon) == null || s.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
}
class du {
  constructor() {
    this.i = -1, this.end = 0;
  }
  enqueue(t, n, r) {
    this.i = 0, this.end = r, this.current = t, this.value = n;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
}
function fu() {
  return globalThis._VSCODE_NLS_MESSAGES;
}
function qa() {
  return globalThis._VSCODE_NLS_LANGUAGE;
}
const mu = qa() === "pseudo" || typeof document < "u" && document.location && typeof document.location.hash == "string" && document.location.hash.indexOf("pseudo=true") >= 0;
function gu(e, t) {
  let n;
  return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (r, i) => {
    const s = i[0], o = t[s];
    let a = r;
    return typeof o == "string" ? a = o : (typeof o == "number" || typeof o == "boolean" || o === void 0 || o === null) && (a = String(o)), a;
  }), mu && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
}
function Z(e, t, ...n) {
  return gu(typeof e == "number" ? pu(e, t) : t, n);
}
function pu(e, t) {
  var n;
  const r = (n = fu()) == null ? void 0 : n[e];
  if (typeof r != "string") {
    if (typeof t == "string")
      return t;
    throw new Error(`!!! NLS MISSING: ${e} !!!`);
  }
  return r;
}
const Rt = "en";
let lr = !1, ur = !1, jn = !1, Ka = !1, ri = !1, dn, vn = Rt, bi = Rt, bu, De;
const ze = globalThis;
let be;
var yi;
typeof ze.vscode < "u" && typeof ze.vscode.process < "u" ? be = ze.vscode.process : typeof process < "u" && typeof ((yi = process == null ? void 0 : process.versions) == null ? void 0 : yi.node) == "string" && (be = process);
var vi;
const yu = typeof ((vi = be == null ? void 0 : be.versions) == null ? void 0 : vi.electron) == "string", vu = yu && (be == null ? void 0 : be.type) === "renderer";
var wi;
if (typeof be == "object") {
  lr = be.platform === "win32", ur = be.platform === "darwin", jn = be.platform === "linux", jn && be.env.SNAP && be.env.SNAP_REVISION, be.env.CI || be.env.BUILD_ARTIFACTSTAGINGDIRECTORY, dn = Rt, vn = Rt;
  const e = be.env.VSCODE_NLS_CONFIG;
  if (e)
    try {
      const t = JSON.parse(e);
      dn = t.userLocale, bi = t.osLocale, vn = t.resolvedLanguage || Rt, bu = (wi = t.languagePack) == null ? void 0 : wi.translationsConfigFile;
    } catch {
    }
  Ka = !0;
} else typeof navigator == "object" && !vu ? (De = navigator.userAgent, lr = De.indexOf("Windows") >= 0, ur = De.indexOf("Macintosh") >= 0, (De.indexOf("Macintosh") >= 0 || De.indexOf("iPad") >= 0 || De.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints > 0, jn = De.indexOf("Linux") >= 0, (De == null ? void 0 : De.indexOf("Mobi")) >= 0, ri = !0, vn = qa() || Rt, dn = navigator.language.toLowerCase(), bi = dn) : console.error("Unable to resolve platform.");
const Ft = lr, wu = ur, Cu = Ka, Lu = ri, Su = ri && typeof ze.importScripts == "function", xu = Su ? ze.origin : void 0, Be = De, Je = vn;
var Ci;
(function(e) {
  function t() {
    return Je;
  }
  e.value = t;
  function n() {
    return Je.length === 2 ? Je === "en" : Je.length >= 3 ? Je[0] === "e" && Je[1] === "n" && Je[2] === "-" : !1;
  }
  e.isDefaultVariant = n;
  function r() {
    return Je === "en";
  }
  e.isDefault = r;
})(Ci || (Ci = {}));
const Nu = typeof ze.postMessage == "function" && !ze.importScripts;
(() => {
  if (Nu) {
    const e = [];
    ze.addEventListener("message", (n) => {
      if (n.data && n.data.vscodeScheduleAsyncWork)
        for (let r = 0, i = e.length; r < i; r++) {
          const s = e[r];
          if (s.id === n.data.vscodeScheduleAsyncWork) {
            e.splice(r, 1), s.callback();
            return;
          }
        }
    });
    let t = 0;
    return (n) => {
      const r = ++t;
      e.push({
        id: r,
        callback: n
      }), ze.postMessage({ vscodeScheduleAsyncWork: r }, "*");
    };
  }
  return (e) => setTimeout(e);
})();
const Eu = !!(Be && Be.indexOf("Chrome") >= 0);
Be && Be.indexOf("Firefox") >= 0;
!Eu && Be && Be.indexOf("Safari") >= 0;
Be && Be.indexOf("Edg/") >= 0;
Be && Be.indexOf("Android") >= 0;
const $a = Object.freeze(function(e, t) {
  const n = setTimeout(e.bind(t), 0);
  return { dispose() {
    clearTimeout(n);
  } };
});
var Rn;
(function(e) {
  function t(n) {
    return n === e.None || n === e.Cancelled || n instanceof wn ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
  }
  e.isCancellationToken = t, e.None = Object.freeze({
    isCancellationRequested: !1,
    onCancellationRequested: An.None
  }), e.Cancelled = Object.freeze({
    isCancellationRequested: !0,
    onCancellationRequested: $a
  });
})(Rn || (Rn = {}));
class wn {
  constructor() {
    this._isCancelled = !1, this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? $a : (this._emitter || (this._emitter = new Re()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
}
class _u {
  constructor(t) {
    this._token = void 0, this._parentListener = void 0, this._parentListener = t && t.onCancellationRequested(this.cancel, this);
  }
  get token() {
    return this._token || (this._token = new wn()), this._token;
  }
  cancel() {
    this._token ? this._token instanceof wn && this._token.cancel() : this._token = Rn.Cancelled;
  }
  dispose(t = !1) {
    var n;
    t && this.cancel(), (n = this._parentListener) == null || n.dispose(), this._token ? this._token instanceof wn && this._token.dispose() : this._token = Rn.None;
  }
}
function Au(e) {
  return e;
}
class Ru {
  constructor(t, n) {
    this.lastCache = void 0, this.lastArgKey = void 0, typeof t == "function" ? (this._fn = t, this._computeKey = Au) : (this._fn = n, this._computeKey = t.getCacheKey);
  }
  get(t) {
    const n = this._computeKey(t);
    return this.lastArgKey !== n && (this.lastArgKey = n, this.lastCache = this._fn(t)), this.lastCache;
  }
}
class Li {
  constructor(t) {
    this.executor = t, this._didRun = !1;
  }
  get hasValue() {
    return this._didRun;
  }
  get value() {
    if (!this._didRun)
      try {
        this._value = this.executor();
      } catch (t) {
        this._error = t;
      } finally {
        this._didRun = !0;
      }
    if (this._error)
      throw this._error;
    return this._value;
  }
  get rawValue() {
    return this._value;
  }
}
function ku(e) {
  return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
}
function ii(e) {
  return e.split(/\r\n|\r|\n/);
}
function Tu(e) {
  for (let t = 0, n = e.length; t < n; t++) {
    const r = e.charCodeAt(t);
    if (r !== 32 && r !== 9)
      return t;
  }
  return -1;
}
function Mu(e, t = e.length - 1) {
  for (let n = t; n >= 0; n--) {
    const r = e.charCodeAt(n);
    if (r !== 32 && r !== 9)
      return n;
  }
  return -1;
}
function Ou(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Pu(e, t, n = 0, r = e.length, i = 0, s = t.length) {
  for (; n < r && i < s; n++, i++) {
    const l = e.charCodeAt(n), u = t.charCodeAt(i);
    if (l < u)
      return -1;
    if (l > u)
      return 1;
  }
  const o = r - n, a = s - i;
  return o < a ? -1 : o > a ? 1 : 0;
}
function Ba(e, t, n = 0, r = e.length, i = 0, s = t.length) {
  for (; n < r && i < s; n++, i++) {
    let l = e.charCodeAt(n), u = t.charCodeAt(i);
    if (l === u)
      continue;
    if (l >= 128 || u >= 128)
      return Pu(e.toLowerCase(), t.toLowerCase(), n, r, i, s);
    Si(l) && (l -= 32), Si(u) && (u -= 32);
    const d = l - u;
    if (d !== 0)
      return d;
  }
  const o = r - n, a = s - i;
  return o < a ? -1 : o > a ? 1 : 0;
}
function Si(e) {
  return e >= 97 && e <= 122;
}
function Ua(e) {
  return e >= 65 && e <= 90;
}
function Iu(e, t) {
  return e.length === t.length && Ba(e, t) === 0;
}
function Fu(e, t) {
  const n = t.length;
  return t.length > e.length ? !1 : Ba(e, t, 0, n) === 0;
}
function xi(e, t) {
  const n = Math.min(e.length, t.length);
  let r;
  for (r = 0; r < n; r++)
    if (e.charCodeAt(r) !== t.charCodeAt(r))
      return r;
  return n;
}
function Vu(e, t) {
  const n = Math.min(e.length, t.length);
  let r;
  const i = e.length - 1, s = t.length - 1;
  for (r = 0; r < n; r++)
    if (e.charCodeAt(i - r) !== t.charCodeAt(s - r))
      return r;
  return n;
}
function cr(e) {
  return 55296 <= e && e <= 56319;
}
function Du(e) {
  return 56320 <= e && e <= 57343;
}
function qu(e, t) {
  return (e - 55296 << 10) + (t - 56320) + 65536;
}
function Ku(e, t, n) {
  const r = e.charCodeAt(n);
  if (cr(r) && n + 1 < t) {
    const i = e.charCodeAt(n + 1);
    if (Du(i))
      return qu(r, i);
  }
  return r;
}
const $u = /^[\t\n\r\x20-\x7E]*$/;
function Bu(e) {
  return $u.test(e);
}
const at = class hr {
  static getInstance(t) {
    return hr.cache.get(Array.from(t));
  }
  static getLocales() {
    return hr._locales.value;
  }
  constructor(t) {
    this.confusableDictionary = t;
  }
  isAmbiguous(t) {
    return this.confusableDictionary.has(t);
  }
  containsAmbiguousCharacter(t) {
    for (let n = 0; n < t.length; n++) {
      const r = t.codePointAt(n);
      if (typeof r == "number" && this.isAmbiguous(r))
        return !0;
    }
    return !1;
  }
  getPrimaryConfusable(t) {
    return this.confusableDictionary.get(t);
  }
  getConfusableCodePoints() {
    return new Set(this.confusableDictionary.keys());
  }
};
at.ambiguousCharacterData = new Li(() => JSON.parse('{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}')), at.cache = new Ru({ getCacheKey: JSON.stringify }, (e) => {
  function t(u) {
    const d = /* @__PURE__ */ new Map();
    for (let h = 0; h < u.length; h += 2)
      d.set(u[h], u[h + 1]);
    return d;
  }
  function n(u, d) {
    const h = new Map(u);
    for (const [f, m] of d)
      h.set(f, m);
    return h;
  }
  function r(u, d) {
    if (!u)
      return d;
    const h = /* @__PURE__ */ new Map();
    for (const [f, m] of u)
      d.has(f) && h.set(f, m);
    return h;
  }
  const i = at.ambiguousCharacterData.value;
  let s = e.filter((u) => !u.startsWith("_") && u in i);
  s.length === 0 && (s = ["_default"]);
  let o;
  for (const u of s) {
    const d = t(i[u]);
    o = r(o, d);
  }
  const a = t(i._common), l = n(a, o);
  return new at(l);
}), at._locales = new Li(() => Object.keys(at.ambiguousCharacterData.value).filter((e) => !e.startsWith("_")));
let dr = at;
const ja = class Gt {
  static getRawData() {
    return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]");
  }
  static getData() {
    return this._data || (this._data = new Set(Gt.getRawData())), this._data;
  }
  static isInvisibleCharacter(t) {
    return Gt.getData().has(t);
  }
  static containsInvisibleCharacter(t) {
    for (let n = 0; n < t.length; n++) {
      const r = t.codePointAt(n);
      if (typeof r == "number" && Gt.isInvisibleCharacter(r))
        return !0;
    }
    return !1;
  }
  static get codePoints() {
    return Gt.getData();
  }
};
ja._data = void 0;
let zn = ja;
const Wn = "default", Uu = "$initialize";
class ju {
  constructor(t, n, r, i, s) {
    this.vsWorker = t, this.req = n, this.channel = r, this.method = i, this.args = s, this.type = 0;
  }
}
class Ni {
  constructor(t, n, r, i) {
    this.vsWorker = t, this.seq = n, this.res = r, this.err = i, this.type = 1;
  }
}
class zu {
  constructor(t, n, r, i, s) {
    this.vsWorker = t, this.req = n, this.channel = r, this.eventName = i, this.arg = s, this.type = 2;
  }
}
class Wu {
  constructor(t, n, r) {
    this.vsWorker = t, this.req = n, this.event = r, this.type = 3;
  }
}
class Hu {
  constructor(t, n) {
    this.vsWorker = t, this.req = n, this.type = 4;
  }
}
class Gu {
  constructor(t) {
    this._workerId = -1, this._handler = t, this._lastSentReq = 0, this._pendingReplies = /* @__PURE__ */ Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
  }
  setWorkerId(t) {
    this._workerId = t;
  }
  sendMessage(t, n, r) {
    const i = String(++this._lastSentReq);
    return new Promise((s, o) => {
      this._pendingReplies[i] = {
        resolve: s,
        reject: o
      }, this._send(new ju(this._workerId, i, t, n, r));
    });
  }
  listen(t, n, r) {
    let i = null;
    const s = new Re({
      onWillAddFirstListener: () => {
        i = String(++this._lastSentReq), this._pendingEmitters.set(i, s), this._send(new zu(this._workerId, i, t, n, r));
      },
      onDidRemoveLastListener: () => {
        this._pendingEmitters.delete(i), this._send(new Hu(this._workerId, i)), i = null;
      }
    });
    return s.event;
  }
  handleMessage(t) {
    !t || !t.vsWorker || this._workerId !== -1 && t.vsWorker !== this._workerId || this._handleMessage(t);
  }
  createProxyToRemoteChannel(t, n) {
    const r = {
      get: (i, s) => (typeof s == "string" && !i[s] && (Wa(s) ? i[s] = (o) => this.listen(t, s, o) : za(s) ? i[s] = this.listen(t, s, void 0) : s.charCodeAt(0) === 36 && (i[s] = async (...o) => (await (n == null ? void 0 : n()), this.sendMessage(t, s, o)))), i[s])
    };
    return new Proxy(/* @__PURE__ */ Object.create(null), r);
  }
  _handleMessage(t) {
    switch (t.type) {
      case 1:
        return this._handleReplyMessage(t);
      case 0:
        return this._handleRequestMessage(t);
      case 2:
        return this._handleSubscribeEventMessage(t);
      case 3:
        return this._handleEventMessage(t);
      case 4:
        return this._handleUnsubscribeEventMessage(t);
    }
  }
  _handleReplyMessage(t) {
    if (!this._pendingReplies[t.seq]) {
      console.warn("Got reply to unknown seq");
      return;
    }
    const n = this._pendingReplies[t.seq];
    if (delete this._pendingReplies[t.seq], t.err) {
      let r = t.err;
      t.err.$isError && (r = new Error(), r.name = t.err.name, r.message = t.err.message, r.stack = t.err.stack), n.reject(r);
      return;
    }
    n.resolve(t.res);
  }
  _handleRequestMessage(t) {
    const n = t.req;
    this._handler.handleMessage(t.channel, t.method, t.args).then((r) => {
      this._send(new Ni(this._workerId, n, r, void 0));
    }, (r) => {
      r.detail instanceof Error && (r.detail = fi(r.detail)), this._send(new Ni(this._workerId, n, void 0, fi(r)));
    });
  }
  _handleSubscribeEventMessage(t) {
    const n = t.req, r = this._handler.handleEvent(t.channel, t.eventName, t.arg)((i) => {
      this._send(new Wu(this._workerId, n, i));
    });
    this._pendingEvents.set(n, r);
  }
  _handleEventMessage(t) {
    if (!this._pendingEmitters.has(t.req)) {
      console.warn("Got event for unknown req");
      return;
    }
    this._pendingEmitters.get(t.req).fire(t.event);
  }
  _handleUnsubscribeEventMessage(t) {
    if (!this._pendingEvents.has(t.req)) {
      console.warn("Got unsubscribe for unknown req");
      return;
    }
    this._pendingEvents.get(t.req).dispose(), this._pendingEvents.delete(t.req);
  }
  _send(t) {
    const n = [];
    if (t.type === 0)
      for (let r = 0; r < t.args.length; r++)
        t.args[r] instanceof ArrayBuffer && n.push(t.args[r]);
    else t.type === 1 && t.res instanceof ArrayBuffer && n.push(t.res);
    this._handler.sendMessage(t, n);
  }
}
function za(e) {
  return e[0] === "o" && e[1] === "n" && Ua(e.charCodeAt(2));
}
function Wa(e) {
  return /^onDynamic/.test(e) && Ua(e.charCodeAt(9));
}
class Ju {
  constructor(t, n) {
    this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._requestHandlerFactory = n, this._requestHandler = null, this._protocol = new Gu({
      sendMessage: (r, i) => {
        t(r, i);
      },
      handleMessage: (r, i, s) => this._handleMessage(r, i, s),
      handleEvent: (r, i, s) => this._handleEvent(r, i, s)
    });
  }
  onmessage(t) {
    this._protocol.handleMessage(t);
  }
  _handleMessage(t, n, r) {
    if (t === Wn && n === Uu)
      return this.initialize(r[0], r[1], r[2]);
    const i = t === Wn ? this._requestHandler : this._localChannels.get(t);
    if (!i)
      return Promise.reject(new Error(`Missing channel ${t} on worker thread`));
    if (typeof i[n] != "function")
      return Promise.reject(new Error(`Missing method ${n} on worker thread channel ${t}`));
    try {
      return Promise.resolve(i[n].apply(i, r));
    } catch (s) {
      return Promise.reject(s);
    }
  }
  _handleEvent(t, n, r) {
    const i = t === Wn ? this._requestHandler : this._localChannels.get(t);
    if (!i)
      throw new Error(`Missing channel ${t} on worker thread`);
    if (Wa(n)) {
      const s = i[n].call(i, r);
      if (typeof s != "function")
        throw new Error(`Missing dynamic event ${n} on request handler.`);
      return s;
    }
    if (za(n)) {
      const s = i[n];
      if (typeof s != "function")
        throw new Error(`Missing event ${n} on request handler.`);
      return s;
    }
    throw new Error(`Malformed event name ${n}`);
  }
  setChannel(t, n) {
    this._localChannels.set(t, n);
  }
  getChannel(t) {
    if (!this._remoteChannels.has(t)) {
      const n = this._protocol.createProxyToRemoteChannel(t);
      this._remoteChannels.set(t, n);
    }
    return this._remoteChannels.get(t);
  }
  async initialize(t, n, r) {
    if (this._protocol.setWorkerId(t), this._requestHandlerFactory) {
      this._requestHandler = this._requestHandlerFactory(this);
      return;
    }
    return n && (typeof n.baseUrl < "u" && delete n.baseUrl, typeof n.paths < "u" && typeof n.paths.vs < "u" && delete n.paths.vs, typeof n.trustedTypesPolicy < "u" && delete n.trustedTypesPolicy, n.catchError = !0, globalThis.require.config(n)), Promise.reject(new Error("Unexpected usage"));
  }
}
class tt {
  constructor(t, n, r, i) {
    this.originalStart = t, this.originalLength = n, this.modifiedStart = r, this.modifiedLength = i;
  }
  getOriginalEnd() {
    return this.originalStart + this.originalLength;
  }
  getModifiedEnd() {
    return this.modifiedStart + this.modifiedLength;
  }
}
function Ei(e, t) {
  return (t << 5) - t + e | 0;
}
function Xu(e, t) {
  t = Ei(149417, t);
  for (let n = 0, r = e.length; n < r; n++)
    t = Ei(e.charCodeAt(n), t);
  return t;
}
class _i {
  constructor(t) {
    this.source = t;
  }
  getElements() {
    const t = this.source, n = new Int32Array(t.length);
    for (let r = 0, i = t.length; r < i; r++)
      n[r] = t.charCodeAt(r);
    return n;
  }
}
function Qu(e, t, n) {
  return new rt(new _i(e), new _i(t)).ComputeDiff(n).changes;
}
class vt {
  static Assert(t, n) {
    if (!t)
      throw new Error(n);
  }
}
class wt {
  static Copy(t, n, r, i, s) {
    for (let o = 0; o < s; o++)
      r[i + o] = t[n + o];
  }
  static Copy2(t, n, r, i, s) {
    for (let o = 0; o < s; o++)
      r[i + o] = t[n + o];
  }
}
class Ai {
  constructor() {
    this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
  }
  MarkNextChange() {
    (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new tt(
      this.m_originalStart,
      this.m_originalCount,
      this.m_modifiedStart,
      this.m_modifiedCount
    )), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
  }
  AddOriginalElement(t, n) {
    this.m_originalStart = Math.min(this.m_originalStart, t), this.m_modifiedStart = Math.min(this.m_modifiedStart, n), this.m_originalCount++;
  }
  AddModifiedElement(t, n) {
    this.m_originalStart = Math.min(this.m_originalStart, t), this.m_modifiedStart = Math.min(this.m_modifiedStart, n), this.m_modifiedCount++;
  }
  getChanges() {
    return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes;
  }
  getReverseChanges() {
    return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes.reverse(), this.m_changes;
  }
}
class rt {
  constructor(t, n, r = null) {
    this.ContinueProcessingPredicate = r, this._originalSequence = t, this._modifiedSequence = n;
    const [i, s, o] = rt._getElements(t), [a, l, u] = rt._getElements(n);
    this._hasStrings = o && u, this._originalStringElements = i, this._originalElementsOrHash = s, this._modifiedStringElements = a, this._modifiedElementsOrHash = l, this.m_forwardHistory = [], this.m_reverseHistory = [];
  }
  static _isStringArray(t) {
    return t.length > 0 && typeof t[0] == "string";
  }
  static _getElements(t) {
    const n = t.getElements();
    if (rt._isStringArray(n)) {
      const r = new Int32Array(n.length);
      for (let i = 0, s = n.length; i < s; i++)
        r[i] = Xu(n[i], 0);
      return [n, r, !0];
    }
    return n instanceof Int32Array ? [[], n, !1] : [[], new Int32Array(n), !1];
  }
  ElementsAreEqual(t, n) {
    return this._originalElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._modifiedStringElements[n] : !0;
  }
  ElementsAreStrictEqual(t, n) {
    if (!this.ElementsAreEqual(t, n))
      return !1;
    const r = rt._getStrictElement(this._originalSequence, t), i = rt._getStrictElement(this._modifiedSequence, n);
    return r === i;
  }
  static _getStrictElement(t, n) {
    return typeof t.getStrictElement == "function" ? t.getStrictElement(n) : null;
  }
  OriginalElementsAreEqual(t, n) {
    return this._originalElementsOrHash[t] !== this._originalElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._originalStringElements[n] : !0;
  }
  ModifiedElementsAreEqual(t, n) {
    return this._modifiedElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._modifiedStringElements[t] === this._modifiedStringElements[n] : !0;
  }
  ComputeDiff(t) {
    return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, t);
  }
  _ComputeDiff(t, n, r, i, s) {
    const o = [!1];
    let a = this.ComputeDiffRecursive(t, n, r, i, o);
    return s && (a = this.PrettifyChanges(a)), {
      quitEarly: o[0],
      changes: a
    };
  }
  ComputeDiffRecursive(t, n, r, i, s) {
    for (s[0] = !1; t <= n && r <= i && this.ElementsAreEqual(t, r); )
      t++, r++;
    for (; n >= t && i >= r && this.ElementsAreEqual(n, i); )
      n--, i--;
    if (t > n || r > i) {
      let h;
      return r <= i ? (vt.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), h = [
        new tt(t, 0, r, i - r + 1)
      ]) : t <= n ? (vt.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), h = [
        new tt(t, n - t + 1, r, 0)
      ]) : (vt.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), vt.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), h = []), h;
    }
    const o = [0], a = [0], l = this.ComputeRecursionPoint(t, n, r, i, o, a, s), u = o[0], d = a[0];
    if (l !== null)
      return l;
    if (!s[0]) {
      const h = this.ComputeDiffRecursive(t, u, r, d, s);
      let f = [];
      return s[0] ? f = [
        new tt(
          u + 1,
          n - (u + 1) + 1,
          d + 1,
          i - (d + 1) + 1
        )
      ] : f = this.ComputeDiffRecursive(u + 1, n, d + 1, i, s), this.ConcatenateChanges(h, f);
    }
    return [
      new tt(
        t,
        n - t + 1,
        r,
        i - r + 1
      )
    ];
  }
  WALKTRACE(t, n, r, i, s, o, a, l, u, d, h, f, m, g, p, v, C, S) {
    let y = null, w = null, b = new Ai(), L = n, x = r, T = m[0] - v[0] - i, I = -1073741824, q = this.m_forwardHistory.length - 1;
    do {
      const R = T + t;
      R === L || R < x && u[R - 1] < u[R + 1] ? (h = u[R + 1], g = h - T - i, h < I && b.MarkNextChange(), I = h, b.AddModifiedElement(h + 1, g), T = R + 1 - t) : (h = u[R - 1] + 1, g = h - T - i, h < I && b.MarkNextChange(), I = h - 1, b.AddOriginalElement(h, g + 1), T = R - 1 - t), q >= 0 && (u = this.m_forwardHistory[q], t = u[0], L = 1, x = u.length - 1);
    } while (--q >= -1);
    if (y = b.getReverseChanges(), S[0]) {
      let R = m[0] + 1, E = v[0] + 1;
      if (y !== null && y.length > 0) {
        const A = y[y.length - 1];
        R = Math.max(R, A.getOriginalEnd()), E = Math.max(E, A.getModifiedEnd());
      }
      w = [
        new tt(
          R,
          f - R + 1,
          E,
          p - E + 1
        )
      ];
    } else {
      b = new Ai(), L = o, x = a, T = m[0] - v[0] - l, I = 1073741824, q = C ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
      do {
        const R = T + s;
        R === L || R < x && d[R - 1] >= d[R + 1] ? (h = d[R + 1] - 1, g = h - T - l, h > I && b.MarkNextChange(), I = h + 1, b.AddOriginalElement(h + 1, g + 1), T = R + 1 - s) : (h = d[R - 1], g = h - T - l, h > I && b.MarkNextChange(), I = h, b.AddModifiedElement(h + 1, g + 1), T = R - 1 - s), q >= 0 && (d = this.m_reverseHistory[q], s = d[0], L = 1, x = d.length - 1);
      } while (--q >= -1);
      w = b.getChanges();
    }
    return this.ConcatenateChanges(y, w);
  }
  ComputeRecursionPoint(t, n, r, i, s, o, a) {
    let l = 0, u = 0, d = 0, h = 0, f = 0, m = 0;
    t--, r--, s[0] = 0, o[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
    const g = n - t + (i - r), p = g + 1, v = new Int32Array(p), C = new Int32Array(p), S = i - r, y = n - t, w = t - r, b = n - i, L = (y - S) % 2 === 0;
    v[S] = t, C[y] = n, a[0] = !1;
    for (let x = 1; x <= g / 2 + 1; x++) {
      let T = 0, I = 0;
      d = this.ClipDiagonalBound(S - x, x, S, p), h = this.ClipDiagonalBound(S + x, x, S, p);
      for (let R = d; R <= h; R += 2) {
        R === d || R < h && v[R - 1] < v[R + 1] ? l = v[R + 1] : l = v[R - 1] + 1, u = l - (R - S) - w;
        const E = l;
        for (; l < n && u < i && this.ElementsAreEqual(l + 1, u + 1); )
          l++, u++;
        if (v[R] = l, l + u > T + I && (T = l, I = u), !L && Math.abs(R - y) <= x - 1 && l >= C[R])
          return s[0] = l, o[0] = u, E <= C[R] && x <= 1448 ? this.WALKTRACE(S, d, h, w, y, f, m, b, v, C, l, n, s, u, i, o, L, a) : null;
      }
      const q = (T - t + (I - r) - x) / 2;
      if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(T, q))
        return a[0] = !0, s[0] = T, o[0] = I, q > 0 && x <= 1448 ? this.WALKTRACE(S, d, h, w, y, f, m, b, v, C, l, n, s, u, i, o, L, a) : (t++, r++, [
          new tt(
            t,
            n - t + 1,
            r,
            i - r + 1
          )
        ]);
      f = this.ClipDiagonalBound(y - x, x, y, p), m = this.ClipDiagonalBound(y + x, x, y, p);
      for (let R = f; R <= m; R += 2) {
        R === f || R < m && C[R - 1] >= C[R + 1] ? l = C[R + 1] - 1 : l = C[R - 1], u = l - (R - y) - b;
        const E = l;
        for (; l > t && u > r && this.ElementsAreEqual(l, u); )
          l--, u--;
        if (C[R] = l, L && Math.abs(R - S) <= x && l <= v[R])
          return s[0] = l, o[0] = u, E >= v[R] && x <= 1448 ? this.WALKTRACE(S, d, h, w, y, f, m, b, v, C, l, n, s, u, i, o, L, a) : null;
      }
      if (x <= 1447) {
        let R = new Int32Array(h - d + 2);
        R[0] = S - d + 1, wt.Copy2(v, d, R, 1, h - d + 1), this.m_forwardHistory.push(R), R = new Int32Array(m - f + 2), R[0] = y - f + 1, wt.Copy2(C, f, R, 1, m - f + 1), this.m_reverseHistory.push(R);
      }
    }
    return this.WALKTRACE(S, d, h, w, y, f, m, b, v, C, l, n, s, u, i, o, L, a);
  }
  PrettifyChanges(t) {
    for (let n = 0; n < t.length; n++) {
      const r = t[n], i = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, s = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, o = r.originalLength > 0, a = r.modifiedLength > 0;
      for (; r.originalStart + r.originalLength < i && r.modifiedStart + r.modifiedLength < s && (!o || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) && (!a || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength)); ) {
        const u = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart);
        if (this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) && !u)
          break;
        r.originalStart++, r.modifiedStart++;
      }
      const l = [null];
      if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], l)) {
        t[n] = l[0], t.splice(n + 1, 1), n--;
        continue;
      }
    }
    for (let n = t.length - 1; n >= 0; n--) {
      const r = t[n];
      let i = 0, s = 0;
      if (n > 0) {
        const h = t[n - 1];
        i = h.originalStart + h.originalLength, s = h.modifiedStart + h.modifiedLength;
      }
      const o = r.originalLength > 0, a = r.modifiedLength > 0;
      let l = 0, u = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength);
      for (let h = 1; ; h++) {
        const f = r.originalStart - h, m = r.modifiedStart - h;
        if (f < i || m < s || o && !this.OriginalElementsAreEqual(f, f + r.originalLength) || a && !this.ModifiedElementsAreEqual(m, m + r.modifiedLength))
          break;
        const g = (f === i && m === s ? 5 : 0) + this._boundaryScore(f, r.originalLength, m, r.modifiedLength);
        g > u && (u = g, l = h);
      }
      r.originalStart -= l, r.modifiedStart -= l;
      const d = [null];
      if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], d)) {
        t[n - 1] = d[0], t.splice(n, 1), n++;
        continue;
      }
    }
    if (this._hasStrings)
      for (let n = 1, r = t.length; n < r; n++) {
        const i = t[n - 1], s = t[n], o = s.originalStart - i.originalStart - i.originalLength, a = i.originalStart, l = s.originalStart + s.originalLength, u = l - a, d = i.modifiedStart, h = s.modifiedStart + s.modifiedLength, f = h - d;
        if (o < 5 && u < 20 && f < 20) {
          const m = this._findBetterContiguousSequence(a, u, d, f, o);
          if (m) {
            const [g, p] = m;
            (g !== i.originalStart + i.originalLength || p !== i.modifiedStart + i.modifiedLength) && (i.originalLength = g - i.originalStart, i.modifiedLength = p - i.modifiedStart, s.originalStart = g + o, s.modifiedStart = p + o, s.originalLength = l - s.originalStart, s.modifiedLength = h - s.modifiedStart);
          }
        }
      }
    return t;
  }
  _findBetterContiguousSequence(t, n, r, i, s) {
    if (n < s || i < s)
      return null;
    const o = t + n - s + 1, a = r + i - s + 1;
    let l = 0, u = 0, d = 0;
    for (let h = t; h < o; h++)
      for (let f = r; f < a; f++) {
        const m = this._contiguousSequenceScore(h, f, s);
        m > 0 && m > l && (l = m, u = h, d = f);
      }
    return l > 0 ? [u, d] : null;
  }
  _contiguousSequenceScore(t, n, r) {
    let i = 0;
    for (let s = 0; s < r; s++) {
      if (!this.ElementsAreEqual(t + s, n + s))
        return 0;
      i += this._originalStringElements[t + s].length;
    }
    return i;
  }
  _OriginalIsBoundary(t) {
    return t <= 0 || t >= this._originalElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._originalStringElements[t]);
  }
  _OriginalRegionIsBoundary(t, n) {
    if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1))
      return !0;
    if (n > 0) {
      const r = t + n;
      if (this._OriginalIsBoundary(r - 1) || this._OriginalIsBoundary(r))
        return !0;
    }
    return !1;
  }
  _ModifiedIsBoundary(t) {
    return t <= 0 || t >= this._modifiedElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[t]);
  }
  _ModifiedRegionIsBoundary(t, n) {
    if (this._ModifiedIsBoundary(t) || this._ModifiedIsBoundary(t - 1))
      return !0;
    if (n > 0) {
      const r = t + n;
      if (this._ModifiedIsBoundary(r - 1) || this._ModifiedIsBoundary(r))
        return !0;
    }
    return !1;
  }
  _boundaryScore(t, n, r, i) {
    const s = this._OriginalRegionIsBoundary(t, n) ? 1 : 0, o = this._ModifiedRegionIsBoundary(r, i) ? 1 : 0;
    return s + o;
  }
  ConcatenateChanges(t, n) {
    const r = [];
    if (t.length === 0 || n.length === 0)
      return n.length > 0 ? n : t;
    if (this.ChangesOverlap(t[t.length - 1], n[0], r)) {
      const i = new Array(t.length + n.length - 1);
      return wt.Copy(t, 0, i, 0, t.length - 1), i[t.length - 1] = r[0], wt.Copy(n, 1, i, t.length, n.length - 1), i;
    } else {
      const i = new Array(t.length + n.length);
      return wt.Copy(t, 0, i, 0, t.length), wt.Copy(n, 0, i, t.length, n.length), i;
    }
  }
  ChangesOverlap(t, n, r) {
    if (vt.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), vt.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
      const i = t.originalStart;
      let s = t.originalLength;
      const o = t.modifiedStart;
      let a = t.modifiedLength;
      return t.originalStart + t.originalLength >= n.originalStart && (s = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (a = n.modifiedStart + n.modifiedLength - t.modifiedStart), r[0] = new tt(i, s, o, a), !0;
    } else
      return r[0] = null, !1;
  }
  ClipDiagonalBound(t, n, r, i) {
    if (t >= 0 && t < i)
      return t;
    const s = r, o = i - r - 1, a = n % 2 === 0;
    if (t < 0) {
      const l = s % 2 === 0;
      return a === l ? 0 : 1;
    } else {
      const l = o % 2 === 0;
      return a === l ? i - 1 : i - 2;
    }
  }
}
let H = class lt {
  constructor(t, n) {
    this.lineNumber = t, this.column = n;
  }
  with(t = this.lineNumber, n = this.column) {
    return t === this.lineNumber && n === this.column ? this : new lt(t, n);
  }
  delta(t = 0, n = 0) {
    return this.with(this.lineNumber + t, this.column + n);
  }
  equals(t) {
    return lt.equals(this, t);
  }
  static equals(t, n) {
    return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
  }
  isBefore(t) {
    return lt.isBefore(this, t);
  }
  static isBefore(t, n) {
    return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
  }
  isBeforeOrEqual(t) {
    return lt.isBeforeOrEqual(this, t);
  }
  static isBeforeOrEqual(t, n) {
    return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
  }
  static compare(t, n) {
    const r = t.lineNumber | 0, i = n.lineNumber | 0;
    if (r === i) {
      const s = t.column | 0, o = n.column | 0;
      return s - o;
    }
    return r - i;
  }
  clone() {
    return new lt(this.lineNumber, this.column);
  }
  toString() {
    return "(" + this.lineNumber + "," + this.column + ")";
  }
  static lift(t) {
    return new lt(t.lineNumber, t.column);
  }
  static isIPosition(t) {
    return t && typeof t.lineNumber == "number" && typeof t.column == "number";
  }
  toJSON() {
    return {
      lineNumber: this.lineNumber,
      column: this.column
    };
  }
}, F = class se {
  constructor(t, n, r, i) {
    t > r || t === r && n > i ? (this.startLineNumber = r, this.startColumn = i, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = r, this.endColumn = i);
  }
  isEmpty() {
    return se.isEmpty(this);
  }
  static isEmpty(t) {
    return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
  }
  containsPosition(t) {
    return se.containsPosition(this, t);
  }
  static containsPosition(t, n) {
    return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
  }
  static strictContainsPosition(t, n) {
    return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
  }
  containsRange(t) {
    return se.containsRange(this, t);
  }
  static containsRange(t, n) {
    return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
  }
  strictContainsRange(t) {
    return se.strictContainsRange(this, t);
  }
  static strictContainsRange(t, n) {
    return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
  }
  plusRange(t) {
    return se.plusRange(this, t);
  }
  static plusRange(t, n) {
    let r, i, s, o;
    return n.startLineNumber < t.startLineNumber ? (r = n.startLineNumber, i = n.startColumn) : n.startLineNumber === t.startLineNumber ? (r = n.startLineNumber, i = Math.min(n.startColumn, t.startColumn)) : (r = t.startLineNumber, i = t.startColumn), n.endLineNumber > t.endLineNumber ? (s = n.endLineNumber, o = n.endColumn) : n.endLineNumber === t.endLineNumber ? (s = n.endLineNumber, o = Math.max(n.endColumn, t.endColumn)) : (s = t.endLineNumber, o = t.endColumn), new se(r, i, s, o);
  }
  intersectRanges(t) {
    return se.intersectRanges(this, t);
  }
  static intersectRanges(t, n) {
    let r = t.startLineNumber, i = t.startColumn, s = t.endLineNumber, o = t.endColumn;
    const a = n.startLineNumber, l = n.startColumn, u = n.endLineNumber, d = n.endColumn;
    return r < a ? (r = a, i = l) : r === a && (i = Math.max(i, l)), s > u ? (s = u, o = d) : s === u && (o = Math.min(o, d)), r > s || r === s && i > o ? null : new se(
      r,
      i,
      s,
      o
    );
  }
  equalsRange(t) {
    return se.equalsRange(this, t);
  }
  static equalsRange(t, n) {
    return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
  }
  getEndPosition() {
    return se.getEndPosition(this);
  }
  static getEndPosition(t) {
    return new H(t.endLineNumber, t.endColumn);
  }
  getStartPosition() {
    return se.getStartPosition(this);
  }
  static getStartPosition(t) {
    return new H(t.startLineNumber, t.startColumn);
  }
  toString() {
    return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
  }
  setEndPosition(t, n) {
    return new se(this.startLineNumber, this.startColumn, t, n);
  }
  setStartPosition(t, n) {
    return new se(t, n, this.endLineNumber, this.endColumn);
  }
  collapseToStart() {
    return se.collapseToStart(this);
  }
  static collapseToStart(t) {
    return new se(
      t.startLineNumber,
      t.startColumn,
      t.startLineNumber,
      t.startColumn
    );
  }
  collapseToEnd() {
    return se.collapseToEnd(this);
  }
  static collapseToEnd(t) {
    return new se(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
  }
  delta(t) {
    return new se(
      this.startLineNumber + t,
      this.startColumn,
      this.endLineNumber + t,
      this.endColumn
    );
  }
  static fromPositions(t, n = t) {
    return new se(t.lineNumber, t.column, n.lineNumber, n.column);
  }
  static lift(t) {
    return t ? new se(
      t.startLineNumber,
      t.startColumn,
      t.endLineNumber,
      t.endColumn
    ) : null;
  }
  static isIRange(t) {
    return t && typeof t.startLineNumber == "number" && typeof t.startColumn == "number" && typeof t.endLineNumber == "number" && typeof t.endColumn == "number";
  }
  static areIntersectingOrTouching(t, n) {
    return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn < n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn < t.startColumn);
  }
  static areIntersecting(t, n) {
    return !(t.endLineNumber < n.startLineNumber || t.endLineNumber === n.startLineNumber && t.endColumn <= n.startColumn || n.endLineNumber < t.startLineNumber || n.endLineNumber === t.startLineNumber && n.endColumn <= t.startColumn);
  }
  static compareRangesUsingStarts(t, n) {
    if (t && n) {
      const r = t.startLineNumber | 0, i = n.startLineNumber | 0;
      if (r === i) {
        const s = t.startColumn | 0, o = n.startColumn | 0;
        if (s === o) {
          const a = t.endLineNumber | 0, l = n.endLineNumber | 0;
          if (a === l) {
            const u = t.endColumn | 0, d = n.endColumn | 0;
            return u - d;
          }
          return a - l;
        }
        return s - o;
      }
      return r - i;
    }
    return (t ? 1 : 0) - (n ? 1 : 0);
  }
  static compareRangesUsingEnds(t, n) {
    return t.endLineNumber === n.endLineNumber ? t.endColumn === n.endColumn ? t.startLineNumber === n.startLineNumber ? t.startColumn - n.startColumn : t.startLineNumber - n.startLineNumber : t.endColumn - n.endColumn : t.endLineNumber - n.endLineNumber;
  }
  static spansMultipleLines(t) {
    return t.endLineNumber > t.startLineNumber;
  }
  toJSON() {
    return this;
  }
};
function Ri(e) {
  return e < 0 ? 0 : e > 255 ? 255 : e | 0;
}
function Ct(e) {
  return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
}
class si {
  constructor(t) {
    const n = Ri(t);
    this._defaultValue = n, this._asciiMap = si._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
  }
  static _createAsciiMap(t) {
    const n = new Uint8Array(256);
    return n.fill(t), n;
  }
  set(t, n) {
    const r = Ri(n);
    t >= 0 && t < 256 ? this._asciiMap[t] = r : this._map.set(t, r);
  }
  get(t) {
    return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
  }
  clear() {
    this._asciiMap.fill(this._defaultValue), this._map.clear();
  }
}
class Zu {
  constructor(t, n, r) {
    const i = new Uint8Array(t * n);
    for (let s = 0, o = t * n; s < o; s++)
      i[s] = r;
    this._data = i, this.rows = t, this.cols = n;
  }
  get(t, n) {
    return this._data[t * this.cols + n];
  }
  set(t, n, r) {
    this._data[t * this.cols + n] = r;
  }
}
class Yu {
  constructor(t) {
    let n = 0, r = 0;
    for (let s = 0, o = t.length; s < o; s++) {
      const [a, l, u] = t[s];
      l > n && (n = l), a > r && (r = a), u > r && (r = u);
    }
    n++, r++;
    const i = new Zu(r, n, 0);
    for (let s = 0, o = t.length; s < o; s++) {
      const [a, l, u] = t[s];
      i.set(a, l, u);
    }
    this._states = i, this._maxCharCode = n;
  }
  nextState(t, n) {
    return n < 0 || n >= this._maxCharCode ? 0 : this._states.get(t, n);
  }
}
let Hn = null;
function ec() {
  return Hn === null && (Hn = new Yu([
    [1, 104, 2],
    [1, 72, 2],
    [1, 102, 6],
    [1, 70, 6],
    [2, 116, 3],
    [2, 84, 3],
    [3, 116, 4],
    [3, 84, 4],
    [4, 112, 5],
    [4, 80, 5],
    [5, 115, 9],
    [5, 83, 9],
    [5, 58, 10],
    [6, 105, 7],
    [6, 73, 7],
    [7, 108, 8],
    [7, 76, 8],
    [8, 101, 9],
    [8, 69, 9],
    [9, 58, 10],
    [10, 47, 11],
    [11, 47, 12]
  ])), Hn;
}
let Bt = null;
function tc() {
  if (Bt === null) {
    Bt = new si(0);
    const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…`;
    for (let n = 0; n < e.length; n++)
      Bt.set(e.charCodeAt(n), 1);
    const t = ".,;:";
    for (let n = 0; n < t.length; n++)
      Bt.set(t.charCodeAt(n), 2);
  }
  return Bt;
}
class kn {
  static _createLink(t, n, r, i, s) {
    let o = s - 1;
    do {
      const a = n.charCodeAt(o);
      if (t.get(a) !== 2)
        break;
      o--;
    } while (o > i);
    if (i > 0) {
      const a = n.charCodeAt(i - 1), l = n.charCodeAt(o);
      (a === 40 && l === 41 || a === 91 && l === 93 || a === 123 && l === 125) && o--;
    }
    return {
      range: {
        startLineNumber: r,
        startColumn: i + 1,
        endLineNumber: r,
        endColumn: o + 2
      },
      url: n.substring(i, o + 1)
    };
  }
  static computeLinks(t, n = ec()) {
    const r = tc(), i = [];
    for (let s = 1, o = t.getLineCount(); s <= o; s++) {
      const a = t.getLineContent(s), l = a.length;
      let u = 0, d = 0, h = 0, f = 1, m = !1, g = !1, p = !1, v = !1;
      for (; u < l; ) {
        let C = !1;
        const S = a.charCodeAt(u);
        if (f === 13) {
          let y;
          switch (S) {
            case 40:
              m = !0, y = 0;
              break;
            case 41:
              y = m ? 0 : 1;
              break;
            case 91:
              p = !0, g = !0, y = 0;
              break;
            case 93:
              p = !1, y = g ? 0 : 1;
              break;
            case 123:
              v = !0, y = 0;
              break;
            case 125:
              y = v ? 0 : 1;
              break;
            case 39:
            case 34:
            case 96:
              h === S ? y = 1 : h === 39 || h === 34 || h === 96 ? y = 0 : y = 1;
              break;
            case 42:
              y = h === 42 ? 1 : 0;
              break;
            case 124:
              y = h === 124 ? 1 : 0;
              break;
            case 32:
              y = p ? 0 : 1;
              break;
            default:
              y = r.get(S);
          }
          y === 1 && (i.push(kn._createLink(r, a, s, d, u)), C = !0);
        } else if (f === 12) {
          let y;
          S === 91 ? (g = !0, y = 0) : y = r.get(S), y === 1 ? C = !0 : f = 13;
        } else
          f = n.nextState(f, S), f === 0 && (C = !0);
        C && (f = 1, m = !1, g = !1, v = !1, d = u + 1, h = S), u++;
      }
      f === 13 && i.push(kn._createLink(r, a, s, d, l));
    }
    return i;
  }
}
function nc(e) {
  return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : kn.computeLinks(e);
}
const fr = class {
  constructor() {
    this._defaultValueSet = [
      ["true", "false"],
      ["True", "False"],
      ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"],
      ["public", "protected", "private"]
    ];
  }
  navigateValueSet(t, n, r, i, s) {
    if (t && n) {
      const o = this.doNavigateValueSet(n, s);
      if (o)
        return {
          range: t,
          value: o
        };
    }
    if (r && i) {
      const o = this.doNavigateValueSet(i, s);
      if (o)
        return {
          range: r,
          value: o
        };
    }
    return null;
  }
  doNavigateValueSet(t, n) {
    const r = this.numberReplace(t, n);
    return r !== null ? r : this.textReplace(t, n);
  }
  numberReplace(t, n) {
    const r = Math.pow(10, t.length - (t.lastIndexOf(".") + 1));
    let i = Number(t);
    const s = parseFloat(t);
    return !isNaN(i) && !isNaN(s) && i === s ? i === 0 && !n ? null : (i = Math.floor(i * r), i += n ? r : -r, String(i / r)) : null;
  }
  textReplace(t, n) {
    return this.valueSetsReplace(this._defaultValueSet, t, n);
  }
  valueSetsReplace(t, n, r) {
    let i = null;
    for (let s = 0, o = t.length; i === null && s < o; s++)
      i = this.valueSetReplace(t[s], n, r);
    return i;
  }
  valueSetReplace(t, n, r) {
    let i = t.indexOf(n);
    return i >= 0 ? (i += r ? 1 : -1, i < 0 ? i = t.length - 1 : i %= t.length, t[i]) : null;
  }
};
fr.INSTANCE = new fr();
let rc = fr;
class oi {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(t, n) {
    this._keyCodeToStr[t] = n, this._strToKeyCode[n.toLowerCase()] = t;
  }
  keyCodeToStr(t) {
    return this._keyCodeToStr[t];
  }
  strToKeyCode(t) {
    return this._strToKeyCode[t.toLowerCase()] || 0;
  }
}
const Cn = new oi(), mr = new oi(), gr = new oi(), ic = new Array(230), sc = /* @__PURE__ */ Object.create(null), oc = /* @__PURE__ */ Object.create(null);
(function() {
  const e = "", t = [
    [1, 0, "None", 0, "unknown", 0, "VK_UNKNOWN", e, e],
    [1, 1, "Hyper", 0, e, 0, e, e, e],
    [1, 2, "Super", 0, e, 0, e, e, e],
    [1, 3, "Fn", 0, e, 0, e, e, e],
    [1, 4, "FnLock", 0, e, 0, e, e, e],
    [1, 5, "Suspend", 0, e, 0, e, e, e],
    [1, 6, "Resume", 0, e, 0, e, e, e],
    [1, 7, "Turbo", 0, e, 0, e, e, e],
    [1, 8, "Sleep", 0, e, 0, "VK_SLEEP", e, e],
    [1, 9, "WakeUp", 0, e, 0, e, e, e],
    [0, 10, "KeyA", 31, "A", 65, "VK_A", e, e],
    [0, 11, "KeyB", 32, "B", 66, "VK_B", e, e],
    [0, 12, "KeyC", 33, "C", 67, "VK_C", e, e],
    [0, 13, "KeyD", 34, "D", 68, "VK_D", e, e],
    [0, 14, "KeyE", 35, "E", 69, "VK_E", e, e],
    [0, 15, "KeyF", 36, "F", 70, "VK_F", e, e],
    [0, 16, "KeyG", 37, "G", 71, "VK_G", e, e],
    [0, 17, "KeyH", 38, "H", 72, "VK_H", e, e],
    [0, 18, "KeyI", 39, "I", 73, "VK_I", e, e],
    [0, 19, "KeyJ", 40, "J", 74, "VK_J", e, e],
    [0, 20, "KeyK", 41, "K", 75, "VK_K", e, e],
    [0, 21, "KeyL", 42, "L", 76, "VK_L", e, e],
    [0, 22, "KeyM", 43, "M", 77, "VK_M", e, e],
    [0, 23, "KeyN", 44, "N", 78, "VK_N", e, e],
    [0, 24, "KeyO", 45, "O", 79, "VK_O", e, e],
    [0, 25, "KeyP", 46, "P", 80, "VK_P", e, e],
    [0, 26, "KeyQ", 47, "Q", 81, "VK_Q", e, e],
    [0, 27, "KeyR", 48, "R", 82, "VK_R", e, e],
    [0, 28, "KeyS", 49, "S", 83, "VK_S", e, e],
    [0, 29, "KeyT", 50, "T", 84, "VK_T", e, e],
    [0, 30, "KeyU", 51, "U", 85, "VK_U", e, e],
    [0, 31, "KeyV", 52, "V", 86, "VK_V", e, e],
    [0, 32, "KeyW", 53, "W", 87, "VK_W", e, e],
    [0, 33, "KeyX", 54, "X", 88, "VK_X", e, e],
    [0, 34, "KeyY", 55, "Y", 89, "VK_Y", e, e],
    [0, 35, "KeyZ", 56, "Z", 90, "VK_Z", e, e],
    [0, 36, "Digit1", 22, "1", 49, "VK_1", e, e],
    [0, 37, "Digit2", 23, "2", 50, "VK_2", e, e],
    [0, 38, "Digit3", 24, "3", 51, "VK_3", e, e],
    [0, 39, "Digit4", 25, "4", 52, "VK_4", e, e],
    [0, 40, "Digit5", 26, "5", 53, "VK_5", e, e],
    [0, 41, "Digit6", 27, "6", 54, "VK_6", e, e],
    [0, 42, "Digit7", 28, "7", 55, "VK_7", e, e],
    [0, 43, "Digit8", 29, "8", 56, "VK_8", e, e],
    [0, 44, "Digit9", 30, "9", 57, "VK_9", e, e],
    [0, 45, "Digit0", 21, "0", 48, "VK_0", e, e],
    [1, 46, "Enter", 3, "Enter", 13, "VK_RETURN", e, e],
    [1, 47, "Escape", 9, "Escape", 27, "VK_ESCAPE", e, e],
    [1, 48, "Backspace", 1, "Backspace", 8, "VK_BACK", e, e],
    [1, 49, "Tab", 2, "Tab", 9, "VK_TAB", e, e],
    [1, 50, "Space", 10, "Space", 32, "VK_SPACE", e, e],
    [0, 51, "Minus", 88, "-", 189, "VK_OEM_MINUS", "-", "OEM_MINUS"],
    [0, 52, "Equal", 86, "=", 187, "VK_OEM_PLUS", "=", "OEM_PLUS"],
    [0, 53, "BracketLeft", 92, "[", 219, "VK_OEM_4", "[", "OEM_4"],
    [0, 54, "BracketRight", 94, "]", 221, "VK_OEM_6", "]", "OEM_6"],
    [0, 55, "Backslash", 93, "\\", 220, "VK_OEM_5", "\\", "OEM_5"],
    [0, 56, "IntlHash", 0, e, 0, e, e, e],
    [0, 57, "Semicolon", 85, ";", 186, "VK_OEM_1", ";", "OEM_1"],
    [0, 58, "Quote", 95, "'", 222, "VK_OEM_7", "'", "OEM_7"],
    [0, 59, "Backquote", 91, "`", 192, "VK_OEM_3", "`", "OEM_3"],
    [0, 60, "Comma", 87, ",", 188, "VK_OEM_COMMA", ",", "OEM_COMMA"],
    [0, 61, "Period", 89, ".", 190, "VK_OEM_PERIOD", ".", "OEM_PERIOD"],
    [0, 62, "Slash", 90, "/", 191, "VK_OEM_2", "/", "OEM_2"],
    [1, 63, "CapsLock", 8, "CapsLock", 20, "VK_CAPITAL", e, e],
    [1, 64, "F1", 59, "F1", 112, "VK_F1", e, e],
    [1, 65, "F2", 60, "F2", 113, "VK_F2", e, e],
    [1, 66, "F3", 61, "F3", 114, "VK_F3", e, e],
    [1, 67, "F4", 62, "F4", 115, "VK_F4", e, e],
    [1, 68, "F5", 63, "F5", 116, "VK_F5", e, e],
    [1, 69, "F6", 64, "F6", 117, "VK_F6", e, e],
    [1, 70, "F7", 65, "F7", 118, "VK_F7", e, e],
    [1, 71, "F8", 66, "F8", 119, "VK_F8", e, e],
    [1, 72, "F9", 67, "F9", 120, "VK_F9", e, e],
    [1, 73, "F10", 68, "F10", 121, "VK_F10", e, e],
    [1, 74, "F11", 69, "F11", 122, "VK_F11", e, e],
    [1, 75, "F12", 70, "F12", 123, "VK_F12", e, e],
    [1, 76, "PrintScreen", 0, e, 0, e, e, e],
    [1, 77, "ScrollLock", 84, "ScrollLock", 145, "VK_SCROLL", e, e],
    [1, 78, "Pause", 7, "PauseBreak", 19, "VK_PAUSE", e, e],
    [1, 79, "Insert", 19, "Insert", 45, "VK_INSERT", e, e],
    [1, 80, "Home", 14, "Home", 36, "VK_HOME", e, e],
    [1, 81, "PageUp", 11, "PageUp", 33, "VK_PRIOR", e, e],
    [1, 82, "Delete", 20, "Delete", 46, "VK_DELETE", e, e],
    [1, 83, "End", 13, "End", 35, "VK_END", e, e],
    [1, 84, "PageDown", 12, "PageDown", 34, "VK_NEXT", e, e],
    [1, 85, "ArrowRight", 17, "RightArrow", 39, "VK_RIGHT", "Right", e],
    [1, 86, "ArrowLeft", 15, "LeftArrow", 37, "VK_LEFT", "Left", e],
    [1, 87, "ArrowDown", 18, "DownArrow", 40, "VK_DOWN", "Down", e],
    [1, 88, "ArrowUp", 16, "UpArrow", 38, "VK_UP", "Up", e],
    [1, 89, "NumLock", 83, "NumLock", 144, "VK_NUMLOCK", e, e],
    [1, 90, "NumpadDivide", 113, "NumPad_Divide", 111, "VK_DIVIDE", e, e],
    [1, 91, "NumpadMultiply", 108, "NumPad_Multiply", 106, "VK_MULTIPLY", e, e],
    [1, 92, "NumpadSubtract", 111, "NumPad_Subtract", 109, "VK_SUBTRACT", e, e],
    [1, 93, "NumpadAdd", 109, "NumPad_Add", 107, "VK_ADD", e, e],
    [1, 94, "NumpadEnter", 3, e, 0, e, e, e],
    [1, 95, "Numpad1", 99, "NumPad1", 97, "VK_NUMPAD1", e, e],
    [1, 96, "Numpad2", 100, "NumPad2", 98, "VK_NUMPAD2", e, e],
    [1, 97, "Numpad3", 101, "NumPad3", 99, "VK_NUMPAD3", e, e],
    [1, 98, "Numpad4", 102, "NumPad4", 100, "VK_NUMPAD4", e, e],
    [1, 99, "Numpad5", 103, "NumPad5", 101, "VK_NUMPAD5", e, e],
    [1, 100, "Numpad6", 104, "NumPad6", 102, "VK_NUMPAD6", e, e],
    [1, 101, "Numpad7", 105, "NumPad7", 103, "VK_NUMPAD7", e, e],
    [1, 102, "Numpad8", 106, "NumPad8", 104, "VK_NUMPAD8", e, e],
    [1, 103, "Numpad9", 107, "NumPad9", 105, "VK_NUMPAD9", e, e],
    [1, 104, "Numpad0", 98, "NumPad0", 96, "VK_NUMPAD0", e, e],
    [1, 105, "NumpadDecimal", 112, "NumPad_Decimal", 110, "VK_DECIMAL", e, e],
    [0, 106, "IntlBackslash", 97, "OEM_102", 226, "VK_OEM_102", e, e],
    [1, 107, "ContextMenu", 58, "ContextMenu", 93, e, e, e],
    [1, 108, "Power", 0, e, 0, e, e, e],
    [1, 109, "NumpadEqual", 0, e, 0, e, e, e],
    [1, 110, "F13", 71, "F13", 124, "VK_F13", e, e],
    [1, 111, "F14", 72, "F14", 125, "VK_F14", e, e],
    [1, 112, "F15", 73, "F15", 126, "VK_F15", e, e],
    [1, 113, "F16", 74, "F16", 127, "VK_F16", e, e],
    [1, 114, "F17", 75, "F17", 128, "VK_F17", e, e],
    [1, 115, "F18", 76, "F18", 129, "VK_F18", e, e],
    [1, 116, "F19", 77, "F19", 130, "VK_F19", e, e],
    [1, 117, "F20", 78, "F20", 131, "VK_F20", e, e],
    [1, 118, "F21", 79, "F21", 132, "VK_F21", e, e],
    [1, 119, "F22", 80, "F22", 133, "VK_F22", e, e],
    [1, 120, "F23", 81, "F23", 134, "VK_F23", e, e],
    [1, 121, "F24", 82, "F24", 135, "VK_F24", e, e],
    [1, 122, "Open", 0, e, 0, e, e, e],
    [1, 123, "Help", 0, e, 0, e, e, e],
    [1, 124, "Select", 0, e, 0, e, e, e],
    [1, 125, "Again", 0, e, 0, e, e, e],
    [1, 126, "Undo", 0, e, 0, e, e, e],
    [1, 127, "Cut", 0, e, 0, e, e, e],
    [1, 128, "Copy", 0, e, 0, e, e, e],
    [1, 129, "Paste", 0, e, 0, e, e, e],
    [1, 130, "Find", 0, e, 0, e, e, e],
    [1, 131, "AudioVolumeMute", 117, "AudioVolumeMute", 173, "VK_VOLUME_MUTE", e, e],
    [1, 132, "AudioVolumeUp", 118, "AudioVolumeUp", 175, "VK_VOLUME_UP", e, e],
    [1, 133, "AudioVolumeDown", 119, "AudioVolumeDown", 174, "VK_VOLUME_DOWN", e, e],
    [1, 134, "NumpadComma", 110, "NumPad_Separator", 108, "VK_SEPARATOR", e, e],
    [0, 135, "IntlRo", 115, "ABNT_C1", 193, "VK_ABNT_C1", e, e],
    [1, 136, "KanaMode", 0, e, 0, e, e, e],
    [0, 137, "IntlYen", 0, e, 0, e, e, e],
    [1, 138, "Convert", 0, e, 0, e, e, e],
    [1, 139, "NonConvert", 0, e, 0, e, e, e],
    [1, 140, "Lang1", 0, e, 0, e, e, e],
    [1, 141, "Lang2", 0, e, 0, e, e, e],
    [1, 142, "Lang3", 0, e, 0, e, e, e],
    [1, 143, "Lang4", 0, e, 0, e, e, e],
    [1, 144, "Lang5", 0, e, 0, e, e, e],
    [1, 145, "Abort", 0, e, 0, e, e, e],
    [1, 146, "Props", 0, e, 0, e, e, e],
    [1, 147, "NumpadParenLeft", 0, e, 0, e, e, e],
    [1, 148, "NumpadParenRight", 0, e, 0, e, e, e],
    [1, 149, "NumpadBackspace", 0, e, 0, e, e, e],
    [1, 150, "NumpadMemoryStore", 0, e, 0, e, e, e],
    [1, 151, "NumpadMemoryRecall", 0, e, 0, e, e, e],
    [1, 152, "NumpadMemoryClear", 0, e, 0, e, e, e],
    [1, 153, "NumpadMemoryAdd", 0, e, 0, e, e, e],
    [1, 154, "NumpadMemorySubtract", 0, e, 0, e, e, e],
    [1, 155, "NumpadClear", 131, "Clear", 12, "VK_CLEAR", e, e],
    [1, 156, "NumpadClearEntry", 0, e, 0, e, e, e],
    [1, 0, e, 5, "Ctrl", 17, "VK_CONTROL", e, e],
    [1, 0, e, 4, "Shift", 16, "VK_SHIFT", e, e],
    [1, 0, e, 6, "Alt", 18, "VK_MENU", e, e],
    [1, 0, e, 57, "Meta", 91, "VK_COMMAND", e, e],
    [1, 157, "ControlLeft", 5, e, 0, "VK_LCONTROL", e, e],
    [1, 158, "ShiftLeft", 4, e, 0, "VK_LSHIFT", e, e],
    [1, 159, "AltLeft", 6, e, 0, "VK_LMENU", e, e],
    [1, 160, "MetaLeft", 57, e, 0, "VK_LWIN", e, e],
    [1, 161, "ControlRight", 5, e, 0, "VK_RCONTROL", e, e],
    [1, 162, "ShiftRight", 4, e, 0, "VK_RSHIFT", e, e],
    [1, 163, "AltRight", 6, e, 0, "VK_RMENU", e, e],
    [1, 164, "MetaRight", 57, e, 0, "VK_RWIN", e, e],
    [1, 165, "BrightnessUp", 0, e, 0, e, e, e],
    [1, 166, "BrightnessDown", 0, e, 0, e, e, e],
    [1, 167, "MediaPlay", 0, e, 0, e, e, e],
    [1, 168, "MediaRecord", 0, e, 0, e, e, e],
    [1, 169, "MediaFastForward", 0, e, 0, e, e, e],
    [1, 170, "MediaRewind", 0, e, 0, e, e, e],
    [1, 171, "MediaTrackNext", 124, "MediaTrackNext", 176, "VK_MEDIA_NEXT_TRACK", e, e],
    [1, 172, "MediaTrackPrevious", 125, "MediaTrackPrevious", 177, "VK_MEDIA_PREV_TRACK", e, e],
    [1, 173, "MediaStop", 126, "MediaStop", 178, "VK_MEDIA_STOP", e, e],
    [1, 174, "Eject", 0, e, 0, e, e, e],
    [1, 175, "MediaPlayPause", 127, "MediaPlayPause", 179, "VK_MEDIA_PLAY_PAUSE", e, e],
    [1, 176, "MediaSelect", 128, "LaunchMediaPlayer", 181, "VK_MEDIA_LAUNCH_MEDIA_SELECT", e, e],
    [1, 177, "LaunchMail", 129, "LaunchMail", 180, "VK_MEDIA_LAUNCH_MAIL", e, e],
    [1, 178, "LaunchApp2", 130, "LaunchApp2", 183, "VK_MEDIA_LAUNCH_APP2", e, e],
    [1, 179, "LaunchApp1", 0, e, 0, "VK_MEDIA_LAUNCH_APP1", e, e],
    [1, 180, "SelectTask", 0, e, 0, e, e, e],
    [1, 181, "LaunchScreenSaver", 0, e, 0, e, e, e],
    [1, 182, "BrowserSearch", 120, "BrowserSearch", 170, "VK_BROWSER_SEARCH", e, e],
    [1, 183, "BrowserHome", 121, "BrowserHome", 172, "VK_BROWSER_HOME", e, e],
    [1, 184, "BrowserBack", 122, "BrowserBack", 166, "VK_BROWSER_BACK", e, e],
    [1, 185, "BrowserForward", 123, "BrowserForward", 167, "VK_BROWSER_FORWARD", e, e],
    [1, 186, "BrowserStop", 0, e, 0, "VK_BROWSER_STOP", e, e],
    [1, 187, "BrowserRefresh", 0, e, 0, "VK_BROWSER_REFRESH", e, e],
    [1, 188, "BrowserFavorites", 0, e, 0, "VK_BROWSER_FAVORITES", e, e],
    [1, 189, "ZoomToggle", 0, e, 0, e, e, e],
    [1, 190, "MailReply", 0, e, 0, e, e, e],
    [1, 191, "MailForward", 0, e, 0, e, e, e],
    [1, 192, "MailSend", 0, e, 0, e, e, e],
    [1, 0, e, 114, "KeyInComposition", 229, e, e, e],
    [1, 0, e, 116, "ABNT_C2", 194, "VK_ABNT_C2", e, e],
    [1, 0, e, 96, "OEM_8", 223, "VK_OEM_8", e, e],
    [1, 0, e, 0, e, 0, "VK_KANA", e, e],
    [1, 0, e, 0, e, 0, "VK_HANGUL", e, e],
    [1, 0, e, 0, e, 0, "VK_JUNJA", e, e],
    [1, 0, e, 0, e, 0, "VK_FINAL", e, e],
    [1, 0, e, 0, e, 0, "VK_HANJA", e, e],
    [1, 0, e, 0, e, 0, "VK_KANJI", e, e],
    [1, 0, e, 0, e, 0, "VK_CONVERT", e, e],
    [1, 0, e, 0, e, 0, "VK_NONCONVERT", e, e],
    [1, 0, e, 0, e, 0, "VK_ACCEPT", e, e],
    [1, 0, e, 0, e, 0, "VK_MODECHANGE", e, e],
    [1, 0, e, 0, e, 0, "VK_SELECT", e, e],
    [1, 0, e, 0, e, 0, "VK_PRINT", e, e],
    [1, 0, e, 0, e, 0, "VK_EXECUTE", e, e],
    [1, 0, e, 0, e, 0, "VK_SNAPSHOT", e, e],
    [1, 0, e, 0, e, 0, "VK_HELP", e, e],
    [1, 0, e, 0, e, 0, "VK_APPS", e, e],
    [1, 0, e, 0, e, 0, "VK_PROCESSKEY", e, e],
    [1, 0, e, 0, e, 0, "VK_PACKET", e, e],
    [1, 0, e, 0, e, 0, "VK_DBE_SBCSCHAR", e, e],
    [1, 0, e, 0, e, 0, "VK_DBE_DBCSCHAR", e, e],
    [1, 0, e, 0, e, 0, "VK_ATTN", e, e],
    [1, 0, e, 0, e, 0, "VK_CRSEL", e, e],
    [1, 0, e, 0, e, 0, "VK_EXSEL", e, e],
    [1, 0, e, 0, e, 0, "VK_EREOF", e, e],
    [1, 0, e, 0, e, 0, "VK_PLAY", e, e],
    [1, 0, e, 0, e, 0, "VK_ZOOM", e, e],
    [1, 0, e, 0, e, 0, "VK_NONAME", e, e],
    [1, 0, e, 0, e, 0, "VK_PA1", e, e],
    [1, 0, e, 0, e, 0, "VK_OEM_CLEAR", e, e]
  ], n = [], r = [];
  for (const i of t) {
    const [s, o, a, l, u, d, h, f, m] = i;
    if (r[o] || (r[o] = !0, sc[a] = o, oc[a.toLowerCase()] = o), !n[l]) {
      if (n[l] = !0, !u)
        throw new Error(
          `String representation missing for key code ${l} around scan code ${a}`
        );
      Cn.define(l, u), mr.define(l, f || u), gr.define(l, m || f || u);
    }
    d && (ic[d] = l);
  }
})();
var ki;
(function(e) {
  function t(a) {
    return Cn.keyCodeToStr(a);
  }
  e.toString = t;
  function n(a) {
    return Cn.strToKeyCode(a);
  }
  e.fromString = n;
  function r(a) {
    return mr.keyCodeToStr(a);
  }
  e.toUserSettingsUS = r;
  function i(a) {
    return gr.keyCodeToStr(a);
  }
  e.toUserSettingsGeneral = i;
  function s(a) {
    return mr.strToKeyCode(a) || gr.strToKeyCode(a);
  }
  e.fromUserSettings = s;
  function o(a) {
    if (a >= 98 && a <= 113)
      return null;
    switch (a) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Cn.keyCodeToStr(a);
  }
  e.toElectronAccelerator = o;
})(ki || (ki = {}));
function ac(e, t) {
  const n = (t & 65535) << 16 >>> 0;
  return (e | n) >>> 0;
}
let ht;
const Gn = globalThis.vscode;
var Ti;
if (typeof Gn < "u" && typeof Gn.process < "u") {
  const e = Gn.process;
  ht = {
    get platform() {
      return e.platform;
    },
    get arch() {
      return e.arch;
    },
    get env() {
      return e.env;
    },
    cwd() {
      return e.cwd();
    }
  };
} else typeof process < "u" && typeof ((Ti = process == null ? void 0 : process.versions) == null ? void 0 : Ti.node) == "string" ? ht = {
  get platform() {
    return process.platform;
  },
  get arch() {
    return process.arch;
  },
  get env() {
    return process.env;
  },
  cwd() {
    return process.env.VSCODE_CWD || process.cwd();
  }
} : ht = {
  get platform() {
    return Ft ? "win32" : wu ? "darwin" : "linux";
  },
  get arch() {
  },
  get env() {
    return {};
  },
  cwd() {
    return "/";
  }
};
const Tn = ht.cwd, lc = ht.env, uc = ht.platform;
ht.arch;
const cc = 65, hc = 97, dc = 90, fc = 122, it = 46, de = 47, ve = 92, Xe = 58, mc = 63;
class Ha extends Error {
  constructor(t, n, r) {
    let i;
    typeof n == "string" && n.indexOf("not ") === 0 ? (i = "must not be", n = n.replace(/^not /, "")) : i = "must be";
    const s = t.indexOf(".") !== -1 ? "property" : "argument";
    let o = `The "${t}" ${s} ${i} of type ${n}`;
    o += `. Received type ${typeof r}`, super(o), this.code = "ERR_INVALID_ARG_TYPE";
  }
}
function gc(e, t) {
  if (e === null || typeof e != "object")
    throw new Ha(t, "Object", e);
}
function re(e, t) {
  if (typeof e != "string")
    throw new Ha(t, "string", e);
}
const Me = uc === "win32";
function U(e) {
  return e === de || e === ve;
}
function pr(e) {
  return e === de;
}
function Qe(e) {
  return e >= cc && e <= dc || e >= hc && e <= fc;
}
function Mn(e, t, n, r) {
  let i = "", s = 0, o = -1, a = 0, l = 0;
  for (let u = 0; u <= e.length; ++u) {
    if (u < e.length)
      l = e.charCodeAt(u);
    else {
      if (r(l))
        break;
      l = de;
    }
    if (r(l)) {
      if (!(o === u - 1 || a === 1)) if (a === 2) {
        if (i.length < 2 || s !== 2 || i.charCodeAt(i.length - 1) !== it || i.charCodeAt(i.length - 2) !== it) {
          if (i.length > 2) {
            const d = i.lastIndexOf(n);
            d === -1 ? (i = "", s = 0) : (i = i.slice(0, d), s = i.length - 1 - i.lastIndexOf(n)), o = u, a = 0;
            continue;
          } else if (i.length !== 0) {
            i = "", s = 0, o = u, a = 0;
            continue;
          }
        }
        t && (i += i.length > 0 ? `${n}..` : "..", s = 2);
      } else
        i.length > 0 ? i += `${n}${e.slice(o + 1, u)}` : i = e.slice(o + 1, u), s = u - o - 1;
      o = u, a = 0;
    } else l === it && a !== -1 ? ++a : a = -1;
  }
  return i;
}
function pc(e) {
  return e ? `${e[0] === "." ? "" : "."}${e}` : "";
}
function Ga(e, t) {
  gc(t, "pathObject");
  const n = t.dir || t.root, r = t.base || `${t.name || ""}${pc(t.ext)}`;
  return n ? n === t.root ? `${n}${r}` : `${n}${e}${r}` : r;
}
const ue = {
  resolve(...e) {
    let t = "", n = "", r = !1;
    for (let i = e.length - 1; i >= -1; i--) {
      let s;
      if (i >= 0) {
        if (s = e[i], re(s, `paths[${i}]`), s.length === 0)
          continue;
      } else t.length === 0 ? s = Tn() : (s = lc[`=${t}`] || Tn(), (s === void 0 || s.slice(0, 2).toLowerCase() !== t.toLowerCase() && s.charCodeAt(2) === ve) && (s = `${t}\\`));
      const o = s.length;
      let a = 0, l = "", u = !1;
      const d = s.charCodeAt(0);
      if (o === 1)
        U(d) && (a = 1, u = !0);
      else if (U(d))
        if (u = !0, U(s.charCodeAt(1))) {
          let h = 2, f = h;
          for (; h < o && !U(s.charCodeAt(h)); )
            h++;
          if (h < o && h !== f) {
            const m = s.slice(f, h);
            for (f = h; h < o && U(s.charCodeAt(h)); )
              h++;
            if (h < o && h !== f) {
              for (f = h; h < o && !U(s.charCodeAt(h)); )
                h++;
              (h === o || h !== f) && (l = `\\\\${m}\\${s.slice(f, h)}`, a = h);
            }
          }
        } else
          a = 1;
      else Qe(d) && s.charCodeAt(1) === Xe && (l = s.slice(0, 2), a = 2, o > 2 && U(s.charCodeAt(2)) && (u = !0, a = 3));
      if (l.length > 0)
        if (t.length > 0) {
          if (l.toLowerCase() !== t.toLowerCase())
            continue;
        } else
          t = l;
      if (r) {
        if (t.length > 0)
          break;
      } else if (n = `${s.slice(a)}\\${n}`, r = u, u && t.length > 0)
        break;
    }
    return n = Mn(n, !r, "\\", U), r ? `${t}\\${n}` : `${t}${n}` || ".";
  },
  normalize(e) {
    re(e, "path");
    const t = e.length;
    if (t === 0)
      return ".";
    let n = 0, r, i = !1;
    const s = e.charCodeAt(0);
    if (t === 1)
      return pr(s) ? "\\" : e;
    if (U(s))
      if (i = !0, U(e.charCodeAt(1))) {
        let a = 2, l = a;
        for (; a < t && !U(e.charCodeAt(a)); )
          a++;
        if (a < t && a !== l) {
          const u = e.slice(l, a);
          for (l = a; a < t && U(e.charCodeAt(a)); )
            a++;
          if (a < t && a !== l) {
            for (l = a; a < t && !U(e.charCodeAt(a)); )
              a++;
            if (a === t)
              return `\\\\${u}\\${e.slice(l)}\\`;
            a !== l && (r = `\\\\${u}\\${e.slice(l, a)}`, n = a);
          }
        }
      } else
        n = 1;
    else Qe(s) && e.charCodeAt(1) === Xe && (r = e.slice(0, 2), n = 2, t > 2 && U(e.charCodeAt(2)) && (i = !0, n = 3));
    let o = n < t ? Mn(e.slice(n), !i, "\\", U) : "";
    return o.length === 0 && !i && (o = "."), o.length > 0 && U(e.charCodeAt(t - 1)) && (o += "\\"), r === void 0 ? i ? `\\${o}` : o : i ? `${r}\\${o}` : `${r}${o}`;
  },
  isAbsolute(e) {
    re(e, "path");
    const t = e.length;
    if (t === 0)
      return !1;
    const n = e.charCodeAt(0);
    return U(n) || t > 2 && Qe(n) && e.charCodeAt(1) === Xe && U(e.charCodeAt(2));
  },
  join(...e) {
    if (e.length === 0)
      return ".";
    let t, n;
    for (let s = 0; s < e.length; ++s) {
      const o = e[s];
      re(o, "path"), o.length > 0 && (t === void 0 ? t = n = o : t += `\\${o}`);
    }
    if (t === void 0)
      return ".";
    let r = !0, i = 0;
    if (typeof n == "string" && U(n.charCodeAt(0))) {
      ++i;
      const s = n.length;
      s > 1 && U(n.charCodeAt(1)) && (++i, s > 2 && (U(n.charCodeAt(2)) ? ++i : r = !1));
    }
    if (r) {
      for (; i < t.length && U(t.charCodeAt(i)); )
        i++;
      i >= 2 && (t = `\\${t.slice(i)}`);
    }
    return ue.normalize(t);
  },
  relative(e, t) {
    if (re(e, "from"), re(t, "to"), e === t)
      return "";
    const n = ue.resolve(e), r = ue.resolve(t);
    if (n === r || (e = n.toLowerCase(), t = r.toLowerCase(), e === t))
      return "";
    let i = 0;
    for (; i < e.length && e.charCodeAt(i) === ve; )
      i++;
    let s = e.length;
    for (; s - 1 > i && e.charCodeAt(s - 1) === ve; )
      s--;
    const o = s - i;
    let a = 0;
    for (; a < t.length && t.charCodeAt(a) === ve; )
      a++;
    let l = t.length;
    for (; l - 1 > a && t.charCodeAt(l - 1) === ve; )
      l--;
    const u = l - a, d = o < u ? o : u;
    let h = -1, f = 0;
    for (; f < d; f++) {
      const g = e.charCodeAt(i + f);
      if (g !== t.charCodeAt(a + f))
        break;
      g === ve && (h = f);
    }
    if (f !== d) {
      if (h === -1)
        return r;
    } else {
      if (u > d) {
        if (t.charCodeAt(a + f) === ve)
          return r.slice(a + f + 1);
        if (f === 2)
          return r.slice(a + f);
      }
      o > d && (e.charCodeAt(i + f) === ve ? h = f : f === 2 && (h = 3)), h === -1 && (h = 0);
    }
    let m = "";
    for (f = i + h + 1; f <= s; ++f)
      (f === s || e.charCodeAt(f) === ve) && (m += m.length === 0 ? ".." : "\\..");
    return a += h, m.length > 0 ? `${m}${r.slice(a, l)}` : (r.charCodeAt(a) === ve && ++a, r.slice(a, l));
  },
  toNamespacedPath(e) {
    if (typeof e != "string" || e.length === 0)
      return e;
    const t = ue.resolve(e);
    if (t.length <= 2)
      return e;
    if (t.charCodeAt(0) === ve) {
      if (t.charCodeAt(1) === ve) {
        const n = t.charCodeAt(2);
        if (n !== mc && n !== it)
          return `\\\\?\\UNC\\${t.slice(2)}`;
      }
    } else if (Qe(t.charCodeAt(0)) && t.charCodeAt(1) === Xe && t.charCodeAt(2) === ve)
      return `\\\\?\\${t}`;
    return e;
  },
  dirname(e) {
    re(e, "path");
    const t = e.length;
    if (t === 0)
      return ".";
    let n = -1, r = 0;
    const i = e.charCodeAt(0);
    if (t === 1)
      return U(i) ? e : ".";
    if (U(i)) {
      if (n = r = 1, U(e.charCodeAt(1))) {
        let a = 2, l = a;
        for (; a < t && !U(e.charCodeAt(a)); )
          a++;
        if (a < t && a !== l) {
          for (l = a; a < t && U(e.charCodeAt(a)); )
            a++;
          if (a < t && a !== l) {
            for (l = a; a < t && !U(e.charCodeAt(a)); )
              a++;
            if (a === t)
              return e;
            a !== l && (n = r = a + 1);
          }
        }
      }
    } else Qe(i) && e.charCodeAt(1) === Xe && (n = t > 2 && U(e.charCodeAt(2)) ? 3 : 2, r = n);
    let s = -1, o = !0;
    for (let a = t - 1; a >= r; --a)
      if (U(e.charCodeAt(a))) {
        if (!o) {
          s = a;
          break;
        }
      } else
        o = !1;
    if (s === -1) {
      if (n === -1)
        return ".";
      s = n;
    }
    return e.slice(0, s);
  },
  basename(e, t) {
    t !== void 0 && re(t, "suffix"), re(e, "path");
    let n = 0, r = -1, i = !0, s;
    if (e.length >= 2 && Qe(e.charCodeAt(0)) && e.charCodeAt(1) === Xe && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t === e)
        return "";
      let o = t.length - 1, a = -1;
      for (s = e.length - 1; s >= n; --s) {
        const l = e.charCodeAt(s);
        if (U(l)) {
          if (!i) {
            n = s + 1;
            break;
          }
        } else
          a === -1 && (i = !1, a = s + 1), o >= 0 && (l === t.charCodeAt(o) ? --o === -1 && (r = s) : (o = -1, r = a));
      }
      return n === r ? r = a : r === -1 && (r = e.length), e.slice(n, r);
    }
    for (s = e.length - 1; s >= n; --s)
      if (U(e.charCodeAt(s))) {
        if (!i) {
          n = s + 1;
          break;
        }
      } else r === -1 && (i = !1, r = s + 1);
    return r === -1 ? "" : e.slice(n, r);
  },
  extname(e) {
    re(e, "path");
    let t = 0, n = -1, r = 0, i = -1, s = !0, o = 0;
    e.length >= 2 && e.charCodeAt(1) === Xe && Qe(e.charCodeAt(0)) && (t = r = 2);
    for (let a = e.length - 1; a >= t; --a) {
      const l = e.charCodeAt(a);
      if (U(l)) {
        if (!s) {
          r = a + 1;
          break;
        }
        continue;
      }
      i === -1 && (s = !1, i = a + 1), l === it ? n === -1 ? n = a : o !== 1 && (o = 1) : n !== -1 && (o = -1);
    }
    return n === -1 || i === -1 || o === 0 || o === 1 && n === i - 1 && n === r + 1 ? "" : e.slice(n, i);
  },
  format: Ga.bind(null, "\\"),
  parse(e) {
    re(e, "path");
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    const n = e.length;
    let r = 0, i = e.charCodeAt(0);
    if (n === 1)
      return U(i) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
    if (U(i)) {
      if (r = 1, U(e.charCodeAt(1))) {
        let h = 2, f = h;
        for (; h < n && !U(e.charCodeAt(h)); )
          h++;
        if (h < n && h !== f) {
          for (f = h; h < n && U(e.charCodeAt(h)); )
            h++;
          if (h < n && h !== f) {
            for (f = h; h < n && !U(e.charCodeAt(h)); )
              h++;
            h === n ? r = h : h !== f && (r = h + 1);
          }
        }
      }
    } else if (Qe(i) && e.charCodeAt(1) === Xe) {
      if (n <= 2)
        return t.root = t.dir = e, t;
      if (r = 2, U(e.charCodeAt(2))) {
        if (n === 3)
          return t.root = t.dir = e, t;
        r = 3;
      }
    }
    r > 0 && (t.root = e.slice(0, r));
    let s = -1, o = r, a = -1, l = !0, u = e.length - 1, d = 0;
    for (; u >= r; --u) {
      if (i = e.charCodeAt(u), U(i)) {
        if (!l) {
          o = u + 1;
          break;
        }
        continue;
      }
      a === -1 && (l = !1, a = u + 1), i === it ? s === -1 ? s = u : d !== 1 && (d = 1) : s !== -1 && (d = -1);
    }
    return a !== -1 && (s === -1 || d === 0 || d === 1 && s === a - 1 && s === o + 1 ? t.base = t.name = e.slice(o, a) : (t.name = e.slice(o, s), t.base = e.slice(o, a), t.ext = e.slice(s, a))), o > 0 && o !== r ? t.dir = e.slice(0, o - 1) : t.dir = t.root, t;
  },
  sep: "\\",
  delimiter: ";",
  win32: null,
  posix: null
}, bc = (() => {
  if (Me) {
    const e = /\\/g;
    return () => {
      const t = Tn().replace(e, "/");
      return t.slice(t.indexOf("/"));
    };
  }
  return () => Tn();
})(), X = {
  resolve(...e) {
    let t = "", n = !1;
    for (let r = e.length - 1; r >= -1 && !n; r--) {
      const i = r >= 0 ? e[r] : bc();
      re(i, `paths[${r}]`), i.length !== 0 && (t = `${i}/${t}`, n = i.charCodeAt(0) === de);
    }
    return t = Mn(t, !n, "/", pr), n ? `/${t}` : t.length > 0 ? t : ".";
  },
  normalize(e) {
    if (re(e, "path"), e.length === 0)
      return ".";
    const t = e.charCodeAt(0) === de, n = e.charCodeAt(e.length - 1) === de;
    return e = Mn(e, !t, "/", pr), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
  },
  isAbsolute(e) {
    return re(e, "path"), e.length > 0 && e.charCodeAt(0) === de;
  },
  join(...e) {
    if (e.length === 0)
      return ".";
    let t;
    for (let n = 0; n < e.length; ++n) {
      const r = e[n];
      re(r, "path"), r.length > 0 && (t === void 0 ? t = r : t += `/${r}`);
    }
    return t === void 0 ? "." : X.normalize(t);
  },
  relative(e, t) {
    if (re(e, "from"), re(t, "to"), e === t || (e = X.resolve(e), t = X.resolve(t), e === t))
      return "";
    const n = 1, r = e.length, i = r - n, s = 1, o = t.length - s, a = i < o ? i : o;
    let l = -1, u = 0;
    for (; u < a; u++) {
      const h = e.charCodeAt(n + u);
      if (h !== t.charCodeAt(s + u))
        break;
      h === de && (l = u);
    }
    if (u === a)
      if (o > a) {
        if (t.charCodeAt(s + u) === de)
          return t.slice(s + u + 1);
        if (u === 0)
          return t.slice(s + u);
      } else i > a && (e.charCodeAt(n + u) === de ? l = u : u === 0 && (l = 0));
    let d = "";
    for (u = n + l + 1; u <= r; ++u)
      (u === r || e.charCodeAt(u) === de) && (d += d.length === 0 ? ".." : "/..");
    return `${d}${t.slice(s + l)}`;
  },
  toNamespacedPath(e) {
    return e;
  },
  dirname(e) {
    if (re(e, "path"), e.length === 0)
      return ".";
    const t = e.charCodeAt(0) === de;
    let n = -1, r = !0;
    for (let i = e.length - 1; i >= 1; --i)
      if (e.charCodeAt(i) === de) {
        if (!r) {
          n = i;
          break;
        }
      } else
        r = !1;
    return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
  },
  basename(e, t) {
    t !== void 0 && re(t, "ext"), re(e, "path");
    let n = 0, r = -1, i = !0, s;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t === e)
        return "";
      let o = t.length - 1, a = -1;
      for (s = e.length - 1; s >= 0; --s) {
        const l = e.charCodeAt(s);
        if (l === de) {
          if (!i) {
            n = s + 1;
            break;
          }
        } else
          a === -1 && (i = !1, a = s + 1), o >= 0 && (l === t.charCodeAt(o) ? --o === -1 && (r = s) : (o = -1, r = a));
      }
      return n === r ? r = a : r === -1 && (r = e.length), e.slice(n, r);
    }
    for (s = e.length - 1; s >= 0; --s)
      if (e.charCodeAt(s) === de) {
        if (!i) {
          n = s + 1;
          break;
        }
      } else r === -1 && (i = !1, r = s + 1);
    return r === -1 ? "" : e.slice(n, r);
  },
  extname(e) {
    re(e, "path");
    let t = -1, n = 0, r = -1, i = !0, s = 0;
    for (let o = e.length - 1; o >= 0; --o) {
      const a = e.charCodeAt(o);
      if (a === de) {
        if (!i) {
          n = o + 1;
          break;
        }
        continue;
      }
      r === -1 && (i = !1, r = o + 1), a === it ? t === -1 ? t = o : s !== 1 && (s = 1) : t !== -1 && (s = -1);
    }
    return t === -1 || r === -1 || s === 0 || s === 1 && t === r - 1 && t === n + 1 ? "" : e.slice(t, r);
  },
  format: Ga.bind(null, "/"),
  parse(e) {
    re(e, "path");
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    const n = e.charCodeAt(0) === de;
    let r;
    n ? (t.root = "/", r = 1) : r = 0;
    let i = -1, s = 0, o = -1, a = !0, l = e.length - 1, u = 0;
    for (; l >= r; --l) {
      const d = e.charCodeAt(l);
      if (d === de) {
        if (!a) {
          s = l + 1;
          break;
        }
        continue;
      }
      o === -1 && (a = !1, o = l + 1), d === it ? i === -1 ? i = l : u !== 1 && (u = 1) : i !== -1 && (u = -1);
    }
    if (o !== -1) {
      const d = s === 0 && n ? 1 : s;
      i === -1 || u === 0 || u === 1 && i === o - 1 && i === s + 1 ? t.base = t.name = e.slice(d, o) : (t.name = e.slice(d, i), t.base = e.slice(d, o), t.ext = e.slice(i, o));
    }
    return s > 0 ? t.dir = e.slice(0, s - 1) : n && (t.dir = "/"), t;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
X.win32 = ue.win32 = ue;
X.posix = ue.posix = X;
const yc = Me ? ue.normalize : X.normalize;
Me ? ue.isAbsolute : X.isAbsolute;
const vc = Me ? ue.join : X.join, wc = Me ? ue.resolve : X.resolve, Cc = Me ? ue.relative : X.relative, Lc = Me ? ue.dirname : X.dirname;
Me ? ue.basename : X.basename;
Me ? ue.extname : X.extname;
Me ? ue.parse : X.parse;
const Ln = Me ? ue.sep : X.sep;
Me ? ue.delimiter : X.delimiter;
const Sc = /^\w[\w\d+.-]*$/, xc = /^\//, Nc = /^\/\//;
function Ec(e, t) {
  if (!e.scheme && t)
    throw new Error(
      `[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`
    );
  if (e.scheme && !Sc.test(e.scheme))
    throw new Error("[UriError]: Scheme contains illegal characters.");
  if (e.path) {
    if (e.authority) {
      if (!xc.test(e.path))
        throw new Error(
          '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
        );
    } else if (Nc.test(e.path))
      throw new Error(
        '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
      );
  }
}
function _c(e, t) {
  return !e && !t ? "file" : e;
}
function Ac(e, t) {
  switch (e) {
    case "https":
    case "http":
    case "file":
      t ? t[0] !== Ie && (t = Ie + t) : t = Ie;
      break;
  }
  return t;
}
const Q = "", Ie = "/", Rc = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
let we = class Sn {
  static isUri(t) {
    return t instanceof Sn ? !0 : t ? typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function" : !1;
  }
  constructor(t, n, r, i, s, o = !1) {
    typeof t == "object" ? (this.scheme = t.scheme || Q, this.authority = t.authority || Q, this.path = t.path || Q, this.query = t.query || Q, this.fragment = t.fragment || Q) : (this.scheme = _c(t, o), this.authority = n || Q, this.path = Ac(this.scheme, r || Q), this.query = i || Q, this.fragment = s || Q, Ec(this, o));
  }
  get fsPath() {
    return On(this, !1);
  }
  with(t) {
    if (!t)
      return this;
    let { scheme: n, authority: r, path: i, query: s, fragment: o } = t;
    return n === void 0 ? n = this.scheme : n === null && (n = Q), r === void 0 ? r = this.authority : r === null && (r = Q), i === void 0 ? i = this.path : i === null && (i = Q), s === void 0 ? s = this.query : s === null && (s = Q), o === void 0 ? o = this.fragment : o === null && (o = Q), n === this.scheme && r === this.authority && i === this.path && s === this.query && o === this.fragment ? this : new Lt(n, r, i, s, o);
  }
  static parse(t, n = !1) {
    const r = Rc.exec(t);
    return r ? new Lt(
      r[2] || Q,
      fn(r[4] || Q),
      fn(r[5] || Q),
      fn(r[7] || Q),
      fn(r[9] || Q),
      n
    ) : new Lt(Q, Q, Q, Q, Q);
  }
  static file(t) {
    let n = Q;
    if (Ft && (t = t.replace(/\\/g, Ie)), t[0] === Ie && t[1] === Ie) {
      const r = t.indexOf(Ie, 2);
      r === -1 ? (n = t.substring(2), t = Ie) : (n = t.substring(2, r), t = t.substring(r) || Ie);
    }
    return new Lt("file", n, t, Q, Q);
  }
  static from(t, n) {
    return new Lt(
      t.scheme,
      t.authority,
      t.path,
      t.query,
      t.fragment,
      n
    );
  }
  static joinPath(t, ...n) {
    if (!t.path)
      throw new Error("[UriError]: cannot call joinPath on URI without path");
    let r;
    return Ft && t.scheme === "file" ? r = Sn.file(ue.join(On(t, !0), ...n)).path : r = X.join(t.path, ...n), t.with({ path: r });
  }
  toString(t = !1) {
    return br(this, t);
  }
  toJSON() {
    return this;
  }
  static revive(t) {
    if (t) {
      if (t instanceof Sn)
        return t;
      {
        const n = new Lt(t);
        return n._formatted = t.external ?? null, n._fsPath = t._sep === Ja ? t.fsPath ?? null : null, n;
      }
    } else return t;
  }
  [Symbol.for("debug.description")]() {
    return `URI(${this.toString()})`;
  }
};
const Ja = Ft ? 1 : void 0;
class Lt extends we {
  constructor() {
    super(...arguments), this._formatted = null, this._fsPath = null;
  }
  get fsPath() {
    return this._fsPath || (this._fsPath = On(this, !1)), this._fsPath;
  }
  toString(t = !1) {
    return t ? br(this, !0) : (this._formatted || (this._formatted = br(this, !1)), this._formatted);
  }
  toJSON() {
    const t = {
      $mid: 1
    };
    return this._fsPath && (t.fsPath = this._fsPath, t._sep = Ja), this._formatted && (t.external = this._formatted), this.path && (t.path = this.path), this.scheme && (t.scheme = this.scheme), this.authority && (t.authority = this.authority), this.query && (t.query = this.query), this.fragment && (t.fragment = this.fragment), t;
  }
}
const Xa = {
  58: "%3A",
  47: "%2F",
  63: "%3F",
  35: "%23",
  91: "%5B",
  93: "%5D",
  64: "%40",
  33: "%21",
  36: "%24",
  38: "%26",
  39: "%27",
  40: "%28",
  41: "%29",
  42: "%2A",
  43: "%2B",
  44: "%2C",
  59: "%3B",
  61: "%3D",
  32: "%20"
};
function Mi(e, t, n) {
  let r, i = -1;
  for (let s = 0; s < e.length; s++) {
    const o = e.charCodeAt(s);
    if (o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || o === 45 || o === 46 || o === 95 || o === 126 || t && o === 47 || n && o === 91 || n && o === 93 || n && o === 58)
      i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r !== void 0 && (r += e.charAt(s));
    else {
      r === void 0 && (r = e.substr(0, s));
      const a = Xa[o];
      a !== void 0 ? (i !== -1 && (r += encodeURIComponent(e.substring(i, s)), i = -1), r += a) : i === -1 && (i = s);
    }
  }
  return i !== -1 && (r += encodeURIComponent(e.substring(i))), r !== void 0 ? r : e;
}
function kc(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const r = e.charCodeAt(n);
    r === 35 || r === 63 ? (t === void 0 && (t = e.substr(0, n)), t += Xa[r]) : t !== void 0 && (t += e[n]);
  }
  return t !== void 0 ? t : e;
}
function On(e, t) {
  let n;
  return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, Ft && (n = n.replace(/\//g, "\\")), n;
}
function br(e, t) {
  const n = t ? kc : Mi;
  let r = "", { scheme: i, authority: s, path: o, query: a, fragment: l } = e;
  if (i && (r += i, r += ":"), (s || i === "file") && (r += Ie, r += Ie), s) {
    let u = s.indexOf("@");
    if (u !== -1) {
      const d = s.substr(0, u);
      s = s.substr(u + 1), u = d.lastIndexOf(":"), u === -1 ? r += n(d, !1, !1) : (r += n(d.substr(0, u), !1, !1), r += ":", r += n(d.substr(u + 1), !1, !0)), r += "@";
    }
    s = s.toLowerCase(), u = s.lastIndexOf(":"), u === -1 ? r += n(s, !1, !0) : (r += n(s.substr(0, u), !1, !0), r += s.substr(u));
  }
  if (o) {
    if (o.length >= 3 && o.charCodeAt(0) === 47 && o.charCodeAt(2) === 58) {
      const u = o.charCodeAt(1);
      u >= 65 && u <= 90 && (o = `/${String.fromCharCode(u + 32)}:${o.substr(3)}`);
    } else if (o.length >= 2 && o.charCodeAt(1) === 58) {
      const u = o.charCodeAt(0);
      u >= 65 && u <= 90 && (o = `${String.fromCharCode(u + 32)}:${o.substr(2)}`);
    }
    r += n(o, !0, !1);
  }
  return a && (r += "?", r += n(a, !1, !1)), l && (r += "#", r += t ? l : Mi(l, !1, !1)), r;
}
function Qa(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e.length > 3 ? e.substr(0, 3) + Qa(e.substr(3)) : e;
  }
}
const Oi = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function fn(e) {
  return e.match(Oi) ? e.replace(Oi, (t) => Qa(t)) : e;
}
class Le extends F {
  constructor(t, n, r, i) {
    super(t, n, r, i), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = r, this.positionColumn = i;
  }
  toString() {
    return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
  }
  equalsSelection(t) {
    return Le.selectionsEqual(this, t);
  }
  static selectionsEqual(t, n) {
    return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
  }
  getDirection() {
    return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
  }
  setEndPosition(t, n) {
    return this.getDirection() === 0 ? new Le(this.startLineNumber, this.startColumn, t, n) : new Le(t, n, this.startLineNumber, this.startColumn);
  }
  getPosition() {
    return new H(this.positionLineNumber, this.positionColumn);
  }
  getSelectionStart() {
    return new H(this.selectionStartLineNumber, this.selectionStartColumn);
  }
  setStartPosition(t, n) {
    return this.getDirection() === 0 ? new Le(t, n, this.endLineNumber, this.endColumn) : new Le(this.endLineNumber, this.endColumn, t, n);
  }
  static fromPositions(t, n = t) {
    return new Le(t.lineNumber, t.column, n.lineNumber, n.column);
  }
  static fromRange(t, n) {
    return n === 0 ? new Le(
      t.startLineNumber,
      t.startColumn,
      t.endLineNumber,
      t.endColumn
    ) : new Le(
      t.endLineNumber,
      t.endColumn,
      t.startLineNumber,
      t.startColumn
    );
  }
  static liftSelection(t) {
    return new Le(
      t.selectionStartLineNumber,
      t.selectionStartColumn,
      t.positionLineNumber,
      t.positionColumn
    );
  }
  static selectionsArrEqual(t, n) {
    if (t && !n || !t && n)
      return !1;
    if (!t && !n)
      return !0;
    if (t.length !== n.length)
      return !1;
    for (let r = 0, i = t.length; r < i; r++)
      if (!this.selectionsEqual(t[r], n[r]))
        return !1;
    return !0;
  }
  static isISelection(t) {
    return t && typeof t.selectionStartLineNumber == "number" && typeof t.selectionStartColumn == "number" && typeof t.positionLineNumber == "number" && typeof t.positionColumn == "number";
  }
  static createWithDirection(t, n, r, i, s) {
    return s === 0 ? new Le(t, n, r, i) : new Le(r, i, t, n);
  }
}
function Tc(e) {
  return typeof e == "string";
}
const Pi = /* @__PURE__ */ Object.create(null);
function c(e, t) {
  if (Tc(t)) {
    const n = Pi[t];
    if (n === void 0)
      throw new Error(`${e} references an unknown codicon: ${t}`);
    t = n;
  }
  return Pi[e] = t, { id: e };
}
const Mc = {
  add: c("add", 6e4),
  plus: c("plus", 6e4),
  gistNew: c("gist-new", 6e4),
  repoCreate: c("repo-create", 6e4),
  lightbulb: c("lightbulb", 60001),
  lightBulb: c("light-bulb", 60001),
  repo: c("repo", 60002),
  repoDelete: c("repo-delete", 60002),
  gistFork: c("gist-fork", 60003),
  repoForked: c("repo-forked", 60003),
  gitPullRequest: c("git-pull-request", 60004),
  gitPullRequestAbandoned: c("git-pull-request-abandoned", 60004),
  recordKeys: c("record-keys", 60005),
  keyboard: c("keyboard", 60005),
  tag: c("tag", 60006),
  gitPullRequestLabel: c("git-pull-request-label", 60006),
  tagAdd: c("tag-add", 60006),
  tagRemove: c("tag-remove", 60006),
  person: c("person", 60007),
  personFollow: c("person-follow", 60007),
  personOutline: c("person-outline", 60007),
  personFilled: c("person-filled", 60007),
  gitBranch: c("git-branch", 60008),
  gitBranchCreate: c("git-branch-create", 60008),
  gitBranchDelete: c("git-branch-delete", 60008),
  sourceControl: c("source-control", 60008),
  mirror: c("mirror", 60009),
  mirrorPublic: c("mirror-public", 60009),
  star: c("star", 60010),
  starAdd: c("star-add", 60010),
  starDelete: c("star-delete", 60010),
  starEmpty: c("star-empty", 60010),
  comment: c("comment", 60011),
  commentAdd: c("comment-add", 60011),
  alert: c("alert", 60012),
  warning: c("warning", 60012),
  search: c("search", 60013),
  searchSave: c("search-save", 60013),
  logOut: c("log-out", 60014),
  signOut: c("sign-out", 60014),
  logIn: c("log-in", 60015),
  signIn: c("sign-in", 60015),
  eye: c("eye", 60016),
  eyeUnwatch: c("eye-unwatch", 60016),
  eyeWatch: c("eye-watch", 60016),
  circleFilled: c("circle-filled", 60017),
  primitiveDot: c("primitive-dot", 60017),
  closeDirty: c("close-dirty", 60017),
  debugBreakpoint: c("debug-breakpoint", 60017),
  debugBreakpointDisabled: c("debug-breakpoint-disabled", 60017),
  debugHint: c("debug-hint", 60017),
  terminalDecorationSuccess: c("terminal-decoration-success", 60017),
  primitiveSquare: c("primitive-square", 60018),
  edit: c("edit", 60019),
  pencil: c("pencil", 60019),
  info: c("info", 60020),
  issueOpened: c("issue-opened", 60020),
  gistPrivate: c("gist-private", 60021),
  gitForkPrivate: c("git-fork-private", 60021),
  lock: c("lock", 60021),
  mirrorPrivate: c("mirror-private", 60021),
  close: c("close", 60022),
  removeClose: c("remove-close", 60022),
  x: c("x", 60022),
  repoSync: c("repo-sync", 60023),
  sync: c("sync", 60023),
  clone: c("clone", 60024),
  desktopDownload: c("desktop-download", 60024),
  beaker: c("beaker", 60025),
  microscope: c("microscope", 60025),
  vm: c("vm", 60026),
  deviceDesktop: c("device-desktop", 60026),
  file: c("file", 60027),
  fileText: c("file-text", 60027),
  more: c("more", 60028),
  ellipsis: c("ellipsis", 60028),
  kebabHorizontal: c("kebab-horizontal", 60028),
  mailReply: c("mail-reply", 60029),
  reply: c("reply", 60029),
  organization: c("organization", 60030),
  organizationFilled: c("organization-filled", 60030),
  organizationOutline: c("organization-outline", 60030),
  newFile: c("new-file", 60031),
  fileAdd: c("file-add", 60031),
  newFolder: c("new-folder", 60032),
  fileDirectoryCreate: c("file-directory-create", 60032),
  trash: c("trash", 60033),
  trashcan: c("trashcan", 60033),
  history: c("history", 60034),
  clock: c("clock", 60034),
  folder: c("folder", 60035),
  fileDirectory: c("file-directory", 60035),
  symbolFolder: c("symbol-folder", 60035),
  logoGithub: c("logo-github", 60036),
  markGithub: c("mark-github", 60036),
  github: c("github", 60036),
  terminal: c("terminal", 60037),
  console: c("console", 60037),
  repl: c("repl", 60037),
  zap: c("zap", 60038),
  symbolEvent: c("symbol-event", 60038),
  error: c("error", 60039),
  stop: c("stop", 60039),
  variable: c("variable", 60040),
  symbolVariable: c("symbol-variable", 60040),
  array: c("array", 60042),
  symbolArray: c("symbol-array", 60042),
  symbolModule: c("symbol-module", 60043),
  symbolPackage: c("symbol-package", 60043),
  symbolNamespace: c("symbol-namespace", 60043),
  symbolObject: c("symbol-object", 60043),
  symbolMethod: c("symbol-method", 60044),
  symbolFunction: c("symbol-function", 60044),
  symbolConstructor: c("symbol-constructor", 60044),
  symbolBoolean: c("symbol-boolean", 60047),
  symbolNull: c("symbol-null", 60047),
  symbolNumeric: c("symbol-numeric", 60048),
  symbolNumber: c("symbol-number", 60048),
  symbolStructure: c("symbol-structure", 60049),
  symbolStruct: c("symbol-struct", 60049),
  symbolParameter: c("symbol-parameter", 60050),
  symbolTypeParameter: c("symbol-type-parameter", 60050),
  symbolKey: c("symbol-key", 60051),
  symbolText: c("symbol-text", 60051),
  symbolReference: c("symbol-reference", 60052),
  goToFile: c("go-to-file", 60052),
  symbolEnum: c("symbol-enum", 60053),
  symbolValue: c("symbol-value", 60053),
  symbolRuler: c("symbol-ruler", 60054),
  symbolUnit: c("symbol-unit", 60054),
  activateBreakpoints: c("activate-breakpoints", 60055),
  archive: c("archive", 60056),
  arrowBoth: c("arrow-both", 60057),
  arrowDown: c("arrow-down", 60058),
  arrowLeft: c("arrow-left", 60059),
  arrowRight: c("arrow-right", 60060),
  arrowSmallDown: c("arrow-small-down", 60061),
  arrowSmallLeft: c("arrow-small-left", 60062),
  arrowSmallRight: c("arrow-small-right", 60063),
  arrowSmallUp: c("arrow-small-up", 60064),
  arrowUp: c("arrow-up", 60065),
  bell: c("bell", 60066),
  bold: c("bold", 60067),
  book: c("book", 60068),
  bookmark: c("bookmark", 60069),
  debugBreakpointConditionalUnverified: c("debug-breakpoint-conditional-unverified", 60070),
  debugBreakpointConditional: c("debug-breakpoint-conditional", 60071),
  debugBreakpointConditionalDisabled: c("debug-breakpoint-conditional-disabled", 60071),
  debugBreakpointDataUnverified: c("debug-breakpoint-data-unverified", 60072),
  debugBreakpointData: c("debug-breakpoint-data", 60073),
  debugBreakpointDataDisabled: c("debug-breakpoint-data-disabled", 60073),
  debugBreakpointLogUnverified: c("debug-breakpoint-log-unverified", 60074),
  debugBreakpointLog: c("debug-breakpoint-log", 60075),
  debugBreakpointLogDisabled: c("debug-breakpoint-log-disabled", 60075),
  briefcase: c("briefcase", 60076),
  broadcast: c("broadcast", 60077),
  browser: c("browser", 60078),
  bug: c("bug", 60079),
  calendar: c("calendar", 60080),
  caseSensitive: c("case-sensitive", 60081),
  check: c("check", 60082),
  checklist: c("checklist", 60083),
  chevronDown: c("chevron-down", 60084),
  chevronLeft: c("chevron-left", 60085),
  chevronRight: c("chevron-right", 60086),
  chevronUp: c("chevron-up", 60087),
  chromeClose: c("chrome-close", 60088),
  chromeMaximize: c("chrome-maximize", 60089),
  chromeMinimize: c("chrome-minimize", 60090),
  chromeRestore: c("chrome-restore", 60091),
  circleOutline: c("circle-outline", 60092),
  circle: c("circle", 60092),
  debugBreakpointUnverified: c("debug-breakpoint-unverified", 60092),
  terminalDecorationIncomplete: c("terminal-decoration-incomplete", 60092),
  circleSlash: c("circle-slash", 60093),
  circuitBoard: c("circuit-board", 60094),
  clearAll: c("clear-all", 60095),
  clippy: c("clippy", 60096),
  closeAll: c("close-all", 60097),
  cloudDownload: c("cloud-download", 60098),
  cloudUpload: c("cloud-upload", 60099),
  code: c("code", 60100),
  collapseAll: c("collapse-all", 60101),
  colorMode: c("color-mode", 60102),
  commentDiscussion: c("comment-discussion", 60103),
  creditCard: c("credit-card", 60105),
  dash: c("dash", 60108),
  dashboard: c("dashboard", 60109),
  database: c("database", 60110),
  debugContinue: c("debug-continue", 60111),
  debugDisconnect: c("debug-disconnect", 60112),
  debugPause: c("debug-pause", 60113),
  debugRestart: c("debug-restart", 60114),
  debugStart: c("debug-start", 60115),
  debugStepInto: c("debug-step-into", 60116),
  debugStepOut: c("debug-step-out", 60117),
  debugStepOver: c("debug-step-over", 60118),
  debugStop: c("debug-stop", 60119),
  debug: c("debug", 60120),
  deviceCameraVideo: c("device-camera-video", 60121),
  deviceCamera: c("device-camera", 60122),
  deviceMobile: c("device-mobile", 60123),
  diffAdded: c("diff-added", 60124),
  diffIgnored: c("diff-ignored", 60125),
  diffModified: c("diff-modified", 60126),
  diffRemoved: c("diff-removed", 60127),
  diffRenamed: c("diff-renamed", 60128),
  diff: c("diff", 60129),
  diffSidebyside: c("diff-sidebyside", 60129),
  discard: c("discard", 60130),
  editorLayout: c("editor-layout", 60131),
  emptyWindow: c("empty-window", 60132),
  exclude: c("exclude", 60133),
  extensions: c("extensions", 60134),
  eyeClosed: c("eye-closed", 60135),
  fileBinary: c("file-binary", 60136),
  fileCode: c("file-code", 60137),
  fileMedia: c("file-media", 60138),
  filePdf: c("file-pdf", 60139),
  fileSubmodule: c("file-submodule", 60140),
  fileSymlinkDirectory: c("file-symlink-directory", 60141),
  fileSymlinkFile: c("file-symlink-file", 60142),
  fileZip: c("file-zip", 60143),
  files: c("files", 60144),
  filter: c("filter", 60145),
  flame: c("flame", 60146),
  foldDown: c("fold-down", 60147),
  foldUp: c("fold-up", 60148),
  fold: c("fold", 60149),
  folderActive: c("folder-active", 60150),
  folderOpened: c("folder-opened", 60151),
  gear: c("gear", 60152),
  gift: c("gift", 60153),
  gistSecret: c("gist-secret", 60154),
  gist: c("gist", 60155),
  gitCommit: c("git-commit", 60156),
  gitCompare: c("git-compare", 60157),
  compareChanges: c("compare-changes", 60157),
  gitMerge: c("git-merge", 60158),
  githubAction: c("github-action", 60159),
  githubAlt: c("github-alt", 60160),
  globe: c("globe", 60161),
  grabber: c("grabber", 60162),
  graph: c("graph", 60163),
  gripper: c("gripper", 60164),
  heart: c("heart", 60165),
  home: c("home", 60166),
  horizontalRule: c("horizontal-rule", 60167),
  hubot: c("hubot", 60168),
  inbox: c("inbox", 60169),
  issueReopened: c("issue-reopened", 60171),
  issues: c("issues", 60172),
  italic: c("italic", 60173),
  jersey: c("jersey", 60174),
  json: c("json", 60175),
  kebabVertical: c("kebab-vertical", 60176),
  key: c("key", 60177),
  law: c("law", 60178),
  lightbulbAutofix: c("lightbulb-autofix", 60179),
  linkExternal: c("link-external", 60180),
  link: c("link", 60181),
  listOrdered: c("list-ordered", 60182),
  listUnordered: c("list-unordered", 60183),
  liveShare: c("live-share", 60184),
  loading: c("loading", 60185),
  location: c("location", 60186),
  mailRead: c("mail-read", 60187),
  mail: c("mail", 60188),
  markdown: c("markdown", 60189),
  megaphone: c("megaphone", 60190),
  mention: c("mention", 60191),
  milestone: c("milestone", 60192),
  gitPullRequestMilestone: c("git-pull-request-milestone", 60192),
  mortarBoard: c("mortar-board", 60193),
  move: c("move", 60194),
  multipleWindows: c("multiple-windows", 60195),
  mute: c("mute", 60196),
  noNewline: c("no-newline", 60197),
  note: c("note", 60198),
  octoface: c("octoface", 60199),
  openPreview: c("open-preview", 60200),
  package: c("package", 60201),
  paintcan: c("paintcan", 60202),
  pin: c("pin", 60203),
  play: c("play", 60204),
  run: c("run", 60204),
  plug: c("plug", 60205),
  preserveCase: c("preserve-case", 60206),
  preview: c("preview", 60207),
  project: c("project", 60208),
  pulse: c("pulse", 60209),
  question: c("question", 60210),
  quote: c("quote", 60211),
  radioTower: c("radio-tower", 60212),
  reactions: c("reactions", 60213),
  references: c("references", 60214),
  refresh: c("refresh", 60215),
  regex: c("regex", 60216),
  remoteExplorer: c("remote-explorer", 60217),
  remote: c("remote", 60218),
  remove: c("remove", 60219),
  replaceAll: c("replace-all", 60220),
  replace: c("replace", 60221),
  repoClone: c("repo-clone", 60222),
  repoForcePush: c("repo-force-push", 60223),
  repoPull: c("repo-pull", 60224),
  repoPush: c("repo-push", 60225),
  report: c("report", 60226),
  requestChanges: c("request-changes", 60227),
  rocket: c("rocket", 60228),
  rootFolderOpened: c("root-folder-opened", 60229),
  rootFolder: c("root-folder", 60230),
  rss: c("rss", 60231),
  ruby: c("ruby", 60232),
  saveAll: c("save-all", 60233),
  saveAs: c("save-as", 60234),
  save: c("save", 60235),
  screenFull: c("screen-full", 60236),
  screenNormal: c("screen-normal", 60237),
  searchStop: c("search-stop", 60238),
  server: c("server", 60240),
  settingsGear: c("settings-gear", 60241),
  settings: c("settings", 60242),
  shield: c("shield", 60243),
  smiley: c("smiley", 60244),
  sortPrecedence: c("sort-precedence", 60245),
  splitHorizontal: c("split-horizontal", 60246),
  splitVertical: c("split-vertical", 60247),
  squirrel: c("squirrel", 60248),
  starFull: c("star-full", 60249),
  starHalf: c("star-half", 60250),
  symbolClass: c("symbol-class", 60251),
  symbolColor: c("symbol-color", 60252),
  symbolConstant: c("symbol-constant", 60253),
  symbolEnumMember: c("symbol-enum-member", 60254),
  symbolField: c("symbol-field", 60255),
  symbolFile: c("symbol-file", 60256),
  symbolInterface: c("symbol-interface", 60257),
  symbolKeyword: c("symbol-keyword", 60258),
  symbolMisc: c("symbol-misc", 60259),
  symbolOperator: c("symbol-operator", 60260),
  symbolProperty: c("symbol-property", 60261),
  wrench: c("wrench", 60261),
  wrenchSubaction: c("wrench-subaction", 60261),
  symbolSnippet: c("symbol-snippet", 60262),
  tasklist: c("tasklist", 60263),
  telescope: c("telescope", 60264),
  textSize: c("text-size", 60265),
  threeBars: c("three-bars", 60266),
  thumbsdown: c("thumbsdown", 60267),
  thumbsup: c("thumbsup", 60268),
  tools: c("tools", 60269),
  triangleDown: c("triangle-down", 60270),
  triangleLeft: c("triangle-left", 60271),
  triangleRight: c("triangle-right", 60272),
  triangleUp: c("triangle-up", 60273),
  twitter: c("twitter", 60274),
  unfold: c("unfold", 60275),
  unlock: c("unlock", 60276),
  unmute: c("unmute", 60277),
  unverified: c("unverified", 60278),
  verified: c("verified", 60279),
  versions: c("versions", 60280),
  vmActive: c("vm-active", 60281),
  vmOutline: c("vm-outline", 60282),
  vmRunning: c("vm-running", 60283),
  watch: c("watch", 60284),
  whitespace: c("whitespace", 60285),
  wholeWord: c("whole-word", 60286),
  window: c("window", 60287),
  wordWrap: c("word-wrap", 60288),
  zoomIn: c("zoom-in", 60289),
  zoomOut: c("zoom-out", 60290),
  listFilter: c("list-filter", 60291),
  listFlat: c("list-flat", 60292),
  listSelection: c("list-selection", 60293),
  selection: c("selection", 60293),
  listTree: c("list-tree", 60294),
  debugBreakpointFunctionUnverified: c("debug-breakpoint-function-unverified", 60295),
  debugBreakpointFunction: c("debug-breakpoint-function", 60296),
  debugBreakpointFunctionDisabled: c("debug-breakpoint-function-disabled", 60296),
  debugStackframeActive: c("debug-stackframe-active", 60297),
  circleSmallFilled: c("circle-small-filled", 60298),
  debugStackframeDot: c("debug-stackframe-dot", 60298),
  terminalDecorationMark: c("terminal-decoration-mark", 60298),
  debugStackframe: c("debug-stackframe", 60299),
  debugStackframeFocused: c("debug-stackframe-focused", 60299),
  debugBreakpointUnsupported: c("debug-breakpoint-unsupported", 60300),
  symbolString: c("symbol-string", 60301),
  debugReverseContinue: c("debug-reverse-continue", 60302),
  debugStepBack: c("debug-step-back", 60303),
  debugRestartFrame: c("debug-restart-frame", 60304),
  debugAlt: c("debug-alt", 60305),
  callIncoming: c("call-incoming", 60306),
  callOutgoing: c("call-outgoing", 60307),
  menu: c("menu", 60308),
  expandAll: c("expand-all", 60309),
  feedback: c("feedback", 60310),
  gitPullRequestReviewer: c("git-pull-request-reviewer", 60310),
  groupByRefType: c("group-by-ref-type", 60311),
  ungroupByRefType: c("ungroup-by-ref-type", 60312),
  account: c("account", 60313),
  gitPullRequestAssignee: c("git-pull-request-assignee", 60313),
  bellDot: c("bell-dot", 60314),
  debugConsole: c("debug-console", 60315),
  library: c("library", 60316),
  output: c("output", 60317),
  runAll: c("run-all", 60318),
  syncIgnored: c("sync-ignored", 60319),
  pinned: c("pinned", 60320),
  githubInverted: c("github-inverted", 60321),
  serverProcess: c("server-process", 60322),
  serverEnvironment: c("server-environment", 60323),
  pass: c("pass", 60324),
  issueClosed: c("issue-closed", 60324),
  stopCircle: c("stop-circle", 60325),
  playCircle: c("play-circle", 60326),
  record: c("record", 60327),
  debugAltSmall: c("debug-alt-small", 60328),
  vmConnect: c("vm-connect", 60329),
  cloud: c("cloud", 60330),
  merge: c("merge", 60331),
  export: c("export", 60332),
  graphLeft: c("graph-left", 60333),
  magnet: c("magnet", 60334),
  notebook: c("notebook", 60335),
  redo: c("redo", 60336),
  checkAll: c("check-all", 60337),
  pinnedDirty: c("pinned-dirty", 60338),
  passFilled: c("pass-filled", 60339),
  circleLargeFilled: c("circle-large-filled", 60340),
  circleLarge: c("circle-large", 60341),
  circleLargeOutline: c("circle-large-outline", 60341),
  combine: c("combine", 60342),
  gather: c("gather", 60342),
  table: c("table", 60343),
  variableGroup: c("variable-group", 60344),
  typeHierarchy: c("type-hierarchy", 60345),
  typeHierarchySub: c("type-hierarchy-sub", 60346),
  typeHierarchySuper: c("type-hierarchy-super", 60347),
  gitPullRequestCreate: c("git-pull-request-create", 60348),
  runAbove: c("run-above", 60349),
  runBelow: c("run-below", 60350),
  notebookTemplate: c("notebook-template", 60351),
  debugRerun: c("debug-rerun", 60352),
  workspaceTrusted: c("workspace-trusted", 60353),
  workspaceUntrusted: c("workspace-untrusted", 60354),
  workspaceUnknown: c("workspace-unknown", 60355),
  terminalCmd: c("terminal-cmd", 60356),
  terminalDebian: c("terminal-debian", 60357),
  terminalLinux: c("terminal-linux", 60358),
  terminalPowershell: c("terminal-powershell", 60359),
  terminalTmux: c("terminal-tmux", 60360),
  terminalUbuntu: c("terminal-ubuntu", 60361),
  terminalBash: c("terminal-bash", 60362),
  arrowSwap: c("arrow-swap", 60363),
  copy: c("copy", 60364),
  personAdd: c("person-add", 60365),
  filterFilled: c("filter-filled", 60366),
  wand: c("wand", 60367),
  debugLineByLine: c("debug-line-by-line", 60368),
  inspect: c("inspect", 60369),
  layers: c("layers", 60370),
  layersDot: c("layers-dot", 60371),
  layersActive: c("layers-active", 60372),
  compass: c("compass", 60373),
  compassDot: c("compass-dot", 60374),
  compassActive: c("compass-active", 60375),
  azure: c("azure", 60376),
  issueDraft: c("issue-draft", 60377),
  gitPullRequestClosed: c("git-pull-request-closed", 60378),
  gitPullRequestDraft: c("git-pull-request-draft", 60379),
  debugAll: c("debug-all", 60380),
  debugCoverage: c("debug-coverage", 60381),
  runErrors: c("run-errors", 60382),
  folderLibrary: c("folder-library", 60383),
  debugContinueSmall: c("debug-continue-small", 60384),
  beakerStop: c("beaker-stop", 60385),
  graphLine: c("graph-line", 60386),
  graphScatter: c("graph-scatter", 60387),
  pieChart: c("pie-chart", 60388),
  bracket: c("bracket", 60175),
  bracketDot: c("bracket-dot", 60389),
  bracketError: c("bracket-error", 60390),
  lockSmall: c("lock-small", 60391),
  azureDevops: c("azure-devops", 60392),
  verifiedFilled: c("verified-filled", 60393),
  newline: c("newline", 60394),
  layout: c("layout", 60395),
  layoutActivitybarLeft: c("layout-activitybar-left", 60396),
  layoutActivitybarRight: c("layout-activitybar-right", 60397),
  layoutPanelLeft: c("layout-panel-left", 60398),
  layoutPanelCenter: c("layout-panel-center", 60399),
  layoutPanelJustify: c("layout-panel-justify", 60400),
  layoutPanelRight: c("layout-panel-right", 60401),
  layoutPanel: c("layout-panel", 60402),
  layoutSidebarLeft: c("layout-sidebar-left", 60403),
  layoutSidebarRight: c("layout-sidebar-right", 60404),
  layoutStatusbar: c("layout-statusbar", 60405),
  layoutMenubar: c("layout-menubar", 60406),
  layoutCentered: c("layout-centered", 60407),
  target: c("target", 60408),
  indent: c("indent", 60409),
  recordSmall: c("record-small", 60410),
  errorSmall: c("error-small", 60411),
  terminalDecorationError: c("terminal-decoration-error", 60411),
  arrowCircleDown: c("arrow-circle-down", 60412),
  arrowCircleLeft: c("arrow-circle-left", 60413),
  arrowCircleRight: c("arrow-circle-right", 60414),
  arrowCircleUp: c("arrow-circle-up", 60415),
  layoutSidebarRightOff: c("layout-sidebar-right-off", 60416),
  layoutPanelOff: c("layout-panel-off", 60417),
  layoutSidebarLeftOff: c("layout-sidebar-left-off", 60418),
  blank: c("blank", 60419),
  heartFilled: c("heart-filled", 60420),
  map: c("map", 60421),
  mapHorizontal: c("map-horizontal", 60421),
  foldHorizontal: c("fold-horizontal", 60421),
  mapFilled: c("map-filled", 60422),
  mapHorizontalFilled: c("map-horizontal-filled", 60422),
  foldHorizontalFilled: c("fold-horizontal-filled", 60422),
  circleSmall: c("circle-small", 60423),
  bellSlash: c("bell-slash", 60424),
  bellSlashDot: c("bell-slash-dot", 60425),
  commentUnresolved: c("comment-unresolved", 60426),
  gitPullRequestGoToChanges: c("git-pull-request-go-to-changes", 60427),
  gitPullRequestNewChanges: c("git-pull-request-new-changes", 60428),
  searchFuzzy: c("search-fuzzy", 60429),
  commentDraft: c("comment-draft", 60430),
  send: c("send", 60431),
  sparkle: c("sparkle", 60432),
  insert: c("insert", 60433),
  mic: c("mic", 60434),
  thumbsdownFilled: c("thumbsdown-filled", 60435),
  thumbsupFilled: c("thumbsup-filled", 60436),
  coffee: c("coffee", 60437),
  snake: c("snake", 60438),
  game: c("game", 60439),
  vr: c("vr", 60440),
  chip: c("chip", 60441),
  piano: c("piano", 60442),
  music: c("music", 60443),
  micFilled: c("mic-filled", 60444),
  repoFetch: c("repo-fetch", 60445),
  copilot: c("copilot", 60446),
  lightbulbSparkle: c("lightbulb-sparkle", 60447),
  robot: c("robot", 60448),
  sparkleFilled: c("sparkle-filled", 60449),
  diffSingle: c("diff-single", 60450),
  diffMultiple: c("diff-multiple", 60451),
  surroundWith: c("surround-with", 60452),
  share: c("share", 60453),
  gitStash: c("git-stash", 60454),
  gitStashApply: c("git-stash-apply", 60455),
  gitStashPop: c("git-stash-pop", 60456),
  vscode: c("vscode", 60457),
  vscodeInsiders: c("vscode-insiders", 60458),
  codeOss: c("code-oss", 60459),
  runCoverage: c("run-coverage", 60460),
  runAllCoverage: c("run-all-coverage", 60461),
  coverage: c("coverage", 60462),
  githubProject: c("github-project", 60463),
  mapVertical: c("map-vertical", 60464),
  foldVertical: c("fold-vertical", 60464),
  mapVerticalFilled: c("map-vertical-filled", 60465),
  foldVerticalFilled: c("fold-vertical-filled", 60465),
  goToSearch: c("go-to-search", 60466),
  percentage: c("percentage", 60467),
  sortPercentage: c("sort-percentage", 60467),
  attach: c("attach", 60468),
  goToEditingSession: c("go-to-editing-session", 60469),
  editSession: c("edit-session", 60470),
  codeReview: c("code-review", 60471)
}, Oc = {
  dialogError: c("dialog-error", "error"),
  dialogWarning: c("dialog-warning", "warning"),
  dialogInfo: c("dialog-info", "info"),
  dialogClose: c("dialog-close", "close"),
  treeItemExpanded: c("tree-item-expanded", "chevron-down"),
  treeFilterOnTypeOn: c("tree-filter-on-type-on", "list-filter"),
  treeFilterOnTypeOff: c("tree-filter-on-type-off", "list-selection"),
  treeFilterClear: c("tree-filter-clear", "close"),
  treeItemLoading: c("tree-item-loading", "loading"),
  menuSelection: c("menu-selection", "check"),
  menuSubmenu: c("menu-submenu", "chevron-right"),
  menuBarMore: c("menubar-more", "more"),
  scrollbarButtonLeft: c("scrollbar-button-left", "triangle-left"),
  scrollbarButtonRight: c("scrollbar-button-right", "triangle-right"),
  scrollbarButtonUp: c("scrollbar-button-up", "triangle-up"),
  scrollbarButtonDown: c("scrollbar-button-down", "triangle-down"),
  toolBarMore: c("toolbar-more", "more"),
  quickInputBack: c("quick-input-back", "arrow-left"),
  dropDownButton: c("drop-down-button", 60084),
  symbolCustomColor: c("symbol-customcolor", 60252),
  exportIcon: c("export", 60332),
  workspaceUnspecified: c("workspace-unspecified", 60355),
  newLine: c("newline", 60394),
  thumbsDownFilled: c("thumbsdown-filled", 60435),
  thumbsUpFilled: c("thumbsup-filled", 60436),
  gitFetch: c("git-fetch", 60445),
  lightbulbSparkleAutofix: c("lightbulb-sparkle-autofix", 60447),
  debugBreakpointPending: c("debug-breakpoint-pending", 60377)
}, V = {
  ...Mc,
  ...Oc
};
class Za {
  constructor() {
    this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new Re(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
  }
  handleChange(t) {
    this._onDidChange.fire({
      changedLanguages: t,
      changedColorMap: !1
    });
  }
  register(t, n) {
    return this._tokenizationSupports.set(t, n), this.handleChange([t]), sn(() => {
      this._tokenizationSupports.get(t) === n && (this._tokenizationSupports.delete(t), this.handleChange([t]));
    });
  }
  get(t) {
    return this._tokenizationSupports.get(t) || null;
  }
  registerFactory(t, n) {
    var r;
    (r = this._factories.get(t)) == null || r.dispose();
    const i = new Pc(this, t, n);
    return this._factories.set(t, i), sn(() => {
      const s = this._factories.get(t);
      !s || s !== i || (this._factories.delete(t), s.dispose());
    });
  }
  async getOrCreate(t) {
    const n = this.get(t);
    if (n)
      return n;
    const r = this._factories.get(t);
    return !r || r.isResolved ? null : (await r.resolve(), this.get(t));
  }
  isResolved(t) {
    if (this.get(t))
      return !0;
    const n = this._factories.get(t);
    return !!(!n || n.isResolved);
  }
  setColorMap(t) {
    this._colorMap = t, this._onDidChange.fire({
      changedLanguages: Array.from(this._tokenizationSupports.keys()),
      changedColorMap: !0
    });
  }
  getColorMap() {
    return this._colorMap;
  }
  getDefaultBackground() {
    return this._colorMap && this._colorMap.length > 2 ? this._colorMap[2] : null;
  }
}
class Pc extends _n {
  get isResolved() {
    return this._isResolved;
  }
  constructor(t, n, r) {
    super(), this._registry = t, this._languageId = n, this._factory = r, this._isDisposed = !1, this._resolvePromise = null, this._isResolved = !1;
  }
  dispose() {
    this._isDisposed = !0, super.dispose();
  }
  async resolve() {
    return this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise;
  }
  async _create() {
    const t = await this._factory.tokenizationSupport;
    this._isResolved = !0, t && !this._isDisposed && this._register(this._registry.register(this._languageId, t));
  }
}
class Ic {
  constructor(t, n, r) {
    this.offset = t, this.type = n, this.language = r, this._tokenBrand = void 0;
  }
  toString() {
    return "(" + this.offset + ", " + this.type + ")";
  }
}
var Ii;
(function(e) {
  e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
})(Ii || (Ii = {}));
var Fi;
(function(e) {
  const t = /* @__PURE__ */ new Map();
  t.set(0, V.symbolMethod), t.set(1, V.symbolFunction), t.set(2, V.symbolConstructor), t.set(3, V.symbolField), t.set(4, V.symbolVariable), t.set(5, V.symbolClass), t.set(6, V.symbolStruct), t.set(7, V.symbolInterface), t.set(8, V.symbolModule), t.set(9, V.symbolProperty), t.set(10, V.symbolEvent), t.set(11, V.symbolOperator), t.set(12, V.symbolUnit), t.set(13, V.symbolValue), t.set(15, V.symbolEnum), t.set(14, V.symbolConstant), t.set(15, V.symbolEnum), t.set(16, V.symbolEnumMember), t.set(17, V.symbolKeyword), t.set(27, V.symbolSnippet), t.set(18, V.symbolText), t.set(19, V.symbolColor), t.set(20, V.symbolFile), t.set(21, V.symbolReference), t.set(22, V.symbolCustomColor), t.set(23, V.symbolFolder), t.set(24, V.symbolTypeParameter), t.set(25, V.account), t.set(26, V.issues);
  function n(s) {
    let o = t.get(s);
    return o || (console.info("No codicon found for CompletionItemKind " + s), o = V.symbolProperty), o;
  }
  e.toIcon = n;
  const r = /* @__PURE__ */ new Map();
  r.set("method", 0), r.set("function", 1), r.set("constructor", 2), r.set("field", 3), r.set("variable", 4), r.set("class", 5), r.set("struct", 6), r.set("interface", 7), r.set("module", 8), r.set("property", 9), r.set("event", 10), r.set("operator", 11), r.set("unit", 12), r.set("value", 13), r.set("constant", 14), r.set("enum", 15), r.set("enum-member", 16), r.set("enumMember", 16), r.set("keyword", 17), r.set("snippet", 27), r.set("text", 18), r.set("color", 19), r.set("file", 20), r.set("reference", 21), r.set("customcolor", 22), r.set("folder", 23), r.set("type-parameter", 24), r.set("typeParameter", 24), r.set("account", 25), r.set("issue", 26);
  function i(s, o) {
    let a = r.get(s);
    return typeof a > "u" && !o && (a = 9), a;
  }
  e.fromString = i;
})(Fi || (Fi = {}));
var Vi;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
})(Vi || (Vi = {}));
var Di;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.PasteAs = 1] = "PasteAs";
})(Di || (Di = {}));
var qi;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
})(qi || (qi = {}));
var Ki;
(function(e) {
  e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
})(Ki || (Ki = {}));
Z(934, "array"), Z(935, "boolean"), Z(936, "class"), Z(937, "constant"), Z(938, "constructor"), Z(939, "enumeration"), Z(940, "enumeration member"), Z(941, "event"), Z(942, "field"), Z(943, "file"), Z(944, "function"), Z(945, "interface"), Z(946, "key"), Z(947, "method"), Z(948, "module"), Z(949, "namespace"), Z(950, "null"), Z(951, "number"), Z(952, "object"), Z(953, "operator"), Z(954, "package"), Z(955, "property"), Z(956, "string"), Z(957, "struct"), Z(958, "type parameter"), Z(959, "variable");
var $i;
(function(e) {
  const t = /* @__PURE__ */ new Map();
  t.set(0, V.symbolFile), t.set(1, V.symbolModule), t.set(2, V.symbolNamespace), t.set(3, V.symbolPackage), t.set(4, V.symbolClass), t.set(5, V.symbolMethod), t.set(6, V.symbolProperty), t.set(7, V.symbolField), t.set(8, V.symbolConstructor), t.set(9, V.symbolEnum), t.set(10, V.symbolInterface), t.set(11, V.symbolFunction), t.set(12, V.symbolVariable), t.set(13, V.symbolConstant), t.set(14, V.symbolString), t.set(15, V.symbolNumber), t.set(16, V.symbolBoolean), t.set(17, V.symbolArray), t.set(18, V.symbolObject), t.set(19, V.symbolKey), t.set(20, V.symbolNull), t.set(21, V.symbolEnumMember), t.set(22, V.symbolStruct), t.set(23, V.symbolEvent), t.set(24, V.symbolOperator), t.set(25, V.symbolTypeParameter);
  function n(r) {
    let i = t.get(r);
    return i || (console.info("No codicon found for SymbolKind " + r), i = V.symbolProperty), i;
  }
  e.toIcon = n;
})($i || ($i = {}));
var Ee;
Ee = class {
  static fromValue(e) {
    switch (e) {
      case "comment":
        return Ee.Comment;
      case "imports":
        return Ee.Imports;
      case "region":
        return Ee.Region;
    }
    return new Ee(e);
  }
  constructor(e) {
    this.value = e;
  }
}, Ee.Comment = new Ee("comment"), Ee.Imports = new Ee("imports"), Ee.Region = new Ee("region");
var Bi;
(function(e) {
  e[e.AIGenerated = 1] = "AIGenerated";
})(Bi || (Bi = {}));
var Ui;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(Ui || (Ui = {}));
var ji;
(function(e) {
  function t(n) {
    return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
  }
  e.is = t;
})(ji || (ji = {}));
var zi;
(function(e) {
  e[e.Collapsed = 0] = "Collapsed", e[e.Expanded = 1] = "Expanded";
})(zi || (zi = {}));
var Wi;
(function(e) {
  e[e.Unresolved = 0] = "Unresolved", e[e.Resolved = 1] = "Resolved";
})(Wi || (Wi = {}));
var Hi;
(function(e) {
  e[e.Current = 0] = "Current", e[e.Outdated = 1] = "Outdated";
})(Hi || (Hi = {}));
var Gi;
(function(e) {
  e[e.Editing = 0] = "Editing", e[e.Preview = 1] = "Preview";
})(Gi || (Gi = {}));
var Ji;
(function(e) {
  e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
})(Ji || (Ji = {}));
new Za();
new Za();
var Xi;
(function(e) {
  e[e.None = 0] = "None", e[e.Option = 1] = "Option", e[e.Default = 2] = "Default", e[e.Preferred = 3] = "Preferred";
})(Xi || (Xi = {}));
var Qi;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(Qi || (Qi = {}));
var Zi;
(function(e) {
  e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
})(Zi || (Zi = {}));
var Yi;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
})(Yi || (Yi = {}));
var es;
(function(e) {
  e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
})(es || (es = {}));
var ts;
(function(e) {
  e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Snippet = 27] = "Snippet";
})(ts || (ts = {}));
var ns;
(function(e) {
  e[e.Deprecated = 1] = "Deprecated";
})(ns || (ns = {}));
var rs;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
})(rs || (rs = {}));
var is;
(function(e) {
  e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
})(is || (is = {}));
var ss;
(function(e) {
  e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
})(ss || (ss = {}));
var os;
(function(e) {
  e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
})(os || (os = {}));
var as;
(function(e) {
  e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
})(as || (as = {}));
var ls;
(function(e) {
  e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
})(ls || (ls = {}));
var us;
(function(e) {
  e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.ariaLabel = 4] = "ariaLabel", e[e.ariaRequired = 5] = "ariaRequired", e[e.autoClosingBrackets = 6] = "autoClosingBrackets", e[e.autoClosingComments = 7] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 8] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 9] = "autoClosingDelete", e[e.autoClosingOvertype = 10] = "autoClosingOvertype", e[e.autoClosingQuotes = 11] = "autoClosingQuotes", e[e.autoIndent = 12] = "autoIndent", e[e.automaticLayout = 13] = "automaticLayout", e[e.autoSurround = 14] = "autoSurround", e[e.bracketPairColorization = 15] = "bracketPairColorization", e[e.guides = 16] = "guides", e[e.codeLens = 17] = "codeLens", e[e.codeLensFontFamily = 18] = "codeLensFontFamily", e[e.codeLensFontSize = 19] = "codeLensFontSize", e[e.colorDecorators = 20] = "colorDecorators", e[e.colorDecoratorsLimit = 21] = "colorDecoratorsLimit", e[e.columnSelection = 22] = "columnSelection", e[e.comments = 23] = "comments", e[e.contextmenu = 24] = "contextmenu", e[e.copyWithSyntaxHighlighting = 25] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 26] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 27] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 28] = "cursorStyle", e[e.cursorSurroundingLines = 29] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 30] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 31] = "cursorWidth", e[e.disableLayerHinting = 32] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 33] = "disableMonospaceOptimizations", e[e.domReadOnly = 34] = "domReadOnly", e[e.dragAndDrop = 35] = "dragAndDrop", e[e.dropIntoEditor = 36] = "dropIntoEditor", e[e.experimentalEditContextEnabled = 37] = "experimentalEditContextEnabled", e[e.emptySelectionClipboard = 38] = "emptySelectionClipboard", e[e.experimentalGpuAcceleration = 39] = "experimentalGpuAcceleration", e[e.experimentalWhitespaceRendering = 40] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 41] = "extraEditorClassName", e[e.fastScrollSensitivity = 42] = "fastScrollSensitivity", e[e.find = 43] = "find", e[e.fixedOverflowWidgets = 44] = "fixedOverflowWidgets", e[e.folding = 45] = "folding", e[e.foldingStrategy = 46] = "foldingStrategy", e[e.foldingHighlight = 47] = "foldingHighlight", e[e.foldingImportsByDefault = 48] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 49] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 50] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 51] = "fontFamily", e[e.fontInfo = 52] = "fontInfo", e[e.fontLigatures = 53] = "fontLigatures", e[e.fontSize = 54] = "fontSize", e[e.fontWeight = 55] = "fontWeight", e[e.fontVariations = 56] = "fontVariations", e[e.formatOnPaste = 57] = "formatOnPaste", e[e.formatOnType = 58] = "formatOnType", e[e.glyphMargin = 59] = "glyphMargin", e[e.gotoLocation = 60] = "gotoLocation", e[e.hideCursorInOverviewRuler = 61] = "hideCursorInOverviewRuler", e[e.hover = 62] = "hover", e[e.inDiffEditor = 63] = "inDiffEditor", e[e.inlineSuggest = 64] = "inlineSuggest", e[e.letterSpacing = 65] = "letterSpacing", e[e.lightbulb = 66] = "lightbulb", e[e.lineDecorationsWidth = 67] = "lineDecorationsWidth", e[e.lineHeight = 68] = "lineHeight", e[e.lineNumbers = 69] = "lineNumbers", e[e.lineNumbersMinChars = 70] = "lineNumbersMinChars", e[e.linkedEditing = 71] = "linkedEditing", e[e.links = 72] = "links", e[e.matchBrackets = 73] = "matchBrackets", e[e.minimap = 74] = "minimap", e[e.mouseStyle = 75] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 76] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 77] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 78] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 79] = "multiCursorModifier", e[e.multiCursorPaste = 80] = "multiCursorPaste", e[e.multiCursorLimit = 81] = "multiCursorLimit", e[e.occurrencesHighlight = 82] = "occurrencesHighlight", e[e.occurrencesHighlightDelay = 83] = "occurrencesHighlightDelay", e[e.overviewRulerBorder = 84] = "overviewRulerBorder", e[e.overviewRulerLanes = 85] = "overviewRulerLanes", e[e.padding = 86] = "padding", e[e.pasteAs = 87] = "pasteAs", e[e.parameterHints = 88] = "parameterHints", e[e.peekWidgetDefaultFocus = 89] = "peekWidgetDefaultFocus", e[e.placeholder = 90] = "placeholder", e[e.definitionLinkOpensInPeek = 91] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 92] = "quickSuggestions", e[e.quickSuggestionsDelay = 93] = "quickSuggestionsDelay", e[e.readOnly = 94] = "readOnly", e[e.readOnlyMessage = 95] = "readOnlyMessage", e[e.renameOnType = 96] = "renameOnType", e[e.renderControlCharacters = 97] = "renderControlCharacters", e[e.renderFinalNewline = 98] = "renderFinalNewline", e[e.renderLineHighlight = 99] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 100] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 101] = "renderValidationDecorations", e[e.renderWhitespace = 102] = "renderWhitespace", e[e.revealHorizontalRightPadding = 103] = "revealHorizontalRightPadding", e[e.roundedSelection = 104] = "roundedSelection", e[e.rulers = 105] = "rulers", e[e.scrollbar = 106] = "scrollbar", e[e.scrollBeyondLastColumn = 107] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 108] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 109] = "scrollPredominantAxis", e[e.selectionClipboard = 110] = "selectionClipboard", e[e.selectionHighlight = 111] = "selectionHighlight", e[e.selectOnLineNumbers = 112] = "selectOnLineNumbers", e[e.showFoldingControls = 113] = "showFoldingControls", e[e.showUnused = 114] = "showUnused", e[e.snippetSuggestions = 115] = "snippetSuggestions", e[e.smartSelect = 116] = "smartSelect", e[e.smoothScrolling = 117] = "smoothScrolling", e[e.stickyScroll = 118] = "stickyScroll", e[e.stickyTabStops = 119] = "stickyTabStops", e[e.stopRenderingLineAfter = 120] = "stopRenderingLineAfter", e[e.suggest = 121] = "suggest", e[e.suggestFontSize = 122] = "suggestFontSize", e[e.suggestLineHeight = 123] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 124] = "suggestOnTriggerCharacters", e[e.suggestSelection = 125] = "suggestSelection", e[e.tabCompletion = 126] = "tabCompletion", e[e.tabIndex = 127] = "tabIndex", e[e.unicodeHighlighting = 128] = "unicodeHighlighting", e[e.unusualLineTerminators = 129] = "unusualLineTerminators", e[e.useShadowDOM = 130] = "useShadowDOM", e[e.useTabStops = 131] = "useTabStops", e[e.wordBreak = 132] = "wordBreak", e[e.wordSegmenterLocales = 133] = "wordSegmenterLocales", e[e.wordSeparators = 134] = "wordSeparators", e[e.wordWrap = 135] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 136] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 137] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 138] = "wordWrapColumn", e[e.wordWrapOverride1 = 139] = "wordWrapOverride1", e[e.wordWrapOverride2 = 140] = "wordWrapOverride2", e[e.wrappingIndent = 141] = "wrappingIndent", e[e.wrappingStrategy = 142] = "wrappingStrategy", e[e.showDeprecated = 143] = "showDeprecated", e[e.inlayHints = 144] = "inlayHints", e[e.editorClassName = 145] = "editorClassName", e[e.pixelRatio = 146] = "pixelRatio", e[e.tabFocusMode = 147] = "tabFocusMode", e[e.layoutInfo = 148] = "layoutInfo", e[e.wrappingInfo = 149] = "wrappingInfo", e[e.defaultColorDecorators = 150] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 151] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 152] = "inlineCompletionsAccessibilityVerbose";
})(us || (us = {}));
var cs;
(function(e) {
  e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
})(cs || (cs = {}));
var hs;
(function(e) {
  e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
})(hs || (hs = {}));
var ds;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
})(ds || (ds = {}));
var fs;
(function(e) {
  e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
})(fs || (fs = {}));
var ms;
(function(e) {
  e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
})(ms || (ms = {}));
var gs;
(function(e) {
  e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
})(gs || (gs = {}));
var ps;
(function(e) {
  e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
})(ps || (ps = {}));
var bs;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
})(bs || (bs = {}));
var ys;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(ys || (ys = {}));
var yr;
(function(e) {
  e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
})(yr || (yr = {}));
var vr;
(function(e) {
  e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
})(vr || (vr = {}));
var wr;
(function(e) {
  e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
})(wr || (wr = {}));
var vs;
(function(e) {
  e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
})(vs || (vs = {}));
var ws;
(function(e) {
  e[e.Normal = 1] = "Normal", e[e.Underlined = 2] = "Underlined";
})(ws || (ws = {}));
var Cs;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
})(Cs || (Cs = {}));
var Ls;
(function(e) {
  e[e.AIGenerated = 1] = "AIGenerated";
})(Ls || (Ls = {}));
var Ss;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(Ss || (Ss = {}));
var xs;
(function(e) {
  e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
})(xs || (xs = {}));
var Ns;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
})(Ns || (Ns = {}));
var Es;
(function(e) {
  e[e.Word = 0] = "Word", e[e.Line = 1] = "Line", e[e.Suggest = 2] = "Suggest";
})(Es || (Es = {}));
var _s;
(function(e) {
  e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
})(_s || (_s = {}));
var As;
(function(e) {
  e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
})(As || (As = {}));
var Rs;
(function(e) {
  e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
})(Rs || (Rs = {}));
var ks;
(function(e) {
  e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
})(ks || (ks = {}));
var Ts;
(function(e) {
  e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
})(Ts || (Ts = {}));
var Cr;
(function(e) {
  e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
})(Cr || (Cr = {}));
var Ms;
(function(e) {
  e.Off = "off", e.OnCode = "onCode", e.On = "on";
})(Ms || (Ms = {}));
var Os;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
})(Os || (Os = {}));
var Ps;
(function(e) {
  e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
})(Ps || (Ps = {}));
var Is;
(function(e) {
  e[e.Deprecated = 1] = "Deprecated";
})(Is || (Is = {}));
var Fs;
(function(e) {
  e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
})(Fs || (Fs = {}));
var Vs;
(function(e) {
  e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
})(Vs || (Vs = {}));
var Ds;
(function(e) {
  e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
})(Ds || (Ds = {}));
var qs;
(function(e) {
  e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
})(qs || (qs = {}));
const Jt = class {
  static chord(t, n) {
    return ac(t, n);
  }
};
Jt.CtrlCmd = 2048, Jt.Shift = 1024, Jt.Alt = 512, Jt.WinCtrl = 256;
let Fc = Jt;
function Vc() {
  return {
    editor: void 0,
    languages: void 0,
    CancellationTokenSource: _u,
    Emitter: Re,
    KeyCode: yr,
    KeyMod: Fc,
    Position: H,
    Range: F,
    Selection: Le,
    SelectionDirection: Cr,
    MarkerSeverity: vr,
    MarkerTag: wr,
    Uri: we,
    Token: Ic
  };
}
const Ya = class Lr {
  static getChannel(t) {
    return t.getChannel(Lr.CHANNEL_NAME);
  }
  static setChannel(t, n) {
    t.setChannel(Lr.CHANNEL_NAME, n);
  }
};
Ya.CHANNEL_NAME = "editorWorkerHost";
let Dc = Ya;
new eu(10);
function qc(e) {
  let t = [];
  for (; Object.prototype !== e; )
    t = t.concat(Object.getOwnPropertyNames(e)), e = Object.getPrototypeOf(e);
  return t;
}
function Kc(e) {
  const t = [];
  for (const n of qc(e))
    typeof e[n] == "function" && t.push(n);
  return t;
}
function $c(e, t) {
  const n = (i) => function() {
    const s = Array.prototype.slice.call(arguments, 0);
    return t(i, s);
  }, r = {};
  for (const i of e)
    r[i] = n(i);
  return r;
}
var Ks;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
})(Ks || (Ks = {}));
var $s;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
})($s || ($s = {}));
var Bs;
(function(e) {
  e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
})(Bs || (Bs = {}));
function Bc(e, t, n, r, i) {
  if (r === 0)
    return !0;
  const s = t.charCodeAt(r - 1);
  if (e.get(s) !== 0 || s === 13 || s === 10)
    return !0;
  if (i > 0) {
    const o = t.charCodeAt(r);
    if (e.get(o) !== 0)
      return !0;
  }
  return !1;
}
function Uc(e, t, n, r, i) {
  if (r + i === n)
    return !0;
  const s = t.charCodeAt(r + i);
  if (e.get(s) !== 0 || s === 13 || s === 10)
    return !0;
  if (i > 0) {
    const o = t.charCodeAt(r + i - 1);
    if (e.get(o) !== 0)
      return !0;
  }
  return !1;
}
function jc(e, t, n, r, i) {
  return Bc(e, t, n, r, i) && Uc(e, t, n, r, i);
}
class zc {
  constructor(t, n) {
    this._wordSeparators = t, this._searchRegex = n, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  reset(t) {
    this._searchRegex.lastIndex = t, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  next(t) {
    const n = t.length;
    let r;
    do {
      if (this._prevMatchStartIndex + this._prevMatchLength === n || (r = this._searchRegex.exec(t), !r))
        return null;
      const i = r.index, s = r[0].length;
      if (i === this._prevMatchStartIndex && s === this._prevMatchLength) {
        if (s === 0) {
          Ku(t, n, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
          continue;
        }
        return null;
      }
      if (this._prevMatchStartIndex = i, this._prevMatchLength = s, !this._wordSeparators || jc(this._wordSeparators, t, n, i, s))
        return r;
    } while (r);
    return null;
  }
}
function Wc(e, t = "Unreachable") {
  throw new Error(t);
}
function el(e, t = "unexpected state") {
  if (!e)
    throw new le(`Assertion Failed: ${t}`);
}
function on(e) {
  if (!e()) {
    debugger;
    e(), Yt(new le("Assertion Failed"));
  }
}
function Bn(e, t) {
  let n = 0;
  for (; n < e.length - 1; ) {
    const r = e[n], i = e[n + 1];
    if (!t(r, i))
      return !1;
    n++;
  }
  return !0;
}
const Hc = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
function Gc(e = "") {
  let t = "(-?\\d*\\.\\d\\w*)|([^";
  for (const n of Hc)
    e.indexOf(n) >= 0 || (t += "\\" + n);
  return t += "\\s]+)", new RegExp(t, "g");
}
const tl = Gc();
function nl(e) {
  let t = tl;
  if (e && e instanceof RegExp)
    if (e.global)
      t = e;
    else {
      let n = "g";
      e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
    }
  return t.lastIndex = 0, t;
}
const rl = new ru();
rl.unshift({
  maxLen: 1e3,
  windowSize: 15,
  timeBudget: 150
});
function ai(e, t, n, r, i) {
  if (t = nl(t), i || (i = En.first(rl)), n.length > i.maxLen) {
    let u = e - i.maxLen / 2;
    return u < 0 ? u = 0 : r += u, n = n.substring(u, e + i.maxLen / 2), ai(e, t, n, r, i);
  }
  const s = Date.now(), o = e - 1 - r;
  let a = -1, l = null;
  for (let u = 1; !(Date.now() - s >= i.timeBudget); u++) {
    const d = o - i.windowSize * u;
    t.lastIndex = Math.max(0, d);
    const h = Jc(t, n, o, a);
    if (!h && l || (l = h, d <= 0))
      break;
    a = d;
  }
  if (l) {
    const u = {
      word: l[0],
      startColumn: r + 1 + l.index,
      endColumn: r + 1 + l.index + l[0].length
    };
    return t.lastIndex = 0, u;
  }
  return null;
}
function Jc(e, t, n, r) {
  let i;
  for (; i = e.exec(t); ) {
    const s = i.index || 0;
    if (s <= n && e.lastIndex >= n)
      return i;
    if (r > 0 && s > r)
      return null;
  }
  return null;
}
class Xc {
  static computeUnicodeHighlights(t, n, r) {
    const i = r ? r.startLineNumber : 1, s = r ? r.endLineNumber : t.getLineCount(), o = new Us(n), a = o.getCandidateCodePoints();
    let l;
    a === "allNonBasicAscii" ? l = new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : l = new RegExp(`${Qc(Array.from(a))}`, "g");
    const u = new zc(null, l), d = [];
    let h = !1, f, m = 0, g = 0, p = 0;
    e: for (let v = i, C = s; v <= C; v++) {
      const S = t.getLineContent(v), y = S.length;
      u.reset(0);
      do
        if (f = u.next(S), f) {
          let w = f.index, b = f.index + f[0].length;
          if (w > 0) {
            const I = S.charCodeAt(w - 1);
            cr(I) && w--;
          }
          if (b + 1 < y) {
            const I = S.charCodeAt(b - 1);
            cr(I) && b++;
          }
          const L = S.substring(w, b);
          let x = ai(w + 1, tl, S, 0);
          x && x.endColumn <= w + 1 && (x = null);
          const T = o.shouldHighlightNonBasicASCII(L, x ? x.word : null);
          if (T !== 0) {
            if (T === 3 ? m++ : T === 2 ? g++ : T === 1 ? p++ : Wc(), d.length >= 1e3) {
              h = !0;
              break e;
            }
            d.push(new F(v, w + 1, v, b + 1));
          }
        }
      while (f);
    }
    return {
      ranges: d,
      hasMore: h,
      ambiguousCharacterCount: m,
      invisibleCharacterCount: g,
      nonBasicAsciiCharacterCount: p
    };
  }
  static computeUnicodeHighlightReason(t, n) {
    const r = new Us(n);
    switch (r.shouldHighlightNonBasicASCII(t, null)) {
      case 0:
        return null;
      case 2:
        return { kind: 1 };
      case 3: {
        const i = t.codePointAt(0), s = r.ambiguousCharacters.getPrimaryConfusable(i), o = dr.getLocales().filter((a) => !dr.getInstance(/* @__PURE__ */ new Set([...n.allowedLocales, a])).isAmbiguous(i));
        return { kind: 0, confusableWith: String.fromCodePoint(s), notAmbiguousInLocales: o };
      }
      case 1:
        return { kind: 2 };
    }
  }
}
function Qc(e, t) {
  return `[${ku(e.map((n) => String.fromCodePoint(n)).join(""))}]`;
}
class Us {
  constructor(t) {
    this.options = t, this.allowedCodePoints = new Set(t.allowedCodePoints), this.ambiguousCharacters = dr.getInstance(new Set(t.allowedLocales));
  }
  getCandidateCodePoints() {
    if (this.options.nonBasicASCII)
      return "allNonBasicAscii";
    const t = /* @__PURE__ */ new Set();
    if (this.options.invisibleCharacters)
      for (const n of zn.codePoints)
        js(String.fromCodePoint(n)) || t.add(n);
    if (this.options.ambiguousCharacters)
      for (const n of this.ambiguousCharacters.getConfusableCodePoints())
        t.add(n);
    for (const n of this.allowedCodePoints)
      t.delete(n);
    return t;
  }
  shouldHighlightNonBasicASCII(t, n) {
    const r = t.codePointAt(0);
    if (this.allowedCodePoints.has(r))
      return 0;
    if (this.options.nonBasicASCII)
      return 1;
    let i = !1, s = !1;
    if (n)
      for (const o of n) {
        const a = o.codePointAt(0), l = Bu(o);
        i = i || l, !l && !this.ambiguousCharacters.isAmbiguous(a) && !zn.isInvisibleCharacter(a) && (s = !0);
      }
    return !i && s ? 0 : this.options.invisibleCharacters && !js(t) && zn.isInvisibleCharacter(r) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(r) ? 3 : 0;
  }
}
function js(e) {
  return e === " " || e === `
` || e === "	";
}
class xn {
  constructor(t, n, r) {
    this.changes = t, this.moves = n, this.hitTimeout = r;
  }
}
class li {
  constructor(t, n) {
    this.lineRangeMapping = t, this.changes = n;
  }
  flip() {
    return new li(this.lineRangeMapping.flip(), this.changes.map((t) => t.flip()));
  }
}
class $ {
  static addRange(t, n) {
    let r = 0;
    for (; r < n.length && n[r].endExclusive < t.start; )
      r++;
    let i = r;
    for (; i < n.length && n[i].start <= t.endExclusive; )
      i++;
    if (r === i)
      n.splice(r, 0, t);
    else {
      const s = Math.min(t.start, n[r].start), o = Math.max(t.endExclusive, n[i - 1].endExclusive);
      n.splice(r, i - r, new $(s, o));
    }
  }
  static tryCreate(t, n) {
    if (!(t > n))
      return new $(t, n);
  }
  static ofLength(t) {
    return new $(0, t);
  }
  static ofStartAndLength(t, n) {
    return new $(t, t + n);
  }
  static emptyAt(t) {
    return new $(t, t);
  }
  constructor(t, n) {
    if (this.start = t, this.endExclusive = n, t > n)
      throw new le(`Invalid range: ${this.toString()}`);
  }
  get isEmpty() {
    return this.start === this.endExclusive;
  }
  delta(t) {
    return new $(this.start + t, this.endExclusive + t);
  }
  deltaStart(t) {
    return new $(this.start + t, this.endExclusive);
  }
  deltaEnd(t) {
    return new $(this.start, this.endExclusive + t);
  }
  get length() {
    return this.endExclusive - this.start;
  }
  toString() {
    return `[${this.start}, ${this.endExclusive})`;
  }
  equals(t) {
    return this.start === t.start && this.endExclusive === t.endExclusive;
  }
  containsRange(t) {
    return this.start <= t.start && t.endExclusive <= this.endExclusive;
  }
  contains(t) {
    return this.start <= t && t < this.endExclusive;
  }
  join(t) {
    return new $(
      Math.min(this.start, t.start),
      Math.max(this.endExclusive, t.endExclusive)
    );
  }
  intersect(t) {
    const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
    if (n <= r)
      return new $(n, r);
  }
  intersectionLength(t) {
    const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
    return Math.max(0, r - n);
  }
  intersects(t) {
    const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
    return n < r;
  }
  intersectsOrTouches(t) {
    const n = Math.max(this.start, t.start), r = Math.min(this.endExclusive, t.endExclusive);
    return n <= r;
  }
  isBefore(t) {
    return this.endExclusive <= t.start;
  }
  isAfter(t) {
    return this.start >= t.endExclusive;
  }
  slice(t) {
    return t.slice(this.start, this.endExclusive);
  }
  substring(t) {
    return t.substring(this.start, this.endExclusive);
  }
  clip(t) {
    if (this.isEmpty)
      throw new le(`Invalid clipping range: ${this.toString()}`);
    return Math.max(this.start, Math.min(this.endExclusive - 1, t));
  }
  clipCyclic(t) {
    if (this.isEmpty)
      throw new le(`Invalid clipping range: ${this.toString()}`);
    return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
  }
  map(t) {
    const n = [];
    for (let r = this.start; r < this.endExclusive; r++)
      n.push(t(r));
    return n;
  }
  forEach(t) {
    for (let n = this.start; n < this.endExclusive; n++)
      t(n);
  }
}
class D {
  static fromRange(t) {
    return new D(t.startLineNumber, t.endLineNumber);
  }
  static fromRangeInclusive(t) {
    return new D(t.startLineNumber, t.endLineNumber + 1);
  }
  static subtract(t, n) {
    return n ? t.startLineNumber < n.startLineNumber && n.endLineNumberExclusive < t.endLineNumberExclusive ? [
      new D(t.startLineNumber, n.startLineNumber),
      new D(n.endLineNumberExclusive, t.endLineNumberExclusive)
    ] : n.startLineNumber <= t.startLineNumber && t.endLineNumberExclusive <= n.endLineNumberExclusive ? [] : n.endLineNumberExclusive < t.endLineNumberExclusive ? [new D(
      Math.max(n.endLineNumberExclusive, t.startLineNumber),
      t.endLineNumberExclusive
    )] : [new D(t.startLineNumber, Math.min(n.startLineNumber, t.endLineNumberExclusive))] : [t];
  }
  static joinMany(t) {
    if (t.length === 0)
      return [];
    let n = new Ke(t[0].slice());
    for (let r = 1; r < t.length; r++)
      n = n.getUnion(new Ke(t[r].slice()));
    return n.ranges;
  }
  static join(t) {
    if (t.length === 0)
      throw new le("lineRanges cannot be empty");
    let n = t[0].startLineNumber, r = t[0].endLineNumberExclusive;
    for (let i = 1; i < t.length; i++)
      n = Math.min(n, t[i].startLineNumber), r = Math.max(r, t[i].endLineNumberExclusive);
    return new D(n, r);
  }
  static ofLength(t, n) {
    return new D(t, t + n);
  }
  static deserialize(t) {
    return new D(t[0], t[1]);
  }
  constructor(t, n) {
    if (t > n)
      throw new le(
        `startLineNumber ${t} cannot be after endLineNumberExclusive ${n}`
      );
    this.startLineNumber = t, this.endLineNumberExclusive = n;
  }
  contains(t) {
    return this.startLineNumber <= t && t < this.endLineNumberExclusive;
  }
  get isEmpty() {
    return this.startLineNumber === this.endLineNumberExclusive;
  }
  delta(t) {
    return new D(this.startLineNumber + t, this.endLineNumberExclusive + t);
  }
  deltaLength(t) {
    return new D(this.startLineNumber, this.endLineNumberExclusive + t);
  }
  get length() {
    return this.endLineNumberExclusive - this.startLineNumber;
  }
  join(t) {
    return new D(
      Math.min(this.startLineNumber, t.startLineNumber),
      Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive)
    );
  }
  toString() {
    return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
  }
  intersect(t) {
    const n = Math.max(this.startLineNumber, t.startLineNumber), r = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
    if (n <= r)
      return new D(n, r);
  }
  intersectsStrict(t) {
    return this.startLineNumber < t.endLineNumberExclusive && t.startLineNumber < this.endLineNumberExclusive;
  }
  overlapOrTouch(t) {
    return this.startLineNumber <= t.endLineNumberExclusive && t.startLineNumber <= this.endLineNumberExclusive;
  }
  equals(t) {
    return this.startLineNumber === t.startLineNumber && this.endLineNumberExclusive === t.endLineNumberExclusive;
  }
  toInclusiveRange() {
    return this.isEmpty ? null : new F(
      this.startLineNumber,
      1,
      this.endLineNumberExclusive - 1,
      Number.MAX_SAFE_INTEGER
    );
  }
  toExclusiveRange() {
    return new F(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
  }
  mapToLineArray(t) {
    const n = [];
    for (let r = this.startLineNumber; r < this.endLineNumberExclusive; r++)
      n.push(t(r));
    return n;
  }
  forEach(t) {
    for (let n = this.startLineNumber; n < this.endLineNumberExclusive; n++)
      t(n);
  }
  serialize() {
    return [this.startLineNumber, this.endLineNumberExclusive];
  }
  includes(t) {
    return this.startLineNumber <= t && t < this.endLineNumberExclusive;
  }
  toOffsetRange() {
    return new $(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
  }
  distanceToRange(t) {
    return this.endLineNumberExclusive <= t.startLineNumber ? t.startLineNumber - this.endLineNumberExclusive : t.endLineNumberExclusive <= this.startLineNumber ? this.startLineNumber - t.endLineNumberExclusive : 0;
  }
  distanceToLine(t) {
    return this.contains(t) ? 0 : t < this.startLineNumber ? this.startLineNumber - t : t - this.endLineNumberExclusive;
  }
  addMargin(t, n) {
    return new D(
      this.startLineNumber - t,
      this.endLineNumberExclusive + n
    );
  }
}
class Ke {
  constructor(t = []) {
    this._normalizedRanges = t;
  }
  get ranges() {
    return this._normalizedRanges;
  }
  addRange(t) {
    if (t.length === 0)
      return;
    const n = rr(this._normalizedRanges, (i) => i.endLineNumberExclusive >= t.startLineNumber), r = It(this._normalizedRanges, (i) => i.startLineNumber <= t.endLineNumberExclusive) + 1;
    if (n === r)
      this._normalizedRanges.splice(n, 0, t);
    else if (n === r - 1) {
      const i = this._normalizedRanges[n];
      this._normalizedRanges[n] = i.join(t);
    } else {
      const i = this._normalizedRanges[n].join(this._normalizedRanges[r - 1]).join(t);
      this._normalizedRanges.splice(n, r - n, i);
    }
  }
  contains(t) {
    const n = Pt(this._normalizedRanges, (r) => r.startLineNumber <= t);
    return !!n && n.endLineNumberExclusive > t;
  }
  intersects(t) {
    const n = Pt(this._normalizedRanges, (r) => r.startLineNumber < t.endLineNumberExclusive);
    return !!n && n.endLineNumberExclusive > t.startLineNumber;
  }
  getUnion(t) {
    if (this._normalizedRanges.length === 0)
      return t;
    if (t._normalizedRanges.length === 0)
      return this;
    const n = [];
    let r = 0, i = 0, s = null;
    for (; r < this._normalizedRanges.length || i < t._normalizedRanges.length; ) {
      let o = null;
      if (r < this._normalizedRanges.length && i < t._normalizedRanges.length) {
        const a = this._normalizedRanges[r], l = t._normalizedRanges[i];
        a.startLineNumber < l.startLineNumber ? (o = a, r++) : (o = l, i++);
      } else r < this._normalizedRanges.length ? (o = this._normalizedRanges[r], r++) : (o = t._normalizedRanges[i], i++);
      s === null ? s = o : s.endLineNumberExclusive >= o.startLineNumber ? s = new D(
        s.startLineNumber,
        Math.max(s.endLineNumberExclusive, o.endLineNumberExclusive)
      ) : (n.push(s), s = o);
    }
    return s !== null && n.push(s), new Ke(n);
  }
  subtractFrom(t) {
    const n = rr(this._normalizedRanges, (o) => o.endLineNumberExclusive >= t.startLineNumber), r = It(this._normalizedRanges, (o) => o.startLineNumber <= t.endLineNumberExclusive) + 1;
    if (n === r)
      return new Ke([t]);
    const i = [];
    let s = t.startLineNumber;
    for (let o = n; o < r; o++) {
      const a = this._normalizedRanges[o];
      a.startLineNumber > s && i.push(new D(s, a.startLineNumber)), s = a.endLineNumberExclusive;
    }
    return s < t.endLineNumberExclusive && i.push(new D(s, t.endLineNumberExclusive)), new Ke(i);
  }
  toString() {
    return this._normalizedRanges.map((t) => t.toString()).join(", ");
  }
  getIntersection(t) {
    const n = [];
    let r = 0, i = 0;
    for (; r < this._normalizedRanges.length && i < t._normalizedRanges.length; ) {
      const s = this._normalizedRanges[r], o = t._normalizedRanges[i], a = s.intersect(o);
      a && !a.isEmpty && n.push(a), s.endLineNumberExclusive < o.endLineNumberExclusive ? r++ : i++;
    }
    return new Ke(n);
  }
  getWithDelta(t) {
    return new Ke(this._normalizedRanges.map((n) => n.delta(t)));
  }
}
const Sr = class ut {
  static fromJson(t) {
    return new ut(t.map(xe.fromJson));
  }
  static replace(t, n) {
    return new ut([new xe(t, n)]);
  }
  static insert(t, n) {
    return ut.replace($.emptyAt(t), n);
  }
  constructor(t) {
    this.edits = t;
    let n = -1;
    for (const r of t) {
      if (!(r.replaceRange.start >= n))
        throw new le(`Edits must be disjoint and sorted. Found ${r} after ${n}`);
      n = r.replaceRange.endExclusive;
    }
  }
  normalize() {
    const t = [];
    let n;
    for (const r of this.edits)
      r.newText.length === 0 && r.replaceRange.length === 0 || (n && n.replaceRange.endExclusive === r.replaceRange.start ? n = new xe(
        n.replaceRange.join(r.replaceRange),
        n.newText + r.newText
      ) : (n && t.push(n), n = r));
    return n && t.push(n), new ut(t);
  }
  toString() {
    return `[${this.edits.map((t) => t.toString()).join(", ")}]`;
  }
  apply(t) {
    const n = [];
    let r = 0;
    for (const i of this.edits)
      n.push(t.substring(r, i.replaceRange.start)), n.push(i.newText), r = i.replaceRange.endExclusive;
    return n.push(t.substring(r)), n.join("");
  }
  compose(t) {
    return Zc(this, t);
  }
  inverse(t) {
    const n = [];
    let r = 0;
    for (const i of this.edits)
      n.push(new xe(
        $.ofStartAndLength(i.replaceRange.start + r, i.newText.length),
        t.substring(i.replaceRange.start, i.replaceRange.endExclusive)
      )), r += i.newText.length - i.replaceRange.length;
    return new ut(n);
  }
  getNewTextRanges() {
    const t = [];
    let n = 0;
    for (const r of this.edits)
      t.push($.ofStartAndLength(r.replaceRange.start + n, r.newText.length)), n += r.newText.length - r.replaceRange.length;
    return t;
  }
  get isEmpty() {
    return this.edits.length === 0;
  }
  tryRebase(t, n) {
    const r = [];
    let i = 0, s = 0, o = 0;
    for (; s < this.edits.length || i < t.edits.length; ) {
      const a = t.edits[i], l = this.edits[s];
      if (l)
        if (!a)
          r.push(new xe(l.replaceRange.delta(o), l.newText)), s++;
        else if (l.replaceRange.intersectsOrTouches(a.replaceRange)) {
          if (s++, n)
            return;
        } else l.replaceRange.start < a.replaceRange.start ? (r.push(new xe(l.replaceRange.delta(o), l.newText)), s++) : (i++, o += a.newText.length - a.replaceRange.length);
      else break;
    }
    return new ut(r);
  }
  applyToOffset(t) {
    let n = 0;
    for (const r of this.edits)
      if (r.replaceRange.start <= t) {
        if (t < r.replaceRange.endExclusive)
          return r.replaceRange.start + n;
        n += r.newText.length - r.replaceRange.length;
      } else
        break;
    return t + n;
  }
  applyToOffsetRange(t) {
    return new $(
      this.applyToOffset(t.start),
      this.applyToOffset(t.endExclusive)
    );
  }
  applyInverseToOffset(t) {
    let n = 0;
    for (const r of this.edits) {
      const i = r.newText.length;
      if (r.replaceRange.start <= t - n) {
        if (t - n < r.replaceRange.start + i)
          return r.replaceRange.start;
        n += i - r.replaceRange.length;
      } else
        break;
    }
    return t - n;
  }
};
Sr.empty = new Sr([]);
let il = Sr;
class xe {
  static fromJson(t) {
    return new xe($.ofStartAndLength(t.pos, t.len), t.txt);
  }
  static insert(t, n) {
    return new xe($.emptyAt(t), n);
  }
  constructor(t, n) {
    this.replaceRange = t, this.newText = n;
  }
  toString() {
    return `${this.replaceRange} -> "${this.newText}"`;
  }
  get isEmpty() {
    return this.newText.length === 0 && this.replaceRange.length === 0;
  }
}
function Zc(e, t) {
  if (e = e.normalize(), t = t.normalize(), e.isEmpty)
    return t;
  if (t.isEmpty)
    return e;
  const n = [...e.edits], r = [];
  let i = 0;
  for (const s of t.edits) {
    for (; ; ) {
      const u = n[0];
      if (!u || u.replaceRange.start + i + u.newText.length >= s.replaceRange.start)
        break;
      n.shift(), r.push(u), i += u.newText.length - u.replaceRange.length;
    }
    const o = i;
    let a, l;
    for (; ; ) {
      const u = n[0];
      if (!u || u.replaceRange.start + i > s.replaceRange.endExclusive)
        break;
      a || (a = u), l = u, n.shift(), i += u.newText.length - u.replaceRange.length;
    }
    if (!a)
      r.push(new xe(s.replaceRange.delta(-i), s.newText));
    else {
      let u = "";
      const d = s.replaceRange.start - (a.replaceRange.start + o);
      d > 0 && (u = a.newText.slice(0, d));
      const h = l.replaceRange.endExclusive + i - s.replaceRange.endExclusive;
      if (h > 0) {
        const g = new xe(
          $.ofStartAndLength(l.replaceRange.endExclusive, 0),
          l.newText.slice(-h)
        );
        n.unshift(g), i -= g.newText.length - g.replaceRange.length;
      }
      const f = u + s.newText, m = new $(
        Math.min(a.replaceRange.start, s.replaceRange.start - o),
        s.replaceRange.endExclusive - i
      );
      r.push(new xe(m, f));
    }
  }
  for (; ; ) {
    const s = n.shift();
    if (!s)
      break;
    r.push(s);
  }
  return new il(r).normalize();
}
const xr = class _t {
  static deserialize(t) {
    return new _t(t.map((n) => dt.deserialize(n)));
  }
  static fromEdit(t, n) {
    const r = ol.fromOffsetEdit(t, n);
    return _t.fromTextEdit(r, n);
  }
  static fromTextEdit(t, n) {
    const r = t.edits, i = [], s = [];
    for (let o = 0; o < r.length; o++) {
      const a = r[o], l = o + 1 < r.length ? r[o + 1] : void 0;
      if (s.push(a), l && l.range.startLineNumber === a.range.endLineNumber)
        continue;
      const u = me.joinEdits(s, n);
      s.length = 0;
      const d = dt.fromSingleTextEdit(u, n);
      i.push(d);
    }
    return new _t(i);
  }
  static createFromUnsorted(t) {
    const n = t.slice();
    return n.sort(en((r) => r.lineRange.startLineNumber, tn)), new _t(n);
  }
  constructor(t) {
    this.edits = t, el(Bn(t, (n, r) => n.lineRange.endLineNumberExclusive <= r.lineRange.startLineNumber));
  }
  toEdit(t) {
    const n = [];
    for (const r of this.edits) {
      const i = r.toSingleEdit(t);
      n.push(i);
    }
    return new il(n);
  }
  toString() {
    return this.edits.map((t) => t.toString()).join(",");
  }
  serialize() {
    return this.edits.map((t) => t.serialize());
  }
  getNewLineRanges() {
    const t = [];
    let n = 0;
    for (const r of this.edits)
      t.push(D.ofLength(r.lineRange.startLineNumber + n, r.newLines.length)), n += r.newLines.length - r.lineRange.length;
    return t;
  }
  mapLineNumber(t) {
    let n = 0;
    for (const r of this.edits) {
      if (r.lineRange.endLineNumberExclusive > t)
        break;
      n += r.newLines.length - r.lineRange.length;
    }
    return t + n;
  }
  mapLineRange(t) {
    return new D(
      this.mapLineNumber(t.startLineNumber),
      this.mapLineNumber(t.endLineNumberExclusive)
    );
  }
  rebase(t) {
    return new _t(this.edits.map((n) => new dt(t.mapLineRange(n.lineRange), n.newLines)));
  }
  humanReadablePatch(t) {
    const n = [];
    function r(a, l, u, d) {
      const h = u === "unmodified" ? " " : u === "deleted" ? "-" : "+";
      d === void 0 && (d = "[[[[[ WARNING: LINE DOES NOT EXIST ]]]]]");
      const f = a === -1 ? "   " : a.toString().padStart(3, " "), m = l === -1 ? "   " : l.toString().padStart(3, " ");
      n.push(`${h} ${f} ${m} ${d}`);
    }
    function i() {
      n.push("---");
    }
    let s = 0, o = !0;
    for (const a of Ta(this.edits, (l, u) => l.lineRange.distanceToRange(u.lineRange) <= 5)) {
      o ? o = !1 : i();
      let l = a[0].lineRange.startLineNumber - 2;
      for (const u of a) {
        for (let f = Math.max(1, l); f < u.lineRange.startLineNumber; f++)
          r(f, f + s, "unmodified", t[f - 1]);
        const d = u.lineRange, h = u.newLines;
        for (const f of d.mapToLineArray((m) => m)) {
          const m = t[f - 1];
          r(f, -1, "deleted", m);
        }
        for (let f = 0; f < h.length; f++) {
          const m = h[f];
          r(-1, d.startLineNumber + s + f, "added", m);
        }
        l = d.endLineNumberExclusive, s += u.newLines.length - u.lineRange.length;
      }
      for (let u = l; u <= Math.min(l + 2, t.length); u++)
        r(u, u + s, "unmodified", t[u - 1]);
    }
    return n.join(`
`);
  }
  apply(t) {
    const n = [];
    let r = 0;
    for (const i of this.edits) {
      for (; r < i.lineRange.startLineNumber - 1; )
        n.push(t[r]), r++;
      for (const s of i.newLines)
        n.push(s);
      r = i.lineRange.endLineNumberExclusive - 1;
    }
    for (; r < t.length; )
      n.push(t[r]), r++;
    return n;
  }
  toSingleEdit() {
  }
};
xr.empty = new xr([]);
let Yc = xr;
class dt {
  static deserialize(t) {
    return new dt(D.ofLength(t[0], t[1] - t[0]), t[2]);
  }
  static fromSingleTextEdit(t, n) {
    const r = ii(t.text);
    let i = t.range.startLineNumber;
    const s = n.getValueOfRange(F.fromPositions(new H(t.range.startLineNumber, 1), t.range.getStartPosition()));
    r[0] = s + r[0];
    let o = t.range.endLineNumber + 1;
    const a = n.getTransformer().getLineLength(t.range.endLineNumber) + 1, l = n.getValueOfRange(F.fromPositions(t.range.getEndPosition(), new H(t.range.endLineNumber, a)));
    r[r.length - 1] = r[r.length - 1] + l;
    const u = t.range.startColumn === n.getTransformer().getLineLength(t.range.startLineNumber) + 1, d = t.range.endColumn === 1;
    return u && r[0].length === s.length && (i++, r.shift()), r.length > 0 && i < o && d && r[r.length - 1].length === l.length && (o--, r.pop()), new dt(new D(i, o), r);
  }
  constructor(t, n) {
    this.lineRange = t, this.newLines = n;
  }
  toSingleTextEdit(t) {
    if (this.newLines.length === 0) {
      const n = t.getTransformer().textLength;
      if (this.lineRange.endLineNumberExclusive === n.lineCount + 2) {
        let r;
        if (this.lineRange.startLineNumber > 1) {
          const s = this.lineRange.startLineNumber - 1, o = t.getTransformer().getLineLength(s) + 1;
          r = new H(s, o);
        } else
          r = new H(1, 1);
        const i = n.addToPosition(new H(1, 1));
        return new me(F.fromPositions(r, i), "");
      } else
        return new me(new F(
          this.lineRange.startLineNumber,
          1,
          this.lineRange.endLineNumberExclusive,
          1
        ), "");
    } else if (this.lineRange.isEmpty) {
      let n, r, i;
      const s = this.lineRange.startLineNumber;
      return s === t.getTransformer().textLength.lineCount + 2 ? (n = s - 1, r = t.getTransformer().getLineLength(n) + 1, i = this.newLines.map((o) => `
` + o).join("")) : (n = s, r = 1, i = this.newLines.map((o) => o + `
`).join("")), new me(F.fromPositions(new H(n, r)), i);
    } else {
      const n = this.lineRange.endLineNumberExclusive - 1, r = t.getTransformer().getLineLength(n) + 1, i = new F(this.lineRange.startLineNumber, 1, n, r), s = this.newLines.join(`
`);
      return new me(i, s);
    }
  }
  toSingleEdit(t) {
    const n = this.toSingleTextEdit(t), r = t.getTransformer().getOffsetRange(n.range);
    return new xe(r, n.text);
  }
  toString() {
    return `${this.lineRange}->${JSON.stringify(this.newLines)}`;
  }
  serialize() {
    return [
      this.lineRange.startLineNumber,
      this.lineRange.endLineNumberExclusive,
      this.newLines
    ];
  }
  removeCommonSuffixPrefixLines(t) {
    let n = this.lineRange.startLineNumber, r = this.lineRange.endLineNumberExclusive, i = 0;
    for (; n < r && i < this.newLines.length && this.newLines[i] === t.getLineAt(n); )
      n++, i++;
    let s = 0;
    for (; n < r && s + i < this.newLines.length && this.newLines[this.newLines.length - 1 - s] === t.getLineAt(r - 1); )
      r--, s++;
    return i === 0 && s === 0 ? this : new dt(new D(n, r), this.newLines.slice(i, this.newLines.length - s));
  }
  toLineEdit() {
    return new Yc([this]);
  }
}
const Nr = class Oe {
  static lengthDiffNonNegative(t, n) {
    return n.isLessThan(t) ? Oe.zero : t.lineCount === n.lineCount ? new Oe(0, n.columnCount - t.columnCount) : new Oe(n.lineCount - t.lineCount, n.columnCount);
  }
  static betweenPositions(t, n) {
    return t.lineNumber === n.lineNumber ? new Oe(0, n.column - t.column) : new Oe(n.lineNumber - t.lineNumber, n.column - 1);
  }
  static fromPosition(t) {
    return new Oe(t.lineNumber - 1, t.column - 1);
  }
  static ofRange(t) {
    return Oe.betweenPositions(t.getStartPosition(), t.getEndPosition());
  }
  static ofText(t) {
    let n = 0, r = 0;
    for (const i of t)
      i === `
` ? (n++, r = 0) : r++;
    return new Oe(n, r);
  }
  constructor(t, n) {
    this.lineCount = t, this.columnCount = n;
  }
  isZero() {
    return this.lineCount === 0 && this.columnCount === 0;
  }
  isLessThan(t) {
    return this.lineCount !== t.lineCount ? this.lineCount < t.lineCount : this.columnCount < t.columnCount;
  }
  isGreaterThan(t) {
    return this.lineCount !== t.lineCount ? this.lineCount > t.lineCount : this.columnCount > t.columnCount;
  }
  isGreaterThanOrEqualTo(t) {
    return this.lineCount !== t.lineCount ? this.lineCount > t.lineCount : this.columnCount >= t.columnCount;
  }
  equals(t) {
    return this.lineCount === t.lineCount && this.columnCount === t.columnCount;
  }
  compare(t) {
    return this.lineCount !== t.lineCount ? this.lineCount - t.lineCount : this.columnCount - t.columnCount;
  }
  add(t) {
    return t.lineCount === 0 ? new Oe(this.lineCount, this.columnCount + t.columnCount) : new Oe(this.lineCount + t.lineCount, t.columnCount);
  }
  createRange(t) {
    return this.lineCount === 0 ? new F(
      t.lineNumber,
      t.column,
      t.lineNumber,
      t.column + this.columnCount
    ) : new F(
      t.lineNumber,
      t.column,
      t.lineNumber + this.lineCount,
      this.columnCount + 1
    );
  }
  toRange() {
    return new F(1, 1, this.lineCount + 1, this.columnCount + 1);
  }
  toLineRange() {
    return D.ofLength(1, this.lineCount);
  }
  addToPosition(t) {
    return this.lineCount === 0 ? new H(t.lineNumber, t.column + this.columnCount) : new H(t.lineNumber + this.lineCount, this.columnCount + 1);
  }
  addToRange(t) {
    return F.fromPositions(this.addToPosition(t.getStartPosition()), this.addToPosition(t.getEndPosition()));
  }
  toString() {
    return `${this.lineCount},${this.columnCount}`;
  }
};
Nr.zero = new Nr(0, 0);
let Vt = Nr;
class sl {
  constructor(t) {
    this.text = t, this.lineStartOffsetByLineIdx = [], this.lineEndOffsetByLineIdx = [], this.lineStartOffsetByLineIdx.push(0);
    for (let n = 0; n < t.length; n++)
      t.charAt(n) === `
` && (this.lineStartOffsetByLineIdx.push(n + 1), n > 0 && t.charAt(n - 1) === "\r" ? this.lineEndOffsetByLineIdx.push(n - 1) : this.lineEndOffsetByLineIdx.push(n));
    this.lineEndOffsetByLineIdx.push(t.length);
  }
  getOffset(t) {
    return this.lineStartOffsetByLineIdx[t.lineNumber - 1] + t.column - 1;
  }
  getOffsetRange(t) {
    return new $(
      this.getOffset(t.getStartPosition()),
      this.getOffset(t.getEndPosition())
    );
  }
  getPosition(t) {
    const n = It(this.lineStartOffsetByLineIdx, (s) => s <= t), r = n + 1, i = t - this.lineStartOffsetByLineIdx[n] + 1;
    return new H(r, i);
  }
  getRange(t) {
    return F.fromPositions(this.getPosition(t.start), this.getPosition(t.endExclusive));
  }
  getTextLength(t) {
    return Vt.ofRange(this.getRange(t));
  }
  get textLength() {
    const t = this.lineStartOffsetByLineIdx.length - 1;
    return new Vt(t, this.text.length - this.lineStartOffsetByLineIdx[t]);
  }
  getLineLength(t) {
    return this.lineEndOffsetByLineIdx[t - 1] - this.lineStartOffsetByLineIdx[t - 1];
  }
}
let ol = class At {
  static fromOffsetEdit(t, n) {
    const r = t.edits.map((i) => new me(n.getTransformer().getRange(i.replaceRange), i.newText));
    return new At(r);
  }
  static single(t, n) {
    return new At([new me(t, n)]);
  }
  static insert(t, n) {
    return new At([new me(F.fromPositions(t, t), n)]);
  }
  constructor(t) {
    this.edits = t, on(() => Bn(t, (n, r) => n.range.getEndPosition().isBeforeOrEqual(r.range.getStartPosition())));
  }
  normalize() {
    const t = [];
    for (const n of this.edits)
      if (t.length > 0 && t[t.length - 1].range.getEndPosition().equals(n.range.getStartPosition())) {
        const r = t[t.length - 1];
        t[t.length - 1] = new me(r.range.plusRange(n.range), r.text + n.text);
      } else n.isEmpty || t.push(n);
    return new At(t);
  }
  mapPosition(t) {
    let n = 0, r = 0, i = 0;
    for (const s of this.edits) {
      const o = s.range.getStartPosition();
      if (t.isBeforeOrEqual(o))
        break;
      const a = s.range.getEndPosition(), l = Vt.ofText(s.text);
      if (t.isBefore(a)) {
        const u = new H(
          o.lineNumber + n,
          o.column + (o.lineNumber + n === r ? i : 0)
        ), d = l.addToPosition(u);
        return mn(u, d);
      }
      o.lineNumber + n !== r && (i = 0), n += l.lineCount - (s.range.endLineNumber - s.range.startLineNumber), l.lineCount === 0 ? a.lineNumber !== o.lineNumber ? i += l.columnCount - (a.column - 1) : i += l.columnCount - (a.column - o.column) : i = l.columnCount, r = a.lineNumber + n;
    }
    return new H(
      t.lineNumber + n,
      t.column + (t.lineNumber + n === r ? i : 0)
    );
  }
  mapRange(t) {
    function n(o) {
      return o instanceof H ? o : o.getStartPosition();
    }
    function r(o) {
      return o instanceof H ? o : o.getEndPosition();
    }
    const i = n(this.mapPosition(t.getStartPosition())), s = r(this.mapPosition(t.getEndPosition()));
    return mn(i, s);
  }
  inverseMapPosition(t, n) {
    return this.inverse(n).mapPosition(t);
  }
  inverseMapRange(t, n) {
    return this.inverse(n).mapRange(t);
  }
  apply(t) {
    let n = "", r = new H(1, 1);
    for (const s of this.edits) {
      const o = s.range, a = o.getStartPosition(), l = o.getEndPosition(), u = mn(r, a);
      u.isEmpty() || (n += t.getValueOfRange(u)), n += s.text, r = l;
    }
    const i = mn(r, t.endPositionExclusive);
    return i.isEmpty() || (n += t.getValueOfRange(i)), n;
  }
  applyToString(t) {
    const n = new t1(t);
    return this.apply(n);
  }
  inverse(t) {
    const n = this.getNewRanges();
    return new At(this.edits.map((r, i) => new me(n[i], t.getValueOfRange(r.range))));
  }
  getNewRanges() {
    const t = [];
    let n = 0, r = 0, i = 0;
    for (const s of this.edits) {
      const o = Vt.ofText(s.text), a = H.lift({
        lineNumber: s.range.startLineNumber + r,
        column: s.range.startColumn + (s.range.startLineNumber === n ? i : 0)
      }), l = o.createRange(a);
      t.push(l), r = l.endLineNumber - s.range.endLineNumber, i = l.endColumn - s.range.endColumn, n = s.range.endLineNumber;
    }
    return t;
  }
  toSingle(t) {
    if (this.edits.length === 0)
      throw new le();
    if (this.edits.length === 1)
      return this.edits[0];
    const n = this.edits[0].range.getStartPosition(), r = this.edits[this.edits.length - 1].range.getEndPosition();
    let i = "";
    for (let s = 0; s < this.edits.length; s++) {
      const o = this.edits[s];
      if (i += o.text, s < this.edits.length - 1) {
        const a = this.edits[s + 1], l = F.fromPositions(o.range.getEndPosition(), a.range.getStartPosition()), u = t.getValueOfRange(l);
        i += u;
      }
    }
    return new me(F.fromPositions(n, r), i);
  }
};
class me {
  static joinEdits(t, n) {
    if (t.length === 0)
      throw new le();
    if (t.length === 1)
      return t[0];
    const r = t[0].range.getStartPosition(), i = t[t.length - 1].range.getEndPosition();
    let s = "";
    for (let o = 0; o < t.length; o++) {
      const a = t[o];
      if (s += a.text, o < t.length - 1) {
        const l = t[o + 1], u = F.fromPositions(a.range.getEndPosition(), l.range.getStartPosition()), d = n.getValueOfRange(u);
        s += d;
      }
    }
    return new me(F.fromPositions(r, i), s);
  }
  constructor(t, n) {
    this.range = t, this.text = n;
  }
  get isEmpty() {
    return this.range.isEmpty() && this.text.length === 0;
  }
  static equals(t, n) {
    return t.range.equalsRange(n.range) && t.text === n.text;
  }
  toSingleEditOperation() {
    return {
      range: this.range,
      text: this.text
    };
  }
  toEdit() {
    return new ol([this]);
  }
  equals(t) {
    return me.equals(this, t);
  }
  extendToCoverRange(t, n) {
    if (this.range.containsRange(t))
      return this;
    const r = this.range.plusRange(t), i = n.getValueOfRange(F.fromPositions(r.getStartPosition(), this.range.getStartPosition())), s = n.getValueOfRange(F.fromPositions(this.range.getEndPosition(), r.getEndPosition())), o = i + this.text + s;
    return new me(r, o);
  }
  extendToFullLine(t) {
    const n = new F(
      this.range.startLineNumber,
      1,
      this.range.endLineNumber,
      t.getTransformer().getLineLength(this.range.endLineNumber) + 1
    );
    return this.extendToCoverRange(n, t);
  }
  removeCommonPrefix(t) {
    const n = t.getValueOfRange(this.range).replaceAll(`\r
`, `
`), r = this.text.replaceAll(`\r
`, `
`), i = xi(n, r), s = Vt.ofText(n.substring(0, i)).addToPosition(this.range.getStartPosition()), o = r.substring(i), a = F.fromPositions(s, this.range.getEndPosition());
    return new me(a, o);
  }
  isEffectiveDeletion(t) {
    let n = this.text.replaceAll(`\r
`, `
`), r = t.getValueOfRange(this.range).replaceAll(`\r
`, `
`);
    const i = xi(n, r);
    n = n.substring(i), r = r.substring(i);
    const s = Vu(n, r);
    return n = n.substring(0, n.length - s), r = r.substring(0, r.length - s), n === "";
  }
}
function mn(e, t) {
  if (e.lineNumber === t.lineNumber && e.column === Number.MAX_SAFE_INTEGER)
    return F.fromPositions(t, t);
  if (!e.isBeforeOrEqual(t))
    throw new le("start must be before end");
  return new F(e.lineNumber, e.column, t.lineNumber, t.column);
}
class al {
  constructor() {
    this._transformer = void 0;
  }
  get endPositionExclusive() {
    return this.length.addToPosition(new H(1, 1));
  }
  get lineRange() {
    return this.length.toLineRange();
  }
  getValue() {
    return this.getValueOfRange(this.length.toRange());
  }
  getLineLength(t) {
    return this.getValueOfRange(new F(t, 1, t, Number.MAX_SAFE_INTEGER)).length;
  }
  getTransformer() {
    return this._transformer || (this._transformer = new sl(this.getValue())), this._transformer;
  }
  getLineAt(t) {
    return this.getValueOfRange(new F(t, 1, t, Number.MAX_SAFE_INTEGER));
  }
  getLines() {
    const t = this.getValue();
    return ii(t);
  }
}
class e1 extends al {
  constructor(t, n) {
    el(n >= 1), super(), this._getLineContent = t, this._lineCount = n;
  }
  getValueOfRange(t) {
    if (t.startLineNumber === t.endLineNumber)
      return this._getLineContent(t.startLineNumber).substring(t.startColumn - 1, t.endColumn - 1);
    let n = this._getLineContent(t.startLineNumber).substring(t.startColumn - 1);
    for (let r = t.startLineNumber + 1; r < t.endLineNumber; r++)
      n += `
` + this._getLineContent(r);
    return n += `
` + this._getLineContent(t.endLineNumber).substring(0, t.endColumn - 1), n;
  }
  getLineLength(t) {
    return this._getLineContent(t).length;
  }
  get length() {
    const t = this._getLineContent(this._lineCount);
    return new Vt(this._lineCount - 1, t.length);
  }
}
class gn extends e1 {
  constructor(t) {
    super((n) => t[n - 1], t.length);
  }
}
class t1 extends al {
  constructor(t) {
    super(), this.value = t, this._t = new sl(this.value);
  }
  getValueOfRange(t) {
    return this._t.getOffsetRange(t).substring(this.value);
  }
  get length() {
    return this._t.textLength;
  }
}
class Te {
  static inverse(t, n, r) {
    const i = [];
    let s = 1, o = 1;
    for (const l of t) {
      const u = new Te(new D(s, l.original.startLineNumber), new D(o, l.modified.startLineNumber));
      u.modified.isEmpty || i.push(u), s = l.original.endLineNumberExclusive, o = l.modified.endLineNumberExclusive;
    }
    const a = new Te(new D(s, n + 1), new D(o, r + 1));
    return a.modified.isEmpty || i.push(a), i;
  }
  static clip(t, n, r) {
    const i = [];
    for (const s of t) {
      const o = s.original.intersect(n), a = s.modified.intersect(r);
      o && !o.isEmpty && a && !a.isEmpty && i.push(new Te(o, a));
    }
    return i;
  }
  constructor(t, n) {
    this.original = t, this.modified = n;
  }
  toString() {
    return `{${this.original.toString()}->${this.modified.toString()}}`;
  }
  flip() {
    return new Te(this.modified, this.original);
  }
  join(t) {
    return new Te(this.original.join(t.original), this.modified.join(t.modified));
  }
  get changedLineCount() {
    return Math.max(this.original.length, this.modified.length);
  }
  toRangeMapping() {
    const t = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
    if (t && n)
      return new ye(t, n);
    if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
      if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1))
        throw new le("not a valid diff");
      return new ye(new F(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new F(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
    } else
      return new ye(new F(
        this.original.startLineNumber - 1,
        Number.MAX_SAFE_INTEGER,
        this.original.endLineNumberExclusive - 1,
        Number.MAX_SAFE_INTEGER
      ), new F(
        this.modified.startLineNumber - 1,
        Number.MAX_SAFE_INTEGER,
        this.modified.endLineNumberExclusive - 1,
        Number.MAX_SAFE_INTEGER
      ));
  }
  toRangeMapping2(t, n) {
    if (zs(this.original.endLineNumberExclusive, t) && zs(this.modified.endLineNumberExclusive, n))
      return new ye(new F(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new F(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
    if (!this.original.isEmpty && !this.modified.isEmpty)
      return new ye(F.fromPositions(new H(this.original.startLineNumber, 1), St(new H(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), F.fromPositions(new H(this.modified.startLineNumber, 1), St(new H(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
    if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1)
      return new ye(F.fromPositions(St(new H(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), t), St(new H(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), F.fromPositions(St(new H(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), St(new H(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
    throw new le();
  }
}
function St(e, t) {
  if (e.lineNumber < 1)
    return new H(1, 1);
  if (e.lineNumber > t.length)
    return new H(t.length, t[t.length - 1].length + 1);
  const n = t[e.lineNumber - 1];
  return e.column > n.length + 1 ? new H(e.lineNumber, n.length + 1) : e;
}
function zs(e, t) {
  return e >= 1 && e <= t.length;
}
class We extends Te {
  static fromRangeMappings(t) {
    const n = D.join(t.map((i) => D.fromRangeInclusive(i.originalRange))), r = D.join(t.map((i) => D.fromRangeInclusive(i.modifiedRange)));
    return new We(n, r, t);
  }
  constructor(t, n, r) {
    super(t, n), this.innerChanges = r;
  }
  flip() {
    var t;
    return new We(this.modified, this.original, (t = this.innerChanges) == null ? void 0 : t.map((n) => n.flip()));
  }
  withInnerChangesFromLineRanges() {
    return new We(this.original, this.modified, [this.toRangeMapping()]);
  }
}
class ye {
  static fromEdit(t) {
    const n = t.getNewRanges();
    return t.edits.map((r, i) => new ye(r.range, n[i]));
  }
  static fromEditJoin(t) {
    const n = t.getNewRanges(), r = t.edits.map((i, s) => new ye(i.range, n[s]));
    return ye.join(r);
  }
  static join(t) {
    if (t.length === 0)
      throw new le("Cannot join an empty list of range mappings");
    let n = t[0];
    for (let r = 1; r < t.length; r++)
      n = n.join(t[r]);
    return n;
  }
  static assertSorted(t) {
    for (let n = 1; n < t.length; n++) {
      const r = t[n - 1], i = t[n];
      if (!(r.originalRange.getEndPosition().isBeforeOrEqual(i.originalRange.getStartPosition()) && r.modifiedRange.getEndPosition().isBeforeOrEqual(i.modifiedRange.getStartPosition())))
        throw new le("Range mappings must be sorted");
    }
  }
  constructor(t, n) {
    this.originalRange = t, this.modifiedRange = n;
  }
  toString() {
    return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
  }
  flip() {
    return new ye(this.modifiedRange, this.originalRange);
  }
  toTextEdit(t) {
    const n = t.getValueOfRange(this.modifiedRange);
    return new me(this.originalRange, n);
  }
  join(t) {
    return new ye(
      this.originalRange.plusRange(t.originalRange),
      this.modifiedRange.plusRange(t.modifiedRange)
    );
  }
}
function Ws(e, t, n, r = !1) {
  const i = [];
  for (const s of Ta(e.map((o) => n1(o, t, n)), (o, a) => o.original.overlapOrTouch(a.original) || o.modified.overlapOrTouch(a.modified))) {
    const o = s[0], a = s[s.length - 1];
    i.push(new We(
      o.original.join(a.original),
      o.modified.join(a.modified),
      s.map((l) => l.innerChanges[0])
    ));
  }
  return on(() => !r && i.length > 0 && (i[0].modified.startLineNumber !== i[0].original.startLineNumber || n.length.lineCount - i[i.length - 1].modified.endLineNumberExclusive !== t.length.lineCount - i[i.length - 1].original.endLineNumberExclusive) ? !1 : Bn(i, (s, o) => o.original.startLineNumber - s.original.endLineNumberExclusive === o.modified.startLineNumber - s.modified.endLineNumberExclusive && s.original.endLineNumberExclusive < o.original.startLineNumber && s.modified.endLineNumberExclusive < o.modified.startLineNumber)), i;
}
function n1(e, t, n) {
  let r = 0, i = 0;
  e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + r <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + r <= e.modifiedRange.endLineNumber && (i = -1), e.modifiedRange.startColumn - 1 >= n.getLineLength(e.modifiedRange.startLineNumber) && e.originalRange.startColumn - 1 >= t.getLineLength(e.originalRange.startLineNumber) && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + i && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + i && (r = 1);
  const s = new D(
    e.originalRange.startLineNumber + r,
    e.originalRange.endLineNumber + 1 + i
  ), o = new D(
    e.modifiedRange.startLineNumber + r,
    e.modifiedRange.endLineNumber + 1 + i
  );
  return new We(s, o, [e]);
}
const r1 = 3;
class i1 {
  computeDiff(t, n, r) {
    var i;
    const s = new ul(t, n, {
      maxComputationTime: r.maxComputationTimeMs,
      shouldIgnoreTrimWhitespace: r.ignoreTrimWhitespace,
      shouldComputeCharChanges: !0,
      shouldMakePrettyDiff: !0,
      shouldPostProcessCharChanges: !0
    }).computeDiff(), o = [];
    let a = null;
    for (const l of s.changes) {
      let u;
      l.originalEndLineNumber === 0 ? u = new D(l.originalStartLineNumber + 1, l.originalStartLineNumber + 1) : u = new D(l.originalStartLineNumber, l.originalEndLineNumber + 1);
      let d;
      l.modifiedEndLineNumber === 0 ? d = new D(l.modifiedStartLineNumber + 1, l.modifiedStartLineNumber + 1) : d = new D(l.modifiedStartLineNumber, l.modifiedEndLineNumber + 1);
      let h = new We(u, d, (i = l.charChanges) == null ? void 0 : i.map((f) => new ye(new F(
        f.originalStartLineNumber,
        f.originalStartColumn,
        f.originalEndLineNumber,
        f.originalEndColumn
      ), new F(
        f.modifiedStartLineNumber,
        f.modifiedStartColumn,
        f.modifiedEndLineNumber,
        f.modifiedEndColumn
      ))));
      a && (a.modified.endLineNumberExclusive === h.modified.startLineNumber || a.original.endLineNumberExclusive === h.original.startLineNumber) && (h = new We(
        a.original.join(h.original),
        a.modified.join(h.modified),
        a.innerChanges && h.innerChanges ? a.innerChanges.concat(h.innerChanges) : void 0
      ), o.pop()), o.push(h), a = h;
    }
    return on(() => Bn(o, (l, u) => u.original.startLineNumber - l.original.endLineNumberExclusive === u.modified.startLineNumber - l.modified.endLineNumberExclusive && l.original.endLineNumberExclusive < u.original.startLineNumber && l.modified.endLineNumberExclusive < u.modified.startLineNumber)), new xn(o, [], s.quitEarly);
  }
}
function ll(e, t, n, r) {
  return new rt(e, t, n).ComputeDiff(r);
}
let Hs = class {
  constructor(e) {
    const t = [], n = [];
    for (let r = 0, i = e.length; r < i; r++)
      t[r] = Er(e[r], 1), n[r] = _r(e[r], 1);
    this.lines = e, this._startColumns = t, this._endColumns = n;
  }
  getElements() {
    const e = [];
    for (let t = 0, n = this.lines.length; t < n; t++)
      e[t] = this.lines[t].substring(this._startColumns[t] - 1, this._endColumns[t] - 1);
    return e;
  }
  getStrictElement(e) {
    return this.lines[e];
  }
  getStartLineNumber(e) {
    return e + 1;
  }
  getEndLineNumber(e) {
    return e + 1;
  }
  createCharSequence(e, t, n) {
    const r = [], i = [], s = [];
    let o = 0;
    for (let a = t; a <= n; a++) {
      const l = this.lines[a], u = e ? this._startColumns[a] : 1, d = e ? this._endColumns[a] : l.length + 1;
      for (let h = u; h < d; h++)
        r[o] = l.charCodeAt(h - 1), i[o] = a + 1, s[o] = h, o++;
      !e && a < n && (r[o] = 10, i[o] = a + 1, s[o] = l.length + 1, o++);
    }
    return new s1(r, i, s);
  }
};
class s1 {
  constructor(t, n, r) {
    this._charCodes = t, this._lineNumbers = n, this._columns = r;
  }
  toString() {
    return "[" + this._charCodes.map(
      (t, n) => (t === 10 ? "\\n" : String.fromCharCode(t)) + `-(${this._lineNumbers[n]},${this._columns[n]})`
    ).join(", ") + "]";
  }
  _assertIndex(t, n) {
    if (t < 0 || t >= n.length)
      throw new Error("Illegal index");
  }
  getElements() {
    return this._charCodes;
  }
  getStartLineNumber(t) {
    return t > 0 && t === this._lineNumbers.length ? this.getEndLineNumber(t - 1) : (this._assertIndex(t, this._lineNumbers), this._lineNumbers[t]);
  }
  getEndLineNumber(t) {
    return t === -1 ? this.getStartLineNumber(t + 1) : (this._assertIndex(t, this._lineNumbers), this._charCodes[t] === 10 ? this._lineNumbers[t] + 1 : this._lineNumbers[t]);
  }
  getStartColumn(t) {
    return t > 0 && t === this._columns.length ? this.getEndColumn(t - 1) : (this._assertIndex(t, this._columns), this._columns[t]);
  }
  getEndColumn(t) {
    return t === -1 ? this.getStartColumn(t + 1) : (this._assertIndex(t, this._columns), this._charCodes[t] === 10 ? 1 : this._columns[t] + 1);
  }
}
class Tt {
  constructor(t, n, r, i, s, o, a, l) {
    this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = r, this.originalEndColumn = i, this.modifiedStartLineNumber = s, this.modifiedStartColumn = o, this.modifiedEndLineNumber = a, this.modifiedEndColumn = l;
  }
  static createFromDiffChange(t, n, r) {
    const i = n.getStartLineNumber(t.originalStart), s = n.getStartColumn(t.originalStart), o = n.getEndLineNumber(t.originalStart + t.originalLength - 1), a = n.getEndColumn(t.originalStart + t.originalLength - 1), l = r.getStartLineNumber(t.modifiedStart), u = r.getStartColumn(t.modifiedStart), d = r.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), h = r.getEndColumn(t.modifiedStart + t.modifiedLength - 1);
    return new Tt(
      i,
      s,
      o,
      a,
      l,
      u,
      d,
      h
    );
  }
}
function o1(e) {
  if (e.length <= 1)
    return e;
  const t = [e[0]];
  let n = t[0];
  for (let r = 1, i = e.length; r < i; r++) {
    const s = e[r], o = s.originalStart - (n.originalStart + n.originalLength), a = s.modifiedStart - (n.modifiedStart + n.modifiedLength);
    Math.min(o, a) < r1 ? (n.originalLength = s.originalStart + s.originalLength - n.originalStart, n.modifiedLength = s.modifiedStart + s.modifiedLength - n.modifiedStart) : (t.push(s), n = s);
  }
  return t;
}
class nn {
  constructor(t, n, r, i, s) {
    this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = r, this.modifiedEndLineNumber = i, this.charChanges = s;
  }
  static createFromDiffResult(t, n, r, i, s, o, a) {
    let l, u, d, h, f;
    if (n.originalLength === 0 ? (l = r.getStartLineNumber(n.originalStart) - 1, u = 0) : (l = r.getStartLineNumber(n.originalStart), u = r.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (d = i.getStartLineNumber(n.modifiedStart) - 1, h = 0) : (d = i.getStartLineNumber(n.modifiedStart), h = i.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), o && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && s()) {
      const m = r.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), g = i.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
      if (m.getElements().length > 0 && g.getElements().length > 0) {
        let p = ll(m, g, s, !0).changes;
        a && (p = o1(p)), f = [];
        for (let v = 0, C = p.length; v < C; v++)
          f.push(Tt.createFromDiffChange(p[v], m, g));
      }
    }
    return new nn(
      l,
      u,
      d,
      h,
      f
    );
  }
}
class ul {
  constructor(t, n, r) {
    this.shouldComputeCharChanges = r.shouldComputeCharChanges, this.shouldPostProcessCharChanges = r.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = r.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = r.shouldMakePrettyDiff, this.originalLines = t, this.modifiedLines = n, this.original = new Hs(t), this.modified = new Hs(n), this.continueLineDiff = Gs(r.maxComputationTime), this.continueCharDiff = Gs(r.maxComputationTime === 0 ? 0 : Math.min(r.maxComputationTime, 5e3));
  }
  computeDiff() {
    if (this.original.lines.length === 1 && this.original.lines[0].length === 0)
      return this.modified.lines.length === 1 && this.modified.lines[0].length === 0 ? {
        quitEarly: !1,
        changes: []
      } : {
        quitEarly: !1,
        changes: [{
          originalStartLineNumber: 1,
          originalEndLineNumber: 1,
          modifiedStartLineNumber: 1,
          modifiedEndLineNumber: this.modified.lines.length,
          charChanges: void 0
        }]
      };
    if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0)
      return {
        quitEarly: !1,
        changes: [{
          originalStartLineNumber: 1,
          originalEndLineNumber: this.original.lines.length,
          modifiedStartLineNumber: 1,
          modifiedEndLineNumber: 1,
          charChanges: void 0
        }]
      };
    const t = ll(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), n = t.changes, r = t.quitEarly;
    if (this.shouldIgnoreTrimWhitespace) {
      const a = [];
      for (let l = 0, u = n.length; l < u; l++)
        a.push(nn.createFromDiffResult(this.shouldIgnoreTrimWhitespace, n[l], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
      return {
        quitEarly: r,
        changes: a
      };
    }
    const i = [];
    let s = 0, o = 0;
    for (let a = -1, l = n.length; a < l; a++) {
      const u = a + 1 < l ? n[a + 1] : null, d = u ? u.originalStart : this.originalLines.length, h = u ? u.modifiedStart : this.modifiedLines.length;
      for (; s < d && o < h; ) {
        const f = this.originalLines[s], m = this.modifiedLines[o];
        if (f !== m) {
          {
            let g = Er(f, 1), p = Er(m, 1);
            for (; g > 1 && p > 1; ) {
              const v = f.charCodeAt(g - 2), C = m.charCodeAt(p - 2);
              if (v !== C)
                break;
              g--, p--;
            }
            (g > 1 || p > 1) && this._pushTrimWhitespaceCharChange(i, s + 1, 1, g, o + 1, 1, p);
          }
          {
            let g = _r(f, 1), p = _r(m, 1);
            const v = f.length + 1, C = m.length + 1;
            for (; g < v && p < C; ) {
              const S = f.charCodeAt(g - 1), y = f.charCodeAt(p - 1);
              if (S !== y)
                break;
              g++, p++;
            }
            (g < v || p < C) && this._pushTrimWhitespaceCharChange(i, s + 1, g, v, o + 1, p, C);
          }
        }
        s++, o++;
      }
      u && (i.push(nn.createFromDiffResult(this.shouldIgnoreTrimWhitespace, u, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), s += u.originalLength, o += u.modifiedLength);
    }
    return {
      quitEarly: r,
      changes: i
    };
  }
  _pushTrimWhitespaceCharChange(t, n, r, i, s, o, a) {
    if (this._mergeTrimWhitespaceCharChange(t, n, r, i, s, o, a))
      return;
    let l;
    this.shouldComputeCharChanges && (l = [new Tt(
      n,
      r,
      n,
      i,
      s,
      o,
      s,
      a
    )]), t.push(new nn(
      n,
      n,
      s,
      s,
      l
    ));
  }
  _mergeTrimWhitespaceCharChange(t, n, r, i, s, o, a) {
    const l = t.length;
    if (l === 0)
      return !1;
    const u = t[l - 1];
    return u.originalEndLineNumber === 0 || u.modifiedEndLineNumber === 0 ? !1 : u.originalEndLineNumber === n && u.modifiedEndLineNumber === s ? (this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Tt(
      n,
      r,
      n,
      i,
      s,
      o,
      s,
      a
    )), !0) : u.originalEndLineNumber + 1 === n && u.modifiedEndLineNumber + 1 === s ? (u.originalEndLineNumber = n, u.modifiedEndLineNumber = s, this.shouldComputeCharChanges && u.charChanges && u.charChanges.push(new Tt(
      n,
      r,
      n,
      i,
      s,
      o,
      s,
      a
    )), !0) : !1;
  }
}
function Er(e, t) {
  const n = Tu(e);
  return n === -1 ? t : n + 1;
}
function _r(e, t) {
  const n = Mu(e);
  return n === -1 ? t : n + 2;
}
function Gs(e) {
  if (e === 0)
    return () => !0;
  const t = Date.now();
  return () => Date.now() - t < e;
}
class He {
  static trivial(t, n) {
    return new He([new te($.ofLength(t.length), $.ofLength(n.length))], !1);
  }
  static trivialTimedOut(t, n) {
    return new He([new te($.ofLength(t.length), $.ofLength(n.length))], !0);
  }
  constructor(t, n) {
    this.diffs = t, this.hitTimeout = n;
  }
}
class te {
  static invert(t, n) {
    const r = [];
    return zl(t, (i, s) => {
      r.push(te.fromOffsetPairs(i ? i.getEndExclusives() : ct.zero, s ? s.getStarts() : new ct(
        n,
        (i ? i.seq2Range.endExclusive - i.seq1Range.endExclusive : 0) + n
      )));
    }), r;
  }
  static fromOffsetPairs(t, n) {
    return new te(new $(t.offset1, n.offset1), new $(t.offset2, n.offset2));
  }
  static assertSorted(t) {
    let n;
    for (const r of t) {
      if (n && !(n.seq1Range.endExclusive <= r.seq1Range.start && n.seq2Range.endExclusive <= r.seq2Range.start))
        throw new le("Sequence diffs must be sorted");
      n = r;
    }
  }
  constructor(t, n) {
    this.seq1Range = t, this.seq2Range = n;
  }
  swap() {
    return new te(this.seq2Range, this.seq1Range);
  }
  toString() {
    return `${this.seq1Range} <-> ${this.seq2Range}`;
  }
  join(t) {
    return new te(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
  }
  delta(t) {
    return t === 0 ? this : new te(this.seq1Range.delta(t), this.seq2Range.delta(t));
  }
  deltaStart(t) {
    return t === 0 ? this : new te(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
  }
  deltaEnd(t) {
    return t === 0 ? this : new te(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
  }
  intersectsOrTouches(t) {
    return this.seq1Range.intersectsOrTouches(t.seq1Range) || this.seq2Range.intersectsOrTouches(t.seq2Range);
  }
  intersect(t) {
    const n = this.seq1Range.intersect(t.seq1Range), r = this.seq2Range.intersect(t.seq2Range);
    if (!(!n || !r))
      return new te(n, r);
  }
  getStarts() {
    return new ct(this.seq1Range.start, this.seq2Range.start);
  }
  getEndExclusives() {
    return new ct(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
  }
}
const Xt = class cl {
  constructor(t, n) {
    this.offset1 = t, this.offset2 = n;
  }
  toString() {
    return `${this.offset1} <-> ${this.offset2}`;
  }
  delta(t) {
    return t === 0 ? this : new cl(this.offset1 + t, this.offset2 + t);
  }
  equals(t) {
    return this.offset1 === t.offset1 && this.offset2 === t.offset2;
  }
};
Xt.zero = new Xt(0, 0), Xt.max = new Xt(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
let ct = Xt;
const Ar = class {
  isValid() {
    return !0;
  }
};
Ar.instance = new Ar();
let ui = Ar;
class a1 {
  constructor(t) {
    if (this.timeout = t, this.startTime = Date.now(), this.valid = !0, t <= 0)
      throw new le("timeout must be positive");
  }
  isValid() {
    return !(Date.now() - this.startTime < this.timeout) && this.valid && (this.valid = !1), this.valid;
  }
  disable() {
    this.timeout = Number.MAX_SAFE_INTEGER, this.isValid = () => !0, this.valid = !0;
  }
}
class Jn {
  constructor(t, n) {
    this.width = t, this.height = n, this.array = [], this.array = new Array(t * n);
  }
  get(t, n) {
    return this.array[t + n * this.width];
  }
  set(t, n, r) {
    this.array[t + n * this.width] = r;
  }
}
function Rr(e) {
  return e === 32 || e === 9;
}
const hl = class kr {
  static getKey(t) {
    let n = this.chrKeys.get(t);
    return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(t, n)), n;
  }
  constructor(t, n, r) {
    this.range = t, this.lines = n, this.source = r, this.histogram = [];
    let i = 0;
    for (let s = t.startLineNumber - 1; s < t.endLineNumberExclusive - 1; s++) {
      const o = n[s];
      for (let l = 0; l < o.length; l++) {
        i++;
        const u = o[l], d = kr.getKey(u);
        this.histogram[d] = (this.histogram[d] || 0) + 1;
      }
      i++;
      const a = kr.getKey(`
`);
      this.histogram[a] = (this.histogram[a] || 0) + 1;
    }
    this.totalCount = i;
  }
  computeSimilarity(t) {
    let n = 0;
    const r = Math.max(this.histogram.length, t.histogram.length);
    for (let i = 0; i < r; i++)
      n += Math.abs((this.histogram[i] ?? 0) - (t.histogram[i] ?? 0));
    return 1 - n / (this.totalCount + t.totalCount);
  }
};
hl.chrKeys = /* @__PURE__ */ new Map();
let Js = hl;
class l1 {
  compute(t, n, r = ui.instance, i) {
    if (t.length === 0 || n.length === 0)
      return He.trivial(t, n);
    const s = new Jn(t.length, n.length), o = new Jn(t.length, n.length), a = new Jn(t.length, n.length);
    for (let g = 0; g < t.length; g++)
      for (let p = 0; p < n.length; p++) {
        if (!r.isValid())
          return He.trivialTimedOut(t, n);
        const v = g === 0 ? 0 : s.get(g - 1, p), C = p === 0 ? 0 : s.get(g, p - 1);
        let S;
        t.getElement(g) === n.getElement(p) ? (g === 0 || p === 0 ? S = 0 : S = s.get(g - 1, p - 1), g > 0 && p > 0 && o.get(g - 1, p - 1) === 3 && (S += a.get(g - 1, p - 1)), S += i ? i(g, p) : 1) : S = -1;
        const y = Math.max(v, C, S);
        if (y === S) {
          const w = g > 0 && p > 0 ? a.get(g - 1, p - 1) : 0;
          a.set(g, p, w + 1), o.set(g, p, 3);
        } else y === v ? (a.set(g, p, 0), o.set(g, p, 1)) : y === C && (a.set(g, p, 0), o.set(g, p, 2));
        s.set(g, p, y);
      }
    const l = [];
    let u = t.length, d = n.length;
    function h(g, p) {
      (g + 1 !== u || p + 1 !== d) && l.push(new te(new $(g + 1, u), new $(p + 1, d))), u = g, d = p;
    }
    let f = t.length - 1, m = n.length - 1;
    for (; f >= 0 && m >= 0; )
      o.get(f, m) === 3 ? (h(f, m), f--, m--) : o.get(f, m) === 1 ? f-- : m--;
    return h(-1, -1), l.reverse(), new He(l, !1);
  }
}
class dl {
  compute(t, n, r = ui.instance) {
    if (t.length === 0 || n.length === 0)
      return He.trivial(t, n);
    const i = t, s = n;
    function o(p, v) {
      for (; p < i.length && v < s.length && i.getElement(p) === s.getElement(v); )
        p++, v++;
      return p;
    }
    let a = 0;
    const l = new u1();
    l.set(0, o(0, 0));
    const u = new c1();
    u.set(0, l.get(0) === 0 ? null : new Xs(null, 0, 0, l.get(0)));
    let d = 0;
    e: for (; ; ) {
      if (a++, !r.isValid())
        return He.trivialTimedOut(i, s);
      const p = -Math.min(a, s.length + a % 2), v = Math.min(a, i.length + a % 2);
      for (d = p; d <= v; d += 2) {
        const C = d === v ? -1 : l.get(d + 1), S = d === p ? -1 : l.get(d - 1) + 1, y = Math.min(Math.max(C, S), i.length), w = y - d;
        if (y > i.length || w > s.length)
          continue;
        const b = o(y, w);
        l.set(d, b);
        const L = y === C ? u.get(d + 1) : u.get(d - 1);
        if (u.set(d, b !== y ? new Xs(L, y, w, b - y) : L), l.get(d) === i.length && l.get(d) - d === s.length)
          break e;
      }
    }
    let h = u.get(d);
    const f = [];
    let m = i.length, g = s.length;
    for (; ; ) {
      const p = h ? h.x + h.length : 0, v = h ? h.y + h.length : 0;
      if ((p !== m || v !== g) && f.push(new te(new $(p, m), new $(v, g))), !h)
        break;
      m = h.x, g = h.y, h = h.prev;
    }
    return f.reverse(), new He(f, !1);
  }
}
class Xs {
  constructor(t, n, r, i) {
    this.prev = t, this.x = n, this.y = r, this.length = i;
  }
}
class u1 {
  constructor() {
    this.positiveArr = new Int32Array(10), this.negativeArr = new Int32Array(10);
  }
  get(t) {
    return t < 0 ? (t = -t - 1, this.negativeArr[t]) : this.positiveArr[t];
  }
  set(t, n) {
    if (t < 0) {
      if (t = -t - 1, t >= this.negativeArr.length) {
        const r = this.negativeArr;
        this.negativeArr = new Int32Array(r.length * 2), this.negativeArr.set(r);
      }
      this.negativeArr[t] = n;
    } else {
      if (t >= this.positiveArr.length) {
        const r = this.positiveArr;
        this.positiveArr = new Int32Array(r.length * 2), this.positiveArr.set(r);
      }
      this.positiveArr[t] = n;
    }
  }
}
class c1 {
  constructor() {
    this.positiveArr = [], this.negativeArr = [];
  }
  get(t) {
    return t < 0 ? (t = -t - 1, this.negativeArr[t]) : this.positiveArr[t];
  }
  set(t, n) {
    t < 0 ? (t = -t - 1, this.negativeArr[t] = n) : this.positiveArr[t] = n;
  }
}
class Pn {
  constructor(t, n, r) {
    this.lines = t, this.range = n, this.considerWhitespaceChanges = r, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
    for (let i = this.range.startLineNumber; i <= this.range.endLineNumber; i++) {
      let s = t[i - 1], o = 0;
      i === this.range.startLineNumber && this.range.startColumn > 1 && (o = this.range.startColumn - 1, s = s.substring(o)), this.lineStartOffsets.push(o);
      let a = 0;
      if (!r) {
        const u = s.trimStart();
        a = s.length - u.length, s = u.trimEnd();
      }
      this.trimmedWsLengthsByLineIdx.push(a);
      const l = i === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - o - a, s.length) : s.length;
      for (let u = 0; u < l; u++)
        this.elements.push(s.charCodeAt(u));
      i < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
    }
  }
  toString() {
    return `Slice: "${this.text}"`;
  }
  get text() {
    return this.getText(new $(0, this.length));
  }
  getText(t) {
    return this.elements.slice(t.start, t.endExclusive).map((n) => String.fromCharCode(n)).join("");
  }
  getElement(t) {
    return this.elements[t];
  }
  get length() {
    return this.elements.length;
  }
  getBoundaryScore(t) {
    const n = Zs(t > 0 ? this.elements[t - 1] : -1), r = Zs(t < this.elements.length ? this.elements[t] : -1);
    if (n === 7 && r === 8)
      return 0;
    if (n === 8)
      return 150;
    let i = 0;
    return n !== r && (i += 10, n === 0 && r === 1 && (i += 1)), i += Qs(n), i += Qs(r), i;
  }
  translateOffset(t, n = "right") {
    const r = It(this.firstElementOffsetByLineIdx, (s) => s <= t), i = t - this.firstElementOffsetByLineIdx[r];
    return new H(
      this.range.startLineNumber + r,
      1 + this.lineStartOffsets[r] + i + (i === 0 && n === "left" ? 0 : this.trimmedWsLengthsByLineIdx[r])
    );
  }
  translateRange(t) {
    const n = this.translateOffset(t.start, "right"), r = this.translateOffset(t.endExclusive, "left");
    return r.isBefore(n) ? F.fromPositions(r, r) : F.fromPositions(n, r);
  }
  findWordContaining(t) {
    if (t < 0 || t >= this.elements.length || !Xn(this.elements[t]))
      return;
    let n = t;
    for (; n > 0 && Xn(this.elements[n - 1]); )
      n--;
    let r = t;
    for (; r < this.elements.length && Xn(this.elements[r]); )
      r++;
    return new $(n, r);
  }
  countLinesIn(t) {
    return this.translateOffset(t.endExclusive).lineNumber - this.translateOffset(t.start).lineNumber;
  }
  isStronglyEqual(t, n) {
    return this.elements[t] === this.elements[n];
  }
  extendToFullLines(t) {
    const n = Pt(this.firstElementOffsetByLineIdx, (i) => i <= t.start) ?? 0, r = Ul(this.firstElementOffsetByLineIdx, (i) => t.endExclusive <= i) ?? this.elements.length;
    return new $(n, r);
  }
}
function Xn(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
}
const h1 = {
  0: 0,
  1: 0,
  2: 0,
  3: 10,
  4: 2,
  5: 30,
  6: 3,
  7: 10,
  8: 10
};
function Qs(e) {
  return h1[e];
}
function Zs(e) {
  return e === 10 ? 8 : e === 13 ? 7 : Rr(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
}
function d1(e, t, n, r, i, s) {
  let { moves: o, excludedChanges: a } = m1(e, t, n, s);
  if (!s.isValid())
    return [];
  const l = e.filter((d) => !a.has(d)), u = g1(l, r, i, t, n, s);
  return Hl(o, u), o = p1(o), o = o.filter((d) => {
    const h = d.original.toOffsetRange().slice(t).map((f) => f.trim());
    return h.join(`
`).length >= 15 && f1(h, (f) => f.length >= 2) >= 2;
  }), o = b1(e, o), o;
}
function f1(e, t) {
  let n = 0;
  for (const r of e)
    t(r) && n++;
  return n;
}
function m1(e, t, n, r) {
  const i = [], s = e.filter((l) => l.modified.isEmpty && l.original.length >= 3).map((l) => new Js(l.original, t, l)), o = new Set(e.filter((l) => l.original.isEmpty && l.modified.length >= 3).map((l) => new Js(l.modified, n, l))), a = /* @__PURE__ */ new Set();
  for (const l of s) {
    let u = -1, d;
    for (const h of o) {
      const f = l.computeSimilarity(h);
      f > u && (u = f, d = h);
    }
    if (u > 0.9 && d && (o.delete(d), i.push(new Te(l.range, d.range)), a.add(l.source), a.add(d.source)), !r.isValid())
      return { moves: i, excludedChanges: a };
  }
  return { moves: i, excludedChanges: a };
}
function g1(e, t, n, r, i, s) {
  const o = [], a = new tu();
  for (const f of e)
    for (let m = f.original.startLineNumber; m < f.original.endLineNumberExclusive - 2; m++) {
      const g = `${t[m - 1]}:${t[m + 1 - 1]}:${t[m + 2 - 1]}`;
      a.add(g, { range: new D(m, m + 3) });
    }
  const l = [];
  e.sort(en((f) => f.modified.startLineNumber, tn));
  for (const f of e) {
    let m = [];
    for (let g = f.modified.startLineNumber; g < f.modified.endLineNumberExclusive - 2; g++) {
      const p = `${n[g - 1]}:${n[g + 1 - 1]}:${n[g + 2 - 1]}`, v = new D(g, g + 3), C = [];
      a.forEach(p, ({ range: S }) => {
        for (const w of m)
          if (w.originalLineRange.endLineNumberExclusive + 1 === S.endLineNumberExclusive && w.modifiedLineRange.endLineNumberExclusive + 1 === v.endLineNumberExclusive) {
            w.originalLineRange = new D(
              w.originalLineRange.startLineNumber,
              S.endLineNumberExclusive
            ), w.modifiedLineRange = new D(
              w.modifiedLineRange.startLineNumber,
              v.endLineNumberExclusive
            ), C.push(w);
            return;
          }
        const y = {
          modifiedLineRange: v,
          originalLineRange: S
        };
        l.push(y), C.push(y);
      }), m = C;
    }
    if (!s.isValid())
      return [];
  }
  l.sort(Gl(en((f) => f.modifiedLineRange.length, tn)));
  const u = new Ke(), d = new Ke();
  for (const f of l) {
    const m = f.modifiedLineRange.startLineNumber - f.originalLineRange.startLineNumber, g = u.subtractFrom(f.modifiedLineRange), p = d.subtractFrom(f.originalLineRange).getWithDelta(m), v = g.getIntersection(p);
    for (const C of v.ranges) {
      if (C.length < 3)
        continue;
      const S = C, y = C.delta(-m);
      o.push(new Te(y, S)), u.addRange(S), d.addRange(y);
    }
  }
  o.sort(en((f) => f.original.startLineNumber, tn));
  const h = new ka(e);
  for (let f = 0; f < o.length; f++) {
    const m = o[f], g = h.findLastMonotonous((L) => L.original.startLineNumber <= m.original.startLineNumber), p = Pt(e, (L) => L.modified.startLineNumber <= m.modified.startLineNumber), v = Math.max(m.original.startLineNumber - g.original.startLineNumber, m.modified.startLineNumber - p.modified.startLineNumber), C = h.findLastMonotonous((L) => L.original.startLineNumber < m.original.endLineNumberExclusive), S = Pt(e, (L) => L.modified.startLineNumber < m.modified.endLineNumberExclusive), y = Math.max(C.original.endLineNumberExclusive - m.original.endLineNumberExclusive, S.modified.endLineNumberExclusive - m.modified.endLineNumberExclusive);
    let w;
    for (w = 0; w < v; w++) {
      const L = m.original.startLineNumber - w - 1, x = m.modified.startLineNumber - w - 1;
      if (L > r.length || x > i.length || u.contains(x) || d.contains(L) || !Ys(r[L - 1], i[x - 1], s))
        break;
    }
    w > 0 && (d.addRange(new D(m.original.startLineNumber - w, m.original.startLineNumber)), u.addRange(new D(m.modified.startLineNumber - w, m.modified.startLineNumber)));
    let b;
    for (b = 0; b < y; b++) {
      const L = m.original.endLineNumberExclusive + b, x = m.modified.endLineNumberExclusive + b;
      if (L > r.length || x > i.length || u.contains(x) || d.contains(L) || !Ys(r[L - 1], i[x - 1], s))
        break;
    }
    b > 0 && (d.addRange(new D(
      m.original.endLineNumberExclusive,
      m.original.endLineNumberExclusive + b
    )), u.addRange(new D(
      m.modified.endLineNumberExclusive,
      m.modified.endLineNumberExclusive + b
    ))), (w > 0 || b > 0) && (o[f] = new Te(new D(
      m.original.startLineNumber - w,
      m.original.endLineNumberExclusive + b
    ), new D(
      m.modified.startLineNumber - w,
      m.modified.endLineNumberExclusive + b
    )));
  }
  return o;
}
function Ys(e, t, n) {
  if (e.trim() === t.trim())
    return !0;
  if (e.length > 300 && t.length > 300)
    return !1;
  const r = new dl().compute(new Pn([e], new F(1, 1, 1, e.length), !1), new Pn([t], new F(1, 1, 1, t.length), !1), n);
  let i = 0;
  const s = te.invert(r.diffs, e.length);
  for (const l of s)
    l.seq1Range.forEach((u) => {
      Rr(e.charCodeAt(u)) || i++;
    });
  function o(l) {
    let u = 0;
    for (let d = 0; d < e.length; d++)
      Rr(l.charCodeAt(d)) || u++;
    return u;
  }
  const a = o(e.length > t.length ? e : t);
  return i / a > 0.6 && a > 10;
}
function p1(e) {
  if (e.length === 0)
    return e;
  e.sort(en((n) => n.original.startLineNumber, tn));
  const t = [e[0]];
  for (let n = 1; n < e.length; n++) {
    const r = t[t.length - 1], i = e[n], s = i.original.startLineNumber - r.original.endLineNumberExclusive, o = i.modified.startLineNumber - r.modified.endLineNumberExclusive;
    if (s >= 0 && o >= 0 && s + o <= 2) {
      t[t.length - 1] = r.join(i);
      continue;
    }
    t.push(i);
  }
  return t;
}
function b1(e, t) {
  const n = new ka(e);
  return t = t.filter((r) => {
    const i = n.findLastMonotonous((o) => o.original.startLineNumber < r.original.endLineNumberExclusive) || new Te(new D(1, 1), new D(1, 1)), s = Pt(e, (o) => o.modified.startLineNumber < r.modified.endLineNumberExclusive);
    return i !== s;
  }), t;
}
function eo(e, t, n) {
  let r = n;
  return r = to(e, t, r), r = to(e, t, r), r = y1(e, t, r), r;
}
function to(e, t, n) {
  if (n.length === 0)
    return n;
  const r = [];
  r.push(n[0]);
  for (let s = 1; s < n.length; s++) {
    const o = r[r.length - 1];
    let a = n[s];
    if (a.seq1Range.isEmpty || a.seq2Range.isEmpty) {
      const l = a.seq1Range.start - o.seq1Range.endExclusive;
      let u;
      for (u = 1; u <= l && !(e.getElement(a.seq1Range.start - u) !== e.getElement(a.seq1Range.endExclusive - u) || t.getElement(a.seq2Range.start - u) !== t.getElement(a.seq2Range.endExclusive - u)); u++)
        ;
      if (u--, u === l) {
        r[r.length - 1] = new te(new $(o.seq1Range.start, a.seq1Range.endExclusive - l), new $(o.seq2Range.start, a.seq2Range.endExclusive - l));
        continue;
      }
      a = a.delta(-u);
    }
    r.push(a);
  }
  const i = [];
  for (let s = 0; s < r.length - 1; s++) {
    const o = r[s + 1];
    let a = r[s];
    if (a.seq1Range.isEmpty || a.seq2Range.isEmpty) {
      const l = o.seq1Range.start - a.seq1Range.endExclusive;
      let u;
      for (u = 0; u < l && !(!e.isStronglyEqual(a.seq1Range.start + u, a.seq1Range.endExclusive + u) || !t.isStronglyEqual(a.seq2Range.start + u, a.seq2Range.endExclusive + u)); u++)
        ;
      if (u === l) {
        r[s + 1] = new te(new $(a.seq1Range.start + l, o.seq1Range.endExclusive), new $(a.seq2Range.start + l, o.seq2Range.endExclusive));
        continue;
      }
      u > 0 && (a = a.delta(u));
    }
    i.push(a);
  }
  return r.length > 0 && i.push(r[r.length - 1]), i;
}
function y1(e, t, n) {
  if (!e.getBoundaryScore || !t.getBoundaryScore)
    return n;
  for (let r = 0; r < n.length; r++) {
    const i = r > 0 ? n[r - 1] : void 0, s = n[r], o = r + 1 < n.length ? n[r + 1] : void 0, a = new $(
      i ? i.seq1Range.endExclusive + 1 : 0,
      o ? o.seq1Range.start - 1 : e.length
    ), l = new $(
      i ? i.seq2Range.endExclusive + 1 : 0,
      o ? o.seq2Range.start - 1 : t.length
    );
    s.seq1Range.isEmpty ? n[r] = no(s, e, t, a, l) : s.seq2Range.isEmpty && (n[r] = no(s.swap(), t, e, l, a).swap());
  }
  return n;
}
function no(e, t, n, r, i) {
  let s = 1;
  for (; e.seq1Range.start - s >= r.start && e.seq2Range.start - s >= i.start && n.isStronglyEqual(e.seq2Range.start - s, e.seq2Range.endExclusive - s) && s < 100; )
    s++;
  s--;
  let o = 0;
  for (; e.seq1Range.start + o < r.endExclusive && e.seq2Range.endExclusive + o < i.endExclusive && n.isStronglyEqual(e.seq2Range.start + o, e.seq2Range.endExclusive + o) && o < 100; )
    o++;
  if (s === 0 && o === 0)
    return e;
  let a = 0, l = -1;
  for (let u = -s; u <= o; u++) {
    const d = e.seq2Range.start + u, h = e.seq2Range.endExclusive + u, f = e.seq1Range.start + u, m = t.getBoundaryScore(f) + n.getBoundaryScore(d) + n.getBoundaryScore(h);
    m > l && (l = m, a = u);
  }
  return e.delta(a);
}
function v1(e, t, n) {
  const r = [];
  for (const i of n) {
    const s = r[r.length - 1];
    if (!s) {
      r.push(i);
      continue;
    }
    i.seq1Range.start - s.seq1Range.endExclusive <= 2 || i.seq2Range.start - s.seq2Range.endExclusive <= 2 ? r[r.length - 1] = new te(s.seq1Range.join(i.seq1Range), s.seq2Range.join(i.seq2Range)) : r.push(i);
  }
  return r;
}
function w1(e, t, n) {
  const r = te.invert(n, e.length), i = [];
  let s = new ct(0, 0);
  function o(a, l) {
    if (a.offset1 < s.offset1 || a.offset2 < s.offset2)
      return;
    const u = e.findWordContaining(a.offset1), d = t.findWordContaining(a.offset2);
    if (!u || !d)
      return;
    let h = new te(u, d);
    const f = h.intersect(l);
    let m = f.seq1Range.length, g = f.seq2Range.length;
    for (; r.length > 0; ) {
      const p = r[0];
      if (!(p.seq1Range.intersects(h.seq1Range) || p.seq2Range.intersects(h.seq2Range)))
        break;
      const v = e.findWordContaining(p.seq1Range.start), C = t.findWordContaining(p.seq2Range.start), S = new te(v, C), y = S.intersect(p);
      if (m += y.seq1Range.length, g += y.seq2Range.length, h = h.join(S), h.seq1Range.endExclusive >= p.seq1Range.endExclusive)
        r.shift();
      else
        break;
    }
    m + g < (h.seq1Range.length + h.seq2Range.length) * 2 / 3 && i.push(h), s = h.getEndExclusives();
  }
  for (; r.length > 0; ) {
    const a = r.shift();
    a.seq1Range.isEmpty || (o(a.getStarts(), a), o(a.getEndExclusives().delta(-1), a));
  }
  return C1(n, i);
}
function C1(e, t) {
  const n = [];
  for (; e.length > 0 || t.length > 0; ) {
    const r = e[0], i = t[0];
    let s;
    r && (!i || r.seq1Range.start < i.seq1Range.start) ? s = e.shift() : s = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= s.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(s) : n.push(s);
  }
  return n;
}
function L1(e, t, n) {
  let r = n;
  if (r.length === 0)
    return r;
  let i = 0, s;
  do {
    s = !1;
    const o = [
      r[0]
    ];
    for (let a = 1; a < r.length; a++) {
      let l = function(h, f) {
        const m = new $(d.seq1Range.endExclusive, u.seq1Range.start);
        return e.getText(m).replace(/\s/g, "").length <= 4 && (h.seq1Range.length + h.seq2Range.length > 5 || f.seq1Range.length + f.seq2Range.length > 5);
      };
      const u = r[a], d = o[o.length - 1];
      l(d, u) ? (s = !0, o[o.length - 1] = o[o.length - 1].join(u)) : o.push(u);
    }
    r = o;
  } while (i++ < 10 && s);
  return r;
}
function S1(e, t, n) {
  let r = n;
  if (r.length === 0)
    return r;
  let i = 0, s;
  do {
    s = !1;
    const a = [
      r[0]
    ];
    for (let l = 1; l < r.length; l++) {
      let u = function(f, m) {
        const g = new $(h.seq1Range.endExclusive, d.seq1Range.start);
        if (e.countLinesIn(g) > 5 || g.length > 500)
          return !1;
        const p = e.getText(g).trim();
        if (p.length > 20 || p.split(/\r\n|\r|\n/).length > 1)
          return !1;
        const v = e.countLinesIn(f.seq1Range), C = f.seq1Range.length, S = t.countLinesIn(f.seq2Range), y = f.seq2Range.length, w = e.countLinesIn(m.seq1Range), b = m.seq1Range.length, L = t.countLinesIn(m.seq2Range), x = m.seq2Range.length, T = 2 * 40 + 50;
        function I(q) {
          return Math.min(q, T);
        }
        return Math.pow(Math.pow(I(v * 40 + C), 1.5) + Math.pow(I(S * 40 + y), 1.5), 1.5) + Math.pow(Math.pow(I(w * 40 + b), 1.5) + Math.pow(I(L * 40 + x), 1.5), 1.5) > (T ** 1.5) ** 1.5 * 1.3;
      };
      const d = r[l], h = a[a.length - 1];
      u(h, d) ? (s = !0, a[a.length - 1] = a[a.length - 1].join(d)) : a.push(d);
    }
    r = a;
  } while (i++ < 10 && s);
  const o = [];
  return Wl(r, (a, l, u) => {
    let d = l;
    function h(C) {
      return C.length > 0 && C.trim().length <= 3 && l.seq1Range.length + l.seq2Range.length > 100;
    }
    const f = e.extendToFullLines(l.seq1Range), m = e.getText(new $(f.start, l.seq1Range.start));
    h(m) && (d = d.deltaStart(-m.length));
    const g = e.getText(new $(l.seq1Range.endExclusive, f.endExclusive));
    h(g) && (d = d.deltaEnd(g.length));
    const p = te.fromOffsetPairs(a ? a.getEndExclusives() : ct.zero, u ? u.getStarts() : ct.max), v = d.intersect(p);
    o.length > 0 && v.getStarts().equals(o[o.length - 1].getEndExclusives()) ? o[o.length - 1] = o[o.length - 1].join(v) : o.push(v);
  }), o;
}
class ro {
  constructor(t, n) {
    this.trimmedHash = t, this.lines = n;
  }
  getElement(t) {
    return this.trimmedHash[t];
  }
  get length() {
    return this.trimmedHash.length;
  }
  getBoundaryScore(t) {
    const n = t === 0 ? 0 : io(this.lines[t - 1]), r = t === this.lines.length ? 0 : io(this.lines[t]);
    return 1e3 - (n + r);
  }
  getText(t) {
    return this.lines.slice(t.start, t.endExclusive).join(`
`);
  }
  isStronglyEqual(t, n) {
    return this.lines[t] === this.lines[n];
  }
}
function io(e) {
  let t = 0;
  for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9); )
    t++;
  return t;
}
class x1 {
  constructor() {
    this.dynamicProgrammingDiffing = new l1(), this.myersDiffingAlgorithm = new dl();
  }
  computeDiff(t, n, r) {
    if (t.length <= 1 && jl(t, n, (b, L) => b === L))
      return new xn([], [], !1);
    if (t.length === 1 && t[0].length === 0 || n.length === 1 && n[0].length === 0)
      return new xn([
        new We(new D(1, t.length + 1), new D(1, n.length + 1), [
          new ye(new F(
            1,
            1,
            t.length,
            t[t.length - 1].length + 1
          ), new F(
            1,
            1,
            n.length,
            n[n.length - 1].length + 1
          ))
        ])
      ], [], !1);
    const i = r.maxComputationTimeMs === 0 ? ui.instance : new a1(r.maxComputationTimeMs), s = !r.ignoreTrimWhitespace, o = /* @__PURE__ */ new Map();
    function a(b) {
      let L = o.get(b);
      return L === void 0 && (L = o.size, o.set(b, L)), L;
    }
    const l = t.map((b) => a(b.trim())), u = n.map((b) => a(b.trim())), d = new ro(l, t), h = new ro(u, n), f = d.length + h.length < 1700 ? this.dynamicProgrammingDiffing.compute(d, h, i, (b, L) => t[b] === n[L] ? n[L].length === 0 ? 0.1 : 1 + Math.log(1 + n[L].length) : 0.99) : this.myersDiffingAlgorithm.compute(d, h, i);
    let m = f.diffs, g = f.hitTimeout;
    m = eo(d, h, m), m = L1(d, h, m);
    const p = [], v = (b) => {
      if (s)
        for (let L = 0; L < b; L++) {
          const x = C + L, T = S + L;
          if (t[x] !== n[T]) {
            const I = this.refineDiff(t, n, new te(new $(x, x + 1), new $(T, T + 1)), i, s);
            for (const q of I.mappings)
              p.push(q);
            I.hitTimeout && (g = !0);
          }
        }
    };
    let C = 0, S = 0;
    for (const b of m) {
      on(() => b.seq1Range.start - C === b.seq2Range.start - S);
      const L = b.seq1Range.start - C;
      v(L), C = b.seq1Range.endExclusive, S = b.seq2Range.endExclusive;
      const x = this.refineDiff(t, n, b, i, s);
      x.hitTimeout && (g = !0);
      for (const T of x.mappings)
        p.push(T);
    }
    v(t.length - C);
    const y = Ws(p, new gn(t), new gn(n));
    let w = [];
    return r.computeMoves && (w = this.computeMoves(y, t, n, l, u, i, s)), on(() => {
      function b(x, T) {
        if (x.lineNumber < 1 || x.lineNumber > T.length)
          return !1;
        const I = T[x.lineNumber - 1];
        return !(x.column < 1 || x.column > I.length + 1);
      }
      function L(x, T) {
        return !(x.startLineNumber < 1 || x.startLineNumber > T.length + 1 || x.endLineNumberExclusive < 1 || x.endLineNumberExclusive > T.length + 1);
      }
      for (const x of y) {
        if (!x.innerChanges)
          return !1;
        for (const T of x.innerChanges)
          if (!(b(T.modifiedRange.getStartPosition(), n) && b(T.modifiedRange.getEndPosition(), n) && b(T.originalRange.getStartPosition(), t) && b(T.originalRange.getEndPosition(), t)))
            return !1;
        if (!L(x.modified, n) || !L(x.original, t))
          return !1;
      }
      return !0;
    }), new xn(y, w, g);
  }
  computeMoves(t, n, r, i, s, o, a) {
    return d1(t, n, r, i, s, o).map((l) => {
      const u = this.refineDiff(n, r, new te(l.original.toOffsetRange(), l.modified.toOffsetRange()), o, a), d = Ws(u.mappings, new gn(n), new gn(r), !0);
      return new li(l, d);
    });
  }
  refineDiff(t, n, r, i, s) {
    const o = N1(r).toRangeMapping2(t, n), a = new Pn(t, o.originalRange, s), l = new Pn(n, o.modifiedRange, s), u = a.length + l.length < 500 ? this.dynamicProgrammingDiffing.compute(a, l, i) : this.myersDiffingAlgorithm.compute(a, l, i);
    let d = u.diffs;
    return d = eo(a, l, d), d = w1(a, l, d), d = v1(a, l, d), d = S1(a, l, d), {
      mappings: d.map((h) => new ye(a.translateRange(h.seq1Range), l.translateRange(h.seq2Range))),
      hitTimeout: u.hitTimeout
    };
  }
}
function N1(e) {
  return new Te(new D(e.seq1Range.start + 1, e.seq1Range.endExclusive + 1), new D(e.seq2Range.start + 1, e.seq2Range.endExclusive + 1));
}
const Qn = {
  getLegacy: () => new i1(),
  getDefault: () => new x1()
};
function st(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
class Y {
  constructor(t, n, r, i = 1) {
    this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, t)) | 0, this.g = Math.min(255, Math.max(0, n)) | 0, this.b = Math.min(255, Math.max(0, r)) | 0, this.a = st(Math.max(Math.min(1, i), 0), 3);
  }
  static equals(t, n) {
    return t.r === n.r && t.g === n.g && t.b === n.b && t.a === n.a;
  }
}
class ke {
  constructor(t, n, r, i) {
    this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = st(Math.max(Math.min(1, n), 0), 3), this.l = st(Math.max(Math.min(1, r), 0), 3), this.a = st(Math.max(Math.min(1, i), 0), 3);
  }
  static equals(t, n) {
    return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
  }
  static fromRGBA(t) {
    const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = t.a, o = Math.max(n, r, i), a = Math.min(n, r, i);
    let l = 0, u = 0;
    const d = (a + o) / 2, h = o - a;
    if (h > 0) {
      switch (u = Math.min(d <= 0.5 ? h / (2 * d) : h / (2 - 2 * d), 1), o) {
        case n:
          l = (r - i) / h + (r < i ? 6 : 0);
          break;
        case r:
          l = (i - n) / h + 2;
          break;
        case i:
          l = (n - r) / h + 4;
          break;
      }
      l *= 60, l = Math.round(l);
    }
    return new ke(l, u, d, s);
  }
  static _hue2rgb(t, n, r) {
    return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? t + (n - t) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? t + (n - t) * (2 / 3 - r) * 6 : t;
  }
  static toRGBA(t) {
    const n = t.h / 360, { s: r, l: i, a: s } = t;
    let o, a, l;
    if (r === 0)
      o = a = l = i;
    else {
      const u = i < 0.5 ? i * (1 + r) : i + r - i * r, d = 2 * i - u;
      o = ke._hue2rgb(d, u, n + 1 / 3), a = ke._hue2rgb(d, u, n), l = ke._hue2rgb(d, u, n - 1 / 3);
    }
    return new Y(Math.round(o * 255), Math.round(a * 255), Math.round(l * 255), s);
  }
}
class kt {
  constructor(t, n, r, i) {
    this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = st(Math.max(Math.min(1, n), 0), 3), this.v = st(Math.max(Math.min(1, r), 0), 3), this.a = st(Math.max(Math.min(1, i), 0), 3);
  }
  static equals(t, n) {
    return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
  }
  static fromRGBA(t) {
    const n = t.r / 255, r = t.g / 255, i = t.b / 255, s = Math.max(n, r, i), o = Math.min(n, r, i), a = s - o, l = s === 0 ? 0 : a / s;
    let u;
    return a === 0 ? u = 0 : s === n ? u = ((r - i) / a % 6 + 6) % 6 : s === r ? u = (i - n) / a + 2 : u = (n - r) / a + 4, new kt(Math.round(u * 60), l, s, t.a);
  }
  static toRGBA(t) {
    const { h: n, s: r, v: i, a: s } = t, o = i * r, a = o * (1 - Math.abs(n / 60 % 2 - 1)), l = i - o;
    let [u, d, h] = [0, 0, 0];
    return n < 60 ? (u = o, d = a) : n < 120 ? (u = a, d = o) : n < 180 ? (d = o, h = a) : n < 240 ? (d = a, h = o) : n < 300 ? (u = a, h = o) : n <= 360 && (u = o, h = a), u = Math.round((u + l) * 255), d = Math.round((d + l) * 255), h = Math.round((h + l) * 255), new Y(u, d, h, s);
  }
}
var W;
let ci = (W = class {
  static fromHex(e) {
    return W.Format.CSS.parseHex(e) || W.red;
  }
  static equals(e, t) {
    return !e && !t ? !0 : !e || !t ? !1 : e.equals(t);
  }
  get hsla() {
    return this._hsla ? this._hsla : ke.fromRGBA(this.rgba);
  }
  get hsva() {
    return this._hsva ? this._hsva : kt.fromRGBA(this.rgba);
  }
  constructor(e) {
    if (e)
      if (e instanceof Y)
        this.rgba = e;
      else if (e instanceof ke)
        this._hsla = e, this.rgba = ke.toRGBA(e);
      else if (e instanceof kt)
        this._hsva = e, this.rgba = kt.toRGBA(e);
      else
        throw new Error("Invalid color ctor argument");
    else throw new Error("Color needs a value");
  }
  equals(e) {
    return !!e && Y.equals(this.rgba, e.rgba) && ke.equals(this.hsla, e.hsla) && kt.equals(this.hsva, e.hsva);
  }
  getRelativeLuminance() {
    const e = W._relativeLuminanceForComponent(this.rgba.r), t = W._relativeLuminanceForComponent(this.rgba.g), n = W._relativeLuminanceForComponent(this.rgba.b), r = 0.2126 * e + 0.7152 * t + 0.0722 * n;
    return st(r, 4);
  }
  reduceRelativeLuminace(e, t) {
    let { r: n, g: r, b: i } = e.rgba, s = this.getContrastRatio(e);
    for (; s < t && (n > 0 || r > 0 || i > 0); )
      n -= Math.max(0, Math.ceil(n * 0.1)), r -= Math.max(0, Math.ceil(r * 0.1)), i -= Math.max(0, Math.ceil(i * 0.1)), s = this.getContrastRatio(new W(new Y(n, r, i)));
    return new W(new Y(n, r, i));
  }
  increaseRelativeLuminace(e, t) {
    let { r: n, g: r, b: i } = e.rgba, s = this.getContrastRatio(e);
    for (; s < t && (n < 255 || r < 255 || i < 255); )
      n = Math.min(255, n + Math.ceil((255 - n) * 0.1)), r = Math.min(255, r + Math.ceil((255 - r) * 0.1)), i = Math.min(255, i + Math.ceil((255 - i) * 0.1)), s = this.getContrastRatio(new W(new Y(n, r, i)));
    return new W(new Y(n, r, i));
  }
  static _relativeLuminanceForComponent(e) {
    const t = e / 255;
    return t <= 0.03928 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4);
  }
  getContrastRatio(e) {
    const t = this.getRelativeLuminance(), n = e.getRelativeLuminance();
    return t > n ? (t + 0.05) / (n + 0.05) : (n + 0.05) / (t + 0.05);
  }
  isDarker() {
    return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 < 128;
  }
  isLighter() {
    return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 >= 128;
  }
  isLighterThan(e) {
    const t = this.getRelativeLuminance(), n = e.getRelativeLuminance();
    return t > n;
  }
  isDarkerThan(e) {
    const t = this.getRelativeLuminance(), n = e.getRelativeLuminance();
    return t < n;
  }
  ensureConstrast(e, t) {
    const n = this.getRelativeLuminance(), r = e.getRelativeLuminance();
    if (this.getContrastRatio(e) < t) {
      if (r < n) {
        const o = this.reduceRelativeLuminace(e, t), a = this.getContrastRatio(o);
        if (a < t) {
          const l = this.increaseRelativeLuminace(e, t), u = this.getContrastRatio(l);
          return a > u ? o : l;
        }
        return o;
      }
      const i = this.increaseRelativeLuminace(e, t), s = this.getContrastRatio(i);
      if (s < t) {
        const o = this.reduceRelativeLuminace(e, t), a = this.getContrastRatio(o);
        return s > a ? i : o;
      }
      return i;
    }
    return e;
  }
  lighten(e) {
    return new W(new ke(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * e, this.hsla.a));
  }
  darken(e) {
    return new W(new ke(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * e, this.hsla.a));
  }
  transparent(e) {
    const { r: t, g: n, b: r, a: i } = this.rgba;
    return new W(new Y(t, n, r, i * e));
  }
  isTransparent() {
    return this.rgba.a === 0;
  }
  isOpaque() {
    return this.rgba.a === 1;
  }
  opposite() {
    return new W(new Y(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
  }
  blend(e) {
    const t = e.rgba, n = this.rgba.a, r = t.a, i = n + r * (1 - n);
    if (i < 1e-6)
      return W.transparent;
    const s = this.rgba.r * n / i + t.r * r * (1 - n) / i, o = this.rgba.g * n / i + t.g * r * (1 - n) / i, a = this.rgba.b * n / i + t.b * r * (1 - n) / i;
    return new W(new Y(s, o, a, i));
  }
  makeOpaque(e) {
    if (this.isOpaque() || e.rgba.a !== 1)
      return this;
    const { r: t, g: n, b: r, a: i } = this.rgba;
    return new W(new Y(
      e.rgba.r - i * (e.rgba.r - t),
      e.rgba.g - i * (e.rgba.g - n),
      e.rgba.b - i * (e.rgba.b - r),
      1
    ));
  }
  flatten(...e) {
    const t = e.reduceRight((n, r) => W._flatten(r, n));
    return W._flatten(this, t);
  }
  static _flatten(e, t) {
    const n = 1 - e.rgba.a;
    return new W(new Y(
      n * t.rgba.r + e.rgba.a * e.rgba.r,
      n * t.rgba.g + e.rgba.a * e.rgba.g,
      n * t.rgba.b + e.rgba.a * e.rgba.b
    ));
  }
  toString() {
    return this._toString || (this._toString = W.Format.CSS.format(this)), this._toString;
  }
  static getLighterColor(e, t, n) {
    if (e.isLighterThan(t))
      return e;
    n = n || 0.5;
    const r = e.getRelativeLuminance(), i = t.getRelativeLuminance();
    return n = n * (i - r) / i, e.lighten(n);
  }
  static getDarkerColor(e, t, n) {
    if (e.isDarkerThan(t))
      return e;
    n = n || 0.5;
    const r = e.getRelativeLuminance(), i = t.getRelativeLuminance();
    return n = n * (r - i) / r, e.darken(n);
  }
}, W.white = new W(new Y(255, 255, 255, 1)), W.black = new W(new Y(0, 0, 0, 1)), W.red = new W(new Y(255, 0, 0, 1)), W.blue = new W(new Y(0, 0, 255, 1)), W.green = new W(new Y(0, 255, 0, 1)), W.cyan = new W(new Y(0, 255, 255, 1)), W.lightgrey = new W(new Y(211, 211, 211, 1)), W.transparent = new W(new Y(0, 0, 0, 0)), W);
(function(e) {
  (function(t) {
    (function(n) {
      function r(m) {
        return m.rgba.a === 1 ? `rgb(${m.rgba.r}, ${m.rgba.g}, ${m.rgba.b})` : e.Format.CSS.formatRGBA(m);
      }
      n.formatRGB = r;
      function i(m) {
        return `rgba(${m.rgba.r}, ${m.rgba.g}, ${m.rgba.b}, ${+m.rgba.a.toFixed(2)})`;
      }
      n.formatRGBA = i;
      function s(m) {
        return m.hsla.a === 1 ? `hsl(${m.hsla.h}, ${(m.hsla.s * 100).toFixed(2)}%, ${(m.hsla.l * 100).toFixed(2)}%)` : e.Format.CSS.formatHSLA(m);
      }
      n.formatHSL = s;
      function o(m) {
        return `hsla(${m.hsla.h}, ${(m.hsla.s * 100).toFixed(2)}%, ${(m.hsla.l * 100).toFixed(2)}%, ${m.hsla.a.toFixed(2)})`;
      }
      n.formatHSLA = o;
      function a(m) {
        const g = m.toString(16);
        return g.length !== 2 ? "0" + g : g;
      }
      function l(m) {
        return `#${a(m.rgba.r)}${a(m.rgba.g)}${a(m.rgba.b)}`;
      }
      n.formatHex = l;
      function u(m, g = !1) {
        return g && m.rgba.a === 1 ? e.Format.CSS.formatHex(m) : `#${a(m.rgba.r)}${a(m.rgba.g)}${a(m.rgba.b)}${a(Math.round(m.rgba.a * 255))}`;
      }
      n.formatHexA = u;
      function d(m) {
        return m.isOpaque() ? e.Format.CSS.formatHex(m) : e.Format.CSS.formatRGBA(m);
      }
      n.format = d;
      function h(m) {
        const g = m.length;
        if (g === 0 || m.charCodeAt(0) !== 35)
          return null;
        if (g === 7) {
          const p = 16 * f(m.charCodeAt(1)) + f(m.charCodeAt(2)), v = 16 * f(m.charCodeAt(3)) + f(m.charCodeAt(4)), C = 16 * f(m.charCodeAt(5)) + f(m.charCodeAt(6));
          return new e(new Y(p, v, C, 1));
        }
        if (g === 9) {
          const p = 16 * f(m.charCodeAt(1)) + f(m.charCodeAt(2)), v = 16 * f(m.charCodeAt(3)) + f(m.charCodeAt(4)), C = 16 * f(m.charCodeAt(5)) + f(m.charCodeAt(6)), S = 16 * f(m.charCodeAt(7)) + f(m.charCodeAt(8));
          return new e(new Y(p, v, C, S / 255));
        }
        if (g === 4) {
          const p = f(m.charCodeAt(1)), v = f(m.charCodeAt(2)), C = f(m.charCodeAt(3));
          return new e(new Y(16 * p + p, 16 * v + v, 16 * C + C));
        }
        if (g === 5) {
          const p = f(m.charCodeAt(1)), v = f(m.charCodeAt(2)), C = f(m.charCodeAt(3)), S = f(m.charCodeAt(4));
          return new e(new Y(16 * p + p, 16 * v + v, 16 * C + C, (16 * S + S) / 255));
        }
        return null;
      }
      n.parseHex = h;
      function f(m) {
        switch (m) {
          case 48:
            return 0;
          case 49:
            return 1;
          case 50:
            return 2;
          case 51:
            return 3;
          case 52:
            return 4;
          case 53:
            return 5;
          case 54:
            return 6;
          case 55:
            return 7;
          case 56:
            return 8;
          case 57:
            return 9;
          case 97:
            return 10;
          case 65:
            return 10;
          case 98:
            return 11;
          case 66:
            return 11;
          case 99:
            return 12;
          case 67:
            return 12;
          case 100:
            return 13;
          case 68:
            return 13;
          case 101:
            return 14;
          case 69:
            return 14;
          case 102:
            return 15;
          case 70:
            return 15;
        }
        return 0;
      }
    })(t.CSS || (t.CSS = {}));
  })(e.Format || (e.Format = {}));
})(ci);
function fl(e) {
  const t = [];
  for (const n of e) {
    const r = Number(n);
    (r || r === 0 && n.replace(/\s/g, "") !== "") && t.push(r);
  }
  return t;
}
function hi(e, t, n, r) {
  return {
    red: e / 255,
    blue: n / 255,
    green: t / 255,
    alpha: r
  };
}
function Ut(e, t) {
  const n = t.index, r = t[0].length;
  if (!n)
    return;
  const i = e.positionAt(n);
  return {
    startLineNumber: i.lineNumber,
    startColumn: i.column,
    endLineNumber: i.lineNumber,
    endColumn: i.column + r
  };
}
function E1(e, t) {
  if (!e)
    return;
  const n = ci.Format.CSS.parseHex(t);
  if (n)
    return {
      range: e,
      color: hi(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
    };
}
function so(e, t, n) {
  if (!e || t.length !== 1)
    return;
  const r = t[0].values(), i = fl(r);
  return {
    range: e,
    color: hi(i[0], i[1], i[2], n ? i[3] : 1)
  };
}
function oo(e, t, n) {
  if (!e || t.length !== 1)
    return;
  const r = t[0].values(), i = fl(r), s = new ci(new ke(
    i[0],
    i[1] / 100,
    i[2] / 100,
    n ? i[3] : 1
  ));
  return {
    range: e,
    color: hi(s.rgba.r, s.rgba.g, s.rgba.b, s.rgba.a)
  };
}
function jt(e, t) {
  return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
}
function _1(e) {
  const t = [], n = jt(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);
  if (n.length > 0)
    for (const r of n) {
      const i = r.filter((l) => l !== void 0), s = i[1], o = i[2];
      if (!o)
        continue;
      let a;
      if (s === "rgb") {
        const l = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
        a = so(Ut(e, r), jt(o, l), !1);
      } else if (s === "rgba") {
        const l = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        a = so(Ut(e, r), jt(o, l), !0);
      } else if (s === "hsl") {
        const l = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
        a = oo(Ut(e, r), jt(o, l), !1);
      } else if (s === "hsla") {
        const l = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        a = oo(Ut(e, r), jt(o, l), !0);
      } else s === "#" && (a = E1(Ut(e, r), s + o));
      a && t.push(a);
    }
  return t;
}
function A1(e) {
  return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : _1(e);
}
const ao = new RegExp("\\bMARK:\\s*(.*)$", "d"), R1 = /^-+|-+$/g;
function k1(e, t) {
  var n;
  let r = [];
  if (t.findRegionSectionHeaders && (n = t.foldingRules) != null && n.markers) {
    const i = T1(e, t);
    r = r.concat(i);
  }
  if (t.findMarkSectionHeaders) {
    const i = M1(e);
    r = r.concat(i);
  }
  return r;
}
function T1(e, t) {
  const n = [], r = e.getLineCount();
  for (let i = 1; i <= r; i++) {
    const s = e.getLineContent(i), o = s.match(t.foldingRules.markers.start);
    if (o) {
      const a = { startLineNumber: i, startColumn: o[0].length + 1, endLineNumber: i, endColumn: s.length + 1 };
      if (a.endColumn > a.startColumn) {
        const l = {
          range: a,
          ...ml(s.substring(o[0].length)),
          shouldBeInComments: !1
        };
        (l.text || l.hasSeparatorLine) && n.push(l);
      }
    }
  }
  return n;
}
function M1(e) {
  const t = [], n = e.getLineCount();
  for (let r = 1; r <= n; r++) {
    const i = e.getLineContent(r);
    O1(i, r, t);
  }
  return t;
}
function O1(e, t, n) {
  ao.lastIndex = 0;
  const r = ao.exec(e);
  if (r) {
    const i = r.indices[1][0] + 1, s = r.indices[1][1] + 1, o = { startLineNumber: t, startColumn: i, endLineNumber: t, endColumn: s };
    if (o.endColumn > o.startColumn) {
      const a = {
        range: o,
        ...ml(r[1]),
        shouldBeInComments: !0
      };
      (a.text || a.hasSeparatorLine) && n.push(a);
    }
  }
}
function ml(e) {
  e = e.trim();
  const t = e.startsWith("-");
  return e = e.replace(R1, ""), { text: e, hasSeparatorLine: t };
}
function Ze(e) {
  return e === 47 || e === 92;
}
function gl(e) {
  return e.replace(/[\\/]/g, X.sep);
}
function P1(e) {
  return e.indexOf("/") === -1 && (e = gl(e)), /^[a-zA-Z]:(\/|$)/.test(e) && (e = "/" + e), e;
}
function lo(e, t = X.sep) {
  if (!e)
    return "";
  const n = e.length, r = e.charCodeAt(0);
  if (Ze(r)) {
    if (Ze(e.charCodeAt(1)) && !Ze(e.charCodeAt(2))) {
      let s = 3;
      const o = s;
      for (; s < n && !Ze(e.charCodeAt(s)); s++)
        ;
      if (o !== s && !Ze(e.charCodeAt(s + 1))) {
        for (s += 1; s < n; s++)
          if (Ze(e.charCodeAt(s)))
            return e.slice(0, s + 1).replace(/[\\/]/g, t);
      }
    }
    return t;
  } else if (I1(r) && e.charCodeAt(1) === 58)
    return Ze(e.charCodeAt(2)) ? e.slice(0, 2) + t : e.slice(0, 2);
  let i = e.indexOf("://");
  if (i !== -1) {
    for (i += 3; i < n; i++)
      if (Ze(e.charCodeAt(i)))
        return e.slice(0, i + 1);
  }
  return "";
}
function uo(e, t, n, r = Ln) {
  if (e === t)
    return !0;
  if (!e || !t || t.length > e.length)
    return !1;
  if (n) {
    if (!Fu(e, t))
      return !1;
    if (t.length === e.length)
      return !0;
    let i = t.length;
    return t.charAt(t.length - 1) === r && i--, e.charAt(i) === r;
  }
  return t.charAt(t.length - 1) !== r && (t += r), e.indexOf(t) === 0;
}
function I1(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
var fe;
(function(e) {
  e.inMemory = "inmemory", e.vscode = "vscode", e.internal = "private", e.walkThrough = "walkThrough", e.walkThroughSnippet = "walkThroughSnippet", e.http = "http", e.https = "https", e.file = "file", e.mailto = "mailto", e.untitled = "untitled", e.data = "data", e.command = "command", e.vscodeRemote = "vscode-remote", e.vscodeRemoteResource = "vscode-remote-resource", e.vscodeManagedRemoteResource = "vscode-managed-remote-resource", e.vscodeUserData = "vscode-userdata", e.vscodeCustomEditor = "vscode-custom-editor", e.vscodeNotebookCell = "vscode-notebook-cell", e.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", e.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", e.vscodeNotebookCellOutput = "vscode-notebook-cell-output", e.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", e.vscodeNotebookMetadata = "vscode-notebook-metadata", e.vscodeInteractiveInput = "vscode-interactive-input", e.vscodeSettings = "vscode-settings", e.vscodeWorkspaceTrust = "vscode-workspace-trust", e.vscodeTerminal = "vscode-terminal", e.vscodeChatCodeBlock = "vscode-chat-code-block", e.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", e.vscodeChatSesssion = "vscode-chat-editor", e.webviewPanel = "webview-panel", e.vscodeWebview = "vscode-webview", e.extension = "extension", e.vscodeFileResource = "vscode-file", e.tmp = "tmp", e.vsls = "vsls", e.vscodeSourceControl = "vscode-scm", e.commentsInput = "comment", e.codeSetting = "code-setting", e.outputChannel = "output", e.accessibleView = "accessible-view";
})(fe || (fe = {}));
const F1 = "tkn";
class V1 {
  constructor() {
    this._hosts = /* @__PURE__ */ Object.create(null), this._ports = /* @__PURE__ */ Object.create(null), this._connectionTokens = /* @__PURE__ */ Object.create(null), this._preferredWebSchema = "http", this._delegate = null, this._serverRootPath = "/";
  }
  setPreferredWebSchema(t) {
    this._preferredWebSchema = t;
  }
  setDelegate(t) {
    this._delegate = t;
  }
  setServerRootPath(t, n) {
    this._serverRootPath = q1(t, n);
  }
  getServerRootPath() {
    return this._serverRootPath;
  }
  get _remoteResourcesPath() {
    return X.join(this._serverRootPath, fe.vscodeRemoteResource);
  }
  set(t, n, r) {
    this._hosts[t] = n, this._ports[t] = r;
  }
  setConnectionToken(t, n) {
    this._connectionTokens[t] = n;
  }
  getPreferredWebSchema() {
    return this._preferredWebSchema;
  }
  rewrite(t) {
    if (this._delegate)
      try {
        return this._delegate(t);
      } catch (a) {
        return Yt(a), t;
      }
    const n = t.authority;
    let r = this._hosts[n];
    r && r.indexOf(":") !== -1 && r.indexOf("[") === -1 && (r = `[${r}]`);
    const i = this._ports[n], s = this._connectionTokens[n];
    let o = `path=${encodeURIComponent(t.path)}`;
    return typeof s == "string" && (o += `&${F1}=${encodeURIComponent(s)}`), we.from({
      scheme: Lu ? this._preferredWebSchema : fe.vscodeRemoteResource,
      authority: `${r}:${i}`,
      path: this._remoteResourcesPath,
      query: o
    });
  }
}
const D1 = new V1();
function q1(e, t) {
  return X.join(t ?? "/", `${e.quality ?? "oss"}-${e.commit ?? "dev"}`);
}
const K1 = "vscode-app", pl = class Nn {
  constructor() {
    this.staticBrowserUris = new Ql(), this.appResourcePathUrls = /* @__PURE__ */ new Map();
  }
  registerAppResourcePathUrl(t, n) {
    this.appResourcePathUrls.set(t, n);
  }
  toUrl(t) {
    var n;
    let r = this.appResourcePathUrls.get(t);
    return typeof r == "function" && (r = r()), new URL(r ?? t, ((n = globalThis.location) == null ? void 0 : n.href) ?? import.meta.url).toString();
  }
  asBrowserUri(t) {
    const n = this.toUri(t, { toUrl: this.toUrl.bind(this) });
    return this.uriToBrowserUri(n);
  }
  uriToBrowserUri(t) {
    return t.scheme === fe.vscodeRemote ? D1.rewrite(t) : t.scheme === fe.file && (Cu || xu === `${fe.vscodeFileResource}://${Nn.FALLBACK_AUTHORITY}`) ? t.with({
      scheme: fe.vscodeFileResource,
      authority: t.authority || Nn.FALLBACK_AUTHORITY,
      query: null,
      fragment: null
    }) : this.staticBrowserUris.get(t) ?? t;
  }
  asFileUri(t) {
    const n = this.toUri(t, { toUrl: this.toUrl.bind(this) });
    return this.uriToFileUri(n);
  }
  uriToFileUri(t) {
    return t.scheme === fe.vscodeFileResource ? t.with({
      scheme: fe.file,
      authority: t.authority !== Nn.FALLBACK_AUTHORITY ? t.authority : null,
      query: null,
      fragment: null
    }) : t;
  }
  toUri(t, n) {
    if (we.isUri(t))
      return t;
    if (globalThis._VSCODE_FILE_ROOT) {
      const r = globalThis._VSCODE_FILE_ROOT;
      if (/^\w[\w\d+.-]*:\/\//.test(r))
        return we.joinPath(we.parse(r, !0), t);
      const i = vc(r, t);
      return we.file(i);
    }
    return we.parse(n.toUrl(t));
  }
  registerStaticBrowserUri(t, n) {
    return this.staticBrowserUris.set(t, n), sn(() => {
      this.staticBrowserUris.get(t) === n && this.staticBrowserUris.delete(t);
    });
  }
  getRegisteredBrowserUris() {
    return this.staticBrowserUris.keys();
  }
};
pl.FALLBACK_AUTHORITY = K1;
let $1 = pl;
new $1();
var co;
(function(e) {
  const t = /* @__PURE__ */ new Map([
    ["1", { "Cross-Origin-Opener-Policy": "same-origin" }],
    ["2", { "Cross-Origin-Embedder-Policy": "require-corp" }],
    ["3", { "Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Embedder-Policy": "require-corp" }]
  ]);
  e.CoopAndCoep = Object.freeze(t.get("3"));
  const n = "vscode-coi";
  function r(s) {
    let o;
    typeof s == "string" ? o = new URL(s).searchParams : s instanceof URL ? o = s.searchParams : we.isUri(s) && (o = new URL(s.toString(!0)).searchParams);
    const a = o == null ? void 0 : o.get(n);
    if (a)
      return t.get(a);
  }
  e.getHeadersFromQuery = r;
  function i(s, o, a) {
    if (!globalThis.crossOriginIsolated)
      return;
    const l = o && a ? "3" : a ? "2" : "1";
    s instanceof URLSearchParams ? s.set(n, l) : s[n] = l;
  }
  e.addSearchParam = i;
})(co || (co = {}));
function je(e) {
  return On(e, !0);
}
class B1 {
  constructor(t) {
    this._ignorePathCasing = t;
  }
  compare(t, n, r = !1) {
    return t === n ? 0 : Ou(this.getComparisonKey(t, r), this.getComparisonKey(n, r));
  }
  isEqual(t, n, r = !1) {
    return t === n ? !0 : !t || !n ? !1 : this.getComparisonKey(t, r) === this.getComparisonKey(n, r);
  }
  getComparisonKey(t, n = !1) {
    return t.with({
      path: this._ignorePathCasing(t) ? t.path.toLowerCase() : void 0,
      fragment: n ? null : void 0
    }).toString();
  }
  ignorePathCasing(t) {
    return this._ignorePathCasing(t);
  }
  isEqualOrParent(t, n, r = !1) {
    if (t.scheme === n.scheme) {
      if (t.scheme === fe.file)
        return uo(je(t), je(n), this._ignorePathCasing(t)) && t.query === n.query && (r || t.fragment === n.fragment);
      if (ho(t.authority, n.authority))
        return uo(t.path, n.path, this._ignorePathCasing(t), "/") && t.query === n.query && (r || t.fragment === n.fragment);
    }
    return !1;
  }
  joinPath(t, ...n) {
    return we.joinPath(t, ...n);
  }
  basenameOrAuthority(t) {
    return U1(t) || t.authority;
  }
  basename(t) {
    return X.basename(t.path);
  }
  extname(t) {
    return X.extname(t.path);
  }
  dirname(t) {
    if (t.path.length === 0)
      return t;
    let n;
    return t.scheme === fe.file ? n = we.file(Lc(je(t))).path : (n = X.dirname(t.path), t.authority && n.length && n.charCodeAt(0) !== 47 && (console.error(`dirname("${t.toString})) resulted in a relative path`), n = "/")), t.with({
      path: n
    });
  }
  normalizePath(t) {
    if (!t.path.length)
      return t;
    let n;
    return t.scheme === fe.file ? n = we.file(yc(je(t))).path : n = X.normalize(t.path), t.with({
      path: n
    });
  }
  relativePath(t, n) {
    if (t.scheme !== n.scheme || !ho(t.authority, n.authority))
      return;
    if (t.scheme === fe.file) {
      const s = Cc(je(t), je(n));
      return Ft ? gl(s) : s;
    }
    let r = t.path || "/";
    const i = n.path || "/";
    if (this._ignorePathCasing(t)) {
      let s = 0;
      for (const o = Math.min(r.length, i.length); s < o && !(r.charCodeAt(s) !== i.charCodeAt(s) && r.charAt(s).toLowerCase() !== i.charAt(s).toLowerCase()); s++)
        ;
      r = i.substr(0, s) + r.substr(s);
    }
    return X.relative(r, i);
  }
  resolvePath(t, n) {
    if (t.scheme === fe.file) {
      const r = we.file(wc(je(t), n));
      return t.with({
        authority: r.authority,
        path: r.path
      });
    }
    return n = P1(n), t.with({
      path: X.resolve(t.path, n)
    });
  }
  isAbsolutePath(t) {
    return !!t.path && t.path[0] === "/";
  }
  isEqualAuthority(t, n) {
    return t === n || t !== void 0 && n !== void 0 && Iu(t, n);
  }
  hasTrailingPathSeparator(t, n = Ln) {
    if (t.scheme === fe.file) {
      const r = je(t);
      return r.length > lo(r).length && r[r.length - 1] === n;
    } else {
      const r = t.path;
      return r.length > 1 && r.charCodeAt(r.length - 1) === 47 && !/^[a-zA-Z]:(\/$|\\$)/.test(t.fsPath);
    }
  }
  removeTrailingPathSeparator(t, n = Ln) {
    return fo(t, n) ? t.with({ path: t.path.substr(0, t.path.length - 1) }) : t;
  }
  addTrailingPathSeparator(t, n = Ln) {
    let r = !1;
    if (t.scheme === fe.file) {
      const i = je(t);
      r = i !== void 0 && i.length === lo(i).length && i[i.length - 1] === n;
    } else {
      n = "/";
      const i = t.path;
      r = i.length === 1 && i.charCodeAt(i.length - 1) === 47;
    }
    return !r && !fo(t, n) ? t.with({ path: t.path + "/" }) : t;
  }
}
const J = new B1(() => !1);
J.isEqual.bind(J);
J.isEqualOrParent.bind(J);
J.getComparisonKey.bind(J);
J.basenameOrAuthority.bind(J);
const U1 = J.basename.bind(J);
J.extname.bind(J);
J.dirname.bind(J);
J.joinPath.bind(J);
J.normalizePath.bind(J);
J.relativePath.bind(J);
J.resolvePath.bind(J);
J.isAbsolutePath.bind(J);
const ho = J.isEqualAuthority.bind(J), fo = J.hasTrailingPathSeparator.bind(J);
J.removeTrailingPathSeparator.bind(J);
J.addTrailingPathSeparator.bind(J);
var mo;
(function(e) {
  e.META_DATA_LABEL = "label", e.META_DATA_DESCRIPTION = "description", e.META_DATA_SIZE = "size", e.META_DATA_MIME = "mime";
  function t(n) {
    const r = /* @__PURE__ */ new Map();
    n.path.substring(n.path.indexOf(";") + 1, n.path.lastIndexOf(";")).split(";").forEach((s) => {
      const [o, a] = s.split(":");
      o && a && r.set(o, a);
    });
    const i = n.path.substring(0, n.path.indexOf(";"));
    return i && r.set(e.META_DATA_MIME, i), r;
  }
  e.parseMetaData = t;
})(mo || (mo = {}));
var go;
(function(e) {
  async function t(r) {
    let i;
    const s = await Promise.all(r.map((o) => o.then((a) => a, (a) => {
      i || (i = a);
    })));
    if (typeof i < "u")
      throw i;
    return s;
  }
  e.settled = t;
  function n(r) {
    return new Promise(async (i, s) => {
      try {
        await r(i, s);
      } catch (o) {
        s(o);
      }
    });
  }
  e.withAsyncBody = n;
})(go || (go = {}));
const po = class _e {
  static fromArray(t) {
    return new _e((n) => {
      n.emitMany(t);
    });
  }
  static fromPromise(t) {
    return new _e(async (n) => {
      n.emitMany(await t);
    });
  }
  static fromPromisesResolveOrder(t) {
    return new _e(async (n) => {
      await Promise.all(t.map(async (r) => n.emitOne(await r)));
    });
  }
  static merge(t) {
    return new _e(async (n) => {
      await Promise.all(t.map(async (r) => {
        for await (const i of r)
          n.emitOne(i);
      }));
    });
  }
  constructor(t, n) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = n, this._onStateChanged = new Re(), queueMicrotask(async () => {
      const r = {
        emitOne: (i) => this.emitOne(i),
        emitMany: (i) => this.emitMany(i),
        reject: (i) => this.reject(i)
      };
      try {
        await Promise.resolve(t(r)), this.resolve();
      } catch (i) {
        this.reject(i);
      } finally {
        r.emitOne = void 0, r.emitMany = void 0, r.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let t = 0;
    return {
      next: async () => {
        do {
          if (this._state === 2)
            throw this._error;
          if (t < this._results.length)
            return { done: !1, value: this._results[t++] };
          if (this._state === 1)
            return { done: !0, value: void 0 };
          await An.toPromise(this._onStateChanged.event);
        } while (!0);
      },
      return: async () => {
        var n;
        return (n = this._onReturn) == null || n.call(this), { done: !0, value: void 0 };
      }
    };
  }
  static map(t, n) {
    return new _e(async (r) => {
      for await (const i of t)
        r.emitOne(n(i));
    });
  }
  map(t) {
    return _e.map(this, t);
  }
  static filter(t, n) {
    return new _e(async (r) => {
      for await (const i of t)
        n(i) && r.emitOne(i);
    });
  }
  filter(t) {
    return _e.filter(this, t);
  }
  static coalesce(t) {
    return _e.filter(t, (n) => !!n);
  }
  coalesce() {
    return _e.coalesce(this);
  }
  static async toPromise(t) {
    const n = [];
    for await (const r of t)
      n.push(r);
    return n;
  }
  toPromise() {
    return _e.toPromise(this);
  }
  emitOne(t) {
    this._state === 0 && (this._results.push(t), this._onStateChanged.fire());
  }
  emitMany(t) {
    this._state === 0 && (this._results = this._results.concat(t), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(t) {
    this._state === 0 && (this._state = 2, this._error = t, this._onStateChanged.fire());
  }
};
po.EMPTY = po.fromArray([]);
class j1 {
  constructor(t) {
    this.values = t, this.prefixSum = new Uint32Array(t.length), this.prefixSumValidIndex = new Int32Array(1), this.prefixSumValidIndex[0] = -1;
  }
  getCount() {
    return this.values.length;
  }
  insertValues(t, n) {
    t = Ct(t);
    const r = this.values, i = this.prefixSum, s = n.length;
    return s === 0 ? !1 : (this.values = new Uint32Array(r.length + s), this.values.set(r.subarray(0, t), 0), this.values.set(r.subarray(t), t + s), this.values.set(n, t), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  setValue(t, n) {
    return t = Ct(t), n = Ct(n), this.values[t] === n ? !1 : (this.values[t] = n, t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), !0);
  }
  removeValues(t, n) {
    t = Ct(t), n = Ct(n);
    const r = this.values, i = this.prefixSum;
    if (t >= r.length)
      return !1;
    const s = r.length - t;
    return n >= s && (n = s), n === 0 ? !1 : (this.values = new Uint32Array(r.length - n), this.values.set(r.subarray(0, t), 0), this.values.set(r.subarray(t + n), t), this.prefixSum = new Uint32Array(this.values.length), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  getTotalSum() {
    return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
  }
  getPrefixSum(t) {
    return t < 0 ? 0 : (t = Ct(t), this._getPrefixSum(t));
  }
  _getPrefixSum(t) {
    if (t <= this.prefixSumValidIndex[0])
      return this.prefixSum[t];
    let n = this.prefixSumValidIndex[0] + 1;
    n === 0 && (this.prefixSum[0] = this.values[0], n++), t >= this.values.length && (t = this.values.length - 1);
    for (let r = n; r <= t; r++)
      this.prefixSum[r] = this.prefixSum[r - 1] + this.values[r];
    return this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], t), this.prefixSum[t];
  }
  getIndexOf(t) {
    t = Math.floor(t), this.getTotalSum();
    let n = 0, r = this.values.length - 1, i = 0, s = 0, o = 0;
    for (; n <= r; )
      if (i = n + (r - n) / 2 | 0, s = this.prefixSum[i], o = s - this.values[i], t < o)
        r = i - 1;
      else if (t >= s)
        n = i + 1;
      else
        break;
    return new z1(i, t - o);
  }
}
class z1 {
  constructor(t, n) {
    this.index = t, this.remainder = n, this._prefixSumIndexOfResultBrand = void 0, this.index = t, this.remainder = n;
  }
}
class W1 {
  constructor(t, n, r, i) {
    this._uri = t, this._lines = n, this._eol = r, this._versionId = i, this._lineStarts = null, this._cachedTextValue = null;
  }
  dispose() {
    this._lines.length = 0;
  }
  get version() {
    return this._versionId;
  }
  getText() {
    return this._cachedTextValue === null && (this._cachedTextValue = this._lines.join(this._eol)), this._cachedTextValue;
  }
  onEvents(t) {
    t.eol && t.eol !== this._eol && (this._eol = t.eol, this._lineStarts = null);
    const n = t.changes;
    for (const r of n)
      this._acceptDeleteRange(r.range), this._acceptInsertText(new H(r.range.startLineNumber, r.range.startColumn), r.text);
    this._versionId = t.versionId, this._cachedTextValue = null;
  }
  _ensureLineStarts() {
    if (!this._lineStarts) {
      const t = this._eol.length, n = this._lines.length, r = new Uint32Array(n);
      for (let i = 0; i < n; i++)
        r[i] = this._lines[i].length + t;
      this._lineStarts = new j1(r);
    }
  }
  _setLineText(t, n) {
    this._lines[t] = n, this._lineStarts && this._lineStarts.setValue(t, this._lines[t].length + this._eol.length);
  }
  _acceptDeleteRange(t) {
    if (t.startLineNumber === t.endLineNumber) {
      if (t.startColumn === t.endColumn)
        return;
      this._setLineText(t.startLineNumber - 1, this._lines[t.startLineNumber - 1].substring(0, t.startColumn - 1) + this._lines[t.startLineNumber - 1].substring(t.endColumn - 1));
      return;
    }
    this._setLineText(t.startLineNumber - 1, this._lines[t.startLineNumber - 1].substring(0, t.startColumn - 1) + this._lines[t.endLineNumber - 1].substring(t.endColumn - 1)), this._lines.splice(t.startLineNumber, t.endLineNumber - t.startLineNumber), this._lineStarts && this._lineStarts.removeValues(t.startLineNumber, t.endLineNumber - t.startLineNumber);
  }
  _acceptInsertText(t, n) {
    if (n.length === 0)
      return;
    const r = ii(n);
    if (r.length === 1) {
      this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + r[0] + this._lines[t.lineNumber - 1].substring(t.column - 1));
      return;
    }
    r[r.length - 1] += this._lines[t.lineNumber - 1].substring(t.column - 1), this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + r[0]);
    const i = new Uint32Array(r.length - 1);
    for (let s = 1; s < r.length; s++)
      this._lines.splice(t.lineNumber + s - 1, 0, r[s]), i[s - 1] = r[s].length + this._eol.length;
    this._lineStarts && this._lineStarts.insertValues(t.lineNumber, i);
  }
}
const H1 = "workerTextModelSync";
class G1 {
  constructor() {
    this._models = /* @__PURE__ */ Object.create(null);
  }
  bindToServer(t) {
    t.setChannel(H1, this);
  }
  getModel(t) {
    return this._models[t];
  }
  getModels() {
    const t = [];
    return Object.keys(this._models).forEach((n) => t.push(this._models[n])), t;
  }
  $acceptNewModel(t) {
    this._models[t.url] = new J1(we.parse(t.url), t.lines, t.EOL, t.versionId);
  }
  $acceptModelChanged(t, n) {
    this._models[t] && this._models[t].onEvents(n);
  }
  $acceptRemovedModel(t) {
    this._models[t] && delete this._models[t];
  }
}
class J1 extends W1 {
  get uri() {
    return this._uri;
  }
  get eol() {
    return this._eol;
  }
  getValue() {
    return this.getText();
  }
  findMatches(t) {
    const n = [];
    for (let r = 0; r < this._lines.length; r++) {
      const i = this._lines[r], s = this.offsetAt(new H(r + 1, 1)), o = i.matchAll(t);
      for (const a of o)
        (a.index || a.index === 0) && (a.index = a.index + s), n.push(a);
    }
    return n;
  }
  getLinesContent() {
    return this._lines.slice(0);
  }
  getLineCount() {
    return this._lines.length;
  }
  getLineContent(t) {
    return this._lines[t - 1];
  }
  getWordAtPosition(t, n) {
    const r = ai(t.column, nl(n), this._lines[t.lineNumber - 1], 0);
    return r ? new F(
      t.lineNumber,
      r.startColumn,
      t.lineNumber,
      r.endColumn
    ) : null;
  }
  getWordUntilPosition(t, n) {
    const r = this.getWordAtPosition(t, n);
    return r ? {
      word: this._lines[t.lineNumber - 1].substring(r.startColumn - 1, t.column - 1),
      startColumn: r.startColumn,
      endColumn: t.column
    } : {
      word: "",
      startColumn: t.column,
      endColumn: t.column
    };
  }
  words(t) {
    const n = this._lines, r = this._wordenize.bind(this);
    let i = 0, s = "", o = 0, a = [];
    return {
      *[Symbol.iterator]() {
        for (; ; )
          if (o < a.length) {
            const l = s.substring(a[o].start, a[o].end);
            o += 1, yield l;
          } else if (i < n.length)
            s = n[i], a = r(s, t), o = 0, i += 1;
          else
            break;
      }
    };
  }
  getLineWords(t, n) {
    const r = this._lines[t - 1], i = this._wordenize(r, n), s = [];
    for (const o of i)
      s.push({
        word: r.substring(o.start, o.end),
        startColumn: o.start + 1,
        endColumn: o.end + 1
      });
    return s;
  }
  _wordenize(t, n) {
    const r = [];
    let i;
    for (n.lastIndex = 0; (i = n.exec(t)) && i[0].length !== 0; )
      r.push({ start: i.index, end: i.index + i[0].length });
    return r;
  }
  getValueInRange(t) {
    if (t = this._validateRange(t), t.startLineNumber === t.endLineNumber)
      return this._lines[t.startLineNumber - 1].substring(t.startColumn - 1, t.endColumn - 1);
    const n = this._eol, r = t.startLineNumber - 1, i = t.endLineNumber - 1, s = [];
    s.push(this._lines[r].substring(t.startColumn - 1));
    for (let o = r + 1; o < i; o++)
      s.push(this._lines[o]);
    return s.push(this._lines[i].substring(0, t.endColumn - 1)), s.join(n);
  }
  offsetAt(t) {
    return t = this._validatePosition(t), this._ensureLineStarts(), this._lineStarts.getPrefixSum(t.lineNumber - 2) + (t.column - 1);
  }
  positionAt(t) {
    t = Math.floor(t), t = Math.max(0, t), this._ensureLineStarts();
    const n = this._lineStarts.getIndexOf(t), r = this._lines[n.index].length;
    return {
      lineNumber: 1 + n.index,
      column: 1 + Math.min(n.remainder, r)
    };
  }
  _validateRange(t) {
    const n = this._validatePosition({ lineNumber: t.startLineNumber, column: t.startColumn }), r = this._validatePosition({ lineNumber: t.endLineNumber, column: t.endColumn });
    return n.lineNumber !== t.startLineNumber || n.column !== t.startColumn || r.lineNumber !== t.endLineNumber || r.column !== t.endColumn ? {
      startLineNumber: n.lineNumber,
      startColumn: n.column,
      endLineNumber: r.lineNumber,
      endColumn: r.column
    } : t;
  }
  _validatePosition(t) {
    if (!H.isIPosition(t))
      throw new Error("bad position");
    let { lineNumber: n, column: r } = t, i = !1;
    if (n < 1)
      n = 1, r = 1, i = !0;
    else if (n > this._lines.length)
      n = this._lines.length, r = this._lines[n - 1].length + 1, i = !0;
    else {
      const s = this._lines[n - 1].length + 1;
      r < 1 ? (r = 1, i = !0) : r > s && (r = s, i = !0);
    }
    return i ? { lineNumber: n, column: r } : t;
  }
}
const Tr = class {
  constructor() {
    this._workerTextModelSyncServer = new G1();
  }
  dispose() {
  }
  _getModel(t) {
    return this._workerTextModelSyncServer.getModel(t);
  }
  _getModels() {
    return this._workerTextModelSyncServer.getModels();
  }
  $acceptNewModel(t) {
    this._workerTextModelSyncServer.$acceptNewModel(t);
  }
  $acceptModelChanged(t, n) {
    this._workerTextModelSyncServer.$acceptModelChanged(t, n);
  }
  $acceptRemovedModel(t) {
    this._workerTextModelSyncServer.$acceptRemovedModel(t);
  }
  async $computeUnicodeHighlights(t, n, r) {
    const i = this._getModel(t);
    return i ? Xc.computeUnicodeHighlights(i, n, r) : { ranges: [], hasMore: !1, ambiguousCharacterCount: 0, invisibleCharacterCount: 0, nonBasicAsciiCharacterCount: 0 };
  }
  async $findSectionHeaders(t, n) {
    const r = this._getModel(t);
    return r ? k1(r, n) : [];
  }
  async $computeDiff(t, n, r, i) {
    const s = this._getModel(t), o = this._getModel(n);
    return !s || !o ? null : Qt.computeDiff(s, o, r, i);
  }
  static computeDiff(t, n, r, i) {
    const s = i === "advanced" ? Qn.getDefault() : Qn.getLegacy(), o = t.getLinesContent(), a = n.getLinesContent(), l = s.computeDiff(o, a, r), u = l.changes.length > 0 ? !1 : this._modelsAreIdentical(t, n);
    function d(h) {
      return h.map(
        (f) => {
          var m;
          return [f.original.startLineNumber, f.original.endLineNumberExclusive, f.modified.startLineNumber, f.modified.endLineNumberExclusive, (m = f.innerChanges) == null ? void 0 : m.map((g) => [
            g.originalRange.startLineNumber,
            g.originalRange.startColumn,
            g.originalRange.endLineNumber,
            g.originalRange.endColumn,
            g.modifiedRange.startLineNumber,
            g.modifiedRange.startColumn,
            g.modifiedRange.endLineNumber,
            g.modifiedRange.endColumn
          ])];
        }
      );
    }
    return {
      identical: u,
      quitEarly: l.hitTimeout,
      changes: d(l.changes),
      moves: l.moves.map((h) => [
        h.lineRangeMapping.original.startLineNumber,
        h.lineRangeMapping.original.endLineNumberExclusive,
        h.lineRangeMapping.modified.startLineNumber,
        h.lineRangeMapping.modified.endLineNumberExclusive,
        d(h.changes)
      ])
    };
  }
  static _modelsAreIdentical(t, n) {
    const r = t.getLineCount(), i = n.getLineCount();
    if (r !== i)
      return !1;
    for (let s = 1; s <= r; s++) {
      const o = t.getLineContent(s), a = n.getLineContent(s);
      if (o !== a)
        return !1;
    }
    return !0;
  }
  async $computeDirtyDiff(t, n, r) {
    const i = this._getModel(t), s = this._getModel(n);
    if (!i || !s)
      return null;
    const o = i.getLinesContent(), a = s.getLinesContent();
    return new ul(o, a, {
      shouldComputeCharChanges: !1,
      shouldPostProcessCharChanges: !1,
      shouldIgnoreTrimWhitespace: r,
      shouldMakePrettyDiff: !0,
      maxComputationTime: 1e3
    }).computeDiff().changes;
  }
  async $computeMoreMinimalEdits(t, n, r) {
    const i = this._getModel(t);
    if (!i)
      return n;
    const s = [];
    let o;
    n = n.slice(0).sort((l, u) => {
      if (l.range && u.range)
        return F.compareRangesUsingStarts(l.range, u.range);
      const d = l.range ? 0 : 1, h = u.range ? 0 : 1;
      return d - h;
    });
    let a = 0;
    for (let l = 1; l < n.length; l++)
      F.getEndPosition(n[a].range).equals(F.getStartPosition(n[l].range)) ? (n[a].range = F.fromPositions(F.getStartPosition(n[a].range), F.getEndPosition(n[l].range)), n[a].text += n[l].text) : (a++, n[a] = n[l]);
    n.length = a + 1;
    for (let { range: l, text: u, eol: d } of n) {
      if (typeof d == "number" && (o = d), F.isEmpty(l) && !u)
        continue;
      const h = i.getValueInRange(l);
      if (u = u.replace(/\r\n|\n|\r/g, i.eol), h === u)
        continue;
      if (Math.max(u.length, h.length) > Qt._diffLimit) {
        s.push({ range: l, text: u });
        continue;
      }
      const f = Qu(h, u, r), m = i.offsetAt(F.lift(l).getStartPosition());
      for (const g of f) {
        const p = i.positionAt(m + g.originalStart), v = i.positionAt(m + g.originalStart + g.originalLength), C = {
          text: u.substr(g.modifiedStart, g.modifiedLength),
          range: { startLineNumber: p.lineNumber, startColumn: p.column, endLineNumber: v.lineNumber, endColumn: v.column }
        };
        i.getValueInRange(C.range) !== C.text && s.push(C);
      }
    }
    return typeof o == "number" && s.push({ eol: o, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), s;
  }
  $computeHumanReadableDiff(t, n, r) {
    const i = this._getModel(t);
    if (!i)
      return n;
    const s = [];
    let o;
    n = n.slice(0).sort((a, l) => {
      if (a.range && l.range)
        return F.compareRangesUsingStarts(a.range, l.range);
      const u = a.range ? 0 : 1, d = l.range ? 0 : 1;
      return u - d;
    });
    for (let { range: a, text: l, eol: u } of n) {
      let d = function(C, S) {
        return new H(
          C.lineNumber + S.lineNumber - 1,
          S.lineNumber === 1 ? C.column + S.column - 1 : S.column
        );
      }, h = function(C, S) {
        const y = [];
        for (let w = S.startLineNumber; w <= S.endLineNumber; w++) {
          const b = C[w - 1];
          w === S.startLineNumber && w === S.endLineNumber ? y.push(b.substring(S.startColumn - 1, S.endColumn - 1)) : w === S.startLineNumber ? y.push(b.substring(S.startColumn - 1)) : w === S.endLineNumber ? y.push(b.substring(0, S.endColumn - 1)) : y.push(b);
        }
        return y;
      };
      if (typeof u == "number" && (o = u), F.isEmpty(a) && !l)
        continue;
      const f = i.getValueInRange(a);
      if (l = l.replace(/\r\n|\n|\r/g, i.eol), f === l)
        continue;
      if (Math.max(l.length, f.length) > Qt._diffLimit) {
        s.push({ range: a, text: l });
        continue;
      }
      const m = f.split(/\r\n|\n|\r/), g = l.split(/\r\n|\n|\r/), p = Qn.getDefault().computeDiff(m, g, r), v = F.lift(a).getStartPosition();
      for (const C of p.changes)
        if (C.innerChanges)
          for (const S of C.innerChanges)
            s.push({
              range: F.fromPositions(d(v, S.originalRange.getStartPosition()), d(v, S.originalRange.getEndPosition())),
              text: h(g, S.modifiedRange).join(i.eol)
            });
        else
          throw new le("The experimental diff algorithm always produces inner changes");
    }
    return typeof o == "number" && s.push({ eol: o, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), s;
  }
  async $computeLinks(t) {
    const n = this._getModel(t);
    return n ? nc(n) : null;
  }
  async $computeDefaultDocumentColors(t) {
    const n = this._getModel(t);
    return n ? A1(n) : null;
  }
  async $textualSuggest(t, n, r, i) {
    const s = new $n(), o = new RegExp(r, i), a = /* @__PURE__ */ new Set();
    e: for (const l of t) {
      const u = this._getModel(l);
      if (u) {
        for (const d of u.words(o))
          if (!(d === n || !isNaN(Number(d))) && (a.add(d), a.size > Qt._suggestionsLimit))
            break e;
      }
    }
    return { words: Array.from(a), duration: s.elapsed() };
  }
  async $computeWordRanges(t, n, r, i) {
    const s = this._getModel(t);
    if (!s)
      return /* @__PURE__ */ Object.create(null);
    const o = new RegExp(r, i), a = /* @__PURE__ */ Object.create(null);
    for (let l = n.startLineNumber; l < n.endLineNumber; l++) {
      const u = s.getLineWords(l, o);
      for (const d of u) {
        if (!isNaN(Number(d.word)))
          continue;
        let h = a[d.word];
        h || (h = [], a[d.word] = h), h.push({
          startLineNumber: l,
          startColumn: d.startColumn,
          endLineNumber: l,
          endColumn: d.endColumn
        });
      }
    }
    return a;
  }
  async $navigateValueSet(t, n, r, i, s) {
    const o = this._getModel(t);
    if (!o)
      return null;
    const a = new RegExp(i, s);
    n.startColumn === n.endColumn && (n = {
      startLineNumber: n.startLineNumber,
      startColumn: n.startColumn,
      endLineNumber: n.endLineNumber,
      endColumn: n.endColumn + 1
    });
    const l = o.getValueInRange(n), u = o.getWordAtPosition({ lineNumber: n.startLineNumber, column: n.startColumn }, a);
    if (!u)
      return null;
    const d = o.getValueInRange(u);
    return rc.INSTANCE.navigateValueSet(n, l, u, d, r);
  }
};
Tr._diffLimit = 1e5, Tr._suggestionsLimit = 1e4;
let X1 = Tr;
class Qt extends X1 {
  constructor(t, n) {
    super(), this._host = t, this._foreignModuleFactory = n, this._foreignModule = null;
  }
  async $ping() {
    return "pong";
  }
  $loadForeignModule(t, n, r) {
    const i = {
      host: $c(r, (s, o) => this._host.$fhr(s, o)),
      getMirrorModels: () => this._getModels()
    };
    return this._foreignModuleFactory ? (this._foreignModule = this._foreignModuleFactory(i, n), Promise.resolve(Kc(this._foreignModule))) : Promise.reject(new Error("Unexpected usage"));
  }
  $fmr(t, n) {
    if (!this._foreignModule || typeof this._foreignModule[t] != "function")
      return Promise.reject(new Error("Missing requestHandler or method: " + t));
    try {
      return Promise.resolve(this._foreignModule[t].apply(this._foreignModule, n));
    } catch (r) {
      return Promise.reject(r);
    }
  }
}
typeof importScripts == "function" && (globalThis.monaco = Vc());
let Mr = !1;
function bl(e) {
  if (Mr)
    return;
  Mr = !0;
  const t = new Ju((n) => {
    globalThis.postMessage(n);
  }, (n) => new Qt(Dc.getChannel(n), e));
  globalThis.onmessage = (n) => {
    t.onmessage(n.data);
  };
}
globalThis.onmessage = (e) => {
  Mr || bl(null);
};
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.0(undefined)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
function di(e, t = !1) {
  const n = e.length;
  let r = 0, i = "", s = 0, o = 16, a = 0, l = 0, u = 0, d = 0, h = 0;
  function f(y, w) {
    let b = 0, L = 0;
    for (; b < y; ) {
      let x = e.charCodeAt(r);
      if (x >= 48 && x <= 57)
        L = L * 16 + x - 48;
      else if (x >= 65 && x <= 70)
        L = L * 16 + x - 65 + 10;
      else if (x >= 97 && x <= 102)
        L = L * 16 + x - 97 + 10;
      else
        break;
      r++, b++;
    }
    return b < y && (L = -1), L;
  }
  function m(y) {
    r = y, i = "", s = 0, o = 16, h = 0;
  }
  function g() {
    let y = r;
    if (e.charCodeAt(r) === 48)
      r++;
    else
      for (r++; r < e.length && xt(e.charCodeAt(r)); )
        r++;
    if (r < e.length && e.charCodeAt(r) === 46)
      if (r++, r < e.length && xt(e.charCodeAt(r)))
        for (r++; r < e.length && xt(e.charCodeAt(r)); )
          r++;
      else
        return h = 3, e.substring(y, r);
    let w = r;
    if (r < e.length && (e.charCodeAt(r) === 69 || e.charCodeAt(r) === 101))
      if (r++, (r < e.length && e.charCodeAt(r) === 43 || e.charCodeAt(r) === 45) && r++, r < e.length && xt(e.charCodeAt(r))) {
        for (r++; r < e.length && xt(e.charCodeAt(r)); )
          r++;
        w = r;
      } else
        h = 3;
    return e.substring(y, w);
  }
  function p() {
    let y = "", w = r;
    for (; ; ) {
      if (r >= n) {
        y += e.substring(w, r), h = 2;
        break;
      }
      const b = e.charCodeAt(r);
      if (b === 34) {
        y += e.substring(w, r), r++;
        break;
      }
      if (b === 92) {
        if (y += e.substring(w, r), r++, r >= n) {
          h = 2;
          break;
        }
        switch (e.charCodeAt(r++)) {
          case 34:
            y += '"';
            break;
          case 92:
            y += "\\";
            break;
          case 47:
            y += "/";
            break;
          case 98:
            y += "\b";
            break;
          case 102:
            y += "\f";
            break;
          case 110:
            y += `
`;
            break;
          case 114:
            y += "\r";
            break;
          case 116:
            y += "	";
            break;
          case 117:
            const L = f(4);
            L >= 0 ? y += String.fromCharCode(L) : h = 4;
            break;
          default:
            h = 5;
        }
        w = r;
        continue;
      }
      if (b >= 0 && b <= 31)
        if (zt(b)) {
          y += e.substring(w, r), h = 2;
          break;
        } else
          h = 6;
      r++;
    }
    return y;
  }
  function v() {
    if (i = "", h = 0, s = r, l = a, d = u, r >= n)
      return s = n, o = 17;
    let y = e.charCodeAt(r);
    if (Zn(y)) {
      do
        r++, i += String.fromCharCode(y), y = e.charCodeAt(r);
      while (Zn(y));
      return o = 15;
    }
    if (zt(y))
      return r++, i += String.fromCharCode(y), y === 13 && e.charCodeAt(r) === 10 && (r++, i += `
`), a++, u = r, o = 14;
    switch (y) {
      case 123:
        return r++, o = 1;
      case 125:
        return r++, o = 2;
      case 91:
        return r++, o = 3;
      case 93:
        return r++, o = 4;
      case 58:
        return r++, o = 6;
      case 44:
        return r++, o = 5;
      case 34:
        return r++, i = p(), o = 10;
      case 47:
        const w = r - 1;
        if (e.charCodeAt(r + 1) === 47) {
          for (r += 2; r < n && !zt(e.charCodeAt(r)); )
            r++;
          return i = e.substring(w, r), o = 12;
        }
        if (e.charCodeAt(r + 1) === 42) {
          r += 2;
          const b = n - 1;
          let L = !1;
          for (; r < b; ) {
            const x = e.charCodeAt(r);
            if (x === 42 && e.charCodeAt(r + 1) === 47) {
              r += 2, L = !0;
              break;
            }
            r++, zt(x) && (x === 13 && e.charCodeAt(r) === 10 && r++, a++, u = r);
          }
          return L || (r++, h = 1), i = e.substring(w, r), o = 13;
        }
        return i += String.fromCharCode(y), r++, o = 16;
      case 45:
        if (i += String.fromCharCode(y), r++, r === n || !xt(e.charCodeAt(r)))
          return o = 16;
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return i += g(), o = 11;
      default:
        for (; r < n && C(y); )
          r++, y = e.charCodeAt(r);
        if (s !== r) {
          switch (i = e.substring(s, r), i) {
            case "true":
              return o = 8;
            case "false":
              return o = 9;
            case "null":
              return o = 7;
          }
          return o = 16;
        }
        return i += String.fromCharCode(y), r++, o = 16;
    }
  }
  function C(y) {
    if (Zn(y) || zt(y))
      return !1;
    switch (y) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        return !1;
    }
    return !0;
  }
  function S() {
    let y;
    do
      y = v();
    while (y >= 12 && y <= 15);
    return y;
  }
  return {
    setPosition: m,
    getPosition: () => r,
    scan: t ? S : v,
    getToken: () => o,
    getTokenValue: () => i,
    getTokenOffset: () => s,
    getTokenLength: () => r - s,
    getTokenStartLine: () => l,
    getTokenStartCharacter: () => s - d,
    getTokenError: () => h
  };
}
function Zn(e) {
  return e === 32 || e === 9;
}
function zt(e) {
  return e === 10 || e === 13;
}
function xt(e) {
  return e >= 48 && e <= 57;
}
var bo;
(function(e) {
  e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.space = 32] = "space", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.asterisk = 42] = "asterisk", e[e.backslash = 92] = "backslash", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot", e[e.doubleQuote = 34] = "doubleQuote", e[e.minus = 45] = "minus", e[e.openBrace = 123] = "openBrace", e[e.openBracket = 91] = "openBracket", e[e.plus = 43] = "plus", e[e.slash = 47] = "slash", e[e.formFeed = 12] = "formFeed", e[e.tab = 9] = "tab";
})(bo || (bo = {}));
var Ae = new Array(20).fill(0).map((e, t) => " ".repeat(t)), Nt = 200, yo = {
  " ": {
    "\n": new Array(Nt).fill(0).map((e, t) => `
` + " ".repeat(t)),
    "\r": new Array(Nt).fill(0).map((e, t) => "\r" + " ".repeat(t)),
    "\r\n": new Array(Nt).fill(0).map((e, t) => `\r
` + " ".repeat(t))
  },
  "	": {
    "\n": new Array(Nt).fill(0).map((e, t) => `
` + "	".repeat(t)),
    "\r": new Array(Nt).fill(0).map((e, t) => "\r" + "	".repeat(t)),
    "\r\n": new Array(Nt).fill(0).map((e, t) => `\r
` + "	".repeat(t))
  }
}, Q1 = [`
`, "\r", `\r
`];
function Z1(e, t, n) {
  let r, i, s, o, a;
  if (t) {
    for (o = t.offset, a = o + t.length, s = o; s > 0 && !vo(e, s - 1); )
      s--;
    let b = a;
    for (; b < e.length && !vo(e, b); )
      b++;
    i = e.substring(s, b), r = Y1(i, n);
  } else
    i = e, r = 0, s = 0, o = 0, a = e.length;
  const l = eh(n, e), u = Q1.includes(l);
  let d = 0, h = 0, f;
  n.insertSpaces ? f = Ae[n.tabSize || 4] ?? Et(Ae[1], n.tabSize || 4) : f = "	";
  const m = f === "	" ? "	" : " ";
  let g = di(i, !1), p = !1;
  function v() {
    if (d > 1)
      return Et(l, d) + Et(f, r + h);
    const b = f.length * (r + h);
    return !u || b > yo[m][l].length ? l + Et(f, r + h) : b <= 0 ? l : yo[m][l][b];
  }
  function C() {
    let b = g.scan();
    for (d = 0; b === 15 || b === 14; )
      b === 14 && n.keepLines ? d += 1 : b === 14 && (d = 1), b = g.scan();
    return p = b === 16 || g.getTokenError() !== 0, b;
  }
  const S = [];
  function y(b, L, x) {
    !p && (!t || L < a && x > o) && e.substring(L, x) !== b && S.push({ offset: L, length: x - L, content: b });
  }
  let w = C();
  if (n.keepLines && d > 0 && y(Et(l, d), 0, 0), w !== 17) {
    let b = g.getTokenOffset() + s, L = f.length * r < 20 && n.insertSpaces ? Ae[f.length * r] : Et(f, r);
    y(L, s, b);
  }
  for (; w !== 17; ) {
    let b = g.getTokenOffset() + g.getTokenLength() + s, L = C(), x = "", T = !1;
    for (; d === 0 && (L === 12 || L === 13); ) {
      let q = g.getTokenOffset() + s;
      y(Ae[1], b, q), b = g.getTokenOffset() + g.getTokenLength() + s, T = L === 12, x = T ? v() : "", L = C();
    }
    if (L === 2)
      w !== 1 && h--, n.keepLines && d > 0 || !n.keepLines && w !== 1 ? x = v() : n.keepLines && (x = Ae[1]);
    else if (L === 4)
      w !== 3 && h--, n.keepLines && d > 0 || !n.keepLines && w !== 3 ? x = v() : n.keepLines && (x = Ae[1]);
    else {
      switch (w) {
        case 3:
        case 1:
          h++, n.keepLines && d > 0 || !n.keepLines ? x = v() : x = Ae[1];
          break;
        case 5:
          n.keepLines && d > 0 || !n.keepLines ? x = v() : x = Ae[1];
          break;
        case 12:
          x = v();
          break;
        case 13:
          d > 0 ? x = v() : T || (x = Ae[1]);
          break;
        case 6:
          n.keepLines && d > 0 ? x = v() : T || (x = Ae[1]);
          break;
        case 10:
          n.keepLines && d > 0 ? x = v() : L === 6 && !T && (x = "");
          break;
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          n.keepLines && d > 0 ? x = v() : (L === 12 || L === 13) && !T ? x = Ae[1] : L !== 5 && L !== 17 && (p = !0);
          break;
        case 16:
          p = !0;
          break;
      }
      d > 0 && (L === 12 || L === 13) && (x = v());
    }
    L === 17 && (n.keepLines && d > 0 ? x = v() : x = n.insertFinalNewline ? l : "");
    const I = g.getTokenOffset() + s;
    y(x, b, I), w = L;
  }
  return S;
}
function Et(e, t) {
  let n = "";
  for (let r = 0; r < t; r++)
    n += e;
  return n;
}
function Y1(e, t) {
  let n = 0, r = 0;
  const i = t.tabSize || 4;
  for (; n < e.length; ) {
    let s = e.charAt(n);
    if (s === Ae[1])
      r++;
    else if (s === "	")
      r += i;
    else
      break;
    n++;
  }
  return Math.floor(r / i);
}
function eh(e, t) {
  for (let n = 0; n < t.length; n++) {
    const r = t.charAt(n);
    if (r === "\r")
      return n + 1 < t.length && t.charAt(n + 1) === `
` ? `\r
` : "\r";
    if (r === `
`)
      return `
`;
  }
  return e.eol || `
`;
}
function vo(e, t) {
  return `\r
`.indexOf(e.charAt(t)) !== -1;
}
var In;
(function(e) {
  e.DEFAULT = {
    allowTrailingComma: !1
  };
})(In || (In = {}));
function th(e, t = [], n = In.DEFAULT) {
  let r = null, i = [];
  const s = [];
  function o(a) {
    Array.isArray(i) ? i.push(a) : r !== null && (i[r] = a);
  }
  return rh(e, {
    onObjectBegin: () => {
      const a = {};
      o(a), s.push(i), i = a, r = null;
    },
    onObjectProperty: (a) => {
      r = a;
    },
    onObjectEnd: () => {
      i = s.pop();
    },
    onArrayBegin: () => {
      const a = [];
      o(a), s.push(i), i = a, r = null;
    },
    onArrayEnd: () => {
      i = s.pop();
    },
    onLiteralValue: o,
    onError: (a, l, u) => {
      t.push({ error: a, offset: l, length: u });
    }
  }, n), i[0];
}
function yl(e) {
  if (!e.parent || !e.parent.children)
    return [];
  const t = yl(e.parent);
  if (e.parent.type === "property") {
    const n = e.parent.children[0].value;
    t.push(n);
  } else if (e.parent.type === "array") {
    const n = e.parent.children.indexOf(e);
    n !== -1 && t.push(n);
  }
  return t;
}
function Or(e) {
  switch (e.type) {
    case "array":
      return e.children.map(Or);
    case "object":
      const t = /* @__PURE__ */ Object.create(null);
      for (let n of e.children) {
        const r = n.children[1];
        r && (t[n.children[0].value] = Or(r));
      }
      return t;
    case "null":
    case "string":
    case "number":
    case "boolean":
      return e.value;
    default:
      return;
  }
}
function nh(e, t, n = !1) {
  return t >= e.offset && t < e.offset + e.length || n && t === e.offset + e.length;
}
function vl(e, t, n = !1) {
  if (nh(e, t, n)) {
    const r = e.children;
    if (Array.isArray(r))
      for (let i = 0; i < r.length && r[i].offset <= t; i++) {
        const s = vl(r[i], t, n);
        if (s)
          return s;
      }
    return e;
  }
}
function rh(e, t, n = In.DEFAULT) {
  const r = di(e, !1), i = [];
  function s(E) {
    return E ? () => E(r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter()) : () => !0;
  }
  function o(E) {
    return E ? () => E(r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter(), () => i.slice()) : () => !0;
  }
  function a(E) {
    return E ? (A) => E(A, r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter()) : () => !0;
  }
  function l(E) {
    return E ? (A) => E(A, r.getTokenOffset(), r.getTokenLength(), r.getTokenStartLine(), r.getTokenStartCharacter(), () => i.slice()) : () => !0;
  }
  const u = o(t.onObjectBegin), d = l(t.onObjectProperty), h = s(t.onObjectEnd), f = o(t.onArrayBegin), m = s(t.onArrayEnd), g = l(t.onLiteralValue), p = a(t.onSeparator), v = s(t.onComment), C = a(t.onError), S = n && n.disallowComments, y = n && n.allowTrailingComma;
  function w() {
    for (; ; ) {
      const E = r.scan();
      switch (r.getTokenError()) {
        case 4:
          b(
            14
            /* ParseErrorCode.InvalidUnicode */
          );
          break;
        case 5:
          b(
            15
            /* ParseErrorCode.InvalidEscapeCharacter */
          );
          break;
        case 3:
          b(
            13
            /* ParseErrorCode.UnexpectedEndOfNumber */
          );
          break;
        case 1:
          S || b(
            11
            /* ParseErrorCode.UnexpectedEndOfComment */
          );
          break;
        case 2:
          b(
            12
            /* ParseErrorCode.UnexpectedEndOfString */
          );
          break;
        case 6:
          b(
            16
            /* ParseErrorCode.InvalidCharacter */
          );
          break;
      }
      switch (E) {
        case 12:
        case 13:
          S ? b(
            10
            /* ParseErrorCode.InvalidCommentToken */
          ) : v();
          break;
        case 16:
          b(
            1
            /* ParseErrorCode.InvalidSymbol */
          );
          break;
        case 15:
        case 14:
          break;
        default:
          return E;
      }
    }
  }
  function b(E, A = [], _ = []) {
    if (C(E), A.length + _.length > 0) {
      let P = r.getToken();
      for (; P !== 17; ) {
        if (A.indexOf(P) !== -1) {
          w();
          break;
        } else if (_.indexOf(P) !== -1)
          break;
        P = w();
      }
    }
  }
  function L(E) {
    const A = r.getTokenValue();
    return E ? g(A) : (d(A), i.push(A)), w(), !0;
  }
  function x() {
    switch (r.getToken()) {
      case 11:
        const E = r.getTokenValue();
        let A = Number(E);
        isNaN(A) && (b(
          2
          /* ParseErrorCode.InvalidNumberFormat */
        ), A = 0), g(A);
        break;
      case 7:
        g(null);
        break;
      case 8:
        g(!0);
        break;
      case 9:
        g(!1);
        break;
      default:
        return !1;
    }
    return w(), !0;
  }
  function T() {
    return r.getToken() !== 10 ? (b(3, [], [
      2,
      5
      /* SyntaxKind.CommaToken */
    ]), !1) : (L(!1), r.getToken() === 6 ? (p(":"), w(), R() || b(4, [], [
      2,
      5
      /* SyntaxKind.CommaToken */
    ])) : b(5, [], [
      2,
      5
      /* SyntaxKind.CommaToken */
    ]), i.pop(), !0);
  }
  function I() {
    u(), w();
    let E = !1;
    for (; r.getToken() !== 2 && r.getToken() !== 17; ) {
      if (r.getToken() === 5) {
        if (E || b(4, [], []), p(","), w(), r.getToken() === 2 && y)
          break;
      } else E && b(6, [], []);
      T() || b(4, [], [
        2,
        5
        /* SyntaxKind.CommaToken */
      ]), E = !0;
    }
    return h(), r.getToken() !== 2 ? b(7, [
      2
      /* SyntaxKind.CloseBraceToken */
    ], []) : w(), !0;
  }
  function q() {
    f(), w();
    let E = !0, A = !1;
    for (; r.getToken() !== 4 && r.getToken() !== 17; ) {
      if (r.getToken() === 5) {
        if (A || b(4, [], []), p(","), w(), r.getToken() === 4 && y)
          break;
      } else A && b(6, [], []);
      E ? (i.push(0), E = !1) : i[i.length - 1]++, R() || b(4, [], [
        4,
        5
        /* SyntaxKind.CommaToken */
      ]), A = !0;
    }
    return m(), E || i.pop(), r.getToken() !== 4 ? b(8, [
      4
      /* SyntaxKind.CloseBracketToken */
    ], []) : w(), !0;
  }
  function R() {
    switch (r.getToken()) {
      case 3:
        return q();
      case 1:
        return I();
      case 10:
        return L(!0);
      default:
        return x();
    }
  }
  return w(), r.getToken() === 17 ? n.allowEmptyContent ? !0 : (b(4, [], []), !1) : R() ? (r.getToken() !== 17 && b(9, [], []), !0) : (b(4, [], []), !1);
}
var ft = di, wo;
(function(e) {
  e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 6] = "InvalidCharacter";
})(wo || (wo = {}));
var Co;
(function(e) {
  e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.Unknown = 16] = "Unknown", e[e.EOF = 17] = "EOF";
})(Co || (Co = {}));
var ih = th, sh = vl, oh = yl, ah = Or, Lo;
(function(e) {
  e[e.InvalidSymbol = 1] = "InvalidSymbol", e[e.InvalidNumberFormat = 2] = "InvalidNumberFormat", e[e.PropertyNameExpected = 3] = "PropertyNameExpected", e[e.ValueExpected = 4] = "ValueExpected", e[e.ColonExpected = 5] = "ColonExpected", e[e.CommaExpected = 6] = "CommaExpected", e[e.CloseBraceExpected = 7] = "CloseBraceExpected", e[e.CloseBracketExpected = 8] = "CloseBracketExpected", e[e.EndOfFileExpected = 9] = "EndOfFileExpected", e[e.InvalidCommentToken = 10] = "InvalidCommentToken", e[e.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 14] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 16] = "InvalidCharacter";
})(Lo || (Lo = {}));
function lh(e, t, n) {
  return Z1(e, t, n);
}
function Mt(e, t) {
  if (e === t)
    return !0;
  if (e == null || t === null || t === void 0 || typeof e != typeof t || typeof e != "object" || Array.isArray(e) !== Array.isArray(t))
    return !1;
  let n, r;
  if (Array.isArray(e)) {
    if (e.length !== t.length)
      return !1;
    for (n = 0; n < e.length; n++)
      if (!Mt(e[n], t[n]))
        return !1;
  } else {
    const i = [];
    for (r in e)
      i.push(r);
    i.sort();
    const s = [];
    for (r in t)
      s.push(r);
    if (s.sort(), !Mt(i, s))
      return !1;
    for (n = 0; n < i.length; n++)
      if (!Mt(e[i[n]], t[i[n]]))
        return !1;
  }
  return !0;
}
function ge(e) {
  return typeof e == "number";
}
function Pe(e) {
  return typeof e < "u";
}
function $e(e) {
  return typeof e == "boolean";
}
function wl(e) {
  return typeof e == "string";
}
function nt(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
function uh(e, t) {
  if (e.length < t.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function an(e, t) {
  const n = e.length - t.length;
  return n > 0 ? e.lastIndexOf(t) === n : n === 0 ? e === t : !1;
}
function Fn(e) {
  let t = "";
  uh(e, "(?i)") && (e = e.substring(4), t = "i");
  try {
    return new RegExp(e, t + "u");
  } catch {
    try {
      return new RegExp(e, t);
    } catch {
      return;
    }
  }
}
function So(e) {
  let t = 0;
  for (let n = 0; n < e.length; n++) {
    t++;
    const r = e.charCodeAt(n);
    55296 <= r && r <= 56319 && n++;
  }
  return t;
}
var xo;
(function(e) {
  function t(n) {
    return typeof n == "string";
  }
  e.is = t;
})(xo || (xo = {}));
var Pr;
(function(e) {
  function t(n) {
    return typeof n == "string";
  }
  e.is = t;
})(Pr || (Pr = {}));
var No;
(function(e) {
  e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
  function t(n) {
    return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
  }
  e.is = t;
})(No || (No = {}));
var Vn;
(function(e) {
  e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
  function t(n) {
    return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
  }
  e.is = t;
})(Vn || (Vn = {}));
var ne;
(function(e) {
  function t(r, i) {
    return r === Number.MAX_VALUE && (r = Vn.MAX_VALUE), i === Number.MAX_VALUE && (i = Vn.MAX_VALUE), { line: r, character: i };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.objectLiteral(i) && N.uinteger(i.line) && N.uinteger(i.character);
  }
  e.is = n;
})(ne || (ne = {}));
var j;
(function(e) {
  function t(r, i, s, o) {
    if (N.uinteger(r) && N.uinteger(i) && N.uinteger(s) && N.uinteger(o))
      return { start: ne.create(r, i), end: ne.create(s, o) };
    if (ne.is(r) && ne.is(i))
      return { start: r, end: i };
    throw new Error(`Range#create called with invalid arguments[${r}, ${i}, ${s}, ${o}]`);
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.objectLiteral(i) && ne.is(i.start) && ne.is(i.end);
  }
  e.is = n;
})(j || (j = {}));
var Dt;
(function(e) {
  function t(r, i) {
    return { uri: r, range: i };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.objectLiteral(i) && j.is(i.range) && (N.string(i.uri) || N.undefined(i.uri));
  }
  e.is = n;
})(Dt || (Dt = {}));
var Eo;
(function(e) {
  function t(r, i, s, o) {
    return { targetUri: r, targetRange: i, targetSelectionRange: s, originSelectionRange: o };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.objectLiteral(i) && j.is(i.targetRange) && N.string(i.targetUri) && j.is(i.targetSelectionRange) && (j.is(i.originSelectionRange) || N.undefined(i.originSelectionRange));
  }
  e.is = n;
})(Eo || (Eo = {}));
var Ir;
(function(e) {
  function t(r, i, s, o) {
    return {
      red: r,
      green: i,
      blue: s,
      alpha: o
    };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.objectLiteral(i) && N.numberRange(i.red, 0, 1) && N.numberRange(i.green, 0, 1) && N.numberRange(i.blue, 0, 1) && N.numberRange(i.alpha, 0, 1);
  }
  e.is = n;
})(Ir || (Ir = {}));
var _o;
(function(e) {
  function t(r, i) {
    return {
      range: r,
      color: i
    };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.objectLiteral(i) && j.is(i.range) && Ir.is(i.color);
  }
  e.is = n;
})(_o || (_o = {}));
var Ao;
(function(e) {
  function t(r, i, s) {
    return {
      label: r,
      textEdit: i,
      additionalTextEdits: s
    };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.objectLiteral(i) && N.string(i.label) && (N.undefined(i.textEdit) || Ue.is(i)) && (N.undefined(i.additionalTextEdits) || N.typedArray(i.additionalTextEdits, Ue.is));
  }
  e.is = n;
})(Ao || (Ao = {}));
var rn;
(function(e) {
  e.Comment = "comment", e.Imports = "imports", e.Region = "region";
})(rn || (rn = {}));
var Ro;
(function(e) {
  function t(r, i, s, o, a, l) {
    const u = {
      startLine: r,
      endLine: i
    };
    return N.defined(s) && (u.startCharacter = s), N.defined(o) && (u.endCharacter = o), N.defined(a) && (u.kind = a), N.defined(l) && (u.collapsedText = l), u;
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.objectLiteral(i) && N.uinteger(i.startLine) && N.uinteger(i.startLine) && (N.undefined(i.startCharacter) || N.uinteger(i.startCharacter)) && (N.undefined(i.endCharacter) || N.uinteger(i.endCharacter)) && (N.undefined(i.kind) || N.string(i.kind));
  }
  e.is = n;
})(Ro || (Ro = {}));
var Fr;
(function(e) {
  function t(r, i) {
    return {
      location: r,
      message: i
    };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && Dt.is(i.location) && N.string(i.message);
  }
  e.is = n;
})(Fr || (Fr = {}));
var Ne;
(function(e) {
  e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
})(Ne || (Ne = {}));
var ko;
(function(e) {
  e.Unnecessary = 1, e.Deprecated = 2;
})(ko || (ko = {}));
var To;
(function(e) {
  function t(n) {
    const r = n;
    return N.objectLiteral(r) && N.string(r.href);
  }
  e.is = t;
})(To || (To = {}));
var Ge;
(function(e) {
  function t(r, i, s, o, a, l) {
    let u = { range: r, message: i };
    return N.defined(s) && (u.severity = s), N.defined(o) && (u.code = o), N.defined(a) && (u.source = a), N.defined(l) && (u.relatedInformation = l), u;
  }
  e.create = t;
  function n(r) {
    var i;
    let s = r;
    return N.defined(s) && j.is(s.range) && N.string(s.message) && (N.number(s.severity) || N.undefined(s.severity)) && (N.integer(s.code) || N.string(s.code) || N.undefined(s.code)) && (N.undefined(s.codeDescription) || N.string((i = s.codeDescription) === null || i === void 0 ? void 0 : i.href)) && (N.string(s.source) || N.undefined(s.source)) && (N.undefined(s.relatedInformation) || N.typedArray(s.relatedInformation, Fr.is));
  }
  e.is = n;
})(Ge || (Ge = {}));
var qt;
(function(e) {
  function t(r, i, ...s) {
    let o = { title: r, command: i };
    return N.defined(s) && s.length > 0 && (o.arguments = s), o;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && N.string(i.title) && N.string(i.command);
  }
  e.is = n;
})(qt || (qt = {}));
var Ue;
(function(e) {
  function t(s, o) {
    return { range: s, newText: o };
  }
  e.replace = t;
  function n(s, o) {
    return { range: { start: s, end: s }, newText: o };
  }
  e.insert = n;
  function r(s) {
    return { range: s, newText: "" };
  }
  e.del = r;
  function i(s) {
    const o = s;
    return N.objectLiteral(o) && N.string(o.newText) && j.is(o.range);
  }
  e.is = i;
})(Ue || (Ue = {}));
var Vr;
(function(e) {
  function t(r, i, s) {
    const o = { label: r };
    return i !== void 0 && (o.needsConfirmation = i), s !== void 0 && (o.description = s), o;
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.objectLiteral(i) && N.string(i.label) && (N.boolean(i.needsConfirmation) || i.needsConfirmation === void 0) && (N.string(i.description) || i.description === void 0);
  }
  e.is = n;
})(Vr || (Vr = {}));
var Kt;
(function(e) {
  function t(n) {
    const r = n;
    return N.string(r);
  }
  e.is = t;
})(Kt || (Kt = {}));
var Mo;
(function(e) {
  function t(s, o, a) {
    return { range: s, newText: o, annotationId: a };
  }
  e.replace = t;
  function n(s, o, a) {
    return { range: { start: s, end: s }, newText: o, annotationId: a };
  }
  e.insert = n;
  function r(s, o) {
    return { range: s, newText: "", annotationId: o };
  }
  e.del = r;
  function i(s) {
    const o = s;
    return Ue.is(o) && (Vr.is(o.annotationId) || Kt.is(o.annotationId));
  }
  e.is = i;
})(Mo || (Mo = {}));
var Dr;
(function(e) {
  function t(r, i) {
    return { textDocument: r, edits: i };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && Ur.is(i.textDocument) && Array.isArray(i.edits);
  }
  e.is = n;
})(Dr || (Dr = {}));
var qr;
(function(e) {
  function t(r, i, s) {
    let o = {
      kind: "create",
      uri: r
    };
    return i !== void 0 && (i.overwrite !== void 0 || i.ignoreIfExists !== void 0) && (o.options = i), s !== void 0 && (o.annotationId = s), o;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return i && i.kind === "create" && N.string(i.uri) && (i.options === void 0 || (i.options.overwrite === void 0 || N.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || N.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Kt.is(i.annotationId));
  }
  e.is = n;
})(qr || (qr = {}));
var Kr;
(function(e) {
  function t(r, i, s, o) {
    let a = {
      kind: "rename",
      oldUri: r,
      newUri: i
    };
    return s !== void 0 && (s.overwrite !== void 0 || s.ignoreIfExists !== void 0) && (a.options = s), o !== void 0 && (a.annotationId = o), a;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return i && i.kind === "rename" && N.string(i.oldUri) && N.string(i.newUri) && (i.options === void 0 || (i.options.overwrite === void 0 || N.boolean(i.options.overwrite)) && (i.options.ignoreIfExists === void 0 || N.boolean(i.options.ignoreIfExists))) && (i.annotationId === void 0 || Kt.is(i.annotationId));
  }
  e.is = n;
})(Kr || (Kr = {}));
var $r;
(function(e) {
  function t(r, i, s) {
    let o = {
      kind: "delete",
      uri: r
    };
    return i !== void 0 && (i.recursive !== void 0 || i.ignoreIfNotExists !== void 0) && (o.options = i), s !== void 0 && (o.annotationId = s), o;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return i && i.kind === "delete" && N.string(i.uri) && (i.options === void 0 || (i.options.recursive === void 0 || N.boolean(i.options.recursive)) && (i.options.ignoreIfNotExists === void 0 || N.boolean(i.options.ignoreIfNotExists))) && (i.annotationId === void 0 || Kt.is(i.annotationId));
  }
  e.is = n;
})($r || ($r = {}));
var Br;
(function(e) {
  function t(n) {
    let r = n;
    return r && (r.changes !== void 0 || r.documentChanges !== void 0) && (r.documentChanges === void 0 || r.documentChanges.every((i) => N.string(i.kind) ? qr.is(i) || Kr.is(i) || $r.is(i) : Dr.is(i)));
  }
  e.is = t;
})(Br || (Br = {}));
var Oo;
(function(e) {
  function t(r) {
    return { uri: r };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && N.string(i.uri);
  }
  e.is = n;
})(Oo || (Oo = {}));
var Po;
(function(e) {
  function t(r, i) {
    return { uri: r, version: i };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && N.string(i.uri) && N.integer(i.version);
  }
  e.is = n;
})(Po || (Po = {}));
var Ur;
(function(e) {
  function t(r, i) {
    return { uri: r, version: i };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && N.string(i.uri) && (i.version === null || N.integer(i.version));
  }
  e.is = n;
})(Ur || (Ur = {}));
var Io;
(function(e) {
  function t(r, i, s, o) {
    return { uri: r, languageId: i, version: s, text: o };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && N.string(i.uri) && N.string(i.languageId) && N.integer(i.version) && N.string(i.text);
  }
  e.is = n;
})(Io || (Io = {}));
var gt;
(function(e) {
  e.PlainText = "plaintext", e.Markdown = "markdown";
  function t(n) {
    const r = n;
    return r === e.PlainText || r === e.Markdown;
  }
  e.is = t;
})(gt || (gt = {}));
var ln;
(function(e) {
  function t(n) {
    const r = n;
    return N.objectLiteral(n) && gt.is(r.kind) && N.string(r.value);
  }
  e.is = t;
})(ln || (ln = {}));
var Se;
(function(e) {
  e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
})(Se || (Se = {}));
var oe;
(function(e) {
  e.PlainText = 1, e.Snippet = 2;
})(oe || (oe = {}));
var Fo;
(function(e) {
  e.Deprecated = 1;
})(Fo || (Fo = {}));
var Vo;
(function(e) {
  function t(r, i, s) {
    return { newText: r, insert: i, replace: s };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return i && N.string(i.newText) && j.is(i.insert) && j.is(i.replace);
  }
  e.is = n;
})(Vo || (Vo = {}));
var Do;
(function(e) {
  e.asIs = 1, e.adjustIndentation = 2;
})(Do || (Do = {}));
var qo;
(function(e) {
  function t(n) {
    const r = n;
    return r && (N.string(r.detail) || r.detail === void 0) && (N.string(r.description) || r.description === void 0);
  }
  e.is = t;
})(qo || (qo = {}));
var jr;
(function(e) {
  function t(n) {
    return { label: n };
  }
  e.create = t;
})(jr || (jr = {}));
var Ko;
(function(e) {
  function t(n, r) {
    return { items: n || [], isIncomplete: !!r };
  }
  e.create = t;
})(Ko || (Ko = {}));
var Dn;
(function(e) {
  function t(r) {
    return r.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  e.fromPlainText = t;
  function n(r) {
    const i = r;
    return N.string(i) || N.objectLiteral(i) && N.string(i.language) && N.string(i.value);
  }
  e.is = n;
})(Dn || (Dn = {}));
var $o;
(function(e) {
  function t(n) {
    let r = n;
    return !!r && N.objectLiteral(r) && (ln.is(r.contents) || Dn.is(r.contents) || N.typedArray(r.contents, Dn.is)) && (n.range === void 0 || j.is(n.range));
  }
  e.is = t;
})($o || ($o = {}));
var Bo;
(function(e) {
  function t(n, r) {
    return r ? { label: n, documentation: r } : { label: n };
  }
  e.create = t;
})(Bo || (Bo = {}));
var Uo;
(function(e) {
  function t(n, r, ...i) {
    let s = { label: n };
    return N.defined(r) && (s.documentation = r), N.defined(i) ? s.parameters = i : s.parameters = [], s;
  }
  e.create = t;
})(Uo || (Uo = {}));
var jo;
(function(e) {
  e.Text = 1, e.Read = 2, e.Write = 3;
})(jo || (jo = {}));
var zo;
(function(e) {
  function t(n, r) {
    let i = { range: n };
    return N.number(r) && (i.kind = r), i;
  }
  e.create = t;
})(zo || (zo = {}));
var qe;
(function(e) {
  e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
})(qe || (qe = {}));
var Wo;
(function(e) {
  e.Deprecated = 1;
})(Wo || (Wo = {}));
var Ho;
(function(e) {
  function t(n, r, i, s, o) {
    let a = {
      name: n,
      kind: r,
      location: { uri: s, range: i }
    };
    return o && (a.containerName = o), a;
  }
  e.create = t;
})(Ho || (Ho = {}));
var Go;
(function(e) {
  function t(n, r, i, s) {
    return s !== void 0 ? { name: n, kind: r, location: { uri: i, range: s } } : { name: n, kind: r, location: { uri: i } };
  }
  e.create = t;
})(Go || (Go = {}));
var Jo;
(function(e) {
  function t(r, i, s, o, a, l) {
    let u = {
      name: r,
      detail: i,
      kind: s,
      range: o,
      selectionRange: a
    };
    return l !== void 0 && (u.children = l), u;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return i && N.string(i.name) && N.number(i.kind) && j.is(i.range) && j.is(i.selectionRange) && (i.detail === void 0 || N.string(i.detail)) && (i.deprecated === void 0 || N.boolean(i.deprecated)) && (i.children === void 0 || Array.isArray(i.children)) && (i.tags === void 0 || Array.isArray(i.tags));
  }
  e.is = n;
})(Jo || (Jo = {}));
var Xo;
(function(e) {
  e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll";
})(Xo || (Xo = {}));
var qn;
(function(e) {
  e.Invoked = 1, e.Automatic = 2;
})(qn || (qn = {}));
var Qo;
(function(e) {
  function t(r, i, s) {
    let o = { diagnostics: r };
    return i != null && (o.only = i), s != null && (o.triggerKind = s), o;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && N.typedArray(i.diagnostics, Ge.is) && (i.only === void 0 || N.typedArray(i.only, N.string)) && (i.triggerKind === void 0 || i.triggerKind === qn.Invoked || i.triggerKind === qn.Automatic);
  }
  e.is = n;
})(Qo || (Qo = {}));
var Zo;
(function(e) {
  function t(r, i, s) {
    let o = { title: r }, a = !0;
    return typeof i == "string" ? (a = !1, o.kind = i) : qt.is(i) ? o.command = i : o.edit = i, a && s !== void 0 && (o.kind = s), o;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return i && N.string(i.title) && (i.diagnostics === void 0 || N.typedArray(i.diagnostics, Ge.is)) && (i.kind === void 0 || N.string(i.kind)) && (i.edit !== void 0 || i.command !== void 0) && (i.command === void 0 || qt.is(i.command)) && (i.isPreferred === void 0 || N.boolean(i.isPreferred)) && (i.edit === void 0 || Br.is(i.edit));
  }
  e.is = n;
})(Zo || (Zo = {}));
var Yo;
(function(e) {
  function t(r, i) {
    let s = { range: r };
    return N.defined(i) && (s.data = i), s;
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && j.is(i.range) && (N.undefined(i.command) || qt.is(i.command));
  }
  e.is = n;
})(Yo || (Yo = {}));
var ea;
(function(e) {
  function t(r, i) {
    return { tabSize: r, insertSpaces: i };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && N.uinteger(i.tabSize) && N.boolean(i.insertSpaces);
  }
  e.is = n;
})(ea || (ea = {}));
var ta;
(function(e) {
  function t(r, i, s) {
    return { range: r, target: i, data: s };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.defined(i) && j.is(i.range) && (N.undefined(i.target) || N.string(i.target));
  }
  e.is = n;
})(ta || (ta = {}));
var Kn;
(function(e) {
  function t(r, i) {
    return { range: r, parent: i };
  }
  e.create = t;
  function n(r) {
    let i = r;
    return N.objectLiteral(i) && j.is(i.range) && (i.parent === void 0 || e.is(i.parent));
  }
  e.is = n;
})(Kn || (Kn = {}));
var na;
(function(e) {
  e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator";
})(na || (na = {}));
var ra;
(function(e) {
  e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary";
})(ra || (ra = {}));
var ia;
(function(e) {
  function t(n) {
    const r = n;
    return N.objectLiteral(r) && (r.resultId === void 0 || typeof r.resultId == "string") && Array.isArray(r.data) && (r.data.length === 0 || typeof r.data[0] == "number");
  }
  e.is = t;
})(ia || (ia = {}));
var sa;
(function(e) {
  function t(r, i) {
    return { range: r, text: i };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return i != null && j.is(i.range) && N.string(i.text);
  }
  e.is = n;
})(sa || (sa = {}));
var oa;
(function(e) {
  function t(r, i, s) {
    return { range: r, variableName: i, caseSensitiveLookup: s };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return i != null && j.is(i.range) && N.boolean(i.caseSensitiveLookup) && (N.string(i.variableName) || i.variableName === void 0);
  }
  e.is = n;
})(oa || (oa = {}));
var aa;
(function(e) {
  function t(r, i) {
    return { range: r, expression: i };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return i != null && j.is(i.range) && (N.string(i.expression) || i.expression === void 0);
  }
  e.is = n;
})(aa || (aa = {}));
var la;
(function(e) {
  function t(r, i) {
    return { frameId: r, stoppedLocation: i };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.defined(i) && j.is(r.stoppedLocation);
  }
  e.is = n;
})(la || (la = {}));
var zr;
(function(e) {
  e.Type = 1, e.Parameter = 2;
  function t(n) {
    return n === 1 || n === 2;
  }
  e.is = t;
})(zr || (zr = {}));
var Wr;
(function(e) {
  function t(r) {
    return { value: r };
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.objectLiteral(i) && (i.tooltip === void 0 || N.string(i.tooltip) || ln.is(i.tooltip)) && (i.location === void 0 || Dt.is(i.location)) && (i.command === void 0 || qt.is(i.command));
  }
  e.is = n;
})(Wr || (Wr = {}));
var ua;
(function(e) {
  function t(r, i, s) {
    const o = { position: r, label: i };
    return s !== void 0 && (o.kind = s), o;
  }
  e.create = t;
  function n(r) {
    const i = r;
    return N.objectLiteral(i) && ne.is(i.position) && (N.string(i.label) || N.typedArray(i.label, Wr.is)) && (i.kind === void 0 || zr.is(i.kind)) && i.textEdits === void 0 || N.typedArray(i.textEdits, Ue.is) && (i.tooltip === void 0 || N.string(i.tooltip) || ln.is(i.tooltip)) && (i.paddingLeft === void 0 || N.boolean(i.paddingLeft)) && (i.paddingRight === void 0 || N.boolean(i.paddingRight));
  }
  e.is = n;
})(ua || (ua = {}));
var ca;
(function(e) {
  function t(n) {
    return { kind: "snippet", value: n };
  }
  e.createSnippet = t;
})(ca || (ca = {}));
var ha;
(function(e) {
  function t(n, r, i, s) {
    return { insertText: n, filterText: r, range: i, command: s };
  }
  e.create = t;
})(ha || (ha = {}));
var da;
(function(e) {
  function t(n) {
    return { items: n };
  }
  e.create = t;
})(da || (da = {}));
var fa;
(function(e) {
  e.Invoked = 0, e.Automatic = 1;
})(fa || (fa = {}));
var ma;
(function(e) {
  function t(n, r) {
    return { range: n, text: r };
  }
  e.create = t;
})(ma || (ma = {}));
var ga;
(function(e) {
  function t(n, r) {
    return { triggerKind: n, selectedCompletionInfo: r };
  }
  e.create = t;
})(ga || (ga = {}));
var pa;
(function(e) {
  function t(n) {
    const r = n;
    return N.objectLiteral(r) && Pr.is(r.uri) && N.string(r.name);
  }
  e.is = t;
})(pa || (pa = {}));
var ba;
(function(e) {
  function t(s, o, a, l) {
    return new ch(s, o, a, l);
  }
  e.create = t;
  function n(s) {
    let o = s;
    return !!(N.defined(o) && N.string(o.uri) && (N.undefined(o.languageId) || N.string(o.languageId)) && N.uinteger(o.lineCount) && N.func(o.getText) && N.func(o.positionAt) && N.func(o.offsetAt));
  }
  e.is = n;
  function r(s, o) {
    let a = s.getText(), l = i(o, (d, h) => {
      let f = d.range.start.line - h.range.start.line;
      return f === 0 ? d.range.start.character - h.range.start.character : f;
    }), u = a.length;
    for (let d = l.length - 1; d >= 0; d--) {
      let h = l[d], f = s.offsetAt(h.range.start), m = s.offsetAt(h.range.end);
      if (m <= u)
        a = a.substring(0, f) + h.newText + a.substring(m, a.length);
      else
        throw new Error("Overlapping edit");
      u = f;
    }
    return a;
  }
  e.applyEdits = r;
  function i(s, o) {
    if (s.length <= 1)
      return s;
    const a = s.length / 2 | 0, l = s.slice(0, a), u = s.slice(a);
    i(l, o), i(u, o);
    let d = 0, h = 0, f = 0;
    for (; d < l.length && h < u.length; )
      o(l[d], u[h]) <= 0 ? s[f++] = l[d++] : s[f++] = u[h++];
    for (; d < l.length; )
      s[f++] = l[d++];
    for (; h < u.length; )
      s[f++] = u[h++];
    return s;
  }
})(ba || (ba = {}));
var ch = class {
  constructor(e, t, n, r) {
    this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(e) {
    if (e) {
      let t = this.offsetAt(e.start), n = this.offsetAt(e.end);
      return this._content.substring(t, n);
    }
    return this._content;
  }
  update(e, t) {
    this._content = e.text, this._version = t, this._lineOffsets = void 0;
  }
  getLineOffsets() {
    if (this._lineOffsets === void 0) {
      let e = [], t = this._content, n = !0;
      for (let r = 0; r < t.length; r++) {
        n && (e.push(r), n = !1);
        let i = t.charAt(r);
        n = i === "\r" || i === `
`, i === "\r" && r + 1 < t.length && t.charAt(r + 1) === `
` && r++;
      }
      n && t.length > 0 && e.push(t.length), this._lineOffsets = e;
    }
    return this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    let t = this.getLineOffsets(), n = 0, r = t.length;
    if (r === 0)
      return ne.create(0, e);
    for (; n < r; ) {
      let s = Math.floor((n + r) / 2);
      t[s] > e ? r = s : n = s + 1;
    }
    let i = n - 1;
    return ne.create(i, e - t[i]);
  }
  offsetAt(e) {
    let t = this.getLineOffsets();
    if (e.line >= t.length)
      return this._content.length;
    if (e.line < 0)
      return 0;
    let n = t[e.line], r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(n + e.character, r), n);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
}, N;
(function(e) {
  const t = Object.prototype.toString;
  function n(m) {
    return typeof m < "u";
  }
  e.defined = n;
  function r(m) {
    return typeof m > "u";
  }
  e.undefined = r;
  function i(m) {
    return m === !0 || m === !1;
  }
  e.boolean = i;
  function s(m) {
    return t.call(m) === "[object String]";
  }
  e.string = s;
  function o(m) {
    return t.call(m) === "[object Number]";
  }
  e.number = o;
  function a(m, g, p) {
    return t.call(m) === "[object Number]" && g <= m && m <= p;
  }
  e.numberRange = a;
  function l(m) {
    return t.call(m) === "[object Number]" && -2147483648 <= m && m <= 2147483647;
  }
  e.integer = l;
  function u(m) {
    return t.call(m) === "[object Number]" && 0 <= m && m <= 2147483647;
  }
  e.uinteger = u;
  function d(m) {
    return t.call(m) === "[object Function]";
  }
  e.func = d;
  function h(m) {
    return m !== null && typeof m == "object";
  }
  e.objectLiteral = h;
  function f(m, g) {
    return Array.isArray(m) && m.every(g);
  }
  e.typedArray = f;
})(N || (N = {}));
var ya = class Hr {
  constructor(t, n, r, i) {
    this._uri = t, this._languageId = n, this._version = r, this._content = i, this._lineOffsets = void 0;
  }
  get uri() {
    return this._uri;
  }
  get languageId() {
    return this._languageId;
  }
  get version() {
    return this._version;
  }
  getText(t) {
    if (t) {
      const n = this.offsetAt(t.start), r = this.offsetAt(t.end);
      return this._content.substring(n, r);
    }
    return this._content;
  }
  update(t, n) {
    for (let r of t)
      if (Hr.isIncremental(r)) {
        const i = Cl(r.range), s = this.offsetAt(i.start), o = this.offsetAt(i.end);
        this._content = this._content.substring(0, s) + r.text + this._content.substring(o, this._content.length);
        const a = Math.max(i.start.line, 0), l = Math.max(i.end.line, 0);
        let u = this._lineOffsets;
        const d = va(r.text, !1, s);
        if (l - a === d.length)
          for (let f = 0, m = d.length; f < m; f++)
            u[f + a + 1] = d[f];
        else
          d.length < 1e4 ? u.splice(a + 1, l - a, ...d) : this._lineOffsets = u = u.slice(0, a + 1).concat(d, u.slice(l + 1));
        const h = r.text.length - (o - s);
        if (h !== 0)
          for (let f = a + 1 + d.length, m = u.length; f < m; f++)
            u[f] = u[f] + h;
      } else if (Hr.isFull(r))
        this._content = r.text, this._lineOffsets = void 0;
      else
        throw new Error("Unknown change event received");
    this._version = n;
  }
  getLineOffsets() {
    return this._lineOffsets === void 0 && (this._lineOffsets = va(this._content, !0)), this._lineOffsets;
  }
  positionAt(t) {
    t = Math.max(Math.min(t, this._content.length), 0);
    let n = this.getLineOffsets(), r = 0, i = n.length;
    if (i === 0)
      return { line: 0, character: t };
    for (; r < i; ) {
      let o = Math.floor((r + i) / 2);
      n[o] > t ? i = o : r = o + 1;
    }
    let s = r - 1;
    return { line: s, character: t - n[s] };
  }
  offsetAt(t) {
    let n = this.getLineOffsets();
    if (t.line >= n.length)
      return this._content.length;
    if (t.line < 0)
      return 0;
    let r = n[t.line], i = t.line + 1 < n.length ? n[t.line + 1] : this._content.length;
    return Math.max(Math.min(r + t.character, i), r);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
  static isIncremental(t) {
    let n = t;
    return n != null && typeof n.text == "string" && n.range !== void 0 && (n.rangeLength === void 0 || typeof n.rangeLength == "number");
  }
  static isFull(t) {
    let n = t;
    return n != null && typeof n.text == "string" && n.range === void 0 && n.rangeLength === void 0;
  }
}, Ve;
(function(e) {
  function t(i, s, o, a) {
    return new ya(i, s, o, a);
  }
  e.create = t;
  function n(i, s, o) {
    if (i instanceof ya)
      return i.update(s, o), i;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  e.update = n;
  function r(i, s) {
    let o = i.getText(), a = Gr(s.map(hh), (d, h) => {
      let f = d.range.start.line - h.range.start.line;
      return f === 0 ? d.range.start.character - h.range.start.character : f;
    }), l = 0;
    const u = [];
    for (const d of a) {
      let h = i.offsetAt(d.range.start);
      if (h < l)
        throw new Error("Overlapping edit");
      h > l && u.push(o.substring(l, h)), d.newText.length && u.push(d.newText), l = i.offsetAt(d.range.end);
    }
    return u.push(o.substr(l)), u.join("");
  }
  e.applyEdits = r;
})(Ve || (Ve = {}));
function Gr(e, t) {
  if (e.length <= 1)
    return e;
  const n = e.length / 2 | 0, r = e.slice(0, n), i = e.slice(n);
  Gr(r, t), Gr(i, t);
  let s = 0, o = 0, a = 0;
  for (; s < r.length && o < i.length; )
    t(r[s], i[o]) <= 0 ? e[a++] = r[s++] : e[a++] = i[o++];
  for (; s < r.length; )
    e[a++] = r[s++];
  for (; o < i.length; )
    e[a++] = i[o++];
  return e;
}
function va(e, t, n = 0) {
  const r = t ? [n] : [];
  for (let i = 0; i < e.length; i++) {
    let s = e.charCodeAt(i);
    (s === 13 || s === 10) && (s === 13 && i + 1 < e.length && e.charCodeAt(i + 1) === 10 && i++, r.push(n + i + 1));
  }
  return r;
}
function Cl(e) {
  const t = e.start, n = e.end;
  return t.line > n.line || t.line === n.line && t.character > n.character ? { start: n, end: t } : e;
}
function hh(e) {
  const t = Cl(e.range);
  return t !== e.range ? { newText: e.newText, range: t } : e;
}
var G;
(function(e) {
  e[e.Undefined = 0] = "Undefined", e[e.EnumValueMismatch = 1] = "EnumValueMismatch", e[e.Deprecated = 2] = "Deprecated", e[e.UnexpectedEndOfComment = 257] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 258] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 259] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 260] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 261] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 262] = "InvalidCharacter", e[e.PropertyExpected = 513] = "PropertyExpected", e[e.CommaExpected = 514] = "CommaExpected", e[e.ColonExpected = 515] = "ColonExpected", e[e.ValueExpected = 516] = "ValueExpected", e[e.CommaOrCloseBacketExpected = 517] = "CommaOrCloseBacketExpected", e[e.CommaOrCloseBraceExpected = 518] = "CommaOrCloseBraceExpected", e[e.TrailingComma = 519] = "TrailingComma", e[e.DuplicateKey = 520] = "DuplicateKey", e[e.CommentNotPermitted = 521] = "CommentNotPermitted", e[e.PropertyKeysMustBeDoublequoted = 528] = "PropertyKeysMustBeDoublequoted", e[e.SchemaResolveError = 768] = "SchemaResolveError", e[e.SchemaUnsupportedFeature = 769] = "SchemaUnsupportedFeature";
})(G || (G = {}));
var Fe;
(function(e) {
  e[e.v3 = 3] = "v3", e[e.v4 = 4] = "v4", e[e.v6 = 6] = "v6", e[e.v7 = 7] = "v7", e[e.v2019_09 = 19] = "v2019_09", e[e.v2020_12 = 20] = "v2020_12";
})(Fe || (Fe = {}));
var Jr;
(function(e) {
  e.LATEST = {
    textDocument: {
      completion: {
        completionItem: {
          documentationFormat: [gt.Markdown, gt.PlainText],
          commitCharactersSupport: !0,
          labelDetailsSupport: !0
        }
      }
    }
  };
})(Jr || (Jr = {}));
function k(...e) {
  const t = e[0];
  let n, r, i;
  if (typeof t == "string")
    n = t, r = t, e.splice(0, 1), i = !e || typeof e[0] != "object" ? e : e[0];
  else if (t instanceof Array) {
    const s = e.slice(1);
    if (t.length !== s.length + 1)
      throw new Error("expected a string as the first argument to l10n.t");
    let o = t[0];
    for (let a = 1; a < t.length; a++)
      o += `{${a - 1}}` + t[a];
    return k(o, ...s);
  } else
    r = t.message, n = r, t.comment && t.comment.length > 0 && (n += `/${Array.isArray(t.comment) ? t.comment.join("") : t.comment}`), i = t.args ?? {};
  return fh(r, i);
}
var dh = /{([^}]+)}/g;
function fh(e, t) {
  return Object.keys(t).length === 0 ? e : e.replace(dh, (n, r) => t[r] ?? n);
}
var mh = {
  "color-hex": { errorMessage: k("Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."), pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/ },
  "date-time": { errorMessage: k("String is not a RFC3339 date-time."), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i },
  date: { errorMessage: k("String is not a RFC3339 date."), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i },
  time: { errorMessage: k("String is not a RFC3339 time."), pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i },
  email: { errorMessage: k("String is not an e-mail address."), pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/ },
  hostname: { errorMessage: k("String is not a hostname."), pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i },
  ipv4: { errorMessage: k("String is not an IPv4 address."), pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/ },
  ipv6: { errorMessage: k("String is not an IPv6 address."), pattern: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i }
}, pt = class {
  constructor(e, t, n = 0) {
    this.offset = t, this.length = n, this.parent = e;
  }
  get children() {
    return [];
  }
  toString() {
    return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : "");
  }
}, gh = class extends pt {
  constructor(e, t) {
    super(e, t), this.type = "null", this.value = null;
  }
}, wa = class extends pt {
  constructor(e, t, n) {
    super(e, n), this.type = "boolean", this.value = t;
  }
}, ph = class extends pt {
  constructor(e, t) {
    super(e, t), this.type = "array", this.items = [];
  }
  get children() {
    return this.items;
  }
}, bh = class extends pt {
  constructor(e, t) {
    super(e, t), this.type = "number", this.isInteger = !0, this.value = Number.NaN;
  }
}, Yn = class extends pt {
  constructor(e, t, n) {
    super(e, t, n), this.type = "string", this.value = "";
  }
}, yh = class extends pt {
  constructor(e, t, n) {
    super(e, t), this.type = "property", this.colonOffset = -1, this.keyNode = n;
  }
  get children() {
    return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
  }
}, vh = class extends pt {
  constructor(e, t) {
    super(e, t), this.type = "object", this.properties = [];
  }
  get children() {
    return this.properties;
  }
};
function Ce(e) {
  return $e(e) ? e ? {} : { not: {} } : e;
}
var Ca;
(function(e) {
  e[e.Key = 0] = "Key", e[e.Enum = 1] = "Enum";
})(Ca || (Ca = {}));
var wh = {
  "http://json-schema.org/draft-03/schema#": Fe.v3,
  "http://json-schema.org/draft-04/schema#": Fe.v4,
  "http://json-schema.org/draft-06/schema#": Fe.v6,
  "http://json-schema.org/draft-07/schema#": Fe.v7,
  "https://json-schema.org/draft/2019-09/schema": Fe.v2019_09,
  "https://json-schema.org/draft/2020-12/schema": Fe.v2020_12
}, La = class {
  constructor(e) {
    this.schemaDraft = e;
  }
}, Ch = class Ll {
  constructor(t = -1, n) {
    this.focusOffset = t, this.exclude = n, this.schemas = [];
  }
  add(t) {
    this.schemas.push(t);
  }
  merge(t) {
    Array.prototype.push.apply(this.schemas, t.schemas);
  }
  include(t) {
    return (this.focusOffset === -1 || Sl(t, this.focusOffset)) && t !== this.exclude;
  }
  newSub() {
    return new Ll(-1, this.exclude);
  }
}, un = class {
  constructor() {
  }
  get schemas() {
    return [];
  }
  add(e) {
  }
  merge(e) {
  }
  include(e) {
    return !0;
  }
  newSub() {
    return this;
  }
};
un.instance = new un();
var pe = class {
  constructor() {
    this.problems = [], this.propertiesMatches = 0, this.processedProperties = /* @__PURE__ */ new Set(), this.propertiesValueMatches = 0, this.primaryValueMatches = 0, this.enumValueMatch = !1, this.enumValues = void 0;
  }
  hasProblems() {
    return !!this.problems.length;
  }
  merge(e) {
    this.problems = this.problems.concat(e.problems), this.propertiesMatches += e.propertiesMatches, this.propertiesValueMatches += e.propertiesValueMatches, this.mergeProcessedProperties(e);
  }
  mergeEnumValues(e) {
    if (!this.enumValueMatch && !e.enumValueMatch && this.enumValues && e.enumValues) {
      this.enumValues = this.enumValues.concat(e.enumValues);
      for (const t of this.problems)
        t.code === G.EnumValueMismatch && (t.message = k("Value is not accepted. Valid values: {0}.", this.enumValues.map((n) => JSON.stringify(n)).join(", ")));
    }
  }
  mergePropertyMatch(e) {
    this.problems = this.problems.concat(e.problems), this.propertiesMatches++, (e.enumValueMatch || !e.hasProblems() && e.propertiesMatches) && this.propertiesValueMatches++, e.enumValueMatch && e.enumValues && e.enumValues.length === 1 && this.primaryValueMatches++;
  }
  mergeProcessedProperties(e) {
    e.processedProperties.forEach((t) => this.processedProperties.add(t));
  }
  compare(e) {
    const t = this.hasProblems();
    return t !== e.hasProblems() ? t ? -1 : 1 : this.enumValueMatch !== e.enumValueMatch ? e.enumValueMatch ? -1 : 1 : this.primaryValueMatches !== e.primaryValueMatches ? this.primaryValueMatches - e.primaryValueMatches : this.propertiesValueMatches !== e.propertiesValueMatches ? this.propertiesValueMatches - e.propertiesValueMatches : this.propertiesMatches - e.propertiesMatches;
  }
};
function Lh(e, t = []) {
  return new xl(e, t, []);
}
function mt(e) {
  return ah(e);
}
function Xr(e) {
  return oh(e);
}
function Sl(e, t, n = !1) {
  return t >= e.offset && t < e.offset + e.length || n && t === e.offset + e.length;
}
var xl = class {
  constructor(e, t = [], n = []) {
    this.root = e, this.syntaxErrors = t, this.comments = n;
  }
  getNodeFromOffset(e, t = !1) {
    if (this.root)
      return sh(this.root, e, t);
  }
  visit(e) {
    if (this.root) {
      const t = (n) => {
        let r = e(n);
        const i = n.children;
        if (Array.isArray(i))
          for (let s = 0; s < i.length && r; s++)
            r = t(i[s]);
        return r;
      };
      t(this.root);
    }
  }
  validate(e, t, n = Ne.Warning, r) {
    if (this.root && t) {
      const i = new pe();
      return he(this.root, t, i, un.instance, new La(r ?? Sa(t))), i.problems.map((s) => {
        const o = j.create(e.positionAt(s.location.offset), e.positionAt(s.location.offset + s.location.length));
        return Ge.create(o, s.message, s.severity ?? n, s.code);
      });
    }
  }
  getMatchingSchemas(e, t = -1, n) {
    if (this.root && e) {
      const r = new Ch(t, n), i = Sa(e), s = new La(i);
      return he(this.root, e, new pe(), r, s), r.schemas;
    }
    return [];
  }
};
function Sa(e, t = Fe.v2020_12) {
  let n = e.$schema;
  return n ? wh[n] ?? t : t;
}
function he(e, t, n, r, i) {
  if (!e || !r.include(e))
    return;
  if (e.type === "property")
    return he(e.valueNode, t, n, r, i);
  const s = e;
  switch (o(), s.type) {
    case "object":
      d(s);
      break;
    case "array":
      u(s);
      break;
    case "string":
      l(s);
      break;
    case "number":
      a(s);
      break;
  }
  r.add({ node: s, schema: t });
  function o() {
    var h;
    function f(y) {
      return s.type === y || y === "integer" && s.type === "number" && s.isInteger;
    }
    if (Array.isArray(t.type) ? t.type.some(f) || n.problems.push({
      location: { offset: s.offset, length: s.length },
      message: t.errorMessage || k("Incorrect type. Expected one of {0}.", t.type.join(", "))
    }) : t.type && (f(t.type) || n.problems.push({
      location: { offset: s.offset, length: s.length },
      message: t.errorMessage || k('Incorrect type. Expected "{0}".', t.type)
    })), Array.isArray(t.allOf))
      for (const y of t.allOf) {
        const w = new pe(), b = r.newSub();
        he(s, Ce(y), w, b, i), n.merge(w), r.merge(b);
      }
    const m = Ce(t.not);
    if (m) {
      const y = new pe(), w = r.newSub();
      he(s, m, y, w, i), y.hasProblems() || n.problems.push({
        location: { offset: s.offset, length: s.length },
        message: t.errorMessage || k("Matches a schema that is not allowed.")
      });
      for (const b of w.schemas)
        b.inverted = !b.inverted, r.add(b);
    }
    const g = (y, w) => {
      const b = [];
      let L;
      for (const x of y) {
        const T = Ce(x), I = new pe(), q = r.newSub();
        if (he(s, T, I, q, i), I.hasProblems() || b.push(T), !L)
          L = { schema: T, validationResult: I, matchingSchemas: q };
        else if (!w && !I.hasProblems() && !L.validationResult.hasProblems())
          L.matchingSchemas.merge(q), L.validationResult.propertiesMatches += I.propertiesMatches, L.validationResult.propertiesValueMatches += I.propertiesValueMatches, L.validationResult.mergeProcessedProperties(I);
        else {
          const R = I.compare(L.validationResult);
          R > 0 ? L = { schema: T, validationResult: I, matchingSchemas: q } : R === 0 && (L.matchingSchemas.merge(q), L.validationResult.mergeEnumValues(I));
        }
      }
      return b.length > 1 && w && n.problems.push({
        location: { offset: s.offset, length: 1 },
        message: k("Matches multiple schemas when only one must validate.")
      }), L && (n.merge(L.validationResult), r.merge(L.matchingSchemas)), b.length;
    };
    Array.isArray(t.anyOf) && g(t.anyOf, !1), Array.isArray(t.oneOf) && g(t.oneOf, !0);
    const p = (y) => {
      const w = new pe(), b = r.newSub();
      he(s, Ce(y), w, b, i), n.merge(w), r.merge(b);
    }, v = (y, w, b) => {
      const L = Ce(y), x = new pe(), T = r.newSub();
      he(s, L, x, T, i), r.merge(T), n.mergeProcessedProperties(x), x.hasProblems() ? b && p(b) : w && p(w);
    }, C = Ce(t.if);
    if (C && v(C, Ce(t.then), Ce(t.else)), Array.isArray(t.enum)) {
      const y = mt(s);
      let w = !1;
      for (const b of t.enum)
        if (Mt(y, b)) {
          w = !0;
          break;
        }
      n.enumValues = t.enum, n.enumValueMatch = w, w || n.problems.push({
        location: { offset: s.offset, length: s.length },
        code: G.EnumValueMismatch,
        message: t.errorMessage || k("Value is not accepted. Valid values: {0}.", t.enum.map((b) => JSON.stringify(b)).join(", "))
      });
    }
    if (Pe(t.const)) {
      const y = mt(s);
      Mt(y, t.const) ? n.enumValueMatch = !0 : (n.problems.push({
        location: { offset: s.offset, length: s.length },
        code: G.EnumValueMismatch,
        message: t.errorMessage || k("Value must be {0}.", JSON.stringify(t.const))
      }), n.enumValueMatch = !1), n.enumValues = [t.const];
    }
    let S = t.deprecationMessage;
    if (S || t.deprecated) {
      S = S || k("Value is deprecated");
      let y = ((h = s.parent) == null ? void 0 : h.type) === "property" ? s.parent : s;
      n.problems.push({
        location: { offset: y.offset, length: y.length },
        severity: Ne.Warning,
        message: S,
        code: G.Deprecated
      });
    }
  }
  function a(h) {
    const f = h.value;
    function m(w) {
      var b;
      const L = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(w.toString());
      return L && {
        value: Number(L[1] + (L[2] || "")),
        multiplier: (((b = L[2]) == null ? void 0 : b.length) || 0) - (parseInt(L[3]) || 0)
      };
    }
    if (ge(t.multipleOf)) {
      let w = -1;
      if (Number.isInteger(t.multipleOf))
        w = f % t.multipleOf;
      else {
        let b = m(t.multipleOf), L = m(f);
        if (b && L) {
          const x = 10 ** Math.abs(L.multiplier - b.multiplier);
          L.multiplier < b.multiplier ? L.value *= x : b.value *= x, w = L.value % b.value;
        }
      }
      w !== 0 && n.problems.push({
        location: { offset: h.offset, length: h.length },
        message: k("Value is not divisible by {0}.", t.multipleOf)
      });
    }
    function g(w, b) {
      if (ge(b))
        return b;
      if ($e(b) && b)
        return w;
    }
    function p(w, b) {
      if (!$e(b) || !b)
        return w;
    }
    const v = g(t.minimum, t.exclusiveMinimum);
    ge(v) && f <= v && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Value is below the exclusive minimum of {0}.", v)
    });
    const C = g(t.maximum, t.exclusiveMaximum);
    ge(C) && f >= C && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Value is above the exclusive maximum of {0}.", C)
    });
    const S = p(t.minimum, t.exclusiveMinimum);
    ge(S) && f < S && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Value is below the minimum of {0}.", S)
    });
    const y = p(t.maximum, t.exclusiveMaximum);
    ge(y) && f > y && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Value is above the maximum of {0}.", y)
    });
  }
  function l(h) {
    if (ge(t.minLength) && So(h.value) < t.minLength && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("String is shorter than the minimum length of {0}.", t.minLength)
    }), ge(t.maxLength) && So(h.value) > t.maxLength && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("String is longer than the maximum length of {0}.", t.maxLength)
    }), wl(t.pattern)) {
      const f = Fn(t.pattern);
      f != null && f.test(h.value) || n.problems.push({
        location: { offset: h.offset, length: h.length },
        message: t.patternErrorMessage || t.errorMessage || k('String does not match the pattern of "{0}".', t.pattern)
      });
    }
    if (t.format)
      switch (t.format) {
        case "uri":
        case "uri-reference":
          {
            let m;
            if (!h.value)
              m = k("URI expected.");
            else {
              const g = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(h.value);
              g ? !g[2] && t.format === "uri" && (m = k("URI with a scheme is expected.")) : m = k("URI is expected.");
            }
            m && n.problems.push({
              location: { offset: h.offset, length: h.length },
              message: t.patternErrorMessage || t.errorMessage || k("String is not a URI: {0}", m)
            });
          }
          break;
        case "color-hex":
        case "date-time":
        case "date":
        case "time":
        case "email":
        case "hostname":
        case "ipv4":
        case "ipv6":
          const f = mh[t.format];
          (!h.value || !f.pattern.exec(h.value)) && n.problems.push({
            location: { offset: h.offset, length: h.length },
            message: t.patternErrorMessage || t.errorMessage || f.errorMessage
          });
      }
  }
  function u(h) {
    let f, m;
    i.schemaDraft >= Fe.v2020_12 ? (f = t.prefixItems, m = Array.isArray(t.items) ? void 0 : t.items) : (f = Array.isArray(t.items) ? t.items : void 0, m = Array.isArray(t.items) ? t.additionalItems : t.items);
    let g = 0;
    if (f !== void 0) {
      const C = Math.min(f.length, h.items.length);
      for (; g < C; g++) {
        const S = f[g], y = Ce(S), w = new pe(), b = h.items[g];
        b && (he(b, y, w, r, i), n.mergePropertyMatch(w)), n.processedProperties.add(String(g));
      }
    }
    if (m !== void 0 && g < h.items.length)
      if (typeof m == "boolean")
        for (m === !1 && n.problems.push({
          location: { offset: h.offset, length: h.length },
          message: k("Array has too many items according to schema. Expected {0} or fewer.", g)
        }); g < h.items.length; g++)
          n.processedProperties.add(String(g)), n.propertiesValueMatches++;
      else
        for (; g < h.items.length; g++) {
          const C = new pe();
          he(h.items[g], m, C, r, i), n.mergePropertyMatch(C), n.processedProperties.add(String(g));
        }
    const p = Ce(t.contains);
    if (p) {
      let C = 0;
      for (let S = 0; S < h.items.length; S++) {
        const y = h.items[S], w = new pe();
        he(y, p, w, un.instance, i), w.hasProblems() || (C++, i.schemaDraft >= Fe.v2020_12 && n.processedProperties.add(String(S)));
      }
      C === 0 && !ge(t.minContains) && n.problems.push({
        location: { offset: h.offset, length: h.length },
        message: t.errorMessage || k("Array does not contain required item.")
      }), ge(t.minContains) && C < t.minContains && n.problems.push({
        location: { offset: h.offset, length: h.length },
        message: t.errorMessage || k("Array has too few items that match the contains contraint. Expected {0} or more.", t.minContains)
      }), ge(t.maxContains) && C > t.maxContains && n.problems.push({
        location: { offset: h.offset, length: h.length },
        message: t.errorMessage || k("Array has too many items that match the contains contraint. Expected {0} or less.", t.maxContains)
      });
    }
    const v = t.unevaluatedItems;
    if (v !== void 0)
      for (let C = 0; C < h.items.length; C++) {
        if (!n.processedProperties.has(String(C)))
          if (v === !1)
            n.problems.push({
              location: { offset: h.offset, length: h.length },
              message: k("Item does not match any validation rule from the array.")
            });
          else {
            const S = new pe();
            he(h.items[C], t.unevaluatedItems, S, r, i), n.mergePropertyMatch(S);
          }
        n.processedProperties.add(String(C)), n.propertiesValueMatches++;
      }
    if (ge(t.minItems) && h.items.length < t.minItems && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Array has too few items. Expected {0} or more.", t.minItems)
    }), ge(t.maxItems) && h.items.length > t.maxItems && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Array has too many items. Expected {0} or fewer.", t.maxItems)
    }), t.uniqueItems === !0) {
      let C = function() {
        for (let y = 0; y < S.length - 1; y++) {
          const w = S[y];
          for (let b = y + 1; b < S.length; b++)
            if (Mt(w, S[b]))
              return !0;
        }
        return !1;
      };
      const S = mt(h);
      C() && n.problems.push({
        location: { offset: h.offset, length: h.length },
        message: k("Array has duplicate items.")
      });
    }
  }
  function d(h) {
    const f = /* @__PURE__ */ Object.create(null), m = /* @__PURE__ */ new Set();
    for (const y of h.properties) {
      const w = y.keyNode.value;
      f[w] = y.valueNode, m.add(w);
    }
    if (Array.isArray(t.required)) {
      for (const y of t.required)
        if (!f[y]) {
          const w = h.parent && h.parent.type === "property" && h.parent.keyNode, b = w ? { offset: w.offset, length: w.length } : { offset: h.offset, length: 1 };
          n.problems.push({
            location: b,
            message: k('Missing property "{0}".', y)
          });
        }
    }
    const g = (y) => {
      m.delete(y), n.processedProperties.add(y);
    };
    if (t.properties)
      for (const y of Object.keys(t.properties)) {
        g(y);
        const w = t.properties[y], b = f[y];
        if (b)
          if ($e(w))
            if (w)
              n.propertiesMatches++, n.propertiesValueMatches++;
            else {
              const L = b.parent;
              n.problems.push({
                location: { offset: L.keyNode.offset, length: L.keyNode.length },
                message: t.errorMessage || k("Property {0} is not allowed.", y)
              });
            }
          else {
            const L = new pe();
            he(b, w, L, r, i), n.mergePropertyMatch(L);
          }
      }
    if (t.patternProperties)
      for (const y of Object.keys(t.patternProperties)) {
        const w = Fn(y);
        if (w) {
          const b = [];
          for (const L of m)
            if (w.test(L)) {
              b.push(L);
              const x = f[L];
              if (x) {
                const T = t.patternProperties[y];
                if ($e(T))
                  if (T)
                    n.propertiesMatches++, n.propertiesValueMatches++;
                  else {
                    const I = x.parent;
                    n.problems.push({
                      location: { offset: I.keyNode.offset, length: I.keyNode.length },
                      message: t.errorMessage || k("Property {0} is not allowed.", L)
                    });
                  }
                else {
                  const I = new pe();
                  he(x, T, I, r, i), n.mergePropertyMatch(I);
                }
              }
            }
          b.forEach(g);
        }
      }
    const p = t.additionalProperties;
    if (p !== void 0)
      for (const y of m) {
        g(y);
        const w = f[y];
        if (w) {
          if (p === !1) {
            const b = w.parent;
            n.problems.push({
              location: { offset: b.keyNode.offset, length: b.keyNode.length },
              message: t.errorMessage || k("Property {0} is not allowed.", y)
            });
          } else if (p !== !0) {
            const b = new pe();
            he(w, p, b, r, i), n.mergePropertyMatch(b);
          }
        }
      }
    const v = t.unevaluatedProperties;
    if (v !== void 0) {
      const y = [];
      for (const w of m)
        if (!n.processedProperties.has(w)) {
          y.push(w);
          const b = f[w];
          if (b) {
            if (v === !1) {
              const L = b.parent;
              n.problems.push({
                location: { offset: L.keyNode.offset, length: L.keyNode.length },
                message: t.errorMessage || k("Property {0} is not allowed.", w)
              });
            } else if (v !== !0) {
              const L = new pe();
              he(b, v, L, r, i), n.mergePropertyMatch(L);
            }
          }
        }
      y.forEach(g);
    }
    if (ge(t.maxProperties) && h.properties.length > t.maxProperties && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Object has more properties than limit of {0}.", t.maxProperties)
    }), ge(t.minProperties) && h.properties.length < t.minProperties && n.problems.push({
      location: { offset: h.offset, length: h.length },
      message: k("Object has fewer properties than the required number of {0}", t.minProperties)
    }), t.dependentRequired)
      for (const y in t.dependentRequired) {
        const w = f[y], b = t.dependentRequired[y];
        w && Array.isArray(b) && S(y, b);
      }
    if (t.dependentSchemas)
      for (const y in t.dependentSchemas) {
        const w = f[y], b = t.dependentSchemas[y];
        w && nt(b) && S(y, b);
      }
    if (t.dependencies)
      for (const y in t.dependencies)
        f[y] && S(y, t.dependencies[y]);
    const C = Ce(t.propertyNames);
    if (C)
      for (const y of h.properties) {
        const w = y.keyNode;
        w && he(w, C, n, un.instance, i);
      }
    function S(y, w) {
      if (Array.isArray(w))
        for (const b of w)
          f[b] ? n.propertiesValueMatches++ : n.problems.push({
            location: { offset: h.offset, length: h.length },
            message: k("Object is missing property {0} required by property {1}.", b, y)
          });
      else {
        const b = Ce(w);
        if (b) {
          const L = new pe();
          he(h, b, L, r, i), n.mergePropertyMatch(L);
        }
      }
    }
  }
}
function Sh(e, t) {
  const n = [];
  let r = -1;
  const i = e.getText(), s = ft(i, !1), o = [];
  function a() {
    for (; ; ) {
      const b = s.scan();
      switch (d(), b) {
        case 12:
        case 13:
          Array.isArray(o) && o.push(j.create(e.positionAt(s.getTokenOffset()), e.positionAt(s.getTokenOffset() + s.getTokenLength())));
          break;
        case 15:
        case 14:
          break;
        default:
          return b;
      }
    }
  }
  function l(b, L, x, T, I = Ne.Error) {
    if (n.length === 0 || x !== r) {
      const q = j.create(e.positionAt(x), e.positionAt(T));
      n.push(Ge.create(q, b, I, L, e.languageId)), r = x;
    }
  }
  function u(b, L, x = void 0, T = [], I = []) {
    let q = s.getTokenOffset(), R = s.getTokenOffset() + s.getTokenLength();
    if (q === R && q > 0) {
      for (q--; q > 0 && /\s/.test(i.charAt(q)); )
        q--;
      R = q + 1;
    }
    if (l(b, L, q, R), x && h(x, !1), T.length + I.length > 0) {
      let E = s.getToken();
      for (; E !== 17; ) {
        if (T.indexOf(E) !== -1) {
          a();
          break;
        } else if (I.indexOf(E) !== -1)
          break;
        E = a();
      }
    }
    return x;
  }
  function d() {
    switch (s.getTokenError()) {
      case 4:
        return u(k("Invalid unicode sequence in string."), G.InvalidUnicode), !0;
      case 5:
        return u(k("Invalid escape character in string."), G.InvalidEscapeCharacter), !0;
      case 3:
        return u(k("Unexpected end of number."), G.UnexpectedEndOfNumber), !0;
      case 1:
        return u(k("Unexpected end of comment."), G.UnexpectedEndOfComment), !0;
      case 2:
        return u(k("Unexpected end of string."), G.UnexpectedEndOfString), !0;
      case 6:
        return u(k("Invalid characters in string. Control characters must be escaped."), G.InvalidCharacter), !0;
    }
    return !1;
  }
  function h(b, L) {
    return b.length = s.getTokenOffset() + s.getTokenLength() - b.offset, L && a(), b;
  }
  function f(b) {
    if (s.getToken() !== 3)
      return;
    const L = new ph(b, s.getTokenOffset());
    a();
    let x = !1;
    for (; s.getToken() !== 4 && s.getToken() !== 17; ) {
      if (s.getToken() === 5) {
        x || u(k("Value expected"), G.ValueExpected);
        const I = s.getTokenOffset();
        if (a(), s.getToken() === 4) {
          x && l(k("Trailing comma"), G.TrailingComma, I, I + 1);
          continue;
        }
      } else x && u(k("Expected comma"), G.CommaExpected);
      const T = y(L);
      T ? L.items.push(T) : u(k("Value expected"), G.ValueExpected, void 0, [], [
        4,
        5
        /* Json.SyntaxKind.CommaToken */
      ]), x = !0;
    }
    return s.getToken() !== 4 ? u(k("Expected comma or closing bracket"), G.CommaOrCloseBacketExpected, L) : h(L, !0);
  }
  const m = new Yn(void 0, 0, 0);
  function g(b, L) {
    const x = new yh(b, s.getTokenOffset(), m);
    let T = v(x);
    if (!T)
      if (s.getToken() === 16) {
        u(k("Property keys must be doublequoted"), G.PropertyKeysMustBeDoublequoted);
        const q = new Yn(x, s.getTokenOffset(), s.getTokenLength());
        q.value = s.getTokenValue(), T = q, a();
      } else
        return;
    if (x.keyNode = T, T.value !== "//") {
      const q = L[T.value];
      q ? (l(k("Duplicate object key"), G.DuplicateKey, x.keyNode.offset, x.keyNode.offset + x.keyNode.length, Ne.Warning), nt(q) && l(k("Duplicate object key"), G.DuplicateKey, q.keyNode.offset, q.keyNode.offset + q.keyNode.length, Ne.Warning), L[T.value] = !0) : L[T.value] = x;
    }
    if (s.getToken() === 6)
      x.colonOffset = s.getTokenOffset(), a();
    else if (u(k("Colon expected"), G.ColonExpected), s.getToken() === 10 && e.positionAt(T.offset + T.length).line < e.positionAt(s.getTokenOffset()).line)
      return x.length = T.length, x;
    const I = y(x);
    return I ? (x.valueNode = I, x.length = I.offset + I.length - x.offset, x) : u(k("Value expected"), G.ValueExpected, x, [], [
      2,
      5
      /* Json.SyntaxKind.CommaToken */
    ]);
  }
  function p(b) {
    if (s.getToken() !== 1)
      return;
    const L = new vh(b, s.getTokenOffset()), x = /* @__PURE__ */ Object.create(null);
    a();
    let T = !1;
    for (; s.getToken() !== 2 && s.getToken() !== 17; ) {
      if (s.getToken() === 5) {
        T || u(k("Property expected"), G.PropertyExpected);
        const q = s.getTokenOffset();
        if (a(), s.getToken() === 2) {
          T && l(k("Trailing comma"), G.TrailingComma, q, q + 1);
          continue;
        }
      } else T && u(k("Expected comma"), G.CommaExpected);
      const I = g(L, x);
      I ? L.properties.push(I) : u(k("Property expected"), G.PropertyExpected, void 0, [], [
        2,
        5
        /* Json.SyntaxKind.CommaToken */
      ]), T = !0;
    }
    return s.getToken() !== 2 ? u(k("Expected comma or closing brace"), G.CommaOrCloseBraceExpected, L) : h(L, !0);
  }
  function v(b) {
    if (s.getToken() !== 10)
      return;
    const L = new Yn(b, s.getTokenOffset());
    return L.value = s.getTokenValue(), h(L, !0);
  }
  function C(b) {
    if (s.getToken() !== 11)
      return;
    const L = new bh(b, s.getTokenOffset());
    if (s.getTokenError() === 0) {
      const x = s.getTokenValue();
      try {
        const T = JSON.parse(x);
        if (!ge(T))
          return u(k("Invalid number format."), G.Undefined, L);
        L.value = T;
      } catch {
        return u(k("Invalid number format."), G.Undefined, L);
      }
      L.isInteger = x.indexOf(".") === -1;
    }
    return h(L, !0);
  }
  function S(b) {
    switch (s.getToken()) {
      case 7:
        return h(new gh(b, s.getTokenOffset()), !0);
      case 8:
        return h(new wa(b, !0, s.getTokenOffset()), !0);
      case 9:
        return h(new wa(b, !1, s.getTokenOffset()), !0);
      default:
        return;
    }
  }
  function y(b) {
    return f(b) || p(b) || v(b) || C(b) || S(b);
  }
  let w;
  return a() !== 17 && (w = y(w), w ? s.getToken() !== 17 && u(k("End of file expected."), G.Undefined) : u(k("Expected a JSON object, array or literal."), G.Undefined)), new xl(w, n, o);
}
function Qr(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t + "	";
    if (Array.isArray(e)) {
      if (e.length === 0)
        return "[]";
      let i = `[
`;
      for (let s = 0; s < e.length; s++)
        i += r + Qr(e[s], r, n), s < e.length - 1 && (i += ","), i += `
`;
      return i += t + "]", i;
    } else {
      const i = Object.keys(e);
      if (i.length === 0)
        return "{}";
      let s = `{
`;
      for (let o = 0; o < i.length; o++) {
        const a = i[o];
        s += r + JSON.stringify(a) + ": " + Qr(e[a], r, n), o < i.length - 1 && (s += ","), s += `
`;
      }
      return s += t + "}", s;
    }
  }
  return n(e);
}
var xh = class {
  constructor(e, t = [], n = Promise, r = {}) {
    this.schemaService = e, this.contributions = t, this.promiseConstructor = n, this.clientCapabilities = r;
  }
  doResolve(e) {
    for (let t = this.contributions.length - 1; t >= 0; t--) {
      const n = this.contributions[t].resolveCompletion;
      if (n) {
        const r = n(e);
        if (r)
          return r;
      }
    }
    return this.promiseConstructor.resolve(e);
  }
  doComplete(e, t, n) {
    const r = {
      items: [],
      isIncomplete: !1
    }, i = e.getText(), s = e.offsetAt(t);
    let o = n.getNodeFromOffset(s, !0);
    if (this.isInComment(e, o ? o.offset : 0, s))
      return Promise.resolve(r);
    if (o && s === o.offset + o.length && s > 0) {
      const h = i[s - 1];
      (o.type === "object" && h === "}" || o.type === "array" && h === "]") && (o = o.parent);
    }
    const a = this.getCurrentWord(e, s);
    let l;
    if (o && (o.type === "string" || o.type === "number" || o.type === "boolean" || o.type === "null"))
      l = j.create(e.positionAt(o.offset), e.positionAt(o.offset + o.length));
    else {
      let h = s - a.length;
      h > 0 && i[h - 1] === '"' && h--, l = j.create(e.positionAt(h), t);
    }
    const u = /* @__PURE__ */ new Map(), d = {
      add: (h) => {
        let f = h.label;
        const m = u.get(f);
        if (m)
          m.documentation || (m.documentation = h.documentation), m.detail || (m.detail = h.detail), m.labelDetails || (m.labelDetails = h.labelDetails);
        else {
          if (f = f.replace(/[\n]/g, "↵"), f.length > 60) {
            const g = f.substr(0, 57).trim() + "...";
            u.has(g) || (f = g);
          }
          h.textEdit = Ue.replace(l, h.insertText), h.label = f, u.set(f, h), r.items.push(h);
        }
      },
      setAsIncomplete: () => {
        r.isIncomplete = !0;
      },
      error: (h) => {
        console.error(h);
      },
      getNumberOfProposals: () => r.items.length
    };
    return this.schemaService.getSchemaForResource(e.uri, n).then((h) => {
      const f = [];
      let m = !0, g = "", p;
      if (o && o.type === "string") {
        const C = o.parent;
        C && C.type === "property" && C.keyNode === o && (m = !C.valueNode, p = C, g = i.substr(o.offset + 1, o.length - 2), C && (o = C.parent));
      }
      if (o && o.type === "object") {
        if (o.offset === s)
          return r;
        o.properties.forEach((y) => {
          (!p || p !== y) && u.set(y.keyNode.value, jr.create("__"));
        });
        let C = "";
        m && (C = this.evaluateSeparatorAfter(e, e.offsetAt(l.end))), h ? this.getPropertyCompletions(h, n, o, m, C, d) : this.getSchemaLessPropertyCompletions(n, o, g, d);
        const S = Xr(o);
        this.contributions.forEach((y) => {
          const w = y.collectPropertyCompletions(e.uri, S, a, m, C === "", d);
          w && f.push(w);
        }), !h && a.length > 0 && i.charAt(s - a.length - 1) !== '"' && (d.add({
          kind: Se.Property,
          label: this.getLabelForValue(a),
          insertText: this.getInsertTextForProperty(a, void 0, !1, C),
          insertTextFormat: oe.Snippet,
          documentation: ""
        }), d.setAsIncomplete());
      }
      const v = {};
      return h ? this.getValueCompletions(h, n, o, s, e, d, v) : this.getSchemaLessValueCompletions(n, o, s, e, d), this.contributions.length > 0 && this.getContributedValueCompletions(n, o, s, e, d, f), this.promiseConstructor.all(f).then(() => {
        if (d.getNumberOfProposals() === 0) {
          let C = s;
          o && (o.type === "string" || o.type === "number" || o.type === "boolean" || o.type === "null") && (C = o.offset + o.length);
          const S = this.evaluateSeparatorAfter(e, C);
          this.addFillerValueCompletions(v, S, d);
        }
        return r;
      });
    });
  }
  getPropertyCompletions(e, t, n, r, i, s) {
    t.getMatchingSchemas(e.schema, n.offset).forEach((o) => {
      if (o.node === n && !o.inverted) {
        const a = o.schema.properties;
        a && Object.keys(a).forEach((u) => {
          const d = a[u];
          if (typeof d == "object" && !d.deprecationMessage && !d.doNotSuggest) {
            const h = {
              kind: Se.Property,
              label: u,
              insertText: this.getInsertTextForProperty(u, d, r, i),
              insertTextFormat: oe.Snippet,
              filterText: this.getFilterTextForValue(u),
              documentation: this.fromMarkup(d.markdownDescription) || d.description || ""
            };
            d.suggestSortText !== void 0 && (h.sortText = d.suggestSortText), h.insertText && an(h.insertText, `$1${i}`) && (h.command = {
              title: "Suggest",
              command: "editor.action.triggerSuggest"
            }), s.add(h);
          }
        });
        const l = o.schema.propertyNames;
        if (typeof l == "object" && !l.deprecationMessage && !l.doNotSuggest) {
          const u = (d, h = void 0) => {
            const f = {
              kind: Se.Property,
              label: d,
              insertText: this.getInsertTextForProperty(d, void 0, r, i),
              insertTextFormat: oe.Snippet,
              filterText: this.getFilterTextForValue(d),
              documentation: h || this.fromMarkup(l.markdownDescription) || l.description || ""
            };
            l.suggestSortText !== void 0 && (f.sortText = l.suggestSortText), f.insertText && an(f.insertText, `$1${i}`) && (f.command = {
              title: "Suggest",
              command: "editor.action.triggerSuggest"
            }), s.add(f);
          };
          if (l.enum)
            for (let d = 0; d < l.enum.length; d++) {
              let h;
              l.markdownEnumDescriptions && d < l.markdownEnumDescriptions.length ? h = this.fromMarkup(l.markdownEnumDescriptions[d]) : l.enumDescriptions && d < l.enumDescriptions.length && (h = l.enumDescriptions[d]), u(l.enum[d], h);
            }
          l.const && u(l.const);
        }
      }
    });
  }
  getSchemaLessPropertyCompletions(e, t, n, r) {
    const i = (s) => {
      s.properties.forEach((o) => {
        const a = o.keyNode.value;
        r.add({
          kind: Se.Property,
          label: a,
          insertText: this.getInsertTextForValue(a, ""),
          insertTextFormat: oe.Snippet,
          filterText: this.getFilterTextForValue(a),
          documentation: ""
        });
      });
    };
    if (t.parent)
      if (t.parent.type === "property") {
        const s = t.parent.keyNode.value;
        e.visit((o) => (o.type === "property" && o !== t.parent && o.keyNode.value === s && o.valueNode && o.valueNode.type === "object" && i(o.valueNode), !0));
      } else t.parent.type === "array" && t.parent.items.forEach((s) => {
        s.type === "object" && s !== t && i(s);
      });
    else t.type === "object" && r.add({
      kind: Se.Property,
      label: "$schema",
      insertText: this.getInsertTextForProperty("$schema", void 0, !0, ""),
      insertTextFormat: oe.Snippet,
      documentation: "",
      filterText: this.getFilterTextForValue("$schema")
    });
  }
  getSchemaLessValueCompletions(e, t, n, r, i) {
    let s = n;
    if (t && (t.type === "string" || t.type === "number" || t.type === "boolean" || t.type === "null") && (s = t.offset + t.length, t = t.parent), !t) {
      i.add({
        kind: this.getSuggestionKind("object"),
        label: "Empty object",
        insertText: this.getInsertTextForValue({}, ""),
        insertTextFormat: oe.Snippet,
        documentation: ""
      }), i.add({
        kind: this.getSuggestionKind("array"),
        label: "Empty array",
        insertText: this.getInsertTextForValue([], ""),
        insertTextFormat: oe.Snippet,
        documentation: ""
      });
      return;
    }
    const o = this.evaluateSeparatorAfter(r, s), a = (l) => {
      l.parent && !Sl(l.parent, n, !0) && i.add({
        kind: this.getSuggestionKind(l.type),
        label: this.getLabelTextForMatchingNode(l, r),
        insertText: this.getInsertTextForMatchingNode(l, r, o),
        insertTextFormat: oe.Snippet,
        documentation: ""
      }), l.type === "boolean" && this.addBooleanValueCompletion(!l.value, o, i);
    };
    if (t.type === "property" && n > (t.colonOffset || 0)) {
      const l = t.valueNode;
      if (l && (n > l.offset + l.length || l.type === "object" || l.type === "array"))
        return;
      const u = t.keyNode.value;
      e.visit((d) => (d.type === "property" && d.keyNode.value === u && d.valueNode && a(d.valueNode), !0)), u === "$schema" && t.parent && !t.parent.parent && this.addDollarSchemaCompletions(o, i);
    }
    if (t.type === "array")
      if (t.parent && t.parent.type === "property") {
        const l = t.parent.keyNode.value;
        e.visit((u) => (u.type === "property" && u.keyNode.value === l && u.valueNode && u.valueNode.type === "array" && u.valueNode.items.forEach(a), !0));
      } else
        t.items.forEach(a);
  }
  getValueCompletions(e, t, n, r, i, s, o) {
    let a = r, l, u;
    if (n && (n.type === "string" || n.type === "number" || n.type === "boolean" || n.type === "null") && (a = n.offset + n.length, u = n, n = n.parent), !n) {
      this.addSchemaValueCompletions(e.schema, "", s, o);
      return;
    }
    if (n.type === "property" && r > (n.colonOffset || 0)) {
      const d = n.valueNode;
      if (d && r > d.offset + d.length)
        return;
      l = n.keyNode.value, n = n.parent;
    }
    if (n && (l !== void 0 || n.type === "array")) {
      const d = this.evaluateSeparatorAfter(i, a), h = t.getMatchingSchemas(e.schema, n.offset, u);
      for (const f of h)
        if (f.node === n && !f.inverted && f.schema) {
          if (n.type === "array" && f.schema.items) {
            let m = s;
            if (f.schema.uniqueItems) {
              const g = /* @__PURE__ */ new Set();
              n.children.forEach((p) => {
                p.type !== "array" && p.type !== "object" && g.add(this.getLabelForValue(mt(p)));
              }), m = {
                ...s,
                add(p) {
                  g.has(p.label) || s.add(p);
                }
              };
            }
            if (Array.isArray(f.schema.items)) {
              const g = this.findItemAtOffset(n, i, r);
              g < f.schema.items.length && this.addSchemaValueCompletions(f.schema.items[g], d, m, o);
            } else
              this.addSchemaValueCompletions(f.schema.items, d, m, o);
          }
          if (l !== void 0) {
            let m = !1;
            if (f.schema.properties) {
              const g = f.schema.properties[l];
              g && (m = !0, this.addSchemaValueCompletions(g, d, s, o));
            }
            if (f.schema.patternProperties && !m)
              for (const g of Object.keys(f.schema.patternProperties)) {
                const p = Fn(g);
                if (p != null && p.test(l)) {
                  m = !0;
                  const v = f.schema.patternProperties[g];
                  this.addSchemaValueCompletions(v, d, s, o);
                }
              }
            if (f.schema.additionalProperties && !m) {
              const g = f.schema.additionalProperties;
              this.addSchemaValueCompletions(g, d, s, o);
            }
          }
        }
      l === "$schema" && !n.parent && this.addDollarSchemaCompletions(d, s), o.boolean && (this.addBooleanValueCompletion(!0, d, s), this.addBooleanValueCompletion(!1, d, s)), o.null && this.addNullValueCompletion(d, s);
    }
  }
  getContributedValueCompletions(e, t, n, r, i, s) {
    if (!t)
      this.contributions.forEach((o) => {
        const a = o.collectDefaultCompletions(r.uri, i);
        a && s.push(a);
      });
    else if ((t.type === "string" || t.type === "number" || t.type === "boolean" || t.type === "null") && (t = t.parent), t && t.type === "property" && n > (t.colonOffset || 0)) {
      const o = t.keyNode.value, a = t.valueNode;
      if ((!a || n <= a.offset + a.length) && t.parent) {
        const l = Xr(t.parent);
        this.contributions.forEach((u) => {
          const d = u.collectValueCompletions(r.uri, l, o, i);
          d && s.push(d);
        });
      }
    }
  }
  addSchemaValueCompletions(e, t, n, r) {
    typeof e == "object" && (this.addEnumValueCompletions(e, t, n), this.addDefaultValueCompletions(e, t, n), this.collectTypes(e, r), Array.isArray(e.allOf) && e.allOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)), Array.isArray(e.anyOf) && e.anyOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)), Array.isArray(e.oneOf) && e.oneOf.forEach((i) => this.addSchemaValueCompletions(i, t, n, r)));
  }
  addDefaultValueCompletions(e, t, n, r = 0) {
    let i = !1;
    if (Pe(e.default)) {
      let s = e.type, o = e.default;
      for (let l = r; l > 0; l--)
        o = [o], s = "array";
      const a = {
        kind: this.getSuggestionKind(s),
        label: this.getLabelForValue(o),
        insertText: this.getInsertTextForValue(o, t),
        insertTextFormat: oe.Snippet
      };
      this.doesSupportsLabelDetails() ? a.labelDetails = { description: k("Default value") } : a.detail = k("Default value"), n.add(a), i = !0;
    }
    Array.isArray(e.examples) && e.examples.forEach((s) => {
      let o = e.type, a = s;
      for (let l = r; l > 0; l--)
        a = [a], o = "array";
      n.add({
        kind: this.getSuggestionKind(o),
        label: this.getLabelForValue(a),
        insertText: this.getInsertTextForValue(a, t),
        insertTextFormat: oe.Snippet
      }), i = !0;
    }), Array.isArray(e.defaultSnippets) && e.defaultSnippets.forEach((s) => {
      let o = e.type, a = s.body, l = s.label, u, d;
      if (Pe(a)) {
        e.type;
        for (let h = r; h > 0; h--)
          a = [a];
        u = this.getInsertTextForSnippetValue(a, t), d = this.getFilterTextForSnippetValue(a), l = l || this.getLabelForSnippetValue(a);
      } else if (typeof s.bodyText == "string") {
        let h = "", f = "", m = "";
        for (let g = r; g > 0; g--)
          h = h + m + `[
`, f = f + `
` + m + "]", m += "	", o = "array";
        u = h + m + s.bodyText.split(`
`).join(`
` + m) + f + t, l = l || u, d = u.replace(/[\n]/g, "");
      } else
        return;
      n.add({
        kind: this.getSuggestionKind(o),
        label: l,
        documentation: this.fromMarkup(s.markdownDescription) || s.description,
        insertText: u,
        insertTextFormat: oe.Snippet,
        filterText: d
      }), i = !0;
    }), !i && typeof e.items == "object" && !Array.isArray(e.items) && r < 5 && this.addDefaultValueCompletions(e.items, t, n, r + 1);
  }
  addEnumValueCompletions(e, t, n) {
    if (Pe(e.const) && n.add({
      kind: this.getSuggestionKind(e.type),
      label: this.getLabelForValue(e.const),
      insertText: this.getInsertTextForValue(e.const, t),
      insertTextFormat: oe.Snippet,
      documentation: this.fromMarkup(e.markdownDescription) || e.description
    }), Array.isArray(e.enum))
      for (let r = 0, i = e.enum.length; r < i; r++) {
        const s = e.enum[r];
        let o = this.fromMarkup(e.markdownDescription) || e.description;
        e.markdownEnumDescriptions && r < e.markdownEnumDescriptions.length && this.doesSupportMarkdown() ? o = this.fromMarkup(e.markdownEnumDescriptions[r]) : e.enumDescriptions && r < e.enumDescriptions.length && (o = e.enumDescriptions[r]), n.add({
          kind: this.getSuggestionKind(e.type),
          label: this.getLabelForValue(s),
          insertText: this.getInsertTextForValue(s, t),
          insertTextFormat: oe.Snippet,
          documentation: o
        });
      }
  }
  collectTypes(e, t) {
    if (Array.isArray(e.enum) || Pe(e.const))
      return;
    const n = e.type;
    Array.isArray(n) ? n.forEach((r) => t[r] = !0) : n && (t[n] = !0);
  }
  addFillerValueCompletions(e, t, n) {
    e.object && n.add({
      kind: this.getSuggestionKind("object"),
      label: "{}",
      insertText: this.getInsertTextForGuessedValue({}, t),
      insertTextFormat: oe.Snippet,
      detail: k("New object"),
      documentation: ""
    }), e.array && n.add({
      kind: this.getSuggestionKind("array"),
      label: "[]",
      insertText: this.getInsertTextForGuessedValue([], t),
      insertTextFormat: oe.Snippet,
      detail: k("New array"),
      documentation: ""
    });
  }
  addBooleanValueCompletion(e, t, n) {
    n.add({
      kind: this.getSuggestionKind("boolean"),
      label: e ? "true" : "false",
      insertText: this.getInsertTextForValue(e, t),
      insertTextFormat: oe.Snippet,
      documentation: ""
    });
  }
  addNullValueCompletion(e, t) {
    t.add({
      kind: this.getSuggestionKind("null"),
      label: "null",
      insertText: "null" + e,
      insertTextFormat: oe.Snippet,
      documentation: ""
    });
  }
  addDollarSchemaCompletions(e, t) {
    this.schemaService.getRegisteredSchemaIds((n) => n === "http" || n === "https").forEach((n) => {
      n.startsWith("http://json-schema.org/draft-") && (n = n + "#"), t.add({
        kind: Se.Module,
        label: this.getLabelForValue(n),
        filterText: this.getFilterTextForValue(n),
        insertText: this.getInsertTextForValue(n, e),
        insertTextFormat: oe.Snippet,
        documentation: ""
      });
    });
  }
  getLabelForValue(e) {
    return JSON.stringify(e);
  }
  getValueFromLabel(e) {
    return JSON.parse(e);
  }
  getFilterTextForValue(e) {
    return JSON.stringify(e);
  }
  getFilterTextForSnippetValue(e) {
    return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
  }
  getLabelForSnippetValue(e) {
    return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1");
  }
  getInsertTextForPlainText(e) {
    return e.replace(/[\\\$\}]/g, "\\$&");
  }
  getInsertTextForValue(e, t) {
    const n = JSON.stringify(e, null, "	");
    return n === "{}" ? "{$1}" + t : n === "[]" ? "[$1]" + t : this.getInsertTextForPlainText(n + t);
  }
  getInsertTextForSnippetValue(e, t) {
    return Qr(e, "", (n) => typeof n == "string" && n[0] === "^" ? n.substr(1) : JSON.stringify(n)) + t;
  }
  getInsertTextForGuessedValue(e, t) {
    switch (typeof e) {
      case "object":
        return e === null ? "${1:null}" + t : this.getInsertTextForValue(e, t);
      case "string":
        let n = JSON.stringify(e);
        return n = n.substr(1, n.length - 2), n = this.getInsertTextForPlainText(n), '"${1:' + n + '}"' + t;
      case "number":
      case "boolean":
        return "${1:" + JSON.stringify(e) + "}" + t;
    }
    return this.getInsertTextForValue(e, t);
  }
  getSuggestionKind(e) {
    if (Array.isArray(e)) {
      const t = e;
      e = t.length > 0 ? t[0] : void 0;
    }
    if (!e)
      return Se.Value;
    switch (e) {
      case "string":
        return Se.Value;
      case "object":
        return Se.Module;
      case "property":
        return Se.Property;
      default:
        return Se.Value;
    }
  }
  getLabelTextForMatchingNode(e, t) {
    switch (e.type) {
      case "array":
        return "[]";
      case "object":
        return "{}";
      default:
        return t.getText().substr(e.offset, e.length);
    }
  }
  getInsertTextForMatchingNode(e, t, n) {
    switch (e.type) {
      case "array":
        return this.getInsertTextForValue([], n);
      case "object":
        return this.getInsertTextForValue({}, n);
      default:
        const r = t.getText().substr(e.offset, e.length) + n;
        return this.getInsertTextForPlainText(r);
    }
  }
  getInsertTextForProperty(e, t, n, r) {
    const i = this.getInsertTextForValue(e, "");
    if (!n)
      return i;
    const s = i + ": ";
    let o, a = 0;
    if (t) {
      if (Array.isArray(t.defaultSnippets)) {
        if (t.defaultSnippets.length === 1) {
          const l = t.defaultSnippets[0].body;
          Pe(l) && (o = this.getInsertTextForSnippetValue(l, ""));
        }
        a += t.defaultSnippets.length;
      }
      if (t.enum && (!o && t.enum.length === 1 && (o = this.getInsertTextForGuessedValue(t.enum[0], "")), a += t.enum.length), Pe(t.const) && (o || (o = this.getInsertTextForGuessedValue(t.const, "")), a++), Pe(t.default) && (o || (o = this.getInsertTextForGuessedValue(t.default, "")), a++), Array.isArray(t.examples) && t.examples.length && (o || (o = this.getInsertTextForGuessedValue(t.examples[0], "")), a += t.examples.length), a === 0) {
        let l = Array.isArray(t.type) ? t.type[0] : t.type;
        switch (l || (t.properties ? l = "object" : t.items && (l = "array")), l) {
          case "boolean":
            o = "$1";
            break;
          case "string":
            o = '"$1"';
            break;
          case "object":
            o = "{$1}";
            break;
          case "array":
            o = "[$1]";
            break;
          case "number":
          case "integer":
            o = "${1:0}";
            break;
          case "null":
            o = "${1:null}";
            break;
          default:
            return i;
        }
      }
    }
    return (!o || a > 1) && (o = "$1"), s + o + r;
  }
  getCurrentWord(e, t) {
    let n = t - 1;
    const r = e.getText();
    for (; n >= 0 && ` 	
\r\v":{[,]}`.indexOf(r.charAt(n)) === -1; )
      n--;
    return r.substring(n + 1, t);
  }
  evaluateSeparatorAfter(e, t) {
    const n = ft(e.getText(), !0);
    switch (n.setPosition(t), n.scan()) {
      case 5:
      case 2:
      case 4:
      case 17:
        return "";
      default:
        return ",";
    }
  }
  findItemAtOffset(e, t, n) {
    const r = ft(t.getText(), !0), i = e.items;
    for (let s = i.length - 1; s >= 0; s--) {
      const o = i[s];
      if (n > o.offset + o.length)
        return r.setPosition(o.offset + o.length), r.scan() === 5 && n >= r.getTokenOffset() + r.getTokenLength() ? s + 1 : s;
      if (n >= o.offset)
        return s;
    }
    return 0;
  }
  isInComment(e, t, n) {
    const r = ft(e.getText(), !1);
    r.setPosition(t);
    let i = r.scan();
    for (; i !== 17 && r.getTokenOffset() + r.getTokenLength() < n; )
      i = r.scan();
    return (i === 12 || i === 13) && r.getTokenOffset() <= n;
  }
  fromMarkup(e) {
    if (e && this.doesSupportMarkdown())
      return {
        kind: gt.Markdown,
        value: e
      };
  }
  doesSupportMarkdown() {
    var e, t, n;
    if (!Pe(this.supportsMarkdown)) {
      const r = (n = (t = (e = this.clientCapabilities.textDocument) == null ? void 0 : e.completion) == null ? void 0 : t.completionItem) == null ? void 0 : n.documentationFormat;
      this.supportsMarkdown = Array.isArray(r) && r.indexOf(gt.Markdown) !== -1;
    }
    return this.supportsMarkdown;
  }
  doesSupportsCommitCharacters() {
    var e, t, n;
    return Pe(this.supportsCommitCharacters) || (this.labelDetailsSupport = (n = (t = (e = this.clientCapabilities.textDocument) == null ? void 0 : e.completion) == null ? void 0 : t.completionItem) == null ? void 0 : n.commitCharactersSupport), this.supportsCommitCharacters;
  }
  doesSupportsLabelDetails() {
    var e, t, n;
    return Pe(this.labelDetailsSupport) || (this.labelDetailsSupport = (n = (t = (e = this.clientCapabilities.textDocument) == null ? void 0 : e.completion) == null ? void 0 : t.completionItem) == null ? void 0 : n.labelDetailsSupport), this.labelDetailsSupport;
  }
}, Nh = class {
  constructor(e, t = [], n) {
    this.schemaService = e, this.contributions = t, this.promise = n || Promise;
  }
  doHover(e, t, n) {
    const r = e.offsetAt(t);
    let i = n.getNodeFromOffset(r);
    if (!i || (i.type === "object" || i.type === "array") && r > i.offset + 1 && r < i.offset + i.length - 1)
      return this.promise.resolve(null);
    const s = i;
    if (i.type === "string") {
      const u = i.parent;
      if (u && u.type === "property" && u.keyNode === i && (i = u.valueNode, !i))
        return this.promise.resolve(null);
    }
    const o = j.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)), a = (u) => ({
      contents: u,
      range: o
    }), l = Xr(i);
    for (let u = this.contributions.length - 1; u >= 0; u--) {
      const d = this.contributions[u].getInfoContribution(e.uri, l);
      if (d)
        return d.then((h) => a(h));
    }
    return this.schemaService.getSchemaForResource(e.uri, n).then((u) => {
      if (u && i) {
        const d = n.getMatchingSchemas(u.schema, i.offset);
        let h, f, m, g;
        d.every((v) => {
          if (v.node === i && !v.inverted && v.schema && (h = h || v.schema.title, f = f || v.schema.markdownDescription || er(v.schema.description), v.schema.enum)) {
            const C = v.schema.enum.indexOf(mt(i));
            v.schema.markdownEnumDescriptions ? m = v.schema.markdownEnumDescriptions[C] : v.schema.enumDescriptions && (m = er(v.schema.enumDescriptions[C])), m && (g = v.schema.enum[C], typeof g != "string" && (g = JSON.stringify(g)));
          }
          return !0;
        });
        let p = "";
        return h && (p = er(h)), f && (p.length > 0 && (p += `

`), p += f), m && (p.length > 0 && (p += `

`), p += `\`${Eh(g)}\`: ${m}`), a([p]);
      }
      return null;
    });
  }
};
function er(e) {
  if (e)
    return e.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, `$1

$3`).replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
}
function Eh(e) {
  return e.indexOf("`") !== -1 ? "`` " + e + " ``" : e;
}
var _h = class {
  constructor(e, t) {
    this.jsonSchemaService = e, this.promise = t, this.validationEnabled = !0;
  }
  configure(e) {
    e && (this.validationEnabled = e.validate !== !1, this.commentSeverity = e.allowComments ? void 0 : Ne.Error);
  }
  doValidation(e, t, n, r) {
    if (!this.validationEnabled)
      return this.promise.resolve([]);
    const i = [], s = {}, o = (l) => {
      const u = l.range.start.line + " " + l.range.start.character + " " + l.message;
      s[u] || (s[u] = !0, i.push(l));
    }, a = (l) => {
      let u = n != null && n.trailingCommas ? pn(n.trailingCommas) : Ne.Error, d = n != null && n.comments ? pn(n.comments) : this.commentSeverity, h = n != null && n.schemaValidation ? pn(n.schemaValidation) : Ne.Warning, f = n != null && n.schemaRequest ? pn(n.schemaRequest) : Ne.Warning;
      if (l) {
        const m = (g, p) => {
          if (t.root && f) {
            const v = t.root, C = v.type === "object" ? v.properties[0] : void 0;
            if (C && C.keyNode.value === "$schema") {
              const S = C.valueNode || C, y = j.create(e.positionAt(S.offset), e.positionAt(S.offset + S.length));
              o(Ge.create(y, g, f, p));
            } else {
              const S = j.create(e.positionAt(v.offset), e.positionAt(v.offset + 1));
              o(Ge.create(S, g, f, p));
            }
          }
        };
        if (l.errors.length)
          m(l.errors[0], G.SchemaResolveError);
        else if (h) {
          for (const p of l.warnings)
            m(p, G.SchemaUnsupportedFeature);
          const g = t.validate(e, l.schema, h, n == null ? void 0 : n.schemaDraft);
          g && g.forEach(o);
        }
        Nl(l.schema) && (d = void 0), El(l.schema) && (u = void 0);
      }
      for (const m of t.syntaxErrors) {
        if (m.code === G.TrailingComma) {
          if (typeof u != "number")
            continue;
          m.severity = u;
        }
        o(m);
      }
      if (typeof d == "number") {
        const m = k("Comments are not permitted in JSON.");
        t.comments.forEach((g) => {
          o(Ge.create(g, m, d, G.CommentNotPermitted));
        });
      }
      return i;
    };
    if (r) {
      const l = r.id || "schemaservice://untitled/" + Ah++;
      return this.jsonSchemaService.registerExternalSchema({ uri: l, schema: r }).getResolvedSchema().then((u) => a(u));
    }
    return this.jsonSchemaService.getSchemaForResource(e.uri, t).then((l) => a(l));
  }
  getLanguageStatus(e, t) {
    return { schemas: this.jsonSchemaService.getSchemaURIsForResource(e.uri, t) };
  }
}, Ah = 0;
function Nl(e) {
  if (e && typeof e == "object") {
    if ($e(e.allowComments))
      return e.allowComments;
    if (e.allOf)
      for (const t of e.allOf) {
        const n = Nl(t);
        if ($e(n))
          return n;
      }
  }
}
function El(e) {
  if (e && typeof e == "object") {
    if ($e(e.allowTrailingCommas))
      return e.allowTrailingCommas;
    const t = e;
    if ($e(t.allowsTrailingCommas))
      return t.allowsTrailingCommas;
    if (e.allOf)
      for (const n of e.allOf) {
        const r = El(n);
        if ($e(r))
          return r;
      }
  }
}
function pn(e) {
  switch (e) {
    case "error":
      return Ne.Error;
    case "warning":
      return Ne.Warning;
    case "ignore":
      return;
  }
}
var xa = 48, Rh = 57, kh = 65, bn = 97, Th = 102;
function ie(e) {
  return e < xa ? 0 : e <= Rh ? e - xa : (e < bn && (e += bn - kh), e >= bn && e <= Th ? e - bn + 10 : 0);
}
function Mh(e) {
  if (e[0] === "#")
    switch (e.length) {
      case 4:
        return {
          red: ie(e.charCodeAt(1)) * 17 / 255,
          green: ie(e.charCodeAt(2)) * 17 / 255,
          blue: ie(e.charCodeAt(3)) * 17 / 255,
          alpha: 1
        };
      case 5:
        return {
          red: ie(e.charCodeAt(1)) * 17 / 255,
          green: ie(e.charCodeAt(2)) * 17 / 255,
          blue: ie(e.charCodeAt(3)) * 17 / 255,
          alpha: ie(e.charCodeAt(4)) * 17 / 255
        };
      case 7:
        return {
          red: (ie(e.charCodeAt(1)) * 16 + ie(e.charCodeAt(2))) / 255,
          green: (ie(e.charCodeAt(3)) * 16 + ie(e.charCodeAt(4))) / 255,
          blue: (ie(e.charCodeAt(5)) * 16 + ie(e.charCodeAt(6))) / 255,
          alpha: 1
        };
      case 9:
        return {
          red: (ie(e.charCodeAt(1)) * 16 + ie(e.charCodeAt(2))) / 255,
          green: (ie(e.charCodeAt(3)) * 16 + ie(e.charCodeAt(4))) / 255,
          blue: (ie(e.charCodeAt(5)) * 16 + ie(e.charCodeAt(6))) / 255,
          alpha: (ie(e.charCodeAt(7)) * 16 + ie(e.charCodeAt(8))) / 255
        };
    }
}
var Oh = class {
  constructor(e) {
    this.schemaService = e;
  }
  findDocumentSymbols(e, t, n = { resultLimit: Number.MAX_VALUE }) {
    const r = t.root;
    if (!r)
      return [];
    let i = n.resultLimit || Number.MAX_VALUE;
    const s = e.uri;
    if ((s === "vscode://defaultsettings/keybindings.json" || an(s.toLowerCase(), "/user/keybindings.json")) && r.type === "array") {
      const h = [];
      for (const f of r.items)
        if (f.type === "object") {
          for (const m of f.properties)
            if (m.keyNode.value === "key" && m.valueNode) {
              const g = Dt.create(e.uri, Ye(e, f));
              if (h.push({ name: Na(m.valueNode), kind: qe.Function, location: g }), i--, i <= 0)
                return n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), h;
            }
        }
      return h;
    }
    const o = [
      { node: r, containerName: "" }
    ];
    let a = 0, l = !1;
    const u = [], d = (h, f) => {
      h.type === "array" ? h.items.forEach((m) => {
        m && o.push({ node: m, containerName: f });
      }) : h.type === "object" && h.properties.forEach((m) => {
        const g = m.valueNode;
        if (g)
          if (i > 0) {
            i--;
            const p = Dt.create(e.uri, Ye(e, m)), v = f ? f + "." + m.keyNode.value : m.keyNode.value;
            u.push({ name: this.getKeyLabel(m), kind: this.getSymbolKind(g.type), location: p, containerName: f }), o.push({ node: g, containerName: v });
          } else
            l = !0;
      });
    };
    for (; a < o.length; ) {
      const h = o[a++];
      d(h.node, h.containerName);
    }
    return l && n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), u;
  }
  findDocumentSymbols2(e, t, n = { resultLimit: Number.MAX_VALUE }) {
    const r = t.root;
    if (!r)
      return [];
    let i = n.resultLimit || Number.MAX_VALUE;
    const s = e.uri;
    if ((s === "vscode://defaultsettings/keybindings.json" || an(s.toLowerCase(), "/user/keybindings.json")) && r.type === "array") {
      const h = [];
      for (const f of r.items)
        if (f.type === "object") {
          for (const m of f.properties)
            if (m.keyNode.value === "key" && m.valueNode) {
              const g = Ye(e, f), p = Ye(e, m.keyNode);
              if (h.push({ name: Na(m.valueNode), kind: qe.Function, range: g, selectionRange: p }), i--, i <= 0)
                return n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), h;
            }
        }
      return h;
    }
    const o = [], a = [
      { node: r, result: o }
    ];
    let l = 0, u = !1;
    const d = (h, f) => {
      h.type === "array" ? h.items.forEach((m, g) => {
        if (m)
          if (i > 0) {
            i--;
            const p = Ye(e, m), v = p, C = { name: String(g), kind: this.getSymbolKind(m.type), range: p, selectionRange: v, children: [] };
            f.push(C), a.push({ result: C.children, node: m });
          } else
            u = !0;
      }) : h.type === "object" && h.properties.forEach((m) => {
        const g = m.valueNode;
        if (g)
          if (i > 0) {
            i--;
            const p = Ye(e, m), v = Ye(e, m.keyNode), C = [], S = { name: this.getKeyLabel(m), kind: this.getSymbolKind(g.type), range: p, selectionRange: v, children: C, detail: this.getDetail(g) };
            f.push(S), a.push({ result: C, node: g });
          } else
            u = !0;
      });
    };
    for (; l < a.length; ) {
      const h = a[l++];
      d(h.node, h.result);
    }
    return u && n && n.onResultLimitExceeded && n.onResultLimitExceeded(s), o;
  }
  getSymbolKind(e) {
    switch (e) {
      case "object":
        return qe.Module;
      case "string":
        return qe.String;
      case "number":
        return qe.Number;
      case "array":
        return qe.Array;
      case "boolean":
        return qe.Boolean;
      default:
        return qe.Variable;
    }
  }
  getKeyLabel(e) {
    let t = e.keyNode.value;
    return t && (t = t.replace(/[\n]/g, "↵")), t && t.trim() ? t : `"${t}"`;
  }
  getDetail(e) {
    if (e) {
      if (e.type === "boolean" || e.type === "number" || e.type === "null" || e.type === "string")
        return String(e.value);
      if (e.type === "array")
        return e.children.length ? void 0 : "[]";
      if (e.type === "object")
        return e.children.length ? void 0 : "{}";
    }
  }
  findDocumentColors(e, t, n) {
    return this.schemaService.getSchemaForResource(e.uri, t).then((r) => {
      const i = [];
      if (r) {
        let s = n && typeof n.resultLimit == "number" ? n.resultLimit : Number.MAX_VALUE;
        const o = t.getMatchingSchemas(r.schema), a = {};
        for (const l of o)
          if (!l.inverted && l.schema && (l.schema.format === "color" || l.schema.format === "color-hex") && l.node && l.node.type === "string") {
            const u = String(l.node.offset);
            if (!a[u]) {
              const d = Mh(mt(l.node));
              if (d) {
                const h = Ye(e, l.node);
                i.push({ color: d, range: h });
              }
              if (a[u] = !0, s--, s <= 0)
                return n && n.onResultLimitExceeded && n.onResultLimitExceeded(e.uri), i;
            }
          }
      }
      return i;
    });
  }
  getColorPresentations(e, t, n, r) {
    const i = [], s = Math.round(n.red * 255), o = Math.round(n.green * 255), a = Math.round(n.blue * 255);
    function l(d) {
      const h = d.toString(16);
      return h.length !== 2 ? "0" + h : h;
    }
    let u;
    return n.alpha === 1 ? u = `#${l(s)}${l(o)}${l(a)}` : u = `#${l(s)}${l(o)}${l(a)}${l(Math.round(n.alpha * 255))}`, i.push({ label: u, textEdit: Ue.replace(r, JSON.stringify(u)) }), i;
  }
};
function Ye(e, t) {
  return j.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length));
}
function Na(e) {
  return mt(e) || k("<empty>");
}
var Zr = {
  schemaAssociations: [],
  schemas: {
    // bundle the schema-schema to include (localized) descriptions
    "http://json-schema.org/draft-04/schema#": {
      $schema: "http://json-schema.org/draft-04/schema#",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: {
            $ref: "#"
          }
        },
        positiveInteger: {
          type: "integer",
          minimum: 0
        },
        positiveIntegerDefault0: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            },
            {
              default: 0
            }
          ]
        },
        simpleTypes: {
          type: "string",
          enum: [
            "array",
            "boolean",
            "integer",
            "null",
            "number",
            "object",
            "string"
          ]
        },
        stringArray: {
          type: "array",
          items: {
            type: "string"
          },
          minItems: 1,
          uniqueItems: !0
        }
      },
      type: "object",
      properties: {
        id: {
          type: "string",
          format: "uri"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: {},
        multipleOf: {
          type: "number",
          minimum: 0,
          exclusiveMinimum: !0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "boolean",
          default: !1
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "boolean",
          default: !1
        },
        maxLength: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            }
          ]
        },
        minLength: {
          allOf: [
            {
              $ref: "#/definitions/positiveIntegerDefault0"
            }
          ]
        },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: {
          anyOf: [
            {
              type: "boolean"
            },
            {
              $ref: "#"
            }
          ],
          default: {}
        },
        items: {
          anyOf: [
            {
              $ref: "#"
            },
            {
              $ref: "#/definitions/schemaArray"
            }
          ],
          default: {}
        },
        maxItems: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            }
          ]
        },
        minItems: {
          allOf: [
            {
              $ref: "#/definitions/positiveIntegerDefault0"
            }
          ]
        },
        uniqueItems: {
          type: "boolean",
          default: !1
        },
        maxProperties: {
          allOf: [
            {
              $ref: "#/definitions/positiveInteger"
            }
          ]
        },
        minProperties: {
          allOf: [
            {
              $ref: "#/definitions/positiveIntegerDefault0"
            }
          ]
        },
        required: {
          allOf: [
            {
              $ref: "#/definitions/stringArray"
            }
          ]
        },
        additionalProperties: {
          anyOf: [
            {
              type: "boolean"
            },
            {
              $ref: "#"
            }
          ],
          default: {}
        },
        definitions: {
          type: "object",
          additionalProperties: {
            $ref: "#"
          },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: {
            $ref: "#"
          },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: {
            $ref: "#"
          },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [
              {
                $ref: "#"
              },
              {
                $ref: "#/definitions/stringArray"
              }
            ]
          }
        },
        enum: {
          type: "array",
          minItems: 1,
          uniqueItems: !0
        },
        type: {
          anyOf: [
            {
              $ref: "#/definitions/simpleTypes"
            },
            {
              type: "array",
              items: {
                $ref: "#/definitions/simpleTypes"
              },
              minItems: 1,
              uniqueItems: !0
            }
          ]
        },
        format: {
          anyOf: [
            {
              type: "string",
              enum: [
                "date-time",
                "uri",
                "email",
                "hostname",
                "ipv4",
                "ipv6",
                "regex"
              ]
            },
            {
              type: "string"
            }
          ]
        },
        allOf: {
          allOf: [
            {
              $ref: "#/definitions/schemaArray"
            }
          ]
        },
        anyOf: {
          allOf: [
            {
              $ref: "#/definitions/schemaArray"
            }
          ]
        },
        oneOf: {
          allOf: [
            {
              $ref: "#/definitions/schemaArray"
            }
          ]
        },
        not: {
          allOf: [
            {
              $ref: "#"
            }
          ]
        }
      },
      dependencies: {
        exclusiveMaximum: [
          "maximum"
        ],
        exclusiveMinimum: [
          "minimum"
        ]
      },
      default: {}
    },
    "http://json-schema.org/draft-07/schema#": {
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [
            { $ref: "#/definitions/nonNegativeInteger" },
            { default: 0 }
          ]
        },
        simpleTypes: {
          enum: [
            "array",
            "boolean",
            "integer",
            "null",
            "number",
            "object",
            "string"
          ]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: !0,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: !0,
        readOnly: {
          type: "boolean",
          default: !1
        },
        examples: {
          type: "array",
          items: !0
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [
            { $ref: "#" },
            { $ref: "#/definitions/schemaArray" }
          ],
          default: !0
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: !1
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [
              { $ref: "#" },
              { $ref: "#/definitions/stringArray" }
            ]
          }
        },
        propertyNames: { $ref: "#" },
        const: !0,
        enum: {
          type: "array",
          items: !0,
          minItems: 1,
          uniqueItems: !0
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: !0
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: !0
    }
  }
}, Ph = {
  id: k("A unique identifier for the schema."),
  $schema: k("The schema to verify this document against."),
  title: k("A descriptive title of the element."),
  description: k("A long description of the element. Used in hover menus and suggestions."),
  default: k("A default value. Used by suggestions."),
  multipleOf: k("A number that should cleanly divide the current value (i.e. have no remainder)."),
  maximum: k("The maximum numerical value, inclusive by default."),
  exclusiveMaximum: k("Makes the maximum property exclusive."),
  minimum: k("The minimum numerical value, inclusive by default."),
  exclusiveMinimum: k("Makes the minimum property exclusive."),
  maxLength: k("The maximum length of a string."),
  minLength: k("The minimum length of a string."),
  pattern: k("A regular expression to match the string against. It is not implicitly anchored."),
  additionalItems: k("For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
  items: k("For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
  maxItems: k("The maximum number of items that can be inside an array. Inclusive."),
  minItems: k("The minimum number of items that can be inside an array. Inclusive."),
  uniqueItems: k("If all of the items in the array must be unique. Defaults to false."),
  maxProperties: k("The maximum number of properties an object can have. Inclusive."),
  minProperties: k("The minimum number of properties an object can have. Inclusive."),
  required: k("An array of strings that lists the names of all properties required on this object."),
  additionalProperties: k("Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
  definitions: k("Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
  properties: k("A map of property names to schemas for each property."),
  patternProperties: k("A map of regular expressions on property names to schemas for matching properties."),
  dependencies: k("A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
  enum: k("The set of literal values that are valid."),
  type: k("Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
  format: k("Describes the format expected for the value."),
  allOf: k("An array of schemas, all of which must match."),
  anyOf: k("An array of schemas, where at least one must match."),
  oneOf: k("An array of schemas, exactly one of which must match."),
  not: k("A schema which must not match."),
  $id: k("A unique identifier for the schema."),
  $ref: k("Reference a definition hosted on any location."),
  $comment: k("Comments from schema authors to readers or maintainers of the schema."),
  readOnly: k("Indicates that the value of the instance is managed exclusively by the owning authority."),
  examples: k("Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
  contains: k('An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'),
  propertyNames: k("If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
  const: k("An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
  contentMediaType: k("Describes the media type of a string property."),
  contentEncoding: k("Describes the content encoding of a string property."),
  if: k('The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'),
  then: k('The "if" subschema is used for validation when the "if" subschema succeeds.'),
  else: k('The "else" subschema is used for validation when the "if" subschema fails.')
};
for (const e in Zr.schemas) {
  const t = Zr.schemas[e];
  for (const n in t.properties) {
    let r = t.properties[n];
    typeof r == "boolean" && (r = t.properties[n] = {});
    const i = Ph[n];
    i && (r.description = i);
  }
}
var _l;
(() => {
  var e = { 470: (i) => {
    function s(l) {
      if (typeof l != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(l));
    }
    function o(l, u) {
      for (var d, h = "", f = 0, m = -1, g = 0, p = 0; p <= l.length; ++p) {
        if (p < l.length)
          d = l.charCodeAt(p);
        else {
          if (d === 47)
            break;
          d = 47;
        }
        if (d === 47) {
          if (!(m === p - 1 || g === 1))
            if (m !== p - 1 && g === 2) {
              if (h.length < 2 || f !== 2 || h.charCodeAt(h.length - 1) !== 46 || h.charCodeAt(h.length - 2) !== 46) {
                if (h.length > 2) {
                  var v = h.lastIndexOf("/");
                  if (v !== h.length - 1) {
                    v === -1 ? (h = "", f = 0) : f = (h = h.slice(0, v)).length - 1 - h.lastIndexOf("/"), m = p, g = 0;
                    continue;
                  }
                } else if (h.length === 2 || h.length === 1) {
                  h = "", f = 0, m = p, g = 0;
                  continue;
                }
              }
              u && (h.length > 0 ? h += "/.." : h = "..", f = 2);
            } else
              h.length > 0 ? h += "/" + l.slice(m + 1, p) : h = l.slice(m + 1, p), f = p - m - 1;
          m = p, g = 0;
        } else
          d === 46 && g !== -1 ? ++g : g = -1;
      }
      return h;
    }
    var a = { resolve: function() {
      for (var l, u = "", d = !1, h = arguments.length - 1; h >= -1 && !d; h--) {
        var f;
        h >= 0 ? f = arguments[h] : (l === void 0 && (l = process.cwd()), f = l), s(f), f.length !== 0 && (u = f + "/" + u, d = f.charCodeAt(0) === 47);
      }
      return u = o(u, !d), d ? u.length > 0 ? "/" + u : "/" : u.length > 0 ? u : ".";
    }, normalize: function(l) {
      if (s(l), l.length === 0)
        return ".";
      var u = l.charCodeAt(0) === 47, d = l.charCodeAt(l.length - 1) === 47;
      return (l = o(l, !u)).length !== 0 || u || (l = "."), l.length > 0 && d && (l += "/"), u ? "/" + l : l;
    }, isAbsolute: function(l) {
      return s(l), l.length > 0 && l.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var l, u = 0; u < arguments.length; ++u) {
        var d = arguments[u];
        s(d), d.length > 0 && (l === void 0 ? l = d : l += "/" + d);
      }
      return l === void 0 ? "." : a.normalize(l);
    }, relative: function(l, u) {
      if (s(l), s(u), l === u || (l = a.resolve(l)) === (u = a.resolve(u)))
        return "";
      for (var d = 1; d < l.length && l.charCodeAt(d) === 47; ++d)
        ;
      for (var h = l.length, f = h - d, m = 1; m < u.length && u.charCodeAt(m) === 47; ++m)
        ;
      for (var g = u.length - m, p = f < g ? f : g, v = -1, C = 0; C <= p; ++C) {
        if (C === p) {
          if (g > p) {
            if (u.charCodeAt(m + C) === 47)
              return u.slice(m + C + 1);
            if (C === 0)
              return u.slice(m + C);
          } else
            f > p && (l.charCodeAt(d + C) === 47 ? v = C : C === 0 && (v = 0));
          break;
        }
        var S = l.charCodeAt(d + C);
        if (S !== u.charCodeAt(m + C))
          break;
        S === 47 && (v = C);
      }
      var y = "";
      for (C = d + v + 1; C <= h; ++C)
        C !== h && l.charCodeAt(C) !== 47 || (y.length === 0 ? y += ".." : y += "/..");
      return y.length > 0 ? y + u.slice(m + v) : (m += v, u.charCodeAt(m) === 47 && ++m, u.slice(m));
    }, _makeLong: function(l) {
      return l;
    }, dirname: function(l) {
      if (s(l), l.length === 0)
        return ".";
      for (var u = l.charCodeAt(0), d = u === 47, h = -1, f = !0, m = l.length - 1; m >= 1; --m)
        if ((u = l.charCodeAt(m)) === 47) {
          if (!f) {
            h = m;
            break;
          }
        } else
          f = !1;
      return h === -1 ? d ? "/" : "." : d && h === 1 ? "//" : l.slice(0, h);
    }, basename: function(l, u) {
      if (u !== void 0 && typeof u != "string")
        throw new TypeError('"ext" argument must be a string');
      s(l);
      var d, h = 0, f = -1, m = !0;
      if (u !== void 0 && u.length > 0 && u.length <= l.length) {
        if (u.length === l.length && u === l)
          return "";
        var g = u.length - 1, p = -1;
        for (d = l.length - 1; d >= 0; --d) {
          var v = l.charCodeAt(d);
          if (v === 47) {
            if (!m) {
              h = d + 1;
              break;
            }
          } else
            p === -1 && (m = !1, p = d + 1), g >= 0 && (v === u.charCodeAt(g) ? --g == -1 && (f = d) : (g = -1, f = p));
        }
        return h === f ? f = p : f === -1 && (f = l.length), l.slice(h, f);
      }
      for (d = l.length - 1; d >= 0; --d)
        if (l.charCodeAt(d) === 47) {
          if (!m) {
            h = d + 1;
            break;
          }
        } else
          f === -1 && (m = !1, f = d + 1);
      return f === -1 ? "" : l.slice(h, f);
    }, extname: function(l) {
      s(l);
      for (var u = -1, d = 0, h = -1, f = !0, m = 0, g = l.length - 1; g >= 0; --g) {
        var p = l.charCodeAt(g);
        if (p !== 47)
          h === -1 && (f = !1, h = g + 1), p === 46 ? u === -1 ? u = g : m !== 1 && (m = 1) : u !== -1 && (m = -1);
        else if (!f) {
          d = g + 1;
          break;
        }
      }
      return u === -1 || h === -1 || m === 0 || m === 1 && u === h - 1 && u === d + 1 ? "" : l.slice(u, h);
    }, format: function(l) {
      if (l === null || typeof l != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof l);
      return function(u, d) {
        var h = d.dir || d.root, f = d.base || (d.name || "") + (d.ext || "");
        return h ? h === d.root ? h + f : h + "/" + f : f;
      }(0, l);
    }, parse: function(l) {
      s(l);
      var u = { root: "", dir: "", base: "", ext: "", name: "" };
      if (l.length === 0)
        return u;
      var d, h = l.charCodeAt(0), f = h === 47;
      f ? (u.root = "/", d = 1) : d = 0;
      for (var m = -1, g = 0, p = -1, v = !0, C = l.length - 1, S = 0; C >= d; --C)
        if ((h = l.charCodeAt(C)) !== 47)
          p === -1 && (v = !1, p = C + 1), h === 46 ? m === -1 ? m = C : S !== 1 && (S = 1) : m !== -1 && (S = -1);
        else if (!v) {
          g = C + 1;
          break;
        }
      return m === -1 || p === -1 || S === 0 || S === 1 && m === p - 1 && m === g + 1 ? p !== -1 && (u.base = u.name = g === 0 && f ? l.slice(1, p) : l.slice(g, p)) : (g === 0 && f ? (u.name = l.slice(1, m), u.base = l.slice(1, p)) : (u.name = l.slice(g, m), u.base = l.slice(g, p)), u.ext = l.slice(m, p)), g > 0 ? u.dir = l.slice(0, g - 1) : f && (u.dir = "/"), u;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    a.posix = a, i.exports = a;
  } }, t = {};
  function n(i) {
    var s = t[i];
    if (s !== void 0)
      return s.exports;
    var o = t[i] = { exports: {} };
    return e[i](o, o.exports, n), o.exports;
  }
  n.d = (i, s) => {
    for (var o in s)
      n.o(s, o) && !n.o(i, o) && Object.defineProperty(i, o, { enumerable: !0, get: s[o] });
  }, n.o = (i, s) => Object.prototype.hasOwnProperty.call(i, s), n.r = (i) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(i, "__esModule", { value: !0 });
  };
  var r = {};
  (() => {
    let i;
    n.r(r), n.d(r, { URI: () => f, Utils: () => q }), typeof process == "object" ? i = process.platform === "win32" : typeof navigator == "object" && (i = navigator.userAgent.indexOf("Windows") >= 0);
    const s = /^\w[\w\d+.-]*$/, o = /^\//, a = /^\/\//;
    function l(R, E) {
      if (!R.scheme && E)
        throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${R.authority}", path: "${R.path}", query: "${R.query}", fragment: "${R.fragment}"}`);
      if (R.scheme && !s.test(R.scheme))
        throw new Error("[UriError]: Scheme contains illegal characters.");
      if (R.path) {
        if (R.authority) {
          if (!o.test(R.path))
            throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else if (a.test(R.path))
          throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
    const u = "", d = "/", h = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    class f {
      constructor(E, A, _, P, M, O = !1) {
        ot(this, "scheme"), ot(this, "authority"), ot(this, "path"), ot(this, "query"), ot(this, "fragment"), typeof E == "object" ? (this.scheme = E.scheme || u, this.authority = E.authority || u, this.path = E.path || u, this.query = E.query || u, this.fragment = E.fragment || u) : (this.scheme = /* @__PURE__ */ function(K, B) {
          return K || B ? K : "file";
        }(E, O), this.authority = A || u, this.path = function(K, B) {
          switch (K) {
            case "https":
            case "http":
            case "file":
              B ? B[0] !== d && (B = d + B) : B = d;
          }
          return B;
        }(this.scheme, _ || u), this.query = P || u, this.fragment = M || u, l(this, O));
      }
      static isUri(E) {
        return E instanceof f || !!E && typeof E.authority == "string" && typeof E.fragment == "string" && typeof E.path == "string" && typeof E.query == "string" && typeof E.scheme == "string" && typeof E.fsPath == "string" && typeof E.with == "function" && typeof E.toString == "function";
      }
      get fsPath() {
        return S(this);
      }
      with(E) {
        if (!E)
          return this;
        let { scheme: A, authority: _, path: P, query: M, fragment: O } = E;
        return A === void 0 ? A = this.scheme : A === null && (A = u), _ === void 0 ? _ = this.authority : _ === null && (_ = u), P === void 0 ? P = this.path : P === null && (P = u), M === void 0 ? M = this.query : M === null && (M = u), O === void 0 ? O = this.fragment : O === null && (O = u), A === this.scheme && _ === this.authority && P === this.path && M === this.query && O === this.fragment ? this : new g(A, _, P, M, O);
      }
      static parse(E, A = !1) {
        const _ = h.exec(E);
        return _ ? new g(_[2] || u, L(_[4] || u), L(_[5] || u), L(_[7] || u), L(_[9] || u), A) : new g(u, u, u, u, u);
      }
      static file(E) {
        let A = u;
        if (i && (E = E.replace(/\\/g, d)), E[0] === d && E[1] === d) {
          const _ = E.indexOf(d, 2);
          _ === -1 ? (A = E.substring(2), E = d) : (A = E.substring(2, _), E = E.substring(_) || d);
        }
        return new g("file", A, E, u, u);
      }
      static from(E) {
        const A = new g(E.scheme, E.authority, E.path, E.query, E.fragment);
        return l(A, !0), A;
      }
      toString(E = !1) {
        return y(this, E);
      }
      toJSON() {
        return this;
      }
      static revive(E) {
        if (E) {
          if (E instanceof f)
            return E;
          {
            const A = new g(E);
            return A._formatted = E.external, A._fsPath = E._sep === m ? E.fsPath : null, A;
          }
        }
        return E;
      }
    }
    const m = i ? 1 : void 0;
    class g extends f {
      constructor() {
        super(...arguments), ot(this, "_formatted", null), ot(this, "_fsPath", null);
      }
      get fsPath() {
        return this._fsPath || (this._fsPath = S(this)), this._fsPath;
      }
      toString(E = !1) {
        return E ? y(this, !0) : (this._formatted || (this._formatted = y(this, !1)), this._formatted);
      }
      toJSON() {
        const E = { $mid: 1 };
        return this._fsPath && (E.fsPath = this._fsPath, E._sep = m), this._formatted && (E.external = this._formatted), this.path && (E.path = this.path), this.scheme && (E.scheme = this.scheme), this.authority && (E.authority = this.authority), this.query && (E.query = this.query), this.fragment && (E.fragment = this.fragment), E;
      }
    }
    const p = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
    function v(R, E, A) {
      let _, P = -1;
      for (let M = 0; M < R.length; M++) {
        const O = R.charCodeAt(M);
        if (O >= 97 && O <= 122 || O >= 65 && O <= 90 || O >= 48 && O <= 57 || O === 45 || O === 46 || O === 95 || O === 126 || E && O === 47 || A && O === 91 || A && O === 93 || A && O === 58)
          P !== -1 && (_ += encodeURIComponent(R.substring(P, M)), P = -1), _ !== void 0 && (_ += R.charAt(M));
        else {
          _ === void 0 && (_ = R.substr(0, M));
          const K = p[O];
          K !== void 0 ? (P !== -1 && (_ += encodeURIComponent(R.substring(P, M)), P = -1), _ += K) : P === -1 && (P = M);
        }
      }
      return P !== -1 && (_ += encodeURIComponent(R.substring(P))), _ !== void 0 ? _ : R;
    }
    function C(R) {
      let E;
      for (let A = 0; A < R.length; A++) {
        const _ = R.charCodeAt(A);
        _ === 35 || _ === 63 ? (E === void 0 && (E = R.substr(0, A)), E += p[_]) : E !== void 0 && (E += R[A]);
      }
      return E !== void 0 ? E : R;
    }
    function S(R, E) {
      let A;
      return A = R.authority && R.path.length > 1 && R.scheme === "file" ? `//${R.authority}${R.path}` : R.path.charCodeAt(0) === 47 && (R.path.charCodeAt(1) >= 65 && R.path.charCodeAt(1) <= 90 || R.path.charCodeAt(1) >= 97 && R.path.charCodeAt(1) <= 122) && R.path.charCodeAt(2) === 58 ? R.path[1].toLowerCase() + R.path.substr(2) : R.path, i && (A = A.replace(/\//g, "\\")), A;
    }
    function y(R, E) {
      const A = E ? C : v;
      let _ = "", { scheme: P, authority: M, path: O, query: K, fragment: B } = R;
      if (P && (_ += P, _ += ":"), (M || P === "file") && (_ += d, _ += d), M) {
        let z = M.indexOf("@");
        if (z !== -1) {
          const ce = M.substr(0, z);
          M = M.substr(z + 1), z = ce.lastIndexOf(":"), z === -1 ? _ += A(ce, !1, !1) : (_ += A(ce.substr(0, z), !1, !1), _ += ":", _ += A(ce.substr(z + 1), !1, !0)), _ += "@";
        }
        M = M.toLowerCase(), z = M.lastIndexOf(":"), z === -1 ? _ += A(M, !1, !0) : (_ += A(M.substr(0, z), !1, !0), _ += M.substr(z));
      }
      if (O) {
        if (O.length >= 3 && O.charCodeAt(0) === 47 && O.charCodeAt(2) === 58) {
          const z = O.charCodeAt(1);
          z >= 65 && z <= 90 && (O = `/${String.fromCharCode(z + 32)}:${O.substr(3)}`);
        } else if (O.length >= 2 && O.charCodeAt(1) === 58) {
          const z = O.charCodeAt(0);
          z >= 65 && z <= 90 && (O = `${String.fromCharCode(z + 32)}:${O.substr(2)}`);
        }
        _ += A(O, !0, !1);
      }
      return K && (_ += "?", _ += A(K, !1, !1)), B && (_ += "#", _ += E ? B : v(B, !1, !1)), _;
    }
    function w(R) {
      try {
        return decodeURIComponent(R);
      } catch {
        return R.length > 3 ? R.substr(0, 3) + w(R.substr(3)) : R;
      }
    }
    const b = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function L(R) {
      return R.match(b) ? R.replace(b, (E) => w(E)) : R;
    }
    var x = n(470);
    const T = x.posix || x, I = "/";
    var q;
    (function(R) {
      R.joinPath = function(E, ...A) {
        return E.with({ path: T.join(E.path, ...A) });
      }, R.resolvePath = function(E, ...A) {
        let _ = E.path, P = !1;
        _[0] !== I && (_ = I + _, P = !0);
        let M = T.resolve(_, ...A);
        return P && M[0] === I && !E.authority && (M = M.substring(1)), E.with({ path: M });
      }, R.dirname = function(E) {
        if (E.path.length === 0 || E.path === I)
          return E;
        let A = T.dirname(E.path);
        return A.length === 1 && A.charCodeAt(0) === 46 && (A = ""), E.with({ path: A });
      }, R.basename = function(E) {
        return T.basename(E.path);
      }, R.extname = function(E) {
        return T.extname(E.path);
      };
    })(q || (q = {}));
  })(), _l = r;
})();
var { URI: $t, Utils: hd } = _l;
function Ih(e, t) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  const n = String(e);
  let r = "", i = !1;
  const s = typeof t.flags == "string" ? t.flags : "";
  let o;
  for (let a = 0, l = n.length; a < l; a++)
    switch (o = n[a], o) {
      case "/":
      case "$":
      case "^":
      case "+":
      case ".":
      case "(":
      case ")":
      case "=":
      case "!":
      case "|":
        r += "\\" + o;
        break;
      case "?": {
        r += ".";
        break;
      }
      case "[":
      case "]": {
        r += o;
        break;
      }
      case "{": {
        i = !0, r += "(";
        break;
      }
      case "}": {
        i = !1, r += ")";
        break;
      }
      case ",":
        if (i) {
          r += "|";
          break;
        }
        r += "\\" + o;
        break;
      case "*":
        const u = n[a - 1];
        let d = 1;
        for (; n[a + 1] === "*"; )
          d++, a++;
        const h = n[a + 1];
        d > 1 && (u === "/" || u === void 0 || u === "{" || u === ",") && (h === "/" || h === void 0 || h === "," || h === "}") ? (h === "/" ? a++ : u === "/" && r.endsWith("\\/") && (r = r.substr(0, r.length - 2)), r += "((?:[^/]*(?:/|$))*)") : r += "([^/]*)";
        break;
      default:
        r += o;
    }
  return (!s || !~s.indexOf("g")) && (r = "^" + r + "$"), new RegExp(r, s);
}
var Fh = "!", Vh = "/", Dh = class {
  constructor(e, t, n) {
    this.folderUri = t, this.uris = n, this.globWrappers = [];
    try {
      for (let r of e) {
        const i = r[0] !== Fh;
        i || (r = r.substring(1)), r.length > 0 && (r[0] === Vh && (r = r.substring(1)), this.globWrappers.push({
          regexp: Ih("**/" + r, { extended: !0, globstar: !0 }),
          include: i
        }));
      }
      t && (t = Al(t), t.endsWith("/") || (t = t + "/"), this.folderUri = t);
    } catch {
      this.globWrappers.length = 0, this.uris = [];
    }
  }
  matchesPattern(e) {
    if (this.folderUri && !e.startsWith(this.folderUri))
      return !1;
    let t = !1;
    for (const { regexp: n, include: r } of this.globWrappers)
      n.test(e) && (t = r);
    return t;
  }
  getURIs() {
    return this.uris;
  }
}, qh = class {
  constructor(e, t, n) {
    this.service = e, this.uri = t, this.dependencies = /* @__PURE__ */ new Set(), this.anchors = void 0, n && (this.unresolvedSchema = this.service.promise.resolve(new Zt(n)));
  }
  getUnresolvedSchema() {
    return this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.uri)), this.unresolvedSchema;
  }
  getResolvedSchema() {
    return this.resolvedSchema || (this.resolvedSchema = this.getUnresolvedSchema().then((e) => this.service.resolveSchemaContent(e, this))), this.resolvedSchema;
  }
  clearSchema() {
    const e = !!this.unresolvedSchema;
    return this.resolvedSchema = void 0, this.unresolvedSchema = void 0, this.dependencies.clear(), this.anchors = void 0, e;
  }
}, Zt = class {
  constructor(e, t = []) {
    this.schema = e, this.errors = t;
  }
}, Ea = class {
  constructor(e, t = [], n = [], r) {
    this.schema = e, this.errors = t, this.warnings = n, this.schemaDraft = r;
  }
  getSection(e) {
    const t = this.getSectionRecursive(e, this.schema);
    if (t)
      return Ce(t);
  }
  getSectionRecursive(e, t) {
    if (!t || typeof t == "boolean" || e.length === 0)
      return t;
    const n = e.shift();
    if (t.properties && typeof t.properties[n])
      return this.getSectionRecursive(e, t.properties[n]);
    if (t.patternProperties)
      for (const r of Object.keys(t.patternProperties)) {
        const i = Fn(r);
        if (i != null && i.test(n))
          return this.getSectionRecursive(e, t.patternProperties[r]);
      }
    else {
      if (typeof t.additionalProperties == "object")
        return this.getSectionRecursive(e, t.additionalProperties);
      if (n.match("[0-9]+")) {
        if (Array.isArray(t.items)) {
          const r = parseInt(n, 10);
          if (!isNaN(r) && t.items[r])
            return this.getSectionRecursive(e, t.items[r]);
        } else if (t.items)
          return this.getSectionRecursive(e, t.items);
      }
    }
  }
}, Kh = class {
  constructor(e, t, n) {
    this.contextService = t, this.requestService = e, this.promiseConstructor = n || Promise, this.callOnDispose = [], this.contributionSchemas = {}, this.contributionAssociations = [], this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {};
  }
  getRegisteredSchemaIds(e) {
    return Object.keys(this.registeredSchemasIds).filter((t) => {
      const n = $t.parse(t).scheme;
      return n !== "schemaservice" && (!e || e(n));
    });
  }
  get promise() {
    return this.promiseConstructor;
  }
  dispose() {
    for (; this.callOnDispose.length > 0; )
      this.callOnDispose.pop()();
  }
  onResourceChange(e) {
    this.cachedSchemaForResource = void 0;
    let t = !1;
    e = et(e);
    const n = [e], r = Object.keys(this.schemasById).map((i) => this.schemasById[i]);
    for (; n.length; ) {
      const i = n.pop();
      for (let s = 0; s < r.length; s++) {
        const o = r[s];
        o && (o.uri === i || o.dependencies.has(i)) && (o.uri !== i && n.push(o.uri), o.clearSchema() && (t = !0), r[s] = void 0);
      }
    }
    return t;
  }
  setSchemaContributions(e) {
    if (e.schemas) {
      const t = e.schemas;
      for (const n in t) {
        const r = et(n);
        this.contributionSchemas[r] = this.addSchemaHandle(r, t[n]);
      }
    }
    if (Array.isArray(e.schemaAssociations)) {
      const t = e.schemaAssociations;
      for (let n of t) {
        const r = n.uris.map(et), i = this.addFilePatternAssociation(n.pattern, n.folderUri, r);
        this.contributionAssociations.push(i);
      }
    }
  }
  addSchemaHandle(e, t) {
    const n = new qh(this, e, t);
    return this.schemasById[e] = n, n;
  }
  getOrAddSchemaHandle(e, t) {
    return this.schemasById[e] || this.addSchemaHandle(e, t);
  }
  addFilePatternAssociation(e, t, n) {
    const r = new Dh(e, t, n);
    return this.filePatternAssociations.push(r), r;
  }
  registerExternalSchema(e) {
    const t = et(e.uri);
    return this.registeredSchemasIds[t] = !0, this.cachedSchemaForResource = void 0, e.fileMatch && e.fileMatch.length && this.addFilePatternAssociation(e.fileMatch, e.folderUri, [t]), e.schema ? this.addSchemaHandle(t, e.schema) : this.getOrAddSchemaHandle(t);
  }
  clearExternalSchemas() {
    this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {}, this.cachedSchemaForResource = void 0;
    for (const e in this.contributionSchemas)
      this.schemasById[e] = this.contributionSchemas[e], this.registeredSchemasIds[e] = !0;
    for (const e of this.contributionAssociations)
      this.filePatternAssociations.push(e);
  }
  getResolvedSchema(e) {
    const t = et(e), n = this.schemasById[t];
    return n ? n.getResolvedSchema() : this.promise.resolve(void 0);
  }
  loadSchema(e) {
    if (!this.requestService) {
      const t = k("Unable to load schema from '{0}'. No schema request service available", Wt(e));
      return this.promise.resolve(new Zt({}, [t]));
    }
    return e.startsWith("http://json-schema.org/") && (e = "https" + e.substring(4)), this.requestService(e).then((t) => {
      if (!t) {
        const s = k("Unable to load schema from '{0}': No content.", Wt(e));
        return new Zt({}, [s]);
      }
      const n = [];
      t.charCodeAt(0) === 65279 && (n.push(k("Problem reading content from '{0}': UTF-8 with BOM detected, only UTF 8 is allowed.", Wt(e))), t = t.trimStart());
      let r = {};
      const i = [];
      return r = ih(t, i), i.length && n.push(k("Unable to parse content from '{0}': Parse error at offset {1}.", Wt(e), i[0].offset)), new Zt(r, n);
    }, (t) => {
      let n = t.toString();
      const r = t.toString().split("Error: ");
      return r.length > 1 && (n = r[1]), an(n, ".") && (n = n.substr(0, n.length - 1)), new Zt({}, [k("Unable to load schema from '{0}': {1}.", Wt(e), n)]);
    });
  }
  resolveSchemaContent(e, t) {
    const n = e.errors.slice(0), r = e.schema;
    let i = r.$schema ? et(r.$schema) : void 0;
    if (i === "http://json-schema.org/draft-03/schema")
      return this.promise.resolve(new Ea({}, [k("Draft-03 schemas are not supported.")], [], i));
    let s = /* @__PURE__ */ new Set();
    const o = this.contextService, a = (g, p) => {
      p = decodeURIComponent(p);
      let v = g;
      return p[0] === "/" && (p = p.substring(1)), p.split("/").some((C) => (C = C.replace(/~1/g, "/").replace(/~0/g, "~"), v = v[C], !v)), v;
    }, l = (g, p, v) => (p.anchors || (p.anchors = m(g)), p.anchors.get(v)), u = (g, p) => {
      for (const v in p)
        p.hasOwnProperty(v) && v !== "id" && v !== "$id" && (g[v] = p[v]);
    }, d = (g, p, v, C) => {
      let S;
      C === void 0 || C.length === 0 ? S = p : C.charAt(0) === "/" ? S = a(p, C) : S = l(p, v, C), S ? u(g, S) : n.push(k("$ref '{0}' in '{1}' can not be resolved.", C || "", v.uri));
    }, h = (g, p, v, C) => {
      o && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/\/.*/.test(p) && (p = o.resolveRelativePath(p, C.uri)), p = et(p);
      const S = this.getOrAddSchemaHandle(p);
      return S.getUnresolvedSchema().then((y) => {
        if (C.dependencies.add(p), y.errors.length) {
          const w = v ? p + "#" + v : p;
          n.push(k("Problems loading reference '{0}': {1}", w, y.errors[0]));
        }
        return d(g, y.schema, S, v), f(g, y.schema, S);
      });
    }, f = (g, p, v) => {
      const C = [];
      return this.traverseNodes(g, (S) => {
        const y = /* @__PURE__ */ new Set();
        for (; S.$ref; ) {
          const w = S.$ref, b = w.split("#", 2);
          if (delete S.$ref, b[0].length > 0) {
            C.push(h(S, b[0], b[1], v));
            return;
          } else if (!y.has(w)) {
            const L = b[1];
            d(S, p, v, L), y.add(w);
          }
        }
        S.$recursiveRef && s.add("$recursiveRef"), S.$dynamicRef && s.add("$dynamicRef");
      }), this.promise.all(C);
    }, m = (g) => {
      const p = /* @__PURE__ */ new Map();
      return this.traverseNodes(g, (v) => {
        const C = v.$id || v.id, S = wl(C) && C.charAt(0) === "#" ? C.substring(1) : v.$anchor;
        S && (p.has(S) ? n.push(k("Duplicate anchor declaration: '{0}'", S)) : p.set(S, v)), v.$recursiveAnchor && s.add("$recursiveAnchor"), v.$dynamicAnchor && s.add("$dynamicAnchor");
      }), p;
    };
    return f(r, r, t).then((g) => {
      let p = [];
      return s.size && p.push(k("The schema uses meta-schema features ({0}) that are not yet supported by the validator.", Array.from(s.keys()).join(", "))), new Ea(r, n, p, i);
    });
  }
  traverseNodes(e, t) {
    if (!e || typeof e != "object")
      return Promise.resolve(null);
    const n = /* @__PURE__ */ new Set(), r = (...u) => {
      for (const d of u)
        nt(d) && a.push(d);
    }, i = (...u) => {
      for (const d of u)
        if (nt(d))
          for (const h in d) {
            const f = d[h];
            nt(f) && a.push(f);
          }
    }, s = (...u) => {
      for (const d of u)
        if (Array.isArray(d))
          for (const h of d)
            nt(h) && a.push(h);
    }, o = (u) => {
      if (Array.isArray(u))
        for (const d of u)
          nt(d) && a.push(d);
      else nt(u) && a.push(u);
    }, a = [e];
    let l = a.pop();
    for (; l; )
      n.has(l) || (n.add(l), t(l), r(l.additionalItems, l.additionalProperties, l.not, l.contains, l.propertyNames, l.if, l.then, l.else, l.unevaluatedItems, l.unevaluatedProperties), i(l.definitions, l.$defs, l.properties, l.patternProperties, l.dependencies, l.dependentSchemas), s(l.anyOf, l.allOf, l.oneOf, l.prefixItems), o(l.items)), l = a.pop();
  }
  getSchemaFromProperty(e, t) {
    var n, r;
    if (((n = t.root) == null ? void 0 : n.type) === "object") {
      for (const i of t.root.properties)
        if (i.keyNode.value === "$schema" && ((r = i.valueNode) == null ? void 0 : r.type) === "string") {
          let s = i.valueNode.value;
          return this.contextService && !/^\w[\w\d+.-]*:/.test(s) && (s = this.contextService.resolveRelativePath(s, e)), s;
        }
    }
  }
  getAssociatedSchemas(e) {
    const t = /* @__PURE__ */ Object.create(null), n = [], r = Al(e);
    for (const i of this.filePatternAssociations)
      if (i.matchesPattern(r))
        for (const s of i.getURIs())
          t[s] || (n.push(s), t[s] = !0);
    return n;
  }
  getSchemaURIsForResource(e, t) {
    let n = t && this.getSchemaFromProperty(e, t);
    return n ? [n] : this.getAssociatedSchemas(e);
  }
  getSchemaForResource(e, t) {
    if (t) {
      let i = this.getSchemaFromProperty(e, t);
      if (i) {
        const s = et(i);
        return this.getOrAddSchemaHandle(s).getResolvedSchema();
      }
    }
    if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === e)
      return this.cachedSchemaForResource.resolvedSchema;
    const n = this.getAssociatedSchemas(e), r = n.length > 0 ? this.createCombinedSchema(e, n).getResolvedSchema() : this.promise.resolve(void 0);
    return this.cachedSchemaForResource = { resource: e, resolvedSchema: r }, r;
  }
  createCombinedSchema(e, t) {
    if (t.length === 1)
      return this.getOrAddSchemaHandle(t[0]);
    {
      const n = "schemaservice://combinedSchema/" + encodeURIComponent(e), r = {
        allOf: t.map((i) => ({ $ref: i }))
      };
      return this.addSchemaHandle(n, r);
    }
  }
  getMatchingSchemas(e, t, n) {
    if (n) {
      const r = n.id || "schemaservice://untitled/matchingSchemas/" + $h++;
      return this.addSchemaHandle(r, n).getResolvedSchema().then((i) => t.getMatchingSchemas(i.schema).filter((s) => !s.inverted));
    }
    return this.getSchemaForResource(e.uri, t).then((r) => r ? t.getMatchingSchemas(r.schema).filter((i) => !i.inverted) : []);
  }
}, $h = 0;
function et(e) {
  try {
    return $t.parse(e).toString(!0);
  } catch {
    return e;
  }
}
function Al(e) {
  try {
    return $t.parse(e).with({ fragment: null, query: null }).toString(!0);
  } catch {
    return e;
  }
}
function Wt(e) {
  try {
    const t = $t.parse(e);
    if (t.scheme === "file")
      return t.fsPath;
  } catch {
  }
  return e;
}
function Bh(e, t) {
  const n = [], r = [], i = [];
  let s = -1;
  const o = ft(e.getText(), !1);
  let a = o.scan();
  function l(g) {
    n.push(g), r.push(i.length);
  }
  for (; a !== 17; ) {
    switch (a) {
      case 1:
      case 3: {
        const g = e.positionAt(o.getTokenOffset()).line, p = { startLine: g, endLine: g, kind: a === 1 ? "object" : "array" };
        i.push(p);
        break;
      }
      case 2:
      case 4: {
        const g = a === 2 ? "object" : "array";
        if (i.length > 0 && i[i.length - 1].kind === g) {
          const p = i.pop(), v = e.positionAt(o.getTokenOffset()).line;
          p && v > p.startLine + 1 && s !== p.startLine && (p.endLine = v - 1, l(p), s = p.startLine);
        }
        break;
      }
      case 13: {
        const g = e.positionAt(o.getTokenOffset()).line, p = e.positionAt(o.getTokenOffset() + o.getTokenLength()).line;
        o.getTokenError() === 1 && g + 1 < e.lineCount ? o.setPosition(e.offsetAt(ne.create(g + 1, 0))) : g < p && (l({ startLine: g, endLine: p, kind: rn.Comment }), s = g);
        break;
      }
      case 12: {
        const g = e.getText().substr(o.getTokenOffset(), o.getTokenLength()).match(/^\/\/\s*#(region\b)|(endregion\b)/);
        if (g) {
          const p = e.positionAt(o.getTokenOffset()).line;
          if (g[1]) {
            const v = { startLine: p, endLine: p, kind: rn.Region };
            i.push(v);
          } else {
            let v = i.length - 1;
            for (; v >= 0 && i[v].kind !== rn.Region; )
              v--;
            if (v >= 0) {
              const C = i[v];
              i.length = v, p > C.startLine && s !== C.startLine && (C.endLine = p, l(C), s = C.startLine);
            }
          }
        }
        break;
      }
    }
    a = o.scan();
  }
  const u = t && t.rangeLimit;
  if (typeof u != "number" || n.length <= u)
    return n;
  t && t.onRangeLimitExceeded && t.onRangeLimitExceeded(e.uri);
  const d = [];
  for (let g of r)
    g < 30 && (d[g] = (d[g] || 0) + 1);
  let h = 0, f = 0;
  for (let g = 0; g < d.length; g++) {
    const p = d[g];
    if (p) {
      if (p + h > u) {
        f = g;
        break;
      }
      h += p;
    }
  }
  const m = [];
  for (let g = 0; g < n.length; g++) {
    const p = r[g];
    typeof p == "number" && (p < f || p === f && h++ < u) && m.push(n[g]);
  }
  return m;
}
function Uh(e, t, n) {
  function r(a) {
    let l = e.offsetAt(a), u = n.getNodeFromOffset(l, !0);
    const d = [];
    for (; u; ) {
      switch (u.type) {
        case "string":
        case "object":
        case "array":
          const f = u.offset + 1, m = u.offset + u.length - 1;
          f < m && l >= f && l <= m && d.push(i(f, m)), d.push(i(u.offset, u.offset + u.length));
          break;
        case "number":
        case "boolean":
        case "null":
        case "property":
          d.push(i(u.offset, u.offset + u.length));
          break;
      }
      if (u.type === "property" || u.parent && u.parent.type === "array") {
        const f = o(
          u.offset + u.length,
          5
          /* SyntaxKind.CommaToken */
        );
        f !== -1 && d.push(i(u.offset, f));
      }
      u = u.parent;
    }
    let h;
    for (let f = d.length - 1; f >= 0; f--)
      h = Kn.create(d[f], h);
    return h || (h = Kn.create(j.create(a, a))), h;
  }
  function i(a, l) {
    return j.create(e.positionAt(a), e.positionAt(l));
  }
  const s = ft(e.getText(), !0);
  function o(a, l) {
    return s.setPosition(a), s.scan() === l ? s.getTokenOffset() + s.getTokenLength() : -1;
  }
  return t.map(r);
}
function Yr(e, t, n) {
  let r;
  if (n) {
    const s = e.offsetAt(n.start), o = e.offsetAt(n.end) - s;
    r = { offset: s, length: o };
  }
  const i = {
    tabSize: t ? t.tabSize : 4,
    insertSpaces: (t == null ? void 0 : t.insertSpaces) === !0,
    insertFinalNewline: (t == null ? void 0 : t.insertFinalNewline) === !0,
    eol: `
`,
    keepLines: (t == null ? void 0 : t.keepLines) === !0
  };
  return lh(e.getText(), r, i).map((s) => Ue.replace(j.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)), s.content));
}
var ae;
(function(e) {
  e[e.Object = 0] = "Object", e[e.Array = 1] = "Array";
})(ae || (ae = {}));
var yn = class {
  constructor(e, t) {
    this.propertyName = e ?? "", this.beginningLineNumber = t, this.childrenProperties = [], this.lastProperty = !1, this.noKeyName = !1;
  }
  addChildProperty(e) {
    if (e.parent = this, this.childrenProperties.length > 0) {
      let t = 0;
      e.noKeyName ? t = this.childrenProperties.length : t = zh(this.childrenProperties, e, jh), t < 0 && (t = t * -1 - 1), this.childrenProperties.splice(t, 0, e);
    } else
      this.childrenProperties.push(e);
    return e;
  }
};
function jh(e, t) {
  const n = e.propertyName.toLowerCase(), r = t.propertyName.toLowerCase();
  return n < r ? -1 : n > r ? 1 : 0;
}
function zh(e, t, n) {
  const r = t.propertyName.toLowerCase(), i = e[0].propertyName.toLowerCase(), s = e[e.length - 1].propertyName.toLowerCase();
  if (r < i)
    return 0;
  if (r > s)
    return e.length;
  let o = 0, a = e.length - 1;
  for (; o <= a; ) {
    let l = a + o >> 1, u = n(t, e[l]);
    if (u > 0)
      o = l + 1;
    else if (u < 0)
      a = l - 1;
    else
      return l;
  }
  return -o - 1;
}
function Wh(e, t) {
  const n = {
    ...t,
    keepLines: !1
    // keepLines must be false so that the properties are on separate lines for the sorting
  }, r = Ve.applyEdits(e, Yr(e, n, void 0)), i = Ve.create("test://test.json", "json", 0, r), s = Hh(i), o = Gh(i, s), a = Yr(o, n, void 0), l = Ve.applyEdits(o, a);
  return [Ue.replace(j.create(ne.create(0, 0), e.positionAt(e.getText().length)), l)];
}
function Hh(e) {
  const t = e.getText(), n = ft(t, !1);
  let r = new yn(), i = r, s = r, o = r, a, l = 0, u = 0, d, h, f = -1, m = -1, g = 0, p = 0, v = [], C = !1, S = !1;
  for (; (a = n.scan()) !== 17; ) {
    if (C === !0 && a !== 14 && a !== 15 && a !== 12 && a !== 13 && s.endLineNumber === void 0) {
      let y = n.getTokenStartLine();
      h === 2 || h === 4 ? o.endLineNumber = y - 1 : s.endLineNumber = y - 1, g = y, C = !1;
    }
    if (S === !0 && a !== 14 && a !== 15 && a !== 12 && a !== 13 && (g = n.getTokenStartLine(), S = !1), n.getTokenStartLine() !== l) {
      for (let y = l; y < n.getTokenStartLine(); y++) {
        const w = e.getText(j.create(ne.create(y, 0), ne.create(y + 1, 0))).length;
        u = u + w;
      }
      l = n.getTokenStartLine();
    }
    switch (a) {
      case 10: {
        if (d === void 0 || d === 1 || d === 5 && v[v.length - 1] === ae.Object) {
          const y = new yn(n.getTokenValue(), g);
          o = s, s = i.addChildProperty(y);
        }
        break;
      }
      case 3: {
        if (r.beginningLineNumber === void 0 && (r.beginningLineNumber = n.getTokenStartLine()), v[v.length - 1] === ae.Object)
          i = s;
        else if (v[v.length - 1] === ae.Array) {
          const y = new yn(n.getTokenValue(), g);
          y.noKeyName = !0, o = s, s = i.addChildProperty(y), i = s;
        }
        v.push(ae.Array), s.type = ae.Array, g = n.getTokenStartLine(), g++;
        break;
      }
      case 1: {
        if (r.beginningLineNumber === void 0)
          r.beginningLineNumber = n.getTokenStartLine();
        else if (v[v.length - 1] === ae.Array) {
          const y = new yn(n.getTokenValue(), g);
          y.noKeyName = !0, o = s, s = i.addChildProperty(y);
        }
        s.type = ae.Object, v.push(ae.Object), i = s, g = n.getTokenStartLine(), g++;
        break;
      }
      case 4: {
        p = n.getTokenStartLine(), v.pop(), s.endLineNumber === void 0 && (d === 2 || d === 4) && (s.endLineNumber = p - 1, s.lastProperty = !0, s.lineWhereToAddComma = f, s.indexWhereToAddComa = m, o = s, s = s ? s.parent : void 0, i = s), r.endLineNumber = p, g = p + 1;
        break;
      }
      case 2: {
        p = n.getTokenStartLine(), v.pop(), d !== 1 && (s.endLineNumber === void 0 && (s.endLineNumber = p - 1, s.lastProperty = !0, s.lineWhereToAddComma = f, s.indexWhereToAddComa = m), o = s, s = s ? s.parent : void 0, i = s), r.endLineNumber = n.getTokenStartLine(), g = p + 1;
        break;
      }
      case 5: {
        p = n.getTokenStartLine(), s.endLineNumber === void 0 && (v[v.length - 1] === ae.Object || v[v.length - 1] === ae.Array && (d === 2 || d === 4)) && (s.endLineNumber = p, s.commaIndex = n.getTokenOffset() - u, s.commaLine = p), (d === 2 || d === 4) && (o = s, s = s ? s.parent : void 0, i = s), g = p + 1;
        break;
      }
      case 13: {
        d === 5 && f === n.getTokenStartLine() && (v[v.length - 1] === ae.Array && (h === 2 || h === 4) || v[v.length - 1] === ae.Object) && (v[v.length - 1] === ae.Array && (h === 2 || h === 4) || v[v.length - 1] === ae.Object) && (s.endLineNumber = void 0, C = !0), (d === 1 || d === 3) && f === n.getTokenStartLine() && (S = !0);
        break;
      }
    }
    a !== 14 && a !== 13 && a !== 12 && a !== 15 && (h = d, d = a, f = n.getTokenStartLine(), m = n.getTokenOffset() + n.getTokenLength() - u);
  }
  return r;
}
function Gh(e, t) {
  if (t.childrenProperties.length === 0)
    return e;
  const n = Ve.create("test://test.json", "json", 0, e.getText()), r = [];
  for (_a(r, t, t.beginningLineNumber); r.length > 0; ) {
    const i = r.shift(), s = i.propertyTreeArray;
    let o = i.beginningLineNumber;
    for (let a = 0; a < s.length; a++) {
      const l = s[a], u = j.create(ne.create(l.beginningLineNumber, 0), ne.create(l.endLineNumber + 1, 0)), d = e.getText(u), h = Ve.create("test://test.json", "json", 0, d);
      if (l.lastProperty === !0 && a !== s.length - 1) {
        const g = l.lineWhereToAddComma - l.beginningLineNumber, p = l.indexWhereToAddComa, v = {
          range: j.create(ne.create(g, p), ne.create(g, p)),
          text: ","
        };
        Ve.update(h, [v], 1);
      } else if (l.lastProperty === !1 && a === s.length - 1) {
        const g = l.commaIndex, p = l.commaLine - l.beginningLineNumber, v = {
          range: j.create(ne.create(p, g), ne.create(p, g + 1)),
          text: ""
        };
        Ve.update(h, [v], 1);
      }
      const f = l.endLineNumber - l.beginningLineNumber + 1, m = {
        range: j.create(ne.create(o, 0), ne.create(o + f, 0)),
        text: h.getText()
      };
      Ve.update(n, [m], 1), _a(r, l, o), o = o + f;
    }
  }
  return n;
}
function _a(e, t, n) {
  if (t.childrenProperties.length !== 0)
    if (t.type === ae.Object) {
      let r = 1 / 0;
      for (const s of t.childrenProperties)
        s.beginningLineNumber < r && (r = s.beginningLineNumber);
      const i = r - t.beginningLineNumber;
      n = n + i, e.push(new kl(n, t.childrenProperties));
    } else t.type === ae.Array && Rl(e, t, n);
}
function Rl(e, t, n) {
  for (const r of t.childrenProperties) {
    if (r.type === ae.Object) {
      let i = 1 / 0;
      for (const o of r.childrenProperties)
        o.beginningLineNumber < i && (i = o.beginningLineNumber);
      const s = i - r.beginningLineNumber;
      e.push(new kl(n + r.beginningLineNumber - t.beginningLineNumber + s, r.childrenProperties));
    }
    r.type === ae.Array && Rl(e, r, n + r.beginningLineNumber - t.beginningLineNumber);
  }
}
var kl = class {
  constructor(e, t) {
    this.beginningLineNumber = e, this.propertyTreeArray = t;
  }
};
function Jh(e, t) {
  const n = [];
  return t.visit((r) => {
    var i;
    if (r.type === "property" && r.keyNode.value === "$ref" && ((i = r.valueNode) == null ? void 0 : i.type) === "string") {
      const s = r.valueNode.value, o = Qh(t, s);
      if (o) {
        const a = e.positionAt(o.offset);
        n.push({
          target: `${e.uri}#${a.line + 1},${a.character + 1}`,
          range: Xh(e, r.valueNode)
        });
      }
    }
    return !0;
  }), Promise.resolve(n);
}
function Xh(e, t) {
  return j.create(e.positionAt(t.offset + 1), e.positionAt(t.offset + t.length - 1));
}
function Qh(e, t) {
  const n = Zh(t);
  return n ? ei(n, e.root) : null;
}
function ei(e, t) {
  if (!t)
    return null;
  if (e.length === 0)
    return t;
  const n = e.shift();
  if (t && t.type === "object") {
    const r = t.properties.find((i) => i.keyNode.value === n);
    return r ? ei(e, r.valueNode) : null;
  } else if (t && t.type === "array" && n.match(/^(0|[1-9][0-9]*)$/)) {
    const r = Number.parseInt(n), i = t.items[r];
    return i ? ei(e, i) : null;
  }
  return null;
}
function Zh(e) {
  return e === "#" ? [] : e[0] !== "#" || e[1] !== "/" ? null : e.substring(2).split(/\//).map(Yh);
}
function Yh(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
function ed(e) {
  const t = e.promiseConstructor || Promise, n = new Kh(e.schemaRequestService, e.workspaceContext, t);
  n.setSchemaContributions(Zr);
  const r = new xh(n, e.contributions, t, e.clientCapabilities), i = new Nh(n, e.contributions, t), s = new Oh(n), o = new _h(n, t);
  return {
    configure: (a) => {
      var l;
      n.clearExternalSchemas(), (l = a.schemas) == null || l.forEach(n.registerExternalSchema.bind(n)), o.configure(a);
    },
    resetSchema: (a) => n.onResourceChange(a),
    doValidation: o.doValidation.bind(o),
    getLanguageStatus: o.getLanguageStatus.bind(o),
    parseJSONDocument: (a) => Sh(a),
    newJSONDocument: (a, l) => Lh(a, l),
    getMatchingSchemas: n.getMatchingSchemas.bind(n),
    doResolve: r.doResolve.bind(r),
    doComplete: r.doComplete.bind(r),
    findDocumentSymbols: s.findDocumentSymbols.bind(s),
    findDocumentSymbols2: s.findDocumentSymbols2.bind(s),
    findDocumentColors: s.findDocumentColors.bind(s),
    getColorPresentations: s.getColorPresentations.bind(s),
    doHover: i.doHover.bind(i),
    getFoldingRanges: Bh,
    getSelectionRanges: Uh,
    findDefinition: () => Promise.resolve([]),
    findLinks: Jh,
    format: (a, l, u) => Yr(a, u, l),
    sort: (a, l) => Wh(a, l)
  };
}
var Tl;
typeof fetch < "u" && (Tl = function(e) {
  return fetch(e).then((t) => t.text());
});
var td = class {
  constructor(e, t) {
    this._ctx = e, this._languageSettings = t.languageSettings, this._languageId = t.languageId, this._languageService = ed({
      workspaceContext: {
        resolveRelativePath: (n, r) => {
          const i = r.substr(0, r.lastIndexOf("/") + 1);
          return id(i, n);
        }
      },
      schemaRequestService: t.enableSchemaRequest ? Tl : void 0,
      clientCapabilities: Jr.LATEST
    }), this._languageService.configure(this._languageSettings);
  }
  async doValidation(e) {
    let t = this._getTextDocument(e);
    if (t) {
      let n = this._languageService.parseJSONDocument(t);
      return this._languageService.doValidation(t, n, this._languageSettings);
    }
    return Promise.resolve([]);
  }
  async doComplete(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return null;
    let r = this._languageService.parseJSONDocument(n);
    return this._languageService.doComplete(n, t, r);
  }
  async doResolve(e) {
    return this._languageService.doResolve(e);
  }
  async doHover(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return null;
    let r = this._languageService.parseJSONDocument(n);
    return this._languageService.doHover(n, t, r);
  }
  async format(e, t, n) {
    let r = this._getTextDocument(e);
    if (!r)
      return [];
    let i = this._languageService.format(r, t, n);
    return Promise.resolve(i);
  }
  async resetSchema(e) {
    return Promise.resolve(this._languageService.resetSchema(e));
  }
  async findDocumentSymbols(e) {
    let t = this._getTextDocument(e);
    if (!t)
      return [];
    let n = this._languageService.parseJSONDocument(t), r = this._languageService.findDocumentSymbols2(t, n);
    return Promise.resolve(r);
  }
  async findDocumentColors(e) {
    let t = this._getTextDocument(e);
    if (!t)
      return [];
    let n = this._languageService.parseJSONDocument(t), r = this._languageService.findDocumentColors(t, n);
    return Promise.resolve(r);
  }
  async getColorPresentations(e, t, n) {
    let r = this._getTextDocument(e);
    if (!r)
      return [];
    let i = this._languageService.parseJSONDocument(r), s = this._languageService.getColorPresentations(
      r,
      i,
      t,
      n
    );
    return Promise.resolve(s);
  }
  async getFoldingRanges(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return [];
    let r = this._languageService.getFoldingRanges(n, t);
    return Promise.resolve(r);
  }
  async getSelectionRanges(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return [];
    let r = this._languageService.parseJSONDocument(n), i = this._languageService.getSelectionRanges(n, t, r);
    return Promise.resolve(i);
  }
  async parseJSONDocument(e) {
    let t = this._getTextDocument(e);
    if (!t)
      return null;
    let n = this._languageService.parseJSONDocument(t);
    return Promise.resolve(n);
  }
  async getMatchingSchemas(e) {
    let t = this._getTextDocument(e);
    if (!t)
      return [];
    let n = this._languageService.parseJSONDocument(t);
    return Promise.resolve(this._languageService.getMatchingSchemas(t, n));
  }
  _getTextDocument(e) {
    let t = this._ctx.getMirrorModels();
    for (let n of t)
      if (n.uri.toString() === e)
        return Ve.create(
          e,
          this._languageId,
          n.version,
          n.getValue()
        );
    return null;
  }
}, nd = 47, tr = 46;
function rd(e) {
  return e.charCodeAt(0) === nd;
}
function id(e, t) {
  if (rd(t)) {
    const n = $t.parse(e), r = t.split("/");
    return n.with({ path: Ml(r) }).toString();
  }
  return sd(e, t);
}
function Ml(e) {
  const t = [];
  for (const r of e)
    r.length === 0 || r.length === 1 && r.charCodeAt(0) === tr || (r.length === 2 && r.charCodeAt(0) === tr && r.charCodeAt(1) === tr ? t.pop() : t.push(r));
  e.length > 1 && e[e.length - 1].length === 0 && t.push("");
  let n = t.join("/");
  return e[0].length === 0 && (n = "/" + n), n;
}
function sd(e, ...t) {
  const n = $t.parse(e), r = n.path.split("/");
  for (let i of t)
    r.push(...i.split("/"));
  return n.with({ path: Ml(r) }).toString();
}
self.onmessage = () => {
  bl((e, t) => new td(e, t));
};
