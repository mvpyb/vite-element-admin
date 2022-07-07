import { usePermissionStore } from '/@/store'

const permission = {
  mounted : function( el, binding ) {
    const permissionStore = usePermissionStore()
    const { value } = binding
    const roleData = permissionStore.directivePermission
    if ( value && value instanceof Array ) {
      if ( value.length > 0 ) {
        const permissionRoles = value

        const hasPermission = roleData.some( role => {
          return permissionRoles.includes( role )
        } )

        if ( !hasPermission ) {
          el.parentNode && el.parentNode.removeChild( el )
        }
      }
    } else {
      throw new Error( `权限指令错误，可参考 v-permission="['admin','editor']"` )
    }
  }
}

export default permission
