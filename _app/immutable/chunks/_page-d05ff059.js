import { _ as i } from './preload-helper-41c905a7.js'
const r = (t, e) => {
  const o = t[e]
  return o
    ? typeof o == 'function'
      ? o()
      : Promise.resolve(o)
    : new Promise((u, n) => {
        ;(typeof queueMicrotask == 'function' ? queueMicrotask : setTimeout)(
          n.bind(null, new Error('Unknown variable dynamic import: ' + e))
        )
      })
}
async function s({ data: t }) {
  const e = t.post.isIndexFile
    ? await r(
        Object.assign({
          '../../../../posts/apache-arrow-future-of-data-engineering/index.md': () =>
            i(
              () => import('./index-a56d4ef0.js'),
              ['./index-a56d4ef0.js', './index-0daa1a08.js'],
              import.meta.url
            ),
          '../../../../posts/going-fast-with-go/index.md': () =>
            i(
              () => import('./index-4af4bd86.js'),
              ['./index-4af4bd86.js', './index-0daa1a08.js'],
              import.meta.url
            ),
          '../../../../posts/latex-with-vscode/index.md': () =>
            i(
              () => import('./index-30033220.js'),
              ['./index-30033220.js', './index-0daa1a08.js'],
              import.meta.url
            )
        }),
        `../../../../posts/${t.post.slug}/index.md`
      )
    : await r(Object.assign({}), `../../../../posts/${t.post.slug}.md`)
  return { post: t.post, component: e.default, layout: { fullWidth: !0 } }
}
const p = Object.freeze(
  Object.defineProperty({ __proto__: null, load: s }, Symbol.toStringTag, { value: 'Module' })
)
export { p as _, s as l }
