/**
 * vben 响应格式拦截器
 */
export async function vbenResponseHook(args: any) {
  const origin = args.req.headers.get('Origin')

  if (['http://localhost:5777', 'http://127.0.0.1:5777', 'https://lms.example.com'].includes(origin)) {
    // 复制原始数据
    const data = JSON.parse(JSON.stringify(args.result))

    // 删除原始数据
    // for (const key of Object.keys(args.result)) {
    //   delete args.result[key]
    // }

    // 添加 vben 响应格式
    Object.assign(args.result, { data, code: 0 })
  }
}
