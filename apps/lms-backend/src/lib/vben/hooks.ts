/**
 * vben 响应格式拦截器
 */
export async function vbenResponseHook(args: any) {
  const origin = args.req.headers.get('Origin')

  if (['http://localhost:5777'].includes(origin)) {
    // 复制原始数据
    const data = JSON.parse(JSON.stringify(args.result))

    // 删除原始数据
    for (const key in args.result) {
      delete args.result[key]
    }

    // 添加 vben 响应格式
    Object.assign(args.result, { data, code: 0 })
  }
}
