<template>
  <nav class="admin-nav">

    <div class="admin-nav-account">
      <ul class="admin-nav-account__links">
        <li class="admin-nav-account__settings">
          <router-link to="#">
            <md-icon>settings</md-icon>
          </router-link>
        </li>
        <li class="admin-nav-account__profile">
          <router-link to="#">my profile</router-link>
        </li>
        <li class="admin-nav-account__extra">
          <router-link to="#">my list</router-link>
          <router-link to="#">my dashboard</router-link>
        </li>
      </ul>
    </div>

    <div class="admin-nav-links">
      <div class="admin-nav-links__home">
        <router-link to="/">art<i>wrld</i></router-link>
      </div>
      <div class="admin-nav-links__links">
        <router-link
          v-for="link in navLinks"
          :to="link.href"
          :key="link.href"
        >{{ link.name }}</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'admin-nav',
  data () {
    return {
      navLinks: [
        { name: 'networks', href: 'networks' },
        { name: 'map', href: 'map' },
        { name: 'feed', href: 'feed' },
        { name: 'opportunities', href: 'opportunities' },
        { name: 'editorial', href: 'editorial' },
      ],
    };
  },
};
</script>

<style lang="scss">
  @import '~styles/breakpoints';

  a:hover {
    text-decoration: underline;
  }

  .admin-nav {
    display: flex;
  }

  @include respond-to(tablet) {
    .admin-nav-account, .admin-nav-links {
      flex-basis: 50%;
    }
  }

</style>
