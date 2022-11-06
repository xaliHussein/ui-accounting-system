<template>
  <v-text-field
    class="font-weight-black"
    :value="value"
    :type="type"
    :label="label"
    :prepend-icon="icon"
    @input="$emit('update-value', $event)"
    :hint="hint"
    persistent-hint
    :rules="rules" />
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
      hint: {
        type: String,
        required: false,
      },
    },
    methods: {},
  };
</script>
