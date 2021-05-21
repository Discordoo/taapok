#!/usr/bin/env node
'use strict'

import meow from 'meow'
import parser from './parser.js'
import reader from './reader.js'
import writer from './writer.js'
import markdowner from './markdowner.js'

const help = `
  Usage:
  
  $ taapok --input="path/to/generated/markdown" --output="path/to/summary.md"
  ┗ will generate sumarry.md from generated markdown in 'path/to/generated/markdown' directory.
  
  $ taapok --input="path/to/generated/markdown" --output="path/to/summary.md" --prefix="docs/"
  ┗ will generate sumarry.md with md paths prefix 'docs' (classes/core.client.md => docs/classes/core.client.md)

`

const cli = meow(help, {
  flags: {
    input: {
      type: 'string',
      isRequired: true
    },
    output: {
      type: 'string',
      isRequired: true
    },
    prefix: {
      type: 'string'
    }
  },
  importMeta: import.meta,
  autoHelp: true
})

if (!cli.flags.input || !cli.flags.output) cli.showHelp(1)

const rawFiles = reader(cli.flags.input)
const files = parser(rawFiles)
const md = markdowner(files, cli.flags.prefix)
const result = writer(cli.flags.output, md)

console.log(result)
