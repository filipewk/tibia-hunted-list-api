﻿import { HttpResponse } from '../../protocols/http'
import { MissingParamError } from '../../errors/missing-param'

export const badRequest = (param: string): HttpResponse => ({
  statusCode: 400,
  body: new MissingParamError(param)
})
