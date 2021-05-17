import fs from 'fs'
import path from 'path'

export default function writer(place, file) {
  place = path.resolve(process.cwd(), place)

  try {
    fs.writeFileSync(place, file, { encoding: 'utf-8' })
  } catch (e) {
    console.error('Error when writing file:', e)
  }

  return `Success generated and written to ${place}`
}
