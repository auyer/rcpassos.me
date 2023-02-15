import {
  S as q,
  i as C,
  s as N,
  D,
  E as Q,
  F as U,
  m as _,
  h as m,
  n as r,
  G as Y,
  b as F,
  H as u,
  I as X,
  C as y,
  J as W,
  k as $,
  a as M,
  q as B,
  l as k,
  c as S,
  r as L,
  K as Z,
  L as J,
  M as ee,
  N as te,
  x as V,
  y as H,
  z as K,
  O as ae,
  P as se,
  Q as le,
  f as I,
  t as T,
  A as G
} from '../../chunks/index-0daa1a08.js'
function re(n) {
  let e,
    t,
    l = [
      { xmlns: 'http://www.w3.org/2000/svg' },
      { viewBox: '0 0 20 20' },
      { fill: 'currentColor' },
      n[0]
    ],
    o = {}
  for (let a = 0; a < l.length; a += 1) o = D(o, l[a])
  return {
    c() {
      ;(e = Q('svg')), (t = Q('path')), this.h()
    },
    l(a) {
      e = U(a, 'svg', { xmlns: !0, viewBox: !0, fill: !0 })
      var s = _(e)
      ;(t = U(s, 'path', { d: !0 })), _(t).forEach(m), s.forEach(m), this.h()
    },
    h() {
      r(t, 'd', 'M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'), Y(e, o)
    },
    m(a, s) {
      F(a, e, s), u(e, t)
    },
    p(a, [s]) {
      Y(
        e,
        (o = X(l, [
          { xmlns: 'http://www.w3.org/2000/svg' },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          s & 1 && a[0]
        ]))
      )
    },
    i: y,
    o: y,
    d(a) {
      a && m(e)
    }
  }
}
function ne(n, e, t) {
  return (
    (n.$$set = (l) => {
      t(0, (e = D(D({}, e), W(l))))
    }),
    (e = W(e)),
    [e]
  )
}
class oe extends q {
  constructor(e) {
    super(), C(this, e, ne, re, N, {})
  }
}
function ie(n) {
  let e,
    t,
    l = [
      { xmlns: 'http://www.w3.org/2000/svg' },
      { viewBox: '0 0 20 20' },
      { fill: 'currentColor' },
      n[0]
    ],
    o = {}
  for (let a = 0; a < l.length; a += 1) o = D(o, l[a])
  return {
    c() {
      ;(e = Q('svg')), (t = Q('path')), this.h()
    },
    l(a) {
      e = U(a, 'svg', { xmlns: !0, viewBox: !0, fill: !0 })
      var s = _(e)
      ;(t = U(s, 'path', { 'fill-rule': !0, d: !0, 'clip-rule': !0 })),
        _(t).forEach(m),
        s.forEach(m),
        this.h()
    },
    h() {
      r(t, 'fill-rule', 'evenodd'),
        r(
          t,
          'd',
          'M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
        ),
        r(t, 'clip-rule', 'evenodd'),
        Y(e, o)
    },
    m(a, s) {
      F(a, e, s), u(e, t)
    },
    p(a, [s]) {
      Y(
        e,
        (o = X(l, [
          { xmlns: 'http://www.w3.org/2000/svg' },
          { viewBox: '0 0 20 20' },
          { fill: 'currentColor' },
          s & 1 && a[0]
        ]))
      )
    },
    i: y,
    o: y,
    d(a) {
      a && m(e)
    }
  }
}
function ce(n, e, t) {
  return (
    (n.$$set = (l) => {
      t(0, (e = D(D({}, e), W(l))))
    }),
    (e = W(e)),
    [e]
  )
}
class ue extends q {
  constructor(e) {
    super(), C(this, e, ce, ie, N, {})
  }
}
function fe(n) {
  let e, t, l, o, a, s, c, g, f, E, h, z, p, x, A
  return {
    c() {
      ;(e = $('nav')),
        (t = $('a')),
        (l = $('img')),
        (s = M()),
        (c = $('a')),
        (g = B('About')),
        (E = M()),
        (h = $('a')),
        (z = B('Posts')),
        this.h()
    },
    l(w) {
      e = k(w, 'NAV', { class: !0 })
      var d = _(e)
      t = k(d, 'A', { class: !0, href: !0, active: !0 })
      var v = _(t)
      ;(l = k(v, 'IMG', { src: !0, alt: !0, width: !0, height: !0 })),
        v.forEach(m),
        (s = S(d)),
        (c = k(d, 'A', { class: !0, href: !0, active: !0 }))
      var i = _(c)
      ;(g = L(i, 'About')),
        i.forEach(m),
        (E = S(d)),
        (h = k(d, 'A', { class: !0, href: !0, active: !0 }))
      var b = _(h)
      ;(z = L(b, 'Posts')), b.forEach(m), d.forEach(m), this.h()
    },
    h() {
      Z(l.src, (o = '/assets/logo.svg')) || r(l, 'src', o),
        r(l, 'alt', 'Auyer'),
        r(l, 'width', '30px'),
        r(l, 'height', '30px'),
        r(t, 'class', 'logolink'),
        r(t, 'href', '/'),
        r(t, 'active', (a = n[0] == 'home')),
        r(c, 'class', 'link svelte-1r9m0vj'),
        r(c, 'href', '/about'),
        r(c, 'active', (f = n[0] == 'about')),
        r(h, 'class', 'link svelte-1r9m0vj'),
        r(h, 'href', '/posts'),
        r(h, 'active', (p = n[0] == 'posts')),
        r(e, 'class', 'nav flex items-center w-full mx-auto svelte-1r9m0vj')
    },
    m(w, d) {
      F(w, e, d),
        u(e, t),
        u(t, l),
        u(e, s),
        u(e, c),
        u(c, g),
        u(e, E),
        u(e, h),
        u(h, z),
        x || ((A = [J(t, 'click', n[1]), J(c, 'click', n[2]), J(h, 'click', n[3])]), (x = !0))
    },
    p(w, [d]) {
      d & 1 && a !== (a = w[0] == 'home') && r(t, 'active', a),
        d & 1 && f !== (f = w[0] == 'about') && r(c, 'active', f),
        d & 1 && p !== (p = w[0] == 'posts') && r(h, 'active', p)
    },
    i: y,
    o: y,
    d(w) {
      w && m(e), (x = !1), ee(A)
    }
  }
}
function me(n, e, t) {
  let l = 'home'
  return [l, () => t(0, (l = 'home')), () => t(0, (l = 'about')), () => t(0, (l = 'posts'))]
}
class he extends q {
  constructor(e) {
    super(), C(this, e, me, fe, N, {})
  }
}
function de(n) {
  let e,
    t,
    l = new Date().getFullYear() + '',
    o,
    a,
    s,
    c
  return {
    c() {
      ;(e = $('footer')),
        (t = B('© ')),
        (o = B(l)),
        (a = B(` Rafael Passos
  `)),
        (s = $('small')),
        (c = B('🚀 Built with SvelteKit')),
        this.h()
    },
    l(g) {
      e = k(g, 'FOOTER', { class: !0 })
      var f = _(e)
      ;(t = L(f, '© ')),
        (o = L(f, l)),
        (a = L(
          f,
          ` Rafael Passos
  `
        )),
        (s = k(f, 'SMALL', { class: !0 }))
      var E = _(s)
      ;(c = L(E, '🚀 Built with SvelteKit')), E.forEach(m), f.forEach(m), this.h()
    },
    h() {
      r(s, 'class', 'line'), r(e, 'class', 'footer svelte-uoqvvb')
    },
    m(g, f) {
      F(g, e, f), u(e, t), u(e, o), u(e, a), u(e, s), u(s, c)
    },
    p: y,
    i: y,
    o: y,
    d(g) {
      g && m(e)
    }
  }
}
class ve extends q {
  constructor(e) {
    super(), C(this, e, null, de, N, {})
  }
}
function _e(n) {
  let e, t, l, o, a, s, c, g, f, E, h, z, p, x, A, w
  ;(o = new he({})),
    (c = new oe({ props: { class: 'hidden text-zinc-500 dark:block' } })),
    (f = new ue({ props: { class: 'block text-zinc-400 dark:hidden' } }))
  const d = n[2].default,
    v = te(d, n, n[1], null)
  return (
    (p = new ve({})),
    {
      c() {
        ;(e = $('div')),
          (t = $('div')),
          (l = $('header')),
          V(o.$$.fragment),
          (a = M()),
          (s = $('button')),
          V(c.$$.fragment),
          (g = M()),
          V(f.$$.fragment),
          (E = M()),
          (h = $('main')),
          v && v.c(),
          (z = M()),
          V(p.$$.fragment),
          this.h()
      },
      l(i) {
        e = k(i, 'DIV', { class: !0 })
        var b = _(e)
        t = k(b, 'DIV', { class: !0 })
        var P = _(t)
        l = k(P, 'HEADER', { class: !0 })
        var j = _(l)
        H(o.$$.fragment, j),
          (a = S(j)),
          (s = k(j, 'BUTTON', {
            type: !0,
            role: !0,
            'aria-label': !0,
            'aria-checked': !0,
            class: !0
          }))
        var O = _(s)
        H(c.$$.fragment, O),
          (g = S(O)),
          H(f.$$.fragment, O),
          O.forEach(m),
          j.forEach(m),
          (E = S(P)),
          (h = k(P, 'MAIN', {}))
        var R = _(h)
        v && v.l(R),
          (z = S(R)),
          H(p.$$.fragment, R),
          R.forEach(m),
          P.forEach(m),
          b.forEach(m),
          this.h()
      },
      h() {
        r(s, 'type', 'button'),
          r(s, 'role', 'switch'),
          r(s, 'aria-label', 'Toggle Dark Mode'),
          r(s, 'aria-checked', n[0]),
          r(s, 'class', 'w-5 h-5 sm:h-8 sm:w-8 sm:p-1'),
          r(l, 'class', 'flex items-center justify-between w-full max-w-4xl py-4 mx-auto lg:pb-8'),
          r(t, 'class', 'flex flex-col flex-grow w-full px-4 py-2'),
          r(e, 'class', 'flex flex-col min-h-screen ')
      },
      m(i, b) {
        F(i, e, b),
          u(e, t),
          u(t, l),
          K(o, l, null),
          u(l, a),
          u(l, s),
          K(c, s, null),
          u(s, g),
          K(f, s, null),
          u(t, E),
          u(t, h),
          v && v.m(h, null),
          u(h, z),
          K(p, h, null),
          (x = !0),
          A || ((w = J(s, 'click', n[3])), (A = !0))
      },
      p(i, [b]) {
        ;(!x || b & 1) && r(s, 'aria-checked', i[0]),
          v && v.p && (!x || b & 2) && ae(v, d, i, i[1], x ? le(d, i[1], b, null) : se(i[1]), null)
      },
      i(i) {
        x ||
          (I(o.$$.fragment, i),
          I(c.$$.fragment, i),
          I(f.$$.fragment, i),
          I(v, i),
          I(p.$$.fragment, i),
          (x = !0))
      },
      o(i) {
        T(o.$$.fragment, i),
          T(c.$$.fragment, i),
          T(f.$$.fragment, i),
          T(v, i),
          T(p.$$.fragment, i),
          (x = !1)
      },
      d(i) {
        i && m(e), G(o), G(c), G(f), v && v.d(i), G(p), (A = !1), w()
      }
    }
  )
}
function ge() {
  document.documentElement.classList.add('[&_*]:!transition-none'),
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
}
function pe(n, e, t) {
  let { $$slots: l = {}, $$scope: o } = e,
    a = Boolean(document.documentElement.classList.contains('dark'))
  const s = () => {
    t(0, (a = !a)),
      localStorage.setItem('isDarkMode', a.toString()),
      ge(),
      a
        ? document.querySelector('html').classList.add('dark')
        : document.querySelector('html').classList.remove('dark')
  }
  return (
    (n.$$set = (c) => {
      '$$scope' in c && t(1, (o = c.$$scope))
    }),
    [a, o, l, s]
  )
}
class $e extends q {
  constructor(e) {
    super(), C(this, e, pe, _e, N, {})
  }
}
export { $e as default }
