import { defineComponent, reactive, toRefs } from 'vue';

const useFetch = (url) => {
  const state = reactive({
    data: null,
    isLoading: false,
    error: null,
  });

  const fetchData = async () => {
    try {
      state.isLoading = true;
      const response = await fetch(url);
      const data = await response.json();
      state.data = data;
      state.isLoading = false;
    } catch (error) {
      state.error = error.message;
      state.isLoading = false;
    }
  };

  return {
    fetchData,
    ...toRefs(state),
  };
};

export default defineComponent({
  setup() {
    const { fetchData, data, isLoading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

    return {
      fetchData,
      data,
      isLoading,
      error,
    };
  },
});