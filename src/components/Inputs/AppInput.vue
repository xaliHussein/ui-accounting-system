<template>
  <v-text-field
    class="font-weight-black"
    :value="value"
    :type="type"
    :label="label"
    :prepend-icon="icon"
    @input="$emit('update-value', $event)"
    :rules="rules"
  />
</template>
<script>
  export default {
    props: {
      type: String,
      label: String,
      icon: String,
      value: String,
      rules: {
        type: Array,
        required: false,
      },
    },
    methods: {},
  };
</script>
