import MarkdownIt from 'markdown-it'
import fs from 'fs'

export default function parser(files) {
  const modules = {}

  files.forEach(file => {
    const module = file.name.split('/')[1].split('.')[0]

    const filePrepare = {
      purpose: null,
      source: file.source,
      name: file.name
    }

    filePrepare.purpose = new MarkdownIt()
      .parse(fs.readFileSync(file.source, { encoding: 'utf-8' }), {})
      [4] // place number 4 in the parsed md array
      .content // 'Class: ClientBuilder<Stack>'
      .split(':') // [ 'Class', ' ClientBuilder<Stack>' ]
      [1] // ' ClientBuilder<Stack>'
      .trim() // 'ClientBuilder<Stack>'
      .replace(/<.+>/g, '') // 'ClientBuilder'

    if (!modules[module]) {
      modules[module] = [ filePrepare ]
    } else {
      modules[module].push(filePrepare)
    }
  })

  return modules
}
