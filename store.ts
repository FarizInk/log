import axios from 'axios'

export const globalDate = ref(new Date());

export const isTimelineLoading = ref(false);
export const timelinePayload = ref([]);
export const getTimeline = async () => {
  isTimelineLoading.value = true;
  const { data } = await axios.get("/api/data", {
    params: {
      year: globalDate.value.getFullYear(),
      month: globalDate.value.getMonth() + 1,
      date: globalDate.value.getDate(),
    },
  });

  console.log(data);

  timelinePayload.value = data;
  isTimelineLoading.value = false;
};
