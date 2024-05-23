export class ConnectionError extends Error {
  constructor() {
    super('Hubo un error al intentar conectarse al servidor')
    this.name = 'ConnectionError'
  }
}

export class ServerError extends Error {
  constructor() {
    super('Hubo un error en el servidor')
    this.name = 'ServerError'
  }
}
export class NotFoundError extends Error {
  constructor() {
    super('No se encontró la página solicitada')
    this.name = 'NotFoundError'
  }
}
