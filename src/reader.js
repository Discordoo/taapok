import fs from 'fs'
import path from 'path'

export default function read(dir) {
  const place = path.join(process.cwd(), dir, '/')

  let classes, interfaces

  try {
    classes = fs.readdirSync(place + 'classes').map(f => `classes/${f}`)
    interfaces = fs.readdirSync(place + 'interfaces').map(f => `interfaces/${f}`)
  } catch (e) {
    console.error('Error when reading directories:', e)
    process.exit(1)
  }

  return [
    ...classes.map(c => ({ name: c, source: path.join(process.cwd(), dir, c) })),
    ...interfaces.map(i => ({ name: i, source: path.join(process.cwd(), dir, i) })),
  ]
}
