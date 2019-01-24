let pairsToObj = kvs => {
  let obj = {}

  kvs.forEach(([k, v]) => obj[k] = v)

  return obj
}

let filterObj = fn => obj =>
  pairsToObj(Object.entries(obj)
               .filter(([k, v]) => fn(k, v)))

let trimObj = filterObj((k, v) => v !== null && v !== undefined)

let flat = array => array.reduce((acc, val) => acc.concat(val), [])

let thro = e => { throw e }

let indexBy = key => objs => pairsToObj(objs.map(o => [o[key], o]));

export default { pairsToObj, filterObj, trimObj, flat, throw: thro, indexBy }