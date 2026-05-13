import api from "@/api";
import type { FilterDataResponse } from "@/types";

export const fetchFilterData = async (): Promise<FilterDataResponse> => {
  const { data } = await api.get("/filterdata");
  console.log("data.data.categories 2", data.data.categories);
  return data.data;
};

export const fetchCategories = async () => {
  const { data } = await api.get("/categories");
  return data.data;
};
