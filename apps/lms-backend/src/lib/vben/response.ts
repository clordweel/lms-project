export function vbenResponse<T>(data: T) {
  return Response.json({
    data,
    code: 0,
  })
}
