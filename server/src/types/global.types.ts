export type OptionalObjectType = object | false

export type email = `${string}@${string}.${string}`

export interface DecodedAuth {
  id?: number
  iat: number
}
