import { gql } from 'apollo-server'
import * as fs from 'fs'
import * as path from 'path'
// import { schema } from './../schema'
export const schema = []
export const Gql = (filePath: string) => {
    return (target: any, name: string, value: PropertyDescriptor) => {
        const data = fs.readFileSync(`${path.resolve()}/src/graphql/${filePath}.gql`)
        // console.log(data.toString())
        // console.log(gql`${data.toString()}`)
        schema.push(gql`${data}`)
        return new target()
    }
}
