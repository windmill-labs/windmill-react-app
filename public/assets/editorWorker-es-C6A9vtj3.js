class ks {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(e) {
      setTimeout(() => {
        throw e.stack ? Ze.isErrorNoTelemetry(e) ? new Ze(e.message + `

` + e.stack) : new Error(e.message + `

` + e.stack) : e;
      }, 0);
    };
  }
  addListener(e) {
    return this.listeners.push(e), () => {
      this._removeListener(e);
    };
  }
  emit(e) {
    this.listeners.forEach((n) => {
      n(e);
    });
  }
  _removeListener(e) {
    this.listeners.splice(this.listeners.indexOf(e), 1);
  }
  setUnexpectedErrorHandler(e) {
    this.unexpectedErrorHandler = e;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(e) {
    this.unexpectedErrorHandler(e), this.emit(e);
  }
  onUnexpectedExternalError(e) {
    this.unexpectedErrorHandler(e);
  }
}
const Ts = new ks();
function ht(t) {
  Ps(t) || Ts.onUnexpectedError(t);
}
function Dn(t) {
  if (t instanceof Error) {
    const { name: e, message: n } = t, r = t.stacktrace || t.stack;
    return {
      $isError: !0,
      name: e,
      message: n,
      stack: r,
      noTelemetry: Ze.isErrorNoTelemetry(t)
    };
  }
  return t;
}
const Gt = "Canceled";
function Ps(t) {
  return t instanceof Os ? !0 : t instanceof Error && t.name === Gt && t.message === Gt;
}
class Os extends Error {
  constructor() {
    super(Gt), this.name = this.message;
  }
}
class Ze extends Error {
  constructor(e) {
    super(e), this.name = "CodeExpectedError";
  }
  static fromError(e) {
    if (e instanceof Ze)
      return e;
    const n = new Ze();
    return n.message = e.message, n.stack = e.stack, n;
  }
  static isErrorNoTelemetry(e) {
    return e.name === "CodeExpectedError";
  }
}
class J extends Error {
  constructor(e) {
    super(e || "An unexpected bug occurred."), Object.setPrototypeOf(this, J.prototype);
  }
}
function Is(t, e) {
  const n = this;
  let r = !1, i;
  return function() {
    return r || (r = !0, i = t.apply(n, arguments)), i;
  };
}
function Ye(t, e) {
  const n = Qe(t, e);
  return n === -1 ? void 0 : t[n];
}
function Qe(t, e, n = 0, r = t.length) {
  let i = n, s = r;
  for (; i < s; ) {
    const o = Math.floor((i + s) / 2);
    e(t[o]) ? i = o + 1 : s = o;
  }
  return i - 1;
}
function Fs(t, e) {
  const n = Xt(t, e);
  return n === t.length ? void 0 : t[n];
}
function Xt(t, e, n = 0, r = t.length) {
  let i = n, s = r;
  for (; i < s; ) {
    const o = Math.floor((i + s) / 2);
    e(t[o]) ? s = o : i = o + 1;
  }
  return i;
}
const Vi = class Bi {
  constructor(e) {
    this._array = e, this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(e) {
    if (Bi.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (const r of this._array)
          if (this._prevFindLastPredicate(r) && !e(r))
            throw new Error(
              "MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate."
            );
      }
      this._prevFindLastPredicate = e;
    }
    const n = Qe(this._array, e, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = n + 1, n === -1 ? void 0 : this._array[n];
  }
};
Vi.assertInvariants = !1;
let Ui = Vi;
function Ds(t, e, n = (r, i) => r === i) {
  if (t === e)
    return !0;
  if (!t || !e || t.length !== e.length)
    return !1;
  for (let r = 0, i = t.length; r < i; r++)
    if (!n(t[r], e[r]))
      return !1;
  return !0;
}
function* $i(t, e) {
  let n, r;
  for (const i of t)
    r !== void 0 && e(r, i) ? n.push(i) : (n && (yield n), n = [i]), r = i;
  n && (yield n);
}
function qs(t, e) {
  for (let n = 0; n <= t.length; n++)
    e(n === 0 ? void 0 : t[n - 1], n === t.length ? void 0 : t[n]);
}
function Ks(t, e) {
  for (let n = 0; n < t.length; n++)
    e(n === 0 ? void 0 : t[n - 1], t[n], n + 1 === t.length ? void 0 : t[n + 1]);
}
function Vs(t, e) {
  for (const n of e)
    t.push(n);
}
var qn;
(function(t) {
  function e(s) {
    return s < 0;
  }
  t.isLessThan = e;
  function n(s) {
    return s <= 0;
  }
  t.isLessThanOrEqual = n;
  function r(s) {
    return s > 0;
  }
  t.isGreaterThan = r;
  function i(s) {
    return s === 0;
  }
  t.isNeitherLessOrGreaterThan = i, t.greaterThan = 1, t.lessThan = -1, t.neitherLessOrGreaterThan = 0;
})(qn || (qn = {}));
function ct(t, e) {
  return (n, r) => e(t(n), t(r));
}
const dt = (t, e) => t - e;
function Bs(t) {
  return (e, n) => -t(e, n);
}
var Kn, Vn;
class Us {
  constructor(e, n) {
    this.uri = e, this.value = n;
  }
}
function $s(t) {
  return Array.isArray(t);
}
const zi = class st {
  constructor(e, n) {
    if (this[Kn] = "ResourceMap", e instanceof st)
      this.map = new Map(e.map), this.toKey = n ?? st.defaultToKey;
    else if ($s(e)) {
      this.map = /* @__PURE__ */ new Map(), this.toKey = n ?? st.defaultToKey;
      for (const [r, i] of e)
        this.set(r, i);
    } else
      this.map = /* @__PURE__ */ new Map(), this.toKey = e ?? st.defaultToKey;
  }
  set(e, n) {
    return this.map.set(this.toKey(e), new Us(e, n)), this;
  }
  get(e) {
    var n;
    return (n = this.map.get(this.toKey(e))) == null ? void 0 : n.value;
  }
  has(e) {
    return this.map.has(this.toKey(e));
  }
  get size() {
    return this.map.size;
  }
  clear() {
    this.map.clear();
  }
  delete(e) {
    return this.map.delete(this.toKey(e));
  }
  forEach(e, n) {
    typeof n < "u" && (e = e.bind(n));
    for (const [r, i] of this.map)
      e(i.value, i.uri, this);
  }
  *values() {
    for (const e of this.map.values())
      yield e.value;
  }
  *keys() {
    for (const e of this.map.values())
      yield e.uri;
  }
  *entries() {
    for (const e of this.map.values())
      yield [e.uri, e.value];
  }
  *[(Kn = Symbol.toStringTag, Symbol.iterator)]() {
    for (const [, e] of this.map)
      yield [e.uri, e.value];
  }
};
zi.defaultToKey = (t) => t.toString();
let zs = zi;
class Ws {
  constructor() {
    this[Vn] = "LinkedMap", this._map = /* @__PURE__ */ new Map(), this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0;
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
    var e;
    return (e = this._head) == null ? void 0 : e.value;
  }
  get last() {
    var e;
    return (e = this._tail) == null ? void 0 : e.value;
  }
  has(e) {
    return this._map.has(e);
  }
  get(e, n = 0) {
    const r = this._map.get(e);
    if (r)
      return n !== 0 && this.touch(r, n), r.value;
  }
  set(e, n, r = 0) {
    let i = this._map.get(e);
    if (i)
      i.value = n, r !== 0 && this.touch(i, r);
    else {
      switch (i = { key: e, value: n, next: void 0, previous: void 0 }, r) {
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
      this._map.set(e, i), this._size++;
    }
    return this;
  }
  delete(e) {
    return !!this.remove(e);
  }
  remove(e) {
    const n = this._map.get(e);
    if (n)
      return this._map.delete(e), this.removeItem(n), this._size--, n.value;
  }
  shift() {
    if (!this._head && !this._tail)
      return;
    if (!this._head || !this._tail)
      throw new Error("Invalid list");
    const e = this._head;
    return this._map.delete(e.key), this.removeItem(e), this._size--, e.value;
  }
  forEach(e, n) {
    const r = this._state;
    let i = this._head;
    for (; i; ) {
      if (n ? e.bind(n)(i.value, i.key, this) : e(i.value, i.key, this), this._state !== r)
        throw new Error("LinkedMap got modified during iteration.");
      i = i.next;
    }
  }
  keys() {
    const e = this, n = this._state;
    let r = this._head;
    const i = {
      [Symbol.iterator]() {
        return i;
      },
      next() {
        if (e._state !== n)
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
    const e = this, n = this._state;
    let r = this._head;
    const i = {
      [Symbol.iterator]() {
        return i;
      },
      next() {
        if (e._state !== n)
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
    const e = this, n = this._state;
    let r = this._head;
    const i = {
      [Symbol.iterator]() {
        return i;
      },
      next() {
        if (e._state !== n)
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
  [(Vn = Symbol.toStringTag, Symbol.iterator)]() {
    return this.entries();
  }
  trimOld(e) {
    if (e >= this.size)
      return;
    if (e === 0) {
      this.clear();
      return;
    }
    let n = this._head, r = this.size;
    for (; n && r > e; )
      this._map.delete(n.key), n = n.next, r--;
    this._head = n, this._size = r, n && (n.previous = void 0), this._state++;
  }
  trimNew(e) {
    if (e >= this.size)
      return;
    if (e === 0) {
      this.clear();
      return;
    }
    let n = this._tail, r = this.size;
    for (; n && r > e; )
      this._map.delete(n.key), n = n.previous, r--;
    this._tail = n, this._size = r, n && (n.next = void 0), this._state++;
  }
  addItemFirst(e) {
    if (!this._head && !this._tail)
      this._tail = e;
    else if (this._head)
      e.next = this._head, this._head.previous = e;
    else
      throw new Error("Invalid list");
    this._head = e, this._state++;
  }
  addItemLast(e) {
    if (!this._head && !this._tail)
      this._head = e;
    else if (this._tail)
      e.previous = this._tail, this._tail.next = e;
    else
      throw new Error("Invalid list");
    this._tail = e, this._state++;
  }
  removeItem(e) {
    if (e === this._head && e === this._tail)
      this._head = void 0, this._tail = void 0;
    else if (e === this._head) {
      if (!e.next)
        throw new Error("Invalid list");
      e.next.previous = void 0, this._head = e.next;
    } else if (e === this._tail) {
      if (!e.previous)
        throw new Error("Invalid list");
      e.previous.next = void 0, this._tail = e.previous;
    } else {
      const n = e.next, r = e.previous;
      if (!n || !r)
        throw new Error("Invalid list");
      n.previous = r, r.next = n;
    }
    e.next = void 0, e.previous = void 0, this._state++;
  }
  touch(e, n) {
    if (!this._head || !this._tail)
      throw new Error("Invalid list");
    if (!(n !== 1 && n !== 2)) {
      if (n === 1) {
        if (e === this._head)
          return;
        const r = e.next, i = e.previous;
        e === this._tail ? (i.next = void 0, this._tail = i) : (r.previous = i, i.next = r), e.previous = void 0, e.next = this._head, this._head.previous = e, this._head = e, this._state++;
      } else if (n === 2) {
        if (e === this._tail)
          return;
        const r = e.next, i = e.previous;
        e === this._head ? (r.previous = void 0, this._head = r) : (r.previous = i, i.next = r), e.next = void 0, e.previous = this._tail, this._tail.next = e, this._tail = e, this._state++;
      }
    }
  }
  toJSON() {
    const e = [];
    return this.forEach((n, r) => {
      e.push([r, n]);
    }), e;
  }
  fromJSON(e) {
    this.clear();
    for (const [n, r] of e)
      this.set(n, r);
  }
}
class Hs extends Ws {
  constructor(e, n = 1) {
    super(), this._limit = e, this._ratio = Math.min(Math.max(0, n), 1);
  }
  get limit() {
    return this._limit;
  }
  set limit(e) {
    this._limit = e, this.checkTrim();
  }
  get ratio() {
    return this._ratio;
  }
  set ratio(e) {
    this._ratio = Math.min(Math.max(0, e), 1), this.checkTrim();
  }
  get(e, n = 2) {
    return super.get(e, n);
  }
  peek(e) {
    return super.get(e, 0);
  }
  set(e, n) {
    return super.set(e, n, 2), this;
  }
  checkTrim() {
    this.size > this._limit && this.trim(Math.round(this._limit * this._ratio));
  }
}
class js extends Hs {
  constructor(e, n = 1) {
    super(e, n);
  }
  trim(e) {
    this.trimOld(e);
  }
  set(e, n) {
    return super.set(e, n), this.checkTrim(), this;
  }
}
class Gs {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(e, n) {
    let r = this.map.get(e);
    r || (r = /* @__PURE__ */ new Set(), this.map.set(e, r)), r.add(n);
  }
  delete(e, n) {
    const r = this.map.get(e);
    r && (r.delete(n), r.size === 0 && this.map.delete(e));
  }
  forEach(e, n) {
    const r = this.map.get(e);
    r && r.forEach(n);
  }
  get(e) {
    return this.map.get(e) || /* @__PURE__ */ new Set();
  }
}
var xt;
(function(t) {
  function e(b) {
    return b && typeof b == "object" && typeof b[Symbol.iterator] == "function";
  }
  t.is = e;
  const n = Object.freeze([]);
  function r() {
    return n;
  }
  t.empty = r;
  function* i(b) {
    yield b;
  }
  t.single = i;
  function s(b) {
    return e(b) ? b : i(b);
  }
  t.wrap = s;
  function o(b) {
    return b || n;
  }
  t.from = o;
  function* l(b) {
    for (let w = b.length - 1; w >= 0; w--)
      yield b[w];
  }
  t.reverse = l;
  function u(b) {
    return !b || b[Symbol.iterator]().next().done === !0;
  }
  t.isEmpty = u;
  function h(b) {
    return b[Symbol.iterator]().next().value;
  }
  t.first = h;
  function c(b, w) {
    let y = 0;
    for (const S of b)
      if (w(S, y++))
        return !0;
    return !1;
  }
  t.some = c;
  function d(b, w) {
    for (const y of b)
      if (w(y))
        return y;
  }
  t.find = d;
  function* g(b, w) {
    for (const y of b)
      w(y) && (yield y);
  }
  t.filter = g;
  function* m(b, w) {
    let y = 0;
    for (const S of b)
      yield w(S, y++);
  }
  t.map = m;
  function* f(b, w) {
    let y = 0;
    for (const S of b)
      yield* w(S, y++);
  }
  t.flatMap = f;
  function* p(...b) {
    for (const w of b)
      yield* w;
  }
  t.concat = p;
  function C(b, w, y) {
    let S = y;
    for (const O of b)
      S = w(S, O);
    return S;
  }
  t.reduce = C;
  function* v(b, w, y = b.length) {
    for (w < -b.length && (w = 0), w < 0 && (w += b.length), y < 0 ? y += b.length : y > b.length && (y = b.length); w < y; w++)
      yield b[w];
  }
  t.slice = v;
  function L(b, w = Number.POSITIVE_INFINITY) {
    const y = [];
    if (w === 0)
      return [y, b];
    const S = b[Symbol.iterator]();
    for (let O = 0; O < w; O++) {
      const K = S.next();
      if (K.done)
        return [y, t.empty()];
      y.push(K.value);
    }
    return [y, { [Symbol.iterator]() {
      return S;
    } }];
  }
  t.consume = L;
  async function _(b) {
    const w = [];
    for await (const y of b)
      w.push(y);
    return Promise.resolve(w);
  }
  t.asyncToArray = _;
})(xt || (xt = {}));
function Wi(t) {
  if (xt.is(t)) {
    const e = [];
    for (const n of t)
      if (n)
        try {
          n.dispose();
        } catch (r) {
          e.push(r);
        }
    if (e.length === 1)
      throw e[0];
    if (e.length > 1)
      throw new AggregateError(e, "Encountered errors while disposing of store");
    return Array.isArray(t) ? [] : t;
  } else if (t)
    return t.dispose(), t;
}
function Xs(...t) {
  return mt(() => Wi(t));
}
function mt(t) {
  return {
    dispose: Is(() => {
      t();
    })
  };
}
const Hi = class ji {
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
        Wi(this._toDispose);
      } finally {
        this._toDispose.clear();
      }
  }
  add(e) {
    if (!e)
      return e;
    if (e === this)
      throw new Error("Cannot register a disposable on itself!");
    return this._isDisposed ? ji.DISABLE_DISPOSED_WARNING || console.warn(new Error(
      "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
    ).stack) : this._toDispose.add(e), e;
  }
  delete(e) {
    if (e) {
      if (e === this)
        throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(e), e.dispose();
    }
  }
  deleteAndLeak(e) {
    e && this._toDispose.has(e) && this._toDispose.delete(e);
  }
};
Hi.DISABLE_DISPOSED_WARNING = !1;
let Sn = Hi;
const Gi = class {
  constructor() {
    this._store = new Sn(), this._store;
  }
  dispose() {
    this._store.dispose();
  }
  _register(e) {
    if (e === this)
      throw new Error("Cannot register a disposable on itself!");
    return this._store.add(e);
  }
};
Gi.None = Object.freeze({ dispose() {
} });
let At = Gi;
const Jt = class Zt {
  constructor(e) {
    this.element = e, this.next = Zt.Undefined, this.prev = Zt.Undefined;
  }
};
Jt.Undefined = new Jt(void 0);
let H = Jt;
class Js {
  constructor() {
    this._first = H.Undefined, this._last = H.Undefined, this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === H.Undefined;
  }
  clear() {
    let e = this._first;
    for (; e !== H.Undefined; ) {
      const n = e.next;
      e.prev = H.Undefined, e.next = H.Undefined, e = n;
    }
    this._first = H.Undefined, this._last = H.Undefined, this._size = 0;
  }
  unshift(e) {
    return this._insert(e, !1);
  }
  push(e) {
    return this._insert(e, !0);
  }
  _insert(e, n) {
    const r = new H(e);
    if (this._first === H.Undefined)
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
    if (this._first !== H.Undefined) {
      const e = this._first.element;
      return this._remove(this._first), e;
    }
  }
  pop() {
    if (this._last !== H.Undefined) {
      const e = this._last.element;
      return this._remove(this._last), e;
    }
  }
  _remove(e) {
    if (e.prev !== H.Undefined && e.next !== H.Undefined) {
      const n = e.prev;
      n.next = e.next, e.next.prev = n;
    } else e.prev === H.Undefined && e.next === H.Undefined ? (this._first = H.Undefined, this._last = H.Undefined) : e.next === H.Undefined ? (this._last = this._last.prev, this._last.next = H.Undefined) : e.prev === H.Undefined && (this._first = this._first.next, this._first.prev = H.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let e = this._first;
    for (; e !== H.Undefined; )
      yield e.element, e = e.next;
  }
}
const Zs = globalThis.performance && typeof globalThis.performance.now == "function";
class Dt {
  static create(e) {
    return new Dt(e);
  }
  constructor(e) {
    this._now = Zs && e === !1 ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
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
var Mt;
(function(t) {
  t.None = () => At.None;
  function e(x, N) {
    return g(x, () => {
    }, 0, void 0, !0, void 0, N);
  }
  t.defer = e;
  function n(x) {
    return (N, M = null, R) => {
      let P = !1, q;
      return q = x((B) => {
        if (!P)
          return q ? q.dispose() : P = !0, N.call(M, B);
      }, null, R), P && q.dispose(), q;
    };
  }
  t.once = n;
  function r(x, N) {
    return t.once(t.filter(x, N));
  }
  t.onceIf = r;
  function i(x, N, M) {
    return c((R, P = null, q) => x((B) => R.call(P, N(B)), null, q), M);
  }
  t.map = i;
  function s(x, N, M) {
    return c((R, P = null, q) => x((B) => {
      N(B), R.call(P, B);
    }, null, q), M);
  }
  t.forEach = s;
  function o(x, N, M) {
    return c((R, P = null, q) => x((B) => N(B) && R.call(P, B), null, q), M);
  }
  t.filter = o;
  function l(x) {
    return x;
  }
  t.signal = l;
  function u(...x) {
    return (N, M = null, R) => {
      const P = Xs(...x.map((q) => q((B) => N.call(M, B))));
      return d(P, R);
    };
  }
  t.any = u;
  function h(x, N, M, R) {
    let P = M;
    return i(x, (q) => (P = N(P, q), P), R);
  }
  t.reduce = h;
  function c(x, N) {
    let M;
    const R = {
      onWillAddFirstListener() {
        M = x(P.fire, P);
      },
      onDidRemoveLastListener() {
        M == null || M.dispose();
      }
    }, P = new de(R);
    return N == null || N.add(P), P.event;
  }
  function d(x, N) {
    return N instanceof Array ? N.push(x) : N && N.add(x), x;
  }
  function g(x, N, M = 100, R = !1, P = !1, q, B) {
    let Z, le, Ve, pt = 0, Be;
    const xs = {
      leakWarningThreshold: q,
      onWillAddFirstListener() {
        Z = x((As) => {
          pt++, le = N(le, As), R && !Ve && (bt.fire(le), le = void 0), Be = () => {
            const Ms = le;
            le = void 0, Ve = void 0, (!R || pt > 1) && bt.fire(Ms), pt = 0;
          }, typeof M == "number" ? (clearTimeout(Ve), Ve = setTimeout(Be, M)) : Ve === void 0 && (Ve = 0, queueMicrotask(Be));
        });
      },
      onWillRemoveListener() {
        P && pt > 0 && (Be == null || Be());
      },
      onDidRemoveLastListener() {
        Be = void 0, Z.dispose();
      }
    }, bt = new de(xs);
    return B == null || B.add(bt), bt.event;
  }
  t.debounce = g;
  function m(x, N = 0, M) {
    return t.debounce(x, (R, P) => R ? (R.push(P), R) : [P], N, void 0, !0, void 0, M);
  }
  t.accumulate = m;
  function f(x, N = (R, P) => R === P, M) {
    let R = !0, P;
    return o(x, (q) => {
      const B = R || !N(q, P);
      return R = !1, P = q, B;
    }, M);
  }
  t.latch = f;
  function p(x, N, M) {
    return [
      t.filter(x, N, M),
      t.filter(x, (R) => !N(R), M)
    ];
  }
  t.split = p;
  function C(x, N = !1, M = [], R) {
    let P = M.slice(), q = x((le) => {
      P ? P.push(le) : Z.fire(le);
    });
    R && R.add(q);
    const B = () => {
      P == null || P.forEach((le) => Z.fire(le)), P = null;
    }, Z = new de({
      onWillAddFirstListener() {
        q || (q = x((le) => Z.fire(le)), R && R.add(q));
      },
      onDidAddFirstListener() {
        P && (N ? setTimeout(B) : B());
      },
      onDidRemoveLastListener() {
        q && q.dispose(), q = null;
      }
    });
    return R && R.add(Z), Z.event;
  }
  t.buffer = C;
  function v(x, N) {
    return (M, R, P) => {
      const q = N(new _());
      return x(function(B) {
        const Z = q.evaluate(B);
        Z !== L && M.call(R, Z);
      }, void 0, P);
    };
  }
  t.chain = v;
  const L = Symbol("HaltChainable");
  class _ {
    constructor() {
      this.steps = [];
    }
    map(N) {
      return this.steps.push(N), this;
    }
    forEach(N) {
      return this.steps.push((M) => (N(M), M)), this;
    }
    filter(N) {
      return this.steps.push((M) => N(M) ? M : L), this;
    }
    reduce(N, M) {
      let R = M;
      return this.steps.push((P) => (R = N(R, P), R)), this;
    }
    latch(N = (M, R) => M === R) {
      let M = !0, R;
      return this.steps.push((P) => {
        const q = M || !N(P, R);
        return M = !1, R = P, q ? P : L;
      }), this;
    }
    evaluate(N) {
      for (const M of this.steps)
        if (N = M(N), N === L)
          break;
      return N;
    }
  }
  function b(x, N, M = (R) => R) {
    const R = (...Z) => B.fire(M(...Z)), P = () => x.on(N, R), q = () => x.removeListener(N, R), B = new de(
      { onWillAddFirstListener: P, onDidRemoveLastListener: q }
    );
    return B.event;
  }
  t.fromNodeEventEmitter = b;
  function w(x, N, M = (R) => R) {
    const R = (...Z) => B.fire(M(...Z)), P = () => x.addEventListener(N, R), q = () => x.removeEventListener(N, R), B = new de(
      { onWillAddFirstListener: P, onDidRemoveLastListener: q }
    );
    return B.event;
  }
  t.fromDOMEventEmitter = w;
  function y(x) {
    return new Promise((N) => n(x)(N));
  }
  t.toPromise = y;
  function S(x) {
    const N = new de();
    return x.then((M) => {
      N.fire(M);
    }, () => {
      N.fire(void 0);
    }).finally(() => {
      N.dispose();
    }), N.event;
  }
  t.fromPromise = S;
  function O(x, N) {
    return x((M) => N.fire(M));
  }
  t.forward = O;
  function K(x, N, M) {
    return N(M), x((R) => N(R));
  }
  t.runAndSubscribe = K;
  class ie {
    constructor(N, M) {
      this._observable = N, this._counter = 0, this._hasChanged = !1;
      const R = {
        onWillAddFirstListener: () => {
          N.addObserver(this), this._observable.reportChanges();
        },
        onDidRemoveLastListener: () => {
          N.removeObserver(this);
        }
      };
      this.emitter = new de(R), M && M.add(this.emitter);
    }
    beginUpdate(N) {
      this._counter++;
    }
    handlePossibleChange(N) {
    }
    handleChange(N, M) {
      this._hasChanged = !0;
    }
    endUpdate(N) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = !1, this.emitter.fire(this._observable.get())));
    }
  }
  function A(x, N) {
    return new ie(x, N).emitter.event;
  }
  t.fromObservable = A;
  function we(x) {
    return (N, M, R) => {
      let P = 0, q = !1;
      const B = {
        beginUpdate() {
          P++;
        },
        endUpdate() {
          P--, P === 0 && (x.reportChanges(), q && (q = !1, N.call(M)));
        },
        handlePossibleChange() {
        },
        handleChange() {
          q = !0;
        }
      };
      x.addObserver(B), x.reportChanges();
      const Z = {
        dispose() {
          x.removeObserver(B);
        }
      };
      return R instanceof Sn ? R.add(Z) : Array.isArray(R) && R.push(Z), Z;
    };
  }
  t.fromObservableLight = we;
})(Mt || (Mt = {}));
const Yt = class Qt {
  constructor(e) {
    this.listenerCount = 0, this.invocationCount = 0, this.elapsedOverall = 0, this.durations = [], this.name = `${e}_${Qt._idPool++}`, Qt.all.add(this);
  }
  start(e) {
    this._stopWatch = new Dt(), this.listenerCount = e;
  }
  stop() {
    if (this._stopWatch) {
      const e = this._stopWatch.elapsed();
      this.durations.push(e), this.elapsedOverall += e, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Yt.all = /* @__PURE__ */ new Set(), Yt._idPool = 0;
let Ys = Yt, Qs = -1;
const Xi = class Ji {
  constructor(e, n, r = (Ji._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = e, this.threshold = n, this.name = r, this._warnCountdown = 0;
  }
  dispose() {
    var e;
    (e = this._stacks) == null || e.clear();
  }
  check(e, n) {
    const r = this.threshold;
    if (r <= 0 || n < r)
      return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    const i = this._stacks.get(e.value) || 0;
    if (this._stacks.set(e.value, i + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = r * 0.5;
      const [s, o] = this.getMostFrequentStack(), l = `[${this.name}] potential listener LEAK detected, having ${n} listeners already. MOST frequent listener (${o}):`;
      console.warn(l), console.warn(s);
      const u = new to(l, s);
      this._errorHandler(u);
    }
    return () => {
      const s = this._stacks.get(e.value) || 0;
      this._stacks.set(e.value, s - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks)
      return;
    let e, n = 0;
    for (const [r, i] of this._stacks)
      (!e || n < i) && (e = [r, i], n = i);
    return e;
  }
};
Xi._idPool = 1;
let eo = Xi;
class Rn {
  static create() {
    const e = new Error();
    return new Rn(e.stack ?? "");
  }
  constructor(e) {
    this.value = e;
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
}
class to extends Error {
  constructor(e, n) {
    super(e), this.name = "ListenerLeakError", this.stack = n;
  }
}
class no extends Error {
  constructor(e, n) {
    super(e), this.name = "ListenerRefusalError", this.stack = n;
  }
}
let ro = 0;
class Kt {
  constructor(e) {
    this.value = e, this.id = ro++;
  }
}
const io = 2;
class de {
  constructor(e) {
    var n, r, i, s;
    this._size = 0, this._options = e, this._leakageMon = (n = this._options) != null && n.leakWarningThreshold ? new eo(
      (e == null ? void 0 : e.onListenerError) ?? ht,
      ((r = this._options) == null ? void 0 : r.leakWarningThreshold) ?? Qs
    ) : void 0, this._perfMon = (i = this._options) != null && i._profName ? new Ys(this._options._profName) : void 0, this._deliveryQueue = (s = this._options) == null ? void 0 : s.deliveryQueue;
  }
  dispose() {
    var e, n, r, i;
    this._disposed || (this._disposed = !0, ((e = this._deliveryQueue) == null ? void 0 : e.current) === this && this._deliveryQueue.reset(), this._listeners && (this._listeners = void 0, this._size = 0), (r = (n = this._options) == null ? void 0 : n.onDidRemoveLastListener) == null || r.call(n), (i = this._leakageMon) == null || i.dispose());
  }
  get event() {
    return this._event ?? (this._event = (e, n, r) => {
      var i, s, o, l, u, h, c;
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        const f = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(f);
        const p = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], C = new no(
          `${f}. HINT: Stack shows most frequent listener (${p[1]}-times)`,
          p[0]
        );
        return (((i = this._options) == null ? void 0 : i.onListenerError) || ht)(C), At.None;
      }
      if (this._disposed)
        return At.None;
      n && (e = e.bind(n));
      const d = new Kt(e);
      let g;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (d.stack = Rn.create(), g = this._leakageMon.check(d.stack, this._size + 1)), this._listeners ? this._listeners instanceof Kt ? (this._deliveryQueue ?? (this._deliveryQueue = new so()), this._listeners = [this._listeners, d]) : this._listeners.push(d) : ((o = (s = this._options) == null ? void 0 : s.onWillAddFirstListener) == null || o.call(s, this), this._listeners = d, (u = (l = this._options) == null ? void 0 : l.onDidAddFirstListener) == null || u.call(l, this)), (c = (h = this._options) == null ? void 0 : h.onDidAddListener) == null || c.call(h, this), this._size++;
      const m = mt(() => {
        g == null || g(), this._removeListener(d);
      });
      return r instanceof Sn ? r.add(m) : Array.isArray(r) && r.push(m), m;
    }), this._event;
  }
  _removeListener(e) {
    var n, r, i, s;
    if ((r = (n = this._options) == null ? void 0 : n.onWillRemoveListener) == null || r.call(n, this), !this._listeners)
      return;
    if (this._size === 1) {
      this._listeners = void 0, (s = (i = this._options) == null ? void 0 : i.onDidRemoveLastListener) == null || s.call(i, this), this._size = 0;
      return;
    }
    const o = this._listeners, l = o.indexOf(e);
    if (l === -1)
      throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, o[l] = void 0;
    const u = this._deliveryQueue.current === this;
    if (this._size * io <= o.length) {
      let h = 0;
      for (let c = 0; c < o.length; c++)
        o[c] ? o[h++] = o[c] : u && h < this._deliveryQueue.end && (this._deliveryQueue.end--, h < this._deliveryQueue.i && this._deliveryQueue.i--);
      o.length = h;
    }
  }
  _deliver(e, n) {
    var r;
    if (!e)
      return;
    const i = ((r = this._options) == null ? void 0 : r.onListenerError) || ht;
    if (!i) {
      e.value(n);
      return;
    }
    try {
      e.value(n);
    } catch (s) {
      i(s);
    }
  }
  _deliverQueue(e) {
    const n = e.current._listeners;
    for (; e.i < e.end; )
      this._deliver(n[e.i++], e.value);
    e.reset();
  }
  fire(e) {
    var n, r, i, s;
    if ((n = this._deliveryQueue) != null && n.current && (this._deliverQueue(this._deliveryQueue), (r = this._perfMon) == null || r.stop()), (i = this._perfMon) == null || i.start(this._size), this._listeners) if (this._listeners instanceof Kt)
      this._deliver(this._listeners, e);
    else {
      const o = this._deliveryQueue;
      o.enqueue(this, e, this._listeners.length), this._deliverQueue(o);
    }
    (s = this._perfMon) == null || s.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
}
class so {
  constructor() {
    this.i = -1, this.end = 0;
  }
  enqueue(e, n, r) {
    this.i = 0, this.end = r, this.current = e, this.value = n;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
}
function oo() {
  return globalThis._VSCODE_NLS_MESSAGES;
}
function Zi() {
  return globalThis._VSCODE_NLS_LANGUAGE;
}
const ao = Zi() === "pseudo" || typeof document < "u" && document.location && typeof document.location.hash == "string" && document.location.hash.indexOf("pseudo=true") >= 0;
function lo(t, e) {
  let n;
  return e.length === 0 ? n = t : n = t.replace(/\{(\d+)\}/g, (r, i) => {
    const s = i[0], o = e[s];
    let l = r;
    return typeof o == "string" ? l = o : (typeof o == "number" || typeof o == "boolean" || o === void 0 || o === null) && (l = String(o)), l;
  }), ao && (n = "［" + n.replace(/[aouei]/g, "$&$&") + "］"), n;
}
function z(t, e, ...n) {
  return lo(typeof t == "number" ? uo(t, e) : e, n);
}
function uo(t, e) {
  var n;
  const r = (n = oo()) == null ? void 0 : n[t];
  if (typeof r != "string") {
    if (typeof e == "string")
      return e;
    throw new Error(`!!! NLS MISSING: ${t} !!!`);
  }
  return r;
}
const Ge = "en";
let en = !1, tn = !1, Vt = !1, Yi = !1, xn = !1, wt, yt = Ge, Bn = Ge, ho, Le;
const _e = globalThis;
let se;
var Un;
typeof _e.vscode < "u" && typeof _e.vscode.process < "u" ? se = _e.vscode.process : typeof process < "u" && typeof ((Un = process == null ? void 0 : process.versions) == null ? void 0 : Un.node) == "string" && (se = process);
var $n;
const co = typeof (($n = se == null ? void 0 : se.versions) == null ? void 0 : $n.electron) == "string", go = co && (se == null ? void 0 : se.type) === "renderer";
var zn;
if (typeof se == "object") {
  en = se.platform === "win32", tn = se.platform === "darwin", Vt = se.platform === "linux", Vt && se.env.SNAP && se.env.SNAP_REVISION, se.env.CI || se.env.BUILD_ARTIFACTSTAGINGDIRECTORY, wt = Ge, yt = Ge;
  const t = se.env.VSCODE_NLS_CONFIG;
  if (t)
    try {
      const e = JSON.parse(t);
      wt = e.userLocale, Bn = e.osLocale, yt = e.resolvedLanguage || Ge, ho = (zn = e.languagePack) == null ? void 0 : zn.translationsConfigFile;
    } catch {
    }
  Yi = !0;
} else typeof navigator == "object" && !go ? (Le = navigator.userAgent, en = Le.indexOf("Windows") >= 0, tn = Le.indexOf("Macintosh") >= 0, (Le.indexOf("Macintosh") >= 0 || Le.indexOf("iPad") >= 0 || Le.indexOf("iPhone") >= 0) && navigator.maxTouchPoints && navigator.maxTouchPoints > 0, Vt = Le.indexOf("Linux") >= 0, (Le == null ? void 0 : Le.indexOf("Mobi")) >= 0, xn = !0, yt = Zi() || Ge, wt = navigator.language.toLowerCase(), Bn = wt) : console.error("Unable to resolve platform.");
const et = en, mo = tn, fo = Yi, po = xn, bo = xn && typeof _e.importScripts == "function", wo = bo ? _e.origin : void 0, ve = Le, Se = yt;
var Wn;
(function(t) {
  function e() {
    return Se;
  }
  t.value = e;
  function n() {
    return Se.length === 2 ? Se === "en" : Se.length >= 3 ? Se[0] === "e" && Se[1] === "n" && Se[2] === "-" : !1;
  }
  t.isDefaultVariant = n;
  function r() {
    return Se === "en";
  }
  t.isDefault = r;
})(Wn || (Wn = {}));
const Lo = typeof _e.postMessage == "function" && !_e.importScripts;
(() => {
  if (Lo) {
    const t = [];
    _e.addEventListener("message", (n) => {
      if (n.data && n.data.vscodeScheduleAsyncWork)
        for (let r = 0, i = t.length; r < i; r++) {
          const s = t[r];
          if (s.id === n.data.vscodeScheduleAsyncWork) {
            t.splice(r, 1), s.callback();
            return;
          }
        }
    });
    let e = 0;
    return (n) => {
      const r = ++e;
      t.push({
        id: r,
        callback: n
      }), _e.postMessage({ vscodeScheduleAsyncWork: r }, "*");
    };
  }
  return (t) => setTimeout(t);
})();
const Co = !!(ve && ve.indexOf("Chrome") >= 0);
ve && ve.indexOf("Firefox") >= 0;
!Co && ve && ve.indexOf("Safari") >= 0;
ve && ve.indexOf("Edg/") >= 0;
ve && ve.indexOf("Android") >= 0;
const Qi = Object.freeze(function(t, e) {
  const n = setTimeout(t.bind(e), 0);
  return { dispose() {
    clearTimeout(n);
  } };
});
var kt;
(function(t) {
  function e(n) {
    return n === t.None || n === t.Cancelled || n instanceof _t ? !0 : !n || typeof n != "object" ? !1 : typeof n.isCancellationRequested == "boolean" && typeof n.onCancellationRequested == "function";
  }
  t.isCancellationToken = e, t.None = Object.freeze({
    isCancellationRequested: !1,
    onCancellationRequested: Mt.None
  }), t.Cancelled = Object.freeze({
    isCancellationRequested: !0,
    onCancellationRequested: Qi
  });
})(kt || (kt = {}));
class _t {
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
    return this._isCancelled ? Qi : (this._emitter || (this._emitter = new de()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
}
class vo {
  constructor(e) {
    this._token = void 0, this._parentListener = void 0, this._parentListener = e && e.onCancellationRequested(this.cancel, this);
  }
  get token() {
    return this._token || (this._token = new _t()), this._token;
  }
  cancel() {
    this._token ? this._token instanceof _t && this._token.cancel() : this._token = kt.Cancelled;
  }
  dispose(e = !1) {
    var n;
    e && this.cancel(), (n = this._parentListener) == null || n.dispose(), this._token ? this._token instanceof _t && this._token.dispose() : this._token = kt.None;
  }
}
function yo(t) {
  return t;
}
class _o {
  constructor(e, n) {
    this.lastCache = void 0, this.lastArgKey = void 0, typeof e == "function" ? (this._fn = e, this._computeKey = yo) : (this._fn = n, this._computeKey = e.getCacheKey);
  }
  get(e) {
    const n = this._computeKey(e);
    return this.lastArgKey !== n && (this.lastArgKey = n, this.lastCache = this._fn(e)), this.lastCache;
  }
}
class Hn {
  constructor(e) {
    this.executor = e, this._didRun = !1;
  }
  get hasValue() {
    return this._didRun;
  }
  get value() {
    if (!this._didRun)
      try {
        this._value = this.executor();
      } catch (e) {
        this._error = e;
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
function No(t) {
  return t.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
}
function An(t) {
  return t.split(/\r\n|\r|\n/);
}
function Eo(t) {
  for (let e = 0, n = t.length; e < n; e++) {
    const r = t.charCodeAt(e);
    if (r !== 32 && r !== 9)
      return e;
  }
  return -1;
}
function So(t, e = t.length - 1) {
  for (let n = e; n >= 0; n--) {
    const r = t.charCodeAt(n);
    if (r !== 32 && r !== 9)
      return n;
  }
  return -1;
}
function Ro(t, e) {
  return t < e ? -1 : t > e ? 1 : 0;
}
function xo(t, e, n = 0, r = t.length, i = 0, s = e.length) {
  for (; n < r && i < s; n++, i++) {
    const u = t.charCodeAt(n), h = e.charCodeAt(i);
    if (u < h)
      return -1;
    if (u > h)
      return 1;
  }
  const o = r - n, l = s - i;
  return o < l ? -1 : o > l ? 1 : 0;
}
function es(t, e, n = 0, r = t.length, i = 0, s = e.length) {
  for (; n < r && i < s; n++, i++) {
    let u = t.charCodeAt(n), h = e.charCodeAt(i);
    if (u === h)
      continue;
    if (u >= 128 || h >= 128)
      return xo(t.toLowerCase(), e.toLowerCase(), n, r, i, s);
    jn(u) && (u -= 32), jn(h) && (h -= 32);
    const c = u - h;
    if (c !== 0)
      return c;
  }
  const o = r - n, l = s - i;
  return o < l ? -1 : o > l ? 1 : 0;
}
function jn(t) {
  return t >= 97 && t <= 122;
}
function ts(t) {
  return t >= 65 && t <= 90;
}
function Ao(t, e) {
  return t.length === e.length && es(t, e) === 0;
}
function Mo(t, e) {
  const n = e.length;
  return e.length > t.length ? !1 : es(t, e, 0, n) === 0;
}
function Gn(t, e) {
  const n = Math.min(t.length, e.length);
  let r;
  for (r = 0; r < n; r++)
    if (t.charCodeAt(r) !== e.charCodeAt(r))
      return r;
  return n;
}
function ko(t, e) {
  const n = Math.min(t.length, e.length);
  let r;
  const i = t.length - 1, s = e.length - 1;
  for (r = 0; r < n; r++)
    if (t.charCodeAt(i - r) !== e.charCodeAt(s - r))
      return r;
  return n;
}
function nn(t) {
  return 55296 <= t && t <= 56319;
}
function To(t) {
  return 56320 <= t && t <= 57343;
}
function Po(t, e) {
  return (t - 55296 << 10) + (e - 56320) + 65536;
}
function Oo(t, e, n) {
  const r = t.charCodeAt(n);
  if (nn(r) && n + 1 < e) {
    const i = t.charCodeAt(n + 1);
    if (To(i))
      return Po(r, i);
  }
  return r;
}
const Io = /^[\t\n\r\x20-\x7E]*$/;
function Fo(t) {
  return Io.test(t);
}
const Ie = class rn {
  static getInstance(e) {
    return rn.cache.get(Array.from(e));
  }
  static getLocales() {
    return rn._locales.value;
  }
  constructor(e) {
    this.confusableDictionary = e;
  }
  isAmbiguous(e) {
    return this.confusableDictionary.has(e);
  }
  containsAmbiguousCharacter(e) {
    for (let n = 0; n < e.length; n++) {
      const r = e.codePointAt(n);
      if (typeof r == "number" && this.isAmbiguous(r))
        return !0;
    }
    return !1;
  }
  getPrimaryConfusable(e) {
    return this.confusableDictionary.get(e);
  }
  getConfusableCodePoints() {
    return new Set(this.confusableDictionary.keys());
  }
};
Ie.ambiguousCharacterData = new Hn(() => JSON.parse('{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}')), Ie.cache = new _o({ getCacheKey: JSON.stringify }, (t) => {
  function e(h) {
    const c = /* @__PURE__ */ new Map();
    for (let d = 0; d < h.length; d += 2)
      c.set(h[d], h[d + 1]);
    return c;
  }
  function n(h, c) {
    const d = new Map(h);
    for (const [g, m] of c)
      d.set(g, m);
    return d;
  }
  function r(h, c) {
    if (!h)
      return c;
    const d = /* @__PURE__ */ new Map();
    for (const [g, m] of h)
      c.has(g) && d.set(g, m);
    return d;
  }
  const i = Ie.ambiguousCharacterData.value;
  let s = t.filter((h) => !h.startsWith("_") && h in i);
  s.length === 0 && (s = ["_default"]);
  let o;
  for (const h of s) {
    const c = e(i[h]);
    o = r(o, c);
  }
  const l = e(i._common), u = n(l, o);
  return new Ie(u);
}), Ie._locales = new Hn(() => Object.keys(Ie.ambiguousCharacterData.value).filter((t) => !t.startsWith("_")));
let sn = Ie;
const ns = class ot {
  static getRawData() {
    return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]");
  }
  static getData() {
    return this._data || (this._data = new Set(ot.getRawData())), this._data;
  }
  static isInvisibleCharacter(e) {
    return ot.getData().has(e);
  }
  static containsInvisibleCharacter(e) {
    for (let n = 0; n < e.length; n++) {
      const r = e.codePointAt(n);
      if (typeof r == "number" && ot.isInvisibleCharacter(r))
        return !0;
    }
    return !1;
  }
  static get codePoints() {
    return ot.getData();
  }
};
ns._data = void 0;
let Bt = ns;
const Ut = "default", Do = "$initialize";
class qo {
  constructor(e, n, r, i, s) {
    this.vsWorker = e, this.req = n, this.channel = r, this.method = i, this.args = s, this.type = 0;
  }
}
class Xn {
  constructor(e, n, r, i) {
    this.vsWorker = e, this.seq = n, this.res = r, this.err = i, this.type = 1;
  }
}
class Ko {
  constructor(e, n, r, i, s) {
    this.vsWorker = e, this.req = n, this.channel = r, this.eventName = i, this.arg = s, this.type = 2;
  }
}
class Vo {
  constructor(e, n, r) {
    this.vsWorker = e, this.req = n, this.event = r, this.type = 3;
  }
}
class Bo {
  constructor(e, n) {
    this.vsWorker = e, this.req = n, this.type = 4;
  }
}
class Uo {
  constructor(e) {
    this._workerId = -1, this._handler = e, this._lastSentReq = 0, this._pendingReplies = /* @__PURE__ */ Object.create(null), this._pendingEmitters = /* @__PURE__ */ new Map(), this._pendingEvents = /* @__PURE__ */ new Map();
  }
  setWorkerId(e) {
    this._workerId = e;
  }
  sendMessage(e, n, r) {
    const i = String(++this._lastSentReq);
    return new Promise((s, o) => {
      this._pendingReplies[i] = {
        resolve: s,
        reject: o
      }, this._send(new qo(this._workerId, i, e, n, r));
    });
  }
  listen(e, n, r) {
    let i = null;
    const s = new de({
      onWillAddFirstListener: () => {
        i = String(++this._lastSentReq), this._pendingEmitters.set(i, s), this._send(new Ko(this._workerId, i, e, n, r));
      },
      onDidRemoveLastListener: () => {
        this._pendingEmitters.delete(i), this._send(new Bo(this._workerId, i)), i = null;
      }
    });
    return s.event;
  }
  handleMessage(e) {
    !e || !e.vsWorker || this._workerId !== -1 && e.vsWorker !== this._workerId || this._handleMessage(e);
  }
  createProxyToRemoteChannel(e, n) {
    const r = {
      get: (i, s) => (typeof s == "string" && !i[s] && (is(s) ? i[s] = (o) => this.listen(e, s, o) : rs(s) ? i[s] = this.listen(e, s, void 0) : s.charCodeAt(0) === 36 && (i[s] = async (...o) => (await (n == null ? void 0 : n()), this.sendMessage(e, s, o)))), i[s])
    };
    return new Proxy(/* @__PURE__ */ Object.create(null), r);
  }
  _handleMessage(e) {
    switch (e.type) {
      case 1:
        return this._handleReplyMessage(e);
      case 0:
        return this._handleRequestMessage(e);
      case 2:
        return this._handleSubscribeEventMessage(e);
      case 3:
        return this._handleEventMessage(e);
      case 4:
        return this._handleUnsubscribeEventMessage(e);
    }
  }
  _handleReplyMessage(e) {
    if (!this._pendingReplies[e.seq]) {
      console.warn("Got reply to unknown seq");
      return;
    }
    const n = this._pendingReplies[e.seq];
    if (delete this._pendingReplies[e.seq], e.err) {
      let r = e.err;
      e.err.$isError && (r = new Error(), r.name = e.err.name, r.message = e.err.message, r.stack = e.err.stack), n.reject(r);
      return;
    }
    n.resolve(e.res);
  }
  _handleRequestMessage(e) {
    const n = e.req;
    this._handler.handleMessage(e.channel, e.method, e.args).then((r) => {
      this._send(new Xn(this._workerId, n, r, void 0));
    }, (r) => {
      r.detail instanceof Error && (r.detail = Dn(r.detail)), this._send(new Xn(this._workerId, n, void 0, Dn(r)));
    });
  }
  _handleSubscribeEventMessage(e) {
    const n = e.req, r = this._handler.handleEvent(e.channel, e.eventName, e.arg)((i) => {
      this._send(new Vo(this._workerId, n, i));
    });
    this._pendingEvents.set(n, r);
  }
  _handleEventMessage(e) {
    if (!this._pendingEmitters.has(e.req)) {
      console.warn("Got event for unknown req");
      return;
    }
    this._pendingEmitters.get(e.req).fire(e.event);
  }
  _handleUnsubscribeEventMessage(e) {
    if (!this._pendingEvents.has(e.req)) {
      console.warn("Got unsubscribe for unknown req");
      return;
    }
    this._pendingEvents.get(e.req).dispose(), this._pendingEvents.delete(e.req);
  }
  _send(e) {
    const n = [];
    if (e.type === 0)
      for (let r = 0; r < e.args.length; r++)
        e.args[r] instanceof ArrayBuffer && n.push(e.args[r]);
    else e.type === 1 && e.res instanceof ArrayBuffer && n.push(e.res);
    this._handler.sendMessage(e, n);
  }
}
function rs(t) {
  return t[0] === "o" && t[1] === "n" && ts(t.charCodeAt(2));
}
function is(t) {
  return /^onDynamic/.test(t) && ts(t.charCodeAt(9));
}
class $o {
  constructor(e, n) {
    this._localChannels = /* @__PURE__ */ new Map(), this._remoteChannels = /* @__PURE__ */ new Map(), this._requestHandlerFactory = n, this._requestHandler = null, this._protocol = new Uo({
      sendMessage: (r, i) => {
        e(r, i);
      },
      handleMessage: (r, i, s) => this._handleMessage(r, i, s),
      handleEvent: (r, i, s) => this._handleEvent(r, i, s)
    });
  }
  onmessage(e) {
    this._protocol.handleMessage(e);
  }
  _handleMessage(e, n, r) {
    if (e === Ut && n === Do)
      return this.initialize(r[0], r[1], r[2]);
    const i = e === Ut ? this._requestHandler : this._localChannels.get(e);
    if (!i)
      return Promise.reject(new Error(`Missing channel ${e} on worker thread`));
    if (typeof i[n] != "function")
      return Promise.reject(new Error(`Missing method ${n} on worker thread channel ${e}`));
    try {
      return Promise.resolve(i[n].apply(i, r));
    } catch (s) {
      return Promise.reject(s);
    }
  }
  _handleEvent(e, n, r) {
    const i = e === Ut ? this._requestHandler : this._localChannels.get(e);
    if (!i)
      throw new Error(`Missing channel ${e} on worker thread`);
    if (is(n)) {
      const s = i[n].call(i, r);
      if (typeof s != "function")
        throw new Error(`Missing dynamic event ${n} on request handler.`);
      return s;
    }
    if (rs(n)) {
      const s = i[n];
      if (typeof s != "function")
        throw new Error(`Missing event ${n} on request handler.`);
      return s;
    }
    throw new Error(`Malformed event name ${n}`);
  }
  setChannel(e, n) {
    this._localChannels.set(e, n);
  }
  getChannel(e) {
    if (!this._remoteChannels.has(e)) {
      const n = this._protocol.createProxyToRemoteChannel(e);
      this._remoteChannels.set(e, n);
    }
    return this._remoteChannels.get(e);
  }
  async initialize(e, n, r) {
    if (this._protocol.setWorkerId(e), this._requestHandlerFactory) {
      this._requestHandler = this._requestHandlerFactory(this);
      return;
    }
    return n && (typeof n.baseUrl < "u" && delete n.baseUrl, typeof n.paths < "u" && typeof n.paths.vs < "u" && delete n.paths.vs, typeof n.trustedTypesPolicy < "u" && delete n.trustedTypesPolicy, n.catchError = !0, globalThis.require.config(n)), Promise.reject(new Error("Unexpected usage"));
  }
}
class Me {
  constructor(e, n, r, i) {
    this.originalStart = e, this.originalLength = n, this.modifiedStart = r, this.modifiedLength = i;
  }
  getOriginalEnd() {
    return this.originalStart + this.originalLength;
  }
  getModifiedEnd() {
    return this.modifiedStart + this.modifiedLength;
  }
}
function Jn(t, e) {
  return (e << 5) - e + t | 0;
}
function zo(t, e) {
  e = Jn(149417, e);
  for (let n = 0, r = t.length; n < r; n++)
    e = Jn(t.charCodeAt(n), e);
  return e;
}
class Zn {
  constructor(e) {
    this.source = e;
  }
  getElements() {
    const e = this.source, n = new Int32Array(e.length);
    for (let r = 0, i = e.length; r < i; r++)
      n[r] = e.charCodeAt(r);
    return n;
  }
}
function Wo(t, e, n) {
  return new ke(new Zn(t), new Zn(e)).ComputeDiff(n).changes;
}
class Ue {
  static Assert(e, n) {
    if (!e)
      throw new Error(n);
  }
}
class $e {
  static Copy(e, n, r, i, s) {
    for (let o = 0; o < s; o++)
      r[i + o] = e[n + o];
  }
  static Copy2(e, n, r, i, s) {
    for (let o = 0; o < s; o++)
      r[i + o] = e[n + o];
  }
}
class Yn {
  constructor() {
    this.m_changes = [], this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824, this.m_originalCount = 0, this.m_modifiedCount = 0;
  }
  MarkNextChange() {
    (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.m_changes.push(new Me(
      this.m_originalStart,
      this.m_originalCount,
      this.m_modifiedStart,
      this.m_modifiedCount
    )), this.m_originalCount = 0, this.m_modifiedCount = 0, this.m_originalStart = 1073741824, this.m_modifiedStart = 1073741824;
  }
  AddOriginalElement(e, n) {
    this.m_originalStart = Math.min(this.m_originalStart, e), this.m_modifiedStart = Math.min(this.m_modifiedStart, n), this.m_originalCount++;
  }
  AddModifiedElement(e, n) {
    this.m_originalStart = Math.min(this.m_originalStart, e), this.m_modifiedStart = Math.min(this.m_modifiedStart, n), this.m_modifiedCount++;
  }
  getChanges() {
    return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes;
  }
  getReverseChanges() {
    return (this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(), this.m_changes.reverse(), this.m_changes;
  }
}
class ke {
  constructor(e, n, r = null) {
    this.ContinueProcessingPredicate = r, this._originalSequence = e, this._modifiedSequence = n;
    const [i, s, o] = ke._getElements(e), [l, u, h] = ke._getElements(n);
    this._hasStrings = o && h, this._originalStringElements = i, this._originalElementsOrHash = s, this._modifiedStringElements = l, this._modifiedElementsOrHash = u, this.m_forwardHistory = [], this.m_reverseHistory = [];
  }
  static _isStringArray(e) {
    return e.length > 0 && typeof e[0] == "string";
  }
  static _getElements(e) {
    const n = e.getElements();
    if (ke._isStringArray(n)) {
      const r = new Int32Array(n.length);
      for (let i = 0, s = n.length; i < s; i++)
        r[i] = zo(n[i], 0);
      return [n, r, !0];
    }
    return n instanceof Int32Array ? [[], n, !1] : [[], new Int32Array(n), !1];
  }
  ElementsAreEqual(e, n) {
    return this._originalElementsOrHash[e] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[e] === this._modifiedStringElements[n] : !0;
  }
  ElementsAreStrictEqual(e, n) {
    if (!this.ElementsAreEqual(e, n))
      return !1;
    const r = ke._getStrictElement(this._originalSequence, e), i = ke._getStrictElement(this._modifiedSequence, n);
    return r === i;
  }
  static _getStrictElement(e, n) {
    return typeof e.getStrictElement == "function" ? e.getStrictElement(n) : null;
  }
  OriginalElementsAreEqual(e, n) {
    return this._originalElementsOrHash[e] !== this._originalElementsOrHash[n] ? !1 : this._hasStrings ? this._originalStringElements[e] === this._originalStringElements[n] : !0;
  }
  ModifiedElementsAreEqual(e, n) {
    return this._modifiedElementsOrHash[e] !== this._modifiedElementsOrHash[n] ? !1 : this._hasStrings ? this._modifiedStringElements[e] === this._modifiedStringElements[n] : !0;
  }
  ComputeDiff(e) {
    return this._ComputeDiff(0, this._originalElementsOrHash.length - 1, 0, this._modifiedElementsOrHash.length - 1, e);
  }
  _ComputeDiff(e, n, r, i, s) {
    const o = [!1];
    let l = this.ComputeDiffRecursive(e, n, r, i, o);
    return s && (l = this.PrettifyChanges(l)), {
      quitEarly: o[0],
      changes: l
    };
  }
  ComputeDiffRecursive(e, n, r, i, s) {
    for (s[0] = !1; e <= n && r <= i && this.ElementsAreEqual(e, r); )
      e++, r++;
    for (; n >= e && i >= r && this.ElementsAreEqual(n, i); )
      n--, i--;
    if (e > n || r > i) {
      let d;
      return r <= i ? (Ue.Assert(e === n + 1, "originalStart should only be one more than originalEnd"), d = [
        new Me(e, 0, r, i - r + 1)
      ]) : e <= n ? (Ue.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), d = [
        new Me(e, n - e + 1, r, 0)
      ]) : (Ue.Assert(e === n + 1, "originalStart should only be one more than originalEnd"), Ue.Assert(r === i + 1, "modifiedStart should only be one more than modifiedEnd"), d = []), d;
    }
    const o = [0], l = [0], u = this.ComputeRecursionPoint(e, n, r, i, o, l, s), h = o[0], c = l[0];
    if (u !== null)
      return u;
    if (!s[0]) {
      const d = this.ComputeDiffRecursive(e, h, r, c, s);
      let g = [];
      return s[0] ? g = [
        new Me(
          h + 1,
          n - (h + 1) + 1,
          c + 1,
          i - (c + 1) + 1
        )
      ] : g = this.ComputeDiffRecursive(h + 1, n, c + 1, i, s), this.ConcatenateChanges(d, g);
    }
    return [
      new Me(
        e,
        n - e + 1,
        r,
        i - r + 1
      )
    ];
  }
  WALKTRACE(e, n, r, i, s, o, l, u, h, c, d, g, m, f, p, C, v, L) {
    let _ = null, b = null, w = new Yn(), y = n, S = r, O = m[0] - C[0] - i, K = -1073741824, ie = this.m_forwardHistory.length - 1;
    do {
      const A = O + e;
      A === y || A < S && h[A - 1] < h[A + 1] ? (d = h[A + 1], f = d - O - i, d < K && w.MarkNextChange(), K = d, w.AddModifiedElement(d + 1, f), O = A + 1 - e) : (d = h[A - 1] + 1, f = d - O - i, d < K && w.MarkNextChange(), K = d - 1, w.AddOriginalElement(d, f + 1), O = A - 1 - e), ie >= 0 && (h = this.m_forwardHistory[ie], e = h[0], y = 1, S = h.length - 1);
    } while (--ie >= -1);
    if (_ = w.getReverseChanges(), L[0]) {
      let A = m[0] + 1, we = C[0] + 1;
      if (_ !== null && _.length > 0) {
        const x = _[_.length - 1];
        A = Math.max(A, x.getOriginalEnd()), we = Math.max(we, x.getModifiedEnd());
      }
      b = [
        new Me(
          A,
          g - A + 1,
          we,
          p - we + 1
        )
      ];
    } else {
      w = new Yn(), y = o, S = l, O = m[0] - C[0] - u, K = 1073741824, ie = v ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
      do {
        const A = O + s;
        A === y || A < S && c[A - 1] >= c[A + 1] ? (d = c[A + 1] - 1, f = d - O - u, d > K && w.MarkNextChange(), K = d + 1, w.AddOriginalElement(d + 1, f + 1), O = A + 1 - s) : (d = c[A - 1], f = d - O - u, d > K && w.MarkNextChange(), K = d, w.AddModifiedElement(d + 1, f + 1), O = A - 1 - s), ie >= 0 && (c = this.m_reverseHistory[ie], s = c[0], y = 1, S = c.length - 1);
      } while (--ie >= -1);
      b = w.getChanges();
    }
    return this.ConcatenateChanges(_, b);
  }
  ComputeRecursionPoint(e, n, r, i, s, o, l) {
    let u = 0, h = 0, c = 0, d = 0, g = 0, m = 0;
    e--, r--, s[0] = 0, o[0] = 0, this.m_forwardHistory = [], this.m_reverseHistory = [];
    const f = n - e + (i - r), p = f + 1, C = new Int32Array(p), v = new Int32Array(p), L = i - r, _ = n - e, b = e - r, w = n - i, y = (_ - L) % 2 === 0;
    C[L] = e, v[_] = n, l[0] = !1;
    for (let S = 1; S <= f / 2 + 1; S++) {
      let O = 0, K = 0;
      c = this.ClipDiagonalBound(L - S, S, L, p), d = this.ClipDiagonalBound(L + S, S, L, p);
      for (let A = c; A <= d; A += 2) {
        A === c || A < d && C[A - 1] < C[A + 1] ? u = C[A + 1] : u = C[A - 1] + 1, h = u - (A - L) - b;
        const we = u;
        for (; u < n && h < i && this.ElementsAreEqual(u + 1, h + 1); )
          u++, h++;
        if (C[A] = u, u + h > O + K && (O = u, K = h), !y && Math.abs(A - _) <= S - 1 && u >= v[A])
          return s[0] = u, o[0] = h, we <= v[A] && S <= 1448 ? this.WALKTRACE(L, c, d, b, _, g, m, w, C, v, u, n, s, h, i, o, y, l) : null;
      }
      const ie = (O - e + (K - r) - S) / 2;
      if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(O, ie))
        return l[0] = !0, s[0] = O, o[0] = K, ie > 0 && S <= 1448 ? this.WALKTRACE(L, c, d, b, _, g, m, w, C, v, u, n, s, h, i, o, y, l) : (e++, r++, [
          new Me(
            e,
            n - e + 1,
            r,
            i - r + 1
          )
        ]);
      g = this.ClipDiagonalBound(_ - S, S, _, p), m = this.ClipDiagonalBound(_ + S, S, _, p);
      for (let A = g; A <= m; A += 2) {
        A === g || A < m && v[A - 1] >= v[A + 1] ? u = v[A + 1] - 1 : u = v[A - 1], h = u - (A - _) - w;
        const we = u;
        for (; u > e && h > r && this.ElementsAreEqual(u, h); )
          u--, h--;
        if (v[A] = u, y && Math.abs(A - L) <= S && u <= C[A])
          return s[0] = u, o[0] = h, we >= C[A] && S <= 1448 ? this.WALKTRACE(L, c, d, b, _, g, m, w, C, v, u, n, s, h, i, o, y, l) : null;
      }
      if (S <= 1447) {
        let A = new Int32Array(d - c + 2);
        A[0] = L - c + 1, $e.Copy2(C, c, A, 1, d - c + 1), this.m_forwardHistory.push(A), A = new Int32Array(m - g + 2), A[0] = _ - g + 1, $e.Copy2(v, g, A, 1, m - g + 1), this.m_reverseHistory.push(A);
      }
    }
    return this.WALKTRACE(L, c, d, b, _, g, m, w, C, v, u, n, s, h, i, o, y, l);
  }
  PrettifyChanges(e) {
    for (let n = 0; n < e.length; n++) {
      const r = e[n], i = n < e.length - 1 ? e[n + 1].originalStart : this._originalElementsOrHash.length, s = n < e.length - 1 ? e[n + 1].modifiedStart : this._modifiedElementsOrHash.length, o = r.originalLength > 0, l = r.modifiedLength > 0;
      for (; r.originalStart + r.originalLength < i && r.modifiedStart + r.modifiedLength < s && (!o || this.OriginalElementsAreEqual(r.originalStart, r.originalStart + r.originalLength)) && (!l || this.ModifiedElementsAreEqual(r.modifiedStart, r.modifiedStart + r.modifiedLength)); ) {
        const h = this.ElementsAreStrictEqual(r.originalStart, r.modifiedStart);
        if (this.ElementsAreStrictEqual(r.originalStart + r.originalLength, r.modifiedStart + r.modifiedLength) && !h)
          break;
        r.originalStart++, r.modifiedStart++;
      }
      const u = [null];
      if (n < e.length - 1 && this.ChangesOverlap(e[n], e[n + 1], u)) {
        e[n] = u[0], e.splice(n + 1, 1), n--;
        continue;
      }
    }
    for (let n = e.length - 1; n >= 0; n--) {
      const r = e[n];
      let i = 0, s = 0;
      if (n > 0) {
        const d = e[n - 1];
        i = d.originalStart + d.originalLength, s = d.modifiedStart + d.modifiedLength;
      }
      const o = r.originalLength > 0, l = r.modifiedLength > 0;
      let u = 0, h = this._boundaryScore(r.originalStart, r.originalLength, r.modifiedStart, r.modifiedLength);
      for (let d = 1; ; d++) {
        const g = r.originalStart - d, m = r.modifiedStart - d;
        if (g < i || m < s || o && !this.OriginalElementsAreEqual(g, g + r.originalLength) || l && !this.ModifiedElementsAreEqual(m, m + r.modifiedLength))
          break;
        const f = (g === i && m === s ? 5 : 0) + this._boundaryScore(g, r.originalLength, m, r.modifiedLength);
        f > h && (h = f, u = d);
      }
      r.originalStart -= u, r.modifiedStart -= u;
      const c = [null];
      if (n > 0 && this.ChangesOverlap(e[n - 1], e[n], c)) {
        e[n - 1] = c[0], e.splice(n, 1), n++;
        continue;
      }
    }
    if (this._hasStrings)
      for (let n = 1, r = e.length; n < r; n++) {
        const i = e[n - 1], s = e[n], o = s.originalStart - i.originalStart - i.originalLength, l = i.originalStart, u = s.originalStart + s.originalLength, h = u - l, c = i.modifiedStart, d = s.modifiedStart + s.modifiedLength, g = d - c;
        if (o < 5 && h < 20 && g < 20) {
          const m = this._findBetterContiguousSequence(l, h, c, g, o);
          if (m) {
            const [f, p] = m;
            (f !== i.originalStart + i.originalLength || p !== i.modifiedStart + i.modifiedLength) && (i.originalLength = f - i.originalStart, i.modifiedLength = p - i.modifiedStart, s.originalStart = f + o, s.modifiedStart = p + o, s.originalLength = u - s.originalStart, s.modifiedLength = d - s.modifiedStart);
          }
        }
      }
    return e;
  }
  _findBetterContiguousSequence(e, n, r, i, s) {
    if (n < s || i < s)
      return null;
    const o = e + n - s + 1, l = r + i - s + 1;
    let u = 0, h = 0, c = 0;
    for (let d = e; d < o; d++)
      for (let g = r; g < l; g++) {
        const m = this._contiguousSequenceScore(d, g, s);
        m > 0 && m > u && (u = m, h = d, c = g);
      }
    return u > 0 ? [h, c] : null;
  }
  _contiguousSequenceScore(e, n, r) {
    let i = 0;
    for (let s = 0; s < r; s++) {
      if (!this.ElementsAreEqual(e + s, n + s))
        return 0;
      i += this._originalStringElements[e + s].length;
    }
    return i;
  }
  _OriginalIsBoundary(e) {
    return e <= 0 || e >= this._originalElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._originalStringElements[e]);
  }
  _OriginalRegionIsBoundary(e, n) {
    if (this._OriginalIsBoundary(e) || this._OriginalIsBoundary(e - 1))
      return !0;
    if (n > 0) {
      const r = e + n;
      if (this._OriginalIsBoundary(r - 1) || this._OriginalIsBoundary(r))
        return !0;
    }
    return !1;
  }
  _ModifiedIsBoundary(e) {
    return e <= 0 || e >= this._modifiedElementsOrHash.length - 1 ? !0 : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[e]);
  }
  _ModifiedRegionIsBoundary(e, n) {
    if (this._ModifiedIsBoundary(e) || this._ModifiedIsBoundary(e - 1))
      return !0;
    if (n > 0) {
      const r = e + n;
      if (this._ModifiedIsBoundary(r - 1) || this._ModifiedIsBoundary(r))
        return !0;
    }
    return !1;
  }
  _boundaryScore(e, n, r, i) {
    const s = this._OriginalRegionIsBoundary(e, n) ? 1 : 0, o = this._ModifiedRegionIsBoundary(r, i) ? 1 : 0;
    return s + o;
  }
  ConcatenateChanges(e, n) {
    const r = [];
    if (e.length === 0 || n.length === 0)
      return n.length > 0 ? n : e;
    if (this.ChangesOverlap(e[e.length - 1], n[0], r)) {
      const i = new Array(e.length + n.length - 1);
      return $e.Copy(e, 0, i, 0, e.length - 1), i[e.length - 1] = r[0], $e.Copy(n, 1, i, e.length, n.length - 1), i;
    } else {
      const i = new Array(e.length + n.length);
      return $e.Copy(e, 0, i, 0, e.length), $e.Copy(n, 0, i, e.length, n.length), i;
    }
  }
  ChangesOverlap(e, n, r) {
    if (Ue.Assert(e.originalStart <= n.originalStart, "Left change is not less than or equal to right change"), Ue.Assert(e.modifiedStart <= n.modifiedStart, "Left change is not less than or equal to right change"), e.originalStart + e.originalLength >= n.originalStart || e.modifiedStart + e.modifiedLength >= n.modifiedStart) {
      const i = e.originalStart;
      let s = e.originalLength;
      const o = e.modifiedStart;
      let l = e.modifiedLength;
      return e.originalStart + e.originalLength >= n.originalStart && (s = n.originalStart + n.originalLength - e.originalStart), e.modifiedStart + e.modifiedLength >= n.modifiedStart && (l = n.modifiedStart + n.modifiedLength - e.modifiedStart), r[0] = new Me(i, s, o, l), !0;
    } else
      return r[0] = null, !1;
  }
  ClipDiagonalBound(e, n, r, i) {
    if (e >= 0 && e < i)
      return e;
    const s = r, o = i - r - 1, l = n % 2 === 0;
    if (e < 0) {
      const u = s % 2 === 0;
      return l === u ? 0 : 1;
    } else {
      const u = o % 2 === 0;
      return l === u ? i - 1 : i - 2;
    }
  }
}
class F {
  constructor(e, n) {
    this.lineNumber = e, this.column = n;
  }
  with(e = this.lineNumber, n = this.column) {
    return e === this.lineNumber && n === this.column ? this : new F(e, n);
  }
  delta(e = 0, n = 0) {
    return this.with(this.lineNumber + e, this.column + n);
  }
  equals(e) {
    return F.equals(this, e);
  }
  static equals(e, n) {
    return !e && !n ? !0 : !!e && !!n && e.lineNumber === n.lineNumber && e.column === n.column;
  }
  isBefore(e) {
    return F.isBefore(this, e);
  }
  static isBefore(e, n) {
    return e.lineNumber < n.lineNumber ? !0 : n.lineNumber < e.lineNumber ? !1 : e.column < n.column;
  }
  isBeforeOrEqual(e) {
    return F.isBeforeOrEqual(this, e);
  }
  static isBeforeOrEqual(e, n) {
    return e.lineNumber < n.lineNumber ? !0 : n.lineNumber < e.lineNumber ? !1 : e.column <= n.column;
  }
  static compare(e, n) {
    const r = e.lineNumber | 0, i = n.lineNumber | 0;
    if (r === i) {
      const s = e.column | 0, o = n.column | 0;
      return s - o;
    }
    return r - i;
  }
  clone() {
    return new F(this.lineNumber, this.column);
  }
  toString() {
    return "(" + this.lineNumber + "," + this.column + ")";
  }
  static lift(e) {
    return new F(e.lineNumber, e.column);
  }
  static isIPosition(e) {
    return e && typeof e.lineNumber == "number" && typeof e.column == "number";
  }
  toJSON() {
    return {
      lineNumber: this.lineNumber,
      column: this.column
    };
  }
}
class E {
  constructor(e, n, r, i) {
    e > r || e === r && n > i ? (this.startLineNumber = r, this.startColumn = i, this.endLineNumber = e, this.endColumn = n) : (this.startLineNumber = e, this.startColumn = n, this.endLineNumber = r, this.endColumn = i);
  }
  isEmpty() {
    return E.isEmpty(this);
  }
  static isEmpty(e) {
    return e.startLineNumber === e.endLineNumber && e.startColumn === e.endColumn;
  }
  containsPosition(e) {
    return E.containsPosition(this, e);
  }
  static containsPosition(e, n) {
    return !(n.lineNumber < e.startLineNumber || n.lineNumber > e.endLineNumber || n.lineNumber === e.startLineNumber && n.column < e.startColumn || n.lineNumber === e.endLineNumber && n.column > e.endColumn);
  }
  static strictContainsPosition(e, n) {
    return !(n.lineNumber < e.startLineNumber || n.lineNumber > e.endLineNumber || n.lineNumber === e.startLineNumber && n.column <= e.startColumn || n.lineNumber === e.endLineNumber && n.column >= e.endColumn);
  }
  containsRange(e) {
    return E.containsRange(this, e);
  }
  static containsRange(e, n) {
    return !(n.startLineNumber < e.startLineNumber || n.endLineNumber < e.startLineNumber || n.startLineNumber > e.endLineNumber || n.endLineNumber > e.endLineNumber || n.startLineNumber === e.startLineNumber && n.startColumn < e.startColumn || n.endLineNumber === e.endLineNumber && n.endColumn > e.endColumn);
  }
  strictContainsRange(e) {
    return E.strictContainsRange(this, e);
  }
  static strictContainsRange(e, n) {
    return !(n.startLineNumber < e.startLineNumber || n.endLineNumber < e.startLineNumber || n.startLineNumber > e.endLineNumber || n.endLineNumber > e.endLineNumber || n.startLineNumber === e.startLineNumber && n.startColumn <= e.startColumn || n.endLineNumber === e.endLineNumber && n.endColumn >= e.endColumn);
  }
  plusRange(e) {
    return E.plusRange(this, e);
  }
  static plusRange(e, n) {
    let r, i, s, o;
    return n.startLineNumber < e.startLineNumber ? (r = n.startLineNumber, i = n.startColumn) : n.startLineNumber === e.startLineNumber ? (r = n.startLineNumber, i = Math.min(n.startColumn, e.startColumn)) : (r = e.startLineNumber, i = e.startColumn), n.endLineNumber > e.endLineNumber ? (s = n.endLineNumber, o = n.endColumn) : n.endLineNumber === e.endLineNumber ? (s = n.endLineNumber, o = Math.max(n.endColumn, e.endColumn)) : (s = e.endLineNumber, o = e.endColumn), new E(r, i, s, o);
  }
  intersectRanges(e) {
    return E.intersectRanges(this, e);
  }
  static intersectRanges(e, n) {
    let r = e.startLineNumber, i = e.startColumn, s = e.endLineNumber, o = e.endColumn;
    const l = n.startLineNumber, u = n.startColumn, h = n.endLineNumber, c = n.endColumn;
    return r < l ? (r = l, i = u) : r === l && (i = Math.max(i, u)), s > h ? (s = h, o = c) : s === h && (o = Math.min(o, c)), r > s || r === s && i > o ? null : new E(
      r,
      i,
      s,
      o
    );
  }
  equalsRange(e) {
    return E.equalsRange(this, e);
  }
  static equalsRange(e, n) {
    return !e && !n ? !0 : !!e && !!n && e.startLineNumber === n.startLineNumber && e.startColumn === n.startColumn && e.endLineNumber === n.endLineNumber && e.endColumn === n.endColumn;
  }
  getEndPosition() {
    return E.getEndPosition(this);
  }
  static getEndPosition(e) {
    return new F(e.endLineNumber, e.endColumn);
  }
  getStartPosition() {
    return E.getStartPosition(this);
  }
  static getStartPosition(e) {
    return new F(e.startLineNumber, e.startColumn);
  }
  toString() {
    return "[" + this.startLineNumber + "," + this.startColumn + " -> " + this.endLineNumber + "," + this.endColumn + "]";
  }
  setEndPosition(e, n) {
    return new E(this.startLineNumber, this.startColumn, e, n);
  }
  setStartPosition(e, n) {
    return new E(e, n, this.endLineNumber, this.endColumn);
  }
  collapseToStart() {
    return E.collapseToStart(this);
  }
  static collapseToStart(e) {
    return new E(
      e.startLineNumber,
      e.startColumn,
      e.startLineNumber,
      e.startColumn
    );
  }
  collapseToEnd() {
    return E.collapseToEnd(this);
  }
  static collapseToEnd(e) {
    return new E(e.endLineNumber, e.endColumn, e.endLineNumber, e.endColumn);
  }
  delta(e) {
    return new E(
      this.startLineNumber + e,
      this.startColumn,
      this.endLineNumber + e,
      this.endColumn
    );
  }
  static fromPositions(e, n = e) {
    return new E(e.lineNumber, e.column, n.lineNumber, n.column);
  }
  static lift(e) {
    return e ? new E(
      e.startLineNumber,
      e.startColumn,
      e.endLineNumber,
      e.endColumn
    ) : null;
  }
  static isIRange(e) {
    return e && typeof e.startLineNumber == "number" && typeof e.startColumn == "number" && typeof e.endLineNumber == "number" && typeof e.endColumn == "number";
  }
  static areIntersectingOrTouching(e, n) {
    return !(e.endLineNumber < n.startLineNumber || e.endLineNumber === n.startLineNumber && e.endColumn < n.startColumn || n.endLineNumber < e.startLineNumber || n.endLineNumber === e.startLineNumber && n.endColumn < e.startColumn);
  }
  static areIntersecting(e, n) {
    return !(e.endLineNumber < n.startLineNumber || e.endLineNumber === n.startLineNumber && e.endColumn <= n.startColumn || n.endLineNumber < e.startLineNumber || n.endLineNumber === e.startLineNumber && n.endColumn <= e.startColumn);
  }
  static compareRangesUsingStarts(e, n) {
    if (e && n) {
      const r = e.startLineNumber | 0, i = n.startLineNumber | 0;
      if (r === i) {
        const s = e.startColumn | 0, o = n.startColumn | 0;
        if (s === o) {
          const l = e.endLineNumber | 0, u = n.endLineNumber | 0;
          if (l === u) {
            const h = e.endColumn | 0, c = n.endColumn | 0;
            return h - c;
          }
          return l - u;
        }
        return s - o;
      }
      return r - i;
    }
    return (e ? 1 : 0) - (n ? 1 : 0);
  }
  static compareRangesUsingEnds(e, n) {
    return e.endLineNumber === n.endLineNumber ? e.endColumn === n.endColumn ? e.startLineNumber === n.startLineNumber ? e.startColumn - n.startColumn : e.startLineNumber - n.startLineNumber : e.endColumn - n.endColumn : e.endLineNumber - n.endLineNumber;
  }
  static spansMultipleLines(e) {
    return e.endLineNumber > e.startLineNumber;
  }
  toJSON() {
    return this;
  }
}
function Qn(t) {
  return t < 0 ? 0 : t > 255 ? 255 : t | 0;
}
function ze(t) {
  return t < 0 ? 0 : t > 4294967295 ? 4294967295 : t | 0;
}
class Mn {
  constructor(e) {
    const n = Qn(e);
    this._defaultValue = n, this._asciiMap = Mn._createAsciiMap(n), this._map = /* @__PURE__ */ new Map();
  }
  static _createAsciiMap(e) {
    const n = new Uint8Array(256);
    return n.fill(e), n;
  }
  set(e, n) {
    const r = Qn(n);
    e >= 0 && e < 256 ? this._asciiMap[e] = r : this._map.set(e, r);
  }
  get(e) {
    return e >= 0 && e < 256 ? this._asciiMap[e] : this._map.get(e) || this._defaultValue;
  }
  clear() {
    this._asciiMap.fill(this._defaultValue), this._map.clear();
  }
}
class Ho {
  constructor(e, n, r) {
    const i = new Uint8Array(e * n);
    for (let s = 0, o = e * n; s < o; s++)
      i[s] = r;
    this._data = i, this.rows = e, this.cols = n;
  }
  get(e, n) {
    return this._data[e * this.cols + n];
  }
  set(e, n, r) {
    this._data[e * this.cols + n] = r;
  }
}
class jo {
  constructor(e) {
    let n = 0, r = 0;
    for (let s = 0, o = e.length; s < o; s++) {
      const [l, u, h] = e[s];
      u > n && (n = u), l > r && (r = l), h > r && (r = h);
    }
    n++, r++;
    const i = new Ho(r, n, 0);
    for (let s = 0, o = e.length; s < o; s++) {
      const [l, u, h] = e[s];
      i.set(l, u, h);
    }
    this._states = i, this._maxCharCode = n;
  }
  nextState(e, n) {
    return n < 0 || n >= this._maxCharCode ? 0 : this._states.get(e, n);
  }
}
let $t = null;
function Go() {
  return $t === null && ($t = new jo([
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
  ])), $t;
}
let nt = null;
function Xo() {
  if (nt === null) {
    nt = new Mn(0);
    const t = ` 	<>'"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…`;
    for (let n = 0; n < t.length; n++)
      nt.set(t.charCodeAt(n), 1);
    const e = ".,;:";
    for (let n = 0; n < e.length; n++)
      nt.set(e.charCodeAt(n), 2);
  }
  return nt;
}
class Tt {
  static _createLink(e, n, r, i, s) {
    let o = s - 1;
    do {
      const l = n.charCodeAt(o);
      if (e.get(l) !== 2)
        break;
      o--;
    } while (o > i);
    if (i > 0) {
      const l = n.charCodeAt(i - 1), u = n.charCodeAt(o);
      (l === 40 && u === 41 || l === 91 && u === 93 || l === 123 && u === 125) && o--;
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
  static computeLinks(e, n = Go()) {
    const r = Xo(), i = [];
    for (let s = 1, o = e.getLineCount(); s <= o; s++) {
      const l = e.getLineContent(s), u = l.length;
      let h = 0, c = 0, d = 0, g = 1, m = !1, f = !1, p = !1, C = !1;
      for (; h < u; ) {
        let v = !1;
        const L = l.charCodeAt(h);
        if (g === 13) {
          let _;
          switch (L) {
            case 40:
              m = !0, _ = 0;
              break;
            case 41:
              _ = m ? 0 : 1;
              break;
            case 91:
              p = !0, f = !0, _ = 0;
              break;
            case 93:
              p = !1, _ = f ? 0 : 1;
              break;
            case 123:
              C = !0, _ = 0;
              break;
            case 125:
              _ = C ? 0 : 1;
              break;
            case 39:
            case 34:
            case 96:
              d === L ? _ = 1 : d === 39 || d === 34 || d === 96 ? _ = 0 : _ = 1;
              break;
            case 42:
              _ = d === 42 ? 1 : 0;
              break;
            case 124:
              _ = d === 124 ? 1 : 0;
              break;
            case 32:
              _ = p ? 0 : 1;
              break;
            default:
              _ = r.get(L);
          }
          _ === 1 && (i.push(Tt._createLink(r, l, s, c, h)), v = !0);
        } else if (g === 12) {
          let _;
          L === 91 ? (f = !0, _ = 0) : _ = r.get(L), _ === 1 ? v = !0 : g = 13;
        } else
          g = n.nextState(g, L), g === 0 && (v = !0);
        v && (g = 1, m = !1, f = !1, C = !1, c = h + 1, d = L), h++;
      }
      g === 13 && i.push(Tt._createLink(r, l, s, c, u));
    }
    return i;
  }
}
function Jo(t) {
  return !t || typeof t.getLineCount != "function" || typeof t.getLineContent != "function" ? [] : Tt.computeLinks(t);
}
const on = class {
  constructor() {
    this._defaultValueSet = [
      ["true", "false"],
      ["True", "False"],
      ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"],
      ["public", "protected", "private"]
    ];
  }
  navigateValueSet(e, n, r, i, s) {
    if (e && n) {
      const o = this.doNavigateValueSet(n, s);
      if (o)
        return {
          range: e,
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
  doNavigateValueSet(e, n) {
    const r = this.numberReplace(e, n);
    return r !== null ? r : this.textReplace(e, n);
  }
  numberReplace(e, n) {
    const r = Math.pow(10, e.length - (e.lastIndexOf(".") + 1));
    let i = Number(e);
    const s = parseFloat(e);
    return !isNaN(i) && !isNaN(s) && i === s ? i === 0 && !n ? null : (i = Math.floor(i * r), i += n ? r : -r, String(i / r)) : null;
  }
  textReplace(e, n) {
    return this.valueSetsReplace(this._defaultValueSet, e, n);
  }
  valueSetsReplace(e, n, r) {
    let i = null;
    for (let s = 0, o = e.length; i === null && s < o; s++)
      i = this.valueSetReplace(e[s], n, r);
    return i;
  }
  valueSetReplace(e, n, r) {
    let i = e.indexOf(n);
    return i >= 0 ? (i += r ? 1 : -1, i < 0 ? i = e.length - 1 : i %= e.length, e[i]) : null;
  }
};
on.INSTANCE = new on();
let Zo = on;
class kn {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(e, n) {
    this._keyCodeToStr[e] = n, this._strToKeyCode[n.toLowerCase()] = e;
  }
  keyCodeToStr(e) {
    return this._keyCodeToStr[e];
  }
  strToKeyCode(e) {
    return this._strToKeyCode[e.toLowerCase()] || 0;
  }
}
const Nt = new kn(), an = new kn(), ln = new kn(), Yo = new Array(230), Qo = /* @__PURE__ */ Object.create(null), ea = /* @__PURE__ */ Object.create(null);
(function() {
  const t = "", e = [
    [1, 0, "None", 0, "unknown", 0, "VK_UNKNOWN", t, t],
    [1, 1, "Hyper", 0, t, 0, t, t, t],
    [1, 2, "Super", 0, t, 0, t, t, t],
    [1, 3, "Fn", 0, t, 0, t, t, t],
    [1, 4, "FnLock", 0, t, 0, t, t, t],
    [1, 5, "Suspend", 0, t, 0, t, t, t],
    [1, 6, "Resume", 0, t, 0, t, t, t],
    [1, 7, "Turbo", 0, t, 0, t, t, t],
    [1, 8, "Sleep", 0, t, 0, "VK_SLEEP", t, t],
    [1, 9, "WakeUp", 0, t, 0, t, t, t],
    [0, 10, "KeyA", 31, "A", 65, "VK_A", t, t],
    [0, 11, "KeyB", 32, "B", 66, "VK_B", t, t],
    [0, 12, "KeyC", 33, "C", 67, "VK_C", t, t],
    [0, 13, "KeyD", 34, "D", 68, "VK_D", t, t],
    [0, 14, "KeyE", 35, "E", 69, "VK_E", t, t],
    [0, 15, "KeyF", 36, "F", 70, "VK_F", t, t],
    [0, 16, "KeyG", 37, "G", 71, "VK_G", t, t],
    [0, 17, "KeyH", 38, "H", 72, "VK_H", t, t],
    [0, 18, "KeyI", 39, "I", 73, "VK_I", t, t],
    [0, 19, "KeyJ", 40, "J", 74, "VK_J", t, t],
    [0, 20, "KeyK", 41, "K", 75, "VK_K", t, t],
    [0, 21, "KeyL", 42, "L", 76, "VK_L", t, t],
    [0, 22, "KeyM", 43, "M", 77, "VK_M", t, t],
    [0, 23, "KeyN", 44, "N", 78, "VK_N", t, t],
    [0, 24, "KeyO", 45, "O", 79, "VK_O", t, t],
    [0, 25, "KeyP", 46, "P", 80, "VK_P", t, t],
    [0, 26, "KeyQ", 47, "Q", 81, "VK_Q", t, t],
    [0, 27, "KeyR", 48, "R", 82, "VK_R", t, t],
    [0, 28, "KeyS", 49, "S", 83, "VK_S", t, t],
    [0, 29, "KeyT", 50, "T", 84, "VK_T", t, t],
    [0, 30, "KeyU", 51, "U", 85, "VK_U", t, t],
    [0, 31, "KeyV", 52, "V", 86, "VK_V", t, t],
    [0, 32, "KeyW", 53, "W", 87, "VK_W", t, t],
    [0, 33, "KeyX", 54, "X", 88, "VK_X", t, t],
    [0, 34, "KeyY", 55, "Y", 89, "VK_Y", t, t],
    [0, 35, "KeyZ", 56, "Z", 90, "VK_Z", t, t],
    [0, 36, "Digit1", 22, "1", 49, "VK_1", t, t],
    [0, 37, "Digit2", 23, "2", 50, "VK_2", t, t],
    [0, 38, "Digit3", 24, "3", 51, "VK_3", t, t],
    [0, 39, "Digit4", 25, "4", 52, "VK_4", t, t],
    [0, 40, "Digit5", 26, "5", 53, "VK_5", t, t],
    [0, 41, "Digit6", 27, "6", 54, "VK_6", t, t],
    [0, 42, "Digit7", 28, "7", 55, "VK_7", t, t],
    [0, 43, "Digit8", 29, "8", 56, "VK_8", t, t],
    [0, 44, "Digit9", 30, "9", 57, "VK_9", t, t],
    [0, 45, "Digit0", 21, "0", 48, "VK_0", t, t],
    [1, 46, "Enter", 3, "Enter", 13, "VK_RETURN", t, t],
    [1, 47, "Escape", 9, "Escape", 27, "VK_ESCAPE", t, t],
    [1, 48, "Backspace", 1, "Backspace", 8, "VK_BACK", t, t],
    [1, 49, "Tab", 2, "Tab", 9, "VK_TAB", t, t],
    [1, 50, "Space", 10, "Space", 32, "VK_SPACE", t, t],
    [0, 51, "Minus", 88, "-", 189, "VK_OEM_MINUS", "-", "OEM_MINUS"],
    [0, 52, "Equal", 86, "=", 187, "VK_OEM_PLUS", "=", "OEM_PLUS"],
    [0, 53, "BracketLeft", 92, "[", 219, "VK_OEM_4", "[", "OEM_4"],
    [0, 54, "BracketRight", 94, "]", 221, "VK_OEM_6", "]", "OEM_6"],
    [0, 55, "Backslash", 93, "\\", 220, "VK_OEM_5", "\\", "OEM_5"],
    [0, 56, "IntlHash", 0, t, 0, t, t, t],
    [0, 57, "Semicolon", 85, ";", 186, "VK_OEM_1", ";", "OEM_1"],
    [0, 58, "Quote", 95, "'", 222, "VK_OEM_7", "'", "OEM_7"],
    [0, 59, "Backquote", 91, "`", 192, "VK_OEM_3", "`", "OEM_3"],
    [0, 60, "Comma", 87, ",", 188, "VK_OEM_COMMA", ",", "OEM_COMMA"],
    [0, 61, "Period", 89, ".", 190, "VK_OEM_PERIOD", ".", "OEM_PERIOD"],
    [0, 62, "Slash", 90, "/", 191, "VK_OEM_2", "/", "OEM_2"],
    [1, 63, "CapsLock", 8, "CapsLock", 20, "VK_CAPITAL", t, t],
    [1, 64, "F1", 59, "F1", 112, "VK_F1", t, t],
    [1, 65, "F2", 60, "F2", 113, "VK_F2", t, t],
    [1, 66, "F3", 61, "F3", 114, "VK_F3", t, t],
    [1, 67, "F4", 62, "F4", 115, "VK_F4", t, t],
    [1, 68, "F5", 63, "F5", 116, "VK_F5", t, t],
    [1, 69, "F6", 64, "F6", 117, "VK_F6", t, t],
    [1, 70, "F7", 65, "F7", 118, "VK_F7", t, t],
    [1, 71, "F8", 66, "F8", 119, "VK_F8", t, t],
    [1, 72, "F9", 67, "F9", 120, "VK_F9", t, t],
    [1, 73, "F10", 68, "F10", 121, "VK_F10", t, t],
    [1, 74, "F11", 69, "F11", 122, "VK_F11", t, t],
    [1, 75, "F12", 70, "F12", 123, "VK_F12", t, t],
    [1, 76, "PrintScreen", 0, t, 0, t, t, t],
    [1, 77, "ScrollLock", 84, "ScrollLock", 145, "VK_SCROLL", t, t],
    [1, 78, "Pause", 7, "PauseBreak", 19, "VK_PAUSE", t, t],
    [1, 79, "Insert", 19, "Insert", 45, "VK_INSERT", t, t],
    [1, 80, "Home", 14, "Home", 36, "VK_HOME", t, t],
    [1, 81, "PageUp", 11, "PageUp", 33, "VK_PRIOR", t, t],
    [1, 82, "Delete", 20, "Delete", 46, "VK_DELETE", t, t],
    [1, 83, "End", 13, "End", 35, "VK_END", t, t],
    [1, 84, "PageDown", 12, "PageDown", 34, "VK_NEXT", t, t],
    [1, 85, "ArrowRight", 17, "RightArrow", 39, "VK_RIGHT", "Right", t],
    [1, 86, "ArrowLeft", 15, "LeftArrow", 37, "VK_LEFT", "Left", t],
    [1, 87, "ArrowDown", 18, "DownArrow", 40, "VK_DOWN", "Down", t],
    [1, 88, "ArrowUp", 16, "UpArrow", 38, "VK_UP", "Up", t],
    [1, 89, "NumLock", 83, "NumLock", 144, "VK_NUMLOCK", t, t],
    [1, 90, "NumpadDivide", 113, "NumPad_Divide", 111, "VK_DIVIDE", t, t],
    [1, 91, "NumpadMultiply", 108, "NumPad_Multiply", 106, "VK_MULTIPLY", t, t],
    [1, 92, "NumpadSubtract", 111, "NumPad_Subtract", 109, "VK_SUBTRACT", t, t],
    [1, 93, "NumpadAdd", 109, "NumPad_Add", 107, "VK_ADD", t, t],
    [1, 94, "NumpadEnter", 3, t, 0, t, t, t],
    [1, 95, "Numpad1", 99, "NumPad1", 97, "VK_NUMPAD1", t, t],
    [1, 96, "Numpad2", 100, "NumPad2", 98, "VK_NUMPAD2", t, t],
    [1, 97, "Numpad3", 101, "NumPad3", 99, "VK_NUMPAD3", t, t],
    [1, 98, "Numpad4", 102, "NumPad4", 100, "VK_NUMPAD4", t, t],
    [1, 99, "Numpad5", 103, "NumPad5", 101, "VK_NUMPAD5", t, t],
    [1, 100, "Numpad6", 104, "NumPad6", 102, "VK_NUMPAD6", t, t],
    [1, 101, "Numpad7", 105, "NumPad7", 103, "VK_NUMPAD7", t, t],
    [1, 102, "Numpad8", 106, "NumPad8", 104, "VK_NUMPAD8", t, t],
    [1, 103, "Numpad9", 107, "NumPad9", 105, "VK_NUMPAD9", t, t],
    [1, 104, "Numpad0", 98, "NumPad0", 96, "VK_NUMPAD0", t, t],
    [1, 105, "NumpadDecimal", 112, "NumPad_Decimal", 110, "VK_DECIMAL", t, t],
    [0, 106, "IntlBackslash", 97, "OEM_102", 226, "VK_OEM_102", t, t],
    [1, 107, "ContextMenu", 58, "ContextMenu", 93, t, t, t],
    [1, 108, "Power", 0, t, 0, t, t, t],
    [1, 109, "NumpadEqual", 0, t, 0, t, t, t],
    [1, 110, "F13", 71, "F13", 124, "VK_F13", t, t],
    [1, 111, "F14", 72, "F14", 125, "VK_F14", t, t],
    [1, 112, "F15", 73, "F15", 126, "VK_F15", t, t],
    [1, 113, "F16", 74, "F16", 127, "VK_F16", t, t],
    [1, 114, "F17", 75, "F17", 128, "VK_F17", t, t],
    [1, 115, "F18", 76, "F18", 129, "VK_F18", t, t],
    [1, 116, "F19", 77, "F19", 130, "VK_F19", t, t],
    [1, 117, "F20", 78, "F20", 131, "VK_F20", t, t],
    [1, 118, "F21", 79, "F21", 132, "VK_F21", t, t],
    [1, 119, "F22", 80, "F22", 133, "VK_F22", t, t],
    [1, 120, "F23", 81, "F23", 134, "VK_F23", t, t],
    [1, 121, "F24", 82, "F24", 135, "VK_F24", t, t],
    [1, 122, "Open", 0, t, 0, t, t, t],
    [1, 123, "Help", 0, t, 0, t, t, t],
    [1, 124, "Select", 0, t, 0, t, t, t],
    [1, 125, "Again", 0, t, 0, t, t, t],
    [1, 126, "Undo", 0, t, 0, t, t, t],
    [1, 127, "Cut", 0, t, 0, t, t, t],
    [1, 128, "Copy", 0, t, 0, t, t, t],
    [1, 129, "Paste", 0, t, 0, t, t, t],
    [1, 130, "Find", 0, t, 0, t, t, t],
    [1, 131, "AudioVolumeMute", 117, "AudioVolumeMute", 173, "VK_VOLUME_MUTE", t, t],
    [1, 132, "AudioVolumeUp", 118, "AudioVolumeUp", 175, "VK_VOLUME_UP", t, t],
    [1, 133, "AudioVolumeDown", 119, "AudioVolumeDown", 174, "VK_VOLUME_DOWN", t, t],
    [1, 134, "NumpadComma", 110, "NumPad_Separator", 108, "VK_SEPARATOR", t, t],
    [0, 135, "IntlRo", 115, "ABNT_C1", 193, "VK_ABNT_C1", t, t],
    [1, 136, "KanaMode", 0, t, 0, t, t, t],
    [0, 137, "IntlYen", 0, t, 0, t, t, t],
    [1, 138, "Convert", 0, t, 0, t, t, t],
    [1, 139, "NonConvert", 0, t, 0, t, t, t],
    [1, 140, "Lang1", 0, t, 0, t, t, t],
    [1, 141, "Lang2", 0, t, 0, t, t, t],
    [1, 142, "Lang3", 0, t, 0, t, t, t],
    [1, 143, "Lang4", 0, t, 0, t, t, t],
    [1, 144, "Lang5", 0, t, 0, t, t, t],
    [1, 145, "Abort", 0, t, 0, t, t, t],
    [1, 146, "Props", 0, t, 0, t, t, t],
    [1, 147, "NumpadParenLeft", 0, t, 0, t, t, t],
    [1, 148, "NumpadParenRight", 0, t, 0, t, t, t],
    [1, 149, "NumpadBackspace", 0, t, 0, t, t, t],
    [1, 150, "NumpadMemoryStore", 0, t, 0, t, t, t],
    [1, 151, "NumpadMemoryRecall", 0, t, 0, t, t, t],
    [1, 152, "NumpadMemoryClear", 0, t, 0, t, t, t],
    [1, 153, "NumpadMemoryAdd", 0, t, 0, t, t, t],
    [1, 154, "NumpadMemorySubtract", 0, t, 0, t, t, t],
    [1, 155, "NumpadClear", 131, "Clear", 12, "VK_CLEAR", t, t],
    [1, 156, "NumpadClearEntry", 0, t, 0, t, t, t],
    [1, 0, t, 5, "Ctrl", 17, "VK_CONTROL", t, t],
    [1, 0, t, 4, "Shift", 16, "VK_SHIFT", t, t],
    [1, 0, t, 6, "Alt", 18, "VK_MENU", t, t],
    [1, 0, t, 57, "Meta", 91, "VK_COMMAND", t, t],
    [1, 157, "ControlLeft", 5, t, 0, "VK_LCONTROL", t, t],
    [1, 158, "ShiftLeft", 4, t, 0, "VK_LSHIFT", t, t],
    [1, 159, "AltLeft", 6, t, 0, "VK_LMENU", t, t],
    [1, 160, "MetaLeft", 57, t, 0, "VK_LWIN", t, t],
    [1, 161, "ControlRight", 5, t, 0, "VK_RCONTROL", t, t],
    [1, 162, "ShiftRight", 4, t, 0, "VK_RSHIFT", t, t],
    [1, 163, "AltRight", 6, t, 0, "VK_RMENU", t, t],
    [1, 164, "MetaRight", 57, t, 0, "VK_RWIN", t, t],
    [1, 165, "BrightnessUp", 0, t, 0, t, t, t],
    [1, 166, "BrightnessDown", 0, t, 0, t, t, t],
    [1, 167, "MediaPlay", 0, t, 0, t, t, t],
    [1, 168, "MediaRecord", 0, t, 0, t, t, t],
    [1, 169, "MediaFastForward", 0, t, 0, t, t, t],
    [1, 170, "MediaRewind", 0, t, 0, t, t, t],
    [1, 171, "MediaTrackNext", 124, "MediaTrackNext", 176, "VK_MEDIA_NEXT_TRACK", t, t],
    [1, 172, "MediaTrackPrevious", 125, "MediaTrackPrevious", 177, "VK_MEDIA_PREV_TRACK", t, t],
    [1, 173, "MediaStop", 126, "MediaStop", 178, "VK_MEDIA_STOP", t, t],
    [1, 174, "Eject", 0, t, 0, t, t, t],
    [1, 175, "MediaPlayPause", 127, "MediaPlayPause", 179, "VK_MEDIA_PLAY_PAUSE", t, t],
    [1, 176, "MediaSelect", 128, "LaunchMediaPlayer", 181, "VK_MEDIA_LAUNCH_MEDIA_SELECT", t, t],
    [1, 177, "LaunchMail", 129, "LaunchMail", 180, "VK_MEDIA_LAUNCH_MAIL", t, t],
    [1, 178, "LaunchApp2", 130, "LaunchApp2", 183, "VK_MEDIA_LAUNCH_APP2", t, t],
    [1, 179, "LaunchApp1", 0, t, 0, "VK_MEDIA_LAUNCH_APP1", t, t],
    [1, 180, "SelectTask", 0, t, 0, t, t, t],
    [1, 181, "LaunchScreenSaver", 0, t, 0, t, t, t],
    [1, 182, "BrowserSearch", 120, "BrowserSearch", 170, "VK_BROWSER_SEARCH", t, t],
    [1, 183, "BrowserHome", 121, "BrowserHome", 172, "VK_BROWSER_HOME", t, t],
    [1, 184, "BrowserBack", 122, "BrowserBack", 166, "VK_BROWSER_BACK", t, t],
    [1, 185, "BrowserForward", 123, "BrowserForward", 167, "VK_BROWSER_FORWARD", t, t],
    [1, 186, "BrowserStop", 0, t, 0, "VK_BROWSER_STOP", t, t],
    [1, 187, "BrowserRefresh", 0, t, 0, "VK_BROWSER_REFRESH", t, t],
    [1, 188, "BrowserFavorites", 0, t, 0, "VK_BROWSER_FAVORITES", t, t],
    [1, 189, "ZoomToggle", 0, t, 0, t, t, t],
    [1, 190, "MailReply", 0, t, 0, t, t, t],
    [1, 191, "MailForward", 0, t, 0, t, t, t],
    [1, 192, "MailSend", 0, t, 0, t, t, t],
    [1, 0, t, 114, "KeyInComposition", 229, t, t, t],
    [1, 0, t, 116, "ABNT_C2", 194, "VK_ABNT_C2", t, t],
    [1, 0, t, 96, "OEM_8", 223, "VK_OEM_8", t, t],
    [1, 0, t, 0, t, 0, "VK_KANA", t, t],
    [1, 0, t, 0, t, 0, "VK_HANGUL", t, t],
    [1, 0, t, 0, t, 0, "VK_JUNJA", t, t],
    [1, 0, t, 0, t, 0, "VK_FINAL", t, t],
    [1, 0, t, 0, t, 0, "VK_HANJA", t, t],
    [1, 0, t, 0, t, 0, "VK_KANJI", t, t],
    [1, 0, t, 0, t, 0, "VK_CONVERT", t, t],
    [1, 0, t, 0, t, 0, "VK_NONCONVERT", t, t],
    [1, 0, t, 0, t, 0, "VK_ACCEPT", t, t],
    [1, 0, t, 0, t, 0, "VK_MODECHANGE", t, t],
    [1, 0, t, 0, t, 0, "VK_SELECT", t, t],
    [1, 0, t, 0, t, 0, "VK_PRINT", t, t],
    [1, 0, t, 0, t, 0, "VK_EXECUTE", t, t],
    [1, 0, t, 0, t, 0, "VK_SNAPSHOT", t, t],
    [1, 0, t, 0, t, 0, "VK_HELP", t, t],
    [1, 0, t, 0, t, 0, "VK_APPS", t, t],
    [1, 0, t, 0, t, 0, "VK_PROCESSKEY", t, t],
    [1, 0, t, 0, t, 0, "VK_PACKET", t, t],
    [1, 0, t, 0, t, 0, "VK_DBE_SBCSCHAR", t, t],
    [1, 0, t, 0, t, 0, "VK_DBE_DBCSCHAR", t, t],
    [1, 0, t, 0, t, 0, "VK_ATTN", t, t],
    [1, 0, t, 0, t, 0, "VK_CRSEL", t, t],
    [1, 0, t, 0, t, 0, "VK_EXSEL", t, t],
    [1, 0, t, 0, t, 0, "VK_EREOF", t, t],
    [1, 0, t, 0, t, 0, "VK_PLAY", t, t],
    [1, 0, t, 0, t, 0, "VK_ZOOM", t, t],
    [1, 0, t, 0, t, 0, "VK_NONAME", t, t],
    [1, 0, t, 0, t, 0, "VK_PA1", t, t],
    [1, 0, t, 0, t, 0, "VK_OEM_CLEAR", t, t]
  ], n = [], r = [];
  for (const i of e) {
    const [s, o, l, u, h, c, d, g, m] = i;
    if (r[o] || (r[o] = !0, Qo[l] = o, ea[l.toLowerCase()] = o), !n[u]) {
      if (n[u] = !0, !h)
        throw new Error(
          `String representation missing for key code ${u} around scan code ${l}`
        );
      Nt.define(u, h), an.define(u, g || h), ln.define(u, m || g || h);
    }
    c && (Yo[c] = u);
  }
})();
var er;
(function(t) {
  function e(l) {
    return Nt.keyCodeToStr(l);
  }
  t.toString = e;
  function n(l) {
    return Nt.strToKeyCode(l);
  }
  t.fromString = n;
  function r(l) {
    return an.keyCodeToStr(l);
  }
  t.toUserSettingsUS = r;
  function i(l) {
    return ln.keyCodeToStr(l);
  }
  t.toUserSettingsGeneral = i;
  function s(l) {
    return an.strToKeyCode(l) || ln.strToKeyCode(l);
  }
  t.fromUserSettings = s;
  function o(l) {
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
    return Nt.keyCodeToStr(l);
  }
  t.toElectronAccelerator = o;
})(er || (er = {}));
function ta(t, e) {
  const n = (e & 65535) << 16 >>> 0;
  return (t | n) >>> 0;
}
let qe;
const zt = globalThis.vscode;
var tr;
if (typeof zt < "u" && typeof zt.process < "u") {
  const t = zt.process;
  qe = {
    get platform() {
      return t.platform;
    },
    get arch() {
      return t.arch;
    },
    get env() {
      return t.env;
    },
    cwd() {
      return t.cwd();
    }
  };
} else typeof process < "u" && typeof ((tr = process == null ? void 0 : process.versions) == null ? void 0 : tr.node) == "string" ? qe = {
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
} : qe = {
  get platform() {
    return et ? "win32" : mo ? "darwin" : "linux";
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
const Pt = qe.cwd, na = qe.env, ra = qe.platform;
qe.arch;
const ia = 65, sa = 97, oa = 90, aa = 122, Pe = 46, Q = 47, ae = 92, Re = 58, la = 63;
class ss extends Error {
  constructor(e, n, r) {
    let i;
    typeof n == "string" && n.indexOf("not ") === 0 ? (i = "must not be", n = n.replace(/^not /, "")) : i = "must be";
    const s = e.indexOf(".") !== -1 ? "property" : "argument";
    let o = `The "${e}" ${s} ${i} of type ${n}`;
    o += `. Received type ${typeof r}`, super(o), this.code = "ERR_INVALID_ARG_TYPE";
  }
}
function ua(t, e) {
  if (t === null || typeof t != "object")
    throw new ss(e, "Object", t);
}
function G(t, e) {
  if (typeof t != "string")
    throw new ss(e, "string", t);
}
const fe = ra === "win32";
function D(t) {
  return t === Q || t === ae;
}
function un(t) {
  return t === Q;
}
function xe(t) {
  return t >= ia && t <= oa || t >= sa && t <= aa;
}
function Ot(t, e, n, r) {
  let i = "", s = 0, o = -1, l = 0, u = 0;
  for (let h = 0; h <= t.length; ++h) {
    if (h < t.length)
      u = t.charCodeAt(h);
    else {
      if (r(u))
        break;
      u = Q;
    }
    if (r(u)) {
      if (!(o === h - 1 || l === 1)) if (l === 2) {
        if (i.length < 2 || s !== 2 || i.charCodeAt(i.length - 1) !== Pe || i.charCodeAt(i.length - 2) !== Pe) {
          if (i.length > 2) {
            const c = i.lastIndexOf(n);
            c === -1 ? (i = "", s = 0) : (i = i.slice(0, c), s = i.length - 1 - i.lastIndexOf(n)), o = h, l = 0;
            continue;
          } else if (i.length !== 0) {
            i = "", s = 0, o = h, l = 0;
            continue;
          }
        }
        e && (i += i.length > 0 ? `${n}..` : "..", s = 2);
      } else
        i.length > 0 ? i += `${n}${t.slice(o + 1, h)}` : i = t.slice(o + 1, h), s = h - o - 1;
      o = h, l = 0;
    } else u === Pe && l !== -1 ? ++l : l = -1;
  }
  return i;
}
function ha(t) {
  return t ? `${t[0] === "." ? "" : "."}${t}` : "";
}
function os(t, e) {
  ua(e, "pathObject");
  const n = e.dir || e.root, r = e.base || `${e.name || ""}${ha(e.ext)}`;
  return n ? n === e.root ? `${n}${r}` : `${n}${t}${r}` : r;
}
const Y = {
  resolve(...t) {
    let e = "", n = "", r = !1;
    for (let i = t.length - 1; i >= -1; i--) {
      let s;
      if (i >= 0) {
        if (s = t[i], G(s, `paths[${i}]`), s.length === 0)
          continue;
      } else e.length === 0 ? s = Pt() : (s = na[`=${e}`] || Pt(), (s === void 0 || s.slice(0, 2).toLowerCase() !== e.toLowerCase() && s.charCodeAt(2) === ae) && (s = `${e}\\`));
      const o = s.length;
      let l = 0, u = "", h = !1;
      const c = s.charCodeAt(0);
      if (o === 1)
        D(c) && (l = 1, h = !0);
      else if (D(c))
        if (h = !0, D(s.charCodeAt(1))) {
          let d = 2, g = d;
          for (; d < o && !D(s.charCodeAt(d)); )
            d++;
          if (d < o && d !== g) {
            const m = s.slice(g, d);
            for (g = d; d < o && D(s.charCodeAt(d)); )
              d++;
            if (d < o && d !== g) {
              for (g = d; d < o && !D(s.charCodeAt(d)); )
                d++;
              (d === o || d !== g) && (u = `\\\\${m}\\${s.slice(g, d)}`, l = d);
            }
          }
        } else
          l = 1;
      else xe(c) && s.charCodeAt(1) === Re && (u = s.slice(0, 2), l = 2, o > 2 && D(s.charCodeAt(2)) && (h = !0, l = 3));
      if (u.length > 0)
        if (e.length > 0) {
          if (u.toLowerCase() !== e.toLowerCase())
            continue;
        } else
          e = u;
      if (r) {
        if (e.length > 0)
          break;
      } else if (n = `${s.slice(l)}\\${n}`, r = h, h && e.length > 0)
        break;
    }
    return n = Ot(n, !r, "\\", D), r ? `${e}\\${n}` : `${e}${n}` || ".";
  },
  normalize(t) {
    G(t, "path");
    const e = t.length;
    if (e === 0)
      return ".";
    let n = 0, r, i = !1;
    const s = t.charCodeAt(0);
    if (e === 1)
      return un(s) ? "\\" : t;
    if (D(s))
      if (i = !0, D(t.charCodeAt(1))) {
        let l = 2, u = l;
        for (; l < e && !D(t.charCodeAt(l)); )
          l++;
        if (l < e && l !== u) {
          const h = t.slice(u, l);
          for (u = l; l < e && D(t.charCodeAt(l)); )
            l++;
          if (l < e && l !== u) {
            for (u = l; l < e && !D(t.charCodeAt(l)); )
              l++;
            if (l === e)
              return `\\\\${h}\\${t.slice(u)}\\`;
            l !== u && (r = `\\\\${h}\\${t.slice(u, l)}`, n = l);
          }
        }
      } else
        n = 1;
    else xe(s) && t.charCodeAt(1) === Re && (r = t.slice(0, 2), n = 2, e > 2 && D(t.charCodeAt(2)) && (i = !0, n = 3));
    let o = n < e ? Ot(t.slice(n), !i, "\\", D) : "";
    return o.length === 0 && !i && (o = "."), o.length > 0 && D(t.charCodeAt(e - 1)) && (o += "\\"), r === void 0 ? i ? `\\${o}` : o : i ? `${r}\\${o}` : `${r}${o}`;
  },
  isAbsolute(t) {
    G(t, "path");
    const e = t.length;
    if (e === 0)
      return !1;
    const n = t.charCodeAt(0);
    return D(n) || e > 2 && xe(n) && t.charCodeAt(1) === Re && D(t.charCodeAt(2));
  },
  join(...t) {
    if (t.length === 0)
      return ".";
    let e, n;
    for (let s = 0; s < t.length; ++s) {
      const o = t[s];
      G(o, "path"), o.length > 0 && (e === void 0 ? e = n = o : e += `\\${o}`);
    }
    if (e === void 0)
      return ".";
    let r = !0, i = 0;
    if (typeof n == "string" && D(n.charCodeAt(0))) {
      ++i;
      const s = n.length;
      s > 1 && D(n.charCodeAt(1)) && (++i, s > 2 && (D(n.charCodeAt(2)) ? ++i : r = !1));
    }
    if (r) {
      for (; i < e.length && D(e.charCodeAt(i)); )
        i++;
      i >= 2 && (e = `\\${e.slice(i)}`);
    }
    return Y.normalize(e);
  },
  relative(t, e) {
    if (G(t, "from"), G(e, "to"), t === e)
      return "";
    const n = Y.resolve(t), r = Y.resolve(e);
    if (n === r || (t = n.toLowerCase(), e = r.toLowerCase(), t === e))
      return "";
    let i = 0;
    for (; i < t.length && t.charCodeAt(i) === ae; )
      i++;
    let s = t.length;
    for (; s - 1 > i && t.charCodeAt(s - 1) === ae; )
      s--;
    const o = s - i;
    let l = 0;
    for (; l < e.length && e.charCodeAt(l) === ae; )
      l++;
    let u = e.length;
    for (; u - 1 > l && e.charCodeAt(u - 1) === ae; )
      u--;
    const h = u - l, c = o < h ? o : h;
    let d = -1, g = 0;
    for (; g < c; g++) {
      const f = t.charCodeAt(i + g);
      if (f !== e.charCodeAt(l + g))
        break;
      f === ae && (d = g);
    }
    if (g !== c) {
      if (d === -1)
        return r;
    } else {
      if (h > c) {
        if (e.charCodeAt(l + g) === ae)
          return r.slice(l + g + 1);
        if (g === 2)
          return r.slice(l + g);
      }
      o > c && (t.charCodeAt(i + g) === ae ? d = g : g === 2 && (d = 3)), d === -1 && (d = 0);
    }
    let m = "";
    for (g = i + d + 1; g <= s; ++g)
      (g === s || t.charCodeAt(g) === ae) && (m += m.length === 0 ? ".." : "\\..");
    return l += d, m.length > 0 ? `${m}${r.slice(l, u)}` : (r.charCodeAt(l) === ae && ++l, r.slice(l, u));
  },
  toNamespacedPath(t) {
    if (typeof t != "string" || t.length === 0)
      return t;
    const e = Y.resolve(t);
    if (e.length <= 2)
      return t;
    if (e.charCodeAt(0) === ae) {
      if (e.charCodeAt(1) === ae) {
        const n = e.charCodeAt(2);
        if (n !== la && n !== Pe)
          return `\\\\?\\UNC\\${e.slice(2)}`;
      }
    } else if (xe(e.charCodeAt(0)) && e.charCodeAt(1) === Re && e.charCodeAt(2) === ae)
      return `\\\\?\\${e}`;
    return t;
  },
  dirname(t) {
    G(t, "path");
    const e = t.length;
    if (e === 0)
      return ".";
    let n = -1, r = 0;
    const i = t.charCodeAt(0);
    if (e === 1)
      return D(i) ? t : ".";
    if (D(i)) {
      if (n = r = 1, D(t.charCodeAt(1))) {
        let l = 2, u = l;
        for (; l < e && !D(t.charCodeAt(l)); )
          l++;
        if (l < e && l !== u) {
          for (u = l; l < e && D(t.charCodeAt(l)); )
            l++;
          if (l < e && l !== u) {
            for (u = l; l < e && !D(t.charCodeAt(l)); )
              l++;
            if (l === e)
              return t;
            l !== u && (n = r = l + 1);
          }
        }
      }
    } else xe(i) && t.charCodeAt(1) === Re && (n = e > 2 && D(t.charCodeAt(2)) ? 3 : 2, r = n);
    let s = -1, o = !0;
    for (let l = e - 1; l >= r; --l)
      if (D(t.charCodeAt(l))) {
        if (!o) {
          s = l;
          break;
        }
      } else
        o = !1;
    if (s === -1) {
      if (n === -1)
        return ".";
      s = n;
    }
    return t.slice(0, s);
  },
  basename(t, e) {
    e !== void 0 && G(e, "suffix"), G(t, "path");
    let n = 0, r = -1, i = !0, s;
    if (t.length >= 2 && xe(t.charCodeAt(0)) && t.charCodeAt(1) === Re && (n = 2), e !== void 0 && e.length > 0 && e.length <= t.length) {
      if (e === t)
        return "";
      let o = e.length - 1, l = -1;
      for (s = t.length - 1; s >= n; --s) {
        const u = t.charCodeAt(s);
        if (D(u)) {
          if (!i) {
            n = s + 1;
            break;
          }
        } else
          l === -1 && (i = !1, l = s + 1), o >= 0 && (u === e.charCodeAt(o) ? --o === -1 && (r = s) : (o = -1, r = l));
      }
      return n === r ? r = l : r === -1 && (r = t.length), t.slice(n, r);
    }
    for (s = t.length - 1; s >= n; --s)
      if (D(t.charCodeAt(s))) {
        if (!i) {
          n = s + 1;
          break;
        }
      } else r === -1 && (i = !1, r = s + 1);
    return r === -1 ? "" : t.slice(n, r);
  },
  extname(t) {
    G(t, "path");
    let e = 0, n = -1, r = 0, i = -1, s = !0, o = 0;
    t.length >= 2 && t.charCodeAt(1) === Re && xe(t.charCodeAt(0)) && (e = r = 2);
    for (let l = t.length - 1; l >= e; --l) {
      const u = t.charCodeAt(l);
      if (D(u)) {
        if (!s) {
          r = l + 1;
          break;
        }
        continue;
      }
      i === -1 && (s = !1, i = l + 1), u === Pe ? n === -1 ? n = l : o !== 1 && (o = 1) : n !== -1 && (o = -1);
    }
    return n === -1 || i === -1 || o === 0 || o === 1 && n === i - 1 && n === r + 1 ? "" : t.slice(n, i);
  },
  format: os.bind(null, "\\"),
  parse(t) {
    G(t, "path");
    const e = { root: "", dir: "", base: "", ext: "", name: "" };
    if (t.length === 0)
      return e;
    const n = t.length;
    let r = 0, i = t.charCodeAt(0);
    if (n === 1)
      return D(i) ? (e.root = e.dir = t, e) : (e.base = e.name = t, e);
    if (D(i)) {
      if (r = 1, D(t.charCodeAt(1))) {
        let d = 2, g = d;
        for (; d < n && !D(t.charCodeAt(d)); )
          d++;
        if (d < n && d !== g) {
          for (g = d; d < n && D(t.charCodeAt(d)); )
            d++;
          if (d < n && d !== g) {
            for (g = d; d < n && !D(t.charCodeAt(d)); )
              d++;
            d === n ? r = d : d !== g && (r = d + 1);
          }
        }
      }
    } else if (xe(i) && t.charCodeAt(1) === Re) {
      if (n <= 2)
        return e.root = e.dir = t, e;
      if (r = 2, D(t.charCodeAt(2))) {
        if (n === 3)
          return e.root = e.dir = t, e;
        r = 3;
      }
    }
    r > 0 && (e.root = t.slice(0, r));
    let s = -1, o = r, l = -1, u = !0, h = t.length - 1, c = 0;
    for (; h >= r; --h) {
      if (i = t.charCodeAt(h), D(i)) {
        if (!u) {
          o = h + 1;
          break;
        }
        continue;
      }
      l === -1 && (u = !1, l = h + 1), i === Pe ? s === -1 ? s = h : c !== 1 && (c = 1) : s !== -1 && (c = -1);
    }
    return l !== -1 && (s === -1 || c === 0 || c === 1 && s === l - 1 && s === o + 1 ? e.base = e.name = t.slice(o, l) : (e.name = t.slice(o, s), e.base = t.slice(o, l), e.ext = t.slice(s, l))), o > 0 && o !== r ? e.dir = t.slice(0, o - 1) : e.dir = e.root, e;
  },
  sep: "\\",
  delimiter: ";",
  win32: null,
  posix: null
}, ca = (() => {
  if (fe) {
    const t = /\\/g;
    return () => {
      const e = Pt().replace(t, "/");
      return e.slice(e.indexOf("/"));
    };
  }
  return () => Pt();
})(), U = {
  resolve(...t) {
    let e = "", n = !1;
    for (let r = t.length - 1; r >= -1 && !n; r--) {
      const i = r >= 0 ? t[r] : ca();
      G(i, `paths[${r}]`), i.length !== 0 && (e = `${i}/${e}`, n = i.charCodeAt(0) === Q);
    }
    return e = Ot(e, !n, "/", un), n ? `/${e}` : e.length > 0 ? e : ".";
  },
  normalize(t) {
    if (G(t, "path"), t.length === 0)
      return ".";
    const e = t.charCodeAt(0) === Q, n = t.charCodeAt(t.length - 1) === Q;
    return t = Ot(t, !e, "/", un), t.length === 0 ? e ? "/" : n ? "./" : "." : (n && (t += "/"), e ? `/${t}` : t);
  },
  isAbsolute(t) {
    return G(t, "path"), t.length > 0 && t.charCodeAt(0) === Q;
  },
  join(...t) {
    if (t.length === 0)
      return ".";
    let e;
    for (let n = 0; n < t.length; ++n) {
      const r = t[n];
      G(r, "path"), r.length > 0 && (e === void 0 ? e = r : e += `/${r}`);
    }
    return e === void 0 ? "." : U.normalize(e);
  },
  relative(t, e) {
    if (G(t, "from"), G(e, "to"), t === e || (t = U.resolve(t), e = U.resolve(e), t === e))
      return "";
    const n = 1, r = t.length, i = r - n, s = 1, o = e.length - s, l = i < o ? i : o;
    let u = -1, h = 0;
    for (; h < l; h++) {
      const d = t.charCodeAt(n + h);
      if (d !== e.charCodeAt(s + h))
        break;
      d === Q && (u = h);
    }
    if (h === l)
      if (o > l) {
        if (e.charCodeAt(s + h) === Q)
          return e.slice(s + h + 1);
        if (h === 0)
          return e.slice(s + h);
      } else i > l && (t.charCodeAt(n + h) === Q ? u = h : h === 0 && (u = 0));
    let c = "";
    for (h = n + u + 1; h <= r; ++h)
      (h === r || t.charCodeAt(h) === Q) && (c += c.length === 0 ? ".." : "/..");
    return `${c}${e.slice(s + u)}`;
  },
  toNamespacedPath(t) {
    return t;
  },
  dirname(t) {
    if (G(t, "path"), t.length === 0)
      return ".";
    const e = t.charCodeAt(0) === Q;
    let n = -1, r = !0;
    for (let i = t.length - 1; i >= 1; --i)
      if (t.charCodeAt(i) === Q) {
        if (!r) {
          n = i;
          break;
        }
      } else
        r = !1;
    return n === -1 ? e ? "/" : "." : e && n === 1 ? "//" : t.slice(0, n);
  },
  basename(t, e) {
    e !== void 0 && G(e, "ext"), G(t, "path");
    let n = 0, r = -1, i = !0, s;
    if (e !== void 0 && e.length > 0 && e.length <= t.length) {
      if (e === t)
        return "";
      let o = e.length - 1, l = -1;
      for (s = t.length - 1; s >= 0; --s) {
        const u = t.charCodeAt(s);
        if (u === Q) {
          if (!i) {
            n = s + 1;
            break;
          }
        } else
          l === -1 && (i = !1, l = s + 1), o >= 0 && (u === e.charCodeAt(o) ? --o === -1 && (r = s) : (o = -1, r = l));
      }
      return n === r ? r = l : r === -1 && (r = t.length), t.slice(n, r);
    }
    for (s = t.length - 1; s >= 0; --s)
      if (t.charCodeAt(s) === Q) {
        if (!i) {
          n = s + 1;
          break;
        }
      } else r === -1 && (i = !1, r = s + 1);
    return r === -1 ? "" : t.slice(n, r);
  },
  extname(t) {
    G(t, "path");
    let e = -1, n = 0, r = -1, i = !0, s = 0;
    for (let o = t.length - 1; o >= 0; --o) {
      const l = t.charCodeAt(o);
      if (l === Q) {
        if (!i) {
          n = o + 1;
          break;
        }
        continue;
      }
      r === -1 && (i = !1, r = o + 1), l === Pe ? e === -1 ? e = o : s !== 1 && (s = 1) : e !== -1 && (s = -1);
    }
    return e === -1 || r === -1 || s === 0 || s === 1 && e === r - 1 && e === n + 1 ? "" : t.slice(e, r);
  },
  format: os.bind(null, "/"),
  parse(t) {
    G(t, "path");
    const e = { root: "", dir: "", base: "", ext: "", name: "" };
    if (t.length === 0)
      return e;
    const n = t.charCodeAt(0) === Q;
    let r;
    n ? (e.root = "/", r = 1) : r = 0;
    let i = -1, s = 0, o = -1, l = !0, u = t.length - 1, h = 0;
    for (; u >= r; --u) {
      const c = t.charCodeAt(u);
      if (c === Q) {
        if (!l) {
          s = u + 1;
          break;
        }
        continue;
      }
      o === -1 && (l = !1, o = u + 1), c === Pe ? i === -1 ? i = u : h !== 1 && (h = 1) : i !== -1 && (h = -1);
    }
    if (o !== -1) {
      const c = s === 0 && n ? 1 : s;
      i === -1 || h === 0 || h === 1 && i === o - 1 && i === s + 1 ? e.base = e.name = t.slice(c, o) : (e.name = t.slice(c, i), e.base = t.slice(c, o), e.ext = t.slice(i, o));
    }
    return s > 0 ? e.dir = t.slice(0, s - 1) : n && (e.dir = "/"), e;
  },
  sep: "/",
  delimiter: ":",
  win32: null,
  posix: null
};
U.win32 = Y.win32 = Y;
U.posix = Y.posix = U;
const da = fe ? Y.normalize : U.normalize;
fe ? Y.isAbsolute : U.isAbsolute;
const ga = fe ? Y.join : U.join, ma = fe ? Y.resolve : U.resolve, fa = fe ? Y.relative : U.relative, pa = fe ? Y.dirname : U.dirname;
fe ? Y.basename : U.basename;
fe ? Y.extname : U.extname;
fe ? Y.parse : U.parse;
const Et = fe ? Y.sep : U.sep;
fe ? Y.delimiter : U.delimiter;
const ba = /^\w[\w\d+.-]*$/, wa = /^\//, La = /^\/\//;
function Ca(t, e) {
  if (!t.scheme && e)
    throw new Error(
      `[UriError]: Scheme is missing: {scheme: "", authority: "${t.authority}", path: "${t.path}", query: "${t.query}", fragment: "${t.fragment}"}`
    );
  if (t.scheme && !ba.test(t.scheme))
    throw new Error("[UriError]: Scheme contains illegal characters.");
  if (t.path) {
    if (t.authority) {
      if (!wa.test(t.path))
        throw new Error(
          '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
        );
    } else if (La.test(t.path))
      throw new Error(
        '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
      );
  }
}
function va(t, e) {
  return !t && !e ? "file" : t;
}
function ya(t, e) {
  switch (t) {
    case "https":
    case "http":
    case "file":
      e ? e[0] !== be && (e = be + e) : e = be;
      break;
  }
  return e;
}
const $ = "", be = "/", _a = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
class ee {
  static isUri(e) {
    return e instanceof ee ? !0 : e ? typeof e.authority == "string" && typeof e.fragment == "string" && typeof e.path == "string" && typeof e.query == "string" && typeof e.scheme == "string" && typeof e.fsPath == "string" && typeof e.with == "function" && typeof e.toString == "function" : !1;
  }
  constructor(e, n, r, i, s, o = !1) {
    typeof e == "object" ? (this.scheme = e.scheme || $, this.authority = e.authority || $, this.path = e.path || $, this.query = e.query || $, this.fragment = e.fragment || $) : (this.scheme = va(e, o), this.authority = n || $, this.path = ya(this.scheme, r || $), this.query = i || $, this.fragment = s || $, Ca(this, o));
  }
  get fsPath() {
    return It(this, !1);
  }
  with(e) {
    if (!e)
      return this;
    let { scheme: n, authority: r, path: i, query: s, fragment: o } = e;
    return n === void 0 ? n = this.scheme : n === null && (n = $), r === void 0 ? r = this.authority : r === null && (r = $), i === void 0 ? i = this.path : i === null && (i = $), s === void 0 ? s = this.query : s === null && (s = $), o === void 0 ? o = this.fragment : o === null && (o = $), n === this.scheme && r === this.authority && i === this.path && s === this.query && o === this.fragment ? this : new We(n, r, i, s, o);
  }
  static parse(e, n = !1) {
    const r = _a.exec(e);
    return r ? new We(
      r[2] || $,
      Lt(r[4] || $),
      Lt(r[5] || $),
      Lt(r[7] || $),
      Lt(r[9] || $),
      n
    ) : new We($, $, $, $, $);
  }
  static file(e) {
    let n = $;
    if (et && (e = e.replace(/\\/g, be)), e[0] === be && e[1] === be) {
      const r = e.indexOf(be, 2);
      r === -1 ? (n = e.substring(2), e = be) : (n = e.substring(2, r), e = e.substring(r) || be);
    }
    return new We("file", n, e, $, $);
  }
  static from(e, n) {
    return new We(
      e.scheme,
      e.authority,
      e.path,
      e.query,
      e.fragment,
      n
    );
  }
  static joinPath(e, ...n) {
    if (!e.path)
      throw new Error("[UriError]: cannot call joinPath on URI without path");
    let r;
    return et && e.scheme === "file" ? r = ee.file(Y.join(It(e, !0), ...n)).path : r = U.join(e.path, ...n), e.with({ path: r });
  }
  toString(e = !1) {
    return hn(this, e);
  }
  toJSON() {
    return this;
  }
  static revive(e) {
    if (e) {
      if (e instanceof ee)
        return e;
      {
        const n = new We(e);
        return n._formatted = e.external ?? null, n._fsPath = e._sep === as ? e.fsPath ?? null : null, n;
      }
    } else return e;
  }
  [Symbol.for("debug.description")]() {
    return `URI(${this.toString()})`;
  }
}
const as = et ? 1 : void 0;
class We extends ee {
  constructor() {
    super(...arguments), this._formatted = null, this._fsPath = null;
  }
  get fsPath() {
    return this._fsPath || (this._fsPath = It(this, !1)), this._fsPath;
  }
  toString(e = !1) {
    return e ? hn(this, !0) : (this._formatted || (this._formatted = hn(this, !1)), this._formatted);
  }
  toJSON() {
    const e = {
      $mid: 1
    };
    return this._fsPath && (e.fsPath = this._fsPath, e._sep = as), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e;
  }
}
const ls = {
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
function nr(t, e, n) {
  let r, i = -1;
  for (let s = 0; s < t.length; s++) {
    const o = t.charCodeAt(s);
    if (o >= 97 && o <= 122 || o >= 65 && o <= 90 || o >= 48 && o <= 57 || o === 45 || o === 46 || o === 95 || o === 126 || e && o === 47 || n && o === 91 || n && o === 93 || n && o === 58)
      i !== -1 && (r += encodeURIComponent(t.substring(i, s)), i = -1), r !== void 0 && (r += t.charAt(s));
    else {
      r === void 0 && (r = t.substr(0, s));
      const l = ls[o];
      l !== void 0 ? (i !== -1 && (r += encodeURIComponent(t.substring(i, s)), i = -1), r += l) : i === -1 && (i = s);
    }
  }
  return i !== -1 && (r += encodeURIComponent(t.substring(i))), r !== void 0 ? r : t;
}
function Na(t) {
  let e;
  for (let n = 0; n < t.length; n++) {
    const r = t.charCodeAt(n);
    r === 35 || r === 63 ? (e === void 0 && (e = t.substr(0, n)), e += ls[r]) : e !== void 0 && (e += t[n]);
  }
  return e !== void 0 ? e : t;
}
function It(t, e) {
  let n;
  return t.authority && t.path.length > 1 && t.scheme === "file" ? n = `//${t.authority}${t.path}` : t.path.charCodeAt(0) === 47 && (t.path.charCodeAt(1) >= 65 && t.path.charCodeAt(1) <= 90 || t.path.charCodeAt(1) >= 97 && t.path.charCodeAt(1) <= 122) && t.path.charCodeAt(2) === 58 ? e ? n = t.path.substr(1) : n = t.path[1].toLowerCase() + t.path.substr(2) : n = t.path, et && (n = n.replace(/\//g, "\\")), n;
}
function hn(t, e) {
  const n = e ? Na : nr;
  let r = "", { scheme: i, authority: s, path: o, query: l, fragment: u } = t;
  if (i && (r += i, r += ":"), (s || i === "file") && (r += be, r += be), s) {
    let h = s.indexOf("@");
    if (h !== -1) {
      const c = s.substr(0, h);
      s = s.substr(h + 1), h = c.lastIndexOf(":"), h === -1 ? r += n(c, !1, !1) : (r += n(c.substr(0, h), !1, !1), r += ":", r += n(c.substr(h + 1), !1, !0)), r += "@";
    }
    s = s.toLowerCase(), h = s.lastIndexOf(":"), h === -1 ? r += n(s, !1, !0) : (r += n(s.substr(0, h), !1, !0), r += s.substr(h));
  }
  if (o) {
    if (o.length >= 3 && o.charCodeAt(0) === 47 && o.charCodeAt(2) === 58) {
      const h = o.charCodeAt(1);
      h >= 65 && h <= 90 && (o = `/${String.fromCharCode(h + 32)}:${o.substr(3)}`);
    } else if (o.length >= 2 && o.charCodeAt(1) === 58) {
      const h = o.charCodeAt(0);
      h >= 65 && h <= 90 && (o = `${String.fromCharCode(h + 32)}:${o.substr(2)}`);
    }
    r += n(o, !0, !1);
  }
  return l && (r += "?", r += n(l, !1, !1)), u && (r += "#", r += e ? u : nr(u, !1, !1)), r;
}
function us(t) {
  try {
    return decodeURIComponent(t);
  } catch {
    return t.length > 3 ? t.substr(0, 3) + us(t.substr(3)) : t;
  }
}
const rr = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function Lt(t) {
  return t.match(rr) ? t.replace(rr, (e) => us(e)) : t;
}
class ue extends E {
  constructor(e, n, r, i) {
    super(e, n, r, i), this.selectionStartLineNumber = e, this.selectionStartColumn = n, this.positionLineNumber = r, this.positionColumn = i;
  }
  toString() {
    return "[" + this.selectionStartLineNumber + "," + this.selectionStartColumn + " -> " + this.positionLineNumber + "," + this.positionColumn + "]";
  }
  equalsSelection(e) {
    return ue.selectionsEqual(this, e);
  }
  static selectionsEqual(e, n) {
    return e.selectionStartLineNumber === n.selectionStartLineNumber && e.selectionStartColumn === n.selectionStartColumn && e.positionLineNumber === n.positionLineNumber && e.positionColumn === n.positionColumn;
  }
  getDirection() {
    return this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn ? 0 : 1;
  }
  setEndPosition(e, n) {
    return this.getDirection() === 0 ? new ue(this.startLineNumber, this.startColumn, e, n) : new ue(e, n, this.startLineNumber, this.startColumn);
  }
  getPosition() {
    return new F(this.positionLineNumber, this.positionColumn);
  }
  getSelectionStart() {
    return new F(this.selectionStartLineNumber, this.selectionStartColumn);
  }
  setStartPosition(e, n) {
    return this.getDirection() === 0 ? new ue(e, n, this.endLineNumber, this.endColumn) : new ue(this.endLineNumber, this.endColumn, e, n);
  }
  static fromPositions(e, n = e) {
    return new ue(e.lineNumber, e.column, n.lineNumber, n.column);
  }
  static fromRange(e, n) {
    return n === 0 ? new ue(
      e.startLineNumber,
      e.startColumn,
      e.endLineNumber,
      e.endColumn
    ) : new ue(
      e.endLineNumber,
      e.endColumn,
      e.startLineNumber,
      e.startColumn
    );
  }
  static liftSelection(e) {
    return new ue(
      e.selectionStartLineNumber,
      e.selectionStartColumn,
      e.positionLineNumber,
      e.positionColumn
    );
  }
  static selectionsArrEqual(e, n) {
    if (e && !n || !e && n)
      return !1;
    if (!e && !n)
      return !0;
    if (e.length !== n.length)
      return !1;
    for (let r = 0, i = e.length; r < i; r++)
      if (!this.selectionsEqual(e[r], n[r]))
        return !1;
    return !0;
  }
  static isISelection(e) {
    return e && typeof e.selectionStartLineNumber == "number" && typeof e.selectionStartColumn == "number" && typeof e.positionLineNumber == "number" && typeof e.positionColumn == "number";
  }
  static createWithDirection(e, n, r, i, s) {
    return s === 0 ? new ue(e, n, r, i) : new ue(r, i, e, n);
  }
}
function Ea(t) {
  return typeof t == "string";
}
const ir = /* @__PURE__ */ Object.create(null);
function a(t, e) {
  if (Ea(e)) {
    const n = ir[e];
    if (n === void 0)
      throw new Error(`${t} references an unknown codicon: ${e}`);
    e = n;
  }
  return ir[t] = e, { id: t };
}
const Sa = {
  add: a("add", 6e4),
  plus: a("plus", 6e4),
  gistNew: a("gist-new", 6e4),
  repoCreate: a("repo-create", 6e4),
  lightbulb: a("lightbulb", 60001),
  lightBulb: a("light-bulb", 60001),
  repo: a("repo", 60002),
  repoDelete: a("repo-delete", 60002),
  gistFork: a("gist-fork", 60003),
  repoForked: a("repo-forked", 60003),
  gitPullRequest: a("git-pull-request", 60004),
  gitPullRequestAbandoned: a("git-pull-request-abandoned", 60004),
  recordKeys: a("record-keys", 60005),
  keyboard: a("keyboard", 60005),
  tag: a("tag", 60006),
  gitPullRequestLabel: a("git-pull-request-label", 60006),
  tagAdd: a("tag-add", 60006),
  tagRemove: a("tag-remove", 60006),
  person: a("person", 60007),
  personFollow: a("person-follow", 60007),
  personOutline: a("person-outline", 60007),
  personFilled: a("person-filled", 60007),
  gitBranch: a("git-branch", 60008),
  gitBranchCreate: a("git-branch-create", 60008),
  gitBranchDelete: a("git-branch-delete", 60008),
  sourceControl: a("source-control", 60008),
  mirror: a("mirror", 60009),
  mirrorPublic: a("mirror-public", 60009),
  star: a("star", 60010),
  starAdd: a("star-add", 60010),
  starDelete: a("star-delete", 60010),
  starEmpty: a("star-empty", 60010),
  comment: a("comment", 60011),
  commentAdd: a("comment-add", 60011),
  alert: a("alert", 60012),
  warning: a("warning", 60012),
  search: a("search", 60013),
  searchSave: a("search-save", 60013),
  logOut: a("log-out", 60014),
  signOut: a("sign-out", 60014),
  logIn: a("log-in", 60015),
  signIn: a("sign-in", 60015),
  eye: a("eye", 60016),
  eyeUnwatch: a("eye-unwatch", 60016),
  eyeWatch: a("eye-watch", 60016),
  circleFilled: a("circle-filled", 60017),
  primitiveDot: a("primitive-dot", 60017),
  closeDirty: a("close-dirty", 60017),
  debugBreakpoint: a("debug-breakpoint", 60017),
  debugBreakpointDisabled: a("debug-breakpoint-disabled", 60017),
  debugHint: a("debug-hint", 60017),
  terminalDecorationSuccess: a("terminal-decoration-success", 60017),
  primitiveSquare: a("primitive-square", 60018),
  edit: a("edit", 60019),
  pencil: a("pencil", 60019),
  info: a("info", 60020),
  issueOpened: a("issue-opened", 60020),
  gistPrivate: a("gist-private", 60021),
  gitForkPrivate: a("git-fork-private", 60021),
  lock: a("lock", 60021),
  mirrorPrivate: a("mirror-private", 60021),
  close: a("close", 60022),
  removeClose: a("remove-close", 60022),
  x: a("x", 60022),
  repoSync: a("repo-sync", 60023),
  sync: a("sync", 60023),
  clone: a("clone", 60024),
  desktopDownload: a("desktop-download", 60024),
  beaker: a("beaker", 60025),
  microscope: a("microscope", 60025),
  vm: a("vm", 60026),
  deviceDesktop: a("device-desktop", 60026),
  file: a("file", 60027),
  fileText: a("file-text", 60027),
  more: a("more", 60028),
  ellipsis: a("ellipsis", 60028),
  kebabHorizontal: a("kebab-horizontal", 60028),
  mailReply: a("mail-reply", 60029),
  reply: a("reply", 60029),
  organization: a("organization", 60030),
  organizationFilled: a("organization-filled", 60030),
  organizationOutline: a("organization-outline", 60030),
  newFile: a("new-file", 60031),
  fileAdd: a("file-add", 60031),
  newFolder: a("new-folder", 60032),
  fileDirectoryCreate: a("file-directory-create", 60032),
  trash: a("trash", 60033),
  trashcan: a("trashcan", 60033),
  history: a("history", 60034),
  clock: a("clock", 60034),
  folder: a("folder", 60035),
  fileDirectory: a("file-directory", 60035),
  symbolFolder: a("symbol-folder", 60035),
  logoGithub: a("logo-github", 60036),
  markGithub: a("mark-github", 60036),
  github: a("github", 60036),
  terminal: a("terminal", 60037),
  console: a("console", 60037),
  repl: a("repl", 60037),
  zap: a("zap", 60038),
  symbolEvent: a("symbol-event", 60038),
  error: a("error", 60039),
  stop: a("stop", 60039),
  variable: a("variable", 60040),
  symbolVariable: a("symbol-variable", 60040),
  array: a("array", 60042),
  symbolArray: a("symbol-array", 60042),
  symbolModule: a("symbol-module", 60043),
  symbolPackage: a("symbol-package", 60043),
  symbolNamespace: a("symbol-namespace", 60043),
  symbolObject: a("symbol-object", 60043),
  symbolMethod: a("symbol-method", 60044),
  symbolFunction: a("symbol-function", 60044),
  symbolConstructor: a("symbol-constructor", 60044),
  symbolBoolean: a("symbol-boolean", 60047),
  symbolNull: a("symbol-null", 60047),
  symbolNumeric: a("symbol-numeric", 60048),
  symbolNumber: a("symbol-number", 60048),
  symbolStructure: a("symbol-structure", 60049),
  symbolStruct: a("symbol-struct", 60049),
  symbolParameter: a("symbol-parameter", 60050),
  symbolTypeParameter: a("symbol-type-parameter", 60050),
  symbolKey: a("symbol-key", 60051),
  symbolText: a("symbol-text", 60051),
  symbolReference: a("symbol-reference", 60052),
  goToFile: a("go-to-file", 60052),
  symbolEnum: a("symbol-enum", 60053),
  symbolValue: a("symbol-value", 60053),
  symbolRuler: a("symbol-ruler", 60054),
  symbolUnit: a("symbol-unit", 60054),
  activateBreakpoints: a("activate-breakpoints", 60055),
  archive: a("archive", 60056),
  arrowBoth: a("arrow-both", 60057),
  arrowDown: a("arrow-down", 60058),
  arrowLeft: a("arrow-left", 60059),
  arrowRight: a("arrow-right", 60060),
  arrowSmallDown: a("arrow-small-down", 60061),
  arrowSmallLeft: a("arrow-small-left", 60062),
  arrowSmallRight: a("arrow-small-right", 60063),
  arrowSmallUp: a("arrow-small-up", 60064),
  arrowUp: a("arrow-up", 60065),
  bell: a("bell", 60066),
  bold: a("bold", 60067),
  book: a("book", 60068),
  bookmark: a("bookmark", 60069),
  debugBreakpointConditionalUnverified: a("debug-breakpoint-conditional-unverified", 60070),
  debugBreakpointConditional: a("debug-breakpoint-conditional", 60071),
  debugBreakpointConditionalDisabled: a("debug-breakpoint-conditional-disabled", 60071),
  debugBreakpointDataUnverified: a("debug-breakpoint-data-unverified", 60072),
  debugBreakpointData: a("debug-breakpoint-data", 60073),
  debugBreakpointDataDisabled: a("debug-breakpoint-data-disabled", 60073),
  debugBreakpointLogUnverified: a("debug-breakpoint-log-unverified", 60074),
  debugBreakpointLog: a("debug-breakpoint-log", 60075),
  debugBreakpointLogDisabled: a("debug-breakpoint-log-disabled", 60075),
  briefcase: a("briefcase", 60076),
  broadcast: a("broadcast", 60077),
  browser: a("browser", 60078),
  bug: a("bug", 60079),
  calendar: a("calendar", 60080),
  caseSensitive: a("case-sensitive", 60081),
  check: a("check", 60082),
  checklist: a("checklist", 60083),
  chevronDown: a("chevron-down", 60084),
  chevronLeft: a("chevron-left", 60085),
  chevronRight: a("chevron-right", 60086),
  chevronUp: a("chevron-up", 60087),
  chromeClose: a("chrome-close", 60088),
  chromeMaximize: a("chrome-maximize", 60089),
  chromeMinimize: a("chrome-minimize", 60090),
  chromeRestore: a("chrome-restore", 60091),
  circleOutline: a("circle-outline", 60092),
  circle: a("circle", 60092),
  debugBreakpointUnverified: a("debug-breakpoint-unverified", 60092),
  terminalDecorationIncomplete: a("terminal-decoration-incomplete", 60092),
  circleSlash: a("circle-slash", 60093),
  circuitBoard: a("circuit-board", 60094),
  clearAll: a("clear-all", 60095),
  clippy: a("clippy", 60096),
  closeAll: a("close-all", 60097),
  cloudDownload: a("cloud-download", 60098),
  cloudUpload: a("cloud-upload", 60099),
  code: a("code", 60100),
  collapseAll: a("collapse-all", 60101),
  colorMode: a("color-mode", 60102),
  commentDiscussion: a("comment-discussion", 60103),
  creditCard: a("credit-card", 60105),
  dash: a("dash", 60108),
  dashboard: a("dashboard", 60109),
  database: a("database", 60110),
  debugContinue: a("debug-continue", 60111),
  debugDisconnect: a("debug-disconnect", 60112),
  debugPause: a("debug-pause", 60113),
  debugRestart: a("debug-restart", 60114),
  debugStart: a("debug-start", 60115),
  debugStepInto: a("debug-step-into", 60116),
  debugStepOut: a("debug-step-out", 60117),
  debugStepOver: a("debug-step-over", 60118),
  debugStop: a("debug-stop", 60119),
  debug: a("debug", 60120),
  deviceCameraVideo: a("device-camera-video", 60121),
  deviceCamera: a("device-camera", 60122),
  deviceMobile: a("device-mobile", 60123),
  diffAdded: a("diff-added", 60124),
  diffIgnored: a("diff-ignored", 60125),
  diffModified: a("diff-modified", 60126),
  diffRemoved: a("diff-removed", 60127),
  diffRenamed: a("diff-renamed", 60128),
  diff: a("diff", 60129),
  diffSidebyside: a("diff-sidebyside", 60129),
  discard: a("discard", 60130),
  editorLayout: a("editor-layout", 60131),
  emptyWindow: a("empty-window", 60132),
  exclude: a("exclude", 60133),
  extensions: a("extensions", 60134),
  eyeClosed: a("eye-closed", 60135),
  fileBinary: a("file-binary", 60136),
  fileCode: a("file-code", 60137),
  fileMedia: a("file-media", 60138),
  filePdf: a("file-pdf", 60139),
  fileSubmodule: a("file-submodule", 60140),
  fileSymlinkDirectory: a("file-symlink-directory", 60141),
  fileSymlinkFile: a("file-symlink-file", 60142),
  fileZip: a("file-zip", 60143),
  files: a("files", 60144),
  filter: a("filter", 60145),
  flame: a("flame", 60146),
  foldDown: a("fold-down", 60147),
  foldUp: a("fold-up", 60148),
  fold: a("fold", 60149),
  folderActive: a("folder-active", 60150),
  folderOpened: a("folder-opened", 60151),
  gear: a("gear", 60152),
  gift: a("gift", 60153),
  gistSecret: a("gist-secret", 60154),
  gist: a("gist", 60155),
  gitCommit: a("git-commit", 60156),
  gitCompare: a("git-compare", 60157),
  compareChanges: a("compare-changes", 60157),
  gitMerge: a("git-merge", 60158),
  githubAction: a("github-action", 60159),
  githubAlt: a("github-alt", 60160),
  globe: a("globe", 60161),
  grabber: a("grabber", 60162),
  graph: a("graph", 60163),
  gripper: a("gripper", 60164),
  heart: a("heart", 60165),
  home: a("home", 60166),
  horizontalRule: a("horizontal-rule", 60167),
  hubot: a("hubot", 60168),
  inbox: a("inbox", 60169),
  issueReopened: a("issue-reopened", 60171),
  issues: a("issues", 60172),
  italic: a("italic", 60173),
  jersey: a("jersey", 60174),
  json: a("json", 60175),
  kebabVertical: a("kebab-vertical", 60176),
  key: a("key", 60177),
  law: a("law", 60178),
  lightbulbAutofix: a("lightbulb-autofix", 60179),
  linkExternal: a("link-external", 60180),
  link: a("link", 60181),
  listOrdered: a("list-ordered", 60182),
  listUnordered: a("list-unordered", 60183),
  liveShare: a("live-share", 60184),
  loading: a("loading", 60185),
  location: a("location", 60186),
  mailRead: a("mail-read", 60187),
  mail: a("mail", 60188),
  markdown: a("markdown", 60189),
  megaphone: a("megaphone", 60190),
  mention: a("mention", 60191),
  milestone: a("milestone", 60192),
  gitPullRequestMilestone: a("git-pull-request-milestone", 60192),
  mortarBoard: a("mortar-board", 60193),
  move: a("move", 60194),
  multipleWindows: a("multiple-windows", 60195),
  mute: a("mute", 60196),
  noNewline: a("no-newline", 60197),
  note: a("note", 60198),
  octoface: a("octoface", 60199),
  openPreview: a("open-preview", 60200),
  package: a("package", 60201),
  paintcan: a("paintcan", 60202),
  pin: a("pin", 60203),
  play: a("play", 60204),
  run: a("run", 60204),
  plug: a("plug", 60205),
  preserveCase: a("preserve-case", 60206),
  preview: a("preview", 60207),
  project: a("project", 60208),
  pulse: a("pulse", 60209),
  question: a("question", 60210),
  quote: a("quote", 60211),
  radioTower: a("radio-tower", 60212),
  reactions: a("reactions", 60213),
  references: a("references", 60214),
  refresh: a("refresh", 60215),
  regex: a("regex", 60216),
  remoteExplorer: a("remote-explorer", 60217),
  remote: a("remote", 60218),
  remove: a("remove", 60219),
  replaceAll: a("replace-all", 60220),
  replace: a("replace", 60221),
  repoClone: a("repo-clone", 60222),
  repoForcePush: a("repo-force-push", 60223),
  repoPull: a("repo-pull", 60224),
  repoPush: a("repo-push", 60225),
  report: a("report", 60226),
  requestChanges: a("request-changes", 60227),
  rocket: a("rocket", 60228),
  rootFolderOpened: a("root-folder-opened", 60229),
  rootFolder: a("root-folder", 60230),
  rss: a("rss", 60231),
  ruby: a("ruby", 60232),
  saveAll: a("save-all", 60233),
  saveAs: a("save-as", 60234),
  save: a("save", 60235),
  screenFull: a("screen-full", 60236),
  screenNormal: a("screen-normal", 60237),
  searchStop: a("search-stop", 60238),
  server: a("server", 60240),
  settingsGear: a("settings-gear", 60241),
  settings: a("settings", 60242),
  shield: a("shield", 60243),
  smiley: a("smiley", 60244),
  sortPrecedence: a("sort-precedence", 60245),
  splitHorizontal: a("split-horizontal", 60246),
  splitVertical: a("split-vertical", 60247),
  squirrel: a("squirrel", 60248),
  starFull: a("star-full", 60249),
  starHalf: a("star-half", 60250),
  symbolClass: a("symbol-class", 60251),
  symbolColor: a("symbol-color", 60252),
  symbolConstant: a("symbol-constant", 60253),
  symbolEnumMember: a("symbol-enum-member", 60254),
  symbolField: a("symbol-field", 60255),
  symbolFile: a("symbol-file", 60256),
  symbolInterface: a("symbol-interface", 60257),
  symbolKeyword: a("symbol-keyword", 60258),
  symbolMisc: a("symbol-misc", 60259),
  symbolOperator: a("symbol-operator", 60260),
  symbolProperty: a("symbol-property", 60261),
  wrench: a("wrench", 60261),
  wrenchSubaction: a("wrench-subaction", 60261),
  symbolSnippet: a("symbol-snippet", 60262),
  tasklist: a("tasklist", 60263),
  telescope: a("telescope", 60264),
  textSize: a("text-size", 60265),
  threeBars: a("three-bars", 60266),
  thumbsdown: a("thumbsdown", 60267),
  thumbsup: a("thumbsup", 60268),
  tools: a("tools", 60269),
  triangleDown: a("triangle-down", 60270),
  triangleLeft: a("triangle-left", 60271),
  triangleRight: a("triangle-right", 60272),
  triangleUp: a("triangle-up", 60273),
  twitter: a("twitter", 60274),
  unfold: a("unfold", 60275),
  unlock: a("unlock", 60276),
  unmute: a("unmute", 60277),
  unverified: a("unverified", 60278),
  verified: a("verified", 60279),
  versions: a("versions", 60280),
  vmActive: a("vm-active", 60281),
  vmOutline: a("vm-outline", 60282),
  vmRunning: a("vm-running", 60283),
  watch: a("watch", 60284),
  whitespace: a("whitespace", 60285),
  wholeWord: a("whole-word", 60286),
  window: a("window", 60287),
  wordWrap: a("word-wrap", 60288),
  zoomIn: a("zoom-in", 60289),
  zoomOut: a("zoom-out", 60290),
  listFilter: a("list-filter", 60291),
  listFlat: a("list-flat", 60292),
  listSelection: a("list-selection", 60293),
  selection: a("selection", 60293),
  listTree: a("list-tree", 60294),
  debugBreakpointFunctionUnverified: a("debug-breakpoint-function-unverified", 60295),
  debugBreakpointFunction: a("debug-breakpoint-function", 60296),
  debugBreakpointFunctionDisabled: a("debug-breakpoint-function-disabled", 60296),
  debugStackframeActive: a("debug-stackframe-active", 60297),
  circleSmallFilled: a("circle-small-filled", 60298),
  debugStackframeDot: a("debug-stackframe-dot", 60298),
  terminalDecorationMark: a("terminal-decoration-mark", 60298),
  debugStackframe: a("debug-stackframe", 60299),
  debugStackframeFocused: a("debug-stackframe-focused", 60299),
  debugBreakpointUnsupported: a("debug-breakpoint-unsupported", 60300),
  symbolString: a("symbol-string", 60301),
  debugReverseContinue: a("debug-reverse-continue", 60302),
  debugStepBack: a("debug-step-back", 60303),
  debugRestartFrame: a("debug-restart-frame", 60304),
  debugAlt: a("debug-alt", 60305),
  callIncoming: a("call-incoming", 60306),
  callOutgoing: a("call-outgoing", 60307),
  menu: a("menu", 60308),
  expandAll: a("expand-all", 60309),
  feedback: a("feedback", 60310),
  gitPullRequestReviewer: a("git-pull-request-reviewer", 60310),
  groupByRefType: a("group-by-ref-type", 60311),
  ungroupByRefType: a("ungroup-by-ref-type", 60312),
  account: a("account", 60313),
  gitPullRequestAssignee: a("git-pull-request-assignee", 60313),
  bellDot: a("bell-dot", 60314),
  debugConsole: a("debug-console", 60315),
  library: a("library", 60316),
  output: a("output", 60317),
  runAll: a("run-all", 60318),
  syncIgnored: a("sync-ignored", 60319),
  pinned: a("pinned", 60320),
  githubInverted: a("github-inverted", 60321),
  serverProcess: a("server-process", 60322),
  serverEnvironment: a("server-environment", 60323),
  pass: a("pass", 60324),
  issueClosed: a("issue-closed", 60324),
  stopCircle: a("stop-circle", 60325),
  playCircle: a("play-circle", 60326),
  record: a("record", 60327),
  debugAltSmall: a("debug-alt-small", 60328),
  vmConnect: a("vm-connect", 60329),
  cloud: a("cloud", 60330),
  merge: a("merge", 60331),
  export: a("export", 60332),
  graphLeft: a("graph-left", 60333),
  magnet: a("magnet", 60334),
  notebook: a("notebook", 60335),
  redo: a("redo", 60336),
  checkAll: a("check-all", 60337),
  pinnedDirty: a("pinned-dirty", 60338),
  passFilled: a("pass-filled", 60339),
  circleLargeFilled: a("circle-large-filled", 60340),
  circleLarge: a("circle-large", 60341),
  circleLargeOutline: a("circle-large-outline", 60341),
  combine: a("combine", 60342),
  gather: a("gather", 60342),
  table: a("table", 60343),
  variableGroup: a("variable-group", 60344),
  typeHierarchy: a("type-hierarchy", 60345),
  typeHierarchySub: a("type-hierarchy-sub", 60346),
  typeHierarchySuper: a("type-hierarchy-super", 60347),
  gitPullRequestCreate: a("git-pull-request-create", 60348),
  runAbove: a("run-above", 60349),
  runBelow: a("run-below", 60350),
  notebookTemplate: a("notebook-template", 60351),
  debugRerun: a("debug-rerun", 60352),
  workspaceTrusted: a("workspace-trusted", 60353),
  workspaceUntrusted: a("workspace-untrusted", 60354),
  workspaceUnknown: a("workspace-unknown", 60355),
  terminalCmd: a("terminal-cmd", 60356),
  terminalDebian: a("terminal-debian", 60357),
  terminalLinux: a("terminal-linux", 60358),
  terminalPowershell: a("terminal-powershell", 60359),
  terminalTmux: a("terminal-tmux", 60360),
  terminalUbuntu: a("terminal-ubuntu", 60361),
  terminalBash: a("terminal-bash", 60362),
  arrowSwap: a("arrow-swap", 60363),
  copy: a("copy", 60364),
  personAdd: a("person-add", 60365),
  filterFilled: a("filter-filled", 60366),
  wand: a("wand", 60367),
  debugLineByLine: a("debug-line-by-line", 60368),
  inspect: a("inspect", 60369),
  layers: a("layers", 60370),
  layersDot: a("layers-dot", 60371),
  layersActive: a("layers-active", 60372),
  compass: a("compass", 60373),
  compassDot: a("compass-dot", 60374),
  compassActive: a("compass-active", 60375),
  azure: a("azure", 60376),
  issueDraft: a("issue-draft", 60377),
  gitPullRequestClosed: a("git-pull-request-closed", 60378),
  gitPullRequestDraft: a("git-pull-request-draft", 60379),
  debugAll: a("debug-all", 60380),
  debugCoverage: a("debug-coverage", 60381),
  runErrors: a("run-errors", 60382),
  folderLibrary: a("folder-library", 60383),
  debugContinueSmall: a("debug-continue-small", 60384),
  beakerStop: a("beaker-stop", 60385),
  graphLine: a("graph-line", 60386),
  graphScatter: a("graph-scatter", 60387),
  pieChart: a("pie-chart", 60388),
  bracket: a("bracket", 60175),
  bracketDot: a("bracket-dot", 60389),
  bracketError: a("bracket-error", 60390),
  lockSmall: a("lock-small", 60391),
  azureDevops: a("azure-devops", 60392),
  verifiedFilled: a("verified-filled", 60393),
  newline: a("newline", 60394),
  layout: a("layout", 60395),
  layoutActivitybarLeft: a("layout-activitybar-left", 60396),
  layoutActivitybarRight: a("layout-activitybar-right", 60397),
  layoutPanelLeft: a("layout-panel-left", 60398),
  layoutPanelCenter: a("layout-panel-center", 60399),
  layoutPanelJustify: a("layout-panel-justify", 60400),
  layoutPanelRight: a("layout-panel-right", 60401),
  layoutPanel: a("layout-panel", 60402),
  layoutSidebarLeft: a("layout-sidebar-left", 60403),
  layoutSidebarRight: a("layout-sidebar-right", 60404),
  layoutStatusbar: a("layout-statusbar", 60405),
  layoutMenubar: a("layout-menubar", 60406),
  layoutCentered: a("layout-centered", 60407),
  target: a("target", 60408),
  indent: a("indent", 60409),
  recordSmall: a("record-small", 60410),
  errorSmall: a("error-small", 60411),
  terminalDecorationError: a("terminal-decoration-error", 60411),
  arrowCircleDown: a("arrow-circle-down", 60412),
  arrowCircleLeft: a("arrow-circle-left", 60413),
  arrowCircleRight: a("arrow-circle-right", 60414),
  arrowCircleUp: a("arrow-circle-up", 60415),
  layoutSidebarRightOff: a("layout-sidebar-right-off", 60416),
  layoutPanelOff: a("layout-panel-off", 60417),
  layoutSidebarLeftOff: a("layout-sidebar-left-off", 60418),
  blank: a("blank", 60419),
  heartFilled: a("heart-filled", 60420),
  map: a("map", 60421),
  mapHorizontal: a("map-horizontal", 60421),
  foldHorizontal: a("fold-horizontal", 60421),
  mapFilled: a("map-filled", 60422),
  mapHorizontalFilled: a("map-horizontal-filled", 60422),
  foldHorizontalFilled: a("fold-horizontal-filled", 60422),
  circleSmall: a("circle-small", 60423),
  bellSlash: a("bell-slash", 60424),
  bellSlashDot: a("bell-slash-dot", 60425),
  commentUnresolved: a("comment-unresolved", 60426),
  gitPullRequestGoToChanges: a("git-pull-request-go-to-changes", 60427),
  gitPullRequestNewChanges: a("git-pull-request-new-changes", 60428),
  searchFuzzy: a("search-fuzzy", 60429),
  commentDraft: a("comment-draft", 60430),
  send: a("send", 60431),
  sparkle: a("sparkle", 60432),
  insert: a("insert", 60433),
  mic: a("mic", 60434),
  thumbsdownFilled: a("thumbsdown-filled", 60435),
  thumbsupFilled: a("thumbsup-filled", 60436),
  coffee: a("coffee", 60437),
  snake: a("snake", 60438),
  game: a("game", 60439),
  vr: a("vr", 60440),
  chip: a("chip", 60441),
  piano: a("piano", 60442),
  music: a("music", 60443),
  micFilled: a("mic-filled", 60444),
  repoFetch: a("repo-fetch", 60445),
  copilot: a("copilot", 60446),
  lightbulbSparkle: a("lightbulb-sparkle", 60447),
  robot: a("robot", 60448),
  sparkleFilled: a("sparkle-filled", 60449),
  diffSingle: a("diff-single", 60450),
  diffMultiple: a("diff-multiple", 60451),
  surroundWith: a("surround-with", 60452),
  share: a("share", 60453),
  gitStash: a("git-stash", 60454),
  gitStashApply: a("git-stash-apply", 60455),
  gitStashPop: a("git-stash-pop", 60456),
  vscode: a("vscode", 60457),
  vscodeInsiders: a("vscode-insiders", 60458),
  codeOss: a("code-oss", 60459),
  runCoverage: a("run-coverage", 60460),
  runAllCoverage: a("run-all-coverage", 60461),
  coverage: a("coverage", 60462),
  githubProject: a("github-project", 60463),
  mapVertical: a("map-vertical", 60464),
  foldVertical: a("fold-vertical", 60464),
  mapVerticalFilled: a("map-vertical-filled", 60465),
  foldVerticalFilled: a("fold-vertical-filled", 60465),
  goToSearch: a("go-to-search", 60466),
  percentage: a("percentage", 60467),
  sortPercentage: a("sort-percentage", 60467),
  attach: a("attach", 60468),
  goToEditingSession: a("go-to-editing-session", 60469),
  editSession: a("edit-session", 60470),
  codeReview: a("code-review", 60471)
}, Ra = {
  dialogError: a("dialog-error", "error"),
  dialogWarning: a("dialog-warning", "warning"),
  dialogInfo: a("dialog-info", "info"),
  dialogClose: a("dialog-close", "close"),
  treeItemExpanded: a("tree-item-expanded", "chevron-down"),
  treeFilterOnTypeOn: a("tree-filter-on-type-on", "list-filter"),
  treeFilterOnTypeOff: a("tree-filter-on-type-off", "list-selection"),
  treeFilterClear: a("tree-filter-clear", "close"),
  treeItemLoading: a("tree-item-loading", "loading"),
  menuSelection: a("menu-selection", "check"),
  menuSubmenu: a("menu-submenu", "chevron-right"),
  menuBarMore: a("menubar-more", "more"),
  scrollbarButtonLeft: a("scrollbar-button-left", "triangle-left"),
  scrollbarButtonRight: a("scrollbar-button-right", "triangle-right"),
  scrollbarButtonUp: a("scrollbar-button-up", "triangle-up"),
  scrollbarButtonDown: a("scrollbar-button-down", "triangle-down"),
  toolBarMore: a("toolbar-more", "more"),
  quickInputBack: a("quick-input-back", "arrow-left"),
  dropDownButton: a("drop-down-button", 60084),
  symbolCustomColor: a("symbol-customcolor", 60252),
  exportIcon: a("export", 60332),
  workspaceUnspecified: a("workspace-unspecified", 60355),
  newLine: a("newline", 60394),
  thumbsDownFilled: a("thumbsdown-filled", 60435),
  thumbsUpFilled: a("thumbsup-filled", 60436),
  gitFetch: a("git-fetch", 60445),
  lightbulbSparkleAutofix: a("lightbulb-sparkle-autofix", 60447),
  debugBreakpointPending: a("debug-breakpoint-pending", 60377)
}, k = {
  ...Sa,
  ...Ra
};
class hs {
  constructor() {
    this._tokenizationSupports = /* @__PURE__ */ new Map(), this._factories = /* @__PURE__ */ new Map(), this._onDidChange = new de(), this.onDidChange = this._onDidChange.event, this._colorMap = null;
  }
  handleChange(e) {
    this._onDidChange.fire({
      changedLanguages: e,
      changedColorMap: !1
    });
  }
  register(e, n) {
    return this._tokenizationSupports.set(e, n), this.handleChange([e]), mt(() => {
      this._tokenizationSupports.get(e) === n && (this._tokenizationSupports.delete(e), this.handleChange([e]));
    });
  }
  get(e) {
    return this._tokenizationSupports.get(e) || null;
  }
  registerFactory(e, n) {
    var r;
    (r = this._factories.get(e)) == null || r.dispose();
    const i = new xa(this, e, n);
    return this._factories.set(e, i), mt(() => {
      const s = this._factories.get(e);
      !s || s !== i || (this._factories.delete(e), s.dispose());
    });
  }
  async getOrCreate(e) {
    const n = this.get(e);
    if (n)
      return n;
    const r = this._factories.get(e);
    return !r || r.isResolved ? null : (await r.resolve(), this.get(e));
  }
  isResolved(e) {
    if (this.get(e))
      return !0;
    const n = this._factories.get(e);
    return !!(!n || n.isResolved);
  }
  setColorMap(e) {
    this._colorMap = e, this._onDidChange.fire({
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
class xa extends At {
  get isResolved() {
    return this._isResolved;
  }
  constructor(e, n, r) {
    super(), this._registry = e, this._languageId = n, this._factory = r, this._isDisposed = !1, this._resolvePromise = null, this._isResolved = !1;
  }
  dispose() {
    this._isDisposed = !0, super.dispose();
  }
  async resolve() {
    return this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise;
  }
  async _create() {
    const e = await this._factory.tokenizationSupport;
    this._isResolved = !0, e && !this._isDisposed && this._register(this._registry.register(this._languageId, e));
  }
}
class Aa {
  constructor(e, n, r) {
    this.offset = e, this.type = n, this.language = r, this._tokenBrand = void 0;
  }
  toString() {
    return "(" + this.offset + ", " + this.type + ")";
  }
}
var sr;
(function(t) {
  t[t.Increase = 0] = "Increase", t[t.Decrease = 1] = "Decrease";
})(sr || (sr = {}));
var or;
(function(t) {
  const e = /* @__PURE__ */ new Map();
  e.set(0, k.symbolMethod), e.set(1, k.symbolFunction), e.set(2, k.symbolConstructor), e.set(3, k.symbolField), e.set(4, k.symbolVariable), e.set(5, k.symbolClass), e.set(6, k.symbolStruct), e.set(7, k.symbolInterface), e.set(8, k.symbolModule), e.set(9, k.symbolProperty), e.set(10, k.symbolEvent), e.set(11, k.symbolOperator), e.set(12, k.symbolUnit), e.set(13, k.symbolValue), e.set(15, k.symbolEnum), e.set(14, k.symbolConstant), e.set(15, k.symbolEnum), e.set(16, k.symbolEnumMember), e.set(17, k.symbolKeyword), e.set(27, k.symbolSnippet), e.set(18, k.symbolText), e.set(19, k.symbolColor), e.set(20, k.symbolFile), e.set(21, k.symbolReference), e.set(22, k.symbolCustomColor), e.set(23, k.symbolFolder), e.set(24, k.symbolTypeParameter), e.set(25, k.account), e.set(26, k.issues);
  function n(s) {
    let o = e.get(s);
    return o || (console.info("No codicon found for CompletionItemKind " + s), o = k.symbolProperty), o;
  }
  t.toIcon = n;
  const r = /* @__PURE__ */ new Map();
  r.set("method", 0), r.set("function", 1), r.set("constructor", 2), r.set("field", 3), r.set("variable", 4), r.set("class", 5), r.set("struct", 6), r.set("interface", 7), r.set("module", 8), r.set("property", 9), r.set("event", 10), r.set("operator", 11), r.set("unit", 12), r.set("value", 13), r.set("constant", 14), r.set("enum", 15), r.set("enum-member", 16), r.set("enumMember", 16), r.set("keyword", 17), r.set("snippet", 27), r.set("text", 18), r.set("color", 19), r.set("file", 20), r.set("reference", 21), r.set("customcolor", 22), r.set("folder", 23), r.set("type-parameter", 24), r.set("typeParameter", 24), r.set("account", 25), r.set("issue", 26);
  function i(s, o) {
    let l = r.get(s);
    return typeof l > "u" && !o && (l = 9), l;
  }
  t.fromString = i;
})(or || (or = {}));
var ar;
(function(t) {
  t[t.Automatic = 0] = "Automatic", t[t.Explicit = 1] = "Explicit";
})(ar || (ar = {}));
var lr;
(function(t) {
  t[t.Automatic = 0] = "Automatic", t[t.PasteAs = 1] = "PasteAs";
})(lr || (lr = {}));
var ur;
(function(t) {
  t[t.Invoke = 1] = "Invoke", t[t.TriggerCharacter = 2] = "TriggerCharacter", t[t.ContentChange = 3] = "ContentChange";
})(ur || (ur = {}));
var hr;
(function(t) {
  t[t.Text = 0] = "Text", t[t.Read = 1] = "Read", t[t.Write = 2] = "Write";
})(hr || (hr = {}));
z(934, "array"), z(935, "boolean"), z(936, "class"), z(937, "constant"), z(938, "constructor"), z(939, "enumeration"), z(940, "enumeration member"), z(941, "event"), z(942, "field"), z(943, "file"), z(944, "function"), z(945, "interface"), z(946, "key"), z(947, "method"), z(948, "module"), z(949, "namespace"), z(950, "null"), z(951, "number"), z(952, "object"), z(953, "operator"), z(954, "package"), z(955, "property"), z(956, "string"), z(957, "struct"), z(958, "type parameter"), z(959, "variable");
var cr;
(function(t) {
  const e = /* @__PURE__ */ new Map();
  e.set(0, k.symbolFile), e.set(1, k.symbolModule), e.set(2, k.symbolNamespace), e.set(3, k.symbolPackage), e.set(4, k.symbolClass), e.set(5, k.symbolMethod), e.set(6, k.symbolProperty), e.set(7, k.symbolField), e.set(8, k.symbolConstructor), e.set(9, k.symbolEnum), e.set(10, k.symbolInterface), e.set(11, k.symbolFunction), e.set(12, k.symbolVariable), e.set(13, k.symbolConstant), e.set(14, k.symbolString), e.set(15, k.symbolNumber), e.set(16, k.symbolBoolean), e.set(17, k.symbolArray), e.set(18, k.symbolObject), e.set(19, k.symbolKey), e.set(20, k.symbolNull), e.set(21, k.symbolEnumMember), e.set(22, k.symbolStruct), e.set(23, k.symbolEvent), e.set(24, k.symbolOperator), e.set(25, k.symbolTypeParameter);
  function n(r) {
    let i = e.get(r);
    return i || (console.info("No codicon found for SymbolKind " + r), i = k.symbolProperty), i;
  }
  t.toIcon = n;
})(cr || (cr = {}));
var dr;
(function(t) {
  t[t.AIGenerated = 1] = "AIGenerated";
})(dr || (dr = {}));
var gr;
(function(t) {
  t[t.Invoke = 0] = "Invoke", t[t.Automatic = 1] = "Automatic";
})(gr || (gr = {}));
var mr;
(function(t) {
  function e(n) {
    return !n || typeof n != "object" ? !1 : typeof n.id == "string" && typeof n.title == "string";
  }
  t.is = e;
})(mr || (mr = {}));
var fr;
(function(t) {
  t[t.Collapsed = 0] = "Collapsed", t[t.Expanded = 1] = "Expanded";
})(fr || (fr = {}));
var pr;
(function(t) {
  t[t.Unresolved = 0] = "Unresolved", t[t.Resolved = 1] = "Resolved";
})(pr || (pr = {}));
var br;
(function(t) {
  t[t.Current = 0] = "Current", t[t.Outdated = 1] = "Outdated";
})(br || (br = {}));
var wr;
(function(t) {
  t[t.Editing = 0] = "Editing", t[t.Preview = 1] = "Preview";
})(wr || (wr = {}));
var Lr;
(function(t) {
  t[t.Type = 1] = "Type", t[t.Parameter = 2] = "Parameter";
})(Lr || (Lr = {}));
new hs();
new hs();
var Cr;
(function(t) {
  t[t.None = 0] = "None", t[t.Option = 1] = "Option", t[t.Default = 2] = "Default", t[t.Preferred = 3] = "Preferred";
})(Cr || (Cr = {}));
var vr;
(function(t) {
  t[t.Invoke = 0] = "Invoke", t[t.Automatic = 1] = "Automatic";
})(vr || (vr = {}));
var yr;
(function(t) {
  t[t.Unknown = 0] = "Unknown", t[t.Disabled = 1] = "Disabled", t[t.Enabled = 2] = "Enabled";
})(yr || (yr = {}));
var _r;
(function(t) {
  t[t.Invoke = 1] = "Invoke", t[t.Auto = 2] = "Auto";
})(_r || (_r = {}));
var Nr;
(function(t) {
  t[t.None = 0] = "None", t[t.KeepWhitespace = 1] = "KeepWhitespace", t[t.InsertAsSnippet = 4] = "InsertAsSnippet";
})(Nr || (Nr = {}));
var Er;
(function(t) {
  t[t.Method = 0] = "Method", t[t.Function = 1] = "Function", t[t.Constructor = 2] = "Constructor", t[t.Field = 3] = "Field", t[t.Variable = 4] = "Variable", t[t.Class = 5] = "Class", t[t.Struct = 6] = "Struct", t[t.Interface = 7] = "Interface", t[t.Module = 8] = "Module", t[t.Property = 9] = "Property", t[t.Event = 10] = "Event", t[t.Operator = 11] = "Operator", t[t.Unit = 12] = "Unit", t[t.Value = 13] = "Value", t[t.Constant = 14] = "Constant", t[t.Enum = 15] = "Enum", t[t.EnumMember = 16] = "EnumMember", t[t.Keyword = 17] = "Keyword", t[t.Text = 18] = "Text", t[t.Color = 19] = "Color", t[t.File = 20] = "File", t[t.Reference = 21] = "Reference", t[t.Customcolor = 22] = "Customcolor", t[t.Folder = 23] = "Folder", t[t.TypeParameter = 24] = "TypeParameter", t[t.User = 25] = "User", t[t.Issue = 26] = "Issue", t[t.Snippet = 27] = "Snippet";
})(Er || (Er = {}));
var Sr;
(function(t) {
  t[t.Deprecated = 1] = "Deprecated";
})(Sr || (Sr = {}));
var Rr;
(function(t) {
  t[t.Invoke = 0] = "Invoke", t[t.TriggerCharacter = 1] = "TriggerCharacter", t[t.TriggerForIncompleteCompletions = 2] = "TriggerForIncompleteCompletions";
})(Rr || (Rr = {}));
var xr;
(function(t) {
  t[t.EXACT = 0] = "EXACT", t[t.ABOVE = 1] = "ABOVE", t[t.BELOW = 2] = "BELOW";
})(xr || (xr = {}));
var Ar;
(function(t) {
  t[t.NotSet = 0] = "NotSet", t[t.ContentFlush = 1] = "ContentFlush", t[t.RecoverFromMarkers = 2] = "RecoverFromMarkers", t[t.Explicit = 3] = "Explicit", t[t.Paste = 4] = "Paste", t[t.Undo = 5] = "Undo", t[t.Redo = 6] = "Redo";
})(Ar || (Ar = {}));
var Mr;
(function(t) {
  t[t.LF = 1] = "LF", t[t.CRLF = 2] = "CRLF";
})(Mr || (Mr = {}));
var kr;
(function(t) {
  t[t.Text = 0] = "Text", t[t.Read = 1] = "Read", t[t.Write = 2] = "Write";
})(kr || (kr = {}));
var Tr;
(function(t) {
  t[t.None = 0] = "None", t[t.Keep = 1] = "Keep", t[t.Brackets = 2] = "Brackets", t[t.Advanced = 3] = "Advanced", t[t.Full = 4] = "Full";
})(Tr || (Tr = {}));
var Pr;
(function(t) {
  t[t.acceptSuggestionOnCommitCharacter = 0] = "acceptSuggestionOnCommitCharacter", t[t.acceptSuggestionOnEnter = 1] = "acceptSuggestionOnEnter", t[t.accessibilitySupport = 2] = "accessibilitySupport", t[t.accessibilityPageSize = 3] = "accessibilityPageSize", t[t.ariaLabel = 4] = "ariaLabel", t[t.ariaRequired = 5] = "ariaRequired", t[t.autoClosingBrackets = 6] = "autoClosingBrackets", t[t.autoClosingComments = 7] = "autoClosingComments", t[t.screenReaderAnnounceInlineSuggestion = 8] = "screenReaderAnnounceInlineSuggestion", t[t.autoClosingDelete = 9] = "autoClosingDelete", t[t.autoClosingOvertype = 10] = "autoClosingOvertype", t[t.autoClosingQuotes = 11] = "autoClosingQuotes", t[t.autoIndent = 12] = "autoIndent", t[t.automaticLayout = 13] = "automaticLayout", t[t.autoSurround = 14] = "autoSurround", t[t.bracketPairColorization = 15] = "bracketPairColorization", t[t.guides = 16] = "guides", t[t.codeLens = 17] = "codeLens", t[t.codeLensFontFamily = 18] = "codeLensFontFamily", t[t.codeLensFontSize = 19] = "codeLensFontSize", t[t.colorDecorators = 20] = "colorDecorators", t[t.colorDecoratorsLimit = 21] = "colorDecoratorsLimit", t[t.columnSelection = 22] = "columnSelection", t[t.comments = 23] = "comments", t[t.contextmenu = 24] = "contextmenu", t[t.copyWithSyntaxHighlighting = 25] = "copyWithSyntaxHighlighting", t[t.cursorBlinking = 26] = "cursorBlinking", t[t.cursorSmoothCaretAnimation = 27] = "cursorSmoothCaretAnimation", t[t.cursorStyle = 28] = "cursorStyle", t[t.cursorSurroundingLines = 29] = "cursorSurroundingLines", t[t.cursorSurroundingLinesStyle = 30] = "cursorSurroundingLinesStyle", t[t.cursorWidth = 31] = "cursorWidth", t[t.disableLayerHinting = 32] = "disableLayerHinting", t[t.disableMonospaceOptimizations = 33] = "disableMonospaceOptimizations", t[t.domReadOnly = 34] = "domReadOnly", t[t.dragAndDrop = 35] = "dragAndDrop", t[t.dropIntoEditor = 36] = "dropIntoEditor", t[t.experimentalEditContextEnabled = 37] = "experimentalEditContextEnabled", t[t.emptySelectionClipboard = 38] = "emptySelectionClipboard", t[t.experimentalGpuAcceleration = 39] = "experimentalGpuAcceleration", t[t.experimentalWhitespaceRendering = 40] = "experimentalWhitespaceRendering", t[t.extraEditorClassName = 41] = "extraEditorClassName", t[t.fastScrollSensitivity = 42] = "fastScrollSensitivity", t[t.find = 43] = "find", t[t.fixedOverflowWidgets = 44] = "fixedOverflowWidgets", t[t.folding = 45] = "folding", t[t.foldingStrategy = 46] = "foldingStrategy", t[t.foldingHighlight = 47] = "foldingHighlight", t[t.foldingImportsByDefault = 48] = "foldingImportsByDefault", t[t.foldingMaximumRegions = 49] = "foldingMaximumRegions", t[t.unfoldOnClickAfterEndOfLine = 50] = "unfoldOnClickAfterEndOfLine", t[t.fontFamily = 51] = "fontFamily", t[t.fontInfo = 52] = "fontInfo", t[t.fontLigatures = 53] = "fontLigatures", t[t.fontSize = 54] = "fontSize", t[t.fontWeight = 55] = "fontWeight", t[t.fontVariations = 56] = "fontVariations", t[t.formatOnPaste = 57] = "formatOnPaste", t[t.formatOnType = 58] = "formatOnType", t[t.glyphMargin = 59] = "glyphMargin", t[t.gotoLocation = 60] = "gotoLocation", t[t.hideCursorInOverviewRuler = 61] = "hideCursorInOverviewRuler", t[t.hover = 62] = "hover", t[t.inDiffEditor = 63] = "inDiffEditor", t[t.inlineSuggest = 64] = "inlineSuggest", t[t.letterSpacing = 65] = "letterSpacing", t[t.lightbulb = 66] = "lightbulb", t[t.lineDecorationsWidth = 67] = "lineDecorationsWidth", t[t.lineHeight = 68] = "lineHeight", t[t.lineNumbers = 69] = "lineNumbers", t[t.lineNumbersMinChars = 70] = "lineNumbersMinChars", t[t.linkedEditing = 71] = "linkedEditing", t[t.links = 72] = "links", t[t.matchBrackets = 73] = "matchBrackets", t[t.minimap = 74] = "minimap", t[t.mouseStyle = 75] = "mouseStyle", t[t.mouseWheelScrollSensitivity = 76] = "mouseWheelScrollSensitivity", t[t.mouseWheelZoom = 77] = "mouseWheelZoom", t[t.multiCursorMergeOverlapping = 78] = "multiCursorMergeOverlapping", t[t.multiCursorModifier = 79] = "multiCursorModifier", t[t.multiCursorPaste = 80] = "multiCursorPaste", t[t.multiCursorLimit = 81] = "multiCursorLimit", t[t.occurrencesHighlight = 82] = "occurrencesHighlight", t[t.occurrencesHighlightDelay = 83] = "occurrencesHighlightDelay", t[t.overviewRulerBorder = 84] = "overviewRulerBorder", t[t.overviewRulerLanes = 85] = "overviewRulerLanes", t[t.padding = 86] = "padding", t[t.pasteAs = 87] = "pasteAs", t[t.parameterHints = 88] = "parameterHints", t[t.peekWidgetDefaultFocus = 89] = "peekWidgetDefaultFocus", t[t.placeholder = 90] = "placeholder", t[t.definitionLinkOpensInPeek = 91] = "definitionLinkOpensInPeek", t[t.quickSuggestions = 92] = "quickSuggestions", t[t.quickSuggestionsDelay = 93] = "quickSuggestionsDelay", t[t.readOnly = 94] = "readOnly", t[t.readOnlyMessage = 95] = "readOnlyMessage", t[t.renameOnType = 96] = "renameOnType", t[t.renderControlCharacters = 97] = "renderControlCharacters", t[t.renderFinalNewline = 98] = "renderFinalNewline", t[t.renderLineHighlight = 99] = "renderLineHighlight", t[t.renderLineHighlightOnlyWhenFocus = 100] = "renderLineHighlightOnlyWhenFocus", t[t.renderValidationDecorations = 101] = "renderValidationDecorations", t[t.renderWhitespace = 102] = "renderWhitespace", t[t.revealHorizontalRightPadding = 103] = "revealHorizontalRightPadding", t[t.roundedSelection = 104] = "roundedSelection", t[t.rulers = 105] = "rulers", t[t.scrollbar = 106] = "scrollbar", t[t.scrollBeyondLastColumn = 107] = "scrollBeyondLastColumn", t[t.scrollBeyondLastLine = 108] = "scrollBeyondLastLine", t[t.scrollPredominantAxis = 109] = "scrollPredominantAxis", t[t.selectionClipboard = 110] = "selectionClipboard", t[t.selectionHighlight = 111] = "selectionHighlight", t[t.selectOnLineNumbers = 112] = "selectOnLineNumbers", t[t.showFoldingControls = 113] = "showFoldingControls", t[t.showUnused = 114] = "showUnused", t[t.snippetSuggestions = 115] = "snippetSuggestions", t[t.smartSelect = 116] = "smartSelect", t[t.smoothScrolling = 117] = "smoothScrolling", t[t.stickyScroll = 118] = "stickyScroll", t[t.stickyTabStops = 119] = "stickyTabStops", t[t.stopRenderingLineAfter = 120] = "stopRenderingLineAfter", t[t.suggest = 121] = "suggest", t[t.suggestFontSize = 122] = "suggestFontSize", t[t.suggestLineHeight = 123] = "suggestLineHeight", t[t.suggestOnTriggerCharacters = 124] = "suggestOnTriggerCharacters", t[t.suggestSelection = 125] = "suggestSelection", t[t.tabCompletion = 126] = "tabCompletion", t[t.tabIndex = 127] = "tabIndex", t[t.unicodeHighlighting = 128] = "unicodeHighlighting", t[t.unusualLineTerminators = 129] = "unusualLineTerminators", t[t.useShadowDOM = 130] = "useShadowDOM", t[t.useTabStops = 131] = "useTabStops", t[t.wordBreak = 132] = "wordBreak", t[t.wordSegmenterLocales = 133] = "wordSegmenterLocales", t[t.wordSeparators = 134] = "wordSeparators", t[t.wordWrap = 135] = "wordWrap", t[t.wordWrapBreakAfterCharacters = 136] = "wordWrapBreakAfterCharacters", t[t.wordWrapBreakBeforeCharacters = 137] = "wordWrapBreakBeforeCharacters", t[t.wordWrapColumn = 138] = "wordWrapColumn", t[t.wordWrapOverride1 = 139] = "wordWrapOverride1", t[t.wordWrapOverride2 = 140] = "wordWrapOverride2", t[t.wrappingIndent = 141] = "wrappingIndent", t[t.wrappingStrategy = 142] = "wrappingStrategy", t[t.showDeprecated = 143] = "showDeprecated", t[t.inlayHints = 144] = "inlayHints", t[t.editorClassName = 145] = "editorClassName", t[t.pixelRatio = 146] = "pixelRatio", t[t.tabFocusMode = 147] = "tabFocusMode", t[t.layoutInfo = 148] = "layoutInfo", t[t.wrappingInfo = 149] = "wrappingInfo", t[t.defaultColorDecorators = 150] = "defaultColorDecorators", t[t.colorDecoratorsActivatedOn = 151] = "colorDecoratorsActivatedOn", t[t.inlineCompletionsAccessibilityVerbose = 152] = "inlineCompletionsAccessibilityVerbose";
})(Pr || (Pr = {}));
var Or;
(function(t) {
  t[t.TextDefined = 0] = "TextDefined", t[t.LF = 1] = "LF", t[t.CRLF = 2] = "CRLF";
})(Or || (Or = {}));
var Ir;
(function(t) {
  t[t.LF = 0] = "LF", t[t.CRLF = 1] = "CRLF";
})(Ir || (Ir = {}));
var Fr;
(function(t) {
  t[t.Left = 1] = "Left", t[t.Center = 2] = "Center", t[t.Right = 3] = "Right";
})(Fr || (Fr = {}));
var Dr;
(function(t) {
  t[t.Increase = 0] = "Increase", t[t.Decrease = 1] = "Decrease";
})(Dr || (Dr = {}));
var qr;
(function(t) {
  t[t.None = 0] = "None", t[t.Indent = 1] = "Indent", t[t.IndentOutdent = 2] = "IndentOutdent", t[t.Outdent = 3] = "Outdent";
})(qr || (qr = {}));
var Kr;
(function(t) {
  t[t.Both = 0] = "Both", t[t.Right = 1] = "Right", t[t.Left = 2] = "Left", t[t.None = 3] = "None";
})(Kr || (Kr = {}));
var Vr;
(function(t) {
  t[t.Type = 1] = "Type", t[t.Parameter = 2] = "Parameter";
})(Vr || (Vr = {}));
var Br;
(function(t) {
  t[t.Automatic = 0] = "Automatic", t[t.Explicit = 1] = "Explicit";
})(Br || (Br = {}));
var Ur;
(function(t) {
  t[t.Invoke = 0] = "Invoke", t[t.Automatic = 1] = "Automatic";
})(Ur || (Ur = {}));
var cn;
(function(t) {
  t[t.DependsOnKbLayout = -1] = "DependsOnKbLayout", t[t.Unknown = 0] = "Unknown", t[t.Backspace = 1] = "Backspace", t[t.Tab = 2] = "Tab", t[t.Enter = 3] = "Enter", t[t.Shift = 4] = "Shift", t[t.Ctrl = 5] = "Ctrl", t[t.Alt = 6] = "Alt", t[t.PauseBreak = 7] = "PauseBreak", t[t.CapsLock = 8] = "CapsLock", t[t.Escape = 9] = "Escape", t[t.Space = 10] = "Space", t[t.PageUp = 11] = "PageUp", t[t.PageDown = 12] = "PageDown", t[t.End = 13] = "End", t[t.Home = 14] = "Home", t[t.LeftArrow = 15] = "LeftArrow", t[t.UpArrow = 16] = "UpArrow", t[t.RightArrow = 17] = "RightArrow", t[t.DownArrow = 18] = "DownArrow", t[t.Insert = 19] = "Insert", t[t.Delete = 20] = "Delete", t[t.Digit0 = 21] = "Digit0", t[t.Digit1 = 22] = "Digit1", t[t.Digit2 = 23] = "Digit2", t[t.Digit3 = 24] = "Digit3", t[t.Digit4 = 25] = "Digit4", t[t.Digit5 = 26] = "Digit5", t[t.Digit6 = 27] = "Digit6", t[t.Digit7 = 28] = "Digit7", t[t.Digit8 = 29] = "Digit8", t[t.Digit9 = 30] = "Digit9", t[t.KeyA = 31] = "KeyA", t[t.KeyB = 32] = "KeyB", t[t.KeyC = 33] = "KeyC", t[t.KeyD = 34] = "KeyD", t[t.KeyE = 35] = "KeyE", t[t.KeyF = 36] = "KeyF", t[t.KeyG = 37] = "KeyG", t[t.KeyH = 38] = "KeyH", t[t.KeyI = 39] = "KeyI", t[t.KeyJ = 40] = "KeyJ", t[t.KeyK = 41] = "KeyK", t[t.KeyL = 42] = "KeyL", t[t.KeyM = 43] = "KeyM", t[t.KeyN = 44] = "KeyN", t[t.KeyO = 45] = "KeyO", t[t.KeyP = 46] = "KeyP", t[t.KeyQ = 47] = "KeyQ", t[t.KeyR = 48] = "KeyR", t[t.KeyS = 49] = "KeyS", t[t.KeyT = 50] = "KeyT", t[t.KeyU = 51] = "KeyU", t[t.KeyV = 52] = "KeyV", t[t.KeyW = 53] = "KeyW", t[t.KeyX = 54] = "KeyX", t[t.KeyY = 55] = "KeyY", t[t.KeyZ = 56] = "KeyZ", t[t.Meta = 57] = "Meta", t[t.ContextMenu = 58] = "ContextMenu", t[t.F1 = 59] = "F1", t[t.F2 = 60] = "F2", t[t.F3 = 61] = "F3", t[t.F4 = 62] = "F4", t[t.F5 = 63] = "F5", t[t.F6 = 64] = "F6", t[t.F7 = 65] = "F7", t[t.F8 = 66] = "F8", t[t.F9 = 67] = "F9", t[t.F10 = 68] = "F10", t[t.F11 = 69] = "F11", t[t.F12 = 70] = "F12", t[t.F13 = 71] = "F13", t[t.F14 = 72] = "F14", t[t.F15 = 73] = "F15", t[t.F16 = 74] = "F16", t[t.F17 = 75] = "F17", t[t.F18 = 76] = "F18", t[t.F19 = 77] = "F19", t[t.F20 = 78] = "F20", t[t.F21 = 79] = "F21", t[t.F22 = 80] = "F22", t[t.F23 = 81] = "F23", t[t.F24 = 82] = "F24", t[t.NumLock = 83] = "NumLock", t[t.ScrollLock = 84] = "ScrollLock", t[t.Semicolon = 85] = "Semicolon", t[t.Equal = 86] = "Equal", t[t.Comma = 87] = "Comma", t[t.Minus = 88] = "Minus", t[t.Period = 89] = "Period", t[t.Slash = 90] = "Slash", t[t.Backquote = 91] = "Backquote", t[t.BracketLeft = 92] = "BracketLeft", t[t.Backslash = 93] = "Backslash", t[t.BracketRight = 94] = "BracketRight", t[t.Quote = 95] = "Quote", t[t.OEM_8 = 96] = "OEM_8", t[t.IntlBackslash = 97] = "IntlBackslash", t[t.Numpad0 = 98] = "Numpad0", t[t.Numpad1 = 99] = "Numpad1", t[t.Numpad2 = 100] = "Numpad2", t[t.Numpad3 = 101] = "Numpad3", t[t.Numpad4 = 102] = "Numpad4", t[t.Numpad5 = 103] = "Numpad5", t[t.Numpad6 = 104] = "Numpad6", t[t.Numpad7 = 105] = "Numpad7", t[t.Numpad8 = 106] = "Numpad8", t[t.Numpad9 = 107] = "Numpad9", t[t.NumpadMultiply = 108] = "NumpadMultiply", t[t.NumpadAdd = 109] = "NumpadAdd", t[t.NUMPAD_SEPARATOR = 110] = "NUMPAD_SEPARATOR", t[t.NumpadSubtract = 111] = "NumpadSubtract", t[t.NumpadDecimal = 112] = "NumpadDecimal", t[t.NumpadDivide = 113] = "NumpadDivide", t[t.KEY_IN_COMPOSITION = 114] = "KEY_IN_COMPOSITION", t[t.ABNT_C1 = 115] = "ABNT_C1", t[t.ABNT_C2 = 116] = "ABNT_C2", t[t.AudioVolumeMute = 117] = "AudioVolumeMute", t[t.AudioVolumeUp = 118] = "AudioVolumeUp", t[t.AudioVolumeDown = 119] = "AudioVolumeDown", t[t.BrowserSearch = 120] = "BrowserSearch", t[t.BrowserHome = 121] = "BrowserHome", t[t.BrowserBack = 122] = "BrowserBack", t[t.BrowserForward = 123] = "BrowserForward", t[t.MediaTrackNext = 124] = "MediaTrackNext", t[t.MediaTrackPrevious = 125] = "MediaTrackPrevious", t[t.MediaStop = 126] = "MediaStop", t[t.MediaPlayPause = 127] = "MediaPlayPause", t[t.LaunchMediaPlayer = 128] = "LaunchMediaPlayer", t[t.LaunchMail = 129] = "LaunchMail", t[t.LaunchApp2 = 130] = "LaunchApp2", t[t.Clear = 131] = "Clear", t[t.MAX_VALUE = 132] = "MAX_VALUE";
})(cn || (cn = {}));
var dn;
(function(t) {
  t[t.Hint = 1] = "Hint", t[t.Info = 2] = "Info", t[t.Warning = 4] = "Warning", t[t.Error = 8] = "Error";
})(dn || (dn = {}));
var gn;
(function(t) {
  t[t.Unnecessary = 1] = "Unnecessary", t[t.Deprecated = 2] = "Deprecated";
})(gn || (gn = {}));
var $r;
(function(t) {
  t[t.Inline = 1] = "Inline", t[t.Gutter = 2] = "Gutter";
})($r || ($r = {}));
var zr;
(function(t) {
  t[t.Normal = 1] = "Normal", t[t.Underlined = 2] = "Underlined";
})(zr || (zr = {}));
var Wr;
(function(t) {
  t[t.UNKNOWN = 0] = "UNKNOWN", t[t.TEXTAREA = 1] = "TEXTAREA", t[t.GUTTER_GLYPH_MARGIN = 2] = "GUTTER_GLYPH_MARGIN", t[t.GUTTER_LINE_NUMBERS = 3] = "GUTTER_LINE_NUMBERS", t[t.GUTTER_LINE_DECORATIONS = 4] = "GUTTER_LINE_DECORATIONS", t[t.GUTTER_VIEW_ZONE = 5] = "GUTTER_VIEW_ZONE", t[t.CONTENT_TEXT = 6] = "CONTENT_TEXT", t[t.CONTENT_EMPTY = 7] = "CONTENT_EMPTY", t[t.CONTENT_VIEW_ZONE = 8] = "CONTENT_VIEW_ZONE", t[t.CONTENT_WIDGET = 9] = "CONTENT_WIDGET", t[t.OVERVIEW_RULER = 10] = "OVERVIEW_RULER", t[t.SCROLLBAR = 11] = "SCROLLBAR", t[t.OVERLAY_WIDGET = 12] = "OVERLAY_WIDGET", t[t.OUTSIDE_EDITOR = 13] = "OUTSIDE_EDITOR";
})(Wr || (Wr = {}));
var Hr;
(function(t) {
  t[t.AIGenerated = 1] = "AIGenerated";
})(Hr || (Hr = {}));
var jr;
(function(t) {
  t[t.Invoke = 0] = "Invoke", t[t.Automatic = 1] = "Automatic";
})(jr || (jr = {}));
var Gr;
(function(t) {
  t[t.TOP_RIGHT_CORNER = 0] = "TOP_RIGHT_CORNER", t[t.BOTTOM_RIGHT_CORNER = 1] = "BOTTOM_RIGHT_CORNER", t[t.TOP_CENTER = 2] = "TOP_CENTER";
})(Gr || (Gr = {}));
var Xr;
(function(t) {
  t[t.Left = 1] = "Left", t[t.Center = 2] = "Center", t[t.Right = 4] = "Right", t[t.Full = 7] = "Full";
})(Xr || (Xr = {}));
var Jr;
(function(t) {
  t[t.Word = 0] = "Word", t[t.Line = 1] = "Line", t[t.Suggest = 2] = "Suggest";
})(Jr || (Jr = {}));
var Zr;
(function(t) {
  t[t.Left = 0] = "Left", t[t.Right = 1] = "Right", t[t.None = 2] = "None", t[t.LeftOfInjectedText = 3] = "LeftOfInjectedText", t[t.RightOfInjectedText = 4] = "RightOfInjectedText";
})(Zr || (Zr = {}));
var Yr;
(function(t) {
  t[t.Off = 0] = "Off", t[t.On = 1] = "On", t[t.Relative = 2] = "Relative", t[t.Interval = 3] = "Interval", t[t.Custom = 4] = "Custom";
})(Yr || (Yr = {}));
var Qr;
(function(t) {
  t[t.None = 0] = "None", t[t.Text = 1] = "Text", t[t.Blocks = 2] = "Blocks";
})(Qr || (Qr = {}));
var ei;
(function(t) {
  t[t.Smooth = 0] = "Smooth", t[t.Immediate = 1] = "Immediate";
})(ei || (ei = {}));
var ti;
(function(t) {
  t[t.Auto = 1] = "Auto", t[t.Hidden = 2] = "Hidden", t[t.Visible = 3] = "Visible";
})(ti || (ti = {}));
var mn;
(function(t) {
  t[t.LTR = 0] = "LTR", t[t.RTL = 1] = "RTL";
})(mn || (mn = {}));
var ni;
(function(t) {
  t.Off = "off", t.OnCode = "onCode", t.On = "on";
})(ni || (ni = {}));
var ri;
(function(t) {
  t[t.Invoke = 1] = "Invoke", t[t.TriggerCharacter = 2] = "TriggerCharacter", t[t.ContentChange = 3] = "ContentChange";
})(ri || (ri = {}));
var ii;
(function(t) {
  t[t.File = 0] = "File", t[t.Module = 1] = "Module", t[t.Namespace = 2] = "Namespace", t[t.Package = 3] = "Package", t[t.Class = 4] = "Class", t[t.Method = 5] = "Method", t[t.Property = 6] = "Property", t[t.Field = 7] = "Field", t[t.Constructor = 8] = "Constructor", t[t.Enum = 9] = "Enum", t[t.Interface = 10] = "Interface", t[t.Function = 11] = "Function", t[t.Variable = 12] = "Variable", t[t.Constant = 13] = "Constant", t[t.String = 14] = "String", t[t.Number = 15] = "Number", t[t.Boolean = 16] = "Boolean", t[t.Array = 17] = "Array", t[t.Object = 18] = "Object", t[t.Key = 19] = "Key", t[t.Null = 20] = "Null", t[t.EnumMember = 21] = "EnumMember", t[t.Struct = 22] = "Struct", t[t.Event = 23] = "Event", t[t.Operator = 24] = "Operator", t[t.TypeParameter = 25] = "TypeParameter";
})(ii || (ii = {}));
var si;
(function(t) {
  t[t.Deprecated = 1] = "Deprecated";
})(si || (si = {}));
var oi;
(function(t) {
  t[t.Hidden = 0] = "Hidden", t[t.Blink = 1] = "Blink", t[t.Smooth = 2] = "Smooth", t[t.Phase = 3] = "Phase", t[t.Expand = 4] = "Expand", t[t.Solid = 5] = "Solid";
})(oi || (oi = {}));
var ai;
(function(t) {
  t[t.Line = 1] = "Line", t[t.Block = 2] = "Block", t[t.Underline = 3] = "Underline", t[t.LineThin = 4] = "LineThin", t[t.BlockOutline = 5] = "BlockOutline", t[t.UnderlineThin = 6] = "UnderlineThin";
})(ai || (ai = {}));
var li;
(function(t) {
  t[t.AlwaysGrowsWhenTypingAtEdges = 0] = "AlwaysGrowsWhenTypingAtEdges", t[t.NeverGrowsWhenTypingAtEdges = 1] = "NeverGrowsWhenTypingAtEdges", t[t.GrowsOnlyWhenTypingBefore = 2] = "GrowsOnlyWhenTypingBefore", t[t.GrowsOnlyWhenTypingAfter = 3] = "GrowsOnlyWhenTypingAfter";
})(li || (li = {}));
var ui;
(function(t) {
  t[t.None = 0] = "None", t[t.Same = 1] = "Same", t[t.Indent = 2] = "Indent", t[t.DeepIndent = 3] = "DeepIndent";
})(ui || (ui = {}));
const at = class {
  static chord(e, n) {
    return ta(e, n);
  }
};
at.CtrlCmd = 2048, at.Shift = 1024, at.Alt = 512, at.WinCtrl = 256;
let Ma = at;
function ka() {
  return {
    editor: void 0,
    languages: void 0,
    CancellationTokenSource: vo,
    Emitter: de,
    KeyCode: cn,
    KeyMod: Ma,
    Position: F,
    Range: E,
    Selection: ue,
    SelectionDirection: mn,
    MarkerSeverity: dn,
    MarkerTag: gn,
    Uri: ee,
    Token: Aa
  };
}
const cs = class fn {
  static getChannel(e) {
    return e.getChannel(fn.CHANNEL_NAME);
  }
  static setChannel(e, n) {
    e.setChannel(fn.CHANNEL_NAME, n);
  }
};
cs.CHANNEL_NAME = "editorWorkerHost";
let Ta = cs;
new js(10);
function Pa(t) {
  let e = [];
  for (; Object.prototype !== t; )
    e = e.concat(Object.getOwnPropertyNames(t)), t = Object.getPrototypeOf(t);
  return e;
}
function Oa(t) {
  const e = [];
  for (const n of Pa(t))
    typeof t[n] == "function" && e.push(n);
  return e;
}
function Ia(t, e) {
  const n = (i) => function() {
    const s = Array.prototype.slice.call(arguments, 0);
    return e(i, s);
  }, r = {};
  for (const i of t)
    r[i] = n(i);
  return r;
}
var hi;
(function(t) {
  t[t.Left = 1] = "Left", t[t.Center = 2] = "Center", t[t.Right = 4] = "Right", t[t.Full = 7] = "Full";
})(hi || (hi = {}));
var ci;
(function(t) {
  t[t.Left = 1] = "Left", t[t.Center = 2] = "Center", t[t.Right = 3] = "Right";
})(ci || (ci = {}));
var di;
(function(t) {
  t[t.Both = 0] = "Both", t[t.Right = 1] = "Right", t[t.Left = 2] = "Left", t[t.None = 3] = "None";
})(di || (di = {}));
function Fa(t, e, n, r, i) {
  if (r === 0)
    return !0;
  const s = e.charCodeAt(r - 1);
  if (t.get(s) !== 0 || s === 13 || s === 10)
    return !0;
  if (i > 0) {
    const o = e.charCodeAt(r);
    if (t.get(o) !== 0)
      return !0;
  }
  return !1;
}
function Da(t, e, n, r, i) {
  if (r + i === n)
    return !0;
  const s = e.charCodeAt(r + i);
  if (t.get(s) !== 0 || s === 13 || s === 10)
    return !0;
  if (i > 0) {
    const o = e.charCodeAt(r + i - 1);
    if (t.get(o) !== 0)
      return !0;
  }
  return !1;
}
function qa(t, e, n, r, i) {
  return Fa(t, e, n, r, i) && Da(t, e, n, r, i);
}
class Ka {
  constructor(e, n) {
    this._wordSeparators = e, this._searchRegex = n, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  reset(e) {
    this._searchRegex.lastIndex = e, this._prevMatchStartIndex = -1, this._prevMatchLength = 0;
  }
  next(e) {
    const n = e.length;
    let r;
    do {
      if (this._prevMatchStartIndex + this._prevMatchLength === n || (r = this._searchRegex.exec(e), !r))
        return null;
      const i = r.index, s = r[0].length;
      if (i === this._prevMatchStartIndex && s === this._prevMatchLength) {
        if (s === 0) {
          Oo(e, n, this._searchRegex.lastIndex) > 65535 ? this._searchRegex.lastIndex += 2 : this._searchRegex.lastIndex += 1;
          continue;
        }
        return null;
      }
      if (this._prevMatchStartIndex = i, this._prevMatchLength = s, !this._wordSeparators || qa(this._wordSeparators, e, n, i, s))
        return r;
    } while (r);
    return null;
  }
}
function Va(t, e = "Unreachable") {
  throw new Error(e);
}
function ds(t, e = "unexpected state") {
  if (!t)
    throw new J(`Assertion Failed: ${e}`);
}
function ft(t) {
  if (!t()) {
    debugger;
    t(), ht(new J("Assertion Failed"));
  }
}
function qt(t, e) {
  let n = 0;
  for (; n < t.length - 1; ) {
    const r = t[n], i = t[n + 1];
    if (!e(r, i))
      return !1;
    n++;
  }
  return !0;
}
const Ba = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?";
function Ua(t = "") {
  let e = "(-?\\d*\\.\\d\\w*)|([^";
  for (const n of Ba)
    t.indexOf(n) >= 0 || (e += "\\" + n);
  return e += "\\s]+)", new RegExp(e, "g");
}
const gs = Ua();
function ms(t) {
  let e = gs;
  if (t && t instanceof RegExp)
    if (t.global)
      e = t;
    else {
      let n = "g";
      t.ignoreCase && (n += "i"), t.multiline && (n += "m"), t.unicode && (n += "u"), e = new RegExp(t.source, n);
    }
  return e.lastIndex = 0, e;
}
const fs = new Js();
fs.unshift({
  maxLen: 1e3,
  windowSize: 15,
  timeBudget: 150
});
function Tn(t, e, n, r, i) {
  if (e = ms(e), i || (i = xt.first(fs)), n.length > i.maxLen) {
    let h = t - i.maxLen / 2;
    return h < 0 ? h = 0 : r += h, n = n.substring(h, t + i.maxLen / 2), Tn(t, e, n, r, i);
  }
  const s = Date.now(), o = t - 1 - r;
  let l = -1, u = null;
  for (let h = 1; !(Date.now() - s >= i.timeBudget); h++) {
    const c = o - i.windowSize * h;
    e.lastIndex = Math.max(0, c);
    const d = $a(e, n, o, l);
    if (!d && u || (u = d, c <= 0))
      break;
    l = c;
  }
  if (u) {
    const h = {
      word: u[0],
      startColumn: r + 1 + u.index,
      endColumn: r + 1 + u.index + u[0].length
    };
    return e.lastIndex = 0, h;
  }
  return null;
}
function $a(t, e, n, r) {
  let i;
  for (; i = t.exec(e); ) {
    const s = i.index || 0;
    if (s <= n && t.lastIndex >= n)
      return i;
    if (r > 0 && s > r)
      return null;
  }
  return null;
}
class za {
  static computeUnicodeHighlights(e, n, r) {
    const i = r ? r.startLineNumber : 1, s = r ? r.endLineNumber : e.getLineCount(), o = new gi(n), l = o.getCandidateCodePoints();
    let u;
    l === "allNonBasicAscii" ? u = new RegExp("[^\\t\\n\\r\\x20-\\x7E]", "g") : u = new RegExp(`${Wa(Array.from(l))}`, "g");
    const h = new Ka(null, u), c = [];
    let d = !1, g, m = 0, f = 0, p = 0;
    e: for (let C = i, v = s; C <= v; C++) {
      const L = e.getLineContent(C), _ = L.length;
      h.reset(0);
      do
        if (g = h.next(L), g) {
          let b = g.index, w = g.index + g[0].length;
          if (b > 0) {
            const K = L.charCodeAt(b - 1);
            nn(K) && b--;
          }
          if (w + 1 < _) {
            const K = L.charCodeAt(w - 1);
            nn(K) && w++;
          }
          const y = L.substring(b, w);
          let S = Tn(b + 1, gs, L, 0);
          S && S.endColumn <= b + 1 && (S = null);
          const O = o.shouldHighlightNonBasicASCII(y, S ? S.word : null);
          if (O !== 0) {
            if (O === 3 ? m++ : O === 2 ? f++ : O === 1 ? p++ : Va(), c.length >= 1e3) {
              d = !0;
              break e;
            }
            c.push(new E(C, b + 1, C, w + 1));
          }
        }
      while (g);
    }
    return {
      ranges: c,
      hasMore: d,
      ambiguousCharacterCount: m,
      invisibleCharacterCount: f,
      nonBasicAsciiCharacterCount: p
    };
  }
  static computeUnicodeHighlightReason(e, n) {
    const r = new gi(n);
    switch (r.shouldHighlightNonBasicASCII(e, null)) {
      case 0:
        return null;
      case 2:
        return { kind: 1 };
      case 3: {
        const i = e.codePointAt(0), s = r.ambiguousCharacters.getPrimaryConfusable(i), o = sn.getLocales().filter((l) => !sn.getInstance(/* @__PURE__ */ new Set([...n.allowedLocales, l])).isAmbiguous(i));
        return { kind: 0, confusableWith: String.fromCodePoint(s), notAmbiguousInLocales: o };
      }
      case 1:
        return { kind: 2 };
    }
  }
}
function Wa(t, e) {
  return `[${No(t.map((n) => String.fromCodePoint(n)).join(""))}]`;
}
class gi {
  constructor(e) {
    this.options = e, this.allowedCodePoints = new Set(e.allowedCodePoints), this.ambiguousCharacters = sn.getInstance(new Set(e.allowedLocales));
  }
  getCandidateCodePoints() {
    if (this.options.nonBasicASCII)
      return "allNonBasicAscii";
    const e = /* @__PURE__ */ new Set();
    if (this.options.invisibleCharacters)
      for (const n of Bt.codePoints)
        mi(String.fromCodePoint(n)) || e.add(n);
    if (this.options.ambiguousCharacters)
      for (const n of this.ambiguousCharacters.getConfusableCodePoints())
        e.add(n);
    for (const n of this.allowedCodePoints)
      e.delete(n);
    return e;
  }
  shouldHighlightNonBasicASCII(e, n) {
    const r = e.codePointAt(0);
    if (this.allowedCodePoints.has(r))
      return 0;
    if (this.options.nonBasicASCII)
      return 1;
    let i = !1, s = !1;
    if (n)
      for (const o of n) {
        const l = o.codePointAt(0), u = Fo(o);
        i = i || u, !u && !this.ambiguousCharacters.isAmbiguous(l) && !Bt.isInvisibleCharacter(l) && (s = !0);
      }
    return !i && s ? 0 : this.options.invisibleCharacters && !mi(e) && Bt.isInvisibleCharacter(r) ? 2 : this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(r) ? 3 : 0;
  }
}
function mi(t) {
  return t === " " || t === `
` || t === "	";
}
class St {
  constructor(e, n, r) {
    this.changes = e, this.moves = n, this.hitTimeout = r;
  }
}
class Pn {
  constructor(e, n) {
    this.lineRangeMapping = e, this.changes = n;
  }
  flip() {
    return new Pn(this.lineRangeMapping.flip(), this.changes.map((e) => e.flip()));
  }
}
class I {
  static addRange(e, n) {
    let r = 0;
    for (; r < n.length && n[r].endExclusive < e.start; )
      r++;
    let i = r;
    for (; i < n.length && n[i].start <= e.endExclusive; )
      i++;
    if (r === i)
      n.splice(r, 0, e);
    else {
      const s = Math.min(e.start, n[r].start), o = Math.max(e.endExclusive, n[i - 1].endExclusive);
      n.splice(r, i - r, new I(s, o));
    }
  }
  static tryCreate(e, n) {
    if (!(e > n))
      return new I(e, n);
  }
  static ofLength(e) {
    return new I(0, e);
  }
  static ofStartAndLength(e, n) {
    return new I(e, e + n);
  }
  static emptyAt(e) {
    return new I(e, e);
  }
  constructor(e, n) {
    if (this.start = e, this.endExclusive = n, e > n)
      throw new J(`Invalid range: ${this.toString()}`);
  }
  get isEmpty() {
    return this.start === this.endExclusive;
  }
  delta(e) {
    return new I(this.start + e, this.endExclusive + e);
  }
  deltaStart(e) {
    return new I(this.start + e, this.endExclusive);
  }
  deltaEnd(e) {
    return new I(this.start, this.endExclusive + e);
  }
  get length() {
    return this.endExclusive - this.start;
  }
  toString() {
    return `[${this.start}, ${this.endExclusive})`;
  }
  equals(e) {
    return this.start === e.start && this.endExclusive === e.endExclusive;
  }
  containsRange(e) {
    return this.start <= e.start && e.endExclusive <= this.endExclusive;
  }
  contains(e) {
    return this.start <= e && e < this.endExclusive;
  }
  join(e) {
    return new I(
      Math.min(this.start, e.start),
      Math.max(this.endExclusive, e.endExclusive)
    );
  }
  intersect(e) {
    const n = Math.max(this.start, e.start), r = Math.min(this.endExclusive, e.endExclusive);
    if (n <= r)
      return new I(n, r);
  }
  intersectionLength(e) {
    const n = Math.max(this.start, e.start), r = Math.min(this.endExclusive, e.endExclusive);
    return Math.max(0, r - n);
  }
  intersects(e) {
    const n = Math.max(this.start, e.start), r = Math.min(this.endExclusive, e.endExclusive);
    return n < r;
  }
  intersectsOrTouches(e) {
    const n = Math.max(this.start, e.start), r = Math.min(this.endExclusive, e.endExclusive);
    return n <= r;
  }
  isBefore(e) {
    return this.endExclusive <= e.start;
  }
  isAfter(e) {
    return this.start >= e.endExclusive;
  }
  slice(e) {
    return e.slice(this.start, this.endExclusive);
  }
  substring(e) {
    return e.substring(this.start, this.endExclusive);
  }
  clip(e) {
    if (this.isEmpty)
      throw new J(`Invalid clipping range: ${this.toString()}`);
    return Math.max(this.start, Math.min(this.endExclusive - 1, e));
  }
  clipCyclic(e) {
    if (this.isEmpty)
      throw new J(`Invalid clipping range: ${this.toString()}`);
    return e < this.start ? this.endExclusive - (this.start - e) % this.length : e >= this.endExclusive ? this.start + (e - this.start) % this.length : e;
  }
  map(e) {
    const n = [];
    for (let r = this.start; r < this.endExclusive; r++)
      n.push(e(r));
    return n;
  }
  forEach(e) {
    for (let n = this.start; n < this.endExclusive; n++)
      e(n);
  }
}
class T {
  static fromRange(e) {
    return new T(e.startLineNumber, e.endLineNumber);
  }
  static fromRangeInclusive(e) {
    return new T(e.startLineNumber, e.endLineNumber + 1);
  }
  static subtract(e, n) {
    return n ? e.startLineNumber < n.startLineNumber && n.endLineNumberExclusive < e.endLineNumberExclusive ? [
      new T(e.startLineNumber, n.startLineNumber),
      new T(n.endLineNumberExclusive, e.endLineNumberExclusive)
    ] : n.startLineNumber <= e.startLineNumber && e.endLineNumberExclusive <= n.endLineNumberExclusive ? [] : n.endLineNumberExclusive < e.endLineNumberExclusive ? [new T(
      Math.max(n.endLineNumberExclusive, e.startLineNumber),
      e.endLineNumberExclusive
    )] : [new T(e.startLineNumber, Math.min(n.startLineNumber, e.endLineNumberExclusive))] : [e];
  }
  static joinMany(e) {
    if (e.length === 0)
      return [];
    let n = new Ce(e[0].slice());
    for (let r = 1; r < e.length; r++)
      n = n.getUnion(new Ce(e[r].slice()));
    return n.ranges;
  }
  static join(e) {
    if (e.length === 0)
      throw new J("lineRanges cannot be empty");
    let n = e[0].startLineNumber, r = e[0].endLineNumberExclusive;
    for (let i = 1; i < e.length; i++)
      n = Math.min(n, e[i].startLineNumber), r = Math.max(r, e[i].endLineNumberExclusive);
    return new T(n, r);
  }
  static ofLength(e, n) {
    return new T(e, e + n);
  }
  static deserialize(e) {
    return new T(e[0], e[1]);
  }
  constructor(e, n) {
    if (e > n)
      throw new J(
        `startLineNumber ${e} cannot be after endLineNumberExclusive ${n}`
      );
    this.startLineNumber = e, this.endLineNumberExclusive = n;
  }
  contains(e) {
    return this.startLineNumber <= e && e < this.endLineNumberExclusive;
  }
  get isEmpty() {
    return this.startLineNumber === this.endLineNumberExclusive;
  }
  delta(e) {
    return new T(this.startLineNumber + e, this.endLineNumberExclusive + e);
  }
  deltaLength(e) {
    return new T(this.startLineNumber, this.endLineNumberExclusive + e);
  }
  get length() {
    return this.endLineNumberExclusive - this.startLineNumber;
  }
  join(e) {
    return new T(
      Math.min(this.startLineNumber, e.startLineNumber),
      Math.max(this.endLineNumberExclusive, e.endLineNumberExclusive)
    );
  }
  toString() {
    return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
  }
  intersect(e) {
    const n = Math.max(this.startLineNumber, e.startLineNumber), r = Math.min(this.endLineNumberExclusive, e.endLineNumberExclusive);
    if (n <= r)
      return new T(n, r);
  }
  intersectsStrict(e) {
    return this.startLineNumber < e.endLineNumberExclusive && e.startLineNumber < this.endLineNumberExclusive;
  }
  overlapOrTouch(e) {
    return this.startLineNumber <= e.endLineNumberExclusive && e.startLineNumber <= this.endLineNumberExclusive;
  }
  equals(e) {
    return this.startLineNumber === e.startLineNumber && this.endLineNumberExclusive === e.endLineNumberExclusive;
  }
  toInclusiveRange() {
    return this.isEmpty ? null : new E(
      this.startLineNumber,
      1,
      this.endLineNumberExclusive - 1,
      Number.MAX_SAFE_INTEGER
    );
  }
  toExclusiveRange() {
    return new E(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
  }
  mapToLineArray(e) {
    const n = [];
    for (let r = this.startLineNumber; r < this.endLineNumberExclusive; r++)
      n.push(e(r));
    return n;
  }
  forEach(e) {
    for (let n = this.startLineNumber; n < this.endLineNumberExclusive; n++)
      e(n);
  }
  serialize() {
    return [this.startLineNumber, this.endLineNumberExclusive];
  }
  includes(e) {
    return this.startLineNumber <= e && e < this.endLineNumberExclusive;
  }
  toOffsetRange() {
    return new I(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
  }
  distanceToRange(e) {
    return this.endLineNumberExclusive <= e.startLineNumber ? e.startLineNumber - this.endLineNumberExclusive : e.endLineNumberExclusive <= this.startLineNumber ? this.startLineNumber - e.endLineNumberExclusive : 0;
  }
  distanceToLine(e) {
    return this.contains(e) ? 0 : e < this.startLineNumber ? this.startLineNumber - e : e - this.endLineNumberExclusive;
  }
  addMargin(e, n) {
    return new T(
      this.startLineNumber - e,
      this.endLineNumberExclusive + n
    );
  }
}
class Ce {
  constructor(e = []) {
    this._normalizedRanges = e;
  }
  get ranges() {
    return this._normalizedRanges;
  }
  addRange(e) {
    if (e.length === 0)
      return;
    const n = Xt(this._normalizedRanges, (i) => i.endLineNumberExclusive >= e.startLineNumber), r = Qe(this._normalizedRanges, (i) => i.startLineNumber <= e.endLineNumberExclusive) + 1;
    if (n === r)
      this._normalizedRanges.splice(n, 0, e);
    else if (n === r - 1) {
      const i = this._normalizedRanges[n];
      this._normalizedRanges[n] = i.join(e);
    } else {
      const i = this._normalizedRanges[n].join(this._normalizedRanges[r - 1]).join(e);
      this._normalizedRanges.splice(n, r - n, i);
    }
  }
  contains(e) {
    const n = Ye(this._normalizedRanges, (r) => r.startLineNumber <= e);
    return !!n && n.endLineNumberExclusive > e;
  }
  intersects(e) {
    const n = Ye(this._normalizedRanges, (r) => r.startLineNumber < e.endLineNumberExclusive);
    return !!n && n.endLineNumberExclusive > e.startLineNumber;
  }
  getUnion(e) {
    if (this._normalizedRanges.length === 0)
      return e;
    if (e._normalizedRanges.length === 0)
      return this;
    const n = [];
    let r = 0, i = 0, s = null;
    for (; r < this._normalizedRanges.length || i < e._normalizedRanges.length; ) {
      let o = null;
      if (r < this._normalizedRanges.length && i < e._normalizedRanges.length) {
        const l = this._normalizedRanges[r], u = e._normalizedRanges[i];
        l.startLineNumber < u.startLineNumber ? (o = l, r++) : (o = u, i++);
      } else r < this._normalizedRanges.length ? (o = this._normalizedRanges[r], r++) : (o = e._normalizedRanges[i], i++);
      s === null ? s = o : s.endLineNumberExclusive >= o.startLineNumber ? s = new T(
        s.startLineNumber,
        Math.max(s.endLineNumberExclusive, o.endLineNumberExclusive)
      ) : (n.push(s), s = o);
    }
    return s !== null && n.push(s), new Ce(n);
  }
  subtractFrom(e) {
    const n = Xt(this._normalizedRanges, (o) => o.endLineNumberExclusive >= e.startLineNumber), r = Qe(this._normalizedRanges, (o) => o.startLineNumber <= e.endLineNumberExclusive) + 1;
    if (n === r)
      return new Ce([e]);
    const i = [];
    let s = e.startLineNumber;
    for (let o = n; o < r; o++) {
      const l = this._normalizedRanges[o];
      l.startLineNumber > s && i.push(new T(s, l.startLineNumber)), s = l.endLineNumberExclusive;
    }
    return s < e.endLineNumberExclusive && i.push(new T(s, e.endLineNumberExclusive)), new Ce(i);
  }
  toString() {
    return this._normalizedRanges.map((e) => e.toString()).join(", ");
  }
  getIntersection(e) {
    const n = [];
    let r = 0, i = 0;
    for (; r < this._normalizedRanges.length && i < e._normalizedRanges.length; ) {
      const s = this._normalizedRanges[r], o = e._normalizedRanges[i], l = s.intersect(o);
      l && !l.isEmpty && n.push(l), s.endLineNumberExclusive < o.endLineNumberExclusive ? r++ : i++;
    }
    return new Ce(n);
  }
  getWithDelta(e) {
    return new Ce(this._normalizedRanges.map((n) => n.delta(e)));
  }
}
const pn = class Fe {
  static fromJson(e) {
    return new Fe(e.map(he.fromJson));
  }
  static replace(e, n) {
    return new Fe([new he(e, n)]);
  }
  static insert(e, n) {
    return Fe.replace(I.emptyAt(e), n);
  }
  constructor(e) {
    this.edits = e;
    let n = -1;
    for (const r of e) {
      if (!(r.replaceRange.start >= n))
        throw new J(`Edits must be disjoint and sorted. Found ${r} after ${n}`);
      n = r.replaceRange.endExclusive;
    }
  }
  normalize() {
    const e = [];
    let n;
    for (const r of this.edits)
      r.newText.length === 0 && r.replaceRange.length === 0 || (n && n.replaceRange.endExclusive === r.replaceRange.start ? n = new he(
        n.replaceRange.join(r.replaceRange),
        n.newText + r.newText
      ) : (n && e.push(n), n = r));
    return n && e.push(n), new Fe(e);
  }
  toString() {
    return `[${this.edits.map((e) => e.toString()).join(", ")}]`;
  }
  apply(e) {
    const n = [];
    let r = 0;
    for (const i of this.edits)
      n.push(e.substring(r, i.replaceRange.start)), n.push(i.newText), r = i.replaceRange.endExclusive;
    return n.push(e.substring(r)), n.join("");
  }
  compose(e) {
    return Ha(this, e);
  }
  inverse(e) {
    const n = [];
    let r = 0;
    for (const i of this.edits)
      n.push(new he(
        I.ofStartAndLength(i.replaceRange.start + r, i.newText.length),
        e.substring(i.replaceRange.start, i.replaceRange.endExclusive)
      )), r += i.newText.length - i.replaceRange.length;
    return new Fe(n);
  }
  getNewTextRanges() {
    const e = [];
    let n = 0;
    for (const r of this.edits)
      e.push(I.ofStartAndLength(r.replaceRange.start + n, r.newText.length)), n += r.newText.length - r.replaceRange.length;
    return e;
  }
  get isEmpty() {
    return this.edits.length === 0;
  }
  tryRebase(e, n) {
    const r = [];
    let i = 0, s = 0, o = 0;
    for (; s < this.edits.length || i < e.edits.length; ) {
      const l = e.edits[i], u = this.edits[s];
      if (u)
        if (!l)
          r.push(new he(u.replaceRange.delta(o), u.newText)), s++;
        else if (u.replaceRange.intersectsOrTouches(l.replaceRange)) {
          if (s++, n)
            return;
        } else u.replaceRange.start < l.replaceRange.start ? (r.push(new he(u.replaceRange.delta(o), u.newText)), s++) : (i++, o += l.newText.length - l.replaceRange.length);
      else break;
    }
    return new Fe(r);
  }
  applyToOffset(e) {
    let n = 0;
    for (const r of this.edits)
      if (r.replaceRange.start <= e) {
        if (e < r.replaceRange.endExclusive)
          return r.replaceRange.start + n;
        n += r.newText.length - r.replaceRange.length;
      } else
        break;
    return e + n;
  }
  applyToOffsetRange(e) {
    return new I(
      this.applyToOffset(e.start),
      this.applyToOffset(e.endExclusive)
    );
  }
  applyInverseToOffset(e) {
    let n = 0;
    for (const r of this.edits) {
      const i = r.newText.length;
      if (r.replaceRange.start <= e - n) {
        if (e - n < r.replaceRange.start + i)
          return r.replaceRange.start;
        n += i - r.replaceRange.length;
      } else
        break;
    }
    return e - n;
  }
};
pn.empty = new pn([]);
let ps = pn;
class he {
  static fromJson(e) {
    return new he(I.ofStartAndLength(e.pos, e.len), e.txt);
  }
  static insert(e, n) {
    return new he(I.emptyAt(e), n);
  }
  constructor(e, n) {
    this.replaceRange = e, this.newText = n;
  }
  toString() {
    return `${this.replaceRange} -> "${this.newText}"`;
  }
  get isEmpty() {
    return this.newText.length === 0 && this.replaceRange.length === 0;
  }
}
function Ha(t, e) {
  if (t = t.normalize(), e = e.normalize(), t.isEmpty)
    return e;
  if (e.isEmpty)
    return t;
  const n = [...t.edits], r = [];
  let i = 0;
  for (const s of e.edits) {
    for (; ; ) {
      const h = n[0];
      if (!h || h.replaceRange.start + i + h.newText.length >= s.replaceRange.start)
        break;
      n.shift(), r.push(h), i += h.newText.length - h.replaceRange.length;
    }
    const o = i;
    let l, u;
    for (; ; ) {
      const h = n[0];
      if (!h || h.replaceRange.start + i > s.replaceRange.endExclusive)
        break;
      l || (l = h), u = h, n.shift(), i += h.newText.length - h.replaceRange.length;
    }
    if (!l)
      r.push(new he(s.replaceRange.delta(-i), s.newText));
    else {
      let h = "";
      const c = s.replaceRange.start - (l.replaceRange.start + o);
      c > 0 && (h = l.newText.slice(0, c));
      const d = u.replaceRange.endExclusive + i - s.replaceRange.endExclusive;
      if (d > 0) {
        const f = new he(
          I.ofStartAndLength(u.replaceRange.endExclusive, 0),
          u.newText.slice(-d)
        );
        n.unshift(f), i -= f.newText.length - f.replaceRange.length;
      }
      const g = h + s.newText, m = new I(
        Math.min(l.replaceRange.start, s.replaceRange.start - o),
        s.replaceRange.endExclusive - i
      );
      r.push(new he(m, g));
    }
  }
  for (; ; ) {
    const s = n.shift();
    if (!s)
      break;
    r.push(s);
  }
  return new ps(r).normalize();
}
const bn = class je {
  static deserialize(e) {
    return new je(e.map((n) => Ke.deserialize(n)));
  }
  static fromEdit(e, n) {
    const r = Te.fromOffsetEdit(e, n);
    return je.fromTextEdit(r, n);
  }
  static fromTextEdit(e, n) {
    const r = e.edits, i = [], s = [];
    for (let o = 0; o < r.length; o++) {
      const l = r[o], u = o + 1 < r.length ? r[o + 1] : void 0;
      if (s.push(l), u && u.range.startLineNumber === l.range.endLineNumber)
        continue;
      const h = re.joinEdits(s, n);
      s.length = 0;
      const c = Ke.fromSingleTextEdit(h, n);
      i.push(c);
    }
    return new je(i);
  }
  static createFromUnsorted(e) {
    const n = e.slice();
    return n.sort(ct((r) => r.lineRange.startLineNumber, dt)), new je(n);
  }
  constructor(e) {
    this.edits = e, ds(qt(e, (n, r) => n.lineRange.endLineNumberExclusive <= r.lineRange.startLineNumber));
  }
  toEdit(e) {
    const n = [];
    for (const r of this.edits) {
      const i = r.toSingleEdit(e);
      n.push(i);
    }
    return new ps(n);
  }
  toString() {
    return this.edits.map((e) => e.toString()).join(",");
  }
  serialize() {
    return this.edits.map((e) => e.serialize());
  }
  getNewLineRanges() {
    const e = [];
    let n = 0;
    for (const r of this.edits)
      e.push(T.ofLength(r.lineRange.startLineNumber + n, r.newLines.length)), n += r.newLines.length - r.lineRange.length;
    return e;
  }
  mapLineNumber(e) {
    let n = 0;
    for (const r of this.edits) {
      if (r.lineRange.endLineNumberExclusive > e)
        break;
      n += r.newLines.length - r.lineRange.length;
    }
    return e + n;
  }
  mapLineRange(e) {
    return new T(
      this.mapLineNumber(e.startLineNumber),
      this.mapLineNumber(e.endLineNumberExclusive)
    );
  }
  rebase(e) {
    return new je(this.edits.map((n) => new Ke(e.mapLineRange(n.lineRange), n.newLines)));
  }
  humanReadablePatch(e) {
    const n = [];
    function r(l, u, h, c) {
      const d = h === "unmodified" ? " " : h === "deleted" ? "-" : "+";
      c === void 0 && (c = "[[[[[ WARNING: LINE DOES NOT EXIST ]]]]]");
      const g = l === -1 ? "   " : l.toString().padStart(3, " "), m = u === -1 ? "   " : u.toString().padStart(3, " ");
      n.push(`${d} ${g} ${m} ${c}`);
    }
    function i() {
      n.push("---");
    }
    let s = 0, o = !0;
    for (const l of $i(this.edits, (u, h) => u.lineRange.distanceToRange(h.lineRange) <= 5)) {
      o ? o = !1 : i();
      let u = l[0].lineRange.startLineNumber - 2;
      for (const h of l) {
        for (let g = Math.max(1, u); g < h.lineRange.startLineNumber; g++)
          r(g, g + s, "unmodified", e[g - 1]);
        const c = h.lineRange, d = h.newLines;
        for (const g of c.mapToLineArray((m) => m)) {
          const m = e[g - 1];
          r(g, -1, "deleted", m);
        }
        for (let g = 0; g < d.length; g++) {
          const m = d[g];
          r(-1, c.startLineNumber + s + g, "added", m);
        }
        u = c.endLineNumberExclusive, s += h.newLines.length - h.lineRange.length;
      }
      for (let h = u; h <= Math.min(u + 2, e.length); h++)
        r(h, h + s, "unmodified", e[h - 1]);
    }
    return n.join(`
`);
  }
  apply(e) {
    const n = [];
    let r = 0;
    for (const i of this.edits) {
      for (; r < i.lineRange.startLineNumber - 1; )
        n.push(e[r]), r++;
      for (const s of i.newLines)
        n.push(s);
      r = i.lineRange.endLineNumberExclusive - 1;
    }
    for (; r < e.length; )
      n.push(e[r]), r++;
    return n;
  }
  toSingleEdit() {
  }
};
bn.empty = new bn([]);
let ja = bn;
class Ke {
  static deserialize(e) {
    return new Ke(T.ofLength(e[0], e[1] - e[0]), e[2]);
  }
  static fromSingleTextEdit(e, n) {
    const r = An(e.text);
    let i = e.range.startLineNumber;
    const s = n.getValueOfRange(E.fromPositions(new F(e.range.startLineNumber, 1), e.range.getStartPosition()));
    r[0] = s + r[0];
    let o = e.range.endLineNumber + 1;
    const l = n.getTransformer().getLineLength(e.range.endLineNumber) + 1, u = n.getValueOfRange(E.fromPositions(e.range.getEndPosition(), new F(e.range.endLineNumber, l)));
    r[r.length - 1] = r[r.length - 1] + u;
    const h = e.range.startColumn === n.getTransformer().getLineLength(e.range.startLineNumber) + 1, c = e.range.endColumn === 1;
    return h && r[0].length === s.length && (i++, r.shift()), r.length > 0 && i < o && c && r[r.length - 1].length === u.length && (o--, r.pop()), new Ke(new T(i, o), r);
  }
  constructor(e, n) {
    this.lineRange = e, this.newLines = n;
  }
  toSingleTextEdit(e) {
    if (this.newLines.length === 0) {
      const n = e.getTransformer().textLength;
      if (this.lineRange.endLineNumberExclusive === n.lineCount + 2) {
        let r;
        if (this.lineRange.startLineNumber > 1) {
          const s = this.lineRange.startLineNumber - 1, o = e.getTransformer().getLineLength(s) + 1;
          r = new F(s, o);
        } else
          r = new F(1, 1);
        const i = n.addToPosition(new F(1, 1));
        return new re(E.fromPositions(r, i), "");
      } else
        return new re(new E(
          this.lineRange.startLineNumber,
          1,
          this.lineRange.endLineNumberExclusive,
          1
        ), "");
    } else if (this.lineRange.isEmpty) {
      let n, r, i;
      const s = this.lineRange.startLineNumber;
      return s === e.getTransformer().textLength.lineCount + 2 ? (n = s - 1, r = e.getTransformer().getLineLength(n) + 1, i = this.newLines.map((o) => `
` + o).join("")) : (n = s, r = 1, i = this.newLines.map((o) => o + `
`).join("")), new re(E.fromPositions(new F(n, r)), i);
    } else {
      const n = this.lineRange.endLineNumberExclusive - 1, r = e.getTransformer().getLineLength(n) + 1, i = new E(this.lineRange.startLineNumber, 1, n, r), s = this.newLines.join(`
`);
      return new re(i, s);
    }
  }
  toSingleEdit(e) {
    const n = this.toSingleTextEdit(e), r = e.getTransformer().getOffsetRange(n.range);
    return new he(r, n.text);
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
  removeCommonSuffixPrefixLines(e) {
    let n = this.lineRange.startLineNumber, r = this.lineRange.endLineNumberExclusive, i = 0;
    for (; n < r && i < this.newLines.length && this.newLines[i] === e.getLineAt(n); )
      n++, i++;
    let s = 0;
    for (; n < r && s + i < this.newLines.length && this.newLines[this.newLines.length - 1 - s] === e.getLineAt(r - 1); )
      r--, s++;
    return i === 0 && s === 0 ? this : new Ke(new T(n, r), this.newLines.slice(i, this.newLines.length - s));
  }
  toLineEdit() {
    return new ja([this]);
  }
}
const wn = class pe {
  static lengthDiffNonNegative(e, n) {
    return n.isLessThan(e) ? pe.zero : e.lineCount === n.lineCount ? new pe(0, n.columnCount - e.columnCount) : new pe(n.lineCount - e.lineCount, n.columnCount);
  }
  static betweenPositions(e, n) {
    return e.lineNumber === n.lineNumber ? new pe(0, n.column - e.column) : new pe(n.lineNumber - e.lineNumber, n.column - 1);
  }
  static fromPosition(e) {
    return new pe(e.lineNumber - 1, e.column - 1);
  }
  static ofRange(e) {
    return pe.betweenPositions(e.getStartPosition(), e.getEndPosition());
  }
  static ofText(e) {
    let n = 0, r = 0;
    for (const i of e)
      i === `
` ? (n++, r = 0) : r++;
    return new pe(n, r);
  }
  constructor(e, n) {
    this.lineCount = e, this.columnCount = n;
  }
  isZero() {
    return this.lineCount === 0 && this.columnCount === 0;
  }
  isLessThan(e) {
    return this.lineCount !== e.lineCount ? this.lineCount < e.lineCount : this.columnCount < e.columnCount;
  }
  isGreaterThan(e) {
    return this.lineCount !== e.lineCount ? this.lineCount > e.lineCount : this.columnCount > e.columnCount;
  }
  isGreaterThanOrEqualTo(e) {
    return this.lineCount !== e.lineCount ? this.lineCount > e.lineCount : this.columnCount >= e.columnCount;
  }
  equals(e) {
    return this.lineCount === e.lineCount && this.columnCount === e.columnCount;
  }
  compare(e) {
    return this.lineCount !== e.lineCount ? this.lineCount - e.lineCount : this.columnCount - e.columnCount;
  }
  add(e) {
    return e.lineCount === 0 ? new pe(this.lineCount, this.columnCount + e.columnCount) : new pe(this.lineCount + e.lineCount, e.columnCount);
  }
  createRange(e) {
    return this.lineCount === 0 ? new E(
      e.lineNumber,
      e.column,
      e.lineNumber,
      e.column + this.columnCount
    ) : new E(
      e.lineNumber,
      e.column,
      e.lineNumber + this.lineCount,
      this.columnCount + 1
    );
  }
  toRange() {
    return new E(1, 1, this.lineCount + 1, this.columnCount + 1);
  }
  toLineRange() {
    return T.ofLength(1, this.lineCount);
  }
  addToPosition(e) {
    return this.lineCount === 0 ? new F(e.lineNumber, e.column + this.columnCount) : new F(e.lineNumber + this.lineCount, this.columnCount + 1);
  }
  addToRange(e) {
    return E.fromPositions(this.addToPosition(e.getStartPosition()), this.addToPosition(e.getEndPosition()));
  }
  toString() {
    return `${this.lineCount},${this.columnCount}`;
  }
};
wn.zero = new wn(0, 0);
let tt = wn;
class bs {
  constructor(e) {
    this.text = e, this.lineStartOffsetByLineIdx = [], this.lineEndOffsetByLineIdx = [], this.lineStartOffsetByLineIdx.push(0);
    for (let n = 0; n < e.length; n++)
      e.charAt(n) === `
` && (this.lineStartOffsetByLineIdx.push(n + 1), n > 0 && e.charAt(n - 1) === "\r" ? this.lineEndOffsetByLineIdx.push(n - 1) : this.lineEndOffsetByLineIdx.push(n));
    this.lineEndOffsetByLineIdx.push(e.length);
  }
  getOffset(e) {
    return this.lineStartOffsetByLineIdx[e.lineNumber - 1] + e.column - 1;
  }
  getOffsetRange(e) {
    return new I(
      this.getOffset(e.getStartPosition()),
      this.getOffset(e.getEndPosition())
    );
  }
  getPosition(e) {
    const n = Qe(this.lineStartOffsetByLineIdx, (s) => s <= e), r = n + 1, i = e - this.lineStartOffsetByLineIdx[n] + 1;
    return new F(r, i);
  }
  getRange(e) {
    return E.fromPositions(this.getPosition(e.start), this.getPosition(e.endExclusive));
  }
  getTextLength(e) {
    return tt.ofRange(this.getRange(e));
  }
  get textLength() {
    const e = this.lineStartOffsetByLineIdx.length - 1;
    return new tt(e, this.text.length - this.lineStartOffsetByLineIdx[e]);
  }
  getLineLength(e) {
    return this.lineEndOffsetByLineIdx[e - 1] - this.lineStartOffsetByLineIdx[e - 1];
  }
}
class Te {
  static fromOffsetEdit(e, n) {
    const r = e.edits.map((i) => new re(n.getTransformer().getRange(i.replaceRange), i.newText));
    return new Te(r);
  }
  static single(e, n) {
    return new Te([new re(e, n)]);
  }
  static insert(e, n) {
    return new Te([new re(E.fromPositions(e, e), n)]);
  }
  constructor(e) {
    this.edits = e, ft(() => qt(e, (n, r) => n.range.getEndPosition().isBeforeOrEqual(r.range.getStartPosition())));
  }
  normalize() {
    const e = [];
    for (const n of this.edits)
      if (e.length > 0 && e[e.length - 1].range.getEndPosition().equals(n.range.getStartPosition())) {
        const r = e[e.length - 1];
        e[e.length - 1] = new re(r.range.plusRange(n.range), r.text + n.text);
      } else n.isEmpty || e.push(n);
    return new Te(e);
  }
  mapPosition(e) {
    let n = 0, r = 0, i = 0;
    for (const s of this.edits) {
      const o = s.range.getStartPosition();
      if (e.isBeforeOrEqual(o))
        break;
      const l = s.range.getEndPosition(), u = tt.ofText(s.text);
      if (e.isBefore(l)) {
        const h = new F(
          o.lineNumber + n,
          o.column + (o.lineNumber + n === r ? i : 0)
        ), c = u.addToPosition(h);
        return Ct(h, c);
      }
      o.lineNumber + n !== r && (i = 0), n += u.lineCount - (s.range.endLineNumber - s.range.startLineNumber), u.lineCount === 0 ? l.lineNumber !== o.lineNumber ? i += u.columnCount - (l.column - 1) : i += u.columnCount - (l.column - o.column) : i = u.columnCount, r = l.lineNumber + n;
    }
    return new F(
      e.lineNumber + n,
      e.column + (e.lineNumber + n === r ? i : 0)
    );
  }
  mapRange(e) {
    function n(o) {
      return o instanceof F ? o : o.getStartPosition();
    }
    function r(o) {
      return o instanceof F ? o : o.getEndPosition();
    }
    const i = n(this.mapPosition(e.getStartPosition())), s = r(this.mapPosition(e.getEndPosition()));
    return Ct(i, s);
  }
  inverseMapPosition(e, n) {
    return this.inverse(n).mapPosition(e);
  }
  inverseMapRange(e, n) {
    return this.inverse(n).mapRange(e);
  }
  apply(e) {
    let n = "", r = new F(1, 1);
    for (const s of this.edits) {
      const o = s.range, l = o.getStartPosition(), u = o.getEndPosition(), h = Ct(r, l);
      h.isEmpty() || (n += e.getValueOfRange(h)), n += s.text, r = u;
    }
    const i = Ct(r, e.endPositionExclusive);
    return i.isEmpty() || (n += e.getValueOfRange(i)), n;
  }
  applyToString(e) {
    const n = new Xa(e);
    return this.apply(n);
  }
  inverse(e) {
    const n = this.getNewRanges();
    return new Te(this.edits.map((r, i) => new re(n[i], e.getValueOfRange(r.range))));
  }
  getNewRanges() {
    const e = [];
    let n = 0, r = 0, i = 0;
    for (const s of this.edits) {
      const o = tt.ofText(s.text), l = F.lift({
        lineNumber: s.range.startLineNumber + r,
        column: s.range.startColumn + (s.range.startLineNumber === n ? i : 0)
      }), u = o.createRange(l);
      e.push(u), r = u.endLineNumber - s.range.endLineNumber, i = u.endColumn - s.range.endColumn, n = s.range.endLineNumber;
    }
    return e;
  }
  toSingle(e) {
    if (this.edits.length === 0)
      throw new J();
    if (this.edits.length === 1)
      return this.edits[0];
    const n = this.edits[0].range.getStartPosition(), r = this.edits[this.edits.length - 1].range.getEndPosition();
    let i = "";
    for (let s = 0; s < this.edits.length; s++) {
      const o = this.edits[s];
      if (i += o.text, s < this.edits.length - 1) {
        const l = this.edits[s + 1], u = E.fromPositions(o.range.getEndPosition(), l.range.getStartPosition()), h = e.getValueOfRange(u);
        i += h;
      }
    }
    return new re(E.fromPositions(n, r), i);
  }
}
class re {
  static joinEdits(e, n) {
    if (e.length === 0)
      throw new J();
    if (e.length === 1)
      return e[0];
    const r = e[0].range.getStartPosition(), i = e[e.length - 1].range.getEndPosition();
    let s = "";
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if (s += l.text, o < e.length - 1) {
        const u = e[o + 1], h = E.fromPositions(l.range.getEndPosition(), u.range.getStartPosition()), c = n.getValueOfRange(h);
        s += c;
      }
    }
    return new re(E.fromPositions(r, i), s);
  }
  constructor(e, n) {
    this.range = e, this.text = n;
  }
  get isEmpty() {
    return this.range.isEmpty() && this.text.length === 0;
  }
  static equals(e, n) {
    return e.range.equalsRange(n.range) && e.text === n.text;
  }
  toSingleEditOperation() {
    return {
      range: this.range,
      text: this.text
    };
  }
  toEdit() {
    return new Te([this]);
  }
  equals(e) {
    return re.equals(this, e);
  }
  extendToCoverRange(e, n) {
    if (this.range.containsRange(e))
      return this;
    const r = this.range.plusRange(e), i = n.getValueOfRange(E.fromPositions(r.getStartPosition(), this.range.getStartPosition())), s = n.getValueOfRange(E.fromPositions(this.range.getEndPosition(), r.getEndPosition())), o = i + this.text + s;
    return new re(r, o);
  }
  extendToFullLine(e) {
    const n = new E(
      this.range.startLineNumber,
      1,
      this.range.endLineNumber,
      e.getTransformer().getLineLength(this.range.endLineNumber) + 1
    );
    return this.extendToCoverRange(n, e);
  }
  removeCommonPrefix(e) {
    const n = e.getValueOfRange(this.range).replaceAll(`\r
`, `
`), r = this.text.replaceAll(`\r
`, `
`), i = Gn(n, r), s = tt.ofText(n.substring(0, i)).addToPosition(this.range.getStartPosition()), o = r.substring(i), l = E.fromPositions(s, this.range.getEndPosition());
    return new re(l, o);
  }
  isEffectiveDeletion(e) {
    let n = this.text.replaceAll(`\r
`, `
`), r = e.getValueOfRange(this.range).replaceAll(`\r
`, `
`);
    const i = Gn(n, r);
    n = n.substring(i), r = r.substring(i);
    const s = ko(n, r);
    return n = n.substring(0, n.length - s), r = r.substring(0, r.length - s), n === "";
  }
}
function Ct(t, e) {
  if (t.lineNumber === e.lineNumber && t.column === Number.MAX_SAFE_INTEGER)
    return E.fromPositions(e, e);
  if (!t.isBeforeOrEqual(e))
    throw new J("start must be before end");
  return new E(t.lineNumber, t.column, e.lineNumber, e.column);
}
class ws {
  constructor() {
    this._transformer = void 0;
  }
  get endPositionExclusive() {
    return this.length.addToPosition(new F(1, 1));
  }
  get lineRange() {
    return this.length.toLineRange();
  }
  getValue() {
    return this.getValueOfRange(this.length.toRange());
  }
  getLineLength(e) {
    return this.getValueOfRange(new E(e, 1, e, Number.MAX_SAFE_INTEGER)).length;
  }
  getTransformer() {
    return this._transformer || (this._transformer = new bs(this.getValue())), this._transformer;
  }
  getLineAt(e) {
    return this.getValueOfRange(new E(e, 1, e, Number.MAX_SAFE_INTEGER));
  }
  getLines() {
    const e = this.getValue();
    return An(e);
  }
}
class Ga extends ws {
  constructor(e, n) {
    ds(n >= 1), super(), this._getLineContent = e, this._lineCount = n;
  }
  getValueOfRange(e) {
    if (e.startLineNumber === e.endLineNumber)
      return this._getLineContent(e.startLineNumber).substring(e.startColumn - 1, e.endColumn - 1);
    let n = this._getLineContent(e.startLineNumber).substring(e.startColumn - 1);
    for (let r = e.startLineNumber + 1; r < e.endLineNumber; r++)
      n += `
` + this._getLineContent(r);
    return n += `
` + this._getLineContent(e.endLineNumber).substring(0, e.endColumn - 1), n;
  }
  getLineLength(e) {
    return this._getLineContent(e).length;
  }
  get length() {
    const e = this._getLineContent(this._lineCount);
    return new tt(this._lineCount - 1, e.length);
  }
}
class vt extends Ga {
  constructor(e) {
    super((n) => e[n - 1], e.length);
  }
}
class Xa extends ws {
  constructor(e) {
    super(), this.value = e, this._t = new bs(this.value);
  }
  getValueOfRange(e) {
    return this._t.getOffsetRange(e).substring(this.value);
  }
  get length() {
    return this._t.textLength;
  }
}
class me {
  static inverse(e, n, r) {
    const i = [];
    let s = 1, o = 1;
    for (const u of e) {
      const h = new me(new T(s, u.original.startLineNumber), new T(o, u.modified.startLineNumber));
      h.modified.isEmpty || i.push(h), s = u.original.endLineNumberExclusive, o = u.modified.endLineNumberExclusive;
    }
    const l = new me(new T(s, n + 1), new T(o, r + 1));
    return l.modified.isEmpty || i.push(l), i;
  }
  static clip(e, n, r) {
    const i = [];
    for (const s of e) {
      const o = s.original.intersect(n), l = s.modified.intersect(r);
      o && !o.isEmpty && l && !l.isEmpty && i.push(new me(o, l));
    }
    return i;
  }
  constructor(e, n) {
    this.original = e, this.modified = n;
  }
  toString() {
    return `{${this.original.toString()}->${this.modified.toString()}}`;
  }
  flip() {
    return new me(this.modified, this.original);
  }
  join(e) {
    return new me(this.original.join(e.original), this.modified.join(e.modified));
  }
  get changedLineCount() {
    return Math.max(this.original.length, this.modified.length);
  }
  toRangeMapping() {
    const e = this.original.toInclusiveRange(), n = this.modified.toInclusiveRange();
    if (e && n)
      return new oe(e, n);
    if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
      if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1))
        throw new J("not a valid diff");
      return new oe(new E(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new E(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
    } else
      return new oe(new E(
        this.original.startLineNumber - 1,
        Number.MAX_SAFE_INTEGER,
        this.original.endLineNumberExclusive - 1,
        Number.MAX_SAFE_INTEGER
      ), new E(
        this.modified.startLineNumber - 1,
        Number.MAX_SAFE_INTEGER,
        this.modified.endLineNumberExclusive - 1,
        Number.MAX_SAFE_INTEGER
      ));
  }
  toRangeMapping2(e, n) {
    if (fi(this.original.endLineNumberExclusive, e) && fi(this.modified.endLineNumberExclusive, n))
      return new oe(new E(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new E(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
    if (!this.original.isEmpty && !this.modified.isEmpty)
      return new oe(E.fromPositions(new F(this.original.startLineNumber, 1), He(new F(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), e)), E.fromPositions(new F(this.modified.startLineNumber, 1), He(new F(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
    if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1)
      return new oe(E.fromPositions(He(new F(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), e), He(new F(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), e)), E.fromPositions(He(new F(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), n), He(new F(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), n)));
    throw new J();
  }
}
function He(t, e) {
  if (t.lineNumber < 1)
    return new F(1, 1);
  if (t.lineNumber > e.length)
    return new F(e.length, e[e.length - 1].length + 1);
  const n = e[t.lineNumber - 1];
  return t.column > n.length + 1 ? new F(t.lineNumber, n.length + 1) : t;
}
function fi(t, e) {
  return t >= 1 && t <= e.length;
}
class Ne extends me {
  static fromRangeMappings(e) {
    const n = T.join(e.map((i) => T.fromRangeInclusive(i.originalRange))), r = T.join(e.map((i) => T.fromRangeInclusive(i.modifiedRange)));
    return new Ne(n, r, e);
  }
  constructor(e, n, r) {
    super(e, n), this.innerChanges = r;
  }
  flip() {
    var e;
    return new Ne(this.modified, this.original, (e = this.innerChanges) == null ? void 0 : e.map((n) => n.flip()));
  }
  withInnerChangesFromLineRanges() {
    return new Ne(this.original, this.modified, [this.toRangeMapping()]);
  }
}
class oe {
  static fromEdit(e) {
    const n = e.getNewRanges();
    return e.edits.map((r, i) => new oe(r.range, n[i]));
  }
  static fromEditJoin(e) {
    const n = e.getNewRanges(), r = e.edits.map((i, s) => new oe(i.range, n[s]));
    return oe.join(r);
  }
  static join(e) {
    if (e.length === 0)
      throw new J("Cannot join an empty list of range mappings");
    let n = e[0];
    for (let r = 1; r < e.length; r++)
      n = n.join(e[r]);
    return n;
  }
  static assertSorted(e) {
    for (let n = 1; n < e.length; n++) {
      const r = e[n - 1], i = e[n];
      if (!(r.originalRange.getEndPosition().isBeforeOrEqual(i.originalRange.getStartPosition()) && r.modifiedRange.getEndPosition().isBeforeOrEqual(i.modifiedRange.getStartPosition())))
        throw new J("Range mappings must be sorted");
    }
  }
  constructor(e, n) {
    this.originalRange = e, this.modifiedRange = n;
  }
  toString() {
    return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
  }
  flip() {
    return new oe(this.modifiedRange, this.originalRange);
  }
  toTextEdit(e) {
    const n = e.getValueOfRange(this.modifiedRange);
    return new re(this.originalRange, n);
  }
  join(e) {
    return new oe(
      this.originalRange.plusRange(e.originalRange),
      this.modifiedRange.plusRange(e.modifiedRange)
    );
  }
}
function pi(t, e, n, r = !1) {
  const i = [];
  for (const s of $i(t.map((o) => Ja(o, e, n)), (o, l) => o.original.overlapOrTouch(l.original) || o.modified.overlapOrTouch(l.modified))) {
    const o = s[0], l = s[s.length - 1];
    i.push(new Ne(
      o.original.join(l.original),
      o.modified.join(l.modified),
      s.map((u) => u.innerChanges[0])
    ));
  }
  return ft(() => !r && i.length > 0 && (i[0].modified.startLineNumber !== i[0].original.startLineNumber || n.length.lineCount - i[i.length - 1].modified.endLineNumberExclusive !== e.length.lineCount - i[i.length - 1].original.endLineNumberExclusive) ? !1 : qt(i, (s, o) => o.original.startLineNumber - s.original.endLineNumberExclusive === o.modified.startLineNumber - s.modified.endLineNumberExclusive && s.original.endLineNumberExclusive < o.original.startLineNumber && s.modified.endLineNumberExclusive < o.modified.startLineNumber)), i;
}
function Ja(t, e, n) {
  let r = 0, i = 0;
  t.modifiedRange.endColumn === 1 && t.originalRange.endColumn === 1 && t.originalRange.startLineNumber + r <= t.originalRange.endLineNumber && t.modifiedRange.startLineNumber + r <= t.modifiedRange.endLineNumber && (i = -1), t.modifiedRange.startColumn - 1 >= n.getLineLength(t.modifiedRange.startLineNumber) && t.originalRange.startColumn - 1 >= e.getLineLength(t.originalRange.startLineNumber) && t.originalRange.startLineNumber <= t.originalRange.endLineNumber + i && t.modifiedRange.startLineNumber <= t.modifiedRange.endLineNumber + i && (r = 1);
  const s = new T(
    t.originalRange.startLineNumber + r,
    t.originalRange.endLineNumber + 1 + i
  ), o = new T(
    t.modifiedRange.startLineNumber + r,
    t.modifiedRange.endLineNumber + 1 + i
  );
  return new Ne(s, o, [t]);
}
const Za = 3;
class Ya {
  computeDiff(e, n, r) {
    var i;
    const s = new Cs(e, n, {
      maxComputationTime: r.maxComputationTimeMs,
      shouldIgnoreTrimWhitespace: r.ignoreTrimWhitespace,
      shouldComputeCharChanges: !0,
      shouldMakePrettyDiff: !0,
      shouldPostProcessCharChanges: !0
    }).computeDiff(), o = [];
    let l = null;
    for (const u of s.changes) {
      let h;
      u.originalEndLineNumber === 0 ? h = new T(u.originalStartLineNumber + 1, u.originalStartLineNumber + 1) : h = new T(u.originalStartLineNumber, u.originalEndLineNumber + 1);
      let c;
      u.modifiedEndLineNumber === 0 ? c = new T(u.modifiedStartLineNumber + 1, u.modifiedStartLineNumber + 1) : c = new T(u.modifiedStartLineNumber, u.modifiedEndLineNumber + 1);
      let d = new Ne(h, c, (i = u.charChanges) == null ? void 0 : i.map((g) => new oe(new E(
        g.originalStartLineNumber,
        g.originalStartColumn,
        g.originalEndLineNumber,
        g.originalEndColumn
      ), new E(
        g.modifiedStartLineNumber,
        g.modifiedStartColumn,
        g.modifiedEndLineNumber,
        g.modifiedEndColumn
      ))));
      l && (l.modified.endLineNumberExclusive === d.modified.startLineNumber || l.original.endLineNumberExclusive === d.original.startLineNumber) && (d = new Ne(
        l.original.join(d.original),
        l.modified.join(d.modified),
        l.innerChanges && d.innerChanges ? l.innerChanges.concat(d.innerChanges) : void 0
      ), o.pop()), o.push(d), l = d;
    }
    return ft(() => qt(o, (u, h) => h.original.startLineNumber - u.original.endLineNumberExclusive === h.modified.startLineNumber - u.modified.endLineNumberExclusive && u.original.endLineNumberExclusive < h.original.startLineNumber && u.modified.endLineNumberExclusive < h.modified.startLineNumber)), new St(o, [], s.quitEarly);
  }
}
function Ls(t, e, n, r) {
  return new ke(t, e, n).ComputeDiff(r);
}
let bi = class {
  constructor(t) {
    const e = [], n = [];
    for (let r = 0, i = t.length; r < i; r++)
      e[r] = Ln(t[r], 1), n[r] = Cn(t[r], 1);
    this.lines = t, this._startColumns = e, this._endColumns = n;
  }
  getElements() {
    const t = [];
    for (let e = 0, n = this.lines.length; e < n; e++)
      t[e] = this.lines[e].substring(this._startColumns[e] - 1, this._endColumns[e] - 1);
    return t;
  }
  getStrictElement(t) {
    return this.lines[t];
  }
  getStartLineNumber(t) {
    return t + 1;
  }
  getEndLineNumber(t) {
    return t + 1;
  }
  createCharSequence(t, e, n) {
    const r = [], i = [], s = [];
    let o = 0;
    for (let l = e; l <= n; l++) {
      const u = this.lines[l], h = t ? this._startColumns[l] : 1, c = t ? this._endColumns[l] : u.length + 1;
      for (let d = h; d < c; d++)
        r[o] = u.charCodeAt(d - 1), i[o] = l + 1, s[o] = d, o++;
      !t && l < n && (r[o] = 10, i[o] = l + 1, s[o] = u.length + 1, o++);
    }
    return new Qa(r, i, s);
  }
};
class Qa {
  constructor(e, n, r) {
    this._charCodes = e, this._lineNumbers = n, this._columns = r;
  }
  toString() {
    return "[" + this._charCodes.map(
      (e, n) => (e === 10 ? "\\n" : String.fromCharCode(e)) + `-(${this._lineNumbers[n]},${this._columns[n]})`
    ).join(", ") + "]";
  }
  _assertIndex(e, n) {
    if (e < 0 || e >= n.length)
      throw new Error("Illegal index");
  }
  getElements() {
    return this._charCodes;
  }
  getStartLineNumber(e) {
    return e > 0 && e === this._lineNumbers.length ? this.getEndLineNumber(e - 1) : (this._assertIndex(e, this._lineNumbers), this._lineNumbers[e]);
  }
  getEndLineNumber(e) {
    return e === -1 ? this.getStartLineNumber(e + 1) : (this._assertIndex(e, this._lineNumbers), this._charCodes[e] === 10 ? this._lineNumbers[e] + 1 : this._lineNumbers[e]);
  }
  getStartColumn(e) {
    return e > 0 && e === this._columns.length ? this.getEndColumn(e - 1) : (this._assertIndex(e, this._columns), this._columns[e]);
  }
  getEndColumn(e) {
    return e === -1 ? this.getStartColumn(e + 1) : (this._assertIndex(e, this._columns), this._charCodes[e] === 10 ? 1 : this._columns[e] + 1);
  }
}
class Je {
  constructor(e, n, r, i, s, o, l, u) {
    this.originalStartLineNumber = e, this.originalStartColumn = n, this.originalEndLineNumber = r, this.originalEndColumn = i, this.modifiedStartLineNumber = s, this.modifiedStartColumn = o, this.modifiedEndLineNumber = l, this.modifiedEndColumn = u;
  }
  static createFromDiffChange(e, n, r) {
    const i = n.getStartLineNumber(e.originalStart), s = n.getStartColumn(e.originalStart), o = n.getEndLineNumber(e.originalStart + e.originalLength - 1), l = n.getEndColumn(e.originalStart + e.originalLength - 1), u = r.getStartLineNumber(e.modifiedStart), h = r.getStartColumn(e.modifiedStart), c = r.getEndLineNumber(e.modifiedStart + e.modifiedLength - 1), d = r.getEndColumn(e.modifiedStart + e.modifiedLength - 1);
    return new Je(
      i,
      s,
      o,
      l,
      u,
      h,
      c,
      d
    );
  }
}
function el(t) {
  if (t.length <= 1)
    return t;
  const e = [t[0]];
  let n = e[0];
  for (let r = 1, i = t.length; r < i; r++) {
    const s = t[r], o = s.originalStart - (n.originalStart + n.originalLength), l = s.modifiedStart - (n.modifiedStart + n.modifiedLength);
    Math.min(o, l) < Za ? (n.originalLength = s.originalStart + s.originalLength - n.originalStart, n.modifiedLength = s.modifiedStart + s.modifiedLength - n.modifiedStart) : (e.push(s), n = s);
  }
  return e;
}
class gt {
  constructor(e, n, r, i, s) {
    this.originalStartLineNumber = e, this.originalEndLineNumber = n, this.modifiedStartLineNumber = r, this.modifiedEndLineNumber = i, this.charChanges = s;
  }
  static createFromDiffResult(e, n, r, i, s, o, l) {
    let u, h, c, d, g;
    if (n.originalLength === 0 ? (u = r.getStartLineNumber(n.originalStart) - 1, h = 0) : (u = r.getStartLineNumber(n.originalStart), h = r.getEndLineNumber(n.originalStart + n.originalLength - 1)), n.modifiedLength === 0 ? (c = i.getStartLineNumber(n.modifiedStart) - 1, d = 0) : (c = i.getStartLineNumber(n.modifiedStart), d = i.getEndLineNumber(n.modifiedStart + n.modifiedLength - 1)), o && n.originalLength > 0 && n.originalLength < 20 && n.modifiedLength > 0 && n.modifiedLength < 20 && s()) {
      const m = r.createCharSequence(e, n.originalStart, n.originalStart + n.originalLength - 1), f = i.createCharSequence(e, n.modifiedStart, n.modifiedStart + n.modifiedLength - 1);
      if (m.getElements().length > 0 && f.getElements().length > 0) {
        let p = Ls(m, f, s, !0).changes;
        l && (p = el(p)), g = [];
        for (let C = 0, v = p.length; C < v; C++)
          g.push(Je.createFromDiffChange(p[C], m, f));
      }
    }
    return new gt(
      u,
      h,
      c,
      d,
      g
    );
  }
}
class Cs {
  constructor(e, n, r) {
    this.shouldComputeCharChanges = r.shouldComputeCharChanges, this.shouldPostProcessCharChanges = r.shouldPostProcessCharChanges, this.shouldIgnoreTrimWhitespace = r.shouldIgnoreTrimWhitespace, this.shouldMakePrettyDiff = r.shouldMakePrettyDiff, this.originalLines = e, this.modifiedLines = n, this.original = new bi(e), this.modified = new bi(n), this.continueLineDiff = wi(r.maxComputationTime), this.continueCharDiff = wi(r.maxComputationTime === 0 ? 0 : Math.min(r.maxComputationTime, 5e3));
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
    const e = Ls(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff), n = e.changes, r = e.quitEarly;
    if (this.shouldIgnoreTrimWhitespace) {
      const l = [];
      for (let u = 0, h = n.length; u < h; u++)
        l.push(gt.createFromDiffResult(this.shouldIgnoreTrimWhitespace, n[u], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
      return {
        quitEarly: r,
        changes: l
      };
    }
    const i = [];
    let s = 0, o = 0;
    for (let l = -1, u = n.length; l < u; l++) {
      const h = l + 1 < u ? n[l + 1] : null, c = h ? h.originalStart : this.originalLines.length, d = h ? h.modifiedStart : this.modifiedLines.length;
      for (; s < c && o < d; ) {
        const g = this.originalLines[s], m = this.modifiedLines[o];
        if (g !== m) {
          {
            let f = Ln(g, 1), p = Ln(m, 1);
            for (; f > 1 && p > 1; ) {
              const C = g.charCodeAt(f - 2), v = m.charCodeAt(p - 2);
              if (C !== v)
                break;
              f--, p--;
            }
            (f > 1 || p > 1) && this._pushTrimWhitespaceCharChange(i, s + 1, 1, f, o + 1, 1, p);
          }
          {
            let f = Cn(g, 1), p = Cn(m, 1);
            const C = g.length + 1, v = m.length + 1;
            for (; f < C && p < v; ) {
              const L = g.charCodeAt(f - 1), _ = g.charCodeAt(p - 1);
              if (L !== _)
                break;
              f++, p++;
            }
            (f < C || p < v) && this._pushTrimWhitespaceCharChange(i, s + 1, f, C, o + 1, p, v);
          }
        }
        s++, o++;
      }
      h && (i.push(gt.createFromDiffResult(this.shouldIgnoreTrimWhitespace, h, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges)), s += h.originalLength, o += h.modifiedLength);
    }
    return {
      quitEarly: r,
      changes: i
    };
  }
  _pushTrimWhitespaceCharChange(e, n, r, i, s, o, l) {
    if (this._mergeTrimWhitespaceCharChange(e, n, r, i, s, o, l))
      return;
    let u;
    this.shouldComputeCharChanges && (u = [new Je(
      n,
      r,
      n,
      i,
      s,
      o,
      s,
      l
    )]), e.push(new gt(
      n,
      n,
      s,
      s,
      u
    ));
  }
  _mergeTrimWhitespaceCharChange(e, n, r, i, s, o, l) {
    const u = e.length;
    if (u === 0)
      return !1;
    const h = e[u - 1];
    return h.originalEndLineNumber === 0 || h.modifiedEndLineNumber === 0 ? !1 : h.originalEndLineNumber === n && h.modifiedEndLineNumber === s ? (this.shouldComputeCharChanges && h.charChanges && h.charChanges.push(new Je(
      n,
      r,
      n,
      i,
      s,
      o,
      s,
      l
    )), !0) : h.originalEndLineNumber + 1 === n && h.modifiedEndLineNumber + 1 === s ? (h.originalEndLineNumber = n, h.modifiedEndLineNumber = s, this.shouldComputeCharChanges && h.charChanges && h.charChanges.push(new Je(
      n,
      r,
      n,
      i,
      s,
      o,
      s,
      l
    )), !0) : !1;
  }
}
function Ln(t, e) {
  const n = Eo(t);
  return n === -1 ? e : n + 1;
}
function Cn(t, e) {
  const n = So(t);
  return n === -1 ? e : n + 2;
}
function wi(t) {
  if (t === 0)
    return () => !0;
  const e = Date.now();
  return () => Date.now() - e < t;
}
class Ee {
  static trivial(e, n) {
    return new Ee([new j(I.ofLength(e.length), I.ofLength(n.length))], !1);
  }
  static trivialTimedOut(e, n) {
    return new Ee([new j(I.ofLength(e.length), I.ofLength(n.length))], !0);
  }
  constructor(e, n) {
    this.diffs = e, this.hitTimeout = n;
  }
}
class j {
  static invert(e, n) {
    const r = [];
    return qs(e, (i, s) => {
      r.push(j.fromOffsetPairs(i ? i.getEndExclusives() : De.zero, s ? s.getStarts() : new De(
        n,
        (i ? i.seq2Range.endExclusive - i.seq1Range.endExclusive : 0) + n
      )));
    }), r;
  }
  static fromOffsetPairs(e, n) {
    return new j(new I(e.offset1, n.offset1), new I(e.offset2, n.offset2));
  }
  static assertSorted(e) {
    let n;
    for (const r of e) {
      if (n && !(n.seq1Range.endExclusive <= r.seq1Range.start && n.seq2Range.endExclusive <= r.seq2Range.start))
        throw new J("Sequence diffs must be sorted");
      n = r;
    }
  }
  constructor(e, n) {
    this.seq1Range = e, this.seq2Range = n;
  }
  swap() {
    return new j(this.seq2Range, this.seq1Range);
  }
  toString() {
    return `${this.seq1Range} <-> ${this.seq2Range}`;
  }
  join(e) {
    return new j(this.seq1Range.join(e.seq1Range), this.seq2Range.join(e.seq2Range));
  }
  delta(e) {
    return e === 0 ? this : new j(this.seq1Range.delta(e), this.seq2Range.delta(e));
  }
  deltaStart(e) {
    return e === 0 ? this : new j(this.seq1Range.deltaStart(e), this.seq2Range.deltaStart(e));
  }
  deltaEnd(e) {
    return e === 0 ? this : new j(this.seq1Range.deltaEnd(e), this.seq2Range.deltaEnd(e));
  }
  intersectsOrTouches(e) {
    return this.seq1Range.intersectsOrTouches(e.seq1Range) || this.seq2Range.intersectsOrTouches(e.seq2Range);
  }
  intersect(e) {
    const n = this.seq1Range.intersect(e.seq1Range), r = this.seq2Range.intersect(e.seq2Range);
    if (!(!n || !r))
      return new j(n, r);
  }
  getStarts() {
    return new De(this.seq1Range.start, this.seq2Range.start);
  }
  getEndExclusives() {
    return new De(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
  }
}
const lt = class vs {
  constructor(e, n) {
    this.offset1 = e, this.offset2 = n;
  }
  toString() {
    return `${this.offset1} <-> ${this.offset2}`;
  }
  delta(e) {
    return e === 0 ? this : new vs(this.offset1 + e, this.offset2 + e);
  }
  equals(e) {
    return this.offset1 === e.offset1 && this.offset2 === e.offset2;
  }
};
lt.zero = new lt(0, 0), lt.max = new lt(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
let De = lt;
const vn = class {
  isValid() {
    return !0;
  }
};
vn.instance = new vn();
let On = vn;
class tl {
  constructor(e) {
    if (this.timeout = e, this.startTime = Date.now(), this.valid = !0, e <= 0)
      throw new J("timeout must be positive");
  }
  isValid() {
    return !(Date.now() - this.startTime < this.timeout) && this.valid && (this.valid = !1), this.valid;
  }
  disable() {
    this.timeout = Number.MAX_SAFE_INTEGER, this.isValid = () => !0, this.valid = !0;
  }
}
class Wt {
  constructor(e, n) {
    this.width = e, this.height = n, this.array = [], this.array = new Array(e * n);
  }
  get(e, n) {
    return this.array[e + n * this.width];
  }
  set(e, n, r) {
    this.array[e + n * this.width] = r;
  }
}
function yn(t) {
  return t === 32 || t === 9;
}
const ys = class _n {
  static getKey(e) {
    let n = this.chrKeys.get(e);
    return n === void 0 && (n = this.chrKeys.size, this.chrKeys.set(e, n)), n;
  }
  constructor(e, n, r) {
    this.range = e, this.lines = n, this.source = r, this.histogram = [];
    let i = 0;
    for (let s = e.startLineNumber - 1; s < e.endLineNumberExclusive - 1; s++) {
      const o = n[s];
      for (let u = 0; u < o.length; u++) {
        i++;
        const h = o[u], c = _n.getKey(h);
        this.histogram[c] = (this.histogram[c] || 0) + 1;
      }
      i++;
      const l = _n.getKey(`
`);
      this.histogram[l] = (this.histogram[l] || 0) + 1;
    }
    this.totalCount = i;
  }
  computeSimilarity(e) {
    let n = 0;
    const r = Math.max(this.histogram.length, e.histogram.length);
    for (let i = 0; i < r; i++)
      n += Math.abs((this.histogram[i] ?? 0) - (e.histogram[i] ?? 0));
    return 1 - n / (this.totalCount + e.totalCount);
  }
};
ys.chrKeys = /* @__PURE__ */ new Map();
let Li = ys;
class nl {
  compute(e, n, r = On.instance, i) {
    if (e.length === 0 || n.length === 0)
      return Ee.trivial(e, n);
    const s = new Wt(e.length, n.length), o = new Wt(e.length, n.length), l = new Wt(e.length, n.length);
    for (let f = 0; f < e.length; f++)
      for (let p = 0; p < n.length; p++) {
        if (!r.isValid())
          return Ee.trivialTimedOut(e, n);
        const C = f === 0 ? 0 : s.get(f - 1, p), v = p === 0 ? 0 : s.get(f, p - 1);
        let L;
        e.getElement(f) === n.getElement(p) ? (f === 0 || p === 0 ? L = 0 : L = s.get(f - 1, p - 1), f > 0 && p > 0 && o.get(f - 1, p - 1) === 3 && (L += l.get(f - 1, p - 1)), L += i ? i(f, p) : 1) : L = -1;
        const _ = Math.max(C, v, L);
        if (_ === L) {
          const b = f > 0 && p > 0 ? l.get(f - 1, p - 1) : 0;
          l.set(f, p, b + 1), o.set(f, p, 3);
        } else _ === C ? (l.set(f, p, 0), o.set(f, p, 1)) : _ === v && (l.set(f, p, 0), o.set(f, p, 2));
        s.set(f, p, _);
      }
    const u = [];
    let h = e.length, c = n.length;
    function d(f, p) {
      (f + 1 !== h || p + 1 !== c) && u.push(new j(new I(f + 1, h), new I(p + 1, c))), h = f, c = p;
    }
    let g = e.length - 1, m = n.length - 1;
    for (; g >= 0 && m >= 0; )
      o.get(g, m) === 3 ? (d(g, m), g--, m--) : o.get(g, m) === 1 ? g-- : m--;
    return d(-1, -1), u.reverse(), new Ee(u, !1);
  }
}
class _s {
  compute(e, n, r = On.instance) {
    if (e.length === 0 || n.length === 0)
      return Ee.trivial(e, n);
    const i = e, s = n;
    function o(p, C) {
      for (; p < i.length && C < s.length && i.getElement(p) === s.getElement(C); )
        p++, C++;
      return p;
    }
    let l = 0;
    const u = new rl();
    u.set(0, o(0, 0));
    const h = new il();
    h.set(0, u.get(0) === 0 ? null : new Ci(null, 0, 0, u.get(0)));
    let c = 0;
    e: for (; ; ) {
      if (l++, !r.isValid())
        return Ee.trivialTimedOut(i, s);
      const p = -Math.min(l, s.length + l % 2), C = Math.min(l, i.length + l % 2);
      for (c = p; c <= C; c += 2) {
        const v = c === C ? -1 : u.get(c + 1), L = c === p ? -1 : u.get(c - 1) + 1, _ = Math.min(Math.max(v, L), i.length), b = _ - c;
        if (_ > i.length || b > s.length)
          continue;
        const w = o(_, b);
        u.set(c, w);
        const y = _ === v ? h.get(c + 1) : h.get(c - 1);
        if (h.set(c, w !== _ ? new Ci(y, _, b, w - _) : y), u.get(c) === i.length && u.get(c) - c === s.length)
          break e;
      }
    }
    let d = h.get(c);
    const g = [];
    let m = i.length, f = s.length;
    for (; ; ) {
      const p = d ? d.x + d.length : 0, C = d ? d.y + d.length : 0;
      if ((p !== m || C !== f) && g.push(new j(new I(p, m), new I(C, f))), !d)
        break;
      m = d.x, f = d.y, d = d.prev;
    }
    return g.reverse(), new Ee(g, !1);
  }
}
class Ci {
  constructor(e, n, r, i) {
    this.prev = e, this.x = n, this.y = r, this.length = i;
  }
}
class rl {
  constructor() {
    this.positiveArr = new Int32Array(10), this.negativeArr = new Int32Array(10);
  }
  get(e) {
    return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
  }
  set(e, n) {
    if (e < 0) {
      if (e = -e - 1, e >= this.negativeArr.length) {
        const r = this.negativeArr;
        this.negativeArr = new Int32Array(r.length * 2), this.negativeArr.set(r);
      }
      this.negativeArr[e] = n;
    } else {
      if (e >= this.positiveArr.length) {
        const r = this.positiveArr;
        this.positiveArr = new Int32Array(r.length * 2), this.positiveArr.set(r);
      }
      this.positiveArr[e] = n;
    }
  }
}
class il {
  constructor() {
    this.positiveArr = [], this.negativeArr = [];
  }
  get(e) {
    return e < 0 ? (e = -e - 1, this.negativeArr[e]) : this.positiveArr[e];
  }
  set(e, n) {
    e < 0 ? (e = -e - 1, this.negativeArr[e] = n) : this.positiveArr[e] = n;
  }
}
class Ft {
  constructor(e, n, r) {
    this.lines = e, this.range = n, this.considerWhitespaceChanges = r, this.elements = [], this.firstElementOffsetByLineIdx = [], this.lineStartOffsets = [], this.trimmedWsLengthsByLineIdx = [], this.firstElementOffsetByLineIdx.push(0);
    for (let i = this.range.startLineNumber; i <= this.range.endLineNumber; i++) {
      let s = e[i - 1], o = 0;
      i === this.range.startLineNumber && this.range.startColumn > 1 && (o = this.range.startColumn - 1, s = s.substring(o)), this.lineStartOffsets.push(o);
      let l = 0;
      if (!r) {
        const h = s.trimStart();
        l = s.length - h.length, s = h.trimEnd();
      }
      this.trimmedWsLengthsByLineIdx.push(l);
      const u = i === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - o - l, s.length) : s.length;
      for (let h = 0; h < u; h++)
        this.elements.push(s.charCodeAt(h));
      i < this.range.endLineNumber && (this.elements.push(10), this.firstElementOffsetByLineIdx.push(this.elements.length));
    }
  }
  toString() {
    return `Slice: "${this.text}"`;
  }
  get text() {
    return this.getText(new I(0, this.length));
  }
  getText(e) {
    return this.elements.slice(e.start, e.endExclusive).map((n) => String.fromCharCode(n)).join("");
  }
  getElement(e) {
    return this.elements[e];
  }
  get length() {
    return this.elements.length;
  }
  getBoundaryScore(e) {
    const n = yi(e > 0 ? this.elements[e - 1] : -1), r = yi(e < this.elements.length ? this.elements[e] : -1);
    if (n === 7 && r === 8)
      return 0;
    if (n === 8)
      return 150;
    let i = 0;
    return n !== r && (i += 10, n === 0 && r === 1 && (i += 1)), i += vi(n), i += vi(r), i;
  }
  translateOffset(e, n = "right") {
    const r = Qe(this.firstElementOffsetByLineIdx, (s) => s <= e), i = e - this.firstElementOffsetByLineIdx[r];
    return new F(
      this.range.startLineNumber + r,
      1 + this.lineStartOffsets[r] + i + (i === 0 && n === "left" ? 0 : this.trimmedWsLengthsByLineIdx[r])
    );
  }
  translateRange(e) {
    const n = this.translateOffset(e.start, "right"), r = this.translateOffset(e.endExclusive, "left");
    return r.isBefore(n) ? E.fromPositions(r, r) : E.fromPositions(n, r);
  }
  findWordContaining(e) {
    if (e < 0 || e >= this.elements.length || !Ht(this.elements[e]))
      return;
    let n = e;
    for (; n > 0 && Ht(this.elements[n - 1]); )
      n--;
    let r = e;
    for (; r < this.elements.length && Ht(this.elements[r]); )
      r++;
    return new I(n, r);
  }
  countLinesIn(e) {
    return this.translateOffset(e.endExclusive).lineNumber - this.translateOffset(e.start).lineNumber;
  }
  isStronglyEqual(e, n) {
    return this.elements[e] === this.elements[n];
  }
  extendToFullLines(e) {
    const n = Ye(this.firstElementOffsetByLineIdx, (i) => i <= e.start) ?? 0, r = Fs(this.firstElementOffsetByLineIdx, (i) => e.endExclusive <= i) ?? this.elements.length;
    return new I(n, r);
  }
}
function Ht(t) {
  return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57;
}
const sl = {
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
function vi(t) {
  return sl[t];
}
function yi(t) {
  return t === 10 ? 8 : t === 13 ? 7 : yn(t) ? 6 : t >= 97 && t <= 122 ? 0 : t >= 65 && t <= 90 ? 1 : t >= 48 && t <= 57 ? 2 : t === -1 ? 3 : t === 44 || t === 59 ? 5 : 4;
}
function ol(t, e, n, r, i, s) {
  let { moves: o, excludedChanges: l } = ll(t, e, n, s);
  if (!s.isValid())
    return [];
  const u = t.filter((c) => !l.has(c)), h = ul(u, r, i, e, n, s);
  return Vs(o, h), o = hl(o), o = o.filter((c) => {
    const d = c.original.toOffsetRange().slice(e).map((g) => g.trim());
    return d.join(`
`).length >= 15 && al(d, (g) => g.length >= 2) >= 2;
  }), o = cl(t, o), o;
}
function al(t, e) {
  let n = 0;
  for (const r of t)
    e(r) && n++;
  return n;
}
function ll(t, e, n, r) {
  const i = [], s = t.filter((u) => u.modified.isEmpty && u.original.length >= 3).map((u) => new Li(u.original, e, u)), o = new Set(t.filter((u) => u.original.isEmpty && u.modified.length >= 3).map((u) => new Li(u.modified, n, u))), l = /* @__PURE__ */ new Set();
  for (const u of s) {
    let h = -1, c;
    for (const d of o) {
      const g = u.computeSimilarity(d);
      g > h && (h = g, c = d);
    }
    if (h > 0.9 && c && (o.delete(c), i.push(new me(u.range, c.range)), l.add(u.source), l.add(c.source)), !r.isValid())
      return { moves: i, excludedChanges: l };
  }
  return { moves: i, excludedChanges: l };
}
function ul(t, e, n, r, i, s) {
  const o = [], l = new Gs();
  for (const g of t)
    for (let m = g.original.startLineNumber; m < g.original.endLineNumberExclusive - 2; m++) {
      const f = `${e[m - 1]}:${e[m + 1 - 1]}:${e[m + 2 - 1]}`;
      l.add(f, { range: new T(m, m + 3) });
    }
  const u = [];
  t.sort(ct((g) => g.modified.startLineNumber, dt));
  for (const g of t) {
    let m = [];
    for (let f = g.modified.startLineNumber; f < g.modified.endLineNumberExclusive - 2; f++) {
      const p = `${n[f - 1]}:${n[f + 1 - 1]}:${n[f + 2 - 1]}`, C = new T(f, f + 3), v = [];
      l.forEach(p, ({ range: L }) => {
        for (const b of m)
          if (b.originalLineRange.endLineNumberExclusive + 1 === L.endLineNumberExclusive && b.modifiedLineRange.endLineNumberExclusive + 1 === C.endLineNumberExclusive) {
            b.originalLineRange = new T(
              b.originalLineRange.startLineNumber,
              L.endLineNumberExclusive
            ), b.modifiedLineRange = new T(
              b.modifiedLineRange.startLineNumber,
              C.endLineNumberExclusive
            ), v.push(b);
            return;
          }
        const _ = {
          modifiedLineRange: C,
          originalLineRange: L
        };
        u.push(_), v.push(_);
      }), m = v;
    }
    if (!s.isValid())
      return [];
  }
  u.sort(Bs(ct((g) => g.modifiedLineRange.length, dt)));
  const h = new Ce(), c = new Ce();
  for (const g of u) {
    const m = g.modifiedLineRange.startLineNumber - g.originalLineRange.startLineNumber, f = h.subtractFrom(g.modifiedLineRange), p = c.subtractFrom(g.originalLineRange).getWithDelta(m), C = f.getIntersection(p);
    for (const v of C.ranges) {
      if (v.length < 3)
        continue;
      const L = v, _ = v.delta(-m);
      o.push(new me(_, L)), h.addRange(L), c.addRange(_);
    }
  }
  o.sort(ct((g) => g.original.startLineNumber, dt));
  const d = new Ui(t);
  for (let g = 0; g < o.length; g++) {
    const m = o[g], f = d.findLastMonotonous((y) => y.original.startLineNumber <= m.original.startLineNumber), p = Ye(t, (y) => y.modified.startLineNumber <= m.modified.startLineNumber), C = Math.max(m.original.startLineNumber - f.original.startLineNumber, m.modified.startLineNumber - p.modified.startLineNumber), v = d.findLastMonotonous((y) => y.original.startLineNumber < m.original.endLineNumberExclusive), L = Ye(t, (y) => y.modified.startLineNumber < m.modified.endLineNumberExclusive), _ = Math.max(v.original.endLineNumberExclusive - m.original.endLineNumberExclusive, L.modified.endLineNumberExclusive - m.modified.endLineNumberExclusive);
    let b;
    for (b = 0; b < C; b++) {
      const y = m.original.startLineNumber - b - 1, S = m.modified.startLineNumber - b - 1;
      if (y > r.length || S > i.length || h.contains(S) || c.contains(y) || !_i(r[y - 1], i[S - 1], s))
        break;
    }
    b > 0 && (c.addRange(new T(m.original.startLineNumber - b, m.original.startLineNumber)), h.addRange(new T(m.modified.startLineNumber - b, m.modified.startLineNumber)));
    let w;
    for (w = 0; w < _; w++) {
      const y = m.original.endLineNumberExclusive + w, S = m.modified.endLineNumberExclusive + w;
      if (y > r.length || S > i.length || h.contains(S) || c.contains(y) || !_i(r[y - 1], i[S - 1], s))
        break;
    }
    w > 0 && (c.addRange(new T(
      m.original.endLineNumberExclusive,
      m.original.endLineNumberExclusive + w
    )), h.addRange(new T(
      m.modified.endLineNumberExclusive,
      m.modified.endLineNumberExclusive + w
    ))), (b > 0 || w > 0) && (o[g] = new me(new T(
      m.original.startLineNumber - b,
      m.original.endLineNumberExclusive + w
    ), new T(
      m.modified.startLineNumber - b,
      m.modified.endLineNumberExclusive + w
    )));
  }
  return o;
}
function _i(t, e, n) {
  if (t.trim() === e.trim())
    return !0;
  if (t.length > 300 && e.length > 300)
    return !1;
  const r = new _s().compute(new Ft([t], new E(1, 1, 1, t.length), !1), new Ft([e], new E(1, 1, 1, e.length), !1), n);
  let i = 0;
  const s = j.invert(r.diffs, t.length);
  for (const u of s)
    u.seq1Range.forEach((h) => {
      yn(t.charCodeAt(h)) || i++;
    });
  function o(u) {
    let h = 0;
    for (let c = 0; c < t.length; c++)
      yn(u.charCodeAt(c)) || h++;
    return h;
  }
  const l = o(t.length > e.length ? t : e);
  return i / l > 0.6 && l > 10;
}
function hl(t) {
  if (t.length === 0)
    return t;
  t.sort(ct((n) => n.original.startLineNumber, dt));
  const e = [t[0]];
  for (let n = 1; n < t.length; n++) {
    const r = e[e.length - 1], i = t[n], s = i.original.startLineNumber - r.original.endLineNumberExclusive, o = i.modified.startLineNumber - r.modified.endLineNumberExclusive;
    if (s >= 0 && o >= 0 && s + o <= 2) {
      e[e.length - 1] = r.join(i);
      continue;
    }
    e.push(i);
  }
  return e;
}
function cl(t, e) {
  const n = new Ui(t);
  return e = e.filter((r) => {
    const i = n.findLastMonotonous((o) => o.original.startLineNumber < r.original.endLineNumberExclusive) || new me(new T(1, 1), new T(1, 1)), s = Ye(t, (o) => o.modified.startLineNumber < r.modified.endLineNumberExclusive);
    return i !== s;
  }), e;
}
function Ni(t, e, n) {
  let r = n;
  return r = Ei(t, e, r), r = Ei(t, e, r), r = dl(t, e, r), r;
}
function Ei(t, e, n) {
  if (n.length === 0)
    return n;
  const r = [];
  r.push(n[0]);
  for (let s = 1; s < n.length; s++) {
    const o = r[r.length - 1];
    let l = n[s];
    if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
      const u = l.seq1Range.start - o.seq1Range.endExclusive;
      let h;
      for (h = 1; h <= u && !(t.getElement(l.seq1Range.start - h) !== t.getElement(l.seq1Range.endExclusive - h) || e.getElement(l.seq2Range.start - h) !== e.getElement(l.seq2Range.endExclusive - h)); h++)
        ;
      if (h--, h === u) {
        r[r.length - 1] = new j(new I(o.seq1Range.start, l.seq1Range.endExclusive - u), new I(o.seq2Range.start, l.seq2Range.endExclusive - u));
        continue;
      }
      l = l.delta(-h);
    }
    r.push(l);
  }
  const i = [];
  for (let s = 0; s < r.length - 1; s++) {
    const o = r[s + 1];
    let l = r[s];
    if (l.seq1Range.isEmpty || l.seq2Range.isEmpty) {
      const u = o.seq1Range.start - l.seq1Range.endExclusive;
      let h;
      for (h = 0; h < u && !(!t.isStronglyEqual(l.seq1Range.start + h, l.seq1Range.endExclusive + h) || !e.isStronglyEqual(l.seq2Range.start + h, l.seq2Range.endExclusive + h)); h++)
        ;
      if (h === u) {
        r[s + 1] = new j(new I(l.seq1Range.start + u, o.seq1Range.endExclusive), new I(l.seq2Range.start + u, o.seq2Range.endExclusive));
        continue;
      }
      h > 0 && (l = l.delta(h));
    }
    i.push(l);
  }
  return r.length > 0 && i.push(r[r.length - 1]), i;
}
function dl(t, e, n) {
  if (!t.getBoundaryScore || !e.getBoundaryScore)
    return n;
  for (let r = 0; r < n.length; r++) {
    const i = r > 0 ? n[r - 1] : void 0, s = n[r], o = r + 1 < n.length ? n[r + 1] : void 0, l = new I(
      i ? i.seq1Range.endExclusive + 1 : 0,
      o ? o.seq1Range.start - 1 : t.length
    ), u = new I(
      i ? i.seq2Range.endExclusive + 1 : 0,
      o ? o.seq2Range.start - 1 : e.length
    );
    s.seq1Range.isEmpty ? n[r] = Si(s, t, e, l, u) : s.seq2Range.isEmpty && (n[r] = Si(s.swap(), e, t, u, l).swap());
  }
  return n;
}
function Si(t, e, n, r, i) {
  let s = 1;
  for (; t.seq1Range.start - s >= r.start && t.seq2Range.start - s >= i.start && n.isStronglyEqual(t.seq2Range.start - s, t.seq2Range.endExclusive - s) && s < 100; )
    s++;
  s--;
  let o = 0;
  for (; t.seq1Range.start + o < r.endExclusive && t.seq2Range.endExclusive + o < i.endExclusive && n.isStronglyEqual(t.seq2Range.start + o, t.seq2Range.endExclusive + o) && o < 100; )
    o++;
  if (s === 0 && o === 0)
    return t;
  let l = 0, u = -1;
  for (let h = -s; h <= o; h++) {
    const c = t.seq2Range.start + h, d = t.seq2Range.endExclusive + h, g = t.seq1Range.start + h, m = e.getBoundaryScore(g) + n.getBoundaryScore(c) + n.getBoundaryScore(d);
    m > u && (u = m, l = h);
  }
  return t.delta(l);
}
function gl(t, e, n) {
  const r = [];
  for (const i of n) {
    const s = r[r.length - 1];
    if (!s) {
      r.push(i);
      continue;
    }
    i.seq1Range.start - s.seq1Range.endExclusive <= 2 || i.seq2Range.start - s.seq2Range.endExclusive <= 2 ? r[r.length - 1] = new j(s.seq1Range.join(i.seq1Range), s.seq2Range.join(i.seq2Range)) : r.push(i);
  }
  return r;
}
function ml(t, e, n) {
  const r = j.invert(n, t.length), i = [];
  let s = new De(0, 0);
  function o(l, u) {
    if (l.offset1 < s.offset1 || l.offset2 < s.offset2)
      return;
    const h = t.findWordContaining(l.offset1), c = e.findWordContaining(l.offset2);
    if (!h || !c)
      return;
    let d = new j(h, c);
    const g = d.intersect(u);
    let m = g.seq1Range.length, f = g.seq2Range.length;
    for (; r.length > 0; ) {
      const p = r[0];
      if (!(p.seq1Range.intersects(d.seq1Range) || p.seq2Range.intersects(d.seq2Range)))
        break;
      const C = t.findWordContaining(p.seq1Range.start), v = e.findWordContaining(p.seq2Range.start), L = new j(C, v), _ = L.intersect(p);
      if (m += _.seq1Range.length, f += _.seq2Range.length, d = d.join(L), d.seq1Range.endExclusive >= p.seq1Range.endExclusive)
        r.shift();
      else
        break;
    }
    m + f < (d.seq1Range.length + d.seq2Range.length) * 2 / 3 && i.push(d), s = d.getEndExclusives();
  }
  for (; r.length > 0; ) {
    const l = r.shift();
    l.seq1Range.isEmpty || (o(l.getStarts(), l), o(l.getEndExclusives().delta(-1), l));
  }
  return fl(n, i);
}
function fl(t, e) {
  const n = [];
  for (; t.length > 0 || e.length > 0; ) {
    const r = t[0], i = e[0];
    let s;
    r && (!i || r.seq1Range.start < i.seq1Range.start) ? s = t.shift() : s = e.shift(), n.length > 0 && n[n.length - 1].seq1Range.endExclusive >= s.seq1Range.start ? n[n.length - 1] = n[n.length - 1].join(s) : n.push(s);
  }
  return n;
}
function pl(t, e, n) {
  let r = n;
  if (r.length === 0)
    return r;
  let i = 0, s;
  do {
    s = !1;
    const o = [
      r[0]
    ];
    for (let l = 1; l < r.length; l++) {
      let u = function(d, g) {
        const m = new I(c.seq1Range.endExclusive, h.seq1Range.start);
        return t.getText(m).replace(/\s/g, "").length <= 4 && (d.seq1Range.length + d.seq2Range.length > 5 || g.seq1Range.length + g.seq2Range.length > 5);
      };
      const h = r[l], c = o[o.length - 1];
      u(c, h) ? (s = !0, o[o.length - 1] = o[o.length - 1].join(h)) : o.push(h);
    }
    r = o;
  } while (i++ < 10 && s);
  return r;
}
function bl(t, e, n) {
  let r = n;
  if (r.length === 0)
    return r;
  let i = 0, s;
  do {
    s = !1;
    const l = [
      r[0]
    ];
    for (let u = 1; u < r.length; u++) {
      let h = function(g, m) {
        const f = new I(d.seq1Range.endExclusive, c.seq1Range.start);
        if (t.countLinesIn(f) > 5 || f.length > 500)
          return !1;
        const p = t.getText(f).trim();
        if (p.length > 20 || p.split(/\r\n|\r|\n/).length > 1)
          return !1;
        const C = t.countLinesIn(g.seq1Range), v = g.seq1Range.length, L = e.countLinesIn(g.seq2Range), _ = g.seq2Range.length, b = t.countLinesIn(m.seq1Range), w = m.seq1Range.length, y = e.countLinesIn(m.seq2Range), S = m.seq2Range.length, O = 2 * 40 + 50;
        function K(ie) {
          return Math.min(ie, O);
        }
        return Math.pow(Math.pow(K(C * 40 + v), 1.5) + Math.pow(K(L * 40 + _), 1.5), 1.5) + Math.pow(Math.pow(K(b * 40 + w), 1.5) + Math.pow(K(y * 40 + S), 1.5), 1.5) > (O ** 1.5) ** 1.5 * 1.3;
      };
      const c = r[u], d = l[l.length - 1];
      h(d, c) ? (s = !0, l[l.length - 1] = l[l.length - 1].join(c)) : l.push(c);
    }
    r = l;
  } while (i++ < 10 && s);
  const o = [];
  return Ks(r, (l, u, h) => {
    let c = u;
    function d(v) {
      return v.length > 0 && v.trim().length <= 3 && u.seq1Range.length + u.seq2Range.length > 100;
    }
    const g = t.extendToFullLines(u.seq1Range), m = t.getText(new I(g.start, u.seq1Range.start));
    d(m) && (c = c.deltaStart(-m.length));
    const f = t.getText(new I(u.seq1Range.endExclusive, g.endExclusive));
    d(f) && (c = c.deltaEnd(f.length));
    const p = j.fromOffsetPairs(l ? l.getEndExclusives() : De.zero, h ? h.getStarts() : De.max), C = c.intersect(p);
    o.length > 0 && C.getStarts().equals(o[o.length - 1].getEndExclusives()) ? o[o.length - 1] = o[o.length - 1].join(C) : o.push(C);
  }), o;
}
class Ri {
  constructor(e, n) {
    this.trimmedHash = e, this.lines = n;
  }
  getElement(e) {
    return this.trimmedHash[e];
  }
  get length() {
    return this.trimmedHash.length;
  }
  getBoundaryScore(e) {
    const n = e === 0 ? 0 : xi(this.lines[e - 1]), r = e === this.lines.length ? 0 : xi(this.lines[e]);
    return 1e3 - (n + r);
  }
  getText(e) {
    return this.lines.slice(e.start, e.endExclusive).join(`
`);
  }
  isStronglyEqual(e, n) {
    return this.lines[e] === this.lines[n];
  }
}
function xi(t) {
  let e = 0;
  for (; e < t.length && (t.charCodeAt(e) === 32 || t.charCodeAt(e) === 9); )
    e++;
  return e;
}
class wl {
  constructor() {
    this.dynamicProgrammingDiffing = new nl(), this.myersDiffingAlgorithm = new _s();
  }
  computeDiff(e, n, r) {
    if (e.length <= 1 && Ds(e, n, (w, y) => w === y))
      return new St([], [], !1);
    if (e.length === 1 && e[0].length === 0 || n.length === 1 && n[0].length === 0)
      return new St([
        new Ne(new T(1, e.length + 1), new T(1, n.length + 1), [
          new oe(new E(
            1,
            1,
            e.length,
            e[e.length - 1].length + 1
          ), new E(
            1,
            1,
            n.length,
            n[n.length - 1].length + 1
          ))
        ])
      ], [], !1);
    const i = r.maxComputationTimeMs === 0 ? On.instance : new tl(r.maxComputationTimeMs), s = !r.ignoreTrimWhitespace, o = /* @__PURE__ */ new Map();
    function l(w) {
      let y = o.get(w);
      return y === void 0 && (y = o.size, o.set(w, y)), y;
    }
    const u = e.map((w) => l(w.trim())), h = n.map((w) => l(w.trim())), c = new Ri(u, e), d = new Ri(h, n), g = c.length + d.length < 1700 ? this.dynamicProgrammingDiffing.compute(c, d, i, (w, y) => e[w] === n[y] ? n[y].length === 0 ? 0.1 : 1 + Math.log(1 + n[y].length) : 0.99) : this.myersDiffingAlgorithm.compute(c, d, i);
    let m = g.diffs, f = g.hitTimeout;
    m = Ni(c, d, m), m = pl(c, d, m);
    const p = [], C = (w) => {
      if (s)
        for (let y = 0; y < w; y++) {
          const S = v + y, O = L + y;
          if (e[S] !== n[O]) {
            const K = this.refineDiff(e, n, new j(new I(S, S + 1), new I(O, O + 1)), i, s);
            for (const ie of K.mappings)
              p.push(ie);
            K.hitTimeout && (f = !0);
          }
        }
    };
    let v = 0, L = 0;
    for (const w of m) {
      ft(() => w.seq1Range.start - v === w.seq2Range.start - L);
      const y = w.seq1Range.start - v;
      C(y), v = w.seq1Range.endExclusive, L = w.seq2Range.endExclusive;
      const S = this.refineDiff(e, n, w, i, s);
      S.hitTimeout && (f = !0);
      for (const O of S.mappings)
        p.push(O);
    }
    C(e.length - v);
    const _ = pi(p, new vt(e), new vt(n));
    let b = [];
    return r.computeMoves && (b = this.computeMoves(_, e, n, u, h, i, s)), ft(() => {
      function w(S, O) {
        if (S.lineNumber < 1 || S.lineNumber > O.length)
          return !1;
        const K = O[S.lineNumber - 1];
        return !(S.column < 1 || S.column > K.length + 1);
      }
      function y(S, O) {
        return !(S.startLineNumber < 1 || S.startLineNumber > O.length + 1 || S.endLineNumberExclusive < 1 || S.endLineNumberExclusive > O.length + 1);
      }
      for (const S of _) {
        if (!S.innerChanges)
          return !1;
        for (const O of S.innerChanges)
          if (!(w(O.modifiedRange.getStartPosition(), n) && w(O.modifiedRange.getEndPosition(), n) && w(O.originalRange.getStartPosition(), e) && w(O.originalRange.getEndPosition(), e)))
            return !1;
        if (!y(S.modified, n) || !y(S.original, e))
          return !1;
      }
      return !0;
    }), new St(_, b, f);
  }
  computeMoves(e, n, r, i, s, o, l) {
    return ol(e, n, r, i, s, o).map((u) => {
      const h = this.refineDiff(n, r, new j(u.original.toOffsetRange(), u.modified.toOffsetRange()), o, l), c = pi(h.mappings, new vt(n), new vt(r), !0);
      return new Pn(u, c);
    });
  }
  refineDiff(e, n, r, i, s) {
    const o = Ll(r).toRangeMapping2(e, n), l = new Ft(e, o.originalRange, s), u = new Ft(n, o.modifiedRange, s), h = l.length + u.length < 500 ? this.dynamicProgrammingDiffing.compute(l, u, i) : this.myersDiffingAlgorithm.compute(l, u, i);
    let c = h.diffs;
    return c = Ni(l, u, c), c = ml(l, u, c), c = gl(l, u, c), c = bl(l, u, c), {
      mappings: c.map((d) => new oe(l.translateRange(d.seq1Range), u.translateRange(d.seq2Range))),
      hitTimeout: h.hitTimeout
    };
  }
}
function Ll(t) {
  return new me(new T(t.seq1Range.start + 1, t.seq1Range.endExclusive + 1), new T(t.seq2Range.start + 1, t.seq2Range.endExclusive + 1));
}
const jt = {
  getLegacy: () => new Ya(),
  getDefault: () => new wl()
};
function Oe(t, e) {
  const n = Math.pow(10, e);
  return Math.round(t * n) / n;
}
class W {
  constructor(e, n, r, i = 1) {
    this._rgbaBrand = void 0, this.r = Math.min(255, Math.max(0, e)) | 0, this.g = Math.min(255, Math.max(0, n)) | 0, this.b = Math.min(255, Math.max(0, r)) | 0, this.a = Oe(Math.max(Math.min(1, i), 0), 3);
  }
  static equals(e, n) {
    return e.r === n.r && e.g === n.g && e.b === n.b && e.a === n.a;
  }
}
class ge {
  constructor(e, n, r, i) {
    this._hslaBrand = void 0, this.h = Math.max(Math.min(360, e), 0) | 0, this.s = Oe(Math.max(Math.min(1, n), 0), 3), this.l = Oe(Math.max(Math.min(1, r), 0), 3), this.a = Oe(Math.max(Math.min(1, i), 0), 3);
  }
  static equals(e, n) {
    return e.h === n.h && e.s === n.s && e.l === n.l && e.a === n.a;
  }
  static fromRGBA(e) {
    const n = e.r / 255, r = e.g / 255, i = e.b / 255, s = e.a, o = Math.max(n, r, i), l = Math.min(n, r, i);
    let u = 0, h = 0;
    const c = (l + o) / 2, d = o - l;
    if (d > 0) {
      switch (h = Math.min(c <= 0.5 ? d / (2 * c) : d / (2 - 2 * c), 1), o) {
        case n:
          u = (r - i) / d + (r < i ? 6 : 0);
          break;
        case r:
          u = (i - n) / d + 2;
          break;
        case i:
          u = (n - r) / d + 4;
          break;
      }
      u *= 60, u = Math.round(u);
    }
    return new ge(u, h, c, s);
  }
  static _hue2rgb(e, n, r) {
    return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (n - e) * 6 * r : r < 1 / 2 ? n : r < 2 / 3 ? e + (n - e) * (2 / 3 - r) * 6 : e;
  }
  static toRGBA(e) {
    const n = e.h / 360, { s: r, l: i, a: s } = e;
    let o, l, u;
    if (r === 0)
      o = l = u = i;
    else {
      const h = i < 0.5 ? i * (1 + r) : i + r - i * r, c = 2 * i - h;
      o = ge._hue2rgb(c, h, n + 1 / 3), l = ge._hue2rgb(c, h, n), u = ge._hue2rgb(c, h, n - 1 / 3);
    }
    return new W(Math.round(o * 255), Math.round(l * 255), Math.round(u * 255), s);
  }
}
class Xe {
  constructor(e, n, r, i) {
    this._hsvaBrand = void 0, this.h = Math.max(Math.min(360, e), 0) | 0, this.s = Oe(Math.max(Math.min(1, n), 0), 3), this.v = Oe(Math.max(Math.min(1, r), 0), 3), this.a = Oe(Math.max(Math.min(1, i), 0), 3);
  }
  static equals(e, n) {
    return e.h === n.h && e.s === n.s && e.v === n.v && e.a === n.a;
  }
  static fromRGBA(e) {
    const n = e.r / 255, r = e.g / 255, i = e.b / 255, s = Math.max(n, r, i), o = Math.min(n, r, i), l = s - o, u = s === 0 ? 0 : l / s;
    let h;
    return l === 0 ? h = 0 : s === n ? h = ((r - i) / l % 6 + 6) % 6 : s === r ? h = (i - n) / l + 2 : h = (n - r) / l + 4, new Xe(Math.round(h * 60), u, s, e.a);
  }
  static toRGBA(e) {
    const { h: n, s: r, v: i, a: s } = e, o = i * r, l = o * (1 - Math.abs(n / 60 % 2 - 1)), u = i - o;
    let [h, c, d] = [0, 0, 0];
    return n < 60 ? (h = o, c = l) : n < 120 ? (h = l, c = o) : n < 180 ? (c = o, d = l) : n < 240 ? (c = l, d = o) : n < 300 ? (h = l, d = o) : n <= 360 && (h = o, d = l), h = Math.round((h + u) * 255), c = Math.round((c + u) * 255), d = Math.round((d + u) * 255), new W(h, c, d, s);
  }
}
const te = class X {
  static fromHex(e) {
    return X.Format.CSS.parseHex(e) || X.red;
  }
  static equals(e, n) {
    return !e && !n ? !0 : !e || !n ? !1 : e.equals(n);
  }
  get hsla() {
    return this._hsla ? this._hsla : ge.fromRGBA(this.rgba);
  }
  get hsva() {
    return this._hsva ? this._hsva : Xe.fromRGBA(this.rgba);
  }
  constructor(e) {
    if (e)
      if (e instanceof W)
        this.rgba = e;
      else if (e instanceof ge)
        this._hsla = e, this.rgba = ge.toRGBA(e);
      else if (e instanceof Xe)
        this._hsva = e, this.rgba = Xe.toRGBA(e);
      else
        throw new Error("Invalid color ctor argument");
    else throw new Error("Color needs a value");
  }
  equals(e) {
    return !!e && W.equals(this.rgba, e.rgba) && ge.equals(this.hsla, e.hsla) && Xe.equals(this.hsva, e.hsva);
  }
  getRelativeLuminance() {
    const e = X._relativeLuminanceForComponent(this.rgba.r), n = X._relativeLuminanceForComponent(this.rgba.g), r = X._relativeLuminanceForComponent(this.rgba.b), i = 0.2126 * e + 0.7152 * n + 0.0722 * r;
    return Oe(i, 4);
  }
  reduceRelativeLuminace(e, n) {
    let { r, g: i, b: s } = e.rgba, o = this.getContrastRatio(e);
    for (; o < n && (r > 0 || i > 0 || s > 0); )
      r -= Math.max(0, Math.ceil(r * 0.1)), i -= Math.max(0, Math.ceil(i * 0.1)), s -= Math.max(0, Math.ceil(s * 0.1)), o = this.getContrastRatio(new X(new W(r, i, s)));
    return new X(new W(r, i, s));
  }
  increaseRelativeLuminace(e, n) {
    let { r, g: i, b: s } = e.rgba, o = this.getContrastRatio(e);
    for (; o < n && (r < 255 || i < 255 || s < 255); )
      r = Math.min(255, r + Math.ceil((255 - r) * 0.1)), i = Math.min(255, i + Math.ceil((255 - i) * 0.1)), s = Math.min(255, s + Math.ceil((255 - s) * 0.1)), o = this.getContrastRatio(new X(new W(r, i, s)));
    return new X(new W(r, i, s));
  }
  static _relativeLuminanceForComponent(e) {
    const n = e / 255;
    return n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
  }
  getContrastRatio(e) {
    const n = this.getRelativeLuminance(), r = e.getRelativeLuminance();
    return n > r ? (n + 0.05) / (r + 0.05) : (r + 0.05) / (n + 0.05);
  }
  isDarker() {
    return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 < 128;
  }
  isLighter() {
    return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 >= 128;
  }
  isLighterThan(e) {
    const n = this.getRelativeLuminance(), r = e.getRelativeLuminance();
    return n > r;
  }
  isDarkerThan(e) {
    const n = this.getRelativeLuminance(), r = e.getRelativeLuminance();
    return n < r;
  }
  ensureConstrast(e, n) {
    const r = this.getRelativeLuminance(), i = e.getRelativeLuminance();
    if (this.getContrastRatio(e) < n) {
      if (i < r) {
        const l = this.reduceRelativeLuminace(e, n), u = this.getContrastRatio(l);
        if (u < n) {
          const h = this.increaseRelativeLuminace(e, n), c = this.getContrastRatio(h);
          return u > c ? l : h;
        }
        return l;
      }
      const s = this.increaseRelativeLuminace(e, n), o = this.getContrastRatio(s);
      if (o < n) {
        const l = this.reduceRelativeLuminace(e, n), u = this.getContrastRatio(l);
        return o > u ? s : l;
      }
      return s;
    }
    return e;
  }
  lighten(e) {
    return new X(new ge(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * e, this.hsla.a));
  }
  darken(e) {
    return new X(new ge(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * e, this.hsla.a));
  }
  transparent(e) {
    const { r: n, g: r, b: i, a: s } = this.rgba;
    return new X(new W(n, r, i, s * e));
  }
  isTransparent() {
    return this.rgba.a === 0;
  }
  isOpaque() {
    return this.rgba.a === 1;
  }
  opposite() {
    return new X(new W(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
  }
  blend(e) {
    const n = e.rgba, r = this.rgba.a, i = n.a, s = r + i * (1 - r);
    if (s < 1e-6)
      return X.transparent;
    const o = this.rgba.r * r / s + n.r * i * (1 - r) / s, l = this.rgba.g * r / s + n.g * i * (1 - r) / s, u = this.rgba.b * r / s + n.b * i * (1 - r) / s;
    return new X(new W(o, l, u, s));
  }
  makeOpaque(e) {
    if (this.isOpaque() || e.rgba.a !== 1)
      return this;
    const { r: n, g: r, b: i, a: s } = this.rgba;
    return new X(new W(
      e.rgba.r - s * (e.rgba.r - n),
      e.rgba.g - s * (e.rgba.g - r),
      e.rgba.b - s * (e.rgba.b - i),
      1
    ));
  }
  flatten(...e) {
    const n = e.reduceRight((r, i) => X._flatten(i, r));
    return X._flatten(this, n);
  }
  static _flatten(e, n) {
    const r = 1 - e.rgba.a;
    return new X(new W(
      r * n.rgba.r + e.rgba.a * e.rgba.r,
      r * n.rgba.g + e.rgba.a * e.rgba.g,
      r * n.rgba.b + e.rgba.a * e.rgba.b
    ));
  }
  toString() {
    return this._toString || (this._toString = X.Format.CSS.format(this)), this._toString;
  }
  static getLighterColor(e, n, r) {
    if (e.isLighterThan(n))
      return e;
    r = r || 0.5;
    const i = e.getRelativeLuminance(), s = n.getRelativeLuminance();
    return r = r * (s - i) / s, e.lighten(r);
  }
  static getDarkerColor(e, n, r) {
    if (e.isDarkerThan(n))
      return e;
    r = r || 0.5;
    const i = e.getRelativeLuminance(), s = n.getRelativeLuminance();
    return r = r * (i - s) / i, e.darken(r);
  }
};
te.white = new te(new W(255, 255, 255, 1)), te.black = new te(new W(0, 0, 0, 1)), te.red = new te(new W(255, 0, 0, 1)), te.blue = new te(new W(0, 0, 255, 1)), te.green = new te(new W(0, 255, 0, 1)), te.cyan = new te(new W(0, 255, 255, 1)), te.lightgrey = new te(new W(211, 211, 211, 1)), te.transparent = new te(new W(0, 0, 0, 0));
let In = te;
(function(t) {
  (function(e) {
    (function(n) {
      function r(m) {
        return m.rgba.a === 1 ? `rgb(${m.rgba.r}, ${m.rgba.g}, ${m.rgba.b})` : t.Format.CSS.formatRGBA(m);
      }
      n.formatRGB = r;
      function i(m) {
        return `rgba(${m.rgba.r}, ${m.rgba.g}, ${m.rgba.b}, ${+m.rgba.a.toFixed(2)})`;
      }
      n.formatRGBA = i;
      function s(m) {
        return m.hsla.a === 1 ? `hsl(${m.hsla.h}, ${(m.hsla.s * 100).toFixed(2)}%, ${(m.hsla.l * 100).toFixed(2)}%)` : t.Format.CSS.formatHSLA(m);
      }
      n.formatHSL = s;
      function o(m) {
        return `hsla(${m.hsla.h}, ${(m.hsla.s * 100).toFixed(2)}%, ${(m.hsla.l * 100).toFixed(2)}%, ${m.hsla.a.toFixed(2)})`;
      }
      n.formatHSLA = o;
      function l(m) {
        const f = m.toString(16);
        return f.length !== 2 ? "0" + f : f;
      }
      function u(m) {
        return `#${l(m.rgba.r)}${l(m.rgba.g)}${l(m.rgba.b)}`;
      }
      n.formatHex = u;
      function h(m, f = !1) {
        return f && m.rgba.a === 1 ? t.Format.CSS.formatHex(m) : `#${l(m.rgba.r)}${l(m.rgba.g)}${l(m.rgba.b)}${l(Math.round(m.rgba.a * 255))}`;
      }
      n.formatHexA = h;
      function c(m) {
        return m.isOpaque() ? t.Format.CSS.formatHex(m) : t.Format.CSS.formatRGBA(m);
      }
      n.format = c;
      function d(m) {
        const f = m.length;
        if (f === 0 || m.charCodeAt(0) !== 35)
          return null;
        if (f === 7) {
          const p = 16 * g(m.charCodeAt(1)) + g(m.charCodeAt(2)), C = 16 * g(m.charCodeAt(3)) + g(m.charCodeAt(4)), v = 16 * g(m.charCodeAt(5)) + g(m.charCodeAt(6));
          return new t(new W(p, C, v, 1));
        }
        if (f === 9) {
          const p = 16 * g(m.charCodeAt(1)) + g(m.charCodeAt(2)), C = 16 * g(m.charCodeAt(3)) + g(m.charCodeAt(4)), v = 16 * g(m.charCodeAt(5)) + g(m.charCodeAt(6)), L = 16 * g(m.charCodeAt(7)) + g(m.charCodeAt(8));
          return new t(new W(p, C, v, L / 255));
        }
        if (f === 4) {
          const p = g(m.charCodeAt(1)), C = g(m.charCodeAt(2)), v = g(m.charCodeAt(3));
          return new t(new W(16 * p + p, 16 * C + C, 16 * v + v));
        }
        if (f === 5) {
          const p = g(m.charCodeAt(1)), C = g(m.charCodeAt(2)), v = g(m.charCodeAt(3)), L = g(m.charCodeAt(4));
          return new t(new W(16 * p + p, 16 * C + C, 16 * v + v, (16 * L + L) / 255));
        }
        return null;
      }
      n.parseHex = d;
      function g(m) {
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
    })(e.CSS || (e.CSS = {}));
  })(t.Format || (t.Format = {}));
})(In);
function Ns(t) {
  const e = [];
  for (const n of t) {
    const r = Number(n);
    (r || r === 0 && n.replace(/\s/g, "") !== "") && e.push(r);
  }
  return e;
}
function Fn(t, e, n, r) {
  return {
    red: t / 255,
    blue: n / 255,
    green: e / 255,
    alpha: r
  };
}
function rt(t, e) {
  const n = e.index, r = e[0].length;
  if (!n)
    return;
  const i = t.positionAt(n);
  return {
    startLineNumber: i.lineNumber,
    startColumn: i.column,
    endLineNumber: i.lineNumber,
    endColumn: i.column + r
  };
}
function Cl(t, e) {
  if (!t)
    return;
  const n = In.Format.CSS.parseHex(e);
  if (n)
    return {
      range: t,
      color: Fn(n.rgba.r, n.rgba.g, n.rgba.b, n.rgba.a)
    };
}
function Ai(t, e, n) {
  if (!t || e.length !== 1)
    return;
  const r = e[0].values(), i = Ns(r);
  return {
    range: t,
    color: Fn(i[0], i[1], i[2], n ? i[3] : 1)
  };
}
function Mi(t, e, n) {
  if (!t || e.length !== 1)
    return;
  const r = e[0].values(), i = Ns(r), s = new In(new ge(
    i[0],
    i[1] / 100,
    i[2] / 100,
    n ? i[3] : 1
  ));
  return {
    range: t,
    color: Fn(s.rgba.r, s.rgba.g, s.rgba.b, s.rgba.a)
  };
}
function it(t, e) {
  return typeof t == "string" ? [...t.matchAll(e)] : t.findMatches(e);
}
function vl(t) {
  const e = [], n = it(t, /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);
  if (n.length > 0)
    for (const r of n) {
      const i = r.filter((u) => u !== void 0), s = i[1], o = i[2];
      if (!o)
        continue;
      let l;
      if (s === "rgb") {
        const u = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
        l = Ai(rt(t, r), it(o, u), !1);
      } else if (s === "rgba") {
        const u = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        l = Ai(rt(t, r), it(o, u), !0);
      } else if (s === "hsl") {
        const u = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
        l = Mi(rt(t, r), it(o, u), !1);
      } else if (s === "hsla") {
        const u = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
        l = Mi(rt(t, r), it(o, u), !0);
      } else s === "#" && (l = Cl(rt(t, r), s + o));
      l && e.push(l);
    }
  return e;
}
function yl(t) {
  return !t || typeof t.getValue != "function" || typeof t.positionAt != "function" ? [] : vl(t);
}
const ki = new RegExp("\\bMARK:\\s*(.*)$", "d"), _l = /^-+|-+$/g;
function Nl(t, e) {
  var n;
  let r = [];
  if (e.findRegionSectionHeaders && (n = e.foldingRules) != null && n.markers) {
    const i = El(t, e);
    r = r.concat(i);
  }
  if (e.findMarkSectionHeaders) {
    const i = Sl(t);
    r = r.concat(i);
  }
  return r;
}
function El(t, e) {
  const n = [], r = t.getLineCount();
  for (let i = 1; i <= r; i++) {
    const s = t.getLineContent(i), o = s.match(e.foldingRules.markers.start);
    if (o) {
      const l = { startLineNumber: i, startColumn: o[0].length + 1, endLineNumber: i, endColumn: s.length + 1 };
      if (l.endColumn > l.startColumn) {
        const u = {
          range: l,
          ...Es(s.substring(o[0].length)),
          shouldBeInComments: !1
        };
        (u.text || u.hasSeparatorLine) && n.push(u);
      }
    }
  }
  return n;
}
function Sl(t) {
  const e = [], n = t.getLineCount();
  for (let r = 1; r <= n; r++) {
    const i = t.getLineContent(r);
    Rl(i, r, e);
  }
  return e;
}
function Rl(t, e, n) {
  ki.lastIndex = 0;
  const r = ki.exec(t);
  if (r) {
    const i = r.indices[1][0] + 1, s = r.indices[1][1] + 1, o = { startLineNumber: e, startColumn: i, endLineNumber: e, endColumn: s };
    if (o.endColumn > o.startColumn) {
      const l = {
        range: o,
        ...Es(r[1]),
        shouldBeInComments: !0
      };
      (l.text || l.hasSeparatorLine) && n.push(l);
    }
  }
}
function Es(t) {
  t = t.trim();
  const e = t.startsWith("-");
  return t = t.replace(_l, ""), { text: t, hasSeparatorLine: e };
}
function Ae(t) {
  return t === 47 || t === 92;
}
function Ss(t) {
  return t.replace(/[\\/]/g, U.sep);
}
function xl(t) {
  return t.indexOf("/") === -1 && (t = Ss(t)), /^[a-zA-Z]:(\/|$)/.test(t) && (t = "/" + t), t;
}
function Ti(t, e = U.sep) {
  if (!t)
    return "";
  const n = t.length, r = t.charCodeAt(0);
  if (Ae(r)) {
    if (Ae(t.charCodeAt(1)) && !Ae(t.charCodeAt(2))) {
      let s = 3;
      const o = s;
      for (; s < n && !Ae(t.charCodeAt(s)); s++)
        ;
      if (o !== s && !Ae(t.charCodeAt(s + 1))) {
        for (s += 1; s < n; s++)
          if (Ae(t.charCodeAt(s)))
            return t.slice(0, s + 1).replace(/[\\/]/g, e);
      }
    }
    return e;
  } else if (Al(r) && t.charCodeAt(1) === 58)
    return Ae(t.charCodeAt(2)) ? t.slice(0, 2) + e : t.slice(0, 2);
  let i = t.indexOf("://");
  if (i !== -1) {
    for (i += 3; i < n; i++)
      if (Ae(t.charCodeAt(i)))
        return t.slice(0, i + 1);
  }
  return "";
}
function Pi(t, e, n, r = Et) {
  if (t === e)
    return !0;
  if (!t || !e || e.length > t.length)
    return !1;
  if (n) {
    if (!Mo(t, e))
      return !1;
    if (e.length === t.length)
      return !0;
    let i = e.length;
    return e.charAt(e.length - 1) === r && i--, t.charAt(i) === r;
  }
  return e.charAt(e.length - 1) !== r && (e += r), t.indexOf(e) === 0;
}
function Al(t) {
  return t >= 65 && t <= 90 || t >= 97 && t <= 122;
}
var ne;
(function(t) {
  t.inMemory = "inmemory", t.vscode = "vscode", t.internal = "private", t.walkThrough = "walkThrough", t.walkThroughSnippet = "walkThroughSnippet", t.http = "http", t.https = "https", t.file = "file", t.mailto = "mailto", t.untitled = "untitled", t.data = "data", t.command = "command", t.vscodeRemote = "vscode-remote", t.vscodeRemoteResource = "vscode-remote-resource", t.vscodeManagedRemoteResource = "vscode-managed-remote-resource", t.vscodeUserData = "vscode-userdata", t.vscodeCustomEditor = "vscode-custom-editor", t.vscodeNotebookCell = "vscode-notebook-cell", t.vscodeNotebookCellMetadata = "vscode-notebook-cell-metadata", t.vscodeNotebookCellMetadataDiff = "vscode-notebook-cell-metadata-diff", t.vscodeNotebookCellOutput = "vscode-notebook-cell-output", t.vscodeNotebookCellOutputDiff = "vscode-notebook-cell-output-diff", t.vscodeNotebookMetadata = "vscode-notebook-metadata", t.vscodeInteractiveInput = "vscode-interactive-input", t.vscodeSettings = "vscode-settings", t.vscodeWorkspaceTrust = "vscode-workspace-trust", t.vscodeTerminal = "vscode-terminal", t.vscodeChatCodeBlock = "vscode-chat-code-block", t.vscodeChatCodeCompareBlock = "vscode-chat-code-compare-block", t.vscodeChatSesssion = "vscode-chat-editor", t.webviewPanel = "webview-panel", t.vscodeWebview = "vscode-webview", t.extension = "extension", t.vscodeFileResource = "vscode-file", t.tmp = "tmp", t.vsls = "vsls", t.vscodeSourceControl = "vscode-scm", t.commentsInput = "comment", t.codeSetting = "code-setting", t.outputChannel = "output", t.accessibleView = "accessible-view";
})(ne || (ne = {}));
const Ml = "tkn";
class kl {
  constructor() {
    this._hosts = /* @__PURE__ */ Object.create(null), this._ports = /* @__PURE__ */ Object.create(null), this._connectionTokens = /* @__PURE__ */ Object.create(null), this._preferredWebSchema = "http", this._delegate = null, this._serverRootPath = "/";
  }
  setPreferredWebSchema(e) {
    this._preferredWebSchema = e;
  }
  setDelegate(e) {
    this._delegate = e;
  }
  setServerRootPath(e, n) {
    this._serverRootPath = Pl(e, n);
  }
  getServerRootPath() {
    return this._serverRootPath;
  }
  get _remoteResourcesPath() {
    return U.join(this._serverRootPath, ne.vscodeRemoteResource);
  }
  set(e, n, r) {
    this._hosts[e] = n, this._ports[e] = r;
  }
  setConnectionToken(e, n) {
    this._connectionTokens[e] = n;
  }
  getPreferredWebSchema() {
    return this._preferredWebSchema;
  }
  rewrite(e) {
    if (this._delegate)
      try {
        return this._delegate(e);
      } catch (l) {
        return ht(l), e;
      }
    const n = e.authority;
    let r = this._hosts[n];
    r && r.indexOf(":") !== -1 && r.indexOf("[") === -1 && (r = `[${r}]`);
    const i = this._ports[n], s = this._connectionTokens[n];
    let o = `path=${encodeURIComponent(e.path)}`;
    return typeof s == "string" && (o += `&${Ml}=${encodeURIComponent(s)}`), ee.from({
      scheme: po ? this._preferredWebSchema : ne.vscodeRemoteResource,
      authority: `${r}:${i}`,
      path: this._remoteResourcesPath,
      query: o
    });
  }
}
const Tl = new kl();
function Pl(t, e) {
  return U.join(e ?? "/", `${t.quality ?? "oss"}-${t.commit ?? "dev"}`);
}
const Ol = "vscode-app", Rs = class Rt {
  constructor() {
    this.staticBrowserUris = new zs(), this.appResourcePathUrls = /* @__PURE__ */ new Map();
  }
  registerAppResourcePathUrl(e, n) {
    this.appResourcePathUrls.set(e, n);
  }
  toUrl(e) {
    var n;
    let r = this.appResourcePathUrls.get(e);
    return typeof r == "function" && (r = r()), new URL(r ?? e, ((n = globalThis.location) == null ? void 0 : n.href) ?? import.meta.url).toString();
  }
  asBrowserUri(e) {
    const n = this.toUri(e, { toUrl: this.toUrl.bind(this) });
    return this.uriToBrowserUri(n);
  }
  uriToBrowserUri(e) {
    return e.scheme === ne.vscodeRemote ? Tl.rewrite(e) : e.scheme === ne.file && (fo || wo === `${ne.vscodeFileResource}://${Rt.FALLBACK_AUTHORITY}`) ? e.with({
      scheme: ne.vscodeFileResource,
      authority: e.authority || Rt.FALLBACK_AUTHORITY,
      query: null,
      fragment: null
    }) : this.staticBrowserUris.get(e) ?? e;
  }
  asFileUri(e) {
    const n = this.toUri(e, { toUrl: this.toUrl.bind(this) });
    return this.uriToFileUri(n);
  }
  uriToFileUri(e) {
    return e.scheme === ne.vscodeFileResource ? e.with({
      scheme: ne.file,
      authority: e.authority !== Rt.FALLBACK_AUTHORITY ? e.authority : null,
      query: null,
      fragment: null
    }) : e;
  }
  toUri(e, n) {
    if (ee.isUri(e))
      return e;
    if (globalThis._VSCODE_FILE_ROOT) {
      const r = globalThis._VSCODE_FILE_ROOT;
      if (/^\w[\w\d+.-]*:\/\//.test(r))
        return ee.joinPath(ee.parse(r, !0), e);
      const i = ga(r, e);
      return ee.file(i);
    }
    return ee.parse(n.toUrl(e));
  }
  registerStaticBrowserUri(e, n) {
    return this.staticBrowserUris.set(e, n), mt(() => {
      this.staticBrowserUris.get(e) === n && this.staticBrowserUris.delete(e);
    });
  }
  getRegisteredBrowserUris() {
    return this.staticBrowserUris.keys();
  }
};
Rs.FALLBACK_AUTHORITY = Ol;
let Il = Rs;
new Il();
var Oi;
(function(t) {
  const e = /* @__PURE__ */ new Map([
    ["1", { "Cross-Origin-Opener-Policy": "same-origin" }],
    ["2", { "Cross-Origin-Embedder-Policy": "require-corp" }],
    ["3", { "Cross-Origin-Opener-Policy": "same-origin", "Cross-Origin-Embedder-Policy": "require-corp" }]
  ]);
  t.CoopAndCoep = Object.freeze(e.get("3"));
  const n = "vscode-coi";
  function r(s) {
    let o;
    typeof s == "string" ? o = new URL(s).searchParams : s instanceof URL ? o = s.searchParams : ee.isUri(s) && (o = new URL(s.toString(!0)).searchParams);
    const l = o == null ? void 0 : o.get(n);
    if (l)
      return e.get(l);
  }
  t.getHeadersFromQuery = r;
  function i(s, o, l) {
    if (!globalThis.crossOriginIsolated)
      return;
    const u = o && l ? "3" : l ? "2" : "1";
    s instanceof URLSearchParams ? s.set(n, u) : s[n] = u;
  }
  t.addSearchParam = i;
})(Oi || (Oi = {}));
function ye(t) {
  return It(t, !0);
}
class Fl {
  constructor(e) {
    this._ignorePathCasing = e;
  }
  compare(e, n, r = !1) {
    return e === n ? 0 : Ro(this.getComparisonKey(e, r), this.getComparisonKey(n, r));
  }
  isEqual(e, n, r = !1) {
    return e === n ? !0 : !e || !n ? !1 : this.getComparisonKey(e, r) === this.getComparisonKey(n, r);
  }
  getComparisonKey(e, n = !1) {
    return e.with({
      path: this._ignorePathCasing(e) ? e.path.toLowerCase() : void 0,
      fragment: n ? null : void 0
    }).toString();
  }
  ignorePathCasing(e) {
    return this._ignorePathCasing(e);
  }
  isEqualOrParent(e, n, r = !1) {
    if (e.scheme === n.scheme) {
      if (e.scheme === ne.file)
        return Pi(ye(e), ye(n), this._ignorePathCasing(e)) && e.query === n.query && (r || e.fragment === n.fragment);
      if (Ii(e.authority, n.authority))
        return Pi(e.path, n.path, this._ignorePathCasing(e), "/") && e.query === n.query && (r || e.fragment === n.fragment);
    }
    return !1;
  }
  joinPath(e, ...n) {
    return ee.joinPath(e, ...n);
  }
  basenameOrAuthority(e) {
    return Dl(e) || e.authority;
  }
  basename(e) {
    return U.basename(e.path);
  }
  extname(e) {
    return U.extname(e.path);
  }
  dirname(e) {
    if (e.path.length === 0)
      return e;
    let n;
    return e.scheme === ne.file ? n = ee.file(pa(ye(e))).path : (n = U.dirname(e.path), e.authority && n.length && n.charCodeAt(0) !== 47 && (console.error(`dirname("${e.toString})) resulted in a relative path`), n = "/")), e.with({
      path: n
    });
  }
  normalizePath(e) {
    if (!e.path.length)
      return e;
    let n;
    return e.scheme === ne.file ? n = ee.file(da(ye(e))).path : n = U.normalize(e.path), e.with({
      path: n
    });
  }
  relativePath(e, n) {
    if (e.scheme !== n.scheme || !Ii(e.authority, n.authority))
      return;
    if (e.scheme === ne.file) {
      const s = fa(ye(e), ye(n));
      return et ? Ss(s) : s;
    }
    let r = e.path || "/";
    const i = n.path || "/";
    if (this._ignorePathCasing(e)) {
      let s = 0;
      for (const o = Math.min(r.length, i.length); s < o && !(r.charCodeAt(s) !== i.charCodeAt(s) && r.charAt(s).toLowerCase() !== i.charAt(s).toLowerCase()); s++)
        ;
      r = i.substr(0, s) + r.substr(s);
    }
    return U.relative(r, i);
  }
  resolvePath(e, n) {
    if (e.scheme === ne.file) {
      const r = ee.file(ma(ye(e), n));
      return e.with({
        authority: r.authority,
        path: r.path
      });
    }
    return n = xl(n), e.with({
      path: U.resolve(e.path, n)
    });
  }
  isAbsolutePath(e) {
    return !!e.path && e.path[0] === "/";
  }
  isEqualAuthority(e, n) {
    return e === n || e !== void 0 && n !== void 0 && Ao(e, n);
  }
  hasTrailingPathSeparator(e, n = Et) {
    if (e.scheme === ne.file) {
      const r = ye(e);
      return r.length > Ti(r).length && r[r.length - 1] === n;
    } else {
      const r = e.path;
      return r.length > 1 && r.charCodeAt(r.length - 1) === 47 && !/^[a-zA-Z]:(\/$|\\$)/.test(e.fsPath);
    }
  }
  removeTrailingPathSeparator(e, n = Et) {
    return Fi(e, n) ? e.with({ path: e.path.substr(0, e.path.length - 1) }) : e;
  }
  addTrailingPathSeparator(e, n = Et) {
    let r = !1;
    if (e.scheme === ne.file) {
      const i = ye(e);
      r = i !== void 0 && i.length === Ti(i).length && i[i.length - 1] === n;
    } else {
      n = "/";
      const i = e.path;
      r = i.length === 1 && i.charCodeAt(i.length - 1) === 47;
    }
    return !r && !Fi(e, n) ? e.with({ path: e.path + "/" }) : e;
  }
}
const V = new Fl(() => !1);
V.isEqual.bind(V);
V.isEqualOrParent.bind(V);
V.getComparisonKey.bind(V);
V.basenameOrAuthority.bind(V);
const Dl = V.basename.bind(V);
V.extname.bind(V);
V.dirname.bind(V);
V.joinPath.bind(V);
V.normalizePath.bind(V);
V.relativePath.bind(V);
V.resolvePath.bind(V);
V.isAbsolutePath.bind(V);
const Ii = V.isEqualAuthority.bind(V), Fi = V.hasTrailingPathSeparator.bind(V);
V.removeTrailingPathSeparator.bind(V);
V.addTrailingPathSeparator.bind(V);
var Di;
(function(t) {
  t.META_DATA_LABEL = "label", t.META_DATA_DESCRIPTION = "description", t.META_DATA_SIZE = "size", t.META_DATA_MIME = "mime";
  function e(n) {
    const r = /* @__PURE__ */ new Map();
    n.path.substring(n.path.indexOf(";") + 1, n.path.lastIndexOf(";")).split(";").forEach((s) => {
      const [o, l] = s.split(":");
      o && l && r.set(o, l);
    });
    const i = n.path.substring(0, n.path.indexOf(";"));
    return i && r.set(t.META_DATA_MIME, i), r;
  }
  t.parseMetaData = e;
})(Di || (Di = {}));
var qi;
(function(t) {
  async function e(r) {
    let i;
    const s = await Promise.all(r.map((o) => o.then((l) => l, (l) => {
      i || (i = l);
    })));
    if (typeof i < "u")
      throw i;
    return s;
  }
  t.settled = e;
  function n(r) {
    return new Promise(async (i, s) => {
      try {
        await r(i, s);
      } catch (o) {
        s(o);
      }
    });
  }
  t.withAsyncBody = n;
})(qi || (qi = {}));
const Ki = class ce {
  static fromArray(e) {
    return new ce((n) => {
      n.emitMany(e);
    });
  }
  static fromPromise(e) {
    return new ce(async (n) => {
      n.emitMany(await e);
    });
  }
  static fromPromisesResolveOrder(e) {
    return new ce(async (n) => {
      await Promise.all(e.map(async (r) => n.emitOne(await r)));
    });
  }
  static merge(e) {
    return new ce(async (n) => {
      await Promise.all(e.map(async (r) => {
        for await (const i of r)
          n.emitOne(i);
      }));
    });
  }
  constructor(e, n) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = n, this._onStateChanged = new de(), queueMicrotask(async () => {
      const r = {
        emitOne: (i) => this.emitOne(i),
        emitMany: (i) => this.emitMany(i),
        reject: (i) => this.reject(i)
      };
      try {
        await Promise.resolve(e(r)), this.resolve();
      } catch (i) {
        this.reject(i);
      } finally {
        r.emitOne = void 0, r.emitMany = void 0, r.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let e = 0;
    return {
      next: async () => {
        do {
          if (this._state === 2)
            throw this._error;
          if (e < this._results.length)
            return { done: !1, value: this._results[e++] };
          if (this._state === 1)
            return { done: !0, value: void 0 };
          await Mt.toPromise(this._onStateChanged.event);
        } while (!0);
      },
      return: async () => {
        var n;
        return (n = this._onReturn) == null || n.call(this), { done: !0, value: void 0 };
      }
    };
  }
  static map(e, n) {
    return new ce(async (r) => {
      for await (const i of e)
        r.emitOne(n(i));
    });
  }
  map(e) {
    return ce.map(this, e);
  }
  static filter(e, n) {
    return new ce(async (r) => {
      for await (const i of e)
        n(i) && r.emitOne(i);
    });
  }
  filter(e) {
    return ce.filter(this, e);
  }
  static coalesce(e) {
    return ce.filter(e, (n) => !!n);
  }
  coalesce() {
    return ce.coalesce(this);
  }
  static async toPromise(e) {
    const n = [];
    for await (const r of e)
      n.push(r);
    return n;
  }
  toPromise() {
    return ce.toPromise(this);
  }
  emitOne(e) {
    this._state === 0 && (this._results.push(e), this._onStateChanged.fire());
  }
  emitMany(e) {
    this._state === 0 && (this._results = this._results.concat(e), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(e) {
    this._state === 0 && (this._state = 2, this._error = e, this._onStateChanged.fire());
  }
};
Ki.EMPTY = Ki.fromArray([]);
class ql {
  constructor(e) {
    this.values = e, this.prefixSum = new Uint32Array(e.length), this.prefixSumValidIndex = new Int32Array(1), this.prefixSumValidIndex[0] = -1;
  }
  getCount() {
    return this.values.length;
  }
  insertValues(e, n) {
    e = ze(e);
    const r = this.values, i = this.prefixSum, s = n.length;
    return s === 0 ? !1 : (this.values = new Uint32Array(r.length + s), this.values.set(r.subarray(0, e), 0), this.values.set(r.subarray(e), e + s), this.values.set(n, e), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSum = new Uint32Array(this.values.length), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  setValue(e, n) {
    return e = ze(e), n = ze(n), this.values[e] === n ? !1 : (this.values[e] = n, e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), !0);
  }
  removeValues(e, n) {
    e = ze(e), n = ze(n);
    const r = this.values, i = this.prefixSum;
    if (e >= r.length)
      return !1;
    const s = r.length - e;
    return n >= s && (n = s), n === 0 ? !1 : (this.values = new Uint32Array(r.length - n), this.values.set(r.subarray(0, e), 0), this.values.set(r.subarray(e + n), e), this.prefixSum = new Uint32Array(this.values.length), e - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = e - 1), this.prefixSumValidIndex[0] >= 0 && this.prefixSum.set(i.subarray(0, this.prefixSumValidIndex[0] + 1)), !0);
  }
  getTotalSum() {
    return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
  }
  getPrefixSum(e) {
    return e < 0 ? 0 : (e = ze(e), this._getPrefixSum(e));
  }
  _getPrefixSum(e) {
    if (e <= this.prefixSumValidIndex[0])
      return this.prefixSum[e];
    let n = this.prefixSumValidIndex[0] + 1;
    n === 0 && (this.prefixSum[0] = this.values[0], n++), e >= this.values.length && (e = this.values.length - 1);
    for (let r = n; r <= e; r++)
      this.prefixSum[r] = this.prefixSum[r - 1] + this.values[r];
    return this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], e), this.prefixSum[e];
  }
  getIndexOf(e) {
    e = Math.floor(e), this.getTotalSum();
    let n = 0, r = this.values.length - 1, i = 0, s = 0, o = 0;
    for (; n <= r; )
      if (i = n + (r - n) / 2 | 0, s = this.prefixSum[i], o = s - this.values[i], e < o)
        r = i - 1;
      else if (e >= s)
        n = i + 1;
      else
        break;
    return new Kl(i, e - o);
  }
}
class Kl {
  constructor(e, n) {
    this.index = e, this.remainder = n, this._prefixSumIndexOfResultBrand = void 0, this.index = e, this.remainder = n;
  }
}
class Vl {
  constructor(e, n, r, i) {
    this._uri = e, this._lines = n, this._eol = r, this._versionId = i, this._lineStarts = null, this._cachedTextValue = null;
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
  onEvents(e) {
    e.eol && e.eol !== this._eol && (this._eol = e.eol, this._lineStarts = null);
    const n = e.changes;
    for (const r of n)
      this._acceptDeleteRange(r.range), this._acceptInsertText(new F(r.range.startLineNumber, r.range.startColumn), r.text);
    this._versionId = e.versionId, this._cachedTextValue = null;
  }
  _ensureLineStarts() {
    if (!this._lineStarts) {
      const e = this._eol.length, n = this._lines.length, r = new Uint32Array(n);
      for (let i = 0; i < n; i++)
        r[i] = this._lines[i].length + e;
      this._lineStarts = new ql(r);
    }
  }
  _setLineText(e, n) {
    this._lines[e] = n, this._lineStarts && this._lineStarts.setValue(e, this._lines[e].length + this._eol.length);
  }
  _acceptDeleteRange(e) {
    if (e.startLineNumber === e.endLineNumber) {
      if (e.startColumn === e.endColumn)
        return;
      this._setLineText(e.startLineNumber - 1, this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.startLineNumber - 1].substring(e.endColumn - 1));
      return;
    }
    this._setLineText(e.startLineNumber - 1, this._lines[e.startLineNumber - 1].substring(0, e.startColumn - 1) + this._lines[e.endLineNumber - 1].substring(e.endColumn - 1)), this._lines.splice(e.startLineNumber, e.endLineNumber - e.startLineNumber), this._lineStarts && this._lineStarts.removeValues(e.startLineNumber, e.endLineNumber - e.startLineNumber);
  }
  _acceptInsertText(e, n) {
    if (n.length === 0)
      return;
    const r = An(n);
    if (r.length === 1) {
      this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + r[0] + this._lines[e.lineNumber - 1].substring(e.column - 1));
      return;
    }
    r[r.length - 1] += this._lines[e.lineNumber - 1].substring(e.column - 1), this._setLineText(e.lineNumber - 1, this._lines[e.lineNumber - 1].substring(0, e.column - 1) + r[0]);
    const i = new Uint32Array(r.length - 1);
    for (let s = 1; s < r.length; s++)
      this._lines.splice(e.lineNumber + s - 1, 0, r[s]), i[s - 1] = r[s].length + this._eol.length;
    this._lineStarts && this._lineStarts.insertValues(e.lineNumber, i);
  }
}
const Bl = "workerTextModelSync";
class Ul {
  constructor() {
    this._models = /* @__PURE__ */ Object.create(null);
  }
  bindToServer(e) {
    e.setChannel(Bl, this);
  }
  getModel(e) {
    return this._models[e];
  }
  getModels() {
    const e = [];
    return Object.keys(this._models).forEach((n) => e.push(this._models[n])), e;
  }
  $acceptNewModel(e) {
    this._models[e.url] = new $l(ee.parse(e.url), e.lines, e.EOL, e.versionId);
  }
  $acceptModelChanged(e, n) {
    this._models[e] && this._models[e].onEvents(n);
  }
  $acceptRemovedModel(e) {
    this._models[e] && delete this._models[e];
  }
}
class $l extends Vl {
  get uri() {
    return this._uri;
  }
  get eol() {
    return this._eol;
  }
  getValue() {
    return this.getText();
  }
  findMatches(e) {
    const n = [];
    for (let r = 0; r < this._lines.length; r++) {
      const i = this._lines[r], s = this.offsetAt(new F(r + 1, 1)), o = i.matchAll(e);
      for (const l of o)
        (l.index || l.index === 0) && (l.index = l.index + s), n.push(l);
    }
    return n;
  }
  getLinesContent() {
    return this._lines.slice(0);
  }
  getLineCount() {
    return this._lines.length;
  }
  getLineContent(e) {
    return this._lines[e - 1];
  }
  getWordAtPosition(e, n) {
    const r = Tn(e.column, ms(n), this._lines[e.lineNumber - 1], 0);
    return r ? new E(
      e.lineNumber,
      r.startColumn,
      e.lineNumber,
      r.endColumn
    ) : null;
  }
  getWordUntilPosition(e, n) {
    const r = this.getWordAtPosition(e, n);
    return r ? {
      word: this._lines[e.lineNumber - 1].substring(r.startColumn - 1, e.column - 1),
      startColumn: r.startColumn,
      endColumn: e.column
    } : {
      word: "",
      startColumn: e.column,
      endColumn: e.column
    };
  }
  words(e) {
    const n = this._lines, r = this._wordenize.bind(this);
    let i = 0, s = "", o = 0, l = [];
    return {
      *[Symbol.iterator]() {
        for (; ; )
          if (o < l.length) {
            const u = s.substring(l[o].start, l[o].end);
            o += 1, yield u;
          } else if (i < n.length)
            s = n[i], l = r(s, e), o = 0, i += 1;
          else
            break;
      }
    };
  }
  getLineWords(e, n) {
    const r = this._lines[e - 1], i = this._wordenize(r, n), s = [];
    for (const o of i)
      s.push({
        word: r.substring(o.start, o.end),
        startColumn: o.start + 1,
        endColumn: o.end + 1
      });
    return s;
  }
  _wordenize(e, n) {
    const r = [];
    let i;
    for (n.lastIndex = 0; (i = n.exec(e)) && i[0].length !== 0; )
      r.push({ start: i.index, end: i.index + i[0].length });
    return r;
  }
  getValueInRange(e) {
    if (e = this._validateRange(e), e.startLineNumber === e.endLineNumber)
      return this._lines[e.startLineNumber - 1].substring(e.startColumn - 1, e.endColumn - 1);
    const n = this._eol, r = e.startLineNumber - 1, i = e.endLineNumber - 1, s = [];
    s.push(this._lines[r].substring(e.startColumn - 1));
    for (let o = r + 1; o < i; o++)
      s.push(this._lines[o]);
    return s.push(this._lines[i].substring(0, e.endColumn - 1)), s.join(n);
  }
  offsetAt(e) {
    return e = this._validatePosition(e), this._ensureLineStarts(), this._lineStarts.getPrefixSum(e.lineNumber - 2) + (e.column - 1);
  }
  positionAt(e) {
    e = Math.floor(e), e = Math.max(0, e), this._ensureLineStarts();
    const n = this._lineStarts.getIndexOf(e), r = this._lines[n.index].length;
    return {
      lineNumber: 1 + n.index,
      column: 1 + Math.min(n.remainder, r)
    };
  }
  _validateRange(e) {
    const n = this._validatePosition({ lineNumber: e.startLineNumber, column: e.startColumn }), r = this._validatePosition({ lineNumber: e.endLineNumber, column: e.endColumn });
    return n.lineNumber !== e.startLineNumber || n.column !== e.startColumn || r.lineNumber !== e.endLineNumber || r.column !== e.endColumn ? {
      startLineNumber: n.lineNumber,
      startColumn: n.column,
      endLineNumber: r.lineNumber,
      endColumn: r.column
    } : e;
  }
  _validatePosition(e) {
    if (!F.isIPosition(e))
      throw new Error("bad position");
    let { lineNumber: n, column: r } = e, i = !1;
    if (n < 1)
      n = 1, r = 1, i = !0;
    else if (n > this._lines.length)
      n = this._lines.length, r = this._lines[n - 1].length + 1, i = !0;
    else {
      const s = this._lines[n - 1].length + 1;
      r < 1 ? (r = 1, i = !0) : r > s && (r = s, i = !0);
    }
    return i ? { lineNumber: n, column: r } : e;
  }
}
const Nn = class {
  constructor() {
    this._workerTextModelSyncServer = new Ul();
  }
  dispose() {
  }
  _getModel(e) {
    return this._workerTextModelSyncServer.getModel(e);
  }
  _getModels() {
    return this._workerTextModelSyncServer.getModels();
  }
  $acceptNewModel(e) {
    this._workerTextModelSyncServer.$acceptNewModel(e);
  }
  $acceptModelChanged(e, n) {
    this._workerTextModelSyncServer.$acceptModelChanged(e, n);
  }
  $acceptRemovedModel(e) {
    this._workerTextModelSyncServer.$acceptRemovedModel(e);
  }
  async $computeUnicodeHighlights(e, n, r) {
    const i = this._getModel(e);
    return i ? za.computeUnicodeHighlights(i, n, r) : { ranges: [], hasMore: !1, ambiguousCharacterCount: 0, invisibleCharacterCount: 0, nonBasicAsciiCharacterCount: 0 };
  }
  async $findSectionHeaders(e, n) {
    const r = this._getModel(e);
    return r ? Nl(r, n) : [];
  }
  async $computeDiff(e, n, r, i) {
    const s = this._getModel(e), o = this._getModel(n);
    return !s || !o ? null : ut.computeDiff(s, o, r, i);
  }
  static computeDiff(e, n, r, i) {
    const s = i === "advanced" ? jt.getDefault() : jt.getLegacy(), o = e.getLinesContent(), l = n.getLinesContent(), u = s.computeDiff(o, l, r), h = u.changes.length > 0 ? !1 : this._modelsAreIdentical(e, n);
    function c(d) {
      return d.map(
        (g) => {
          var m;
          return [g.original.startLineNumber, g.original.endLineNumberExclusive, g.modified.startLineNumber, g.modified.endLineNumberExclusive, (m = g.innerChanges) == null ? void 0 : m.map((f) => [
            f.originalRange.startLineNumber,
            f.originalRange.startColumn,
            f.originalRange.endLineNumber,
            f.originalRange.endColumn,
            f.modifiedRange.startLineNumber,
            f.modifiedRange.startColumn,
            f.modifiedRange.endLineNumber,
            f.modifiedRange.endColumn
          ])];
        }
      );
    }
    return {
      identical: h,
      quitEarly: u.hitTimeout,
      changes: c(u.changes),
      moves: u.moves.map((d) => [
        d.lineRangeMapping.original.startLineNumber,
        d.lineRangeMapping.original.endLineNumberExclusive,
        d.lineRangeMapping.modified.startLineNumber,
        d.lineRangeMapping.modified.endLineNumberExclusive,
        c(d.changes)
      ])
    };
  }
  static _modelsAreIdentical(e, n) {
    const r = e.getLineCount(), i = n.getLineCount();
    if (r !== i)
      return !1;
    for (let s = 1; s <= r; s++) {
      const o = e.getLineContent(s), l = n.getLineContent(s);
      if (o !== l)
        return !1;
    }
    return !0;
  }
  async $computeDirtyDiff(e, n, r) {
    const i = this._getModel(e), s = this._getModel(n);
    if (!i || !s)
      return null;
    const o = i.getLinesContent(), l = s.getLinesContent();
    return new Cs(o, l, {
      shouldComputeCharChanges: !1,
      shouldPostProcessCharChanges: !1,
      shouldIgnoreTrimWhitespace: r,
      shouldMakePrettyDiff: !0,
      maxComputationTime: 1e3
    }).computeDiff().changes;
  }
  async $computeMoreMinimalEdits(e, n, r) {
    const i = this._getModel(e);
    if (!i)
      return n;
    const s = [];
    let o;
    n = n.slice(0).sort((u, h) => {
      if (u.range && h.range)
        return E.compareRangesUsingStarts(u.range, h.range);
      const c = u.range ? 0 : 1, d = h.range ? 0 : 1;
      return c - d;
    });
    let l = 0;
    for (let u = 1; u < n.length; u++)
      E.getEndPosition(n[l].range).equals(E.getStartPosition(n[u].range)) ? (n[l].range = E.fromPositions(E.getStartPosition(n[l].range), E.getEndPosition(n[u].range)), n[l].text += n[u].text) : (l++, n[l] = n[u]);
    n.length = l + 1;
    for (let { range: u, text: h, eol: c } of n) {
      if (typeof c == "number" && (o = c), E.isEmpty(u) && !h)
        continue;
      const d = i.getValueInRange(u);
      if (h = h.replace(/\r\n|\n|\r/g, i.eol), d === h)
        continue;
      if (Math.max(h.length, d.length) > ut._diffLimit) {
        s.push({ range: u, text: h });
        continue;
      }
      const g = Wo(d, h, r), m = i.offsetAt(E.lift(u).getStartPosition());
      for (const f of g) {
        const p = i.positionAt(m + f.originalStart), C = i.positionAt(m + f.originalStart + f.originalLength), v = {
          text: h.substr(f.modifiedStart, f.modifiedLength),
          range: { startLineNumber: p.lineNumber, startColumn: p.column, endLineNumber: C.lineNumber, endColumn: C.column }
        };
        i.getValueInRange(v.range) !== v.text && s.push(v);
      }
    }
    return typeof o == "number" && s.push({ eol: o, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), s;
  }
  $computeHumanReadableDiff(e, n, r) {
    const i = this._getModel(e);
    if (!i)
      return n;
    const s = [];
    let o;
    n = n.slice(0).sort((l, u) => {
      if (l.range && u.range)
        return E.compareRangesUsingStarts(l.range, u.range);
      const h = l.range ? 0 : 1, c = u.range ? 0 : 1;
      return h - c;
    });
    for (let { range: l, text: u, eol: h } of n) {
      let c = function(v, L) {
        return new F(
          v.lineNumber + L.lineNumber - 1,
          L.lineNumber === 1 ? v.column + L.column - 1 : L.column
        );
      }, d = function(v, L) {
        const _ = [];
        for (let b = L.startLineNumber; b <= L.endLineNumber; b++) {
          const w = v[b - 1];
          b === L.startLineNumber && b === L.endLineNumber ? _.push(w.substring(L.startColumn - 1, L.endColumn - 1)) : b === L.startLineNumber ? _.push(w.substring(L.startColumn - 1)) : b === L.endLineNumber ? _.push(w.substring(0, L.endColumn - 1)) : _.push(w);
        }
        return _;
      };
      if (typeof h == "number" && (o = h), E.isEmpty(l) && !u)
        continue;
      const g = i.getValueInRange(l);
      if (u = u.replace(/\r\n|\n|\r/g, i.eol), g === u)
        continue;
      if (Math.max(u.length, g.length) > ut._diffLimit) {
        s.push({ range: l, text: u });
        continue;
      }
      const m = g.split(/\r\n|\n|\r/), f = u.split(/\r\n|\n|\r/), p = jt.getDefault().computeDiff(m, f, r), C = E.lift(l).getStartPosition();
      for (const v of p.changes)
        if (v.innerChanges)
          for (const L of v.innerChanges)
            s.push({
              range: E.fromPositions(c(C, L.originalRange.getStartPosition()), c(C, L.originalRange.getEndPosition())),
              text: d(f, L.modifiedRange).join(i.eol)
            });
        else
          throw new J("The experimental diff algorithm always produces inner changes");
    }
    return typeof o == "number" && s.push({ eol: o, text: "", range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } }), s;
  }
  async $computeLinks(e) {
    const n = this._getModel(e);
    return n ? Jo(n) : null;
  }
  async $computeDefaultDocumentColors(e) {
    const n = this._getModel(e);
    return n ? yl(n) : null;
  }
  async $textualSuggest(e, n, r, i) {
    const s = new Dt(), o = new RegExp(r, i), l = /* @__PURE__ */ new Set();
    e: for (const u of e) {
      const h = this._getModel(u);
      if (h) {
        for (const c of h.words(o))
          if (!(c === n || !isNaN(Number(c))) && (l.add(c), l.size > ut._suggestionsLimit))
            break e;
      }
    }
    return { words: Array.from(l), duration: s.elapsed() };
  }
  async $computeWordRanges(e, n, r, i) {
    const s = this._getModel(e);
    if (!s)
      return /* @__PURE__ */ Object.create(null);
    const o = new RegExp(r, i), l = /* @__PURE__ */ Object.create(null);
    for (let u = n.startLineNumber; u < n.endLineNumber; u++) {
      const h = s.getLineWords(u, o);
      for (const c of h) {
        if (!isNaN(Number(c.word)))
          continue;
        let d = l[c.word];
        d || (d = [], l[c.word] = d), d.push({
          startLineNumber: u,
          startColumn: c.startColumn,
          endLineNumber: u,
          endColumn: c.endColumn
        });
      }
    }
    return l;
  }
  async $navigateValueSet(e, n, r, i, s) {
    const o = this._getModel(e);
    if (!o)
      return null;
    const l = new RegExp(i, s);
    n.startColumn === n.endColumn && (n = {
      startLineNumber: n.startLineNumber,
      startColumn: n.startColumn,
      endLineNumber: n.endLineNumber,
      endColumn: n.endColumn + 1
    });
    const u = o.getValueInRange(n), h = o.getWordAtPosition({ lineNumber: n.startLineNumber, column: n.startColumn }, l);
    if (!h)
      return null;
    const c = o.getValueInRange(h);
    return Zo.INSTANCE.navigateValueSet(n, u, h, c, r);
  }
};
Nn._diffLimit = 1e5, Nn._suggestionsLimit = 1e4;
let zl = Nn;
class ut extends zl {
  constructor(e, n) {
    super(), this._host = e, this._foreignModuleFactory = n, this._foreignModule = null;
  }
  async $ping() {
    return "pong";
  }
  $loadForeignModule(e, n, r) {
    const i = {
      host: Ia(r, (s, o) => this._host.$fhr(s, o)),
      getMirrorModels: () => this._getModels()
    };
    return this._foreignModuleFactory ? (this._foreignModule = this._foreignModuleFactory(i, n), Promise.resolve(Oa(this._foreignModule))) : Promise.reject(new Error("Unexpected usage"));
  }
  $fmr(e, n) {
    if (!this._foreignModule || typeof this._foreignModule[e] != "function")
      return Promise.reject(new Error("Missing requestHandler or method: " + e));
    try {
      return Promise.resolve(this._foreignModule[e].apply(this._foreignModule, n));
    } catch (r) {
      return Promise.reject(r);
    }
  }
}
typeof importScripts == "function" && (globalThis.monaco = ka());
let En = !1;
function Wl(t) {
  if (En)
    return;
  En = !0;
  const e = new $o((n) => {
    globalThis.postMessage(n);
  }, (n) => new ut(Ta.getChannel(n), t));
  globalThis.onmessage = (n) => {
    e.onmessage(n.data);
  };
}
globalThis.onmessage = (t) => {
  En || Wl(null);
};
