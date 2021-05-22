import json2md from 'json2md'
import capitalizer from './capitalizer.js'

export default function markdowner(object, dir = '') {
  const prepare = []

  function element(obj) {
    return `[${obj.purpose}](${prepareSource(obj)})`
  }

  function prepareSource(obj) {
    if (!obj.name) throw new Error('unknown file without source')
    return dir && dir.endsWith('/') ? dir : dir + '/' + (obj.name || '')
  }

  Object.entries(object).forEach(([ module, files ]) => {
    prepare.push({ h1: capitalizer(module) })
    prepare.push({ ul: files.map(file => element(file)) })
    prepare.push({ p: '' })
  })

  return json2md(prepare)
}
