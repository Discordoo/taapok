import json2md from 'json2md'

export default function markdowner(object, dir = '') {
  const prepare = []

  function element(obj) {
    return `[${obj.name}](${source2md(obj)})`
  }

  function source2md(obj) {
    let source = dir.endsWith('/') ? dir : dir + '/' + (obj.module || '') + '/'

    const pathSegments = obj.sources[0].fileName.split('/')
    const file = pathSegments[pathSegments.length - 1].replace(/(\.js)|((\.d)?\.ts)/g, '')

    source += (obj.module || '').toLowerCase() === file.toLowerCase() ? (file + '-1' + '.md') : (file + '.md')

    if (source.startsWith('/')) source = source.replace('/', '')

    return source.toLowerCase()
  }

  if (object.classes.length) {
    prepare.push({ h1: 'Classes' })
    prepare.push({ ul: object.classes.map(element) })
    prepare.push({ p: '' })
  }

  if (object.functions.length) {
    prepare.push({ h1: 'Functions' })
    prepare.push({ ul: object.functions.map(element) })
    prepare.push({ p: '' })
  }

  if (object.interfaces.length) {
    prepare.push({ h1: 'Interfaces' })
    prepare.push({ ul: object.interfaces.map(element) })
    prepare.push({ p: '' })
  }

  if (object.types.length) {
    prepare.push({ h1: 'Types' })
    prepare.push({ ul: object.types.map(element) })
  }

  return json2md(prepare)
}
