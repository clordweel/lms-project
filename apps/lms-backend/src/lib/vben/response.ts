export function vbenResponse<T>(data: T, code = 0, message?: string) {
  if (code === 0) {
    message = 'success'
  } else {
    message = 'unknown error'
  }
  return Response.json({ data, code, message })
}
