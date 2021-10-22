// import { getDict } from '@/utils/dictionary'
import { ref, reactive } from 'vue'

export default function( props ) {
  const page = ref( 1 )
  const total = ref( 10 )
  const pageSize = ref( 10 )
  const listData = ref( [] )
  const searchInfo = reactive( {} )

  const { listApi } = props

  function filterDict( value, type ) {
    // const rowLabel = this[type + 'Options'] && this[type + 'Options'].filter(item => item.value === value)
    // return rowLabel && rowLabel[0] && rowLabel[0].label
  }

  async function getDict( type ) {
    // const dicts = await getDict(type)
    // this[type + 'Options'] = dicts
    // return dicts
  }

  function handleSizeChange( val ) {
    // pageSize.value = val
    // getListData()
  }
  function handleCurrentChange( val ) {
    // page.value = val
    // getListData()
  }
  async function getListData( page = page.value, pageSize = pageSize.value ) {
    const table = await listApi( { page, pageSize, ...searchInfo } )
    if ( table.code === 0 ) {
      listData.value = table.data.list
      total.value = table.data.total
      page.value = table.data.page
      pageSize.value = table.data.pageSize
    }
  }

  return {
    page,
    total,
    pageSize,
    listData,
    searchInfo,

    filterDict,
    getDict,
    handleSizeChange,
    handleCurrentChange,
    getListData
  }
}
