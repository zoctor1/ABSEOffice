<template>
  <div>
    <span class="textName">{{ item.name }}</span>
  </div>
</template>
 
<script>
export default {
  props: {
    item: { required: true },
  }
}
</script> 

<style scoped>
  .textName {
    padding-left:10px;
    margin-right:10px;
    font-family: Kanit, Arial, Helvetica, sans-serif !important;
    font-size: 16px;
  }
</style>>