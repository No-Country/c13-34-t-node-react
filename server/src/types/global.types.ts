export type OptionalObjectType = object | false

export type email = `${string}@${string}.${string}`

export type DecodedAuth = {
  id?: number
  iat: number
}
