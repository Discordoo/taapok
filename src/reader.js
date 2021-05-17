import fs from 'fs'
import path from 'path'

export default function read(file) {
  const place = path.resolve(process.cwd(), file)

  let json

  try {
    json = JSON.parse(fs.readFileSync(place, { encoding: 'utf-8' }))
  } catch (e) {

    if (e instanceof SyntaxError) {
      console.error('JSON is invalid.')
    } else {
      console.error('File not found.')
    }

    process.exit(1)
  }

  return json
}
