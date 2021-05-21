Taapok
=
SUMMARY.md generator for Discordoo documentation

Install
-
1. Using npm:

   `npm i -g @discordoo/taapok`

2. Using git:
   
   `git clone https://github.com/Discordoo/taapok`
   
   `npm i`

   `npm link`

Use
-
```shell
$ taapok --input="path/to/generated/markdown" --output="path/to/summary.md"
  ┗ "will generate sumarry.md from generated markdown in 'path/to/generated/markdown' directory."
  
$ taapok --input="path/to/generated/markdown" --output="path/to/summary.md" --prefix="docs/"
  ┗ "will generate sumarry.md with md paths prefix 'docs' (core/client.md => docs/core/client.md)"
```
