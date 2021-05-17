import constanter from './constanter.js'

function parse(target, kind) {
  const group = target.groups ? target.groups.find(g => g.kind === kind) : null

  if (!group) return []

  return target.children.filter(c => group.children.includes(c.id))
    .map(c => Object.defineProperty(c, 'module', { value: target.name }))
}

export default function parser(json) {
  const classes = [], interfaces = [], functions = [], types = []

  const modules = parse(json, constanter.typedoc_module)

  modules.forEach(module => {
    const moduleClasses = parse(module, constanter.typedoc_class),
      moduleInterfaces = parse(module, constanter.typedoc_interface),
      moduleFunctions = parse(module, constanter.typedoc_function),
      moduleTypes = parse(module, constanter.typedoc_type)

    classes.push(...moduleClasses)
    interfaces.push(...moduleInterfaces)
    functions.push(...moduleFunctions)
    types.push(...moduleTypes)
  })

  return { classes, interfaces, functions, types }
}
