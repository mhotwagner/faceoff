<template>
  <div class="profile-action-item">
    <div class="profile-action-item__inner">
      <span class="profile-action-item__name">{{ text }}</span>
      <span class="profile-action-item__button">{{ buttonText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profile-action-item',
  props: {
    text: String,
    buttonText: {
      default: 'Edit',
    },
  },
};
</script>

<style lang="scss">
  .profile-action-item{
    display: block;
    height: 3em;
    padding-right: 2em;
    cursor: pointer;
  }

  .profile-action-item__inner {
    padding-left: 1em;
    border-bottom: 1px solid black;
    text-transform: uppercase;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .profile-action-item__name {
    font-size: 1.5em;
    font-weight: 500;
    font-style: italic;
  }
  .profile-action-item__button {
    align-self: right;
    color: grey;
    font-style: italic;
    margin-top: 0.5em;
    position: relative;
    &:after {
      position: absolute;
      left: 0;
      top: 90%;
      transition: width 100ms ease-in;
      content: '';
      height: 1px;
      background-color: grey;
      width: 0;
    }
  }

  .profile-action-item:hover {
    .profile-action-item__button:after {
      width: 100%;
    }
  }
</style>
