<script>
import { h, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    onBeforeMount( () => {
      const { params, query } = route
      const { path } = params
      router.replace( { path : '/' + path, query } )
    } )
    return {}
  },
  // created() {
  //   const { params, query } = this.$route
  //   const { path } = params
  //   this.$router.replace({ path: '/' + path, query })
  // },
  render : function() {
    return h()
  }
}
</script>
