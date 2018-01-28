<template>
  <div class="admin">
    <admin-nav class="admin-nav"></admin-nav>

    <router-view class="admin-sub-view"></router-view>
  </div>
</template>

<script>
import AdminNav from '@/admin/components/AdminNav';

export default {
  name: 'admin',
  components: {
    AdminNav,
  },
  mounted() {
    this.$store.dispatch('GET_ACCOUNT');
  },
};
</script>

<style lang="scss">
  @import '~styles/layout';

  .admin {
    @include container();
  }

</style>
