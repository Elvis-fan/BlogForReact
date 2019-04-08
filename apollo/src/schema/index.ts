import { gql } from 'apollo-server'
import * as fs from 'fs'
import * as path from 'path'

const gqlPath = `${path.resolve()}${path.sep}src${path.sep}schema${path.sep}`
const flies = fs.readdirSync(gqlPath, { withFileTypes: true })
const schema = []
for (let file of flies) {
  if (path.extname(file.name) === '.gql') { 
    const gpath = `${path.resolve()}${path.sep}src${path.sep}schema${path.sep}${file.name}`
    const gqlStr = fs.readFileSync(gpath).toLocaleString()
    schema.push(gql`${gqlStr}`)
  }
}

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`

export default [
  linkSchema,
  ...schema,
]
