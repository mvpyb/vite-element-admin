
const list = () => {
  const result = []
  const total = 100
  const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
  const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'
  
  for (let i = 1; i <= total; i++) {
    const item = {
      id: '@increment',
      timestamp: '@datetime()',
      author: '@first',
      reviewer: '@first',
      title: '@title(5, 10)',
      content_short: 'mock data',
      content: baseContent,
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft'],
      display_time: '@datetime',
      comment_disabled: true,
      pageviews: '@integer(300, 5000)',
      image_uri,
      platforms: ['a-platform']
    }
    result.push( item );
  }
  
  return result
};

export default [
  {
    url: '/api/demo/tableList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: list()
      }
    }
  },
  
]
