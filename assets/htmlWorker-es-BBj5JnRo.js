var Qo = Object.defineProperty, Zo = (e, t, n) => t in e ? Qo(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Qe = (e, t, n) => Zo(e, typeof t != "symbol" ? t + "" : t, n);
class el {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t) {
      setTimeout(() => {
        throw t.stack ? _t.isErrorNoTelemetry(t) ? new _t(t.message + `

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
const tl = new el();
function Ot(e) {
  nl(e) || tl.onUnexpectedError(e);
}
function Fi(e) {
  if (e instanceof Error) {
    const { name: t, message: n } = e, i = e.stacktrace || e.stack;
    return {
      $isError: !0,
      name: t,
      message: n,
      stack: i,
      noTelemetry: _t.isErrorNoTelemetry(e)
    };
  }
  return e;
}
const Un = "Canceled";
function nl(e) {
  return e instanceof il ? !0 : e instanceof Error && e.name === Un && e.message === Un;
}
class il extends Error {
  constructor() {
    super(Un), this.name = this.message;
  }
}
class _t extends Error {
  constructor(t) {
    super(t), this.name = "CodeExpectedError";
  }
  static fromError(t) {
    if (t instanceof _t)
      return t;
    const n = new _t();
    return n.message = t.message, n.stack = t.stack, n;
  }
  static isErrorNoTelemetry(t) {
    return t.name === "CodeExpectedError";
  }
}
class se extends Error {
  constructor(t) {
    super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, se.prototype);
  }
}
function rl(e, t) {
  const n = this;
  let i = !1, r;
  return function() {
    return i || (i = !0, r = e.apply(n, arguments)), r;
  };
}
function wt(e, t) {
  const n = vt(e, t);
  return n === -1 ? void 0 : e[n];
}
function vt(e, t, n = 0, i = e.length) {
  let r = n, a = i;
  for (; r < a; ) {
    const s = Math.floor((r + a) / 2);
    t(e[s]) ? r = s + 1 : a = s;
  }
  return r - 1;
}
function al(e, t) {
  const n = Pn(e, t);
  return n === e.length ? void 0 : e[n];
}
function Pn(e, t, n = 0, i = e.length) {
  let r = n, a = i;
  for (; r < a; ) {
    const s = Math.floor((r + a) / 2);
    t(e[s]) ? a = s : r = s + 1;
  }
  return r;
}
const Qs = class Zs {
  constructor(t) {
    this._array = t, this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(t) {
    if (Zs.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (const i of this._array)
          if (this._prevFindLastPredicate(i) && !t(i))
            throw new Error(
              "MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate."
            );
      }
      this._prevFindLastPredicate = t;
    }
    const n = vt(this._array, t, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
  }
};
Qs.assertInvariants = !1;
let eo = Qs;
function sl(e, t, n = (i, r) => i === r) {
  if (e === t)
    return !0;
  if (!e || !t || e.length !== t.length)
    return !1;
  for (let i = 0, r = e.length; i < r; i++)
    if (!n(e[i], t[i]))
      return !1;
  return !0;
}
function* to(e, t) {
  let n, i;
  for (const r of e)
    i !== void 0 && t(i, r) ? n.push(r) : (n && (yield n), n = [r]), i = r;
  n && (yield n);
}
function ol(e, t) {
  for (let n = 0; n <= e.length; n++)
    t(n === 0 ? void 0 : e[n - 1], n === e.length ? void 0 : e[n]);
}
function ll(e, t) {
  for (let n = 0; n < e.length; n++)
    t(n === 0 ? void 0 : e[n - 1], e[n], n + 1 === e.length ? void 0 : e[n + 1]);
}
function cl(e, t) {
  for (const n of t)
    e.push(n);
}
var Bi;
(function(e) {
  function t(a) {
    return a < 0;
  }
  e.isLessThan = t;
  function n(a) {
    return a <= 0;
  }
  e.isLessThanOrEqual = n;
  function i(a) {
    return a > 0;
  }
  e.isGreaterThan = i;
  function r(a) {
    return a === 0;
  }
  e.isNeitherLessOrGreaterThan = r, e.greaterThan = 1, e.lessThan = -1, e.neitherLessOrGreaterThan = 0;
})(Bi || (Bi = {}));
function zt(e, t) {
  return (n, i) => t(e(n), e(i));
}
const Ut = (e, t) => e - t;
function hl(e) {
  return (t, n) => -e(t, n);
}
var Vi, Ki;
class ul {
  constructor(t, n) {
    this.uri = t, this.value = n;
  }
}
function dl(e) {
  return Array.isArray(e);
}
const no = class Ct {
  constructor(t, n) {
    if (this[Vi] = "ResourceMap", t instanceof Ct)
      this.map = new Map(t.map), this.toKey = n ?? Ct.defaultToKey;
    else if (dl(t)) {
      this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? Ct.defaultToKey;
      for (const [i, r] of t)
        this.set(i, r);
    } else
      this.map = /* @__PURE__ */ new Map(), this.toKey = t ?? Ct.defaultToKey;
  }
  set(t, n) {
    return this.map.set(this.toKey(t), new ul(t, n)), this;
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
    for (const [i, r] of this.map)
      t(r.value, r.uri, this);
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
  *[(Vi = Symbol.toStringTag, Symbol.iterator)]() {
    for (const [, t] of this.map)
      yield [t.uri, t.value];
  }
};
no.defaultToKey = (e) => e.toString();
let ml = no;
class pl {
  constructor() {
    this[Ki] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
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
    const i = this._map.get(t);
    if (i)
      return n !== 0 && this.touch(i, n), i.value;
  }
  set(t, n, i = 0) {
    let r = this._map.get(t);
    if (r)
      r.value = n, i !== 0 && this.touch(r, i);
    else {
      switch (r = { key: t, value: n, next: void 0, previous: void 0 }, i) {
        case 0:
          this.addItemLast(r);
          break;
        case 1:
          this.addItemFirst(r);
          break;
        case 2:
          this.addItemLast(r);
          break;
        default:
          this.addItemLast(r);
          break;
      }
      this._map.set(t, r), this._size++;
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
    const i = this._state;
    let r = this._head;
    for (; r; ) {
      if (n ? t.bind(n)(r.value, r.key, this) : t(r.value, r.key, this), this._state !== i)
        throw new Error("LinkedMap got modified during iteration.");
      r = r.next;
    }
  }
  keys() {
    const t = this, n = this._state;
    let i = this._head;
    const r = {
      [Symbol.iterator]() {
        return r;
      },
      next() {
        if (t._state !== n)
          throw new Error("LinkedMap got modified during iteration.");
        if (i) {
          const a = { value: i.key, done: !1 };
          return i = i.next, a;
        } else
          return { value: void 0, done: !0 };
      }
    };
    return r;
  }
  values() {
    const t = this, n = this._state;
    let i = this._head;
    const r = {
      [Symbol.iterator]() {
        return r;
      },
      next() {
        if (t._state !== n)
          throw new Error("LinkedMap got modified during iteration.");
        if (i) {
          const a = { value: i.value, done: !1 };
          return i = i.next, a;
        } else
          return { value: void 0, done: !0 };
      }
    };
    return r;
  }
  entries() {
    const t = this, n = this._state;
    let i = this._head;
    const r = {
      [Symbol.iterator]() {
        return r;
      },
      next() {
        if (t._state !== n)
          throw new Error("LinkedMap got modified during iteration.");
        if (i) {
          const a = { value: [i.key, i.value], done: !1 };
          return i = i.next, a;
        } else
          return { value: void 0, done: !0 };
      }
    };
    return r;
  }
  [(Ki = Symbol.toStringTag, Symbol.iterator)]() {
    return this.entries();
  }
  trimOld(t) {
    if (t >= this.size)
      return;
    if (t === 0) {
      this.clear();
      return;
    }
    let n = this._head, i = this.size;
    for (; n && i > t; )
      this._map.delete(n.key), n = n.next, i--;
    this._head = n, this._size = i, n && (n.previous = void 0), this._state++;
  }
  trimNew(t) {
    if (t >= this.size)
      return;
    if (t === 0) {
      this.clear();
      return;
    }
    let n = this._tail, i = this.size;
    for (; n && i > t; )
      this._map.delete(n.key), n = n.previous, i--;
    this._tail = n, this._size = i, n && (n.next = void 0), this._state++;
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
      const n = t.next, i = t.previous;
      if (!n || !i)
        throw new Error("Invalid list");
      n.previous = i, i.next = n;
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
        const i = t.next, r = t.previous;
        t === this._tail ? (r.next = void 0, this._tail = r) : (i.previous = r, r.next = i), t.previous = void 0, t.next = this._head, this._head.previous = t, this._head = t, this._state++;
      } else if (n === 2) {
        if (t === this._tail)
          return;
        const i = t.next, r = t.previous;
        t === this._head ? (i.previous = void 0, this._head = i) : (i.previous = r, r.next = i), t.next = void 0, t.previous = this._tail, this._tail.next = t, this._tail = t, this._state++;
      }
    }
  }
  toJSON() {
    const t = [];
    return this.forEach((n, i) => {
      t.push([i, n]);
    }), t;
  }
  fromJSON(t) {
    this.clear();
    for (const [n, i] of t)
      this.set(n, i);
  }
}
class fl extends pl {
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
class gl extends fl {
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
class bl {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(t, n) {
    let i = this.map.get(t);
    i || (i = /* @__PURE__ */ new Set(), this.map.set(t, i)), i.add(n);
  }
  delete(t, n) {
    const i = this.map.get(t);
    i && (i.delete(n), i.size === 0 && this.map.delete(t));
  }
  forEach(t, n) {
    const i = this.map.get(t);
    i && i.forEach(n);
  }
  get(t) {
    return this.map.get(t) || /* @__PURE__ */ new Set();
  }
}
var nn;
(function(e) {
  function t(C) {
    return C && typeof C == "object" && typeof C[Symbol.iterator] == "function";
  }
  e.is = t;
  const n = Object.freeze([]);
  function i() {
    return n;
  }
  e.empty = i;
  function* r(C) {
    yield C;
  }
  e.single = r;
  function a(C) {
    return t(C) ? C : r(C);
  }
  e.wrap = a;
  function s(C) {
    return C || n;
  }
  e.from = s;
  function* l(C) {
    for (let I = C.length - 1; I >= 0; I--)
      yield C[I];
  }
  e.reverse = l;
  function o(C) {
    return !C || C[Symbol.iterator]().next().done === !0;
  }
  e.isEmpty = o;
  function c(C) {
    return C[Symbol.iterator]().next().value;
  }
  e.first = c;
  function h(C, I) {
    let N = 0;
    for (const g of C)
      if (I(g, N++))
        return !0;
    return !1;
  }
  e.some = h;
  function d(C, I) {
    for (const N of C)
      if (I(N))
        return N;
  }
  e.find = d;
  function* m(C, I) {
    for (const N of C)
      I(N) && (yield N);
  }
  e.filter = m;
  function* p(C, I) {
    let N = 0;
    for (const g of C)
      yield I(g, N++);
  }
  e.map = p;
  function* _(C, I) {
    let N = 0;
    for (const g of C)
      yield* I(g, N++);
  }
  e.flatMap = _;
  function* b(...C) {
    for (const I of C)
      yield* I;
  }
  e.concat = b;
  function S(C, I, N) {
    let g = N;
    for (const f of C)
      g = I(g, f);
    return g;
  }
  e.reduce = S;
  function* y(C, I, N = C.length) {
    for (I < -C.length && (I = 0), I < 0 && (I += C.length), N < 0 ? N += C.length : N > C.length && (N = C.length); I < N; I++)
      yield C[I];
  }
  e.slice = y;
  function w(C, I = Number.POSITIVE_INFINITY) {
    const N = [];
    if (I === 0)
      return [N, C];
    const g = C[Symbol.iterator]();
    for (let f = 0; f < I; f++) {
      const T = g.next();
      if (T.done)
        return [N, e.empty()];
      N.push(T.value);
    }
    return [N, { [Symbol.iterator]() {
      return g;
    } }];
  }
  e.consume = w;
  async function x(C) {
    const I = [];
    for await (const N of C)
      I.push(N);
    return Promise.resolve(I);
  }
  e.asyncToArray = x;
})(nn || (nn = {}));
function io(e) {
  if (nn.is(e)) {
    const t = [];
    for (const n of e)
      if (n)
        try {
          n.dispose();
        } catch (i) {
          t.push(i);
        }
    if (t.length === 1)
      throw t[0];
    if (t.length > 1)
      throw new AggregateError(t, "Encountered errors while disposing of store");
    return Array.isArray(e) ? [] : e;
  } else if (e)
    return e.dispose(), e;
}
function _l(...e) {
  return Wt(() => io(e));
}
function Wt(e) {
  return {
    dispose: rl(() => {
      e();
    })
  };
}
const ro = class ao {
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
        io(this._toDispose);
      } finally {
        this._toDispose.clear();
      }
  }
  add(t) {
    if (!t)
      return t;
    if (t === this)
      throw new Error("Cannot register a disposable on itself!");
    return this._isDisposed ? ao.DISABLE_DISPOSED_WARNING || console.warn(new Error(
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
ro.DISABLE_DISPOSED_WARNING = !1;
let Ni = ro;
const so = class {
  constructor() {
    this._store = new Ni(), this._store;
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
so.None = Object.freeze({ dispose() {
} });
let rn = so;
var st;
let ne = (st = class {
  constructor(e) {
    this.element = e, this.next = st.Undefined, this.prev = st.Undefined;
  }
}, st.Undefined = new st(void 0), st);
class wl {
  constructor() {
    this._first = ne.Undefined, this._last = ne.Undefined, this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === ne.Undefined;
  }
  clear() {
    let t = this._first;
    for (; t !== ne.Undefined; ) {
      const n = t.next;
      t.prev = ne.Undefined, t.next = ne.Undefined, t = n;
    }
    this._first = ne.Undefined, this._last = ne.Undefined, this._size = 0;
  }
  unshift(t) {
    return this._insert(t, !1);
  }
  push(t) {
    return this._insert(t, !0);
  }
  _insert(t, n) {
    const i = new ne(t);
    if (this._first === ne.Undefined)
      this._first = i, this._last = i;
    else if (n) {
      const a = this._last;
      this._last = i, i.prev = a, a.next = i;
    } else {
      const a = this._first;
      this._first = i, i.next = a, a.prev = i;
    }
    this._size += 1;
    let r = !1;
    return () => {
      r || (r = !0, this._remove(i));
    };
  }
  shift() {
    if (this._first !== ne.Undefined) {
      const t = this._first.element;
      return this._remove(this._first), t;
    }
  }
  pop() {
    if (this._last !== ne.Undefined) {
      const t = this._last.element;
      return this._remove(this._last), t;
    }
  }
  _remove(t) {
    if (t.prev !== ne.Undefined && t.next !== ne.Undefined) {
      const n = t.prev;
      n.next = t.next, t.next.prev = n;
    } else t.prev === ne.Undefined && t.next === ne.Undefined ? (this._first = ne.Undefined, this._last = ne.Undefined) : t.next === ne.Undefined ? (this._last = this._last.prev, this._last.next = ne.Undefined) : t.prev === ne.Undefined && (this._first = this._first.next, this._first.prev = ne.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t = this._first;
    for (; t !== ne.Undefined; )
      yield t.element, t = t.next;
  }
}
const vl = globalThis.performance && typeof globalThis.performance.now == "function";
class Tn {
  static create(t) {
    return new Tn(t);
  }
  constructor(t) {
    this._now = vl && t === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
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
var an;
(function(e) {
  e.None = () => rn.None;
  function t(A, v) {
    return m(A, () => {
    }, 0, void 0, !0, void 0, v);
  }
  e.defer = t;
  function n(A) {
    return (v, L = null, M) => {
      let O = !1, D;
      return D = A((P) => {
        if (!O)
          return D ? D.dispose() : O = !0, v.call(L, P);
      }, null, M), O && D.dispose(), D;
    };
  }
  e.once = n;
  function i(A, v) {
    return e.once(e.filter(A, v));
  }
  e.onceIf = i;
  function r(A, v, L) {
    return h((M, O = null, D) => A((P) => M.call(O, v(P)), null, D), L);
  }
  e.map = r;
  function a(A, v, L) {
    return h((M, O = null, D) => A((P) => {
      v(P), M.call(O, P);
    }, null, D), L);
  }
  e.forEach = a;
  function s(A, v, L) {
    return h((M, O = null, D) => A((P) => v(P) && M.call(O, P), null, D), L);
  }
  e.filter = s;
  function l(A) {
    return A;
  }
  e.signal = l;
  function o(...A) {
    return (v, L = null, M) => {
      const O = _l(...A.map((D) => D((P) => v.call(L, P))));
      return d(O, M);
    };
  }
  e.any = o;
  function c(A, v, L, M) {
    let O = L;
    return r(A, (D) => (O = v(O, D), O), M);
  }
  e.reduce = c;
  function h(A, v) {
    let L;
    const M = {
      onWillAddFirstListener() {
        L = A(O.fire, O);
      },
      onDidRemoveLastListener() {
        L == null || L.dispose();
      }
    }, O = new xe(M);
    return v == null || v.add(O), O.event;
  }
  function d(A, v) {
    return v instanceof Array ? v.push(A) : v && v.add(A), A;
  }
  function m(A, v, L = 100, M = !1, O = !1, D, P) {
    let H, K, Y, ce = 0, we;
    const Sn = {
      leakWarningThreshold: D,
      onWillAddFirstListener() {
        H = A((Jo) => {
          ce++, K = v(K, Jo), M && !Y && (Bt.fire(K), K = void 0), we = () => {
            const Yo = K;
            K = void 0, Y = void 0, (!M || ce > 1) && Bt.fire(Yo), ce = 0;
          }, typeof L == "number" ? (clearTimeout(Y), Y = setTimeout(we, L)) : Y === void 0 && (Y = 0, queueMicrotask(we));
        });
      },
      onWillRemoveListener() {
        O && ce > 0 && (we == null || we());
      },
      onDidRemoveLastListener() {
        we = void 0, H.dispose();
      }
    }, Bt = new xe(Sn);
    return P == null || P.add(Bt), Bt.event;
  }
  e.debounce = m;
  function p(A, v = 0, L) {
    return e.debounce(A, (M, O) => M ? (M.push(O), M) : [O], v, void 0, !0, void 0, L);
  }
  e.accumulate = p;
  function _(A, v = (M, O) => M === O, L) {
    let M = !0, O;
    return s(A, (D) => {
      const P = M || !v(D, O);
      return M = !1, O = D, P;
    }, L);
  }
  e.latch = _;
  function b(A, v, L) {
    return [
      e.filter(A, v, L),
      e.filter(A, (M) => !v(M), L)
    ];
  }
  e.split = b;
  function S(A, v = !1, L = [], M) {
    let O = L.slice(), D = A((K) => {
      O ? O.push(K) : H.fire(K);
    });
    M && M.add(D);
    const P = () => {
      O == null || O.forEach((K) => H.fire(K)), O = null;
    }, H = new xe({
      onWillAddFirstListener() {
        D || (D = A((K) => H.fire(K)), M && M.add(D));
      },
      onDidAddFirstListener() {
        O && (v ? setTimeout(P) : P());
      },
      onDidRemoveLastListener() {
        D && D.dispose(), D = null;
      }
    });
    return M && M.add(H), H.event;
  }
  e.buffer = S;
  function y(A, v) {
    return (L, M, O) => {
      const D = v(new x());
      return A(function(P) {
        const H = D.evaluate(P);
        H !== w && L.call(M, H);
      }, void 0, O);
    };
  }
  e.chain = y;
  const w = Symbol("HaltChainable");
  class x {
    constructor() {
      this.steps = [];
    }
    map(v) {
      return this.steps.push(v), this;
    }
    forEach(v) {
      return this.steps.push((L) => (v(L), L)), this;
    }
    filter(v) {
      return this.steps.push((L) => v(L) ? L : w), this;
    }
    reduce(v, L) {
      let M = L;
      return this.steps.push((O) => (M = v(M, O), M)), this;
    }
    latch(v = (L, M) => L === M) {
      let L = !0, M;
      return this.steps.push((O) => {
        const D = L || !v(O, M);
        return L = !1, M = O, D ? O : w;
      }), this;
    }
    evaluate(v) {
      for (const L of this.steps)
        if (v = L(v), v === w)
          break;
      return v;
    }
  }
  function C(A, v, L = (M) => M) {
    const M = (...H) => P.fire(L(...H)), O = () => A.on(v, M), D = () => A.removeListener(v, M), P = new xe(
      { onWillAddFirstListener: O, onDidRemoveLastListener: D }
    );
    return P.event;
  }
  e.fromNodeEventEmitter = C;
  function I(A, v, L = (M) => M) {
    const M = (...H) => P.fire(L(...H)), O = () => A.addEventListener(v, M), D = () => A.removeEventListener(v, M), P = new xe(
      { onWillAddFirstListener: O, onDidRemoveLastListener: D }
    );
    return P.event;
  }
  e.fromDOMEventEmitter = I;
  function N(A) {
    return new Promise((v) => n(A)(v));
  }
  e.toPromise = N;
  function g(A) {
    const v = new xe();
    return A.then((L) => {
      v.fire(L);
    }, () => {
      v.fire(void 0);
    }).finally(() => {
      v.dispose();
    }), v.event;
  }
  e.fromPromise = g;
  function f(A, v) {
    return A((L) => v.fire(L));
  }
  e.forward = f;
  function T(A, v, L) {
    return v(L), A((M) => v(M));
  }
  e.runAndSubscribe = T;
  class U {
    constructor(v, L) {
      this._observable = v, this._counter = 0, this._hasChanged = !1;
      const M = {
        onWillAddFirstListener: () => {
          v.addObserver(this), this._observable.reportChanges();
        },
        onDidRemoveLastListener: () => {
          v.removeObserver(this);
        }
      };
      this.emitter = new xe(M), L && L.add(this.emitter);
    }
    beginUpdate(v) {
      this._counter++;
    }
    handlePossibleChange(v) {
    }
    handleChange(v, L) {
      this._hasChanged = !0;
    }
    endUpdate(v) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
    }
  }
  function k(A, v) {
    return new U(A, v).emitter.event;
  }
  e.fromObservable = k;
  function E(A) {
    return (v, L, M) => {
      let O = 0, D = !1;
      const P = {
        beginUpdate() {
          O++;
        },
        endUpdate() {
          O--, O === 0 && (A.reportChanges(), D && (D = !1, v.call(L)));
        },
        handlePossibleChange() {
        },
        handleChange() {
          D = !0;
        }
      };
      A.addObserver(P), A.reportChanges();
      const H = {
        dispose() {
          A.removeObserver(P);
        }
      };
      return M instanceof Ni ? M.add(H) : Array.isArray(M) && M.push(H), H;
    };
  }
  e.fromObservableLight = E;
})(an || (an = {}));
const Hn = class Dn {
  constructor(t) {
    this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${t}_${Dn._idPool++}`, Dn.all.add(this);
  }
  start(t) {
    this._stopWatch = new Tn(), this.listenerCount = t;
  }
  stop() {
    if (this._stopWatch) {
      const t = this._stopWatch.elapsed();
      this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Hn.all = /* @__PURE__ */ new Set(), Hn._idPool = 0;
let yl = Hn, Tl = -1;
const oo = class lo {
  constructor(t, n, i = (lo._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = t, this.threshold = n, this.name = i, this._warnCountdown = 0;
  }
  dispose() {
    var t;
    (t = this._stacks) == null || t.clear();
  }
  check(t, n) {
    const i = this.threshold;
    if (i <= 0 || n < i)
      return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    const r = this._stacks.get(t.value) || 0;
    if (this._stacks.set(t.value, r + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = i * 0.5;
      const [a, s] = this.getMostFrequentStack(), l = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${s}):`;
      console.warn(l), console.warn(a);
      const o = new Sl(l, a);
      this._errorHandler(o);
    }
    return () => {
      const a = this._stacks.get(t.value) || 0;
      this._stacks.set(t.value, a - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks)
      return;
    let t, n = 0;
    for (const [i, r] of this._stacks)
      (!t || n < r) && (t = [i, r], n = r);
    return t;
  }
};
oo._idPool = 1;
let kl = oo;
class Mi {
  static create() {
    const t = new Error();
    return new Mi(t.stack ?? "");
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
class Sl extends Error {
  constructor(t, n) {
    super(t), this.name = "ListenerLeakError", this.stack = n;
  }
}
class Ll extends Error {
  constructor(t, n) {
    super(t), this.name = "ListenerRefusalError", this.stack = n;
  }
}
let xl = 0;
class Ln {
  constructor(t) {
    this.value = t, this.id = xl++;
  }
}
const El = 2;
class xe {
  constructor(t) {
    var n, i, r, a;
    this._size = 0, this._options = t, this._leakageMon = (n = this._options) != null && n.leakWarningThreshold ? new kl(
      (t == null ? void 0 : t.onListenerError) ?? Ot,
      ((i = this._options) == null ? void 0 : i.leakWarningThreshold) ?? Tl
    ) : void 0, this._perfMon = (r = this._options) != null && r._profName ? new yl(this._options._profName) : void 0, this._deliveryQueue = (a = this._options) == null ? void 0 : a.deliveryQueue;
  }
  dispose() {
    var t, n, i, r;
    this._disposed || (this._disposed = !0, ((t = this._deliveryQueue) == null ? void 0 : t.current) === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), (i = (n = this._options) == null ? void 0 : n.onDidRemoveLastListener) == null || i.call(n), (r = this._leakageMon) == null || r.dispose());
  }
  get event() {
    return this._event ?? (this._event = (t, n, i) => {
      var r, a, s, l, o, c, h;
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        const _ = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(_);
        const b = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], S = new Ll(
          `${_}. HINT: Stack shows most frequent listener (${b[1]}-times)`,
          b[0]
        );
        return (((r = this._options) == null ? void 0 : r.onListenerError) || Ot)(S), rn.None;
      }
      if (this._disposed)
        return rn.None;
      n && (t = t.bind(n));
      const d = new Ln(t);
      let m;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (d.stack = Mi.create(), m = this._leakageMon.check(d.stack, this._size + 1)), this._listeners ? this._listeners instanceof Ln ? (this._deliveryQueue ?? (this._deliveryQueue = new Cl()), this._listeners = [this._listeners, d]) : this._listeners.push(d) : ((s = (a = this._options) == null ? void 0 : a.onWillAddFirstListener) == null || s.call(a, this), this._listeners = d, (o = (l = this._options) == null ? void 0 : l.onDidAddFirstListener) == null || o.call(l, this)), (h = (c = this._options) == null ? void 0 : c.onDidAddListener) == null || h.call(c, this), this._size++;
      const p = Wt(() => {
        m == null || m(), this._removeListener(d);
      });
      return i instanceof Ni ? i.add(p) : Array.isArray(i) && i.push(p), p;
    }), this._event;
  }
  _removeListener(t) {
    var n, i, r, a;
    if ((i = (n = this._options) == null ? void 0 : n.onWillRemoveListener) == null || i.call(n, this), !this._listeners)
      return;
    if (this._size === 1) {
      this._listeners = void 0, (a = (r = this._options) == null ? void 0 : r.onDidRemoveLastListener) == null || a.call(r, this), this._size = 0;
      return;
    }
    const s = this._listeners, l = s.indexOf(t);
    if (l === -1)
      throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, s[l] = void 0;
    const o = this._deliveryQueue.current === this;
    if (this._size * El <= s.length) {
      let c = 0;
      for (let h = 0; h < s.length; h++)
        s[h] ? s[c++] = s[h] : o && c < this._deliveryQueue.end && (this._deliveryQueue.end--, c < this._deliveryQueue.i && this._deliveryQueue.i--);
      s.length = c;
    }
  }
  _deliver(t, n) {
    var i;
    if (!t)
      return;
    const r = ((i = this._options) == null ? void 0 : i.onListenerError) || Ot;
    if (!r) {
      t.value(n);
      return;
    }
    try {
      t.value(n);
    } catch (a) {
      r(a);
    }
  }
  _deliverQueue(t) {
    const n = t.current._listeners;
    for (; t.i < t.end; )
      this._deliver(n[t.i++], t.value);
    t.reset();
  }
  fire(t) {
    var n, i, r, a;
    if ((n = this._deliveryQueue) != null && n.current && (this._deliverQueue(this._deliveryQueue), (i = this._perfMon) == null || i.stop()), (r = this._perfMon) == null || r.start(this._size), this._listeners) if (this._listeners instanceof Ln)
      this._deliver(this._listeners, t);
    else {
      const s = this._deliveryQueue;
      s.enqueue(this, t, this._listeners.length), this._deliverQueue(s);
    }
    (a = this._perfMon) == null || a.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
}
class Cl {
  constructor() {
    this.i = -1, this.end = 0;
  }
  enqueue(t, n, i) {
    this.i = 0, this.end = i, this.current = t, this.value = n;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
}
function Rl() {
  return globalThis._VSCODE_NLS_MESSAGES;
}
function co() {
  return globalThis._VSCODE_NLS_LANGUAGE;
}
const Al = co() === "pseudo" || typeof document < "u" && document.location && typeof document.location.hash == "string" && document.location.hash.indexOf("pseudo=true") >= 0;
function Nl(e, t) {
  let n;
  return t.length === 0 ? n = e : n = e.replace(/\{(\d+)\}/g, (i, r) => {
    const a = r[0], s = t[a];
    let l = i;
    return typeof s == "string" ? l = s : (typeof s == "number" || typeof s == "boolean" || s === void 0 || s === null) && (l = String(s)), l;
  }), Al && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
}
function ee(e, t, ...n) {
  return Nl(typeof e == "number" ? Ml(e, t) : t, n);
}
function Ml(e, t) {
  var n;
  const i = (n = Rl()) == null ? void 0 : n[e];
  if (typeof i != "string") {
    if (typeof t == "string")
      return t;
    throw new Error(`!!! NLS MISSING: ${e} !!!`);
  }
  return i;
}
const ft = "en";
let Wn = !1, qn = !1, xn = !1, ho = !1, Ii = !1, Vt, Xt = ft, ji = ft, Il, ze;
const We = globalThis;
let pe;
var $i;
typeof We.vscode < "u" && typeof We.vscode.process < "u" ? pe = We.vscode.process : typeof process < "u" && typeof (($i = process == null ? void 0 : process.versions) == null ? void 0 : $i.node) == "string" && (pe = process);
var Gi;
const Ol = typeof ((Gi = pe == null ? void 0 : pe.versions) == null ? void 0 : Gi.electron) == "string", zl = Ol && (pe == null ? void 0 : pe.type) === "renderer";
var Xi;
if (typeof pe == "object") {
  Wn = pe.platform === "win32", qn = pe.platform === "darwin", xn = pe.platform === "linux", xn && pe.env.SNAP && pe.env.SNAP_REVISION, pe.env.CI || pe.env.BUILD_ARTIFACTSTAGINGDIRECTORY, Vt = ft, Xt = ft;
  const e = pe.env.VSCODE_NLS_CONFIG;
  if (e)
    try {
      const t = JSON.parse(e);
      Vt = t.userLocale, ji = t.osLocale, Xt = t.resolvedLanguage || ft, Il = (Xi = t.languagePack) == null ? void 0 : Xi.translationsConfigFile;
    } catch {
    }
  ho = !0;
} else typeof navigator == "object" && !zl ? (ze = navigator.userAgent, Wn = ze.indexOf("Windows") >= 0, qn = ze.indexOf("Macintosh") >= 0, (ze.indexOf("Macintosh") >= 0 || ze.indexOf("iPad") >= 0 || ze.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints > 0, xn = ze.indexOf("Linux") >= 0, (ze == null ? void 0 : ze.indexOf("Mobi")) >= 0, Ii = !0, Xt = co() || ft, Vt = navigator.language.toLowerCase(), ji = Vt) : console.error("Unable to resolve platform.");
const yt = Wn, Ul = qn, Pl = ho, Hl = Ii, Dl = Ii && typeof We.importScripts == "function", Wl = Dl ? We.origin : void 0, Pe = ze, Be = Xt;
var Ji;
(function(e) {
  function t() {
    return Be;
  }
  e.value = t;
  function n() {
    return Be.length === 2 ? Be === "en" : Be.length >= 3 ? Be[0] === "e" && Be[1] === "n" && Be[2] === "-" : !1;
  }
  e.isDefaultVariant = n;
  function i() {
    return Be === "en";
  }
  e.isDefault = i;
})(Ji || (Ji = {}));
const ql = typeof We.postMessage == "function" && !We.importScripts;
(() => {
  if (ql) {
    const e = [];
    We.addEventListener("message", (n) => {
      if (n.data && n.data.vscodeScheduleAsyncWork)
        for (let i = 0, r = e.length; i < r; i++) {
          const a = e[i];
          if (a.id === n.data.vscodeScheduleAsyncWork) {
            e.splice(i, 1), a.callback();
            return;
          }
        }
    });
    let t = 0;
    return (n) => {
      const i = ++t;
      e.push({
        id: i,
        callback: n
      }), We.postMessage({ vscodeScheduleAsyncWork: i }, "*");
    };
  }
  return (e) => setTimeout(e);
})();
const Fl = !!(Pe && Pe.indexOf("Chrome") >= 0);
Pe && Pe.indexOf("Firefox") >= 0;
!Fl && Pe && Pe.indexOf("Safari") >= 0;
Pe && Pe.indexOf("Edg/") >= 0;
Pe && Pe.indexOf("Android") >= 0;
const uo = Object.freeze(function(e, t) {
  const n = setTimeout(e.bind(t), 0);
  return { dispose() {
    clearTimeout(n);
  } };
});
var sn;
(function(e) {
  function t(n) {
    return n === e.None || n === e.Cancelled || n instanceof Jt ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
  }
  e.isCancellationToken = t, e.None = Object.freeze({
    isCancellationRequested: !1,
    onCancellationRequested: an.None
  }), e.Cancelled = Object.freeze({
    isCancellationRequested: !0,
    onCancellationRequested: uo
  });
})(sn || (sn = {}));
class Jt {
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
    return this._isCancelled ? uo : (this._emitter || (this._emitter = new xe()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
}
class Bl {
  constructor(t) {
    this._token = void 0, this._parentListener = void 0, this._parentListener = t && t.onCancellationRequested(this.cancel, this);
  }
  get token() {
    return this._token || (this._token = new Jt()), this._token;
  }
  cancel() {
    this._token ? this._token instanceof Jt && this._token.cancel() : this._token = sn.Cancelled;
  }
  dispose(t = !1) {
    var n;
    t && this.cancel(), (n = this._parentListener) == null || n.dispose(), this._token ? this._token instanceof Jt && this._token.dispose() : this._token = sn.None;
  }
}
function Vl(e) {
  return e;
}
class Kl {
  constructor(t, n) {
    this.lastCache = void 0, this.lastArgKey = void 0, typeof t == "function" ? (this._fn = t, this._computeKey = Vl) : (this._fn = n, this._computeKey = t.getCacheKey);
  }
  get(t) {
    const n = this._computeKey(t);
    return this.lastArgKey !== n && (this.lastArgKey = n, this.lastCache = this._fn(t)), this.lastCache;
  }
}
class Yi {
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
function jl(e) {
  return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
}
function Oi(e) {
  return e.split(/\r\n|\r|\n/);
}
function $l(e) {
  for (let t = 0, n = e.length; t < n; t++) {
    const i = e.charCodeAt(t);
    if (i !== 32 && i !== 9)
      return t;
  }
  return -1;
}
function Gl(e, t = e.length - 1) {
  for (let n = t; n >= 0; n--) {
    const i = e.charCodeAt(n);
    if (i !== 32 && i !== 9)
      return n;
  }
  return -1;
}
function Xl(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Jl(e, t, n = 0, i = e.length, r = 0, a = t.length) {
  for (; n < i && r < a; n++, r++) {
    const o = e.charCodeAt(n), c = t.charCodeAt(r);
    if (o < c)
      return -1;
    if (o > c)
      return 1;
  }
  const s = i - n, l = a - r;
  return s < l ? -1 : s > l ? 1 : 0;
}
function mo(e, t, n = 0, i = e.length, r = 0, a = t.length) {
  for (; n < i && r < a; n++, r++) {
    let o = e.charCodeAt(n), c = t.charCodeAt(r);
    if (o === c)
      continue;
    if (o >= 128 || c >= 128)
      return Jl(e.toLowerCase(), t.toLowerCase(), n, i, r, a);
    Qi(o) && (o -= 32), Qi(c) && (c -= 32);
    const h = o - c;
    if (h !== 0)
      return h;
  }
  const s = i - n, l = a - r;
  return s < l ? -1 : s > l ? 1 : 0;
}
function Qi(e) {
  return e >= 97 && e <= 122;
}
function po(e) {
  return e >= 65 && e <= 90;
}
function Yl(e, t) {
  return e.length === t.length && mo(e, t) === 0;
}
function Ql(e, t) {
  const n = t.length;
  return t.length > e.length ? !1 : mo(e, t, 0, n) === 0;
}
function Zi(e, t) {
  const n = Math.min(e.length, t.length);
  let i;
  for (i = 0; i < n; i++)
    if (e.charCodeAt(i) !== t.charCodeAt(i))
      return i;
  return n;
}
function Zl(e, t) {
  const n = Math.min(e.length, t.length);
  let i;
  const r = e.length - 1, a = t.length - 1;
  for (i = 0; i < n; i++)
    if (e.charCodeAt(r - i) !== t.charCodeAt(a - i))
      return i;
  return n;
}
function Fn(e) {
  return 55296 <= e && e <= 56319;
}
function ec(e) {
  return 56320 <= e && e <= 57343;
}
function tc(e, t) {
  return (e - 55296 << 10) + (t - 56320) + 65536;
}
function nc(e, t, n) {
  const i = e.charCodeAt(n);
  if (Fn(i) && n + 1 < t) {
    const r = e.charCodeAt(n + 1);
    if (ec(r))
      return tc(i, r);
  }
  return i;
}
const ic = /^[\t\n\r\x20-\x7E]*$/;
function rc(e) {
  return ic.test(e);
}
const Ze = class Bn {
  static getInstance(t) {
    return Bn.cache.get(Array.from(t));
  }
  static getLocales() {
    return Bn._locales.value;
  }
  constructor(t) {
    this.confusableDictionary = t;
  }
  isAmbiguous(t) {
    return this.confusableDictionary.has(t);
  }
  containsAmbiguousCharacter(t) {
    for (let n = 0; n < t.length; n++) {
      const i = t.codePointAt(n);
      if (typeof i == "number" && this.isAmbiguous(i))
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
Ze.ambiguousCharacterData = new Yi(() => JSON.parse('{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}')), Ze.cache = new Kl({ getCacheKey: JSON.stringify }, (e) => {
  function t(c) {
    const h = /* @__PURE__ */ new Map();
    for (let d = 0; d < c.length; d += 2)
      h.set(c[d], c[d + 1]);
    return h;
  }
  function n(c, h) {
    const d = new Map(c);
    for (const [m, p] of h)
      d.set(m, p);
    return d;
  }
  function i(c, h) {
    if (!c)
      return h;
    const d = /* @__PURE__ */ new Map();
    for (const [m, p] of c)
      h.has(m) && d.set(m, p);
    return d;
  }
  const r = Ze.ambiguousCharacterData.value;
  let a = e.filter((c) => !c.startsWith("_") && c in r);
  a.length === 0 && (a = ["_default"]);
  let s;
  for (const c of a) {
    const h = t(r[c]);
    s = i(s, h);
  }
  const l = t(r._common), o = n(l, s);
  return new Ze(o);
}), Ze._locales = new Yi(() => Object.keys(Ze.ambiguousCharacterData.value).filter((e) => !e.startsWith("_")));
let Vn = Ze;
const fo = class Rt {
  static getRawData() {
    return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]");
  }
  static getData() {
    return this._data || (this._data = new Set(Rt.getRawData())), this._data;
  }
  static isInvisibleCharacter(t) {
    return Rt.getData().has(t);
  }
  static containsInvisibleCharacter(t) {
    for (let n = 0; n < t.length; n++) {
      const i = t.codePointAt(n);
      if (typeof i == "number" && Rt.isInvisibleCharacter(i))
        return !0;
    }
    return !1;
  }
  static get codePoints() {
    return Rt.getData();
  }
};
fo._data = void 0;
let En = fo;
const Cn = "default", ac = "$initialize";
class sc {
  constructor(t, n, i, r, a) {
    this.vsWorker = t, this.req = n, this.channel = i, this.method = r, this.args = a, this.type = 0;
  }
}
class er {
  constructor(t, n, i, r) {
    this.vsWorker = t, this.seq = n, this.res = i, this.err = r, this.type = 1;
  }
}
class oc {
  constructor(t, n, i, r, a) {
    this.vsWorker = t, this.req = n, this.channel = i, this.eventName = r, this.arg = a, this.type = 2;
  }
}
class lc {
  constructor(t, n, i) {
    this.vsWorker = t, this.req = n, this.event = i, this.type = 3;
  }
}
class cc {
  constructor(t, n) {
    this.vsWorker = t, this.req = n, this.type = 4;
  }
}
class hc {
  constructor(t) {
    this._workerId = -1, this._handler = t, this._lastSentReq = 0, this._pendingReplies = /* @__PURE__ */ Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
  }
  setWorkerId(t) {
    this._workerId = t;
  }
  sendMessage(t, n, i) {
    const r = String(++this._lastSentReq);
    return new Promise((a, s) => {
      this._pendingReplies[r] = {
        resolve: a,
        reject: s
      }, this._send(new sc(this._workerId, r, t, n, i));
    });
  }
  listen(t, n, i) {
    let r = null;
    const a = new xe({
      onWillAddFirstListener: () => {
        r = String(++this._lastSentReq), this._pendingEmitters.set(r, a), this._send(new oc(this._workerId, r, t, n, i));
      },
      onDidRemoveLastListener: () => {
        this._pendingEmitters.delete(r), this._send(new cc(this._workerId, r)), r = null;
      }
    });
    return a.event;
  }
  handleMessage(t) {
    !t || !t.vsWorker || this._workerId !== -1 && t.vsWorker !== this._workerId || this._handleMessage(t);
  }
  createProxyToRemoteChannel(t, n) {
    const i = {
      get: (r, a) => (typeof a == "string" && !r[a] && (bo(a) ? r[a] = (s) => this.listen(t, a, s) : go(a) ? r[a] = this.listen(t, a, void 0) : a.charCodeAt(0) === 36 && (r[a] = async (...s) => (await (n == null ? void 0 : n()), this.sendMessage(t, a, s)))), r[a])
    };
    return new Proxy(/* @__PURE__ */ Object.create(null), i);
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
      let i = t.err;
      t.err.$isError && (i = new Error(), i.name = t.err.name, i.message = t.err.message, i.stack = t.err.stack), n.reject(i);
      return;
    }
    n.resolve(t.res);
  }
  _handleRequestMessage(t) {
    const n = t.req;
    this._handler.handleMessage(t.channel, t.method, t.args).then((i) => {
      this._send(new er(this._workerId, n, i, void 0));
    }, (i) => {
      i.detail instanceof Error && (i.detail = Fi(i.detail)), this._send(new er(this._workerId, n, void 0, Fi(i)));
    });
  }
  _handleSubscribeEventMessage(t) {
    const n = t.req, i = this._handler.handleEvent(t.channel, t.eventName, t.arg)((r) => {
      this._send(new lc(this._workerId, n, r));
    });
    this._pendingEvents.set(n, i);
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
      for (let i = 0; i < t.args.length; i++)
        t.args[i] instanceof ArrayBuffer && n.push(t.args[i]);
    else t.type === 1 && t.res instanceof ArrayBuffer && n.push(t.res);
    this._handler.sendMessage(t, n);
  }
}
function go(e) {
  return e[0] === "o" && e[1] === "n" && po(e.charCodeAt(2));
}
function bo(e) {
  return /^onDynamic/.test(e) && po(e.charCodeAt(9));
}
class uc {
  constructor(t, n) {
    this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._requestHandlerFactory = n, this._requestHandler = null, this._protocol = new hc({
      sendMessage: (i, r) => {
        t(i, r);
      },
      handleMessage: (i, r, a) => this._handleMessage(i, r, a),
      handleEvent: (i, r, a) => this._handleEvent(i, r, a)
    });
  }
  onmessage(t) {
    this._protocol.handleMessage(t);
  }
  _handleMessage(t, n, i) {
    if (t === Cn && n === ac)
      return this.initialize(i[0], i[1], i[2]);
    const r = t === Cn ? this._requestHandler : this._localChannels.get(t);
    if (!r)
      return Promise.reject(new Error(`Missing channel ${t} on worker thread`));
    if (typeof r[n] != "function")
      return Promise.reject(new Error(`Missing method ${n} on worker thread channel ${t}`));
    try {
      return Promise.resolve(r[n].apply(r, i));
    } catch (a) {
      return Promise.reject(a);
    }
  }
  _handleEvent(t, n, i) {
    const r = t === Cn ? this._requestHandler : this._localChannels.get(t);
    if (!r)
      throw new Error(`Missing channel ${t} on worker thread`);
    if (bo(n)) {
      const a = r[n].call(r, i);
      if (typeof a != "function")
        throw new Error(`Missing dynamic event ${n} on request handler.`);
      return a;
    }
    if (go(n)) {
      const a = r[n];
      if (typeof a != "function")
        throw new Error(`Missing event ${n} on request handler.`);
      return a;
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
  async initialize(t, n, i) {
    if (this._protocol.setWorkerId(t), this._requestHandlerFactory) {
      this._requestHandler = this._requestHandlerFactory(this);
      return;
    }
    return n && (typeof n.baseUrl < "u" && delete n.baseUrl, typeof n.paths < "u" && typeof n.paths.vs < "u" && delete n.paths.vs, typeof n.trustedTypesPolicy < "u" && delete n.trustedTypesPolicy, n.catchError = !0, globalThis.require.config(n)), Promise.reject(new Error("Unexpected usage"));
  }
}
class $e {
  constructor(t, n, i, r) {
    this.originalStart = t, this.originalLength = n, this.modifiedStart = i, this.modifiedLength = r;
  }
  getOriginalEnd() {
    return this.originalStart + this.originalLength;
  }
  getModifiedEnd() {
    return this.modifiedStart + this.modifiedLength;
  }
}
function tr(e, t) {
  return (t << 5) - t + e | 0;
}
function dc(e, t) {
  t = tr(149417, t);
  for (let n = 0, i = e.length; n < i; n++)
    t = tr(e.charCodeAt(n), t);
  return t;
}
class nr {
  constructor(t) {
    this.source = t;
  }
  getElements() {
    const t = this.source, n = new Int32Array(t.length);
    for (let i = 0, r = t.length; i < r; i++)
      n[i] = t.charCodeAt(i);
    return n;
  }
}
function mc(e, t, n) {
  return new Ge(new nr(e), new nr(t)).ComputeDiff(n).changes;
}
class ot {
  static Assert(t, n) {
    if (!t)
      throw new Error(n);
  }
}
class lt {
  static Copy(t, n, i, r, a) {
    for (let s = 0; s < a; s++)
      i[r + s] = t[n + s];
  }
  static Copy2(t, n, i, r, a) {
    for (let s = 0; s < a; s++)
      i[r + s] = t[n + s];
  }
}
class ir {
  constructor() {
    this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
  }
  MarkNextChange() {
    (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new $e(
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
class Ge {
  constructor(t, n, i = null) {
    this.ContinueProcessingPredicate = i, this._originalSequence = t, this._modifiedSequence = n;
    const [r, a, s] = Ge._getElements(t), [l, o, c] = Ge._getElements(n);
    this._hasStrings = s && c, this._originalStringElements = r, this._originalElementsOrHash = a, this._modifiedStringElements = l, this._modifiedElementsOrHash = o, this.m_forwardHistory = [], this.m_reverseHistory = [];
  }
  static _isStringArray(t) {
    return t.length > 0 && typeof t[0] == "string";
  }
  static _getElements(t) {
    const n = t.getElements();
    if (Ge._isStringArray(n)) {
      const i = new Int32Array(n.length);
      for (let r = 0, a = n.length; r < a; r++)
        i[r] = dc(n[r], 0);
      return [n, i, !0];
    }
    return n instanceof Int32Array ? [[], n, !1] : [[], new Int32Array(n), !1];
  }
  ElementsAreEqual(t, n) {
    return this._originalElementsOrHash[t] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[t] === this._modifiedStringElements[n] : !0;
  }
  ElementsAreStrictEqual(t, n) {
    if (!this.ElementsAreEqual(t, n))
      return !1;
    const i = Ge._getStrictElement(this._originalSequence, t), r = Ge._getStrictElement(this._modifiedSequence, n);
    return i === r;
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
  _ComputeDiff(t, n, i, r, a) {
    const s = [!1];
    let l = this.ComputeDiffRecursive(t, n, i, r, s);
    return a && (l = this.PrettifyChanges(l)), {
      quitEarly: s[0],
      changes: l
    };
  }
  ComputeDiffRecursive(t, n, i, r, a) {
    for (a[0] = !1; t <= n && i <= r && this.ElementsAreEqual(t, i); )
      t++, i++;
    for (; n >= t && r >= i && this.ElementsAreEqual(n, r); )
      n--, r--;
    if (t > n || i > r) {
      let d;
      return i <= r ? (ot.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), d = [
        new $e(t, 0, i, r - i + 1)
      ]) : t <= n ? (ot.Assert(i === r + 1, "modifiedStart should only be one more than modifiedEnd"), d = [
        new $e(t, n - t + 1, i, 0)
      ]) : (ot.Assert(t === n + 1, "originalStart should only be one more than originalEnd"), ot.Assert(i === r + 1, "modifiedStart should only be one more than modifiedEnd"), d = []), d;
    }
    const s = [0], l = [0], o = this.ComputeRecursionPoint(t, n, i, r, s, l, a), c = s[0], h = l[0];
    if (o !== null)
      return o;
    if (!a[0]) {
      const d = this.ComputeDiffRecursive(t, c, i, h, a);
      let m = [];
      return a[0] ? m = [
        new $e(
          c + 1,
          n - (c + 1) + 1,
          h + 1,
          r - (h + 1) + 1
        )
      ] : m = this.ComputeDiffRecursive(c + 1, n, h + 1, r, a), this.ConcatenateChanges(d, m);
    }
    return [
      new $e(
        t,
        n - t + 1,
        i,
        r - i + 1
      )
    ];
  }
  WALKTRACE(t, n, i, r, a, s, l, o, c, h, d, m, p, _, b, S, y, w) {
    let x = null, C = null, I = new ir(), N = n, g = i, f = p[0] - S[0] - r, T = -1073741824, U = this.m_forwardHistory.length - 1;
    do {
      const k = f + t;
      k === N || k < g && c[k - 1] < c[k + 1] ? (d = c[k + 1], _ = d - f - r, d < T && I.MarkNextChange(), T = d, I.AddModifiedElement(d + 1, _), f = k + 1 - t) : (d = c[k - 1] + 1, _ = d - f - r, d < T && I.MarkNextChange(), T = d - 1, I.AddOriginalElement(d, _ + 1), f = k - 1 - t), U >= 0 && (c = this.m_forwardHistory[U], t = c[0], N = 1, g = c.length - 1);
    } while (--U >= -1);
    if (x = I.getReverseChanges(), w[0]) {
      let k = p[0] + 1, E = S[0] + 1;
      if (x !== null && x.length > 0) {
        const A = x[x.length - 1];
        k = Math.max(k, A.getOriginalEnd()), E = Math.max(E, A.getModifiedEnd());
      }
      C = [
        new $e(
          k,
          m - k + 1,
          E,
          b - E + 1
        )
      ];
    } else {
      I = new ir(), N = s, g = l, f = p[0] - S[0] - o, T = 1073741824, U = y ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
      do {
        const k = f + a;
        k === N || k < g && h[k - 1] >= h[k + 1] ? (d = h[k + 1] - 1, _ = d - f - o, d > T && I.MarkNextChange(), T = d + 1, I.AddOriginalElement(d + 1, _ + 1), f = k + 1 - a) : (d = h[k - 1], _ = d - f - o, d > T && I.MarkNextChange(), T = d, I.AddModifiedElement(d + 1, _ + 1), f = k - 1 - a), U >= 0 && (h = this.m_reverseHistory[U], a = h[0], N = 1, g = h.length - 1);
      } while (--U >= -1);
      C = I.getChanges();
    }
    return this.ConcatenateChanges(x, C);
  }
  ComputeRecursionPoint(t, n, i, r, a, s, l) {
    let o = 0, c = 0, h = 0, d = 0, m = 0, p = 0;
    t--, i--, a[0] = 0, s[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
    const _ = n - t + (r - i), b = _ + 1, S = new Int32Array(b), y = new Int32Array(b), w = r - i, x = n - t, C = t - i, I = n - r, N = (x - w) % 2 === 0;
    S[w] = t, y[x] = n, l[0] = !1;
    for (let g = 1; g <= _ / 2 + 1; g++) {
      let f = 0, T = 0;
      h = this.ClipDiagonalBound(w - g, g, w, b), d = this.ClipDiagonalBound(w + g, g, w, b);
      for (let k = h; k <= d; k += 2) {
        k === h || k < d && S[k - 1] < S[k + 1] ? o = S[k + 1] : o = S[k - 1] + 1, c = o - (k - w) - C;
        const E = o;
        for (; o < n && c < r && this.ElementsAreEqual(o + 1, c + 1); )
          o++, c++;
        if (S[k] = o, o + c > f + T && (f = o, T = c), !N && Math.abs(k - x) <= g - 1 && o >= y[k])
          return a[0] = o, s[0] = c, E <= y[k] && g <= 1448 ? this.WALKTRACE(w, h, d, C, x, m, p, I, S, y, o, n, a, c, r, s, N, l) : null;
      }
      const U = (f - t + (T - i) - g) / 2;
      if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(f, U))
        return l[0] = !0, a[0] = f, s[0] = T, U > 0 && g <= 1448 ? this.WALKTRACE(w, h, d, C, x, m, p, I, S, y, o, n, a, c, r, s, N, l) : (t++, i++, [
          new $e(
            t,
            n - t + 1,
            i,
            r - i + 1
          )
        ]);
      m = this.ClipDiagonalBound(x - g, g, x, b), p = this.ClipDiagonalBound(x + g, g, x, b);
      for (let k = m; k <= p; k += 2) {
        k === m || k < p && y[k - 1] >= y[k + 1] ? o = y[k + 1] - 1 : o = y[k - 1], c = o - (k - x) - I;
        const E = o;
        for (; o > t && c > i && this.ElementsAreEqual(o, c); )
          o--, c--;
        if (y[k] = o, N && Math.abs(k - w) <= g && o <= S[k])
          return a[0] = o, s[0] = c, E >= S[k] && g <= 1448 ? this.WALKTRACE(w, h, d, C, x, m, p, I, S, y, o, n, a, c, r, s, N, l) : null;
      }
      if (g <= 1447) {
        let k = new Int32Array(d - h + 2);
        k[0] = w - h + 1, lt.Copy2(S, h, k, 1, d - h + 1), this.m_forwardHistory.push(k), k = new Int32Array(p - m + 2), k[0] = x - m + 1, lt.Copy2(y, m, k, 1, p - m + 1), this.m_reverseHistory.push(k);
      }
    }
    return this.WALKTRACE(w, h, d, C, x, m, p, I, S, y, o, n, a, c, r, s, N, l);
  }
  PrettifyChanges(t) {
    for (let n = 0; n < t.length; n++) {
      const i = t[n], r = n < t.length - 1 ? t[n + 1].originalStart : this._originalElementsOrHash.length, a = n < t.length - 1 ? t[n + 1].modifiedStart : this._modifiedElementsOrHash.length, s = i.originalLength > 0, l = i.modifiedLength > 0;
      for (; i.originalStart + i.originalLength < r && i.modifiedStart + i.modifiedLength < a && (!s || this.OriginalElementsAreEqual(i.originalStart, i.originalStart + i.originalLength)) && (!l || this.ModifiedElementsAreEqual(i.modifiedStart, i.modifiedStart + i.modifiedLength)); ) {
        const c = this.ElementsAreStrictEqual(i.originalStart, i.modifiedStart);
        if (this.ElementsAreStrictEqual(i.originalStart + i.originalLength, i.modifiedStart + i.modifiedLength) && !c)
          break;
        i.originalStart++, i.modifiedStart++;
      }
      const o = [null];
      if (n < t.length - 1 && this.ChangesOverlap(t[n], t[n + 1], o)) {
        t[n] = o[0], t.splice(n + 1, 1), n--;
        continue;
      }
    }
    for (let n = t.length - 1; n >= 0; n--) {
      const i = t[n];
      let r = 0, a = 0;
      if (n > 0) {
        const d = t[n - 1];
        r = d.originalStart + d.originalLength, a = d.modifiedStart + d.modifiedLength;
      }
      const s = i.originalLength > 0, l = i.modifiedLength > 0;
      let o = 0, c = this._boundaryScore(i.originalStart, i.originalLength, i.modifiedStart, i.modifiedLength);
      for (let d = 1; ; d++) {
        const m = i.originalStart - d, p = i.modifiedStart - d;
        if (m < r || p < a || s && !this.OriginalElementsAreEqual(m, m + i.originalLength) || l && !this.ModifiedElementsAreEqual(p, p + i.modifiedLength))
          break;
        const _ = (m === r && p === a ? 5 : 0) + this._boundaryScore(m, i.originalLength, p, i.modifiedLength);
        _ > c && (c = _, o = d);
      }
      i.originalStart -= o, i.modifiedStart -= o;
      const h = [null];
      if (n > 0 && this.ChangesOverlap(t[n - 1], t[n], h)) {
        t[n - 1] = h[0], t.splice(n, 1), n++;
        continue;
      }
    }
    if (this._hasStrings)
      for (let n = 1, i = t.length; n < i; n++) {
        const r = t[n - 1], a = t[n], s = a.originalStart - r.originalStart - r.originalLength, l = r.originalStart, o = a.originalStart + a.originalLength, c = o - l, h = r.modifiedStart, d = a.modifiedStart + a.modifiedLength, m = d - h;
        if (s < 5 && c < 20 && m < 20) {
          const p = this._findBetterContiguousSequence(l, c, h, m, s);
          if (p) {
            const [_, b] = p;
            (_ !== r.originalStart + r.originalLength || b !== r.modifiedStart + r.modifiedLength) && (r.originalLength = _ - r.originalStart, r.modifiedLength = b - r.modifiedStart, a.originalStart = _ + s, a.modifiedStart = b + s, a.originalLength = o - a.originalStart, a.modifiedLength = d - a.modifiedStart);
          }
        }
      }
    return t;
  }
  _findBetterContiguousSequence(t, n, i, r, a) {
    if (n < a || r < a)
      return null;
    const s = t + n - a + 1, l = i + r - a + 1;
    let o = 0, c = 0, h = 0;
    for (let d = t; d < s; d++)
      for (let m = i; m < l; m++) {
        const p = this._contiguousSequenceScore(d, m, a);
        p > 0 && p > o && (o = p, c = d, h = m);
      }
    return o > 0 ? [c, h] : null;
  }
  _contiguousSequenceScore(t, n, i) {
    let r = 0;
    for (let a = 0; a < i; a++) {
      if (!this.ElementsAreEqual(t + a, n + a))
        return 0;
      r += this._originalStringElements[t + a].length;
    }
    return r;
  }
  _OriginalIsBoundary(t) {
    return t <= 0 || t >= this._originalElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._originalStringElements[t]);
  }
  _OriginalRegionIsBoundary(t, n) {
    if (this._OriginalIsBoundary(t) || this._OriginalIsBoundary(t - 1))
      return !0;
    if (n > 0) {
      const i = t + n;
      if (this._OriginalIsBoundary(i - 1) || this._OriginalIsBoundary(i))
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
      const i = t + n;
      if (this._ModifiedIsBoundary(i - 1) || this._ModifiedIsBoundary(i))
        return !0;
    }
    return !1;
  }
  _boundaryScore(t, n, i, r) {
    const a = this._OriginalRegionIsBoundary(t, n) ? 1 : 0, s = this._ModifiedRegionIsBoundary(i, r) ? 1 : 0;
    return a + s;
  }
  ConcatenateChanges(t, n) {
    const i = [];
    if (t.length === 0 || n.length === 0)
      return n.length > 0 ? n : t;
    if (this.ChangesOverlap(t[t.length - 1], n[0], i)) {
      const r = new Array(t.length + n.length - 1);
      return lt.Copy(t, 0, r, 0, t.length - 1), r[t.length - 1] = i[0], lt.Copy(n, 1, r, t.length, n.length - 1), r;
    } else {
      const r = new Array(t.length + n.length);
      return lt.Copy(t, 0, r, 0, t.length), lt.Copy(n, 0, r, t.length, n.length), r;
    }
  }
  ChangesOverlap(t, n, i) {
    if (ot.Assert(t.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), ot.Assert(t.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), t.originalStart + t.originalLength >= n.originalStart || t.modifiedStart + t.modifiedLength >= n.modifiedStart) {
      const r = t.originalStart;
      let a = t.originalLength;
      const s = t.modifiedStart;
      let l = t.modifiedLength;
      return t.originalStart + t.originalLength >= n.originalStart && (a = n.originalStart + n.originalLength - t.originalStart), t.modifiedStart + t.modifiedLength >= n.modifiedStart && (l = n.modifiedStart + n.modifiedLength - t.modifiedStart), i[0] = new $e(r, a, s, l), !0;
    } else
      return i[0] = null, !1;
  }
  ClipDiagonalBound(t, n, i, r) {
    if (t >= 0 && t < r)
      return t;
    const a = i, s = r - i - 1, l = n % 2 === 0;
    if (t < 0) {
      const o = a % 2 === 0;
      return l === o ? 0 : 1;
    } else {
      const o = s % 2 === 0;
      return l === o ? r - 1 : r - 2;
    }
  }
}
let G = class et {
  constructor(t, n) {
    this.lineNumber = t, this.column = n;
  }
  with(t = this.lineNumber, n = this.column) {
    return t === this.lineNumber && n === this.column ? this : new et(t, n);
  }
  delta(t = 0, n = 0) {
    return this.with(this.lineNumber + t, this.column + n);
  }
  equals(t) {
    return et.equals(this, t);
  }
  static equals(t, n) {
    return !t && !n ? !0 : !!t && !!n && t.lineNumber === n.lineNumber && t.column === n.column;
  }
  isBefore(t) {
    return et.isBefore(this, t);
  }
  static isBefore(t, n) {
    return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column < n.column;
  }
  isBeforeOrEqual(t) {
    return et.isBeforeOrEqual(this, t);
  }
  static isBeforeOrEqual(t, n) {
    return t.lineNumber < n.lineNumber ? !0 : n.lineNumber < t.lineNumber ? !1 : t.column <= n.column;
  }
  static compare(t, n) {
    const i = t.lineNumber | 0, r = n.lineNumber | 0;
    if (i === r) {
      const a = t.column | 0, s = n.column | 0;
      return a - s;
    }
    return i - r;
  }
  clone() {
    return new et(this.lineNumber, this.column);
  }
  toString() {
    return "(" + this.lineNumber + "," + this.column + ")";
  }
  static lift(t) {
    return new et(t.lineNumber, t.column);
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
}, W = class ae {
  constructor(t, n, i, r) {
    t > i || t === i && n > r ? (this.startLineNumber = i, this.startColumn = r, this.endLineNumber = t, this.endColumn = n) : (this.startLineNumber = t, this.startColumn = n, this.endLineNumber = i, this.endColumn = r);
  }
  isEmpty() {
    return ae.isEmpty(this);
  }
  static isEmpty(t) {
    return t.startLineNumber === t.endLineNumber && t.startColumn === t.endColumn;
  }
  containsPosition(t) {
    return ae.containsPosition(this, t);
  }
  static containsPosition(t, n) {
    return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column < t.startColumn || n.lineNumber === t.endLineNumber && n.column > t.endColumn);
  }
  static strictContainsPosition(t, n) {
    return !(n.lineNumber < t.startLineNumber || n.lineNumber > t.endLineNumber || n.lineNumber === t.startLineNumber && n.column <= t.startColumn || n.lineNumber === t.endLineNumber && n.column >= t.endColumn);
  }
  containsRange(t) {
    return ae.containsRange(this, t);
  }
  static containsRange(t, n) {
    return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn < t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn > t.endColumn);
  }
  strictContainsRange(t) {
    return ae.strictContainsRange(this, t);
  }
  static strictContainsRange(t, n) {
    return !(n.startLineNumber < t.startLineNumber || n.endLineNumber < t.startLineNumber || n.startLineNumber > t.endLineNumber || n.endLineNumber > t.endLineNumber || n.startLineNumber === t.startLineNumber && n.startColumn <= t.startColumn || n.endLineNumber === t.endLineNumber && n.endColumn >= t.endColumn);
  }
  plusRange(t) {
    return ae.plusRange(this, t);
  }
  static plusRange(t, n) {
    let i, r, a, s;
    return n.startLineNumber < t.startLineNumber ? (i = n.startLineNumber, r = n.startColumn) : n.startLineNumber === t.startLineNumber ? (i = n.startLineNumber, r = Math.min(n.startColumn, t.startColumn)) : (i = t.startLineNumber, r = t.startColumn), n.endLineNumber > t.endLineNumber ? (a = n.endLineNumber, s = n.endColumn) : n.endLineNumber === t.endLineNumber ? (a = n.endLineNumber, s = Math.max(n.endColumn, t.endColumn)) : (a = t.endLineNumber, s = t.endColumn), new ae(i, r, a, s);
  }
  intersectRanges(t) {
    return ae.intersectRanges(this, t);
  }
  static intersectRanges(t, n) {
    let i = t.startLineNumber, r = t.startColumn, a = t.endLineNumber, s = t.endColumn;
    const l = n.startLineNumber, o = n.startColumn, c = n.endLineNumber, h = n.endColumn;
    return i < l ? (i = l, r = o) : i === l && (r = Math.max(r, o)), a > c ? (a = c, s = h) : a === c && (s = Math.min(s, h)), i > a || i === a && r > s ? null : new ae(
      i,
      r,
      a,
      s
    );
  }
  equalsRange(t) {
    return ae.equalsRange(this, t);
  }
  static equalsRange(t, n) {
    return !t && !n ? !0 : !!t && !!n && t.startLineNumber === n.startLineNumber && t.startColumn === n.startColumn && t.endLineNumber === n.endLineNumber && t.endColumn === n.endColumn;
  }
  getEndPosition() {
    return ae.getEndPosition(this);
  }
  static getEndPosition(t) {
    return new G(t.endLineNumber, t.endColumn);
  }
  getStartPosition() {
    return ae.getStartPosition(this);
  }
  static getStartPosition(t) {
    return new G(t.startLineNumber, t.startColumn);
  }
  toString() {
    return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
  }
  setEndPosition(t, n) {
    return new ae(this.startLineNumber, this.startColumn, t, n);
  }
  setStartPosition(t, n) {
    return new ae(t, n, this.endLineNumber, this.endColumn);
  }
  collapseToStart() {
    return ae.collapseToStart(this);
  }
  static collapseToStart(t) {
    return new ae(
      t.startLineNumber,
      t.startColumn,
      t.startLineNumber,
      t.startColumn
    );
  }
  collapseToEnd() {
    return ae.collapseToEnd(this);
  }
  static collapseToEnd(t) {
    return new ae(t.endLineNumber, t.endColumn, t.endLineNumber, t.endColumn);
  }
  delta(t) {
    return new ae(
      this.startLineNumber + t,
      this.startColumn,
      this.endLineNumber + t,
      this.endColumn
    );
  }
  static fromPositions(t, n = t) {
    return new ae(t.lineNumber, t.column, n.lineNumber, n.column);
  }
  static lift(t) {
    return t ? new ae(
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
      const i = t.startLineNumber | 0, r = n.startLineNumber | 0;
      if (i === r) {
        const a = t.startColumn | 0, s = n.startColumn | 0;
        if (a === s) {
          const l = t.endLineNumber | 0, o = n.endLineNumber | 0;
          if (l === o) {
            const c = t.endColumn | 0, h = n.endColumn | 0;
            return c - h;
          }
          return l - o;
        }
        return a - s;
      }
      return i - r;
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
function rr(e) {
  return e < 0 ? 0 : e > 255 ? 255 : e | 0;
}
function ct(e) {
  return e < 0 ? 0 : e > 4294967295 ? 4294967295 : e | 0;
}
class zi {
  constructor(t) {
    const n = rr(t);
    this._defaultValue = n, this._asciiMap = zi._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
  }
  static _createAsciiMap(t) {
    const n = new Uint8Array(256);
    return n.fill(t), n;
  }
  set(t, n) {
    const i = rr(n);
    t >= 0 && t < 256 ? this._asciiMap[t] = i : this._map.set(t, i);
  }
  get(t) {
    return t >= 0 && t < 256 ? this._asciiMap[t] : this._map.get(t) || this._defaultValue;
  }
  clear() {
    this._asciiMap.fill(this._defaultValue), this._map.clear();
  }
}
class pc {
  constructor(t, n, i) {
    const r = new Uint8Array(t * n);
    for (let a = 0, s = t * n; a < s; a++)
      r[a] = i;
    this._data = r, this.rows = t, this.cols = n;
  }
  get(t, n) {
    return this._data[t * this.cols + n];
  }
  set(t, n, i) {
    this._data[t * this.cols + n] = i;
  }
}
class fc {
  constructor(t) {
    let n = 0, i = 0;
    for (let a = 0, s = t.length; a < s; a++) {
      const [l, o, c] = t[a];
      o > n && (n = o), l > i && (i = l), c > i && (i = c);
    }
    n++, i++;
    const r = new pc(i, n, 0);
    for (let a = 0, s = t.length; a < s; a++) {
      const [l, o, c] = t[a];
      r.set(l, o, c);
    }
    this._states = r, this._maxCharCode = n;
  }
  nextState(t, n) {
    return n < 0 || n >= this._maxCharCode ? 0 : this._states.get(t, n);
  }
}
let Rn = null;
function gc() {
  return Rn === null && (Rn = new fc([
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
  ])), Rn;
}
let Lt = null;
function bc() {
  if (Lt === null) {
    Lt = new zi(0);
    const e = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…`;
    for (let n = 0; n < e.length; n++)
      Lt.set(e.charCodeAt(n), 1);
    const t = ".,;:";
    for (let n = 0; n < t.length; n++)
      Lt.set(t.charCodeAt(n), 2);
  }
  return Lt;
}
class on {
  static _createLink(t, n, i, r, a) {
    let s = a - 1;
    do {
      const l = n.charCodeAt(s);
      if (t.get(l) !== 2)
        break;
      s--;
    } while (s > r);
    if (r > 0) {
      const l = n.charCodeAt(r - 1), o = n.charCodeAt(s);
      (l === 40 && o === 41 || l === 91 && o === 93 || l === 123 && o === 125) && s--;
    }
    return {
      range: {
        startLineNumber: i,
        startColumn: r + 1,
        endLineNumber: i,
        endColumn: s + 2
      },
      url: n.substring(r, s + 1)
    };
  }
  static computeLinks(t, n = gc()) {
    const i = bc(), r = [];
    for (let a = 1, s = t.getLineCount(); a <= s; a++) {
      const l = t.getLineContent(a), o = l.length;
      let c = 0, h = 0, d = 0, m = 1, p = !1, _ = !1, b = !1, S = !1;
      for (; c < o; ) {
        let y = !1;
        const w = l.charCodeAt(c);
        if (m === 13) {
          let x;
          switch (w) {
            case 40:
              p = !0, x = 0;
              break;
            case 41:
              x = p ? 0 : 1;
              break;
            case 91:
              b = !0, _ = !0, x = 0;
              break;
            case 93:
              b = !1, x = _ ? 0 : 1;
              break;
            case 123:
              S = !0, x = 0;
              break;
            case 125:
              x = S ? 0 : 1;
              break;
            case 39:
            case 34:
            case 96:
              d === w ? x = 1 : d === 39 || d === 34 || d === 96 ? x = 0 : x = 1;
              break;
            case 42:
              x = d === 42 ? 1 : 0;
              break;
            case 124:
              x = d === 124 ? 1 : 0;
              break;
            case 32:
              x = b ? 0 : 1;
              break;
            default:
              x = i.get(w);
          }
          x === 1 && (r.push(on._createLink(i, l, a, h, c)), y = !0);
        } else if (m === 12) {
          let x;
          w === 91 ? (_ = !0, x = 0) : x = i.get(w), x === 1 ? y = !0 : m = 13;
        } else
          m = n.nextState(m, w), m === 0 && (y = !0);
        y && (m = 1, p = !1, _ = !1, S = !1, h = c + 1, d = w), c++;
      }
      m === 13 && r.push(on._createLink(i, l, a, h, o));
    }
    return r;
  }
}
function _c(e) {
  return !e || typeof e.getLineCount != "function" || typeof e.getLineContent != "function" ? [] : on.computeLinks(e);
}
const Kn = class {
  constructor() {
    this._defaultValueSet = [
      ["true", "false"],
      ["True", "False"],
      ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"],
      ["public", "protected", "private"]
    ];
  }
  navigateValueSet(t, n, i, r, a) {
    if (t && n) {
      const s = this.doNavigateValueSet(n, a);
      if (s)
        return {
          range: t,
          value: s
        };
    }
    if (i && r) {
      const s = this.doNavigateValueSet(r, a);
      if (s)
        return {
          range: i,
          value: s
        };
    }
    return null;
  }
  doNavigateValueSet(t, n) {
    const i = this.numberReplace(t, n);
    return i !== null ? i : this.textReplace(t, n);
  }
  numberReplace(t, n) {
    const i = Math.pow(10, t.length - (t.lastIndexOf(".") + 1));
    let r = Number(t);
    const a = parseFloat(t);
    return !isNaN(r) && !isNaN(a) && r === a ? r === 0 && !n ? null : (r = Math.floor(r * i), r += n ? i : -i, String(r / i)) : null;
  }
  textReplace(t, n) {
    return this.valueSetsReplace(this._defaultValueSet, t, n);
  }
  valueSetsReplace(t, n, i) {
    let r = null;
    for (let a = 0, s = t.length; r === null && a < s; a++)
      r = this.valueSetReplace(t[a], n, i);
    return r;
  }
  valueSetReplace(t, n, i) {
    let r = t.indexOf(n);
    return r >= 0 ? (r += i ? 1 : -1, r < 0 ? r = t.length - 1 : r %= t.length, t[r]) : null;
  }
};
Kn.INSTANCE = new Kn();
let wc = Kn;
class Ui {
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
const Yt = new Ui(), jn = new Ui(), $n = new Ui(), vc = new Array(230), yc = /* @__PURE__ */ Object.create(null), Tc = /* @__PURE__ */ Object.create(null);
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
  ], n = [], i = [];
  for (const r of t) {
    const [a, s, l, o, c, h, d, m, p] = r;
    if (i[s] || (i[s] = !0, yc[l] = s, Tc[l.toLowerCase()] = s), !n[o]) {
      if (n[o] = !0, !c)
        throw new Error(
          `String representation missing for key code ${o} around scan code ${l}`
        );
      Yt.define(o, c), jn.define(o, m || c), $n.define(o, p || m || c);
    }
    h && (vc[h] = o);
  }
})();
var ar;
(function(e) {
  function t(l) {
    return Yt.keyCodeToStr(l);
  }
  e.toString = t;
  function n(l) {
    return Yt.strToKeyCode(l);
  }
  e.fromString = n;
  function i(l) {
    return jn.keyCodeToStr(l);
  }
  e.toUserSettingsUS = i;
  function r(l) {
    return $n.keyCodeToStr(l);
  }
  e.toUserSettingsGeneral = r;
  function a(l) {
    return jn.strToKeyCode(l) || $n.strToKeyCode(l);
  }
  e.fromUserSettings = a;
  function s(l) {
    if (l >= 98 && l <= 113)
      return null;
    switch (l) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Yt.keyCodeToStr(l);
  }
  e.toElectronAccelerator = s;
})(ar || (ar = {}));
function kc(e, t) {
  const n = (t & 65535) << 16 >>> 0;
  return (e | n) >>> 0;
}
let rt;
const An = globalThis.vscode;
var sr;
if (typeof An < "u" && typeof An.process < "u") {
  const e = An.process;
  rt = {
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
} else typeof process < "u" && typeof ((sr = process == null ? void 0 : process.versions) == null ? void 0 : sr.node) == "string" ? rt = {
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
} : rt = {
  get platform() {
    return yt ? "win32" : Ul ? "darwin" : "linux";
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
const ln = rt.cwd, Sc = rt.env, Lc = rt.platform;
rt.arch;
const xc = 65, Ec = 97, Cc = 90, Rc = 122, Xe = 46, he = 47, ge = 92, Ve = 58, Ac = 63;
class _o extends Error {
  constructor(t, n, i) {
    let r;
    typeof n == "string" && n.indexOf("not ") === 0 ? (r = "must not be", n = n.replace(/^not /, "")) : r = "must be";
    const a = t.indexOf(".") !== -1 ? "property" : "argument";
    let s = `The "${t}" ${a} ${r} of type ${n}`;
    s += `. Received type ${typeof i}`, super(s), this.code = "ERR_INVALID_ARG_TYPE";
  }
}
function Nc(e, t) {
  if (e === null || typeof e != "object")
    throw new _o(t, "Object", e);
}
function re(e, t) {
  if (typeof e != "string")
    throw new _o(t, "string", e);
}
const Re = Lc === "win32";
function j(e) {
  return e === he || e === ge;
}
function Gn(e) {
  return e === he;
}
function Ke(e) {
  return e >= xc && e <= Cc || e >= Ec && e <= Rc;
}
function cn(e, t, n, i) {
  let r = "", a = 0, s = -1, l = 0, o = 0;
  for (let c = 0; c <= e.length; ++c) {
    if (c < e.length)
      o = e.charCodeAt(c);
    else {
      if (i(o))
        break;
      o = he;
    }
    if (i(o)) {
      if (!(s === c - 1 || l === 1)) if (l === 2) {
        if (r.length < 2 || a !== 2 || r.charCodeAt(r.length - 1) !== Xe || r.charCodeAt(r.length - 2) !== Xe) {
          if (r.length > 2) {
            const h = r.lastIndexOf(n);
            h === -1 ? (r = "", a = 0) : (r = r.slice(0, h), a = r.length - 1 - r.lastIndexOf(n)), s = c, l = 0;
            continue;
          } else if (r.length !== 0) {
            r = "", a = 0, s = c, l = 0;
            continue;
          }
        }
        t && (r += r.length > 0 ? `${n}..` : "..", a = 2);
      } else
        r.length > 0 ? r += `${n}${e.slice(s + 1, c)}` : r = e.slice(s + 1, c), a = c - s - 1;
      s = c, l = 0;
    } else o === Xe && l !== -1 ? ++l : l = -1;
  }
  return r;
}
function Mc(e) {
  return e ? `${e[0] === "." ? "" : "."}${e}` : "";
}
function wo(e, t) {
  Nc(t, "pathObject");
  const n = t.dir || t.root, i = t.base || `${t.name || ""}${Mc(t.ext)}`;
  return n ? n === t.root ? `${n}${i}` : `${n}${e}${i}` : i;
}
const le = {
  resolve(...e) {
    let t = "", n = "", i = !1;
    for (let r = e.length - 1; r >= -1; r--) {
      let a;
      if (r >= 0) {
        if (a = e[r], re(a, `paths[${r}]`), a.length === 0)
          continue;
      } else t.length === 0 ? a = ln() : (a = Sc[`=${t}`] || ln(), (a === void 0 || a.slice(0, 2).toLowerCase() !== t.toLowerCase() && a.charCodeAt(2) === ge) && (a = `${t}\\`));
      const s = a.length;
      let l = 0, o = "", c = !1;
      const h = a.charCodeAt(0);
      if (s === 1)
        j(h) && (l = 1, c = !0);
      else if (j(h))
        if (c = !0, j(a.charCodeAt(1))) {
          let d = 2, m = d;
          for (; d < s && !j(a.charCodeAt(d)); )
            d++;
          if (d < s && d !== m) {
            const p = a.slice(m, d);
            for (m = d; d < s && j(a.charCodeAt(d)); )
              d++;
            if (d < s && d !== m) {
              for (m = d; d < s && !j(a.charCodeAt(d)); )
                d++;
              (d === s || d !== m) && (o = `\\\\${p}\\${a.slice(m, d)}`, l = d);
            }
          }
        } else
          l = 1;
      else Ke(h) && a.charCodeAt(1) === Ve && (o = a.slice(0, 2), l = 2, s > 2 && j(a.charCodeAt(2)) && (c = !0, l = 3));
      if (o.length > 0)
        if (t.length > 0) {
          if (o.toLowerCase() !== t.toLowerCase())
            continue;
        } else
          t = o;
      if (i) {
        if (t.length > 0)
          break;
      } else if (n = `${a.slice(l)}\\${n}`, i = c, c && t.length > 0)
        break;
    }
    return n = cn(n, !i, "\\", j), i ? `${t}\\${n}` : `${t}${n}` || ".";
  },
  normalize(e) {
    re(e, "path");
    const t = e.length;
    if (t === 0)
      return ".";
    let n = 0, i, r = !1;
    const a = e.charCodeAt(0);
    if (t === 1)
      return Gn(a) ? "\\" : e;
    if (j(a))
      if (r = !0, j(e.charCodeAt(1))) {
        let l = 2, o = l;
        for (; l < t && !j(e.charCodeAt(l)); )
          l++;
        if (l < t && l !== o) {
          const c = e.slice(o, l);
          for (o = l; l < t && j(e.charCodeAt(l)); )
            l++;
          if (l < t && l !== o) {
            for (o = l; l < t && !j(e.charCodeAt(l)); )
              l++;
            if (l === t)
              return `\\\\${c}\\${e.slice(o)}\\`;
            l !== o && (i = `\\\\${c}\\${e.slice(o, l)}`, n = l);
          }
        }
      } else
        n = 1;
    else Ke(a) && e.charCodeAt(1) === Ve && (i = e.slice(0, 2), n = 2, t > 2 && j(e.charCodeAt(2)) && (r = !0, n = 3));
    let s = n < t ? cn(e.slice(n), !r, "\\", j) : "";
    return s.length === 0 && !r && (s = "."), s.length > 0 && j(e.charCodeAt(t - 1)) && (s += "\\"), i === void 0 ? r ? `\\${s}` : s : r ? `${i}\\${s}` : `${i}${s}`;
  },
  isAbsolute(e) {
    re(e, "path");
    const t = e.length;
    if (t === 0)
      return !1;
    const n = e.charCodeAt(0);
    return j(n) || t > 2 && Ke(n) && e.charCodeAt(1) === Ve && j(e.charCodeAt(2));
  },
  join(...e) {
    if (e.length === 0)
      return ".";
    let t, n;
    for (let a = 0; a < e.length; ++a) {
      const s = e[a];
      re(s, "path"), s.length > 0 && (t === void 0 ? t = n = s : t += `\\${s}`);
    }
    if (t === void 0)
      return ".";
    let i = !0, r = 0;
    if (typeof n == "string" && j(n.charCodeAt(0))) {
      ++r;
      const a = n.length;
      a > 1 && j(n.charCodeAt(1)) && (++r, a > 2 && (j(n.charCodeAt(2)) ? ++r : i = !1));
    }
    if (i) {
      for (; r < t.length && j(t.charCodeAt(r)); )
        r++;
      r >= 2 && (t = `\\${t.slice(r)}`);
    }
    return le.normalize(t);
  },
  relative(e, t) {
    if (re(e, "from"), re(t, "to"), e === t)
      return "";
    const n = le.resolve(e), i = le.resolve(t);
    if (n === i || (e = n.toLowerCase(), t = i.toLowerCase(), e === t))
      return "";
    let r = 0;
    for (; r < e.length && e.charCodeAt(r) === ge; )
      r++;
    let a = e.length;
    for (; a - 1 > r && e.charCodeAt(a - 1) === ge; )
      a--;
    const s = a - r;
    let l = 0;
    for (; l < t.length && t.charCodeAt(l) === ge; )
      l++;
    let o = t.length;
    for (; o - 1 > l && t.charCodeAt(o - 1) === ge; )
      o--;
    const c = o - l, h = s < c ? s : c;
    let d = -1, m = 0;
    for (; m < h; m++) {
      const _ = e.charCodeAt(r + m);
      if (_ !== t.charCodeAt(l + m))
        break;
      _ === ge && (d = m);
    }
    if (m !== h) {
      if (d === -1)
        return i;
    } else {
      if (c > h) {
        if (t.charCodeAt(l + m) === ge)
          return i.slice(l + m + 1);
        if (m === 2)
          return i.slice(l + m);
      }
      s > h && (e.charCodeAt(r + m) === ge ? d = m : m === 2 && (d = 3)), d === -1 && (d = 0);
    }
    let p = "";
    for (m = r + d + 1; m <= a; ++m)
      (m === a || e.charCodeAt(m) === ge) && (p += p.length === 0 ? ".." : "\\..");
    return l += d, p.length > 0 ? `${p}${i.slice(l, o)}` : (i.charCodeAt(l) === ge && ++l, i.slice(l, o));
  },
  toNamespacedPath(e) {
    if (typeof e != "string" || e.length === 0)
      return e;
    const t = le.resolve(e);
    if (t.length <= 2)
      return e;
    if (t.charCodeAt(0) === ge) {
      if (t.charCodeAt(1) === ge) {
        const n = t.charCodeAt(2);
        if (n !== Ac && n !== Xe)
          return `\\\\?\\UNC\\${t.slice(2)}`;
      }
    } else if (Ke(t.charCodeAt(0)) && t.charCodeAt(1) === Ve && t.charCodeAt(2) === ge)
      return `\\\\?\\${t}`;
    return e;
  },
  dirname(e) {
    re(e, "path");
    const t = e.length;
    if (t === 0)
      return ".";
    let n = -1, i = 0;
    const r = e.charCodeAt(0);
    if (t === 1)
      return j(r) ? e : ".";
    if (j(r)) {
      if (n = i = 1, j(e.charCodeAt(1))) {
        let l = 2, o = l;
        for (; l < t && !j(e.charCodeAt(l)); )
          l++;
        if (l < t && l !== o) {
          for (o = l; l < t && j(e.charCodeAt(l)); )
            l++;
          if (l < t && l !== o) {
            for (o = l; l < t && !j(e.charCodeAt(l)); )
              l++;
            if (l === t)
              return e;
            l !== o && (n = i = l + 1);
          }
        }
      }
    } else Ke(r) && e.charCodeAt(1) === Ve && (n = t > 2 && j(e.charCodeAt(2)) ? 3 : 2, i = n);
    let a = -1, s = !0;
    for (let l = t - 1; l >= i; --l)
      if (j(e.charCodeAt(l))) {
        if (!s) {
          a = l;
          break;
        }
      } else
        s = !1;
    if (a === -1) {
      if (n === -1)
        return ".";
      a = n;
    }
    return e.slice(0, a);
  },
  basename(e, t) {
    t !== void 0 && re(t, "suffix"), re(e, "path");
    let n = 0, i = -1, r = !0, a;
    if (e.length >= 2 && Ke(e.charCodeAt(0)) && e.charCodeAt(1) === Ve && (n = 2), t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t === e)
        return "";
      let s = t.length - 1, l = -1;
      for (a = e.length - 1; a >= n; --a) {
        const o = e.charCodeAt(a);
        if (j(o)) {
          if (!r) {
            n = a + 1;
            break;
          }
        } else
          l === -1 && (r = !1, l = a + 1), s >= 0 && (o === t.charCodeAt(s) ? --s === -1 && (i = a) : (s = -1, i = l));
      }
      return n === i ? i = l : i === -1 && (i = e.length), e.slice(n, i);
    }
    for (a = e.length - 1; a >= n; --a)
      if (j(e.charCodeAt(a))) {
        if (!r) {
          n = a + 1;
          break;
        }
      } else i === -1 && (r = !1, i = a + 1);
    return i === -1 ? "" : e.slice(n, i);
  },
  extname(e) {
    re(e, "path");
    let t = 0, n = -1, i = 0, r = -1, a = !0, s = 0;
    e.length >= 2 && e.charCodeAt(1) === Ve && Ke(e.charCodeAt(0)) && (t = i = 2);
    for (let l = e.length - 1; l >= t; --l) {
      const o = e.charCodeAt(l);
      if (j(o)) {
        if (!a) {
          i = l + 1;
          break;
        }
        continue;
      }
      r === -1 && (a = !1, r = l + 1), o === Xe ? n === -1 ? n = l : s !== 1 && (s = 1) : n !== -1 && (s = -1);
    }
    return n === -1 || r === -1 || s === 0 || s === 1 && n === r - 1 && n === i + 1 ? "" : e.slice(n, r);
  },
  format: wo.bind(null, "\\"),
  parse(e) {
    re(e, "path");
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    const n = e.length;
    let i = 0, r = e.charCodeAt(0);
    if (n === 1)
      return j(r) ? (t.root = t.dir = e, t) : (t.base = t.name = e, t);
    if (j(r)) {
      if (i = 1, j(e.charCodeAt(1))) {
        let d = 2, m = d;
        for (; d < n && !j(e.charCodeAt(d)); )
          d++;
        if (d < n && d !== m) {
          for (m = d; d < n && j(e.charCodeAt(d)); )
            d++;
          if (d < n && d !== m) {
            for (m = d; d < n && !j(e.charCodeAt(d)); )
              d++;
            d === n ? i = d : d !== m && (i = d + 1);
          }
        }
      }
    } else if (Ke(r) && e.charCodeAt(1) === Ve) {
      if (n <= 2)
        return t.root = t.dir = e, t;
      if (i = 2, j(e.charCodeAt(2))) {
        if (n === 3)
          return t.root = t.dir = e, t;
        i = 3;
      }
    }
    i > 0 && (t.root = e.slice(0, i));
    let a = -1, s = i, l = -1, o = !0, c = e.length - 1, h = 0;
    for (; c >= i; --c) {
      if (r = e.charCodeAt(c), j(r)) {
        if (!o) {
          s = c + 1;
          break;
        }
        continue;
      }
      l === -1 && (o = !1, l = c + 1), r === Xe ? a === -1 ? a = c : h !== 1 && (h = 1) : a !== -1 && (h = -1);
    }
    return l !== -1 && (a === -1 || h === 0 || h === 1 && a === l - 1 && a === s + 1 ? t.base = t.name = e.slice(s, l) : (t.name = e.slice(s, a), t.base = e.slice(s, l), t.ext = e.slice(a, l))), s > 0 && s !== i ? t.dir = e.slice(0, s - 1) : t.dir = t.root, t;
  },
  sep: "\\",
  delimiter: ";",
  win32: null,
  posix: null
}, Ic = (() => {
  if (Re) {
    const e = /\\/g;
    return () => {
      const t = ln().replace(e, "/");
      return t.slice(t.indexOf("/"));
    };
  }
  return () => ln();
})(), Q = {
  resolve(...e) {
    let t = "", n = !1;
    for (let i = e.length - 1; i >= -1 && !n; i--) {
      const r = i >= 0 ? e[i] : Ic();
      re(r, `paths[${i}]`), r.length !== 0 && (t = `${r}/${t}`, n = r.charCodeAt(0) === he);
    }
    return t = cn(t, !n, "/", Gn), n ? `/${t}` : t.length > 0 ? t : ".";
  },
  normalize(e) {
    if (re(e, "path"), e.length === 0)
      return ".";
    const t = e.charCodeAt(0) === he, n = e.charCodeAt(e.length - 1) === he;
    return e = cn(e, !t, "/", Gn), e.length === 0 ? t ? "/" : n ? "./" : "." : (n && (e += "/"), t ? `/${e}` : e);
  },
  isAbsolute(e) {
    return re(e, "path"), e.length > 0 && e.charCodeAt(0) === he;
  },
  join(...e) {
    if (e.length === 0)
      return ".";
    let t;
    for (let n = 0; n < e.length; ++n) {
      const i = e[n];
      re(i, "path"), i.length > 0 && (t === void 0 ? t = i : t += `/${i}`);
    }
    return t === void 0 ? "." : Q.normalize(t);
  },
  relative(e, t) {
    if (re(e, "from"), re(t, "to"), e === t || (e = Q.resolve(e), t = Q.resolve(t), e === t))
      return "";
    const n = 1, i = e.length, r = i - n, a = 1, s = t.length - a, l = r < s ? r : s;
    let o = -1, c = 0;
    for (; c < l; c++) {
      const d = e.charCodeAt(n + c);
      if (d !== t.charCodeAt(a + c))
        break;
      d === he && (o = c);
    }
    if (c === l)
      if (s > l) {
        if (t.charCodeAt(a + c) === he)
          return t.slice(a + c + 1);
        if (c === 0)
          return t.slice(a + c);
      } else r > l && (e.charCodeAt(n + c) === he ? o = c : c === 0 && (o = 0));
    let h = "";
    for (c = n + o + 1; c <= i; ++c)
      (c === i || e.charCodeAt(c) === he) && (h += h.length === 0 ? ".." : "/..");
    return `${h}${t.slice(a + o)}`;
  },
  toNamespacedPath(e) {
    return e;
  },
  dirname(e) {
    if (re(e, "path"), e.length === 0)
      return ".";
    const t = e.charCodeAt(0) === he;
    let n = -1, i = !0;
    for (let r = e.length - 1; r >= 1; --r)
      if (e.charCodeAt(r) === he) {
        if (!i) {
          n = r;
          break;
        }
      } else
        i = !1;
    return n === -1 ? t ? "/" : "." : t && n === 1 ? "//" : e.slice(0, n);
  },
  basename(e, t) {
    t !== void 0 && re(t, "ext"), re(e, "path");
    let n = 0, i = -1, r = !0, a;
    if (t !== void 0 && t.length > 0 && t.length <= e.length) {
      if (t === e)
        return "";
      let s = t.length - 1, l = -1;
      for (a = e.length - 1; a >= 0; --a) {
        const o = e.charCodeAt(a);
        if (o === he) {
          if (!r) {
            n = a + 1;
            break;
          }
        } else
          l === -1 && (r = !1, l = a + 1), s >= 0 && (o === t.charCodeAt(s) ? --s === -1 && (i = a) : (s = -1, i = l));
      }
      return n === i ? i = l : i === -1 && (i = e.length), e.slice(n, i);
    }
    for (a = e.length - 1; a >= 0; --a)
      if (e.charCodeAt(a) === he) {
        if (!r) {
          n = a + 1;
          break;
        }
      } else i === -1 && (r = !1, i = a + 1);
    return i === -1 ? "" : e.slice(n, i);
  },
  extname(e) {
    re(e, "path");
    let t = -1, n = 0, i = -1, r = !0, a = 0;
    for (let s = e.length - 1; s >= 0; --s) {
      const l = e.charCodeAt(s);
      if (l === he) {
        if (!r) {
          n = s + 1;
          break;
        }
        continue;
      }
      i === -1 && (r = !1, i = s + 1), l === Xe ? t === -1 ? t = s : a !== 1 && (a = 1) : t !== -1 && (a = -1);
    }
    return t === -1 || i === -1 || a === 0 || a === 1 && t === i - 1 && t === n + 1 ? "" : e.slice(t, i);
  },
  format: wo.bind(null, "/"),
  parse(e) {
    re(e, "path");
    const t = { root: "", dir: "", base: "", ext: "", name: "" };
    if (e.length === 0)
      return t;
    const n = e.charCodeAt(0) === he;
    let i;
    n ? (t.root = "/", i = 1) : i = 0;
    let r = -1, a = 0, s = -1, l = !0, o = e.length - 1, c = 0;
    for (; o >= i; --o) {
      const h = e.charCodeAt(o);
      if (h === he) {
        if (!l) {
          a = o + 1;
          break;
        }
        continue;
      }
      s === -1 && (l = !1, s = o + 1), h === Xe ? r === -1 ? r = o : c !== 1 && (c = 1) : r !== -1 && (c = -1);
    }
    if (s !== -1) {
      const h = a === 0 && n ? 1 : a;
      r === -1 || c === 0 || c === 1 && r === s - 1 && r === a + 1 ? t.base = t.name = e.slice(h, s) : (t.name = e.slice(h, r), t.base = e.slice(h, s), t.ext = e.slice(r, s));
    }
    return a > 0 ? t.dir = e.slice(0, a - 1) : n && (t.dir = "/"), t;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
Q.win32 = le.win32 = le;
Q.posix = le.posix = Q;
const Oc = Re ? le.normalize : Q.normalize;
Re ? le.isAbsolute : Q.isAbsolute;
const zc = Re ? le.join : Q.join, Uc = Re ? le.resolve : Q.resolve, Pc = Re ? le.relative : Q.relative, Hc = Re ? le.dirname : Q.dirname;
Re ? le.basename : Q.basename;
Re ? le.extname : Q.extname;
Re ? le.parse : Q.parse;
const Qt = Re ? le.sep : Q.sep;
Re ? le.delimiter : Q.delimiter;
const Dc = /^\w[\w\d+.-]*$/, Wc = /^\//, qc = /^\/\//;
function Fc(e, t) {
  if (!e.scheme && t)
    throw new Error(
      `[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`
    );
  if (e.scheme && !Dc.test(e.scheme))
    throw new Error("[UriError]: Scheme contains illegal characters.");
  if (e.path) {
    if (e.authority) {
      if (!Wc.test(e.path))
        throw new Error(
          '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
        );
    } else if (qc.test(e.path))
      throw new Error(
        '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
      );
  }
}
function Bc(e, t) {
  return !e && !t ? "file" : e;
}
function Vc(e, t) {
  switch (e) {
    case "https":
    case "http":
    case "file":
      t ? t[0] !== Ie && (t = Ie + t) : t = Ie;
      break;
  }
  return t;
}
const Z = "", Ie = "/", Kc = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
let _e = class Zt {
  static isUri(t) {
    return t instanceof Zt ? !0 : t ? typeof t.authority == "string" && typeof t.fragment == "string" && typeof t.path == "string" && typeof t.query == "string" && typeof t.scheme == "string" && typeof t.fsPath == "string" && typeof t.with == "function" && typeof t.toString == "function" : !1;
  }
  constructor(t, n, i, r, a, s = !1) {
    typeof t == "object" ? (this.scheme = t.scheme || Z, this.authority = t.authority || Z, this.path = t.path || Z, this.query = t.query || Z, this.fragment = t.fragment || Z) : (this.scheme = Bc(t, s), this.authority = n || Z, this.path = Vc(this.scheme, i || Z), this.query = r || Z, this.fragment = a || Z, Fc(this, s));
  }
  get fsPath() {
    return hn(this, !1);
  }
  with(t) {
    if (!t)
      return this;
    let { scheme: n, authority: i, path: r, query: a, fragment: s } = t;
    return n === void 0 ? n = this.scheme : n === null && (n = Z), i === void 0 ? i = this.authority : i === null && (i = Z), r === void 0 ? r = this.path : r === null && (r = Z), a === void 0 ? a = this.query : a === null && (a = Z), s === void 0 ? s = this.fragment : s === null && (s = Z), n === this.scheme && i === this.authority && r === this.path && a === this.query && s === this.fragment ? this : new ht(n, i, r, a, s);
  }
  static parse(t, n = !1) {
    const i = Kc.exec(t);
    return i ? new ht(
      i[2] || Z,
      Kt(i[4] || Z),
      Kt(i[5] || Z),
      Kt(i[7] || Z),
      Kt(i[9] || Z),
      n
    ) : new ht(Z, Z, Z, Z, Z);
  }
  static file(t) {
    let n = Z;
    if (yt && (t = t.replace(/\\/g, Ie)), t[0] === Ie && t[1] === Ie) {
      const i = t.indexOf(Ie, 2);
      i === -1 ? (n = t.substring(2), t = Ie) : (n = t.substring(2, i), t = t.substring(i) || Ie);
    }
    return new ht("file", n, t, Z, Z);
  }
  static from(t, n) {
    return new ht(
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
    let i;
    return yt && t.scheme === "file" ? i = Zt.file(le.join(hn(t, !0), ...n)).path : i = Q.join(t.path, ...n), t.with({ path: i });
  }
  toString(t = !1) {
    return Xn(this, t);
  }
  toJSON() {
    return this;
  }
  static revive(t) {
    if (t) {
      if (t instanceof Zt)
        return t;
      {
        const n = new ht(t);
        return n._formatted = t.external ?? null, n._fsPath = t._sep === vo ? t.fsPath ?? null : null, n;
      }
    } else return t;
  }
  [Symbol.for("debug.description")]() {
    return `URI(${this.toString()})`;
  }
};
const vo = yt ? 1 : void 0;
class ht extends _e {
  constructor() {
    super(...arguments), this._formatted = null, this._fsPath = null;
  }
  get fsPath() {
    return this._fsPath || (this._fsPath = hn(this, !1)), this._fsPath;
  }
  toString(t = !1) {
    return t ? Xn(this, !0) : (this._formatted || (this._formatted = Xn(this, !1)), this._formatted);
  }
  toJSON() {
    const t = {
      $mid: 1
    };
    return this._fsPath && (t.fsPath = this._fsPath, t._sep = vo), this._formatted && (t.external = this._formatted), this.path && (t.path = this.path), this.scheme && (t.scheme = this.scheme), this.authority && (t.authority = this.authority), this.query && (t.query = this.query), this.fragment && (t.fragment = this.fragment), t;
  }
}
const yo = {
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
function or(e, t, n) {
  let i, r = -1;
  for (let a = 0; a < e.length; a++) {
    const s = e.charCodeAt(a);
    if (s >= 97 && s <= 122 || s >= 65 && s <= 90 || s >= 48 && s <= 57 || s === 45 || s === 46 || s === 95 || s === 126 || t && s === 47 || n && s === 91 || n && s === 93 || n && s === 58)
      r !== -1 && (i += encodeURIComponent(e.substring(r, a)), r = -1), i !== void 0 && (i += e.charAt(a));
    else {
      i === void 0 && (i = e.substr(0, a));
      const l = yo[s];
      l !== void 0 ? (r !== -1 && (i += encodeURIComponent(e.substring(r, a)), r = -1), i += l) : r === -1 && (r = a);
    }
  }
  return r !== -1 && (i += encodeURIComponent(e.substring(r))), i !== void 0 ? i : e;
}
function jc(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const i = e.charCodeAt(n);
    i === 35 || i === 63 ? (t === void 0 && (t = e.substr(0, n)), t += yo[i]) : t !== void 0 && (t += e[n]);
  }
  return t !== void 0 ? t : e;
}
function hn(e, t) {
  let n;
  return e.authority && e.path.length > 1 && e.scheme === "file" ? n = `//${e.authority}${e.path}` : e.path.charCodeAt(0) === 47 && (e.path.charCodeAt(1) >= 65 && e.path.charCodeAt(1) <= 90 || e.path.charCodeAt(1) >= 97 && e.path.charCodeAt(1) <= 122) && e.path.charCodeAt(2) === 58 ? t ? n = e.path.substr(1) : n = e.path[1].toLowerCase() + e.path.substr(2) : n = e.path, yt && (n = n.replace(/\//g, "\\")), n;
}
function Xn(e, t) {
  const n = t ? jc : or;
  let i = "", { scheme: r, authority: a, path: s, query: l, fragment: o } = e;
  if (r && (i += r, i += ":"), (a || r === "file") && (i += Ie, i += Ie), a) {
    let c = a.indexOf("@");
    if (c !== -1) {
      const h = a.substr(0, c);
      a = a.substr(c + 1), c = h.lastIndexOf(":"), c === -1 ? i += n(h, !1, !1) : (i += n(h.substr(0, c), !1, !1), i += ":", i += n(h.substr(c + 1), !1, !0)), i += "@";
    }
    a = a.toLowerCase(), c = a.lastIndexOf(":"), c === -1 ? i += n(a, !1, !0) : (i += n(a.substr(0, c), !1, !0), i += a.substr(c));
  }
  if (s) {
    if (s.length >= 3 && s.charCodeAt(0) === 47 && s.charCodeAt(2) === 58) {
      const c = s.charCodeAt(1);
      c >= 65 && c <= 90 && (s = `/${String.fromCharCode(c + 32)}:${s.substr(3)}`);
    } else if (s.length >= 2 && s.charCodeAt(1) === 58) {
      const c = s.charCodeAt(0);
      c >= 65 && c <= 90 && (s = `${String.fromCharCode(c + 32)}:${s.substr(2)}`);
    }
    i += n(s, !0, !1);
  }
  return l && (i += "?", i += n(l, !1, !1)), o && (i += "#", i += t ? o : or(o, !1, !1)), i;
}
function To(e) {
  try {
    return decodeURIComponent(e);
  } catch {
    return e.length > 3 ? e.substr(0, 3) + To(e.substr(3)) : e;
  }
}
const lr = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function Kt(e) {
  return e.match(lr) ? e.replace(lr, (t) => To(t)) : e;
}
class ve extends W {
  constructor(t, n, i, r) {
    super(t, n, i, r), this.selectionStartLineNumber = t, this.selectionStartColumn = n, this.positionLineNumber = i, this.positionColumn = r;
  }
  toString() {
    return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
  }
  equalsSelection(t) {
    return ve.selectionsEqual(this, t);
  }
  static selectionsEqual(t, n) {
    return t.selectionStartLineNumber === n.selectionStartLineNumber && t.selectionStartColumn === n.selectionStartColumn && t.positionLineNumber === n.positionLineNumber && t.positionColumn === n.positionColumn;
  }
  getDirection() {
    return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
  }
  setEndPosition(t, n) {
    return this.getDirection() === 0 ? new ve(this.startLineNumber, this.startColumn, t, n) : new ve(t, n, this.startLineNumber, this.startColumn);
  }
  getPosition() {
    return new G(this.positionLineNumber, this.positionColumn);
  }
  getSelectionStart() {
    return new G(this.selectionStartLineNumber, this.selectionStartColumn);
  }
  setStartPosition(t, n) {
    return this.getDirection() === 0 ? new ve(t, n, this.endLineNumber, this.endColumn) : new ve(this.endLineNumber, this.endColumn, t, n);
  }
  static fromPositions(t, n = t) {
    return new ve(t.lineNumber, t.column, n.lineNumber, n.column);
  }
  static fromRange(t, n) {
    return n === 0 ? new ve(
      t.startLineNumber,
      t.startColumn,
      t.endLineNumber,
      t.endColumn
    ) : new ve(
      t.endLineNumber,
      t.endColumn,
      t.startLineNumber,
      t.startColumn
    );
  }
  static liftSelection(t) {
    return new ve(
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
    for (let i = 0, r = t.length; i < r; i++)
      if (!this.selectionsEqual(t[i], n[i]))
        return !1;
    return !0;
  }
  static isISelection(t) {
    return t && typeof t.selectionStartLineNumber == "number" && typeof t.selectionStartColumn == "number" && typeof t.positionLineNumber == "number" && typeof t.positionColumn == "number";
  }
  static createWithDirection(t, n, i, r, a) {
    return a === 0 ? new ve(t, n, i, r) : new ve(i, r, t, n);
  }
}
function $c(e) {
  return typeof e == "string";
}
const cr = /* @__PURE__ */ Object.create(null);
function u(e, t) {
  if ($c(t)) {
    const n = cr[t];
    if (n === void 0)
      throw new Error(`${e} references an unknown codicon: ${t}`);
    t = n;
  }
  return cr[e] = t, { id: e };
}
const Gc = {
  add: u("add", 6e4),
  plus: u("plus", 6e4),
  gistNew: u("gist-new", 6e4),
  repoCreate: u("repo-create", 6e4),
  lightbulb: u("lightbulb", 60001),
  lightBulb: u("light-bulb", 60001),
  repo: u("repo", 60002),
  repoDelete: u("repo-delete", 60002),
  gistFork: u("gist-fork", 60003),
  repoForked: u("repo-forked", 60003),
  gitPullRequest: u("git-pull-request", 60004),
  gitPullRequestAbandoned: u("git-pull-request-abandoned", 60004),
  recordKeys: u("record-keys", 60005),
  keyboard: u("keyboard", 60005),
  tag: u("tag", 60006),
  gitPullRequestLabel: u("git-pull-request-label", 60006),
  tagAdd: u("tag-add", 60006),
  tagRemove: u("tag-remove", 60006),
  person: u("person", 60007),
  personFollow: u("person-follow", 60007),
  personOutline: u("person-outline", 60007),
  personFilled: u("person-filled", 60007),
  gitBranch: u("git-branch", 60008),
  gitBranchCreate: u("git-branch-create", 60008),
  gitBranchDelete: u("git-branch-delete", 60008),
  sourceControl: u("source-control", 60008),
  mirror: u("mirror", 60009),
  mirrorPublic: u("mirror-public", 60009),
  star: u("star", 60010),
  starAdd: u("star-add", 60010),
  starDelete: u("star-delete", 60010),
  starEmpty: u("star-empty", 60010),
  comment: u("comment", 60011),
  commentAdd: u("comment-add", 60011),
  alert: u("alert", 60012),
  warning: u("warning", 60012),
  search: u("search", 60013),
  searchSave: u("search-save", 60013),
  logOut: u("log-out", 60014),
  signOut: u("sign-out", 60014),
  logIn: u("log-in", 60015),
  signIn: u("sign-in", 60015),
  eye: u("eye", 60016),
  eyeUnwatch: u("eye-unwatch", 60016),
  eyeWatch: u("eye-watch", 60016),
  circleFilled: u("circle-filled", 60017),
  primitiveDot: u("primitive-dot", 60017),
  closeDirty: u("close-dirty", 60017),
  debugBreakpoint: u("debug-breakpoint", 60017),
  debugBreakpointDisabled: u("debug-breakpoint-disabled", 60017),
  debugHint: u("debug-hint", 60017),
  terminalDecorationSuccess: u("terminal-decoration-success", 60017),
  primitiveSquare: u("primitive-square", 60018),
  edit: u("edit", 60019),
  pencil: u("pencil", 60019),
  info: u("info", 60020),
  issueOpened: u("issue-opened", 60020),
  gistPrivate: u("gist-private", 60021),
  gitForkPrivate: u("git-fork-private", 60021),
  lock: u("lock", 60021),
  mirrorPrivate: u("mirror-private", 60021),
  close: u("close", 60022),
  removeClose: u("remove-close", 60022),
  x: u("x", 60022),
  repoSync: u("repo-sync", 60023),
  sync: u("sync", 60023),
  clone: u("clone", 60024),
  desktopDownload: u("desktop-download", 60024),
  beaker: u("beaker", 60025),
  microscope: u("microscope", 60025),
  vm: u("vm", 60026),
  deviceDesktop: u("device-desktop", 60026),
  file: u("file", 60027),
  fileText: u("file-text", 60027),
  more: u("more", 60028),
  ellipsis: u("ellipsis", 60028),
  kebabHorizontal: u("kebab-horizontal", 60028),
  mailReply: u("mail-reply", 60029),
  reply: u("reply", 60029),
  organization: u("organization", 60030),
  organizationFilled: u("organization-filled", 60030),
  organizationOutline: u("organization-outline", 60030),
  newFile: u("new-file", 60031),
  fileAdd: u("file-add", 60031),
  newFolder: u("new-folder", 60032),
  fileDirectoryCreate: u("file-directory-create", 60032),
  trash: u("trash", 60033),
  trashcan: u("trashcan", 60033),
  history: u("history", 60034),
  clock: u("clock", 60034),
  folder: u("folder", 60035),
  fileDirectory: u("file-directory", 60035),
  symbolFolder: u("symbol-folder", 60035),
  logoGithub: u("logo-github", 60036),
  markGithub: u("mark-github", 60036),
  github: u("github", 60036),
  terminal: u("terminal", 60037),
  console: u("console", 60037),
  repl: u("repl", 60037),
  zap: u("zap", 60038),
  symbolEvent: u("symbol-event", 60038),
  error: u("error", 60039),
  stop: u("stop", 60039),
  variable: u("variable", 60040),
  symbolVariable: u("symbol-variable", 60040),
  array: u("array", 60042),
  symbolArray: u("symbol-array", 60042),
  symbolModule: u("symbol-module", 60043),
  symbolPackage: u("symbol-package", 60043),
  symbolNamespace: u("symbol-namespace", 60043),
  symbolObject: u("symbol-object", 60043),
  symbolMethod: u("symbol-method", 60044),
  symbolFunction: u("symbol-function", 60044),
  symbolConstructor: u("symbol-constructor", 60044),
  symbolBoolean: u("symbol-boolean", 60047),
  symbolNull: u("symbol-null", 60047),
  symbolNumeric: u("symbol-numeric", 60048),
  symbolNumber: u("symbol-number", 60048),
  symbolStructure: u("symbol-structure", 60049),
  symbolStruct: u("symbol-struct", 60049),
  symbolParameter: u("symbol-parameter", 60050),
  symbolTypeParameter: u("symbol-type-parameter", 60050),
  symbolKey: u("symbol-key", 60051),
  symbolText: u("symbol-text", 60051),
  symbolReference: u("symbol-reference", 60052),
  goToFile: u("go-to-file", 60052),
  symbolEnum: u("symbol-enum", 60053),
  symbolValue: u("symbol-value", 60053),
  symbolRuler: u("symbol-ruler", 60054),
  symbolUnit: u("symbol-unit", 60054),
  activateBreakpoints: u("activate-breakpoints", 60055),
  archive: u("archive", 60056),
  arrowBoth: u("arrow-both", 60057),
  arrowDown: u("arrow-down", 60058),
  arrowLeft: u("arrow-left", 60059),
  arrowRight: u("arrow-right", 60060),
  arrowSmallDown: u("arrow-small-down", 60061),
  arrowSmallLeft: u("arrow-small-left", 60062),
  arrowSmallRight: u("arrow-small-right", 60063),
  arrowSmallUp: u("arrow-small-up", 60064),
  arrowUp: u("arrow-up", 60065),
  bell: u("bell", 60066),
  bold: u("bold", 60067),
  book: u("book", 60068),
  bookmark: u("bookmark", 60069),
  debugBreakpointConditionalUnverified: u("debug-breakpoint-conditional-unverified", 60070),
  debugBreakpointConditional: u("debug-breakpoint-conditional", 60071),
  debugBreakpointConditionalDisabled: u("debug-breakpoint-conditional-disabled", 60071),
  debugBreakpointDataUnverified: u("debug-breakpoint-data-unverified", 60072),
  debugBreakpointData: u("debug-breakpoint-data", 60073),
  debugBreakpointDataDisabled: u("debug-breakpoint-data-disabled", 60073),
  debugBreakpointLogUnverified: u("debug-breakpoint-log-unverified", 60074),
  debugBreakpointLog: u("debug-breakpoint-log", 60075),
  debugBreakpointLogDisabled: u("debug-breakpoint-log-disabled", 60075),
  briefcase: u("briefcase", 60076),
  broadcast: u("broadcast", 60077),
  browser: u("browser", 60078),
  bug: u("bug", 60079),
  calendar: u("calendar", 60080),
  caseSensitive: u("case-sensitive", 60081),
  check: u("check", 60082),
  checklist: u("checklist", 60083),
  chevronDown: u("chevron-down", 60084),
  chevronLeft: u("chevron-left", 60085),
  chevronRight: u("chevron-right", 60086),
  chevronUp: u("chevron-up", 60087),
  chromeClose: u("chrome-close", 60088),
  chromeMaximize: u("chrome-maximize", 60089),
  chromeMinimize: u("chrome-minimize", 60090),
  chromeRestore: u("chrome-restore", 60091),
  circleOutline: u("circle-outline", 60092),
  circle: u("circle", 60092),
  debugBreakpointUnverified: u("debug-breakpoint-unverified", 60092),
  terminalDecorationIncomplete: u("terminal-decoration-incomplete", 60092),
  circleSlash: u("circle-slash", 60093),
  circuitBoard: u("circuit-board", 60094),
  clearAll: u("clear-all", 60095),
  clippy: u("clippy", 60096),
  closeAll: u("close-all", 60097),
  cloudDownload: u("cloud-download", 60098),
  cloudUpload: u("cloud-upload", 60099),
  code: u("code", 60100),
  collapseAll: u("collapse-all", 60101),
  colorMode: u("color-mode", 60102),
  commentDiscussion: u("comment-discussion", 60103),
  creditCard: u("credit-card", 60105),
  dash: u("dash", 60108),
  dashboard: u("dashboard", 60109),
  database: u("database", 60110),
  debugContinue: u("debug-continue", 60111),
  debugDisconnect: u("debug-disconnect", 60112),
  debugPause: u("debug-pause", 60113),
  debugRestart: u("debug-restart", 60114),
  debugStart: u("debug-start", 60115),
  debugStepInto: u("debug-step-into", 60116),
  debugStepOut: u("debug-step-out", 60117),
  debugStepOver: u("debug-step-over", 60118),
  debugStop: u("debug-stop", 60119),
  debug: u("debug", 60120),
  deviceCameraVideo: u("device-camera-video", 60121),
  deviceCamera: u("device-camera", 60122),
  deviceMobile: u("device-mobile", 60123),
  diffAdded: u("diff-added", 60124),
  diffIgnored: u("diff-ignored", 60125),
  diffModified: u("diff-modified", 60126),
  diffRemoved: u("diff-removed", 60127),
  diffRenamed: u("diff-renamed", 60128),
  diff: u("diff", 60129),
  diffSidebyside: u("diff-sidebyside", 60129),
  discard: u("discard", 60130),
  editorLayout: u("editor-layout", 60131),
  emptyWindow: u("empty-window", 60132),
  exclude: u("exclude", 60133),
  extensions: u("extensions", 60134),
  eyeClosed: u("eye-closed", 60135),
  fileBinary: u("file-binary", 60136),
  fileCode: u("file-code", 60137),
  fileMedia: u("file-media", 60138),
  filePdf: u("file-pdf", 60139),
  fileSubmodule: u("file-submodule", 60140),
  fileSymlinkDirectory: u("file-symlink-directory", 60141),
  fileSymlinkFile: u("file-symlink-file", 60142),
  fileZip: u("file-zip", 60143),
  files: u("files", 60144),
  filter: u("filter", 60145),
  flame: u("flame", 60146),
  foldDown: u("fold-down", 60147),
  foldUp: u("fold-up", 60148),
  fold: u("fold", 60149),
  folderActive: u("folder-active", 60150),
  folderOpened: u("folder-opened", 60151),
  gear: u("gear", 60152),
  gift: u("gift", 60153),
  gistSecret: u("gist-secret", 60154),
  gist: u("gist", 60155),
  gitCommit: u("git-commit", 60156),
  gitCompare: u("git-compare", 60157),
  compareChanges: u("compare-changes", 60157),
  gitMerge: u("git-merge", 60158),
  githubAction: u("github-action", 60159),
  githubAlt: u("github-alt", 60160),
  globe: u("globe", 60161),
  grabber: u("grabber", 60162),
  graph: u("graph", 60163),
  gripper: u("gripper", 60164),
  heart: u("heart", 60165),
  home: u("home", 60166),
  horizontalRule: u("horizontal-rule", 60167),
  hubot: u("hubot", 60168),
  inbox: u("inbox", 60169),
  issueReopened: u("issue-reopened", 60171),
  issues: u("issues", 60172),
  italic: u("italic", 60173),
  jersey: u("jersey", 60174),
  json: u("json", 60175),
  kebabVertical: u("kebab-vertical", 60176),
  key: u("key", 60177),
  law: u("law", 60178),
  lightbulbAutofix: u("lightbulb-autofix", 60179),
  linkExternal: u("link-external", 60180),
  link: u("link", 60181),
  listOrdered: u("list-ordered", 60182),
  listUnordered: u("list-unordered", 60183),
  liveShare: u("live-share", 60184),
  loading: u("loading", 60185),
  location: u("location", 60186),
  mailRead: u("mail-read", 60187),
  mail: u("mail", 60188),
  markdown: u("markdown", 60189),
  megaphone: u("megaphone", 60190),
  mention: u("mention", 60191),
  milestone: u("milestone", 60192),
  gitPullRequestMilestone: u("git-pull-request-milestone", 60192),
  mortarBoard: u("mortar-board", 60193),
  move: u("move", 60194),
  multipleWindows: u("multiple-windows", 60195),
  mute: u("mute", 60196),
  noNewline: u("no-newline", 60197),
  note: u("note", 60198),
  octoface: u("octoface", 60199),
  openPreview: u("open-preview", 60200),
  package: u("package", 60201),
  paintcan: u("paintcan", 60202),
  pin: u("pin", 60203),
  play: u("play", 60204),
  run: u("run", 60204),
  plug: u("plug", 60205),
  preserveCase: u("preserve-case", 60206),
  preview: u("preview", 60207),
  project: u("project", 60208),
  pulse: u("pulse", 60209),
  question: u("question", 60210),
  quote: u("quote", 60211),
  radioTower: u("radio-tower", 60212),
  reactions: u("reactions", 60213),
  references: u("references", 60214),
  refresh: u("refresh", 60215),
  regex: u("regex", 60216),
  remoteExplorer: u("remote-explorer", 60217),
  remote: u("remote", 60218),
  remove: u("remove", 60219),
  replaceAll: u("replace-all", 60220),
  replace: u("replace", 60221),
  repoClone: u("repo-clone", 60222),
  repoForcePush: u("repo-force-push", 60223),
  repoPull: u("repo-pull", 60224),
  repoPush: u("repo-push", 60225),
  report: u("report", 60226),
  requestChanges: u("request-changes", 60227),
  rocket: u("rocket", 60228),
  rootFolderOpened: u("root-folder-opened", 60229),
  rootFolder: u("root-folder", 60230),
  rss: u("rss", 60231),
  ruby: u("ruby", 60232),
  saveAll: u("save-all", 60233),
  saveAs: u("save-as", 60234),
  save: u("save", 60235),
  screenFull: u("screen-full", 60236),
  screenNormal: u("screen-normal", 60237),
  searchStop: u("search-stop", 60238),
  server: u("server", 60240),
  settingsGear: u("settings-gear", 60241),
  settings: u("settings", 60242),
  shield: u("shield", 60243),
  smiley: u("smiley", 60244),
  sortPrecedence: u("sort-precedence", 60245),
  splitHorizontal: u("split-horizontal", 60246),
  splitVertical: u("split-vertical", 60247),
  squirrel: u("squirrel", 60248),
  starFull: u("star-full", 60249),
  starHalf: u("star-half", 60250),
  symbolClass: u("symbol-class", 60251),
  symbolColor: u("symbol-color", 60252),
  symbolConstant: u("symbol-constant", 60253),
  symbolEnumMember: u("symbol-enum-member", 60254),
  symbolField: u("symbol-field", 60255),
  symbolFile: u("symbol-file", 60256),
  symbolInterface: u("symbol-interface", 60257),
  symbolKeyword: u("symbol-keyword", 60258),
  symbolMisc: u("symbol-misc", 60259),
  symbolOperator: u("symbol-operator", 60260),
  symbolProperty: u("symbol-property", 60261),
  wrench: u("wrench", 60261),
  wrenchSubaction: u("wrench-subaction", 60261),
  symbolSnippet: u("symbol-snippet", 60262),
  tasklist: u("tasklist", 60263),
  telescope: u("telescope", 60264),
  textSize: u("text-size", 60265),
  threeBars: u("three-bars", 60266),
  thumbsdown: u("thumbsdown", 60267),
  thumbsup: u("thumbsup", 60268),
  tools: u("tools", 60269),
  triangleDown: u("triangle-down", 60270),
  triangleLeft: u("triangle-left", 60271),
  triangleRight: u("triangle-right", 60272),
  triangleUp: u("triangle-up", 60273),
  twitter: u("twitter", 60274),
  unfold: u("unfold", 60275),
  unlock: u("unlock", 60276),
  unmute: u("unmute", 60277),
  unverified: u("unverified", 60278),
  verified: u("verified", 60279),
  versions: u("versions", 60280),
  vmActive: u("vm-active", 60281),
  vmOutline: u("vm-outline", 60282),
  vmRunning: u("vm-running", 60283),
  watch: u("watch", 60284),
  whitespace: u("whitespace", 60285),
  wholeWord: u("whole-word", 60286),
  window: u("window", 60287),
  wordWrap: u("word-wrap", 60288),
  zoomIn: u("zoom-in", 60289),
  zoomOut: u("zoom-out", 60290),
  listFilter: u("list-filter", 60291),
  listFlat: u("list-flat", 60292),
  listSelection: u("list-selection", 60293),
  selection: u("selection", 60293),
  listTree: u("list-tree", 60294),
  debugBreakpointFunctionUnverified: u("debug-breakpoint-function-unverified", 60295),
  debugBreakpointFunction: u("debug-breakpoint-function", 60296),
  debugBreakpointFunctionDisabled: u("debug-breakpoint-function-disabled", 60296),
  debugStackframeActive: u("debug-stackframe-active", 60297),
  circleSmallFilled: u("circle-small-filled", 60298),
  debugStackframeDot: u("debug-stackframe-dot", 60298),
  terminalDecorationMark: u("terminal-decoration-mark", 60298),
  debugStackframe: u("debug-stackframe", 60299),
  debugStackframeFocused: u("debug-stackframe-focused", 60299),
  debugBreakpointUnsupported: u("debug-breakpoint-unsupported", 60300),
  symbolString: u("symbol-string", 60301),
  debugReverseContinue: u("debug-reverse-continue", 60302),
  debugStepBack: u("debug-step-back", 60303),
  debugRestartFrame: u("debug-restart-frame", 60304),
  debugAlt: u("debug-alt", 60305),
  callIncoming: u("call-incoming", 60306),
  callOutgoing: u("call-outgoing", 60307),
  menu: u("menu", 60308),
  expandAll: u("expand-all", 60309),
  feedback: u("feedback", 60310),
  gitPullRequestReviewer: u("git-pull-request-reviewer", 60310),
  groupByRefType: u("group-by-ref-type", 60311),
  ungroupByRefType: u("ungroup-by-ref-type", 60312),
  account: u("account", 60313),
  gitPullRequestAssignee: u("git-pull-request-assignee", 60313),
  bellDot: u("bell-dot", 60314),
  debugConsole: u("debug-console", 60315),
  library: u("library", 60316),
  output: u("output", 60317),
  runAll: u("run-all", 60318),
  syncIgnored: u("sync-ignored", 60319),
  pinned: u("pinned", 60320),
  githubInverted: u("github-inverted", 60321),
  serverProcess: u("server-process", 60322),
  serverEnvironment: u("server-environment", 60323),
  pass: u("pass", 60324),
  issueClosed: u("issue-closed", 60324),
  stopCircle: u("stop-circle", 60325),
  playCircle: u("play-circle", 60326),
  record: u("record", 60327),
  debugAltSmall: u("debug-alt-small", 60328),
  vmConnect: u("vm-connect", 60329),
  cloud: u("cloud", 60330),
  merge: u("merge", 60331),
  export: u("export", 60332),
  graphLeft: u("graph-left", 60333),
  magnet: u("magnet", 60334),
  notebook: u("notebook", 60335),
  redo: u("redo", 60336),
  checkAll: u("check-all", 60337),
  pinnedDirty: u("pinned-dirty", 60338),
  passFilled: u("pass-filled", 60339),
  circleLargeFilled: u("circle-large-filled", 60340),
  circleLarge: u("circle-large", 60341),
  circleLargeOutline: u("circle-large-outline", 60341),
  combine: u("combine", 60342),
  gather: u("gather", 60342),
  table: u("table", 60343),
  variableGroup: u("variable-group", 60344),
  typeHierarchy: u("type-hierarchy", 60345),
  typeHierarchySub: u("type-hierarchy-sub", 60346),
  typeHierarchySuper: u("type-hierarchy-super", 60347),
  gitPullRequestCreate: u("git-pull-request-create", 60348),
  runAbove: u("run-above", 60349),
  runBelow: u("run-below", 60350),
  notebookTemplate: u("notebook-template", 60351),
  debugRerun: u("debug-rerun", 60352),
  workspaceTrusted: u("workspace-trusted", 60353),
  workspaceUntrusted: u("workspace-untrusted", 60354),
  workspaceUnknown: u("workspace-unknown", 60355),
  terminalCmd: u("terminal-cmd", 60356),
  terminalDebian: u("terminal-debian", 60357),
  terminalLinux: u("terminal-linux", 60358),
  terminalPowershell: u("terminal-powershell", 60359),
  terminalTmux: u("terminal-tmux", 60360),
  terminalUbuntu: u("terminal-ubuntu", 60361),
  terminalBash: u("terminal-bash", 60362),
  arrowSwap: u("arrow-swap", 60363),
  copy: u("copy", 60364),
  personAdd: u("person-add", 60365),
  filterFilled: u("filter-filled", 60366),
  wand: u("wand", 60367),
  debugLineByLine: u("debug-line-by-line", 60368),
  inspect: u("inspect", 60369),
  layers: u("layers", 60370),
  layersDot: u("layers-dot", 60371),
  layersActive: u("layers-active", 60372),
  compass: u("compass", 60373),
  compassDot: u("compass-dot", 60374),
  compassActive: u("compass-active", 60375),
  azure: u("azure", 60376),
  issueDraft: u("issue-draft", 60377),
  gitPullRequestClosed: u("git-pull-request-closed", 60378),
  gitPullRequestDraft: u("git-pull-request-draft", 60379),
  debugAll: u("debug-all", 60380),
  debugCoverage: u("debug-coverage", 60381),
  runErrors: u("run-errors", 60382),
  folderLibrary: u("folder-library", 60383),
  debugContinueSmall: u("debug-continue-small", 60384),
  beakerStop: u("beaker-stop", 60385),
  graphLine: u("graph-line", 60386),
  graphScatter: u("graph-scatter", 60387),
  pieChart: u("pie-chart", 60388),
  bracket: u("bracket", 60175),
  bracketDot: u("bracket-dot", 60389),
  bracketError: u("bracket-error", 60390),
  lockSmall: u("lock-small", 60391),
  azureDevops: u("azure-devops", 60392),
  verifiedFilled: u("verified-filled", 60393),
  newline: u("newline", 60394),
  layout: u("layout", 60395),
  layoutActivitybarLeft: u("layout-activitybar-left", 60396),
  layoutActivitybarRight: u("layout-activitybar-right", 60397),
  layoutPanelLeft: u("layout-panel-left", 60398),
  layoutPanelCenter: u("layout-panel-center", 60399),
  layoutPanelJustify: u("layout-panel-justify", 60400),
  layoutPanelRight: u("layout-panel-right", 60401),
  layoutPanel: u("layout-panel", 60402),
  layoutSidebarLeft: u("layout-sidebar-left", 60403),
  layoutSidebarRight: u("layout-sidebar-right", 60404),
  layoutStatusbar: u("layout-statusbar", 60405),
  layoutMenubar: u("layout-menubar", 60406),
  layoutCentered: u("layout-centered", 60407),
  target: u("target", 60408),
  indent: u("indent", 60409),
  recordSmall: u("record-small", 60410),
  errorSmall: u("error-small", 60411),
  terminalDecorationError: u("terminal-decoration-error", 60411),
  arrowCircleDown: u("arrow-circle-down", 60412),
  arrowCircleLeft: u("arrow-circle-left", 60413),
  arrowCircleRight: u("arrow-circle-right", 60414),
  arrowCircleUp: u("arrow-circle-up", 60415),
  layoutSidebarRightOff: u("layout-sidebar-right-off", 60416),
  layoutPanelOff: u("layout-panel-off", 60417),
  layoutSidebarLeftOff: u("layout-sidebar-left-off", 60418),
  blank: u("blank", 60419),
  heartFilled: u("heart-filled", 60420),
  map: u("map", 60421),
  mapHorizontal: u("map-horizontal", 60421),
  foldHorizontal: u("fold-horizontal", 60421),
  mapFilled: u("map-filled", 60422),
  mapHorizontalFilled: u("map-horizontal-filled", 60422),
  foldHorizontalFilled: u("fold-horizontal-filled", 60422),
  circleSmall: u("circle-small", 60423),
  bellSlash: u("bell-slash", 60424),
  bellSlashDot: u("bell-slash-dot", 60425),
  commentUnresolved: u("comment-unresolved", 60426),
  gitPullRequestGoToChanges: u("git-pull-request-go-to-changes", 60427),
  gitPullRequestNewChanges: u("git-pull-request-new-changes", 60428),
  searchFuzzy: u("search-fuzzy", 60429),
  commentDraft: u("comment-draft", 60430),
  send: u("send", 60431),
  sparkle: u("sparkle", 60432),
  insert: u("insert", 60433),
  mic: u("mic", 60434),
  thumbsdownFilled: u("thumbsdown-filled", 60435),
  thumbsupFilled: u("thumbsup-filled", 60436),
  coffee: u("coffee", 60437),
  snake: u("snake", 60438),
  game: u("game", 60439),
  vr: u("vr", 60440),
  chip: u("chip", 60441),
  piano: u("piano", 60442),
  music: u("music", 60443),
  micFilled: u("mic-filled", 60444),
  repoFetch: u("repo-fetch", 60445),
  copilot: u("copilot", 60446),
  lightbulbSparkle: u("lightbulb-sparkle", 60447),
  robot: u("robot", 60448),
  sparkleFilled: u("sparkle-filled", 60449),
  diffSingle: u("diff-single", 60450),
  diffMultiple: u("diff-multiple", 60451),
  surroundWith: u("surround-with", 60452),
  share: u("share", 60453),
  gitStash: u("git-stash", 60454),
  gitStashApply: u("git-stash-apply", 60455),
  gitStashPop: u("git-stash-pop", 60456),
  vscode: u("vscode", 60457),
  vscodeInsiders: u("vscode-insiders", 60458),
  codeOss: u("code-oss", 60459),
  runCoverage: u("run-coverage", 60460),
  runAllCoverage: u("run-all-coverage", 60461),
  coverage: u("coverage", 60462),
  githubProject: u("github-project", 60463),
  mapVertical: u("map-vertical", 60464),
  foldVertical: u("fold-vertical", 60464),
  mapVerticalFilled: u("map-vertical-filled", 60465),
  foldVerticalFilled: u("fold-vertical-filled", 60465),
  goToSearch: u("go-to-search", 60466),
  percentage: u("percentage", 60467),
  sortPercentage: u("sort-percentage", 60467),
  attach: u("attach", 60468),
  goToEditingSession: u("go-to-editing-session", 60469),
  editSession: u("edit-session", 60470),
  codeReview: u("code-review", 60471)
}, Xc = {
  dialogError: u("dialog-error", "error"),
  dialogWarning: u("dialog-warning", "warning"),
  dialogInfo: u("dialog-info", "info"),
  dialogClose: u("dialog-close", "close"),
  treeItemExpanded: u("tree-item-expanded", "chevron-down"),
  treeFilterOnTypeOn: u("tree-filter-on-type-on", "list-filter"),
  treeFilterOnTypeOff: u("tree-filter-on-type-off", "list-selection"),
  treeFilterClear: u("tree-filter-clear", "close"),
  treeItemLoading: u("tree-item-loading", "loading"),
  menuSelection: u("menu-selection", "check"),
  menuSubmenu: u("menu-submenu", "chevron-right"),
  menuBarMore: u("menubar-more", "more"),
  scrollbarButtonLeft: u("scrollbar-button-left", "triangle-left"),
  scrollbarButtonRight: u("scrollbar-button-right", "triangle-right"),
  scrollbarButtonUp: u("scrollbar-button-up", "triangle-up"),
  scrollbarButtonDown: u("scrollbar-button-down", "triangle-down"),
  toolBarMore: u("toolbar-more", "more"),
  quickInputBack: u("quick-input-back", "arrow-left"),
  dropDownButton: u("drop-down-button", 60084),
  symbolCustomColor: u("symbol-customcolor", 60252),
  exportIcon: u("export", 60332),
  workspaceUnspecified: u("workspace-unspecified", 60355),
  newLine: u("newline", 60394),
  thumbsDownFilled: u("thumbsdown-filled", 60435),
  thumbsUpFilled: u("thumbsup-filled", 60436),
  gitFetch: u("git-fetch", 60445),
  lightbulbSparkleAutofix: u("lightbulb-sparkle-autofix", 60447),
  debugBreakpointPending: u("debug-breakpoint-pending", 60377)
}, q = {
  ...Gc,
  ...Xc
};
class ko {
  constructor() {
    this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new xe(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
  }
  handleChange(t) {
    this._onDidChange.fire({
      changedLanguages: t,
      changedColorMap: !1
    });
  }
  register(t, n) {
    return this._tokenizationSupports.set(t, n), this.handleChange([t]), Wt(() => {
      this._tokenizationSupports.get(t) === n && (this._tokenizationSupports.delete(t), this.handleChange([t]));
    });
  }
  get(t) {
    return this._tokenizationSupports.get(t) || null;
  }
  registerFactory(t, n) {
    var i;
    (i = this._factories.get(t)) == null || i.dispose();
    const r = new Jc(this, t, n);
    return this._factories.set(t, r), Wt(() => {
      const a = this._factories.get(t);
      !a || a !== r || (this._factories.delete(t), a.dispose());
    });
  }
  async getOrCreate(t) {
    const n = this.get(t);
    if (n)
      return n;
    const i = this._factories.get(t);
    return !i || i.isResolved ? null : (await i.resolve(), this.get(t));
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
class Jc extends rn {
  get isResolved() {
    return this._isResolved;
  }
  constructor(t, n, i) {
    super(), this._registry = t, this._languageId = n, this._factory = i, this._isDisposed = !1, this._resolvePromise = null, this._isResolved = !1;
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
class Yc {
  constructor(t, n, i) {
    this.offset = t, this.type = n, this.language = i, this._tokenBrand = void 0;
  }
  toString() {
    return "(" + this.offset + ", " + this.type + ")";
  }
}
var hr;
(function(e) {
  e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
})(hr || (hr = {}));
var ur;
(function(e) {
  const t = /* @__PURE__ */ new Map();
  t.set(0, q.symbolMethod), t.set(1, q.symbolFunction), t.set(2, q.symbolConstructor), t.set(3, q.symbolField), t.set(4, q.symbolVariable), t.set(5, q.symbolClass), t.set(6, q.symbolStruct), t.set(7, q.symbolInterface), t.set(8, q.symbolModule), t.set(9, q.symbolProperty), t.set(10, q.symbolEvent), t.set(11, q.symbolOperator), t.set(12, q.symbolUnit), t.set(13, q.symbolValue), t.set(15, q.symbolEnum), t.set(14, q.symbolConstant), t.set(15, q.symbolEnum), t.set(16, q.symbolEnumMember), t.set(17, q.symbolKeyword), t.set(27, q.symbolSnippet), t.set(18, q.symbolText), t.set(19, q.symbolColor), t.set(20, q.symbolFile), t.set(21, q.symbolReference), t.set(22, q.symbolCustomColor), t.set(23, q.symbolFolder), t.set(24, q.symbolTypeParameter), t.set(25, q.account), t.set(26, q.issues);
  function n(a) {
    let s = t.get(a);
    return s || (console.info("No codicon found for CompletionItemKind " + a), s = q.symbolProperty), s;
  }
  e.toIcon = n;
  const i = /* @__PURE__ */ new Map();
  i.set("method", 0), i.set("function", 1), i.set("constructor", 2), i.set("field", 3), i.set("variable", 4), i.set("class", 5), i.set("struct", 6), i.set("interface", 7), i.set("module", 8), i.set("property", 9), i.set("event", 10), i.set("operator", 11), i.set("unit", 12), i.set("value", 13), i.set("constant", 14), i.set("enum", 15), i.set("enum-member", 16), i.set("enumMember", 16), i.set("keyword", 17), i.set("snippet", 27), i.set("text", 18), i.set("color", 19), i.set("file", 20), i.set("reference", 21), i.set("customcolor", 22), i.set("folder", 23), i.set("type-parameter", 24), i.set("typeParameter", 24), i.set("account", 25), i.set("issue", 26);
  function r(a, s) {
    let l = i.get(a);
    return typeof l > "u" && !s && (l = 9), l;
  }
  e.fromString = r;
})(ur || (ur = {}));
var dr;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
})(dr || (dr = {}));
var mr;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.PasteAs = 1] = "PasteAs";
})(mr || (mr = {}));
var pr;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
})(pr || (pr = {}));
var fr;
(function(e) {
  e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
})(fr || (fr = {}));
ee(934, "array"), ee(935, "boolean"), ee(936, "class"), ee(937, "constant"), ee(938, "constructor"), ee(939, "enumeration"), ee(940, "enumeration member"), ee(941, "event"), ee(942, "field"), ee(943, "file"), ee(944, "function"), ee(945, "interface"), ee(946, "key"), ee(947, "method"), ee(948, "module"), ee(949, "namespace"), ee(950, "null"), ee(951, "number"), ee(952, "object"), ee(953, "operator"), ee(954, "package"), ee(955, "property"), ee(956, "string"), ee(957, "struct"), ee(958, "type parameter"), ee(959, "variable");
var gr;
(function(e) {
  const t = /* @__PURE__ */ new Map();
  t.set(0, q.symbolFile), t.set(1, q.symbolModule), t.set(2, q.symbolNamespace), t.set(3, q.symbolPackage), t.set(4, q.symbolClass), t.set(5, q.symbolMethod), t.set(6, q.symbolProperty), t.set(7, q.symbolField), t.set(8, q.symbolConstructor), t.set(9, q.symbolEnum), t.set(10, q.symbolInterface), t.set(11, q.symbolFunction), t.set(12, q.symbolVariable), t.set(13, q.symbolConstant), t.set(14, q.symbolString), t.set(15, q.symbolNumber), t.set(16, q.symbolBoolean), t.set(17, q.symbolArray), t.set(18, q.symbolObject), t.set(19, q.symbolKey), t.set(20, q.symbolNull), t.set(21, q.symbolEnumMember), t.set(22, q.symbolStruct), t.set(23, q.symbolEvent), t.set(24, q.symbolOperator), t.set(25, q.symbolTypeParameter);
  function n(i) {
    let r = t.get(i);
    return r || (console.info("No codicon found for SymbolKind " + i), r = q.symbolProperty), r;
  }
  e.toIcon = n;
})(gr || (gr = {}));
var Se;
Se = class {
  static fromValue(e) {
    switch (e) {
      case "comment":
        return Se.Comment;
      case "imports":
        return Se.Imports;
      case "region":
        return Se.Region;
    }
    return new Se(e);
  }
  constructor(e) {
    this.value = e;
  }
}, Se.Comment = new Se("comment"), Se.Imports = new Se("imports"), Se.Region = new Se("region");
var br;
(function(e) {
  e[e.AIGenerated = 1] = "AIGenerated";
})(br || (br = {}));
var _r;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(_r || (_r = {}));
var wr;
(function(e) {
  function t(n) {
    return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
  }
  e.is = t;
})(wr || (wr = {}));
var vr;
(function(e) {
  e[e.Collapsed = 0] = "Collapsed", e[e.Expanded = 1] = "Expanded";
})(vr || (vr = {}));
var yr;
(function(e) {
  e[e.Unresolved = 0] = "Unresolved", e[e.Resolved = 1] = "Resolved";
})(yr || (yr = {}));
var Tr;
(function(e) {
  e[e.Current = 0] = "Current", e[e.Outdated = 1] = "Outdated";
})(Tr || (Tr = {}));
var kr;
(function(e) {
  e[e.Editing = 0] = "Editing", e[e.Preview = 1] = "Preview";
})(kr || (kr = {}));
var Sr;
(function(e) {
  e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
})(Sr || (Sr = {}));
new ko();
new ko();
var Lr;
(function(e) {
  e[e.None = 0] = "None", e[e.Option = 1] = "Option", e[e.Default = 2] = "Default", e[e.Preferred = 3] = "Preferred";
})(Lr || (Lr = {}));
var xr;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(xr || (xr = {}));
var Er;
(function(e) {
  e[e.Unknown = 0] = "Unknown", e[e.Disabled = 1] = "Disabled", e[e.Enabled = 2] = "Enabled";
})(Er || (Er = {}));
var Cr;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.Auto = 2] = "Auto";
})(Cr || (Cr = {}));
var Rr;
(function(e) {
  e[e.None = 0] = "None", e[e.KeepWhitespace = 1] = "KeepWhitespace", e[e.InsertAsSnippet = 4] = "InsertAsSnippet";
})(Rr || (Rr = {}));
var Ar;
(function(e) {
  e[e.Method = 0] = "Method", e[e.Function = 1] = "Function", e[e.Constructor = 2] = "Constructor", e[e.Field = 3] = "Field", e[e.Variable = 4] = "Variable", e[e.Class = 5] = "Class", e[e.Struct = 6] = "Struct", e[e.Interface = 7] = "Interface", e[e.Module = 8] = "Module", e[e.Property = 9] = "Property", e[e.Event = 10] = "Event", e[e.Operator = 11] = "Operator", e[e.Unit = 12] = "Unit", e[e.Value = 13] = "Value", e[e.Constant = 14] = "Constant", e[e.Enum = 15] = "Enum", e[e.EnumMember = 16] = "EnumMember", e[e.Keyword = 17] = "Keyword", e[e.Text = 18] = "Text", e[e.Color = 19] = "Color", e[e.File = 20] = "File", e[e.Reference = 21] = "Reference", e[e.Customcolor = 22] = "Customcolor", e[e.Folder = 23] = "Folder", e[e.TypeParameter = 24] = "TypeParameter", e[e.User = 25] = "User", e[e.Issue = 26] = "Issue", e[e.Snippet = 27] = "Snippet";
})(Ar || (Ar = {}));
var Nr;
(function(e) {
  e[e.Deprecated = 1] = "Deprecated";
})(Nr || (Nr = {}));
var Mr;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.TriggerCharacter = 1] = "TriggerCharacter", e[e.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
})(Mr || (Mr = {}));
var Ir;
(function(e) {
  e[e.EXACT = 0] = "EXACT", e[e.ABOVE = 1] = "ABOVE", e[e.BELOW = 2] = "BELOW";
})(Ir || (Ir = {}));
var Or;
(function(e) {
  e[e.NotSet = 0] = "NotSet", e[e.ContentFlush = 1] = "ContentFlush", e[e.RecoverFromMarkers = 2] = "RecoverFromMarkers", e[e.Explicit = 3] = "Explicit", e[e.Paste = 4] = "Paste", e[e.Undo = 5] = "Undo", e[e.Redo = 6] = "Redo";
})(Or || (Or = {}));
var zr;
(function(e) {
  e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
})(zr || (zr = {}));
var Ur;
(function(e) {
  e[e.Text = 0] = "Text", e[e.Read = 1] = "Read", e[e.Write = 2] = "Write";
})(Ur || (Ur = {}));
var Pr;
(function(e) {
  e[e.None = 0] = "None", e[e.Keep = 1] = "Keep", e[e.Brackets = 2] = "Brackets", e[e.Advanced = 3] = "Advanced", e[e.Full = 4] = "Full";
})(Pr || (Pr = {}));
var Hr;
(function(e) {
  e[e.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", e[e.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", e[e.accessibilitySupport = 2] = "accessibilitySupport", e[e.accessibilityPageSize = 3] = "accessibilityPageSize", e[e.ariaLabel = 4] = "ariaLabel", e[e.ariaRequired = 5] = "ariaRequired", e[e.autoClosingBrackets = 6] = "autoClosingBrackets", e[e.autoClosingComments = 7] = "autoClosingComments", e[e.screenReaderAnnounceInlineSuggestion = 8] = "screenReaderAnnounceInlineSuggestion", e[e.autoClosingDelete = 9] = "autoClosingDelete", e[e.autoClosingOvertype = 10] = "autoClosingOvertype", e[e.autoClosingQuotes = 11] = "autoClosingQuotes", e[e.autoIndent = 12] = "autoIndent", e[e.automaticLayout = 13] = "automaticLayout", e[e.autoSurround = 14] = "autoSurround", e[e.bracketPairColorization = 15] = "bracketPairColorization", e[e.guides = 16] = "guides", e[e.codeLens = 17] = "codeLens", e[e.codeLensFontFamily = 18] = "codeLensFontFamily", e[e.codeLensFontSize = 19] = "codeLensFontSize", e[e.colorDecorators = 20] = "colorDecorators", e[e.colorDecoratorsLimit = 21] = "colorDecoratorsLimit", e[e.columnSelection = 22] = "columnSelection", e[e.comments = 23] = "comments", e[e.contextmenu = 24] = "contextmenu", e[e.copyWithSyntaxHighlighting = 25] = "copyWithSyntaxHighlighting", e[e.cursorBlinking = 26] = "cursorBlinking", e[e.cursorSmoothCaretAnimation = 27] = "cursorSmoothCaretAnimation", e[e.cursorStyle = 28] = "cursorStyle", e[e.cursorSurroundingLines = 29] = "cursorSurroundingLines", e[e.cursorSurroundingLinesStyle = 30] = "cursorSurroundingLinesStyle", e[e.cursorWidth = 31] = "cursorWidth", e[e.disableLayerHinting = 32] = "disableLayerHinting", e[e.disableMonospaceOptimizations = 33] = "disableMonospaceOptimizations", e[e.domReadOnly = 34] = "domReadOnly", e[e.dragAndDrop = 35] = "dragAndDrop", e[e.dropIntoEditor = 36] = "dropIntoEditor", e[e.experimentalEditContextEnabled = 37] = "experimentalEditContextEnabled", e[e.emptySelectionClipboard = 38] = "emptySelectionClipboard", e[e.experimentalGpuAcceleration = 39] = "experimentalGpuAcceleration", e[e.experimentalWhitespaceRendering = 40] = "experimentalWhitespaceRendering", e[e.extraEditorClassName = 41] = "extraEditorClassName", e[e.fastScrollSensitivity = 42] = "fastScrollSensitivity", e[e.find = 43] = "find", e[e.fixedOverflowWidgets = 44] = "fixedOverflowWidgets", e[e.folding = 45] = "folding", e[e.foldingStrategy = 46] = "foldingStrategy", e[e.foldingHighlight = 47] = "foldingHighlight", e[e.foldingImportsByDefault = 48] = "foldingImportsByDefault", e[e.foldingMaximumRegions = 49] = "foldingMaximumRegions", e[e.unfoldOnClickAfterEndOfLine = 50] = "unfoldOnClickAfterEndOfLine", e[e.fontFamily = 51] = "fontFamily", e[e.fontInfo = 52] = "fontInfo", e[e.fontLigatures = 53] = "fontLigatures", e[e.fontSize = 54] = "fontSize", e[e.fontWeight = 55] = "fontWeight", e[e.fontVariations = 56] = "fontVariations", e[e.formatOnPaste = 57] = "formatOnPaste", e[e.formatOnType = 58] = "formatOnType", e[e.glyphMargin = 59] = "glyphMargin", e[e.gotoLocation = 60] = "gotoLocation", e[e.hideCursorInOverviewRuler = 61] = "hideCursorInOverviewRuler", e[e.hover = 62] = "hover", e[e.inDiffEditor = 63] = "inDiffEditor", e[e.inlineSuggest = 64] = "inlineSuggest", e[e.letterSpacing = 65] = "letterSpacing", e[e.lightbulb = 66] = "lightbulb", e[e.lineDecorationsWidth = 67] = "lineDecorationsWidth", e[e.lineHeight = 68] = "lineHeight", e[e.lineNumbers = 69] = "lineNumbers", e[e.lineNumbersMinChars = 70] = "lineNumbersMinChars", e[e.linkedEditing = 71] = "linkedEditing", e[e.links = 72] = "links", e[e.matchBrackets = 73] = "matchBrackets", e[e.minimap = 74] = "minimap", e[e.mouseStyle = 75] = "mouseStyle", e[e.mouseWheelScrollSensitivity = 76] = "mouseWheelScrollSensitivity", e[e.mouseWheelZoom = 77] = "mouseWheelZoom", e[e.multiCursorMergeOverlapping = 78] = "multiCursorMergeOverlapping", e[e.multiCursorModifier = 79] = "multiCursorModifier", e[e.multiCursorPaste = 80] = "multiCursorPaste", e[e.multiCursorLimit = 81] = "multiCursorLimit", e[e.occurrencesHighlight = 82] = "occurrencesHighlight", e[e.occurrencesHighlightDelay = 83] = "occurrencesHighlightDelay", e[e.overviewRulerBorder = 84] = "overviewRulerBorder", e[e.overviewRulerLanes = 85] = "overviewRulerLanes", e[e.padding = 86] = "padding", e[e.pasteAs = 87] = "pasteAs", e[e.parameterHints = 88] = "parameterHints", e[e.peekWidgetDefaultFocus = 89] = "peekWidgetDefaultFocus", e[e.placeholder = 90] = "placeholder", e[e.definitionLinkOpensInPeek = 91] = "definitionLinkOpensInPeek", e[e.quickSuggestions = 92] = "quickSuggestions", e[e.quickSuggestionsDelay = 93] = "quickSuggestionsDelay", e[e.readOnly = 94] = "readOnly", e[e.readOnlyMessage = 95] = "readOnlyMessage", e[e.renameOnType = 96] = "renameOnType", e[e.renderControlCharacters = 97] = "renderControlCharacters", e[e.renderFinalNewline = 98] = "renderFinalNewline", e[e.renderLineHighlight = 99] = "renderLineHighlight", e[e.renderLineHighlightOnlyWhenFocus = 100] = "renderLineHighlightOnlyWhenFocus", e[e.renderValidationDecorations = 101] = "renderValidationDecorations", e[e.renderWhitespace = 102] = "renderWhitespace", e[e.revealHorizontalRightPadding = 103] = "revealHorizontalRightPadding", e[e.roundedSelection = 104] = "roundedSelection", e[e.rulers = 105] = "rulers", e[e.scrollbar = 106] = "scrollbar", e[e.scrollBeyondLastColumn = 107] = "scrollBeyondLastColumn", e[e.scrollBeyondLastLine = 108] = "scrollBeyondLastLine", e[e.scrollPredominantAxis = 109] = "scrollPredominantAxis", e[e.selectionClipboard = 110] = "selectionClipboard", e[e.selectionHighlight = 111] = "selectionHighlight", e[e.selectOnLineNumbers = 112] = "selectOnLineNumbers", e[e.showFoldingControls = 113] = "showFoldingControls", e[e.showUnused = 114] = "showUnused", e[e.snippetSuggestions = 115] = "snippetSuggestions", e[e.smartSelect = 116] = "smartSelect", e[e.smoothScrolling = 117] = "smoothScrolling", e[e.stickyScroll = 118] = "stickyScroll", e[e.stickyTabStops = 119] = "stickyTabStops", e[e.stopRenderingLineAfter = 120] = "stopRenderingLineAfter", e[e.suggest = 121] = "suggest", e[e.suggestFontSize = 122] = "suggestFontSize", e[e.suggestLineHeight = 123] = "suggestLineHeight", e[e.suggestOnTriggerCharacters = 124] = "suggestOnTriggerCharacters", e[e.suggestSelection = 125] = "suggestSelection", e[e.tabCompletion = 126] = "tabCompletion", e[e.tabIndex = 127] = "tabIndex", e[e.unicodeHighlighting = 128] = "unicodeHighlighting", e[e.unusualLineTerminators = 129] = "unusualLineTerminators", e[e.useShadowDOM = 130] = "useShadowDOM", e[e.useTabStops = 131] = "useTabStops", e[e.wordBreak = 132] = "wordBreak", e[e.wordSegmenterLocales = 133] = "wordSegmenterLocales", e[e.wordSeparators = 134] = "wordSeparators", e[e.wordWrap = 135] = "wordWrap", e[e.wordWrapBreakAfterCharacters = 136] = "wordWrapBreakAfterCharacters", e[e.wordWrapBreakBeforeCharacters = 137] = "wordWrapBreakBeforeCharacters", e[e.wordWrapColumn = 138] = "wordWrapColumn", e[e.wordWrapOverride1 = 139] = "wordWrapOverride1", e[e.wordWrapOverride2 = 140] = "wordWrapOverride2", e[e.wrappingIndent = 141] = "wrappingIndent", e[e.wrappingStrategy = 142] = "wrappingStrategy", e[e.showDeprecated = 143] = "showDeprecated", e[e.inlayHints = 144] = "inlayHints", e[e.editorClassName = 145] = "editorClassName", e[e.pixelRatio = 146] = "pixelRatio", e[e.tabFocusMode = 147] = "tabFocusMode", e[e.layoutInfo = 148] = "layoutInfo", e[e.wrappingInfo = 149] = "wrappingInfo", e[e.defaultColorDecorators = 150] = "defaultColorDecorators", e[e.colorDecoratorsActivatedOn = 151] = "colorDecoratorsActivatedOn", e[e.inlineCompletionsAccessibilityVerbose = 152] = "inlineCompletionsAccessibilityVerbose";
})(Hr || (Hr = {}));
var Dr;
(function(e) {
  e[e.TextDefined = 0] = "TextDefined", e[e.LF = 1] = "LF", e[e.CRLF = 2] = "CRLF";
})(Dr || (Dr = {}));
var Wr;
(function(e) {
  e[e.LF = 0] = "LF", e[e.CRLF = 1] = "CRLF";
})(Wr || (Wr = {}));
var qr;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
})(qr || (qr = {}));
var Fr;
(function(e) {
  e[e.Increase = 0] = "Increase", e[e.Decrease = 1] = "Decrease";
})(Fr || (Fr = {}));
var Br;
(function(e) {
  e[e.None = 0] = "None", e[e.Indent = 1] = "Indent", e[e.IndentOutdent = 2] = "IndentOutdent", e[e.Outdent = 3] = "Outdent";
})(Br || (Br = {}));
var Vr;
(function(e) {
  e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
})(Vr || (Vr = {}));
var Kr;
(function(e) {
  e[e.Type = 1] = "Type", e[e.Parameter = 2] = "Parameter";
})(Kr || (Kr = {}));
var jr;
(function(e) {
  e[e.Automatic = 0] = "Automatic", e[e.Explicit = 1] = "Explicit";
})(jr || (jr = {}));
var $r;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})($r || ($r = {}));
var Jn;
(function(e) {
  e[e.DependsOnKbLayout = -1] = "DependsOnKbLayout", e[e.Unknown = 0] = "Unknown", e[e.Backspace = 1] = "Backspace", e[e.Tab = 2] = "Tab", e[e.Enter = 3] = "Enter", e[e.Shift = 4] = "Shift", e[e.Ctrl = 5] = "Ctrl", e[e.Alt = 6] = "Alt", e[e.PauseBreak = 7] = "PauseBreak", e[e.CapsLock = 8] = "CapsLock", e[e.Escape = 9] = "Escape", e[e.Space = 10] = "Space", e[e.PageUp = 11] = "PageUp", e[e.PageDown = 12] = "PageDown", e[e.End = 13] = "End", e[e.Home = 14] = "Home", e[e.LeftArrow = 15] = "LeftArrow", e[e.UpArrow = 16] = "UpArrow", e[e.RightArrow = 17] = "RightArrow", e[e.DownArrow = 18] = "DownArrow", e[e.Insert = 19] = "Insert", e[e.Delete = 20] = "Delete", e[e.Digit0 = 21] = "Digit0", e[e.Digit1 = 22] = "Digit1", e[e.Digit2 = 23] = "Digit2", e[e.Digit3 = 24] = "Digit3", e[e.Digit4 = 25] = "Digit4", e[e.Digit5 = 26] = "Digit5", e[e.Digit6 = 27] = "Digit6", e[e.Digit7 = 28] = "Digit7", e[e.Digit8 = 29] = "Digit8", e[e.Digit9 = 30] = "Digit9", e[e.KeyA = 31] = "KeyA", e[e.KeyB = 32] = "KeyB", e[e.KeyC = 33] = "KeyC", e[e.KeyD = 34] = "KeyD", e[e.KeyE = 35] = "KeyE", e[e.KeyF = 36] = "KeyF", e[e.KeyG = 37] = "KeyG", e[e.KeyH = 38] = "KeyH", e[e.KeyI = 39] = "KeyI", e[e.KeyJ = 40] = "KeyJ", e[e.KeyK = 41] = "KeyK", e[e.KeyL = 42] = "KeyL", e[e.KeyM = 43] = "KeyM", e[e.KeyN = 44] = "KeyN", e[e.KeyO = 45] = "KeyO", e[e.KeyP = 46] = "KeyP", e[e.KeyQ = 47] = "KeyQ", e[e.KeyR = 48] = "KeyR", e[e.KeyS = 49] = "KeyS", e[e.KeyT = 50] = "KeyT", e[e.KeyU = 51] = "KeyU", e[e.KeyV = 52] = "KeyV", e[e.KeyW = 53] = "KeyW", e[e.KeyX = 54] = "KeyX", e[e.KeyY = 55] = "KeyY", e[e.KeyZ = 56] = "KeyZ", e[e.Meta = 57] = "Meta", e[e.ContextMenu = 58] = "ContextMenu", e[e.F1 = 59] = "F1", e[e.F2 = 60] = "F2", e[e.F3 = 61] = "F3", e[e.F4 = 62] = "F4", e[e.F5 = 63] = "F5", e[e.F6 = 64] = "F6", e[e.F7 = 65] = "F7", e[e.F8 = 66] = "F8", e[e.F9 = 67] = "F9", e[e.F10 = 68] = "F10", e[e.F11 = 69] = "F11", e[e.F12 = 70] = "F12", e[e.F13 = 71] = "F13", e[e.F14 = 72] = "F14", e[e.F15 = 73] = "F15", e[e.F16 = 74] = "F16", e[e.F17 = 75] = "F17", e[e.F18 = 76] = "F18", e[e.F19 = 77] = "F19", e[e.F20 = 78] = "F20", e[e.F21 = 79] = "F21", e[e.F22 = 80] = "F22", e[e.F23 = 81] = "F23", e[e.F24 = 82] = "F24", e[e.NumLock = 83] = "NumLock", e[e.ScrollLock = 84] = "ScrollLock", e[e.Semicolon = 85] = "Semicolon", e[e.Equal = 86] = "Equal", e[e.Comma = 87] = "Comma", e[e.Minus = 88] = "Minus", e[e.Period = 89] = "Period", e[e.Slash = 90] = "Slash", e[e.Backquote = 91] = "Backquote", e[e.BracketLeft = 92] = "BracketLeft", e[e.Backslash = 93] = "Backslash", e[e.BracketRight = 94] = "BracketRight", e[e.Quote = 95] = "Quote", e[e.OEM_8 = 96] = "OEM_8", e[e.IntlBackslash = 97] = "IntlBackslash", e[e.Numpad0 = 98] = "Numpad0", e[e.Numpad1 = 99] = "Numpad1", e[e.Numpad2 = 100] = "Numpad2", e[e.Numpad3 = 101] = "Numpad3", e[e.Numpad4 = 102] = "Numpad4", e[e.Numpad5 = 103] = "Numpad5", e[e.Numpad6 = 104] = "Numpad6", e[e.Numpad7 = 105] = "Numpad7", e[e.Numpad8 = 106] = "Numpad8", e[e.Numpad9 = 107] = "Numpad9", e[e.NumpadMultiply = 108] = "NumpadMultiply", e[e.NumpadAdd = 109] = "NumpadAdd", e[e.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", e[e.NumpadSubtract = 111] = "NumpadSubtract", e[e.NumpadDecimal = 112] = "NumpadDecimal", e[e.NumpadDivide = 113] = "NumpadDivide", e[e.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", e[e.ABNT_C1 = 115] = "ABNT_C1", e[e.ABNT_C2 = 116] = "ABNT_C2", e[e.AudioVolumeMute = 117] = "AudioVolumeMute", e[e.AudioVolumeUp = 118] = "AudioVolumeUp", e[e.AudioVolumeDown = 119] = "AudioVolumeDown", e[e.BrowserSearch = 120] = "BrowserSearch", e[e.BrowserHome = 121] = "BrowserHome", e[e.BrowserBack = 122] = "BrowserBack", e[e.BrowserForward = 123] = "BrowserForward", e[e.MediaTrackNext = 124] = "MediaTrackNext", e[e.MediaTrackPrevious = 125] = "MediaTrackPrevious", e[e.MediaStop = 126] = "MediaStop", e[e.MediaPlayPause = 127] = "MediaPlayPause", e[e.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", e[e.LaunchMail = 129] = "LaunchMail", e[e.LaunchApp2 = 130] = "LaunchApp2", e[e.Clear = 131] = "Clear", e[e.MAX_VALUE = 132] = "MAX_VALUE";
})(Jn || (Jn = {}));
var Yn;
(function(e) {
  e[e.Hint = 1] = "Hint", e[e.Info = 2] = "Info", e[e.Warning = 4] = "Warning", e[e.Error = 8] = "Error";
})(Yn || (Yn = {}));
var Qn;
(function(e) {
  e[e.Unnecessary = 1] = "Unnecessary", e[e.Deprecated = 2] = "Deprecated";
})(Qn || (Qn = {}));
var Gr;
(function(e) {
  e[e.Inline = 1] = "Inline", e[e.Gutter = 2] = "Gutter";
})(Gr || (Gr = {}));
var Xr;
(function(e) {
  e[e.Normal = 1] = "Normal", e[e.Underlined = 2] = "Underlined";
})(Xr || (Xr = {}));
var Jr;
(function(e) {
  e[e.UNKNOWN = 0] = "UNKNOWN", e[e.TEXTAREA = 1] = "TEXTAREA", e[e.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", e[e.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", e[e.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", e[e.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", e[e.CONTENT_TEXT = 6] = "CONTENT_TEXT", e[e.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", e[e.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", e[e.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", e[e.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", e[e.SCROLLBAR = 11] = "SCROLLBAR", e[e.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", e[e.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
})(Jr || (Jr = {}));
var Yr;
(function(e) {
  e[e.AIGenerated = 1] = "AIGenerated";
})(Yr || (Yr = {}));
var Qr;
(function(e) {
  e[e.Invoke = 0] = "Invoke", e[e.Automatic = 1] = "Automatic";
})(Qr || (Qr = {}));
var Zr;
(function(e) {
  e[e.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", e[e.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", e[e.TOP_CENTER = 2] = "TOP_CENTER";
})(Zr || (Zr = {}));
var ea;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
})(ea || (ea = {}));
var ta;
(function(e) {
  e[e.Word = 0] = "Word", e[e.Line = 1] = "Line", e[e.Suggest = 2] = "Suggest";
})(ta || (ta = {}));
var na;
(function(e) {
  e[e.Left = 0] = "Left", e[e.Right = 1] = "Right", e[e.None = 2] = "None", e[e.LeftOfInjectedText = 3] = "LeftOfInjectedText", e[e.RightOfInjectedText = 4] = "RightOfInjectedText";
})(na || (na = {}));
var ia;
(function(e) {
  e[e.Off = 0] = "Off", e[e.On = 1] = "On", e[e.Relative = 2] = "Relative", e[e.Interval = 3] = "Interval", e[e.Custom = 4] = "Custom";
})(ia || (ia = {}));
var ra;
(function(e) {
  e[e.None = 0] = "None", e[e.Text = 1] = "Text", e[e.Blocks = 2] = "Blocks";
})(ra || (ra = {}));
var aa;
(function(e) {
  e[e.Smooth = 0] = "Smooth", e[e.Immediate = 1] = "Immediate";
})(aa || (aa = {}));
var sa;
(function(e) {
  e[e.Auto = 1] = "Auto", e[e.Hidden = 2] = "Hidden", e[e.Visible = 3] = "Visible";
})(sa || (sa = {}));
var Zn;
(function(e) {
  e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL";
})(Zn || (Zn = {}));
var oa;
(function(e) {
  e.Off = "off", e.OnCode = "onCode", e.On = "on";
})(oa || (oa = {}));
var la;
(function(e) {
  e[e.Invoke = 1] = "Invoke", e[e.TriggerCharacter = 2] = "TriggerCharacter", e[e.ContentChange = 3] = "ContentChange";
})(la || (la = {}));
var ca;
(function(e) {
  e[e.File = 0] = "File", e[e.Module = 1] = "Module", e[e.Namespace = 2] = "Namespace", e[e.Package = 3] = "Package", e[e.Class = 4] = "Class", e[e.Method = 5] = "Method", e[e.Property = 6] = "Property", e[e.Field = 7] = "Field", e[e.Constructor = 8] = "Constructor", e[e.Enum = 9] = "Enum", e[e.Interface = 10] = "Interface", e[e.Function = 11] = "Function", e[e.Variable = 12] = "Variable", e[e.Constant = 13] = "Constant", e[e.String = 14] = "String", e[e.Number = 15] = "Number", e[e.Boolean = 16] = "Boolean", e[e.Array = 17] = "Array", e[e.Object = 18] = "Object", e[e.Key = 19] = "Key", e[e.Null = 20] = "Null", e[e.EnumMember = 21] = "EnumMember", e[e.Struct = 22] = "Struct", e[e.Event = 23] = "Event", e[e.Operator = 24] = "Operator", e[e.TypeParameter = 25] = "TypeParameter";
})(ca || (ca = {}));
var ha;
(function(e) {
  e[e.Deprecated = 1] = "Deprecated";
})(ha || (ha = {}));
var ua;
(function(e) {
  e[e.Hidden = 0] = "Hidden", e[e.Blink = 1] = "Blink", e[e.Smooth = 2] = "Smooth", e[e.Phase = 3] = "Phase", e[e.Expand = 4] = "Expand", e[e.Solid = 5] = "Solid";
})(ua || (ua = {}));
var da;
(function(e) {
  e[e.Line = 1] = "Line", e[e.Block = 2] = "Block", e[e.Underline = 3] = "Underline", e[e.LineThin = 4] = "LineThin", e[e.BlockOutline = 5] = "BlockOutline", e[e.UnderlineThin = 6] = "UnderlineThin";
})(da || (da = {}));
var ma;
(function(e) {
  e[e.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", e[e.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", e[e.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", e[e.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
})(ma || (ma = {}));
var pa;
(function(e) {
  e[e.None = 0] = "None", e[e.Same = 1] = "Same", e[e.Indent = 2] = "Indent", e[e.DeepIndent = 3] = "DeepIndent";
})(pa || (pa = {}));
const At = class {
  static chord(t, n) {
    return kc(t, n);
  }
};
At.CtrlCmd = 2048, At.Shift = 1024, At.Alt = 512, At.WinCtrl = 256;
let Qc = At;
function Zc() {
  return {
    editor: void 0,
    languages: void 0,
    CancellationTokenSource: Bl,
    Emitter: xe,
    KeyCode: Jn,
    KeyMod: Qc,
    Position: G,
    Range: W,
    Selection: ve,
    SelectionDirection: Zn,
    MarkerSeverity: Yn,
    MarkerTag: Qn,
    Uri: _e,
    Token: Yc
  };
}
const So = class ei {
  static getChannel(t) {
    return t.getChannel(ei.CHANNEL_NAME);
  }
  static setChannel(t, n) {
    t.setChannel(ei.CHANNEL_NAME, n);
  }
};
So.CHANNEL_NAME = "editorWorkerHost";
let eh = So;
new gl(10);
function th(e) {
  let t = [];
  for (; Object.prototype !== e; )
    t = t.concat(Object.getOwnPropertyNames(e)), e = Object.getPrototypeOf(e);
  return t;
}
function nh(e) {
  const t = [];
  for (const n of th(e))
    typeof e[n] == "function" && t.push(n);
  return t;
}
function ih(e, t) {
  const n = (r) => function() {
    const a = Array.prototype.slice.call(arguments, 0);
    return t(r, a);
  }, i = {};
  for (const r of e)
    i[r] = n(r);
  return i;
}
var fa;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 4] = "Right", e[e.Full = 7] = "Full";
})(fa || (fa = {}));
var ga;
(function(e) {
  e[e.Left = 1] = "Left", e[e.Center = 2] = "Center", e[e.Right = 3] = "Right";
})(ga || (ga = {}));
var ba;
(function(e) {
  e[e.Both = 0] = "Both", e[e.Right = 1] = "Right", e[e.Left = 2] = "Left", e[e.None = 3] = "None";
})(ba || (ba = {}));
function rh(e, t, n, i, r) {
  if (i === 0)
    return !0;
  const a = t.charCodeAt(i - 1);
  if (e.get(a) !== 0 || a === 13 || a === 10)
    return !0;
  if (r > 0) {
    const s = t.charCodeAt(i);
    if (e.get(s) !== 0)
      return !0;
  }
  return !1;
}
function ah(e, t, n, i, r) {
  if (i + r === n)
    return !0;
  const a = t.charCodeAt(i + r);
  if (e.get(a) !== 0 || a === 13 || a === 10)
    return !0;
  if (r > 0) {
    const s = t.charCodeAt(i + r - 1);
    if (e.get(s) !== 0)
      return !0;
  }
  return !1;
}
function sh(e, t, n, i, r) {
  return rh(e, t, n, i, r) && ah(e, t, n, i, r);
}
class oh {
  constructor(t, n) {
    this._wordSeparators = t, this._searchRegex = n, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  reset(t) {
    this._searchRegex.lastIndex = t, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  next(t) {
    const n = t.length;
    let i;
    do {
      if (this._prevMatchStartIndex + this._prevMatchLength === n || (i = this._searchRegex.exec(t), !i))
        return null;
      const r = i.index, a = i[0].length;
      if (r === this._prevMatchStartIndex && a === this._prevMatchLength) {
        if (a === 0) {
          nc(t, n, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
          continue;
        }
        return null;
      }
      if (this._prevMatchStartIndex = r, this._prevMatchLength = a, !this._wordSeparators || sh(this._wordSeparators, t, n, r, a))
        return i;
    } while (i);
    return null;
  }
}
function lh(e, t = "Unreachable") {
  throw new Error(t);
}
function Lo(e, t = "unexpected state") {
  if (!e)
    throw new se(`Assertion Failed: ${t}`);
}
function qt(e) {
  if (!e()) {
    debugger;
    e(), Ot(new se("Assertion Failed"));
  }
}
function kn(e, t) {
  let n = 0;
  for (; n < e.length - 1; ) {
    const i = e[n], r = e[n + 1];
    if (!t(i, r))
      return !1;
    n++;
  }
  return !0;
}
const ch = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
function hh(e = "") {
  let t = "(-?\\d*\\.\\d\\w*)|([^";
  for (const n of ch)
    e.indexOf(n) >= 0 || (t += "\\" + n);
  return t += "\\s]+)", new RegExp(t, "g");
}
const xo = hh();
function Eo(e) {
  let t = xo;
  if (e && e instanceof RegExp)
    if (e.global)
      t = e;
    else {
      let n = "g";
      e.ignoreCase && (n += "i"), e.multiline && (n += "m"), e.unicode && (n += "u"), t = new RegExp(e.source, n);
    }
  return t.lastIndex = 0, t;
}
const Co = new wl();
Co.unshift({
  maxLen: 1e3,
  windowSize: 15,
  timeBudget: 150
});
function Pi(e, t, n, i, r) {
  if (t = Eo(t), r || (r = nn.first(Co)), n.length > r.maxLen) {
    let c = e - r.maxLen / 2;
    return c < 0 ? c = 0 : i += c, n = n.substring(c, e + r.maxLen / 2), Pi(e, t, n, i, r);
  }
  const a = Date.now(), s = e - 1 - i;
  let l = -1, o = null;
  for (let c = 1; !(Date.now() - a >= r.timeBudget); c++) {
    const h = s - r.windowSize * c;
    t.lastIndex = Math.max(0, h);
    const d = uh(t, n, s, l);
    if (!d && o || (o = d, h <= 0))
      break;
    l = h;
  }
  if (o) {
    const c = {
      word: o[0],
      startColumn: i + 1 + o.index,
      endColumn: i + 1 + o.index + o[0].length
    };
    return t.lastIndex = 0, c;
  }
  return null;
}
function uh(e, t, n, i) {
  let r;
  for (; r = e.exec(t); ) {
    const a = r.index || 0;
    if (a <= n && e.lastIndex >= n)
      return r;
    if (i > 0 && a > i)
      return null;
  }
  return null;
}
class dh {
  static computeUnicodeHighlights(t, n, i) {
    const r = i ? i.startLineNumber : 1, a = i ? i.endLineNumber : t.getLineCount(), s = new _a(n), l = s.getCandidateCodePoints();
    let o;
    l === "allNonBasicAscii" ? o = new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : o = new RegExp(`${mh(Array.from(l))}`, "g");
    const c = new oh(null, o), h = [];
    let d = !1, m, p = 0, _ = 0, b = 0;
    e: for (let S = r, y = a; S <= y; S++) {
      const w = t.getLineContent(S), x = w.length;
      c.reset(0);
      do
        if (m = c.next(w), m) {
          let C = m.index, I = m.index + m[0].length;
          if (C > 0) {
            const T = w.charCodeAt(C - 1);
            Fn(T) && C--;
          }
          if (I + 1 < x) {
            const T = w.charCodeAt(I - 1);
            Fn(T) && I++;
          }
          const N = w.substring(C, I);
          let g = Pi(C + 1, xo, w, 0);
          g && g.endColumn <= C + 1 && (g = null);
          const f = s.shouldHighlightNonBasicASCII(N, g ? g.word : null);
          if (f !== 0) {
            if (f === 3 ? p++ : f === 2 ? _++ : f === 1 ? b++ : lh(), h.length >= 1e3) {
              d = !0;
              break e;
            }
            h.push(new W(S, C + 1, S, I + 1));
          }
        }
      while (m);
    }
    return {
      ranges: h,
      hasMore: d,
      ambiguousCharacterCount: p,
      invisibleCharacterCount: _,
      nonBasicAsciiCharacterCount: b
    };
  }
  static computeUnicodeHighlightReason(t, n) {
    const i = new _a(n);
    switch (i.shouldHighlightNonBasicASCII(t, null)) {
      case 0:
        return null;
      case 2:
        return { kind: 1 };
      case 3: {
        const r = t.codePointAt(0), a = i.ambiguousCharacters.getPrimaryConfusable(r), s = Vn.getLocales().filter((l) => !Vn.getInstance(/* @__PURE__ */ new Set([...n.allowedLocales, l])).isAmbiguous(r));
        return { kind: 0, confusableWith: String.fromCodePoint(a), notAmbiguousInLocales: s };
      }
      case 1:
        return { kind: 2 };
    }
  }
}
function mh(e, t) {
  return `[${jl(e.map((n) => String.fromCodePoint(n)).join(""))}]`;
}
class _a {
  constructor(t) {
    this.options = t, this.allowedCodePoints = new Set(t.allowedCodePoints), this.ambiguousCharacters = Vn.getInstance(new Set(t.allowedLocales));
  }
  getCandidateCodePoints() {
    if (this.options.nonBasicASCII)
      return "allNonBasicAscii";
    const t = /* @__PURE__ */ new Set();
    if (this.options.invisibleCharacters)
      for (const n of En.codePoints)
        wa(String.fromCodePoint(n)) || t.add(n);
    if (this.options.ambiguousCharacters)
      for (const n of this.ambiguousCharacters.getConfusableCodePoints())
        t.add(n);
    for (const n of this.allowedCodePoints)
      t.delete(n);
    return t;
  }
  shouldHighlightNonBasicASCII(t, n) {
    const i = t.codePointAt(0);
    if (this.allowedCodePoints.has(i))
      return 0;
    if (this.options.nonBasicASCII)
      return 1;
    let r = !1, a = !1;
    if (n)
      for (const s of n) {
        const l = s.codePointAt(0), o = rc(s);
        r = r || o, !o && !this.ambiguousCharacters.isAmbiguous(l) && !En.isInvisibleCharacter(l) && (a = !0);
      }
    return !r && a ? 0 : this.options.invisibleCharacters && !wa(t) && En.isInvisibleCharacter(i) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(i) ? 3 : 0;
  }
}
function wa(e) {
  return e === " " || e === `
` || e === "	";
}
class en {
  constructor(t, n, i) {
    this.changes = t, this.moves = n, this.hitTimeout = i;
  }
}
class Hi {
  constructor(t, n) {
    this.lineRangeMapping = t, this.changes = n;
  }
  flip() {
    return new Hi(this.lineRangeMapping.flip(), this.changes.map((t) => t.flip()));
  }
}
class V {
  static addRange(t, n) {
    let i = 0;
    for (; i < n.length && n[i].endExclusive < t.start; )
      i++;
    let r = i;
    for (; r < n.length && n[r].start <= t.endExclusive; )
      r++;
    if (i === r)
      n.splice(i, 0, t);
    else {
      const a = Math.min(t.start, n[i].start), s = Math.max(t.endExclusive, n[r - 1].endExclusive);
      n.splice(i, r - i, new V(a, s));
    }
  }
  static tryCreate(t, n) {
    if (!(t > n))
      return new V(t, n);
  }
  static ofLength(t) {
    return new V(0, t);
  }
  static ofStartAndLength(t, n) {
    return new V(t, t + n);
  }
  static emptyAt(t) {
    return new V(t, t);
  }
  constructor(t, n) {
    if (this.start = t, this.endExclusive = n, t > n)
      throw new se(`Invalid range: ${this.toString()}`);
  }
  get isEmpty() {
    return this.start === this.endExclusive;
  }
  delta(t) {
    return new V(this.start + t, this.endExclusive + t);
  }
  deltaStart(t) {
    return new V(this.start + t, this.endExclusive);
  }
  deltaEnd(t) {
    return new V(this.start, this.endExclusive + t);
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
    return new V(
      Math.min(this.start, t.start),
      Math.max(this.endExclusive, t.endExclusive)
    );
  }
  intersect(t) {
    const n = Math.max(this.start, t.start), i = Math.min(this.endExclusive, t.endExclusive);
    if (n <= i)
      return new V(n, i);
  }
  intersectionLength(t) {
    const n = Math.max(this.start, t.start), i = Math.min(this.endExclusive, t.endExclusive);
    return Math.max(0, i - n);
  }
  intersects(t) {
    const n = Math.max(this.start, t.start), i = Math.min(this.endExclusive, t.endExclusive);
    return n < i;
  }
  intersectsOrTouches(t) {
    const n = Math.max(this.start, t.start), i = Math.min(this.endExclusive, t.endExclusive);
    return n <= i;
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
      throw new se(`Invalid clipping range: ${this.toString()}`);
    return Math.max(this.start, Math.min(this.endExclusive - 1, t));
  }
  clipCyclic(t) {
    if (this.isEmpty)
      throw new se(`Invalid clipping range: ${this.toString()}`);
    return t < this.start ? this.endExclusive - (this.start - t) % this.length : t >= this.endExclusive ? this.start + (t - this.start) % this.length : t;
  }
  map(t) {
    const n = [];
    for (let i = this.start; i < this.endExclusive; i++)
      n.push(t(i));
    return n;
  }
  forEach(t) {
    for (let n = this.start; n < this.endExclusive; n++)
      t(n);
  }
}
class F {
  static fromRange(t) {
    return new F(t.startLineNumber, t.endLineNumber);
  }
  static fromRangeInclusive(t) {
    return new F(t.startLineNumber, t.endLineNumber + 1);
  }
  static subtract(t, n) {
    return n ? t.startLineNumber < n.startLineNumber && n.endLineNumberExclusive < t.endLineNumberExclusive ? [
      new F(t.startLineNumber, n.startLineNumber),
      new F(n.endLineNumberExclusive, t.endLineNumberExclusive)
    ] : n.startLineNumber <= t.startLineNumber && t.endLineNumberExclusive <= n.endLineNumberExclusive ? [] : n.endLineNumberExclusive < t.endLineNumberExclusive ? [new F(
      Math.max(n.endLineNumberExclusive, t.startLineNumber),
      t.endLineNumberExclusive
    )] : [new F(t.startLineNumber, Math.min(n.startLineNumber, t.endLineNumberExclusive))] : [t];
  }
  static joinMany(t) {
    if (t.length === 0)
      return [];
    let n = new Ue(t[0].slice());
    for (let i = 1; i < t.length; i++)
      n = n.getUnion(new Ue(t[i].slice()));
    return n.ranges;
  }
  static join(t) {
    if (t.length === 0)
      throw new se("lineRanges cannot be empty");
    let n = t[0].startLineNumber, i = t[0].endLineNumberExclusive;
    for (let r = 1; r < t.length; r++)
      n = Math.min(n, t[r].startLineNumber), i = Math.max(i, t[r].endLineNumberExclusive);
    return new F(n, i);
  }
  static ofLength(t, n) {
    return new F(t, t + n);
  }
  static deserialize(t) {
    return new F(t[0], t[1]);
  }
  constructor(t, n) {
    if (t > n)
      throw new se(
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
    return new F(this.startLineNumber + t, this.endLineNumberExclusive + t);
  }
  deltaLength(t) {
    return new F(this.startLineNumber, this.endLineNumberExclusive + t);
  }
  get length() {
    return this.endLineNumberExclusive - this.startLineNumber;
  }
  join(t) {
    return new F(
      Math.min(this.startLineNumber, t.startLineNumber),
      Math.max(this.endLineNumberExclusive, t.endLineNumberExclusive)
    );
  }
  toString() {
    return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
  }
  intersect(t) {
    const n = Math.max(this.startLineNumber, t.startLineNumber), i = Math.min(this.endLineNumberExclusive, t.endLineNumberExclusive);
    if (n <= i)
      return new F(n, i);
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
    return this.isEmpty ? null : new W(
      this.startLineNumber,
      1,
      this.endLineNumberExclusive - 1,
      Number.MAX_SAFE_INTEGER
    );
  }
  toExclusiveRange() {
    return new W(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
  }
  mapToLineArray(t) {
    const n = [];
    for (let i = this.startLineNumber; i < this.endLineNumberExclusive; i++)
      n.push(t(i));
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
    return new V(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
  }
  distanceToRange(t) {
    return this.endLineNumberExclusive <= t.startLineNumber ? t.startLineNumber - this.endLineNumberExclusive : t.endLineNumberExclusive <= this.startLineNumber ? this.startLineNumber - t.endLineNumberExclusive : 0;
  }
  distanceToLine(t) {
    return this.contains(t) ? 0 : t < this.startLineNumber ? this.startLineNumber - t : t - this.endLineNumberExclusive;
  }
  addMargin(t, n) {
    return new F(
      this.startLineNumber - t,
      this.endLineNumberExclusive + n
    );
  }
}
class Ue {
  constructor(t = []) {
    this._normalizedRanges = t;
  }
  get ranges() {
    return this._normalizedRanges;
  }
  addRange(t) {
    if (t.length === 0)
      return;
    const n = Pn(this._normalizedRanges, (r) => r.endLineNumberExclusive >= t.startLineNumber), i = vt(this._normalizedRanges, (r) => r.startLineNumber <= t.endLineNumberExclusive) + 1;
    if (n === i)
      this._normalizedRanges.splice(n, 0, t);
    else if (n === i - 1) {
      const r = this._normalizedRanges[n];
      this._normalizedRanges[n] = r.join(t);
    } else {
      const r = this._normalizedRanges[n].join(this._normalizedRanges[i - 1]).join(t);
      this._normalizedRanges.splice(n, i - n, r);
    }
  }
  contains(t) {
    const n = wt(this._normalizedRanges, (i) => i.startLineNumber <= t);
    return !!n && n.endLineNumberExclusive > t;
  }
  intersects(t) {
    const n = wt(this._normalizedRanges, (i) => i.startLineNumber < t.endLineNumberExclusive);
    return !!n && n.endLineNumberExclusive > t.startLineNumber;
  }
  getUnion(t) {
    if (this._normalizedRanges.length === 0)
      return t;
    if (t._normalizedRanges.length === 0)
      return this;
    const n = [];
    let i = 0, r = 0, a = null;
    for (; i < this._normalizedRanges.length || r < t._normalizedRanges.length; ) {
      let s = null;
      if (i < this._normalizedRanges.length && r < t._normalizedRanges.length) {
        const l = this._normalizedRanges[i], o = t._normalizedRanges[r];
        l.startLineNumber < o.startLineNumber ? (s = l, i++) : (s = o, r++);
      } else i < this._normalizedRanges.length ? (s = this._normalizedRanges[i], i++) : (s = t._normalizedRanges[r], r++);
      a === null ? a = s : a.endLineNumberExclusive >= s.startLineNumber ? a = new F(
        a.startLineNumber,
        Math.max(a.endLineNumberExclusive, s.endLineNumberExclusive)
      ) : (n.push(a), a = s);
    }
    return a !== null && n.push(a), new Ue(n);
  }
  subtractFrom(t) {
    const n = Pn(this._normalizedRanges, (s) => s.endLineNumberExclusive >= t.startLineNumber), i = vt(this._normalizedRanges, (s) => s.startLineNumber <= t.endLineNumberExclusive) + 1;
    if (n === i)
      return new Ue([t]);
    const r = [];
    let a = t.startLineNumber;
    for (let s = n; s < i; s++) {
      const l = this._normalizedRanges[s];
      l.startLineNumber > a && r.push(new F(a, l.startLineNumber)), a = l.endLineNumberExclusive;
    }
    return a < t.endLineNumberExclusive && r.push(new F(a, t.endLineNumberExclusive)), new Ue(r);
  }
  toString() {
    return this._normalizedRanges.map((t) => t.toString()).join(", ");
  }
  getIntersection(t) {
    const n = [];
    let i = 0, r = 0;
    for (; i < this._normalizedRanges.length && r < t._normalizedRanges.length; ) {
      const a = this._normalizedRanges[i], s = t._normalizedRanges[r], l = a.intersect(s);
      l && !l.isEmpty && n.push(l), a.endLineNumberExclusive < s.endLineNumberExclusive ? i++ : r++;
    }
    return new Ue(n);
  }
  getWithDelta(t) {
    return new Ue(this._normalizedRanges.map((n) => n.delta(t)));
  }
}
const ti = class tt {
  static fromJson(t) {
    return new tt(t.map(Te.fromJson));
  }
  static replace(t, n) {
    return new tt([new Te(t, n)]);
  }
  static insert(t, n) {
    return tt.replace(V.emptyAt(t), n);
  }
  constructor(t) {
    this.edits = t;
    let n = -1;
    for (const i of t) {
      if (!(i.replaceRange.start >= n))
        throw new se(`Edits must be disjoint and sorted. Found ${i} after ${n}`);
      n = i.replaceRange.endExclusive;
    }
  }
  normalize() {
    const t = [];
    let n;
    for (const i of this.edits)
      i.newText.length === 0 && i.replaceRange.length === 0 || (n && n.replaceRange.endExclusive === i.replaceRange.start ? n = new Te(
        n.replaceRange.join(i.replaceRange),
        n.newText + i.newText
      ) : (n && t.push(n), n = i));
    return n && t.push(n), new tt(t);
  }
  toString() {
    return `[${this.edits.map((t) => t.toString()).join(", ")}]`;
  }
  apply(t) {
    const n = [];
    let i = 0;
    for (const r of this.edits)
      n.push(t.substring(i, r.replaceRange.start)), n.push(r.newText), i = r.replaceRange.endExclusive;
    return n.push(t.substring(i)), n.join("");
  }
  compose(t) {
    return ph(this, t);
  }
  inverse(t) {
    const n = [];
    let i = 0;
    for (const r of this.edits)
      n.push(new Te(
        V.ofStartAndLength(r.replaceRange.start + i, r.newText.length),
        t.substring(r.replaceRange.start, r.replaceRange.endExclusive)
      )), i += r.newText.length - r.replaceRange.length;
    return new tt(n);
  }
  getNewTextRanges() {
    const t = [];
    let n = 0;
    for (const i of this.edits)
      t.push(V.ofStartAndLength(i.replaceRange.start + n, i.newText.length)), n += i.newText.length - i.replaceRange.length;
    return t;
  }
  get isEmpty() {
    return this.edits.length === 0;
  }
  tryRebase(t, n) {
    const i = [];
    let r = 0, a = 0, s = 0;
    for (; a < this.edits.length || r < t.edits.length; ) {
      const l = t.edits[r], o = this.edits[a];
      if (o)
        if (!l)
          i.push(new Te(o.replaceRange.delta(s), o.newText)), a++;
        else if (o.replaceRange.intersectsOrTouches(l.replaceRange)) {
          if (a++, n)
            return;
        } else o.replaceRange.start < l.replaceRange.start ? (i.push(new Te(o.replaceRange.delta(s), o.newText)), a++) : (r++, s += l.newText.length - l.replaceRange.length);
      else break;
    }
    return new tt(i);
  }
  applyToOffset(t) {
    let n = 0;
    for (const i of this.edits)
      if (i.replaceRange.start <= t) {
        if (t < i.replaceRange.endExclusive)
          return i.replaceRange.start + n;
        n += i.newText.length - i.replaceRange.length;
      } else
        break;
    return t + n;
  }
  applyToOffsetRange(t) {
    return new V(
      this.applyToOffset(t.start),
      this.applyToOffset(t.endExclusive)
    );
  }
  applyInverseToOffset(t) {
    let n = 0;
    for (const i of this.edits) {
      const r = i.newText.length;
      if (i.replaceRange.start <= t - n) {
        if (t - n < i.replaceRange.start + r)
          return i.replaceRange.start;
        n += r - i.replaceRange.length;
      } else
        break;
    }
    return t - n;
  }
};
ti.empty = new ti([]);
let Ro = ti;
class Te {
  static fromJson(t) {
    return new Te(V.ofStartAndLength(t.pos, t.len), t.txt);
  }
  static insert(t, n) {
    return new Te(V.emptyAt(t), n);
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
function ph(e, t) {
  if (e = e.normalize(), t = t.normalize(), e.isEmpty)
    return t;
  if (t.isEmpty)
    return e;
  const n = [...e.edits], i = [];
  let r = 0;
  for (const a of t.edits) {
    for (; ; ) {
      const c = n[0];
      if (!c || c.replaceRange.start + r + c.newText.length >= a.replaceRange.start)
        break;
      n.shift(), i.push(c), r += c.newText.length - c.replaceRange.length;
    }
    const s = r;
    let l, o;
    for (; ; ) {
      const c = n[0];
      if (!c || c.replaceRange.start + r > a.replaceRange.endExclusive)
        break;
      l || (l = c), o = c, n.shift(), r += c.newText.length - c.replaceRange.length;
    }
    if (!l)
      i.push(new Te(a.replaceRange.delta(-r), a.newText));
    else {
      let c = "";
      const h = a.replaceRange.start - (l.replaceRange.start + s);
      h > 0 && (c = l.newText.slice(0, h));
      const d = o.replaceRange.endExclusive + r - a.replaceRange.endExclusive;
      if (d > 0) {
        const _ = new Te(
          V.ofStartAndLength(o.replaceRange.endExclusive, 0),
          o.newText.slice(-d)
        );
        n.unshift(_), r -= _.newText.length - _.replaceRange.length;
      }
      const m = c + a.newText, p = new V(
        Math.min(l.replaceRange.start, a.replaceRange.start - s),
        a.replaceRange.endExclusive - r
      );
      i.push(new Te(p, m));
    }
  }
  for (; ; ) {
    const a = n.shift();
    if (!a)
      break;
    i.push(a);
  }
  return new Ro(i).normalize();
}
const ni = class mt {
  static deserialize(t) {
    return new mt(t.map((n) => at.deserialize(n)));
  }
  static fromEdit(t, n) {
    const i = No.fromOffsetEdit(t, n);
    return mt.fromTextEdit(i, n);
  }
  static fromTextEdit(t, n) {
    const i = t.edits, r = [], a = [];
    for (let s = 0; s < i.length; s++) {
      const l = i[s], o = s + 1 < i.length ? i[s + 1] : void 0;
      if (a.push(l), o && o.range.startLineNumber === l.range.endLineNumber)
        continue;
      const c = me.joinEdits(a, n);
      a.length = 0;
      const h = at.fromSingleTextEdit(c, n);
      r.push(h);
    }
    return new mt(r);
  }
  static createFromUnsorted(t) {
    const n = t.slice();
    return n.sort(zt((i) => i.lineRange.startLineNumber, Ut)), new mt(n);
  }
  constructor(t) {
    this.edits = t, Lo(kn(t, (n, i) => n.lineRange.endLineNumberExclusive <= i.lineRange.startLineNumber));
  }
  toEdit(t) {
    const n = [];
    for (const i of this.edits) {
      const r = i.toSingleEdit(t);
      n.push(r);
    }
    return new Ro(n);
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
    for (const i of this.edits)
      t.push(F.ofLength(i.lineRange.startLineNumber + n, i.newLines.length)), n += i.newLines.length - i.lineRange.length;
    return t;
  }
  mapLineNumber(t) {
    let n = 0;
    for (const i of this.edits) {
      if (i.lineRange.endLineNumberExclusive > t)
        break;
      n += i.newLines.length - i.lineRange.length;
    }
    return t + n;
  }
  mapLineRange(t) {
    return new F(
      this.mapLineNumber(t.startLineNumber),
      this.mapLineNumber(t.endLineNumberExclusive)
    );
  }
  rebase(t) {
    return new mt(this.edits.map((n) => new at(t.mapLineRange(n.lineRange), n.newLines)));
  }
  humanReadablePatch(t) {
    const n = [];
    function i(l, o, c, h) {
      const d = c === "unmodified" ? " " : c === "deleted" ? "-" : "+";
      h === void 0 && (h = "[[[[[ WARNING: LINE DOES NOT EXIST ]]]]]");
      const m = l === -1 ? "   " : l.toString().padStart(3, " "), p = o === -1 ? "   " : o.toString().padStart(3, " ");
      n.push(`${d} ${m} ${p} ${h}`);
    }
    function r() {
      n.push("---");
    }
    let a = 0, s = !0;
    for (const l of to(this.edits, (o, c) => o.lineRange.distanceToRange(c.lineRange) <= 5)) {
      s ? s = !1 : r();
      let o = l[0].lineRange.startLineNumber - 2;
      for (const c of l) {
        for (let m = Math.max(1, o); m < c.lineRange.startLineNumber; m++)
          i(m, m + a, "unmodified", t[m - 1]);
        const h = c.lineRange, d = c.newLines;
        for (const m of h.mapToLineArray((p) => p)) {
          const p = t[m - 1];
          i(m, -1, "deleted", p);
        }
        for (let m = 0; m < d.length; m++) {
          const p = d[m];
          i(-1, h.startLineNumber + a + m, "added", p);
        }
        o = h.endLineNumberExclusive, a += c.newLines.length - c.lineRange.length;
      }
      for (let c = o; c <= Math.min(o + 2, t.length); c++)
        i(c, c + a, "unmodified", t[c - 1]);
    }
    return n.join(`
`);
  }
  apply(t) {
    const n = [];
    let i = 0;
    for (const r of this.edits) {
      for (; i < r.lineRange.startLineNumber - 1; )
        n.push(t[i]), i++;
      for (const a of r.newLines)
        n.push(a);
      i = r.lineRange.endLineNumberExclusive - 1;
    }
    for (; i < t.length; )
      n.push(t[i]), i++;
    return n;
  }
  toSingleEdit() {
  }
};
ni.empty = new ni([]);
let fh = ni;
class at {
  static deserialize(t) {
    return new at(F.ofLength(t[0], t[1] - t[0]), t[2]);
  }
  static fromSingleTextEdit(t, n) {
    const i = Oi(t.text);
    let r = t.range.startLineNumber;
    const a = n.getValueOfRange(W.fromPositions(new G(t.range.startLineNumber, 1), t.range.getStartPosition()));
    i[0] = a + i[0];
    let s = t.range.endLineNumber + 1;
    const l = n.getTransformer().getLineLength(t.range.endLineNumber) + 1, o = n.getValueOfRange(W.fromPositions(t.range.getEndPosition(), new G(t.range.endLineNumber, l)));
    i[i.length - 1] = i[i.length - 1] + o;
    const c = t.range.startColumn === n.getTransformer().getLineLength(t.range.startLineNumber) + 1, h = t.range.endColumn === 1;
    return c && i[0].length === a.length && (r++, i.shift()), i.length > 0 && r < s && h && i[i.length - 1].length === o.length && (s--, i.pop()), new at(new F(r, s), i);
  }
  constructor(t, n) {
    this.lineRange = t, this.newLines = n;
  }
  toSingleTextEdit(t) {
    if (this.newLines.length === 0) {
      const n = t.getTransformer().textLength;
      if (this.lineRange.endLineNumberExclusive === n.lineCount + 2) {
        let i;
        if (this.lineRange.startLineNumber > 1) {
          const a = this.lineRange.startLineNumber - 1, s = t.getTransformer().getLineLength(a) + 1;
          i = new G(a, s);
        } else
          i = new G(1, 1);
        const r = n.addToPosition(new G(1, 1));
        return new me(W.fromPositions(i, r), "");
      } else
        return new me(new W(
          this.lineRange.startLineNumber,
          1,
          this.lineRange.endLineNumberExclusive,
          1
        ), "");
    } else if (this.lineRange.isEmpty) {
      let n, i, r;
      const a = this.lineRange.startLineNumber;
      return a === t.getTransformer().textLength.lineCount + 2 ? (n = a - 1, i = t.getTransformer().getLineLength(n) + 1, r = this.newLines.map((s) => `
` + s).join("")) : (n = a, i = 1, r = this.newLines.map((s) => s + `
`).join("")), new me(W.fromPositions(new G(n, i)), r);
    } else {
      const n = this.lineRange.endLineNumberExclusive - 1, i = t.getTransformer().getLineLength(n) + 1, r = new W(this.lineRange.startLineNumber, 1, n, i), a = this.newLines.join(`
`);
      return new me(r, a);
    }
  }
  toSingleEdit(t) {
    const n = this.toSingleTextEdit(t), i = t.getTransformer().getOffsetRange(n.range);
    return new Te(i, n.text);
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
    let n = this.lineRange.startLineNumber, i = this.lineRange.endLineNumberExclusive, r = 0;
    for (; n < i && r < this.newLines.length && this.newLines[r] === t.getLineAt(n); )
      n++, r++;
    let a = 0;
    for (; n < i && a + r < this.newLines.length && this.newLines[this.newLines.length - 1 - a] === t.getLineAt(i - 1); )
      i--, a++;
    return r === 0 && a === 0 ? this : new at(new F(n, i), this.newLines.slice(r, this.newLines.length - a));
  }
  toLineEdit() {
    return new fh([this]);
  }
}
const ii = class Ae {
  static lengthDiffNonNegative(t, n) {
    return n.isLessThan(t) ? Ae.zero : t.lineCount === n.lineCount ? new Ae(0, n.columnCount - t.columnCount) : new Ae(n.lineCount - t.lineCount, n.columnCount);
  }
  static betweenPositions(t, n) {
    return t.lineNumber === n.lineNumber ? new Ae(0, n.column - t.column) : new Ae(n.lineNumber - t.lineNumber, n.column - 1);
  }
  static fromPosition(t) {
    return new Ae(t.lineNumber - 1, t.column - 1);
  }
  static ofRange(t) {
    return Ae.betweenPositions(t.getStartPosition(), t.getEndPosition());
  }
  static ofText(t) {
    let n = 0, i = 0;
    for (const r of t)
      r === `
` ? (n++, i = 0) : i++;
    return new Ae(n, i);
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
    return t.lineCount === 0 ? new Ae(this.lineCount, this.columnCount + t.columnCount) : new Ae(this.lineCount + t.lineCount, t.columnCount);
  }
  createRange(t) {
    return this.lineCount === 0 ? new W(
      t.lineNumber,
      t.column,
      t.lineNumber,
      t.column + this.columnCount
    ) : new W(
      t.lineNumber,
      t.column,
      t.lineNumber + this.lineCount,
      this.columnCount + 1
    );
  }
  toRange() {
    return new W(1, 1, this.lineCount + 1, this.columnCount + 1);
  }
  toLineRange() {
    return F.ofLength(1, this.lineCount);
  }
  addToPosition(t) {
    return this.lineCount === 0 ? new G(t.lineNumber, t.column + this.columnCount) : new G(t.lineNumber + this.lineCount, this.columnCount + 1);
  }
  addToRange(t) {
    return W.fromPositions(this.addToPosition(t.getStartPosition()), this.addToPosition(t.getEndPosition()));
  }
  toString() {
    return `${this.lineCount},${this.columnCount}`;
  }
};
ii.zero = new ii(0, 0);
let Tt = ii;
class Ao {
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
    return new V(
      this.getOffset(t.getStartPosition()),
      this.getOffset(t.getEndPosition())
    );
  }
  getPosition(t) {
    const n = vt(this.lineStartOffsetByLineIdx, (a) => a <= t), i = n + 1, r = t - this.lineStartOffsetByLineIdx[n] + 1;
    return new G(i, r);
  }
  getRange(t) {
    return W.fromPositions(this.getPosition(t.start), this.getPosition(t.endExclusive));
  }
  getTextLength(t) {
    return Tt.ofRange(this.getRange(t));
  }
  get textLength() {
    const t = this.lineStartOffsetByLineIdx.length - 1;
    return new Tt(t, this.text.length - this.lineStartOffsetByLineIdx[t]);
  }
  getLineLength(t) {
    return this.lineEndOffsetByLineIdx[t - 1] - this.lineStartOffsetByLineIdx[t - 1];
  }
}
let No = class pt {
  static fromOffsetEdit(t, n) {
    const i = t.edits.map((r) => new me(n.getTransformer().getRange(r.replaceRange), r.newText));
    return new pt(i);
  }
  static single(t, n) {
    return new pt([new me(t, n)]);
  }
  static insert(t, n) {
    return new pt([new me(W.fromPositions(t, t), n)]);
  }
  constructor(t) {
    this.edits = t, qt(() => kn(t, (n, i) => n.range.getEndPosition().isBeforeOrEqual(i.range.getStartPosition())));
  }
  normalize() {
    const t = [];
    for (const n of this.edits)
      if (t.length > 0 && t[t.length - 1].range.getEndPosition().equals(n.range.getStartPosition())) {
        const i = t[t.length - 1];
        t[t.length - 1] = new me(i.range.plusRange(n.range), i.text + n.text);
      } else n.isEmpty || t.push(n);
    return new pt(t);
  }
  mapPosition(t) {
    let n = 0, i = 0, r = 0;
    for (const a of this.edits) {
      const s = a.range.getStartPosition();
      if (t.isBeforeOrEqual(s))
        break;
      const l = a.range.getEndPosition(), o = Tt.ofText(a.text);
      if (t.isBefore(l)) {
        const c = new G(
          s.lineNumber + n,
          s.column + (s.lineNumber + n === i ? r : 0)
        ), h = o.addToPosition(c);
        return jt(c, h);
      }
      s.lineNumber + n !== i && (r = 0), n += o.lineCount - (a.range.endLineNumber - a.range.startLineNumber), o.lineCount === 0 ? l.lineNumber !== s.lineNumber ? r += o.columnCount - (l.column - 1) : r += o.columnCount - (l.column - s.column) : r = o.columnCount, i = l.lineNumber + n;
    }
    return new G(
      t.lineNumber + n,
      t.column + (t.lineNumber + n === i ? r : 0)
    );
  }
  mapRange(t) {
    function n(s) {
      return s instanceof G ? s : s.getStartPosition();
    }
    function i(s) {
      return s instanceof G ? s : s.getEndPosition();
    }
    const r = n(this.mapPosition(t.getStartPosition())), a = i(this.mapPosition(t.getEndPosition()));
    return jt(r, a);
  }
  inverseMapPosition(t, n) {
    return this.inverse(n).mapPosition(t);
  }
  inverseMapRange(t, n) {
    return this.inverse(n).mapRange(t);
  }
  apply(t) {
    let n = "", i = new G(1, 1);
    for (const a of this.edits) {
      const s = a.range, l = s.getStartPosition(), o = s.getEndPosition(), c = jt(i, l);
      c.isEmpty() || (n += t.getValueOfRange(c)), n += a.text, i = o;
    }
    const r = jt(i, t.endPositionExclusive);
    return r.isEmpty() || (n += t.getValueOfRange(r)), n;
  }
  applyToString(t) {
    const n = new bh(t);
    return this.apply(n);
  }
  inverse(t) {
    const n = this.getNewRanges();
    return new pt(this.edits.map((i, r) => new me(n[r], t.getValueOfRange(i.range))));
  }
  getNewRanges() {
    const t = [];
    let n = 0, i = 0, r = 0;
    for (const a of this.edits) {
      const s = Tt.ofText(a.text), l = G.lift({
        lineNumber: a.range.startLineNumber + i,
        column: a.range.startColumn + (a.range.startLineNumber === n ? r : 0)
      }), o = s.createRange(l);
      t.push(o), i = o.endLineNumber - a.range.endLineNumber, r = o.endColumn - a.range.endColumn, n = a.range.endLineNumber;
    }
    return t;
  }
  toSingle(t) {
    if (this.edits.length === 0)
      throw new se();
    if (this.edits.length === 1)
      return this.edits[0];
    const n = this.edits[0].range.getStartPosition(), i = this.edits[this.edits.length - 1].range.getEndPosition();
    let r = "";
    for (let a = 0; a < this.edits.length; a++) {
      const s = this.edits[a];
      if (r += s.text, a < this.edits.length - 1) {
        const l = this.edits[a + 1], o = W.fromPositions(s.range.getEndPosition(), l.range.getStartPosition()), c = t.getValueOfRange(o);
        r += c;
      }
    }
    return new me(W.fromPositions(n, i), r);
  }
};
class me {
  static joinEdits(t, n) {
    if (t.length === 0)
      throw new se();
    if (t.length === 1)
      return t[0];
    const i = t[0].range.getStartPosition(), r = t[t.length - 1].range.getEndPosition();
    let a = "";
    for (let s = 0; s < t.length; s++) {
      const l = t[s];
      if (a += l.text, s < t.length - 1) {
        const o = t[s + 1], c = W.fromPositions(l.range.getEndPosition(), o.range.getStartPosition()), h = n.getValueOfRange(c);
        a += h;
      }
    }
    return new me(W.fromPositions(i, r), a);
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
    return new No([this]);
  }
  equals(t) {
    return me.equals(this, t);
  }
  extendToCoverRange(t, n) {
    if (this.range.containsRange(t))
      return this;
    const i = this.range.plusRange(t), r = n.getValueOfRange(W.fromPositions(i.getStartPosition(), this.range.getStartPosition())), a = n.getValueOfRange(W.fromPositions(this.range.getEndPosition(), i.getEndPosition())), s = r + this.text + a;
    return new me(i, s);
  }
  extendToFullLine(t) {
    const n = new W(
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
`), i = this.text.replaceAll(`\r
`, `
`), r = Zi(n, i), a = Tt.ofText(n.substring(0, r)).addToPosition(this.range.getStartPosition()), s = i.substring(r), l = W.fromPositions(a, this.range.getEndPosition());
    return new me(l, s);
  }
  isEffectiveDeletion(t) {
    let n = this.text.replaceAll(`\r
`, `
`), i = t.getValueOfRange(this.range).replaceAll(`\r
`, `
`);
    const r = Zi(n, i);
    n = n.substring(r), i = i.substring(r);
    const a = Zl(n, i);
    return n = n.substring(0, n.length - a), i = i.substring(0, i.length - a), n === "";
  }
}
function jt(e, t) {
  if (e.lineNumber === t.lineNumber && e.column === Number.MAX_SAFE_INTEGER)
    return W.fromPositions(t, t);
  if (!e.isBeforeOrEqual(t))
    throw new se("start must be before end");
  return new W(e.lineNumber, e.column, t.lineNumber, t.column);
}
class Mo {
  constructor() {
    this._transformer = void 0;
  }
  get endPositionExclusive() {
    return this.length.addToPosition(new G(1, 1));
  }
  get lineRange() {
    return this.length.toLineRange();
  }
  getValue() {
    return this.getValueOfRange(this.length.toRange());
  }
  getLineLength(t) {
    return this.getValueOfRange(new W(t, 1, t, Number.MAX_SAFE_INTEGER)).length;
  }
  getTransformer() {
    return this._transformer || (this._transformer = new Ao(this.getValue())), this._transformer;
  }
  getLineAt(t) {
    return this.getValueOfRange(new W(t, 1, t, Number.MAX_SAFE_INTEGER));
  }
  getLines() {
    const t = this.getValue();
    return Oi(t);
  }
}
class gh extends Mo {
  constructor(t, n) {
    Lo(n >= 1), super(), this._getLineContent = t, this._lineCount = n;
  }
  getValueOfRange(t) {
    if (t.startLineNumber === t.endLineNumber)
      return this._getLineContent(t.startLineNumber).substring(t.startColumn - 1, t.endColumn - 1);
    let n = this._getLineContent(t.startLineNumber).substring(t.startColumn - 1);
    for (let i = t.startLineNumber + 1; i < t.endLineNumber; i++)
      n += `
` + this._getLineContent(i);
    return n += `
` + this._getLineContent(t.endLineNumber).substring(0, t.endColumn - 1), n;
  }
  getLineLength(t) {
    return this._getLineContent(t).length;
  }
  get length() {
    const t = this._getLineContent(this._lineCount);
    return new Tt(this._lineCount - 1, t.length);
  }
}
class $t extends gh {
  constructor(t) {
    super((n) => t[n - 1], t.length);
  }
}
class bh extends Mo {
  constructor(t) {
    super(), this.value = t, this._t = new Ao(this.value);
  }
  getValueOfRange(t) {
    return this._t.getOffsetRange(t).substring(this.value);
  }
  get length() {
    return this._t.textLength;
  }
}
class Ce {
  static inverse(t, n, i) {
    const r = [];
    let a = 1, s = 1;
    for (const o of t) {
      const c = new Ce(new F(a, o.original.startLineNumber), new F(s, o.modified.startLineNumber));
      c.modified.isEmpty || r.push(c), a = o.original.endLineNumberExclusive, s = o.modified.endLineNumberExclusive;
    }
    const l = new Ce(new F(a, n + 1), new F(s, i + 1));
    return l.modified.isEmpty || r.push(l), r;
  }
  static clip(t, n, i) {
    const r = [];
    for (const a of t) {
      const s = a.original.intersect(n), l = a.modified.intersect(i);
      s && !s.isEmpty && l && !l.isEmpty && r.push(new Ce(s, l));
    }
    return r;
  }
  constructor(t, n) {
    this.original = t, this.modified = n;
  }
  toString() {
    return `{${this.original.toString()}->${this.modified.toString()}}`;
  }
  flip() {
    return new Ce(this.modified, this.original);
  }
  join(t) {
    return new Ce(this.original.join(t.original), this.modified.join(t.modified));
  }
  get changedLineCount() {
    return Math.max(this.original.length, this.modified.length);
  }
  toRangeMapping() {
    const t = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
    if (t && n)
      return new fe(t, n);
    if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
      if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1))
        throw new se("not a valid diff");
      return new fe(new W(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new W(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
    } else
      return new fe(new W(
        this.original.startLineNumber - 1,
        Number.MAX_SAFE_INTEGER,
        this.original.endLineNumberExclusive - 1,
        Number.MAX_SAFE_INTEGER
      ), new W(
        this.modified.startLineNumber - 1,
        Number.MAX_SAFE_INTEGER,
        this.modified.endLineNumberExclusive - 1,
        Number.MAX_SAFE_INTEGER
      ));
  }
  toRangeMapping2(t, n) {
    if (va(this.original.endLineNumberExclusive, t) && va(this.modified.endLineNumberExclusive, n))
      return new fe(new W(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new W(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
    if (!this.original.isEmpty && !this.modified.isEmpty)
      return new fe(W.fromPositions(new G(this.original.startLineNumber, 1), ut(new G(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), W.fromPositions(new G(this.modified.startLineNumber, 1), ut(new G(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
    if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1)
      return new fe(W.fromPositions(ut(new G(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), t), ut(new G(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), t)), W.fromPositions(ut(new G(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), ut(new G(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
    throw new se();
  }
}
function ut(e, t) {
  if (e.lineNumber < 1)
    return new G(1, 1);
  if (e.lineNumber > t.length)
    return new G(t.length, t[t.length - 1].length + 1);
  const n = t[e.lineNumber - 1];
  return e.column > n.length + 1 ? new G(e.lineNumber, n.length + 1) : e;
}
function va(e, t) {
  return e >= 1 && e <= t.length;
}
class qe extends Ce {
  static fromRangeMappings(t) {
    const n = F.join(t.map((r) => F.fromRangeInclusive(r.originalRange))), i = F.join(t.map((r) => F.fromRangeInclusive(r.modifiedRange)));
    return new qe(n, i, t);
  }
  constructor(t, n, i) {
    super(t, n), this.innerChanges = i;
  }
  flip() {
    var t;
    return new qe(this.modified, this.original, (t = this.innerChanges) == null ? void 0 : t.map((n) => n.flip()));
  }
  withInnerChangesFromLineRanges() {
    return new qe(this.original, this.modified, [this.toRangeMapping()]);
  }
}
class fe {
  static fromEdit(t) {
    const n = t.getNewRanges();
    return t.edits.map((i, r) => new fe(i.range, n[r]));
  }
  static fromEditJoin(t) {
    const n = t.getNewRanges(), i = t.edits.map((r, a) => new fe(r.range, n[a]));
    return fe.join(i);
  }
  static join(t) {
    if (t.length === 0)
      throw new se("Cannot join an empty list of range mappings");
    let n = t[0];
    for (let i = 1; i < t.length; i++)
      n = n.join(t[i]);
    return n;
  }
  static assertSorted(t) {
    for (let n = 1; n < t.length; n++) {
      const i = t[n - 1], r = t[n];
      if (!(i.originalRange.getEndPosition().isBeforeOrEqual(r.originalRange.getStartPosition()) && i.modifiedRange.getEndPosition().isBeforeOrEqual(r.modifiedRange.getStartPosition())))
        throw new se("Range mappings must be sorted");
    }
  }
  constructor(t, n) {
    this.originalRange = t, this.modifiedRange = n;
  }
  toString() {
    return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
  }
  flip() {
    return new fe(this.modifiedRange, this.originalRange);
  }
  toTextEdit(t) {
    const n = t.getValueOfRange(this.modifiedRange);
    return new me(this.originalRange, n);
  }
  join(t) {
    return new fe(
      this.originalRange.plusRange(t.originalRange),
      this.modifiedRange.plusRange(t.modifiedRange)
    );
  }
}
function ya(e, t, n, i = !1) {
  const r = [];
  for (const a of to(e.map((s) => _h(s, t, n)), (s, l) => s.original.overlapOrTouch(l.original) || s.modified.overlapOrTouch(l.modified))) {
    const s = a[0], l = a[a.length - 1];
    r.push(new qe(
      s.original.join(l.original),
      s.modified.join(l.modified),
      a.map((o) => o.innerChanges[0])
    ));
  }
  return qt(() => !i && r.length > 0 && (r[0].modified.startLineNumber !== r[0].original.startLineNumber || n.length.lineCount - r[r.length - 1].modified.endLineNumberExclusive !== t.length.lineCount - r[r.length - 1].original.endLineNumberExclusive) ? !1 : kn(r, (a, s) => s.original.startLineNumber - a.original.endLineNumberExclusive === s.modified.startLineNumber - a.modified.endLineNumberExclusive && a.original.endLineNumberExclusive < s.original.startLineNumber && a.modified.endLineNumberExclusive < s.modified.startLineNumber)), r;
}
function _h(e, t, n) {
  let i = 0, r = 0;
  e.modifiedRange.endColumn === 1 && e.originalRange.endColumn === 1 && e.originalRange.startLineNumber + i <= e.originalRange.endLineNumber && e.modifiedRange.startLineNumber + i <= e.modifiedRange.endLineNumber && (r = -1), e.modifiedRange.startColumn - 1 >= n.getLineLength(e.modifiedRange.startLineNumber) && e.originalRange.startColumn - 1 >= t.getLineLength(e.originalRange.startLineNumber) && e.originalRange.startLineNumber <= e.originalRange.endLineNumber + r && e.modifiedRange.startLineNumber <= e.modifiedRange.endLineNumber + r && (i = 1);
  const a = new F(
    e.originalRange.startLineNumber + i,
    e.originalRange.endLineNumber + 1 + r
  ), s = new F(
    e.modifiedRange.startLineNumber + i,
    e.modifiedRange.endLineNumber + 1 + r
  );
  return new qe(a, s, [e]);
}
const wh = 3;
class vh {
  computeDiff(t, n, i) {
    var r;
    const a = new Oo(t, n, {
      maxComputationTime: i.maxComputationTimeMs,
      shouldIgnoreTrimWhitespace: i.ignoreTrimWhitespace,
      shouldComputeCharChanges: !0,
      shouldMakePrettyDiff: !0,
      shouldPostProcessCharChanges: !0
    }).computeDiff(), s = [];
    let l = null;
    for (const o of a.changes) {
      let c;
      o.originalEndLineNumber === 0 ? c = new F(o.originalStartLineNumber + 1, o.originalStartLineNumber + 1) : c = new F(o.originalStartLineNumber, o.originalEndLineNumber + 1);
      let h;
      o.modifiedEndLineNumber === 0 ? h = new F(o.modifiedStartLineNumber + 1, o.modifiedStartLineNumber + 1) : h = new F(o.modifiedStartLineNumber, o.modifiedEndLineNumber + 1);
      let d = new qe(c, h, (r = o.charChanges) == null ? void 0 : r.map((m) => new fe(new W(
        m.originalStartLineNumber,
        m.originalStartColumn,
        m.originalEndLineNumber,
        m.originalEndColumn
      ), new W(
        m.modifiedStartLineNumber,
        m.modifiedStartColumn,
        m.modifiedEndLineNumber,
        m.modifiedEndColumn
      ))));
      l && (l.modified.endLineNumberExclusive === d.modified.startLineNumber || l.original.endLineNumberExclusive === d.original.startLineNumber) && (d = new qe(
        l.original.join(d.original),
        l.modified.join(d.modified),
        l.innerChanges && d.innerChanges ? l.innerChanges.concat(d.innerChanges) : void 0
      ), s.pop()), s.push(d), l = d;
    }
    return qt(() => kn(s, (o, c) => c.original.startLineNumber - o.original.endLineNumberExclusive === c.modified.startLineNumber - o.modified.endLineNumberExclusive && o.original.endLineNumberExclusive < c.original.startLineNumber && o.modified.endLineNumberExclusive < c.modified.startLineNumber)), new en(s, [], a.quitEarly);
  }
}
function Io(e, t, n, i) {
  return new Ge(e, t, n).ComputeDiff(i);
}
let Ta = class {
  constructor(e) {
    const t = [], n = [];
    for (let i = 0, r = e.length; i < r; i++)
      t[i] = ri(e[i], 1), n[i] = ai(e[i], 1);
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
    const i = [], r = [], a = [];
    let s = 0;
    for (let l = t; l <= n; l++) {
      const o = this.lines[l], c = e ? this._startColumns[l] : 1, h = e ? this._endColumns[l] : o.length + 1;
      for (let d = c; d < h; d++)
        i[s] = o.charCodeAt(d - 1), r[s] = l + 1, a[s] = d, s++;
      !e && l < n && (i[s] = 10, r[s] = l + 1, a[s] = o.length + 1, s++);
    }
    return new yh(i, r, a);
  }
};
class yh {
  constructor(t, n, i) {
    this._charCodes = t, this._lineNumbers = n, this._columns = i;
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
class bt {
  constructor(t, n, i, r, a, s, l, o) {
    this.originalStartLineNumber = t, this.originalStartColumn = n, this.originalEndLineNumber = i, this.originalEndColumn = r, this.modifiedStartLineNumber = a, this.modifiedStartColumn = s, this.modifiedEndLineNumber = l, this.modifiedEndColumn = o;
  }
  static createFromDiffChange(t, n, i) {
    const r = n.getStartLineNumber(t.originalStart), a = n.getStartColumn(t.originalStart), s = n.getEndLineNumber(t.originalStart + t.originalLength - 1), l = n.getEndColumn(t.originalStart + t.originalLength - 1), o = i.getStartLineNumber(t.modifiedStart), c = i.getStartColumn(t.modifiedStart), h = i.getEndLineNumber(t.modifiedStart + t.modifiedLength - 1), d = i.getEndColumn(t.modifiedStart + t.modifiedLength - 1);
    return new bt(
      r,
      a,
      s,
      l,
      o,
      c,
      h,
      d
    );
  }
}
function Th(e) {
  if (e.length <= 1)
    return e;
  const t = [e[0]];
  let n = t[0];
  for (let i = 1, r = e.length; i < r; i++) {
    const a = e[i], s = a.originalStart - (n.originalStart + n.originalLength), l = a.modifiedStart - (n.modifiedStart + n.modifiedLength);
    Math.min(s, l) < wh ? (n.originalLength = a.originalStart + a.originalLength - n.originalStart, n.modifiedLength = a.modifiedStart + a.modifiedLength - n.modifiedStart) : (t.push(a), n = a);
  }
  return t;
}
class Pt {
  constructor(t, n, i, r, a) {
    this.originalStartLineNumber = t, this.originalEndLineNumber = n, this.modifiedStartLineNumber = i, this.modifiedEndLineNumber = r, this.charChanges = a;
  }
  static createFromDiffResult(t, n, i, r, a, s, l) {
    let o, c, h, d, m;
    if (n.originalLength === 0 ? (o = i.getStartLineNumber(n.originalStart) - 1, c = 0) : (o = i.getStartLineNumber(n.originalStart), c = i.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (h = r.getStartLineNumber(n.modifiedStart) - 1, d = 0) : (h = r.getStartLineNumber(n.modifiedStart), d = r.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), s && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && a()) {
      const p = i.createCharSequence(t, n.originalStart, n.originalStart + n.originalLength - 1), _ = r.createCharSequence(t, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
      if (p.getElements().length > 0 && _.getElements().length > 0) {
        let b = Io(p, _, a, !0).changes;
        l && (b = Th(b)), m = [];
        for (let S = 0, y = b.length; S < y; S++)
          m.push(bt.createFromDiffChange(b[S], p, _));
      }
    }
    return new Pt(
      o,
      c,
      h,
      d,
      m
    );
  }
}
class Oo {
  constructor(t, n, i) {
    this.shouldComputeCharChanges = i.shouldComputeCharChanges, this.shouldPostProcessCharChanges = i.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = i.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = i.shouldMakePrettyDiff, this.originalLines = t, this.modifiedLines = n, this.original = new Ta(t), this.modified = new Ta(n), this.continueLineDiff = ka(i.maxComputationTime), this.continueCharDiff = ka(i.maxComputationTime === 0 ? 0 : Math.min(i.maxComputationTime, 5e3));
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
    const t = Io(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), n = t.changes, i = t.quitEarly;
    if (this.shouldIgnoreTrimWhitespace) {
      const l = [];
      for (let o = 0, c = n.length; o < c; o++)
        l.push(Pt.createFromDiffResult(this.shouldIgnoreTrimWhitespace, n[o], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
      return {
        quitEarly: i,
        changes: l
      };
    }
    const r = [];
    let a = 0, s = 0;
    for (let l = -1, o = n.length; l < o; l++) {
      const c = l + 1 < o ? n[l + 1] : null, h = c ? c.originalStart : this.originalLines.length, d = c ? c.modifiedStart : this.modifiedLines.length;
      for (; a < h && s < d; ) {
        const m = this.originalLines[a], p = this.modifiedLines[s];
        if (m !== p) {
          {
            let _ = ri(m, 1), b = ri(p, 1);
            for (; _ > 1 && b > 1; ) {
              const S = m.charCodeAt(_ - 2), y = p.charCodeAt(b - 2);
              if (S !== y)
                break;
              _--, b--;
            }
            (_ > 1 || b > 1) && this._pushTrimWhitespaceCharChange(r, a + 1, 1, _, s + 1, 1, b);
          }
          {
            let _ = ai(m, 1), b = ai(p, 1);
            const S = m.length + 1, y = p.length + 1;
            for (; _ < S && b < y; ) {
              const w = m.charCodeAt(_ - 1), x = m.charCodeAt(b - 1);
              if (w !== x)
                break;
              _++, b++;
            }
            (_ < S || b < y) && this._pushTrimWhitespaceCharChange(r, a + 1, _, S, s + 1, b, y);
          }
        }
        a++, s++;
      }
      c && (r.push(Pt.createFromDiffResult(this.shouldIgnoreTrimWhitespace, c, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), a += c.originalLength, s += c.modifiedLength);
    }
    return {
      quitEarly: i,
      changes: r
    };
  }
  _pushTrimWhitespaceCharChange(t, n, i, r, a, s, l) {
    if (this._mergeTrimWhitespaceCharChange(t, n, i, r, a, s, l))
      return;
    let o;
    this.shouldComputeCharChanges && (o = [new bt(
      n,
      i,
      n,
      r,
      a,
      s,
      a,
      l
    )]), t.push(new Pt(
      n,
      n,
      a,
      a,
      o
    ));
  }
  _mergeTrimWhitespaceCharChange(t, n, i, r, a, s, l) {
    const o = t.length;
    if (o === 0)
      return !1;
    const c = t[o - 1];
    return c.originalEndLineNumber === 0 || c.modifiedEndLineNumber === 0 ? !1 : c.originalEndLineNumber === n && c.modifiedEndLineNumber === a ? (this.shouldComputeCharChanges && c.charChanges && c.charChanges.push(new bt(
      n,
      i,
      n,
      r,
      a,
      s,
      a,
      l
    )), !0) : c.originalEndLineNumber + 1 === n && c.modifiedEndLineNumber + 1 === a ? (c.originalEndLineNumber = n, c.modifiedEndLineNumber = a, this.shouldComputeCharChanges && c.charChanges && c.charChanges.push(new bt(
      n,
      i,
      n,
      r,
      a,
      s,
      a,
      l
    )), !0) : !1;
  }
}
function ri(e, t) {
  const n = $l(e);
  return n === -1 ? t : n + 1;
}
function ai(e, t) {
  const n = Gl(e);
  return n === -1 ? t : n + 2;
}
function ka(e) {
  if (e === 0)
    return () => !0;
  const t = Date.now();
  return () => Date.now() - t < e;
}
class Fe {
  static trivial(t, n) {
    return new Fe([new ie(V.ofLength(t.length), V.ofLength(n.length))], !1);
  }
  static trivialTimedOut(t, n) {
    return new Fe([new ie(V.ofLength(t.length), V.ofLength(n.length))], !0);
  }
  constructor(t, n) {
    this.diffs = t, this.hitTimeout = n;
  }
}
class ie {
  static invert(t, n) {
    const i = [];
    return ol(t, (r, a) => {
      i.push(ie.fromOffsetPairs(r ? r.getEndExclusives() : nt.zero, a ? a.getStarts() : new nt(
        n,
        (r ? r.seq2Range.endExclusive - r.seq1Range.endExclusive : 0) + n
      )));
    }), i;
  }
  static fromOffsetPairs(t, n) {
    return new ie(new V(t.offset1, n.offset1), new V(t.offset2, n.offset2));
  }
  static assertSorted(t) {
    let n;
    for (const i of t) {
      if (n && !(n.seq1Range.endExclusive <= i.seq1Range.start && n.seq2Range.endExclusive <= i.seq2Range.start))
        throw new se("Sequence diffs must be sorted");
      n = i;
    }
  }
  constructor(t, n) {
    this.seq1Range = t, this.seq2Range = n;
  }
  swap() {
    return new ie(this.seq2Range, this.seq1Range);
  }
  toString() {
    return `${this.seq1Range} <-> ${this.seq2Range}`;
  }
  join(t) {
    return new ie(this.seq1Range.join(t.seq1Range), this.seq2Range.join(t.seq2Range));
  }
  delta(t) {
    return t === 0 ? this : new ie(this.seq1Range.delta(t), this.seq2Range.delta(t));
  }
  deltaStart(t) {
    return t === 0 ? this : new ie(this.seq1Range.deltaStart(t), this.seq2Range.deltaStart(t));
  }
  deltaEnd(t) {
    return t === 0 ? this : new ie(this.seq1Range.deltaEnd(t), this.seq2Range.deltaEnd(t));
  }
  intersectsOrTouches(t) {
    return this.seq1Range.intersectsOrTouches(t.seq1Range) || this.seq2Range.intersectsOrTouches(t.seq2Range);
  }
  intersect(t) {
    const n = this.seq1Range.intersect(t.seq1Range), i = this.seq2Range.intersect(t.seq2Range);
    if (!(!n || !i))
      return new ie(n, i);
  }
  getStarts() {
    return new nt(this.seq1Range.start, this.seq2Range.start);
  }
  getEndExclusives() {
    return new nt(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
  }
}
const Nt = class zo {
  constructor(t, n) {
    this.offset1 = t, this.offset2 = n;
  }
  toString() {
    return `${this.offset1} <-> ${this.offset2}`;
  }
  delta(t) {
    return t === 0 ? this : new zo(this.offset1 + t, this.offset2 + t);
  }
  equals(t) {
    return this.offset1 === t.offset1 && this.offset2 === t.offset2;
  }
};
Nt.zero = new Nt(0, 0), Nt.max = new Nt(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
let nt = Nt;
const si = class {
  isValid() {
    return !0;
  }
};
si.instance = new si();
let Di = si;
class kh {
  constructor(t) {
    if (this.timeout = t, this.startTime = Date.now(), this.valid = !0, t <= 0)
      throw new se("timeout must be positive");
  }
  isValid() {
    return !(Date.now() - this.startTime < this.timeout) && this.valid && (this.valid = !1), this.valid;
  }
  disable() {
    this.timeout = Number.MAX_SAFE_INTEGER, this.isValid = () => !0, this.valid = !0;
  }
}
class Nn {
  constructor(t, n) {
    this.width = t, this.height = n, this.array = [], this.array = new Array(t * n);
  }
  get(t, n) {
    return this.array[t + n * this.width];
  }
  set(t, n, i) {
    this.array[t + n * this.width] = i;
  }
}
function oi(e) {
  return e === 32 || e === 9;
}
const Uo = class li {
  static getKey(t) {
    let n = this.chrKeys.get(t);
    return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(t, n)), n;
  }
  constructor(t, n, i) {
    this.range = t, this.lines = n, this.source = i, this.histogram = [];
    let r = 0;
    for (let a = t.startLineNumber - 1; a < t.endLineNumberExclusive - 1; a++) {
      const s = n[a];
      for (let o = 0; o < s.length; o++) {
        r++;
        const c = s[o], h = li.getKey(c);
        this.histogram[h] = (this.histogram[h] || 0) + 1;
      }
      r++;
      const l = li.getKey(`
`);
      this.histogram[l] = (this.histogram[l] || 0) + 1;
    }
    this.totalCount = r;
  }
  computeSimilarity(t) {
    let n = 0;
    const i = Math.max(this.histogram.length, t.histogram.length);
    for (let r = 0; r < i; r++)
      n += Math.abs((this.histogram[r] ?? 0) - (t.histogram[r] ?? 0));
    return 1 - n / (this.totalCount + t.totalCount);
  }
};
Uo.chrKeys = /* @__PURE__ */ new Map();
let Sa = Uo;
class Sh {
  compute(t, n, i = Di.instance, r) {
    if (t.length === 0 || n.length === 0)
      return Fe.trivial(t, n);
    const a = new Nn(t.length, n.length), s = new Nn(t.length, n.length), l = new Nn(t.length, n.length);
    for (let _ = 0; _ < t.length; _++)
      for (let b = 0; b < n.length; b++) {
        if (!i.isValid())
          return Fe.trivialTimedOut(t, n);
        const S = _ === 0 ? 0 : a.get(_ - 1, b), y = b === 0 ? 0 : a.get(_, b - 1);
        let w;
        t.getElement(_) === n.getElement(b) ? (_ === 0 || b === 0 ? w = 0 : w = a.get(_ - 1, b - 1), _ > 0 && b > 0 && s.get(_ - 1, b - 1) === 3 && (w += l.get(_ - 1, b - 1)), w += r ? r(_, b) : 1) : w = -1;
        const x = Math.max(S, y, w);
        if (x === w) {
          const C = _ > 0 && b > 0 ? l.get(_ - 1, b - 1) : 0;
          l.set(_, b, C + 1), s.set(_, b, 3);
        } else x === S ? (l.set(_, b, 0), s.set(_, b, 1)) : x === y && (l.set(_, b, 0), s.set(_, b, 2));
        a.set(_, b, x);
      }
    const o = [];
    let c = t.length, h = n.length;
    function d(_, b) {
      (_ + 1 !== c || b + 1 !== h) && o.push(new ie(new V(_ + 1, c), new V(b + 1, h))), c = _, h = b;
    }
    let m = t.length - 1, p = n.length - 1;
    for (; m >= 0 && p >= 0; )
      s.get(m, p) === 3 ? (d(m, p), m--, p--) : s.get(m, p) === 1 ? m-- : p--;
    return d(-1, -1), o.reverse(), new Fe(o, !1);
  }
}
class Po {
  compute(t, n, i = Di.instance) {
    if (t.length === 0 || n.length === 0)
      return Fe.trivial(t, n);
    const r = t, a = n;
    function s(b, S) {
      for (; b < r.length && S < a.length && r.getElement(b) === a.getElement(S); )
        b++, S++;
      return b;
    }
    let l = 0;
    const o = new Lh();
    o.set(0, s(0, 0));
    const c = new xh();
    c.set(0, o.get(0) === 0 ? null : new La(null, 0, 0, o.get(0)));
    let h = 0;
    e: for (; ; ) {
      if (l++, !i.isValid())
        return Fe.trivialTimedOut(r, a);
      const b = -Math.min(l, a.length + l % 2), S = Math.min(l, r.length + l % 2);
      for (h = b; h <= S; h += 2) {
        const y = h === S ? -1 : o.get(h + 1), w = h === b ? -1 : o.get(h - 1) + 1, x = Math.min(Math.max(y, w), r.length), C = x - h;
        if (x > r.length || C > a.length)
          continue;
        const I = s(x, C);
        o.set(h, I);
        const N = x === y ? c.get(h + 1) : c.get(h - 1);
        if (c.set(h, I !== x ? new La(N, x, C, I - x) : N), o.get(h) === r.length && o.get(h) - h === a.length)
          break e;
      }
    }
    let d = c.get(h);
    const m = [];
    let p = r.length, _ = a.length;
    for (; ; ) {
      const b = d ? d.x + d.length : 0, S = d ? d.y + d.length : 0;
      if ((b !== p || S !== _) && m.push(new ie(new V(b, p), new V(S, _))), !d)
        break;
      p = d.x, _ = d.y, d = d.prev;
    }
    return m.reverse(), new Fe(m, !1);
  }
}
class La {
  constructor(t, n, i, r) {
    this.prev = t, this.x = n, this.y = i, this.length = r;
  }
}
class Lh {
  constructor() {
    this.positiveArr = new Int32Array(10), this.negativeArr = new Int32Array(10);
  }
  get(t) {
    return t < 0 ? (t = -t - 1, this.negativeArr[t]) : this.positiveArr[t];
  }
  set(t, n) {
    if (t < 0) {
      if (t = -t - 1, t >= this.negativeArr.length) {
        const i = this.negativeArr;
        this.negativeArr = new Int32Array(i.length * 2), this.negativeArr.set(i);
      }
      this.negativeArr[t] = n;
    } else {
      if (t >= this.positiveArr.length) {
        const i = this.positiveArr;
        this.positiveArr = new Int32Array(i.length * 2), this.positiveArr.set(i);
      }
      this.positiveArr[t] = n;
    }
  }
}
class xh {
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
class un {
  constructor(t, n, i) {
    this.lines = t, this.range = n, this.considerWhitespaceChanges = i, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
    for (let r = this.range.startLineNumber; r <= this.range.endLineNumber; r++) {
      let a = t[r - 1], s = 0;
      r === this.range.startLineNumber && this.range.startColumn > 1 && (s = this.range.startColumn - 1, a = a.substring(s)), this.lineStartOffsets.push(s);
      let l = 0;
      if (!i) {
        const c = a.trimStart();
        l = a.length - c.length, a = c.trimEnd();
      }
      this.trimmedWsLengthsByLineIdx.push(l);
      const o = r === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - s - l, a.length) : a.length;
      for (let c = 0; c < o; c++)
        this.elements.push(a.charCodeAt(c));
      r < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
    }
  }
  toString() {
    return `Slice: "${this.text}"`;
  }
  get text() {
    return this.getText(new V(0, this.length));
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
    const n = Ea(t > 0 ? this.elements[t - 1] : -1), i = Ea(t < this.elements.length ? this.elements[t] : -1);
    if (n === 7 && i === 8)
      return 0;
    if (n === 8)
      return 150;
    let r = 0;
    return n !== i && (r += 10, n === 0 && i === 1 && (r += 1)), r += xa(n), r += xa(i), r;
  }
  translateOffset(t, n = "right") {
    const i = vt(this.firstElementOffsetByLineIdx, (a) => a <= t), r = t - this.firstElementOffsetByLineIdx[i];
    return new G(
      this.range.startLineNumber + i,
      1 + this.lineStartOffsets[i] + r + (r === 0 && n === "left" ? 0 : this.trimmedWsLengthsByLineIdx[i])
    );
  }
  translateRange(t) {
    const n = this.translateOffset(t.start, "right"), i = this.translateOffset(t.endExclusive, "left");
    return i.isBefore(n) ? W.fromPositions(i, i) : W.fromPositions(n, i);
  }
  findWordContaining(t) {
    if (t < 0 || t >= this.elements.length || !Mn(this.elements[t]))
      return;
    let n = t;
    for (; n > 0 && Mn(this.elements[n - 1]); )
      n--;
    let i = t;
    for (; i < this.elements.length && Mn(this.elements[i]); )
      i++;
    return new V(n, i);
  }
  countLinesIn(t) {
    return this.translateOffset(t.endExclusive).lineNumber - this.translateOffset(t.start).lineNumber;
  }
  isStronglyEqual(t, n) {
    return this.elements[t] === this.elements[n];
  }
  extendToFullLines(t) {
    const n = wt(this.firstElementOffsetByLineIdx, (r) => r <= t.start) ?? 0, i = al(this.firstElementOffsetByLineIdx, (r) => t.endExclusive <= r) ?? this.elements.length;
    return new V(n, i);
  }
}
function Mn(e) {
  return e >= 97 && e <= 122 || e >= 65 && e <= 90 || e >= 48 && e <= 57;
}
const Eh = {
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
function xa(e) {
  return Eh[e];
}
function Ea(e) {
  return e === 10 ? 8 : e === 13 ? 7 : oi(e) ? 6 : e >= 97 && e <= 122 ? 0 : e >= 65 && e <= 90 ? 1 : e >= 48 && e <= 57 ? 2 : e === -1 ? 3 : e === 44 || e === 59 ? 5 : 4;
}
function Ch(e, t, n, i, r, a) {
  let { moves: s, excludedChanges: l } = Ah(e, t, n, a);
  if (!a.isValid())
    return [];
  const o = e.filter((h) => !l.has(h)), c = Nh(o, i, r, t, n, a);
  return cl(s, c), s = Mh(s), s = s.filter((h) => {
    const d = h.original.toOffsetRange().slice(t).map((m) => m.trim());
    return d.join(`
`).length >= 15 && Rh(d, (m) => m.length >= 2) >= 2;
  }), s = Ih(e, s), s;
}
function Rh(e, t) {
  let n = 0;
  for (const i of e)
    t(i) && n++;
  return n;
}
function Ah(e, t, n, i) {
  const r = [], a = e.filter((o) => o.modified.isEmpty && o.original.length >= 3).map((o) => new Sa(o.original, t, o)), s = new Set(e.filter((o) => o.original.isEmpty && o.modified.length >= 3).map((o) => new Sa(o.modified, n, o))), l = /* @__PURE__ */ new Set();
  for (const o of a) {
    let c = -1, h;
    for (const d of s) {
      const m = o.computeSimilarity(d);
      m > c && (c = m, h = d);
    }
    if (c > 0.9 && h && (s.delete(h), r.push(new Ce(o.range, h.range)), l.add(o.source), l.add(h.source)), !i.isValid())
      return { moves: r, excludedChanges: l };
  }
  return { moves: r, excludedChanges: l };
}
function Nh(e, t, n, i, r, a) {
  const s = [], l = new bl();
  for (const m of e)
    for (let p = m.original.startLineNumber; p < m.original.endLineNumberExclusive - 2; p++) {
      const _ = `${t[p - 1]}:${t[p + 1 - 1]}:${t[p + 2 - 1]}`;
      l.add(_, { range: new F(p, p + 3) });
    }
  const o = [];
  e.sort(zt((m) => m.modified.startLineNumber, Ut));
  for (const m of e) {
    let p = [];
    for (let _ = m.modified.startLineNumber; _ < m.modified.endLineNumberExclusive - 2; _++) {
      const b = `${n[_ - 1]}:${n[_ + 1 - 1]}:${n[_ + 2 - 1]}`, S = new F(_, _ + 3), y = [];
      l.forEach(b, ({ range: w }) => {
        for (const C of p)
          if (C.originalLineRange.endLineNumberExclusive + 1 === w.endLineNumberExclusive && C.modifiedLineRange.endLineNumberExclusive + 1 === S.endLineNumberExclusive) {
            C.originalLineRange = new F(
              C.originalLineRange.startLineNumber,
              w.endLineNumberExclusive
            ), C.modifiedLineRange = new F(
              C.modifiedLineRange.startLineNumber,
              S.endLineNumberExclusive
            ), y.push(C);
            return;
          }
        const x = {
          modifiedLineRange: S,
          originalLineRange: w
        };
        o.push(x), y.push(x);
      }), p = y;
    }
    if (!a.isValid())
      return [];
  }
  o.sort(hl(zt((m) => m.modifiedLineRange.length, Ut)));
  const c = new Ue(), h = new Ue();
  for (const m of o) {
    const p = m.modifiedLineRange.startLineNumber - m.originalLineRange.startLineNumber, _ = c.subtractFrom(m.modifiedLineRange), b = h.subtractFrom(m.originalLineRange).getWithDelta(p), S = _.getIntersection(b);
    for (const y of S.ranges) {
      if (y.length < 3)
        continue;
      const w = y, x = y.delta(-p);
      s.push(new Ce(x, w)), c.addRange(w), h.addRange(x);
    }
  }
  s.sort(zt((m) => m.original.startLineNumber, Ut));
  const d = new eo(e);
  for (let m = 0; m < s.length; m++) {
    const p = s[m], _ = d.findLastMonotonous((N) => N.original.startLineNumber <= p.original.startLineNumber), b = wt(e, (N) => N.modified.startLineNumber <= p.modified.startLineNumber), S = Math.max(p.original.startLineNumber - _.original.startLineNumber, p.modified.startLineNumber - b.modified.startLineNumber), y = d.findLastMonotonous((N) => N.original.startLineNumber < p.original.endLineNumberExclusive), w = wt(e, (N) => N.modified.startLineNumber < p.modified.endLineNumberExclusive), x = Math.max(y.original.endLineNumberExclusive - p.original.endLineNumberExclusive, w.modified.endLineNumberExclusive - p.modified.endLineNumberExclusive);
    let C;
    for (C = 0; C < S; C++) {
      const N = p.original.startLineNumber - C - 1, g = p.modified.startLineNumber - C - 1;
      if (N > i.length || g > r.length || c.contains(g) || h.contains(N) || !Ca(i[N - 1], r[g - 1], a))
        break;
    }
    C > 0 && (h.addRange(new F(p.original.startLineNumber - C, p.original.startLineNumber)), c.addRange(new F(p.modified.startLineNumber - C, p.modified.startLineNumber)));
    let I;
    for (I = 0; I < x; I++) {
      const N = p.original.endLineNumberExclusive + I, g = p.modified.endLineNumberExclusive + I;
      if (N > i.length || g > r.length || c.contains(g) || h.contains(N) || !Ca(i[N - 1], r[g - 1], a))
        break;
    }
    I > 0 && (h.addRange(new F(
      p.original.endLineNumberExclusive,
      p.original.endLineNumberExclusive + I
    )), c.addRange(new F(
      p.modified.endLineNumberExclusive,
      p.modified.endLineNumberExclusive + I
    ))), (C > 0 || I > 0) && (s[m] = new Ce(new F(
      p.original.startLineNumber - C,
      p.original.endLineNumberExclusive + I
    ), new F(
      p.modified.startLineNumber - C,
      p.modified.endLineNumberExclusive + I
    )));
  }
  return s;
}
function Ca(e, t, n) {
  if (e.trim() === t.trim())
    return !0;
  if (e.length > 300 && t.length > 300)
    return !1;
  const i = new Po().compute(new un([e], new W(1, 1, 1, e.length), !1), new un([t], new W(1, 1, 1, t.length), !1), n);
  let r = 0;
  const a = ie.invert(i.diffs, e.length);
  for (const o of a)
    o.seq1Range.forEach((c) => {
      oi(e.charCodeAt(c)) || r++;
    });
  function s(o) {
    let c = 0;
    for (let h = 0; h < e.length; h++)
      oi(o.charCodeAt(h)) || c++;
    return c;
  }
  const l = s(e.length > t.length ? e : t);
  return r / l > 0.6 && l > 10;
}
function Mh(e) {
  if (e.length === 0)
    return e;
  e.sort(zt((n) => n.original.startLineNumber, Ut));
  const t = [e[0]];
  for (let n = 1; n < e.length; n++) {
    const i = t[t.length - 1], r = e[n], a = r.original.startLineNumber - i.original.endLineNumberExclusive, s = r.modified.startLineNumber - i.modified.endLineNumberExclusive;
    if (a >= 0 && s >= 0 && a + s <= 2) {
      t[t.length - 1] = i.join(r);
      continue;
    }
    t.push(r);
  }
  return t;
}
function Ih(e, t) {
  const n = new eo(e);
  return t = t.filter((i) => {
    const r = n.findLastMonotonous((s) => s.original.startLineNumber < i.original.endLineNumberExclusive) || new Ce(new F(1, 1), new F(1, 1)), a = wt(e, (s) => s.modified.startLineNumber < i.modified.endLineNumberExclusive);
    return r !== a;
  }), t;
}
function Ra(e, t, n) {
  let i = n;
  return i = Aa(e, t, i), i = Aa(e, t, i), i = Oh(e, t, i), i;
}
function Aa(e, t, n) {
  if (n.length === 0)
    return n;
  const i = [];
  i.push(n[0]);
  for (let a = 1; a < n.length; a++) {
    const s = i[i.length - 1];
    let l = n[a];
    if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
      const o = l.seq1Range.start - s.seq1Range.endExclusive;
      let c;
      for (c = 1; c <= o && !(e.getElement(l.seq1Range.start - c) !== e.getElement(l.seq1Range.endExclusive - c) || t.getElement(l.seq2Range.start - c) !== t.getElement(l.seq2Range.endExclusive - c)); c++)
        ;
      if (c--, c === o) {
        i[i.length - 1] = new ie(new V(s.seq1Range.start, l.seq1Range.endExclusive - o), new V(s.seq2Range.start, l.seq2Range.endExclusive - o));
        continue;
      }
      l = l.delta(-c);
    }
    i.push(l);
  }
  const r = [];
  for (let a = 0; a < i.length - 1; a++) {
    const s = i[a + 1];
    let l = i[a];
    if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
      const o = s.seq1Range.start - l.seq1Range.endExclusive;
      let c;
      for (c = 0; c < o && !(!e.isStronglyEqual(l.seq1Range.start + c, l.seq1Range.endExclusive + c) || !t.isStronglyEqual(l.seq2Range.start + c, l.seq2Range.endExclusive + c)); c++)
        ;
      if (c === o) {
        i[a + 1] = new ie(new V(l.seq1Range.start + o, s.seq1Range.endExclusive), new V(l.seq2Range.start + o, s.seq2Range.endExclusive));
        continue;
      }
      c > 0 && (l = l.delta(c));
    }
    r.push(l);
  }
  return i.length > 0 && r.push(i[i.length - 1]), r;
}
function Oh(e, t, n) {
  if (!e.getBoundaryScore || !t.getBoundaryScore)
    return n;
  for (let i = 0; i < n.length; i++) {
    const r = i > 0 ? n[i - 1] : void 0, a = n[i], s = i + 1 < n.length ? n[i + 1] : void 0, l = new V(
      r ? r.seq1Range.endExclusive + 1 : 0,
      s ? s.seq1Range.start - 1 : e.length
    ), o = new V(
      r ? r.seq2Range.endExclusive + 1 : 0,
      s ? s.seq2Range.start - 1 : t.length
    );
    a.seq1Range.isEmpty ? n[i] = Na(a, e, t, l, o) : a.seq2Range.isEmpty && (n[i] = Na(a.swap(), t, e, o, l).swap());
  }
  return n;
}
function Na(e, t, n, i, r) {
  let a = 1;
  for (; e.seq1Range.start - a >= i.start && e.seq2Range.start - a >= r.start && n.isStronglyEqual(e.seq2Range.start - a, e.seq2Range.endExclusive - a) && a < 100; )
    a++;
  a--;
  let s = 0;
  for (; e.seq1Range.start + s < i.endExclusive && e.seq2Range.endExclusive + s < r.endExclusive && n.isStronglyEqual(e.seq2Range.start + s, e.seq2Range.endExclusive + s) && s < 100; )
    s++;
  if (a === 0 && s === 0)
    return e;
  let l = 0, o = -1;
  for (let c = -a; c <= s; c++) {
    const h = e.seq2Range.start + c, d = e.seq2Range.endExclusive + c, m = e.seq1Range.start + c, p = t.getBoundaryScore(m) + n.getBoundaryScore(h) + n.getBoundaryScore(d);
    p > o && (o = p, l = c);
  }
  return e.delta(l);
}
function zh(e, t, n) {
  const i = [];
  for (const r of n) {
    const a = i[i.length - 1];
    if (!a) {
      i.push(r);
      continue;
    }
    r.seq1Range.start - a.seq1Range.endExclusive <= 2 || r.seq2Range.start - a.seq2Range.endExclusive <= 2 ? i[i.length - 1] = new ie(a.seq1Range.join(r.seq1Range), a.seq2Range.join(r.seq2Range)) : i.push(r);
  }
  return i;
}
function Uh(e, t, n) {
  const i = ie.invert(n, e.length), r = [];
  let a = new nt(0, 0);
  function s(l, o) {
    if (l.offset1 < a.offset1 || l.offset2 < a.offset2)
      return;
    const c = e.findWordContaining(l.offset1), h = t.findWordContaining(l.offset2);
    if (!c || !h)
      return;
    let d = new ie(c, h);
    const m = d.intersect(o);
    let p = m.seq1Range.length, _ = m.seq2Range.length;
    for (; i.length > 0; ) {
      const b = i[0];
      if (!(b.seq1Range.intersects(d.seq1Range) || b.seq2Range.intersects(d.seq2Range)))
        break;
      const S = e.findWordContaining(b.seq1Range.start), y = t.findWordContaining(b.seq2Range.start), w = new ie(S, y), x = w.intersect(b);
      if (p += x.seq1Range.length, _ += x.seq2Range.length, d = d.join(w), d.seq1Range.endExclusive >= b.seq1Range.endExclusive)
        i.shift();
      else
        break;
    }
    p + _ < (d.seq1Range.length + d.seq2Range.length) * 2 / 3 && r.push(d), a = d.getEndExclusives();
  }
  for (; i.length > 0; ) {
    const l = i.shift();
    l.seq1Range.isEmpty || (s(l.getStarts(), l), s(l.getEndExclusives().delta(-1), l));
  }
  return Ph(n, r);
}
function Ph(e, t) {
  const n = [];
  for (; e.length > 0 || t.length > 0; ) {
    const i = e[0], r = t[0];
    let a;
    i && (!r || i.seq1Range.start < r.seq1Range.start) ? a = e.shift() : a = t.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= a.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(a) : n.push(a);
  }
  return n;
}
function Hh(e, t, n) {
  let i = n;
  if (i.length === 0)
    return i;
  let r = 0, a;
  do {
    a = !1;
    const s = [
      i[0]
    ];
    for (let l = 1; l < i.length; l++) {
      let o = function(d, m) {
        const p = new V(h.seq1Range.endExclusive, c.seq1Range.start);
        return e.getText(p).replace(/\s/g, "").length <= 4 && (d.seq1Range.length + d.seq2Range.length > 5 || m.seq1Range.length + m.seq2Range.length > 5);
      };
      const c = i[l], h = s[s.length - 1];
      o(h, c) ? (a = !0, s[s.length - 1] = s[s.length - 1].join(c)) : s.push(c);
    }
    i = s;
  } while (r++ < 10 && a);
  return i;
}
function Dh(e, t, n) {
  let i = n;
  if (i.length === 0)
    return i;
  let r = 0, a;
  do {
    a = !1;
    const l = [
      i[0]
    ];
    for (let o = 1; o < i.length; o++) {
      let c = function(m, p) {
        const _ = new V(d.seq1Range.endExclusive, h.seq1Range.start);
        if (e.countLinesIn(_) > 5 || _.length > 500)
          return !1;
        const b = e.getText(_).trim();
        if (b.length > 20 || b.split(/\r\n|\r|\n/).length > 1)
          return !1;
        const S = e.countLinesIn(m.seq1Range), y = m.seq1Range.length, w = t.countLinesIn(m.seq2Range), x = m.seq2Range.length, C = e.countLinesIn(p.seq1Range), I = p.seq1Range.length, N = t.countLinesIn(p.seq2Range), g = p.seq2Range.length, f = 2 * 40 + 50;
        function T(U) {
          return Math.min(U, f);
        }
        return Math.pow(Math.pow(T(S * 40 + y), 1.5) + Math.pow(T(w * 40 + x), 1.5), 1.5) + Math.pow(Math.pow(T(C * 40 + I), 1.5) + Math.pow(T(N * 40 + g), 1.5), 1.5) > (f ** 1.5) ** 1.5 * 1.3;
      };
      const h = i[o], d = l[l.length - 1];
      c(d, h) ? (a = !0, l[l.length - 1] = l[l.length - 1].join(h)) : l.push(h);
    }
    i = l;
  } while (r++ < 10 && a);
  const s = [];
  return ll(i, (l, o, c) => {
    let h = o;
    function d(y) {
      return y.length > 0 && y.trim().length <= 3 && o.seq1Range.length + o.seq2Range.length > 100;
    }
    const m = e.extendToFullLines(o.seq1Range), p = e.getText(new V(m.start, o.seq1Range.start));
    d(p) && (h = h.deltaStart(-p.length));
    const _ = e.getText(new V(o.seq1Range.endExclusive, m.endExclusive));
    d(_) && (h = h.deltaEnd(_.length));
    const b = ie.fromOffsetPairs(l ? l.getEndExclusives() : nt.zero, c ? c.getStarts() : nt.max), S = h.intersect(b);
    s.length > 0 && S.getStarts().equals(s[s.length - 1].getEndExclusives()) ? s[s.length - 1] = s[s.length - 1].join(S) : s.push(S);
  }), s;
}
class Ma {
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
    const n = t === 0 ? 0 : Ia(this.lines[t - 1]), i = t === this.lines.length ? 0 : Ia(this.lines[t]);
    return 1e3 - (n + i);
  }
  getText(t) {
    return this.lines.slice(t.start, t.endExclusive).join(`
`);
  }
  isStronglyEqual(t, n) {
    return this.lines[t] === this.lines[n];
  }
}
function Ia(e) {
  let t = 0;
  for (; t < e.length && (e.charCodeAt(t) === 32 || e.charCodeAt(t) === 9); )
    t++;
  return t;
}
class Wh {
  constructor() {
    this.dynamicProgrammingDiffing = new Sh(), this.myersDiffingAlgorithm = new Po();
  }
  computeDiff(t, n, i) {
    if (t.length <= 1 && sl(t, n, (I, N) => I === N))
      return new en([], [], !1);
    if (t.length === 1 && t[0].length === 0 || n.length === 1 && n[0].length === 0)
      return new en([
        new qe(new F(1, t.length + 1), new F(1, n.length + 1), [
          new fe(new W(
            1,
            1,
            t.length,
            t[t.length - 1].length + 1
          ), new W(
            1,
            1,
            n.length,
            n[n.length - 1].length + 1
          ))
        ])
      ], [], !1);
    const r = i.maxComputationTimeMs === 0 ? Di.instance : new kh(i.maxComputationTimeMs), a = !i.ignoreTrimWhitespace, s = /* @__PURE__ */ new Map();
    function l(I) {
      let N = s.get(I);
      return N === void 0 && (N = s.size, s.set(I, N)), N;
    }
    const o = t.map((I) => l(I.trim())), c = n.map((I) => l(I.trim())), h = new Ma(o, t), d = new Ma(c, n), m = h.length + d.length < 1700 ? this.dynamicProgrammingDiffing.compute(h, d, r, (I, N) => t[I] === n[N] ? n[N].length === 0 ? 0.1 : 1 + Math.log(1 + n[N].length) : 0.99) : this.myersDiffingAlgorithm.compute(h, d, r);
    let p = m.diffs, _ = m.hitTimeout;
    p = Ra(h, d, p), p = Hh(h, d, p);
    const b = [], S = (I) => {
      if (a)
        for (let N = 0; N < I; N++) {
          const g = y + N, f = w + N;
          if (t[g] !== n[f]) {
            const T = this.refineDiff(t, n, new ie(new V(g, g + 1), new V(f, f + 1)), r, a);
            for (const U of T.mappings)
              b.push(U);
            T.hitTimeout && (_ = !0);
          }
        }
    };
    let y = 0, w = 0;
    for (const I of p) {
      qt(() => I.seq1Range.start - y === I.seq2Range.start - w);
      const N = I.seq1Range.start - y;
      S(N), y = I.seq1Range.endExclusive, w = I.seq2Range.endExclusive;
      const g = this.refineDiff(t, n, I, r, a);
      g.hitTimeout && (_ = !0);
      for (const f of g.mappings)
        b.push(f);
    }
    S(t.length - y);
    const x = ya(b, new $t(t), new $t(n));
    let C = [];
    return i.computeMoves && (C = this.computeMoves(x, t, n, o, c, r, a)), qt(() => {
      function I(g, f) {
        if (g.lineNumber < 1 || g.lineNumber > f.length)
          return !1;
        const T = f[g.lineNumber - 1];
        return !(g.column < 1 || g.column > T.length + 1);
      }
      function N(g, f) {
        return !(g.startLineNumber < 1 || g.startLineNumber > f.length + 1 || g.endLineNumberExclusive < 1 || g.endLineNumberExclusive > f.length + 1);
      }
      for (const g of x) {
        if (!g.innerChanges)
          return !1;
        for (const f of g.innerChanges)
          if (!(I(f.modifiedRange.getStartPosition(), n) && I(f.modifiedRange.getEndPosition(), n) && I(f.originalRange.getStartPosition(), t) && I(f.originalRange.getEndPosition(), t)))
            return !1;
        if (!N(g.modified, n) || !N(g.original, t))
          return !1;
      }
      return !0;
    }), new en(x, C, _);
  }
  computeMoves(t, n, i, r, a, s, l) {
    return Ch(t, n, i, r, a, s).map((o) => {
      const c = this.refineDiff(n, i, new ie(o.original.toOffsetRange(), o.modified.toOffsetRange()), s, l), h = ya(c.mappings, new $t(n), new $t(i), !0);
      return new Hi(o, h);
    });
  }
  refineDiff(t, n, i, r, a) {
    const s = qh(i).toRangeMapping2(t, n), l = new un(t, s.originalRange, a), o = new un(n, s.modifiedRange, a), c = l.length + o.length < 500 ? this.dynamicProgrammingDiffing.compute(l, o, r) : this.myersDiffingAlgorithm.compute(l, o, r);
    let h = c.diffs;
    return h = Ra(l, o, h), h = Uh(l, o, h), h = zh(l, o, h), h = Dh(l, o, h), {
      mappings: h.map((d) => new fe(l.translateRange(d.seq1Range), o.translateRange(d.seq2Range))),
      hitTimeout: c.hitTimeout
    };
  }
}
function qh(e) {
  return new Ce(new F(e.seq1Range.start + 1, e.seq1Range.endExclusive + 1), new F(e.seq2Range.start + 1, e.seq2Range.endExclusive + 1));
}
const In = {
  getLegacy: () => new vh(),
  getDefault: () => new Wh()
};
function Je(e, t) {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
}
class te {
  constructor(t, n, i, r = 1) {
    this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, t)) | 0, this.g = Math.min(255, Math.max(0, n)) | 0, this.b = Math.min(255, Math.max(0, i)) | 0, this.a = Je(Math.max(Math.min(1, r), 0), 3);
  }
  static equals(t, n) {
    return t.r === n.r && t.g === n.g && t.b === n.b && t.a === n.a;
  }
}
class Ee {
  constructor(t, n, i, r) {
    this._hslaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = Je(Math.max(Math.min(1, n), 0), 3), this.l = Je(Math.max(Math.min(1, i), 0), 3), this.a = Je(Math.max(Math.min(1, r), 0), 3);
  }
  static equals(t, n) {
    return t.h === n.h && t.s === n.s && t.l === n.l && t.a === n.a;
  }
  static fromRGBA(t) {
    const n = t.r / 255, i = t.g / 255, r = t.b / 255, a = t.a, s = Math.max(n, i, r), l = Math.min(n, i, r);
    let o = 0, c = 0;
    const h = (l + s) / 2, d = s - l;
    if (d > 0) {
      switch (c = Math.min(h <= 0.5 ? d / (2 * h) : d / (2 - 2 * h), 1), s) {
        case n:
          o = (i - r) / d + (i < r ? 6 : 0);
          break;
        case i:
          o = (r - n) / d + 2;
          break;
        case r:
          o = (n - i) / d + 4;
          break;
      }
      o *= 60, o = Math.round(o);
    }
    return new Ee(o, c, h, a);
  }
  static _hue2rgb(t, n, i) {
    return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + (n - t) * 6 * i : i < 1 / 2 ? n : i < 2 / 3 ? t + (n - t) * (2 / 3 - i) * 6 : t;
  }
  static toRGBA(t) {
    const n = t.h / 360, { s: i, l: r, a } = t;
    let s, l, o;
    if (i === 0)
      s = l = o = r;
    else {
      const c = r < 0.5 ? r * (1 + i) : r + i - r * i, h = 2 * r - c;
      s = Ee._hue2rgb(h, c, n + 1 / 3), l = Ee._hue2rgb(h, c, n), o = Ee._hue2rgb(h, c, n - 1 / 3);
    }
    return new te(Math.round(s * 255), Math.round(l * 255), Math.round(o * 255), a);
  }
}
class gt {
  constructor(t, n, i, r) {
    this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, t), 0) | 0, this.s = Je(Math.max(Math.min(1, n), 0), 3), this.v = Je(Math.max(Math.min(1, i), 0), 3), this.a = Je(Math.max(Math.min(1, r), 0), 3);
  }
  static equals(t, n) {
    return t.h === n.h && t.s === n.s && t.v === n.v && t.a === n.a;
  }
  static fromRGBA(t) {
    const n = t.r / 255, i = t.g / 255, r = t.b / 255, a = Math.max(n, i, r), s = Math.min(n, i, r), l = a - s, o = a === 0 ? 0 : l / a;
    let c;
    return l === 0 ? c = 0 : a === n ? c = ((i - r) / l % 6 + 6) % 6 : a === i ? c = (r - n) / l + 2 : c = (n - i) / l + 4, new gt(Math.round(c * 60), o, a, t.a);
  }
  static toRGBA(t) {
    const { h: n, s: i, v: r, a } = t, s = r * i, l = s * (1 - Math.abs(n / 60 % 2 - 1)), o = r - s;
    let [c, h, d] = [0, 0, 0];
    return n < 60 ? (c = s, h = l) : n < 120 ? (c = l, h = s) : n < 180 ? (h = s, d = l) : n < 240 ? (h = l, d = s) : n < 300 ? (c = l, d = s) : n <= 360 && (c = s, d = l), c = Math.round((c + o) * 255), h = Math.round((h + o) * 255), d = Math.round((d + o) * 255), new te(c, h, d, a);
  }
}
var $;
let Wi = ($ = class {
  static fromHex(e) {
    return $.Format.CSS.parseHex(e) || $.red;
  }
  static equals(e, t) {
    return !e && !t ? !0 : !e || !t ? !1 : e.equals(t);
  }
  get hsla() {
    return this._hsla ? this._hsla : Ee.fromRGBA(this.rgba);
  }
  get hsva() {
    return this._hsva ? this._hsva : gt.fromRGBA(this.rgba);
  }
  constructor(e) {
    if (e)
      if (e instanceof te)
        this.rgba = e;
      else if (e instanceof Ee)
        this._hsla = e, this.rgba = Ee.toRGBA(e);
      else if (e instanceof gt)
        this._hsva = e, this.rgba = gt.toRGBA(e);
      else
        throw new Error("Invalid color ctor argument");
    else throw new Error("Color needs a value");
  }
  equals(e) {
    return !!e && te.equals(this.rgba, e.rgba) && Ee.equals(this.hsla, e.hsla) && gt.equals(this.hsva, e.hsva);
  }
  getRelativeLuminance() {
    const e = $._relativeLuminanceForComponent(this.rgba.r), t = $._relativeLuminanceForComponent(this.rgba.g), n = $._relativeLuminanceForComponent(this.rgba.b), i = 0.2126 * e + 0.7152 * t + 0.0722 * n;
    return Je(i, 4);
  }
  reduceRelativeLuminace(e, t) {
    let { r: n, g: i, b: r } = e.rgba, a = this.getContrastRatio(e);
    for (; a < t && (n > 0 || i > 0 || r > 0); )
      n -= Math.max(0, Math.ceil(n * 0.1)), i -= Math.max(0, Math.ceil(i * 0.1)), r -= Math.max(0, Math.ceil(r * 0.1)), a = this.getContrastRatio(new $(new te(n, i, r)));
    return new $(new te(n, i, r));
  }
  increaseRelativeLuminace(e, t) {
    let { r: n, g: i, b: r } = e.rgba, a = this.getContrastRatio(e);
    for (; a < t && (n < 255 || i < 255 || r < 255); )
      n = Math.min(255, n + Math.ceil((255 - n) * 0.1)), i = Math.min(255, i + Math.ceil((255 - i) * 0.1)), r = Math.min(255, r + Math.ceil((255 - r) * 0.1)), a = this.getContrastRatio(new $(new te(n, i, r)));
    return new $(new te(n, i, r));
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
    const n = this.getRelativeLuminance(), i = e.getRelativeLuminance();
    if (this.getContrastRatio(e) < t) {
      if (i < n) {
        const s = this.reduceRelativeLuminace(e, t), l = this.getContrastRatio(s);
        if (l < t) {
          const o = this.increaseRelativeLuminace(e, t), c = this.getContrastRatio(o);
          return l > c ? s : o;
        }
        return s;
      }
      const r = this.increaseRelativeLuminace(e, t), a = this.getContrastRatio(r);
      if (a < t) {
        const s = this.reduceRelativeLuminace(e, t), l = this.getContrastRatio(s);
        return a > l ? r : s;
      }
      return r;
    }
    return e;
  }
  lighten(e) {
    return new $(new Ee(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * e, this.hsla.a));
  }
  darken(e) {
    return new $(new Ee(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * e, this.hsla.a));
  }
  transparent(e) {
    const { r: t, g: n, b: i, a: r } = this.rgba;
    return new $(new te(t, n, i, r * e));
  }
  isTransparent() {
    return this.rgba.a === 0;
  }
  isOpaque() {
    return this.rgba.a === 1;
  }
  opposite() {
    return new $(new te(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
  }
  blend(e) {
    const t = e.rgba, n = this.rgba.a, i = t.a, r = n + i * (1 - n);
    if (r < 1e-6)
      return $.transparent;
    const a = this.rgba.r * n / r + t.r * i * (1 - n) / r, s = this.rgba.g * n / r + t.g * i * (1 - n) / r, l = this.rgba.b * n / r + t.b * i * (1 - n) / r;
    return new $(new te(a, s, l, r));
  }
  makeOpaque(e) {
    if (this.isOpaque() || e.rgba.a !== 1)
      return this;
    const { r: t, g: n, b: i, a: r } = this.rgba;
    return new $(new te(
      e.rgba.r - r * (e.rgba.r - t),
      e.rgba.g - r * (e.rgba.g - n),
      e.rgba.b - r * (e.rgba.b - i),
      1
    ));
  }
  flatten(...e) {
    const t = e.reduceRight((n, i) => $._flatten(i, n));
    return $._flatten(this, t);
  }
  static _flatten(e, t) {
    const n = 1 - e.rgba.a;
    return new $(new te(
      n * t.rgba.r + e.rgba.a * e.rgba.r,
      n * t.rgba.g + e.rgba.a * e.rgba.g,
      n * t.rgba.b + e.rgba.a * e.rgba.b
    ));
  }
  toString() {
    return this._toString || (this._toString = $.Format.CSS.format(this)), this._toString;
  }
  static getLighterColor(e, t, n) {
    if (e.isLighterThan(t))
      return e;
    n = n || 0.5;
    const i = e.getRelativeLuminance(), r = t.getRelativeLuminance();
    return n = n * (r - i) / r, e.lighten(n);
  }
  static getDarkerColor(e, t, n) {
    if (e.isDarkerThan(t))
      return e;
    n = n || 0.5;
    const i = e.getRelativeLuminance(), r = t.getRelativeLuminance();
    return n = n * (i - r) / i, e.darken(n);
  }
}, $.white = new $(new te(255, 255, 255, 1)), $.black = new $(new te(0, 0, 0, 1)), $.red = new $(new te(255, 0, 0, 1)), $.blue = new $(new te(0, 0, 255, 1)), $.green = new $(new te(0, 255, 0, 1)), $.cyan = new $(new te(0, 255, 255, 1)), $.lightgrey = new $(new te(211, 211, 211, 1)), $.transparent = new $(new te(0, 0, 0, 0)), $);
(function(e) {
  (function(t) {
    (function(n) {
      function i(p) {
        return p.rgba.a === 1 ? `rgb(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b})` : e.Format.CSS.formatRGBA(p);
      }
      n.formatRGB = i;
      function r(p) {
        return `rgba(${p.rgba.r}, ${p.rgba.g}, ${p.rgba.b}, ${+p.rgba.a.toFixed(2)})`;
      }
      n.formatRGBA = r;
      function a(p) {
        return p.hsla.a === 1 ? `hsl(${p.hsla.h}, ${(p.hsla.s * 100).toFixed(2)}%, ${(p.hsla.l * 100).toFixed(2)}%)` : e.Format.CSS.formatHSLA(p);
      }
      n.formatHSL = a;
      function s(p) {
        return `hsla(${p.hsla.h}, ${(p.hsla.s * 100).toFixed(2)}%, ${(p.hsla.l * 100).toFixed(2)}%, ${p.hsla.a.toFixed(2)})`;
      }
      n.formatHSLA = s;
      function l(p) {
        const _ = p.toString(16);
        return _.length !== 2 ? "0" + _ : _;
      }
      function o(p) {
        return `#${l(p.rgba.r)}${l(p.rgba.g)}${l(p.rgba.b)}`;
      }
      n.formatHex = o;
      function c(p, _ = !1) {
        return _ && p.rgba.a === 1 ? e.Format.CSS.formatHex(p) : `#${l(p.rgba.r)}${l(p.rgba.g)}${l(p.rgba.b)}${l(Math.round(p.rgba.a * 255))}`;
      }
      n.formatHexA = c;
      function h(p) {
        return p.isOpaque() ? e.Format.CSS.formatHex(p) : e.Format.CSS.formatRGBA(p);
      }
      n.format = h;
      function d(p) {
        const _ = p.length;
        if (_ === 0 || p.charCodeAt(0) !== 35)
          return null;
        if (_ === 7) {
          const b = 16 * m(p.charCodeAt(1)) + m(p.charCodeAt(2)), S = 16 * m(p.charCodeAt(3)) + m(p.charCodeAt(4)), y = 16 * m(p.charCodeAt(5)) + m(p.charCodeAt(6));
          return new e(new te(b, S, y, 1));
        }
        if (_ === 9) {
          const b = 16 * m(p.charCodeAt(1)) + m(p.charCodeAt(2)), S = 16 * m(p.charCodeAt(3)) + m(p.charCodeAt(4)), y = 16 * m(p.charCodeAt(5)) + m(p.charCodeAt(6)), w = 16 * m(p.charCodeAt(7)) + m(p.charCodeAt(8));
          return new e(new te(b, S, y, w / 255));
        }
        if (_ === 4) {
          const b = m(p.charCodeAt(1)), S = m(p.charCodeAt(2)), y = m(p.charCodeAt(3));
          return new e(new te(16 * b + b, 16 * S + S, 16 * y + y));
        }
        if (_ === 5) {
          const b = m(p.charCodeAt(1)), S = m(p.charCodeAt(2)), y = m(p.charCodeAt(3)), w = m(p.charCodeAt(4));
          return new e(new te(16 * b + b, 16 * S + S, 16 * y + y, (16 * w + w) / 255));
        }
        return null;
      }
      n.parseHex = d;
      function m(p) {
        switch (p) {
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
})(Wi);
function Ho(e) {
  const t = [];
  for (const n of e) {
    const i = Number(n);
    (i || i === 0 && n.replace(/\s/g, "") !== "") && t.push(i);
  }
  return t;
}
function qi(e, t, n, i) {
  return {
    red: e / 255,
    blue: n / 255,
    green: t / 255,
    alpha: i
  };
}
function xt(e, t) {
  const n = t.index, i = t[0].length;
  if (!n)
    return;
  const r = e.positionAt(n);
  return {
    startLineNumber: r.lineNumber,
    startColumn: r.column,
    endLineNumber: r.lineNumber,
    endColumn: r.column + i
  };
}
function Fh(e, t) {
  if (!e)
    return;
  const n = Wi.Format.CSS.parseHex(t);
  if (n)
    return {
      range: e,
      color: qi(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
    };
}
function Oa(e, t, n) {
  if (!e || t.length !== 1)
    return;
  const i = t[0].values(), r = Ho(i);
  return {
    range: e,
    color: qi(r[0], r[1], r[2], n ? r[3] : 1)
  };
}
function za(e, t, n) {
  if (!e || t.length !== 1)
    return;
  const i = t[0].values(), r = Ho(i), a = new Wi(new Ee(
    r[0],
    r[1] / 100,
    r[2] / 100,
    n ? r[3] : 1
  ));
  return {
    range: e,
    color: qi(a.rgba.r, a.rgba.g, a.rgba.b, a.rgba.a)
  };
}
function Et(e, t) {
  return typeof e == "string" ? [...e.matchAll(t)] : e.findMatches(t);
}
function Bh(e) {
  const t = [], n = Et(e, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);
  if (n.length > 0)
    for (const i of n) {
      const r = i.filter((o) => o !== void 0), a = r[1], s = r[2];
      if (!s)
        continue;
      let l;
      if (a === "rgb") {
        const o = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
        l = Oa(xt(e, i), Et(s, o), !1);
      } else if (a === "rgba") {
        const o = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        l = Oa(xt(e, i), Et(s, o), !0);
      } else if (a === "hsl") {
        const o = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
        l = za(xt(e, i), Et(s, o), !1);
      } else if (a === "hsla") {
        const o = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        l = za(xt(e, i), Et(s, o), !0);
      } else a === "#" && (l = Fh(xt(e, i), a + s));
      l && t.push(l);
    }
  return t;
}
function Vh(e) {
  return !e || typeof e.getValue != "function" || typeof e.positionAt != "function" ? [] : Bh(e);
}
const Ua = new RegExp("\\bMARK:\\s*(.*)$", "d"), Kh = /^-+|-+$/g;
function jh(e, t) {
  var n;
  let i = [];
  if (t.findRegionSectionHeaders && (n = t.foldingRules) != null && n.markers) {
    const r = $h(e, t);
    i = i.concat(r);
  }
  if (t.findMarkSectionHeaders) {
    const r = Gh(e);
    i = i.concat(r);
  }
  return i;
}
function $h(e, t) {
  const n = [], i = e.getLineCount();
  for (let r = 1; r <= i; r++) {
    const a = e.getLineContent(r), s = a.match(t.foldingRules.markers.start);
    if (s) {
      const l = { startLineNumber: r, startColumn: s[0].length + 1, endLineNumber: r, endColumn: a.length + 1 };
      if (l.endColumn > l.startColumn) {
        const o = {
          range: l,
          ...Do(a.substring(s[0].length)),
          shouldBeInComments: !1
        };
        (o.text || o.hasSeparatorLine) && n.push(o);
      }
    }
  }
  return n;
}
function Gh(e) {
  const t = [], n = e.getLineCount();
  for (let i = 1; i <= n; i++) {
    const r = e.getLineContent(i);
    Xh(r, i, t);
  }
  return t;
}
function Xh(e, t, n) {
  Ua.lastIndex = 0;
  const i = Ua.exec(e);
  if (i) {
    const r = i.indices[1][0] + 1, a = i.indices[1][1] + 1, s = { startLineNumber: t, startColumn: r, endLineNumber: t, endColumn: a };
    if (s.endColumn > s.startColumn) {
      const l = {
        range: s,
        ...Do(i[1]),
        shouldBeInComments: !0
      };
      (l.text || l.hasSeparatorLine) && n.push(l);
    }
  }
}
function Do(e) {
  e = e.trim();
  const t = e.startsWith("-");
  return e = e.replace(Kh, ""), { text: e, hasSeparatorLine: t };
}
function je(e) {
  return e === 47 || e === 92;
}
function Wo(e) {
  return e.replace(/[\\/]/g, Q.sep);
}
function Jh(e) {
  return e.indexOf("/") === -1 && (e = Wo(e)), /^[a-zA-Z]:(\/|$)/.test(e) && (e = "/" + e), e;
}
function Pa(e, t = Q.sep) {
  if (!e)
    return "";
  const n = e.length, i = e.charCodeAt(0);
  if (je(i)) {
    if (je(e.charCodeAt(1)) && !je(e.charCodeAt(2))) {
      let a = 3;
      const s = a;
      for (; a < n && !je(e.charCodeAt(a)); a++)
        ;
      if (s !== a && !je(e.charCodeAt(a + 1))) {
        for (a += 1; a < n; a++)
          if (je(e.charCodeAt(a)))
            return e.slice(0, a + 1).replace(/[\\/]/g, t);
      }
    }
    return t;
  } else if (Yh(i) && e.charCodeAt(1) === 58)
    return je(e.charCodeAt(2)) ? e.slice(0, 2) + t : e.slice(0, 2);
  let r = e.indexOf("://");
  if (r !== -1) {
    for (r += 3; r < n; r++)
      if (je(e.charCodeAt(r)))
        return e.slice(0, r + 1);
  }
  return "";
}
function Ha(e, t, n, i = Qt) {
  if (e === t)
    return !0;
  if (!e || !t || t.length > e.length)
    return !1;
  if (n) {
    if (!Ql(e, t))
      return !1;
    if (t.length === e.length)
      return !0;
    let r = t.length;
    return t.charAt(t.length - 1) === i && r--, e.charAt(r) === i;
  }
  return t.charAt(t.length - 1) !== i && (t += i), e.indexOf(t) === 0;
}
function Yh(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
var de;
(function(e) {
  e.inMemory = "inmemory", e.vscode = "vscode", e.internal = "private", e.walkThrough = "walkThrough", e.walkThroughSnippet = "walkThroughSnippet", e.http = "http", e.https = "https", e.file = "file", e.mailto = "mailto", e.untitled = "untitled", e.data = "data", e.command = "command", e.vscodeRemote = "vscode-remote", e.vscodeRemoteResource = "vscode-remote-resource", e.vscodeManagedRemoteResource = "vscode-managed-remote-resource", e.vscodeUserData = "vscode-userdata", e.vscodeCustomEditor = "vscode-custom-editor", e.vscodeNotebookCell = "vscode-notebook-cell", e.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", e.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", e.vscodeNotebookCellOutput = "vscode-notebook-cell-output", e.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", e.vscodeNotebookMetadata = "vscode-notebook-metadata", e.vscodeInteractiveInput = "vscode-interactive-input", e.vscodeSettings = "vscode-settings", e.vscodeWorkspaceTrust = "vscode-workspace-trust", e.vscodeTerminal = "vscode-terminal", e.vscodeChatCodeBlock = "vscode-chat-code-block", e.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", e.vscodeChatSesssion = "vscode-chat-editor", e.webviewPanel = "webview-panel", e.vscodeWebview = "vscode-webview", e.extension = "extension", e.vscodeFileResource = "vscode-file", e.tmp = "tmp", e.vsls = "vsls", e.vscodeSourceControl = "vscode-scm", e.commentsInput = "comment", e.codeSetting = "code-setting", e.outputChannel = "output", e.accessibleView = "accessible-view";
})(de || (de = {}));
const Qh = "tkn";
class Zh {
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
    this._serverRootPath = tu(t, n);
  }
  getServerRootPath() {
    return this._serverRootPath;
  }
  get _remoteResourcesPath() {
    return Q.join(this._serverRootPath, de.vscodeRemoteResource);
  }
  set(t, n, i) {
    this._hosts[t] = n, this._ports[t] = i;
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
      } catch (l) {
        return Ot(l), t;
      }
    const n = t.authority;
    let i = this._hosts[n];
    i && i.indexOf(":") !== -1 && i.indexOf("[") === -1 && (i = `[${i}]`);
    const r = this._ports[n], a = this._connectionTokens[n];
    let s = `path=${encodeURIComponent(t.path)}`;
    return typeof a == "string" && (s += `&${Qh}=${encodeURIComponent(a)}`), _e.from({
      scheme: Hl ? this._preferredWebSchema : de.vscodeRemoteResource,
      authority: `${i}:${r}`,
      path: this._remoteResourcesPath,
      query: s
    });
  }
}
const eu = new Zh();
function tu(e, t) {
  return Q.join(t ?? "/", `${e.quality ?? "oss"}-${e.commit ?? "dev"}`);
}
const nu = "vscode-app", qo = class tn {
  constructor() {
    this.staticBrowserUris = new ml(), this.appResourcePathUrls = /* @__PURE__ */ new Map();
  }
  registerAppResourcePathUrl(t, n) {
    this.appResourcePathUrls.set(t, n);
  }
  toUrl(t) {
    var n;
    let i = this.appResourcePathUrls.get(t);
    return typeof i == "function" && (i = i()), new URL(i ?? t, ((n = globalThis.location) == null ? void 0 : n.href) ?? import.meta.url).toString();
  }
  asBrowserUri(t) {
    const n = this.toUri(t, { toUrl: this.toUrl.bind(this) });
    return this.uriToBrowserUri(n);
  }
  uriToBrowserUri(t) {
    return t.scheme === de.vscodeRemote ? eu.rewrite(t) : t.scheme === de.file && (Pl || Wl === `${de.vscodeFileResource}://${tn.FALLBACK_AUTHORITY}`) ? t.with({
      scheme: de.vscodeFileResource,
      authority: t.authority || tn.FALLBACK_AUTHORITY,
      query: null,
      fragment: null
    }) : this.staticBrowserUris.get(t) ?? t;
  }
  asFileUri(t) {
    const n = this.toUri(t, { toUrl: this.toUrl.bind(this) });
    return this.uriToFileUri(n);
  }
  uriToFileUri(t) {
    return t.scheme === de.vscodeFileResource ? t.with({
      scheme: de.file,
      authority: t.authority !== tn.FALLBACK_AUTHORITY ? t.authority : null,
      query: null,
      fragment: null
    }) : t;
  }
  toUri(t, n) {
    if (_e.isUri(t))
      return t;
    if (globalThis._VSCODE_FILE_ROOT) {
      const i = globalThis._VSCODE_FILE_ROOT;
      if (/^\w[\w\d+.-]*:\/\//.test(i))
        return _e.joinPath(_e.parse(i, !0), t);
      const r = zc(i, t);
      return _e.file(r);
    }
    return _e.parse(n.toUrl(t));
  }
  registerStaticBrowserUri(t, n) {
    return this.staticBrowserUris.set(t, n), Wt(() => {
      this.staticBrowserUris.get(t) === n && this.staticBrowserUris.delete(t);
    });
  }
  getRegisteredBrowserUris() {
    return this.staticBrowserUris.keys();
  }
};
qo.FALLBACK_AUTHORITY = nu;
let iu = qo;
new iu();
var Da;
(function(e) {
  const t = /* @__PURE__ */ new Map([
    ["1", { "Cross-Origin-Opener-Policy": "same-origin" }],
    ["2", { "Cross-Origin-Embedder-Policy": "require-corp" }],
    ["3", { "Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Embedder-Policy": "require-corp" }]
  ]);
  e.CoopAndCoep = Object.freeze(t.get("3"));
  const n = "vscode-coi";
  function i(a) {
    let s;
    typeof a == "string" ? s = new URL(a).searchParams : a instanceof URL ? s = a.searchParams : _e.isUri(a) && (s = new URL(a.toString(!0)).searchParams);
    const l = s == null ? void 0 : s.get(n);
    if (l)
      return t.get(l);
  }
  e.getHeadersFromQuery = i;
  function r(a, s, l) {
    if (!globalThis.crossOriginIsolated)
      return;
    const o = s && l ? "3" : l ? "2" : "1";
    a instanceof URLSearchParams ? a.set(n, o) : a[n] = o;
  }
  e.addSearchParam = r;
})(Da || (Da = {}));
function He(e) {
  return hn(e, !0);
}
class ru {
  constructor(t) {
    this._ignorePathCasing = t;
  }
  compare(t, n, i = !1) {
    return t === n ? 0 : Xl(this.getComparisonKey(t, i), this.getComparisonKey(n, i));
  }
  isEqual(t, n, i = !1) {
    return t === n ? !0 : !t || !n ? !1 : this.getComparisonKey(t, i) === this.getComparisonKey(n, i);
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
  isEqualOrParent(t, n, i = !1) {
    if (t.scheme === n.scheme) {
      if (t.scheme === de.file)
        return Ha(He(t), He(n), this._ignorePathCasing(t)) && t.query === n.query && (i || t.fragment === n.fragment);
      if (Wa(t.authority, n.authority))
        return Ha(t.path, n.path, this._ignorePathCasing(t), "/") && t.query === n.query && (i || t.fragment === n.fragment);
    }
    return !1;
  }
  joinPath(t, ...n) {
    return _e.joinPath(t, ...n);
  }
  basenameOrAuthority(t) {
    return au(t) || t.authority;
  }
  basename(t) {
    return Q.basename(t.path);
  }
  extname(t) {
    return Q.extname(t.path);
  }
  dirname(t) {
    if (t.path.length === 0)
      return t;
    let n;
    return t.scheme === de.file ? n = _e.file(Hc(He(t))).path : (n = Q.dirname(t.path), t.authority && n.length && n.charCodeAt(0) !== 47 && (console.error(`dirname("${t.toString})) resulted in a relative path`), n = "/")), t.with({
      path: n
    });
  }
  normalizePath(t) {
    if (!t.path.length)
      return t;
    let n;
    return t.scheme === de.file ? n = _e.file(Oc(He(t))).path : n = Q.normalize(t.path), t.with({
      path: n
    });
  }
  relativePath(t, n) {
    if (t.scheme !== n.scheme || !Wa(t.authority, n.authority))
      return;
    if (t.scheme === de.file) {
      const a = Pc(He(t), He(n));
      return yt ? Wo(a) : a;
    }
    let i = t.path || "/";
    const r = n.path || "/";
    if (this._ignorePathCasing(t)) {
      let a = 0;
      for (const s = Math.min(i.length, r.length); a < s && !(i.charCodeAt(a) !== r.charCodeAt(a) && i.charAt(a).toLowerCase() !== r.charAt(a).toLowerCase()); a++)
        ;
      i = r.substr(0, a) + i.substr(a);
    }
    return Q.relative(i, r);
  }
  resolvePath(t, n) {
    if (t.scheme === de.file) {
      const i = _e.file(Uc(He(t), n));
      return t.with({
        authority: i.authority,
        path: i.path
      });
    }
    return n = Jh(n), t.with({
      path: Q.resolve(t.path, n)
    });
  }
  isAbsolutePath(t) {
    return !!t.path && t.path[0] === "/";
  }
  isEqualAuthority(t, n) {
    return t === n || t !== void 0 && n !== void 0 && Yl(t, n);
  }
  hasTrailingPathSeparator(t, n = Qt) {
    if (t.scheme === de.file) {
      const i = He(t);
      return i.length > Pa(i).length && i[i.length - 1] === n;
    } else {
      const i = t.path;
      return i.length > 1 && i.charCodeAt(i.length - 1) === 47 && !/^[a-zA-Z]:(\/$|\\$)/.test(t.fsPath);
    }
  }
  removeTrailingPathSeparator(t, n = Qt) {
    return qa(t, n) ? t.with({ path: t.path.substr(0, t.path.length - 1) }) : t;
  }
  addTrailingPathSeparator(t, n = Qt) {
    let i = !1;
    if (t.scheme === de.file) {
      const r = He(t);
      i = r !== void 0 && r.length === Pa(r).length && r[r.length - 1] === n;
    } else {
      n = "/";
      const r = t.path;
      i = r.length === 1 && r.charCodeAt(r.length - 1) === 47;
    }
    return !i && !qa(t, n) ? t.with({ path: t.path + "/" }) : t;
  }
}
const J = new ru(() => !1);
J.isEqual.bind(J);
J.isEqualOrParent.bind(J);
J.getComparisonKey.bind(J);
J.basenameOrAuthority.bind(J);
const au = J.basename.bind(J);
J.extname.bind(J);
J.dirname.bind(J);
J.joinPath.bind(J);
J.normalizePath.bind(J);
J.relativePath.bind(J);
J.resolvePath.bind(J);
J.isAbsolutePath.bind(J);
const Wa = J.isEqualAuthority.bind(J), qa = J.hasTrailingPathSeparator.bind(J);
J.removeTrailingPathSeparator.bind(J);
J.addTrailingPathSeparator.bind(J);
var Fa;
(function(e) {
  e.META_DATA_LABEL = "label", e.META_DATA_DESCRIPTION = "description", e.META_DATA_SIZE = "size", e.META_DATA_MIME = "mime";
  function t(n) {
    const i = /* @__PURE__ */ new Map();
    n.path.substring(n.path.indexOf(";") + 1, n.path.lastIndexOf(";")).split(";").forEach((a) => {
      const [s, l] = a.split(":");
      s && l && i.set(s, l);
    });
    const r = n.path.substring(0, n.path.indexOf(";"));
    return r && i.set(e.META_DATA_MIME, r), i;
  }
  e.parseMetaData = t;
})(Fa || (Fa = {}));
var Ba;
(function(e) {
  async function t(i) {
    let r;
    const a = await Promise.all(i.map((s) => s.then((l) => l, (l) => {
      r || (r = l);
    })));
    if (typeof r < "u")
      throw r;
    return a;
  }
  e.settled = t;
  function n(i) {
    return new Promise(async (r, a) => {
      try {
        await i(r, a);
      } catch (s) {
        a(s);
      }
    });
  }
  e.withAsyncBody = n;
})(Ba || (Ba = {}));
const Va = class Le {
  static fromArray(t) {
    return new Le((n) => {
      n.emitMany(t);
    });
  }
  static fromPromise(t) {
    return new Le(async (n) => {
      n.emitMany(await t);
    });
  }
  static fromPromisesResolveOrder(t) {
    return new Le(async (n) => {
      await Promise.all(t.map(async (i) => n.emitOne(await i)));
    });
  }
  static merge(t) {
    return new Le(async (n) => {
      await Promise.all(t.map(async (i) => {
        for await (const r of i)
          n.emitOne(r);
      }));
    });
  }
  constructor(t, n) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = n, this._onStateChanged = new xe(), queueMicrotask(async () => {
      const i = {
        emitOne: (r) => this.emitOne(r),
        emitMany: (r) => this.emitMany(r),
        reject: (r) => this.reject(r)
      };
      try {
        await Promise.resolve(t(i)), this.resolve();
      } catch (r) {
        this.reject(r);
      } finally {
        i.emitOne = void 0, i.emitMany = void 0, i.reject = void 0;
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
          await an.toPromise(this._onStateChanged.event);
        } while (!0);
      },
      return: async () => {
        var n;
        return (n = this._onReturn) == null || n.call(this), { done: !0, value: void 0 };
      }
    };
  }
  static map(t, n) {
    return new Le(async (i) => {
      for await (const r of t)
        i.emitOne(n(r));
    });
  }
  map(t) {
    return Le.map(this, t);
  }
  static filter(t, n) {
    return new Le(async (i) => {
      for await (const r of t)
        n(r) && i.emitOne(r);
    });
  }
  filter(t) {
    return Le.filter(this, t);
  }
  static coalesce(t) {
    return Le.filter(t, (n) => !!n);
  }
  coalesce() {
    return Le.coalesce(this);
  }
  static async toPromise(t) {
    const n = [];
    for await (const i of t)
      n.push(i);
    return n;
  }
  toPromise() {
    return Le.toPromise(this);
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
Va.EMPTY = Va.fromArray([]);
class su {
  constructor(t) {
    this.values = t, this.prefixSum = new Uint32Array(t.length), this.prefixSumValidIndex = new Int32Array(1), this.prefixSumValidIndex[0] = -1;
  }
  getCount() {
    return this.values.length;
  }
  insertValues(t, n) {
    t = ct(t);
    const i = this.values, r = this.prefixSum, a = n.length;
    return a === 0 ? !1 : (this.values = new Uint32Array(i.length + a), this.values.set(i.subarray(0, t), 0), this.values.set(i.subarray(t), t + a), this.values.set(n, t), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  setValue(t, n) {
    return t = ct(t), n = ct(n), this.values[t] === n ? !1 : (this.values[t] = n, t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), !0);
  }
  removeValues(t, n) {
    t = ct(t), n = ct(n);
    const i = this.values, r = this.prefixSum;
    if (t >= i.length)
      return !1;
    const a = i.length - t;
    return n >= a && (n = a), n === 0 ? !1 : (this.values = new Uint32Array(i.length - n), this.values.set(i.subarray(0, t), 0), this.values.set(i.subarray(t + n), t), this.prefixSum = new Uint32Array(this.values.length), t - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = t - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(r.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  getTotalSum() {
    return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
  }
  getPrefixSum(t) {
    return t < 0 ? 0 : (t = ct(t), this._getPrefixSum(t));
  }
  _getPrefixSum(t) {
    if (t <= this.prefixSumValidIndex[0])
      return this.prefixSum[t];
    let n = this.prefixSumValidIndex[0] + 1;
    n === 0 && (this.prefixSum[0] = this.values[0], n++), t >= this.values.length && (t = this.values.length - 1);
    for (let i = n; i <= t; i++)
      this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
    return this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], t), this.prefixSum[t];
  }
  getIndexOf(t) {
    t = Math.floor(t), this.getTotalSum();
    let n = 0, i = this.values.length - 1, r = 0, a = 0, s = 0;
    for (; n <= i; )
      if (r = n + (i - n) / 2 | 0, a = this.prefixSum[r], s = a - this.values[r], t < s)
        i = r - 1;
      else if (t >= a)
        n = r + 1;
      else
        break;
    return new ou(r, t - s);
  }
}
class ou {
  constructor(t, n) {
    this.index = t, this.remainder = n, this._prefixSumIndexOfResultBrand = void 0, this.index = t, this.remainder = n;
  }
}
class lu {
  constructor(t, n, i, r) {
    this._uri = t, this._lines = n, this._eol = i, this._versionId = r, this._lineStarts = null, this._cachedTextValue = null;
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
    for (const i of n)
      this._acceptDeleteRange(i.range), this._acceptInsertText(new G(i.range.startLineNumber, i.range.startColumn), i.text);
    this._versionId = t.versionId, this._cachedTextValue = null;
  }
  _ensureLineStarts() {
    if (!this._lineStarts) {
      const t = this._eol.length, n = this._lines.length, i = new Uint32Array(n);
      for (let r = 0; r < n; r++)
        i[r] = this._lines[r].length + t;
      this._lineStarts = new su(i);
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
    const i = Oi(n);
    if (i.length === 1) {
      this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + i[0] + this._lines[t.lineNumber - 1].substring(t.column - 1));
      return;
    }
    i[i.length - 1] += this._lines[t.lineNumber - 1].substring(t.column - 1), this._setLineText(t.lineNumber - 1, this._lines[t.lineNumber - 1].substring(0, t.column - 1) + i[0]);
    const r = new Uint32Array(i.length - 1);
    for (let a = 1; a < i.length; a++)
      this._lines.splice(t.lineNumber + a - 1, 0, i[a]), r[a - 1] = i[a].length + this._eol.length;
    this._lineStarts && this._lineStarts.insertValues(t.lineNumber, r);
  }
}
const cu = "workerTextModelSync";
class hu {
  constructor() {
    this._models = /* @__PURE__ */ Object.create(null);
  }
  bindToServer(t) {
    t.setChannel(cu, this);
  }
  getModel(t) {
    return this._models[t];
  }
  getModels() {
    const t = [];
    return Object.keys(this._models).forEach((n) => t.push(this._models[n])), t;
  }
  $acceptNewModel(t) {
    this._models[t.url] = new uu(_e.parse(t.url), t.lines, t.EOL, t.versionId);
  }
  $acceptModelChanged(t, n) {
    this._models[t] && this._models[t].onEvents(n);
  }
  $acceptRemovedModel(t) {
    this._models[t] && delete this._models[t];
  }
}
class uu extends lu {
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
    for (let i = 0; i < this._lines.length; i++) {
      const r = this._lines[i], a = this.offsetAt(new G(i + 1, 1)), s = r.matchAll(t);
      for (const l of s)
        (l.index || l.index === 0) && (l.index = l.index + a), n.push(l);
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
    const i = Pi(t.column, Eo(n), this._lines[t.lineNumber - 1], 0);
    return i ? new W(
      t.lineNumber,
      i.startColumn,
      t.lineNumber,
      i.endColumn
    ) : null;
  }
  getWordUntilPosition(t, n) {
    const i = this.getWordAtPosition(t, n);
    return i ? {
      word: this._lines[t.lineNumber - 1].substring(i.startColumn - 1, t.column - 1),
      startColumn: i.startColumn,
      endColumn: t.column
    } : {
      word: "",
      startColumn: t.column,
      endColumn: t.column
    };
  }
  words(t) {
    const n = this._lines, i = this._wordenize.bind(this);
    let r = 0, a = "", s = 0, l = [];
    return {
      *[Symbol.iterator]() {
        for (; ; )
          if (s < l.length) {
            const o = a.substring(l[s].start, l[s].end);
            s += 1, yield o;
          } else if (r < n.length)
            a = n[r], l = i(a, t), s = 0, r += 1;
          else
            break;
      }
    };
  }
  getLineWords(t, n) {
    const i = this._lines[t - 1], r = this._wordenize(i, n), a = [];
    for (const s of r)
      a.push({
        word: i.substring(s.start, s.end),
        startColumn: s.start + 1,
        endColumn: s.end + 1
      });
    return a;
  }
  _wordenize(t, n) {
    const i = [];
    let r;
    for (n.lastIndex = 0; (r = n.exec(t)) && r[0].length !== 0; )
      i.push({ start: r.index, end: r.index + r[0].length });
    return i;
  }
  getValueInRange(t) {
    if (t = this._validateRange(t), t.startLineNumber === t.endLineNumber)
      return this._lines[t.startLineNumber - 1].substring(t.startColumn - 1, t.endColumn - 1);
    const n = this._eol, i = t.startLineNumber - 1, r = t.endLineNumber - 1, a = [];
    a.push(this._lines[i].substring(t.startColumn - 1));
    for (let s = i + 1; s < r; s++)
      a.push(this._lines[s]);
    return a.push(this._lines[r].substring(0, t.endColumn - 1)), a.join(n);
  }
  offsetAt(t) {
    return t = this._validatePosition(t), this._ensureLineStarts(), this._lineStarts.getPrefixSum(t.lineNumber - 2) + (t.column - 1);
  }
  positionAt(t) {
    t = Math.floor(t), t = Math.max(0, t), this._ensureLineStarts();
    const n = this._lineStarts.getIndexOf(t), i = this._lines[n.index].length;
    return {
      lineNumber: 1 + n.index,
      column: 1 + Math.min(n.remainder, i)
    };
  }
  _validateRange(t) {
    const n = this._validatePosition({ lineNumber: t.startLineNumber, column: t.startColumn }), i = this._validatePosition({ lineNumber: t.endLineNumber, column: t.endColumn });
    return n.lineNumber !== t.startLineNumber || n.column !== t.startColumn || i.lineNumber !== t.endLineNumber || i.column !== t.endColumn ? {
      startLineNumber: n.lineNumber,
      startColumn: n.column,
      endLineNumber: i.lineNumber,
      endColumn: i.column
    } : t;
  }
  _validatePosition(t) {
    if (!G.isIPosition(t))
      throw new Error("bad position");
    let { lineNumber: n, column: i } = t, r = !1;
    if (n < 1)
      n = 1, i = 1, r = !0;
    else if (n > this._lines.length)
      n = this._lines.length, i = this._lines[n - 1].length + 1, r = !0;
    else {
      const a = this._lines[n - 1].length + 1;
      i < 1 ? (i = 1, r = !0) : i > a && (i = a, r = !0);
    }
    return r ? { lineNumber: n, column: i } : t;
  }
}
const ci = class {
  constructor() {
    this._workerTextModelSyncServer = new hu();
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
  async $computeUnicodeHighlights(t, n, i) {
    const r = this._getModel(t);
    return r ? dh.computeUnicodeHighlights(r, n, i) : { ranges: [], hasMore: !1, ambiguousCharacterCount: 0, invisibleCharacterCount: 0, nonBasicAsciiCharacterCount: 0 };
  }
  async $findSectionHeaders(t, n) {
    const i = this._getModel(t);
    return i ? jh(i, n) : [];
  }
  async $computeDiff(t, n, i, r) {
    const a = this._getModel(t), s = this._getModel(n);
    return !a || !s ? null : Mt.computeDiff(a, s, i, r);
  }
  static computeDiff(t, n, i, r) {
    const a = r === "advanced" ? In.getDefault() : In.getLegacy(), s = t.getLinesContent(), l = n.getLinesContent(), o = a.computeDiff(s, l, i), c = o.changes.length > 0 ? !1 : this._modelsAreIdentical(t, n);
    function h(d) {
      return d.map(
        (m) => {
          var p;
          return [m.original.startLineNumber, m.original.endLineNumberExclusive, m.modified.startLineNumber, m.modified.endLineNumberExclusive, (p = m.innerChanges) == null ? void 0 : p.map((_) => [
            _.originalRange.startLineNumber,
            _.originalRange.startColumn,
            _.originalRange.endLineNumber,
            _.originalRange.endColumn,
            _.modifiedRange.startLineNumber,
            _.modifiedRange.startColumn,
            _.modifiedRange.endLineNumber,
            _.modifiedRange.endColumn
          ])];
        }
      );
    }
    return {
      identical: c,
      quitEarly: o.hitTimeout,
      changes: h(o.changes),
      moves: o.moves.map((d) => [
        d.lineRangeMapping.original.startLineNumber,
        d.lineRangeMapping.original.endLineNumberExclusive,
        d.lineRangeMapping.modified.startLineNumber,
        d.lineRangeMapping.modified.endLineNumberExclusive,
        h(d.changes)
      ])
    };
  }
  static _modelsAreIdentical(t, n) {
    const i = t.getLineCount(), r = n.getLineCount();
    if (i !== r)
      return !1;
    for (let a = 1; a <= i; a++) {
      const s = t.getLineContent(a), l = n.getLineContent(a);
      if (s !== l)
        return !1;
    }
    return !0;
  }
  async $computeDirtyDiff(t, n, i) {
    const r = this._getModel(t), a = this._getModel(n);
    if (!r || !a)
      return null;
    const s = r.getLinesContent(), l = a.getLinesContent();
    return new Oo(s, l, {
      shouldComputeCharChanges: !1,
      shouldPostProcessCharChanges: !1,
      shouldIgnoreTrimWhitespace: i,
      shouldMakePrettyDiff: !0,
      maxComputationTime: 1e3
    }).computeDiff().changes;
  }
  async $computeMoreMinimalEdits(t, n, i) {
    const r = this._getModel(t);
    if (!r)
      return n;
    const a = [];
    let s;
    n = n.slice(0).sort((o, c) => {
      if (o.range && c.range)
        return W.compareRangesUsingStarts(o.range, c.range);
      const h = o.range ? 0 : 1, d = c.range ? 0 : 1;
      return h - d;
    });
    let l = 0;
    for (let o = 1; o < n.length; o++)
      W.getEndPosition(n[l].range).equals(W.getStartPosition(n[o].range)) ? (n[l].range = W.fromPositions(W.getStartPosition(n[l].range), W.getEndPosition(n[o].range)), n[l].text += n[o].text) : (l++, n[l] = n[o]);
    n.length = l + 1;
    for (let { range: o, text: c, eol: h } of n) {
      if (typeof h == "number" && (s = h), W.isEmpty(o) && !c)
        continue;
      const d = r.getValueInRange(o);
      if (c = c.replace(/\r\n|\n|\r/g, r.eol), d === c)
        continue;
      if (Math.max(c.length, d.length) > Mt._diffLimit) {
        a.push({ range: o, text: c });
        continue;
      }
      const m = mc(d, c, i), p = r.offsetAt(W.lift(o).getStartPosition());
      for (const _ of m) {
        const b = r.positionAt(p + _.originalStart), S = r.positionAt(p + _.originalStart + _.originalLength), y = {
          text: c.substr(_.modifiedStart, _.modifiedLength),
          range: { startLineNumber: b.lineNumber, startColumn: b.column, endLineNumber: S.lineNumber, endColumn: S.column }
        };
        r.getValueInRange(y.range) !== y.text && a.push(y);
      }
    }
    return typeof s == "number" && a.push({ eol: s, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), a;
  }
  $computeHumanReadableDiff(t, n, i) {
    const r = this._getModel(t);
    if (!r)
      return n;
    const a = [];
    let s;
    n = n.slice(0).sort((l, o) => {
      if (l.range && o.range)
        return W.compareRangesUsingStarts(l.range, o.range);
      const c = l.range ? 0 : 1, h = o.range ? 0 : 1;
      return c - h;
    });
    for (let { range: l, text: o, eol: c } of n) {
      let h = function(y, w) {
        return new G(
          y.lineNumber + w.lineNumber - 1,
          w.lineNumber === 1 ? y.column + w.column - 1 : w.column
        );
      }, d = function(y, w) {
        const x = [];
        for (let C = w.startLineNumber; C <= w.endLineNumber; C++) {
          const I = y[C - 1];
          C === w.startLineNumber && C === w.endLineNumber ? x.push(I.substring(w.startColumn - 1, w.endColumn - 1)) : C === w.startLineNumber ? x.push(I.substring(w.startColumn - 1)) : C === w.endLineNumber ? x.push(I.substring(0, w.endColumn - 1)) : x.push(I);
        }
        return x;
      };
      if (typeof c == "number" && (s = c), W.isEmpty(l) && !o)
        continue;
      const m = r.getValueInRange(l);
      if (o = o.replace(/\r\n|\n|\r/g, r.eol), m === o)
        continue;
      if (Math.max(o.length, m.length) > Mt._diffLimit) {
        a.push({ range: l, text: o });
        continue;
      }
      const p = m.split(/\r\n|\n|\r/), _ = o.split(/\r\n|\n|\r/), b = In.getDefault().computeDiff(p, _, i), S = W.lift(l).getStartPosition();
      for (const y of b.changes)
        if (y.innerChanges)
          for (const w of y.innerChanges)
            a.push({
              range: W.fromPositions(h(S, w.originalRange.getStartPosition()), h(S, w.originalRange.getEndPosition())),
              text: d(_, w.modifiedRange).join(r.eol)
            });
        else
          throw new se("The experimental diff algorithm always produces inner changes");
    }
    return typeof s == "number" && a.push({ eol: s, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), a;
  }
  async $computeLinks(t) {
    const n = this._getModel(t);
    return n ? _c(n) : null;
  }
  async $computeDefaultDocumentColors(t) {
    const n = this._getModel(t);
    return n ? Vh(n) : null;
  }
  async $textualSuggest(t, n, i, r) {
    const a = new Tn(), s = new RegExp(i, r), l = /* @__PURE__ */ new Set();
    e: for (const o of t) {
      const c = this._getModel(o);
      if (c) {
        for (const h of c.words(s))
          if (!(h === n || !isNaN(Number(h))) && (l.add(h), l.size > Mt._suggestionsLimit))
            break e;
      }
    }
    return { words: Array.from(l), duration: a.elapsed() };
  }
  async $computeWordRanges(t, n, i, r) {
    const a = this._getModel(t);
    if (!a)
      return /* @__PURE__ */ Object.create(null);
    const s = new RegExp(i, r), l = /* @__PURE__ */ Object.create(null);
    for (let o = n.startLineNumber; o < n.endLineNumber; o++) {
      const c = a.getLineWords(o, s);
      for (const h of c) {
        if (!isNaN(Number(h.word)))
          continue;
        let d = l[h.word];
        d || (d = [], l[h.word] = d), d.push({
          startLineNumber: o,
          startColumn: h.startColumn,
          endLineNumber: o,
          endColumn: h.endColumn
        });
      }
    }
    return l;
  }
  async $navigateValueSet(t, n, i, r, a) {
    const s = this._getModel(t);
    if (!s)
      return null;
    const l = new RegExp(r, a);
    n.startColumn === n.endColumn && (n = {
      startLineNumber: n.startLineNumber,
      startColumn: n.startColumn,
      endLineNumber: n.endLineNumber,
      endColumn: n.endColumn + 1
    });
    const o = s.getValueInRange(n), c = s.getWordAtPosition({ lineNumber: n.startLineNumber, column: n.startColumn }, l);
    if (!c)
      return null;
    const h = s.getValueInRange(c);
    return wc.INSTANCE.navigateValueSet(n, o, c, h, i);
  }
};
ci._diffLimit = 1e5, ci._suggestionsLimit = 1e4;
let du = ci;
class Mt extends du {
  constructor(t, n) {
    super(), this._host = t, this._foreignModuleFactory = n, this._foreignModule = null;
  }
  async $ping() {
    return "pong";
  }
  $loadForeignModule(t, n, i) {
    const r = {
      host: ih(i, (a, s) => this._host.$fhr(a, s)),
      getMirrorModels: () => this._getModels()
    };
    return this._foreignModuleFactory ? (this._foreignModule = this._foreignModuleFactory(r, n), Promise.resolve(nh(this._foreignModule))) : Promise.reject(new Error("Unexpected usage"));
  }
  $fmr(t, n) {
    if (!this._foreignModule || typeof this._foreignModule[t] != "function")
      return Promise.reject(new Error("Missing requestHandler or method: " + t));
    try {
      return Promise.resolve(this._foreignModule[t].apply(this._foreignModule, n));
    } catch (i) {
      return Promise.reject(i);
    }
  }
}
typeof importScripts == "function" && (globalThis.monaco = Zc());
let hi = !1;
function Fo(e) {
  if (hi)
    return;
  hi = !0;
  const t = new uc((n) => {
    globalThis.postMessage(n);
  }, (n) => new Mt(eh.getChannel(n), e));
  globalThis.onmessage = (n) => {
    t.onmessage(n.data);
  };
}
globalThis.onmessage = (e) => {
  hi || Fo(null);
};
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.52.0(undefined)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
function Me(...e) {
  const t = e[0];
  let n, i, r;
  if (typeof t == "string")
    n = t, i = t, e.splice(0, 1), r = !e || typeof e[0] != "object" ? e : e[0];
  else if (t instanceof Array) {
    const a = e.slice(1);
    if (t.length !== a.length + 1)
      throw new Error("expected a string as the first argument to l10n.t");
    let s = t[0];
    for (let l = 1; l < t.length; l++)
      s += `{${l - 1}}` + t[l];
    return Me(s, ...a);
  } else
    i = t.message, n = i, t.comment && t.comment.length > 0 && (n += `/${Array.isArray(t.comment) ? t.comment.join("") : t.comment}`), r = t.args ?? {};
  return pu(i, r);
}
var mu = /{([^}]+)}/g;
function pu(e, t) {
  return Object.keys(t).length === 0 ? e : e.replace(mu, (n, i) => t[i] ?? n);
}
var Ka;
(function(e) {
  function t(n) {
    return typeof n == "string";
  }
  e.is = t;
})(Ka || (Ka = {}));
var ui;
(function(e) {
  function t(n) {
    return typeof n == "string";
  }
  e.is = t;
})(ui || (ui = {}));
var ja;
(function(e) {
  e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647;
  function t(n) {
    return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
  }
  e.is = t;
})(ja || (ja = {}));
var dn;
(function(e) {
  e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647;
  function t(n) {
    return typeof n == "number" && e.MIN_VALUE <= n && n <= e.MAX_VALUE;
  }
  e.is = t;
})(dn || (dn = {}));
var oe;
(function(e) {
  function t(i, r) {
    return i === Number.MAX_VALUE && (i = dn.MAX_VALUE), r === Number.MAX_VALUE && (r = dn.MAX_VALUE), { line: i, character: r };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.objectLiteral(r) && R.uinteger(r.line) && R.uinteger(r.character);
  }
  e.is = n;
})(oe || (oe = {}));
var X;
(function(e) {
  function t(i, r, a, s) {
    if (R.uinteger(i) && R.uinteger(r) && R.uinteger(a) && R.uinteger(s))
      return { start: oe.create(i, r), end: oe.create(a, s) };
    if (oe.is(i) && oe.is(r))
      return { start: i, end: r };
    throw new Error(`Range#create called with invalid arguments[${i}, ${r}, ${a}, ${s}]`);
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.objectLiteral(r) && oe.is(r.start) && oe.is(r.end);
  }
  e.is = n;
})(X || (X = {}));
var mn;
(function(e) {
  function t(i, r) {
    return { uri: i, range: r };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.objectLiteral(r) && X.is(r.range) && (R.string(r.uri) || R.undefined(r.uri));
  }
  e.is = n;
})(mn || (mn = {}));
var $a;
(function(e) {
  function t(i, r, a, s) {
    return { targetUri: i, targetRange: r, targetSelectionRange: a, originSelectionRange: s };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.objectLiteral(r) && X.is(r.targetRange) && R.string(r.targetUri) && X.is(r.targetSelectionRange) && (X.is(r.originSelectionRange) || R.undefined(r.originSelectionRange));
  }
  e.is = n;
})($a || ($a = {}));
var di;
(function(e) {
  function t(i, r, a, s) {
    return {
      red: i,
      green: r,
      blue: a,
      alpha: s
    };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.objectLiteral(r) && R.numberRange(r.red, 0, 1) && R.numberRange(r.green, 0, 1) && R.numberRange(r.blue, 0, 1) && R.numberRange(r.alpha, 0, 1);
  }
  e.is = n;
})(di || (di = {}));
var Ga;
(function(e) {
  function t(i, r) {
    return {
      range: i,
      color: r
    };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.objectLiteral(r) && X.is(r.range) && di.is(r.color);
  }
  e.is = n;
})(Ga || (Ga = {}));
var Xa;
(function(e) {
  function t(i, r, a) {
    return {
      label: i,
      textEdit: r,
      additionalTextEdits: a
    };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.objectLiteral(r) && R.string(r.label) && (R.undefined(r.textEdit) || ue.is(r)) && (R.undefined(r.additionalTextEdits) || R.typedArray(r.additionalTextEdits, ue.is));
  }
  e.is = n;
})(Xa || (Xa = {}));
var pn;
(function(e) {
  e.Comment = "comment", e.Imports = "imports", e.Region = "region";
})(pn || (pn = {}));
var Ja;
(function(e) {
  function t(i, r, a, s, l, o) {
    const c = {
      startLine: i,
      endLine: r
    };
    return R.defined(a) && (c.startCharacter = a), R.defined(s) && (c.endCharacter = s), R.defined(l) && (c.kind = l), R.defined(o) && (c.collapsedText = o), c;
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.objectLiteral(r) && R.uinteger(r.startLine) && R.uinteger(r.startLine) && (R.undefined(r.startCharacter) || R.uinteger(r.startCharacter)) && (R.undefined(r.endCharacter) || R.uinteger(r.endCharacter)) && (R.undefined(r.kind) || R.string(r.kind));
  }
  e.is = n;
})(Ja || (Ja = {}));
var mi;
(function(e) {
  function t(i, r) {
    return {
      location: i,
      message: r
    };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && mn.is(r.location) && R.string(r.message);
  }
  e.is = n;
})(mi || (mi = {}));
var Ya;
(function(e) {
  e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4;
})(Ya || (Ya = {}));
var Qa;
(function(e) {
  e.Unnecessary = 1, e.Deprecated = 2;
})(Qa || (Qa = {}));
var Za;
(function(e) {
  function t(n) {
    const i = n;
    return R.objectLiteral(i) && R.string(i.href);
  }
  e.is = t;
})(Za || (Za = {}));
var fn;
(function(e) {
  function t(i, r, a, s, l, o) {
    let c = { range: i, message: r };
    return R.defined(a) && (c.severity = a), R.defined(s) && (c.code = s), R.defined(l) && (c.source = l), R.defined(o) && (c.relatedInformation = o), c;
  }
  e.create = t;
  function n(i) {
    var r;
    let a = i;
    return R.defined(a) && X.is(a.range) && R.string(a.message) && (R.number(a.severity) || R.undefined(a.severity)) && (R.integer(a.code) || R.string(a.code) || R.undefined(a.code)) && (R.undefined(a.codeDescription) || R.string((r = a.codeDescription) === null || r === void 0 ? void 0 : r.href)) && (R.string(a.source) || R.undefined(a.source)) && (R.undefined(a.relatedInformation) || R.typedArray(a.relatedInformation, mi.is));
  }
  e.is = n;
})(fn || (fn = {}));
var kt;
(function(e) {
  function t(i, r, ...a) {
    let s = { title: i, command: r };
    return R.defined(a) && a.length > 0 && (s.arguments = a), s;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && R.string(r.title) && R.string(r.command);
  }
  e.is = n;
})(kt || (kt = {}));
var ue;
(function(e) {
  function t(a, s) {
    return { range: a, newText: s };
  }
  e.replace = t;
  function n(a, s) {
    return { range: { start: a, end: a }, newText: s };
  }
  e.insert = n;
  function i(a) {
    return { range: a, newText: "" };
  }
  e.del = i;
  function r(a) {
    const s = a;
    return R.objectLiteral(s) && R.string(s.newText) && X.is(s.range);
  }
  e.is = r;
})(ue || (ue = {}));
var pi;
(function(e) {
  function t(i, r, a) {
    const s = { label: i };
    return r !== void 0 && (s.needsConfirmation = r), a !== void 0 && (s.description = a), s;
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.objectLiteral(r) && R.string(r.label) && (R.boolean(r.needsConfirmation) || r.needsConfirmation === void 0) && (R.string(r.description) || r.description === void 0);
  }
  e.is = n;
})(pi || (pi = {}));
var St;
(function(e) {
  function t(n) {
    const i = n;
    return R.string(i);
  }
  e.is = t;
})(St || (St = {}));
var es;
(function(e) {
  function t(a, s, l) {
    return { range: a, newText: s, annotationId: l };
  }
  e.replace = t;
  function n(a, s, l) {
    return { range: { start: a, end: a }, newText: s, annotationId: l };
  }
  e.insert = n;
  function i(a, s) {
    return { range: a, newText: "", annotationId: s };
  }
  e.del = i;
  function r(a) {
    const s = a;
    return ue.is(s) && (pi.is(s.annotationId) || St.is(s.annotationId));
  }
  e.is = r;
})(es || (es = {}));
var fi;
(function(e) {
  function t(i, r) {
    return { textDocument: i, edits: r };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && vi.is(r.textDocument) && Array.isArray(r.edits);
  }
  e.is = n;
})(fi || (fi = {}));
var gi;
(function(e) {
  function t(i, r, a) {
    let s = {
      kind: "create",
      uri: i
    };
    return r !== void 0 && (r.overwrite !== void 0 || r.ignoreIfExists !== void 0) && (s.options = r), a !== void 0 && (s.annotationId = a), s;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return r && r.kind === "create" && R.string(r.uri) && (r.options === void 0 || (r.options.overwrite === void 0 || R.boolean(r.options.overwrite)) && (r.options.ignoreIfExists === void 0 || R.boolean(r.options.ignoreIfExists))) && (r.annotationId === void 0 || St.is(r.annotationId));
  }
  e.is = n;
})(gi || (gi = {}));
var bi;
(function(e) {
  function t(i, r, a, s) {
    let l = {
      kind: "rename",
      oldUri: i,
      newUri: r
    };
    return a !== void 0 && (a.overwrite !== void 0 || a.ignoreIfExists !== void 0) && (l.options = a), s !== void 0 && (l.annotationId = s), l;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return r && r.kind === "rename" && R.string(r.oldUri) && R.string(r.newUri) && (r.options === void 0 || (r.options.overwrite === void 0 || R.boolean(r.options.overwrite)) && (r.options.ignoreIfExists === void 0 || R.boolean(r.options.ignoreIfExists))) && (r.annotationId === void 0 || St.is(r.annotationId));
  }
  e.is = n;
})(bi || (bi = {}));
var _i;
(function(e) {
  function t(i, r, a) {
    let s = {
      kind: "delete",
      uri: i
    };
    return r !== void 0 && (r.recursive !== void 0 || r.ignoreIfNotExists !== void 0) && (s.options = r), a !== void 0 && (s.annotationId = a), s;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return r && r.kind === "delete" && R.string(r.uri) && (r.options === void 0 || (r.options.recursive === void 0 || R.boolean(r.options.recursive)) && (r.options.ignoreIfNotExists === void 0 || R.boolean(r.options.ignoreIfNotExists))) && (r.annotationId === void 0 || St.is(r.annotationId));
  }
  e.is = n;
})(_i || (_i = {}));
var wi;
(function(e) {
  function t(n) {
    let i = n;
    return i && (i.changes !== void 0 || i.documentChanges !== void 0) && (i.documentChanges === void 0 || i.documentChanges.every((r) => R.string(r.kind) ? gi.is(r) || bi.is(r) || _i.is(r) : fi.is(r)));
  }
  e.is = t;
})(wi || (wi = {}));
var ts;
(function(e) {
  function t(i) {
    return { uri: i };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && R.string(r.uri);
  }
  e.is = n;
})(ts || (ts = {}));
var ns;
(function(e) {
  function t(i, r) {
    return { uri: i, version: r };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && R.string(r.uri) && R.integer(r.version);
  }
  e.is = n;
})(ns || (ns = {}));
var vi;
(function(e) {
  function t(i, r) {
    return { uri: i, version: r };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && R.string(r.uri) && (r.version === null || R.integer(r.version));
  }
  e.is = n;
})(vi || (vi = {}));
var is;
(function(e) {
  function t(i, r, a, s) {
    return { uri: i, languageId: r, version: a, text: s };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && R.string(r.uri) && R.string(r.languageId) && R.integer(r.version) && R.string(r.text);
  }
  e.is = n;
})(is || (is = {}));
var De;
(function(e) {
  e.PlainText = "plaintext", e.Markdown = "markdown";
  function t(n) {
    const i = n;
    return i === e.PlainText || i === e.Markdown;
  }
  e.is = t;
})(De || (De = {}));
var Ft;
(function(e) {
  function t(n) {
    const i = n;
    return R.objectLiteral(n) && De.is(i.kind) && R.string(i.value);
  }
  e.is = t;
})(Ft || (Ft = {}));
var be;
(function(e) {
  e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25;
})(be || (be = {}));
var Ne;
(function(e) {
  e.PlainText = 1, e.Snippet = 2;
})(Ne || (Ne = {}));
var rs;
(function(e) {
  e.Deprecated = 1;
})(rs || (rs = {}));
var as;
(function(e) {
  function t(i, r, a) {
    return { newText: i, insert: r, replace: a };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return r && R.string(r.newText) && X.is(r.insert) && X.is(r.replace);
  }
  e.is = n;
})(as || (as = {}));
var ss;
(function(e) {
  e.asIs = 1, e.adjustIndentation = 2;
})(ss || (ss = {}));
var os;
(function(e) {
  function t(n) {
    const i = n;
    return i && (R.string(i.detail) || i.detail === void 0) && (R.string(i.description) || i.description === void 0);
  }
  e.is = t;
})(os || (os = {}));
var ls;
(function(e) {
  function t(n) {
    return { label: n };
  }
  e.create = t;
})(ls || (ls = {}));
var cs;
(function(e) {
  function t(n, i) {
    return { items: n || [], isIncomplete: !!i };
  }
  e.create = t;
})(cs || (cs = {}));
var gn;
(function(e) {
  function t(i) {
    return i.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  e.fromPlainText = t;
  function n(i) {
    const r = i;
    return R.string(r) || R.objectLiteral(r) && R.string(r.language) && R.string(r.value);
  }
  e.is = n;
})(gn || (gn = {}));
var hs;
(function(e) {
  function t(n) {
    let i = n;
    return !!i && R.objectLiteral(i) && (Ft.is(i.contents) || gn.is(i.contents) || R.typedArray(i.contents, gn.is)) && (n.range === void 0 || X.is(n.range));
  }
  e.is = t;
})(hs || (hs = {}));
var us;
(function(e) {
  function t(n, i) {
    return i ? { label: n, documentation: i } : { label: n };
  }
  e.create = t;
})(us || (us = {}));
var ds;
(function(e) {
  function t(n, i, ...r) {
    let a = { label: n };
    return R.defined(i) && (a.documentation = i), R.defined(r) ? a.parameters = r : a.parameters = [], a;
  }
  e.create = t;
})(ds || (ds = {}));
var bn;
(function(e) {
  e.Text = 1, e.Read = 2, e.Write = 3;
})(bn || (bn = {}));
var ms;
(function(e) {
  function t(n, i) {
    let r = { range: n };
    return R.number(i) && (r.kind = i), r;
  }
  e.create = t;
})(ms || (ms = {}));
var yi;
(function(e) {
  e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26;
})(yi || (yi = {}));
var ps;
(function(e) {
  e.Deprecated = 1;
})(ps || (ps = {}));
var Ti;
(function(e) {
  function t(n, i, r, a, s) {
    let l = {
      name: n,
      kind: i,
      location: { uri: a, range: r }
    };
    return s && (l.containerName = s), l;
  }
  e.create = t;
})(Ti || (Ti = {}));
var fs;
(function(e) {
  function t(n, i, r, a) {
    return a !== void 0 ? { name: n, kind: i, location: { uri: r, range: a } } : { name: n, kind: i, location: { uri: r } };
  }
  e.create = t;
})(fs || (fs = {}));
var ki;
(function(e) {
  function t(i, r, a, s, l, o) {
    let c = {
      name: i,
      detail: r,
      kind: a,
      range: s,
      selectionRange: l
    };
    return o !== void 0 && (c.children = o), c;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return r && R.string(r.name) && R.number(r.kind) && X.is(r.range) && X.is(r.selectionRange) && (r.detail === void 0 || R.string(r.detail)) && (r.deprecated === void 0 || R.boolean(r.deprecated)) && (r.children === void 0 || Array.isArray(r.children)) && (r.tags === void 0 || Array.isArray(r.tags));
  }
  e.is = n;
})(ki || (ki = {}));
var gs;
(function(e) {
  e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll";
})(gs || (gs = {}));
var _n;
(function(e) {
  e.Invoked = 1, e.Automatic = 2;
})(_n || (_n = {}));
var bs;
(function(e) {
  function t(i, r, a) {
    let s = { diagnostics: i };
    return r != null && (s.only = r), a != null && (s.triggerKind = a), s;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && R.typedArray(r.diagnostics, fn.is) && (r.only === void 0 || R.typedArray(r.only, R.string)) && (r.triggerKind === void 0 || r.triggerKind === _n.Invoked || r.triggerKind === _n.Automatic);
  }
  e.is = n;
})(bs || (bs = {}));
var _s;
(function(e) {
  function t(i, r, a) {
    let s = { title: i }, l = !0;
    return typeof r == "string" ? (l = !1, s.kind = r) : kt.is(r) ? s.command = r : s.edit = r, l && a !== void 0 && (s.kind = a), s;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return r && R.string(r.title) && (r.diagnostics === void 0 || R.typedArray(r.diagnostics, fn.is)) && (r.kind === void 0 || R.string(r.kind)) && (r.edit !== void 0 || r.command !== void 0) && (r.command === void 0 || kt.is(r.command)) && (r.isPreferred === void 0 || R.boolean(r.isPreferred)) && (r.edit === void 0 || wi.is(r.edit));
  }
  e.is = n;
})(_s || (_s = {}));
var ws;
(function(e) {
  function t(i, r) {
    let a = { range: i };
    return R.defined(r) && (a.data = r), a;
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && X.is(r.range) && (R.undefined(r.command) || kt.is(r.command));
  }
  e.is = n;
})(ws || (ws = {}));
var vs;
(function(e) {
  function t(i, r) {
    return { tabSize: i, insertSpaces: r };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && R.uinteger(r.tabSize) && R.boolean(r.insertSpaces);
  }
  e.is = n;
})(vs || (vs = {}));
var ys;
(function(e) {
  function t(i, r, a) {
    return { range: i, target: r, data: a };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.defined(r) && X.is(r.range) && (R.undefined(r.target) || R.string(r.target));
  }
  e.is = n;
})(ys || (ys = {}));
var wn;
(function(e) {
  function t(i, r) {
    return { range: i, parent: r };
  }
  e.create = t;
  function n(i) {
    let r = i;
    return R.objectLiteral(r) && X.is(r.range) && (r.parent === void 0 || e.is(r.parent));
  }
  e.is = n;
})(wn || (wn = {}));
var Ts;
(function(e) {
  e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator";
})(Ts || (Ts = {}));
var ks;
(function(e) {
  e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary";
})(ks || (ks = {}));
var Ss;
(function(e) {
  function t(n) {
    const i = n;
    return R.objectLiteral(i) && (i.resultId === void 0 || typeof i.resultId == "string") && Array.isArray(i.data) && (i.data.length === 0 || typeof i.data[0] == "number");
  }
  e.is = t;
})(Ss || (Ss = {}));
var Ls;
(function(e) {
  function t(i, r) {
    return { range: i, text: r };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return r != null && X.is(r.range) && R.string(r.text);
  }
  e.is = n;
})(Ls || (Ls = {}));
var xs;
(function(e) {
  function t(i, r, a) {
    return { range: i, variableName: r, caseSensitiveLookup: a };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return r != null && X.is(r.range) && R.boolean(r.caseSensitiveLookup) && (R.string(r.variableName) || r.variableName === void 0);
  }
  e.is = n;
})(xs || (xs = {}));
var Es;
(function(e) {
  function t(i, r) {
    return { range: i, expression: r };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return r != null && X.is(r.range) && (R.string(r.expression) || r.expression === void 0);
  }
  e.is = n;
})(Es || (Es = {}));
var Cs;
(function(e) {
  function t(i, r) {
    return { frameId: i, stoppedLocation: r };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.defined(r) && X.is(i.stoppedLocation);
  }
  e.is = n;
})(Cs || (Cs = {}));
var Si;
(function(e) {
  e.Type = 1, e.Parameter = 2;
  function t(n) {
    return n === 1 || n === 2;
  }
  e.is = t;
})(Si || (Si = {}));
var Li;
(function(e) {
  function t(i) {
    return { value: i };
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.objectLiteral(r) && (r.tooltip === void 0 || R.string(r.tooltip) || Ft.is(r.tooltip)) && (r.location === void 0 || mn.is(r.location)) && (r.command === void 0 || kt.is(r.command));
  }
  e.is = n;
})(Li || (Li = {}));
var Rs;
(function(e) {
  function t(i, r, a) {
    const s = { position: i, label: r };
    return a !== void 0 && (s.kind = a), s;
  }
  e.create = t;
  function n(i) {
    const r = i;
    return R.objectLiteral(r) && oe.is(r.position) && (R.string(r.label) || R.typedArray(r.label, Li.is)) && (r.kind === void 0 || Si.is(r.kind)) && r.textEdits === void 0 || R.typedArray(r.textEdits, ue.is) && (r.tooltip === void 0 || R.string(r.tooltip) || Ft.is(r.tooltip)) && (r.paddingLeft === void 0 || R.boolean(r.paddingLeft)) && (r.paddingRight === void 0 || R.boolean(r.paddingRight));
  }
  e.is = n;
})(Rs || (Rs = {}));
var As;
(function(e) {
  function t(n) {
    return { kind: "snippet", value: n };
  }
  e.createSnippet = t;
})(As || (As = {}));
var Ns;
(function(e) {
  function t(n, i, r, a) {
    return { insertText: n, filterText: i, range: r, command: a };
  }
  e.create = t;
})(Ns || (Ns = {}));
var Ms;
(function(e) {
  function t(n) {
    return { items: n };
  }
  e.create = t;
})(Ms || (Ms = {}));
var Is;
(function(e) {
  e.Invoked = 0, e.Automatic = 1;
})(Is || (Is = {}));
var Os;
(function(e) {
  function t(n, i) {
    return { range: n, text: i };
  }
  e.create = t;
})(Os || (Os = {}));
var zs;
(function(e) {
  function t(n, i) {
    return { triggerKind: n, selectedCompletionInfo: i };
  }
  e.create = t;
})(zs || (zs = {}));
var Us;
(function(e) {
  function t(n) {
    const i = n;
    return R.objectLiteral(i) && ui.is(i.uri) && R.string(i.name);
  }
  e.is = t;
})(Us || (Us = {}));
var Ps;
(function(e) {
  function t(a, s, l, o) {
    return new fu(a, s, l, o);
  }
  e.create = t;
  function n(a) {
    let s = a;
    return !!(R.defined(s) && R.string(s.uri) && (R.undefined(s.languageId) || R.string(s.languageId)) && R.uinteger(s.lineCount) && R.func(s.getText) && R.func(s.positionAt) && R.func(s.offsetAt));
  }
  e.is = n;
  function i(a, s) {
    let l = a.getText(), o = r(s, (h, d) => {
      let m = h.range.start.line - d.range.start.line;
      return m === 0 ? h.range.start.character - d.range.start.character : m;
    }), c = l.length;
    for (let h = o.length - 1; h >= 0; h--) {
      let d = o[h], m = a.offsetAt(d.range.start), p = a.offsetAt(d.range.end);
      if (p <= c)
        l = l.substring(0, m) + d.newText + l.substring(p, l.length);
      else
        throw new Error("Overlapping edit");
      c = m;
    }
    return l;
  }
  e.applyEdits = i;
  function r(a, s) {
    if (a.length <= 1)
      return a;
    const l = a.length / 2 | 0, o = a.slice(0, l), c = a.slice(l);
    r(o, s), r(c, s);
    let h = 0, d = 0, m = 0;
    for (; h < o.length && d < c.length; )
      s(o[h], c[d]) <= 0 ? a[m++] = o[h++] : a[m++] = c[d++];
    for (; h < o.length; )
      a[m++] = o[h++];
    for (; d < c.length; )
      a[m++] = c[d++];
    return a;
  }
})(Ps || (Ps = {}));
var fu = class {
  constructor(e, t, n, i) {
    this._uri = e, this._languageId = t, this._version = n, this._content = i, this._lineOffsets = void 0;
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
      for (let i = 0; i < t.length; i++) {
        n && (e.push(i), n = !1);
        let r = t.charAt(i);
        n = r === "\r" || r === `
`, r === "\r" && i + 1 < t.length && t.charAt(i + 1) === `
` && i++;
      }
      n && t.length > 0 && e.push(t.length), this._lineOffsets = e;
    }
    return this._lineOffsets;
  }
  positionAt(e) {
    e = Math.max(Math.min(e, this._content.length), 0);
    let t = this.getLineOffsets(), n = 0, i = t.length;
    if (i === 0)
      return oe.create(0, e);
    for (; n < i; ) {
      let a = Math.floor((n + i) / 2);
      t[a] > e ? i = a : n = a + 1;
    }
    let r = n - 1;
    return oe.create(r, e - t[r]);
  }
  offsetAt(e) {
    let t = this.getLineOffsets();
    if (e.line >= t.length)
      return this._content.length;
    if (e.line < 0)
      return 0;
    let n = t[e.line], i = e.line + 1 < t.length ? t[e.line + 1] : this._content.length;
    return Math.max(Math.min(n + e.character, i), n);
  }
  get lineCount() {
    return this.getLineOffsets().length;
  }
}, R;
(function(e) {
  const t = Object.prototype.toString;
  function n(p) {
    return typeof p < "u";
  }
  e.defined = n;
  function i(p) {
    return typeof p > "u";
  }
  e.undefined = i;
  function r(p) {
    return p === !0 || p === !1;
  }
  e.boolean = r;
  function a(p) {
    return t.call(p) === "[object String]";
  }
  e.string = a;
  function s(p) {
    return t.call(p) === "[object Number]";
  }
  e.number = s;
  function l(p, _, b) {
    return t.call(p) === "[object Number]" && _ <= p && p <= b;
  }
  e.numberRange = l;
  function o(p) {
    return t.call(p) === "[object Number]" && -2147483648 <= p && p <= 2147483647;
  }
  e.integer = o;
  function c(p) {
    return t.call(p) === "[object Number]" && 0 <= p && p <= 2147483647;
  }
  e.uinteger = c;
  function h(p) {
    return t.call(p) === "[object Function]";
  }
  e.func = h;
  function d(p) {
    return p !== null && typeof p == "object";
  }
  e.objectLiteral = d;
  function m(p, _) {
    return Array.isArray(p) && p.every(_);
  }
  e.typedArray = m;
})(R || (R = {}));
var Hs = class xi {
  constructor(t, n, i, r) {
    this._uri = t, this._languageId = n, this._version = i, this._content = r, this._lineOffsets = void 0;
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
      const n = this.offsetAt(t.start), i = this.offsetAt(t.end);
      return this._content.substring(n, i);
    }
    return this._content;
  }
  update(t, n) {
    for (let i of t)
      if (xi.isIncremental(i)) {
        const r = Bo(i.range), a = this.offsetAt(r.start), s = this.offsetAt(r.end);
        this._content = this._content.substring(0, a) + i.text + this._content.substring(s, this._content.length);
        const l = Math.max(r.start.line, 0), o = Math.max(r.end.line, 0);
        let c = this._lineOffsets;
        const h = Ds(i.text, !1, a);
        if (o - l === h.length)
          for (let m = 0, p = h.length; m < p; m++)
            c[m + l + 1] = h[m];
        else
          h.length < 1e4 ? c.splice(l + 1, o - l, ...h) : this._lineOffsets = c = c.slice(0, l + 1).concat(h, c.slice(o + 1));
        const d = i.text.length - (s - a);
        if (d !== 0)
          for (let m = l + 1 + h.length, p = c.length; m < p; m++)
            c[m] = c[m] + d;
      } else if (xi.isFull(i))
        this._content = i.text, this._lineOffsets = void 0;
      else
        throw new Error("Unknown change event received");
    this._version = n;
  }
  getLineOffsets() {
    return this._lineOffsets === void 0 && (this._lineOffsets = Ds(this._content, !0)), this._lineOffsets;
  }
  positionAt(t) {
    t = Math.max(Math.min(t, this._content.length), 0);
    let n = this.getLineOffsets(), i = 0, r = n.length;
    if (r === 0)
      return { line: 0, character: t };
    for (; i < r; ) {
      let s = Math.floor((i + r) / 2);
      n[s] > t ? r = s : i = s + 1;
    }
    let a = i - 1;
    return { line: a, character: t - n[a] };
  }
  offsetAt(t) {
    let n = this.getLineOffsets();
    if (t.line >= n.length)
      return this._content.length;
    if (t.line < 0)
      return 0;
    let i = n[t.line], r = t.line + 1 < n.length ? n[t.line + 1] : this._content.length;
    return Math.max(Math.min(i + t.character, r), i);
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
}, Ei;
(function(e) {
  function t(r, a, s, l) {
    return new Hs(r, a, s, l);
  }
  e.create = t;
  function n(r, a, s) {
    if (r instanceof Hs)
      return r.update(a, s), r;
    throw new Error("TextDocument.update: document must be created by TextDocument.create");
  }
  e.update = n;
  function i(r, a) {
    let s = r.getText(), l = Ci(a.map(gu), (h, d) => {
      let m = h.range.start.line - d.range.start.line;
      return m === 0 ? h.range.start.character - d.range.start.character : m;
    }), o = 0;
    const c = [];
    for (const h of l) {
      let d = r.offsetAt(h.range.start);
      if (d < o)
        throw new Error("Overlapping edit");
      d > o && c.push(s.substring(o, d)), h.newText.length && c.push(h.newText), o = r.offsetAt(h.range.end);
    }
    return c.push(s.substr(o)), c.join("");
  }
  e.applyEdits = i;
})(Ei || (Ei = {}));
function Ci(e, t) {
  if (e.length <= 1)
    return e;
  const n = e.length / 2 | 0, i = e.slice(0, n), r = e.slice(n);
  Ci(i, t), Ci(r, t);
  let a = 0, s = 0, l = 0;
  for (; a < i.length && s < r.length; )
    t(i[a], r[s]) <= 0 ? e[l++] = i[a++] : e[l++] = r[s++];
  for (; a < i.length; )
    e[l++] = i[a++];
  for (; s < r.length; )
    e[l++] = r[s++];
  return e;
}
function Ds(e, t, n = 0) {
  const i = t ? [n] : [];
  for (let r = 0; r < e.length; r++) {
    let a = e.charCodeAt(r);
    (a === 13 || a === 10) && (a === 13 && r + 1 < e.length && e.charCodeAt(r + 1) === 10 && r++, i.push(n + r + 1));
  }
  return i;
}
function Bo(e) {
  const t = e.start, n = e.end;
  return t.line > n.line || t.line === n.line && t.character > n.character ? { start: n, end: t } : e;
}
function gu(e) {
  const t = Bo(e.range);
  return t !== e.range ? { newText: e.newText, range: t } : e;
}
var z;
(function(e) {
  e[e.StartCommentTag = 0] = "StartCommentTag", e[e.Comment = 1] = "Comment", e[e.EndCommentTag = 2] = "EndCommentTag", e[e.StartTagOpen = 3] = "StartTagOpen", e[e.StartTagClose = 4] = "StartTagClose", e[e.StartTagSelfClose = 5] = "StartTagSelfClose", e[e.StartTag = 6] = "StartTag", e[e.EndTagOpen = 7] = "EndTagOpen", e[e.EndTagClose = 8] = "EndTagClose", e[e.EndTag = 9] = "EndTag", e[e.DelimiterAssign = 10] = "DelimiterAssign", e[e.AttributeName = 11] = "AttributeName", e[e.AttributeValue = 12] = "AttributeValue", e[e.StartDoctypeTag = 13] = "StartDoctypeTag", e[e.Doctype = 14] = "Doctype", e[e.EndDoctypeTag = 15] = "EndDoctypeTag", e[e.Content = 16] = "Content", e[e.Whitespace = 17] = "Whitespace", e[e.Unknown = 18] = "Unknown", e[e.Script = 19] = "Script", e[e.Styles = 20] = "Styles", e[e.EOS = 21] = "EOS";
})(z || (z = {}));
var B;
(function(e) {
  e[e.WithinContent = 0] = "WithinContent", e[e.AfterOpeningStartTag = 1] = "AfterOpeningStartTag", e[e.AfterOpeningEndTag = 2] = "AfterOpeningEndTag", e[e.WithinDoctype = 3] = "WithinDoctype", e[e.WithinTag = 4] = "WithinTag", e[e.WithinEndTag = 5] = "WithinEndTag", e[e.WithinComment = 6] = "WithinComment", e[e.WithinScriptContent = 7] = "WithinScriptContent", e[e.WithinStyleContent = 8] = "WithinStyleContent", e[e.AfterAttributeName = 9] = "AfterAttributeName", e[e.BeforeAttributeValue = 10] = "BeforeAttributeValue";
})(B || (B = {}));
var Ws;
(function(e) {
  e.LATEST = {
    textDocument: {
      completion: {
        completionItem: {
          documentationFormat: [De.Markdown, De.PlainText]
        }
      },
      hover: {
        contentFormat: [De.Markdown, De.PlainText]
      }
    }
  };
})(Ws || (Ws = {}));
var Ri;
(function(e) {
  e[e.Unknown = 0] = "Unknown", e[e.File = 1] = "File", e[e.Directory = 2] = "Directory", e[e.SymbolicLink = 64] = "SymbolicLink";
})(Ri || (Ri = {}));
var bu = class {
  constructor(e, t) {
    this.source = e, this.len = e.length, this.position = t;
  }
  eos() {
    return this.len <= this.position;
  }
  getSource() {
    return this.source;
  }
  pos() {
    return this.position;
  }
  goBackTo(e) {
    this.position = e;
  }
  goBack(e) {
    this.position -= e;
  }
  advance(e) {
    this.position += e;
  }
  goToEnd() {
    this.position = this.source.length;
  }
  nextChar() {
    return this.source.charCodeAt(this.position++) || 0;
  }
  peekChar(e = 0) {
    return this.source.charCodeAt(this.position + e) || 0;
  }
  advanceIfChar(e) {
    return e === this.source.charCodeAt(this.position) ? (this.position++, !0) : !1;
  }
  advanceIfChars(e) {
    let t;
    if (this.position + e.length > this.source.length)
      return !1;
    for (t = 0; t < e.length; t++)
      if (this.source.charCodeAt(this.position + t) !== e[t])
        return !1;
    return this.advance(t), !0;
  }
  advanceIfRegExp(e) {
    const t = this.source.substr(this.position).match(e);
    return t ? (this.position = this.position + t.index + t[0].length, t[0]) : "";
  }
  advanceUntilRegExp(e) {
    const t = this.source.substr(this.position).match(e);
    return t ? (this.position = this.position + t.index, t[0]) : (this.goToEnd(), "");
  }
  advanceUntilChar(e) {
    for (; this.position < this.source.length; ) {
      if (this.source.charCodeAt(this.position) === e)
        return !0;
      this.advance(1);
    }
    return !1;
  }
  advanceUntilChars(e) {
    for (; this.position + e.length <= this.source.length; ) {
      let t = 0;
      for (; t < e.length && this.source.charCodeAt(this.position + t) === e[t]; t++)
        ;
      if (t === e.length)
        return !0;
      this.advance(1);
    }
    return this.goToEnd(), !1;
  }
  skipWhitespace() {
    return this.advanceWhileChar((e) => e === Su || e === Lu || e === yu || e === ku || e === Tu) > 0;
  }
  advanceWhileChar(e) {
    const t = this.position;
    for (; this.position < this.len && e(this.source.charCodeAt(this.position)); )
      this.position++;
    return this.position - t;
  }
}, qs = 33, dt = 45, Gt = 60, Oe = 62, On = 47, _u = 61, wu = 34, vu = 39, yu = 10, Tu = 13, ku = 12, Su = 32, Lu = 9, xu = {
  "text/x-handlebars-template": !0,
  // Fix for https://github.com/microsoft/vscode/issues/77977
  "text/html": !0
};
function ke(e, t = 0, n = B.WithinContent, i = !1) {
  const r = new bu(e, t);
  let a = n, s = 0, l = z.Unknown, o, c, h, d, m;
  function p() {
    return r.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase();
  }
  function _() {
    return r.advanceIfRegExp(/^[^\s"'></=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase();
  }
  function b(w, x, C) {
    return l = x, s = w, o = C, x;
  }
  function S() {
    const w = r.pos(), x = a, C = y();
    return C !== z.EOS && w === r.pos() && !(i && (C === z.StartTagClose || C === z.EndTagClose)) ? (console.warn("Scanner.scan has not advanced at offset " + w + ", state before: " + x + " after: " + a), r.advance(1), b(w, z.Unknown)) : C;
  }
  function y() {
    const w = r.pos();
    if (r.eos())
      return b(w, z.EOS);
    let x;
    switch (a) {
      case B.WithinComment:
        return r.advanceIfChars([dt, dt, Oe]) ? (a = B.WithinContent, b(w, z.EndCommentTag)) : (r.advanceUntilChars([dt, dt, Oe]), b(w, z.Comment));
      case B.WithinDoctype:
        return r.advanceIfChar(Oe) ? (a = B.WithinContent, b(w, z.EndDoctypeTag)) : (r.advanceUntilChar(Oe), b(w, z.Doctype));
      case B.WithinContent:
        if (r.advanceIfChar(Gt)) {
          if (!r.eos() && r.peekChar() === qs) {
            if (r.advanceIfChars([qs, dt, dt]))
              return a = B.WithinComment, b(w, z.StartCommentTag);
            if (r.advanceIfRegExp(/^!doctype/i))
              return a = B.WithinDoctype, b(w, z.StartDoctypeTag);
          }
          return r.advanceIfChar(On) ? (a = B.AfterOpeningEndTag, b(w, z.EndTagOpen)) : (a = B.AfterOpeningStartTag, b(w, z.StartTagOpen));
        }
        return r.advanceUntilChar(Gt), b(w, z.Content);
      case B.AfterOpeningEndTag:
        return p().length > 0 ? (a = B.WithinEndTag, b(w, z.EndTag)) : r.skipWhitespace() ? b(w, z.Whitespace, Me("Tag name must directly follow the open bracket.")) : (a = B.WithinEndTag, r.advanceUntilChar(Oe), w < r.pos() ? b(w, z.Unknown, Me("End tag name expected.")) : y());
      case B.WithinEndTag:
        if (r.skipWhitespace())
          return b(w, z.Whitespace);
        if (r.advanceIfChar(Oe))
          return a = B.WithinContent, b(w, z.EndTagClose);
        if (i && r.peekChar() === Gt)
          return a = B.WithinContent, b(w, z.EndTagClose, Me("Closing bracket missing."));
        x = Me("Closing bracket expected.");
        break;
      case B.AfterOpeningStartTag:
        return h = p(), m = void 0, d = void 0, h.length > 0 ? (c = !1, a = B.WithinTag, b(w, z.StartTag)) : r.skipWhitespace() ? b(w, z.Whitespace, Me("Tag name must directly follow the open bracket.")) : (a = B.WithinTag, r.advanceUntilChar(Oe), w < r.pos() ? b(w, z.Unknown, Me("Start tag name expected.")) : y());
      case B.WithinTag:
        return r.skipWhitespace() ? (c = !0, b(w, z.Whitespace)) : c && (d = _(), d.length > 0) ? (a = B.AfterAttributeName, c = !1, b(w, z.AttributeName)) : r.advanceIfChars([On, Oe]) ? (a = B.WithinContent, b(w, z.StartTagSelfClose)) : r.advanceIfChar(Oe) ? (h === "script" ? m && xu[m] ? a = B.WithinContent : a = B.WithinScriptContent : h === "style" ? a = B.WithinStyleContent : a = B.WithinContent, b(w, z.StartTagClose)) : i && r.peekChar() === Gt ? (a = B.WithinContent, b(w, z.StartTagClose, Me("Closing bracket missing."))) : (r.advance(1), b(w, z.Unknown, Me("Unexpected character in tag.")));
      case B.AfterAttributeName:
        return r.skipWhitespace() ? (c = !0, b(w, z.Whitespace)) : r.advanceIfChar(_u) ? (a = B.BeforeAttributeValue, b(w, z.DelimiterAssign)) : (a = B.WithinTag, y());
      case B.BeforeAttributeValue:
        if (r.skipWhitespace())
          return b(w, z.Whitespace);
        let C = r.advanceIfRegExp(/^[^\s"'`=<>]+/);
        if (C.length > 0 && (r.peekChar() === Oe && r.peekChar(-1) === On && (r.goBack(1), C = C.substring(0, C.length - 1)), d === "type" && (m = C), C.length > 0))
          return a = B.WithinTag, c = !1, b(w, z.AttributeValue);
        const I = r.peekChar();
        return I === vu || I === wu ? (r.advance(1), r.advanceUntilChar(I) && r.advance(1), d === "type" && (m = r.getSource().substring(w + 1, r.pos() - 1)), a = B.WithinTag, c = !1, b(w, z.AttributeValue)) : (a = B.WithinTag, c = !1, y());
      case B.WithinScriptContent:
        let N = 1;
        for (; !r.eos(); ) {
          const g = r.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i);
          if (g.length === 0)
            return r.goToEnd(), b(w, z.Script);
          if (g === "<!--")
            N === 1 && (N = 2);
          else if (g === "-->")
            N = 1;
          else if (g[1] !== "/")
            N === 2 && (N = 3);
          else if (N === 3)
            N = 2;
          else {
            r.goBack(g.length);
            break;
          }
        }
        return a = B.WithinContent, w < r.pos() ? b(w, z.Script) : y();
      case B.WithinStyleContent:
        return r.advanceUntilRegExp(/<\/style/i), a = B.WithinContent, w < r.pos() ? b(w, z.Styles) : y();
    }
    return r.advance(1), a = B.WithinContent, b(w, z.Unknown, x);
  }
  return {
    scan: S,
    getTokenType: () => l,
    getTokenOffset: () => s,
    getTokenLength: () => r.pos() - s,
    getTokenEnd: () => r.pos(),
    getTokenText: () => r.getSource().substring(s, r.pos()),
    getScannerState: () => a,
    getTokenError: () => o
  };
}
function Fs(e, t) {
  let n = 0, i = e.length;
  if (i === 0)
    return 0;
  for (; n < i; ) {
    let r = Math.floor((n + i) / 2);
    t(e[r]) ? i = r : n = r + 1;
  }
  return n;
}
function Eu(e, t, n) {
  let i = 0, r = e.length - 1;
  for (; i <= r; ) {
    const a = (i + r) / 2 | 0, s = n(e[a], t);
    if (s < 0)
      i = a + 1;
    else if (s > 0)
      r = a - 1;
    else
      return a;
  }
  return -(i + 1);
}
var Bs = class {
  get attributeNames() {
    return this.attributes ? Object.keys(this.attributes) : [];
  }
  constructor(e, t, n, i) {
    this.start = e, this.end = t, this.children = n, this.parent = i, this.closed = !1;
  }
  isSameTag(e) {
    return this.tag === void 0 ? e === void 0 : e !== void 0 && this.tag.length === e.length && this.tag.toLowerCase() === e;
  }
  get firstChild() {
    return this.children[0];
  }
  get lastChild() {
    return this.children.length ? this.children[this.children.length - 1] : void 0;
  }
  findNodeBefore(e) {
    const t = Fs(this.children, (n) => e <= n.start) - 1;
    if (t >= 0) {
      const n = this.children[t];
      if (e > n.start) {
        if (e < n.end)
          return n.findNodeBefore(e);
        const i = n.lastChild;
        return i && i.end === n.end ? n.findNodeBefore(e) : n;
      }
    }
    return this;
  }
  findNodeAt(e) {
    const t = Fs(this.children, (n) => e <= n.start) - 1;
    if (t >= 0) {
      const n = this.children[t];
      if (e > n.start && e <= n.end)
        return n.findNodeAt(e);
    }
    return this;
  }
}, Cu = class {
  constructor(e) {
    this.dataManager = e;
  }
  parseDocument(e) {
    return this.parse(e.getText(), this.dataManager.getVoidElements(e.languageId));
  }
  parse(e, t) {
    const n = ke(e, void 0, void 0, !0), i = new Bs(0, e.length, [], void 0);
    let r = i, a = -1, s, l = null, o = n.scan();
    for (; o !== z.EOS; ) {
      switch (o) {
        case z.StartTagOpen:
          const c = new Bs(n.getTokenOffset(), e.length, [], r);
          r.children.push(c), r = c;
          break;
        case z.StartTag:
          r.tag = n.getTokenText();
          break;
        case z.StartTagClose:
          r.parent && (r.end = n.getTokenEnd(), n.getTokenLength() ? (r.startTagEnd = n.getTokenEnd(), r.tag && this.dataManager.isVoidElement(r.tag, t) && (r.closed = !0, r = r.parent)) : r = r.parent);
          break;
        case z.StartTagSelfClose:
          r.parent && (r.closed = !0, r.end = n.getTokenEnd(), r.startTagEnd = n.getTokenEnd(), r = r.parent);
          break;
        case z.EndTagOpen:
          a = n.getTokenOffset(), s = void 0;
          break;
        case z.EndTag:
          s = n.getTokenText().toLowerCase();
          break;
        case z.EndTagClose:
          let h = r;
          for (; !h.isSameTag(s) && h.parent; )
            h = h.parent;
          if (h.parent) {
            for (; r !== h; )
              r.end = a, r.closed = !1, r = r.parent;
            r.closed = !0, r.endTagStart = a, r.end = n.getTokenEnd(), r = r.parent;
          }
          break;
        case z.AttributeName: {
          l = n.getTokenText();
          let d = r.attributes;
          d || (r.attributes = d = {}), d[l] = null;
          break;
        }
        case z.AttributeValue: {
          const d = n.getTokenText(), m = r.attributes;
          m && l && (m[l] = d, l = null);
          break;
        }
      }
      o = n.scan();
    }
    for (; r.parent; )
      r.end = e.length, r.closed = !1, r = r.parent;
    return {
      roots: i.children,
      findNodeBefore: i.findNodeBefore.bind(i),
      findNodeAt: i.findNodeAt.bind(i)
    };
  }
}, Ht = {
  "Aacute;": "Á",
  Aacute: "Á",
  "aacute;": "á",
  aacute: "á",
  "Abreve;": "Ă",
  "abreve;": "ă",
  "ac;": "∾",
  "acd;": "∿",
  "acE;": "∾̳",
  "Acirc;": "Â",
  Acirc: "Â",
  "acirc;": "â",
  acirc: "â",
  "acute;": "´",
  acute: "´",
  "Acy;": "А",
  "acy;": "а",
  "AElig;": "Æ",
  AElig: "Æ",
  "aelig;": "æ",
  aelig: "æ",
  "af;": "⁡",
  "Afr;": "𝔄",
  "afr;": "𝔞",
  "Agrave;": "À",
  Agrave: "À",
  "agrave;": "à",
  agrave: "à",
  "alefsym;": "ℵ",
  "aleph;": "ℵ",
  "Alpha;": "Α",
  "alpha;": "α",
  "Amacr;": "Ā",
  "amacr;": "ā",
  "amalg;": "⨿",
  "AMP;": "&",
  AMP: "&",
  "amp;": "&",
  amp: "&",
  "And;": "⩓",
  "and;": "∧",
  "andand;": "⩕",
  "andd;": "⩜",
  "andslope;": "⩘",
  "andv;": "⩚",
  "ang;": "∠",
  "ange;": "⦤",
  "angle;": "∠",
  "angmsd;": "∡",
  "angmsdaa;": "⦨",
  "angmsdab;": "⦩",
  "angmsdac;": "⦪",
  "angmsdad;": "⦫",
  "angmsdae;": "⦬",
  "angmsdaf;": "⦭",
  "angmsdag;": "⦮",
  "angmsdah;": "⦯",
  "angrt;": "∟",
  "angrtvb;": "⊾",
  "angrtvbd;": "⦝",
  "angsph;": "∢",
  "angst;": "Å",
  "angzarr;": "⍼",
  "Aogon;": "Ą",
  "aogon;": "ą",
  "Aopf;": "𝔸",
  "aopf;": "𝕒",
  "ap;": "≈",
  "apacir;": "⩯",
  "apE;": "⩰",
  "ape;": "≊",
  "apid;": "≋",
  "apos;": "'",
  "ApplyFunction;": "⁡",
  "approx;": "≈",
  "approxeq;": "≊",
  "Aring;": "Å",
  Aring: "Å",
  "aring;": "å",
  aring: "å",
  "Ascr;": "𝒜",
  "ascr;": "𝒶",
  "Assign;": "≔",
  "ast;": "*",
  "asymp;": "≈",
  "asympeq;": "≍",
  "Atilde;": "Ã",
  Atilde: "Ã",
  "atilde;": "ã",
  atilde: "ã",
  "Auml;": "Ä",
  Auml: "Ä",
  "auml;": "ä",
  auml: "ä",
  "awconint;": "∳",
  "awint;": "⨑",
  "backcong;": "≌",
  "backepsilon;": "϶",
  "backprime;": "‵",
  "backsim;": "∽",
  "backsimeq;": "⋍",
  "Backslash;": "∖",
  "Barv;": "⫧",
  "barvee;": "⊽",
  "Barwed;": "⌆",
  "barwed;": "⌅",
  "barwedge;": "⌅",
  "bbrk;": "⎵",
  "bbrktbrk;": "⎶",
  "bcong;": "≌",
  "Bcy;": "Б",
  "bcy;": "б",
  "bdquo;": "„",
  "becaus;": "∵",
  "Because;": "∵",
  "because;": "∵",
  "bemptyv;": "⦰",
  "bepsi;": "϶",
  "bernou;": "ℬ",
  "Bernoullis;": "ℬ",
  "Beta;": "Β",
  "beta;": "β",
  "beth;": "ℶ",
  "between;": "≬",
  "Bfr;": "𝔅",
  "bfr;": "𝔟",
  "bigcap;": "⋂",
  "bigcirc;": "◯",
  "bigcup;": "⋃",
  "bigodot;": "⨀",
  "bigoplus;": "⨁",
  "bigotimes;": "⨂",
  "bigsqcup;": "⨆",
  "bigstar;": "★",
  "bigtriangledown;": "▽",
  "bigtriangleup;": "△",
  "biguplus;": "⨄",
  "bigvee;": "⋁",
  "bigwedge;": "⋀",
  "bkarow;": "⤍",
  "blacklozenge;": "⧫",
  "blacksquare;": "▪",
  "blacktriangle;": "▴",
  "blacktriangledown;": "▾",
  "blacktriangleleft;": "◂",
  "blacktriangleright;": "▸",
  "blank;": "␣",
  "blk12;": "▒",
  "blk14;": "░",
  "blk34;": "▓",
  "block;": "█",
  "bne;": "=⃥",
  "bnequiv;": "≡⃥",
  "bNot;": "⫭",
  "bnot;": "⌐",
  "Bopf;": "𝔹",
  "bopf;": "𝕓",
  "bot;": "⊥",
  "bottom;": "⊥",
  "bowtie;": "⋈",
  "boxbox;": "⧉",
  "boxDL;": "╗",
  "boxDl;": "╖",
  "boxdL;": "╕",
  "boxdl;": "┐",
  "boxDR;": "╔",
  "boxDr;": "╓",
  "boxdR;": "╒",
  "boxdr;": "┌",
  "boxH;": "═",
  "boxh;": "─",
  "boxHD;": "╦",
  "boxHd;": "╤",
  "boxhD;": "╥",
  "boxhd;": "┬",
  "boxHU;": "╩",
  "boxHu;": "╧",
  "boxhU;": "╨",
  "boxhu;": "┴",
  "boxminus;": "⊟",
  "boxplus;": "⊞",
  "boxtimes;": "⊠",
  "boxUL;": "╝",
  "boxUl;": "╜",
  "boxuL;": "╛",
  "boxul;": "┘",
  "boxUR;": "╚",
  "boxUr;": "╙",
  "boxuR;": "╘",
  "boxur;": "└",
  "boxV;": "║",
  "boxv;": "│",
  "boxVH;": "╬",
  "boxVh;": "╫",
  "boxvH;": "╪",
  "boxvh;": "┼",
  "boxVL;": "╣",
  "boxVl;": "╢",
  "boxvL;": "╡",
  "boxvl;": "┤",
  "boxVR;": "╠",
  "boxVr;": "╟",
  "boxvR;": "╞",
  "boxvr;": "├",
  "bprime;": "‵",
  "Breve;": "˘",
  "breve;": "˘",
  "brvbar;": "¦",
  brvbar: "¦",
  "Bscr;": "ℬ",
  "bscr;": "𝒷",
  "bsemi;": "⁏",
  "bsim;": "∽",
  "bsime;": "⋍",
  "bsol;": "\\",
  "bsolb;": "⧅",
  "bsolhsub;": "⟈",
  "bull;": "•",
  "bullet;": "•",
  "bump;": "≎",
  "bumpE;": "⪮",
  "bumpe;": "≏",
  "Bumpeq;": "≎",
  "bumpeq;": "≏",
  "Cacute;": "Ć",
  "cacute;": "ć",
  "Cap;": "⋒",
  "cap;": "∩",
  "capand;": "⩄",
  "capbrcup;": "⩉",
  "capcap;": "⩋",
  "capcup;": "⩇",
  "capdot;": "⩀",
  "CapitalDifferentialD;": "ⅅ",
  "caps;": "∩︀",
  "caret;": "⁁",
  "caron;": "ˇ",
  "Cayleys;": "ℭ",
  "ccaps;": "⩍",
  "Ccaron;": "Č",
  "ccaron;": "č",
  "Ccedil;": "Ç",
  Ccedil: "Ç",
  "ccedil;": "ç",
  ccedil: "ç",
  "Ccirc;": "Ĉ",
  "ccirc;": "ĉ",
  "Cconint;": "∰",
  "ccups;": "⩌",
  "ccupssm;": "⩐",
  "Cdot;": "Ċ",
  "cdot;": "ċ",
  "cedil;": "¸",
  cedil: "¸",
  "Cedilla;": "¸",
  "cemptyv;": "⦲",
  "cent;": "¢",
  cent: "¢",
  "CenterDot;": "·",
  "centerdot;": "·",
  "Cfr;": "ℭ",
  "cfr;": "𝔠",
  "CHcy;": "Ч",
  "chcy;": "ч",
  "check;": "✓",
  "checkmark;": "✓",
  "Chi;": "Χ",
  "chi;": "χ",
  "cir;": "○",
  "circ;": "ˆ",
  "circeq;": "≗",
  "circlearrowleft;": "↺",
  "circlearrowright;": "↻",
  "circledast;": "⊛",
  "circledcirc;": "⊚",
  "circleddash;": "⊝",
  "CircleDot;": "⊙",
  "circledR;": "®",
  "circledS;": "Ⓢ",
  "CircleMinus;": "⊖",
  "CirclePlus;": "⊕",
  "CircleTimes;": "⊗",
  "cirE;": "⧃",
  "cire;": "≗",
  "cirfnint;": "⨐",
  "cirmid;": "⫯",
  "cirscir;": "⧂",
  "ClockwiseContourIntegral;": "∲",
  "CloseCurlyDoubleQuote;": "”",
  "CloseCurlyQuote;": "’",
  "clubs;": "♣",
  "clubsuit;": "♣",
  "Colon;": "∷",
  "colon;": ":",
  "Colone;": "⩴",
  "colone;": "≔",
  "coloneq;": "≔",
  "comma;": ",",
  "commat;": "@",
  "comp;": "∁",
  "compfn;": "∘",
  "complement;": "∁",
  "complexes;": "ℂ",
  "cong;": "≅",
  "congdot;": "⩭",
  "Congruent;": "≡",
  "Conint;": "∯",
  "conint;": "∮",
  "ContourIntegral;": "∮",
  "Copf;": "ℂ",
  "copf;": "𝕔",
  "coprod;": "∐",
  "Coproduct;": "∐",
  "COPY;": "©",
  COPY: "©",
  "copy;": "©",
  copy: "©",
  "copysr;": "℗",
  "CounterClockwiseContourIntegral;": "∳",
  "crarr;": "↵",
  "Cross;": "⨯",
  "cross;": "✗",
  "Cscr;": "𝒞",
  "cscr;": "𝒸",
  "csub;": "⫏",
  "csube;": "⫑",
  "csup;": "⫐",
  "csupe;": "⫒",
  "ctdot;": "⋯",
  "cudarrl;": "⤸",
  "cudarrr;": "⤵",
  "cuepr;": "⋞",
  "cuesc;": "⋟",
  "cularr;": "↶",
  "cularrp;": "⤽",
  "Cup;": "⋓",
  "cup;": "∪",
  "cupbrcap;": "⩈",
  "CupCap;": "≍",
  "cupcap;": "⩆",
  "cupcup;": "⩊",
  "cupdot;": "⊍",
  "cupor;": "⩅",
  "cups;": "∪︀",
  "curarr;": "↷",
  "curarrm;": "⤼",
  "curlyeqprec;": "⋞",
  "curlyeqsucc;": "⋟",
  "curlyvee;": "⋎",
  "curlywedge;": "⋏",
  "curren;": "¤",
  curren: "¤",
  "curvearrowleft;": "↶",
  "curvearrowright;": "↷",
  "cuvee;": "⋎",
  "cuwed;": "⋏",
  "cwconint;": "∲",
  "cwint;": "∱",
  "cylcty;": "⌭",
  "Dagger;": "‡",
  "dagger;": "†",
  "daleth;": "ℸ",
  "Darr;": "↡",
  "dArr;": "⇓",
  "darr;": "↓",
  "dash;": "‐",
  "Dashv;": "⫤",
  "dashv;": "⊣",
  "dbkarow;": "⤏",
  "dblac;": "˝",
  "Dcaron;": "Ď",
  "dcaron;": "ď",
  "Dcy;": "Д",
  "dcy;": "д",
  "DD;": "ⅅ",
  "dd;": "ⅆ",
  "ddagger;": "‡",
  "ddarr;": "⇊",
  "DDotrahd;": "⤑",
  "ddotseq;": "⩷",
  "deg;": "°",
  deg: "°",
  "Del;": "∇",
  "Delta;": "Δ",
  "delta;": "δ",
  "demptyv;": "⦱",
  "dfisht;": "⥿",
  "Dfr;": "𝔇",
  "dfr;": "𝔡",
  "dHar;": "⥥",
  "dharl;": "⇃",
  "dharr;": "⇂",
  "DiacriticalAcute;": "´",
  "DiacriticalDot;": "˙",
  "DiacriticalDoubleAcute;": "˝",
  "DiacriticalGrave;": "`",
  "DiacriticalTilde;": "˜",
  "diam;": "⋄",
  "Diamond;": "⋄",
  "diamond;": "⋄",
  "diamondsuit;": "♦",
  "diams;": "♦",
  "die;": "¨",
  "DifferentialD;": "ⅆ",
  "digamma;": "ϝ",
  "disin;": "⋲",
  "div;": "÷",
  "divide;": "÷",
  divide: "÷",
  "divideontimes;": "⋇",
  "divonx;": "⋇",
  "DJcy;": "Ђ",
  "djcy;": "ђ",
  "dlcorn;": "⌞",
  "dlcrop;": "⌍",
  "dollar;": "$",
  "Dopf;": "𝔻",
  "dopf;": "𝕕",
  "Dot;": "¨",
  "dot;": "˙",
  "DotDot;": "⃜",
  "doteq;": "≐",
  "doteqdot;": "≑",
  "DotEqual;": "≐",
  "dotminus;": "∸",
  "dotplus;": "∔",
  "dotsquare;": "⊡",
  "doublebarwedge;": "⌆",
  "DoubleContourIntegral;": "∯",
  "DoubleDot;": "¨",
  "DoubleDownArrow;": "⇓",
  "DoubleLeftArrow;": "⇐",
  "DoubleLeftRightArrow;": "⇔",
  "DoubleLeftTee;": "⫤",
  "DoubleLongLeftArrow;": "⟸",
  "DoubleLongLeftRightArrow;": "⟺",
  "DoubleLongRightArrow;": "⟹",
  "DoubleRightArrow;": "⇒",
  "DoubleRightTee;": "⊨",
  "DoubleUpArrow;": "⇑",
  "DoubleUpDownArrow;": "⇕",
  "DoubleVerticalBar;": "∥",
  "DownArrow;": "↓",
  "Downarrow;": "⇓",
  "downarrow;": "↓",
  "DownArrowBar;": "⤓",
  "DownArrowUpArrow;": "⇵",
  "DownBreve;": "̑",
  "downdownarrows;": "⇊",
  "downharpoonleft;": "⇃",
  "downharpoonright;": "⇂",
  "DownLeftRightVector;": "⥐",
  "DownLeftTeeVector;": "⥞",
  "DownLeftVector;": "↽",
  "DownLeftVectorBar;": "⥖",
  "DownRightTeeVector;": "⥟",
  "DownRightVector;": "⇁",
  "DownRightVectorBar;": "⥗",
  "DownTee;": "⊤",
  "DownTeeArrow;": "↧",
  "drbkarow;": "⤐",
  "drcorn;": "⌟",
  "drcrop;": "⌌",
  "Dscr;": "𝒟",
  "dscr;": "𝒹",
  "DScy;": "Ѕ",
  "dscy;": "ѕ",
  "dsol;": "⧶",
  "Dstrok;": "Đ",
  "dstrok;": "đ",
  "dtdot;": "⋱",
  "dtri;": "▿",
  "dtrif;": "▾",
  "duarr;": "⇵",
  "duhar;": "⥯",
  "dwangle;": "⦦",
  "DZcy;": "Џ",
  "dzcy;": "џ",
  "dzigrarr;": "⟿",
  "Eacute;": "É",
  Eacute: "É",
  "eacute;": "é",
  eacute: "é",
  "easter;": "⩮",
  "Ecaron;": "Ě",
  "ecaron;": "ě",
  "ecir;": "≖",
  "Ecirc;": "Ê",
  Ecirc: "Ê",
  "ecirc;": "ê",
  ecirc: "ê",
  "ecolon;": "≕",
  "Ecy;": "Э",
  "ecy;": "э",
  "eDDot;": "⩷",
  "Edot;": "Ė",
  "eDot;": "≑",
  "edot;": "ė",
  "ee;": "ⅇ",
  "efDot;": "≒",
  "Efr;": "𝔈",
  "efr;": "𝔢",
  "eg;": "⪚",
  "Egrave;": "È",
  Egrave: "È",
  "egrave;": "è",
  egrave: "è",
  "egs;": "⪖",
  "egsdot;": "⪘",
  "el;": "⪙",
  "Element;": "∈",
  "elinters;": "⏧",
  "ell;": "ℓ",
  "els;": "⪕",
  "elsdot;": "⪗",
  "Emacr;": "Ē",
  "emacr;": "ē",
  "empty;": "∅",
  "emptyset;": "∅",
  "EmptySmallSquare;": "◻",
  "emptyv;": "∅",
  "EmptyVerySmallSquare;": "▫",
  "emsp;": " ",
  "emsp13;": " ",
  "emsp14;": " ",
  "ENG;": "Ŋ",
  "eng;": "ŋ",
  "ensp;": " ",
  "Eogon;": "Ę",
  "eogon;": "ę",
  "Eopf;": "𝔼",
  "eopf;": "𝕖",
  "epar;": "⋕",
  "eparsl;": "⧣",
  "eplus;": "⩱",
  "epsi;": "ε",
  "Epsilon;": "Ε",
  "epsilon;": "ε",
  "epsiv;": "ϵ",
  "eqcirc;": "≖",
  "eqcolon;": "≕",
  "eqsim;": "≂",
  "eqslantgtr;": "⪖",
  "eqslantless;": "⪕",
  "Equal;": "⩵",
  "equals;": "=",
  "EqualTilde;": "≂",
  "equest;": "≟",
  "Equilibrium;": "⇌",
  "equiv;": "≡",
  "equivDD;": "⩸",
  "eqvparsl;": "⧥",
  "erarr;": "⥱",
  "erDot;": "≓",
  "Escr;": "ℰ",
  "escr;": "ℯ",
  "esdot;": "≐",
  "Esim;": "⩳",
  "esim;": "≂",
  "Eta;": "Η",
  "eta;": "η",
  "ETH;": "Ð",
  ETH: "Ð",
  "eth;": "ð",
  eth: "ð",
  "Euml;": "Ë",
  Euml: "Ë",
  "euml;": "ë",
  euml: "ë",
  "euro;": "€",
  "excl;": "!",
  "exist;": "∃",
  "Exists;": "∃",
  "expectation;": "ℰ",
  "ExponentialE;": "ⅇ",
  "exponentiale;": "ⅇ",
  "fallingdotseq;": "≒",
  "Fcy;": "Ф",
  "fcy;": "ф",
  "female;": "♀",
  "ffilig;": "ﬃ",
  "fflig;": "ﬀ",
  "ffllig;": "ﬄ",
  "Ffr;": "𝔉",
  "ffr;": "𝔣",
  "filig;": "ﬁ",
  "FilledSmallSquare;": "◼",
  "FilledVerySmallSquare;": "▪",
  "fjlig;": "fj",
  "flat;": "♭",
  "fllig;": "ﬂ",
  "fltns;": "▱",
  "fnof;": "ƒ",
  "Fopf;": "𝔽",
  "fopf;": "𝕗",
  "ForAll;": "∀",
  "forall;": "∀",
  "fork;": "⋔",
  "forkv;": "⫙",
  "Fouriertrf;": "ℱ",
  "fpartint;": "⨍",
  "frac12;": "½",
  frac12: "½",
  "frac13;": "⅓",
  "frac14;": "¼",
  frac14: "¼",
  "frac15;": "⅕",
  "frac16;": "⅙",
  "frac18;": "⅛",
  "frac23;": "⅔",
  "frac25;": "⅖",
  "frac34;": "¾",
  frac34: "¾",
  "frac35;": "⅗",
  "frac38;": "⅜",
  "frac45;": "⅘",
  "frac56;": "⅚",
  "frac58;": "⅝",
  "frac78;": "⅞",
  "frasl;": "⁄",
  "frown;": "⌢",
  "Fscr;": "ℱ",
  "fscr;": "𝒻",
  "gacute;": "ǵ",
  "Gamma;": "Γ",
  "gamma;": "γ",
  "Gammad;": "Ϝ",
  "gammad;": "ϝ",
  "gap;": "⪆",
  "Gbreve;": "Ğ",
  "gbreve;": "ğ",
  "Gcedil;": "Ģ",
  "Gcirc;": "Ĝ",
  "gcirc;": "ĝ",
  "Gcy;": "Г",
  "gcy;": "г",
  "Gdot;": "Ġ",
  "gdot;": "ġ",
  "gE;": "≧",
  "ge;": "≥",
  "gEl;": "⪌",
  "gel;": "⋛",
  "geq;": "≥",
  "geqq;": "≧",
  "geqslant;": "⩾",
  "ges;": "⩾",
  "gescc;": "⪩",
  "gesdot;": "⪀",
  "gesdoto;": "⪂",
  "gesdotol;": "⪄",
  "gesl;": "⋛︀",
  "gesles;": "⪔",
  "Gfr;": "𝔊",
  "gfr;": "𝔤",
  "Gg;": "⋙",
  "gg;": "≫",
  "ggg;": "⋙",
  "gimel;": "ℷ",
  "GJcy;": "Ѓ",
  "gjcy;": "ѓ",
  "gl;": "≷",
  "gla;": "⪥",
  "glE;": "⪒",
  "glj;": "⪤",
  "gnap;": "⪊",
  "gnapprox;": "⪊",
  "gnE;": "≩",
  "gne;": "⪈",
  "gneq;": "⪈",
  "gneqq;": "≩",
  "gnsim;": "⋧",
  "Gopf;": "𝔾",
  "gopf;": "𝕘",
  "grave;": "`",
  "GreaterEqual;": "≥",
  "GreaterEqualLess;": "⋛",
  "GreaterFullEqual;": "≧",
  "GreaterGreater;": "⪢",
  "GreaterLess;": "≷",
  "GreaterSlantEqual;": "⩾",
  "GreaterTilde;": "≳",
  "Gscr;": "𝒢",
  "gscr;": "ℊ",
  "gsim;": "≳",
  "gsime;": "⪎",
  "gsiml;": "⪐",
  "GT;": ">",
  GT: ">",
  "Gt;": "≫",
  "gt;": ">",
  gt: ">",
  "gtcc;": "⪧",
  "gtcir;": "⩺",
  "gtdot;": "⋗",
  "gtlPar;": "⦕",
  "gtquest;": "⩼",
  "gtrapprox;": "⪆",
  "gtrarr;": "⥸",
  "gtrdot;": "⋗",
  "gtreqless;": "⋛",
  "gtreqqless;": "⪌",
  "gtrless;": "≷",
  "gtrsim;": "≳",
  "gvertneqq;": "≩︀",
  "gvnE;": "≩︀",
  "Hacek;": "ˇ",
  "hairsp;": " ",
  "half;": "½",
  "hamilt;": "ℋ",
  "HARDcy;": "Ъ",
  "hardcy;": "ъ",
  "hArr;": "⇔",
  "harr;": "↔",
  "harrcir;": "⥈",
  "harrw;": "↭",
  "Hat;": "^",
  "hbar;": "ℏ",
  "Hcirc;": "Ĥ",
  "hcirc;": "ĥ",
  "hearts;": "♥",
  "heartsuit;": "♥",
  "hellip;": "…",
  "hercon;": "⊹",
  "Hfr;": "ℌ",
  "hfr;": "𝔥",
  "HilbertSpace;": "ℋ",
  "hksearow;": "⤥",
  "hkswarow;": "⤦",
  "hoarr;": "⇿",
  "homtht;": "∻",
  "hookleftarrow;": "↩",
  "hookrightarrow;": "↪",
  "Hopf;": "ℍ",
  "hopf;": "𝕙",
  "horbar;": "―",
  "HorizontalLine;": "─",
  "Hscr;": "ℋ",
  "hscr;": "𝒽",
  "hslash;": "ℏ",
  "Hstrok;": "Ħ",
  "hstrok;": "ħ",
  "HumpDownHump;": "≎",
  "HumpEqual;": "≏",
  "hybull;": "⁃",
  "hyphen;": "‐",
  "Iacute;": "Í",
  Iacute: "Í",
  "iacute;": "í",
  iacute: "í",
  "ic;": "⁣",
  "Icirc;": "Î",
  Icirc: "Î",
  "icirc;": "î",
  icirc: "î",
  "Icy;": "И",
  "icy;": "и",
  "Idot;": "İ",
  "IEcy;": "Е",
  "iecy;": "е",
  "iexcl;": "¡",
  iexcl: "¡",
  "iff;": "⇔",
  "Ifr;": "ℑ",
  "ifr;": "𝔦",
  "Igrave;": "Ì",
  Igrave: "Ì",
  "igrave;": "ì",
  igrave: "ì",
  "ii;": "ⅈ",
  "iiiint;": "⨌",
  "iiint;": "∭",
  "iinfin;": "⧜",
  "iiota;": "℩",
  "IJlig;": "Ĳ",
  "ijlig;": "ĳ",
  "Im;": "ℑ",
  "Imacr;": "Ī",
  "imacr;": "ī",
  "image;": "ℑ",
  "ImaginaryI;": "ⅈ",
  "imagline;": "ℐ",
  "imagpart;": "ℑ",
  "imath;": "ı",
  "imof;": "⊷",
  "imped;": "Ƶ",
  "Implies;": "⇒",
  "in;": "∈",
  "incare;": "℅",
  "infin;": "∞",
  "infintie;": "⧝",
  "inodot;": "ı",
  "Int;": "∬",
  "int;": "∫",
  "intcal;": "⊺",
  "integers;": "ℤ",
  "Integral;": "∫",
  "intercal;": "⊺",
  "Intersection;": "⋂",
  "intlarhk;": "⨗",
  "intprod;": "⨼",
  "InvisibleComma;": "⁣",
  "InvisibleTimes;": "⁢",
  "IOcy;": "Ё",
  "iocy;": "ё",
  "Iogon;": "Į",
  "iogon;": "į",
  "Iopf;": "𝕀",
  "iopf;": "𝕚",
  "Iota;": "Ι",
  "iota;": "ι",
  "iprod;": "⨼",
  "iquest;": "¿",
  iquest: "¿",
  "Iscr;": "ℐ",
  "iscr;": "𝒾",
  "isin;": "∈",
  "isindot;": "⋵",
  "isinE;": "⋹",
  "isins;": "⋴",
  "isinsv;": "⋳",
  "isinv;": "∈",
  "it;": "⁢",
  "Itilde;": "Ĩ",
  "itilde;": "ĩ",
  "Iukcy;": "І",
  "iukcy;": "і",
  "Iuml;": "Ï",
  Iuml: "Ï",
  "iuml;": "ï",
  iuml: "ï",
  "Jcirc;": "Ĵ",
  "jcirc;": "ĵ",
  "Jcy;": "Й",
  "jcy;": "й",
  "Jfr;": "𝔍",
  "jfr;": "𝔧",
  "jmath;": "ȷ",
  "Jopf;": "𝕁",
  "jopf;": "𝕛",
  "Jscr;": "𝒥",
  "jscr;": "𝒿",
  "Jsercy;": "Ј",
  "jsercy;": "ј",
  "Jukcy;": "Є",
  "jukcy;": "є",
  "Kappa;": "Κ",
  "kappa;": "κ",
  "kappav;": "ϰ",
  "Kcedil;": "Ķ",
  "kcedil;": "ķ",
  "Kcy;": "К",
  "kcy;": "к",
  "Kfr;": "𝔎",
  "kfr;": "𝔨",
  "kgreen;": "ĸ",
  "KHcy;": "Х",
  "khcy;": "х",
  "KJcy;": "Ќ",
  "kjcy;": "ќ",
  "Kopf;": "𝕂",
  "kopf;": "𝕜",
  "Kscr;": "𝒦",
  "kscr;": "𝓀",
  "lAarr;": "⇚",
  "Lacute;": "Ĺ",
  "lacute;": "ĺ",
  "laemptyv;": "⦴",
  "lagran;": "ℒ",
  "Lambda;": "Λ",
  "lambda;": "λ",
  "Lang;": "⟪",
  "lang;": "⟨",
  "langd;": "⦑",
  "langle;": "⟨",
  "lap;": "⪅",
  "Laplacetrf;": "ℒ",
  "laquo;": "«",
  laquo: "«",
  "Larr;": "↞",
  "lArr;": "⇐",
  "larr;": "←",
  "larrb;": "⇤",
  "larrbfs;": "⤟",
  "larrfs;": "⤝",
  "larrhk;": "↩",
  "larrlp;": "↫",
  "larrpl;": "⤹",
  "larrsim;": "⥳",
  "larrtl;": "↢",
  "lat;": "⪫",
  "lAtail;": "⤛",
  "latail;": "⤙",
  "late;": "⪭",
  "lates;": "⪭︀",
  "lBarr;": "⤎",
  "lbarr;": "⤌",
  "lbbrk;": "❲",
  "lbrace;": "{",
  "lbrack;": "[",
  "lbrke;": "⦋",
  "lbrksld;": "⦏",
  "lbrkslu;": "⦍",
  "Lcaron;": "Ľ",
  "lcaron;": "ľ",
  "Lcedil;": "Ļ",
  "lcedil;": "ļ",
  "lceil;": "⌈",
  "lcub;": "{",
  "Lcy;": "Л",
  "lcy;": "л",
  "ldca;": "⤶",
  "ldquo;": "“",
  "ldquor;": "„",
  "ldrdhar;": "⥧",
  "ldrushar;": "⥋",
  "ldsh;": "↲",
  "lE;": "≦",
  "le;": "≤",
  "LeftAngleBracket;": "⟨",
  "LeftArrow;": "←",
  "Leftarrow;": "⇐",
  "leftarrow;": "←",
  "LeftArrowBar;": "⇤",
  "LeftArrowRightArrow;": "⇆",
  "leftarrowtail;": "↢",
  "LeftCeiling;": "⌈",
  "LeftDoubleBracket;": "⟦",
  "LeftDownTeeVector;": "⥡",
  "LeftDownVector;": "⇃",
  "LeftDownVectorBar;": "⥙",
  "LeftFloor;": "⌊",
  "leftharpoondown;": "↽",
  "leftharpoonup;": "↼",
  "leftleftarrows;": "⇇",
  "LeftRightArrow;": "↔",
  "Leftrightarrow;": "⇔",
  "leftrightarrow;": "↔",
  "leftrightarrows;": "⇆",
  "leftrightharpoons;": "⇋",
  "leftrightsquigarrow;": "↭",
  "LeftRightVector;": "⥎",
  "LeftTee;": "⊣",
  "LeftTeeArrow;": "↤",
  "LeftTeeVector;": "⥚",
  "leftthreetimes;": "⋋",
  "LeftTriangle;": "⊲",
  "LeftTriangleBar;": "⧏",
  "LeftTriangleEqual;": "⊴",
  "LeftUpDownVector;": "⥑",
  "LeftUpTeeVector;": "⥠",
  "LeftUpVector;": "↿",
  "LeftUpVectorBar;": "⥘",
  "LeftVector;": "↼",
  "LeftVectorBar;": "⥒",
  "lEg;": "⪋",
  "leg;": "⋚",
  "leq;": "≤",
  "leqq;": "≦",
  "leqslant;": "⩽",
  "les;": "⩽",
  "lescc;": "⪨",
  "lesdot;": "⩿",
  "lesdoto;": "⪁",
  "lesdotor;": "⪃",
  "lesg;": "⋚︀",
  "lesges;": "⪓",
  "lessapprox;": "⪅",
  "lessdot;": "⋖",
  "lesseqgtr;": "⋚",
  "lesseqqgtr;": "⪋",
  "LessEqualGreater;": "⋚",
  "LessFullEqual;": "≦",
  "LessGreater;": "≶",
  "lessgtr;": "≶",
  "LessLess;": "⪡",
  "lesssim;": "≲",
  "LessSlantEqual;": "⩽",
  "LessTilde;": "≲",
  "lfisht;": "⥼",
  "lfloor;": "⌊",
  "Lfr;": "𝔏",
  "lfr;": "𝔩",
  "lg;": "≶",
  "lgE;": "⪑",
  "lHar;": "⥢",
  "lhard;": "↽",
  "lharu;": "↼",
  "lharul;": "⥪",
  "lhblk;": "▄",
  "LJcy;": "Љ",
  "ljcy;": "љ",
  "Ll;": "⋘",
  "ll;": "≪",
  "llarr;": "⇇",
  "llcorner;": "⌞",
  "Lleftarrow;": "⇚",
  "llhard;": "⥫",
  "lltri;": "◺",
  "Lmidot;": "Ŀ",
  "lmidot;": "ŀ",
  "lmoust;": "⎰",
  "lmoustache;": "⎰",
  "lnap;": "⪉",
  "lnapprox;": "⪉",
  "lnE;": "≨",
  "lne;": "⪇",
  "lneq;": "⪇",
  "lneqq;": "≨",
  "lnsim;": "⋦",
  "loang;": "⟬",
  "loarr;": "⇽",
  "lobrk;": "⟦",
  "LongLeftArrow;": "⟵",
  "Longleftarrow;": "⟸",
  "longleftarrow;": "⟵",
  "LongLeftRightArrow;": "⟷",
  "Longleftrightarrow;": "⟺",
  "longleftrightarrow;": "⟷",
  "longmapsto;": "⟼",
  "LongRightArrow;": "⟶",
  "Longrightarrow;": "⟹",
  "longrightarrow;": "⟶",
  "looparrowleft;": "↫",
  "looparrowright;": "↬",
  "lopar;": "⦅",
  "Lopf;": "𝕃",
  "lopf;": "𝕝",
  "loplus;": "⨭",
  "lotimes;": "⨴",
  "lowast;": "∗",
  "lowbar;": "_",
  "LowerLeftArrow;": "↙",
  "LowerRightArrow;": "↘",
  "loz;": "◊",
  "lozenge;": "◊",
  "lozf;": "⧫",
  "lpar;": "(",
  "lparlt;": "⦓",
  "lrarr;": "⇆",
  "lrcorner;": "⌟",
  "lrhar;": "⇋",
  "lrhard;": "⥭",
  "lrm;": "‎",
  "lrtri;": "⊿",
  "lsaquo;": "‹",
  "Lscr;": "ℒ",
  "lscr;": "𝓁",
  "Lsh;": "↰",
  "lsh;": "↰",
  "lsim;": "≲",
  "lsime;": "⪍",
  "lsimg;": "⪏",
  "lsqb;": "[",
  "lsquo;": "‘",
  "lsquor;": "‚",
  "Lstrok;": "Ł",
  "lstrok;": "ł",
  "LT;": "<",
  LT: "<",
  "Lt;": "≪",
  "lt;": "<",
  lt: "<",
  "ltcc;": "⪦",
  "ltcir;": "⩹",
  "ltdot;": "⋖",
  "lthree;": "⋋",
  "ltimes;": "⋉",
  "ltlarr;": "⥶",
  "ltquest;": "⩻",
  "ltri;": "◃",
  "ltrie;": "⊴",
  "ltrif;": "◂",
  "ltrPar;": "⦖",
  "lurdshar;": "⥊",
  "luruhar;": "⥦",
  "lvertneqq;": "≨︀",
  "lvnE;": "≨︀",
  "macr;": "¯",
  macr: "¯",
  "male;": "♂",
  "malt;": "✠",
  "maltese;": "✠",
  "Map;": "⤅",
  "map;": "↦",
  "mapsto;": "↦",
  "mapstodown;": "↧",
  "mapstoleft;": "↤",
  "mapstoup;": "↥",
  "marker;": "▮",
  "mcomma;": "⨩",
  "Mcy;": "М",
  "mcy;": "м",
  "mdash;": "—",
  "mDDot;": "∺",
  "measuredangle;": "∡",
  "MediumSpace;": " ",
  "Mellintrf;": "ℳ",
  "Mfr;": "𝔐",
  "mfr;": "𝔪",
  "mho;": "℧",
  "micro;": "µ",
  micro: "µ",
  "mid;": "∣",
  "midast;": "*",
  "midcir;": "⫰",
  "middot;": "·",
  middot: "·",
  "minus;": "−",
  "minusb;": "⊟",
  "minusd;": "∸",
  "minusdu;": "⨪",
  "MinusPlus;": "∓",
  "mlcp;": "⫛",
  "mldr;": "…",
  "mnplus;": "∓",
  "models;": "⊧",
  "Mopf;": "𝕄",
  "mopf;": "𝕞",
  "mp;": "∓",
  "Mscr;": "ℳ",
  "mscr;": "𝓂",
  "mstpos;": "∾",
  "Mu;": "Μ",
  "mu;": "μ",
  "multimap;": "⊸",
  "mumap;": "⊸",
  "nabla;": "∇",
  "Nacute;": "Ń",
  "nacute;": "ń",
  "nang;": "∠⃒",
  "nap;": "≉",
  "napE;": "⩰̸",
  "napid;": "≋̸",
  "napos;": "ŉ",
  "napprox;": "≉",
  "natur;": "♮",
  "natural;": "♮",
  "naturals;": "ℕ",
  "nbsp;": " ",
  nbsp: " ",
  "nbump;": "≎̸",
  "nbumpe;": "≏̸",
  "ncap;": "⩃",
  "Ncaron;": "Ň",
  "ncaron;": "ň",
  "Ncedil;": "Ņ",
  "ncedil;": "ņ",
  "ncong;": "≇",
  "ncongdot;": "⩭̸",
  "ncup;": "⩂",
  "Ncy;": "Н",
  "ncy;": "н",
  "ndash;": "–",
  "ne;": "≠",
  "nearhk;": "⤤",
  "neArr;": "⇗",
  "nearr;": "↗",
  "nearrow;": "↗",
  "nedot;": "≐̸",
  "NegativeMediumSpace;": "​",
  "NegativeThickSpace;": "​",
  "NegativeThinSpace;": "​",
  "NegativeVeryThinSpace;": "​",
  "nequiv;": "≢",
  "nesear;": "⤨",
  "nesim;": "≂̸",
  "NestedGreaterGreater;": "≫",
  "NestedLessLess;": "≪",
  "NewLine;": `
`,
  "nexist;": "∄",
  "nexists;": "∄",
  "Nfr;": "𝔑",
  "nfr;": "𝔫",
  "ngE;": "≧̸",
  "nge;": "≱",
  "ngeq;": "≱",
  "ngeqq;": "≧̸",
  "ngeqslant;": "⩾̸",
  "nges;": "⩾̸",
  "nGg;": "⋙̸",
  "ngsim;": "≵",
  "nGt;": "≫⃒",
  "ngt;": "≯",
  "ngtr;": "≯",
  "nGtv;": "≫̸",
  "nhArr;": "⇎",
  "nharr;": "↮",
  "nhpar;": "⫲",
  "ni;": "∋",
  "nis;": "⋼",
  "nisd;": "⋺",
  "niv;": "∋",
  "NJcy;": "Њ",
  "njcy;": "њ",
  "nlArr;": "⇍",
  "nlarr;": "↚",
  "nldr;": "‥",
  "nlE;": "≦̸",
  "nle;": "≰",
  "nLeftarrow;": "⇍",
  "nleftarrow;": "↚",
  "nLeftrightarrow;": "⇎",
  "nleftrightarrow;": "↮",
  "nleq;": "≰",
  "nleqq;": "≦̸",
  "nleqslant;": "⩽̸",
  "nles;": "⩽̸",
  "nless;": "≮",
  "nLl;": "⋘̸",
  "nlsim;": "≴",
  "nLt;": "≪⃒",
  "nlt;": "≮",
  "nltri;": "⋪",
  "nltrie;": "⋬",
  "nLtv;": "≪̸",
  "nmid;": "∤",
  "NoBreak;": "⁠",
  "NonBreakingSpace;": " ",
  "Nopf;": "ℕ",
  "nopf;": "𝕟",
  "Not;": "⫬",
  "not;": "¬",
  not: "¬",
  "NotCongruent;": "≢",
  "NotCupCap;": "≭",
  "NotDoubleVerticalBar;": "∦",
  "NotElement;": "∉",
  "NotEqual;": "≠",
  "NotEqualTilde;": "≂̸",
  "NotExists;": "∄",
  "NotGreater;": "≯",
  "NotGreaterEqual;": "≱",
  "NotGreaterFullEqual;": "≧̸",
  "NotGreaterGreater;": "≫̸",
  "NotGreaterLess;": "≹",
  "NotGreaterSlantEqual;": "⩾̸",
  "NotGreaterTilde;": "≵",
  "NotHumpDownHump;": "≎̸",
  "NotHumpEqual;": "≏̸",
  "notin;": "∉",
  "notindot;": "⋵̸",
  "notinE;": "⋹̸",
  "notinva;": "∉",
  "notinvb;": "⋷",
  "notinvc;": "⋶",
  "NotLeftTriangle;": "⋪",
  "NotLeftTriangleBar;": "⧏̸",
  "NotLeftTriangleEqual;": "⋬",
  "NotLess;": "≮",
  "NotLessEqual;": "≰",
  "NotLessGreater;": "≸",
  "NotLessLess;": "≪̸",
  "NotLessSlantEqual;": "⩽̸",
  "NotLessTilde;": "≴",
  "NotNestedGreaterGreater;": "⪢̸",
  "NotNestedLessLess;": "⪡̸",
  "notni;": "∌",
  "notniva;": "∌",
  "notnivb;": "⋾",
  "notnivc;": "⋽",
  "NotPrecedes;": "⊀",
  "NotPrecedesEqual;": "⪯̸",
  "NotPrecedesSlantEqual;": "⋠",
  "NotReverseElement;": "∌",
  "NotRightTriangle;": "⋫",
  "NotRightTriangleBar;": "⧐̸",
  "NotRightTriangleEqual;": "⋭",
  "NotSquareSubset;": "⊏̸",
  "NotSquareSubsetEqual;": "⋢",
  "NotSquareSuperset;": "⊐̸",
  "NotSquareSupersetEqual;": "⋣",
  "NotSubset;": "⊂⃒",
  "NotSubsetEqual;": "⊈",
  "NotSucceeds;": "⊁",
  "NotSucceedsEqual;": "⪰̸",
  "NotSucceedsSlantEqual;": "⋡",
  "NotSucceedsTilde;": "≿̸",
  "NotSuperset;": "⊃⃒",
  "NotSupersetEqual;": "⊉",
  "NotTilde;": "≁",
  "NotTildeEqual;": "≄",
  "NotTildeFullEqual;": "≇",
  "NotTildeTilde;": "≉",
  "NotVerticalBar;": "∤",
  "npar;": "∦",
  "nparallel;": "∦",
  "nparsl;": "⫽⃥",
  "npart;": "∂̸",
  "npolint;": "⨔",
  "npr;": "⊀",
  "nprcue;": "⋠",
  "npre;": "⪯̸",
  "nprec;": "⊀",
  "npreceq;": "⪯̸",
  "nrArr;": "⇏",
  "nrarr;": "↛",
  "nrarrc;": "⤳̸",
  "nrarrw;": "↝̸",
  "nRightarrow;": "⇏",
  "nrightarrow;": "↛",
  "nrtri;": "⋫",
  "nrtrie;": "⋭",
  "nsc;": "⊁",
  "nsccue;": "⋡",
  "nsce;": "⪰̸",
  "Nscr;": "𝒩",
  "nscr;": "𝓃",
  "nshortmid;": "∤",
  "nshortparallel;": "∦",
  "nsim;": "≁",
  "nsime;": "≄",
  "nsimeq;": "≄",
  "nsmid;": "∤",
  "nspar;": "∦",
  "nsqsube;": "⋢",
  "nsqsupe;": "⋣",
  "nsub;": "⊄",
  "nsubE;": "⫅̸",
  "nsube;": "⊈",
  "nsubset;": "⊂⃒",
  "nsubseteq;": "⊈",
  "nsubseteqq;": "⫅̸",
  "nsucc;": "⊁",
  "nsucceq;": "⪰̸",
  "nsup;": "⊅",
  "nsupE;": "⫆̸",
  "nsupe;": "⊉",
  "nsupset;": "⊃⃒",
  "nsupseteq;": "⊉",
  "nsupseteqq;": "⫆̸",
  "ntgl;": "≹",
  "Ntilde;": "Ñ",
  Ntilde: "Ñ",
  "ntilde;": "ñ",
  ntilde: "ñ",
  "ntlg;": "≸",
  "ntriangleleft;": "⋪",
  "ntrianglelefteq;": "⋬",
  "ntriangleright;": "⋫",
  "ntrianglerighteq;": "⋭",
  "Nu;": "Ν",
  "nu;": "ν",
  "num;": "#",
  "numero;": "№",
  "numsp;": " ",
  "nvap;": "≍⃒",
  "nVDash;": "⊯",
  "nVdash;": "⊮",
  "nvDash;": "⊭",
  "nvdash;": "⊬",
  "nvge;": "≥⃒",
  "nvgt;": ">⃒",
  "nvHarr;": "⤄",
  "nvinfin;": "⧞",
  "nvlArr;": "⤂",
  "nvle;": "≤⃒",
  "nvlt;": "<⃒",
  "nvltrie;": "⊴⃒",
  "nvrArr;": "⤃",
  "nvrtrie;": "⊵⃒",
  "nvsim;": "∼⃒",
  "nwarhk;": "⤣",
  "nwArr;": "⇖",
  "nwarr;": "↖",
  "nwarrow;": "↖",
  "nwnear;": "⤧",
  "Oacute;": "Ó",
  Oacute: "Ó",
  "oacute;": "ó",
  oacute: "ó",
  "oast;": "⊛",
  "ocir;": "⊚",
  "Ocirc;": "Ô",
  Ocirc: "Ô",
  "ocirc;": "ô",
  ocirc: "ô",
  "Ocy;": "О",
  "ocy;": "о",
  "odash;": "⊝",
  "Odblac;": "Ő",
  "odblac;": "ő",
  "odiv;": "⨸",
  "odot;": "⊙",
  "odsold;": "⦼",
  "OElig;": "Œ",
  "oelig;": "œ",
  "ofcir;": "⦿",
  "Ofr;": "𝔒",
  "ofr;": "𝔬",
  "ogon;": "˛",
  "Ograve;": "Ò",
  Ograve: "Ò",
  "ograve;": "ò",
  ograve: "ò",
  "ogt;": "⧁",
  "ohbar;": "⦵",
  "ohm;": "Ω",
  "oint;": "∮",
  "olarr;": "↺",
  "olcir;": "⦾",
  "olcross;": "⦻",
  "oline;": "‾",
  "olt;": "⧀",
  "Omacr;": "Ō",
  "omacr;": "ō",
  "Omega;": "Ω",
  "omega;": "ω",
  "Omicron;": "Ο",
  "omicron;": "ο",
  "omid;": "⦶",
  "ominus;": "⊖",
  "Oopf;": "𝕆",
  "oopf;": "𝕠",
  "opar;": "⦷",
  "OpenCurlyDoubleQuote;": "“",
  "OpenCurlyQuote;": "‘",
  "operp;": "⦹",
  "oplus;": "⊕",
  "Or;": "⩔",
  "or;": "∨",
  "orarr;": "↻",
  "ord;": "⩝",
  "order;": "ℴ",
  "orderof;": "ℴ",
  "ordf;": "ª",
  ordf: "ª",
  "ordm;": "º",
  ordm: "º",
  "origof;": "⊶",
  "oror;": "⩖",
  "orslope;": "⩗",
  "orv;": "⩛",
  "oS;": "Ⓢ",
  "Oscr;": "𝒪",
  "oscr;": "ℴ",
  "Oslash;": "Ø",
  Oslash: "Ø",
  "oslash;": "ø",
  oslash: "ø",
  "osol;": "⊘",
  "Otilde;": "Õ",
  Otilde: "Õ",
  "otilde;": "õ",
  otilde: "õ",
  "Otimes;": "⨷",
  "otimes;": "⊗",
  "otimesas;": "⨶",
  "Ouml;": "Ö",
  Ouml: "Ö",
  "ouml;": "ö",
  ouml: "ö",
  "ovbar;": "⌽",
  "OverBar;": "‾",
  "OverBrace;": "⏞",
  "OverBracket;": "⎴",
  "OverParenthesis;": "⏜",
  "par;": "∥",
  "para;": "¶",
  para: "¶",
  "parallel;": "∥",
  "parsim;": "⫳",
  "parsl;": "⫽",
  "part;": "∂",
  "PartialD;": "∂",
  "Pcy;": "П",
  "pcy;": "п",
  "percnt;": "%",
  "period;": ".",
  "permil;": "‰",
  "perp;": "⊥",
  "pertenk;": "‱",
  "Pfr;": "𝔓",
  "pfr;": "𝔭",
  "Phi;": "Φ",
  "phi;": "φ",
  "phiv;": "ϕ",
  "phmmat;": "ℳ",
  "phone;": "☎",
  "Pi;": "Π",
  "pi;": "π",
  "pitchfork;": "⋔",
  "piv;": "ϖ",
  "planck;": "ℏ",
  "planckh;": "ℎ",
  "plankv;": "ℏ",
  "plus;": "+",
  "plusacir;": "⨣",
  "plusb;": "⊞",
  "pluscir;": "⨢",
  "plusdo;": "∔",
  "plusdu;": "⨥",
  "pluse;": "⩲",
  "PlusMinus;": "±",
  "plusmn;": "±",
  plusmn: "±",
  "plussim;": "⨦",
  "plustwo;": "⨧",
  "pm;": "±",
  "Poincareplane;": "ℌ",
  "pointint;": "⨕",
  "Popf;": "ℙ",
  "popf;": "𝕡",
  "pound;": "£",
  pound: "£",
  "Pr;": "⪻",
  "pr;": "≺",
  "prap;": "⪷",
  "prcue;": "≼",
  "prE;": "⪳",
  "pre;": "⪯",
  "prec;": "≺",
  "precapprox;": "⪷",
  "preccurlyeq;": "≼",
  "Precedes;": "≺",
  "PrecedesEqual;": "⪯",
  "PrecedesSlantEqual;": "≼",
  "PrecedesTilde;": "≾",
  "preceq;": "⪯",
  "precnapprox;": "⪹",
  "precneqq;": "⪵",
  "precnsim;": "⋨",
  "precsim;": "≾",
  "Prime;": "″",
  "prime;": "′",
  "primes;": "ℙ",
  "prnap;": "⪹",
  "prnE;": "⪵",
  "prnsim;": "⋨",
  "prod;": "∏",
  "Product;": "∏",
  "profalar;": "⌮",
  "profline;": "⌒",
  "profsurf;": "⌓",
  "prop;": "∝",
  "Proportion;": "∷",
  "Proportional;": "∝",
  "propto;": "∝",
  "prsim;": "≾",
  "prurel;": "⊰",
  "Pscr;": "𝒫",
  "pscr;": "𝓅",
  "Psi;": "Ψ",
  "psi;": "ψ",
  "puncsp;": " ",
  "Qfr;": "𝔔",
  "qfr;": "𝔮",
  "qint;": "⨌",
  "Qopf;": "ℚ",
  "qopf;": "𝕢",
  "qprime;": "⁗",
  "Qscr;": "𝒬",
  "qscr;": "𝓆",
  "quaternions;": "ℍ",
  "quatint;": "⨖",
  "quest;": "?",
  "questeq;": "≟",
  "QUOT;": '"',
  QUOT: '"',
  "quot;": '"',
  quot: '"',
  "rAarr;": "⇛",
  "race;": "∽̱",
  "Racute;": "Ŕ",
  "racute;": "ŕ",
  "radic;": "√",
  "raemptyv;": "⦳",
  "Rang;": "⟫",
  "rang;": "⟩",
  "rangd;": "⦒",
  "range;": "⦥",
  "rangle;": "⟩",
  "raquo;": "»",
  raquo: "»",
  "Rarr;": "↠",
  "rArr;": "⇒",
  "rarr;": "→",
  "rarrap;": "⥵",
  "rarrb;": "⇥",
  "rarrbfs;": "⤠",
  "rarrc;": "⤳",
  "rarrfs;": "⤞",
  "rarrhk;": "↪",
  "rarrlp;": "↬",
  "rarrpl;": "⥅",
  "rarrsim;": "⥴",
  "Rarrtl;": "⤖",
  "rarrtl;": "↣",
  "rarrw;": "↝",
  "rAtail;": "⤜",
  "ratail;": "⤚",
  "ratio;": "∶",
  "rationals;": "ℚ",
  "RBarr;": "⤐",
  "rBarr;": "⤏",
  "rbarr;": "⤍",
  "rbbrk;": "❳",
  "rbrace;": "}",
  "rbrack;": "]",
  "rbrke;": "⦌",
  "rbrksld;": "⦎",
  "rbrkslu;": "⦐",
  "Rcaron;": "Ř",
  "rcaron;": "ř",
  "Rcedil;": "Ŗ",
  "rcedil;": "ŗ",
  "rceil;": "⌉",
  "rcub;": "}",
  "Rcy;": "Р",
  "rcy;": "р",
  "rdca;": "⤷",
  "rdldhar;": "⥩",
  "rdquo;": "”",
  "rdquor;": "”",
  "rdsh;": "↳",
  "Re;": "ℜ",
  "real;": "ℜ",
  "realine;": "ℛ",
  "realpart;": "ℜ",
  "reals;": "ℝ",
  "rect;": "▭",
  "REG;": "®",
  REG: "®",
  "reg;": "®",
  reg: "®",
  "ReverseElement;": "∋",
  "ReverseEquilibrium;": "⇋",
  "ReverseUpEquilibrium;": "⥯",
  "rfisht;": "⥽",
  "rfloor;": "⌋",
  "Rfr;": "ℜ",
  "rfr;": "𝔯",
  "rHar;": "⥤",
  "rhard;": "⇁",
  "rharu;": "⇀",
  "rharul;": "⥬",
  "Rho;": "Ρ",
  "rho;": "ρ",
  "rhov;": "ϱ",
  "RightAngleBracket;": "⟩",
  "RightArrow;": "→",
  "Rightarrow;": "⇒",
  "rightarrow;": "→",
  "RightArrowBar;": "⇥",
  "RightArrowLeftArrow;": "⇄",
  "rightarrowtail;": "↣",
  "RightCeiling;": "⌉",
  "RightDoubleBracket;": "⟧",
  "RightDownTeeVector;": "⥝",
  "RightDownVector;": "⇂",
  "RightDownVectorBar;": "⥕",
  "RightFloor;": "⌋",
  "rightharpoondown;": "⇁",
  "rightharpoonup;": "⇀",
  "rightleftarrows;": "⇄",
  "rightleftharpoons;": "⇌",
  "rightrightarrows;": "⇉",
  "rightsquigarrow;": "↝",
  "RightTee;": "⊢",
  "RightTeeArrow;": "↦",
  "RightTeeVector;": "⥛",
  "rightthreetimes;": "⋌",
  "RightTriangle;": "⊳",
  "RightTriangleBar;": "⧐",
  "RightTriangleEqual;": "⊵",
  "RightUpDownVector;": "⥏",
  "RightUpTeeVector;": "⥜",
  "RightUpVector;": "↾",
  "RightUpVectorBar;": "⥔",
  "RightVector;": "⇀",
  "RightVectorBar;": "⥓",
  "ring;": "˚",
  "risingdotseq;": "≓",
  "rlarr;": "⇄",
  "rlhar;": "⇌",
  "rlm;": "‏",
  "rmoust;": "⎱",
  "rmoustache;": "⎱",
  "rnmid;": "⫮",
  "roang;": "⟭",
  "roarr;": "⇾",
  "robrk;": "⟧",
  "ropar;": "⦆",
  "Ropf;": "ℝ",
  "ropf;": "𝕣",
  "roplus;": "⨮",
  "rotimes;": "⨵",
  "RoundImplies;": "⥰",
  "rpar;": ")",
  "rpargt;": "⦔",
  "rppolint;": "⨒",
  "rrarr;": "⇉",
  "Rrightarrow;": "⇛",
  "rsaquo;": "›",
  "Rscr;": "ℛ",
  "rscr;": "𝓇",
  "Rsh;": "↱",
  "rsh;": "↱",
  "rsqb;": "]",
  "rsquo;": "’",
  "rsquor;": "’",
  "rthree;": "⋌",
  "rtimes;": "⋊",
  "rtri;": "▹",
  "rtrie;": "⊵",
  "rtrif;": "▸",
  "rtriltri;": "⧎",
  "RuleDelayed;": "⧴",
  "ruluhar;": "⥨",
  "rx;": "℞",
  "Sacute;": "Ś",
  "sacute;": "ś",
  "sbquo;": "‚",
  "Sc;": "⪼",
  "sc;": "≻",
  "scap;": "⪸",
  "Scaron;": "Š",
  "scaron;": "š",
  "sccue;": "≽",
  "scE;": "⪴",
  "sce;": "⪰",
  "Scedil;": "Ş",
  "scedil;": "ş",
  "Scirc;": "Ŝ",
  "scirc;": "ŝ",
  "scnap;": "⪺",
  "scnE;": "⪶",
  "scnsim;": "⋩",
  "scpolint;": "⨓",
  "scsim;": "≿",
  "Scy;": "С",
  "scy;": "с",
  "sdot;": "⋅",
  "sdotb;": "⊡",
  "sdote;": "⩦",
  "searhk;": "⤥",
  "seArr;": "⇘",
  "searr;": "↘",
  "searrow;": "↘",
  "sect;": "§",
  sect: "§",
  "semi;": ";",
  "seswar;": "⤩",
  "setminus;": "∖",
  "setmn;": "∖",
  "sext;": "✶",
  "Sfr;": "𝔖",
  "sfr;": "𝔰",
  "sfrown;": "⌢",
  "sharp;": "♯",
  "SHCHcy;": "Щ",
  "shchcy;": "щ",
  "SHcy;": "Ш",
  "shcy;": "ш",
  "ShortDownArrow;": "↓",
  "ShortLeftArrow;": "←",
  "shortmid;": "∣",
  "shortparallel;": "∥",
  "ShortRightArrow;": "→",
  "ShortUpArrow;": "↑",
  "shy;": "­",
  shy: "­",
  "Sigma;": "Σ",
  "sigma;": "σ",
  "sigmaf;": "ς",
  "sigmav;": "ς",
  "sim;": "∼",
  "simdot;": "⩪",
  "sime;": "≃",
  "simeq;": "≃",
  "simg;": "⪞",
  "simgE;": "⪠",
  "siml;": "⪝",
  "simlE;": "⪟",
  "simne;": "≆",
  "simplus;": "⨤",
  "simrarr;": "⥲",
  "slarr;": "←",
  "SmallCircle;": "∘",
  "smallsetminus;": "∖",
  "smashp;": "⨳",
  "smeparsl;": "⧤",
  "smid;": "∣",
  "smile;": "⌣",
  "smt;": "⪪",
  "smte;": "⪬",
  "smtes;": "⪬︀",
  "SOFTcy;": "Ь",
  "softcy;": "ь",
  "sol;": "/",
  "solb;": "⧄",
  "solbar;": "⌿",
  "Sopf;": "𝕊",
  "sopf;": "𝕤",
  "spades;": "♠",
  "spadesuit;": "♠",
  "spar;": "∥",
  "sqcap;": "⊓",
  "sqcaps;": "⊓︀",
  "sqcup;": "⊔",
  "sqcups;": "⊔︀",
  "Sqrt;": "√",
  "sqsub;": "⊏",
  "sqsube;": "⊑",
  "sqsubset;": "⊏",
  "sqsubseteq;": "⊑",
  "sqsup;": "⊐",
  "sqsupe;": "⊒",
  "sqsupset;": "⊐",
  "sqsupseteq;": "⊒",
  "squ;": "□",
  "Square;": "□",
  "square;": "□",
  "SquareIntersection;": "⊓",
  "SquareSubset;": "⊏",
  "SquareSubsetEqual;": "⊑",
  "SquareSuperset;": "⊐",
  "SquareSupersetEqual;": "⊒",
  "SquareUnion;": "⊔",
  "squarf;": "▪",
  "squf;": "▪",
  "srarr;": "→",
  "Sscr;": "𝒮",
  "sscr;": "𝓈",
  "ssetmn;": "∖",
  "ssmile;": "⌣",
  "sstarf;": "⋆",
  "Star;": "⋆",
  "star;": "☆",
  "starf;": "★",
  "straightepsilon;": "ϵ",
  "straightphi;": "ϕ",
  "strns;": "¯",
  "Sub;": "⋐",
  "sub;": "⊂",
  "subdot;": "⪽",
  "subE;": "⫅",
  "sube;": "⊆",
  "subedot;": "⫃",
  "submult;": "⫁",
  "subnE;": "⫋",
  "subne;": "⊊",
  "subplus;": "⪿",
  "subrarr;": "⥹",
  "Subset;": "⋐",
  "subset;": "⊂",
  "subseteq;": "⊆",
  "subseteqq;": "⫅",
  "SubsetEqual;": "⊆",
  "subsetneq;": "⊊",
  "subsetneqq;": "⫋",
  "subsim;": "⫇",
  "subsub;": "⫕",
  "subsup;": "⫓",
  "succ;": "≻",
  "succapprox;": "⪸",
  "succcurlyeq;": "≽",
  "Succeeds;": "≻",
  "SucceedsEqual;": "⪰",
  "SucceedsSlantEqual;": "≽",
  "SucceedsTilde;": "≿",
  "succeq;": "⪰",
  "succnapprox;": "⪺",
  "succneqq;": "⪶",
  "succnsim;": "⋩",
  "succsim;": "≿",
  "SuchThat;": "∋",
  "Sum;": "∑",
  "sum;": "∑",
  "sung;": "♪",
  "Sup;": "⋑",
  "sup;": "⊃",
  "sup1;": "¹",
  sup1: "¹",
  "sup2;": "²",
  sup2: "²",
  "sup3;": "³",
  sup3: "³",
  "supdot;": "⪾",
  "supdsub;": "⫘",
  "supE;": "⫆",
  "supe;": "⊇",
  "supedot;": "⫄",
  "Superset;": "⊃",
  "SupersetEqual;": "⊇",
  "suphsol;": "⟉",
  "suphsub;": "⫗",
  "suplarr;": "⥻",
  "supmult;": "⫂",
  "supnE;": "⫌",
  "supne;": "⊋",
  "supplus;": "⫀",
  "Supset;": "⋑",
  "supset;": "⊃",
  "supseteq;": "⊇",
  "supseteqq;": "⫆",
  "supsetneq;": "⊋",
  "supsetneqq;": "⫌",
  "supsim;": "⫈",
  "supsub;": "⫔",
  "supsup;": "⫖",
  "swarhk;": "⤦",
  "swArr;": "⇙",
  "swarr;": "↙",
  "swarrow;": "↙",
  "swnwar;": "⤪",
  "szlig;": "ß",
  szlig: "ß",
  "Tab;": "	",
  "target;": "⌖",
  "Tau;": "Τ",
  "tau;": "τ",
  "tbrk;": "⎴",
  "Tcaron;": "Ť",
  "tcaron;": "ť",
  "Tcedil;": "Ţ",
  "tcedil;": "ţ",
  "Tcy;": "Т",
  "tcy;": "т",
  "tdot;": "⃛",
  "telrec;": "⌕",
  "Tfr;": "𝔗",
  "tfr;": "𝔱",
  "there4;": "∴",
  "Therefore;": "∴",
  "therefore;": "∴",
  "Theta;": "Θ",
  "theta;": "θ",
  "thetasym;": "ϑ",
  "thetav;": "ϑ",
  "thickapprox;": "≈",
  "thicksim;": "∼",
  "ThickSpace;": "  ",
  "thinsp;": " ",
  "ThinSpace;": " ",
  "thkap;": "≈",
  "thksim;": "∼",
  "THORN;": "Þ",
  THORN: "Þ",
  "thorn;": "þ",
  thorn: "þ",
  "Tilde;": "∼",
  "tilde;": "˜",
  "TildeEqual;": "≃",
  "TildeFullEqual;": "≅",
  "TildeTilde;": "≈",
  "times;": "×",
  times: "×",
  "timesb;": "⊠",
  "timesbar;": "⨱",
  "timesd;": "⨰",
  "tint;": "∭",
  "toea;": "⤨",
  "top;": "⊤",
  "topbot;": "⌶",
  "topcir;": "⫱",
  "Topf;": "𝕋",
  "topf;": "𝕥",
  "topfork;": "⫚",
  "tosa;": "⤩",
  "tprime;": "‴",
  "TRADE;": "™",
  "trade;": "™",
  "triangle;": "▵",
  "triangledown;": "▿",
  "triangleleft;": "◃",
  "trianglelefteq;": "⊴",
  "triangleq;": "≜",
  "triangleright;": "▹",
  "trianglerighteq;": "⊵",
  "tridot;": "◬",
  "trie;": "≜",
  "triminus;": "⨺",
  "TripleDot;": "⃛",
  "triplus;": "⨹",
  "trisb;": "⧍",
  "tritime;": "⨻",
  "trpezium;": "⏢",
  "Tscr;": "𝒯",
  "tscr;": "𝓉",
  "TScy;": "Ц",
  "tscy;": "ц",
  "TSHcy;": "Ћ",
  "tshcy;": "ћ",
  "Tstrok;": "Ŧ",
  "tstrok;": "ŧ",
  "twixt;": "≬",
  "twoheadleftarrow;": "↞",
  "twoheadrightarrow;": "↠",
  "Uacute;": "Ú",
  Uacute: "Ú",
  "uacute;": "ú",
  uacute: "ú",
  "Uarr;": "↟",
  "uArr;": "⇑",
  "uarr;": "↑",
  "Uarrocir;": "⥉",
  "Ubrcy;": "Ў",
  "ubrcy;": "ў",
  "Ubreve;": "Ŭ",
  "ubreve;": "ŭ",
  "Ucirc;": "Û",
  Ucirc: "Û",
  "ucirc;": "û",
  ucirc: "û",
  "Ucy;": "У",
  "ucy;": "у",
  "udarr;": "⇅",
  "Udblac;": "Ű",
  "udblac;": "ű",
  "udhar;": "⥮",
  "ufisht;": "⥾",
  "Ufr;": "𝔘",
  "ufr;": "𝔲",
  "Ugrave;": "Ù",
  Ugrave: "Ù",
  "ugrave;": "ù",
  ugrave: "ù",
  "uHar;": "⥣",
  "uharl;": "↿",
  "uharr;": "↾",
  "uhblk;": "▀",
  "ulcorn;": "⌜",
  "ulcorner;": "⌜",
  "ulcrop;": "⌏",
  "ultri;": "◸",
  "Umacr;": "Ū",
  "umacr;": "ū",
  "uml;": "¨",
  uml: "¨",
  "UnderBar;": "_",
  "UnderBrace;": "⏟",
  "UnderBracket;": "⎵",
  "UnderParenthesis;": "⏝",
  "Union;": "⋃",
  "UnionPlus;": "⊎",
  "Uogon;": "Ų",
  "uogon;": "ų",
  "Uopf;": "𝕌",
  "uopf;": "𝕦",
  "UpArrow;": "↑",
  "Uparrow;": "⇑",
  "uparrow;": "↑",
  "UpArrowBar;": "⤒",
  "UpArrowDownArrow;": "⇅",
  "UpDownArrow;": "↕",
  "Updownarrow;": "⇕",
  "updownarrow;": "↕",
  "UpEquilibrium;": "⥮",
  "upharpoonleft;": "↿",
  "upharpoonright;": "↾",
  "uplus;": "⊎",
  "UpperLeftArrow;": "↖",
  "UpperRightArrow;": "↗",
  "Upsi;": "ϒ",
  "upsi;": "υ",
  "upsih;": "ϒ",
  "Upsilon;": "Υ",
  "upsilon;": "υ",
  "UpTee;": "⊥",
  "UpTeeArrow;": "↥",
  "upuparrows;": "⇈",
  "urcorn;": "⌝",
  "urcorner;": "⌝",
  "urcrop;": "⌎",
  "Uring;": "Ů",
  "uring;": "ů",
  "urtri;": "◹",
  "Uscr;": "𝒰",
  "uscr;": "𝓊",
  "utdot;": "⋰",
  "Utilde;": "Ũ",
  "utilde;": "ũ",
  "utri;": "▵",
  "utrif;": "▴",
  "uuarr;": "⇈",
  "Uuml;": "Ü",
  Uuml: "Ü",
  "uuml;": "ü",
  uuml: "ü",
  "uwangle;": "⦧",
  "vangrt;": "⦜",
  "varepsilon;": "ϵ",
  "varkappa;": "ϰ",
  "varnothing;": "∅",
  "varphi;": "ϕ",
  "varpi;": "ϖ",
  "varpropto;": "∝",
  "vArr;": "⇕",
  "varr;": "↕",
  "varrho;": "ϱ",
  "varsigma;": "ς",
  "varsubsetneq;": "⊊︀",
  "varsubsetneqq;": "⫋︀",
  "varsupsetneq;": "⊋︀",
  "varsupsetneqq;": "⫌︀",
  "vartheta;": "ϑ",
  "vartriangleleft;": "⊲",
  "vartriangleright;": "⊳",
  "Vbar;": "⫫",
  "vBar;": "⫨",
  "vBarv;": "⫩",
  "Vcy;": "В",
  "vcy;": "в",
  "VDash;": "⊫",
  "Vdash;": "⊩",
  "vDash;": "⊨",
  "vdash;": "⊢",
  "Vdashl;": "⫦",
  "Vee;": "⋁",
  "vee;": "∨",
  "veebar;": "⊻",
  "veeeq;": "≚",
  "vellip;": "⋮",
  "Verbar;": "‖",
  "verbar;": "|",
  "Vert;": "‖",
  "vert;": "|",
  "VerticalBar;": "∣",
  "VerticalLine;": "|",
  "VerticalSeparator;": "❘",
  "VerticalTilde;": "≀",
  "VeryThinSpace;": " ",
  "Vfr;": "𝔙",
  "vfr;": "𝔳",
  "vltri;": "⊲",
  "vnsub;": "⊂⃒",
  "vnsup;": "⊃⃒",
  "Vopf;": "𝕍",
  "vopf;": "𝕧",
  "vprop;": "∝",
  "vrtri;": "⊳",
  "Vscr;": "𝒱",
  "vscr;": "𝓋",
  "vsubnE;": "⫋︀",
  "vsubne;": "⊊︀",
  "vsupnE;": "⫌︀",
  "vsupne;": "⊋︀",
  "Vvdash;": "⊪",
  "vzigzag;": "⦚",
  "Wcirc;": "Ŵ",
  "wcirc;": "ŵ",
  "wedbar;": "⩟",
  "Wedge;": "⋀",
  "wedge;": "∧",
  "wedgeq;": "≙",
  "weierp;": "℘",
  "Wfr;": "𝔚",
  "wfr;": "𝔴",
  "Wopf;": "𝕎",
  "wopf;": "𝕨",
  "wp;": "℘",
  "wr;": "≀",
  "wreath;": "≀",
  "Wscr;": "𝒲",
  "wscr;": "𝓌",
  "xcap;": "⋂",
  "xcirc;": "◯",
  "xcup;": "⋃",
  "xdtri;": "▽",
  "Xfr;": "𝔛",
  "xfr;": "𝔵",
  "xhArr;": "⟺",
  "xharr;": "⟷",
  "Xi;": "Ξ",
  "xi;": "ξ",
  "xlArr;": "⟸",
  "xlarr;": "⟵",
  "xmap;": "⟼",
  "xnis;": "⋻",
  "xodot;": "⨀",
  "Xopf;": "𝕏",
  "xopf;": "𝕩",
  "xoplus;": "⨁",
  "xotime;": "⨂",
  "xrArr;": "⟹",
  "xrarr;": "⟶",
  "Xscr;": "𝒳",
  "xscr;": "𝓍",
  "xsqcup;": "⨆",
  "xuplus;": "⨄",
  "xutri;": "△",
  "xvee;": "⋁",
  "xwedge;": "⋀",
  "Yacute;": "Ý",
  Yacute: "Ý",
  "yacute;": "ý",
  yacute: "ý",
  "YAcy;": "Я",
  "yacy;": "я",
  "Ycirc;": "Ŷ",
  "ycirc;": "ŷ",
  "Ycy;": "Ы",
  "ycy;": "ы",
  "yen;": "¥",
  yen: "¥",
  "Yfr;": "𝔜",
  "yfr;": "𝔶",
  "YIcy;": "Ї",
  "yicy;": "ї",
  "Yopf;": "𝕐",
  "yopf;": "𝕪",
  "Yscr;": "𝒴",
  "yscr;": "𝓎",
  "YUcy;": "Ю",
  "yucy;": "ю",
  "Yuml;": "Ÿ",
  "yuml;": "ÿ",
  yuml: "ÿ",
  "Zacute;": "Ź",
  "zacute;": "ź",
  "Zcaron;": "Ž",
  "zcaron;": "ž",
  "Zcy;": "З",
  "zcy;": "з",
  "Zdot;": "Ż",
  "zdot;": "ż",
  "zeetrf;": "ℨ",
  "ZeroWidthSpace;": "​",
  "Zeta;": "Ζ",
  "zeta;": "ζ",
  "Zfr;": "ℨ",
  "zfr;": "𝔷",
  "ZHcy;": "Ж",
  "zhcy;": "ж",
  "zigrarr;": "⇝",
  "Zopf;": "ℤ",
  "zopf;": "𝕫",
  "Zscr;": "𝒵",
  "zscr;": "𝓏",
  "zwj;": "‍",
  "zwnj;": "‌"
};
function Ye(e, t) {
  if (e.length < t.length)
    return !1;
  for (let n = 0; n < t.length; n++)
    if (e[n] !== t[n])
      return !1;
  return !0;
}
function Ru(e, t) {
  const n = e.length - t.length;
  return n > 0 ? e.lastIndexOf(t) === n : n === 0 ? e === t : !1;
}
function Vs(e, t) {
  let n = "";
  for (; t > 0; )
    (t & 1) === 1 && (n += e), e += e, t = t >>> 1;
  return n;
}
var Au = 97, Nu = 122, Mu = 65, Iu = 90, Ou = 48, zu = 57;
function It(e, t) {
  const n = e.charCodeAt(t);
  return Au <= n && n <= Nu || Mu <= n && n <= Iu || Ou <= n && n <= zu;
}
function vn(e) {
  return typeof e < "u";
}
function Uu(e) {
  if (e)
    return typeof e == "string" ? {
      kind: "markdown",
      value: e
    } : {
      kind: "markdown",
      value: e.value
    };
}
var Vo = class {
  isApplicable() {
    return !0;
  }
  /**
   * Currently, unversioned data uses the V1 implementation
   * In the future when the provider handles multiple versions of HTML custom data,
   * use the latest implementation for unversioned data
   */
  constructor(e, t) {
    this.id = e, this._tags = [], this._tagMap = {}, this._valueSetMap = {}, this._tags = t.tags || [], this._globalAttributes = t.globalAttributes || [], this._tags.forEach((n) => {
      this._tagMap[n.name.toLowerCase()] = n;
    }), t.valueSets && t.valueSets.forEach((n) => {
      this._valueSetMap[n.name] = n.values;
    });
  }
  getId() {
    return this.id;
  }
  provideTags() {
    return this._tags;
  }
  provideAttributes(e) {
    const t = [], n = (r) => {
      t.push(r);
    }, i = this._tagMap[e.toLowerCase()];
    return i && i.attributes.forEach(n), this._globalAttributes.forEach(n), t;
  }
  provideValues(e, t) {
    const n = [];
    t = t.toLowerCase();
    const i = (a) => {
      a.forEach((s) => {
        s.name.toLowerCase() === t && (s.values && s.values.forEach((l) => {
          n.push(l);
        }), s.valueSet && this._valueSetMap[s.valueSet] && this._valueSetMap[s.valueSet].forEach((l) => {
          n.push(l);
        }));
      });
    }, r = this._tagMap[e.toLowerCase()];
    return r && i(r.attributes), i(this._globalAttributes), n;
  }
};
function it(e, t = {}, n) {
  const i = {
    kind: n ? "markdown" : "plaintext",
    value: ""
  };
  if (e.description && t.documentation !== !1) {
    const r = Uu(e.description);
    r && (i.value += r.value);
  }
  if (e.references && e.references.length > 0 && t.references !== !1 && (i.value.length && (i.value += `

`), n ? i.value += e.references.map((r) => `[${r.name}](${r.url})`).join(" | ") : i.value += e.references.map((r) => `${r.name}: ${r.url}`).join(`
`)), i.value !== "")
    return i;
}
var Pu = class {
  constructor(e, t) {
    this.dataManager = e, this.readDirectory = t, this.atributeCompletions = [];
  }
  onHtmlAttributeValue(e) {
    this.dataManager.isPathAttribute(e.tag, e.attribute) && this.atributeCompletions.push(e);
  }
  async computeCompletions(e, t) {
    const n = { items: [], isIncomplete: !1 };
    for (const i of this.atributeCompletions) {
      const r = Du(e.getText(i.range));
      if (Wu(r))
        if (r === "." || r === "..")
          n.isIncomplete = !0;
        else {
          const a = qu(i.value, r, i.range), s = await this.providePathSuggestions(i.value, a, e, t);
          for (const l of s)
            n.items.push(l);
        }
    }
    return n;
  }
  async providePathSuggestions(e, t, n, i) {
    const r = e.substring(0, e.lastIndexOf("/") + 1);
    let a = i.resolveReference(r || ".", n.uri);
    if (a)
      try {
        const s = [], l = await this.readDirectory(a);
        for (const [o, c] of l)
          o.charCodeAt(0) !== Hu && s.push(Fu(o, c === Ri.Directory, t));
        return s;
      } catch {
      }
    return [];
  }
}, Hu = 46;
function Du(e) {
  return Ye(e, "'") || Ye(e, '"') ? e.slice(1, -1) : e;
}
function Wu(e) {
  return !(Ye(e, "http") || Ye(e, "https") || Ye(e, "//"));
}
function qu(e, t, n) {
  let i;
  const r = e.lastIndexOf("/");
  if (r === -1)
    i = Bu(n, 1, -1);
  else {
    const a = t.slice(r + 1), s = Dt(n.end, -1 - a.length), l = a.indexOf(" ");
    let o;
    l !== -1 ? o = Dt(s, l) : o = Dt(n.end, -1), i = X.create(s, o);
  }
  return i;
}
function Fu(e, t, n) {
  return t ? (e = e + "/", {
    label: e,
    kind: be.Folder,
    textEdit: ue.replace(n, e),
    command: {
      title: "Suggest",
      command: "editor.action.triggerSuggest"
    }
  }) : {
    label: e,
    kind: be.File,
    textEdit: ue.replace(n, e)
  };
}
function Dt(e, t) {
  return oe.create(e.line, e.character + t);
}
function Bu(e, t, n) {
  const i = Dt(e.start, t), r = Dt(e.end, n);
  return X.create(i, r);
}
var Vu = class {
  constructor(e, t) {
    this.lsOptions = e, this.dataManager = t, this.completionParticipants = [];
  }
  setCompletionParticipants(e) {
    this.completionParticipants = e || [];
  }
  async doComplete2(e, t, n, i, r) {
    if (!this.lsOptions.fileSystemProvider || !this.lsOptions.fileSystemProvider.readDirectory)
      return this.doComplete(e, t, n, r);
    const a = new Pu(this.dataManager, this.lsOptions.fileSystemProvider.readDirectory), s = this.completionParticipants;
    this.completionParticipants = [a].concat(s);
    const l = this.doComplete(e, t, n, r);
    try {
      const o = await a.computeCompletions(e, i);
      return {
        isIncomplete: l.isIncomplete || o.isIncomplete,
        items: o.items.concat(l.items)
      };
    } finally {
      this.completionParticipants = s;
    }
  }
  doComplete(e, t, n, i) {
    const r = this._doComplete(e, t, n, i);
    return this.convertCompletionList(r);
  }
  _doComplete(e, t, n, i) {
    const r = {
      isIncomplete: !1,
      items: []
    }, a = this.completionParticipants, s = this.dataManager.getDataProviders().filter((v) => v.isApplicable(e.languageId) && (!i || i[v.getId()] !== !1)), l = this.dataManager.getVoidElements(s), o = this.doesSupportMarkdown(), c = e.getText(), h = e.offsetAt(t), d = n.findNodeBefore(h);
    if (!d)
      return r;
    const m = ke(c, d.start);
    let p = "", _;
    function b(v, L = h) {
      return v > h && (v = h), { start: e.positionAt(v), end: e.positionAt(L) };
    }
    function S(v, L) {
      const M = b(v, L);
      return s.forEach((O) => {
        O.provideTags().forEach((D) => {
          r.items.push({
            label: D.name,
            kind: be.Property,
            documentation: it(D, void 0, o),
            textEdit: ue.replace(M, D.name),
            insertTextFormat: Ne.PlainText
          });
        });
      }), r;
    }
    function y(v) {
      let L = v;
      for (; L > 0; ) {
        const M = c.charAt(L - 1);
        if (`
\r`.indexOf(M) >= 0)
          return c.substring(L, v);
        if (!yn(M))
          return null;
        L--;
      }
      return c.substring(0, v);
    }
    function w(v, L, M = h) {
      const O = b(v, M), D = Ks(c, M, B.WithinEndTag, z.EndTagClose) ? "" : ">";
      let P = d;
      for (L && (P = P.parent); P; ) {
        const H = P.tag;
        if (H && (!P.closed || P.endTagStart && P.endTagStart > h)) {
          const K = {
            label: "/" + H,
            kind: be.Property,
            filterText: "/" + H,
            textEdit: ue.replace(O, "/" + H + D),
            insertTextFormat: Ne.PlainText
          }, Y = y(P.start), ce = y(v - 1);
          if (Y !== null && ce !== null && Y !== ce) {
            const we = Y + "</" + H + D;
            K.textEdit = ue.replace(b(v - 1 - ce.length), we), K.filterText = ce + "</" + H;
          }
          return r.items.push(K), r;
        }
        P = P.parent;
      }
      return L || s.forEach((H) => {
        H.provideTags().forEach((K) => {
          r.items.push({
            label: "/" + K.name,
            kind: be.Property,
            documentation: it(K, void 0, o),
            filterText: "/" + K.name + D,
            textEdit: ue.replace(O, "/" + K.name + D),
            insertTextFormat: Ne.PlainText
          });
        });
      }), r;
    }
    const x = (v, L) => {
      if (i && i.hideAutoCompleteProposals)
        return r;
      if (!this.dataManager.isVoidElement(L, l)) {
        const M = e.positionAt(v);
        r.items.push({
          label: "</" + L + ">",
          kind: be.Property,
          filterText: "</" + L + ">",
          textEdit: ue.insert(M, "$0</" + L + ">"),
          insertTextFormat: Ne.Snippet
        });
      }
      return r;
    };
    function C(v, L) {
      return S(v, L), w(v, !0, L), r;
    }
    function I() {
      const v = /* @__PURE__ */ Object.create(null);
      return d.attributeNames.forEach((L) => {
        v[L] = !0;
      }), v;
    }
    function N(v, L = h) {
      let M = h;
      for (; M < L && c[M] !== "<"; )
        M++;
      const O = c.substring(v, L), D = b(v, M);
      let P = "";
      if (!Ks(c, L, B.AfterAttributeName, z.DelimiterAssign)) {
        const K = (i == null ? void 0 : i.attributeDefaultValue) ?? "doublequotes";
        K === "empty" ? P = "=$1" : K === "singlequotes" ? P = "='$1'" : P = '="$1"';
      }
      const H = I();
      return H[O] = !1, s.forEach((K) => {
        K.provideAttributes(p).forEach((Y) => {
          if (H[Y.name])
            return;
          H[Y.name] = !0;
          let ce = Y.name, we;
          Y.valueSet !== "v" && P.length && (ce = ce + P, (Y.valueSet || Y.name === "style") && (we = {
            title: "Suggest",
            command: "editor.action.triggerSuggest"
          })), r.items.push({
            label: Y.name,
            kind: Y.valueSet === "handler" ? be.Function : be.Value,
            documentation: it(Y, void 0, o),
            textEdit: ue.replace(D, ce),
            insertTextFormat: Ne.Snippet,
            command: we
          });
        });
      }), g(D, H), r;
    }
    function g(v, L) {
      const M = "data-", O = {};
      O[M] = `${M}$1="$2"`;
      function D(P) {
        P.attributeNames.forEach((H) => {
          Ye(H, M) && !O[H] && !L[H] && (O[H] = H + '="$1"');
        }), P.children.forEach((H) => D(H));
      }
      n && n.roots.forEach((P) => D(P)), Object.keys(O).forEach((P) => r.items.push({
        label: P,
        kind: be.Value,
        textEdit: ue.replace(v, O[P]),
        insertTextFormat: Ne.Snippet
      }));
    }
    function f(v, L = h) {
      let M, O, D;
      if (h > v && h <= L && Ku(c[v])) {
        const P = v + 1;
        let H = L;
        L > v && c[L - 1] === c[v] && H--;
        const K = ju(c, h, P), Y = $u(c, h, H);
        M = b(K, Y), D = h >= P && h <= H ? c.substring(P, h) : "", O = !1;
      } else
        M = b(v, L), D = c.substring(v, h), O = !0;
      if (a.length > 0) {
        const P = p.toLowerCase(), H = _.toLowerCase(), K = b(v, L);
        for (const Y of a)
          Y.onHtmlAttributeValue && Y.onHtmlAttributeValue({ document: e, position: t, tag: P, attribute: H, value: D, range: K });
      }
      return s.forEach((P) => {
        P.provideValues(p, _).forEach((H) => {
          const K = O ? '"' + H.name + '"' : H.name;
          r.items.push({
            label: H.name,
            filterText: K,
            kind: be.Unit,
            documentation: it(H, void 0, o),
            textEdit: ue.replace(M, K),
            insertTextFormat: Ne.PlainText
          });
        });
      }), k(), r;
    }
    function T(v) {
      return h === m.getTokenEnd() && (A = m.scan(), A === v && m.getTokenOffset() === h) ? m.getTokenEnd() : h;
    }
    function U() {
      for (const v of a)
        v.onHtmlContent && v.onHtmlContent({ document: e, position: t });
      return k();
    }
    function k() {
      let v = h - 1, L = t.character;
      for (; v >= 0 && It(c, v); )
        v--, L--;
      if (v >= 0 && c[v] === "&") {
        const M = X.create(oe.create(t.line, L - 1), t);
        for (const O in Ht)
          if (Ru(O, ";")) {
            const D = "&" + O;
            r.items.push({
              label: D,
              kind: be.Keyword,
              documentation: Me("Character entity representing '{0}'", Ht[O]),
              textEdit: ue.replace(M, D),
              insertTextFormat: Ne.PlainText
            });
          }
      }
      return r;
    }
    function E(v, L) {
      const M = b(v, L);
      r.items.push({
        label: "!DOCTYPE",
        kind: be.Property,
        documentation: "A preamble for an HTML document.",
        textEdit: ue.replace(M, "!DOCTYPE html>"),
        insertTextFormat: Ne.PlainText
      });
    }
    let A = m.scan();
    for (; A !== z.EOS && m.getTokenOffset() <= h; ) {
      switch (A) {
        case z.StartTagOpen:
          if (m.getTokenEnd() === h) {
            const v = T(z.StartTag);
            return t.line === 0 && E(h, v), C(h, v);
          }
          break;
        case z.StartTag:
          if (m.getTokenOffset() <= h && h <= m.getTokenEnd())
            return S(m.getTokenOffset(), m.getTokenEnd());
          p = m.getTokenText();
          break;
        case z.AttributeName:
          if (m.getTokenOffset() <= h && h <= m.getTokenEnd())
            return N(m.getTokenOffset(), m.getTokenEnd());
          _ = m.getTokenText();
          break;
        case z.DelimiterAssign:
          if (m.getTokenEnd() === h) {
            const v = T(z.AttributeValue);
            return f(h, v);
          }
          break;
        case z.AttributeValue:
          if (m.getTokenOffset() <= h && h <= m.getTokenEnd())
            return f(m.getTokenOffset(), m.getTokenEnd());
          break;
        case z.Whitespace:
          if (h <= m.getTokenEnd())
            switch (m.getScannerState()) {
              case B.AfterOpeningStartTag:
                const v = m.getTokenOffset(), L = T(z.StartTag);
                return C(v, L);
              case B.WithinTag:
              case B.AfterAttributeName:
                return N(m.getTokenEnd());
              case B.BeforeAttributeValue:
                return f(m.getTokenEnd());
              case B.AfterOpeningEndTag:
                return w(m.getTokenOffset() - 1, !1);
              case B.WithinContent:
                return U();
            }
          break;
        case z.EndTagOpen:
          if (h <= m.getTokenEnd()) {
            const v = m.getTokenOffset() + 1, L = T(z.EndTag);
            return w(v, !1, L);
          }
          break;
        case z.EndTag:
          if (h <= m.getTokenEnd()) {
            let v = m.getTokenOffset() - 1;
            for (; v >= 0; ) {
              const L = c.charAt(v);
              if (L === "/")
                return w(v, !1, m.getTokenEnd());
              if (!yn(L))
                break;
              v--;
            }
          }
          break;
        case z.StartTagClose:
          if (h <= m.getTokenEnd() && p)
            return x(m.getTokenEnd(), p);
          break;
        case z.Content:
          if (h <= m.getTokenEnd())
            return U();
          break;
        default:
          if (h <= m.getTokenEnd())
            return r;
          break;
      }
      A = m.scan();
    }
    return r;
  }
  doQuoteComplete(e, t, n, i) {
    const r = e.offsetAt(t);
    if (r <= 0)
      return null;
    const a = (i == null ? void 0 : i.attributeDefaultValue) ?? "doublequotes";
    if (a === "empty" || e.getText().charAt(r - 1) !== "=")
      return null;
    const s = a === "doublequotes" ? '"$1"' : "'$1'", l = n.findNodeBefore(r);
    if (l && l.attributes && l.start < r && (!l.endTagStart || l.endTagStart > r)) {
      const o = ke(e.getText(), l.start);
      let c = o.scan();
      for (; c !== z.EOS && o.getTokenEnd() <= r; ) {
        if (c === z.AttributeName && o.getTokenEnd() === r - 1)
          return c = o.scan(), c !== z.DelimiterAssign || (c = o.scan(), c === z.Unknown || c === z.AttributeValue) ? null : s;
        c = o.scan();
      }
    }
    return null;
  }
  doTagComplete(e, t, n) {
    const i = e.offsetAt(t);
    if (i <= 0)
      return null;
    const r = e.getText().charAt(i - 1);
    if (r === ">") {
      const a = this.dataManager.getVoidElements(e.languageId), s = n.findNodeBefore(i);
      if (s && s.tag && !this.dataManager.isVoidElement(s.tag, a) && s.start < i && (!s.endTagStart || s.endTagStart > i)) {
        const l = ke(e.getText(), s.start);
        let o = l.scan();
        for (; o !== z.EOS && l.getTokenEnd() <= i; ) {
          if (o === z.StartTagClose && l.getTokenEnd() === i)
            return `$0</${s.tag}>`;
          o = l.scan();
        }
      }
    } else if (r === "/") {
      let a = n.findNodeBefore(i);
      for (; a && a.closed && !(a.endTagStart && a.endTagStart > i); )
        a = a.parent;
      if (a && a.tag) {
        const s = ke(e.getText(), a.start);
        let l = s.scan();
        for (; l !== z.EOS && s.getTokenEnd() <= i; ) {
          if (l === z.EndTagOpen && s.getTokenEnd() === i)
            return e.getText().charAt(i) !== ">" ? `${a.tag}>` : a.tag;
          l = s.scan();
        }
      }
    }
    return null;
  }
  convertCompletionList(e) {
    return this.doesSupportMarkdown() || e.items.forEach((t) => {
      t.documentation && typeof t.documentation != "string" && (t.documentation = {
        kind: "plaintext",
        value: t.documentation.value
      });
    }), e;
  }
  doesSupportMarkdown() {
    var e, t, n;
    if (!vn(this.supportsMarkdown)) {
      if (!vn(this.lsOptions.clientCapabilities))
        return this.supportsMarkdown = !0, this.supportsMarkdown;
      const i = (n = (t = (e = this.lsOptions.clientCapabilities.textDocument) == null ? void 0 : e.completion) == null ? void 0 : t.completionItem) == null ? void 0 : n.documentationFormat;
      this.supportsMarkdown = Array.isArray(i) && i.indexOf(De.Markdown) !== -1;
    }
    return this.supportsMarkdown;
  }
};
function Ku(e) {
  return /^["']*$/.test(e);
}
function yn(e) {
  return /^\s*$/.test(e);
}
function Ks(e, t, n, i) {
  const r = ke(e, t, n);
  let a = r.scan();
  for (; a === z.Whitespace; )
    a = r.scan();
  return a === i;
}
function ju(e, t, n) {
  for (; t > n && !yn(e[t - 1]); )
    t--;
  return t;
}
function $u(e, t, n) {
  for (; t < n && !yn(e[t]); )
    t++;
  return t;
}
var Gu = class {
  constructor(e, t) {
    this.lsOptions = e, this.dataManager = t;
  }
  doHover(e, t, n, i) {
    const r = this.convertContents.bind(this), a = this.doesSupportMarkdown(), s = e.offsetAt(t), l = n.findNodeAt(s), o = e.getText();
    if (!l || !l.tag)
      return null;
    const c = this.dataManager.getDataProviders().filter((N) => N.isApplicable(e.languageId));
    function h(N, g, f) {
      for (const T of c) {
        let U = null;
        if (T.provideTags().forEach((k) => {
          if (k.name.toLowerCase() === N.toLowerCase()) {
            let E = it(k, i, a);
            E || (E = {
              kind: a ? "markdown" : "plaintext",
              value: ""
            }), U = { contents: E, range: g };
          }
        }), U)
          return U.contents = r(U.contents), U;
      }
      return null;
    }
    function d(N, g, f) {
      for (const T of c) {
        let U = null;
        if (T.provideAttributes(N).forEach((k) => {
          if (g === k.name && k.description) {
            const E = it(k, i, a);
            E ? U = { contents: E, range: f } : U = null;
          }
        }), U)
          return U.contents = r(U.contents), U;
      }
      return null;
    }
    function m(N, g, f, T) {
      for (const U of c) {
        let k = null;
        if (U.provideValues(N, g).forEach((E) => {
          if (f === E.name && E.description) {
            const A = it(E, i, a);
            A ? k = { contents: A, range: T } : k = null;
          }
        }), k)
          return k.contents = r(k.contents), k;
      }
      return null;
    }
    function p(N, g) {
      let f = S(N);
      for (const T in Ht) {
        let U = null;
        const k = "&" + T;
        if (f === k) {
          let E = Ht[T].charCodeAt(0).toString(16).toUpperCase(), A = "U+";
          if (E.length < 4) {
            const L = 4 - E.length;
            let M = 0;
            for (; M < L; )
              A += "0", M += 1;
          }
          A += E;
          const v = Me("Character entity representing '{0}', unicode equivalent '{1}'", Ht[T], A);
          v ? U = { contents: v, range: g } : U = null;
        }
        if (U)
          return U.contents = r(U.contents), U;
      }
      return null;
    }
    function _(N, g) {
      const f = ke(e.getText(), g);
      let T = f.scan();
      for (; T !== z.EOS && (f.getTokenEnd() < s || f.getTokenEnd() === s && T !== N); )
        T = f.scan();
      return T === N && s <= f.getTokenEnd() ? { start: e.positionAt(f.getTokenOffset()), end: e.positionAt(f.getTokenEnd()) } : null;
    }
    function b() {
      let N = s - 1, g = t.character;
      for (; N >= 0 && It(o, N); )
        N--, g--;
      let f = N + 1, T = g;
      for (; It(o, f); )
        f++, T++;
      if (N >= 0 && o[N] === "&") {
        let U = null;
        return o[f] === ";" ? U = X.create(oe.create(t.line, g), oe.create(t.line, T + 1)) : U = X.create(oe.create(t.line, g), oe.create(t.line, T)), U;
      }
      return null;
    }
    function S(N) {
      let g = s - 1, f = "&";
      for (; g >= 0 && It(N, g); )
        g--;
      for (g = g + 1; It(N, g); )
        f += N[g], g += 1;
      return f += ";", f;
    }
    if (l.endTagStart && s >= l.endTagStart) {
      const N = _(z.EndTag, l.endTagStart);
      return N ? h(l.tag, N) : null;
    }
    const y = _(z.StartTag, l.start);
    if (y)
      return h(l.tag, y);
    const w = _(z.AttributeName, l.start);
    if (w) {
      const N = l.tag, g = e.getText(w);
      return d(N, g, w);
    }
    const x = b();
    if (x)
      return p(o, x);
    function C(N, g) {
      const f = ke(e.getText(), N);
      let T = f.scan(), U;
      for (; T !== z.EOS && f.getTokenEnd() <= g; )
        T = f.scan(), T === z.AttributeName && (U = f.getTokenText());
      return U;
    }
    const I = _(z.AttributeValue, l.start);
    if (I) {
      const N = l.tag, g = Xu(e.getText(I)), f = C(l.start, e.offsetAt(I.start));
      if (f)
        return m(N, f, g, I);
    }
    return null;
  }
  convertContents(e) {
    if (!this.doesSupportMarkdown()) {
      if (typeof e == "string")
        return e;
      if ("kind" in e)
        return {
          kind: "plaintext",
          value: e.value
        };
      if (Array.isArray(e))
        e.map((t) => typeof t == "string" ? t : t.value);
      else
        return e.value;
    }
    return e;
  }
  doesSupportMarkdown() {
    var e, t, n;
    if (!vn(this.supportsMarkdown)) {
      if (!vn(this.lsOptions.clientCapabilities))
        return this.supportsMarkdown = !0, this.supportsMarkdown;
      const i = (n = (t = (e = this.lsOptions.clientCapabilities) == null ? void 0 : e.textDocument) == null ? void 0 : t.hover) == null ? void 0 : n.contentFormat;
      this.supportsMarkdown = Array.isArray(i) && i.indexOf(De.Markdown) !== -1;
    }
    return this.supportsMarkdown;
  }
};
function Xu(e) {
  return e.length <= 1 ? e.replace(/['"]/, "") : ((e[0] === "'" || e[0] === '"') && (e = e.slice(1)), (e[e.length - 1] === "'" || e[e.length - 1] === '"') && (e = e.slice(0, -1)), e);
}
function Ju(e, t) {
  return e;
}
var Ko;
(function() {
  var e = [
    ,
    ,
    /* 2 */
    /***/
    function(r) {
      function a(o) {
        this.__parent = o, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index = 0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count = 0, this.__items = [];
      }
      a.prototype.clone_empty = function() {
        var o = new a(this.__parent);
        return o.set_indent(this.__indent_count, this.__alignment_count), o;
      }, a.prototype.item = function(o) {
        return o < 0 ? this.__items[this.__items.length + o] : this.__items[o];
      }, a.prototype.has_match = function(o) {
        for (var c = this.__items.length - 1; c >= 0; c--)
          if (this.__items[c].match(o))
            return !0;
        return !1;
      }, a.prototype.set_indent = function(o, c) {
        this.is_empty() && (this.__indent_count = o || 0, this.__alignment_count = c || 0, this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count));
      }, a.prototype._set_wrap_point = function() {
        this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count = this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count);
      }, a.prototype._should_wrap = function() {
        return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
      }, a.prototype._allow_wrap = function() {
        if (this._should_wrap()) {
          this.__parent.add_new_line();
          var o = this.__parent.current_line;
          return o.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), o.__items = this.__items.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), o.__character_count += this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count, o.__items[0] === " " && (o.__items.splice(0, 1), o.__character_count -= 1), !0;
        }
        return !1;
      }, a.prototype.is_empty = function() {
        return this.__items.length === 0;
      }, a.prototype.last = function() {
        return this.is_empty() ? null : this.__items[this.__items.length - 1];
      }, a.prototype.push = function(o) {
        this.__items.push(o);
        var c = o.lastIndexOf(`
`);
        c !== -1 ? this.__character_count = o.length - c : this.__character_count += o.length;
      }, a.prototype.pop = function() {
        var o = null;
        return this.is_empty() || (o = this.__items.pop(), this.__character_count -= o.length), o;
      }, a.prototype._remove_indent = function() {
        this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size);
      }, a.prototype._remove_wrap_indent = function() {
        this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
      }, a.prototype.trim = function() {
        for (; this.last() === " "; )
          this.__items.pop(), this.__character_count -= 1;
      }, a.prototype.toString = function() {
        var o = "";
        return this.is_empty() ? this.__parent.indent_empty_lines && (o = this.__parent.get_indent_string(this.__indent_count)) : (o = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), o += this.__items.join("")), o;
      };
      function s(o, c) {
        this.__cache = [""], this.__indent_size = o.indent_size, this.__indent_string = o.indent_char, o.indent_with_tabs || (this.__indent_string = new Array(o.indent_size + 1).join(o.indent_char)), c = c || "", o.indent_level > 0 && (c = new Array(o.indent_level + 1).join(this.__indent_string)), this.__base_string = c, this.__base_string_length = c.length;
      }
      s.prototype.get_indent_size = function(o, c) {
        var h = this.__base_string_length;
        return c = c || 0, o < 0 && (h = 0), h += o * this.__indent_size, h += c, h;
      }, s.prototype.get_indent_string = function(o, c) {
        var h = this.__base_string;
        return c = c || 0, o < 0 && (o = 0, h = ""), c += o * this.__indent_size, this.__ensure_cache(c), h += this.__cache[c], h;
      }, s.prototype.__ensure_cache = function(o) {
        for (; o >= this.__cache.length; )
          this.__add_column();
      }, s.prototype.__add_column = function() {
        var o = this.__cache.length, c = 0, h = "";
        this.__indent_size && o >= this.__indent_size && (c = Math.floor(o / this.__indent_size), o -= c * this.__indent_size, h = new Array(c + 1).join(this.__indent_string)), o && (h += new Array(o + 1).join(" ")), this.__cache.push(h);
      };
      function l(o, c) {
        this.__indent_cache = new s(o, c), this.raw = !1, this._end_with_newline = o.end_with_newline, this.indent_size = o.indent_size, this.wrap_line_length = o.wrap_line_length, this.indent_empty_lines = o.indent_empty_lines, this.__lines = [], this.previous_line = null, this.current_line = null, this.next_line = new a(this), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1, this.__add_outputline();
      }
      l.prototype.__add_outputline = function() {
        this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this.current_line);
      }, l.prototype.get_line_number = function() {
        return this.__lines.length;
      }, l.prototype.get_indent_string = function(o, c) {
        return this.__indent_cache.get_indent_string(o, c);
      }, l.prototype.get_indent_size = function(o, c) {
        return this.__indent_cache.get_indent_size(o, c);
      }, l.prototype.is_empty = function() {
        return !this.previous_line && this.current_line.is_empty();
      }, l.prototype.add_new_line = function(o) {
        return this.is_empty() || !o && this.just_added_newline() ? !1 : (this.raw || this.__add_outputline(), !0);
      }, l.prototype.get_code = function(o) {
        this.trim(!0);
        var c = this.current_line.pop();
        c && (c[c.length - 1] === `
` && (c = c.replace(/\n+$/g, "")), this.current_line.push(c)), this._end_with_newline && this.__add_outputline();
        var h = this.__lines.join(`
`);
        return o !== `
` && (h = h.replace(/[\n]/g, o)), h;
      }, l.prototype.set_wrap_point = function() {
        this.current_line._set_wrap_point();
      }, l.prototype.set_indent = function(o, c) {
        return o = o || 0, c = c || 0, this.next_line.set_indent(o, c), this.__lines.length > 1 ? (this.current_line.set_indent(o, c), !0) : (this.current_line.set_indent(), !1);
      }, l.prototype.add_raw_token = function(o) {
        for (var c = 0; c < o.newlines; c++)
          this.__add_outputline();
        this.current_line.set_indent(-1), this.current_line.push(o.whitespace_before), this.current_line.push(o.text), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1;
      }, l.prototype.add_token = function(o) {
        this.__add_space_before_token(), this.current_line.push(o), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = this.current_line._allow_wrap();
      }, l.prototype.__add_space_before_token = function() {
        this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(" "));
      }, l.prototype.remove_indent = function(o) {
        for (var c = this.__lines.length; o < c; )
          this.__lines[o]._remove_indent(), o++;
        this.current_line._remove_wrap_indent();
      }, l.prototype.trim = function(o) {
        for (o = o === void 0 ? !1 : o, this.current_line.trim(); o && this.__lines.length > 1 && this.current_line.is_empty(); )
          this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
        this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
      }, l.prototype.just_added_newline = function() {
        return this.current_line.is_empty();
      }, l.prototype.just_added_blankline = function() {
        return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
      }, l.prototype.ensure_empty_line_above = function(o, c) {
        for (var h = this.__lines.length - 2; h >= 0; ) {
          var d = this.__lines[h];
          if (d.is_empty())
            break;
          if (d.item(0).indexOf(o) !== 0 && d.item(-1) !== c) {
            this.__lines.splice(h + 1, 0, new a(this)), this.previous_line = this.__lines[this.__lines.length - 2];
            break;
          }
          h--;
        }
      }, r.exports.Output = l;
    },
    ,
    ,
    ,
    /* 6 */
    /***/
    function(r) {
      function a(o, c) {
        this.raw_options = s(o, c), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol", "auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number("indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number("indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0), this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	"), this.indent_with_tabs && (this.indent_char = "	", this.indent_size === 1 && (this.indent_size = 4)), this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean("indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
      }
      a.prototype._get_array = function(o, c) {
        var h = this.raw_options[o], d = c || [];
        return typeof h == "object" ? h !== null && typeof h.concat == "function" && (d = h.concat()) : typeof h == "string" && (d = h.split(/[^a-zA-Z0-9_\/\-]+/)), d;
      }, a.prototype._get_boolean = function(o, c) {
        var h = this.raw_options[o], d = h === void 0 ? !!c : !!h;
        return d;
      }, a.prototype._get_characters = function(o, c) {
        var h = this.raw_options[o], d = c || "";
        return typeof h == "string" && (d = h.replace(/\\r/, "\r").replace(/\\n/, `
`).replace(/\\t/, "	")), d;
      }, a.prototype._get_number = function(o, c) {
        var h = this.raw_options[o];
        c = parseInt(c, 10), isNaN(c) && (c = 0);
        var d = parseInt(h, 10);
        return isNaN(d) && (d = c), d;
      }, a.prototype._get_selection = function(o, c, h) {
        var d = this._get_selection_list(o, c, h);
        if (d.length !== 1)
          throw new Error(
            "Invalid Option Value: The option '" + o + `' can only be one of the following values:
` + c + `
You passed in: '` + this.raw_options[o] + "'"
          );
        return d[0];
      }, a.prototype._get_selection_list = function(o, c, h) {
        if (!c || c.length === 0)
          throw new Error("Selection list cannot be empty.");
        if (h = h || [c[0]], !this._is_valid_selection(h, c))
          throw new Error("Invalid Default Value!");
        var d = this._get_array(o, h);
        if (!this._is_valid_selection(d, c))
          throw new Error(
            "Invalid Option Value: The option '" + o + `' can contain only the following values:
` + c + `
You passed in: '` + this.raw_options[o] + "'"
          );
        return d;
      }, a.prototype._is_valid_selection = function(o, c) {
        return o.length && c.length && !o.some(function(h) {
          return c.indexOf(h) === -1;
        });
      };
      function s(o, c) {
        var h = {};
        o = l(o);
        var d;
        for (d in o)
          d !== c && (h[d] = o[d]);
        if (c && o[c])
          for (d in o[c])
            h[d] = o[c][d];
        return h;
      }
      function l(o) {
        var c = {}, h;
        for (h in o) {
          var d = h.replace(/-/g, "_");
          c[d] = o[h];
        }
        return c;
      }
      r.exports.Options = a, r.exports.normalizeOpts = l, r.exports.mergeOpts = s;
    },
    ,
    /* 8 */
    /***/
    function(r) {
      var a = RegExp.prototype.hasOwnProperty("sticky");
      function s(l) {
        this.__input = l || "", this.__input_length = this.__input.length, this.__position = 0;
      }
      s.prototype.restart = function() {
        this.__position = 0;
      }, s.prototype.back = function() {
        this.__position > 0 && (this.__position -= 1);
      }, s.prototype.hasNext = function() {
        return this.__position < this.__input_length;
      }, s.prototype.next = function() {
        var l = null;
        return this.hasNext() && (l = this.__input.charAt(this.__position), this.__position += 1), l;
      }, s.prototype.peek = function(l) {
        var o = null;
        return l = l || 0, l += this.__position, l >= 0 && l < this.__input_length && (o = this.__input.charAt(l)), o;
      }, s.prototype.__match = function(l, o) {
        l.lastIndex = o;
        var c = l.exec(this.__input);
        return c && !(a && l.sticky) && c.index !== o && (c = null), c;
      }, s.prototype.test = function(l, o) {
        return o = o || 0, o += this.__position, o >= 0 && o < this.__input_length ? !!this.__match(l, o) : !1;
      }, s.prototype.testChar = function(l, o) {
        var c = this.peek(o);
        return l.lastIndex = 0, c !== null && l.test(c);
      }, s.prototype.match = function(l) {
        var o = this.__match(l, this.__position);
        return o ? this.__position += o[0].length : o = null, o;
      }, s.prototype.read = function(l, o, c) {
        var h = "", d;
        return l && (d = this.match(l), d && (h += d[0])), o && (d || !l) && (h += this.readUntil(o, c)), h;
      }, s.prototype.readUntil = function(l, o) {
        var c = "", h = this.__position;
        l.lastIndex = this.__position;
        var d = l.exec(this.__input);
        return d ? (h = d.index, o && (h += d[0].length)) : h = this.__input_length, c = this.__input.substring(this.__position, h), this.__position = h, c;
      }, s.prototype.readUntilAfter = function(l) {
        return this.readUntil(l, !0);
      }, s.prototype.get_regexp = function(l, o) {
        var c = null, h = "g";
        return o && a && (h = "y"), typeof l == "string" && l !== "" ? c = new RegExp(l, h) : l && (c = new RegExp(l.source, h)), c;
      }, s.prototype.get_literal_regexp = function(l) {
        return RegExp(l.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
      }, s.prototype.peekUntilAfter = function(l) {
        var o = this.__position, c = this.readUntilAfter(l);
        return this.__position = o, c;
      }, s.prototype.lookBack = function(l) {
        var o = this.__position - 1;
        return o >= l.length && this.__input.substring(o - l.length, o).toLowerCase() === l;
      }, r.exports.InputScanner = s;
    },
    ,
    ,
    ,
    ,
    /* 13 */
    /***/
    function(r) {
      function a(s, l) {
        s = typeof s == "string" ? s : s.source, l = typeof l == "string" ? l : l.source, this.__directives_block_pattern = new RegExp(s + / beautify( \w+[:]\w+)+ /.source + l, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern = new RegExp(s + /\sbeautify\signore:end\s/.source + l, "g");
      }
      a.prototype.get_directives = function(s) {
        if (!s.match(this.__directives_block_pattern))
          return null;
        var l = {};
        this.__directive_pattern.lastIndex = 0;
        for (var o = this.__directive_pattern.exec(s); o; )
          l[o[1]] = o[2], o = this.__directive_pattern.exec(s);
        return l;
      }, a.prototype.readIgnored = function(s) {
        return s.readUntilAfter(this.__directives_end_ignore_pattern);
      }, r.exports.Directives = a;
    },
    ,
    /* 15 */
    /***/
    function(r, a, s) {
      var l = s(16).Beautifier, o = s(17).Options;
      function c(h, d) {
        var m = new l(h, d);
        return m.beautify();
      }
      r.exports = c, r.exports.defaultOptions = function() {
        return new o();
      };
    },
    /* 16 */
    /***/
    function(r, a, s) {
      var l = s(17).Options, o = s(2).Output, c = s(8).InputScanner, h = s(13).Directives, d = new h(/\/\*/, /\*\//), m = /\r\n|[\r\n]/, p = /\r\n|[\r\n]/g, _ = /\s/, b = /(?:\s|\n)+/g, S = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g, y = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
      function w(x, C) {
        this._source_text = x || "", this._options = new l(C), this._ch = null, this._input = null, this.NESTED_AT_RULE = {
          page: !0,
          "font-face": !0,
          keyframes: !0,
          // also in CONDITIONAL_GROUP_RULE below
          media: !0,
          supports: !0,
          document: !0
        }, this.CONDITIONAL_GROUP_RULE = {
          media: !0,
          supports: !0,
          document: !0
        }, this.NON_SEMICOLON_NEWLINE_PROPERTY = [
          "grid-template-areas",
          "grid-template"
        ];
      }
      w.prototype.eatString = function(x) {
        var C = "";
        for (this._ch = this._input.next(); this._ch; ) {
          if (C += this._ch, this._ch === "\\")
            C += this._input.next();
          else if (x.indexOf(this._ch) !== -1 || this._ch === `
`)
            break;
          this._ch = this._input.next();
        }
        return C;
      }, w.prototype.eatWhitespace = function(x) {
        for (var C = _.test(this._input.peek()), I = 0; _.test(this._input.peek()); )
          this._ch = this._input.next(), x && this._ch === `
` && (I === 0 || I < this._options.max_preserve_newlines) && (I++, this._output.add_new_line(!0));
        return C;
      }, w.prototype.foundNestedPseudoClass = function() {
        for (var x = 0, C = 1, I = this._input.peek(C); I; ) {
          if (I === "{")
            return !0;
          if (I === "(")
            x += 1;
          else if (I === ")") {
            if (x === 0)
              return !1;
            x -= 1;
          } else if (I === ";" || I === "}")
            return !1;
          C++, I = this._input.peek(C);
        }
        return !1;
      }, w.prototype.print_string = function(x) {
        this._output.set_indent(this._indentLevel), this._output.non_breaking_space = !0, this._output.add_token(x);
      }, w.prototype.preserveSingleSpace = function(x) {
        x && (this._output.space_before_token = !0);
      }, w.prototype.indent = function() {
        this._indentLevel++;
      }, w.prototype.outdent = function() {
        this._indentLevel > 0 && this._indentLevel--;
      }, w.prototype.beautify = function() {
        if (this._options.disabled)
          return this._source_text;
        var x = this._source_text, C = this._options.eol;
        C === "auto" && (C = `
`, x && m.test(x || "") && (C = x.match(m)[0])), x = x.replace(p, `
`);
        var I = x.match(/^[\t ]*/)[0];
        this._output = new o(this._options, I), this._input = new c(x), this._indentLevel = 0, this._nestedLevel = 0, this._ch = null;
        for (var N = 0, g = !1, f = !1, T = !1, U = !1, k = !1, E = this._ch, A = !1, v, L, M; v = this._input.read(b), L = v !== "", M = E, this._ch = this._input.next(), this._ch === "\\" && this._input.hasNext() && (this._ch += this._input.next()), E = this._ch, this._ch; )
          if (this._ch === "/" && this._input.peek() === "*") {
            this._output.add_new_line(), this._input.back();
            var O = this._input.read(S), D = d.get_directives(O);
            D && D.ignore === "start" && (O += d.readIgnored(this._input)), this.print_string(O), this.eatWhitespace(!0), this._output.add_new_line();
          } else if (this._ch === "/" && this._input.peek() === "/")
            this._output.space_before_token = !0, this._input.back(), this.print_string(this._input.read(y)), this.eatWhitespace(!0);
          else if (this._ch === "$") {
            this.preserveSingleSpace(L), this.print_string(this._ch);
            var P = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
            P.match(/[ :]$/) && (P = this.eatString(": ").replace(/\s+$/, ""), this.print_string(P), this._output.space_before_token = !0), N === 0 && P.indexOf(":") !== -1 && (f = !0, this.indent());
          } else if (this._ch === "@")
            if (this.preserveSingleSpace(L), this._input.peek() === "{")
              this.print_string(this._ch + this.eatString("}"));
            else {
              this.print_string(this._ch);
              var H = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
              H.match(/[ :]$/) && (H = this.eatString(": ").replace(/\s+$/, ""), this.print_string(H), this._output.space_before_token = !0), N === 0 && H.indexOf(":") !== -1 ? (f = !0, this.indent()) : H in this.NESTED_AT_RULE ? (this._nestedLevel += 1, H in this.CONDITIONAL_GROUP_RULE && (T = !0)) : N === 0 && !f && (U = !0);
            }
          else if (this._ch === "#" && this._input.peek() === "{")
            this.preserveSingleSpace(L), this.print_string(this._ch + this.eatString("}"));
          else if (this._ch === "{")
            f && (f = !1, this.outdent()), U = !1, T ? (T = !1, g = this._indentLevel >= this._nestedLevel) : g = this._indentLevel >= this._nestedLevel - 1, this._options.newline_between_rules && g && this._output.previous_line && this._output.previous_line.item(-1) !== "{" && this._output.ensure_empty_line_above("/", ","), this._output.space_before_token = !0, this._options.brace_style === "expand" ? (this._output.add_new_line(), this.print_string(this._ch), this.indent(), this._output.set_indent(this._indentLevel)) : (M === "(" ? this._output.space_before_token = !1 : M !== "," && this.indent(), this.print_string(this._ch)), this.eatWhitespace(!0), this._output.add_new_line();
          else if (this._ch === "}")
            this.outdent(), this._output.add_new_line(), M === "{" && this._output.trim(!0), f && (this.outdent(), f = !1), this.print_string(this._ch), g = !1, this._nestedLevel && this._nestedLevel--, this.eatWhitespace(!0), this._output.add_new_line(), this._options.newline_between_rules && !this._output.just_added_blankline() && this._input.peek() !== "}" && this._output.add_new_line(!0), this._input.peek() === ")" && (this._output.trim(!0), this._options.brace_style === "expand" && this._output.add_new_line(!0));
          else if (this._ch === ":") {
            for (var K = 0; K < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; K++)
              if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[K])) {
                A = !0;
                break;
              }
            (g || T) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !U && N === 0 ? (this.print_string(":"), f || (f = !0, this._output.space_before_token = !0, this.eatWhitespace(!0), this.indent())) : (this._input.lookBack(" ") && (this._output.space_before_token = !0), this._input.peek() === ":" ? (this._ch = this._input.next(), this.print_string("::")) : this.print_string(":"));
          } else if (this._ch === '"' || this._ch === "'") {
            var Y = M === '"' || M === "'";
            this.preserveSingleSpace(Y || L), this.print_string(this._ch + this.eatString(this._ch)), this.eatWhitespace(!0);
          } else if (this._ch === ";")
            A = !1, N === 0 ? (f && (this.outdent(), f = !1), U = !1, this.print_string(this._ch), this.eatWhitespace(!0), this._input.peek() !== "/" && this._output.add_new_line()) : (this.print_string(this._ch), this.eatWhitespace(!0), this._output.space_before_token = !0);
          else if (this._ch === "(")
            if (this._input.lookBack("url"))
              this.print_string(this._ch), this.eatWhitespace(), N++, this.indent(), this._ch = this._input.next(), this._ch === ")" || this._ch === '"' || this._ch === "'" ? this._input.back() : this._ch && (this.print_string(this._ch + this.eatString(")")), N && (N--, this.outdent()));
            else {
              var ce = !1;
              this._input.lookBack("with") && (ce = !0), this.preserveSingleSpace(L || ce), this.print_string(this._ch), f && M === "$" && this._options.selector_separator_newline ? (this._output.add_new_line(), k = !0) : (this.eatWhitespace(), N++, this.indent());
            }
          else if (this._ch === ")")
            N && (N--, this.outdent()), k && this._input.peek() === ";" && this._options.selector_separator_newline && (k = !1, this.outdent(), this._output.add_new_line()), this.print_string(this._ch);
          else if (this._ch === ",")
            this.print_string(this._ch), this.eatWhitespace(!0), this._options.selector_separator_newline && (!f || k) && N === 0 && !U ? this._output.add_new_line() : this._output.space_before_token = !0;
          else if ((this._ch === ">" || this._ch === "+" || this._ch === "~") && !f && N === 0)
            this._options.space_around_combinator ? (this._output.space_before_token = !0, this.print_string(this._ch), this._output.space_before_token = !0) : (this.print_string(this._ch), this.eatWhitespace(), this._ch && _.test(this._ch) && (this._ch = ""));
          else if (this._ch === "]")
            this.print_string(this._ch);
          else if (this._ch === "[")
            this.preserveSingleSpace(L), this.print_string(this._ch);
          else if (this._ch === "=")
            this.eatWhitespace(), this.print_string("="), _.test(this._ch) && (this._ch = "");
          else if (this._ch === "!" && !this._input.lookBack("\\"))
            this._output.space_before_token = !0, this.print_string(this._ch);
          else {
            var we = M === '"' || M === "'";
            this.preserveSingleSpace(we || L), this.print_string(this._ch), !this._output.just_added_newline() && this._input.peek() === `
` && A && this._output.add_new_line();
          }
        var Sn = this._output.get_code(C);
        return Sn;
      }, r.exports.Beautifier = w;
    },
    /* 17 */
    /***/
    function(r, a, s) {
      var l = s(6).Options;
      function o(c) {
        l.call(this, c, "css"), this.selector_separator_newline = this._get_boolean("selector_separator_newline", !0), this.newline_between_rules = this._get_boolean("newline_between_rules", !0);
        var h = this._get_boolean("space_around_selector_separator");
        this.space_around_combinator = this._get_boolean("space_around_combinator") || h;
        var d = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
        this.brace_style = "collapse";
        for (var m = 0; m < d.length; m++)
          d[m] !== "expand" ? this.brace_style = "collapse" : this.brace_style = d[m];
      }
      o.prototype = new l(), r.exports.Options = o;
    }
    /******/
  ], t = {};
  function n(r) {
    var a = t[r];
    if (a !== void 0)
      return a.exports;
    var s = t[r] = {
      /******/
      // no module.id needed
      /******/
      // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    return e[r](s, s.exports, n), s.exports;
  }
  var i = n(15);
  Ko = i;
})();
var Yu = Ko, jo;
(function() {
  var e = [
    ,
    ,
    /* 2 */
    /***/
    function(r) {
      function a(o) {
        this.__parent = o, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index = 0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count = 0, this.__items = [];
      }
      a.prototype.clone_empty = function() {
        var o = new a(this.__parent);
        return o.set_indent(this.__indent_count, this.__alignment_count), o;
      }, a.prototype.item = function(o) {
        return o < 0 ? this.__items[this.__items.length + o] : this.__items[o];
      }, a.prototype.has_match = function(o) {
        for (var c = this.__items.length - 1; c >= 0; c--)
          if (this.__items[c].match(o))
            return !0;
        return !1;
      }, a.prototype.set_indent = function(o, c) {
        this.is_empty() && (this.__indent_count = o || 0, this.__alignment_count = c || 0, this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count));
      }, a.prototype._set_wrap_point = function() {
        this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count = this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count);
      }, a.prototype._should_wrap = function() {
        return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
      }, a.prototype._allow_wrap = function() {
        if (this._should_wrap()) {
          this.__parent.add_new_line();
          var o = this.__parent.current_line;
          return o.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), o.__items = this.__items.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), o.__character_count += this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count, o.__items[0] === " " && (o.__items.splice(0, 1), o.__character_count -= 1), !0;
        }
        return !1;
      }, a.prototype.is_empty = function() {
        return this.__items.length === 0;
      }, a.prototype.last = function() {
        return this.is_empty() ? null : this.__items[this.__items.length - 1];
      }, a.prototype.push = function(o) {
        this.__items.push(o);
        var c = o.lastIndexOf(`
`);
        c !== -1 ? this.__character_count = o.length - c : this.__character_count += o.length;
      }, a.prototype.pop = function() {
        var o = null;
        return this.is_empty() || (o = this.__items.pop(), this.__character_count -= o.length), o;
      }, a.prototype._remove_indent = function() {
        this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size);
      }, a.prototype._remove_wrap_indent = function() {
        this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
      }, a.prototype.trim = function() {
        for (; this.last() === " "; )
          this.__items.pop(), this.__character_count -= 1;
      }, a.prototype.toString = function() {
        var o = "";
        return this.is_empty() ? this.__parent.indent_empty_lines && (o = this.__parent.get_indent_string(this.__indent_count)) : (o = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), o += this.__items.join("")), o;
      };
      function s(o, c) {
        this.__cache = [""], this.__indent_size = o.indent_size, this.__indent_string = o.indent_char, o.indent_with_tabs || (this.__indent_string = new Array(o.indent_size + 1).join(o.indent_char)), c = c || "", o.indent_level > 0 && (c = new Array(o.indent_level + 1).join(this.__indent_string)), this.__base_string = c, this.__base_string_length = c.length;
      }
      s.prototype.get_indent_size = function(o, c) {
        var h = this.__base_string_length;
        return c = c || 0, o < 0 && (h = 0), h += o * this.__indent_size, h += c, h;
      }, s.prototype.get_indent_string = function(o, c) {
        var h = this.__base_string;
        return c = c || 0, o < 0 && (o = 0, h = ""), c += o * this.__indent_size, this.__ensure_cache(c), h += this.__cache[c], h;
      }, s.prototype.__ensure_cache = function(o) {
        for (; o >= this.__cache.length; )
          this.__add_column();
      }, s.prototype.__add_column = function() {
        var o = this.__cache.length, c = 0, h = "";
        this.__indent_size && o >= this.__indent_size && (c = Math.floor(o / this.__indent_size), o -= c * this.__indent_size, h = new Array(c + 1).join(this.__indent_string)), o && (h += new Array(o + 1).join(" ")), this.__cache.push(h);
      };
      function l(o, c) {
        this.__indent_cache = new s(o, c), this.raw = !1, this._end_with_newline = o.end_with_newline, this.indent_size = o.indent_size, this.wrap_line_length = o.wrap_line_length, this.indent_empty_lines = o.indent_empty_lines, this.__lines = [], this.previous_line = null, this.current_line = null, this.next_line = new a(this), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1, this.__add_outputline();
      }
      l.prototype.__add_outputline = function() {
        this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this.current_line);
      }, l.prototype.get_line_number = function() {
        return this.__lines.length;
      }, l.prototype.get_indent_string = function(o, c) {
        return this.__indent_cache.get_indent_string(o, c);
      }, l.prototype.get_indent_size = function(o, c) {
        return this.__indent_cache.get_indent_size(o, c);
      }, l.prototype.is_empty = function() {
        return !this.previous_line && this.current_line.is_empty();
      }, l.prototype.add_new_line = function(o) {
        return this.is_empty() || !o && this.just_added_newline() ? !1 : (this.raw || this.__add_outputline(), !0);
      }, l.prototype.get_code = function(o) {
        this.trim(!0);
        var c = this.current_line.pop();
        c && (c[c.length - 1] === `
` && (c = c.replace(/\n+$/g, "")), this.current_line.push(c)), this._end_with_newline && this.__add_outputline();
        var h = this.__lines.join(`
`);
        return o !== `
` && (h = h.replace(/[\n]/g, o)), h;
      }, l.prototype.set_wrap_point = function() {
        this.current_line._set_wrap_point();
      }, l.prototype.set_indent = function(o, c) {
        return o = o || 0, c = c || 0, this.next_line.set_indent(o, c), this.__lines.length > 1 ? (this.current_line.set_indent(o, c), !0) : (this.current_line.set_indent(), !1);
      }, l.prototype.add_raw_token = function(o) {
        for (var c = 0; c < o.newlines; c++)
          this.__add_outputline();
        this.current_line.set_indent(-1), this.current_line.push(o.whitespace_before), this.current_line.push(o.text), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1;
      }, l.prototype.add_token = function(o) {
        this.__add_space_before_token(), this.current_line.push(o), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = this.current_line._allow_wrap();
      }, l.prototype.__add_space_before_token = function() {
        this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(" "));
      }, l.prototype.remove_indent = function(o) {
        for (var c = this.__lines.length; o < c; )
          this.__lines[o]._remove_indent(), o++;
        this.current_line._remove_wrap_indent();
      }, l.prototype.trim = function(o) {
        for (o = o === void 0 ? !1 : o, this.current_line.trim(); o && this.__lines.length > 1 && this.current_line.is_empty(); )
          this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
        this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
      }, l.prototype.just_added_newline = function() {
        return this.current_line.is_empty();
      }, l.prototype.just_added_blankline = function() {
        return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
      }, l.prototype.ensure_empty_line_above = function(o, c) {
        for (var h = this.__lines.length - 2; h >= 0; ) {
          var d = this.__lines[h];
          if (d.is_empty())
            break;
          if (d.item(0).indexOf(o) !== 0 && d.item(-1) !== c) {
            this.__lines.splice(h + 1, 0, new a(this)), this.previous_line = this.__lines[this.__lines.length - 2];
            break;
          }
          h--;
        }
      }, r.exports.Output = l;
    },
    /* 3 */
    /***/
    function(r) {
      function a(s, l, o, c) {
        this.type = s, this.text = l, this.comments_before = null, this.newlines = o || 0, this.whitespace_before = c || "", this.parent = null, this.next = null, this.previous = null, this.opened = null, this.closed = null, this.directives = null;
      }
      r.exports.Token = a;
    },
    ,
    ,
    /* 6 */
    /***/
    function(r) {
      function a(o, c) {
        this.raw_options = s(o, c), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol", "auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number("indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number("indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0), this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	"), this.indent_with_tabs && (this.indent_char = "	", this.indent_size === 1 && (this.indent_size = 4)), this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean("indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
      }
      a.prototype._get_array = function(o, c) {
        var h = this.raw_options[o], d = c || [];
        return typeof h == "object" ? h !== null && typeof h.concat == "function" && (d = h.concat()) : typeof h == "string" && (d = h.split(/[^a-zA-Z0-9_\/\-]+/)), d;
      }, a.prototype._get_boolean = function(o, c) {
        var h = this.raw_options[o], d = h === void 0 ? !!c : !!h;
        return d;
      }, a.prototype._get_characters = function(o, c) {
        var h = this.raw_options[o], d = c || "";
        return typeof h == "string" && (d = h.replace(/\\r/, "\r").replace(/\\n/, `
`).replace(/\\t/, "	")), d;
      }, a.prototype._get_number = function(o, c) {
        var h = this.raw_options[o];
        c = parseInt(c, 10), isNaN(c) && (c = 0);
        var d = parseInt(h, 10);
        return isNaN(d) && (d = c), d;
      }, a.prototype._get_selection = function(o, c, h) {
        var d = this._get_selection_list(o, c, h);
        if (d.length !== 1)
          throw new Error(
            "Invalid Option Value: The option '" + o + `' can only be one of the following values:
` + c + `
You passed in: '` + this.raw_options[o] + "'"
          );
        return d[0];
      }, a.prototype._get_selection_list = function(o, c, h) {
        if (!c || c.length === 0)
          throw new Error("Selection list cannot be empty.");
        if (h = h || [c[0]], !this._is_valid_selection(h, c))
          throw new Error("Invalid Default Value!");
        var d = this._get_array(o, h);
        if (!this._is_valid_selection(d, c))
          throw new Error(
            "Invalid Option Value: The option '" + o + `' can contain only the following values:
` + c + `
You passed in: '` + this.raw_options[o] + "'"
          );
        return d;
      }, a.prototype._is_valid_selection = function(o, c) {
        return o.length && c.length && !o.some(function(h) {
          return c.indexOf(h) === -1;
        });
      };
      function s(o, c) {
        var h = {};
        o = l(o);
        var d;
        for (d in o)
          d !== c && (h[d] = o[d]);
        if (c && o[c])
          for (d in o[c])
            h[d] = o[c][d];
        return h;
      }
      function l(o) {
        var c = {}, h;
        for (h in o) {
          var d = h.replace(/-/g, "_");
          c[d] = o[h];
        }
        return c;
      }
      r.exports.Options = a, r.exports.normalizeOpts = l, r.exports.mergeOpts = s;
    },
    ,
    /* 8 */
    /***/
    function(r) {
      var a = RegExp.prototype.hasOwnProperty("sticky");
      function s(l) {
        this.__input = l || "", this.__input_length = this.__input.length, this.__position = 0;
      }
      s.prototype.restart = function() {
        this.__position = 0;
      }, s.prototype.back = function() {
        this.__position > 0 && (this.__position -= 1);
      }, s.prototype.hasNext = function() {
        return this.__position < this.__input_length;
      }, s.prototype.next = function() {
        var l = null;
        return this.hasNext() && (l = this.__input.charAt(this.__position), this.__position += 1), l;
      }, s.prototype.peek = function(l) {
        var o = null;
        return l = l || 0, l += this.__position, l >= 0 && l < this.__input_length && (o = this.__input.charAt(l)), o;
      }, s.prototype.__match = function(l, o) {
        l.lastIndex = o;
        var c = l.exec(this.__input);
        return c && !(a && l.sticky) && c.index !== o && (c = null), c;
      }, s.prototype.test = function(l, o) {
        return o = o || 0, o += this.__position, o >= 0 && o < this.__input_length ? !!this.__match(l, o) : !1;
      }, s.prototype.testChar = function(l, o) {
        var c = this.peek(o);
        return l.lastIndex = 0, c !== null && l.test(c);
      }, s.prototype.match = function(l) {
        var o = this.__match(l, this.__position);
        return o ? this.__position += o[0].length : o = null, o;
      }, s.prototype.read = function(l, o, c) {
        var h = "", d;
        return l && (d = this.match(l), d && (h += d[0])), o && (d || !l) && (h += this.readUntil(o, c)), h;
      }, s.prototype.readUntil = function(l, o) {
        var c = "", h = this.__position;
        l.lastIndex = this.__position;
        var d = l.exec(this.__input);
        return d ? (h = d.index, o && (h += d[0].length)) : h = this.__input_length, c = this.__input.substring(this.__position, h), this.__position = h, c;
      }, s.prototype.readUntilAfter = function(l) {
        return this.readUntil(l, !0);
      }, s.prototype.get_regexp = function(l, o) {
        var c = null, h = "g";
        return o && a && (h = "y"), typeof l == "string" && l !== "" ? c = new RegExp(l, h) : l && (c = new RegExp(l.source, h)), c;
      }, s.prototype.get_literal_regexp = function(l) {
        return RegExp(l.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
      }, s.prototype.peekUntilAfter = function(l) {
        var o = this.__position, c = this.readUntilAfter(l);
        return this.__position = o, c;
      }, s.prototype.lookBack = function(l) {
        var o = this.__position - 1;
        return o >= l.length && this.__input.substring(o - l.length, o).toLowerCase() === l;
      }, r.exports.InputScanner = s;
    },
    /* 9 */
    /***/
    function(r, a, s) {
      var l = s(8).InputScanner, o = s(3).Token, c = s(10).TokenStream, h = s(11).WhitespacePattern, d = {
        START: "TK_START",
        RAW: "TK_RAW",
        EOF: "TK_EOF"
      }, m = function(p, _) {
        this._input = new l(p), this._options = _ || {}, this.__tokens = null, this._patterns = {}, this._patterns.whitespace = new h(this._input);
      };
      m.prototype.tokenize = function() {
        this._input.restart(), this.__tokens = new c(), this._reset();
        for (var p, _ = new o(d.START, ""), b = null, S = [], y = new c(); _.type !== d.EOF; ) {
          for (p = this._get_next_token(_, b); this._is_comment(p); )
            y.add(p), p = this._get_next_token(_, b);
          y.isEmpty() || (p.comments_before = y, y = new c()), p.parent = b, this._is_opening(p) ? (S.push(b), b = p) : b && this._is_closing(p, b) && (p.opened = b, b.closed = p, b = S.pop(), p.parent = b), p.previous = _, _.next = p, this.__tokens.add(p), _ = p;
        }
        return this.__tokens;
      }, m.prototype._is_first_token = function() {
        return this.__tokens.isEmpty();
      }, m.prototype._reset = function() {
      }, m.prototype._get_next_token = function(p, _) {
        this._readWhitespace();
        var b = this._input.read(/.+/g);
        return b ? this._create_token(d.RAW, b) : this._create_token(d.EOF, "");
      }, m.prototype._is_comment = function(p) {
        return !1;
      }, m.prototype._is_opening = function(p) {
        return !1;
      }, m.prototype._is_closing = function(p, _) {
        return !1;
      }, m.prototype._create_token = function(p, _) {
        var b = new o(
          p,
          _,
          this._patterns.whitespace.newline_count,
          this._patterns.whitespace.whitespace_before_token
        );
        return b;
      }, m.prototype._readWhitespace = function() {
        return this._patterns.whitespace.read();
      }, r.exports.Tokenizer = m, r.exports.TOKEN = d;
    },
    /* 10 */
    /***/
    function(r) {
      function a(s) {
        this.__tokens = [], this.__tokens_length = this.__tokens.length, this.__position = 0, this.__parent_token = s;
      }
      a.prototype.restart = function() {
        this.__position = 0;
      }, a.prototype.isEmpty = function() {
        return this.__tokens_length === 0;
      }, a.prototype.hasNext = function() {
        return this.__position < this.__tokens_length;
      }, a.prototype.next = function() {
        var s = null;
        return this.hasNext() && (s = this.__tokens[this.__position], this.__position += 1), s;
      }, a.prototype.peek = function(s) {
        var l = null;
        return s = s || 0, s += this.__position, s >= 0 && s < this.__tokens_length && (l = this.__tokens[s]), l;
      }, a.prototype.add = function(s) {
        this.__parent_token && (s.parent = this.__parent_token), this.__tokens.push(s), this.__tokens_length += 1;
      }, r.exports.TokenStream = a;
    },
    /* 11 */
    /***/
    function(r, a, s) {
      var l = s(12).Pattern;
      function o(c, h) {
        l.call(this, c, h), h ? this._line_regexp = this._input.get_regexp(h._line_regexp) : this.__set_whitespace_patterns("", ""), this.newline_count = 0, this.whitespace_before_token = "";
      }
      o.prototype = new l(), o.prototype.__set_whitespace_patterns = function(c, h) {
        c += "\\t ", h += "\\n\\r", this._match_pattern = this._input.get_regexp(
          "[" + c + h + "]+",
          !0
        ), this._newline_regexp = this._input.get_regexp(
          "\\r\\n|[" + h + "]"
        );
      }, o.prototype.read = function() {
        this.newline_count = 0, this.whitespace_before_token = "";
        var c = this._input.read(this._match_pattern);
        if (c === " ")
          this.whitespace_before_token = " ";
        else if (c) {
          var h = this.__split(this._newline_regexp, c);
          this.newline_count = h.length - 1, this.whitespace_before_token = h[this.newline_count];
        }
        return c;
      }, o.prototype.matching = function(c, h) {
        var d = this._create();
        return d.__set_whitespace_patterns(c, h), d._update(), d;
      }, o.prototype._create = function() {
        return new o(this._input, this);
      }, o.prototype.__split = function(c, h) {
        c.lastIndex = 0;
        for (var d = 0, m = [], p = c.exec(h); p; )
          m.push(h.substring(d, p.index)), d = p.index + p[0].length, p = c.exec(h);
        return d < h.length ? m.push(h.substring(d, h.length)) : m.push(""), m;
      }, r.exports.WhitespacePattern = o;
    },
    /* 12 */
    /***/
    function(r) {
      function a(s, l) {
        this._input = s, this._starting_pattern = null, this._match_pattern = null, this._until_pattern = null, this._until_after = !1, l && (this._starting_pattern = this._input.get_regexp(l._starting_pattern, !0), this._match_pattern = this._input.get_regexp(l._match_pattern, !0), this._until_pattern = this._input.get_regexp(l._until_pattern), this._until_after = l._until_after);
      }
      a.prototype.read = function() {
        var s = this._input.read(this._starting_pattern);
        return (!this._starting_pattern || s) && (s += this._input.read(this._match_pattern, this._until_pattern, this._until_after)), s;
      }, a.prototype.read_match = function() {
        return this._input.match(this._match_pattern);
      }, a.prototype.until_after = function(s) {
        var l = this._create();
        return l._until_after = !0, l._until_pattern = this._input.get_regexp(s), l._update(), l;
      }, a.prototype.until = function(s) {
        var l = this._create();
        return l._until_after = !1, l._until_pattern = this._input.get_regexp(s), l._update(), l;
      }, a.prototype.starting_with = function(s) {
        var l = this._create();
        return l._starting_pattern = this._input.get_regexp(s, !0), l._update(), l;
      }, a.prototype.matching = function(s) {
        var l = this._create();
        return l._match_pattern = this._input.get_regexp(s, !0), l._update(), l;
      }, a.prototype._create = function() {
        return new a(this._input, this);
      }, a.prototype._update = function() {
      }, r.exports.Pattern = a;
    },
    /* 13 */
    /***/
    function(r) {
      function a(s, l) {
        s = typeof s == "string" ? s : s.source, l = typeof l == "string" ? l : l.source, this.__directives_block_pattern = new RegExp(s + / beautify( \w+[:]\w+)+ /.source + l, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern = new RegExp(s + /\sbeautify\signore:end\s/.source + l, "g");
      }
      a.prototype.get_directives = function(s) {
        if (!s.match(this.__directives_block_pattern))
          return null;
        var l = {};
        this.__directive_pattern.lastIndex = 0;
        for (var o = this.__directive_pattern.exec(s); o; )
          l[o[1]] = o[2], o = this.__directive_pattern.exec(s);
        return l;
      }, a.prototype.readIgnored = function(s) {
        return s.readUntilAfter(this.__directives_end_ignore_pattern);
      }, r.exports.Directives = a;
    },
    /* 14 */
    /***/
    function(r, a, s) {
      var l = s(12).Pattern, o = {
        django: !1,
        erb: !1,
        handlebars: !1,
        php: !1,
        smarty: !1,
        angular: !1
      };
      function c(h, d) {
        l.call(this, h, d), this.__template_pattern = null, this._disabled = Object.assign({}, o), this._excluded = Object.assign({}, o), d && (this.__template_pattern = this._input.get_regexp(d.__template_pattern), this._excluded = Object.assign(this._excluded, d._excluded), this._disabled = Object.assign(this._disabled, d._disabled));
        var m = new l(h);
        this.__patterns = {
          handlebars_comment: m.starting_with(/{{!--/).until_after(/--}}/),
          handlebars_unescaped: m.starting_with(/{{{/).until_after(/}}}/),
          handlebars: m.starting_with(/{{/).until_after(/}}/),
          php: m.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
          erb: m.starting_with(/<%[^%]/).until_after(/[^%]%>/),
          // django coflicts with handlebars a bit.
          django: m.starting_with(/{%/).until_after(/%}/),
          django_value: m.starting_with(/{{/).until_after(/}}/),
          django_comment: m.starting_with(/{#/).until_after(/#}/),
          smarty: m.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
          smarty_comment: m.starting_with(/{\*/).until_after(/\*}/),
          smarty_literal: m.starting_with(/{literal}/).until_after(/{\/literal}/)
        };
      }
      c.prototype = new l(), c.prototype._create = function() {
        return new c(this._input, this);
      }, c.prototype._update = function() {
        this.__set_templated_pattern();
      }, c.prototype.disable = function(h) {
        var d = this._create();
        return d._disabled[h] = !0, d._update(), d;
      }, c.prototype.read_options = function(h) {
        var d = this._create();
        for (var m in o)
          d._disabled[m] = h.templating.indexOf(m) === -1;
        return d._update(), d;
      }, c.prototype.exclude = function(h) {
        var d = this._create();
        return d._excluded[h] = !0, d._update(), d;
      }, c.prototype.read = function() {
        var h = "";
        this._match_pattern ? h = this._input.read(this._starting_pattern) : h = this._input.read(this._starting_pattern, this.__template_pattern);
        for (var d = this._read_template(); d; )
          this._match_pattern ? d += this._input.read(this._match_pattern) : d += this._input.readUntil(this.__template_pattern), h += d, d = this._read_template();
        return this._until_after && (h += this._input.readUntilAfter(this._until_pattern)), h;
      }, c.prototype.__set_templated_pattern = function() {
        var h = [];
        this._disabled.php || h.push(this.__patterns.php._starting_pattern.source), this._disabled.handlebars || h.push(this.__patterns.handlebars._starting_pattern.source), this._disabled.erb || h.push(this.__patterns.erb._starting_pattern.source), this._disabled.django || (h.push(this.__patterns.django._starting_pattern.source), h.push(this.__patterns.django_value._starting_pattern.source), h.push(this.__patterns.django_comment._starting_pattern.source)), this._disabled.smarty || h.push(this.__patterns.smarty._starting_pattern.source), this._until_pattern && h.push(this._until_pattern.source), this.__template_pattern = this._input.get_regexp("(?:" + h.join("|") + ")");
      }, c.prototype._read_template = function() {
        var h = "", d = this._input.peek();
        if (d === "<") {
          var m = this._input.peek(1);
          !this._disabled.php && !this._excluded.php && m === "?" && (h = h || this.__patterns.php.read()), !this._disabled.erb && !this._excluded.erb && m === "%" && (h = h || this.__patterns.erb.read());
        } else d === "{" && (!this._disabled.handlebars && !this._excluded.handlebars && (h = h || this.__patterns.handlebars_comment.read(), h = h || this.__patterns.handlebars_unescaped.read(), h = h || this.__patterns.handlebars.read()), this._disabled.django || (!this._excluded.django && !this._excluded.handlebars && (h = h || this.__patterns.django_value.read()), this._excluded.django || (h = h || this.__patterns.django_comment.read(), h = h || this.__patterns.django.read())), this._disabled.smarty || this._disabled.django && this._disabled.handlebars && (h = h || this.__patterns.smarty_comment.read(), h = h || this.__patterns.smarty_literal.read(), h = h || this.__patterns.smarty.read()));
        return h;
      }, r.exports.TemplatablePattern = c;
    },
    ,
    ,
    ,
    /* 18 */
    /***/
    function(r, a, s) {
      var l = s(19).Beautifier, o = s(20).Options;
      function c(h, d, m, p) {
        var _ = new l(h, d, m, p);
        return _.beautify();
      }
      r.exports = c, r.exports.defaultOptions = function() {
        return new o();
      };
    },
    /* 19 */
    /***/
    function(r, a, s) {
      var l = s(20).Options, o = s(2).Output, c = s(21).Tokenizer, h = s(21).TOKEN, d = /\r\n|[\r\n]/, m = /\r\n|[\r\n]/g, p = function(g, f) {
        this.indent_level = 0, this.alignment_size = 0, this.max_preserve_newlines = g.max_preserve_newlines, this.preserve_newlines = g.preserve_newlines, this._output = new o(g, f);
      };
      p.prototype.current_line_has_match = function(g) {
        return this._output.current_line.has_match(g);
      }, p.prototype.set_space_before_token = function(g, f) {
        this._output.space_before_token = g, this._output.non_breaking_space = f;
      }, p.prototype.set_wrap_point = function() {
        this._output.set_indent(this.indent_level, this.alignment_size), this._output.set_wrap_point();
      }, p.prototype.add_raw_token = function(g) {
        this._output.add_raw_token(g);
      }, p.prototype.print_preserved_newlines = function(g) {
        var f = 0;
        g.type !== h.TEXT && g.previous.type !== h.TEXT && (f = g.newlines ? 1 : 0), this.preserve_newlines && (f = g.newlines < this.max_preserve_newlines + 1 ? g.newlines : this.max_preserve_newlines + 1);
        for (var T = 0; T < f; T++)
          this.print_newline(T > 0);
        return f !== 0;
      }, p.prototype.traverse_whitespace = function(g) {
        return g.whitespace_before || g.newlines ? (this.print_preserved_newlines(g) || (this._output.space_before_token = !0), !0) : !1;
      }, p.prototype.previous_token_wrapped = function() {
        return this._output.previous_token_wrapped;
      }, p.prototype.print_newline = function(g) {
        this._output.add_new_line(g);
      }, p.prototype.print_token = function(g) {
        g.text && (this._output.set_indent(this.indent_level, this.alignment_size), this._output.add_token(g.text));
      }, p.prototype.indent = function() {
        this.indent_level++;
      }, p.prototype.deindent = function() {
        this.indent_level > 0 && (this.indent_level--, this._output.set_indent(this.indent_level, this.alignment_size));
      }, p.prototype.get_full_indent = function(g) {
        return g = this.indent_level + (g || 0), g < 1 ? "" : this._output.get_indent_string(g);
      };
      var _ = function(g) {
        for (var f = null, T = g.next; T.type !== h.EOF && g.closed !== T; ) {
          if (T.type === h.ATTRIBUTE && T.text === "type") {
            T.next && T.next.type === h.EQUALS && T.next.next && T.next.next.type === h.VALUE && (f = T.next.next.text);
            break;
          }
          T = T.next;
        }
        return f;
      }, b = function(g, f) {
        var T = null, U = null;
        return f.closed ? (g === "script" ? T = "text/javascript" : g === "style" && (T = "text/css"), T = _(f) || T, T.search("text/css") > -1 ? U = "css" : T.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1 ? U = "javascript" : T.search(/(text|application|dojo)\/(x-)?(html)/) > -1 ? U = "html" : T.search(/test\/null/) > -1 && (U = "null"), U) : null;
      };
      function S(g, f) {
        return f.indexOf(g) !== -1;
      }
      function y(g, f, T) {
        this.parent = g || null, this.tag = f ? f.tag_name : "", this.indent_level = T || 0, this.parser_token = f || null;
      }
      function w(g) {
        this._printer = g, this._current_frame = null;
      }
      w.prototype.get_parser_token = function() {
        return this._current_frame ? this._current_frame.parser_token : null;
      }, w.prototype.record_tag = function(g) {
        var f = new y(this._current_frame, g, this._printer.indent_level);
        this._current_frame = f;
      }, w.prototype._try_pop_frame = function(g) {
        var f = null;
        return g && (f = g.parser_token, this._printer.indent_level = g.indent_level, this._current_frame = g.parent), f;
      }, w.prototype._get_frame = function(g, f) {
        for (var T = this._current_frame; T && g.indexOf(T.tag) === -1; ) {
          if (f && f.indexOf(T.tag) !== -1) {
            T = null;
            break;
          }
          T = T.parent;
        }
        return T;
      }, w.prototype.try_pop = function(g, f) {
        var T = this._get_frame([g], f);
        return this._try_pop_frame(T);
      }, w.prototype.indent_to_tag = function(g) {
        var f = this._get_frame(g);
        f && (this._printer.indent_level = f.indent_level);
      };
      function x(g, f, T, U) {
        this._source_text = g || "", f = f || {}, this._js_beautify = T, this._css_beautify = U, this._tag_stack = null;
        var k = new l(f, "html");
        this._options = k, this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 5) === "force", this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline", this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned", this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple", this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 8) === "preserve", this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
      }
      x.prototype.beautify = function() {
        if (this._options.disabled)
          return this._source_text;
        var g = this._source_text, f = this._options.eol;
        this._options.eol === "auto" && (f = `
`, g && d.test(g) && (f = g.match(d)[0])), g = g.replace(m, `
`);
        var T = g.match(/^[\t ]*/)[0], U = {
          text: "",
          type: ""
        }, k = new C(), E = new p(this._options, T), A = new c(g, this._options).tokenize();
        this._tag_stack = new w(E);
        for (var v = null, L = A.next(); L.type !== h.EOF; )
          L.type === h.TAG_OPEN || L.type === h.COMMENT ? (v = this._handle_tag_open(E, L, k, U, A), k = v) : L.type === h.ATTRIBUTE || L.type === h.EQUALS || L.type === h.VALUE || L.type === h.TEXT && !k.tag_complete ? v = this._handle_inside_tag(E, L, k, U) : L.type === h.TAG_CLOSE ? v = this._handle_tag_close(E, L, k) : L.type === h.TEXT ? v = this._handle_text(E, L, k) : L.type === h.CONTROL_FLOW_OPEN ? v = this._handle_control_flow_open(E, L) : L.type === h.CONTROL_FLOW_CLOSE ? v = this._handle_control_flow_close(E, L) : E.add_raw_token(L), U = v, L = A.next();
        var M = E._output.get_code(f);
        return M;
      }, x.prototype._handle_control_flow_open = function(g, f) {
        var T = {
          text: f.text,
          type: f.type
        };
        return g.set_space_before_token(f.newlines || f.whitespace_before !== "", !0), f.newlines ? g.print_preserved_newlines(f) : g.set_space_before_token(f.newlines || f.whitespace_before !== "", !0), g.print_token(f), g.indent(), T;
      }, x.prototype._handle_control_flow_close = function(g, f) {
        var T = {
          text: f.text,
          type: f.type
        };
        return g.deindent(), f.newlines ? g.print_preserved_newlines(f) : g.set_space_before_token(f.newlines || f.whitespace_before !== "", !0), g.print_token(f), T;
      }, x.prototype._handle_tag_close = function(g, f, T) {
        var U = {
          text: f.text,
          type: f.type
        };
        return g.alignment_size = 0, T.tag_complete = !0, g.set_space_before_token(f.newlines || f.whitespace_before !== "", !0), T.is_unformatted ? g.add_raw_token(f) : (T.tag_start_char === "<" && (g.set_space_before_token(f.text[0] === "/", !0), this._is_wrap_attributes_force_expand_multiline && T.has_wrapped_attrs && g.print_newline(!1)), g.print_token(f)), T.indent_content && !(T.is_unformatted || T.is_content_unformatted) && (g.indent(), T.indent_content = !1), !T.is_inline_element && !(T.is_unformatted || T.is_content_unformatted) && g.set_wrap_point(), U;
      }, x.prototype._handle_inside_tag = function(g, f, T, U) {
        var k = T.has_wrapped_attrs, E = {
          text: f.text,
          type: f.type
        };
        return g.set_space_before_token(f.newlines || f.whitespace_before !== "", !0), T.is_unformatted ? g.add_raw_token(f) : T.tag_start_char === "{" && f.type === h.TEXT ? g.print_preserved_newlines(f) ? (f.newlines = 0, g.add_raw_token(f)) : g.print_token(f) : (f.type === h.ATTRIBUTE ? g.set_space_before_token(!0) : (f.type === h.EQUALS || f.type === h.VALUE && f.previous.type === h.EQUALS) && g.set_space_before_token(!1), f.type === h.ATTRIBUTE && T.tag_start_char === "<" && ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) && (g.traverse_whitespace(f), k = k || f.newlines !== 0), this._is_wrap_attributes_force && T.attr_count >= this._options.wrap_attributes_min_attrs && (U.type !== h.TAG_OPEN || // ie. second attribute and beyond
        this._is_wrap_attributes_force_expand_multiline) && (g.print_newline(!1), k = !0)), g.print_token(f), k = k || g.previous_token_wrapped(), T.has_wrapped_attrs = k), E;
      }, x.prototype._handle_text = function(g, f, T) {
        var U = {
          text: f.text,
          type: "TK_CONTENT"
        };
        return T.custom_beautifier_name ? this._print_custom_beatifier_text(g, f, T) : T.is_unformatted || T.is_content_unformatted ? g.add_raw_token(f) : (g.traverse_whitespace(f), g.print_token(f)), U;
      }, x.prototype._print_custom_beatifier_text = function(g, f, T) {
        var U = this;
        if (f.text !== "") {
          var k = f.text, E, A = 1, v = "", L = "";
          T.custom_beautifier_name === "javascript" && typeof this._js_beautify == "function" ? E = this._js_beautify : T.custom_beautifier_name === "css" && typeof this._css_beautify == "function" ? E = this._css_beautify : T.custom_beautifier_name === "html" && (E = function(K, Y) {
            var ce = new x(K, Y, U._js_beautify, U._css_beautify);
            return ce.beautify();
          }), this._options.indent_scripts === "keep" ? A = 0 : this._options.indent_scripts === "separate" && (A = -g.indent_level);
          var M = g.get_full_indent(A);
          if (k = k.replace(/\n[ \t]*$/, ""), T.custom_beautifier_name !== "html" && k[0] === "<" && k.match(/^(<!--|<!\[CDATA\[)/)) {
            var O = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(k);
            if (!O) {
              g.add_raw_token(f);
              return;
            }
            v = M + O[1] + `
`, k = O[4], O[5] && (L = M + O[5]), k = k.replace(/\n[ \t]*$/, ""), (O[2] || O[3].indexOf(`
`) !== -1) && (O = O[3].match(/[ \t]+$/), O && (f.whitespace_before = O[0]));
          }
          if (k)
            if (E) {
              var D = function() {
                this.eol = `
`;
              };
              D.prototype = this._options.raw_options;
              var P = new D();
              k = E(M + k, P);
            } else {
              var H = f.whitespace_before;
              H && (k = k.replace(new RegExp(`
(` + H + ")?", "g"), `
`)), k = M + k.replace(/\n/g, `
` + M);
            }
          v && (k ? k = v + k + `
` + L : k = v + L), g.print_newline(!1), k && (f.text = k, f.whitespace_before = "", f.newlines = 0, g.add_raw_token(f), g.print_newline(!0));
        }
      }, x.prototype._handle_tag_open = function(g, f, T, U, k) {
        var E = this._get_tag_open_token(f);
        if ((T.is_unformatted || T.is_content_unformatted) && !T.is_empty_element && f.type === h.TAG_OPEN && !E.is_start_tag ? (g.add_raw_token(f), E.start_tag_token = this._tag_stack.try_pop(E.tag_name)) : (g.traverse_whitespace(f), this._set_tag_position(g, f, E, T, U), E.is_inline_element || g.set_wrap_point(), g.print_token(f)), E.is_start_tag && this._is_wrap_attributes_force) {
          var A = 0, v;
          do
            v = k.peek(A), v.type === h.ATTRIBUTE && (E.attr_count += 1), A += 1;
          while (v.type !== h.EOF && v.type !== h.TAG_CLOSE);
        }
        return (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) && (E.alignment_size = f.text.length + 1), !E.tag_complete && !E.is_unformatted && (g.alignment_size = E.alignment_size), E;
      };
      var C = function(g, f) {
        if (this.parent = g || null, this.text = "", this.type = "TK_TAG_OPEN", this.tag_name = "", this.is_inline_element = !1, this.is_unformatted = !1, this.is_content_unformatted = !1, this.is_empty_element = !1, this.is_start_tag = !1, this.is_end_tag = !1, this.indent_content = !1, this.multiline_content = !1, this.custom_beautifier_name = null, this.start_tag_token = null, this.attr_count = 0, this.has_wrapped_attrs = !1, this.alignment_size = 0, this.tag_complete = !1, this.tag_start_char = "", this.tag_check = "", !f)
          this.tag_complete = !0;
        else {
          var T;
          this.tag_start_char = f.text[0], this.text = f.text, this.tag_start_char === "<" ? (T = f.text.match(/^<([^\s>]*)/), this.tag_check = T ? T[1] : "") : (T = f.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/), this.tag_check = T ? T[1] : "", (f.text.startsWith("{{#>") || f.text.startsWith("{{~#>")) && this.tag_check[0] === ">" && (this.tag_check === ">" && f.next !== null ? this.tag_check = f.next.text.split(" ")[0] : this.tag_check = f.text.split(">")[1])), this.tag_check = this.tag_check.toLowerCase(), f.type === h.COMMENT && (this.tag_complete = !0), this.is_start_tag = this.tag_check.charAt(0) !== "/", this.tag_name = this.is_start_tag ? this.tag_check : this.tag_check.substr(1), this.is_end_tag = !this.is_start_tag || f.closed && f.closed.text === "/>";
          var U = 2;
          this.tag_start_char === "{" && this.text.length >= 3 && this.text.charAt(2) === "~" && (U = 3), this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (this.text.length < 3 || /[^#\^]/.test(this.text.charAt(U)));
        }
      };
      x.prototype._get_tag_open_token = function(g) {
        var f = new C(this._tag_stack.get_parser_token(), g);
        return f.alignment_size = this._options.wrap_attributes_indent_size, f.is_end_tag = f.is_end_tag || S(f.tag_check, this._options.void_elements), f.is_empty_element = f.tag_complete || f.is_start_tag && f.is_end_tag, f.is_unformatted = !f.tag_complete && S(f.tag_check, this._options.unformatted), f.is_content_unformatted = !f.is_empty_element && S(f.tag_check, this._options.content_unformatted), f.is_inline_element = S(f.tag_name, this._options.inline) || this._options.inline_custom_elements && f.tag_name.includes("-") || f.tag_start_char === "{", f;
      }, x.prototype._set_tag_position = function(g, f, T, U, k) {
        if (T.is_empty_element || (T.is_end_tag ? T.start_tag_token = this._tag_stack.try_pop(T.tag_name) : (this._do_optional_end_element(T) && (T.is_inline_element || g.print_newline(!1)), this._tag_stack.record_tag(T), (T.tag_name === "script" || T.tag_name === "style") && !(T.is_unformatted || T.is_content_unformatted) && (T.custom_beautifier_name = b(T.tag_check, f)))), S(T.tag_check, this._options.extra_liners) && (g.print_newline(!1), g._output.just_added_blankline() || g.print_newline(!0)), T.is_empty_element) {
          if (T.tag_start_char === "{" && T.tag_check === "else") {
            this._tag_stack.indent_to_tag(["if", "unless", "each"]), T.indent_content = !0;
            var E = g.current_line_has_match(/{{#if/);
            E || g.print_newline(!1);
          }
          T.tag_name === "!--" && k.type === h.TAG_CLOSE && U.is_end_tag && T.text.indexOf(`
`) === -1 || (T.is_inline_element || T.is_unformatted || g.print_newline(!1), this._calcluate_parent_multiline(g, T));
        } else if (T.is_end_tag) {
          var A = !1;
          A = T.start_tag_token && T.start_tag_token.multiline_content, A = A || !T.is_inline_element && !(U.is_inline_element || U.is_unformatted) && !(k.type === h.TAG_CLOSE && T.start_tag_token === U) && k.type !== "TK_CONTENT", (T.is_content_unformatted || T.is_unformatted) && (A = !1), A && g.print_newline(!1);
        } else
          T.indent_content = !T.custom_beautifier_name, T.tag_start_char === "<" && (T.tag_name === "html" ? T.indent_content = this._options.indent_inner_html : T.tag_name === "head" ? T.indent_content = this._options.indent_head_inner_html : T.tag_name === "body" && (T.indent_content = this._options.indent_body_inner_html)), !(T.is_inline_element || T.is_unformatted) && (k.type !== "TK_CONTENT" || T.is_content_unformatted) && g.print_newline(!1), this._calcluate_parent_multiline(g, T);
      }, x.prototype._calcluate_parent_multiline = function(g, f) {
        f.parent && g._output.just_added_newline() && !((f.is_inline_element || f.is_unformatted) && f.parent.is_inline_element) && (f.parent.multiline_content = !0);
      };
      var I = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "menu", "nav", "ol", "p", "pre", "section", "table", "ul"], N = ["a", "audio", "del", "ins", "map", "noscript", "video"];
      x.prototype._do_optional_end_element = function(g) {
        var f = null;
        if (!(g.is_empty_element || !g.is_start_tag || !g.parent)) {
          if (g.tag_name === "body")
            f = f || this._tag_stack.try_pop("head");
          else if (g.tag_name === "li")
            f = f || this._tag_stack.try_pop("li", ["ol", "ul", "menu"]);
          else if (g.tag_name === "dd" || g.tag_name === "dt")
            f = f || this._tag_stack.try_pop("dt", ["dl"]), f = f || this._tag_stack.try_pop("dd", ["dl"]);
          else if (g.parent.tag_name === "p" && I.indexOf(g.tag_name) !== -1) {
            var T = g.parent.parent;
            (!T || N.indexOf(T.tag_name) === -1) && (f = f || this._tag_stack.try_pop("p"));
          } else g.tag_name === "rp" || g.tag_name === "rt" ? (f = f || this._tag_stack.try_pop("rt", ["ruby", "rtc"]), f = f || this._tag_stack.try_pop("rp", ["ruby", "rtc"])) : g.tag_name === "optgroup" ? f = f || this._tag_stack.try_pop("optgroup", ["select"]) : g.tag_name === "option" ? f = f || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]) : g.tag_name === "colgroup" ? f = f || this._tag_stack.try_pop("caption", ["table"]) : g.tag_name === "thead" ? (f = f || this._tag_stack.try_pop("caption", ["table"]), f = f || this._tag_stack.try_pop("colgroup", ["table"])) : g.tag_name === "tbody" || g.tag_name === "tfoot" ? (f = f || this._tag_stack.try_pop("caption", ["table"]), f = f || this._tag_stack.try_pop("colgroup", ["table"]), f = f || this._tag_stack.try_pop("thead", ["table"]), f = f || this._tag_stack.try_pop("tbody", ["table"])) : g.tag_name === "tr" ? (f = f || this._tag_stack.try_pop("caption", ["table"]), f = f || this._tag_stack.try_pop("colgroup", ["table"]), f = f || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"])) : (g.tag_name === "th" || g.tag_name === "td") && (f = f || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]), f = f || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]));
          return g.parent = this._tag_stack.get_parser_token(), f;
        }
      }, r.exports.Beautifier = x;
    },
    /* 20 */
    /***/
    function(r, a, s) {
      var l = s(6).Options;
      function o(c) {
        l.call(this, c, "html"), this.templating.length === 1 && this.templating[0] === "auto" && (this.templating = ["django", "erb", "handlebars", "php"]), this.indent_inner_html = this._get_boolean("indent_inner_html"), this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", !0), this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", !0), this.indent_handlebars = this._get_boolean("indent_handlebars", !0), this.wrap_attributes = this._get_selection(
          "wrap_attributes",
          ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]
        ), this.wrap_attributes_min_attrs = this._get_number("wrap_attributes_min_attrs", 2), this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size), this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]), this.inline = this._get_array("inline", [
          "a",
          "abbr",
          "area",
          "audio",
          "b",
          "bdi",
          "bdo",
          "br",
          "button",
          "canvas",
          "cite",
          "code",
          "data",
          "datalist",
          "del",
          "dfn",
          "em",
          "embed",
          "i",
          "iframe",
          "img",
          "input",
          "ins",
          "kbd",
          "keygen",
          "label",
          "map",
          "mark",
          "math",
          "meter",
          "noscript",
          "object",
          "output",
          "progress",
          "q",
          "ruby",
          "s",
          "samp",
          /* 'script', */
          "select",
          "small",
          "span",
          "strong",
          "sub",
          "sup",
          "svg",
          "template",
          "textarea",
          "time",
          "u",
          "var",
          "video",
          "wbr",
          "text",
          // obsolete inline tags
          "acronym",
          "big",
          "strike",
          "tt"
        ]), this.inline_custom_elements = this._get_boolean("inline_custom_elements", !0), this.void_elements = this._get_array("void_elements", [
          // HTLM void elements - aka self-closing tags - aka singletons
          // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
          "area",
          "base",
          "br",
          "col",
          "embed",
          "hr",
          "img",
          "input",
          "keygen",
          "link",
          "menuitem",
          "meta",
          "param",
          "source",
          "track",
          "wbr",
          // NOTE: Optional tags are too complex for a simple list
          // they are hard coded in _do_optional_end_element
          // Doctype and xml elements
          "!doctype",
          "?xml",
          // obsolete tags
          // basefont: https://www.computerhope.com/jargon/h/html-basefont-tag.htm
          // isndex: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/isindex
          "basefont",
          "isindex"
        ]), this.unformatted = this._get_array("unformatted", []), this.content_unformatted = this._get_array("content_unformatted", [
          "pre",
          "textarea"
        ]), this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter"), this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
      }
      o.prototype = new l(), r.exports.Options = o;
    },
    /* 21 */
    /***/
    function(r, a, s) {
      var l = s(9).Tokenizer, o = s(9).TOKEN, c = s(13).Directives, h = s(14).TemplatablePattern, d = s(12).Pattern, m = {
        TAG_OPEN: "TK_TAG_OPEN",
        TAG_CLOSE: "TK_TAG_CLOSE",
        CONTROL_FLOW_OPEN: "TK_CONTROL_FLOW_OPEN",
        CONTROL_FLOW_CLOSE: "TK_CONTROL_FLOW_CLOSE",
        ATTRIBUTE: "TK_ATTRIBUTE",
        EQUALS: "TK_EQUALS",
        VALUE: "TK_VALUE",
        COMMENT: "TK_COMMENT",
        TEXT: "TK_TEXT",
        UNKNOWN: "TK_UNKNOWN",
        START: o.START,
        RAW: o.RAW,
        EOF: o.EOF
      }, p = new c(/<\!--/, /-->/), _ = function(b, S) {
        l.call(this, b, S), this._current_tag_name = "";
        var y = new h(this._input).read_options(this._options), w = new d(this._input);
        if (this.__patterns = {
          word: y.until(/[\n\r\t <]/),
          word_control_flow_close_excluded: y.until(/[\n\r\t <}]/),
          single_quote: y.until_after(/'/),
          double_quote: y.until_after(/"/),
          attribute: y.until(/[\n\r\t =>]|\/>/),
          element_name: y.until(/[\n\r\t >\/]/),
          angular_control_flow_start: w.matching(/\@[a-zA-Z]+[^({]*[({]/),
          handlebars_comment: w.starting_with(/{{!--/).until_after(/--}}/),
          handlebars: w.starting_with(/{{/).until_after(/}}/),
          handlebars_open: w.until(/[\n\r\t }]/),
          handlebars_raw_close: w.until(/}}/),
          comment: w.starting_with(/<!--/).until_after(/-->/),
          cdata: w.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
          // https://en.wikipedia.org/wiki/Conditional_comment
          conditional_comment: w.starting_with(/<!\[/).until_after(/]>/),
          processing: w.starting_with(/<\?/).until_after(/\?>/)
        }, this._options.indent_handlebars && (this.__patterns.word = this.__patterns.word.exclude("handlebars"), this.__patterns.word_control_flow_close_excluded = this.__patterns.word_control_flow_close_excluded.exclude("handlebars")), this._unformatted_content_delimiter = null, this._options.unformatted_content_delimiter) {
          var x = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
          this.__patterns.unformatted_content_delimiter = w.matching(x).until_after(x);
        }
      };
      _.prototype = new l(), _.prototype._is_comment = function(b) {
        return !1;
      }, _.prototype._is_opening = function(b) {
        return b.type === m.TAG_OPEN || b.type === m.CONTROL_FLOW_OPEN;
      }, _.prototype._is_closing = function(b, S) {
        return b.type === m.TAG_CLOSE && S && ((b.text === ">" || b.text === "/>") && S.text[0] === "<" || b.text === "}}" && S.text[0] === "{" && S.text[1] === "{") || b.type === m.CONTROL_FLOW_CLOSE && b.text === "}" && S.text.endsWith("{");
      }, _.prototype._reset = function() {
        this._current_tag_name = "";
      }, _.prototype._get_next_token = function(b, S) {
        var y = null;
        this._readWhitespace();
        var w = this._input.peek();
        return w === null ? this._create_token(m.EOF, "") : (y = y || this._read_open_handlebars(w, S), y = y || this._read_attribute(w, b, S), y = y || this._read_close(w, S), y = y || this._read_control_flows(w, S), y = y || this._read_raw_content(w, b, S), y = y || this._read_content_word(w, S), y = y || this._read_comment_or_cdata(w), y = y || this._read_processing(w), y = y || this._read_open(w, S), y = y || this._create_token(m.UNKNOWN, this._input.next()), y);
      }, _.prototype._read_comment_or_cdata = function(b) {
        var S = null, y = null, w = null;
        if (b === "<") {
          var x = this._input.peek(1);
          x === "!" && (y = this.__patterns.comment.read(), y ? (w = p.get_directives(y), w && w.ignore === "start" && (y += p.readIgnored(this._input))) : y = this.__patterns.cdata.read()), y && (S = this._create_token(m.COMMENT, y), S.directives = w);
        }
        return S;
      }, _.prototype._read_processing = function(b) {
        var S = null, y = null, w = null;
        if (b === "<") {
          var x = this._input.peek(1);
          (x === "!" || x === "?") && (y = this.__patterns.conditional_comment.read(), y = y || this.__patterns.processing.read()), y && (S = this._create_token(m.COMMENT, y), S.directives = w);
        }
        return S;
      }, _.prototype._read_open = function(b, S) {
        var y = null, w = null;
        return (!S || S.type === m.CONTROL_FLOW_OPEN) && b === "<" && (y = this._input.next(), this._input.peek() === "/" && (y += this._input.next()), y += this.__patterns.element_name.read(), w = this._create_token(m.TAG_OPEN, y)), w;
      }, _.prototype._read_open_handlebars = function(b, S) {
        var y = null, w = null;
        return (!S || S.type === m.CONTROL_FLOW_OPEN) && this._options.indent_handlebars && b === "{" && this._input.peek(1) === "{" && (this._input.peek(2) === "!" ? (y = this.__patterns.handlebars_comment.read(), y = y || this.__patterns.handlebars.read(), w = this._create_token(m.COMMENT, y)) : (y = this.__patterns.handlebars_open.read(), w = this._create_token(m.TAG_OPEN, y))), w;
      }, _.prototype._read_control_flows = function(b, S) {
        var y = "", w = null;
        if (!this._options.templating.includes("angular") || !this._options.indent_handlebars)
          return w;
        if (b === "@") {
          if (y = this.__patterns.angular_control_flow_start.read(), y === "")
            return w;
          for (var x = y.endsWith("(") ? 1 : 0, C = 0; !(y.endsWith("{") && x === C); ) {
            var I = this._input.next();
            if (I === null)
              break;
            I === "(" ? x++ : I === ")" && C++, y += I;
          }
          w = this._create_token(m.CONTROL_FLOW_OPEN, y);
        } else b === "}" && S && S.type === m.CONTROL_FLOW_OPEN && (y = this._input.next(), w = this._create_token(m.CONTROL_FLOW_CLOSE, y));
        return w;
      }, _.prototype._read_close = function(b, S) {
        var y = null, w = null;
        return S && S.type === m.TAG_OPEN && (S.text[0] === "<" && (b === ">" || b === "/" && this._input.peek(1) === ">") ? (y = this._input.next(), b === "/" && (y += this._input.next()), w = this._create_token(m.TAG_CLOSE, y)) : S.text[0] === "{" && b === "}" && this._input.peek(1) === "}" && (this._input.next(), this._input.next(), w = this._create_token(m.TAG_CLOSE, "}}"))), w;
      }, _.prototype._read_attribute = function(b, S, y) {
        var w = null, x = "";
        if (y && y.text[0] === "<")
          if (b === "=")
            w = this._create_token(m.EQUALS, this._input.next());
          else if (b === '"' || b === "'") {
            var C = this._input.next();
            b === '"' ? C += this.__patterns.double_quote.read() : C += this.__patterns.single_quote.read(), w = this._create_token(m.VALUE, C);
          } else
            x = this.__patterns.attribute.read(), x && (S.type === m.EQUALS ? w = this._create_token(m.VALUE, x) : w = this._create_token(m.ATTRIBUTE, x));
        return w;
      }, _.prototype._is_content_unformatted = function(b) {
        return this._options.void_elements.indexOf(b) === -1 && (this._options.content_unformatted.indexOf(b) !== -1 || this._options.unformatted.indexOf(b) !== -1);
      }, _.prototype._read_raw_content = function(b, S, y) {
        var w = "";
        if (y && y.text[0] === "{")
          w = this.__patterns.handlebars_raw_close.read();
        else if (S.type === m.TAG_CLOSE && S.opened.text[0] === "<" && S.text[0] !== "/") {
          var x = S.opened.text.substr(1).toLowerCase();
          if (x === "script" || x === "style") {
            var C = this._read_comment_or_cdata(b);
            if (C)
              return C.type = m.TEXT, C;
            w = this._input.readUntil(new RegExp("</" + x + "[\\n\\r\\t ]*?>", "ig"));
          } else this._is_content_unformatted(x) && (w = this._input.readUntil(new RegExp("</" + x + "[\\n\\r\\t ]*?>", "ig")));
        }
        return w ? this._create_token(m.TEXT, w) : null;
      }, _.prototype._read_content_word = function(b, S) {
        var y = "";
        if (this._options.unformatted_content_delimiter && b === this._options.unformatted_content_delimiter[0] && (y = this.__patterns.unformatted_content_delimiter.read()), y || (y = S && S.type === m.CONTROL_FLOW_OPEN ? this.__patterns.word_control_flow_close_excluded.read() : this.__patterns.word.read()), y)
          return this._create_token(m.TEXT, y);
      }, r.exports.Tokenizer = _, r.exports.TOKEN = m;
    }
    /******/
  ], t = {};
  function n(r) {
    var a = t[r];
    if (a !== void 0)
      return a.exports;
    var s = t[r] = {
      /******/
      // no module.id needed
      /******/
      // no module.loaded needed
      /******/
      exports: {}
      /******/
    };
    return e[r](s, s.exports, n), s.exports;
  }
  var i = n(18);
  jo = i;
})();
function Qu(e, t) {
  return jo(e, t, Ju, Yu);
}
function Zu(e, t, n) {
  let i = e.getText(), r = !0, a = 0;
  const s = n.tabSize || 4;
  if (t) {
    let c = e.offsetAt(t.start), h = c;
    for (; h > 0 && $s(i, h - 1); )
      h--;
    h === 0 || js(i, h - 1) ? c = h : h < c && (c = h + 1);
    let d = e.offsetAt(t.end), m = d;
    for (; m < i.length && $s(i, m); )
      m++;
    (m === i.length || js(i, m)) && (d = m), t = X.create(e.positionAt(c), e.positionAt(d));
    const p = i.substring(0, c);
    if (new RegExp(/.*[<][^>]*$/).test(p))
      return i = i.substring(c, d), [{
        range: t,
        newText: i
      }];
    if (r = d === i.length, i = i.substring(c, d), c !== 0) {
      const _ = e.offsetAt(oe.create(t.start.line, 0));
      a = nd(e.getText(), _, n);
    }
  } else
    t = X.create(oe.create(0, 0), e.positionAt(i.length));
  const l = {
    indent_size: s,
    indent_char: n.insertSpaces ? " " : "	",
    indent_empty_lines: ye(n, "indentEmptyLines", !1),
    wrap_line_length: ye(n, "wrapLineLength", 120),
    unformatted: zn(n, "unformatted", void 0),
    content_unformatted: zn(n, "contentUnformatted", void 0),
    indent_inner_html: ye(n, "indentInnerHtml", !1),
    preserve_newlines: ye(n, "preserveNewLines", !0),
    max_preserve_newlines: ye(n, "maxPreserveNewLines", 32786),
    indent_handlebars: ye(n, "indentHandlebars", !1),
    end_with_newline: r && ye(n, "endWithNewline", !1),
    extra_liners: zn(n, "extraLiners", void 0),
    wrap_attributes: ye(n, "wrapAttributes", "auto"),
    wrap_attributes_indent_size: ye(n, "wrapAttributesIndentSize", void 0),
    eol: `
`,
    indent_scripts: ye(n, "indentScripts", "normal"),
    templating: td(n, "all"),
    unformatted_content_delimiter: ye(n, "unformattedContentDelimiter", "")
  };
  let o = Qu(ed(i), l);
  if (a > 0) {
    const c = n.insertSpaces ? Vs(" ", s * a) : Vs("	", a);
    o = o.split(`
`).join(`
` + c), t.start.character === 0 && (o = c + o);
  }
  return [{
    range: t,
    newText: o
  }];
}
function ed(e) {
  return e.replace(/^\s+/, "");
}
function ye(e, t, n) {
  if (e && e.hasOwnProperty(t)) {
    const i = e[t];
    if (i !== null)
      return i;
  }
  return n;
}
function zn(e, t, n) {
  const i = ye(e, t, null);
  return typeof i == "string" ? i.length > 0 ? i.split(",").map((r) => r.trim().toLowerCase()) : [] : n;
}
function td(e, t) {
  const n = ye(e, "templating", t);
  return n === !0 ? ["auto"] : n === !1 || n === t || Array.isArray(n) === !1 ? ["none"] : n;
}
function nd(e, t, n) {
  let i = t, r = 0;
  const a = n.tabSize || 4;
  for (; i < e.length; ) {
    const s = e.charAt(i);
    if (s === " ")
      r++;
    else if (s === "	")
      r += a;
    else
      break;
    i++;
  }
  return Math.floor(r / a);
}
function js(e, t) {
  return `\r
`.indexOf(e.charAt(t)) !== -1;
}
function $s(e, t) {
  return " 	".indexOf(e.charAt(t)) !== -1;
}
var $o;
(() => {
  var e = { 470: (r) => {
    function a(o) {
      if (typeof o != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(o));
    }
    function s(o, c) {
      for (var h, d = "", m = 0, p = -1, _ = 0, b = 0; b <= o.length; ++b) {
        if (b < o.length)
          h = o.charCodeAt(b);
        else {
          if (h === 47)
            break;
          h = 47;
        }
        if (h === 47) {
          if (!(p === b - 1 || _ === 1))
            if (p !== b - 1 && _ === 2) {
              if (d.length < 2 || m !== 2 || d.charCodeAt(d.length - 1) !== 46 || d.charCodeAt(d.length - 2) !== 46) {
                if (d.length > 2) {
                  var S = d.lastIndexOf("/");
                  if (S !== d.length - 1) {
                    S === -1 ? (d = "", m = 0) : m = (d = d.slice(0, S)).length - 1 - d.lastIndexOf("/"), p = b, _ = 0;
                    continue;
                  }
                } else if (d.length === 2 || d.length === 1) {
                  d = "", m = 0, p = b, _ = 0;
                  continue;
                }
              }
              c && (d.length > 0 ? d += "/.." : d = "..", m = 2);
            } else
              d.length > 0 ? d += "/" + o.slice(p + 1, b) : d = o.slice(p + 1, b), m = b - p - 1;
          p = b, _ = 0;
        } else
          h === 46 && _ !== -1 ? ++_ : _ = -1;
      }
      return d;
    }
    var l = { resolve: function() {
      for (var o, c = "", h = !1, d = arguments.length - 1; d >= -1 && !h; d--) {
        var m;
        d >= 0 ? m = arguments[d] : (o === void 0 && (o = process.cwd()), m = o), a(m), m.length !== 0 && (c = m + "/" + c, h = m.charCodeAt(0) === 47);
      }
      return c = s(c, !h), h ? c.length > 0 ? "/" + c : "/" : c.length > 0 ? c : ".";
    }, normalize: function(o) {
      if (a(o), o.length === 0)
        return ".";
      var c = o.charCodeAt(0) === 47, h = o.charCodeAt(o.length - 1) === 47;
      return (o = s(o, !c)).length !== 0 || c || (o = "."), o.length > 0 && h && (o += "/"), c ? "/" + o : o;
    }, isAbsolute: function(o) {
      return a(o), o.length > 0 && o.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var o, c = 0; c < arguments.length; ++c) {
        var h = arguments[c];
        a(h), h.length > 0 && (o === void 0 ? o = h : o += "/" + h);
      }
      return o === void 0 ? "." : l.normalize(o);
    }, relative: function(o, c) {
      if (a(o), a(c), o === c || (o = l.resolve(o)) === (c = l.resolve(c)))
        return "";
      for (var h = 1; h < o.length && o.charCodeAt(h) === 47; ++h)
        ;
      for (var d = o.length, m = d - h, p = 1; p < c.length && c.charCodeAt(p) === 47; ++p)
        ;
      for (var _ = c.length - p, b = m < _ ? m : _, S = -1, y = 0; y <= b; ++y) {
        if (y === b) {
          if (_ > b) {
            if (c.charCodeAt(p + y) === 47)
              return c.slice(p + y + 1);
            if (y === 0)
              return c.slice(p + y);
          } else
            m > b && (o.charCodeAt(h + y) === 47 ? S = y : y === 0 && (S = 0));
          break;
        }
        var w = o.charCodeAt(h + y);
        if (w !== c.charCodeAt(p + y))
          break;
        w === 47 && (S = y);
      }
      var x = "";
      for (y = h + S + 1; y <= d; ++y)
        y !== d && o.charCodeAt(y) !== 47 || (x.length === 0 ? x += ".." : x += "/..");
      return x.length > 0 ? x + c.slice(p + S) : (p += S, c.charCodeAt(p) === 47 && ++p, c.slice(p));
    }, _makeLong: function(o) {
      return o;
    }, dirname: function(o) {
      if (a(o), o.length === 0)
        return ".";
      for (var c = o.charCodeAt(0), h = c === 47, d = -1, m = !0, p = o.length - 1; p >= 1; --p)
        if ((c = o.charCodeAt(p)) === 47) {
          if (!m) {
            d = p;
            break;
          }
        } else
          m = !1;
      return d === -1 ? h ? "/" : "." : h && d === 1 ? "//" : o.slice(0, d);
    }, basename: function(o, c) {
      if (c !== void 0 && typeof c != "string")
        throw new TypeError('"ext" argument must be a string');
      a(o);
      var h, d = 0, m = -1, p = !0;
      if (c !== void 0 && c.length > 0 && c.length <= o.length) {
        if (c.length === o.length && c === o)
          return "";
        var _ = c.length - 1, b = -1;
        for (h = o.length - 1; h >= 0; --h) {
          var S = o.charCodeAt(h);
          if (S === 47) {
            if (!p) {
              d = h + 1;
              break;
            }
          } else
            b === -1 && (p = !1, b = h + 1), _ >= 0 && (S === c.charCodeAt(_) ? --_ == -1 && (m = h) : (_ = -1, m = b));
        }
        return d === m ? m = b : m === -1 && (m = o.length), o.slice(d, m);
      }
      for (h = o.length - 1; h >= 0; --h)
        if (o.charCodeAt(h) === 47) {
          if (!p) {
            d = h + 1;
            break;
          }
        } else
          m === -1 && (p = !1, m = h + 1);
      return m === -1 ? "" : o.slice(d, m);
    }, extname: function(o) {
      a(o);
      for (var c = -1, h = 0, d = -1, m = !0, p = 0, _ = o.length - 1; _ >= 0; --_) {
        var b = o.charCodeAt(_);
        if (b !== 47)
          d === -1 && (m = !1, d = _ + 1), b === 46 ? c === -1 ? c = _ : p !== 1 && (p = 1) : c !== -1 && (p = -1);
        else if (!m) {
          h = _ + 1;
          break;
        }
      }
      return c === -1 || d === -1 || p === 0 || p === 1 && c === d - 1 && c === h + 1 ? "" : o.slice(c, d);
    }, format: function(o) {
      if (o === null || typeof o != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof o);
      return function(c, h) {
        var d = h.dir || h.root, m = h.base || (h.name || "") + (h.ext || "");
        return d ? d === h.root ? d + m : d + "/" + m : m;
      }(0, o);
    }, parse: function(o) {
      a(o);
      var c = { root: "", dir: "", base: "", ext: "", name: "" };
      if (o.length === 0)
        return c;
      var h, d = o.charCodeAt(0), m = d === 47;
      m ? (c.root = "/", h = 1) : h = 0;
      for (var p = -1, _ = 0, b = -1, S = !0, y = o.length - 1, w = 0; y >= h; --y)
        if ((d = o.charCodeAt(y)) !== 47)
          b === -1 && (S = !1, b = y + 1), d === 46 ? p === -1 ? p = y : w !== 1 && (w = 1) : p !== -1 && (w = -1);
        else if (!S) {
          _ = y + 1;
          break;
        }
      return p === -1 || b === -1 || w === 0 || w === 1 && p === b - 1 && p === _ + 1 ? b !== -1 && (c.base = c.name = _ === 0 && m ? o.slice(1, b) : o.slice(_, b)) : (_ === 0 && m ? (c.name = o.slice(1, p), c.base = o.slice(1, b)) : (c.name = o.slice(_, p), c.base = o.slice(_, b)), c.ext = o.slice(p, b)), _ > 0 ? c.dir = o.slice(0, _ - 1) : m && (c.dir = "/"), c;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    l.posix = l, r.exports = l;
  } }, t = {};
  function n(r) {
    var a = t[r];
    if (a !== void 0)
      return a.exports;
    var s = t[r] = { exports: {} };
    return e[r](s, s.exports, n), s.exports;
  }
  n.d = (r, a) => {
    for (var s in a)
      n.o(a, s) && !n.o(r, s) && Object.defineProperty(r, s, { enumerable: !0, get: a[s] });
  }, n.o = (r, a) => Object.prototype.hasOwnProperty.call(r, a), n.r = (r) => {
    typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(r, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(r, "__esModule", { value: !0 });
  };
  var i = {};
  (() => {
    let r;
    n.r(i), n.d(i, { URI: () => m, Utils: () => U }), typeof process == "object" ? r = process.platform === "win32" : typeof navigator == "object" && (r = navigator.userAgent.indexOf("Windows") >= 0);
    const a = /^\w[\w\d+.-]*$/, s = /^\//, l = /^\/\//;
    function o(k, E) {
      if (!k.scheme && E)
        throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${k.authority}", path: "${k.path}", query: "${k.query}", fragment: "${k.fragment}"}`);
      if (k.scheme && !a.test(k.scheme))
        throw new Error("[UriError]: Scheme contains illegal characters.");
      if (k.path) {
        if (k.authority) {
          if (!s.test(k.path))
            throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
        } else if (l.test(k.path))
          throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
      }
    }
    const c = "", h = "/", d = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
    class m {
      constructor(E, A, v, L, M, O = !1) {
        Qe(this, "scheme"), Qe(this, "authority"), Qe(this, "path"), Qe(this, "query"), Qe(this, "fragment"), typeof E == "object" ? (this.scheme = E.scheme || c, this.authority = E.authority || c, this.path = E.path || c, this.query = E.query || c, this.fragment = E.fragment || c) : (this.scheme = /* @__PURE__ */ function(D, P) {
          return D || P ? D : "file";
        }(E, O), this.authority = A || c, this.path = function(D, P) {
          switch (D) {
            case "https":
            case "http":
            case "file":
              P ? P[0] !== h && (P = h + P) : P = h;
          }
          return P;
        }(this.scheme, v || c), this.query = L || c, this.fragment = M || c, o(this, O));
      }
      static isUri(E) {
        return E instanceof m || !!E && typeof E.authority == "string" && typeof E.fragment == "string" && typeof E.path == "string" && typeof E.query == "string" && typeof E.scheme == "string" && typeof E.fsPath == "string" && typeof E.with == "function" && typeof E.toString == "function";
      }
      get fsPath() {
        return w(this);
      }
      with(E) {
        if (!E)
          return this;
        let { scheme: A, authority: v, path: L, query: M, fragment: O } = E;
        return A === void 0 ? A = this.scheme : A === null && (A = c), v === void 0 ? v = this.authority : v === null && (v = c), L === void 0 ? L = this.path : L === null && (L = c), M === void 0 ? M = this.query : M === null && (M = c), O === void 0 ? O = this.fragment : O === null && (O = c), A === this.scheme && v === this.authority && L === this.path && M === this.query && O === this.fragment ? this : new _(A, v, L, M, O);
      }
      static parse(E, A = !1) {
        const v = d.exec(E);
        return v ? new _(v[2] || c, N(v[4] || c), N(v[5] || c), N(v[7] || c), N(v[9] || c), A) : new _(c, c, c, c, c);
      }
      static file(E) {
        let A = c;
        if (r && (E = E.replace(/\\/g, h)), E[0] === h && E[1] === h) {
          const v = E.indexOf(h, 2);
          v === -1 ? (A = E.substring(2), E = h) : (A = E.substring(2, v), E = E.substring(v) || h);
        }
        return new _("file", A, E, c, c);
      }
      static from(E) {
        const A = new _(E.scheme, E.authority, E.path, E.query, E.fragment);
        return o(A, !0), A;
      }
      toString(E = !1) {
        return x(this, E);
      }
      toJSON() {
        return this;
      }
      static revive(E) {
        if (E) {
          if (E instanceof m)
            return E;
          {
            const A = new _(E);
            return A._formatted = E.external, A._fsPath = E._sep === p ? E.fsPath : null, A;
          }
        }
        return E;
      }
    }
    const p = r ? 1 : void 0;
    class _ extends m {
      constructor() {
        super(...arguments), Qe(this, "_formatted", null), Qe(this, "_fsPath", null);
      }
      get fsPath() {
        return this._fsPath || (this._fsPath = w(this)), this._fsPath;
      }
      toString(E = !1) {
        return E ? x(this, !0) : (this._formatted || (this._formatted = x(this, !1)), this._formatted);
      }
      toJSON() {
        const E = { $mid: 1 };
        return this._fsPath && (E.fsPath = this._fsPath, E._sep = p), this._formatted && (E.external = this._formatted), this.path && (E.path = this.path), this.scheme && (E.scheme = this.scheme), this.authority && (E.authority = this.authority), this.query && (E.query = this.query), this.fragment && (E.fragment = this.fragment), E;
      }
    }
    const b = { 58: "%3A", 47: "%2F", 63: "%3F", 35: "%23", 91: "%5B", 93: "%5D", 64: "%40", 33: "%21", 36: "%24", 38: "%26", 39: "%27", 40: "%28", 41: "%29", 42: "%2A", 43: "%2B", 44: "%2C", 59: "%3B", 61: "%3D", 32: "%20" };
    function S(k, E, A) {
      let v, L = -1;
      for (let M = 0; M < k.length; M++) {
        const O = k.charCodeAt(M);
        if (O >= 97 && O <= 122 || O >= 65 && O <= 90 || O >= 48 && O <= 57 || O === 45 || O === 46 || O === 95 || O === 126 || E && O === 47 || A && O === 91 || A && O === 93 || A && O === 58)
          L !== -1 && (v += encodeURIComponent(k.substring(L, M)), L = -1), v !== void 0 && (v += k.charAt(M));
        else {
          v === void 0 && (v = k.substr(0, M));
          const D = b[O];
          D !== void 0 ? (L !== -1 && (v += encodeURIComponent(k.substring(L, M)), L = -1), v += D) : L === -1 && (L = M);
        }
      }
      return L !== -1 && (v += encodeURIComponent(k.substring(L))), v !== void 0 ? v : k;
    }
    function y(k) {
      let E;
      for (let A = 0; A < k.length; A++) {
        const v = k.charCodeAt(A);
        v === 35 || v === 63 ? (E === void 0 && (E = k.substr(0, A)), E += b[v]) : E !== void 0 && (E += k[A]);
      }
      return E !== void 0 ? E : k;
    }
    function w(k, E) {
      let A;
      return A = k.authority && k.path.length > 1 && k.scheme === "file" ? `//${k.authority}${k.path}` : k.path.charCodeAt(0) === 47 && (k.path.charCodeAt(1) >= 65 && k.path.charCodeAt(1) <= 90 || k.path.charCodeAt(1) >= 97 && k.path.charCodeAt(1) <= 122) && k.path.charCodeAt(2) === 58 ? k.path[1].toLowerCase() + k.path.substr(2) : k.path, r && (A = A.replace(/\//g, "\\")), A;
    }
    function x(k, E) {
      const A = E ? y : S;
      let v = "", { scheme: L, authority: M, path: O, query: D, fragment: P } = k;
      if (L && (v += L, v += ":"), (M || L === "file") && (v += h, v += h), M) {
        let H = M.indexOf("@");
        if (H !== -1) {
          const K = M.substr(0, H);
          M = M.substr(H + 1), H = K.lastIndexOf(":"), H === -1 ? v += A(K, !1, !1) : (v += A(K.substr(0, H), !1, !1), v += ":", v += A(K.substr(H + 1), !1, !0)), v += "@";
        }
        M = M.toLowerCase(), H = M.lastIndexOf(":"), H === -1 ? v += A(M, !1, !0) : (v += A(M.substr(0, H), !1, !0), v += M.substr(H));
      }
      if (O) {
        if (O.length >= 3 && O.charCodeAt(0) === 47 && O.charCodeAt(2) === 58) {
          const H = O.charCodeAt(1);
          H >= 65 && H <= 90 && (O = `/${String.fromCharCode(H + 32)}:${O.substr(3)}`);
        } else if (O.length >= 2 && O.charCodeAt(1) === 58) {
          const H = O.charCodeAt(0);
          H >= 65 && H <= 90 && (O = `${String.fromCharCode(H + 32)}:${O.substr(2)}`);
        }
        v += A(O, !0, !1);
      }
      return D && (v += "?", v += A(D, !1, !1)), P && (v += "#", v += E ? P : S(P, !1, !1)), v;
    }
    function C(k) {
      try {
        return decodeURIComponent(k);
      } catch {
        return k.length > 3 ? k.substr(0, 3) + C(k.substr(3)) : k;
      }
    }
    const I = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
    function N(k) {
      return k.match(I) ? k.replace(I, (E) => C(E)) : k;
    }
    var g = n(470);
    const f = g.posix || g, T = "/";
    var U;
    (function(k) {
      k.joinPath = function(E, ...A) {
        return E.with({ path: f.join(E.path, ...A) });
      }, k.resolvePath = function(E, ...A) {
        let v = E.path, L = !1;
        v[0] !== T && (v = T + v, L = !0);
        let M = f.resolve(v, ...A);
        return L && M[0] === T && !E.authority && (M = M.substring(1)), E.with({ path: M });
      }, k.dirname = function(E) {
        if (E.path.length === 0 || E.path === T)
          return E;
        let A = f.dirname(E.path);
        return A.length === 1 && A.charCodeAt(0) === 46 && (A = ""), E.with({ path: A });
      }, k.basename = function(E) {
        return f.basename(E.path);
      }, k.extname = function(E) {
        return f.extname(E.path);
      };
    })(U || (U = {}));
  })(), $o = i;
})();
var { URI: id, Utils: Ad } = $o;
function Ai(e) {
  const t = e[0], n = e[e.length - 1];
  return t === n && (t === "'" || t === '"') && (e = e.substring(1, e.length - 1)), e;
}
function rd(e, t) {
  return !e.length || t === "handlebars" && /{{|}}/.test(e) ? !1 : /\b(w[\w\d+.-]*:\/\/)?[^\s()<>]+(?:\([\w\d]+\)|([^[:punct:]\s]|\/?))/.test(e);
}
function ad(e, t, n, i) {
  if (/^\s*javascript\:/i.test(t) || /[\n\r]/.test(t))
    return;
  t = t.replace(/^\s*/g, "");
  const r = t.match(/^(\w[\w\d+.-]*):/);
  if (r) {
    const a = r[1].toLowerCase();
    return a === "http" || a === "https" || a === "file" ? t : void 0;
  }
  return /^\#/i.test(t) ? e + t : /^\/\//i.test(t) ? (Ye(e, "https://") ? "https" : "http") + ":" + t.replace(/^\s*/g, "") : n ? n.resolveReference(t, i || e) : t;
}
function sd(e, t, n, i, r, a) {
  const s = Ai(n);
  if (!rd(s, e.languageId))
    return;
  s.length < n.length && (i++, r--);
  const l = ad(e.uri, s, t, a);
  if (!l)
    return;
  const o = ld(l, e);
  return {
    range: X.create(e.positionAt(i), e.positionAt(r)),
    target: o
  };
}
var od = 35;
function ld(e, t) {
  try {
    let n = id.parse(e);
    return n.scheme === "file" && n.query && (n = n.with({ query: null }), e = n.toString(
      /* skipEncodig*/
      !0
    )), n.scheme === "file" && n.fragment && !(e.startsWith(t.uri) && e.charCodeAt(t.uri.length) === od) ? n.with({ fragment: null }).toString(
      /* skipEncodig*/
      !0
    ) : e;
  } catch {
    return;
  }
}
var cd = class {
  constructor(e) {
    this.dataManager = e;
  }
  findDocumentLinks(e, t) {
    const n = [], i = ke(e.getText(), 0);
    let r = i.scan(), a, s, l = !1, o;
    const c = {};
    for (; r !== z.EOS; ) {
      switch (r) {
        case z.StartTag:
          s = i.getTokenText().toLowerCase(), o || (l = s === "base");
          break;
        case z.AttributeName:
          a = i.getTokenText().toLowerCase();
          break;
        case z.AttributeValue:
          if (s && a && this.dataManager.isPathAttribute(s, a)) {
            const h = i.getTokenText();
            if (!l) {
              const d = sd(e, t, h, i.getTokenOffset(), i.getTokenEnd(), o);
              d && n.push(d);
            }
            l && typeof o > "u" && (o = Ai(h), o && t && (o = t.resolveReference(o, e.uri))), l = !1, a = void 0;
          } else if (a === "id") {
            const h = Ai(i.getTokenText());
            c[h] = i.getTokenOffset();
          }
          break;
      }
      r = i.scan();
    }
    for (const h of n) {
      const d = e.uri + "#";
      if (h.target && Ye(h.target, d)) {
        const m = h.target.substring(d.length), p = c[m];
        if (p !== void 0) {
          const _ = e.positionAt(p);
          h.target = `${d}${_.line + 1},${_.character + 1}`;
        } else
          h.target = e.uri;
      }
    }
    return n;
  }
};
function hd(e, t, n) {
  const i = e.offsetAt(t), r = n.findNodeAt(i);
  if (!r.tag)
    return [];
  const a = [], s = Js(z.StartTag, e, r.start), l = typeof r.endTagStart == "number" && Js(z.EndTag, e, r.endTagStart);
  return (s && Xs(s, t) || l && Xs(l, t)) && (s && a.push({ kind: bn.Read, range: s }), l && a.push({ kind: bn.Read, range: l })), a;
}
function Gs(e, t) {
  return e.line < t.line || e.line === t.line && e.character <= t.character;
}
function Xs(e, t) {
  return Gs(e.start, t) && Gs(t, e.end);
}
function Js(e, t, n) {
  const i = ke(t.getText(), n);
  let r = i.scan();
  for (; r !== z.EOS && r !== e; )
    r = i.scan();
  return r !== z.EOS ? { start: t.positionAt(i.getTokenOffset()), end: t.positionAt(i.getTokenEnd()) } : null;
}
function ud(e, t) {
  const n = [], i = Go(e, t);
  for (const a of i)
    r(a, void 0);
  return n;
  function r(a, s) {
    const l = Ti.create(a.name, a.kind, a.range, e.uri, s == null ? void 0 : s.name);
    if (l.containerName ?? (l.containerName = ""), n.push(l), a.children)
      for (const o of a.children)
        r(o, a);
  }
}
function Go(e, t) {
  const n = [];
  return t.roots.forEach((i) => {
    Xo(e, i, n);
  }), n;
}
function Xo(e, t, n) {
  const i = dd(t), r = X.create(e.positionAt(t.start), e.positionAt(t.end)), a = ki.create(i, void 0, yi.Field, r, r);
  n.push(a), t.children.forEach((s) => {
    a.children ?? (a.children = []), Xo(e, s, a.children);
  });
}
function dd(e) {
  let t = e.tag;
  if (e.attributes) {
    const n = e.attributes.id, i = e.attributes.class;
    n && (t += `#${n.replace(/[\"\']/g, "")}`), i && (t += i.replace(/[\"\']/g, "").split(/\s+/).map((r) => `.${r}`).join(""));
  }
  return t || "?";
}
function md(e, t, n, i) {
  const r = e.offsetAt(t), a = i.findNodeAt(r);
  if (!a.tag || !pd(a, r, a.tag))
    return null;
  const s = [], l = {
    start: e.positionAt(a.start + 1),
    end: e.positionAt(a.start + 1 + a.tag.length)
  };
  if (s.push({
    range: l,
    newText: n
  }), a.endTagStart) {
    const o = {
      start: e.positionAt(a.endTagStart + 2),
      end: e.positionAt(a.endTagStart + 2 + a.tag.length)
    };
    s.push({
      range: o,
      newText: n
    });
  }
  return {
    changes: {
      [e.uri.toString()]: s
    }
  };
}
function pd(e, t, n) {
  return e.endTagStart && e.endTagStart + 2 <= t && t <= e.endTagStart + 2 + n.length ? !0 : e.start + 1 <= t && t <= e.start + 1 + n.length;
}
function fd(e, t, n) {
  const i = e.offsetAt(t), r = n.findNodeAt(i);
  if (!r.tag || !r.endTagStart)
    return null;
  if (r.start + 1 <= i && i <= r.start + 1 + r.tag.length) {
    const a = i - 1 - r.start + r.endTagStart + 2;
    return e.positionAt(a);
  }
  if (r.endTagStart + 2 <= i && i <= r.endTagStart + 2 + r.tag.length) {
    const a = i - 2 - r.endTagStart + r.start + 1;
    return e.positionAt(a);
  }
  return null;
}
function Ys(e, t, n) {
  const i = e.offsetAt(t), r = n.findNodeAt(i), a = r.tag ? r.tag.length : 0;
  return r.endTagStart && // Within open tag, compute close tag
  (r.start + 1 <= i && i <= r.start + 1 + a || // Within closing tag, compute open tag
  r.endTagStart + 2 <= i && i <= r.endTagStart + 2 + a) ? [
    X.create(e.positionAt(r.start + 1), e.positionAt(r.start + 1 + a)),
    X.create(e.positionAt(r.endTagStart + 2), e.positionAt(r.endTagStart + 2 + a))
  ] : null;
}
var gd = class {
  constructor(e) {
    this.dataManager = e;
  }
  limitRanges(e, t) {
    e = e.sort((h, d) => {
      let m = h.startLine - d.startLine;
      return m === 0 && (m = h.endLine - d.endLine), m;
    });
    let n;
    const i = [], r = [], a = [], s = (h, d) => {
      r[h] = d, d < 30 && (a[d] = (a[d] || 0) + 1);
    };
    for (let h = 0; h < e.length; h++) {
      const d = e[h];
      if (!n)
        n = d, s(h, 0);
      else if (d.startLine > n.startLine) {
        if (d.endLine <= n.endLine)
          i.push(n), n = d, s(h, i.length);
        else if (d.startLine > n.endLine) {
          do
            n = i.pop();
          while (n && d.startLine > n.endLine);
          n && i.push(n), n = d, s(h, i.length);
        }
      }
    }
    let l = 0, o = 0;
    for (let h = 0; h < a.length; h++) {
      const d = a[h];
      if (d) {
        if (d + l > t) {
          o = h;
          break;
        }
        l += d;
      }
    }
    const c = [];
    for (let h = 0; h < e.length; h++) {
      const d = r[h];
      typeof d == "number" && (d < o || d === o && l++ < t) && c.push(e[h]);
    }
    return c;
  }
  getFoldingRanges(e, t) {
    const n = this.dataManager.getVoidElements(e.languageId), i = ke(e.getText());
    let r = i.scan();
    const a = [], s = [];
    let l = null, o = -1;
    function c(d) {
      a.push(d), o = d.startLine;
    }
    for (; r !== z.EOS; ) {
      switch (r) {
        case z.StartTag: {
          const d = i.getTokenText(), m = e.positionAt(i.getTokenOffset()).line;
          s.push({ startLine: m, tagName: d }), l = d;
          break;
        }
        case z.EndTag: {
          l = i.getTokenText();
          break;
        }
        case z.StartTagClose:
          if (!l || !this.dataManager.isVoidElement(l, n))
            break;
        case z.EndTagClose:
        case z.StartTagSelfClose: {
          let d = s.length - 1;
          for (; d >= 0 && s[d].tagName !== l; )
            d--;
          if (d >= 0) {
            const m = s[d];
            s.length = d;
            const p = e.positionAt(i.getTokenOffset()).line, _ = m.startLine, b = p - 1;
            b > _ && o !== _ && c({ startLine: _, endLine: b });
          }
          break;
        }
        case z.Comment: {
          let d = e.positionAt(i.getTokenOffset()).line;
          const m = i.getTokenText().match(/^\s*#(region\b)|(endregion\b)/);
          if (m)
            if (m[1])
              s.push({ startLine: d, tagName: "" });
            else {
              let p = s.length - 1;
              for (; p >= 0 && s[p].tagName.length; )
                p--;
              if (p >= 0) {
                const _ = s[p];
                s.length = p;
                const b = d;
                d = _.startLine, b > d && o !== d && c({ startLine: d, endLine: b, kind: pn.Region });
              }
            }
          else {
            const p = e.positionAt(i.getTokenOffset() + i.getTokenLength()).line;
            d < p && c({ startLine: d, endLine: p, kind: pn.Comment });
          }
          break;
        }
      }
      r = i.scan();
    }
    const h = t && t.rangeLimit || Number.MAX_VALUE;
    return a.length > h ? this.limitRanges(a, h) : a;
  }
}, bd = class {
  constructor(e) {
    this.htmlParser = e;
  }
  getSelectionRanges(e, t) {
    const n = this.htmlParser.parseDocument(e);
    return t.map((i) => this.getSelectionRange(i, e, n));
  }
  getSelectionRange(e, t, n) {
    const i = this.getApplicableRanges(t, e, n);
    let r, a;
    for (let s = i.length - 1; s >= 0; s--) {
      const l = i[s];
      (!r || l[0] !== r[0] || l[1] !== r[1]) && (a = wn.create(X.create(t.positionAt(i[s][0]), t.positionAt(i[s][1])), a)), r = l;
    }
    return a || (a = wn.create(X.create(e, e))), a;
  }
  getApplicableRanges(e, t, n) {
    const i = e.offsetAt(t), r = n.findNodeAt(i);
    let a = this.getAllParentTagRanges(r);
    if (r.startTagEnd && !r.endTagStart) {
      if (r.startTagEnd !== r.end)
        return [[r.start, r.end]];
      const s = X.create(e.positionAt(r.startTagEnd - 2), e.positionAt(r.startTagEnd));
      return e.getText(s) === "/>" ? a.unshift([r.start + 1, r.startTagEnd - 2]) : a.unshift([r.start + 1, r.startTagEnd - 1]), a = this.getAttributeLevelRanges(e, r, i).concat(a), a;
    }
    return !r.startTagEnd || !r.endTagStart ? a : (a.unshift([r.start, r.end]), r.start < i && i < r.startTagEnd ? (a.unshift([r.start + 1, r.startTagEnd - 1]), a = this.getAttributeLevelRanges(e, r, i).concat(a), a) : r.startTagEnd <= i && i <= r.endTagStart ? (a.unshift([r.startTagEnd, r.endTagStart]), a) : (i >= r.endTagStart + 2 && a.unshift([r.endTagStart + 2, r.end - 1]), a));
  }
  getAllParentTagRanges(e) {
    let t = e;
    const n = [];
    for (; t.parent; )
      t = t.parent, this.getNodeRanges(t).forEach((i) => n.push(i));
    return n;
  }
  getNodeRanges(e) {
    return e.startTagEnd && e.endTagStart && e.startTagEnd < e.endTagStart ? [
      [e.startTagEnd, e.endTagStart],
      [e.start, e.end]
    ] : [
      [e.start, e.end]
    ];
  }
  getAttributeLevelRanges(e, t, n) {
    const i = X.create(e.positionAt(t.start), e.positionAt(t.end)), r = e.getText(i), a = n - t.start, s = ke(r);
    let l = s.scan();
    const o = t.start, c = [];
    let h = !1, d = -1;
    for (; l !== z.EOS; ) {
      switch (l) {
        case z.AttributeName: {
          if (a < s.getTokenOffset()) {
            h = !1;
            break;
          }
          a <= s.getTokenEnd() && c.unshift([s.getTokenOffset(), s.getTokenEnd()]), h = !0, d = s.getTokenOffset();
          break;
        }
        case z.AttributeValue: {
          if (!h)
            break;
          const m = s.getTokenText();
          if (a < s.getTokenOffset()) {
            c.push([d, s.getTokenEnd()]);
            break;
          }
          a >= s.getTokenOffset() && a <= s.getTokenEnd() && (c.unshift([s.getTokenOffset(), s.getTokenEnd()]), (m[0] === '"' && m[m.length - 1] === '"' || m[0] === "'" && m[m.length - 1] === "'") && a >= s.getTokenOffset() + 1 && a <= s.getTokenEnd() - 1 && c.unshift([s.getTokenOffset() + 1, s.getTokenEnd() - 1]), c.push([d, s.getTokenEnd()]));
          break;
        }
      }
      l = s.scan();
    }
    return c.map((m) => [m[0] + o, m[1] + o]);
  }
}, _d = {
  version: 1.1,
  tags: [
    {
      name: "html",
      description: {
        kind: "markdown",
        value: "The html element represents the root of an HTML document."
      },
      attributes: [
        {
          name: "manifest",
          description: {
            kind: "markdown",
            value: "Specifies the URI of a resource manifest indicating resources that should be cached locally. See [Using the application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache) for details."
          }
        },
        {
          name: "version",
          description: 'Specifies the version of the HTML [Document Type Definition](https://developer.mozilla.org/en-US/docs/Glossary/DTD "Document Type Definition: In HTML, the doctype is the required "<!DOCTYPE html>" preamble found at the top of all documents. Its sole purpose is to prevent a browser from switching into so-called “quirks mode” when rendering a document; that is, the "<!DOCTYPE html>" doctype ensures that the browser makes a best-effort attempt at following the relevant specifications, rather than using a different rendering mode that is incompatible with some specifications.") that governs the current document. This attribute is not needed, because it is redundant with the version information in the document type declaration.'
        },
        {
          name: "xmlns",
          description: 'Specifies the XML Namespace of the document. Default value is `"http://www.w3.org/1999/xhtml"`. This is required in documents parsed with XML parsers, and optional in text/html documents.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/html"
        }
      ]
    },
    {
      name: "head",
      description: {
        kind: "markdown",
        value: "The head element represents a collection of metadata for the Document."
      },
      attributes: [
        {
          name: "profile",
          description: "The URIs of one or more metadata profiles, separated by white space."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/head"
        }
      ]
    },
    {
      name: "title",
      description: {
        kind: "markdown",
        value: "The title element represents the document's title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user's history or bookmarks, or in search results. The document's title is often different from its first heading, since the first heading does not have to stand alone when taken out of context."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/title"
        }
      ]
    },
    {
      name: "base",
      description: {
        kind: "markdown",
        value: "The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information."
      },
      void: !0,
      attributes: [
        {
          name: "href",
          description: {
            kind: "markdown",
            value: "The base URL to be used throughout the document for relative URL addresses. If this attribute is specified, this element must come before any other elements with attributes whose values are URLs. Absolute and relative URLs are allowed."
          }
        },
        {
          name: "target",
          valueSet: "target",
          description: {
            kind: "markdown",
            value: "A name or keyword indicating the default location to display the result when hyperlinks or forms cause navigation, for elements that do not have an explicit target reference. It is a name of, or keyword for, a _browsing context_ (for example: tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the result into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the result into a new unnamed browsing context.\n*   `_parent`: Load the result into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the result into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n\nIf this attribute is specified, this element must come before any other elements with attributes whose values are URLs."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/base"
        }
      ]
    },
    {
      name: "link",
      description: {
        kind: "markdown",
        value: "The link element allows authors to link their document to other resources."
      },
      void: !0,
      attributes: [
        {
          name: "href",
          description: {
            kind: "markdown",
            value: 'This attribute specifies the [URL](https://developer.mozilla.org/en-US/docs/Glossary/URL "URL: Uniform Resource Locator (URL) is a text string specifying where a resource can be found on the Internet.") of the linked resource. A URL can be absolute or relative.'
          }
        },
        {
          name: "crossorigin",
          valueSet: "xo",
          description: {
            kind: "markdown",
            value: 'This enumerated attribute indicates whether [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") must be used when fetching the resource. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\n`anonymous`\n\nA cross-origin request (i.e. with an [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn\'t include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn\'t disclose the whole path.") HTTP header) is performed, but no credential is sent (i.e. no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header) the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e. with an `Origin` HTTP header) is performed along with a credential sent (i.e. a cookie, certificate, and/or HTTP Basic authentication is performed). If the server does not give credentials to the origin site (through [`Access-Control-Allow-Credentials`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials "The Access-Control-Allow-Credentials response header tells browsers whether to expose the response to frontend JavaScript code when the request\'s credentials mode (Request.credentials) is "include".") HTTP header), the resource will be _tainted_ and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") request (i.e. without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for additional information.'
          }
        },
        {
          name: "rel",
          description: {
            kind: "markdown",
            value: "This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of the [link types values](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
          }
        },
        {
          name: "media",
          description: {
            kind: "markdown",
            value: "This attribute specifies the media that the linked resource applies to. Its value must be a media type / [media query](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries). This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.\n\n**Notes:**\n\n*   In HTML 4, this can only be a simple white-space-separated list of media description literals, i.e., [media types and groups](https://developer.mozilla.org/en-US/docs/Web/CSS/@media), where defined and allowed as values for this attribute, such as `print`, `screen`, `aural`, `braille`. HTML5 extended this to any kind of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries), which are a superset of the allowed values of HTML 4.\n*   Browsers not supporting [CSS3 Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_queries) won't necessarily recognize the adequate link; do not forget to set fallback links, the restricted set of media queries defined in HTML 4."
          }
        },
        {
          name: "hreflang",
          description: {
            kind: "markdown",
            value: "This attribute indicates the language of the linked resource. It is purely advisory. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt). Use this attribute only if the [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute is present."
          }
        },
        {
          name: "type",
          description: {
            kind: "markdown",
            value: 'This attribute is used to define the type of the content linked to. The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on. The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice. It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.'
          }
        },
        {
          name: "sizes",
          description: {
            kind: "markdown",
            value: "This attribute defines the sizes of the icons for visual media contained in the resource. It must be present only if the [`rel`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-rel) contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`. It may have the following values:\n\n*   `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.\n*   a white-space separated list of sizes, each in the format `_<width in pixels>_x_<height in pixels>_` or `_<width in pixels>_X_<height in pixels>_`. Each of these sizes must be contained in the resource.\n\n**Note:** Most icon formats are only able to store one single icon; therefore most of the time the [`sizes`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-sizes) contains only one entry. MS's ICO format does, as well as Apple's ICNS. ICO is more ubiquitous; you should definitely use it."
          }
        },
        {
          name: "as",
          description: 'This attribute is only used when `rel="preload"` or `rel="prefetch"` has been set on the `<link>` element. It specifies the type of content being loaded by the `<link>`, which is necessary for content prioritization, request matching, application of correct [content security policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP), and setting of correct [`Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept "The Accept request HTTP header advertises which content types, expressed as MIME types, the client is able to understand. Using content negotiation, the server then selects one of the proposals, uses it and informs the client of its choice with the Content-Type response header. Browsers set adequate values for this header depending on the context where the request is done: when fetching a CSS stylesheet a different value is set for the request than when fetching an image, video or a script.") request header.'
        },
        {
          name: "importance",
          description: "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
        },
        {
          name: "importance",
          description: '**`auto`**: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the resource.\n\n**`high`**: Indicates to the browser that the resource is of **high** priority.\n\n**`low`**: Indicates to the browser that the resource is of **low** priority.\n\n**Note:** The `importance` attribute may only be used for the `<link>` element if `rel="preload"` or `rel="prefetch"` is present.'
        },
        {
          name: "integrity",
          description: "Contains inline metadata — a base64-encoded cryptographic hash of the resource (file) you’re telling the browser to fetch. The browser can use this to verify that the fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
        },
        {
          name: "referrerpolicy",
          description: 'A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer` means that the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` means that no [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior, if no policy is otherwise specified.\n*   `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.\n*   `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer\'s path.\n*   `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username). This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.'
        },
        {
          name: "title",
          description: 'The `title` attribute has special semantics on the `<link>` element. When used on a `<link rel="stylesheet">` it defines a [preferred or an alternate stylesheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets). Incorrectly using it may [cause the stylesheet to be ignored](https://developer.mozilla.org/en-US/docs/Correctly_Using_Titles_With_External_Stylesheets).'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/link"
        }
      ]
    },
    {
      name: "meta",
      description: {
        kind: "markdown",
        value: "The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements."
      },
      void: !0,
      attributes: [
        {
          name: "name",
          description: {
            kind: "markdown",
            value: `This attribute defines the name of a piece of document-level metadata. It should not be set if one of the attributes [\`itemprop\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-itemprop), [\`http-equiv\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [\`charset\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) is also set.

This metadata name is associated with the value contained by the [\`content\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute. The possible values for the name attribute are:

*   \`application-name\` which defines the name of the application running in the web page.
    
    **Note:**
    
    *   Browsers may use this to identify the application. It is different from the [\`<title>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title "The HTML Title element (<title>) defines the document's title that is shown in a browser's title bar or a page's tab.") element, which usually contain the application name, but may also contain information like the document name or a status.
    *   Simple web pages shouldn't define an application-name.
    
*   \`author\` which defines the name of the document's author.
*   \`description\` which contains a short and accurate summary of the content of the page. Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
*   \`generator\` which contains the identifier of the software that generated the page.
*   \`keywords\` which contains words relevant to the page's content separated by commas.
*   \`referrer\` which controls the [\`Referer\` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) attached to requests sent from the document:
    
    Values for the \`content\` attribute of \`<meta name="referrer">\`
    
    \`no-referrer\`
    
    Do not send a HTTP \`Referrer\` header.
    
    \`origin\`
    
    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the document.
    
    \`no-referrer-when-downgrade\`
    
    Send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) as a referrer to URLs as secure as the current page, (https→https), but does not send a referrer to less secure URLs (https→http). This is the default behaviour.
    
    \`origin-when-cross-origin\`
    
    Send the full URL (stripped of parameters) for same-origin requests, but only send the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) for other cases.
    
    \`same-origin\`
    
    A referrer will be sent for [same-site origins](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy), but cross-origin requests will contain no referrer information.
    
    \`strict-origin\`
    
    Only send the origin of the document as the referrer to a-priori as-much-secure destination (HTTPS->HTTPS), but don't send it to a less secure destination (HTTPS->HTTP).
    
    \`strict-origin-when-cross-origin\`
    
    Send a full URL when performing a same-origin request, only send the origin of the document to a-priori as-much-secure destination (HTTPS->HTTPS), and send no header to a less secure destination (HTTPS->HTTP).
    
    \`unsafe-URL\`
    
    Send the full URL (stripped of parameters) for same-origin or cross-origin requests.
    
    **Notes:**
    
    *   Some browsers support the deprecated values of \`always\`, \`default\`, and \`never\` for referrer.
    *   Dynamically inserting \`<meta name="referrer">\` (with [\`document.write\`](https://developer.mozilla.org/en-US/docs/Web/API/Document/write) or [\`appendChild\`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)) makes the referrer behaviour unpredictable.
    *   When several conflicting policies are defined, the no-referrer policy is applied.
    

This attribute may also have a value taken from the extended list defined on [WHATWG Wiki MetaExtensions page](https://wiki.whatwg.org/wiki/MetaExtensions). Although none have been formally accepted yet, a few commonly used names are:

*   \`creator\` which defines the name of the creator of the document, such as an organization or institution. If there are more than one, several [\`<meta>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") elements should be used.
*   \`googlebot\`, a synonym of \`robots\`, is only followed by Googlebot (the indexing crawler for Google).
*   \`publisher\` which defines the name of the document's publisher.
*   \`robots\` which defines the behaviour that cooperative crawlers, or "robots", should use with the page. It is a comma-separated list of the values below:
    
    Values for the content of \`<meta name="robots">\`
    
    Value
    
    Description
    
    Used by
    
    \`index\`
    
    Allows the robot to index the page (default).
    
    All
    
    \`noindex\`
    
    Requests the robot to not index the page.
    
    All
    
    \`follow\`
    
    Allows the robot to follow the links on the page (default).
    
    All
    
    \`nofollow\`
    
    Requests the robot to not follow the links on the page.
    
    All
    
    \`none\`
    
    Equivalent to \`noindex, nofollow\`
    
    [Google](https://support.google.com/webmasters/answer/79812)
    
    \`noodp\`
    
    Prevents using the [Open Directory Project](https://www.dmoz.org/) description, if any, as the page description in search engine results.
    
    [Google](https://support.google.com/webmasters/answer/35624#nodmoz), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/meta-tags-robotstxt-yahoo-search-sln2213.html#cont5), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    \`noarchive\`
    
    Requests the search engine not to cache the page content.
    
    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Yahoo](https://help.yahoo.com/kb/search-for-desktop/SLN2213.html), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    \`nosnippet\`
    
    Prevents displaying any description of the page in search engine results.
    
    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives), [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    \`noimageindex\`
    
    Requests this page not to appear as the referring page of an indexed image.
    
    [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag#valid-indexing--serving-directives)
    
    \`nocache\`
    
    Synonym of \`noarchive\`.
    
    [Bing](https://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
    
    **Notes:**
    
    *   Only cooperative robots follow these rules. Do not expect to prevent e-mail harvesters with them.
    *   The robot still needs to access the page in order to read these rules. To prevent bandwidth consumption, use a _[robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/robots.txt "robots.txt: Robots.txt is a file which is usually placed in the root of any website. It decides whether crawlers are permitted or forbidden access to the web site.")_ file.
    *   If you want to remove a page, \`noindex\` will work, but only after the robot visits the page again. Ensure that the \`robots.txt\` file is not preventing revisits.
    *   Some values are mutually exclusive, like \`index\` and \`noindex\`, or \`follow\` and \`nofollow\`. In these cases the robot's behaviour is undefined and may vary between them.
    *   Some crawler robots, like Google, Yahoo and Bing, support the same values for the HTTP header \`X-Robots-Tag\`; this allows non-HTML documents like images to use these rules.
    
*   \`slurp\`, is a synonym of \`robots\`, but only for Slurp - the crawler for Yahoo Search.
*   \`viewport\`, which gives hints about the size of the initial size of the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/viewport "viewport: A viewport represents a polygonal (normally rectangular) area in computer graphics that is currently being viewed. In web browser terms, it refers to the part of the document you're viewing which is currently visible in its window (or the screen, if the document is being viewed in full screen mode). Content outside the viewport is not visible onscreen until scrolled into view."). Used by mobile devices only.
    
    Values for the content of \`<meta name="viewport">\`
    
    Value
    
    Possible subvalues
    
    Description
    
    \`width\`
    
    A positive integer number, or the text \`device-width\`
    
    Defines the pixel width of the viewport that you want the web site to be rendered at.
    
    \`height\`
    
    A positive integer, or the text \`device-height\`
    
    Defines the height of the viewport. Not used by any browser.
    
    \`initial-scale\`
    
    A positive number between \`0.0\` and \`10.0\`
    
    Defines the ratio between the device width (\`device-width\` in portrait mode or \`device-height\` in landscape mode) and the viewport size.
    
    \`maximum-scale\`
    
    A positive number between \`0.0\` and \`10.0\`
    
    Defines the maximum amount to zoom in. It must be greater or equal to the \`minimum-scale\` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
    
    \`minimum-scale\`
    
    A positive number between \`0.0\` and \`10.0\`
    
    Defines the minimum zoom level. It must be smaller or equal to the \`maximum-scale\` or the behaviour is undefined. Browser settings can ignore this rule and iOS10+ ignores it by default.
    
    \`user-scalable\`
    
    \`yes\` or \`no\`
    
    If set to \`no\`, the user is not able to zoom in the webpage. The default is \`yes\`. Browser settings can ignore this rule, and iOS10+ ignores it by default.
    
    Specification
    
    Status
    
    Comment
    
    [CSS Device Adaptation  
    The definition of '<meta name="viewport">' in that specification.](https://drafts.csswg.org/css-device-adapt/#viewport-meta)
    
    Working Draft
    
    Non-normatively describes the Viewport META element
    
    See also: [\`@viewport\`](https://developer.mozilla.org/en-US/docs/Web/CSS/@viewport "The @viewport CSS at-rule lets you configure the viewport through which the document is viewed. It's primarily used for mobile devices, but is also used by desktop browsers that support features like "snap to edge" (such as Microsoft Edge).")
    
    **Notes:**
    
    *   Though unstandardized, this declaration is respected by most mobile browsers due to de-facto dominance.
    *   The default values may vary between devices and browsers.
    *   To learn about this declaration in Firefox for Mobile, see [this article](https://developer.mozilla.org/en-US/docs/Mobile/Viewport_meta_tag "Mobile/Viewport meta tag").`
          }
        },
        {
          name: "http-equiv",
          description: {
            kind: "markdown",
            value: 'Defines a pragma directive. The attribute is named `**http-equiv**(alent)` because all the allowed values are names of particular HTTP headers:\n\n*   `"content-language"`  \n    Defines the default language of the page. It can be overridden by the [lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) attribute on any element.\n    \n    **Warning:** Do not use this value, as it is obsolete. Prefer the `lang` attribute on the [`<html>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html "The HTML <html> element represents the root (top-level element) of an HTML document, so it is also referred to as the root element. All other elements must be descendants of this element.") element.\n    \n*   `"content-security-policy"`  \n    Allows page authors to define a [content policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives) for the current page. Content policies mostly specify allowed server origins and script endpoints which help guard against cross-site scripting attacks.\n*   `"content-type"`  \n    Defines the [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the document, followed by its character encoding. It follows the same syntax as the HTTP `content-type` entity-header field, but as it is inside a HTML page, most values other than `text/html` are impossible. Therefore the valid syntax for its `content` is the string \'`text/html`\' followed by a character set with the following syntax: \'`; charset=_IANAcharset_`\', where `IANAcharset` is the _preferred MIME name_ for a character set as [defined by the IANA.](https://www.iana.org/assignments/character-sets)\n    \n    **Warning:** Do not use this value, as it is obsolete. Use the [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute on the [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element.\n    \n    **Note:** As [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") can\'t change documents\' types in XHTML or HTML5\'s XHTML serialization, never set the MIME type to an XHTML MIME type with `<meta>`.\n    \n*   `"refresh"`  \n    This instruction specifies:\n    *   The number of seconds until the page should be reloaded - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer.\n    *   The number of seconds until the page should redirect to another - only if the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) attribute contains a positive integer followed by the string \'`;url=`\', and a valid URL.\n*   `"set-cookie"`  \n    Defines a [cookie](https://developer.mozilla.org/en-US/docs/cookie) for the page. Its content must follow the syntax defined in the [IETF HTTP Cookie Specification](https://tools.ietf.org/html/draft-ietf-httpstate-cookie-14).\n    \n    **Warning:** Do not use this instruction, as it is obsolete. Use the HTTP header [`Set-Cookie`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie) instead.'
          }
        },
        {
          name: "content",
          description: {
            kind: "markdown",
            value: "This attribute contains the value for the [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv) or [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-name) attribute, depending on which is used."
          }
        },
        {
          name: "charset",
          description: {
            kind: "markdown",
            value: 'This attribute declares the page\'s character encoding. It must contain a [standard IANA MIME name for character encodings](https://www.iana.org/assignments/character-sets). Although the standard doesn\'t request a specific encoding, it suggests:\n\n*   Authors are encouraged to use [`UTF-8`](https://developer.mozilla.org/en-US/docs/Glossary/UTF-8).\n*   Authors should not use ASCII-incompatible encodings to avoid security risk: browsers not supporting them may interpret harmful content as HTML. This happens with the `JIS_C6226-1983`, `JIS_X0212-1990`, `HZ-GB-2312`, `JOHAB`, the ISO-2022 family and the EBCDIC family.\n\n**Note:** ASCII-incompatible encodings are those that don\'t map the 8-bit code points `0x20` to `0x7E` to the `0x0020` to `0x007E` Unicode code points)\n\n*   Authors **must not** use `CESU-8`, `UTF-7`, `BOCU-1` and/or `SCSU` as [cross-site scripting](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting) attacks with these encodings have been demonstrated.\n*   Authors should not use `UTF-32` because not all HTML5 encoding algorithms can distinguish it from `UTF-16`.\n\n**Notes:**\n\n*   The declared character encoding must match the one the page was saved with to avoid garbled characters and security holes.\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element declaring the encoding must be inside the [`<head>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head "The HTML <head> element provides general information (metadata) about the document, including its title and links to its scripts and style sheets.") element and **within the first 1024 bytes** of the HTML as some browsers only look at those bytes before choosing an encoding.\n*   This [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element is only one part of the [algorithm to determine a page\'s character set](https://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html#encoding-sniffing-algorithm "Algorithm charset page"). The [`Content-Type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) and any [Byte-Order Marks](https://developer.mozilla.org/en-US/docs/Glossary/Byte-Order_Mark "The definition of that term (Byte-Order Marks) has not been written yet; please consider contributing it!") override this element.\n*   It is strongly recommended to define the character encoding. If a page\'s encoding is undefined, cross-scripting techniques are possible, such as the [`UTF-7` fallback cross-scripting technique](https://code.google.com/p/doctype-mirror/wiki/ArticleUtf7).\n*   The [`<meta>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta "The HTML <meta> element represents metadata that cannot be represented by other HTML meta-related elements, like <base>, <link>, <script>, <style> or <title>.") element with a `charset` attribute is a synonym for the pre-HTML5 `<meta http-equiv="Content-Type" content="text/html; charset=_IANAcharset_">`, where _`IANAcharset`_ contains the value of the equivalent [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) attribute. This syntax is still allowed, although no longer recommended.'
          }
        },
        {
          name: "scheme",
          description: "This attribute defines the scheme in which metadata is described. A scheme is a context leading to the correct interpretations of the [`content`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-content) value, like a format.\n\n**Warning:** Do not use this value, as it is obsolete. There is no replacement as there was no real usage for it."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/meta"
        }
      ]
    },
    {
      name: "style",
      description: {
        kind: "markdown",
        value: "The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user."
      },
      attributes: [
        {
          name: "media",
          description: {
            kind: "markdown",
            value: "This attribute defines which media the style should be applied to. Its value is a [media query](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries), which defaults to `all` if the attribute is missing."
          }
        },
        {
          name: "nonce",
          description: {
            kind: "markdown",
            value: "A cryptographic nonce (number used once) used to whitelist inline styles in a [style-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource’s policy is otherwise trivial."
          }
        },
        {
          name: "type",
          description: {
            kind: "markdown",
            value: "This attribute defines the styling language as a MIME type (charset should not be specified). This attribute is optional and defaults to `text/css` if it is not specified — there is very little reason to include this in modern web documents."
          }
        },
        {
          name: "scoped",
          valueSet: "v"
        },
        {
          name: "title",
          description: "This attribute specifies [alternative style sheet](https://developer.mozilla.org/en-US/docs/Web/CSS/Alternative_style_sheets) sets."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/style"
        }
      ]
    },
    {
      name: "body",
      description: {
        kind: "markdown",
        value: "The body element represents the content of the document."
      },
      attributes: [
        {
          name: "onafterprint",
          description: {
            kind: "markdown",
            value: "Function to call after the user has printed the document."
          }
        },
        {
          name: "onbeforeprint",
          description: {
            kind: "markdown",
            value: "Function to call when the user requests printing of the document."
          }
        },
        {
          name: "onbeforeunload",
          description: {
            kind: "markdown",
            value: "Function to call when the document is about to be unloaded."
          }
        },
        {
          name: "onhashchange",
          description: {
            kind: "markdown",
            value: "Function to call when the fragment identifier part (starting with the hash (`'#'`) character) of the document's current address has changed."
          }
        },
        {
          name: "onlanguagechange",
          description: {
            kind: "markdown",
            value: "Function to call when the preferred languages changed."
          }
        },
        {
          name: "onmessage",
          description: {
            kind: "markdown",
            value: "Function to call when the document has received a message."
          }
        },
        {
          name: "onoffline",
          description: {
            kind: "markdown",
            value: "Function to call when network communication has failed."
          }
        },
        {
          name: "ononline",
          description: {
            kind: "markdown",
            value: "Function to call when network communication has been restored."
          }
        },
        {
          name: "onpagehide"
        },
        {
          name: "onpageshow"
        },
        {
          name: "onpopstate",
          description: {
            kind: "markdown",
            value: "Function to call when the user has navigated session history."
          }
        },
        {
          name: "onstorage",
          description: {
            kind: "markdown",
            value: "Function to call when the storage area has changed."
          }
        },
        {
          name: "onunload",
          description: {
            kind: "markdown",
            value: "Function to call when the document is going away."
          }
        },
        {
          name: "alink",
          description: 'Color of text for hyperlinks when selected. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:active`](https://developer.mozilla.org/en-US/docs/Web/CSS/:active "The :active CSS pseudo-class represents an element (such as a button) that is being activated by the user.") pseudo-class instead._'
        },
        {
          name: "background",
          description: 'URI of a image to use as a background. _This method is non-conforming, use CSS [`background`](https://developer.mozilla.org/en-US/docs/Web/CSS/background "The background shorthand CSS property sets all background style properties at once, such as color, image, origin and size, or repeat method.") property on the element instead._'
        },
        {
          name: "bgcolor",
          description: 'Background color for the document. _This method is non-conforming, use CSS [`background-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property on the element instead._'
        },
        {
          name: "bottommargin",
          description: 'The margin of the bottom of the body. _This method is non-conforming, use CSS [`margin-bottom`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom "The margin-bottom CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
        },
        {
          name: "leftmargin",
          description: 'The margin of the left of the body. _This method is non-conforming, use CSS [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
        },
        {
          name: "link",
          description: 'Color of text for unvisited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:link`](https://developer.mozilla.org/en-US/docs/Web/CSS/:link "The :link CSS pseudo-class represents an element that has not yet been visited. It matches every unvisited <a>, <area>, or <link> element that has an href attribute.") pseudo-class instead._'
        },
        {
          name: "onblur",
          description: "Function to call when the document loses focus."
        },
        {
          name: "onerror",
          description: "Function to call when the document fails to load properly."
        },
        {
          name: "onfocus",
          description: "Function to call when the document receives focus."
        },
        {
          name: "onload",
          description: "Function to call when the document has finished loading."
        },
        {
          name: "onredo",
          description: "Function to call when the user has moved forward in undo transaction history."
        },
        {
          name: "onresize",
          description: "Function to call when the document has been resized."
        },
        {
          name: "onundo",
          description: "Function to call when the user has moved backward in undo transaction history."
        },
        {
          name: "rightmargin",
          description: 'The margin of the right of the body. _This method is non-conforming, use CSS [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
        },
        {
          name: "text",
          description: 'Foreground color of text. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property on the element instead._'
        },
        {
          name: "topmargin",
          description: 'The margin of the top of the body. _This method is non-conforming, use CSS [`margin-top`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top "The margin-top CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") property on the element instead._'
        },
        {
          name: "vlink",
          description: 'Color of text for visited hypertext links. _This method is non-conforming, use CSS [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color "The color CSS property sets the foreground color value of an element\'s text and text decorations, and sets the currentcolor value.") property in conjunction with the [`:visited`](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited "The :visited CSS pseudo-class represents links that the user has already visited. For privacy reasons, the styles that can be modified using this selector are very limited.") pseudo-class instead._'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/body"
        }
      ]
    },
    {
      name: "article",
      description: {
        kind: "markdown",
        value: "The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/article"
        }
      ]
    },
    {
      name: "section",
      description: {
        kind: "markdown",
        value: "The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/section"
        }
      ]
    },
    {
      name: "nav",
      description: {
        kind: "markdown",
        value: "The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/nav"
        }
      ]
    },
    {
      name: "aside",
      description: {
        kind: "markdown",
        value: "The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/aside"
        }
      ]
    },
    {
      name: "h1",
      description: {
        kind: "markdown",
        value: "The h1 element represents a section heading."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
        }
      ]
    },
    {
      name: "h2",
      description: {
        kind: "markdown",
        value: "The h2 element represents a section heading."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
        }
      ]
    },
    {
      name: "h3",
      description: {
        kind: "markdown",
        value: "The h3 element represents a section heading."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
        }
      ]
    },
    {
      name: "h4",
      description: {
        kind: "markdown",
        value: "The h4 element represents a section heading."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
        }
      ]
    },
    {
      name: "h5",
      description: {
        kind: "markdown",
        value: "The h5 element represents a section heading."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
        }
      ]
    },
    {
      name: "h6",
      description: {
        kind: "markdown",
        value: "The h6 element represents a section heading."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/Heading_Elements"
        }
      ]
    },
    {
      name: "header",
      description: {
        kind: "markdown",
        value: "The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/header"
        }
      ]
    },
    {
      name: "footer",
      description: {
        kind: "markdown",
        value: "The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/footer"
        }
      ]
    },
    {
      name: "address",
      description: {
        kind: "markdown",
        value: "The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/address"
        }
      ]
    },
    {
      name: "p",
      description: {
        kind: "markdown",
        value: "The p element represents a paragraph."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/p"
        }
      ]
    },
    {
      name: "hr",
      description: {
        kind: "markdown",
        value: "The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book."
      },
      void: !0,
      attributes: [
        {
          name: "align",
          description: "Sets the alignment of the rule on the page. If no value is specified, the default value is `left`."
        },
        {
          name: "color",
          description: "Sets the color of the rule through color name or hexadecimal value."
        },
        {
          name: "noshade",
          description: "Sets the rule to have no shading."
        },
        {
          name: "size",
          description: "Sets the height, in pixels, of the rule."
        },
        {
          name: "width",
          description: "Sets the length of the rule on the page through a pixel or percentage value."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/hr"
        }
      ]
    },
    {
      name: "pre",
      description: {
        kind: "markdown",
        value: "The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements."
      },
      attributes: [
        {
          name: "cols",
          description: 'Contains the _preferred_ count of characters that a line should have. It was a non-standard synonym of [`width`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre#attr-width). To achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element\'s width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead.'
        },
        {
          name: "width",
          description: 'Contains the _preferred_ count of characters that a line should have. Though technically still implemented, this attribute has no visual effect; to achieve such an effect, use CSS [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width "The width CSS property sets an element\'s width. By default it sets the width of the content area, but if box-sizing is set to border-box, it sets the width of the border area.") instead.'
        },
        {
          name: "wrap",
          description: 'Is a _hint_ indicating how the overflow must happen. In modern browser this hint is ignored and no visual effect results in its present; to achieve such an effect, use CSS [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space "The white-space CSS property sets how white space inside an element is handled.") instead.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/pre"
        }
      ]
    },
    {
      name: "blockquote",
      description: {
        kind: "markdown",
        value: "The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations."
      },
      attributes: [
        {
          name: "cite",
          description: {
            kind: "markdown",
            value: "A URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/blockquote"
        }
      ]
    },
    {
      name: "ol",
      description: {
        kind: "markdown",
        value: "The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document."
      },
      attributes: [
        {
          name: "reversed",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute specifies that the items of the list are specified in reversed order."
          }
        },
        {
          name: "start",
          description: {
            kind: "markdown",
            value: 'This integer attribute specifies the start value for numbering the individual list items. Although the ordering type of list elements might be Roman numerals, such as XXXI, or letters, the value of start is always represented as a number. To start numbering elements from the letter "C", use `<ol start="3">`.\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.'
          }
        },
        {
          name: "type",
          valueSet: "lt",
          description: {
            kind: "markdown",
            value: "Indicates the numbering type:\n\n*   `'a'` indicates lowercase letters,\n*   `'A'` indicates uppercase letters,\n*   `'i'` indicates lowercase Roman numerals,\n*   `'I'` indicates uppercase Roman numerals,\n*   and `'1'` indicates numbers (default).\n\nThe type set is used for the entire list unless a different [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li#attr-type) attribute is used within an enclosed [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li \"The HTML <li> element is used to represent an item in a list. It must be contained in a parent element: an ordered list (<ol>), an unordered list (<ul>), or a menu (<menu>). In menus and unordered lists, list items are usually displayed using bullet points. In ordered lists, they are usually displayed with an ascending counter on the left, such as a number or letter.\") element.\n\n**Note:** This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\nUnless the value of the list number matters (e.g. in legal or technical documents where items are to be referenced by their number/letter), the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type \"The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.\") property should be used instead."
          }
        },
        {
          name: "compact",
          description: 'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Warning:** Do not use this attribute, as it has been deprecated: the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give an effect similar to the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [`line-height`](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height "The line-height CSS property sets the amount of space used for lines, such as in text. On block-level elements, it specifies the minimum height of line boxes within the element. On non-replaced inline elements, it specifies the height that is used to calculate line box height.") can be used with a value of `80%`.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/ol"
        }
      ]
    },
    {
      name: "ul",
      description: {
        kind: "markdown",
        value: "The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document."
      },
      attributes: [
        {
          name: "compact",
          description: 'This Boolean attribute hints that the list should be rendered in a compact style. The interpretation of this attribute depends on the user agent and it doesn\'t work in all browsers.\n\n**Usage note: **Do not use this attribute, as it has been deprecated: the [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To give a similar effect as the `compact` attribute, the [CSS](https://developer.mozilla.org/en-US/docs/CSS) property [line-height](https://developer.mozilla.org/en-US/docs/CSS/line-height) can be used with a value of `80%`.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/ul"
        }
      ]
    },
    {
      name: "li",
      description: {
        kind: "markdown",
        value: "The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element's list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element."
      },
      attributes: [
        {
          name: "value",
          description: {
            kind: "markdown",
            value: 'This integer attribute indicates the current ordinal value of the list item as defined by the [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element. The only allowed value for this attribute is a number, even if the list is displayed with Roman numerals or letters. List items that follow this one continue numbering from the value set. The **value** attribute has no meaning for unordered lists ([`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul "The HTML <ul> element represents an unordered list of items, typically rendered as a bulleted list.")) or for menus ([`<menu>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.")).\n\n**Note**: This attribute was deprecated in HTML4, but reintroduced in HTML5.\n\n**Note:** Prior to Gecko 9.0, negative values were incorrectly converted to 0. Starting in Gecko 9.0 all integer values are correctly parsed.'
          }
        },
        {
          name: "type",
          description: 'This character attribute indicates the numbering type:\n\n*   `a`: lowercase letters\n*   `A`: uppercase letters\n*   `i`: lowercase Roman numerals\n*   `I`: uppercase Roman numerals\n*   `1`: numbers\n\nThis type overrides the one used by its parent [`<ol>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol "The HTML <ol> element represents an ordered list of items, typically rendered as a numbered list.") element, if any.\n\n**Usage note:** This attribute has been deprecated: use the CSS [`list-style-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type "The list-style-type CSS property sets the marker (such as a disc, character, or custom counter style) of a list item element.") property instead.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/li"
        }
      ]
    },
    {
      name: "dl",
      description: {
        kind: "markdown",
        value: "The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/dl"
        }
      ]
    },
    {
      name: "dt",
      description: {
        kind: "markdown",
        value: "The dt element represents the term, or name, part of a term-description group in a description list (dl element)."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/dt"
        }
      ]
    },
    {
      name: "dd",
      description: {
        kind: "markdown",
        value: "The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element)."
      },
      attributes: [
        {
          name: "nowrap",
          description: "If the value of this attribute is set to `yes`, the definition text will not wrap. The default value is `no`."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/dd"
        }
      ]
    },
    {
      name: "figure",
      description: {
        kind: "markdown",
        value: "The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/figure"
        }
      ]
    },
    {
      name: "figcaption",
      description: {
        kind: "markdown",
        value: "The figcaption element represents a caption or legend for the rest of the contents of the figcaption element's parent figure element, if any."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/figcaption"
        }
      ]
    },
    {
      name: "main",
      description: {
        kind: "markdown",
        value: "The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/main"
        }
      ]
    },
    {
      name: "div",
      description: {
        kind: "markdown",
        value: "The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/div"
        }
      ]
    },
    {
      name: "a",
      description: {
        kind: "markdown",
        value: "If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents."
      },
      attributes: [
        {
          name: "href",
          description: {
            kind: "markdown",
            value: 'Contains a URL or a URL fragment that the hyperlink points to.\nA URL fragment is a name preceded by a hash mark (`#`), which specifies an internal target location (an [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of an HTML element) within the current document. URLs are not restricted to Web (HTTP)-based documents, but can use any protocol supported by the browser. For example, [`file:`](https://en.wikipedia.org/wiki/File_URI_scheme), `ftp:`, and `mailto:` work in most browsers.\n\n**Note:** You can use `href="#top"` or the empty fragment `href="#"` to link to the top of the current page. [This behavior is specified by HTML5](https://www.w3.org/TR/html5/single-page.html#scroll-to-fragid).'
          }
        },
        {
          name: "target",
          valueSet: "target",
          description: {
            kind: "markdown",
            value: 'Specifies where to display the linked URL. It is a name of, or keyword for, a _browsing context_: a tab, window, or `<iframe>`. The following keywords have special meanings:\n\n*   `_self`: Load the URL into the same browsing context as the current one. This is the default behavior.\n*   `_blank`: Load the URL into a new browsing context. This is usually a tab, but users can configure browsers to use new windows instead.\n*   `_parent`: Load the URL into the parent browsing context of the current one. If there is no parent, this behaves the same way as `_self`.\n*   `_top`: Load the URL into the top-level browsing context (that is, the "highest" browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this behaves the same way as `_self`.\n\n**Note:** When using `target`, consider adding `rel="noreferrer"` to avoid exploitation of the `window.opener` API.\n\n**Note:** Linking to another page using `target="_blank"` will run the new page on the same process as your page. If the new page is executing expensive JS, your page\'s performance may suffer. To avoid this use `rel="noopener"`.'
          }
        },
        {
          name: "download",
          description: {
            kind: "markdown",
            value: "This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. If the attribute has a value, it is used as the pre-filled file name in the Save prompt (the user can still change the file name if they want). There are no restrictions on allowed values, though `/` and `\\` are converted to underscores. Most file systems limit some punctuation in file names, and browsers will adjust the suggested name accordingly.\n\n**Notes:**\n\n*   This attribute only works for [same-origin URLs](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy).\n*   Although HTTP(s) URLs need to be in the same-origin, [`blob:` URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL.createObjectURL) and [`data:` URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) are allowed so that content generated by JavaScript, such as pictures created in an image-editor Web app, can be downloaded.\n*   If the HTTP header [`Content-Disposition:`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition) gives a different filename than this attribute, the HTTP header takes priority over this attribute.\n*   If `Content-Disposition:` is set to `inline`, Firefox prioritizes `Content-Disposition`, like the filename case, while Chrome prioritizes the `download` attribute."
          }
        },
        {
          name: "ping",
          description: {
            kind: "markdown",
            value: 'Contains a space-separated list of URLs to which, when the hyperlink is followed, [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST "The HTTP POST method sends data to the server. The type of the body of the request is indicated by the Content-Type header.") requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking.'
          }
        },
        {
          name: "rel",
          description: {
            kind: "markdown",
            value: "Specifies the relationship of the target object to the link object. The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
          }
        },
        {
          name: "hreflang",
          description: {
            kind: "markdown",
            value: 'This attribute indicates the human language of the linked resource. It is purely advisory, with no built-in functionality. Allowed values are determined by [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt "Tags for Identifying Languages").'
          }
        },
        {
          name: "type",
          description: {
            kind: "markdown",
            value: 'Specifies the media type in the form of a [MIME type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type "MIME type: A MIME type (now properly called "media type", but also sometimes "content type") is a string sent along with a file indicating the type of the file (describing the content format, for example, a sound file might be labeled audio/ogg, or an image file image/png).") for the linked URL. It is purely advisory, with no built-in functionality.'
          }
        },
        {
          name: "referrerpolicy",
          description: "Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) to send when fetching the URL:\n\n*   `'no-referrer'` means the `Referer:` header will not be sent.\n*   `'no-referrer-when-downgrade'` means no `Referer:` header will be sent when navigating to an origin without HTTPS. This is the default behavior.\n*   `'origin'` means the referrer will be the [origin](https://developer.mozilla.org/en-US/docs/Glossary/Origin) of the page, not including information after the domain.\n*   `'origin-when-cross-origin'` meaning that navigations to other origins will be limited to the scheme, the host and the port, while navigations on the same origin will include the referrer's path.\n*   `'strict-origin-when-cross-origin'`\n*   `'unsafe-url'` means the referrer will include the origin and path, but not the fragment, password, or username. This is unsafe because it can leak data from secure URLs to insecure ones."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/a"
        }
      ]
    },
    {
      name: "em",
      description: {
        kind: "markdown",
        value: "The em element represents stress emphasis of its contents."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/em"
        }
      ]
    },
    {
      name: "strong",
      description: {
        kind: "markdown",
        value: "The strong element represents strong importance, seriousness, or urgency for its contents."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/strong"
        }
      ]
    },
    {
      name: "small",
      description: {
        kind: "markdown",
        value: "The small element represents side comments such as small print."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/small"
        }
      ]
    },
    {
      name: "s",
      description: {
        kind: "markdown",
        value: "The s element represents contents that are no longer accurate or no longer relevant."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/s"
        }
      ]
    },
    {
      name: "cite",
      description: {
        kind: "markdown",
        value: "The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/cite"
        }
      ]
    },
    {
      name: "q",
      description: {
        kind: "markdown",
        value: "The q element represents some phrasing content quoted from another source."
      },
      attributes: [
        {
          name: "cite",
          description: {
            kind: "markdown",
            value: "The value of this attribute is a URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/q"
        }
      ]
    },
    {
      name: "dfn",
      description: {
        kind: "markdown",
        value: "The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/dfn"
        }
      ]
    },
    {
      name: "abbr",
      description: {
        kind: "markdown",
        value: "The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/abbr"
        }
      ]
    },
    {
      name: "ruby",
      description: {
        kind: "markdown",
        value: "The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]"
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/ruby"
        }
      ]
    },
    {
      name: "rb",
      description: {
        kind: "markdown",
        value: "The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn't represent anything itself, but its parent ruby element uses it as part of determining what it represents."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/rb"
        }
      ]
    },
    {
      name: "rt",
      description: {
        kind: "markdown",
        value: "The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn't represent anything itself, but its ancestor ruby element uses it as part of determining what it represents."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/rt"
        }
      ]
    },
    {
      name: "rp",
      description: {
        kind: "markdown",
        value: "The rp element is used to provide fallback text to be shown by user agents that don't support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/rp"
        }
      ]
    },
    {
      name: "time",
      description: {
        kind: "markdown",
        value: "The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below."
      },
      attributes: [
        {
          name: "datetime",
          description: {
            kind: "markdown",
            value: "This attribute indicates the time and/or date of the element and must be in one of the formats described below."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/time"
        }
      ]
    },
    {
      name: "code",
      description: {
        kind: "markdown",
        value: "The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/code"
        }
      ]
    },
    {
      name: "var",
      description: {
        kind: "markdown",
        value: "The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/var"
        }
      ]
    },
    {
      name: "samp",
      description: {
        kind: "markdown",
        value: "The samp element represents sample or quoted output from another program or computing system."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/samp"
        }
      ]
    },
    {
      name: "kbd",
      description: {
        kind: "markdown",
        value: "The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands)."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/kbd"
        }
      ]
    },
    {
      name: "sub",
      description: {
        kind: "markdown",
        value: "The sub element represents a subscript."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/sub"
        }
      ]
    },
    {
      name: "sup",
      description: {
        kind: "markdown",
        value: "The sup element represents a superscript."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/sup"
        }
      ]
    },
    {
      name: "i",
      description: {
        kind: "markdown",
        value: "The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/i"
        }
      ]
    },
    {
      name: "b",
      description: {
        kind: "markdown",
        value: "The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/b"
        }
      ]
    },
    {
      name: "u",
      description: {
        kind: "markdown",
        value: "The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/u"
        }
      ]
    },
    {
      name: "mark",
      description: {
        kind: "markdown",
        value: "The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader's attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user's current activity."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/mark"
        }
      ]
    },
    {
      name: "bdi",
      description: {
        kind: "markdown",
        value: "The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]"
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/bdi"
        }
      ]
    },
    {
      name: "bdo",
      description: {
        kind: "markdown",
        value: "The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]"
      },
      attributes: [
        {
          name: "dir",
          description: "The direction in which text should be rendered in this element's contents. Possible values are:\n\n*   `ltr`: Indicates that the text should go in a left-to-right direction.\n*   `rtl`: Indicates that the text should go in a right-to-left direction."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/bdo"
        }
      ]
    },
    {
      name: "span",
      description: {
        kind: "markdown",
        value: "The span element doesn't mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/span"
        }
      ]
    },
    {
      name: "br",
      description: {
        kind: "markdown",
        value: "The br element represents a line break."
      },
      void: !0,
      attributes: [
        {
          name: "clear",
          description: "Indicates where to begin the next line after the break."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/br"
        }
      ]
    },
    {
      name: "wbr",
      description: {
        kind: "markdown",
        value: "The wbr element represents a line break opportunity."
      },
      void: !0,
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/wbr"
        }
      ]
    },
    {
      name: "ins",
      description: {
        kind: "markdown",
        value: "The ins element represents an addition to the document."
      },
      attributes: [
        {
          name: "cite",
          description: "This attribute defines the URI of a resource that explains the change, such as a link to meeting minutes or a ticket in a troubleshooting system."
        },
        {
          name: "datetime",
          description: 'This attribute indicates the time and date of the change and must be a valid date with an optional time string. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.").'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/ins"
        }
      ]
    },
    {
      name: "del",
      description: {
        kind: "markdown",
        value: "The del element represents a removal from the document."
      },
      attributes: [
        {
          name: "cite",
          description: {
            kind: "markdown",
            value: "A URI for a resource that explains the change (for example, meeting minutes)."
          }
        },
        {
          name: "datetime",
          description: {
            kind: "markdown",
            value: 'This attribute indicates the time and date of the change and must be a valid date string with an optional time. If the value cannot be parsed as a date with an optional time string, the element does not have an associated time stamp. For the format of the string without a time, see [Format of a valid date string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_date_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article."). The format of the string if it includes both date and time is covered in [Format of a valid local date and time string](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats#Format_of_a_valid_local_date_and_time_string "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.") in [Date and time formats used in HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Date_and_time_formats "Certain HTML elements use date and/or time values. The formats of the strings that specify these are described in this article.").'
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/del"
        }
      ]
    },
    {
      name: "picture",
      description: {
        kind: "markdown",
        value: "The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/picture"
        }
      ]
    },
    {
      name: "img",
      description: {
        kind: "markdown",
        value: "An img element represents an image."
      },
      void: !0,
      attributes: [
        {
          name: "alt",
          description: {
            kind: "markdown",
            value: 'This attribute defines an alternative text description of the image.\n\n**Note:** Browsers do not always display the image referenced by the element. This is the case for non-graphical browsers (including those used by people with visual impairments), if the user chooses not to display images, or if the browser cannot display the image because it is invalid or an [unsupported type](#Supported_image_formats). In these cases, the browser may replace the image with the text defined in this element\'s `alt` attribute. You should, for these reasons and others, provide a useful value for `alt` whenever possible.\n\n**Note:** Omitting this attribute altogether indicates that the image is a key part of the content, and no textual equivalent is available. Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (decorative), and that non-visual browsers may omit it from rendering.'
          }
        },
        {
          name: "src",
          description: {
            kind: "markdown",
            value: "The image URL. This attribute is mandatory for the `<img>` element. On browsers supporting `srcset`, `src` is treated like a candidate image with a pixel density descriptor `1x` unless an image with this pixel density descriptor is already defined in `srcset,` or unless `srcset` contains '`w`' descriptors."
          }
        },
        {
          name: "srcset",
          description: {
            kind: "markdown",
            value: "A list of one or more strings separated by commas indicating a set of possible image sources for the user agent to use. Each string is composed of:\n\n1.  a URL to an image,\n2.  optionally, whitespace followed by one of:\n    *   A width descriptor, or a positive integer directly followed by '`w`'. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density.\n    *   A pixel density descriptor, which is a positive floating point number directly followed by '`x`'.\n\nIf no descriptor is specified, the source is assigned the default descriptor: `1x`.\n\nIt is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with '`2x`') are also invalid.\n\nThe user agent selects any one of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our [Responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) tutorial for an example."
          }
        },
        {
          name: "crossorigin",
          valueSet: "xo",
          description: {
            kind: "markdown",
            value: 'This enumerated attribute indicates if the fetching of the related image must be done using CORS or not. [CORS-enabled images](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being "[tainted](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image#What_is_a_tainted_canvas)." The allowed values are:\n`anonymous`\n\nA cross-origin request (i.e., with `Origin:` HTTP header) is performed, but no credential is sent (i.e., no cookie, X.509 certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (by not setting the [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin "The Access-Control-Allow-Origin response header indicates whether the response can be shared with requesting code from the given origin.") HTTP header), the image will be tainted and its usage restricted.\n\n`use-credentials`\n\nA cross-origin request (i.e., with the [`Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin "The Origin request header indicates where a fetch originates from. It doesn\'t include any path information, but only the server name. It is sent with CORS requests, as well as with POST requests. It is similar to the Referer header, but, unlike this header, it doesn\'t disclose the whole path.") HTTP header) performed along with credentials sent (i.e., a cookie, certificate, or HTTP Basic authentication). If the server does not give credentials to the origin site (through the `Access-Control-Allow-Credentials` HTTP header), the image will be tainted and its usage restricted.\n\nIf the attribute is not present, the resource is fetched without a CORS request (i.e., without sending the `Origin` HTTP header), preventing its non-tainted usage in [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") elements. If invalid, it is handled as if the `anonymous` value was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/HTML/CORS_settings_attributes) for additional information.'
          }
        },
        {
          name: "usemap",
          description: {
            kind: "markdown",
            value: 'The partial URL (starting with \'#\') of an [image map](https://developer.mozilla.org/en-US/docs/HTML/Element/map) associated with the element.\n\n**Note:** You cannot use this attribute if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") element.'
          }
        },
        {
          name: "ismap",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'This Boolean attribute indicates that the image is part of a server-side map. If so, the precise coordinates of a click are sent to the server.\n\n**Note:** This attribute is allowed only if the `<img>` element is a descendant of an [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL.") element with a valid [`href`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href) attribute.'
          }
        },
        {
          name: "width",
          description: {
            kind: "markdown",
            value: "The intrinsic width of the image in pixels."
          }
        },
        {
          name: "height",
          description: {
            kind: "markdown",
            value: "The intrinsic height of the image in pixels."
          }
        },
        {
          name: "decoding",
          valueSet: "decoding",
          description: {
            kind: "markdown",
            value: `Provides an image decoding hint to the browser. The allowed values are:
\`sync\`

Decode the image synchronously for atomic presentation with other content.

\`async\`

Decode the image asynchronously to reduce delay in presenting other content.

\`auto\`

Default mode, which indicates no preference for the decoding mode. The browser decides what is best for the user.`
          }
        },
        {
          name: "loading",
          valueSet: "loading",
          description: {
            kind: "markdown",
            value: "Indicates how the browser should load the image."
          }
        },
        {
          name: "referrerpolicy",
          valueSet: "referrerpolicy",
          description: {
            kind: "markdown",
            value: "A string indicating which referrer to use when fetching the resource:\n\n*   `no-referrer:` The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer \"The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.\") header will not be sent.\n*   `no-referrer-when-downgrade:` No `Referer` header will be sent when navigating to an origin without TLS (HTTPS). This is a user agent’s default behavior if no policy is otherwise specified.\n*   `origin:` The `Referer` header will include the page of origin's scheme, the host, and the port.\n*   `origin-when-cross-origin:` Navigating to other origins will limit the included referral data to the scheme, the host and the port, while navigating from the same origin will include the referrer's full path.\n*   `unsafe-url:` The `Referer` header will include the origin and the path, but not the fragment, password, or username. This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins."
          }
        },
        {
          name: "sizes",
          description: {
            kind: "markdown",
            value: "A list of one or more strings separated by commas indicating a set of source sizes. Each source size consists of:\n\n1.  a media condition. This must be omitted for the last item.\n2.  a source size value.\n\nSource size values specify the intended display size of the image. User agents use the current source size to select one of the sources supplied by the `srcset` attribute, when those sources are described using width ('`w`') descriptors. The selected source size affects the intrinsic size of the image (the image’s display size if no CSS styling is applied). If the `srcset` attribute is absent, or contains no values with a width (`w`) descriptor, then the `sizes` attribute has no effect."
          }
        },
        {
          name: "importance",
          description: "Indicates the relative importance of the resource. Priority hints are delegated using the values:"
        },
        {
          name: "importance",
          description: "`auto`: Indicates **no preference**. The browser may use its own heuristics to decide the priority of the image.\n\n`high`: Indicates to the browser that the image is of **high** priority.\n\n`low`: Indicates to the browser that the image is of **low** priority."
        },
        {
          name: "intrinsicsize",
          description: "This attribute tells the browser to ignore the actual intrinsic size of the image and pretend it’s the size specified in the attribute. Specifically, the image would raster at these dimensions and `naturalWidth`/`naturalHeight` on images would return the values specified in this attribute. [Explainer](https://github.com/ojanvafai/intrinsicsize-attribute), [examples](https://googlechrome.github.io/samples/intrinsic-size/index.html)"
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/img"
        }
      ]
    },
    {
      name: "iframe",
      description: {
        kind: "markdown",
        value: "The iframe element represents a nested browsing context."
      },
      attributes: [
        {
          name: "src",
          description: {
            kind: "markdown",
            value: 'The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Inherited_origins). Also note that programatically removing an `<iframe>`\'s src attribute (e.g. via [`Element.removeAttribute()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/removeAttribute "The Element method removeAttribute() removes the attribute with the specified name from the element.")) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.'
          }
        },
        {
          name: "srcdoc",
          description: {
            kind: "markdown",
            value: "Inline HTML to embed, overriding the `src` attribute. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute."
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: 'A targetable name for the embedded browsing context. This can be used in the `target` attribute of the [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a "The HTML <a> element (or anchor element) creates a hyperlink to other web pages, files, locations within the same page, email addresses, or any other URL."), [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server."), or [`<base>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base "The HTML <base> element specifies the base URL to use for all relative URLs contained within a document. There can be only one <base> element in a document.") elements; the `formtarget` attribute of the [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") or [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") elements; or the `windowName` parameter in the [`window.open()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open "The Window interface\'s open() method loads the specified resource into the browsing context (window, <iframe> or tab) with the specified name. If the name doesn\'t exist, then a new window is opened and the specified resource is loaded into its browsing context.") method.'
          }
        },
        {
          name: "sandbox",
          valueSet: "sb",
          description: {
            kind: "markdown",
            value: 'Applies extra restrictions to the content in the frame. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:\n\n*   `allow-forms`: Allows the resource to submit forms. If this keyword is not used, form submission is blocked.\n*   `allow-modals`: Lets the resource [open modal windows](https://html.spec.whatwg.org/multipage/origin.html#sandboxed-modals-flag).\n*   `allow-orientation-lock`: Lets the resource [lock the screen orientation](https://developer.mozilla.org/en-US/docs/Web/API/Screen/lockOrientation).\n*   `allow-pointer-lock`: Lets the resource use the [Pointer Lock API](https://developer.mozilla.org/en-US/docs/WebAPI/Pointer_Lock).\n*   `allow-popups`: Allows popups (such as `window.open()`, `target="_blank"`, or `showModalDialog()`). If this keyword is not used, the popup will silently fail to open.\n*   `allow-popups-to-escape-sandbox`: Lets the sandboxed document open new windows without those windows inheriting the sandboxing. For example, this can safely sandbox an advertisement without forcing the same restrictions upon the page the ad links to.\n*   `allow-presentation`: Lets the resource start a [presentation session](https://developer.mozilla.org/en-US/docs/Web/API/PresentationRequest).\n*   `allow-same-origin`: If this token is not used, the resource is treated as being from a special origin that always fails the [same-origin policy](https://developer.mozilla.org/en-US/docs/Glossary/same-origin_policy "same-origin policy: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin.").\n*   `allow-scripts`: Lets the resource run scripts (but not create popup windows).\n*   `allow-storage-access-by-user-activation` : Lets the resource request access to the parent\'s storage capabilities with the [Storage Access API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API).\n*   `allow-top-navigation`: Lets the resource navigate the top-level browsing context (the one named `_top`).\n*   `allow-top-navigation-by-user-activation`: Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.\n\n**Notes about sandboxing:**\n\n*   When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.\n*   Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.\n*   The `sandbox` attribute is unsupported in Internet Explorer 9 and earlier.'
          }
        },
        {
          name: "seamless",
          valueSet: "v"
        },
        {
          name: "allowfullscreen",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'Set to `true` if the `<iframe>` can activate fullscreen mode by calling the [`requestFullscreen()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen "The Element.requestFullscreen() method issues an asynchronous request to make the element be displayed in full-screen mode.") method.\nThis attribute is considered a legacy attribute and redefined as `allow="fullscreen"`.'
          }
        },
        {
          name: "width",
          description: {
            kind: "markdown",
            value: "The width of the frame in CSS pixels. Default is `300`."
          }
        },
        {
          name: "height",
          description: {
            kind: "markdown",
            value: "The height of the frame in CSS pixels. Default is `150`."
          }
        },
        {
          name: "allow",
          description: "Specifies a [feature policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Feature_Policy) for the `<iframe>`."
        },
        {
          name: "allowpaymentrequest",
          description: "Set to `true` if a cross-origin `<iframe>` should be allowed to invoke the [Payment Request API](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API)."
        },
        {
          name: "allowpaymentrequest",
          description: 'This attribute is considered a legacy attribute and redefined as `allow="payment"`.'
        },
        {
          name: "csp",
          description: 'A [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) enforced for the embedded resource. See [`HTMLIFrameElement.csp`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/csp "The csp property of the HTMLIFrameElement interface specifies the Content Security Policy that an embedded document must agree to enforce upon itself.") for details.'
        },
        {
          name: "importance",
          description: `The download priority of the resource in the \`<iframe>\`'s \`src\` attribute. Allowed values:

\`auto\` (default)

No preference. The browser uses its own heuristics to decide the priority of the resource.

\`high\`

The resource should be downloaded before other lower-priority page resources.

\`low\`

The resource should be downloaded after other higher-priority page resources.`
        },
        {
          name: "referrerpolicy",
          description: 'Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the frame\'s resource:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content\'s origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don\'t send it to a less secure destination (HTTPS→HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/iframe"
        }
      ]
    },
    {
      name: "embed",
      description: {
        kind: "markdown",
        value: "The embed element provides an integration point for an external (typically non-HTML) application or interactive content."
      },
      void: !0,
      attributes: [
        {
          name: "src",
          description: {
            kind: "markdown",
            value: "The URL of the resource being embedded."
          }
        },
        {
          name: "type",
          description: {
            kind: "markdown",
            value: "The MIME type to use to select the plug-in to instantiate."
          }
        },
        {
          name: "width",
          description: {
            kind: "markdown",
            value: "The displayed width of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
          }
        },
        {
          name: "height",
          description: {
            kind: "markdown",
            value: "The displayed height of the resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). This must be an absolute value; percentages are _not_ allowed."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/embed"
        }
      ]
    },
    {
      name: "object",
      description: {
        kind: "markdown",
        value: "The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin."
      },
      attributes: [
        {
          name: "data",
          description: {
            kind: "markdown",
            value: "The address of the resource as a valid URL. At least one of **data** and **type** must be defined."
          }
        },
        {
          name: "type",
          description: {
            kind: "markdown",
            value: "The [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource specified by **data**. At least one of **data** and **type** must be defined."
          }
        },
        {
          name: "typemustmatch",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute indicates if the **type** attribute and the actual [content type](https://developer.mozilla.org/en-US/docs/Glossary/Content_type) of the resource must match to be used."
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "The name of valid browsing context (HTML5), or the name of the control (HTML 4)."
          }
        },
        {
          name: "usemap",
          description: {
            kind: "markdown",
            value: "A hash-name reference to a [`<map>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map \"The HTML <map> element is used with <area> elements to define an image map (a clickable link area).\") element; that is a '#' followed by the value of a [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map#attr-name) of a map element."
          }
        },
        {
          name: "form",
          description: {
            kind: "markdown",
            value: 'The form element, if any, that the object element is associated with (its _form owner_). The value of the attribute must be an ID of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document.'
          }
        },
        {
          name: "width",
          description: {
            kind: "markdown",
            value: "The width of the display resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
          }
        },
        {
          name: "height",
          description: {
            kind: "markdown",
            value: "The height of the displayed resource, in [CSS pixels](https://drafts.csswg.org/css-values/#px). -- (Absolute values only. [NO percentages](https://html.spec.whatwg.org/multipage/embedded-content.html#dimension-attributes))"
          }
        },
        {
          name: "archive",
          description: "A space-separated list of URIs for archives of resources for the object."
        },
        {
          name: "border",
          description: "The width of a border around the control, in pixels."
        },
        {
          name: "classid",
          description: "The URI of the object's implementation. It can be used together with, or in place of, the **data** attribute."
        },
        {
          name: "codebase",
          description: "The base path used to resolve relative URIs specified by **classid**, **data**, or **archive**. If not specified, the default is the base URI of the current document."
        },
        {
          name: "codetype",
          description: "The content type of the data specified by **classid**."
        },
        {
          name: "declare",
          description: "The presence of this Boolean attribute makes this element a declaration only. The object must be instantiated by a subsequent `<object>` element. In HTML5, repeat the <object> element completely each that that the resource is reused."
        },
        {
          name: "standby",
          description: "A message that the browser can show while loading the object's implementation and data."
        },
        {
          name: "tabindex",
          description: "The position of the element in the tabbing navigation order for the current document."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/object"
        }
      ]
    },
    {
      name: "param",
      description: {
        kind: "markdown",
        value: "The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own."
      },
      void: !0,
      attributes: [
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "Name of the parameter."
          }
        },
        {
          name: "value",
          description: {
            kind: "markdown",
            value: "Specifies the value of the parameter."
          }
        },
        {
          name: "type",
          description: 'Only used if the `valuetype` is set to "ref". Specifies the MIME type of values found at the URI specified by value.'
        },
        {
          name: "valuetype",
          description: `Specifies the type of the \`value\` attribute. Possible values are:

*   data: Default value. The value is passed to the object's implementation as a string.
*   ref: The value is a URI to a resource where run-time values are stored.
*   object: An ID of another [\`<object>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object "The HTML <object> element represents an external resource, which can be treated as an image, a nested browsing context, or a resource to be handled by a plugin.") in the same document.`
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/param"
        }
      ]
    },
    {
      name: "video",
      description: {
        kind: "markdown",
        value: "A video element is used for playing videos or movies, and audio files with captions."
      },
      attributes: [
        {
          name: "src"
        },
        {
          name: "crossorigin",
          valueSet: "xo"
        },
        {
          name: "poster"
        },
        {
          name: "preload",
          valueSet: "pl"
        },
        {
          name: "autoplay",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'A Boolean attribute; if specified, the video automatically begins to play back as soon as it can do so without stopping to finish loading the data.\n**Note**: Sites that automatically play audio (or video with an audio track) can be an unpleasant experience for users, so it should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.\n\nTo disable video autoplay, `autoplay="false"` will not work; the video will autoplay if the attribute is there in the `<video>` tag at all. To remove autoplay the attribute needs to be removed altogether.\n\nIn some browsers (e.g. Chrome 70.0) autoplay is not working if no `muted` attribute is present.'
          }
        },
        {
          name: "mediagroup"
        },
        {
          name: "loop",
          valueSet: "v"
        },
        {
          name: "muted",
          valueSet: "v"
        },
        {
          name: "controls",
          valueSet: "v"
        },
        {
          name: "width"
        },
        {
          name: "height"
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/video"
        }
      ]
    },
    {
      name: "audio",
      description: {
        kind: "markdown",
        value: "An audio element represents a sound or audio stream."
      },
      attributes: [
        {
          name: "src",
          description: {
            kind: "markdown",
            value: 'The URL of the audio to embed. This is subject to [HTTP access controls](https://developer.mozilla.org/en-US/docs/HTTP_access_control). This is optional; you may instead use the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.") element within the audio block to specify the audio to embed.'
          }
        },
        {
          name: "crossorigin",
          valueSet: "xo",
          description: {
            kind: "markdown",
            value: 'This enumerated attribute indicates whether to use CORS to fetch the related image. [CORS-enabled resources](https://developer.mozilla.org/en-US/docs/CORS_Enabled_Image) can be reused in the [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") element without being _tainted_. The allowed values are:\n\nanonymous\n\nSends a cross-origin request without a credential. In other words, it sends the `Origin:` HTTP header without a cookie, X.509 certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin:` HTTP header), the image will be _tainted_, and its usage restricted.\n\nuse-credentials\n\nSends a cross-origin request with a credential. In other words, it sends the `Origin:` HTTP header with a cookie, a certificate, or performing HTTP Basic authentication. If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials:` HTTP header), the image will be _tainted_ and its usage restricted.\n\nWhen not present, the resource is fetched without a CORS request (i.e. without sending the `Origin:` HTTP header), preventing its non-tainted used in [`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas "Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.") elements. If invalid, it is handled as if the enumerated keyword **anonymous** was used. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/HTML/CORS_settings_attributes) for additional information.'
          }
        },
        {
          name: "preload",
          valueSet: "pl",
          description: {
            kind: "markdown",
            value: "This enumerated attribute is intended to provide a hint to the browser about what the author thinks will lead to the best user experience. It may have one of the following values:\n\n*   `none`: Indicates that the audio should not be preloaded.\n*   `metadata`: Indicates that only audio metadata (e.g. length) is fetched.\n*   `auto`: Indicates that the whole audio file can be downloaded, even if the user is not expected to use it.\n*   _empty string_: A synonym of the `auto` value.\n\nIf not set, `preload`'s default value is browser-defined (i.e. each browser may have its own default value). The spec advises it to be set to `metadata`.\n\n**Usage notes:**\n\n*   The `autoplay` attribute has precedence over `preload`. If `autoplay` is specified, the browser would obviously need to start downloading the audio for playback.\n*   The browser is not forced by the specification to follow the value of this attribute; it is a mere hint."
          }
        },
        {
          name: "autoplay",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: `A Boolean attribute: if specified, the audio will automatically begin playback as soon as it can do so, without waiting for the entire audio file to finish downloading.

**Note**: Sites that automatically play audio (or videos with an audio track) can be an unpleasant experience for users, so should be avoided when possible. If you must offer autoplay functionality, you should make it opt-in (requiring a user to specifically enable it). However, this can be useful when creating media elements whose source will be set at a later time, under user control.`
          }
        },
        {
          name: "mediagroup"
        },
        {
          name: "loop",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "A Boolean attribute: if specified, the audio player will automatically seek back to the start upon reaching the end of the audio."
          }
        },
        {
          name: "muted",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "A Boolean attribute that indicates whether the audio will be initially silenced. Its default value is `false`."
          }
        },
        {
          name: "controls",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "If this attribute is present, the browser will offer controls to allow the user to control audio playback, including volume, seeking, and pause/resume playback."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/audio"
        }
      ]
    },
    {
      name: "source",
      description: {
        kind: "markdown",
        value: "The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own."
      },
      void: !0,
      attributes: [
        {
          name: "src",
          description: {
            kind: "markdown",
            value: 'Required for [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") and [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document."), address of the media resource. The value of this attribute is ignored when the `<source>` element is placed inside a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
          }
        },
        {
          name: "type",
          description: {
            kind: "markdown",
            value: "The MIME-type of the resource, optionally with a `codecs` parameter. See [RFC 4281](https://tools.ietf.org/html/rfc4281) for information about how to specify codecs."
          }
        },
        {
          name: "sizes",
          description: 'Is a list of source sizes that describes the final rendered width of the image represented by the source. Each source size consists of a comma-separated list of media condition-length pairs. This information is used by the browser to determine, before laying the page out, which image defined in [`srcset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source#attr-srcset) to use.  \nThe `sizes` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source "The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
        },
        {
          name: "srcset",
          description: "A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:\n\n1.  one URL to an image,\n2.  a width descriptor, that is a positive integer directly followed by `'w'`. The default value, if missing, is the infinity.\n3.  a pixel density descriptor, that is a positive floating number directly followed by `'x'`. The default value, if missing, is `1x`.\n\nEach string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.  \nThe browser chooses the most adequate image to display at a given point of time.  \nThe `srcset` attribute has an effect only when the [`<source>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source \"The HTML <source> element specifies multiple media resources for the <picture>, the <audio> element, or the <video> element.\") element is the direct child of a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture \"The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.\") element."
        },
        {
          name: "media",
          description: '[Media query](https://developer.mozilla.org/en-US/docs/CSS/Media_queries) of the resource\'s intended media; this should be used only in a [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture "The HTML <picture> element contains zero or more <source> elements and one <img> element to provide versions of an image for different display/device scenarios.") element.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/source"
        }
      ]
    },
    {
      name: "track",
      description: {
        kind: "markdown",
        value: "The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own."
      },
      void: !0,
      attributes: [
        {
          name: "default",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This attribute indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one `track` element per media element."
          }
        },
        {
          name: "kind",
          valueSet: "tk",
          description: {
            kind: "markdown",
            value: "How the text track is meant to be used. If omitted the default kind is `subtitles`. If the attribute is not present, it will use the `subtitles`. If the attribute contains an invalid value, it will use `metadata`. (Versions of Chrome earlier than 52 treated an invalid value as `subtitles`.) The following keywords are allowed:\n\n*   `subtitles`\n    *   Subtitles provide translation of content that cannot be understood by the viewer. For example dialogue or text that is not English in an English language film.\n    *   Subtitles may contain additional content, usually extra background information. For example the text at the beginning of the Star Wars films, or the date, time, and location of a scene.\n*   `captions`\n    *   Closed captions provide a transcription and possibly a translation of audio.\n    *   It may include important non-verbal information such as music cues or sound effects. It may indicate the cue's source (e.g. music, text, character).\n    *   Suitable for users who are deaf or when the sound is muted.\n*   `descriptions`\n    *   Textual description of the video content.\n    *   Suitable for users who are blind or where the video cannot be seen.\n*   `chapters`\n    *   Chapter titles are intended to be used when the user is navigating the media resource.\n*   `metadata`\n    *   Tracks used by scripts. Not visible to the user."
          }
        },
        {
          name: "label",
          description: {
            kind: "markdown",
            value: "A user-readable title of the text track which is used by the browser when listing available text tracks."
          }
        },
        {
          name: "src",
          description: {
            kind: "markdown",
            value: 'Address of the track (`.vtt` file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the [`<audio>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio "The HTML <audio> element is used to embed sound content in documents. It may contain one or more audio sources, represented using the src attribute or the <source> element: the browser will choose the most suitable one. It can also be the destination for streamed media, using a MediaStream.") or [`<video>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video "The HTML Video element (<video>) embeds a media player which supports video playback into the document.") parent element of the `track` element has a [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) attribute.'
          }
        },
        {
          name: "srclang",
          description: {
            kind: "markdown",
            value: "Language of the track text data. It must be a valid [BCP 47](https://r12a.github.io/app-subtags/) language tag. If the `kind` attribute is set to `subtitles,` then `srclang` must be defined."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/track"
        }
      ]
    },
    {
      name: "map",
      description: {
        kind: "markdown",
        value: "The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children."
      },
      attributes: [
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "The name attribute gives the map a name so that it can be referenced. The attribute must be present and must have a non-empty value with no space characters. The value of the name attribute must not be a compatibility-caseless match for the value of the name attribute of another map element in the same document. If the id attribute is also specified, both attributes must have the same value."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/map"
        }
      ]
    },
    {
      name: "area",
      description: {
        kind: "markdown",
        value: "The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map."
      },
      void: !0,
      attributes: [
        {
          name: "alt"
        },
        {
          name: "coords"
        },
        {
          name: "shape",
          valueSet: "sh"
        },
        {
          name: "href"
        },
        {
          name: "target",
          valueSet: "target"
        },
        {
          name: "download"
        },
        {
          name: "ping"
        },
        {
          name: "rel"
        },
        {
          name: "hreflang"
        },
        {
          name: "type"
        },
        {
          name: "accesskey",
          description: "Specifies a keyboard navigation accelerator for the element. Pressing ALT or a similar key in association with the specified character selects the form control correlated with that key sequence. Page designers are forewarned to avoid key sequences already bound to browsers. This attribute is global since HTML5."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/area"
        }
      ]
    },
    {
      name: "table",
      description: {
        kind: "markdown",
        value: "The table element represents data with more than one dimension, in the form of a table."
      },
      attributes: [
        {
          name: "border"
        },
        {
          name: "align",
          description: 'This enumerated attribute indicates how the table must be aligned inside the containing document. It may have the following values:\n\n*   left: the table is displayed on the left side of the document;\n*   center: the table is displayed in the center of the document;\n*   right: the table is displayed on the right side of the document.\n\n**Usage Note**\n\n*   **Do not use this attribute**, as it has been deprecated. The [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table "The HTML <table> element represents tabular data — that is, information presented in a two-dimensional table comprised of rows and columns of cells containing data.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). Set [`margin-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left "The margin-left CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") and [`margin-right`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right "The margin-right CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.") to `auto` or [`margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin "The margin CSS property sets the margin area on all four sides of an element. It is a shorthand for margin-top, margin-right, margin-bottom, and margin-left.") to `0 auto` to achieve an effect that is similar to the align attribute.\n*   Prior to Firefox 4, Firefox also supported the `middle`, `absmiddle`, and `abscenter` values as synonyms of `center`, in quirks mode only.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/table"
        }
      ]
    },
    {
      name: "caption",
      description: {
        kind: "markdown",
        value: "The caption element represents the title of the table that is its parent, if it has a parent and that is a table element."
      },
      attributes: [
        {
          name: "align",
          description: `This enumerated attribute indicates how the caption must be aligned with respect to the table. It may have one of the following values:

\`left\`

The caption is displayed to the left of the table.

\`top\`

The caption is displayed above the table.

\`right\`

The caption is displayed to the right of the table.

\`bottom\`

The caption is displayed below the table.

**Usage note:** Do not use this attribute, as it has been deprecated. The [\`<caption>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption "The HTML Table Caption element (<caption>) specifies the caption (or title) of a table, and if used is always the first child of a <table>.") element should be styled using the [CSS](https://developer.mozilla.org/en-US/docs/CSS) properties [\`caption-side\`](https://developer.mozilla.org/en-US/docs/Web/CSS/caption-side "The caption-side CSS property puts the content of a table's <caption> on the specified side. The values are relative to the writing-mode of the table.") and [\`text-align\`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.").`
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/caption"
        }
      ]
    },
    {
      name: "colgroup",
      description: {
        kind: "markdown",
        value: "The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element."
      },
      attributes: [
        {
          name: "span"
        },
        {
          name: "align",
          description: 'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed. The descendant [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") elements may override this value using their own [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-align) attribute.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use one `td:nth-child(an+b)` CSS selector per column, where a is the total number of the columns in the table and b is the ordinal position of this column in the table. Only after this selector the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property can be used.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/colgroup"
        }
      ]
    },
    {
      name: "col",
      description: {
        kind: "markdown",
        value: "If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup."
      },
      void: !0,
      attributes: [
        {
          name: "span"
        },
        {
          name: "align",
          description: 'This enumerated attribute specifies how horizontal alignment of each column cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, its value is inherited from the [`align`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup#attr-align) of the [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup "The HTML <colgroup> element defines a group of columns within a table.") element this `<col>` element belongs too. If there are none, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values:\n    *   Do not try to set the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on a selector giving a [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element. Because [`<td>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") elements are not descendant of the [`<col>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col "The HTML <col> element defines a column within a table and is used for defining common semantics on all common cells. It is generally found within a <colgroup> element.") element, they won\'t inherit it.\n    *   If the table doesn\'t use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, use the `td:nth-child(an+b)` CSS selector. Set `a` to zero and `b` to the position of the column in the table, e.g. `td:nth-child(2) { text-align: right; }` to right-align the second column.\n    *   If the table does use a [`colspan`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan) attribute, the effect can be achieved by combining adequate CSS attribute selectors like `[colspan=n]`, though this is not trivial.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/col"
        }
      ]
    },
    {
      name: "tbody",
      description: {
        kind: "markdown",
        value: "The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table."
      },
      attributes: [
        {
          name: "align",
          description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes.\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/tbody"
        }
      ]
    },
    {
      name: "thead",
      description: {
        kind: "markdown",
        value: "The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table."
      },
      attributes: [
        {
          name: "align",
          description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/thead"
        }
      ]
    },
    {
      name: "tfoot",
      description: {
        kind: "markdown",
        value: "The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table."
      },
      attributes: [
        {
          name: "align",
          description: 'This enumerated attribute specifies how horizontal alignment of each cell content will be handled. Possible values are:\n\n*   `left`, aligning the content to the left of the cell\n*   `center`, centering the content in the cell\n*   `right`, aligning the content to the right of the cell\n*   `justify`, inserting spaces into the textual content so that the content is justified in the cell\n*   `char`, aligning the textual content on a special character with a minimal offset, defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nIf this attribute is not set, the `left` value is assumed.\n\n**Note:** Do not use this attribute as it is obsolete (not supported) in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property on it.\n*   To achieve the same effect as the `char` value, in CSS3, you can use the value of the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot#attr-char) as the value of the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property Unimplemented.'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/tfoot"
        }
      ]
    },
    {
      name: "tr",
      description: {
        kind: "markdown",
        value: "The tr element represents a row of cells in a table."
      },
      attributes: [
        {
          name: "align",
          description: 'A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") which specifies how the cell\'s context should be aligned horizontally within the cells in the row; this is shorthand for using `align` on every cell in the row individually. Possible values are:\n\n`left`\n\nAlign the content of each cell at its left edge.\n\n`center`\n\nCenter the contents of each cell between their left and right edges.\n\n`right`\n\nAlign the content of each cell at its right edge.\n\n`justify`\n\nWiden whitespaces within the text of each cell so that the text fills the full width of each cell (full justification).\n\n`char`\n\nAlign each cell in the row on a specific character (such that each row in the column that is configured this way will horizontally align its cells on that character). This uses the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr#attr-charoff) to establish the alignment character (typically "." or "," when aligning numerical data) and the number of characters that should follow the alignment character. This alignment type was never widely supported.\n\nIf no value is expressly set for `align`, the parent node\'s value is inherited.\n\nInstead of using the obsolete `align` attribute, you should instead use the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to establish `left`, `center`, `right`, or `justify` alignment for the row\'s cells. To apply character-based alignment, set the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the alignment character (such as `"."` or `","`).'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/tr"
        }
      ]
    },
    {
      name: "td",
      description: {
        kind: "markdown",
        value: "The td element represents a data cell in a table."
      },
      attributes: [
        {
          name: "colspan"
        },
        {
          name: "rowspan"
        },
        {
          name: "headers"
        },
        {
          name: "abbr",
          description: `This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself.

**Note:** Do not use this attribute as it is obsolete in the latest standard. Alternatively, you can put the abbreviated description inside the cell and place the long content in the **title** attribute.`
        },
        {
          name: "align",
          description: 'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-charoff) attributes Unimplemented (see [bug 2212](https://bugzilla.mozilla.org/show_bug.cgi?id=2212 "character alignment not implemented (align=char, charoff=, text-align:<string>)")).\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-char). Unimplemented in CSS3.'
        },
        {
          name: "axis",
          description: "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard."
        },
        {
          name: "bgcolor",
          description: `This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by '#'. This attribute may be used with one of sixteen predefined color strings:

 

\`black\` = "#000000"

 

\`green\` = "#008000"

 

\`silver\` = "#C0C0C0"

 

\`lime\` = "#00FF00"

 

\`gray\` = "#808080"

 

\`olive\` = "#808000"

 

\`white\` = "#FFFFFF"

 

\`yellow\` = "#FFFF00"

 

\`maroon\` = "#800000"

 

\`navy\` = "#000080"

 

\`red\` = "#FF0000"

 

\`blue\` = "#0000FF"

 

\`purple\` = "#800080"

 

\`teal\` = "#008080"

 

\`fuchsia\` = "#FF00FF"

 

\`aqua\` = "#00FFFF"

**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [\`<td>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td "The HTML <td> element defines a cell of a table that contains data. It participates in the table model.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/CSS). To create a similar effect use the [\`background-color\`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/CSS) instead.`
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/td"
        }
      ]
    },
    {
      name: "th",
      description: {
        kind: "markdown",
        value: "The th element represents a header cell in a table."
      },
      attributes: [
        {
          name: "colspan"
        },
        {
          name: "rowspan"
        },
        {
          name: "headers"
        },
        {
          name: "scope",
          valueSet: "s"
        },
        {
          name: "sorted"
        },
        {
          name: "abbr",
          description: {
            kind: "markdown",
            value: "This attribute contains a short abbreviated description of the cell's content. Some user-agents, such as speech readers, may present this description before the content itself."
          }
        },
        {
          name: "align",
          description: 'This enumerated attribute specifies how the cell content\'s horizontal alignment will be handled. Possible values are:\n\n*   `left`: The content is aligned to the left of the cell.\n*   `center`: The content is centered in the cell.\n*   `right`: The content is aligned to the right of the cell.\n*   `justify` (with text only): The content is stretched out inside the cell so that it covers its entire width.\n*   `char` (with text only): The content is aligned to a character inside the `<th>` element with minimal offset. This character is defined by the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char) and [`charoff`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-charoff) attributes.\n\nThe default value when this attribute is not specified is `left`.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard.\n\n*   To achieve the same effect as the `left`, `center`, `right` or `justify` values, apply the CSS [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property to the element.\n*   To achieve the same effect as the `char` value, give the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align "The text-align CSS property sets the horizontal alignment of an inline or table-cell box. This means it works like vertical-align but in the horizontal direction.") property the same value you would use for the [`char`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-char). Unimplemented in CSS3.'
        },
        {
          name: "axis",
          description: "This attribute contains a list of space-separated strings. Each string is the `id` of a group of cells that this header applies to.\n\n**Note:** Do not use this attribute as it is obsolete in the latest standard: use the [`scope`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th#attr-scope) attribute instead."
        },
        {
          name: "bgcolor",
          description: `This attribute defines the background color of each cell in a column. It consists of a 6-digit hexadecimal code as defined in [sRGB](https://www.w3.org/Graphics/Color/sRGB) and is prefixed by '#'. This attribute may be used with one of sixteen predefined color strings:

 

\`black\` = "#000000"

 

\`green\` = "#008000"

 

\`silver\` = "#C0C0C0"

 

\`lime\` = "#00FF00"

 

\`gray\` = "#808080"

 

\`olive\` = "#808000"

 

\`white\` = "#FFFFFF"

 

\`yellow\` = "#FFFF00"

 

\`maroon\` = "#800000"

 

\`navy\` = "#000080"

 

\`red\` = "#FF0000"

 

\`blue\` = "#0000FF"

 

\`purple\` = "#800080"

 

\`teal\` = "#008080"

 

\`fuchsia\` = "#FF00FF"

 

\`aqua\` = "#00FFFF"

**Note:** Do not use this attribute, as it is non-standard and only implemented in some versions of Microsoft Internet Explorer: The [\`<th>\`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th "The HTML <th> element defines a cell as header of a group of table cells. The exact nature of this group is defined by the scope and headers attributes.") element should be styled using [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS). To create a similar effect use the [\`background-color\`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-color "The background-color CSS property sets the background color of an element.") property in [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) instead.`
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/th"
        }
      ]
    },
    {
      name: "form",
      description: {
        kind: "markdown",
        value: "The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing."
      },
      attributes: [
        {
          name: "accept-charset",
          description: {
            kind: "markdown",
            value: 'A space- or comma-delimited list of character encodings that the server accepts. The browser uses them in the order in which they are listed. The default value, the reserved string `"UNKNOWN"`, indicates the same encoding as that of the document containing the form element.  \nIn previous versions of HTML, the different character encodings could be delimited by spaces or commas. In HTML5, only spaces are allowed as delimiters.'
          }
        },
        {
          name: "action",
          description: {
            kind: "markdown",
            value: 'The URI of a program that processes the form information. This value can be overridden by a [`formaction`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formaction) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
          }
        },
        {
          name: "autocomplete",
          valueSet: "o",
          description: {
            kind: "markdown",
            value: "Indicates whether input elements can by default have their values automatically completed by the browser. This setting can be overridden by an `autocomplete` attribute on an element belonging to the form. Possible values are:\n\n*   `off`: The user must explicitly enter a value into each field for every use, or the document provides its own auto-completion method; the browser does not automatically complete entries.\n*   `on`: The browser can automatically complete values based on values that the user has previously entered in the form.\n\nFor most modern browsers (including Firefox 38+, Google Chrome 34+, IE 11+) setting the autocomplete attribute will not prevent a browser's password manager from asking the user if they want to store login fields (username and password), if the user permits the storage the browser will autofill the login the next time the user visits the page. See [The autocomplete attribute and login fields](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion#The_autocomplete_attribute_and_login_fields).\n**Note:** If you set `autocomplete` to `off` in a form because the document provides its own auto-completion, then you should also set `autocomplete` to `off` for each of the form's `input` elements that the document can auto-complete. For details, see the note regarding Google Chrome in the [Browser Compatibility chart](#compatChart)."
          }
        },
        {
          name: "enctype",
          valueSet: "et",
          description: {
            kind: "markdown",
            value: 'When the value of the `method` attribute is `post`, enctype is the [MIME type](https://en.wikipedia.org/wiki/Mime_type) of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: The value used for an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the `type` attribute set to "file".\n*   `text/plain`: (HTML5)\n\nThis value can be overridden by a [`formenctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formenctype) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
          }
        },
        {
          name: "method",
          valueSet: "m",
          description: {
            kind: "markdown",
            value: 'The [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) method that the browser uses to submit the form. Possible values are:\n\n*   `post`: Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5) ; form data are included in the body of the form and sent to the server.\n*   `get`: Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a \'?\' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n*   `dialog`: Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog "The HTML <dialog> element represents a dialog box or other interactive component, such as an inspector or window.") element to close the dialog when submitted.\n\nThis value can be overridden by a [`formmethod`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formmethod) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "The name of the form. In HTML 4, its use is deprecated (`id` should be used instead). It must be unique among the forms in a document and not just an empty string in HTML 5."
          }
        },
        {
          name: "novalidate",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'This Boolean attribute indicates that the form is not to be validated when submitted. If this attribute is not specified (and therefore the form is validated), this default setting can be overridden by a [`formnovalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formnovalidate) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element belonging to the form.'
          }
        },
        {
          name: "target",
          valueSet: "target",
          description: {
            kind: "markdown",
            value: 'A name or keyword indicating where to display the response that is received after submitting the form. In HTML 4, this is the name/keyword for a frame. In HTML5, it is a name/keyword for a _browsing context_ (for example, tab, window, or inline frame). The following keywords have special meanings:\n\n*   `_self`: Load the response into the same HTML 4 frame (or HTML5 browsing context) as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed HTML 4 window or HTML5 browsing context.\n*   `_parent`: Load the response into the HTML 4 frameset parent of the current frame, or HTML5 parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: HTML 4: Load the response into the full original window, and cancel all other frames. HTML5: Load the response into the top-level browsing context (i.e., the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`.\n*   _iframename_: The response is displayed in a named [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe "The HTML Inline Frame element (<iframe>) represents a nested browsing context, embedding another HTML page into the current one.").\n\nHTML5: This value can be overridden by a [`formtarget`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-formtarget) attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") or [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
          }
        },
        {
          name: "accept",
          description: 'A comma-separated list of content types that the server accepts.\n\n**Usage note:** This attribute has been removed in HTML5 and should no longer be used. Instead, use the [`accept`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept) attribute of the specific [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element.'
        },
        {
          name: "autocapitalize",
          description: "This is a nonstandard attribute used by iOS Safari Mobile which controls whether and how the text value for textual form control descendants should be automatically capitalized as it is entered/edited by the user. If the `autocapitalize` attribute is specified on an individual form control descendant, it trumps the form-wide `autocapitalize` setting. The non-deprecated values are available in iOS 5 and later. The default value is `sentences`. Possible values are:\n\n*   `none`: Completely disables automatic capitalization\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/form"
        }
      ]
    },
    {
      name: "label",
      description: {
        kind: "markdown",
        value: "The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element's labeled control, either using the for attribute, or by putting the form control inside the label element itself."
      },
      attributes: [
        {
          name: "form",
          description: {
            kind: "markdown",
            value: 'The [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element with which the label is associated (its _form owner_). If specified, the value of the attribute is the `id` of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. This lets you place label elements anywhere within a document, not just as descendants of their form elements.'
          }
        },
        {
          name: "for",
          description: {
            kind: "markdown",
            value: "The [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#attr-id) of a [labelable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Form_labelable) form-related element in the same document as the `<label>` element. The first element in the document with an `id` matching the value of the `for` attribute is the _labeled control_ for this label element, if it is a labelable element. If it is not labelable then the `for` attribute has no effect. If there are other elements which also match the `id` value, later in the document, they are not considered.\n\n**Note**: A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/label"
        }
      ]
    },
    {
      name: "input",
      description: {
        kind: "markdown",
        value: "The input element represents a typed data field, usually with a form control to allow the user to edit the data."
      },
      void: !0,
      attributes: [
        {
          name: "accept"
        },
        {
          name: "alt"
        },
        {
          name: "autocomplete",
          valueSet: "inputautocomplete"
        },
        {
          name: "autofocus",
          valueSet: "v"
        },
        {
          name: "checked",
          valueSet: "v"
        },
        {
          name: "dirname"
        },
        {
          name: "disabled",
          valueSet: "v"
        },
        {
          name: "form"
        },
        {
          name: "formaction"
        },
        {
          name: "formenctype",
          valueSet: "et"
        },
        {
          name: "formmethod",
          valueSet: "fm"
        },
        {
          name: "formnovalidate",
          valueSet: "v"
        },
        {
          name: "formtarget"
        },
        {
          name: "height"
        },
        {
          name: "inputmode",
          valueSet: "im"
        },
        {
          name: "list"
        },
        {
          name: "max"
        },
        {
          name: "maxlength"
        },
        {
          name: "min"
        },
        {
          name: "minlength"
        },
        {
          name: "multiple",
          valueSet: "v"
        },
        {
          name: "name"
        },
        {
          name: "pattern"
        },
        {
          name: "placeholder"
        },
        {
          name: "readonly",
          valueSet: "v"
        },
        {
          name: "required",
          valueSet: "v"
        },
        {
          name: "size"
        },
        {
          name: "src"
        },
        {
          name: "step"
        },
        {
          name: "type",
          valueSet: "t"
        },
        {
          name: "value"
        },
        {
          name: "width"
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/input"
        }
      ]
    },
    {
      name: "button",
      description: {
        kind: "markdown",
        value: "The button element represents a button labeled by its contents."
      },
      attributes: [
        {
          name: "autofocus",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute lets you specify that the button should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified."
          }
        },
        {
          name: "disabled",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'This Boolean attribute indicates that the user cannot interact with the button. If this attribute is not specified, the button inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element with the **disabled** attribute set, then the button is enabled.\n\nFirefox will, unlike other browsers, by default, [persist the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Use the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-autocomplete) attribute to control this feature.'
          }
        },
        {
          name: "form",
          description: {
            kind: "markdown",
            value: 'The form element that the button is associated with (its _form owner_). The value of the attribute must be the **id** attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element in the same document. If this attribute is not specified, the `<button>` element will be associated to an ancestor [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element, if one exists. This attribute enables you to associate `<button>` elements to [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements anywhere within a document, not just as descendants of [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") elements.'
          }
        },
        {
          name: "formaction",
          description: {
            kind: "markdown",
            value: "The URI of a program that processes the information submitted by the button. If specified, it overrides the [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action) attribute of the button's form owner."
          }
        },
        {
          name: "formenctype",
          valueSet: "et",
          description: {
            kind: "markdown",
            value: 'If the button is a submit button, this attribute specifies the type of content that is used to submit the form to the server. Possible values are:\n\n*   `application/x-www-form-urlencoded`: The default value if the attribute is not specified.\n*   `multipart/form-data`: Use this value if you are using an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") element with the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) attribute set to `file`.\n*   `text/plain`\n\nIf this attribute is specified, it overrides the [`enctype`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-enctype) attribute of the button\'s form owner.'
          }
        },
        {
          name: "formmethod",
          valueSet: "fm",
          description: {
            kind: "markdown",
            value: "If the button is a submit button, this attribute specifies the HTTP method that the browser uses to submit the form. Possible values are:\n\n*   `post`: The data from the form are included in the body of the form and sent to the server.\n*   `get`: The data from the form are appended to the **form** attribute URI, with a '?' as a separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters.\n\nIf specified, this attribute overrides the [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method) attribute of the button's form owner."
          }
        },
        {
          name: "formnovalidate",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "If the button is a submit button, this Boolean attribute specifies that the form is not to be validated when it is submitted. If this attribute is specified, it overrides the [`novalidate`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-novalidate) attribute of the button's form owner."
          }
        },
        {
          name: "formtarget",
          description: {
            kind: "markdown",
            value: "If the button is a submit button, this attribute is a name or keyword indicating where to display the response that is received after submitting the form. This is a name of, or keyword for, a _browsing context_ (for example, tab, window, or inline frame). If this attribute is specified, it overrides the [`target`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-target) attribute of the button's form owner. The following keywords have special meanings:\n\n*   `_self`: Load the response into the same browsing context as the current one. This value is the default if the attribute is not specified.\n*   `_blank`: Load the response into a new unnamed browsing context.\n*   `_parent`: Load the response into the parent browsing context of the current one. If there is no parent, this option behaves the same way as `_self`.\n*   `_top`: Load the response into the top-level browsing context (that is, the browsing context that is an ancestor of the current one, and has no parent). If there is no parent, this option behaves the same way as `_self`."
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "The name of the button, which is submitted with the form data."
          }
        },
        {
          name: "type",
          valueSet: "bt",
          description: {
            kind: "markdown",
            value: "The type of the button. Possible values are:\n\n*   `submit`: The button submits the form data to the server. This is the default if the attribute is not specified, or if the attribute is dynamically changed to an empty or invalid value.\n*   `reset`: The button resets all the controls to their initial values.\n*   `button`: The button has no default behavior. It can have client-side scripts associated with the element's events, which are triggered when the events occur."
          }
        },
        {
          name: "value",
          description: {
            kind: "markdown",
            value: "The initial value of the button. It defines the value associated with the button which is submitted with the form data. This value is passed to the server in params when the form is submitted."
          }
        },
        {
          name: "autocomplete",
          description: 'The use of this attribute on a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") is nonstandard and Firefox-specific. By default, unlike other browsers, [Firefox persists the dynamic disabled state](https://stackoverflow.com/questions/5985839/bug-with-firefox-disabled-attribute-of-input-not-resetting-when-refreshing) of a [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button "The HTML <button> element represents a clickable button, which can be used in forms or anywhere in a document that needs simple, standard button functionality.") across page loads. Setting the value of this attribute to `off` (i.e. `autocomplete="off"`) disables this feature. See [bug 654072](https://bugzilla.mozilla.org/show_bug.cgi?id=654072 "if disabled state is changed with javascript, the normal state doesn\'t return after refreshing the page").'
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/button"
        }
      ]
    },
    {
      name: "select",
      description: {
        kind: "markdown",
        value: "The select element represents a control for selecting amongst a set of options."
      },
      attributes: [
        {
          name: "autocomplete",
          valueSet: "inputautocomplete",
          description: {
            kind: "markdown",
            value: 'A [`DOMString`](https://developer.mozilla.org/en-US/docs/Web/API/DOMString "DOMString is a UTF-16 String. As JavaScript already uses such strings, DOMString is mapped directly to a String.") providing a hint for a [user agent\'s](https://developer.mozilla.org/en-US/docs/Glossary/user_agent "user agent\'s: A user agent is a computer program representing a person, for example, a browser in a Web context.") autocomplete feature. See [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for a complete list of values and details on how to use autocomplete.'
          }
        },
        {
          name: "autofocus",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form element in a document can have the `autofocus` attribute."
          }
        },
        {
          name: "disabled",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example `fieldset`; if there is no containing element with the `disabled` attribute set, then the control is enabled."
          }
        },
        {
          name: "form",
          description: {
            kind: "markdown",
            value: 'This attribute lets you specify the form element to which the select element is associated (that is, its "form owner"). If this attribute is specified, its value must be the same as the `id` of a form element in the same document. This enables you to place select elements anywhere within a document, not just as descendants of their form elements.'
          }
        },
        {
          name: "multiple",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute indicates that multiple options can be selected in the list. If it is not specified, then only one option can be selected at a time. When `multiple` is specified, most browsers will show a scrolling list box instead of a single line dropdown."
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "This attribute is used to specify the name of the control."
          }
        },
        {
          name: "required",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "A Boolean attribute indicating that an option with a non-empty string value must be selected."
          }
        },
        {
          name: "size",
          description: {
            kind: "markdown",
            value: "If the control is presented as a scrolling list box (e.g. when `multiple` is specified), this attribute represents the number of rows in the list that should be visible at one time. Browsers are not required to present a select element as a scrolled list box. The default value is 0.\n\n**Note:** According to the HTML5 specification, the default value for size should be 1; however, in practice, this has been found to break some web sites, and no other browser currently does that, so Mozilla has opted to continue to return 0 for the time being with Firefox."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/select"
        }
      ]
    },
    {
      name: "datalist",
      description: {
        kind: "markdown",
        value: "The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/datalist"
        }
      ]
    },
    {
      name: "optgroup",
      description: {
        kind: "markdown",
        value: "The optgroup element represents a group of option elements with a common label."
      },
      attributes: [
        {
          name: "disabled",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "If this Boolean attribute is set, none of the items in this option group is selectable. Often browsers grey out such control and it won't receive any browsing events, like mouse clicks or focus-related ones."
          }
        },
        {
          name: "label",
          description: {
            kind: "markdown",
            value: "The name of the group of options, which the browser can use when labeling the options in the user interface. This attribute is mandatory if this element is used."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/optgroup"
        }
      ]
    },
    {
      name: "option",
      description: {
        kind: "markdown",
        value: "The option element represents an option in a select element or as part of a list of suggestions in a datalist element."
      },
      attributes: [
        {
          name: "disabled",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'If this Boolean attribute is set, this option is not checkable. Often browsers grey out such control and it won\'t receive any browsing event, like mouse clicks or focus-related ones. If this attribute is not set, the element can still be disabled if one of its ancestors is a disabled [`<optgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup "The HTML <optgroup> element creates a grouping of options within a <select> element.") element.'
          }
        },
        {
          name: "label",
          description: {
            kind: "markdown",
            value: "This attribute is text for the label indicating the meaning of the option. If the `label` attribute isn't defined, its value is that of the element text content."
          }
        },
        {
          name: "selected",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'If present, this Boolean attribute indicates that the option is initially selected. If the `<option>` element is the descendant of a [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element whose [`multiple`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select#attr-multiple) attribute is not set, only one single `<option>` of this [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select "The HTML <select> element represents a control that provides a menu of options") element may have the `selected` attribute.'
          }
        },
        {
          name: "value",
          description: {
            kind: "markdown",
            value: "The content of this attribute represents the value to be submitted with the form, should this option be selected. If this attribute is omitted, the value is taken from the text content of the option element."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/option"
        }
      ]
    },
    {
      name: "textarea",
      description: {
        kind: "markdown",
        value: "The textarea element represents a multiline plain text edit control for the element's raw value. The contents of the control represent the control's default value."
      },
      attributes: [
        {
          name: "autocomplete",
          valueSet: "inputautocomplete",
          description: {
            kind: "markdown",
            value: 'This attribute indicates whether the value of the control can be automatically completed by the browser. Possible values are:\n\n*   `off`: The user must explicitly enter a value into this field for every use, or the document provides its own auto-completion method; the browser does not automatically complete the entry.\n*   `on`: The browser can automatically complete the value based on values that the user has entered during previous uses.\n\nIf the `autocomplete` attribute is not specified on a `<textarea>` element, then the browser uses the `autocomplete` attribute value of the `<textarea>` element\'s form owner. The form owner is either the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element that this `<textarea>` element is a descendant of or the form element whose `id` is specified by the `form` attribute of the input element. For more information, see the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-autocomplete) attribute in [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.").'
          }
        },
        {
          name: "autofocus",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute lets you specify that a form control should have input focus when the page loads. Only one form-associated element in a document can have this attribute specified."
          }
        },
        {
          name: "cols",
          description: {
            kind: "markdown",
            value: "The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is `20`."
          }
        },
        {
          name: "dirname"
        },
        {
          name: "disabled",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'This Boolean attribute indicates that the user cannot interact with the control. If this attribute is not specified, the control inherits its setting from the containing element, for example [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset "The HTML <fieldset> element is used to group several controls as well as labels (<label>) within a web form."); if there is no containing element when the `disabled` attribute is set, the control is enabled.'
          }
        },
        {
          name: "form",
          description: {
            kind: "markdown",
            value: 'The form element that the `<textarea>` element is associated with (its "form owner"). The value of the attribute must be the `id` of a form element in the same document. If this attribute is not specified, the `<textarea>` element must be a descendant of a form element. This attribute enables you to place `<textarea>` elements anywhere within a document, not just as descendants of form elements.'
          }
        },
        {
          name: "inputmode",
          valueSet: "im"
        },
        {
          name: "maxlength",
          description: {
            kind: "markdown",
            value: "The maximum number of characters (unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters."
          }
        },
        {
          name: "minlength",
          description: {
            kind: "markdown",
            value: "The minimum number of characters (unicode code points) required that the user should enter."
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "The name of the control."
          }
        },
        {
          name: "placeholder",
          description: {
            kind: "markdown",
            value: 'A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.\n\n**Note:** Placeholders should only be used to show an example of the type of data that should be entered into a form; they are _not_ a substitute for a proper [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label "The HTML <label> element represents a caption for an item in a user interface.") element tied to the input. See [Labels and placeholders](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Labels_and_placeholders "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") in [<input>: The Input (Form Input) element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") for a full explanation.'
          }
        },
        {
          name: "readonly",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the `disabled` attribute, the `readonly` attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form."
          }
        },
        {
          name: "required",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This attribute specifies that the user must fill in a value before submitting a form."
          }
        },
        {
          name: "rows",
          description: {
            kind: "markdown",
            value: "The number of visible text lines for the control."
          }
        },
        {
          name: "wrap",
          valueSet: "w",
          description: {
            kind: "markdown",
            value: "Indicates how the control wraps text. Possible values are:\n\n*   `hard`: The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the `cols` attribute must also be specified for this to take effect.\n*   `soft`: The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.\n*   `off` : Like `soft` but changes appearance to `white-space: pre` so line segments exceeding `cols` are not wrapped and the `<textarea>` becomes horizontally scrollable.\n\nIf this attribute is not specified, `soft` is its default value."
          }
        },
        {
          name: "autocapitalize",
          description: "This is a non-standard attribute supported by WebKit on iOS (therefore nearly all browsers running on iOS, including Safari, Firefox, and Chrome), which controls whether and how the text value should be automatically capitalized as it is entered/edited by the user. The non-deprecated values are available in iOS 5 and later. Possible values are:\n\n*   `none`: Completely disables automatic capitalization.\n*   `sentences`: Automatically capitalize the first letter of sentences.\n*   `words`: Automatically capitalize the first letter of words.\n*   `characters`: Automatically capitalize all characters.\n*   `on`: Deprecated since iOS 5.\n*   `off`: Deprecated since iOS 5."
        },
        {
          name: "spellcheck",
          description: "Specifies whether the `<textarea>` is subject to spell checking by the underlying browser/OS. the value can be:\n\n*   `true`: Indicates that the element needs to have its spelling and grammar checked.\n*   `default` : Indicates that the element is to act according to a default behavior, possibly based on the parent element's own `spellcheck` value.\n*   `false` : Indicates that the element should not be spell checked."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/textarea"
        }
      ]
    },
    {
      name: "output",
      description: {
        kind: "markdown",
        value: "The output element represents the result of a calculation performed by the application, or the result of a user action."
      },
      attributes: [
        {
          name: "for",
          description: {
            kind: "markdown",
            value: "A space-separated list of other elements’ [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)s, indicating that those elements contributed input values to (or otherwise affected) the calculation."
          }
        },
        {
          name: "form",
          description: {
            kind: "markdown",
            value: 'The [form element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) that this element is associated with (its "form owner"). The value of the attribute must be an `id` of a form element in the same document. If this attribute is not specified, the output element must be a descendant of a form element. This attribute enables you to place output elements anywhere within a document, not just as descendants of their form elements.'
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: 'The name of the element, exposed in the [`HTMLFormElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement "The HTMLFormElement interface represents a <form> element in the DOM; it allows access to and in some cases modification of aspects of the form, as well as access to its component elements.") API.'
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/output"
        }
      ]
    },
    {
      name: "progress",
      description: {
        kind: "markdown",
        value: "The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed."
      },
      attributes: [
        {
          name: "value",
          description: {
            kind: "markdown",
            value: "This attribute specifies how much of the task that has been completed. It must be a valid floating point number between 0 and `max`, or between 0 and 1 if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take."
          }
        },
        {
          name: "max",
          description: {
            kind: "markdown",
            value: "This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/progress"
        }
      ]
    },
    {
      name: "meter",
      description: {
        kind: "markdown",
        value: "The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate."
      },
      attributes: [
        {
          name: "value",
          description: {
            kind: "markdown",
            value: "The current numeric value. This must be between the minimum and maximum values (`min` attribute and `max` attribute) if they are specified. If unspecified or malformed, the value is 0. If specified, but not within the range given by the `min` attribute and `max` attribute, the value is equal to the nearest end of the range.\n\n**Usage note:** Unless the `value` attribute is between `0` and `1` (inclusive), the `min` and `max` attributes should define the range so that the `value` attribute's value is within it."
          }
        },
        {
          name: "min",
          description: {
            kind: "markdown",
            value: "The lower numeric bound of the measured range. This must be less than the maximum value (`max` attribute), if specified. If unspecified, the minimum value is 0."
          }
        },
        {
          name: "max",
          description: {
            kind: "markdown",
            value: "The upper numeric bound of the measured range. This must be greater than the minimum value (`min` attribute), if specified. If unspecified, the maximum value is 1."
          }
        },
        {
          name: "low",
          description: {
            kind: "markdown",
            value: "The upper numeric bound of the low end of the measured range. This must be greater than the minimum value (`min` attribute), and it also must be less than the high value and maximum value (`high` attribute and `max` attribute, respectively), if any are specified. If unspecified, or if less than the minimum value, the `low` value is equal to the minimum value."
          }
        },
        {
          name: "high",
          description: {
            kind: "markdown",
            value: "The lower numeric bound of the high end of the measured range. This must be less than the maximum value (`max` attribute), and it also must be greater than the low value and minimum value (`low` attribute and **min** attribute, respectively), if any are specified. If unspecified, or if greater than the maximum value, the `high` value is equal to the maximum value."
          }
        },
        {
          name: "optimum",
          description: {
            kind: "markdown",
            value: "This attribute indicates the optimal numeric value. It must be within the range (as defined by the `min` attribute and `max` attribute). When used with the `low` attribute and `high` attribute, it gives an indication where along the range is considered preferable. For example, if it is between the `min` attribute and the `low` attribute, then the lower range is considered preferred."
          }
        },
        {
          name: "form",
          description: "This attribute associates the element with a `form` element that has ownership of the `meter` element. For example, a `meter` might be displaying a range corresponding to an `input` element of `type` _number_. This attribute is only used if the `meter` element is being used as a form-associated element; even then, it may be omitted if the element appears as a descendant of a `form` element."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/meter"
        }
      ]
    },
    {
      name: "fieldset",
      description: {
        kind: "markdown",
        value: "The fieldset element represents a set of form controls optionally grouped under a common name."
      },
      attributes: [
        {
          name: "disabled",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the `<form>`. They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend \"The HTML <legend> element represents a caption for the content of its parent <fieldset>.\") element won't be disabled."
          }
        },
        {
          name: "form",
          description: {
            kind: "markdown",
            value: 'This attribute takes the value of the `id` attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form "The HTML <form> element represents a document section that contains interactive controls for submitting information to a web server.") element you want the `<fieldset>` to be part of, even if it is not inside the form.'
          }
        },
        {
          name: "name",
          description: {
            kind: "markdown",
            value: 'The name associated with the group.\n\n**Note**: The caption for the fieldset is given by the first [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend "The HTML <legend> element represents a caption for the content of its parent <fieldset>.") element nested inside it.'
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/fieldset"
        }
      ]
    },
    {
      name: "legend",
      description: {
        kind: "markdown",
        value: "The legend element represents a caption for the rest of the contents of the legend element's parent fieldset element, if any."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/legend"
        }
      ]
    },
    {
      name: "details",
      description: {
        kind: "markdown",
        value: "The details element represents a disclosure widget from which the user can obtain additional information or controls."
      },
      attributes: [
        {
          name: "open",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: "This Boolean attribute indicates whether or not the details — that is, the contents of the `<details>` element — are currently visible. The default, `false`, means the details are not visible."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/details"
        }
      ]
    },
    {
      name: "summary",
      description: {
        kind: "markdown",
        value: "The summary element represents a summary, caption, or legend for the rest of the contents of the summary element's parent details element, if any."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/summary"
        }
      ]
    },
    {
      name: "dialog",
      description: {
        kind: "markdown",
        value: "The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window."
      },
      attributes: [
        {
          name: "open",
          description: "Indicates that the dialog is active and available for interaction. When the `open` attribute is not set, the dialog shouldn't be shown to the user."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/dialog"
        }
      ]
    },
    {
      name: "script",
      description: {
        kind: "markdown",
        value: "The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user."
      },
      attributes: [
        {
          name: "src",
          description: {
            kind: "markdown",
            value: "This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.\n\nIf a `script` element has a `src` attribute specified, it should not have a script embedded inside its tags."
          }
        },
        {
          name: "type",
          description: {
            kind: "markdown",
            value: 'This attribute indicates the type of script represented. The value of this attribute will be in one of the following categories:\n\n*   **Omitted or a JavaScript MIME type:** For HTML5-compliant browsers this indicates the script is JavaScript. HTML5 specification urges authors to omit the attribute rather than provide a redundant MIME type. In earlier browsers, this identified the scripting language of the embedded or imported (via the `src` attribute) code. JavaScript MIME types are [listed in the specification](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#JavaScript_types).\n*   **`module`:** For HTML5-compliant browsers the code is treated as a JavaScript module. The processing of the script contents is not affected by the `charset` and `defer` attributes. For information on using `module`, see [ES6 in Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/). Code may behave differently when the `module` keyword is used.\n*   **Any other value:** The embedded content is treated as a data block which won\'t be processed by the browser. Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks. The `src` attribute will be ignored.\n\n**Note:** in Firefox you could specify the version of JavaScript contained in a `<script>` element by including a non-standard `version` parameter inside the `type` attribute — for example `type="text/javascript;version=1.8"`. This has been removed in Firefox 59 (see [bug 1428745](https://bugzilla.mozilla.org/show_bug.cgi?id=1428745 "FIXED: Remove support for version parameter from script loader")).'
          }
        },
        {
          name: "charset"
        },
        {
          name: "async",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: `This is a Boolean attribute indicating that the browser should, if possible, load the script asynchronously.

This attribute must not be used if the \`src\` attribute is absent (i.e. for inline scripts). If it is included in this case it will have no effect.

Browsers usually assume the worst case scenario and load scripts synchronously, (i.e. \`async="false"\`) during HTML parsing.

Dynamically inserted scripts (using [\`document.createElement()\`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement "In an HTML document, the document.createElement() method creates the HTML element specified by tagName, or an HTMLUnknownElement if tagName isn't recognized.")) load asynchronously by default, so to turn on synchronous loading (i.e. scripts load in the order they were inserted) set \`async="false"\`.

See [Browser compatibility](#Browser_compatibility) for notes on browser support. See also [Async scripts for asm.js](https://developer.mozilla.org/en-US/docs/Games/Techniques/Async_scripts).`
          }
        },
        {
          name: "defer",
          valueSet: "v",
          description: {
            kind: "markdown",
            value: 'This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded "/en-US/docs/Web/Events/DOMContentLoaded").\n\nScripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.\n\nThis attribute must not be used if the `src` attribute is absent (i.e. for inline scripts), in this case it would have no effect.\n\nTo achieve a similar effect for dynamically inserted scripts use `async="false"` instead. Scripts with the `defer` attribute will execute in the order in which they appear in the document.'
          }
        },
        {
          name: "crossorigin",
          valueSet: "xo",
          description: {
            kind: "markdown",
            value: 'Normal `script` elements pass minimal information to the [`window.onerror`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror "The onerror property of the GlobalEventHandlers mixin is an EventHandler that processes error events.") for scripts which do not pass the standard [CORS](https://developer.mozilla.org/en-US/docs/Glossary/CORS "CORS: CORS (Cross-Origin Resource Sharing) is a system, consisting of transmitting HTTP headers, that determines whether browsers block frontend JavaScript code from accessing responses for cross-origin requests.") checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) for a more descriptive explanation of its valid arguments.'
          }
        },
        {
          name: "nonce",
          description: {
            kind: "markdown",
            value: "A cryptographic nonce (number used once) to list the allowed inline scripts in a [script-src Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src). The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial."
          }
        },
        {
          name: "integrity",
          description: "This attribute contains inline metadata that a user agent can use to verify that a fetched resource has been delivered free of unexpected manipulation. See [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)."
        },
        {
          name: "nomodule",
          description: "This Boolean attribute is set to indicate that the script should not be executed in browsers that support [ES2015 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code."
        },
        {
          name: "referrerpolicy",
          description: 'Indicates which [referrer](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer) to send when fetching the script, or resources fetched by the script:\n\n*   `no-referrer`: The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent.\n*   `no-referrer-when-downgrade` (default): The [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer "The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.") header will not be sent to [origin](https://developer.mozilla.org/en-US/docs/Glossary/origin "origin: Web content\'s origin is defined by the scheme (protocol), host (domain), and port of the URL used to access it. Two objects have the same origin only when the scheme, host, and port all match.")s without [TLS](https://developer.mozilla.org/en-US/docs/Glossary/TLS "TLS: Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), is a protocol used by applications to communicate securely across a network, preventing tampering with and eavesdropping on email, web browsing, messaging, and other protocols.") ([HTTPS](https://developer.mozilla.org/en-US/docs/Glossary/HTTPS "HTTPS: HTTPS (HTTP Secure) is an encrypted version of the HTTP protocol. It usually uses SSL or TLS to encrypt all communication between a client and a server. This secure connection allows clients to safely exchange sensitive data with a server, for example for banking activities or online shopping.")).\n*   `origin`: The sent referrer will be limited to the origin of the referring page: its [scheme](https://developer.mozilla.org/en-US/docs/Archive/Mozilla/URIScheme), [host](https://developer.mozilla.org/en-US/docs/Glossary/host "host: A host is a device connected to the Internet (or a local network). Some hosts called servers offer additional services like serving webpages or storing files and emails."), and [port](https://developer.mozilla.org/en-US/docs/Glossary/port "port: For a computer connected to a network with an IP address, a port is a communication endpoint. Ports are designated by numbers, and below 1024 each port is associated by default with a specific protocol.").\n*   `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.\n*   `same-origin`: A referrer will be sent for [same origin](https://developer.mozilla.org/en-US/docs/Glossary/Same-origin_policy "same origin: The same-origin policy is a critical security mechanism that restricts how a document or script loaded from one origin can interact with a resource from another origin."), but cross-origin requests will contain no referrer information.\n*   `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (e.g. HTTPS→HTTPS), but don\'t send it to a less secure destination (e.g. HTTPS→HTTP).\n*   `strict-origin-when-cross-origin`: Send a full URL when performing a same-origin request, but only send the origin when the protocol security level stays the same (e.g.HTTPS→HTTPS), and send no header to a less secure destination (e.g. HTTPS→HTTP).\n*   `unsafe-url`: The referrer will include the origin _and_ the path (but not the [fragment](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/hash), [password](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/password), or [username](https://developer.mozilla.org/en-US/docs/Web/API/HTMLHyperlinkElementUtils/username)). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.\n\n**Note**: An empty string value (`""`) is both the default value, and a fallback value if `referrerpolicy` is not supported. If `referrerpolicy` is not explicitly specified on the `<script>` element, it will adopt a higher-level referrer policy, i.e. one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to `no-referrer-when-downgrade`.'
        },
        {
          name: "text",
          description: "Like the `textContent` attribute, this attribute sets the text content of the element. Unlike the `textContent` attribute, however, this attribute is evaluated as executable code after the node is inserted into the DOM."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/script"
        }
      ]
    },
    {
      name: "noscript",
      description: {
        kind: "markdown",
        value: "The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don't support scripting, by affecting how the document is parsed."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/noscript"
        }
      ]
    },
    {
      name: "template",
      description: {
        kind: "markdown",
        value: "The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/template"
        }
      ]
    },
    {
      name: "canvas",
      description: {
        kind: "markdown",
        value: "The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly."
      },
      attributes: [
        {
          name: "width",
          description: {
            kind: "markdown",
            value: "The width of the coordinate space in CSS pixels. Defaults to 300."
          }
        },
        {
          name: "height",
          description: {
            kind: "markdown",
            value: "The height of the coordinate space in CSS pixels. Defaults to 150."
          }
        },
        {
          name: "moz-opaque",
          description: "Lets the canvas know whether or not translucency will be a factor. If the canvas knows there's no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized [`canvas.getContext('2d', { alpha: false })`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext \"The HTMLCanvasElement.getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported.\") instead."
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/canvas"
        }
      ]
    },
    {
      name: "slot",
      description: {
        kind: "markdown",
        value: "The slot element is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together."
      },
      attributes: [
        {
          name: "name",
          description: {
            kind: "markdown",
            value: "The slot's name.\nA **named slot** is a `<slot>` element with a `name` attribute."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/slot"
        }
      ]
    },
    {
      name: "data",
      description: {
        kind: "markdown",
        value: "The data element links a given piece of content with a machine-readable translation."
      },
      attributes: [
        {
          name: "value",
          description: {
            kind: "markdown",
            value: "This attribute specifies the machine-readable translation of the content of the element."
          }
        }
      ],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/data"
        }
      ]
    },
    {
      name: "hgroup",
      description: {
        kind: "markdown",
        value: "The hgroup element represents a heading and related content. It groups a single h1–h6 element with one or more p."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/hgroup"
        }
      ]
    },
    {
      name: "menu",
      description: {
        kind: "markdown",
        value: "The menu element represents an unordered list of interactive items."
      },
      attributes: [],
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Element/menu"
        }
      ]
    }
  ],
  globalAttributes: [
    {
      name: "accesskey",
      description: {
        kind: "markdown",
        value: "Provides a hint for generating a keyboard shortcut for the current element. This attribute consists of a space-separated list of characters. The browser should use the first one that exists on the computer keyboard layout."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/accesskey"
        }
      ]
    },
    {
      name: "autocapitalize",
      description: {
        kind: "markdown",
        value: "Controls whether and how text input is automatically capitalized as it is entered/edited by the user. It can have the following values:\n\n*   `off` or `none`, no autocapitalization is applied (all letters default to lowercase)\n*   `on` or `sentences`, the first letter of each sentence defaults to a capital letter; all other letters default to lowercase\n*   `words`, the first letter of each word defaults to a capital letter; all other letters default to lowercase\n*   `characters`, all letters should default to uppercase"
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/autocapitalize"
        }
      ]
    },
    {
      name: "class",
      description: {
        kind: "markdown",
        value: 'A space-separated list of the classes of the element. Classes allows CSS and JavaScript to select and access specific elements via the [class selectors](https://developer.mozilla.org/docs/Web/CSS/Class_selectors) or functions like the method [`Document.getElementsByClassName()`](https://developer.mozilla.org/docs/Web/API/Document/getElementsByClassName "returns an array-like object of all child elements which have all of the given class names.").'
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/class"
        }
      ]
    },
    {
      name: "contenteditable",
      description: {
        kind: "markdown",
        value: "An enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing. The attribute must take one of the following values:\n\n*   `true` or the _empty string_, which indicates that the element must be editable;\n*   `false`, which indicates that the element must not be editable."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contenteditable"
        }
      ]
    },
    {
      name: "contextmenu",
      description: {
        kind: "markdown",
        value: 'The `[**id**](#attr-id)` of a [`<menu>`](https://developer.mozilla.org/docs/Web/HTML/Element/menu "The HTML <menu> element represents a group of commands that a user can perform or activate. This includes both list menus, which might appear across the top of a screen, as well as context menus, such as those that might appear underneath a button after it has been clicked.") to use as the contextual menu for this element.'
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/contextmenu"
        }
      ]
    },
    {
      name: "dir",
      description: {
        kind: "markdown",
        value: "An enumerated attribute indicating the directionality of the element's text. It can have the following values:\n\n*   `ltr`, which means _left to right_ and is to be used for languages that are written from the left to the right (like English);\n*   `rtl`, which means _right to left_ and is to be used for languages that are written from the right to the left (like Arabic);\n*   `auto`, which lets the user agent decide. It uses a basic algorithm as it parses the characters inside the element until it finds a character with a strong directionality, then it applies that directionality to the whole element."
      },
      valueSet: "d",
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/dir"
        }
      ]
    },
    {
      name: "draggable",
      description: {
        kind: "markdown",
        value: "An enumerated attribute indicating whether the element can be dragged, using the [Drag and Drop API](https://developer.mozilla.org/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `true`, which indicates that the element may be dragged\n*   `false`, which indicates that the element may not be dragged."
      },
      valueSet: "b",
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/draggable"
        }
      ]
    },
    {
      name: "dropzone",
      description: {
        kind: "markdown",
        value: "An enumerated attribute indicating what types of content can be dropped on an element, using the [Drag and Drop API](https://developer.mozilla.org/docs/DragDrop/Drag_and_Drop). It can have the following values:\n\n*   `copy`, which indicates that dropping will create a copy of the element that was dragged\n*   `move`, which indicates that the element that was dragged will be moved to this new location.\n*   `link`, will create a link to the dragged data."
      }
    },
    {
      name: "exportparts",
      description: {
        kind: "markdown",
        value: "Used to transitively export shadow parts from a nested shadow tree into a containing light tree."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/exportparts"
        }
      ]
    },
    {
      name: "hidden",
      description: {
        kind: "markdown",
        value: "A Boolean attribute indicates that the element is not yet, or is no longer, _relevant_. For example, it can be used to hide elements of the page that can't be used until the login process has been completed. The browser won't render such elements. This attribute must not be used to hide content that could legitimately be shown."
      },
      valueSet: "v",
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/hidden"
        }
      ]
    },
    {
      name: "id",
      description: {
        kind: "markdown",
        value: "Defines a unique identifier (ID) which must be unique in the whole document. Its purpose is to identify the element when linking (using a fragment identifier), scripting, or styling (with CSS)."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/id"
        }
      ]
    },
    {
      name: "inputmode",
      description: {
        kind: "markdown",
        value: 'Provides a hint to browsers as to the type of virtual keyboard configuration to use when editing this element or its contents. Used primarily on [`<input>`](https://developer.mozilla.org/docs/Web/HTML/Element/input "The HTML <input> element is used to create interactive controls for web-based forms in order to accept data from the user; a wide variety of types of input data and control widgets are available, depending on the device and user agent.") elements, but is usable on any element while in `[contenteditable](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-contenteditable)` mode.'
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/inputmode"
        }
      ]
    },
    {
      name: "is",
      description: {
        kind: "markdown",
        value: "Allows you to specify that a standard HTML element should behave like a registered custom built-in element (see [Using custom elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements) for more details)."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/is"
        }
      ]
    },
    {
      name: "itemid",
      description: {
        kind: "markdown",
        value: "The unique, global identifier of an item."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemid"
        }
      ]
    },
    {
      name: "itemprop",
      description: {
        kind: "markdown",
        value: "Used to add properties to an item. Every HTML element may have an `itemprop` attribute specified, where an `itemprop` consists of a name and value pair."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemprop"
        }
      ]
    },
    {
      name: "itemref",
      description: {
        kind: "markdown",
        value: "Properties that are not descendants of an element with the `itemscope` attribute can be associated with the item using an `itemref`. It provides a list of element ids (not `itemid`s) with additional properties elsewhere in the document."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemref"
        }
      ]
    },
    {
      name: "itemscope",
      description: {
        kind: "markdown",
        value: "`itemscope` (usually) works along with `[itemtype](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-itemtype)` to specify that the HTML contained in a block is about a particular item. `itemscope` creates the Item and defines the scope of the `itemtype` associated with it. `itemtype` is a valid URL of a vocabulary (such as [schema.org](https://schema.org/)) that describes the item and its properties context."
      },
      valueSet: "v",
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemscope"
        }
      ]
    },
    {
      name: "itemtype",
      description: {
        kind: "markdown",
        value: "Specifies the URL of the vocabulary that will be used to define `itemprop`s (item properties) in the data structure. `[itemscope](https://developer.mozilla.org/docs/Web/HTML/Global_attributes#attr-itemscope)` is used to set the scope of where in the data structure the vocabulary set by `itemtype` will be active."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/itemtype"
        }
      ]
    },
    {
      name: "lang",
      description: {
        kind: "markdown",
        value: "Helps define the language of an element: the language that non-editable elements are in, or the language that editable elements should be written in by the user. The attribute contains one “language tag” (made of hyphen-separated “language subtags”) in the format defined in [_Tags for Identifying Languages (BCP47)_](https://www.ietf.org/rfc/bcp/bcp47.txt). [**xml:lang**](#attr-xml:lang) has priority over it."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/lang"
        }
      ]
    },
    {
      name: "part",
      description: {
        kind: "markdown",
        value: 'A space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the [`::part`](https://developer.mozilla.org/docs/Web/CSS/::part "The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.") pseudo-element.'
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/part"
        }
      ]
    },
    {
      name: "role",
      valueSet: "roles"
    },
    {
      name: "slot",
      description: {
        kind: "markdown",
        value: "Assigns a slot in a [shadow DOM](https://developer.mozilla.org/docs/Web/Web_Components/Shadow_DOM) shadow tree to an element: An element with a `slot` attribute is assigned to the slot created by the [`<slot>`](https://developer.mozilla.org/docs/Web/HTML/Element/slot \"The HTML <slot> element—part of the Web Components technology suite—is a placeholder inside a web component that you can fill with your own markup, which lets you create separate DOM trees and present them together.\") element whose `[name](https://developer.mozilla.org/docs/Web/HTML/Element/slot#attr-name)` attribute's value matches that `slot` attribute's value."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/slot"
        }
      ]
    },
    {
      name: "spellcheck",
      description: {
        kind: "markdown",
        value: "An enumerated attribute defines whether the element may be checked for spelling errors. It may have the following values:\n\n*   `true`, which indicates that the element should be, if possible, checked for spelling errors;\n*   `false`, which indicates that the element should not be checked for spelling errors."
      },
      valueSet: "b",
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/spellcheck"
        }
      ]
    },
    {
      name: "style",
      description: {
        kind: "markdown",
        value: 'Contains [CSS](https://developer.mozilla.org/docs/Web/CSS) styling declarations to be applied to the element. Note that it is recommended for styles to be defined in a separate file or files. This attribute and the [`<style>`](https://developer.mozilla.org/docs/Web/HTML/Element/style "The HTML <style> element contains style information for a document, or part of a document.") element have mainly the purpose of allowing for quick styling, for example for testing purposes.'
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/style"
        }
      ]
    },
    {
      name: "tabindex",
      description: {
        kind: "markdown",
        value: `An integer attribute indicating if the element can take input focus (is _focusable_), if it should participate to sequential keyboard navigation, and if so, at what position. It can take several values:

*   a _negative value_ means that the element should be focusable, but should not be reachable via sequential keyboard navigation;
*   \`0\` means that the element should be focusable and reachable via sequential keyboard navigation, but its relative order is defined by the platform convention;
*   a _positive value_ means that the element should be focusable and reachable via sequential keyboard navigation; the order in which the elements are focused is the increasing value of the [**tabindex**](#attr-tabindex). If several elements share the same tabindex, their relative order follows their relative positions in the document.`
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/tabindex"
        }
      ]
    },
    {
      name: "title",
      description: {
        kind: "markdown",
        value: "Contains a text representing advisory information related to the element it belongs to. Such information can typically, but not necessarily, be presented to the user as a tooltip."
      },
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/title"
        }
      ]
    },
    {
      name: "translate",
      description: {
        kind: "markdown",
        value: "An enumerated attribute that is used to specify whether an element's attribute values and the values of its [`Text`](https://developer.mozilla.org/docs/Web/API/Text \"The Text interface represents the textual content of Element or Attr. If an element has no markup within its content, it has a single child implementing Text that contains the element's text. However, if the element contains markup, it is parsed into information items and Text nodes that form its children.\") node children are to be translated when the page is localized, or whether to leave them unchanged. It can have the following values:\n\n*   empty string and `yes`, which indicates that the element will be translated.\n*   `no`, which indicates that the element will not be translated."
      },
      valueSet: "y",
      references: [
        {
          name: "MDN Reference",
          url: "https://developer.mozilla.org/docs/Web/HTML/Global_attributes/translate"
        }
      ]
    },
    {
      name: "onabort",
      description: {
        kind: "markdown",
        value: "The loading of a resource has been aborted."
      }
    },
    {
      name: "onblur",
      description: {
        kind: "markdown",
        value: "An element has lost focus (does not bubble)."
      }
    },
    {
      name: "oncanplay",
      description: {
        kind: "markdown",
        value: "The user agent can play the media, but estimates that not enough data has been loaded to play the media up to its end without having to stop for further buffering of content."
      }
    },
    {
      name: "oncanplaythrough",
      description: {
        kind: "markdown",
        value: "The user agent can play the media up to its end without having to stop for further buffering of content."
      }
    },
    {
      name: "onchange",
      description: {
        kind: "markdown",
        value: "The change event is fired for <input>, <select>, and <textarea> elements when a change to the element's value is committed by the user."
      }
    },
    {
      name: "onclick",
      description: {
        kind: "markdown",
        value: "A pointing device button has been pressed and released on an element."
      }
    },
    {
      name: "oncontextmenu",
      description: {
        kind: "markdown",
        value: "The right button of the mouse is clicked (before the context menu is displayed)."
      }
    },
    {
      name: "ondblclick",
      description: {
        kind: "markdown",
        value: "A pointing device button is clicked twice on an element."
      }
    },
    {
      name: "ondrag",
      description: {
        kind: "markdown",
        value: "An element or text selection is being dragged (every 350ms)."
      }
    },
    {
      name: "ondragend",
      description: {
        kind: "markdown",
        value: "A drag operation is being ended (by releasing a mouse button or hitting the escape key)."
      }
    },
    {
      name: "ondragenter",
      description: {
        kind: "markdown",
        value: "A dragged element or text selection enters a valid drop target."
      }
    },
    {
      name: "ondragleave",
      description: {
        kind: "markdown",
        value: "A dragged element or text selection leaves a valid drop target."
      }
    },
    {
      name: "ondragover",
      description: {
        kind: "markdown",
        value: "An element or text selection is being dragged over a valid drop target (every 350ms)."
      }
    },
    {
      name: "ondragstart",
      description: {
        kind: "markdown",
        value: "The user starts dragging an element or text selection."
      }
    },
    {
      name: "ondrop",
      description: {
        kind: "markdown",
        value: "An element is dropped on a valid drop target."
      }
    },
    {
      name: "ondurationchange",
      description: {
        kind: "markdown",
        value: "The duration attribute has been updated."
      }
    },
    {
      name: "onemptied",
      description: {
        kind: "markdown",
        value: "The media has become empty; for example, this event is sent if the media has already been loaded (or partially loaded), and the load() method is called to reload it."
      }
    },
    {
      name: "onended",
      description: {
        kind: "markdown",
        value: "Playback has stopped because the end of the media was reached."
      }
    },
    {
      name: "onerror",
      description: {
        kind: "markdown",
        value: "A resource failed to load."
      }
    },
    {
      name: "onfocus",
      description: {
        kind: "markdown",
        value: "An element has received focus (does not bubble)."
      }
    },
    {
      name: "onformchange"
    },
    {
      name: "onforminput"
    },
    {
      name: "oninput",
      description: {
        kind: "markdown",
        value: "The value of an element changes or the content of an element with the attribute contenteditable is modified."
      }
    },
    {
      name: "oninvalid",
      description: {
        kind: "markdown",
        value: "A submittable element has been checked and doesn't satisfy its constraints."
      }
    },
    {
      name: "onkeydown",
      description: {
        kind: "markdown",
        value: "A key is pressed down."
      }
    },
    {
      name: "onkeypress",
      description: {
        kind: "markdown",
        value: "A key is pressed down and that key normally produces a character value (use input instead)."
      }
    },
    {
      name: "onkeyup",
      description: {
        kind: "markdown",
        value: "A key is released."
      }
    },
    {
      name: "onload",
      description: {
        kind: "markdown",
        value: "A resource and its dependent resources have finished loading."
      }
    },
    {
      name: "onloadeddata",
      description: {
        kind: "markdown",
        value: "The first frame of the media has finished loading."
      }
    },
    {
      name: "onloadedmetadata",
      description: {
        kind: "markdown",
        value: "The metadata has been loaded."
      }
    },
    {
      name: "onloadstart",
      description: {
        kind: "markdown",
        value: "Progress has begun."
      }
    },
    {
      name: "onmousedown",
      description: {
        kind: "markdown",
        value: "A pointing device button (usually a mouse) is pressed on an element."
      }
    },
    {
      name: "onmousemove",
      description: {
        kind: "markdown",
        value: "A pointing device is moved over an element."
      }
    },
    {
      name: "onmouseout",
      description: {
        kind: "markdown",
        value: "A pointing device is moved off the element that has the listener attached or off one of its children."
      }
    },
    {
      name: "onmouseover",
      description: {
        kind: "markdown",
        value: "A pointing device is moved onto the element that has the listener attached or onto one of its children."
      }
    },
    {
      name: "onmouseup",
      description: {
        kind: "markdown",
        value: "A pointing device button is released over an element."
      }
    },
    {
      name: "onmousewheel"
    },
    {
      name: "onmouseenter",
      description: {
        kind: "markdown",
        value: "A pointing device is moved onto the element that has the listener attached."
      }
    },
    {
      name: "onmouseleave",
      description: {
        kind: "markdown",
        value: "A pointing device is moved off the element that has the listener attached."
      }
    },
    {
      name: "onpause",
      description: {
        kind: "markdown",
        value: "Playback has been paused."
      }
    },
    {
      name: "onplay",
      description: {
        kind: "markdown",
        value: "Playback has begun."
      }
    },
    {
      name: "onplaying",
      description: {
        kind: "markdown",
        value: "Playback is ready to start after having been paused or delayed due to lack of data."
      }
    },
    {
      name: "onprogress",
      description: {
        kind: "markdown",
        value: "In progress."
      }
    },
    {
      name: "onratechange",
      description: {
        kind: "markdown",
        value: "The playback rate has changed."
      }
    },
    {
      name: "onreset",
      description: {
        kind: "markdown",
        value: "A form is reset."
      }
    },
    {
      name: "onresize",
      description: {
        kind: "markdown",
        value: "The document view has been resized."
      }
    },
    {
      name: "onreadystatechange",
      description: {
        kind: "markdown",
        value: "The readyState attribute of a document has changed."
      }
    },
    {
      name: "onscroll",
      description: {
        kind: "markdown",
        value: "The document view or an element has been scrolled."
      }
    },
    {
      name: "onseeked",
      description: {
        kind: "markdown",
        value: "A seek operation completed."
      }
    },
    {
      name: "onseeking",
      description: {
        kind: "markdown",
        value: "A seek operation began."
      }
    },
    {
      name: "onselect",
      description: {
        kind: "markdown",
        value: "Some text is being selected."
      }
    },
    {
      name: "onshow",
      description: {
        kind: "markdown",
        value: "A contextmenu event was fired on/bubbled to an element that has a contextmenu attribute"
      }
    },
    {
      name: "onstalled",
      description: {
        kind: "markdown",
        value: "The user agent is trying to fetch media data, but data is unexpectedly not forthcoming."
      }
    },
    {
      name: "onsubmit",
      description: {
        kind: "markdown",
        value: "A form is submitted."
      }
    },
    {
      name: "onsuspend",
      description: {
        kind: "markdown",
        value: "Media data loading has been suspended."
      }
    },
    {
      name: "ontimeupdate",
      description: {
        kind: "markdown",
        value: "The time indicated by the currentTime attribute has been updated."
      }
    },
    {
      name: "onvolumechange",
      description: {
        kind: "markdown",
        value: "The volume has changed."
      }
    },
    {
      name: "onwaiting",
      description: {
        kind: "markdown",
        value: "Playback has stopped because of a temporary lack of data."
      }
    },
    {
      name: "onpointercancel",
      description: {
        kind: "markdown",
        value: "The pointer is unlikely to produce any more events."
      }
    },
    {
      name: "onpointerdown",
      description: {
        kind: "markdown",
        value: "The pointer enters the active buttons state."
      }
    },
    {
      name: "onpointerenter",
      description: {
        kind: "markdown",
        value: "Pointing device is moved inside the hit-testing boundary."
      }
    },
    {
      name: "onpointerleave",
      description: {
        kind: "markdown",
        value: "Pointing device is moved out of the hit-testing boundary."
      }
    },
    {
      name: "onpointerlockchange",
      description: {
        kind: "markdown",
        value: "The pointer was locked or released."
      }
    },
    {
      name: "onpointerlockerror",
      description: {
        kind: "markdown",
        value: "It was impossible to lock the pointer for technical reasons or because the permission was denied."
      }
    },
    {
      name: "onpointermove",
      description: {
        kind: "markdown",
        value: "The pointer changed coordinates."
      }
    },
    {
      name: "onpointerout",
      description: {
        kind: "markdown",
        value: "The pointing device moved out of hit-testing boundary or leaves detectable hover range."
      }
    },
    {
      name: "onpointerover",
      description: {
        kind: "markdown",
        value: "The pointing device is moved into the hit-testing boundary."
      }
    },
    {
      name: "onpointerup",
      description: {
        kind: "markdown",
        value: "The pointer leaves the active buttons state."
      }
    },
    {
      name: "aria-activedescendant",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-activedescendant"
        }
      ],
      description: {
        kind: "markdown",
        value: "Identifies the currently active element when DOM focus is on a [`composite`](https://www.w3.org/TR/wai-aria-1.1/#composite) widget, [`textbox`](https://www.w3.org/TR/wai-aria-1.1/#textbox), [`group`](https://www.w3.org/TR/wai-aria-1.1/#group), or [`application`](https://www.w3.org/TR/wai-aria-1.1/#application)."
      }
    },
    {
      name: "aria-atomic",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-atomic"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates whether [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology) will present all, or only parts of, the changed region based on the change notifications defined by the [`aria-relevant`](https://www.w3.org/TR/wai-aria-1.1/#aria-relevant) attribute."
      }
    },
    {
      name: "aria-autocomplete",
      valueSet: "autocomplete",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-autocomplete"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be presented if they are made."
      }
    },
    {
      name: "aria-busy",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-busy"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates an element is being modified and that assistive technologies _MAY_ want to wait until the modifications are complete before exposing them to the user."
      }
    },
    {
      name: "aria-checked",
      valueSet: "tristate",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-checked"
        }
      ],
      description: {
        kind: "markdown",
        value: 'Indicates the current "checked" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of checkboxes, radio buttons, and other [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
      }
    },
    {
      name: "aria-colcount",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colcount"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the total number of columns in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex)."
      }
    },
    {
      name: "aria-colindex",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colindex"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) column index or position with respect to the total number of columns within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-colcount) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
      }
    },
    {
      name: "aria-colspan",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-colspan"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the number of columns spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-colindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-colindex) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
      }
    },
    {
      name: "aria-controls",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-controls"
        }
      ],
      description: {
        kind: "markdown",
        value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) whose contents or presence are controlled by the current element. See related [`aria-owns`](https://www.w3.org/TR/wai-aria-1.1/#aria-owns)."
      }
    },
    {
      name: "aria-current",
      valueSet: "current",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-current"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that represents the current item within a container or set of related elements."
      }
    },
    {
      name: "aria-describedby",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-describedby"
        }
      ],
      description: {
        kind: "markdown",
        value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that describes the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
      }
    },
    {
      name: "aria-disabled",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-disabled"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is [perceivable](https://www.w3.org/TR/wai-aria-1.1/#dfn-perceivable) but disabled, so it is not editable or otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) and [`aria-readonly`](https://www.w3.org/TR/wai-aria-1.1/#aria-readonly)."
      }
    },
    {
      name: "aria-dropeffect",
      valueSet: "dropeffect",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-dropeffect"
        }
      ],
      description: {
        kind: "markdown",
        value: "\\[Deprecated in ARIA 1.1\\] Indicates what functions can be performed when a dragged object is released on the drop target."
      }
    },
    {
      name: "aria-errormessage",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage"
        }
      ],
      description: {
        kind: "markdown",
        value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides an error message for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-invalid`](https://www.w3.org/TR/wai-aria-1.1/#aria-invalid) and [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
      }
    },
    {
      name: "aria-expanded",
      valueSet: "u",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-expanded"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed."
      }
    },
    {
      name: "aria-flowto",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-flowto"
        }
      ],
      description: {
        kind: "markdown",
        value: "Identifies the next [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order."
      }
    },
    {
      name: "aria-grabbed",
      valueSet: "u",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-grabbed"
        }
      ],
      description: {
        kind: "markdown",
        value: `\\[Deprecated in ARIA 1.1\\] Indicates an element's "grabbed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) in a drag-and-drop operation.`
      }
    },
    {
      name: "aria-haspopup",
      valueSet: "haspopup",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
      }
    },
    {
      name: "aria-hidden",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-hidden"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates whether the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is exposed to an accessibility API. See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
      }
    },
    {
      name: "aria-invalid",
      valueSet: "invalid",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-invalid"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates the entered value does not conform to the format expected by the application. See related [`aria-errormessage`](https://www.w3.org/TR/wai-aria-1.1/#aria-errormessage)."
      }
    },
    {
      name: "aria-label",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-label"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines a string value that labels the current element. See related [`aria-labelledby`](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)."
      }
    },
    {
      name: "aria-labelledby",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby"
        }
      ],
      description: {
        kind: "markdown",
        value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) that labels the current element. See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
      }
    },
    {
      name: "aria-level",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-level"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the hierarchical level of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) within a structure."
      }
    },
    {
      name: "aria-live",
      valueSet: "live",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-live"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates that an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) will be updated, and describes the types of updates the [user agents](https://www.w3.org/TR/wai-aria-1.1/#dfn-user-agent), [assistive technologies](https://www.w3.org/TR/wai-aria-1.1/#dfn-assistive-technology), and user can expect from the [live region](https://www.w3.org/TR/wai-aria-1.1/#dfn-live-region)."
      }
    },
    {
      name: "aria-modal",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-modal"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates whether an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is modal when displayed."
      }
    },
    {
      name: "aria-multiline",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-multiline"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates whether a text box accepts multiple lines of input or only a single line."
      }
    },
    {
      name: "aria-multiselectable",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-multiselectable"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates that the user may select more than one item from the current selectable descendants."
      }
    },
    {
      name: "aria-orientation",
      valueSet: "orientation",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-orientation"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous."
      }
    },
    {
      name: "aria-owns",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-owns"
        }
      ],
      description: {
        kind: "markdown",
        value: "Identifies an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) (or elements) in order to define a visual, functional, or contextual parent/child [relationship](https://www.w3.org/TR/wai-aria-1.1/#dfn-relationship) between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related [`aria-controls`](https://www.w3.org/TR/wai-aria-1.1/#aria-controls)."
      }
    },
    {
      name: "aria-placeholder",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-placeholder"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value. A hint could be a sample value or a brief description of the expected format."
      }
    },
    {
      name: "aria-posinset",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-posinset"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)'s number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-setsize`](https://www.w3.org/TR/wai-aria-1.1/#aria-setsize)."
      }
    },
    {
      name: "aria-pressed",
      valueSet: "tristate",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-pressed"
        }
      ],
      description: {
        kind: "markdown",
        value: 'Indicates the current "pressed" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of toggle buttons. See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-selected`](https://www.w3.org/TR/wai-aria-1.1/#aria-selected).'
      }
    },
    {
      name: "aria-readonly",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-readonly"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates that the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) is not editable, but is otherwise [operable](https://www.w3.org/TR/wai-aria-1.1/#dfn-operable). See related [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.1/#aria-disabled)."
      }
    },
    {
      name: "aria-relevant",
      valueSet: "relevant",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-relevant"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. See related [`aria-atomic`](https://www.w3.org/TR/wai-aria-1.1/#aria-atomic)."
      }
    },
    {
      name: "aria-required",
      valueSet: "b",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-required"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates that user input is required on the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) before a form may be submitted."
      }
    },
    {
      name: "aria-roledescription",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-roledescription"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines a human-readable, author-localized description for the [role](https://www.w3.org/TR/wai-aria-1.1/#dfn-role) of an [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element)."
      }
    },
    {
      name: "aria-rowcount",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the total number of rows in a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex)."
      }
    },
    {
      name: "aria-rowindex",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines an [element's](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) row index or position with respect to the total number of rows within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowcount`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowcount) and [`aria-rowspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan)."
      }
    },
    {
      name: "aria-rowspan",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-rowspan"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the number of rows spanned by a cell or gridcell within a [`table`](https://www.w3.org/TR/wai-aria-1.1/#table), [`grid`](https://www.w3.org/TR/wai-aria-1.1/#grid), or [`treegrid`](https://www.w3.org/TR/wai-aria-1.1/#treegrid). See related [`aria-rowindex`](https://www.w3.org/TR/wai-aria-1.1/#aria-rowindex) and [`aria-colspan`](https://www.w3.org/TR/wai-aria-1.1/#aria-colspan)."
      }
    },
    {
      name: "aria-selected",
      valueSet: "u",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-selected"
        }
      ],
      description: {
        kind: "markdown",
        value: 'Indicates the current "selected" [state](https://www.w3.org/TR/wai-aria-1.1/#dfn-state) of various [widgets](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) and [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.1/#aria-pressed).'
      }
    },
    {
      name: "aria-setsize",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-setsize"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM. See related [`aria-posinset`](https://www.w3.org/TR/wai-aria-1.1/#aria-posinset)."
      }
    },
    {
      name: "aria-sort",
      valueSet: "sort",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-sort"
        }
      ],
      description: {
        kind: "markdown",
        value: "Indicates if items in a table or grid are sorted in ascending or descending order."
      }
    },
    {
      name: "aria-valuemax",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemax"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the maximum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
      }
    },
    {
      name: "aria-valuemin",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuemin"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the minimum allowed value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
      }
    },
    {
      name: "aria-valuenow",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the current value for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget). See related [`aria-valuetext`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext)."
      }
    },
    {
      name: "aria-valuetext",
      references: [
        {
          name: "WAI-ARIA Reference",
          url: "https://www.w3.org/TR/wai-aria-1.1/#aria-valuetext"
        }
      ],
      description: {
        kind: "markdown",
        value: "Defines the human readable text alternative of [`aria-valuenow`](https://www.w3.org/TR/wai-aria-1.1/#aria-valuenow) for a range [widget](https://www.w3.org/TR/wai-aria-1.1/#dfn-widget)."
      }
    },
    {
      name: "aria-details",
      description: {
        kind: "markdown",
        value: "Identifies the [element](https://www.w3.org/TR/wai-aria-1.1/#dfn-element) that provides a detailed, extended description for the [object](https://www.w3.org/TR/wai-aria-1.1/#dfn-object). See related [`aria-describedby`](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)."
      }
    },
    {
      name: "aria-keyshortcuts",
      description: {
        kind: "markdown",
        value: "Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element."
      }
    }
  ],
  valueSets: [
    {
      name: "b",
      values: [
        {
          name: "true"
        },
        {
          name: "false"
        }
      ]
    },
    {
      name: "u",
      values: [
        {
          name: "true"
        },
        {
          name: "false"
        },
        {
          name: "undefined"
        }
      ]
    },
    {
      name: "o",
      values: [
        {
          name: "on"
        },
        {
          name: "off"
        }
      ]
    },
    {
      name: "y",
      values: [
        {
          name: "yes"
        },
        {
          name: "no"
        }
      ]
    },
    {
      name: "w",
      values: [
        {
          name: "soft"
        },
        {
          name: "hard"
        }
      ]
    },
    {
      name: "d",
      values: [
        {
          name: "ltr"
        },
        {
          name: "rtl"
        },
        {
          name: "auto"
        }
      ]
    },
    {
      name: "m",
      values: [
        {
          name: "get",
          description: {
            kind: "markdown",
            value: "Corresponds to the HTTP [GET method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.3); form data are appended to the `action` attribute URI with a '?' as separator, and the resulting URI is sent to the server. Use this method when the form has no side-effects and contains only ASCII characters."
          }
        },
        {
          name: "post",
          description: {
            kind: "markdown",
            value: "Corresponds to the HTTP [POST method](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9.5); form data are included in the body of the form and sent to the server."
          }
        },
        {
          name: "dialog",
          description: {
            kind: "markdown",
            value: "Use when the form is inside a [`<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element to close the dialog when submitted."
          }
        }
      ]
    },
    {
      name: "fm",
      values: [
        {
          name: "get"
        },
        {
          name: "post"
        }
      ]
    },
    {
      name: "s",
      values: [
        {
          name: "row"
        },
        {
          name: "col"
        },
        {
          name: "rowgroup"
        },
        {
          name: "colgroup"
        }
      ]
    },
    {
      name: "t",
      values: [
        {
          name: "hidden"
        },
        {
          name: "text"
        },
        {
          name: "search"
        },
        {
          name: "tel"
        },
        {
          name: "url"
        },
        {
          name: "email"
        },
        {
          name: "password"
        },
        {
          name: "datetime"
        },
        {
          name: "date"
        },
        {
          name: "month"
        },
        {
          name: "week"
        },
        {
          name: "time"
        },
        {
          name: "datetime-local"
        },
        {
          name: "number"
        },
        {
          name: "range"
        },
        {
          name: "color"
        },
        {
          name: "checkbox"
        },
        {
          name: "radio"
        },
        {
          name: "file"
        },
        {
          name: "submit"
        },
        {
          name: "image"
        },
        {
          name: "reset"
        },
        {
          name: "button"
        }
      ]
    },
    {
      name: "im",
      values: [
        {
          name: "verbatim"
        },
        {
          name: "latin"
        },
        {
          name: "latin-name"
        },
        {
          name: "latin-prose"
        },
        {
          name: "full-width-latin"
        },
        {
          name: "kana"
        },
        {
          name: "kana-name"
        },
        {
          name: "katakana"
        },
        {
          name: "numeric"
        },
        {
          name: "tel"
        },
        {
          name: "email"
        },
        {
          name: "url"
        }
      ]
    },
    {
      name: "bt",
      values: [
        {
          name: "button"
        },
        {
          name: "submit"
        },
        {
          name: "reset"
        },
        {
          name: "menu"
        }
      ]
    },
    {
      name: "lt",
      values: [
        {
          name: "1"
        },
        {
          name: "a"
        },
        {
          name: "A"
        },
        {
          name: "i"
        },
        {
          name: "I"
        }
      ]
    },
    {
      name: "mt",
      values: [
        {
          name: "context"
        },
        {
          name: "toolbar"
        }
      ]
    },
    {
      name: "mit",
      values: [
        {
          name: "command"
        },
        {
          name: "checkbox"
        },
        {
          name: "radio"
        }
      ]
    },
    {
      name: "et",
      values: [
        {
          name: "application/x-www-form-urlencoded"
        },
        {
          name: "multipart/form-data"
        },
        {
          name: "text/plain"
        }
      ]
    },
    {
      name: "tk",
      values: [
        {
          name: "subtitles"
        },
        {
          name: "captions"
        },
        {
          name: "descriptions"
        },
        {
          name: "chapters"
        },
        {
          name: "metadata"
        }
      ]
    },
    {
      name: "pl",
      values: [
        {
          name: "none"
        },
        {
          name: "metadata"
        },
        {
          name: "auto"
        }
      ]
    },
    {
      name: "sh",
      values: [
        {
          name: "circle"
        },
        {
          name: "default"
        },
        {
          name: "poly"
        },
        {
          name: "rect"
        }
      ]
    },
    {
      name: "xo",
      values: [
        {
          name: "anonymous"
        },
        {
          name: "use-credentials"
        }
      ]
    },
    {
      name: "target",
      values: [
        {
          name: "_self"
        },
        {
          name: "_blank"
        },
        {
          name: "_parent"
        },
        {
          name: "_top"
        }
      ]
    },
    {
      name: "sb",
      values: [
        {
          name: "allow-forms"
        },
        {
          name: "allow-modals"
        },
        {
          name: "allow-pointer-lock"
        },
        {
          name: "allow-popups"
        },
        {
          name: "allow-popups-to-escape-sandbox"
        },
        {
          name: "allow-same-origin"
        },
        {
          name: "allow-scripts"
        },
        {
          name: "allow-top-navigation"
        }
      ]
    },
    {
      name: "tristate",
      values: [
        {
          name: "true"
        },
        {
          name: "false"
        },
        {
          name: "mixed"
        },
        {
          name: "undefined"
        }
      ]
    },
    {
      name: "inputautocomplete",
      values: [
        {
          name: "additional-name"
        },
        {
          name: "address-level1"
        },
        {
          name: "address-level2"
        },
        {
          name: "address-level3"
        },
        {
          name: "address-level4"
        },
        {
          name: "address-line1"
        },
        {
          name: "address-line2"
        },
        {
          name: "address-line3"
        },
        {
          name: "bday"
        },
        {
          name: "bday-year"
        },
        {
          name: "bday-day"
        },
        {
          name: "bday-month"
        },
        {
          name: "billing"
        },
        {
          name: "cc-additional-name"
        },
        {
          name: "cc-csc"
        },
        {
          name: "cc-exp"
        },
        {
          name: "cc-exp-month"
        },
        {
          name: "cc-exp-year"
        },
        {
          name: "cc-family-name"
        },
        {
          name: "cc-given-name"
        },
        {
          name: "cc-name"
        },
        {
          name: "cc-number"
        },
        {
          name: "cc-type"
        },
        {
          name: "country"
        },
        {
          name: "country-name"
        },
        {
          name: "current-password"
        },
        {
          name: "email"
        },
        {
          name: "family-name"
        },
        {
          name: "fax"
        },
        {
          name: "given-name"
        },
        {
          name: "home"
        },
        {
          name: "honorific-prefix"
        },
        {
          name: "honorific-suffix"
        },
        {
          name: "impp"
        },
        {
          name: "language"
        },
        {
          name: "mobile"
        },
        {
          name: "name"
        },
        {
          name: "new-password"
        },
        {
          name: "nickname"
        },
        {
          name: "off"
        },
        {
          name: "on"
        },
        {
          name: "organization"
        },
        {
          name: "organization-title"
        },
        {
          name: "pager"
        },
        {
          name: "photo"
        },
        {
          name: "postal-code"
        },
        {
          name: "sex"
        },
        {
          name: "shipping"
        },
        {
          name: "street-address"
        },
        {
          name: "tel-area-code"
        },
        {
          name: "tel"
        },
        {
          name: "tel-country-code"
        },
        {
          name: "tel-extension"
        },
        {
          name: "tel-local"
        },
        {
          name: "tel-local-prefix"
        },
        {
          name: "tel-local-suffix"
        },
        {
          name: "tel-national"
        },
        {
          name: "transaction-amount"
        },
        {
          name: "transaction-currency"
        },
        {
          name: "url"
        },
        {
          name: "username"
        },
        {
          name: "work"
        }
      ]
    },
    {
      name: "autocomplete",
      values: [
        {
          name: "inline"
        },
        {
          name: "list"
        },
        {
          name: "both"
        },
        {
          name: "none"
        }
      ]
    },
    {
      name: "current",
      values: [
        {
          name: "page"
        },
        {
          name: "step"
        },
        {
          name: "location"
        },
        {
          name: "date"
        },
        {
          name: "time"
        },
        {
          name: "true"
        },
        {
          name: "false"
        }
      ]
    },
    {
      name: "dropeffect",
      values: [
        {
          name: "copy"
        },
        {
          name: "move"
        },
        {
          name: "link"
        },
        {
          name: "execute"
        },
        {
          name: "popup"
        },
        {
          name: "none"
        }
      ]
    },
    {
      name: "invalid",
      values: [
        {
          name: "grammar"
        },
        {
          name: "false"
        },
        {
          name: "spelling"
        },
        {
          name: "true"
        }
      ]
    },
    {
      name: "live",
      values: [
        {
          name: "off"
        },
        {
          name: "polite"
        },
        {
          name: "assertive"
        }
      ]
    },
    {
      name: "orientation",
      values: [
        {
          name: "vertical"
        },
        {
          name: "horizontal"
        },
        {
          name: "undefined"
        }
      ]
    },
    {
      name: "relevant",
      values: [
        {
          name: "additions"
        },
        {
          name: "removals"
        },
        {
          name: "text"
        },
        {
          name: "all"
        },
        {
          name: "additions text"
        }
      ]
    },
    {
      name: "sort",
      values: [
        {
          name: "ascending"
        },
        {
          name: "descending"
        },
        {
          name: "none"
        },
        {
          name: "other"
        }
      ]
    },
    {
      name: "roles",
      values: [
        {
          name: "alert"
        },
        {
          name: "alertdialog"
        },
        {
          name: "button"
        },
        {
          name: "checkbox"
        },
        {
          name: "dialog"
        },
        {
          name: "gridcell"
        },
        {
          name: "link"
        },
        {
          name: "log"
        },
        {
          name: "marquee"
        },
        {
          name: "menuitem"
        },
        {
          name: "menuitemcheckbox"
        },
        {
          name: "menuitemradio"
        },
        {
          name: "option"
        },
        {
          name: "progressbar"
        },
        {
          name: "radio"
        },
        {
          name: "scrollbar"
        },
        {
          name: "searchbox"
        },
        {
          name: "slider"
        },
        {
          name: "spinbutton"
        },
        {
          name: "status"
        },
        {
          name: "switch"
        },
        {
          name: "tab"
        },
        {
          name: "tabpanel"
        },
        {
          name: "textbox"
        },
        {
          name: "timer"
        },
        {
          name: "tooltip"
        },
        {
          name: "treeitem"
        },
        {
          name: "combobox"
        },
        {
          name: "grid"
        },
        {
          name: "listbox"
        },
        {
          name: "menu"
        },
        {
          name: "menubar"
        },
        {
          name: "radiogroup"
        },
        {
          name: "tablist"
        },
        {
          name: "tree"
        },
        {
          name: "treegrid"
        },
        {
          name: "application"
        },
        {
          name: "article"
        },
        {
          name: "cell"
        },
        {
          name: "columnheader"
        },
        {
          name: "definition"
        },
        {
          name: "directory"
        },
        {
          name: "document"
        },
        {
          name: "feed"
        },
        {
          name: "figure"
        },
        {
          name: "group"
        },
        {
          name: "heading"
        },
        {
          name: "img"
        },
        {
          name: "list"
        },
        {
          name: "listitem"
        },
        {
          name: "math"
        },
        {
          name: "none"
        },
        {
          name: "note"
        },
        {
          name: "presentation"
        },
        {
          name: "region"
        },
        {
          name: "row"
        },
        {
          name: "rowgroup"
        },
        {
          name: "rowheader"
        },
        {
          name: "separator"
        },
        {
          name: "table"
        },
        {
          name: "term"
        },
        {
          name: "text"
        },
        {
          name: "toolbar"
        },
        {
          name: "banner"
        },
        {
          name: "complementary"
        },
        {
          name: "contentinfo"
        },
        {
          name: "form"
        },
        {
          name: "main"
        },
        {
          name: "navigation"
        },
        {
          name: "region"
        },
        {
          name: "search"
        },
        {
          name: "doc-abstract"
        },
        {
          name: "doc-acknowledgments"
        },
        {
          name: "doc-afterword"
        },
        {
          name: "doc-appendix"
        },
        {
          name: "doc-backlink"
        },
        {
          name: "doc-biblioentry"
        },
        {
          name: "doc-bibliography"
        },
        {
          name: "doc-biblioref"
        },
        {
          name: "doc-chapter"
        },
        {
          name: "doc-colophon"
        },
        {
          name: "doc-conclusion"
        },
        {
          name: "doc-cover"
        },
        {
          name: "doc-credit"
        },
        {
          name: "doc-credits"
        },
        {
          name: "doc-dedication"
        },
        {
          name: "doc-endnote"
        },
        {
          name: "doc-endnotes"
        },
        {
          name: "doc-epigraph"
        },
        {
          name: "doc-epilogue"
        },
        {
          name: "doc-errata"
        },
        {
          name: "doc-example"
        },
        {
          name: "doc-footnote"
        },
        {
          name: "doc-foreword"
        },
        {
          name: "doc-glossary"
        },
        {
          name: "doc-glossref"
        },
        {
          name: "doc-index"
        },
        {
          name: "doc-introduction"
        },
        {
          name: "doc-noteref"
        },
        {
          name: "doc-notice"
        },
        {
          name: "doc-pagebreak"
        },
        {
          name: "doc-pagelist"
        },
        {
          name: "doc-part"
        },
        {
          name: "doc-preface"
        },
        {
          name: "doc-prologue"
        },
        {
          name: "doc-pullquote"
        },
        {
          name: "doc-qna"
        },
        {
          name: "doc-subtitle"
        },
        {
          name: "doc-tip"
        },
        {
          name: "doc-toc"
        }
      ]
    },
    {
      name: "metanames",
      values: [
        {
          name: "application-name"
        },
        {
          name: "author"
        },
        {
          name: "description"
        },
        {
          name: "format-detection"
        },
        {
          name: "generator"
        },
        {
          name: "keywords"
        },
        {
          name: "publisher"
        },
        {
          name: "referrer"
        },
        {
          name: "robots"
        },
        {
          name: "theme-color"
        },
        {
          name: "viewport"
        }
      ]
    },
    {
      name: "haspopup",
      values: [
        {
          name: "false",
          description: {
            kind: "markdown",
            value: "(default) Indicates the element does not have a popup."
          }
        },
        {
          name: "true",
          description: {
            kind: "markdown",
            value: "Indicates the popup is a menu."
          }
        },
        {
          name: "menu",
          description: {
            kind: "markdown",
            value: "Indicates the popup is a menu."
          }
        },
        {
          name: "listbox",
          description: {
            kind: "markdown",
            value: "Indicates the popup is a listbox."
          }
        },
        {
          name: "tree",
          description: {
            kind: "markdown",
            value: "Indicates the popup is a tree."
          }
        },
        {
          name: "grid",
          description: {
            kind: "markdown",
            value: "Indicates the popup is a grid."
          }
        },
        {
          name: "dialog",
          description: {
            kind: "markdown",
            value: "Indicates the popup is a dialog."
          }
        }
      ]
    },
    {
      name: "decoding",
      values: [
        {
          name: "sync"
        },
        {
          name: "async"
        },
        {
          name: "auto"
        }
      ]
    },
    {
      name: "loading",
      values: [
        {
          name: "eager",
          description: {
            kind: "markdown",
            value: "Loads the image immediately, regardless of whether or not the image is currently within the visible viewport (this is the default value)."
          }
        },
        {
          name: "lazy",
          description: {
            kind: "markdown",
            value: "Defers loading the image until it reaches a calculated distance from the viewport, as defined by the browser. The intent is to avoid the network and storage bandwidth needed to handle the image until it's reasonably certain that it will be needed. This generally improves the performance of the content in most typical use cases."
          }
        }
      ]
    },
    {
      name: "referrerpolicy",
      values: [
        {
          name: "no-referrer"
        },
        {
          name: "no-referrer-when-downgrade"
        },
        {
          name: "origin"
        },
        {
          name: "origin-when-cross-origin"
        },
        {
          name: "same-origin"
        },
        {
          name: "strict-origin"
        },
        {
          name: "strict-origin-when-cross-origin"
        },
        {
          name: "unsafe-url"
        }
      ]
    }
  ]
}, wd = class {
  constructor(e) {
    this.dataProviders = [], this.setDataProviders(e.useDefaultDataProvider !== !1, e.customDataProviders || []);
  }
  setDataProviders(e, t) {
    this.dataProviders = [], e && this.dataProviders.push(new Vo("html5", _d)), this.dataProviders.push(...t);
  }
  getDataProviders() {
    return this.dataProviders;
  }
  isVoidElement(e, t) {
    return !!e && Eu(t, e.toLowerCase(), (n, i) => n.localeCompare(i)) >= 0;
  }
  getVoidElements(e) {
    const t = Array.isArray(e) ? e : this.getDataProviders().filter((i) => i.isApplicable(e)), n = [];
    return t.forEach((i) => {
      i.provideTags().filter((r) => r.void).forEach((r) => n.push(r.name));
    }), n.sort();
  }
  isPathAttribute(e, t) {
    if (t === "src" || t === "href")
      return !0;
    const n = vd[e];
    return n ? typeof n == "string" ? n === t : n.indexOf(t) !== -1 : !1;
  }
}, vd = {
  // HTML 4
  a: "href",
  area: "href",
  body: "background",
  blockquote: "cite",
  del: "cite",
  form: "action",
  frame: ["src", "longdesc"],
  img: ["src", "longdesc"],
  ins: "cite",
  link: "href",
  object: "data",
  q: "cite",
  script: "src",
  // HTML 5
  audio: "src",
  button: "formaction",
  command: "icon",
  embed: "src",
  html: "manifest",
  input: ["src", "formaction"],
  source: "src",
  track: "src",
  video: ["src", "poster"]
}, yd = {};
function Td(e = yd) {
  const t = new wd(e), n = new Gu(e, t), i = new Vu(e, t), r = new Cu(t), a = new bd(r), s = new gd(t), l = new cd(t);
  return {
    setDataProviders: t.setDataProviders.bind(t),
    createScanner: ke,
    parseHTMLDocument: r.parseDocument.bind(r),
    doComplete: i.doComplete.bind(i),
    doComplete2: i.doComplete2.bind(i),
    setCompletionParticipants: i.setCompletionParticipants.bind(i),
    doHover: n.doHover.bind(n),
    format: Zu,
    findDocumentHighlights: hd,
    findDocumentLinks: l.findDocumentLinks.bind(l),
    findDocumentSymbols: ud,
    findDocumentSymbols2: Go,
    getFoldingRanges: s.getFoldingRanges.bind(s),
    getSelectionRanges: a.getSelectionRanges.bind(a),
    doQuoteComplete: i.doQuoteComplete.bind(i),
    doTagComplete: i.doTagComplete.bind(i),
    doRename: md,
    findMatchingTagPosition: fd,
    findOnTypeRenameRanges: Ys,
    findLinkedEditingRanges: Ys
  };
}
function kd(e, t) {
  return new Vo(e, t);
}
var Sd = class {
  constructor(e, t) {
    this._ctx = e, this._languageSettings = t.languageSettings, this._languageId = t.languageId;
    const n = this._languageSettings.data, i = n == null ? void 0 : n.useDefaultDataProvider, r = [];
    if (n != null && n.dataProviders)
      for (const a in n.dataProviders)
        r.push(kd(a, n.dataProviders[a]));
    this._languageService = Td({
      useDefaultDataProvider: i,
      customDataProviders: r
    });
  }
  async doComplete(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return null;
    let i = this._languageService.parseHTMLDocument(n);
    return Promise.resolve(
      this._languageService.doComplete(
        n,
        t,
        i,
        this._languageSettings && this._languageSettings.suggest
      )
    );
  }
  async format(e, t, n) {
    let i = this._getTextDocument(e);
    if (!i)
      return [];
    let r = { ...this._languageSettings.format, ...n }, a = this._languageService.format(i, t, r);
    return Promise.resolve(a);
  }
  async doHover(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return null;
    let i = this._languageService.parseHTMLDocument(n), r = this._languageService.doHover(n, t, i);
    return Promise.resolve(r);
  }
  async findDocumentHighlights(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return [];
    let i = this._languageService.parseHTMLDocument(n), r = this._languageService.findDocumentHighlights(n, t, i);
    return Promise.resolve(r);
  }
  async findDocumentLinks(e) {
    let t = this._getTextDocument(e);
    if (!t)
      return [];
    let n = this._languageService.findDocumentLinks(
      t,
      null
      /*TODO@aeschli*/
    );
    return Promise.resolve(n);
  }
  async findDocumentSymbols(e) {
    let t = this._getTextDocument(e);
    if (!t)
      return [];
    let n = this._languageService.parseHTMLDocument(t), i = this._languageService.findDocumentSymbols(t, n);
    return Promise.resolve(i);
  }
  async getFoldingRanges(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return [];
    let i = this._languageService.getFoldingRanges(n, t);
    return Promise.resolve(i);
  }
  async getSelectionRanges(e, t) {
    let n = this._getTextDocument(e);
    if (!n)
      return [];
    let i = this._languageService.getSelectionRanges(n, t);
    return Promise.resolve(i);
  }
  async doRename(e, t, n) {
    let i = this._getTextDocument(e);
    if (!i)
      return null;
    let r = this._languageService.parseHTMLDocument(i), a = this._languageService.doRename(i, t, n, r);
    return Promise.resolve(a);
  }
  _getTextDocument(e) {
    let t = this._ctx.getMirrorModels();
    for (let n of t)
      if (n.uri.toString() === e)
        return Ei.create(
          e,
          this._languageId,
          n.version,
          n.getValue()
        );
    return null;
  }
};
self.onmessage = () => {
  Fo((e, t) => new Sd(e, t));
};