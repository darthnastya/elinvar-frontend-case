const concept = `
Simple Schema
`

const schema = {
  title: 'New Asset',
  properties: {
    One: {},
    Multiple: { items: {}}
  }
}

export default {
  concept,
  props: { schema },
}