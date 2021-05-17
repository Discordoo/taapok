#!/usr/bin/env node
'use strict'

import meow from 'meow'
import parser from './parser.js'
import reader from './reader.js'
import writer from './writer.js'
import markdowner from './markdowner.js'

const help = `
  Welcome to taapok, SUMMARY.md generator for Discordoo documentation. Usage:
  
  $ taapok --input="path/to/docs.json" --output="path/to/SUMMARY.md"
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
  importMeta: import.meta
})

if (!cli.flags.input || !cli.flags.output) cli.showHelp(1)

const file = reader(cli.flags.input)
const json = parser(file)
const md = markdowner(json, cli.flags.prefix)
const result = writer(cli.flags.output, md)

console.log(result)
