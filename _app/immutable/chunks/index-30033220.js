import {
  S as Ga,
  i as Oa,
  s as Ma,
  k as i,
  q as p,
  a as r,
  l,
  m as n,
  r as f,
  h as t,
  c as u,
  K as Le,
  n as h,
  b as a,
  H as s,
  C as Lo
} from './index-0daa1a08.js'
const Ca = '' + new URL('../assets/hero-3cf37fb0.webp', import.meta.url).href,
  Ha = '' + new URL('../assets/extension-5adc18c2.webp', import.meta.url).href,
  Wa = '' + new URL('../assets/options-797cbfa5.webp', import.meta.url).href,
  Ua = '' + new URL('../assets/overleaf-e279a58b.webp', import.meta.url).href,
  Aa = '' + new URL('../assets/git-569fad45.webp', import.meta.url).href
function Va(Ta) {
  let m,
    de,
    ke,
    It,
    Ee,
    w,
    M,
    Eo,
    Lt,
    ge,
    v,
    C,
    Et,
    Pe,
    H,
    gt,
    Xe,
    W,
    _e,
    Pt,
    xe,
    U,
    Xt,
    Se,
    A,
    xt,
    Ge,
    V,
    St,
    Oe,
    j,
    Te,
    Gt,
    Me,
    F,
    Ot,
    Ce,
    q,
    Ie,
    Mt,
    He,
    R,
    Ct,
    We,
    N,
    Ht,
    Ue,
    c,
    B,
    b,
    Wt,
    Ut,
    At,
    z,
    d,
    Vt,
    jt,
    Ae,
    Ve,
    je,
    k,
    K,
    Ft,
    Fe,
    D,
    qt,
    qe,
    Y,
    Rt,
    Re,
    _,
    Ia = `<code class="language-bash"><span class="token comment"># Arch Linux Family</span>
<span class="token function">sudo</span> pacman <span class="token parameter variable">-S</span> texlive-most

<span class="token comment"># For Ubuntu, you might need a ppa:</span>
<span class="token function">sudo</span> add-apt-repository ppa:jonathonf/texlive
<span class="token function">sudo</span> <span class="token function">apt</span> update <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> texlive-full

<span class="token comment"># Fedora</span>
<span class="token function">sudo</span> dnf <span class="token function">install</span> texlive-scheme-full</code>`,
    Ne,
    Q,
    Nt,
    Be,
    Z,
    Bt,
    ze,
    T,
    La = `<code class="language-bash"><span class="token comment"># macOS MacTex Install</span>
brew <span class="token parameter variable">--cask</span> <span class="token function">install</span> mactex-no-gui

<span class="token comment"># Updating the packages</span>
<span class="token function">sudo</span> tlmgr update <span class="token parameter variable">--self</span> <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> tlmgr update <span class="token parameter variable">--all</span></code>`,
    Ke,
    J,
    zt,
    De,
    I,
    $,
    go,
    Kt,
    Ye,
    ee,
    Dt,
    Qe,
    L,
    Ea =
      '<code class="language-bash">ext <span class="token function">install</span> latex-workshop</code>',
    Ze,
    te,
    Yt,
    Je,
    E,
    oe,
    Po,
    Qt,
    $e,
    ae,
    Zt,
    et,
    tt,
    ot,
    g,
    ie,
    Jt,
    at,
    le,
    $t,
    it,
    se,
    eo,
    lt,
    P,
    ga = `<code class="language-bash"><span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> your_files_here
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"The commit message"</span>
<span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/username/repo
<span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master</code>`,
    st,
    ne,
    to,
    nt,
    y,
    oo,
    X,
    ao,
    io,
    rt,
    ut,
    pt,
    x,
    re,
    lo,
    ft,
    ue,
    so,
    ht,
    pe,
    no,
    mt,
    S,
    fe,
    Xo,
    ro,
    ct,
    he,
    uo,
    yt,
    me,
    po,
    wt,
    ce,
    fo,
    vt,
    G,
    ye,
    xo,
    ho,
    bt,
    O,
    we,
    mo,
    dt,
    ve,
    co,
    kt,
    be,
    yo
  return {
    c() {
      ;(m = i('blockquote')),
        (de = i('p')),
        (ke = i('em')),
        (It = p(
          'If you want to write LaTeX on your machine, VS Code is a great option for you! Installing all the necessary packages is a simple process. And with the power of Git, you can sync with web-based editors like Overleaf, and have satisfying versioning and backup.'
        )),
        (Ee = r()),
        (w = i('p')),
        (M = i('img')),
        (Lt = p(`
LaTeX Workshop on VS Code`)),
        (ge = r()),
        (v = i('h2')),
        (C = i('a')),
        (Et = p('Why LaTeX')),
        (Pe = r()),
        (H = i('p')),
        (gt = p(
          'For the uninitiated, LaTeX is not an editor, but a typesetting system. There are a few very compelling reasons why someone might want to use LaTeX instead of the conventional text systems. For me, these are the three most important:'
        )),
        (Xe = r()),
        (W = i('ul')),
        (_e = i('li')),
        (Pt = p('Focus on Content first, and let LaTeX deal all the formatting')),
        (xe = r()),
        (U = i('p')),
        (Xt = p(
          'First, the clear separation between formatting and content allows you to focus on developing your content. That means you wont need to re-format the whole document at each iteration.'
        )),
        (Se = r()),
        (A = i('p')),
        (xt = p(
          'Image (and table) numbering and the summary is also a big deal with LaTeX. You will not manually add numbers to any of them, you will define labels and reference those in your source. When compiling, LaTeX will worry about the order and numbering.'
        )),
        (Ge = r()),
        (V = i('p')),
        (St = p(
          'On top of all of that, there are a ton of LaTeX templates out there, and they make your job a lot easier. It is also not that hard to customize them when you get used to it.'
        )),
        (Oe = r()),
        (j = i('ul')),
        (Te = i('li')),
        (Gt = p('Easy Citations')),
        (Me = r()),
        (F = i('p')),
        (Ot = p(
          'Never worry about the citation style again. Once you chose the right one for your document, all you need to do is put the bibtex citations (that most sites give you, including Google Scholar) in your bib file, and reference them in your text.'
        )),
        (Ce = r()),
        (q = i('ul')),
        (Ie = i('li')),
        (Mt = p('High-quality typography')),
        (He = r()),
        (R = i('p')),
        (Ct = p(
          'If you are writing any technical document, you might need some formulas or special symbols. The quality of those in LaTeX is unmatched in any other editor. All letters and symbols will look as crisp as they can be.'
        )),
        (We = r()),
        (N = i('p')),
        (Ht = p(
          'Convinced yet? If not, you might what to google about it, or read this articles:'
        )),
        (Ue = r()),
        (c = i('ul')),
        (B = i('li')),
        (b = i('a')),
        (Wt = p('Why I write with LaTeX (and why you should too)')),
        (Ut = p(' by Marko Kovic')),
        (At = r()),
        (z = i('li')),
        (d = i('a')),
        (Vt = p('What the heck is Latex?')),
        (jt = p(' by Scott McPea')),
        (Ae = r()),
        (Ve = i('hr')),
        (je = r()),
        (k = i('h2')),
        (K = i('a')),
        (Ft = p('Installing tools')),
        (Fe = r()),
        (D = i('p')),
        (qt = p(
          'The installation process can be a little bit different for each system, but the process should be very straightforward. In some systems, you will have multiple options to download. I recommend taking the most complete packages ( without GUI ). They are less likely to give you a headache trying to install additional libraries later.'
        )),
        (qe = r()),
        (Y = i('p')),
        (Rt = p('Some common Linux commands for installing LaTeX are:')),
        (Re = r()),
        (_ = i('pre')),
        (Ne = r()),
        (Q = i('p')),
        (Nt = p(
          'In MacOS, I chose to install MacTeX without any GUI application, afterall, I am going to use VS Code for that. But if you desire to keep the GUI apps, just remove the “no-gui” from the name. If you dont have homebrew ( brew command), install it. It is a very handy tool for installing Terminal tools and even a few community apps.'
        )),
        (Be = r()),
        (Z = i('p')),
        (Bt = p(
          'After the installation is complete, it is necessary to update the LaTeX packages with the tlmgr command line tool that already comes with MacTeX.'
        )),
        (ze = r()),
        (T = i('pre')),
        (Ke = r()),
        (J = i('p')),
        (zt = p(
          'Now, let us install LaTeX Workshop plugin from the Visual Studio Code Marketplace.'
        )),
        (De = r()),
        (I = i('p')),
        ($ = i('img')),
        (Kt = p(`
Extensions Page in VS Code`)),
        (Ye = r()),
        (ee = i('p')),
        (Dt = p('Or install it by running the following command in the command pallete:')),
        (Qe = r()),
        (L = i('pre')),
        (Ze = r()),
        (te = i('p')),
        (Yt =
          p(`At this point, if you open a TeX file, you should be able to see it working, and your screen will be comparable to the one in the image below.
When clicking the preview option, you will have a choice to see the document in another tab of VS Code, or in a different app. If you opt for the tab, you are going to get a layout similar to the one in the first picture of this article.`)),
        (Je = r()),
        (E = i('p')),
        (oe = i('img')),
        (Qt = p(`
Latex Plugin Main Options`)),
        ($e = r()),
        (ae = i('p')),
        (Zt = p(
          'By default, your document will be recompiled automatically on save. With this, the whole process of delivering the PDF becomes an automated process. All you need to do is pick the file from your folder, and its ready to go.'
        )),
        (et = r()),
        (tt = i('hr')),
        (ot = r()),
        (g = i('h2')),
        (ie = i('a')),
        (Jt = p('LaTeX + GIT')),
        (at = r()),
        (le = i('p')),
        ($t = p(
          'If you are a developer, you might be used to versioning everything (hopefully). So why not use GIT in your LaTeX documents as well?'
        )),
        (it = r()),
        (se = i('p')),
        (eo = p(
          'If you are only editing it locally, it is just as simple as creating any other repository. But this starts shining when you want to work with others, or you want people to be able to check your work without you heaving to send it to them every time. On top of that, uploading your content to a remote GIT repository can protect you in case of a catastrophic failure in your personal machine.'
        )),
        (lt = r()),
        (P = i('pre')),
        (st = r()),
        (ne = i('p')),
        (to = p(
          'It is recommended to use a .gitignore file to keep your repository free of temporary files, and any side products created during compilation.'
        )),
        (nt = r()),
        (y = i('p')),
        (oo = p('I recommend using the pre-built one from the ')),
        (X = i('a')),
        (ao = p('github.com/github/gitignore')),
        (io = p(' repository.')),
        (rt = r()),
        (ut = i('hr')),
        (pt = r()),
        (x = i('h2')),
        (re = i('a')),
        (lo = p('Integrating with Overleaf')),
        (ft = r()),
        (ue = i('p')),
        (so = p(
          'Overleaf and ShareLaTeX are two of the most popular LaTeX web editors out there. The two platforms are joining forces into the “Overleaf V2”. Overleaf had an interesting GIT feature in version 1, that has evolved into a GitHub sync feature in version 2. It is not clear if this is going to be a free feature or not. It is a premium feature for ShareLaTeX, but free for Overleaf v1 users.'
        )),
        (ht = r()),
        (pe = i('p')),
        (no = p('When creating a new project, there is an option to import it from GitHub:')),
        (mt = r()),
        (S = i('p')),
        (fe = i('img')),
        (ro = p(`
Overleaf v2 New Project Page`)),
        (ct = r()),
        (he = i('p')),
        (uo = p('If you cant see this option, you might need to activate it somewhere.')),
        (yt = r()),
        (me = i('p')),
        (po = p(
          'This feature works with private repositories as well. And all you need to do is authorize Overleaf by logging into your GitHub account.'
        )),
        (wt = r()),
        (ce = i('p')),
        (fo = p(
          'Now, when you open the Menu, there is an option to Sync with GitHub. The panel shown in the picture below is where you can PULL and PUSH changes to your Git repository. This way you can keep your collaborators up to date with what you’ve created offline, and you can work from a different computer when you need/desire. Neat!'
        )),
        (vt = r()),
        (G = i('p')),
        (ye = i('img')),
        (ho = p(`
GitHub Sync Pannel`)),
        (bt = r()),
        (O = i('h2')),
        (we = i('a')),
        (mo = p('Conclusion')),
        (dt = r()),
        (ve = i('p')),
        (co = p(
          'If you are comfortable with VS Code, it might just be your best bet at writing LaTeX on your machine. The possibility of synchronizing your local repository with a web-based collaboration tool allows you to keep writing without internet in your local copy, or without your computer in the web editor.'
        )),
        (kt = r()),
        (be = i('p')),
        (yo = p(
          'I hope this article was useful for you. Might any question pop up, do not hesitate in posting a comment! Thanks!'
        )),
        this.h()
    },
    l(e) {
      m = l(e, 'BLOCKQUOTE', {})
      var o = n(m)
      de = l(o, 'P', {})
      var So = n(de)
      ke = l(So, 'EM', {})
      var Go = n(ke)
      ;(It = f(
        Go,
        'If you want to write LaTeX on your machine, VS Code is a great option for you! Installing all the necessary packages is a simple process. And with the power of Git, you can sync with web-based editors like Overleaf, and have satisfying versioning and backup.'
      )),
        Go.forEach(t),
        So.forEach(t),
        o.forEach(t),
        (Ee = u(e)),
        (w = l(e, 'P', {}))
      var wo = n(w)
      ;(M = l(wo, 'IMG', { src: !0, alt: !0 })),
        (Lt = f(
          wo,
          `
LaTeX Workshop on VS Code`
        )),
        wo.forEach(t),
        (ge = u(e)),
        (v = l(e, 'H2', { id: !0 }))
      var Oo = n(v)
      C = l(Oo, 'A', { href: !0 })
      var Mo = n(C)
      ;(Et = f(Mo, 'Why LaTeX')), Mo.forEach(t), Oo.forEach(t), (Pe = u(e)), (H = l(e, 'P', {}))
      var Co = n(H)
      ;(gt = f(
        Co,
        'For the uninitiated, LaTeX is not an editor, but a typesetting system. There are a few very compelling reasons why someone might want to use LaTeX instead of the conventional text systems. For me, these are the three most important:'
      )),
        Co.forEach(t),
        (Xe = u(e)),
        (W = l(e, 'UL', {}))
      var Ho = n(W)
      _e = l(Ho, 'LI', {})
      var Wo = n(_e)
      ;(Pt = f(Wo, 'Focus on Content first, and let LaTeX deal all the formatting')),
        Wo.forEach(t),
        Ho.forEach(t),
        (xe = u(e)),
        (U = l(e, 'P', {}))
      var Uo = n(U)
      ;(Xt = f(
        Uo,
        'First, the clear separation between formatting and content allows you to focus on developing your content. That means you wont need to re-format the whole document at each iteration.'
      )),
        Uo.forEach(t),
        (Se = u(e)),
        (A = l(e, 'P', {}))
      var Ao = n(A)
      ;(xt = f(
        Ao,
        'Image (and table) numbering and the summary is also a big deal with LaTeX. You will not manually add numbers to any of them, you will define labels and reference those in your source. When compiling, LaTeX will worry about the order and numbering.'
      )),
        Ao.forEach(t),
        (Ge = u(e)),
        (V = l(e, 'P', {}))
      var Vo = n(V)
      ;(St = f(
        Vo,
        'On top of all of that, there are a ton of LaTeX templates out there, and they make your job a lot easier. It is also not that hard to customize them when you get used to it.'
      )),
        Vo.forEach(t),
        (Oe = u(e)),
        (j = l(e, 'UL', {}))
      var jo = n(j)
      Te = l(jo, 'LI', {})
      var Fo = n(Te)
      ;(Gt = f(Fo, 'Easy Citations')),
        Fo.forEach(t),
        jo.forEach(t),
        (Me = u(e)),
        (F = l(e, 'P', {}))
      var qo = n(F)
      ;(Ot = f(
        qo,
        'Never worry about the citation style again. Once you chose the right one for your document, all you need to do is put the bibtex citations (that most sites give you, including Google Scholar) in your bib file, and reference them in your text.'
      )),
        qo.forEach(t),
        (Ce = u(e)),
        (q = l(e, 'UL', {}))
      var Ro = n(q)
      Ie = l(Ro, 'LI', {})
      var No = n(Ie)
      ;(Mt = f(No, 'High-quality typography')),
        No.forEach(t),
        Ro.forEach(t),
        (He = u(e)),
        (R = l(e, 'P', {}))
      var Bo = n(R)
      ;(Ct = f(
        Bo,
        'If you are writing any technical document, you might need some formulas or special symbols. The quality of those in LaTeX is unmatched in any other editor. All letters and symbols will look as crisp as they can be.'
      )),
        Bo.forEach(t),
        (We = u(e)),
        (N = l(e, 'P', {}))
      var zo = n(N)
      ;(Ht = f(
        zo,
        'Convinced yet? If not, you might what to google about it, or read this articles:'
      )),
        zo.forEach(t),
        (Ue = u(e)),
        (c = l(e, 'UL', {}))
      var _t = n(c)
      B = l(_t, 'LI', {})
      var vo = n(B)
      b = l(vo, 'A', { href: !0, rel: !0 })
      var Ko = n(b)
      ;(Wt = f(Ko, 'Why I write with LaTeX (and why you should too)')),
        Ko.forEach(t),
        (Ut = f(vo, ' by Marko Kovic')),
        vo.forEach(t),
        (At = u(_t)),
        (z = l(_t, 'LI', {}))
      var bo = n(z)
      d = l(bo, 'A', { href: !0, rel: !0 })
      var Do = n(d)
      ;(Vt = f(Do, 'What the heck is Latex?')),
        Do.forEach(t),
        (jt = f(bo, ' by Scott McPea')),
        bo.forEach(t),
        _t.forEach(t),
        (Ae = u(e)),
        (Ve = l(e, 'HR', {})),
        (je = u(e)),
        (k = l(e, 'H2', { id: !0 }))
      var Yo = n(k)
      K = l(Yo, 'A', { href: !0 })
      var Qo = n(K)
      ;(Ft = f(Qo, 'Installing tools')),
        Qo.forEach(t),
        Yo.forEach(t),
        (Fe = u(e)),
        (D = l(e, 'P', {}))
      var Zo = n(D)
      ;(qt = f(
        Zo,
        'The installation process can be a little bit different for each system, but the process should be very straightforward. In some systems, you will have multiple options to download. I recommend taking the most complete packages ( without GUI ). They are less likely to give you a headache trying to install additional libraries later.'
      )),
        Zo.forEach(t),
        (qe = u(e)),
        (Y = l(e, 'P', {}))
      var Jo = n(Y)
      ;(Rt = f(Jo, 'Some common Linux commands for installing LaTeX are:')),
        Jo.forEach(t),
        (Re = u(e)),
        (_ = l(e, 'PRE', { class: !0 }))
      var Pa = n(_)
      Pa.forEach(t), (Ne = u(e)), (Q = l(e, 'P', {}))
      var $o = n(Q)
      ;(Nt = f(
        $o,
        'In MacOS, I chose to install MacTeX without any GUI application, afterall, I am going to use VS Code for that. But if you desire to keep the GUI apps, just remove the “no-gui” from the name. If you dont have homebrew ( brew command), install it. It is a very handy tool for installing Terminal tools and even a few community apps.'
      )),
        $o.forEach(t),
        (Be = u(e)),
        (Z = l(e, 'P', {}))
      var ea = n(Z)
      ;(Bt = f(
        ea,
        'After the installation is complete, it is necessary to update the LaTeX packages with the tlmgr command line tool that already comes with MacTeX.'
      )),
        ea.forEach(t),
        (ze = u(e)),
        (T = l(e, 'PRE', { class: !0 }))
      var Xa = n(T)
      Xa.forEach(t), (Ke = u(e)), (J = l(e, 'P', {}))
      var ta = n(J)
      ;(zt = f(
        ta,
        'Now, let us install LaTeX Workshop plugin from the Visual Studio Code Marketplace.'
      )),
        ta.forEach(t),
        (De = u(e)),
        (I = l(e, 'P', {}))
      var ko = n(I)
      ;($ = l(ko, 'IMG', { src: !0, alt: !0 })),
        (Kt = f(
          ko,
          `
Extensions Page in VS Code`
        )),
        ko.forEach(t),
        (Ye = u(e)),
        (ee = l(e, 'P', {}))
      var oa = n(ee)
      ;(Dt = f(oa, 'Or install it by running the following command in the command pallete:')),
        oa.forEach(t),
        (Qe = u(e)),
        (L = l(e, 'PRE', { class: !0 }))
      var xa = n(L)
      xa.forEach(t), (Ze = u(e)), (te = l(e, 'P', {}))
      var aa = n(te)
      ;(Yt = f(
        aa,
        `At this point, if you open a TeX file, you should be able to see it working, and your screen will be comparable to the one in the image below.
When clicking the preview option, you will have a choice to see the document in another tab of VS Code, or in a different app. If you opt for the tab, you are going to get a layout similar to the one in the first picture of this article.`
      )),
        aa.forEach(t),
        (Je = u(e)),
        (E = l(e, 'P', {}))
      var _o = n(E)
      ;(oe = l(_o, 'IMG', { src: !0, alt: !0 })),
        (Qt = f(
          _o,
          `
Latex Plugin Main Options`
        )),
        _o.forEach(t),
        ($e = u(e)),
        (ae = l(e, 'P', {}))
      var ia = n(ae)
      ;(Zt = f(
        ia,
        'By default, your document will be recompiled automatically on save. With this, the whole process of delivering the PDF becomes an automated process. All you need to do is pick the file from your folder, and its ready to go.'
      )),
        ia.forEach(t),
        (et = u(e)),
        (tt = l(e, 'HR', {})),
        (ot = u(e)),
        (g = l(e, 'H2', { id: !0 }))
      var la = n(g)
      ie = l(la, 'A', { href: !0 })
      var sa = n(ie)
      ;(Jt = f(sa, 'LaTeX + GIT')), sa.forEach(t), la.forEach(t), (at = u(e)), (le = l(e, 'P', {}))
      var na = n(le)
      ;($t = f(
        na,
        'If you are a developer, you might be used to versioning everything (hopefully). So why not use GIT in your LaTeX documents as well?'
      )),
        na.forEach(t),
        (it = u(e)),
        (se = l(e, 'P', {}))
      var ra = n(se)
      ;(eo = f(
        ra,
        'If you are only editing it locally, it is just as simple as creating any other repository. But this starts shining when you want to work with others, or you want people to be able to check your work without you heaving to send it to them every time. On top of that, uploading your content to a remote GIT repository can protect you in case of a catastrophic failure in your personal machine.'
      )),
        ra.forEach(t),
        (lt = u(e)),
        (P = l(e, 'PRE', { class: !0 }))
      var Sa = n(P)
      Sa.forEach(t), (st = u(e)), (ne = l(e, 'P', {}))
      var ua = n(ne)
      ;(to = f(
        ua,
        'It is recommended to use a .gitignore file to keep your repository free of temporary files, and any side products created during compilation.'
      )),
        ua.forEach(t),
        (nt = u(e)),
        (y = l(e, 'P', {}))
      var Tt = n(y)
      ;(oo = f(Tt, 'I recommend using the pre-built one from the ')),
        (X = l(Tt, 'A', { href: !0, rel: !0 }))
      var pa = n(X)
      ;(ao = f(pa, 'github.com/github/gitignore')),
        pa.forEach(t),
        (io = f(Tt, ' repository.')),
        Tt.forEach(t),
        (rt = u(e)),
        (ut = l(e, 'HR', {})),
        (pt = u(e)),
        (x = l(e, 'H2', { id: !0 }))
      var fa = n(x)
      re = l(fa, 'A', { href: !0 })
      var ha = n(re)
      ;(lo = f(ha, 'Integrating with Overleaf')),
        ha.forEach(t),
        fa.forEach(t),
        (ft = u(e)),
        (ue = l(e, 'P', {}))
      var ma = n(ue)
      ;(so = f(
        ma,
        'Overleaf and ShareLaTeX are two of the most popular LaTeX web editors out there. The two platforms are joining forces into the “Overleaf V2”. Overleaf had an interesting GIT feature in version 1, that has evolved into a GitHub sync feature in version 2. It is not clear if this is going to be a free feature or not. It is a premium feature for ShareLaTeX, but free for Overleaf v1 users.'
      )),
        ma.forEach(t),
        (ht = u(e)),
        (pe = l(e, 'P', {}))
      var ca = n(pe)
      ;(no = f(ca, 'When creating a new project, there is an option to import it from GitHub:')),
        ca.forEach(t),
        (mt = u(e)),
        (S = l(e, 'P', {}))
      var To = n(S)
      ;(fe = l(To, 'IMG', { src: !0, alt: !0 })),
        (ro = f(
          To,
          `
Overleaf v2 New Project Page`
        )),
        To.forEach(t),
        (ct = u(e)),
        (he = l(e, 'P', {}))
      var ya = n(he)
      ;(uo = f(ya, 'If you cant see this option, you might need to activate it somewhere.')),
        ya.forEach(t),
        (yt = u(e)),
        (me = l(e, 'P', {}))
      var wa = n(me)
      ;(po = f(
        wa,
        'This feature works with private repositories as well. And all you need to do is authorize Overleaf by logging into your GitHub account.'
      )),
        wa.forEach(t),
        (wt = u(e)),
        (ce = l(e, 'P', {}))
      var va = n(ce)
      ;(fo = f(
        va,
        'Now, when you open the Menu, there is an option to Sync with GitHub. The panel shown in the picture below is where you can PULL and PUSH changes to your Git repository. This way you can keep your collaborators up to date with what you’ve created offline, and you can work from a different computer when you need/desire. Neat!'
      )),
        va.forEach(t),
        (vt = u(e)),
        (G = l(e, 'P', {}))
      var Io = n(G)
      ;(ye = l(Io, 'IMG', { src: !0, alt: !0 })),
        (ho = f(
          Io,
          `
GitHub Sync Pannel`
        )),
        Io.forEach(t),
        (bt = u(e)),
        (O = l(e, 'H2', { id: !0 }))
      var ba = n(O)
      we = l(ba, 'A', { href: !0 })
      var da = n(we)
      ;(mo = f(da, 'Conclusion')), da.forEach(t), ba.forEach(t), (dt = u(e)), (ve = l(e, 'P', {}))
      var ka = n(ve)
      ;(co = f(
        ka,
        'If you are comfortable with VS Code, it might just be your best bet at writing LaTeX on your machine. The possibility of synchronizing your local repository with a web-based collaboration tool allows you to keep writing without internet in your local copy, or without your computer in the web editor.'
      )),
        ka.forEach(t),
        (kt = u(e)),
        (be = l(e, 'P', {}))
      var _a = n(be)
      ;(yo = f(
        _a,
        'I hope this article was useful for you. Might any question pop up, do not hesitate in posting a comment! Thanks!'
      )),
        _a.forEach(t),
        this.h()
    },
    h() {
      Le(M.src, (Eo = Ca)) || h(M, 'src', Eo),
        h(M, 'alt', 'LaTeX Workshop on VS Code'),
        h(C, 'href', '#why-latex'),
        h(v, 'id', 'why-latex'),
        h(
          b,
          'href',
          'https://medium.com/@marko_kovic/why-i-write-with-latex-and-why-you-should-too-ba6a764fadf9'
        ),
        h(b, 'rel', 'nofollow'),
        h(d, 'href', 'http://scottmcpeak.com/latex/whatislatex.html'),
        h(d, 'rel', 'nofollow'),
        h(K, 'href', '#installing-tools'),
        h(k, 'id', 'installing-tools'),
        h(_, 'class', 'language-bash'),
        h(T, 'class', 'language-bash'),
        Le($.src, (go = Ha)) || h($, 'src', go),
        h($, 'alt', 'Extensions Page in VS Code'),
        h(L, 'class', 'language-bash'),
        Le(oe.src, (Po = Wa)) || h(oe, 'src', Po),
        h(oe, 'alt', 'Latex Plugin Main Options'),
        h(ie, 'href', '#latex--git'),
        h(g, 'id', 'latex--git'),
        h(P, 'class', 'language-bash'),
        h(X, 'href', 'http://github.com/github/gitignore'),
        h(X, 'rel', 'nofollow'),
        h(re, 'href', '#integrating-with-overleaf'),
        h(x, 'id', 'integrating-with-overleaf'),
        Le(fe.src, (Xo = Ua)) || h(fe, 'src', Xo),
        h(fe, 'alt', 'Overleaf v2 New Project Page'),
        Le(ye.src, (xo = Aa)) || h(ye, 'src', xo),
        h(ye, 'alt', 'GitHub Sync Pannel'),
        h(we, 'href', '#conclusion'),
        h(O, 'id', 'conclusion')
    },
    m(e, o) {
      a(e, m, o),
        s(m, de),
        s(de, ke),
        s(ke, It),
        a(e, Ee, o),
        a(e, w, o),
        s(w, M),
        s(w, Lt),
        a(e, ge, o),
        a(e, v, o),
        s(v, C),
        s(C, Et),
        a(e, Pe, o),
        a(e, H, o),
        s(H, gt),
        a(e, Xe, o),
        a(e, W, o),
        s(W, _e),
        s(_e, Pt),
        a(e, xe, o),
        a(e, U, o),
        s(U, Xt),
        a(e, Se, o),
        a(e, A, o),
        s(A, xt),
        a(e, Ge, o),
        a(e, V, o),
        s(V, St),
        a(e, Oe, o),
        a(e, j, o),
        s(j, Te),
        s(Te, Gt),
        a(e, Me, o),
        a(e, F, o),
        s(F, Ot),
        a(e, Ce, o),
        a(e, q, o),
        s(q, Ie),
        s(Ie, Mt),
        a(e, He, o),
        a(e, R, o),
        s(R, Ct),
        a(e, We, o),
        a(e, N, o),
        s(N, Ht),
        a(e, Ue, o),
        a(e, c, o),
        s(c, B),
        s(B, b),
        s(b, Wt),
        s(B, Ut),
        s(c, At),
        s(c, z),
        s(z, d),
        s(d, Vt),
        s(z, jt),
        a(e, Ae, o),
        a(e, Ve, o),
        a(e, je, o),
        a(e, k, o),
        s(k, K),
        s(K, Ft),
        a(e, Fe, o),
        a(e, D, o),
        s(D, qt),
        a(e, qe, o),
        a(e, Y, o),
        s(Y, Rt),
        a(e, Re, o),
        a(e, _, o),
        (_.innerHTML = Ia),
        a(e, Ne, o),
        a(e, Q, o),
        s(Q, Nt),
        a(e, Be, o),
        a(e, Z, o),
        s(Z, Bt),
        a(e, ze, o),
        a(e, T, o),
        (T.innerHTML = La),
        a(e, Ke, o),
        a(e, J, o),
        s(J, zt),
        a(e, De, o),
        a(e, I, o),
        s(I, $),
        s(I, Kt),
        a(e, Ye, o),
        a(e, ee, o),
        s(ee, Dt),
        a(e, Qe, o),
        a(e, L, o),
        (L.innerHTML = Ea),
        a(e, Ze, o),
        a(e, te, o),
        s(te, Yt),
        a(e, Je, o),
        a(e, E, o),
        s(E, oe),
        s(E, Qt),
        a(e, $e, o),
        a(e, ae, o),
        s(ae, Zt),
        a(e, et, o),
        a(e, tt, o),
        a(e, ot, o),
        a(e, g, o),
        s(g, ie),
        s(ie, Jt),
        a(e, at, o),
        a(e, le, o),
        s(le, $t),
        a(e, it, o),
        a(e, se, o),
        s(se, eo),
        a(e, lt, o),
        a(e, P, o),
        (P.innerHTML = ga),
        a(e, st, o),
        a(e, ne, o),
        s(ne, to),
        a(e, nt, o),
        a(e, y, o),
        s(y, oo),
        s(y, X),
        s(X, ao),
        s(y, io),
        a(e, rt, o),
        a(e, ut, o),
        a(e, pt, o),
        a(e, x, o),
        s(x, re),
        s(re, lo),
        a(e, ft, o),
        a(e, ue, o),
        s(ue, so),
        a(e, ht, o),
        a(e, pe, o),
        s(pe, no),
        a(e, mt, o),
        a(e, S, o),
        s(S, fe),
        s(S, ro),
        a(e, ct, o),
        a(e, he, o),
        s(he, uo),
        a(e, yt, o),
        a(e, me, o),
        s(me, po),
        a(e, wt, o),
        a(e, ce, o),
        s(ce, fo),
        a(e, vt, o),
        a(e, G, o),
        s(G, ye),
        s(G, ho),
        a(e, bt, o),
        a(e, O, o),
        s(O, we),
        s(we, mo),
        a(e, dt, o),
        a(e, ve, o),
        s(ve, co),
        a(e, kt, o),
        a(e, be, o),
        s(be, yo)
    },
    p: Lo,
    i: Lo,
    o: Lo,
    d(e) {
      e && t(m),
        e && t(Ee),
        e && t(w),
        e && t(ge),
        e && t(v),
        e && t(Pe),
        e && t(H),
        e && t(Xe),
        e && t(W),
        e && t(xe),
        e && t(U),
        e && t(Se),
        e && t(A),
        e && t(Ge),
        e && t(V),
        e && t(Oe),
        e && t(j),
        e && t(Me),
        e && t(F),
        e && t(Ce),
        e && t(q),
        e && t(He),
        e && t(R),
        e && t(We),
        e && t(N),
        e && t(Ue),
        e && t(c),
        e && t(Ae),
        e && t(Ve),
        e && t(je),
        e && t(k),
        e && t(Fe),
        e && t(D),
        e && t(qe),
        e && t(Y),
        e && t(Re),
        e && t(_),
        e && t(Ne),
        e && t(Q),
        e && t(Be),
        e && t(Z),
        e && t(ze),
        e && t(T),
        e && t(Ke),
        e && t(J),
        e && t(De),
        e && t(I),
        e && t(Ye),
        e && t(ee),
        e && t(Qe),
        e && t(L),
        e && t(Ze),
        e && t(te),
        e && t(Je),
        e && t(E),
        e && t($e),
        e && t(ae),
        e && t(et),
        e && t(tt),
        e && t(ot),
        e && t(g),
        e && t(at),
        e && t(le),
        e && t(it),
        e && t(se),
        e && t(lt),
        e && t(P),
        e && t(st),
        e && t(ne),
        e && t(nt),
        e && t(y),
        e && t(rt),
        e && t(ut),
        e && t(pt),
        e && t(x),
        e && t(ft),
        e && t(ue),
        e && t(ht),
        e && t(pe),
        e && t(mt),
        e && t(S),
        e && t(ct),
        e && t(he),
        e && t(yt),
        e && t(me),
        e && t(wt),
        e && t(ce),
        e && t(vt),
        e && t(G),
        e && t(bt),
        e && t(O),
        e && t(dt),
        e && t(ve),
        e && t(kt),
        e && t(be)
    }
  }
}
const Fa = {
  title: 'Writing LaTeX Documents In Visual Studio Code With LaTeX Workshop',
  date: '2018-08-31T00:00:00.000Z',
  headings: [
    { depth: 2, value: 'Why LaTeX', id: 'why-latex' },
    { depth: 2, value: 'Installing tools', id: 'installing-tools' },
    { depth: 2, value: 'LaTeX + GIT', id: 'latex--git' },
    { depth: 2, value: 'Integrating with Overleaf', id: 'integrating-with-overleaf' },
    { depth: 2, value: 'Conclusion', id: 'conclusion' }
  ]
}
class qa extends Ga {
  constructor(m) {
    super(), Oa(this, m, null, Va, Ma, {})
  }
}
export { qa as default, Fa as metadata }
